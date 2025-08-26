
import { miniCrawl, dbHelpers } from "@repo/shared/server";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const { startUrl, limit, sameHostOnly, maxDepth, timeout } = body;
  if (!startUrl) return new Response(JSON.stringify({ error: "Missing startUrl" }), { status: 400 });
  const crawlId = randomUUID();
  // Run crawl inline (no queue for demo)
  const result = await miniCrawl(startUrl, { limit, sameHostOnly, maxDepth, timeout });
  await dbHelpers.saveAudit({ id: crawlId, runId: crawlId, json: { type: "crawl", ...result } });
  return new Response(JSON.stringify({ crawlId, queued: false }), { status: 200 });
}
