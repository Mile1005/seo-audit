import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// GET /api/keywords/alerts - Fetch alerts for a project/keyword
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const keywordId = searchParams.get('keywordId');

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'projectId is required' },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const ownedProject = await prisma.project.findFirst({
      where: { id: projectId, ownerId: session.user.id },
      select: { id: true },
    });

    if (!ownedProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    if (keywordId) {
      const ownedKeyword = await prisma.keyword.findFirst({
        where: {
          id: keywordId,
          projectId,
          project: { ownerId: session.user.id },
        },
        select: { id: true },
      });

      if (!ownedKeyword) {
        return NextResponse.json(
          { success: false, error: 'Keyword not found' },
          { status: 404 }
        );
      }
    }

    // Fetch alert configurations
    const where: any = { projectId };
    if (keywordId) {
      where.keywordId = keywordId;
    }

    const alertConfigs = await prisma.rankingAlert.findMany({
      where,
      include: {
        keyword: true
      }
    });

    // Generate recent alert history by checking position changes
    const recentAlerts = await generateAlertHistory(projectId, keywordId);

    return NextResponse.json({
      success: true,
      data: {
        configs: alertConfigs.map((config) => ({
          id: config.id,
          type: config.type,
          threshold: config.threshold,
          isActive: config.isActive,
          emailEnabled: config.emailEnabled,
          slackEnabled: config.slackEnabled,
          lastTriggered: config.lastTriggered,
          keyword: config.keyword ? {
            id: config.keyword.id,
            keyword: config.keyword.keyword
          } : null
        })),
        recentAlerts
      }
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}

async function generateAlertHistory(projectId: string, keywordId?: string | null) {
  // Fetch keywords for this project
  const where: any = { projectId };
  if (keywordId) {
    where.id = keywordId;
  }

  const keywords = await prisma.keyword.findMany({
    where,
    include: {
      positions: {
        orderBy: { checkedAt: 'desc' },
        take: 10
      }
    },
    take: 5 // Limit to 5 keywords for performance
  });

  const alerts: any[] = [];

  for (const keyword of keywords) {
    if (keyword.positions.length < 2) continue;

    const latestPos = keyword.positions[0];
    const previousPos = keyword.positions[1];

    if (!latestPos.position || !previousPos.position) continue;

    const change = previousPos.position - latestPos.position;

    // Ranking drop alert
    if (change < -3) {
      alerts.push({
        id: `ranking-drop-${keyword.id}-${latestPos.id}`,
        type: 'ranking',
        severity: 'critical',
        title: 'Ranking Drop Detected',
        description: `Your ranking for "${keyword.keyword}" dropped from #${previousPos.position} to #${latestPos.position}`,
        change: `${change} positions`,
        timestamp: latestPos.checkedAt,
        isRead: false,
        actionable: true,
        actionText: 'Analyze Changes'
      });
    }

    // Ranking gain alert
    if (change > 3) {
      alerts.push({
        id: `ranking-gain-${keyword.id}-${latestPos.id}`,
        type: 'ranking',
        severity: 'info',
        title: 'Ranking Improved',
        description: `Your ranking improved by ${change} positions - now at #${latestPos.position}`,
        change: `+${change} positions`,
        timestamp: latestPos.checkedAt,
        isRead: false,
        actionable: false
      });
    }

    // SERP feature opportunities
    if (latestPos.serpFeatures) {
      const serpData = latestPos.serpFeatures as any;
      if (serpData.featuredSnippet && !serpData.featuredSnippet.isYours) {
        alerts.push({
          id: `serp-feature-${keyword.id}-${latestPos.id}`,
          type: 'serp',
          severity: 'info',
          title: 'Featured Snippet Opportunity',
          description: `New featured snippet appeared for "${keyword.keyword}" - high opportunity score`,
          change: 'New opportunity',
          timestamp: latestPos.checkedAt,
          isRead: false,
          actionable: true,
          actionText: 'Optimize Content'
        });
      }
    }
  }

  return alerts.sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 20);
}

// POST /api/keywords/alerts - Create or update alert configuration
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      id,
      projectId,
      keywordId,
      type,
      threshold,
      isActive,
      emailEnabled,
      slackEnabled,
      webhookUrl
    } = body;

    if (!projectId || !type) {
      return NextResponse.json(
        { success: false, error: 'projectId and type are required' },
        { status: 400 }
      );
    }

    const ownedProject = await prisma.project.findFirst({
      where: { id: projectId, ownerId: session.user.id },
      select: { id: true },
    });

    if (!ownedProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    if (keywordId) {
      const ownedKeyword = await prisma.keyword.findFirst({
        where: {
          id: keywordId,
          projectId,
          project: { ownerId: session.user.id },
        },
        select: { id: true },
      });

      if (!ownedKeyword) {
        return NextResponse.json(
          { success: false, error: 'Keyword not found' },
          { status: 404 }
        );
      }
    }

    let alert;

    if (id) {
      const existing = await prisma.rankingAlert.findFirst({
        where: {
          id,
          project: { ownerId: session.user.id },
        },
        select: { id: true },
      });

      if (!existing) {
        return NextResponse.json(
          { success: false, error: 'Alert not found' },
          { status: 404 }
        );
      }

      // Update existing alert
      alert = await prisma.rankingAlert.update({
        where: { id },
        data: {
          threshold,
          isActive,
          emailEnabled,
          slackEnabled,
          webhookUrl
        }
      });
    } else {
      // Create new alert
      alert = await prisma.rankingAlert.create({
        data: {
          projectId,
          keywordId,
          type,
          threshold,
          isActive: isActive ?? true,
          emailEnabled: emailEnabled ?? true,
          slackEnabled: slackEnabled ?? false,
          webhookUrl
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: alert
    });
  } catch (error) {
    console.error('Error saving alert:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save alert' },
      { status: 500 }
    );
  }
}

// DELETE /api/keywords/alerts - Delete an alert configuration
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Alert ID is required' },
        { status: 400 }
      );
    }

    const existing = await prisma.rankingAlert.findFirst({
      where: {
        id,
        project: { ownerId: session.user.id },
      },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Alert not found' },
        { status: 404 }
      );
    }

    await prisma.rankingAlert.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Alert deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting alert:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete alert' },
      { status: 500 }
    );
  }
}
