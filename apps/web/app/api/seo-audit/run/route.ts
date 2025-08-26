
import { dbHelpers, addAuditJob } from "@repo/shared";
import { StartAuditRequest, StartAuditResponse } from "@repo/shared/schemas";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const parse = StartAuditRequest.safeParse(body);
  if (!parse.success) {
    return new Response(JSON.stringify({ error: parse.error.flatten() }), { status: 400 });
  }
  const { pageUrl, targetKeyword, email } = parse.data;
  const runId = randomUUID();
  await dbHelpers.createRun({ id: runId, pageUrl, targetKeyword, email });
  // Queue audit job (async)
  await addAuditJob({ runId, pageUrl, targetKeyword, email });
  return new Response(JSON.stringify({ runId, status: "queued" }), { status: 200 });
}
