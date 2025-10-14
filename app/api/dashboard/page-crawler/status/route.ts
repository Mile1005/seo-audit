import { NextRequest, NextResponse } from 'next/server'
import { getCrawl } from '../../../../../lib/server/crawl-store'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Get crawl status and progress
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const crawlId = searchParams.get('id')
    
    if (!crawlId) {
      return NextResponse.json({ error: 'Crawl ID required' }, { status: 400 })
    }

    const job = getCrawl(crawlId)
    
    if (!job) {
      return NextResponse.json({ error: 'Crawl not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: job.id,
      status: job.status,
      progress: job.progress,
      processed: job.processed,
      queued: job.queued,
      maxPages: job.maxPages,
      pages: job.pages,
      error: job.error,
      startedAt: job.startedAt,
      updatedAt: job.updatedAt
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'internal error' }, { status: 500 })
  }
}
