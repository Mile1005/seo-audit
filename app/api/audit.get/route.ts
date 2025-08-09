import { NextResponse } from "next/server";
import { getRunWithAudit } from "../../../lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const run = await getRunWithAudit(id);
  if (!run) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (run.status === "ready" && run.audit) {
    let result: any = null;
    try {
      result = JSON.parse(run.audit.json as unknown as string);
    } catch {
      result = run.audit.json;
    }
    return NextResponse.json({ status: run.status, result });
  }
  return NextResponse.json({ status: run.status });
}


