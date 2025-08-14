import { NextRequest, NextResponse } from "next/server";
import { StartAuditInput } from "../../../lib/schemas";
import { dbHelpers } from "../../../lib/db";
import { addAuditJob } from "../../../lib/queue";

function ensureHttps(url: string): string {
  if (!url) return url;
  url = url.trim();
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = StartAuditInput.parse(body);

    const pageUrl = ensureHttps(validatedData.pageUrl);
    const email = validatedData.email === "" ? undefined : validatedData.email;
    const targetKeyword = validatedData.targetKeyword === "" ? undefined : validatedData.targetKeyword;

    const runId = crypto.randomUUID();
    await dbHelpers.createRun({ id: runId, pageUrl, targetKeyword, email, status: "queued" });

    await addAuditJob({ runId, pageUrl, targetKeyword, email });

    return NextResponse.json({ runId, status: "queued" });
  } catch (error) {
    console.error("Error starting audit:", error);
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }
}
