import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id;

    // Get demo admin user
    const user = await prisma.user.findFirst({
      where: { email: "admin@aiseoturbo.com" },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    // Verify project access
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: user.id,
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found or access denied",
        },
        { status: 404 }
      );
    }

    // Get overview data - using mock data for now until Prisma types are fixed
    const overview = {
      project: {
        id: project.id,
        name: project.name,
        domain: "aiseoturbo.com", // Mock domain
        status: "ACTIVE",
      },
      metrics: {
        healthScore: 87,
        searchVisibility: 12.4,
        keywords: {
          total: 1247,
          tracked: 1247,
          improved: 374,
          declined: 125,
        },
        audits: {
          total: 15,
          lastScore: 85,
          criticalIssues: 3,
          warnings: 12,
        },
        backlinks: {
          total: 8200,
          newThisMonth: 820,
          referringDomains: 4920,
        },
        traffic: {
          organicVisitors: 45200,
          changePercent: 8.7,
          topPages: 15,
        },
      },
      recentActivity: {
        keywords: [
          {
            id: "1",
            keyword: "seo audit tool",
            status: "ACTIVE",
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            keyword: "website analysis",
            status: "ACTIVE",
            createdAt: new Date().toISOString(),
          },
          {
            id: "3",
            keyword: "free seo checker",
            status: "ACTIVE",
            createdAt: new Date().toISOString(),
          },
        ],
        audits: [
          {
            id: "1",
            url: "https://aiseoturbo.com",
            status: "COMPLETED",
            score: 87,
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            url: "https://aiseoturbo.com/pricing",
            status: "COMPLETED",
            score: 92,
            createdAt: new Date().toISOString(),
          },
        ],
      },
      trends: {
        keywords: [45, 52, 48, 61, 55, 67, 72, 58, 63, 71, 69, 76],
        traffic: [1200, 1350, 1180, 1420, 1380, 1650, 1480, 1590, 1720, 1650, 1780, 1850],
        rankings: [15, 18, 16, 22, 19, 25, 23, 21, 28, 26, 24, 29],
      },
    };

    return NextResponse.json({
      success: true,
      data: overview,
    });
  } catch (error) {
    console.error("Project overview API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch project overview",
      },
      { status: 500 }
    );
  }
}
