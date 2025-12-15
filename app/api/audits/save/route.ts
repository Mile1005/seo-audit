import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuditResultUnified } from "@/lib/types/audit";
import { getLocaleFromHeaders, translateNotification } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

/**
 * POST /api/audits/save
 * Save audit results to database (SiteAudit table)
 * Links audit to project via domain lookup
 */
export async function POST(req: NextRequest) {
  try {
    const locale = getLocaleFromHeaders(req.headers as any);
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const auditResult: AuditResultUnified = body.auditResult;

    if (!auditResult || !auditResult.url) {
      return NextResponse.json(
        { success: false, error: "Invalid audit result data" },
        { status: 400 }
      );
    }

    // Extract domain from URL
    const urlObj = new URL(auditResult.url);
    const domain = urlObj.hostname.replace(/^www\./, "");

    // Find project by domain for the current user
    let project = await prisma.project.findFirst({
      where: {
        domain: {
          contains: domain,
        },
        ownerId: session.user.id,
      },
    });

    // If no project found, create one automatically
    if (!project) {
      project = await prisma.project.create({
        data: {
          name: domain,
          domain: auditResult.url,
          ownerId: session.user.id,
          status: "ACTIVE",
        },
      });
    }

    // Prepare summary data
    const summary = {
      totalIssues: auditResult.comprehensiveResults?.issues?.length || 0,
      criticalIssues:
        auditResult.comprehensiveResults?.issues?.filter((i) => i.severity === "high")?.length || 0,
      warningIssues:
        auditResult.comprehensiveResults?.issues?.filter((i) => i.severity === "medium")?.length ||
        0,
      infoIssues:
        auditResult.comprehensiveResults?.issues?.filter((i) => i.severity === "low")?.length || 0,
      quickWins: auditResult.comprehensiveResults?.quick_wins?.length || 0,
      pageData: auditResult.pageData,
      comprehensiveResults: auditResult.comprehensiveResults,
      recommendations: auditResult.recommendations,
    };

    // Create SiteAudit record
    const siteAudit = await prisma.siteAudit.create({
      data: {
        projectId: project.id,
        createdBy: session.user.id,
        url: auditResult.url,
        status: "COMPLETED",
        overallScore: auditResult.score || 0,
        summary: summary as any, // JSON field accepts any structure
        completedAt: new Date(auditResult.timestamp),
      },
    });

    // Create AuditIssue records for each issue
    const issues = auditResult.comprehensiveResults?.issues || [];
    if (issues.length > 0) {
      const issueData = issues.map((issue) => {
        const issueType = [
          "TECHNICAL",
          "CONTENT",
          "PERFORMANCE",
          "ACCESSIBILITY",
          "SECURITY",
        ].includes(issue.category?.toUpperCase() || "")
          ? issue.category?.toUpperCase()
          : "TECHNICAL";
        const severity =
          issue.severity === "high" ? "CRITICAL" : issue.severity === "medium" ? "HIGH" : "MEDIUM";

        return {
          auditId: siteAudit.id,
          type: issueType as any,
          severity: severity as any,
          title: issue.title,
          description: issue.description,
          element: issue.selector,
          page: issue.location,
          count: 1,
        };
      });

      await prisma.auditIssue.createMany({
        data: issueData as any,
      });
    }

    // Create notification for completed audit
    try {
      const notif = await translateNotification("audit_complete", locale, {
        domain,
        score: auditResult.score ?? 0,
      });
      await (prisma as any).notification.create({
        data: {
          userId: session.user.id,
          type: "AUDIT_COMPLETED",
          title: notif.title,
          message: notif.message,
          data: {
            projectId: project.id,
            auditId: siteAudit.id,
            score: auditResult.score,
            issues: summary.totalIssues,
          },
        },
      });
    } catch (notificationError) {
      console.warn("Failed to create notification:", notificationError);
      // Non-fatal, continue
    }

    return NextResponse.json({
      success: true,
      data: {
        auditId: siteAudit.id,
        projectId: project.id,
        score: auditResult.score,
        totalIssues: summary.totalIssues,
      },
    });
  } catch (error) {
    console.error("Error saving audit:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save audit results" },
      { status: 500 }
    );
  }
}
