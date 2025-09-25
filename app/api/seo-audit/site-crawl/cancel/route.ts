import { NextRequest, NextResponse } from 'next/server'
import { cancelCrawl, getCrawl } from '../../../../../lib/server/crawl-store'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(()=>({}))
    const { id } = body
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    const job = getCrawl(id)
    if (!job) return NextResponse.json({ error: 'not found' }, { status: 404 })
    cancelCrawl(id)
    return NextResponse.json({ id, status: 'cancelled' })
  } catch (err:any) {
    return NextResponse.json({ error: err.message || 'internal error' }, { status: 500 })
  }
}
