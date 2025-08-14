import { NextResponse } from "next/server";
import { dbHelpers } from "../../../../lib/db";

export async function GET() {
  const runs = await dbHelpers.getRecentRuns();
  return NextResponse.json({ runs });
}
