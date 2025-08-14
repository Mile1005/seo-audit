import { Worker, Job } from "bullmq";
import IORedis from "ioredis";
import { auditsQueueName } from "../lib/queue";
import { prisma } from "../lib/db";
import { fetchHtml } from "../lib/scrape";
import { parseHtml } from "../lib/parse";
import { calculateAudit } from "../lib/heuristics";
import { fetchGscInsightsForUrl } from "../lib/gsc";
import { ENV } from "../lib/env";

const concurrency = parseInt(ENV.WORKER_CONCURRENCY || "3", 10);

const connection = new IORedis(ENV.REDIS_URL, { maxRetriesPerRequest: null });

async function processJob(job: Job) {
  const data = job.data as { runId: string; pageUrl: string; targetKeyword?: string; email?: string };
  const { runId, pageUrl, targetKeyword } = data;

  await prisma.run.update({ where: { id: runId }, data: { status: "running" } });

  try {
    const html = await fetchHtml(pageUrl);
    const parsed = parseHtml(html, pageUrl) as any;
    const baseResult = calculateAudit(pageUrl, parsed, { keyword: targetKeyword });

    let gsc_insights: any = { available: false, top_queries: [], ctr: null, impressions: null, clicks: null };
    try {
      gsc_insights = await fetchGscInsightsForUrl(pageUrl, runId);
    } catch {}

    const combined = {
      ...baseResult,
      gsc_insights,
      fetched_at: new Date().toISOString(),
      version: "1.0"
    } as const;

    await prisma.audit.create({ data: { id: crypto.randomUUID(), runId, json: JSON.stringify(combined) } });
    await prisma.run.update({ where: { id: runId }, data: { status: "ready" } });
  } catch (err) {
    console.error("Worker error for run", runId, err);
    await prisma.run.update({ where: { id: runId }, data: { status: "failed" } });
    throw err;
  }
}

const worker = new Worker(
  auditsQueueName,
  async (job) => processJob(job),
  { connection, concurrency }
);

worker.on("completed", (job) => {
  console.log(`[worker] completed job ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`[worker] failed job ${job?.id}:`, err?.message);
});

console.log(`[worker] started with concurrency=${concurrency}`);