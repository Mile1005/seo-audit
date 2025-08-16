import { Queue, QueueOptions } from "bullmq";
import IORedis from "ioredis";

export const auditsQueueName = "audits";

let connection: IORedis | null = null;
let auditsQueue: Queue | null = null;

function isQueueConfiguredInternal(): boolean {
  return Boolean(process.env.REDIS_URL);
}

function getConnection(): IORedis {
  if (!connection) {
    const url = process.env.REDIS_URL;
    if (!url) {
      throw new Error("REDIS_URL is not configured. Queue is disabled.");
    }
    connection = new IORedis(url, { maxRetriesPerRequest: null });
  }
  return connection;
}

function getQueue(): Queue {
  if (!auditsQueue) {
    const queueOptions: QueueOptions = {
      connection: getConnection(),
      defaultJobOptions: {
        attempts: 5,
        backoff: { type: "exponential", delay: 2000 },
        removeOnComplete: { count: 100 },
        removeOnFail: { count: 100 },
      },
    };
    auditsQueue = new Queue(auditsQueueName, queueOptions);
  }
  return auditsQueue;
}

export type AuditJobData = {
  runId: string;
  pageUrl: string;
  targetKeyword?: string;
  email?: string;
};

export async function addAuditJob(data: AuditJobData) {
  return getQueue().add("audit", data);
}

export function isQueueConfigured(): boolean {
  return isQueueConfiguredInternal();
}
