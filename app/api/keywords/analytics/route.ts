import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/keywords/analytics - Fetch traffic analytics for a keyword
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keywordId = searchParams.get('keywordId');
    const days = parseInt(searchParams.get('days') || '30');

    if (!keywordId) {
      return NextResponse.json(
        { success: false, error: 'keywordId is required' },
        { status: 400 }
      );
    }

    // Get keyword and its positions
    const keyword = await prisma.keyword.findUnique({
      where: { id: keywordId },
      include: {
        positions: {
          orderBy: { checkedAt: 'desc' },
          take: days
        }
      }
    });

    if (!keyword) {
      return NextResponse.json(
        { success: false, error: 'Keyword not found' },
        { status: 404 }
      );
    }

    // CTR by position (realistic Google CTR data)
    const getCTR = (position: number): number => {
      const ctrMap: Record<number, number> = {
        1: 31.7, 2: 24.7, 3: 18.7, 4: 13.6, 5: 9.5,
        6: 6.3, 7: 4.3, 8: 3.1, 9: 2.4, 10: 1.9
      };
      return ctrMap[position] || (position <= 20 ? 1.5 : 0.5);
    };

    // Generate analytics data from positions
    const trafficData = keyword.positions.reverse().map((pos) => {
      const position = pos.position || 50;
      const ctr = getCTR(position);
      const impressions = keyword.searchVolume || 0;
      const clicks = Math.floor(impressions * (ctr / 100));
      const conversions = Math.floor(clicks * (0.02 + Math.random() * 0.03));
      const revenue = conversions * (50 + Math.random() * 150);

      return {
        date: pos.checkedAt.toISOString().split('T')[0],
        impressions,
        clicks,
        ctr: parseFloat(ctr.toFixed(2)),
        averagePosition: position,
        conversions,
        revenue: parseFloat(revenue.toFixed(2))
      };
    });

    // Calculate totals and averages
    const totalImpressions = trafficData.reduce((sum, d) => sum + d.impressions, 0);
    const totalClicks = trafficData.reduce((sum, d) => sum + d.clicks, 0);
    const avgCTR = trafficData.reduce((sum, d) => sum + d.ctr, 0) / trafficData.length;
    const avgPosition = trafficData.reduce((sum, d) => sum + d.averagePosition, 0) / trafficData.length;
    const totalConversions = trafficData.reduce((sum, d) => sum + d.conversions, 0);
    const totalRevenue = trafficData.reduce((sum, d) => sum + d.revenue, 0);

    // Calculate period-over-period changes
    const midPoint = Math.floor(trafficData.length / 2);
    const firstHalf = trafficData.slice(0, midPoint);
    const secondHalf = trafficData.slice(midPoint);

    const firstHalfClicks = firstHalf.reduce((sum, d) => sum + d.clicks, 0);
    const secondHalfClicks = secondHalf.reduce((sum, d) => sum + d.clicks, 0);
    const clicksChange = firstHalfClicks > 0
      ? ((secondHalfClicks - firstHalfClicks) / firstHalfClicks) * 100
      : 0;

    const firstHalfRevenue = firstHalf.reduce((sum, d) => sum + d.revenue, 0);
    const secondHalfRevenue = secondHalf.reduce((sum, d) => sum + d.revenue, 0);
    const revenueChange = firstHalfRevenue > 0
      ? ((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue) * 100
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        trafficData,
        summary: {
          totalImpressions,
          totalClicks,
          avgCTR: parseFloat(avgCTR.toFixed(2)),
          avgPosition: parseFloat(avgPosition.toFixed(1)),
          totalConversions,
          totalRevenue: parseFloat(totalRevenue.toFixed(2)),
          clicksChange: parseFloat(clicksChange.toFixed(1)),
          revenueChange: parseFloat(revenueChange.toFixed(1))
        }
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
