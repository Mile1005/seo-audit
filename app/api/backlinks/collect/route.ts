import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { auth } from "@/auth";
import { discoverBacklinks } from "@/lib/backlinks/discovery";
import { enrichWithMetrics } from "@/lib/backlinks/enrichment";
import { calculateAvgDR } from "@/lib/backlinks/utils";
import { createUserNotification } from "@/lib/server/notifications";

/**
 * POST /api/backlinks/collect
 *
 * Collect real backlinks from multiple free data sources:
 * - Common Crawl (250B+ pages, unlimited FREE)
 * - Google Custom Search (100/day FREE)
 * - SerpAPI (100/month FREE)
 * - OpenPageRank for domain metrics (1,000/day FREE)
 *
 * Features:
 * - Rate limiting: 4 checks per day per project
 * - Caching: 7-day cache for backlink results
 * - Domain metrics cached for 30 days
 */
export async function POST(request: NextRequest) {
  try {
    console.log("[API] Starting backlink collection...");

    const session = await auth();
    const sessionUserId = session?.user?.id;
    const headerUser = await requireUser(request);
    const notifyUserId = sessionUserId || headerUser?.id || null;

    const body = await request.json();
    const { projectId } = body;

    // Validation
    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    // 1. Validate project exists and get domain
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true, domain: true },
    });

    if (!project || !project.domain) {
      return NextResponse.json(
        { error: "Project not found or has no domain" },
        { status: 404 }
      );
    }

    const domain = project.domain;
    console.log(`[API] Collecting backlinks for domain: ${domain}`);

    // 2. Check rate limit (4 checks per day per project)
    const maxChecks = parseInt(process.env.MAX_BACKLINK_CHECKS_PER_DAY || "4", 10);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checksToday = await prisma.backlinkCheck.count({
      where: {
        projectId,
        createdAt: { gte: today },
      },
    });

    if (checksToday >= maxChecks) {
      console.log(`[API] Rate limit reached: ${checksToday}/${maxChecks}`);
      return NextResponse.json(
        {
          error: "Daily limit reached",
          message: `You can check backlinks ${maxChecks} times per day. Limit resets at midnight.`,
          checksUsed: checksToday,
          checksRemaining: 0,
        },
        { status: 429 }
      );
    }

    // 3. Check for cached results (within BACKLINK_CACHE_DAYS days)
    const cacheDays = parseInt(process.env.BACKLINK_CACHE_DAYS || "7", 10);
    const cacheExpiry = new Date(Date.now() - cacheDays * 24 * 60 * 60 * 1000);

    const cachedCheck = await prisma.backlinkCheck.findFirst({
      where: {
        projectId,
        createdAt: { gte: cacheExpiry },
        status: "COMPLETED",
      },
      include: {
        backlinks: {
          orderBy: { domainRating: "desc" },
          take: 100,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (cachedCheck && cachedCheck.backlinks.length > 0) {
      const cacheAge = Date.now() - cachedCheck.createdAt.getTime();
      const cacheAgeDays = Math.floor(cacheAge / (1000 * 60 * 60 * 24));

      console.log(`[API] Returning cached data (${cacheAgeDays} days old)`);

      await createUserNotification({
        userId: notifyUserId,
        type: "NEW_BACKLINK",
        title: "Backlink check completed",
        message: `Found ${cachedCheck.totalBacklinks} backlinks from ${cachedCheck.uniqueDomains} domains for ${domain}.`,
        data: {
          projectId,
          backlinkCheckId: cachedCheck.id,
          domain,
          cached: true,
          href: `/dashboard/backlinks?projectId=${encodeURIComponent(projectId)}`,
        },
      });

      return NextResponse.json({
        success: true,
        cached: true,
        cacheAge: cacheAgeDays,
        data: {
          backlinks: cachedCheck.backlinks,
          stats: {
            totalBacklinks: cachedCheck.totalBacklinks,
            uniqueDomains: cachedCheck.uniqueDomains,
            avgDomainRating: cachedCheck.avgDomainRating,
            checksUsed: checksToday,
            checksRemaining: maxChecks - checksToday,
          },
        },
      });
    }

    // 4. Discover new backlinks
    console.log("[API] No cache found, discovering new backlinks...");
    const rawBacklinks = await discoverBacklinks(domain, { maxResults: 100 });

    if (rawBacklinks.length === 0) {
      // Still create a check record so we don't hammer APIs on retry
      const emptyCheck = await prisma.backlinkCheck.create({
        data: {
          projectId,
          totalBacklinks: 0,
          uniqueDomains: 0,
          avgDomainRating: 0,
          status: "COMPLETED",
          message: "No backlinks found",
          completedAt: new Date(),
        },
      });

      await createUserNotification({
        userId: notifyUserId,
        type: "NEW_BACKLINK",
        title: "Backlink check completed",
        message: `No backlinks found for ${domain}.`,
        data: {
          projectId,
          backlinkCheckId: emptyCheck.id,
          domain,
          href: `/dashboard/backlinks?projectId=${encodeURIComponent(projectId)}`,
        },
      });

      return NextResponse.json({
        success: true,
        cached: false,
        data: {
          backlinks: [],
          stats: {
            totalBacklinks: 0,
            uniqueDomains: 0,
            avgDomainRating: 0,
            checksUsed: checksToday + 1,
            checksRemaining: maxChecks - (checksToday + 1),
          },
        },
        message: "No backlinks found for this domain",
      });
    }

    // 5. Enrich with domain metrics (uses 30-day cache)
    console.log("[API] Enriching backlinks with metrics...");
    const enrichedBacklinks = await enrichWithMetrics(rawBacklinks);

    // 6. Calculate stats
    const uniqueDomains = new Set(enrichedBacklinks.map((bl) => bl.sourceDomain)).size;
    const avgDR = calculateAvgDR(enrichedBacklinks);

    // 7. Save to database with BacklinkCheck for caching
    console.log("[API] Saving to database...");

    const backlinkCheck = await prisma.backlinkCheck.create({
      data: {
        projectId,
        totalBacklinks: enrichedBacklinks.length,
        uniqueDomains,
        avgDomainRating: avgDR,
        status: "COMPLETED",
        completedAt: new Date(),
        backlinks: {
          create: enrichedBacklinks.map((bl) => ({
            projectId,
            sourceUrl: bl.sourceUrl,
            sourceDomain: bl.sourceDomain,
            targetUrl: bl.targetUrl,
            anchorText: bl.anchorText || null,
            domainRating: bl.domainRating,
            pageRating: bl.domainRating, // Use DR as page rating fallback
            linkType: bl.linkType,
            status: bl.status,
            traffic: 0,
            isToxic: false,
            toxicScore: 0,
            linkStrength:
              bl.domainRating > 70
                ? "VERY_STRONG"
                : bl.domainRating > 50
                  ? "STRONG"
                  : bl.domainRating > 30
                    ? "NORMAL"
                    : "WEAK",
            firstSeen: new Date(),
            lastSeen: new Date(),
            lastChecked: new Date(),
          })),
        },
      },
      include: {
        backlinks: {
          orderBy: { domainRating: "desc" },
        },
      },
    });

    console.log(`[API] Successfully saved ${backlinkCheck.backlinks.length} backlinks`);

    await createUserNotification({
      userId: notifyUserId,
      type: "NEW_BACKLINK",
      title: "Backlink check completed",
      message: `Found ${backlinkCheck.totalBacklinks} backlinks from ${backlinkCheck.uniqueDomains} domains for ${domain}.`,
      data: {
        projectId,
        backlinkCheckId: backlinkCheck.id,
        domain,
        href: `/dashboard/backlinks?projectId=${encodeURIComponent(projectId)}`,
      },
    });

    // 8. Return success response
    return NextResponse.json({
      success: true,
      cached: false,
      data: {
        backlinks: backlinkCheck.backlinks,
        stats: {
          totalBacklinks: backlinkCheck.totalBacklinks,
          uniqueDomains: backlinkCheck.uniqueDomains,
          avgDomainRating: backlinkCheck.avgDomainRating,
          checksUsed: checksToday + 1,
          checksRemaining: maxChecks - (checksToday + 1),
        },
      },
    });
  } catch (error) {
    console.error("[API] Collection error:", error);

    return NextResponse.json(
      {
        error: "Failed to collect backlinks",
        message: error instanceof Error ? error.message : "Unknown error",
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
