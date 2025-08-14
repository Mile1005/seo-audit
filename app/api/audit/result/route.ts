import { NextRequest, NextResponse } from "next/server";
import { dbHelpers } from "../../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const runId = searchParams.get("runId");

    if (!runId) {
      return NextResponse.json({ error: "runId parameter is required" }, { status: 400 });
    }

    // Get the run and its associated audit
    const run = await dbHelpers.getRunWithAudit(runId);

    if (!run) {
      return NextResponse.json({ error: "Run not found" }, { status: 404 });
    }

    // If audit is ready, return the results
    if (run.status === "ready" && run.audit) {
      const json = typeof run.audit.json === "string" ? JSON.parse(run.audit.json) : run.audit.json;
      return NextResponse.json({
        status: "done",
        result: json,
      });
    }

    // If audit failed
    if (run.status === "failed") {
      return NextResponse.json({
        status: "error",
        error: "Audit processing failed",
      });
    }

    // Still processing
    return NextResponse.json({
      status: run.status,
      message: `Audit is ${run.status}`,
    });
  } catch (err) {
    console.error("Error getting audit result:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
