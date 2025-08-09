import { Queue, JobsOptions, QueueEvents } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
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


