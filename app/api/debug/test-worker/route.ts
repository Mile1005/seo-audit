import { NextRequest, NextResponse } from "next/server";
import { dbHelpers } from "../../../../lib/db";
import { enqueueAudit } from "../../../../lib/queue";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pageUrl, targetKeyword, email } = body;

    console.log("Debug: Creating test audit job");
    
    const runId = crypto.randomUUID();
    await dbHelpers.createRun({
      id: runId,
      pageUrl,
      targetKeyword,
      email
    });

    console.log("Debug: Enqueuing audit job");
    await enqueueAudit({
      runId,
      pageUrl,
      targetKeyword,
      email
    });

    console.log("Debug: Job enqueued successfully");

    return NextResponse.json({
      runId,
      status: "queued",
      message: "Test audit job created and enqueued"
    });

  } catch (err) {
    console.error("Debug: Error in test worker:", err);
    return NextResponse.json(
      { error: "Internal server error", details: (err as Error).message },
      { status: 500 }
    );
  }
}
