import { NextRequest, NextResponse } from "next/server";

// GET /api/projects/[id]/overview - Get project overview
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id;

    // Return mock data for now
    const mockOverview = {
      metrics: {
        healthScore: 87,
        searchVisibility: 12.4,
        keywords: { total: 1247, improved: 374 },
        backlinks: { total: 8200, newThisMonth: 820 },
        traffic: { organicVisitors: 45200, changePercent: 8.7 },
        audits: { criticalIssues: 23 },
      },
      trends: {
        keywords: [45, 52, 48, 61, 55, 67, 72, 58, 63, 71, 69, 76],
        traffic: [1200, 1350, 1180, 1420, 1380, 1650, 1480, 1590, 1720, 1650, 1780, 1850],
      },
      recentActivity: [
        {
          id: "1",
          type: "audit_completed",
          message: "Site audit completed",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "2",
          type: "backlinks_detected",
          message: "15 new backlinks detected",
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        },
      ],
    };

    return NextResponse.json({
      success: true,
      data: mockOverview,
    });
  } catch (error) {
    console.error("Project overview error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project overview" },
      { status: 500 }
    );
  }
}
