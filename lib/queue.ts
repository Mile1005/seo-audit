import { Queue, JobsOptions, QueueEvents } from "bullmq";
import IORedis from "ioredis";

// Support password via redis://:password@host:port
const defaultUrl = process.env.REDIS_URL || "redis://:devpass@127.0.0.1:6379";
const connection = new IORedis(defaultUrl, {
  maxRetriesPerRequest: null
});

export const auditsQueue = new Queue("audits", { connection });
export const auditsQueueEvents = new QueueEvents("audits", { connection });

export type AuditJobPayload = {
  runId: string;
  pageUrl: string;
  targetKeyword?: string;
  email?: string;
};

export async function enqueueAudit(payload: AuditJobPayload) {
  const opts: JobsOptions = {
    attempts: 5,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: { age: 60 * 60, count: 1000 },
    removeOnFail: { age: 24 * 60 * 60, count: 1000 }
  };
  await auditsQueue.add("audit", payload, opts);
}


