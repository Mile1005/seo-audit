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

// Shared Redis connection
const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

async function processJob(job: any) {
  const { runId, pageUrl, targetKeyword, email } = job.data;

  console.log(`Starting audit job for run ${runId}, URL: ${pageUrl}`);

  try {
    // Set status to running
    await dbHelpers.updateRunStatus(runId, RunStatus.running);
    console.log(`Run ${runId} status set to running`);

    // Pipeline: fetchHtml -> parseHtml -> calculateAudit
    console.log(`Fetching HTML from ${pageUrl}`);
    const html = await fetchHtml(pageUrl);

    console.log("Parsing HTML content");
    const parsed = await parseHtml(html, pageUrl);

    console.log("Calculating audit results");

    // Fetch PageSpeed Insights data if API key is available
    let performanceData = null;
    const psiApiKey = process.env.PSI_API_KEY;
    if (psiApiKey) {
      try {
        console.log("Fetching PageSpeed Insights data");
        performanceData = await fetchPageSpeed(pageUrl, psiApiKey);
        console.log("PSI data retrieved successfully");
      } catch (error) {
        console.warn("Failed to fetch PSI data:", error);
        // Continue without PSI data - it's optional
      }
    } else {
      console.log("PSI API key not provided - skipping performance analysis");
    }

    // Fetch GSC data if available
    let gscData = null;
    try {
      gscData = await fetchGscInsightsForUrl(pageUrl);
      console.log("GSC data retrieved successfully");
    } catch (error) {
      console.warn("Failed to fetch GSC data:", error);
      // Continue without GSC data - it's optional
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
