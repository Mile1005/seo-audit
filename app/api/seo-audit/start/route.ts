import { NextRequest, NextResponse } from 'next/server'
import { performComprehensiveAudit } from '../../../../lib/comprehensive-audit'
import { enforceQuota, incrementUsage } from '../../../../lib/server/quota'
import { auth } from '../../../../auth'
import { initAudit, setAuditCompleted, setAuditFailed, buildUnifiedResult } from '../../../../lib/server/audit-store'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
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
      return NextResponse.json(
        { 
          success: false, 
          error: 'URL is required' 
        },
        { status: 400 }
      )
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
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid URL format. Please enter a valid domain (e.g., example.com or https://example.com)' 
        },
        { status: 400 }
      )
    }

    // Create auditId & init store
    const auditId = crypto.randomUUID()
    initAudit(auditId)

    // Fire and forget async processing
    ;(async () => {
      try {
        console.log(`(Async) Starting SEO audit for: ${normalizedUrl}`)
        let response: Response
        try {
          response = await fetch(normalizedUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; SEO-Audit-Bot/1.0; +https://seo-audit.com)'
            }
          })
        } catch (err) {
          throw err
        }
        if (!response.ok) throw new Error(`Upstream responded ${response.status}`)
        const html = await response.text()
        const audit = await performComprehensiveAudit(html, normalizedUrl)
        const unified = buildUnifiedResult({ auditId, url: normalizedUrl, audit, keyword: keyword||null, email: email||null })
        setAuditCompleted(auditId, unified)
        if (userId) {
          incrementUsage(userId, 'AUDIT').catch(()=>{})
        }
        console.log('(Async) Audit completed', { auditId, score: unified.score })
      } catch (err:any) {
        console.error('(Async) Audit failed', auditId, err)
        setAuditFailed(auditId, err?.message || 'Unknown error')
      }
    })()

    return NextResponse.json({ auditId, status: 'processing' })

  } catch (error) {
    console.error('SEO Audit Start Error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
