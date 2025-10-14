import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { initCrawl, updateCrawl, completeCrawl, failCrawl, getCrawl } from '../../../../../lib/server/crawl-store'
import { enforceQuota, incrementUsage } from '../../../../../lib/server/quota'
import { auth } from '../../../../../auth'
import { lightPageAudit } from '../../../../../lib/server/light-page-audit'
import { performComprehensiveAudit } from '../../../../../lib/comprehensive-audit'
import { prisma } from '../../../../../lib/prisma'
import * as cheerio from 'cheerio'

interface QueueItem { url: string; depth: number }

// Dashboard Page Crawler - Enhanced version with up to 100 pages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    let { url, maxPages = 50, maxDepth = 3, projectId } = body
    
    if (!url) return NextResponse.json({ error: 'url required' }, { status: 400 })
    if (!/^https?:\/\//.test(url)) url = 'https://' + url
    try { new URL(url) } catch { return NextResponse.json({ error: 'invalid url' }, { status: 400 }) }
    
    // Dashboard page crawler limits: 10-100 pages
    maxPages = Math.min(100, Math.max(10, maxPages))
    maxDepth = Math.min(5, Math.max(1, maxDepth))

    // Authentication required for dashboard
    const session = await auth()
    const userId = session?.user?.id
    
    if (!userId) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Enforce quota
    const quota = await enforceQuota(userId, 'SITE_CRAWL')
    if (!quota.allowed) {
      return NextResponse.json({ error: quota.reason, upgrade: quota.upgrade }, { status: 402 })
    }

    const id = crypto.randomUUID()
    initCrawl(id, { rootUrl: url, maxPages, maxDepth })

    // Persist initial Crawl DB record
    let crawlDbId: string | null = null
    try {
      const hostname = new URL(url).hostname
      
      // Ensure user exists in database first
      let user = await (prisma as any).user.findUnique({ where: { id: userId } })
      if (!user) {
        console.warn('[dashboard-crawl] User not found in database, skipping DB persistence')
        // Continue without database persistence - crawl will still work in-memory
      } else {
        // Use provided projectId or find/create project for this domain
        let project
        if (projectId) {
          project = await (prisma as any).project.findFirst({ 
            where: { id: projectId, ownerId: userId }
          })
        }
        
        if (!project) {
          project = await (prisma as any).project.findFirst({ 
            where: { ownerId: userId, domain: hostname }
          })
        }
        
        if (!project) {
          project = await (prisma as any).project.create({ 
            data: { 
              ownerId: userId, 
              name: hostname, 
              domain: hostname 
            } 
          })
        }
        
        const crawl = await (prisma as any).crawl.create({ 
          data: { 
            projectId: project.id, 
            startUrl: url, 
            status: 'QUEUED', 
            pages: 0, 
            errors: 0, 
            settings: { maxPages, maxDepth },
            type: 'DASHBOARD' // Mark as dashboard crawl
          } 
        })
        crawlDbId = crawl.id
      }
    } catch (e) {
      console.warn('[dashboard-crawl] failed to persist initial crawl record', e)
      // Continue anyway - crawl will work in-memory even if DB fails
    }

    // Start async crawling job
    ;(async () => {
      console.log(`[dashboard-crawl] Starting crawl job ${id} for ${url}`)
      try {
        const origin = new URL(url).origin
        const visited = new Set<string>()
        const queue: QueueItem[] = [{ url, depth: 0 }]
        const pages: { url: string; html: string; status: number }[] = []
        let rootComprehensiveAttached = false
        
        while (queue.length && pages.length < maxPages) {
          const currentJob = getCrawl(id)
          if (currentJob?.cancelled) break
          
          const { url: current, depth } = queue.shift()!
          if (visited.has(current)) continue
          visited.add(current)
          
          let status = 0
          let html = ''
          
          try {
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), 15000) // 15 second timeout
            const res = await fetch(current, { 
              signal: controller.signal, 
              headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AISEOTurbo-PageCrawler/1.0)' }
            })
            clearTimeout(timeout)
            status = res.status
            
            if (res.ok) {
              html = await res.text()
              pages.push({ url: current, html, status })
            }
          } catch (err) {
            updateCrawl(id, job => {
              job.pages.push({ 
                url: current, 
                status: status || 0, 
                fetchedAt: new Date().toISOString(), 
                error: (err as any)?.message 
              })
              job.processed++
            })
            continue
          }

          // Lightweight audit each page; comprehensive audit on root page
          try {
            const result = lightPageAudit(html, origin)
            let comprehensiveSummary: any = undefined
            
            if (!rootComprehensiveAttached && current === url) {
              try {
                const full = await performComprehensiveAudit(html, current)
                comprehensiveSummary = {
                  scores: full.scores,
                  stats: full.stats,
                  h_tags: full.h_tags,
                  social_meta: full.social_meta,
                  accessibility: full.accessibility,
                  indexability: full.indexability,
                  seo_checks: full.seo_checks,
                  performance_metrics: full.performance_metrics
                }
                rootComprehensiveAttached = true
              } catch (err) {
                console.warn('[dashboard-crawl] comprehensive root audit failed', (err as any)?.message)
              }
            }
            
            updateCrawl(id, job => {
              job.pages.push({
                url: current,
                status,
                fetchedAt: new Date().toISOString(),
                title: result.title,
                metaDescription: result.metaDescription,
                wordCount: result.wordCount,
                h1Count: result.h1Count,
                h2Count: result.h2Count,
                images: result.images,
                imagesWithoutAlt: result.imagesWithoutAlt,
                internalLinkCount: result.internalLinkCount,
                ...(comprehensiveSummary ? { comprehensive: comprehensiveSummary } : {})
              })
              job.processed = job.pages.length
            })
          } catch (err) {
            updateCrawl(id, job => {
              job.pages.push({ 
                url: current, 
                status, 
                fetchedAt: new Date().toISOString(), 
                error: (err as any)?.message 
              })
              job.processed = job.pages.length
            })
          }

          // Extract links for next level
          if (depth < maxDepth && html) {
            try {
              const $ = cheerio.load(html)
              const candidate = new Set<string>()
              
              $('a[href]').each((_, el) => {
                const href = $(el).attr('href') || ''
                if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) return
                
                try {
                  const u = new URL(href, origin)
                  if (u.origin === origin) {
                    candidate.add(u.toString().split('#')[0])
                  }
                } catch { /* ignore */ }
              })
              
              // Also check canonical tags
              const canonical = $('link[rel="canonical"]').attr('href')
              if (canonical) {
                try { 
                  const cu = new URL(canonical, origin)
                  if (cu.origin === origin) candidate.add(cu.toString().split('#')[0]) 
                } catch {}
              }
              
              for (const link of candidate) {
                if (visited.has(link)) continue
                if (queue.length + pages.length >= maxPages) break
                queue.push({ url: link, depth: depth + 1 })
              }
            } catch { /* fallback to previous extraction skipped */ }
          }
          
          updateCrawl(id, job => { 
            job.queued = queue.length 
          })
        }

        completeCrawl(id)
        if (userId) incrementUsage(userId, 'SITE_CRAWL').catch(() => {})
        
        // Finalize DB record
        if (crawlDbId) {
          try {
            const job = getCrawl(id)
            if (job) {
              // Calculate summary statistics
              const summary = {
                totalPages: job.pages.length,
                pagesWithIssues: job.pages.filter(p => 
                  !p.title || p.h1Count === 0 || !p.metaDescription || (p.imagesWithoutAlt || 0) > 0
                ).length,
                averageWordCount: job.pages.reduce((sum, p) => sum + (p.wordCount || 0), 0) / job.pages.length,
                totalImages: job.pages.reduce((sum, p) => sum + (p.images || 0), 0),
                imagesWithoutAlt: job.pages.reduce((sum, p) => sum + (p.imagesWithoutAlt || 0), 0),
                missingTitles: job.pages.filter(p => !p.title).length,
                missingH1: job.pages.filter(p => (p.h1Count || 0) === 0).length,
                missingMetaDesc: job.pages.filter(p => !p.metaDescription).length,
              }
              
              await (prisma as any).crawl.update({
                where: { id: crawlDbId },
                data: {
                  status: 'COMPLETED',
                  pages: job.pages.length,
                  results: {
                    pages: job.pages.map(p => ({ 
                      url: p.url, 
                      status: p.status, 
                      title: p.title, 
                      metaDescription: p.metaDescription,
                      h1Count: p.h1Count, 
                      h2Count: p.h2Count, 
                      wordCount: p.wordCount, 
                      images: p.images, 
                      imagesWithoutAlt: p.imagesWithoutAlt, 
                      internalLinkCount: p.internalLinkCount, 
                      comprehensive: (p as any).comprehensive ? true : false,
                      fetchedAt: p.fetchedAt,
                      error: p.error
                    })),
                    summary,
                    rootComprehensive: job.pages.find(p => (p as any).comprehensive)?.comprehensive || null
                  },
                  completedAt: new Date()
                }
              })
            }
          } catch (e) {
            console.warn('[dashboard-crawl] failed to finalize crawl persistence', e)
          }
        }
      } catch (err: any) {
        console.error(`[dashboard-crawl] Crawl job ${id} failed:`, err)
        failCrawl(id, err.message || 'crawl failed')
        if (crawlDbId) {
          try { 
            await (prisma as any).crawl.update({ 
              where: { id: crawlDbId }, 
              data: { status: 'FAILED', errors: { increment: 1 } } 
            }) 
          } catch {}
        }
      }
    })().catch(err => {
      console.error(`[dashboard-crawl] Unhandled error in crawl job ${id}:`, err)
    })

    return NextResponse.json({ 
      crawlId: id,
      dbId: crawlDbId,
      status: 'processing',
      message: 'Crawl started successfully'
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'internal error' }, { status: 500 })
  }
}
