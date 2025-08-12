import { NextRequest, NextResponse } from "next/server";
import { StartAuditInput } from "../../../lib/schemas";
import { dbHelpers } from "../../../lib/db";
import { fetchHtml } from "../../../lib/scrape";
import { parseHtml } from "../../../lib/parse";
import { calculateAudit } from "../../../lib/heuristics";
import { fetchGscInsightsForUrl } from "../../../lib/gsc";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = StartAuditInput.parse(body);
    
    // Convert empty strings to undefined
    const email = validatedData.email === "" ? undefined : validatedData.email;
    const targetKeyword = validatedData.targetKeyword === "" ? undefined : validatedData.targetKeyword;
    
    console.log("Starting audit for:", validatedData.pageUrl);
    
    // Create run record
    const runId = crypto.randomUUID();
    await dbHelpers.createRun({
      id: runId,
      pageUrl: validatedData.pageUrl,
      targetKeyword,
      email,
      status: "running"
    });
    
    try {
      // Process the audit immediately (synchronously)
      console.log("Fetching HTML...");
      const html = await fetchHtml(validatedData.pageUrl);
      
      console.log("Parsing HTML...");
      const parsed = parseHtml(html, validatedData.pageUrl);
      
      console.log("Calculating audit...");
      const baseResult = calculateAudit(validatedData.pageUrl, parsed as any, { keyword: targetKeyword });
      
      // Try to get GSC insights
      let gsc_insights = { 
        available: false, 
        top_queries: [], 
        ctr: null, 
        impressions: null, 
        clicks: null 
      } as any;
      
      try {
        console.log("Fetching GSC insights...");
        gsc_insights = await fetchGscInsightsForUrl(validatedData.pageUrl, runId);
      } catch (gscError) {
        console.warn("GSC insights not available:", gscError);
      }
      
      // Combine results
      const combined = { 
        ...baseResult, 
        gsc_insights,
        fetched_at: new Date().toISOString(),
        version: "1.0"
      } as const;
      
      // Save results
      console.log("Saving results...");
      await dbHelpers.createAudit({
        id: crypto.randomUUID(),
        runId,
        json: JSON.stringify(combined)
      });
      
      // Update status to ready
      await dbHelpers.updateRunStatus(runId, "ready");
      
      console.log("Audit completed successfully");
      
      return NextResponse.json({ 
        runId,
        status: "ready",
        message: "Audit completed successfully"
      });
      
    } catch (error) {
      console.error("Audit processing failed:", error);
      await dbHelpers.updateRunStatus(runId, "failed");
      
      return NextResponse.json({ 
        runId,
        status: "error",
        error: "Audit processing failed"
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error("Error starting audit:", error);
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}
