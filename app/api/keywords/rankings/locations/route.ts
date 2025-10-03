import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/keywords/rankings/locations - Fetch rankings by location and device
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keywordId = searchParams.get('keywordId');
    const device = searchParams.get('device') as 'DESKTOP' | 'MOBILE' | 'TABLET' | null;

    if (!keywordId) {
      return NextResponse.json(
        { success: false, error: 'keywordId is required' },
        { status: 400 }
      );
    }

    // Build where clause
    const where: any = { keywordId };
    if (device) {
      where.device = device;
    }

    // Fetch position history for different locations and devices
    const positions = await prisma.keywordPosition.findMany({
      where,
      orderBy: { checkedAt: 'desc' },
      take: 500 // Get recent positions
    });

    // Group by location and device
    const locationRankings = positions.reduce((acc: any[], pos) => {
      const existing = acc.find(
        (item) => item.location === pos.location && item.device === pos.device
      );

      if (!existing) {
        // Get previous position for change calculation
        const previousPos = positions.find(
          (p) =>
            p.location === pos.location &&
            p.device === pos.device &&
            p.id !== pos.id
        );

        acc.push({
          location: pos.location,
          device: pos.device,
          rank: pos.position,
          previousRank: previousPos?.position || pos.position,
          url: pos.url,
          lastChecked: pos.checkedAt,
          serpFeatures: pos.serpFeatures || {}
        });
      }

      return acc;
    }, []);

    // Get keyword data for search volume
    const keyword = await prisma.keyword.findUnique({
      where: { id: keywordId }
    });

    // Enhance with search volume (in real implementation, this would come from location-specific data)
    const enhancedRankings = locationRankings.map((ranking) => ({
      ...ranking,
      searchVolume: keyword?.searchVolume
        ? Math.floor(keyword.searchVolume * (0.5 + Math.random() * 0.5))
        : 0
    }));

    // Calculate device statistics
    const deviceStats = {
      desktop: {
        avgRank: calculateAvgRank(enhancedRankings, 'DESKTOP'),
        change: calculateChange(enhancedRankings, 'DESKTOP')
      },
      mobile: {
        avgRank: calculateAvgRank(enhancedRankings, 'MOBILE'),
        change: calculateChange(enhancedRankings, 'MOBILE')
      },
      tablet: {
        avgRank: calculateAvgRank(enhancedRankings, 'TABLET'),
        change: calculateChange(enhancedRankings, 'TABLET')
      }
    };

    return NextResponse.json({
      success: true,
      data: {
        rankings: enhancedRankings,
        deviceStats,
        totalLocations: locationRankings.length
      }
    });
  } catch (error) {
    console.error('Error fetching location rankings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rankings' },
      { status: 500 }
    );
  }
}

function calculateAvgRank(rankings: any[], device: string): number {
  const deviceRankings = rankings.filter((r) => r.device === device);
  if (deviceRankings.length === 0) return 0;

  const sum = deviceRankings.reduce((acc, r) => acc + (r.rank || 0), 0);
  return Math.round(sum / deviceRankings.length);
}

function calculateChange(rankings: any[], device: string): string {
  const deviceRankings = rankings.filter((r) => r.device === device);
  if (deviceRankings.length === 0) return '0';

  const changes = deviceRankings.map((r) => (r.previousRank || r.rank) - (r.rank || 0));
  const avgChange = changes.reduce((acc, c) => acc + c, 0) / changes.length;

  return avgChange > 0 ? `+${Math.round(avgChange)}` : `${Math.round(avgChange)}`;
}

// POST /api/keywords/rankings/locations - Add new location tracking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keywordId, location, device, position, url } = body;

    if (!keywordId || !location || !device) {
      return NextResponse.json(
        { success: false, error: 'keywordId, location, and device are required' },
        { status: 400 }
      );
    }

    const ranking = await prisma.keywordPosition.create({
      data: {
        keywordId,
        location,
        device,
        position,
        url
      }
    });

    return NextResponse.json({
      success: true,
      data: ranking
    });
  } catch (error) {
    console.error('Error adding location ranking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add location ranking' },
      { status: 500 }
    );
  }
}
