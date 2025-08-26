
import { dbHelpers } from "@repo/shared";
import { GetAuditResponse } from "@repo/shared/schemas";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const runId = searchParams.get("id");
  if (!runId) return new Response(JSON.stringify({ error: "Missing id" }), { status: 400 });
  const run = await dbHelpers.getRunWithAudit(runId);
  if (!run) return new Response(JSON.stringify({ status: "queued" }), { status: 200 });
  if (!run.audit) return new Response(JSON.stringify({ status: run.status }), { status: 200 });
  // Validate audit result shape if needed
  const result = run.audit.json;
  return new Response(JSON.stringify({ status: run.status, result }), { status: 200 });
}
