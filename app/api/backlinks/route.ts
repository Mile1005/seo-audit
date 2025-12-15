import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

// GET /api/backlinks - Get backlinks for a project with advanced filtering
export async function GET(request: NextRequest) {
  try {
    await requireUser(request);

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const status = searchParams.get("status");
    const domain = searchParams.get("domain");
    const toxic = searchParams.get("toxic");
    const linkType = searchParams.get("linkType");
    const minDomainRating = searchParams.get("minDomainRating");
    const maxDomainRating = searchParams.get("maxDomainRating");
    const sortBy = searchParams.get("sortBy") || "lastSeen";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = { projectId };

    if (status && status !== "all") {
      where.status = status;
    }

    if (domain) {
      where.sourceDomain = { contains: domain, mode: "insensitive" };
    }

    if (toxic === "true") {
      where.isToxic = true;
    } else if (toxic === "false") {
      where.isToxic = false;
    }

    if (linkType && linkType !== "all") {
      where.linkType = linkType;
    }

    if (minDomainRating || maxDomainRating) {
      where.domainRating = {};
      if (minDomainRating) where.domainRating.gte = parseInt(minDomainRating);
      if (maxDomainRating) where.domainRating.lte = parseInt(maxDomainRating);
    }

    // Get backlinks with pagination
    const [backlinks, total] = await Promise.all([
      prisma.backlink.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.backlink.count({ where }),
    ]);

    // Get comprehensive statistics
    const [statusStats, linkTypeStats, domainRatingStats, toxicCount, referringDomainsCount] =
      await Promise.all([
        prisma.backlink.groupBy({
          by: ["status"],
          where: { projectId },
          _count: { _all: true },
        }),
        prisma.backlink.groupBy({
          by: ["linkType"],
          where: { projectId },
          _count: { _all: true },
        }),
        prisma.backlink.aggregate({
          where: { projectId },
          _avg: { domainRating: true, pageRating: true },
          _max: { domainRating: true },
          _min: { domainRating: true },
        }),
        prisma.backlink.count({
          where: { projectId, isToxic: true },
        }),
        prisma.referringDomain.count({
          where: { projectId },
        }),
      ]);

    return NextResponse.json({
      backlinks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: {
        total,
        byStatus: statusStats.reduce(
          (acc, item) => {
            acc[item.status] = item._count._all;
            return acc;
          },
          {} as Record<string, number>
        ),
        byLinkType: linkTypeStats.reduce(
          (acc, item) => {
            acc[item.linkType] = item._count._all;
            return acc;
          },
          {} as Record<string, number>
        ),
        toxic: toxicCount,
        referringDomains: referringDomainsCount,
        domainRating: {
          average: domainRatingStats._avg.domainRating || 0,
          max: domainRatingStats._max.domainRating || 0,
          min: domainRatingStats._min.domainRating || 0,
        },
        pageRating: {
          average: domainRatingStats._avg.pageRating || 0,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching backlinks:", error);
    return NextResponse.json({ error: "Failed to fetch backlinks" }, { status: 500 });
  }
}

// POST /api/backlinks - Create or update backlinks (bulk operation)
export async function POST(request: NextRequest) {
  try {
    await requireUser(request);

    const body = await request.json();
    const { projectId, backlinks, source = "manual" } = body;

    if (!projectId || !Array.isArray(backlinks)) {
      return NextResponse.json(
        { error: "Project ID and backlinks array are required" },
        { status: 400 }
      );
    }

    const results = [];
    let newBacklinks = 0;
    let updatedBacklinks = 0;
    let errors = 0;

    for (const backlinkData of backlinks) {
      try {
        // Extract domain from source URL
        const sourceDomain = new URL(backlinkData.sourceUrl).hostname;

        // Upsert referring domain first
        await prisma.referringDomain.upsert({
          where: {
            projectId_domain: {
              domain: sourceDomain,
              projectId,
            },
          },
          update: {
            lastSeen: new Date(),
            domainRating: backlinkData.domainRating,
            pageRating: backlinkData.pageRating,
            traffic: backlinkData.traffic,
            category: backlinkData.category,
            language: backlinkData.language,
            country: backlinkData.country,
            isToxic: backlinkData.isToxic || false,
            toxicScore: backlinkData.toxicScore,
            trustFlow: backlinkData.trustFlow,
            citationFlow: backlinkData.citationFlow,
            status: backlinkData.domainStatus || "ACTIVE",
            backlinkCount: {
              increment: 1,
            },
          },
          create: {
            projectId,
            domain: sourceDomain,
            domainRating: backlinkData.domainRating,
            pageRating: backlinkData.pageRating,
            traffic: backlinkData.traffic,
            category: backlinkData.category,
            language: backlinkData.language,
            country: backlinkData.country,
            isToxic: backlinkData.isToxic || false,
            toxicScore: backlinkData.toxicScore,
            trustFlow: backlinkData.trustFlow,
            citationFlow: backlinkData.citationFlow,
            status: backlinkData.domainStatus || "ACTIVE",
            backlinkCount: 1,
            firstSeen: new Date(),
            lastSeen: new Date(),
          },
        });

        // Check if backlink exists
        const existingBacklink = await prisma.backlink.findUnique({
          where: {
            projectId_sourceUrl_targetUrl: {
              projectId,
              sourceUrl: backlinkData.sourceUrl,
              targetUrl: backlinkData.targetUrl,
            },
          },
        });

        // Upsert backlink
        const backlink = await prisma.backlink.upsert({
          where: {
            projectId_sourceUrl_targetUrl: {
              projectId,
              sourceUrl: backlinkData.sourceUrl,
              targetUrl: backlinkData.targetUrl,
            },
          },
          update: {
            lastSeen: new Date(),
            anchorText: backlinkData.anchorText,
            linkType: backlinkData.linkType || "FOLLOW",
            status: backlinkData.status || "ACTIVE",
            domainRating: backlinkData.domainRating,
            pageRating: backlinkData.pageRating,
            traffic: backlinkData.traffic,
            isToxic: backlinkData.isToxic || false,
            toxicScore: backlinkData.toxicScore,
            linkStrength: backlinkData.linkStrength || "NORMAL",
            context: backlinkData.context,
            altText: backlinkData.altText,
            isNofollow: backlinkData.isNofollow || false,
            isSponsored: backlinkData.isSponsored || false,
            isUGC: backlinkData.isUGC || false,
            httpStatus: backlinkData.httpStatus,
            lastChecked: new Date(),
          },
          create: {
            projectId,
            sourceUrl: backlinkData.sourceUrl,
            sourceDomain,
            targetUrl: backlinkData.targetUrl,
            anchorText: backlinkData.anchorText,
            linkType: backlinkData.linkType || "FOLLOW",
            status: backlinkData.status || "ACTIVE",
            domainRating: backlinkData.domainRating,
            pageRating: backlinkData.pageRating,
            traffic: backlinkData.traffic,
            isToxic: backlinkData.isToxic || false,
            toxicScore: backlinkData.toxicScore,
            linkStrength: backlinkData.linkStrength || "NORMAL",
            context: backlinkData.context,
            altText: backlinkData.altText,
            isNofollow: backlinkData.isNofollow || false,
            isSponsored: backlinkData.isSponsored || false,
            isUGC: backlinkData.isUGC || false,
            httpStatus: backlinkData.httpStatus,
            firstSeen: new Date(),
            lastSeen: new Date(),
            lastChecked: new Date(),
          },
        });

        if (existingBacklink) {
          updatedBacklinks++;
        } else {
          newBacklinks++;
        }

        results.push({ success: true, backlink });
      } catch (error) {
        console.error("Error processing backlink:", error);
        errors++;
        results.push({
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          sourceUrl: backlinkData.sourceUrl,
        });
      }
    }

    return NextResponse.json({
      message: "Backlinks processed",
      results,
      stats: {
        total: backlinks.length,
        new: newBacklinks,
        updated: updatedBacklinks,
        errors,
      },
    });
  } catch (error) {
    console.error("Error processing backlinks:", error);
    return NextResponse.json({ error: "Failed to process backlinks" }, { status: 500 });
  }
}

// PUT /api/backlinks - Update backlink status or mark as toxic
export async function PUT(request: NextRequest) {
  try {
    await requireUser(request);

    const body = await request.json();
    const { id, status, isToxic, toxicScore, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Backlink ID is required" }, { status: 400 });
    }

    const backlink = await prisma.backlink.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(isToxic !== undefined && { isToxic }),
        ...(toxicScore !== undefined && { toxicScore }),
        lastChecked: new Date(),
      },
    });

    return NextResponse.json({ backlink });
  } catch (error) {
    console.error("Error updating backlink:", error);
    return NextResponse.json({ error: "Failed to update backlink" }, { status: 500 });
  }
}

// DELETE /api/backlinks - Delete a backlink
export async function DELETE(request: NextRequest) {
  try {
    await requireUser(request);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Backlink ID is required" }, { status: 400 });
    }

    await prisma.backlink.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Backlink deleted successfully" });
  } catch (error) {
    console.error("Error deleting backlink:", error);
    return NextResponse.json({ error: "Failed to delete backlink" }, { status: 500 });
  }
}
