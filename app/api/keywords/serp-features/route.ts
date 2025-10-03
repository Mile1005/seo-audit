import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/keywords/serp-features - Fetch SERP features for a keyword
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keywordId = searchParams.get('keywordId');

    if (!keywordId) {
      return NextResponse.json(
        { success: false, error: 'keywordId is required' },
        { status: 400 }
      );
    }

    // Fetch latest positions with SERP features
    const positions = await prisma.keywordPosition.findMany({
      where: { keywordId },
      orderBy: { checkedAt: 'desc' },
      take: 10
    });

    const latestPosition = positions[0];

    if (!latestPosition) {
      return NextResponse.json({
        success: true,
        data: { features: [], visibilityScore: 0 }
      });
    }

    // Parse SERP features from JSON
    const serpData = latestPosition.serpFeatures as any || {};

    // Map SERP features to standardized format
    const features = [
      {
        id: 'featured-snippet',
        name: 'Featured Snippet',
        status: serpData.featuredSnippet ? 'present' : latestPosition.featured ? 'opportunity' : 'absent',
        position: serpData.featuredSnippet?.position || 0,
        yourRank: serpData.featuredSnippet?.isYours ? 0 : latestPosition.position,
        competitors: serpData.featuredSnippet?.competitors || []
      },
      {
        id: 'local-pack',
        name: 'Local Pack',
        status: serpData.localPack ? 'present' : latestPosition.localPack ? 'opportunity' : 'absent',
        position: serpData.localPack?.position || 3,
        yourRank: serpData.localPack?.yourPosition || null,
        competitors: serpData.localPack?.businesses || []
      },
      {
        id: 'people-also-ask',
        name: 'People Also Ask',
        status: serpData.paa ? 'present' : 'opportunity',
        position: serpData.paa?.position || 4,
        competitors: serpData.paa?.domains || []
      },
      {
        id: 'image-pack',
        name: 'Image Pack',
        status: serpData.images ? 'present' : 'absent',
        position: serpData.images?.position || null
      },
      {
        id: 'video-results',
        name: 'Video Results',
        status: serpData.videos ? 'present' : 'opportunity',
        position: serpData.videos?.position || null,
        competitors: serpData.videos?.channels || []
      },
      {
        id: 'shopping-results',
        name: 'Shopping Results',
        status: serpData.shopping ? 'present' : 'absent',
        position: serpData.shopping?.position || null
      },
      {
        id: 'knowledge-panel',
        name: 'Knowledge Panel',
        status: serpData.knowledgePanel ? 'present' : 'absent'
      },
      {
        id: 'site-links',
        name: 'Site Links',
        status: serpData.sitelinks ? 'present' : 'opportunity',
        yourRank: serpData.sitelinks?.isYours ? latestPosition.position : null
      },
      {
        id: 'reviews-ratings',
        name: 'Reviews & Ratings',
        status: serpData.reviews ? 'present' : 'opportunity'
      },
      {
        id: 'top-stories',
        name: 'Top Stories',
        status: serpData.news ? 'present' : 'absent'
      },
      {
        id: 'carousel',
        name: 'Carousel',
        status: serpData.carousel ? 'present' : 'opportunity',
        competitors: serpData.carousel?.items || []
      }
    ];

    // Calculate visibility score
    const presentFeatures = features.filter((f) => f.status === 'present').length;
    const visibilityScore = Math.round((presentFeatures / features.length) * 100);

    return NextResponse.json({
      success: true,
      data: {
        features,
        visibilityScore,
        lastChecked: latestPosition.checkedAt
      }
    });
  } catch (error) {
    console.error('Error fetching SERP features:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch SERP features' },
      { status: 500 }
    );
  }
}

// POST /api/keywords/serp-features - Update SERP features data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keywordId, serpFeatures } = body;

    if (!keywordId || !serpFeatures) {
      return NextResponse.json(
        { success: false, error: 'keywordId and serpFeatures are required' },
        { status: 400 }
      );
    }

    // Create new position entry with SERP features
    const position = await prisma.keywordPosition.create({
      data: {
        keywordId,
        serpFeatures,
        position: null, // Position will be determined separately
        checkedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      data: position
    });
  } catch (error) {
    console.error('Error updating SERP features:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update SERP features' },
      { status: 500 }
    );
  }
}
