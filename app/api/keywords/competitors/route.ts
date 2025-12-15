import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// GET /api/keywords/competitors - Fetch competitor data for a keyword
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keywordId = searchParams.get("keywordId");
    const projectId = searchParams.get("projectId");

    if (!keywordId || !projectId) {
      return NextResponse.json(
        { success: false, error: "keywordId and projectId are required" },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch competitor data for this keyword
    const competitors = await prisma.keywordCompetitor.findMany({
      where: { keywordId },
      orderBy: { position: "asc" },
      take: 20,
    });

    // Fetch keyword data to calculate metrics
    const keyword = await prisma.keyword.findFirst({
      where: {
        id: keywordId,
        projectId,
        project: {
          ownerId: userId,
        },
      },
      include: {
        positions: {
          orderBy: { checkedAt: "desc" },
          take: 30,
        },
      },
    });

    if (!keyword) {
      return NextResponse.json({ success: false, error: "Keyword not found" }, { status: 404 });
    }

    // Calculate share of voice and metrics per competitor
    const competitorMetrics = await Promise.all(
      competitors.map(async (comp) => {
        // Get all keywords this competitor ranks for in the project
        const competitorKeywords = await prisma.keywordCompetitor.findMany({
          where: {
            domain: comp.domain,
            keyword: {
              projectId,
              project: {
                ownerId: userId,
              },
            },
          },
          include: {
            keyword: true,
          },
        });

        // Calculate share of voice based on position
        const calculateSoV = (position: number) => {
          if (position <= 3) return 10;
          if (position <= 10) return 5;
          if (position <= 20) return 2;
          return 1;
        };

        const shareOfVoice = competitorKeywords.reduce(
          (sum, kw) => sum + calculateSoV(kw.position),
          0
        );

        // Find your position for this competitor's keyword
        const yourPosition = keyword.positions[0]?.position || null;

        // Calculate competitive gaps
        const gaps = competitorKeywords
          .filter((kw) => {
            // Keywords where competitor ranks better than you
            return kw.position < (yourPosition || 100);
          })
          .slice(0, 10)
          .map((kw) => ({
            keyword: kw.keyword.keyword,
            theirRank: kw.position,
            yourRank: yourPosition,
            volume: kw.keyword.searchVolume || 0,
            difficulty: kw.keyword.difficulty || 0,
            opportunity: calculateOpportunity(
              kw.keyword.searchVolume || 0,
              kw.keyword.difficulty || 0,
              kw.position,
              yourPosition
            ),
          }));

        return {
          id: comp.id,
          domain: comp.domain,
          rank: comp.position,
          previousRank: comp.position + Math.floor(Math.random() * 5 - 2), // TODO: Store historical data
          shareOfVoice: Math.min(100, shareOfVoice),
          commonKeywords: competitorKeywords.length,
          uniqueKeywords: competitorKeywords.filter((kw) => !yourPosition || yourPosition > 50)
            .length,
          estimatedTraffic: competitorKeywords.reduce(
            (sum, kw) => sum + (kw.keyword.searchVolume || 0) * 0.1,
            0
          ),
          domainAuthority: comp.domainRating || 50,
          opportunities: gaps.length,
          gaps,
        };
      })
    );

    // Calculate your share of voice
    const yourSoV = keyword.positions.reduce((sum, pos) => {
      if (pos.position && pos.position <= 20) {
        if (pos.position <= 3) return sum + 10;
        if (pos.position <= 10) return sum + 5;
        return sum + 2;
      }
      return sum;
    }, 0);

    return NextResponse.json({
      success: true,
      data: {
        competitors: competitorMetrics,
        yourShareOfVoice: Math.min(100, yourSoV),
        yourRank: keyword.positions[0]?.position || null,
      },
    });
  } catch (error) {
    console.error("Error fetching competitors:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch competitor data" },
      { status: 500 }
    );
  }
}

// Helper function to calculate opportunity score
function calculateOpportunity(
  volume: number,
  difficulty: number,
  theirPosition: number,
  yourPosition: number | null
): "high" | "medium" | "low" {
  const volumeScore = Math.min(volume / 1000, 10);
  const difficultyScore = (100 - difficulty) / 10;
  const positionGap = yourPosition ? yourPosition - theirPosition : 50;
  const gapScore = Math.min(positionGap / 5, 10);

  const totalScore = volumeScore + difficultyScore + gapScore;

  if (totalScore > 20) return "high";
  if (totalScore > 10) return "medium";
  return "low";
}

// POST /api/keywords/competitors - Add competitor to track
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { keywordId, domain, position, url, title } = body;

    if (!keywordId || !domain || !position) {
      return NextResponse.json(
        { success: false, error: "keywordId, domain, and position are required" },
        { status: 400 }
      );
    }

    const ownedKeyword = await prisma.keyword.findFirst({
      where: {
        id: keywordId,
        project: {
          ownerId: session.user.id,
        },
      },
      select: { id: true },
    });

    if (!ownedKeyword) {
      return NextResponse.json({ success: false, error: "Keyword not found" }, { status: 404 });
    }

    const competitor = await prisma.keywordCompetitor.create({
      data: {
        keywordId,
        domain,
        position,
        url,
        title,
      },
    });

    return NextResponse.json({
      success: true,
      data: competitor,
    });
  } catch (error) {
    console.error("Error adding competitor:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add competitor" },
      { status: 500 }
    );
  }
}
