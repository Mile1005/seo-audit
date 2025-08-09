import { Worker, Job } from "bullmq";
import { config as dotenvConfig } from 'dotenv';
// Prefer .env.local (Next.js convention) but fall back to .env
dotenvConfig({ path: '.env.local' });
dotenvConfig();
import IORedis from "ioredis";
import { fetchHtml } from "../lib/scrape";
import { parseHtml } from "../lib/parse";
import { calculateAudit } from "../lib/heuristics";
import { fetchGscInsightsForUrl } from "../lib/gsc";
import { getPrisma } from "../lib/db";

type Payload = {
  runId: string;
  pageUrl: string;
  targetKeyword?: string;
  email?: string;
};

const connection = new IORedis(process.env.REDIS_URL || "redis://:devpass@127.0.0.1:6379", {
  maxRetriesPerRequest: null
});

async function processJob(job: Job<Payload>) {
  const { runId, pageUrl, targetKeyword } = job.data;
  try {
    await getPrisma().run.update({ where: { id: runId }, data: { status: "running" } });
  } catch {}
  try {
    const html = await fetchHtml(pageUrl);
    const parsed = parseHtml(html, pageUrl);
    const baseResult = calculateAudit(pageUrl, parsed as any, { keyword: targetKeyword });
    let gsc_insights = { available: false, top_queries: [], ctr: null, impressions: null, clicks: null } as any;
    try {
      gsc_insights = await fetchGscInsightsForUrl(pageUrl);
    } catch {}

    const combined = { ...baseResult, gsc_insights } as const;
    await getPrisma().audit.create({ data: { runId, json: JSON.stringify(combined) } });
    await getPrisma().run.update({ where: { id: runId }, data: { status: "ready" } });
  } catch (err) {
    console.error("Worker error", err);
    try {
      await getPrisma().run.update({ where: { id: job.data.runId }, data: { status: "failed" } });
    } catch {}
    throw err;
  }
}

// Concurrency 3 by default
const concurrency = parseInt(process.env.WORKER_CONCURRENCY || "3", 10);

new Worker<Payload>(
  "audits",
  async (job) => {
    return processJob(job);
  },
  { connection, concurrency }
);

console.log("Worker started with concurrency", concurrency);


