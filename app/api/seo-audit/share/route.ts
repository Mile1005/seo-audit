import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { auditRunId, ttlHours = 168 } = body // default 7 days
    if (!auditRunId) return NextResponse.json({ error: 'auditRunId required' }, { status: 400 })
    const run = await (prisma as any).auditRun.findUnique({ where: { id: auditRunId }, select: { id: true } })
    if (!run) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const token = crypto.randomBytes(16).toString('hex')
    const expiresAt = new Date(Date.now() + ttlHours * 3600 * 1000)
    await (prisma as any).publicShare.create({ data: { auditRunId, token, expiresAt } })
    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/share/${token}`
    return NextResponse.json({ token, shareUrl, expiresAt })
  } catch (e:any) {
    return NextResponse.json({ error: e.message || 'failed' }, { status: 500 })
  }
}