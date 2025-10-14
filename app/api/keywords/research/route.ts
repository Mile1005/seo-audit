import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { seedKeyword } from '@/lib/seed-keyword';

const prisma = new PrismaClient();

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    if (!projectId) {
      return NextResponse.json({ 
        success: false,
        error: 'Project ID is required' 
      }, { status: 400 });
    }

    // Get existing keywords for this project
    const keywords = await prisma.keyword.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ 
      success: true,
      data: {
        keywords: keywords.map(k => ({
          id: k.id,
          keyword: k.keyword,
          searchVolume: k.searchVolume,
          difficulty: k.difficulty,
          cpc: k.cpc,
          competition: k.competition,
          intent: k.intent,
          status: k.status,
          country: k.country,
          device: k.device,
          createdAt: k.createdAt.toISOString()
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching keywords:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch keywords' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keywords, projectId, location = 'US', language = 'en', device = 'DESKTOP' } = body;

    // Handle both single keyword (legacy) and keywords array (new)
    const keywordList = Array.isArray(keywords) ? keywords : (body.keyword ? [body.keyword] : []);

    if (!keywordList.length || !projectId) {
      return NextResponse.json({ 
        success: false,
        error: 'Keyword and project ID are required' 
      }, { status: 400 });
    }

    // Ensure project exists or create a demo project
    let project = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!project) {
      // Create a demo project for keyword research
      project = await prisma.project.create({
        data: {
          id: projectId,
          name: 'Keyword Research Project',
          domain: 'example.com',
          ownerId: 'demo-user',
          status: 'ACTIVE'
        }
      });
      console.log(`Created demo project: ${projectId}`);
    }

    // Simulate keyword research data (in production, this would call real APIs)
    const intentOptions = ['COMMERCIAL', 'INFORMATIONAL', 'NAVIGATIONAL', 'TRANSACTIONAL'] as const;
    
    // Process all keywords in batch
    const allKeywords = [];
    
    for (const keyword of keywordList) {
      if (!keyword || !keyword.trim()) continue;
      
      const keywordData = {
        keyword: keyword.trim(),
        searchVolume: Math.floor(Math.random() * 10000) + 100,
        difficulty: parseFloat((Math.random() * 100).toFixed(1)),
        cpc: parseFloat((Math.random() * 5).toFixed(2)),
        competition: parseFloat((Math.random()).toFixed(2)),
        intent: intentOptions[Math.floor(Math.random() * 4)],
        status: 'ACTIVE' as const,
        country: location,
        device: device,
        projectId
      };

      // Save to database or skip if duplicate
      try {
        const savedKeyword = await prisma.keyword.upsert({
          where: {
            keyword_projectId_country_device: {
              keyword: keywordData.keyword,
              projectId: projectId,
              country: location,
              device: device
            }
          },
          update: {
            searchVolume: keywordData.searchVolume,
            difficulty: keywordData.difficulty,
            cpc: keywordData.cpc,
            competition: keywordData.competition,
            intent: keywordData.intent,
            lastChecked: new Date()
          },
          create: keywordData
        });

        // 🌱 AUTO-SEED: Generate realistic demo data for the new keyword
        // This populates 90 days of position history, competitors, location data, SERP features, and alerts
        const basePosition = 5 + Math.floor(Math.random() * 10); // Random starting position 5-15
        await seedKeyword(
          prisma,
          savedKeyword.id,
          savedKeyword.keyword,
          projectId,
          savedKeyword.searchVolume || 1000,
          basePosition
        );
        
        allKeywords.push({
          id: savedKeyword.id,
          keyword: savedKeyword.keyword,
          searchVolume: savedKeyword.searchVolume || 0,
          difficulty: savedKeyword.difficulty || 0,
          cpc: savedKeyword.cpc || 0,
          competition: savedKeyword.competition || 0,
          intent: savedKeyword.intent,
          status: savedKeyword.status,
          country: savedKeyword.country,
          device: savedKeyword.device,
          createdAt: savedKeyword.createdAt.toISOString()
        });
      } catch (dbError: any) {
        console.error(`Error saving keyword "${keyword}":`, dbError.message);
        // Return generated data even if DB save fails (for free users without DB)
        allKeywords.push({
          id: `temp-${Date.now()}-${Math.random()}`,
          keyword: keywordData.keyword,
          searchVolume: keywordData.searchVolume,
          difficulty: keywordData.difficulty,
          cpc: keywordData.cpc,
          competition: keywordData.competition,
          intent: keywordData.intent,
          status: keywordData.status,
          country: keywordData.country,
          device: keywordData.device,
          createdAt: new Date().toISOString()
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        keywords: allKeywords,
        totalResults: allKeywords.length,
        searchTime: `${(Math.random() * 0.5 + 0.1).toFixed(2)}s`
      }
    });

  } catch (error) {
    console.error('Error in keyword research:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to research keywords' 
    }, { status: 500 });
  }
}
