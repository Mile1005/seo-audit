import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering since this route uses request.url
export const dynamic = 'force-dynamic';

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
    // In a real implementation, you'd fetch detailed results from database/cache
    const mockResults = {
      auditId: id,
      detailedResults: {
        accessibility: {
          score: 95,
          checks: [
            { name: 'HTML lang attribute', status: 'passed' },
            { name: 'Images have alt text', status: 'failed', details: '2 images missing alt text' },
            { name: 'Links have discernible text', status: 'passed' },
          ]
        },
        seo: {
          score: 88,
          checks: [
            { name: 'Meta description', status: 'passed' },
            { name: 'Page title', status: 'passed' },
            { name: 'Heading structure', status: 'warning', details: 'Multiple H1 tags found' },
          ]
        },
        performance: {
          score: 75,
          metrics: {
            firstContentfulPaint: 1200,
            largestContentfulPaint: 2400,
            totalBlockingTime: 150,
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: mockResults
    })

  } catch (error) {
    console.error('Get Results Error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}
