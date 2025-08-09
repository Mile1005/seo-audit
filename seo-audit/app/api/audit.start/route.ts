import { NextResponse } from "next/server";
import { StartAuditInput } from "../../../lib/schemas";
import { createRun } from "../../../lib/db";
import { enqueueAudit } from "../../../lib/queue";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = StartAuditInput.parse(body);
    const run = await createRun({
      pageUrl: parsed.pageUrl,
      targetKeyword: parsed.targetKeyword,
      email: parsed.email
    });
    await enqueueAudit({ runId: run.id, pageUrl: run.pageUrl, targetKeyword: run.targetKeyword || undefined, email: run.email || undefined });
    return NextResponse.json({ runId: run.id, status: "queued" });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Invalid request" }, { status: 400 });
  }
}


