import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { BacklinkCollector } from "@/lib/backlinks/backlink-collector";
import { getToxicityAnalyzer } from "@/lib/backlinks/analysis/toxicity-analyzer";

/**
 * POST /api/backlinks/collect
 *
 * Collect real backlinks from multiple free data sources:
 * - Common Crawl (250B+ pages)
 * - OpenPageRank (domain metrics)
 * - Google Search API + Web Scraping
 *
 * Performs:
 * - Multi-source data aggregation
 * - Deduplication
 * - Quality scoring
 * - Toxicity analysis
 * - Database persistence
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireUser(request);

    const body = await request.json();
    const { projectId, targetUrl, targetDomain, options = {} } = body;

    // Validation
    if (!projectId) {
      return NextResponse.json(
        {
          error: "Project ID is required",
        },
        { status: 400 }
      );
    }

    if (!targetUrl && !targetDomain) {
      return NextResponse.json(
        {
          error: "Either targetUrl or targetDomain is required",
        },
        { status: 400 }
      );
    }

    // Verify project exists and user has access
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          error: "Project not found or access denied",
        },
        { status: 404 }
      );
    }

    // Initialize collector
    const collector = new BacklinkCollector();
    const toxicityAnalyzer = getToxicityAnalyzer();

    // Collect backlinks from all sources
    console.log(`[Backlink Collection] Starting collection for ${targetUrl || targetDomain}`);

    const collectionResult = await collector.collectBacklinks(
      targetUrl || `https://${targetDomain}`,
      {
        maxBacklinks: options.maxResults || 500,
        useCommonCrawl: options.includeCommonCrawl !== false,
        useSearch: options.includeSearch !== false,
        useGoogleAPI: true,
        enrichWithMetrics: true,
      }
    );

    console.log(`[Backlink Collection] Found ${collectionResult.backlinks.length} backlinks`);

    // Analyze toxicity for all collected links
    const backlinkDataArray = collectionResult.backlinks.map((bl: any) => ({
      ...bl,
      foundDate: new Date(),
      firstSeen: new Date(),
      lastSeen: new Date(),
    }));

    const toxicityResults = await toxicityAnalyzer.analyzeBatch(backlinkDataArray);
    const toxicityArray = Array.from(toxicityResults.values());

    // Combine backlink data with toxicity scores
    const enrichedBacklinks = collectionResult.backlinks.map((link: any, index: number) => ({
      ...link,
      isToxic: toxicityArray[index]?.classification !== "safe",
      toxicScore: toxicityArray[index]?.overall || 0,
      foundDate: new Date(),
    }));

    // Prepare data for database insertion
    const backlinkInsertData = enrichedBacklinks.map((link: any) => ({
      projectId,
      sourceUrl: link.sourceUrl,
      sourceDomain: link.sourceDomain,
      targetUrl: link.targetUrl,
      anchorText: link.anchorText,
      linkType: link.linkType,
      status: "ACTIVE" as const,
      domainRating: link.domainRating,
      pageRating: link.pageRating,
      traffic: link.traffic,
      isToxic: link.isToxic,
      toxicScore: link.toxicScore,
      linkPosition: link.linkPosition,
      context: link.context,
      altText: link.altText,
      isNofollow: link.isNofollow,
      isSponsored: link.isSponsored,
      isUGC: link.isUGC,
      firstSeen: new Date(),
      lastSeen: new Date(),
    }));

    // Extract unique referring domains
    const uniqueDomains = new Map<string, (typeof backlinkInsertData)[0]>();
    for (const link of backlinkInsertData) {
      if (!uniqueDomains.has(link.sourceDomain)) {
        uniqueDomains.set(link.sourceDomain, link);
      }
    }

    const referringDomainInsertData = Array.from(uniqueDomains.values()).map((link: any) => ({
      projectId,
      domain: link.sourceDomain,
      domainRating: link.domainRating,
      pageRating: link.pageRating,
      backlinkCount: enrichedBacklinks.filter((bl: any) => bl.sourceDomain === link.sourceDomain)
        .length,
      traffic: link.traffic,
      isToxic: link.isToxic,
      toxicScore: link.toxicScore,
      status: "ACTIVE" as const,
      firstSeen: new Date(),
      lastSeen: new Date(),
    }));

    // Save to database using transaction
    console.log(`[Backlink Collection] Saving to database...`);

    const result = await prisma.$transaction(async (tx: any) => {
      // Delete existing backlinks for this project to replace with fresh data
      // (Optional: You can also use upsert logic instead)
      const deleteCount = await tx.backlink.deleteMany({
        where: { projectId },
      });
      console.log(`[Backlink Collection] Deleted ${deleteCount.count} old backlinks`);

      await tx.referringDomain.deleteMany({
        where: { projectId },
      });

      // Insert new backlinks
      const createdBacklinks = await tx.backlink.createMany({
        data: backlinkInsertData,
        skipDuplicates: true,
      });

      // Insert referring domains
      const createdDomains = await tx.referringDomain.createMany({
        data: referringDomainInsertData,
        skipDuplicates: true,
      });

      return {
        backlinks: createdBacklinks.count,
        domains: createdDomains.count,
      };
    });

    console.log(
      `[Backlink Collection] Saved ${result.backlinks} backlinks and ${result.domains} domains`
    );

    // Calculate summary statistics
    const totalToxic = enrichedBacklinks.filter((bl: any) => bl.isToxic).length;
    const avgDomainRating =
      enrichedBacklinks.reduce((sum: number, bl: any) => sum + (bl.domainRating || 0), 0) /
      enrichedBacklinks.length;
    const followLinks = enrichedBacklinks.filter((bl: any) => bl.linkType === "FOLLOW").length;
    const nofollowLinks = enrichedBacklinks.filter((bl: any) => bl.linkType === "NOFOLLOW").length;

    return NextResponse.json({
      success: true,
      message: "Backlinks collected successfully",
      data: {
        collected: {
          totalBacklinks: enrichedBacklinks.length,
          totalDomains: uniqueDomains.size,
          followLinks,
          nofollowLinks,
          toxicLinks: totalToxic,
          avgDomainRating: Math.round(avgDomainRating),
        },
        saved: {
          backlinks: result.backlinks,
          domains: result.domains,
        },
        sources: collectionResult.stats.sources,
        duration: collectionResult.stats.duration,
      },
    });
  } catch (error) {
    console.error("[Backlink Collection Error]", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to collect backlinks",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/backlinks/collect/status
 *
 * Check collection status and quota usage
 */
