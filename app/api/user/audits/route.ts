import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { dbHelpers } from "../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const offset = parseInt(url.searchParams.get("offset") || "0");

    // Get user's audit runs
    const prisma = await dbHelpers.getPrisma();
    const [runs, total] = await Promise.all([
      prisma.run.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
        select: {
          id: true,
          pageUrl: true,
          status: true,
          createdAt: true,
          audits: {
            select: { id: true },
            take: 1,
          },
        },
      }),
      prisma.run.count({ where: { userId } }),
    ]);

    // Transform the data to include hasResults flag
    const transformedRuns = runs.map((run: any) => ({
      id: run.id,
      pageUrl: run.pageUrl,
      status: run.status,
      createdAt: run.createdAt,
      hasResults: run.audits.length > 0,
    }));

    return NextResponse.json({
      runs: transformedRuns,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching user audits:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}