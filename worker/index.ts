import { Worker } from "bullmq";
import IORedis from "ioredis";
import { dbHelpers } from "../lib/db";
// RunStatus enum - define locally since it's not exported from Prisma
enum RunStatus {
  queued = "queued",
  running = "running",
  ready = "ready",
  failed = "failed"
}
import { fetchHtml } from "../lib/scrape";
import { parseHtml } from "../lib/parse";
import { calculateAudit } from "../lib/heuristics";
import { fetchPageSpeed } from "../lib/psi";
import { fetchGscInsightsForUrl } from "../lib/gsc";
import { Queue } from "bullmq";
import { fetchKeywordRank } from "../lib/rank";
import { fetchBacklinkSnapshot } from "../lib/backlinks";

// Shared Redis connection
const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

const snapshotQueue = new Queue("snapshots", { connection });

// Schedule daily snapshot jobs for all domains
async function scheduleDailySnapshots() {
  const prisma = await dbHelpers.getPrisma();
  const domains = await prisma.domain.findMany();
  for (const domain of domains) {
    await snapshotQueue.add(
      "rank-backlink-snapshot",
      { domainId: domain.id, domainUrl: domain.url },
      { repeat: { cron: "0 3 * * *" }, removeOnComplete: true, removeOnFail: true }
    );
  }
}

scheduleDailySnapshots().catch(console.error);

// Worker for snapshot jobs
const snapshotWorker = new Worker(
  "snapshots",
  async (job) => {
    const { domainId, domainUrl } = job.data;
    const prisma = await dbHelpers.getPrisma();
    // Fetch all keywords for this domain (future: support multiple keywords)
    const keywords = await prisma.rankSnapshot.findMany({
      where: { domainId },
      select: { keyword: true },
      distinct: ["keyword"]
    });
    for (const { keyword } of keywords) {
      try {
        const { position, provider } = await fetchKeywordRank(domainUrl, keyword);
        await prisma.rankSnapshot.create({
          data: { domainId, keyword, position, provider },
        });
      } catch (e: any) {
        if (e.message && e.message.toLowerCase().includes("quota")) {
          console.warn(`[CRON] Quota reached for rank snapshot: ${domainUrl} ${keyword}`);
        } else {
          console.error(`[CRON] Error fetching rank for ${domainUrl} ${keyword}:`, e);
        }
      }
    }
    try {
      const { totalBacklinks, referringDomains, provider } = await fetchBacklinkSnapshot(domainUrl);
      await prisma.backlinkSnapshot.create({
        data: { domainId, totalBacklinks, referringDomains, provider },
      });
    } catch (e: any) {
      if (e.message && e.message.toLowerCase().includes("quota")) {
        console.warn(`[CRON] Quota reached for backlink snapshot: ${domainUrl}`);
      } else {
        console.error(`[CRON] Error fetching backlinks for ${domainUrl}:`, e);
      }
    }
  },
  { connection, concurrency: 2 }
);

snapshotWorker.on("error", (error) => {
  console.error("Snapshot worker error:", error);
});

async function processJob(job: any) {
  const { runId, pageUrl, targetKeyword, email } = job.data;

  console.log(`Starting audit job for run ${runId}, URL: ${pageUrl}`);

  try {
    // Set status to running
    await dbHelpers.updateRunStatus(runId, RunStatus.running);
    console.log(`Run ${runId} status set to running`);

    // Fetch HTML, PSI, and GSC in parallel
    const psiApiKey = process.env.PSI_API_KEY;
    let html: string | null = null;
    let performanceData: any = null;
    let gscData: any = null;
    let htmlError: Error | null = null;
    let psiError: Error | null = null;
    let gscError: Error | null = null;

    await Promise.all([
      (async () => {
        try {
          html = await fetchHtml(pageUrl);
        } catch (err) {
          htmlError = err as Error;
        }
      })(),
      (async () => {
        if (psiApiKey) {
          try {
            performanceData = await fetchPageSpeed(pageUrl, psiApiKey);
          } catch (err) {
            psiError = err as Error;
          }
        }
      })(),
      (async () => {
        try {
          gscData = await fetchGscInsightsForUrl(pageUrl);
        } catch (err) {
          gscError = err as Error;
        }
      })(),
    ]);

    if (!html) {
      throw htmlError || new Error('Failed to fetch HTML');
    }

    const parsed = await parseHtml(html, pageUrl);

    // Fallback for performanceData if PSI failed
    if (!performanceData) {
      performanceData = {
        lcp: null,
        cls: null,
        inp: null,
        notes: [
          psiError ? `PSI error: ${psiError.message}` : 'Performance data not available',
        ],
      };
    }

    // Fallback for gscData if GSC failed
    if (!gscData) {
      gscData = {
        available: false,
        top_queries: [],
        ctr: null,
        impressions: null,
        clicks: null,
        message: gscError ? `GSC error: ${gscError.message}` : 'GSC data not available',
      };
    }

    const auditResult = await calculateAudit(pageUrl, parsed, {
      targetKeyword,
      performance: performanceData || undefined,
      gscInsights: gscData || undefined,
    });

    // Build final result with required fields
    const finalResult = {
      ...auditResult,
      version: "1.0",
      url: pageUrl,
      fetched_at: new Date().toISOString(),
    };

    // Save audit result
    const auditId = crypto.randomUUID();
    await dbHelpers.saveAudit({
      id: auditId,
      runId,
      json: finalResult,
    });
    console.log(`Audit ${auditId} saved for run ${runId}`);

    // Update run status to ready
    await dbHelpers.updateRunStatus(runId, RunStatus.ready);
    console.log(`Run ${runId} completed successfully, status set to ready`);
  } catch (error) {
    console.error(`Error processing job for run ${runId}:`, error);

    // Determine if error is transient or permanent
    const isTransient = isTransientError(error);

    if (isTransient) {
      console.log(`Transient error for run ${runId}, will retry`);
      throw error; // This will trigger retry
    } else {
      console.log(`Permanent error for run ${runId}, marking as failed`);
      await dbHelpers.updateRunStatus(runId, RunStatus.failed);
    }
  }
}

function isTransientError(error: any): boolean {
  // Network errors, timeouts, 5xx responses are transient
  if (
    error.code === "ECONNRESET" ||
    error.code === "ETIMEDOUT" ||
    error.code === "ENOTFOUND" ||
    error.message?.includes("timeout") ||
    error.message?.includes("network") ||
    (error.status >= 500 && error.status < 600)
  ) {
    return true;
  }

  // 4xx errors (except 429) are usually permanent
  if (error.status >= 400 && error.status < 500 && error.status !== 429) {
    return false;
  }

  // 429 (rate limit) is transient
  if (error.status === 429) {
    return true;
  }

  // Default to permanent for unknown errors
  return false;
}

// Create worker with concurrency of 3
const worker = new Worker("audits", processJob, {
  connection,
  concurrency: 3,
  removeOnComplete: { count: 100 },
  removeOnFail: { count: 100 },
});

// Error handling
worker.on("error", (error) => {
  console.error("Worker error:", error);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error);
});

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

console.log("SEO Audit Worker started with concurrency: 3");
console.log("Waiting for audit jobs...");

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down worker...");
  await worker.close();
  await connection.quit();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down worker...");
  await worker.close();
  await connection.quit();
  process.exit(0);
});
