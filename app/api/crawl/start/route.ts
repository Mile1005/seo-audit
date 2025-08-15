import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { crawlQueue, isCrawlQueueConfigured } from "../../../../lib/crawl-queue";
import { miniCrawl } from "../../../../lib/crawl";
import { dbHelpers } from "../../../../lib/db";

// Input validation schema
const StartCrawlRequest = z.object({
  startUrl: z.string().url("Invalid URL format"),
  limit: z.number().min(1).max(500).optional().default(200),
  sameHostOnly: z.boolean().optional().default(true),
  maxDepth: z.number().min(1).max(10).optional().default(5),
  timeout: z.number().min(1000).max(30000).optional().default(10000),
});

// Response types
interface StartCrawlResponse {
  crawlId: string;
  status: "queued";
  message: string;
}

const HARD_LIMIT = 30;

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    let { startUrl, limit, sameHostOnly, maxDepth, timeout } = StartCrawlRequest.parse(body);
    limit = HARD_LIMIT; // Enforce hard limit

    // Generate unique crawl ID
    const crawlId = crypto.randomUUID();

    const useDb = process.env.DISABLE_DB !== "true";
    if (useDb) {
      // Create run record in database
      await dbHelpers.createRun({
        id: crawlId,
        pageUrl: startUrl,
        status: "queued",
      });
    }

    if (isCrawlQueueConfigured() && useDb) {
      // Add job to crawl queue
      await crawlQueue.add(
        "crawl",
        { crawlId, startUrl, limit, sameHostOnly, maxDepth, timeout },
        { jobId: crawlId, removeOnComplete: true, removeOnFail: false }
      );
      console.log(`Crawl job queued: ${crawlId} for ${startUrl}`);
    } else {
      // Inline crawl fallback
      if (useDb) {
        await dbHelpers.updateRunStatus(crawlId, "running");
      }
      const crawlResult = await miniCrawl(startUrl, {
        limit,
        sameHostOnly: sameHostOnly !== false,
        maxDepth: maxDepth || 5,
        timeout: timeout || 10000,
      });
      if (useDb) {
        await dbHelpers.saveAudit({
          id: crypto.randomUUID(),
          runId: crawlId,
          json: { type: "crawl", ...crawlResult },
        });
        await dbHelpers.updateRunStatus(crawlId, "ready");
        console.log(`Crawl job completed inline: ${crawlId} for ${startUrl}`);
      } else {
        // Return inline response when DB is disabled
        return NextResponse.json({
          crawlId,
          status: "ready",
          message: `Crawl completed for ${startUrl}`,
          result: { type: "crawl", ...crawlResult },
        });
      }
    }

    const response: StartCrawlResponse = {
      crawlId,
      status: "queued",
      message: `Crawl job started for ${startUrl}`,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Start crawl error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to start crawl",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
