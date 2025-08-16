import { NextRequest, NextResponse } from "next/server";
import { dbHelpers } from "../../../../lib/db";
import { generateCrawlCSV } from "../../../../lib/crawl";

export async function GET(request: NextRequest) {
  try {
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

    if (run.status !== "ready") {
      return NextResponse.json({ error: "Crawl not completed yet" }, { status: 400 });
    }

    // Get crawl result
    const audit = await dbHelpers.getAuditByRunId(id);
    if (!audit) {
      return NextResponse.json({ error: "Crawl result not found" }, { status: 404 });
    }

    try {
      const crawlData = audit.json;

      // Generate CSV
      const csvContent = generateCrawlCSV(crawlData);

      // Return CSV file
      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="crawl-${id}.csv"`,
          "Cache-Control": "no-cache",
        },
      });
    } catch (error) {
      console.error("Error generating CSV:", error);
      return NextResponse.json({ error: "Failed to generate CSV export" }, { status: 500 });
    }
  } catch (error) {
    console.error("Export crawl error:", error);

    return NextResponse.json(
      {
        error: "Failed to export crawl data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
