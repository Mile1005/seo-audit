import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

// GET /api/backlinks/domains - Get referring domains for a project
export async function GET(request: NextRequest) {
  try {
    await requireUser(request);

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const toxic = searchParams.get("toxic");
    const category = searchParams.get("category");
    const minDomainRating = searchParams.get("minDomainRating");
    const maxDomainRating = searchParams.get("maxDomainRating");
    const sortBy = searchParams.get("sortBy") || "domainRating";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = { projectId };

    if (toxic === "true") {
      where.isToxic = true;
    } else if (toxic === "false") {
      where.isToxic = false;
    }

    if (category) {
      where.category = { contains: category, mode: "insensitive" };
    }

    if (minDomainRating || maxDomainRating) {
      where.domainRating = {};
      if (minDomainRating) where.domainRating.gte = parseInt(minDomainRating);
      if (maxDomainRating) where.domainRating.lte = parseInt(maxDomainRating);
    }

    // Get referring domains with pagination
    const [domains, total] = await Promise.all([
      prisma.referringDomain.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.referringDomain.count({ where }),
    ]);

    // Get additional stats
    const [categoryStats, domainRatingDistribution, totalBacklinks] = await Promise.all([
      prisma.referringDomain.groupBy({
        by: ["category"],
        where: { projectId },
        _count: true,
      }),
      prisma.referringDomain.groupBy({
        by: ["domainRating"],
        where: { projectId, domainRating: { not: null } },
        _count: true,
        orderBy: { domainRating: "asc" },
      }),
      prisma.referringDomain.aggregate({
        where: { projectId },
        _sum: { backlinkCount: true },
      }),
    ]);

    return NextResponse.json({
      domains,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: {
        totalDomains: total,
        totalBacklinks: totalBacklinks._sum.backlinkCount || 0,
        categories: categoryStats.map((stat) => ({
          category: stat.category || "Uncategorized",
          count: stat._count,
        })),
        domainRatingDistribution: domainRatingDistribution.map((stat) => ({
          rating: stat.domainRating,
          count: stat._count,
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching referring domains:", error);
    return NextResponse.json({ error: "Failed to fetch referring domains" }, { status: 500 });
  }
}

// POST /api/backlinks/domains - Create or update referring domains
export async function POST(request: NextRequest) {
  try {
    await requireUser(request);

    const body = await request.json();
    const { projectId, domains } = body;

    if (!projectId || !Array.isArray(domains)) {
      return NextResponse.json(
        { error: "Project ID and domains array are required" },
        { status: 400 }
      );
    }

    const results = [];

    for (const domainData of domains) {
      try {
        const domain = await prisma.referringDomain.upsert({
          where: {
            projectId_domain: {
              projectId,
              domain: domainData.domain,
            },
          },
          update: {
            domainRating: domainData.domainRating,
            traffic: domainData.traffic,
            category: domainData.category,
            language: domainData.language,
            country: domainData.country,
            isToxic: domainData.isToxic || false,
            toxicScore: domainData.toxicScore,
            trustFlow: domainData.trustFlow,
            citationFlow: domainData.citationFlow,
            emailContacts: domainData.emailContacts,
            socialProfiles: domainData.socialProfiles,
            technologies: domainData.technologies,
            lastSeen: new Date(),
            lastChecked: new Date(),
          },
          create: {
            projectId,
            domain: domainData.domain,
            domainRating: domainData.domainRating,
            traffic: domainData.traffic,
            category: domainData.category,
            language: domainData.language,
            country: domainData.country,
            isToxic: domainData.isToxic || false,
            toxicScore: domainData.toxicScore,
            trustFlow: domainData.trustFlow,
            citationFlow: domainData.citationFlow,
            emailContacts: domainData.emailContacts,
            socialProfiles: domainData.socialProfiles,
            technologies: domainData.technologies,
            firstSeen: new Date(),
            lastSeen: new Date(),
            lastChecked: new Date(),
          },
        });

        results.push({ success: true, domain });
      } catch (error) {
        console.error("Error processing domain:", error);
        results.push({
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          domain: domainData.domain,
        });
      }
    }

    return NextResponse.json({
      message: "Referring domains processed",
      results,
      successCount: results.filter((r) => r.success).length,
      errorCount: results.filter((r) => !r.success).length,
    });
  } catch (error) {
    console.error("Error processing referring domains:", error);
    return NextResponse.json({ error: "Failed to process referring domains" }, { status: 500 });
  }
}