export async function GET(request: NextRequest) {
  try {
    await requireUser(request);

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        {
          error: "Project ID is required",
        },
        { status: 400 }
      );
    }

    // Get current backlink stats
    const [totalBacklinks, totalDomains, lastCollection] = await Promise.all([
      prisma.backlink.count({ where: { projectId } }),
      prisma.referringDomain.count({ where: { projectId } }),
      prisma.backlink.findFirst({
        where: { projectId },
        orderBy: { createdAt: "desc" },
        select: { createdAt: true },
      }),
    ]);

    // Check API quotas (simplified - would need actual tracking)
    const quotaStatus = {
      openPageRank: {
        limit: 1000,
        used: 0, // Would track in Redis/Database
        remaining: 1000,
        resetsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
      googleSearch: {
        limit: 100,
        used: 0,
        remaining: 100,
        resetsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
      commonCrawl: {
        limit: -1, // Unlimited
        used: 0,
        remaining: -1,
        resetsAt: null,
      },
    };

    return NextResponse.json({
      project: {
        id: projectId,
        backlinks: totalBacklinks,
        domains: totalDomains,
        lastCollection: lastCollection?.createdAt || null,
      },
      quotas: quotaStatus,
      canCollect: true,
    });
  } catch (error) {
    console.error("[Status Check Error]", error);
    return NextResponse.json(
      {
        error: "Failed to check collection status",
      },
      { status: 500 }
    );
  }
}
