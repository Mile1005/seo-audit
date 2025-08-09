import { NextResponse } from "next/server";
import { prisma, saveAudit } from "../../../../lib/db";
import { fetchHtml } from "../../../../lib/scrape";
import { parseHtml } from "../../../../lib/parse";
import { calculateAudit } from "../../../../lib/heuristics";
import { fetchGscInsightsForUrl } from "../../../../lib/gsc";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const run = id
      ? await prisma.run.findUnique({ where: { id } })
      : await prisma.run.findFirst({ where: { status: "queued" }, orderBy: { createdAt: "asc" } });
    if (!run) return NextResponse.json({ error: "No run found" }, { status: 404 });

    await prisma.run.update({ where: { id: run.id }, data: { status: "running" } });

    const html = await fetchHtml(run.pageUrl);
    const parsed = parseHtml(html, run.pageUrl);
    const base = calculateAudit(run.pageUrl, parsed as any, { keyword: run.targetKeyword || undefined });
    let gsc = { available: false, top_queries: [], ctr: null, impressions: null, clicks: null } as any;
    try { gsc = await fetchGscInsightsForUrl(run.pageUrl); } catch {}
    const result = { ...base, gsc_insights: gsc };

    await saveAudit(run.id, result);
    await prisma.run.update({ where: { id: run.id }, data: { status: "ready" } });
    return NextResponse.json({ ok: true, id: run.id, result });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}


