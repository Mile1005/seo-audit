import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";

export async function GET() {
  const runs = await prisma.run.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    select: { id: true, status: true, pageUrl: true, createdAt: true }
  });
  return NextResponse.json({ runs });
}


