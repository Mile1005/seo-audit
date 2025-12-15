import { NextRequest, NextResponse } from "next/server";
import { getCrawl } from "../../../../../lib/server/crawl-store";
import { prisma } from "../../../../../lib/prisma";
import { auth } from "../../../../../auth";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Get crawl status and progress
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const crawlId = searchParams.get("id");

    if (!crawlId) {
      return NextResponse.json({ error: "Crawl ID required" }, { status: 400 });
    }

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // First check in-memory store for active crawls
    const job = getCrawl(crawlId);

    if (job) {
      if (job.ownerId && job.ownerId !== userId) {
        return NextResponse.json({ error: "Crawl not found" }, { status: 404 });
      }
      // Active crawl found in memory
      return NextResponse.json({
        id: crawlId,
        status: job.status,
        stage: job.stage,
        message: job.message,
        currentUrl: job.currentUrl,
        progress: job.progress,
        pages: job.pages,
        processed: job.processed,
        queued: job.queued,
        rootUrl: job.rootUrl,
        maxPages: job.maxPages,
        error: job.error,
        startedAt: job.startedAt,
        updatedAt: job.updatedAt,
      });
    }

    // Not in memory - check if it's a completed crawl in database
    try {
      const dbCrawl = await (prisma as any).crawl.findFirst({
        where: {
          id: crawlId,
          type: "DASHBOARD",
          project: { ownerId: userId },
        },
        include: {
          project: {
            select: {
              name: true,
              domain: true,
            },
          },
        },
      });

      if (dbCrawl) {
        // Found in database - return as completed
        return NextResponse.json({
          id: crawlId,
          status: dbCrawl.status.toLowerCase(), // 'COMPLETED', 'FAILED' -> 'completed', 'failed'
          progress: 100,
          pages: dbCrawl.results?.pages || [],
          processed: dbCrawl.pages || 0,
          queued: 0,
          rootUrl: dbCrawl.startUrl,
          maxPages: dbCrawl.settings?.maxPages || 50,
          dbId: dbCrawl.id,
          startedAt: dbCrawl.createdAt,
          updatedAt: dbCrawl.updatedAt,
        });
      }
    } catch (dbErr) {
      console.error("[status] Database lookup failed:", dbErr);
      // Continue to 404 if DB lookup fails
    }

    // Not found anywhere
    return NextResponse.json({ error: "Crawl not found" }, { status: 404 });
  } catch (err: any) {
    console.error("[status] Error:", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
