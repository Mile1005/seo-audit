
import { dbHelpers } from "@repo/shared";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const crawlId = searchParams.get("id");
  if (!crawlId) return new Response(JSON.stringify({ error: "Missing id" }), { status: 400 });
  const audit = await dbHelpers.getAuditByRunId(crawlId);
  if (!audit) return new Response(JSON.stringify({ status: "not_found" }), { status: 404 });
  return new Response(JSON.stringify({ status: "ready", result: audit.json }), { status: 200 });
}
