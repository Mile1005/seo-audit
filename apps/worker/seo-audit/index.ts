import { Worker } from "bullmq";
import IORedis from "ioredis";
import { dbHelpers } from "@repo/shared";
import { fetchHtml } from "@repo/shared";
import { parseHtml } from "@repo/shared";
import { calculateAudit } from "@repo/shared";
import { fetchPageSpeed } from "@repo/shared";
import { fetchGscInsightsForUrl } from "@repo/shared";
import crypto from "crypto";
// RunStatus enum - define locally since it's not exported from Prisma
enum RunStatus {
  queued = "queued",
  running = "running",
  ready = "ready",
  failed = "failed"
}
// Shared Redis connection
const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});
async function processJob(job: any) {
  const { runId, pageUrl, targetKeyword, email } = job.data;
  console.log(`Starting audit job for run ${runId}, URL: ${pageUrl}`);
  try {
    await dbHelpers.updateRunStatus(runId, RunStatus.running);
    console.log(`Run ${runId} status set to running`);
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
    if (!performanceData) {
      performanceData = {
        lcp: null,
        cls: null,
        inp: null,
        notes: [
          psiError ? `PSI error: ${typeof psiError === 'object' && psiError && 'message' in psiError ? (psiError as any).message : String(psiError)}` : 'Performance data not available',
        ],
      };
    }
    if (!gscData) {
      gscData = {
        available: false,
        top_queries: [],
        ctr: null,
        impressions: null,
        clicks: null,
  message: gscError ? `GSC error: ${typeof gscError === 'object' && gscError && 'message' in gscError ? (gscError as any).message : String(gscError)}` : 'GSC data not available',
      };
    }
    const auditResult = await calculateAudit(pageUrl, parsed, {
      targetKeyword,
      performance: performanceData || undefined,
      gscInsights: gscData || undefined,
    });
    const finalResult = {
      ...auditResult,
      version: "1.0",
      url: pageUrl,
      fetched_at: new Date().toISOString(),
    };
    const auditId = crypto.randomUUID();
    await dbHelpers.saveAudit({
      id: auditId,
      runId,
      json: finalResult,
    });
    console.log(`Audit ${auditId} saved for run ${runId}`);
    await dbHelpers.updateRunStatus(runId, RunStatus.ready);
    console.log(`Run ${runId} completed successfully, status set to ready`);
  } catch (error) {
    console.error(`Error processing job for run ${runId}:`, error);
    const isTransient = isTransientError(error);
    if (isTransient) {
      console.log(`Transient error for run ${runId}, will retry`);
      throw error;
    } else {
      console.log(`Permanent error for run ${runId}, marking as failed`);
      await dbHelpers.updateRunStatus(runId, RunStatus.failed);
    }
  }
}
function isTransientError(error: any): boolean {
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
  if (error.status >= 400 && error.status < 500 && error.status !== 429) {
    return false;
  }
  if (error.status === 429) {
    return true;
  }
  return false;
}
const worker = new Worker("audits", processJob, {
  connection,
  concurrency: 3,
  removeOnComplete: { count: 100 },
  removeOnFail: { count: 100 },
});
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
