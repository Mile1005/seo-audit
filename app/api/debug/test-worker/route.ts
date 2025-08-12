import { NextRequest, NextResponse } from "next/server";
import { dbHelpers } from "../../../../lib/db";
import { fetchHtml } from "../../../../lib/scrape";
import { parseHtml } from "../../../../lib/parse";
import { calculateAudit } from "../../../../lib/heuristics";
import { fetchGscInsightsForUrl } from "../../../../lib/gsc";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pageUrl, targetKeyword, email } = body;

    console.log("Debug: Creating test audit job for:", pageUrl);
    
    const runId = crypto.randomUUID();
    await dbHelpers.createRun({
      id: runId,
      pageUrl,
      targetKeyword,
      email,
      status: "running"
    });

    try {
      // Process the audit immediately (synchronously)
      console.log("Debug: Fetching HTML...");
      const html = await fetchHtml(pageUrl);
      
      console.log("Debug: Parsing HTML...");
      const parsed = parseHtml(html, pageUrl);
      
      console.log("Debug: Calculating audit...");
      const baseResult = calculateAudit(pageUrl, parsed as any, { keyword: targetKeyword });
      
      // Try to get GSC insights
      let gsc_insights = { 
        available: false, 
        top_queries: [], 
        ctr: null, 
        impressions: null, 
        clicks: null 
      } as any;
      
      try {
        console.log("Debug: Fetching GSC insights...");
        gsc_insights = await fetchGscInsightsForUrl(pageUrl, runId);
      } catch (gscError) {
        console.warn("Debug: GSC insights not available:", gscError);
      }
      
      // Combine results
      const combined = { 
        ...baseResult, 
        gsc_insights,
        fetched_at: new Date().toISOString(),
        version: "1.0"
      } as const;
      
      // Save results
      console.log("Debug: Saving results...");
      await dbHelpers.createAudit({
        id: crypto.randomUUID(),
        runId,
        json: JSON.stringify(combined)
      });
      
      // Update status to ready
      await dbHelpers.updateRunStatus(runId, "ready");
      
      console.log("Debug: Test audit completed successfully");

      return NextResponse.json({
        runId,
        status: "ready",
        message: "Test audit completed successfully"
      });

    } catch (error) {
      console.error("Debug: Test audit processing failed:", error);
      await dbHelpers.updateRunStatus(runId, "failed");
      
      return NextResponse.json({ 
        runId,
        status: "error",
        error: "Test audit processing failed"
      }, { status: 500 });
    }

  } catch (err) {
    console.error("Debug: Error in test worker:", err);
    return NextResponse.json(
      { error: "Internal server error", details: (err as Error).message },
      { status: 500 }
    );
  }
}
