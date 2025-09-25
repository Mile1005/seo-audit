import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// POST /api/seo-audit/schedule
// body: { url: string, frequency: 'DAILY' | 'WEEKLY' }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { url, frequency } = body || {}
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'url required' }, { status: 400 })
    }
    if (!['DAILY','WEEKLY'].includes(frequency)) {
      return NextResponse.json({ error: 'frequency must be DAILY or WEEKLY' }, { status: 400 })
    }
    let normalized = url.trim()
    if (!/^https?:\/\//.test(normalized)) normalized = 'https://' + normalized
    try { new URL(normalized) } catch { return NextResponse.json({ error: 'invalid url' }, { status: 400 }) }

    const existing = await (prisma as any).recurringAudit.findFirst({ where: { url: normalized, frequency, isActive: true } })
    if (existing) {
      return NextResponse.json({ success: true, recurringAudit: existing })
    }
    const now = new Date()
    const nextRunAt = new Date(now)
    // schedule first run shortly (next minute) so user sees effect quickly
    nextRunAt.setMinutes(nextRunAt.getMinutes() + 1)
    const created = await (prisma as any).recurringAudit.create({ data: { url: normalized, frequency, nextRunAt } })
    return NextResponse.json({ success: true, recurringAudit: created })
  } catch (err:any) {
    console.error('schedule route error', err)
    return NextResponse.json({ error: err.message || 'internal error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const items = await (prisma as any).recurringAudit.findMany({ orderBy: { createdAt: 'desc' }, take: 100 })
    return NextResponse.json({ items })
  } catch (err:any) {
    return NextResponse.json({ error: err.message || 'internal error' }, { status: 500 })
  }
}
