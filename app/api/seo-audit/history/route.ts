import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url") || undefined;
    if ((prisma as any).auditRun === undefined) {
      return NextResponse.json({ items: [], url });
    }
    const where = url ? { url } : {};
    const rows = await (prisma as any).auditRun.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        url: true,
        status: true,
        score: true,
        error: true,
        createdAt: true,
        completedAt: true,
        result: true,
      },
    });
    const items = rows.map((r: any) => {
      const scores = r.result?.comprehensiveResults?.scores || r.result?.scores || null;
      return {
        id: r.id,
        url: r.url,
        status: r.status,
        score: r.score ?? scores?.overall ?? null,
        scores: scores
          ? {
              overall: scores.overall,
              performance: scores.performance,
              accessibility: scores.accessibility,
              seo: scores.seo,
              best_practices: scores.best_practices,
            }
          : null,
        createdAt: r.createdAt,
        completedAt: r.completedAt,
        error: r.error || null,
      };
    });
    return NextResponse.json({ url, items });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "history fetch failed" }, { status: 500 });
  }
}
