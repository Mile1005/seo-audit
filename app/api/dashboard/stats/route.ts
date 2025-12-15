import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

// Force dynamic rendering
export const dynamic = "force-dynamic";

/**
 * GET /api/dashboard/stats
 * Get dashboard statistics for the current user
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get user's projects count
    const projectsCount = await prisma.project.count({
      where: { ownerId: userId, status: "ACTIVE" },
    });

    // Get first project for stats
    const firstProject = await prisma.project.findFirst({
      where: { ownerId: userId, status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
    });

    let stats: any = {
      projects: {
        total: projectsCount,
        active: projectsCount,
      },
      keywords: {
        total: 0,
        tracked: 0,
        improved: 0,
        top10: 0,
      },
      backlinks: {
        total: 0,
        referring_domains: 0,
        new_this_month: 0,
      },
      audits: {
        total: 0,
        critical_issues: 0,
        warnings: 0,
        last_audit_date: null,
      },
      traffic: {
        organic_visitors: 0,
        change_percent: 0,
      },
      health_score: 0,
      search_visibility: 0,
    };

    if (firstProject) {
      // Keywords stats
      const keywordsCount = await prisma.keyword.count({
        where: { projectId: firstProject.id },
      });

      const keywordsImproved = await prisma.keyword.count({
        where: {
          projectId: firstProject.id,
          updatedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          },
        },
      });

      // Backlinks stats
      const backlinksCount = await prisma.backlink.count({
        where: { projectId: firstProject.id, status: "ACTIVE" },
      });

      const referringDomainsCount = await prisma.referringDomain.count({
        where: { projectId: firstProject.id, status: "ACTIVE" },
      });

      const newBacklinksThisMonth = await prisma.backlink.count({
        where: {
          projectId: firstProject.id,
          status: "ACTIVE",
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      });

      // Audits stats
      const auditsCount = await prisma.siteAudit.count({
        where: { projectId: firstProject.id },
      });

      const lastAudit = await prisma.siteAudit.findFirst({
        where: { projectId: firstProject.id },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          createdAt: true,
          overallScore: true,
          summary: true,
          status: true,
          url: true,
          completedAt: true,
          issues: {
            take: 5,
            orderBy: { severity: "desc" },
            select: {
              id: true,
              title: true,
              description: true,
              severity: true,
              type: true,
              fixed: true,
            },
          },
        },
      });

      // Calculate health score (from last audit or estimate)
      let healthScore = 75; // Default estimate
      let criticalIssues = 0;
      let warnings = 0;
      let latestAuditDetails = null;

      if (lastAudit) {
        healthScore = lastAudit.overallScore || healthScore;
        // Parse summary JSON if it contains issue counts
        if (lastAudit.summary && typeof lastAudit.summary === "object") {
          const summary = lastAudit.summary as any;
          criticalIssues = summary.criticalIssues || summary.errors || 0;
          warnings = summary.warnings || 0;

          // Extract comprehensive results for display
          latestAuditDetails = {
            id: lastAudit.id,
            url: lastAudit.url,
            score: lastAudit.overallScore,
            completedAt: lastAudit.completedAt || lastAudit.createdAt,
            status: lastAudit.status,
            topIssues: lastAudit.issues,
            quickWins: summary.quickWins || 0,
            totalIssues: summary.totalIssues || 0,
            pageData: summary.pageData || null,
            recommendations: summary.recommendations || [],
          };
        }
      }

      // Estimate search visibility (simplified calculation)
      const searchVisibility =
        keywordsCount > 0 ? Math.min(100, (keywordsCount / 100) * 10).toFixed(1) : 0;

      stats = {
        projects: {
          total: projectsCount,
          active: projectsCount,
        },
        keywords: {
          total: keywordsCount,
          tracked: keywordsCount,
          improved: keywordsImproved,
          top10: Math.floor(keywordsCount * 0.15), // Estimate 15% in top 10
        },
        backlinks: {
          total: backlinksCount,
          referring_domains: referringDomainsCount,
          new_this_month: newBacklinksThisMonth,
        },
        audits: {
          total: auditsCount,
          critical_issues: criticalIssues,
          warnings: warnings,
          last_audit_date: lastAudit?.createdAt || null,
          latest: latestAuditDetails,
        },
        traffic: {
          organic_visitors: Math.floor(keywordsCount * 35), // Rough estimate
          change_percent: 8.5, // Could be calculated from historical data
        },
        health_score: healthScore,
        search_visibility: parseFloat(searchVisibility as string),
      };
    }

    // Get recent activity
    const recentAudits = await prisma.siteAudit.findMany({
      where: firstProject ? { projectId: firstProject.id } : {},
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        overallScore: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      stats,
      recentActivity: {
        audits: recentAudits,
      },
      hasProjects: projectsCount > 0,
      projectId: firstProject?.id || null,
    });
  } catch (error) {
    console.error("❌ Error fetching dashboard stats:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch dashboard statistics",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
