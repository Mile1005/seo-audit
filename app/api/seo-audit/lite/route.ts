import { NextRequest, NextResponse } from 'next/server'
import { normalizeUrl } from '@/lib/url/normalize'
import * as cheerio from 'cheerio'

// Simple rate limiting by IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)
  
  if (!limit || now > limit.resetTime) {
    // Reset or first request
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 }) // 1 hour
    return true
  }
  
  if (limit.count >= 3) {
    // Exceeded limit
    return false
  }
  
  // Increment count
  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again in an hour or sign up for unlimited audits.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    let { url } = body

    // Normalize URL
    const normalized = normalizeUrl(url)
    if (!normalized) {
      return NextResponse.json(
        { error: 'Invalid URL. Please enter a valid website URL.' },
        { status: 400 }
      )
    }

    url = normalized

    // Fetch the page
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AISEOTurbo/1.0; +https://aiseoturbo.com)'
      }
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Perform lite SEO checks
    const issues: Array<{ title: string; description: string; severity: 'high' | 'medium' | 'low' }> = []
    const quickWins: string[] = []
    let passedChecks = 0
    let failedChecks = 0
    const totalChecks = 8

    // Check 1: Title tag
    const title = $('title').text().trim()
    if (!title) {
      issues.push({
        title: 'Missing Title Tag',
        description: 'Your page doesn\'t have a title tag. This is critical for SEO.',
        severity: 'high'
      })
      failedChecks++
    } else if (title.length < 30 || title.length > 60) {
      quickWins.push(`Optimize title length (currently ${title.length} chars, ideal 30-60)`)
      failedChecks++
    } else {
      passedChecks++
    }

    // Check 2: Meta description
    const metaDesc = $('meta[name="description"]').attr('content')?.trim()
    if (!metaDesc) {
      issues.push({
        title: 'Missing Meta Description',
        description: 'Add a compelling meta description to improve click-through rates.',
        severity: 'high'
      })
      failedChecks++
    } else if (metaDesc.length < 120 || metaDesc.length > 160) {
      quickWins.push(`Adjust meta description length (currently ${metaDesc.length} chars, ideal 120-160)`)
      failedChecks++
    } else {
      passedChecks++
    }

    // Check 3: H1 tags
    const h1Tags = $('h1')
    if (h1Tags.length === 0) {
      issues.push({
        title: 'Missing H1 Tag',
        description: 'Add a primary H1 heading to clearly define your page topic.',
        severity: 'high'
      })
      failedChecks++
    } else if (h1Tags.length > 1) {
      quickWins.push(`Multiple H1 tags found (${h1Tags.length}). Use only one H1 per page.`)
      failedChecks++
    } else {
      passedChecks++
    }

    // Check 4: Images without alt text
    const images = $('img')
    const imagesWithoutAlt = images.filter((_, el) => !$(el).attr('alt')).length
    if (imagesWithoutAlt > 0) {
      issues.push({
        title: `${imagesWithoutAlt} Images Missing Alt Text`,
        description: 'Add descriptive alt text to images for accessibility and SEO.',
        severity: 'medium'
      })
      failedChecks++
    } else {
      passedChecks++
    }

    // Check 5: HTTPS
    if (!url.startsWith('https://')) {
      issues.push({
        title: 'Not Using HTTPS',
        description: 'Switch to HTTPS for security and better SEO rankings.',
        severity: 'high'
      })
      failedChecks++
    } else {
      passedChecks++
    }

    // Check 6: Internal links
    const internalLinks = $('a[href^="/"], a[href^="' + url + '"]').length
    if (internalLinks < 3) {
      quickWins.push('Add more internal links to improve site navigation and SEO.')
      failedChecks++
    } else {
      passedChecks++
    }

    // Check 7: Page content length
    const textContent = $('body').text().trim()
    const wordCount = textContent.split(/\s+/).length
    if (wordCount < 300) {
      quickWins.push(`Expand content (currently ~${wordCount} words, aim for 300+)`)
      failedChecks++
    } else {
      passedChecks++
    }

    // Check 8: Mobile viewport
    const viewport = $('meta[name="viewport"]').attr('content')
    if (!viewport || !viewport.includes('width=device-width')) {
      issues.push({
        title: 'Missing Mobile Viewport',
        description: 'Add viewport meta tag for proper mobile rendering.',
        severity: 'medium'
      })
      failedChecks++
    } else {
      passedChecks++
    }

    // Calculate score (0-100)
    const score = Math.round((passedChecks / totalChecks) * 100)

    // Return lite results
    return NextResponse.json({
      score,
      url,
      criticalIssues: issues.slice(0, 3), // Top 3 issues
      quickWins: quickWins.slice(0, 2), // Top 2 quick wins
      isLite: true,
      fullReportAvailable: true,
      message: 'Sign up free to unlock 40+ additional SEO checks, Core Web Vitals, and detailed recommendations',
      stats: {
        totalChecks,
        passedChecks,
        failedChecks
      }
    })

  } catch (error) {
    console.error('Lite audit error:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to audit website. Please check the URL and try again.' 
      },
      { status: 500 }
    )
  }
}
