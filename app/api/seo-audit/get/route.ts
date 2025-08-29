import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Audit ID is required' 
        },
        { status: 400 }
      )
    }

    // For now, return a mock response since we don't have persistent storage
    // In a real implementation, you'd fetch from database/cache
    const mockResult = {
      auditId: id,
      status: 'completed' as const,
      url: 'https://example.com',
      score: 85,
      timestamp: new Date().toISOString(),
      pageData: {
        title: 'Example Page',
        metaDescription: 'Example meta description',
        h1Count: 1,
        h2Count: 3,
        h3Count: 5,
        wordCount: 500,
        imagesTotal: 10,
        imagesWithoutAlt: 2,
        internalLinks: 15,
        externalLinks: 5,
        loadTime: 1200,
        canonical: 'https://example.com',
        noindex: false,
      },
      issues: [],
      recommendations: [],
      robotsTxt: null,
      sitemapXml: null,
      keyword: null,
      email: null,
    }

    return NextResponse.json({
      success: true,
      data: mockResult
    })

  } catch (error) {
    console.error('Get Audit Error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}
