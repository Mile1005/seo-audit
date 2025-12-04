import { NextRequest, NextResponse } from 'next/server'
import { normalizeUrl } from '@/lib/url/normalize'
import * as cheerio from 'cheerio'

interface CrawlPage {
  url: string
  statusCode: number
  title: string | null
  issues: string[]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    let { url } = body

    const normalized = normalizeUrl(url)
    if (!normalized) {
      return NextResponse.json(
        { error: 'Invalid URL. Please enter a valid website URL.' },
        { status: 400 }
      )
    }

    url = normalized
    const baseUrl = new URL(url)
    const crawledPages: CrawlPage[] = []
    const urlsToCrawl = [url]
    const visited = new Set<string>()
    const maxPages = 10
    let totalLoadTime = 0

    // Check robots.txt and sitemap.xml
    let robotsPresent = false
    let sitemapPresent = false

    try {
      const robotsRes = await fetch(`${baseUrl.origin}/robots.txt`, { method: 'HEAD' })
      robotsPresent = robotsRes.ok
    } catch {}

    try {
      const sitemapRes = await fetch(`${baseUrl.origin}/sitemap.xml`, { method: 'HEAD' })
      sitemapPresent = sitemapRes.ok
    } catch {}

    // Crawl pages
    while (urlsToCrawl.length > 0 && crawledPages.length < maxPages) {
      const currentUrl = urlsToCrawl.shift()!
      if (visited.has(currentUrl)) continue
      visited.add(currentUrl)

      try {
        const startTime = Date.now()
        const response = await fetch(currentUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AISEOTurbo/1.0; +https://aiseoturbo.com)' },
          signal: AbortSignal.timeout(10000)
        })
        totalLoadTime += Date.now() - startTime

        const statusCode = response.status
        const issues: string[] = []

        if (response.ok) {
          const html = await response.text()
          const $ = cheerio.load(html)

          const title = $('title').text().trim()
          const metaDesc = $('meta[name="description"]').attr('content')
          const h1Count = $('h1').length
          const imagesWithoutAlt = $('img').filter((_, el) => !$(el).attr('alt')).length

          if (!title) issues.push('Missing title')
          if (!metaDesc) issues.push('Missing meta description')
          if (h1Count === 0) issues.push('No H1')
          if (h1Count > 1) issues.push('Multiple H1s')
          if (imagesWithoutAlt > 0) issues.push(`${imagesWithoutAlt} images without alt`)

          crawledPages.push({
            url: currentUrl,
            statusCode,
            title: title || null,
            issues
          })

          // Find more links to crawl
          if (crawledPages.length < maxPages) {
            $('a[href]').each((_, el) => {
              const href = $(el).attr('href')
              if (!href) return

              let absoluteUrl: string
              try {
                if (href.startsWith('/')) {
                  absoluteUrl = `${baseUrl.origin}${href}`
                } else if (href.startsWith('http')) {
                  const linkUrl = new URL(href)
                  if (linkUrl.hostname !== baseUrl.hostname) return
                  absoluteUrl = href
                } else {
                  return
                }

                if (!visited.has(absoluteUrl) && !urlsToCrawl.includes(absoluteUrl)) {
                  urlsToCrawl.push(absoluteUrl)
                }
              } catch {}
            })
          }
        } else {
          crawledPages.push({
            url: currentUrl,
            statusCode,
            title: null,
            issues: [`HTTP ${statusCode} error`]
          })
        }
      } catch (error) {
        crawledPages.push({
          url: currentUrl,
          statusCode: 0,
          title: null,
          issues: ['Failed to fetch']
        })
      }
    }

    // Calculate statistics
    const successful = crawledPages.filter(p => p.statusCode >= 200 && p.statusCode < 400).length
    const failed = crawledPages.length - successful
    const avgLoadTimeMs = crawledPages.length > 0 ? Math.round(totalLoadTime / crawledPages.length) : 0

    const missingTitles = crawledPages.filter(p => p.issues.some(i => i.includes('title'))).length
    const missingMeta = crawledPages.filter(p => p.issues.some(i => i.includes('meta'))).length
    const missingH1 = crawledPages.filter(p => p.issues.some(i => i.includes('H1'))).length
    const imagesWithoutAlt = crawledPages.reduce((sum, p) => {
      const match = p.issues.find(i => i.match(/\d+ images without alt/))
      if (match) {
        const num = parseInt(match.match(/\d+/)?.[0] || '0')
        return sum + num
      }
      return sum
    }, 0)

    return NextResponse.json({
      pages: crawledPages,
      stats: {
        totalPages: crawledPages.length,
        successful,
        failed,
        avgLoadTimeMs
      },
      robots: robotsPresent ? 'present' : 'missing',
      sitemap: sitemapPresent ? 'present' : 'missing',
      issuesSummary: {
        missingTitles,
        missingMeta,
        missingH1,
        imagesWithoutAlt
      }
    })

  } catch (error) {
    console.error('Crawl error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to crawl website' },
      { status: 500 }
    )
  }
}
