import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const auditId = searchParams.get("auditId");
    if (!auditId) return NextResponse.json({ error: "auditId required" }, { status: 400 });
    const run = await (prisma as any).auditRun.findUnique({
      where: { id: auditId },
      select: { id: true, result: true, createdAt: true },
    });
    if (!run) return NextResponse.json({ error: "not found" }, { status: 404 });
    const r = run.result;
    const issues = r?.comprehensiveResults?.issues || [];
    const quick = r?.comprehensiveResults?.quick_wins || [];
    const rows: string[] = [];
    rows.push("type,title,description,severity,category,impact,effort,location");
    for (const i of issues) {
      rows.push(
        [
          "issue",
          i.title,
          i.description || "",
          i.severity || "",
          i.category || "",
          i.impact || "",
          i.effort || "",
          i.location || "",
        ]
          .map((v) => `"${(v || "").replace(/"/g, '""')}"`)
          .join(",")
      );
    }
    for (const q of quick) {
      rows.push(
        [
          "quick_win",
          q.title,
          q.description || "",
          "",
          q.category || "",
          q.impact || "",
          q.effort || "",
          q.location || "",
        ]
          .map((v) => `"${(v || "").replace(/"/g, '""')}"`)
          .join(",")
      );
    }
    const csv = rows.join("\n");
    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="audit-${auditId}.csv"`,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "failed" }, { status: 500 });
  }
}
