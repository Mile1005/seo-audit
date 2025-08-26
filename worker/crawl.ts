import { Worker } from "bullmq";
import IORedis from "ioredis";
import { miniCrawl } from "../lib/crawl";
import { dbHelpers } from "../lib/db";
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

async function processCrawlJob(job: any) {
  const { crawlId, startUrl, limit, sameHostOnly, maxDepth, timeout } = job.data;

  console.log(`Starting crawl job for ${crawlId}, URL: ${startUrl}`);

  try {
    // Set status to running
    await dbHelpers.updateRunStatus(crawlId, RunStatus.running);
    console.log(`Crawl ${crawlId} status set to running`);

    // Perform the crawl
    console.log(`Crawling ${startUrl} with options:`, { limit, sameHostOnly, maxDepth, timeout });
    const crawlResult = await miniCrawl(startUrl, {
      limit: limit || 200,
      sameHostOnly: sameHostOnly !== false, // Default to true
      maxDepth: maxDepth || 5,
      timeout: timeout || 10000,
    });

    // Save crawl result
    const resultId = crypto.randomUUID();
    await dbHelpers.saveAudit({
      id: resultId,
      runId: crawlId,
      // @ts-expect-error: Prisma InputJsonValue type is too strict, but this is safe and works at runtime
      json: JSON.parse(JSON.stringify({ type: "crawl", ...crawlResult })),
    });

    console.log(`Crawl ${crawlId} completed successfully, found ${crawlResult.totalPages} pages`);

    // Update run status to ready
    await dbHelpers.updateRunStatus(crawlId, RunStatus.ready);
    console.log(`Crawl ${crawlId} status set to ready`);
  } catch (error) {
    console.error(`Error processing crawl job for ${crawlId}:`, error);

    // Determine if error is transient or permanent
    const isTransient = isTransientError(error);

    if (isTransient) {
      console.log(`Transient error for crawl ${crawlId}, will retry`);
      throw error; // This will trigger retry
    } else {
      console.log(`Permanent error for crawl ${crawlId}, marking as failed`);
      await dbHelpers.updateRunStatus(crawlId, RunStatus.failed);
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

// Create worker with concurrency of 2
const worker = new Worker("crawl", processCrawlJob, {
  connection,
  concurrency: 2,
  removeOnComplete: { count: 50 },
  removeOnFail: { count: 50 },
});

// Error handling
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

// Graceful shutdown
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
