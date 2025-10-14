// Phase 11: Quota enforcement utility
// Free tier limits: 30 single-page audits, 2 site crawls per month
// Usage stored in UserUsage keyed by userId + monthKey. Month resets by creating/upserting new row.

import { prisma } from '../prisma'

const FREE_LIMITS = {
  AUDIT: 30,
  SITE_CRAWL: 5, // Increased from 2 to 5 for dashboard page crawler
}

function currentMonthKey(date = new Date()) {
  return date.toISOString().slice(0,7) // YYYY-MM
}

export type QuotaType = 'AUDIT' | 'SITE_CRAWL'

export interface QuotaResult {
  allowed: boolean
  reason?: string
  upgrade?: boolean
}

export async function enforceQuota(userId: string, type: QuotaType): Promise<QuotaResult> {
  const monthKey = currentMonthKey()
  const usageModel = (prisma as any).userUsage
  if (!usageModel) {
    return { allowed: true } // if schema not generated yet, skip limiting
  }
  // Ensure user exists to satisfy FK constraint; if not, skip quota enforcement
  try {
    const user = await (prisma as any).user?.findUnique({ where: { id: userId } })
    if (!user) return { allowed: true }
  } catch {
    // If user lookup fails (schema regen race), allow
    return { allowed: true }
  }
  let usage: any
  try {
    usage = await usageModel.upsert({
      where: { userId },
      update: { monthKey },
      create: { userId, monthKey }
    })
  } catch (err: any) {
    // Graceful fallback if table doesn't exist yet (fresh dev DB not pushed)
    const msg = String(err?.message || '')
    if (msg.includes('does not exist') || msg.includes('no such table') || err?.code === 'P2021') {
      return { allowed: true }
    }
    throw err
  }
  // If month changed, reset counts
  if (usage.monthKey !== monthKey) {
    const reset = await usageModel.update({
      where: { userId },
      data: { monthKey, auditsThisMonth: 0, siteCrawlsThisMonth: 0 }
    })
    return evaluate(reset, type)
  }
  return evaluate(usage, type)

  function evaluate(u: any, t: QuotaType): QuotaResult {
    if (t === 'AUDIT') {
      if (u.auditsThisMonth >= FREE_LIMITS.AUDIT) {
        return { allowed: false, reason: 'Single-page audit quota exceeded', upgrade: true }
      }
    } else if (t === 'SITE_CRAWL') {
      if (u.siteCrawlsThisMonth >= FREE_LIMITS.SITE_CRAWL) {
        return { allowed: false, reason: 'Site crawl quota exceeded', upgrade: true }
      }
    }
    return { allowed: true }
  }
}

export async function incrementUsage(userId: string, type: QuotaType) {
  const monthKey = currentMonthKey()
  const usageModel = (prisma as any).userUsage
  if (!usageModel) return
  // Skip if user row missing (avoid FK violation)
  try {
    const user = await (prisma as any).user?.findUnique({ where: { id: userId } })
    if (!user) return
  } catch {
    return
  }
  try {
    await usageModel.upsert({
      where: { userId },
      update: {
        monthKey,
        auditsThisMonth: { increment: type === 'AUDIT' ? 1 : 0 },
        siteCrawlsThisMonth: { increment: type === 'SITE_CRAWL' ? 1 : 0 }
      },
      create: {
        userId,
        monthKey,
        auditsThisMonth: type === 'AUDIT' ? 1 : 0,
        siteCrawlsThisMonth: type === 'SITE_CRAWL' ? 1 : 0
      }
    })
  } catch (err: any) {
    const msg = String(err?.message || '')
    if (msg.includes('does not exist') || msg.includes('no such table') || err?.code === 'P2021') {
      return
    }
    throw err
  }
}
