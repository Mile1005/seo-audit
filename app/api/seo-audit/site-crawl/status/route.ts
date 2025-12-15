import { NextRequest, NextResponse } from "next/server";
import { getCrawl } from "../../../../../lib/server/crawl-store";
import { auth } from "../../../../../auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const job = getCrawl(id);
  if (!job) return NextResponse.json({ status: "not_found" }, { status: 404 });

  if (job.ownerId) {
    const session = await auth();
    if (!session?.user?.id || session.user.id !== job.ownerId) {
      return NextResponse.json({ status: "not_found" }, { status: 404 });
    }
  }

  return NextResponse.json({
    id: job.id,
    status: job.status,
    progress: job.progress,
    pagesProcessed: job.processed,
    queued: job.queued,
    maxPages: job.maxPages,
    maxDepth: job.maxDepth,
    pages: job.pages,
    summary: job.summary,
    error: job.error,
  });
}
