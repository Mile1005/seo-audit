import { NextRequest, NextResponse } from 'next/server'
import { performComprehensiveAudit } from '../../../../lib/comprehensive-audit'
import { enforceQuota, incrementUsage } from '../../../../lib/server/quota'
import { auth } from '../../../../auth'
import { initAudit, setAuditCompleted, setAuditFailed, buildUnifiedResult, setAuditProgress } from '../../../../lib/server/audit-store'
import crypto from 'crypto'
import { getLocaleFromHeaders, translateError } from '@/lib/i18n-server'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const locale = getLocaleFromHeaders(request.headers)
    const body = await request.json()
    const { url, email, keyword } = body

    const session = await auth()
    const userId = session?.user?.id
    if (userId) {
      // Confirm user row actually exists to avoid FK violation during quota upsert
      try {
        const user = await (await import('../../../../lib/prisma')).prisma.user.findUnique({ where: { id: userId } })
        if (!user) {
          console.warn('Skipping quota enforcement: user id not found in DB', userId)
        } else {
          const quota = await enforceQuota(userId, 'AUDIT')
          if (!quota.allowed) {
            return NextResponse.json({ success: false, error: quota.reason, upgrade: quota.upgrade }, { status: 402 })
          }
        }
      } catch (e) {
        console.warn('Quota/user existence check failed, allowing audit', e)
      }
    }

    // Validate required fields
    if (!url) {
      const msg = await translateError('invalid_url', locale)
      return NextResponse.json({ success: false, error: msg }, { status: 400 })
    }

    // Normalize URL - handle URLs without protocol
    let normalizedUrl = url.trim()
    
    // If URL doesn't start with http:// or https://, add https://
    if (!normalizedUrl.match(/^https?:\/\//)) {
      normalizedUrl = 'https://' + normalizedUrl
    }
    
    // Basic URL validation
    try {
      new URL(normalizedUrl)
    } catch (error) {
      const msg = await translateError('invalid_url', locale)
      return NextResponse.json({ success: false, error: msg }, { status: 400 })
    }

    // Create auditId & init store
    const auditId = crypto.randomUUID()
    initAudit(auditId, userId || undefined)

    // Best-effort persistence for progress polling across instances
    try {
      const auditRunModel = (prisma as any)['auditRun']
      if (auditRunModel) {
        await auditRunModel.upsert({
          where: { id: auditId },
          update: {
            url: normalizedUrl,
            status: 'processing',
            error: null,
            result: { progress: { stage: 'queued', progress: 2, message: 'Queued' } },
          },
          create: {
            id: auditId,
            url: normalizedUrl,
            status: 'processing',
            result: { progress: { stage: 'queued', progress: 2, message: 'Queued' } },
          }
        })
      }
    } catch (e) {
      console.warn('AuditRun persistence init failed (non-fatal):', e)
    }

    const FETCH_TIMEOUT_MS = Number(process.env.AUDIT_FETCH_TIMEOUT_MS || 15000)
    const AUDIT_TOTAL_TIMEOUT_MS = Number(process.env.AUDIT_TOTAL_TIMEOUT_MS || 45000)

    // Fire and forget async processing
    ;(async () => {
      try {
        console.log(`(Async) Starting SEO audit for: ${normalizedUrl}`)
        setAuditProgress(auditId, { stage: 'fetching', progress: 10, message: 'Fetching page HTML' })
        try {
          const auditRunModel = (prisma as any)['auditRun']
          if (auditRunModel) {
            auditRunModel.update({
              where: { id: auditId },
              data: { result: { progress: { stage: 'fetching', progress: 10, message: 'Fetching page HTML' } } }
            }).catch(() => {})
          }
        } catch {}

        const controller = new AbortController()
        const fetchTimeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
        let response: Response
        try {
          response = await fetch(normalizedUrl, {
            signal: controller.signal,
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; SEO-Audit-Bot/1.0; +https://seo-audit.com)',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            },
            redirect: 'follow',
          })
        } catch (err) {
          if ((err as any)?.name === 'AbortError') {
            throw new Error(`Site took too long to respond (>${Math.round(FETCH_TIMEOUT_MS / 1000)}s). Try again or test a different URL.`)
          }
          throw err
        } finally {
          clearTimeout(fetchTimeout)
        }

        if (!response.ok) throw new Error(`Upstream responded ${response.status}`)

        setAuditProgress(auditId, { stage: 'analyzing', progress: 25, message: 'Running comprehensive analysis' })
        try {
          const auditRunModel = (prisma as any)['auditRun']
          if (auditRunModel) {
            auditRunModel.update({
              where: { id: auditId },
              data: { result: { progress: { stage: 'analyzing', progress: 25, message: 'Running comprehensive analysis' } } }
            }).catch(() => {})
          }
        } catch {}
        const html = await response.text()

        const auditPromise = performComprehensiveAudit(html, normalizedUrl, {
          onProgress: (stage, progress, message) => {
            setAuditProgress(auditId, { stage, progress, message })
            try {
              const auditRunModel = (prisma as any)['auditRun']
              if (auditRunModel) {
                auditRunModel.update({
                  where: { id: auditId },
                  data: { result: { progress: { stage, progress, message } } }
                }).catch(() => {})
              }
            } catch {}
          },
        })

        const audit = (await Promise.race([
          auditPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('Audit timed out. Please try again.')), AUDIT_TOTAL_TIMEOUT_MS)),
        ])) as any

        setAuditProgress(auditId, { stage: 'saving', progress: 90, message: 'Finalizing results' })
        try {
          const auditRunModel = (prisma as any)['auditRun']
          if (auditRunModel) {
            auditRunModel.update({
              where: { id: auditId },
              data: { result: { progress: { stage: 'saving', progress: 90, message: 'Finalizing results' } } }
            }).catch(() => {})
          }
        } catch {}
        const unified = buildUnifiedResult({ auditId, url: normalizedUrl, audit, keyword: keyword||null, email: email||null })
        setAuditCompleted(auditId, unified)
        try {
          const auditRunModel = (prisma as any)['auditRun']
          if (auditRunModel) {
            auditRunModel.update({
              where: { id: auditId },
              data: { status: 'completed', score: unified.score, completedAt: new Date(unified.timestamp), result: unified as unknown as any }
            }).catch(() => {})
          }
        } catch {}
        if (userId) {
          incrementUsage(userId, 'AUDIT').catch(()=>{})
        }
        console.log('(Async) Audit completed', { auditId, score: unified.score })
      } catch (err:any) {
        console.error('(Async) Audit failed', auditId, err)
        setAuditFailed(auditId, err?.message || 'Unknown error')
        try {
          const auditRunModel = (prisma as any)['auditRun']
          if (auditRunModel) {
            auditRunModel.update({
              where: { id: auditId },
              data: { status: 'failed', error: err?.message || 'Unknown error', result: { progress: { stage: 'failed', message: err?.message || 'Unknown error' } } }
            }).catch(() => {})
          }
        } catch {}
      }
    })()

    return NextResponse.json({ auditId, status: 'processing', locale })

  } catch (error) {
    console.error('SEO Audit Start Error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
