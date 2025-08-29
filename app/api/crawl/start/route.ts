import { NextRequest, NextResponse } from 'next/server';
import { miniCrawl } from '../../../../lib/crawl';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { startUrl, limit = 10, mode = 'sync' } = body;

    if (!startUrl) {
      return NextResponse.json(
        { error: 'Start URL is required' },
        { status: 400 }
      );
    }

    // Validate and normalize URL
    let normalizedUrl: string;
    try {
      const url = new URL(startUrl.startsWith('http') ? startUrl : `https://${startUrl}`);
      normalizedUrl = url.toString();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    console.log(`Starting crawl for: ${normalizedUrl} with limit: ${limit}`);

    // Perform the crawl
    const crawlResult = await miniCrawl(normalizedUrl, {
      limit: Math.min(limit, 50), // Cap at 50 pages for performance
      maxDepth: 3,
      timeout: 10000,
      crawlDelay: 100
    });

    console.log(`Crawl completed for ${normalizedUrl}:`, {
      totalPages: crawlResult.totalPages,
      successfulPages: crawlResult.successfulPages,
      failedPages: crawlResult.failedPages
    });

    return NextResponse.json({
      status: 'completed',
      result: crawlResult
    });

  } catch (error) {
    console.error('Crawl error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'An error occurred during crawling',
        status: 'failed'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Site Crawler API - Use POST to start crawling' });
}