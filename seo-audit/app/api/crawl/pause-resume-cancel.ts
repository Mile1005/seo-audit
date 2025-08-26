import { NextRequest, NextResponse } from "next/server";
import { Queue } from "bullmq";
import { isCrawlQueueConfigured } from "../../../../lib/crawl-queue";

// This assumes the queue is named "crawl" and uses the same connection as the main queue
import IORedis from "ioredis";
const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", { maxRetriesPerRequest: null });
const queue = new Queue("crawl", { connection });

export async function POST(request: NextRequest) {
  try {
    const { id, action } = await request.json();
    if (!id || !action) {
      return NextResponse.json({ error: "Missing id or action" }, { status: 400 });
    }
    if (!isCrawlQueueConfigured()) {
      return NextResponse.json({ error: "Crawl queue not configured" }, { status: 400 });
    }
    const job = await queue.getJob(id);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    if (action === "pause") {
      await queue.pause();
      return NextResponse.json({ status: "paused" });
    } else if (action === "resume") {
      await queue.resume();
      return NextResponse.json({ status: "resumed" });
    } else if (action === "cancel") {
      await job.remove();
      return NextResponse.json({ status: "cancelled" });
    } else {
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
