import { Queue, QueueOptions } from "bullmq";
import IORedis from "ioredis";
import { ENV } from "./env";

export const auditsQueueName = "audits";

function createConnection() {
  return new IORedis(ENV.REDIS_URL, { maxRetriesPerRequest: null });
}

function createQueue() {
  const connection = createConnection();
  const defaultQueueOptions: QueueOptions = {
    connection,
    defaultJobOptions: {
      attempts: 5,
      backoff: { type: "exponential", delay: 2000 },
      removeOnComplete: 100,
      removeOnFail: 100
    }
  };
  return new Queue(auditsQueueName, defaultQueueOptions);
}

export type AuditJobData = {
  runId: string;
  pageUrl: string;
  targetKeyword?: string;
  email?: string;
};

export async function addAuditJob(data: AuditJobData) {
  const queue = createQueue();
  try {
    return await queue.add("audit", data);
  } finally {
    // Avoid keeping open handle in serverless environments
    await queue.close();
    await queue.client.quit();
  }
}