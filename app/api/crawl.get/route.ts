import { NextRequest, NextResponse } from "next/server";
import { dbHelpers } from "../../../lib/db";

interface CrawlResponse {
  status: "queued" | "running" | "ready" | "failed";
  crawlId: string;
  startUrl: string;
  result?: any; // CrawlResult from lib/crawl.ts
  error?: string;
}

export async function GET(request: NextRequest) {
  try {
    if (process.env.DISABLE_DB === "true") {
      return NextResponse.json(
        { error: "Database disabled; inline crawl returns result directly from start." },
        { status: 400 }
      );
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing crawl ID parameter" }, { status: 400 });
    }

    // Get run status from database
    const run = await dbHelpers.getRun(id);

    if (!run) {
      return NextResponse.json({ error: "Crawl not found" }, { status: 404 });
    }

    const response: CrawlResponse = {
      status: run.status,
      crawlId: id,
      startUrl: run.pageUrl,
    };

    // If crawl is ready, get the result
    if (run.status === "ready") {
      const audit = await dbHelpers.getAuditByRunId(id);
      if (audit) {
        try {
          const crawlData = JSON.parse(audit.json);
          response.result = crawlData;
        } catch (error) {
          console.error("Error parsing crawl result:", error);
          response.error = "Failed to parse crawl result";
        }
      }
    } else if (run.status === "failed") {
      response.error = "Crawl failed";
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Get crawl error:", error);

    return NextResponse.json(
      {
        error: "Failed to get crawl status",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
