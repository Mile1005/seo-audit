import { NextRequest, NextResponse } from "next/server";
import { dbHelpers } from "../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const runId = searchParams.get("runId");

    if (!runId) {
      return NextResponse.json(
        { error: "runId parameter is required" },
        { status: 400 }
      );
    }

    const run = await dbHelpers.getRunWithAudit(runId);

    if (!run) {
      return NextResponse.json(
        { error: "Run not found" },
        { status: 404 }
      );
    }

    if (run.status === "ready" && run.audit) {
      return NextResponse.json({
        status: "ready",
        result: JSON.parse(run.audit.json)
      });
    }

    if (run.status === "failed") {
      return NextResponse.json({
        status: "failed",
        error: "Audit processing failed"
      });
    }

    return NextResponse.json({
      status: run.status
    });

  } catch (err) {
    console.error("Error getting audit result:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
