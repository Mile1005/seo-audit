import { NextRequest, NextResponse } from 'next/server'
import { normalizeUrl } from '@/lib/url/normalize'
import * as cheerio from 'cheerio'

interface CrawlPage {
  url: string
  statusCode: number
  title: string | null
  metaDescription: string | null
  h1: string | null
  loadTime: number
  issues: string[]
}

interface DuplicateContent {
  type: 'title' | 'meta'
  content: string
  urls: string[]
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
    const brokenLinks: string[] = []
    const redirectChains: Array<{ from: string; to: string }> = []

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
        const pageStartTime = Date.now()
        const response = await fetch(currentUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AISEOTurbo/1.0; +https://aiseoturbo.com)' },
          signal: AbortSignal.timeout(10000),
          redirect: 'manual'
        })
        const pageLoadTime = Date.now() - pageStartTime
        totalLoadTime += pageLoadTime

        const statusCode = response.status
        const issues: string[] = []

        // Check for redirects
        if (statusCode >= 300 && statusCode < 400) {
          const location = response.headers.get('location')
          if (location) {
            redirectChains.push({ from: currentUrl, to: location })
            issues.push(`Redirects to ${location}`)
          }
        }

        if (response.ok) {
          const html = await response.text()
          const $ = cheerio.load(html)

          const title = $('title').text().trim()
          const metaDesc = $('meta[name="description"]').attr('content')?.trim() || null
          const h1 = $('h1').first().text().trim() || null
          const h1Count = $('h1').length
          const imagesWithoutAlt = $('img').filter((_, el) => !$(el).attr('alt')).length

          if (!title) issues.push('Missing title')
          if (!metaDesc) issues.push('Missing meta description')
          if (h1Count === 0) issues.push('No H1')
          if (h1Count > 1) issues.push(`${h1Count} H1 tags`)
          if (imagesWithoutAlt > 0) issues.push(`${imagesWithoutAlt} images without alt`)

          // Check for broken links on this page
          $('a[href]').each((_, el) => {
            const href = $(el).attr('href')
            if (href && href.startsWith('http') && !visited.has(href)) {
              // Mark for potential checking (not doing full check in lite version)
            }
          })

          crawledPages.push({
            url: currentUrl,
            statusCode,
            title: title || null,
            metaDescription: metaDesc,
            h1,
            loadTime: pageLoadTime,
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

                // Remove hash and query for deduplication
                const cleanUrl = absoluteUrl.split('#')[0].split('?')[0]
                if (!visited.has(cleanUrl) && !urlsToCrawl.includes(cleanUrl)) {
                  urlsToCrawl.push(cleanUrl)
                }
              } catch {}
            })
          }
        } else if (statusCode >= 400) {
          crawledPages.push({
            url: currentUrl,
            statusCode,
            title: null,
            metaDescription: null,
            h1: null,
            loadTime: pageLoadTime,
            issues: [`HTTP ${statusCode} error`]
          })
          if (statusCode >= 400 && statusCode < 500) {
            brokenLinks.push(currentUrl)
          }
        }
      } catch (error) {
        crawledPages.push({
          url: currentUrl,
          statusCode: 0,
          title: null,
          metaDescription: null,
          h1: null,
          loadTime: 0,
          issues: ['Failed to fetch']
        })
        brokenLinks.push(currentUrl)
      }
    }

    // Detect duplicate content
    const titleMap = new Map<string, string[]>()
    const metaMap = new Map<string, string[]>()
    const duplicates: DuplicateContent[] = []

    crawledPages.forEach(page => {
      if (page.title) {
        const urls = titleMap.get(page.title) || []
        urls.push(page.url)
        titleMap.set(page.title, urls)
      }
      if (page.metaDescription) {
        const urls = metaMap.get(page.metaDescription) || []
        urls.push(page.url)
        metaMap.set(page.metaDescription, urls)
      }
    })

    titleMap.forEach((urls, title) => {
      if (urls.length > 1) {
        duplicates.push({ type: 'title', content: title, urls })
      }
    })

    metaMap.forEach((urls, meta) => {
      if (urls.length > 1) {
        duplicates.push({ type: 'meta', content: meta, urls })
      }
    })

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
        imagesWithoutAlt,
        brokenLinks: brokenLinks.length,
        redirectChains: redirectChains.length,
        duplicateContent: duplicates.length
      },
      duplicates: duplicates.slice(0, 3),
      redirectChains: redirectChains.slice(0, 5),
      brokenLinks: brokenLinks.slice(0, 5)
    })

  } catch (error) {
    console.error('Crawl error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to crawl website' },
      { status: 500 }
    )
  }
}
