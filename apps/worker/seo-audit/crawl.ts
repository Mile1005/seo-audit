import { Worker } from "bullmq";
import IORedis from "ioredis";
import { miniCrawl } from "@repo/shared";
import { dbHelpers } from "@repo/shared";
import crypto from "crypto";
enum RunStatus {
  queued = "queued",
  running = "running",
  ready = "ready",
  failed = "failed"
}
const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});
async function processCrawlJob(job: any) {
  const { crawlId, startUrl, limit, sameHostOnly, maxDepth, timeout } = job.data;
  console.log(`Starting crawl job for ${crawlId}, URL: ${startUrl}`);
  try {
    await dbHelpers.updateRunStatus(crawlId, RunStatus.running);
    console.log(`Crawl ${crawlId} status set to running`);
    const crawlResult = await miniCrawl(startUrl, {
      limit: limit || 200,
      sameHostOnly: sameHostOnly !== false,
      maxDepth: maxDepth || 5,
      timeout: timeout || 10000,
    });
    const resultId = crypto.randomUUID();
    await dbHelpers.saveAudit({
      id: resultId,
      runId: crawlId,
      json: { type: "crawl", ...crawlResult },
    });
    console.log(`Crawl ${crawlId} completed successfully, found ${crawlResult.totalPages} pages`);
    await dbHelpers.updateRunStatus(crawlId, RunStatus.ready);
    console.log(`Crawl ${crawlId} status set to ready`);
  } catch (error) {
    console.error(`Error processing crawl job for ${crawlId}:`, error);
    const isTransient = isTransientError(error);
    if (isTransient) {
      console.log(`Transient error for crawl ${crawlId}, will retry`);
      throw error;
    } else {
      console.log(`Permanent error for crawl ${crawlId}, marking as failed`);
      await dbHelpers.updateRunStatus(crawlId, RunStatus.failed);
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
const worker = new Worker("crawl", processCrawlJob, {
  connection,
  concurrency: 2,
  removeOnComplete: { count: 50 },
  removeOnFail: { count: 50 },
});
worker.on("error", (error) => {
  console.error("Crawl worker error:", error);
});
worker.on("failed", (job, error) => {
  console.error(`Crawl job ${job?.id} failed:`, error);
});
worker.on("completed", (job) => {
  console.log(`Crawl job ${job.id} completed successfully`);
});
console.log("Crawl Worker started with concurrency: 2");
console.log("Waiting for crawl jobs...");
process.on("SIGINT", async () => {
  console.log("Shutting down crawl worker...");
  await worker.close();
  await connection.quit();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  console.log("Shutting down crawl worker...");
  await worker.close();
  await connection.quit();
  process.exit(0);
});
