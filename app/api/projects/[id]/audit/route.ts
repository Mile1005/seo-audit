import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id

    // Get the project and its site audits
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        siteAudits: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            _count: {
              select: {
                pages: true,
                issues: true
              }
            }
          }
        },
        _count: {
          select: {
            siteAudits: true
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      )
    }

    // Get latest audit details
    const latestAudit = project.siteAudits[0]
    let auditSummary = null

    if (latestAudit) {
      // Get audit issues breakdown
      const issuesByType = await prisma.auditIssue.groupBy({
        by: ['type'],
        where: { auditId: latestAudit.id },
        _count: {
          id: true
        }
      })

      // Get performance metrics from latest audit
      const performanceMetrics = {
        overallScore: latestAudit.overallScore || 0,
        // Additional metrics can be derived from summary JSON
        ...(latestAudit.summary as any)?.metrics || {}
      }

      auditSummary = {
        id: latestAudit.id,
        status: latestAudit.status,
        createdAt: latestAudit.createdAt,
        completedAt: latestAudit.completedAt,
        totalPages: latestAudit._count.pages,
        totalIssues: latestAudit._count.issues,
        issuesByType,
        performanceMetrics,
        summary: latestAudit.summary
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        project: {
          id: project.id,
          name: project.name,
          domain: project.domain,
          status: project.status
        },
        latestAudit: auditSummary,
        auditHistory: project.siteAudits.map(audit => ({
          id: audit.id,
          status: audit.status,
          createdAt: audit.createdAt,
          completedAt: audit.completedAt,
          totalPages: audit._count.pages,
          totalIssues: audit._count.issues,
          overallScore: audit.overallScore
        })),
        totalAudits: project._count.siteAudits
      }
    })

  } catch (error) {
    console.error("Error fetching audit data:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch audit data" },
      { status: 500 }
    )
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id
    const body = await req.json()

    // Validate project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      )
    }

    // Check if there's already a running audit
    const runningAudit = await prisma.siteAudit.findFirst({
      where: {
        projectId,
        status: 'RUNNING'
      }
    })

    if (runningAudit) {
      return NextResponse.json(
        { success: false, error: "An audit is already running for this project" },
        { status: 409 }
      )
    }

    // For now, use a test user ID (in production, get from auth)
    const testUser = await prisma.user.findFirst({
      where: { email: 'test@example.com' }
    })

    if (!testUser) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      )
    }

    // Create new site audit
    const audit = await prisma.siteAudit.create({
      data: {
        projectId,
        createdBy: testUser.id,
        url: project.domain,
        status: 'RUNNING'
      }
    })

    // In a real implementation, you would trigger the audit process here
    // For now, we'll just return the created audit

    return NextResponse.json({
      success: true,
      data: {
        audit: {
          id: audit.id,
          status: audit.status,
          url: audit.url,
          createdAt: audit.createdAt
        }
      }
    })

  } catch (error) {
    console.error("Error starting audit:", error)
    return NextResponse.json(
      { success: false, error: "Failed to start audit" },
      { status: 500 }
    )
  }
}
