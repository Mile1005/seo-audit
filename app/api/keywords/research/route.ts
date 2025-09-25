import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // Get existing keywords for this project
    const keywords = await prisma.keyword.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ keywords });
  } catch (error) {
    console.error('Error fetching keywords:', error);
    return NextResponse.json({ error: 'Failed to fetch keywords' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keyword, projectId } = body;

    if (!keyword || !projectId) {
      return NextResponse.json({ error: 'Keyword and project ID are required' }, { status: 400 });
    }

    // Simulate keyword research data (in production, this would call real APIs)
    const intentOptions = ['COMMERCIAL', 'INFORMATIONAL', 'NAVIGATIONAL', 'TRANSACTIONAL'] as const;
    const keywordData = {
      id: crypto.randomUUID(),
      keyword: keyword.trim(),
      searchVolume: Math.floor(Math.random() * 10000) + 100,
      difficulty: Math.floor(Math.random() * 100) + 1,
      cpc: parseFloat((Math.random() * 5).toFixed(2)),
      competition: Math.floor(Math.random() * 100) + 1,
      intent: intentOptions[Math.floor(Math.random() * 4)],
      status: 'ACTIVE' as const,
      country: 'US',
      device: 'DESKTOP' as const,
      projectId,
      createdAt: new Date().toISOString()
    };

    // Save to database
    const savedKeyword = await prisma.keyword.create({
      data: {
        keyword: keywordData.keyword,
        searchVolume: keywordData.searchVolume,
        difficulty: keywordData.difficulty,
        cpc: keywordData.cpc,
        competition: keywordData.competition,
        intent: keywordData.intent,
        status: keywordData.status,
        country: keywordData.country,
        device: keywordData.device,
        projectId: keywordData.projectId
      }
    });

    // Generate related keywords
    const relatedKeywords = Array.from({ length: 5 }, (_, i) => ({
      id: crypto.randomUUID(),
      keyword: `${keyword.trim()} ${['tips', 'guide', 'best', 'how to', 'review'][i]}`,
      searchVolume: Math.floor(Math.random() * 5000) + 50,
      difficulty: Math.floor(Math.random() * 80) + 10,
      cpc: parseFloat((Math.random() * 3).toFixed(2)),
      competition: Math.floor(Math.random() * 90) + 5,
      intent: intentOptions[Math.floor(Math.random() * 4)],
      status: 'ACTIVE' as const,
      country: 'US',
      device: 'DESKTOP' as const,
      projectId,
      createdAt: new Date().toISOString()
    }));

    return NextResponse.json({
      keyword: savedKeyword,
      relatedKeywords,
      totalResults: relatedKeywords.length + 1,
      searchTime: '0.23s'
    });

  } catch (error) {
    console.error('Error in keyword research:', error);
    return NextResponse.json({ error: 'Failed to research keywords' }, { status: 500 });
  }
}
