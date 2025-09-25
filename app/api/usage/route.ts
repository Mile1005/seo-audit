import { NextResponse } from 'next/server'
import { auth } from '../../../auth'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const userId = session.user.id
  const monthKey = new Date().toISOString().slice(0,7)
  const usageModel = (prisma as any).userUsage
  let usage = null as any
  if (usageModel) {
    try {
      usage = await usageModel.findUnique({ where: { userId } })
    } catch (err: any) {
      const msg = String(err?.message || '')
      if (!(msg.includes('does not exist') || msg.includes('no such table') || err?.code === 'P2021')) {
        throw err
      }
      // silently treat as zero usage on fresh DB
    }
  }
    const auditsThisMonth = usage?.auditsThisMonth ?? 0
    const siteCrawlsThisMonth = usage?.siteCrawlsThisMonth ?? 0
    const limits = { audits: 30, siteCrawls: 2 }
    const auditPct = auditsThisMonth / limits.audits
    const crawlPct = siteCrawlsThisMonth / limits.siteCrawls
    return NextResponse.json({
    userId,
    monthKey,
    auditsThisMonth,
    siteCrawlsThisMonth,
    limits,
    warnings: {
      audits: auditPct >= 1 ? 'exceeded' : auditPct >= 0.9 ? 'near-limit' : auditPct >= 0.7 ? 'high' : 'ok',
      siteCrawls: crawlPct >= 1 ? 'exceeded' : crawlPct >= 0.9 ? 'near-limit' : crawlPct >= 0.7 ? 'high' : 'ok'
    }
  })
}
