import { Queue } from "bullmq";
import IORedis from "ioredis";

let connection: IORedis | null = null;
let _crawlQueue: Queue | null = null;

function ensureConnection(): IORedis {
  if (!connection) {
    const url = process.env.REDIS_URL;
    if (!url) throw new Error("REDIS_URL is not configured. Crawl queue is disabled.");
    connection = new IORedis(url, { maxRetriesPerRequest: null });
  }
  return connection;
}

export function isCrawlQueueConfigured(): boolean {
  return Boolean(process.env.REDIS_URL);
}

function getQueue(): Queue {
  if (!_crawlQueue) {
    _crawlQueue = new Queue("crawl", {
      connection: ensureConnection(),
      defaultJobOptions: {
        removeOnComplete: { count: 50 },
        removeOnFail: { count: 50 },
        attempts: 3,
        backoff: { type: "exponential", delay: 2000 },
      },
    });
  }
  return _crawlQueue;
}

export const crawlQueue = {
  add: (...args: Parameters<Queue["add"]>) => getQueue().add(...args),
};

export interface CrawlJobData {
  crawlId: string;
  startUrl: string;
  limit?: number;
  sameHostOnly?: boolean;
  maxDepth?: number;
  timeout?: number;
}

export interface CrawlJobResult {
  crawlId: string;
  result: any; // CrawlResult from lib/crawl.ts
  completedAt: string;
}
