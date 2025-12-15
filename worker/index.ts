import { Worker } from "bullmq";
import IORedis from "ioredis";
import { prisma } from "../lib/db";
import { Prisma, RunStatus } from "@prisma/client";
import { randomUUID } from "crypto";
import { fetchHtml } from "../lib/scrape";
import { parseHtml } from "../lib/parse";
import { calculateAudit } from "../lib/heuristics";
import { fetchPageSpeed } from "../lib/psi";
import { fetchGscInsightsForUrl } from "../lib/gsc";
import { Queue } from "bullmq";

// Shared Redis connection
const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

// Snapshot jobs are disabled until snapshot models are implemented in Prisma.
// If needed later, reintroduce a snapshot queue and workers guarded by a feature flag.

async function processJob(job: any) {
  const { runId, pageUrl, targetKeyword, email, locale = 'en', userId } = job.data;

  console.log(`Starting audit job for run ${runId}, URL: ${pageUrl}, Locale: ${locale}`);

  try {
    // Set status to running
  await prisma.run.update({ where: { id: runId }, data: { status: RunStatus.RUNNING } });
    console.log(`Run ${runId} status set to running (locale: ${locale})`);

    // Fetch HTML, PSI, and GSC in parallel
    const psiApiKey = process.env.PSI_API_KEY;
    let html: string | null = null;
    let performanceData: any = null;
    let gscData: any = null;
  let htmlError: unknown = null;
  let psiError: unknown = null;
  let gscError: unknown = null;

    await Promise.all([
      (async () => {
        try {
          html = await fetchHtml(pageUrl);
        } catch (err) {
          htmlError = err;
        }
      })(),
      (async () => {
        if (psiApiKey) {
          try {
            performanceData = await fetchPageSpeed(pageUrl, psiApiKey);
          } catch (err) {
            psiError = err;
          }
        }
      })(),
      (async () => {
        try {
          gscData = await fetchGscInsightsForUrl(pageUrl, userId ? { userId } : undefined);
        } catch (err) {
          gscError = err;
        }
      })(),
    ]);

    if (!html) {
      const msg = (htmlError && (htmlError as any)?.message) ? (htmlError as any).message : 'Failed to fetch HTML';
      throw new Error(msg);
    }

    const parsed = await parseHtml(html, pageUrl);

    // Fallback for performanceData if PSI failed
    if (!performanceData) {
      performanceData = {
        lcp: null,
        cls: null,
        inp: null,
        notes: [
          psiError ? `PSI error: ${(psiError as any)?.message ?? String(psiError)}` : 'Performance data not available',
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
        message: gscError ? `GSC error: ${(gscError as any)?.message ?? String(gscError)}` : 'GSC data not available',
      };
    }

    const auditResult = await calculateAudit(pageUrl, parsed, {
      targetKeyword,
      performance: performanceData || undefined,
      gscInsights: gscData || undefined,
    });

    // Build final result with required fields including locale
    const finalResult = {
      ...auditResult,
      version: "1.0",
      url: pageUrl,
      fetched_at: new Date().toISOString(),
      locale, // Include locale for report generation
    };

    // Save audit result
    const auditId = randomUUID();
    await prisma.audit.create({
      data: {
        id: auditId,
        runId,
        json: finalResult,
      }
    });
    console.log(`Audit ${auditId} saved for run ${runId} (locale: ${locale})`);

    // Update run status to ready
  await prisma.run.update({ where: { id: runId }, data: { status: RunStatus.READY } });
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
  await prisma.run.update({ where: { id: runId }, data: { status: RunStatus.FAILED } });
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
