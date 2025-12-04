import { NextRequest, NextResponse } from 'next/server'
import { normalizeUrl } from '@/lib/url/normalize'
import * as cheerio from 'cheerio'

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 })
    return true
  }
  if (limit.count >= 5) return false
  limit.count++
  return true
}

function calculateReadability(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
  const words = text.split(/\s+/).filter(w => w.length > 0)
  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0)
  
  if (sentences === 0 || words.length === 0) return 0
  
  const fleschScore = 206.835 - 1.015 * (words.length / sentences) - 84.6 * (syllables / words.length)
  return Math.max(0, Math.min(100, Math.round(fleschScore)))
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '')
  if (word.length <= 3) return 1
  const vowels = word.match(/[aeiouy]+/g)
  return vowels ? vowels.length : 1
}

function extractKeywords(text: string, limit = 5): Array<{ word: string; count: number }> {
  const stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for', 'of', 'as', 'by', 'that', 'this', 'it', 'from', 'are', 'was', 'be', 'been', 'has', 'have', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'])
  
  const words = text.toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !stopWords.has(w))
  
  const frequency = new Map<string, number>()
  words.forEach(word => frequency.set(word, (frequency.get(word) || 0) + 1))
  
  return Array.from(frequency.entries())
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

interface CheckResult {
  id: string
  category: string
  name: string
  passed: boolean
  severity: 'high' | 'medium' | 'low'
  message: string
  value?: string | number
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again in an hour or sign up for unlimited audits.' },
        { status: 429 }
      )
    }

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

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 20000)
    const startTime = Date.now()
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AISEOTurbo/1.0; +https://aiseoturbo.com)' }
    })
    
    const loadTime = Date.now() - startTime
    clearTimeout(timeoutId)

    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`)

    const html = await response.text()
    const htmlSize = Buffer.byteLength(html, 'utf8')
    const $ = cheerio.load(html)

    const checks: CheckResult[] = []
    const issues: Array<{ title: string; description: string; severity: 'high' | 'medium' | 'low' }> = []
    const quickWins: string[] = []

    // Extract text for analysis
    const bodyText = $('body').text().trim()
    const wordCount = bodyText.split(/\s+/).filter(w => w.length > 0).length

    // ============ BASIC SEO (8 checks) ============
    const title = $('title').text().trim()
    if (!title) {
      checks.push({ id: 'title_exists', category: 'SEO', name: 'Title Tag', passed: false, severity: 'high', message: 'Missing title tag' })
      issues.push({ title: 'Missing Title Tag', description: 'Critical: Add a title tag to your page for SEO.', severity: 'high' })
    } else if (title.length < 30) {
      checks.push({ id: 'title_length', category: 'SEO', name: 'Title Length', passed: false, severity: 'medium', message: `Too short (${title.length} chars)`, value: title.length })
      quickWins.push(`Expand title to 30-60 characters (currently ${title.length})`)
    } else if (title.length > 60) {
      checks.push({ id: 'title_length', category: 'SEO', name: 'Title Length', passed: false, severity: 'low', message: `Too long (${title.length} chars)`, value: title.length })
      quickWins.push(`Shorten title to 30-60 characters (currently ${title.length})`)
    } else {
      checks.push({ id: 'title_length', category: 'SEO', name: 'Title Length', passed: true, severity: 'low', message: 'Optimal', value: title.length })
    }

    const metaDesc = $('meta[name="description"]').attr('content')?.trim()
    if (!metaDesc) {
      checks.push({ id: 'meta_desc', category: 'SEO', name: 'Meta Description', passed: false, severity: 'high', message: 'Missing' })
      issues.push({ title: 'Missing Meta Description', description: 'Add a meta description (120-160 chars) for better CTR.', severity: 'high' })
    } else if (metaDesc.length < 120 || metaDesc.length > 160) {
      checks.push({ id: 'meta_desc_length', category: 'SEO', name: 'Meta Description Length', passed: false, severity: 'medium', message: `${metaDesc.length} chars`, value: metaDesc.length })
      if (metaDesc.length < 120) quickWins.push(`Expand meta description to 120-160 characters`)
    } else {
      checks.push({ id: 'meta_desc_length', category: 'SEO', name: 'Meta Description', passed: true, severity: 'low', message: 'Optimal', value: metaDesc.length })
    }

    const h1Tags = $('h1')
    if (h1Tags.length === 0) {
      checks.push({ id: 'h1_exists', category: 'SEO', name: 'H1 Tag', passed: false, severity: 'high', message: 'No H1 found' })
      issues.push({ title: 'Missing H1 Tag', description: 'Add a primary H1 heading to define your page topic.', severity: 'high' })
    } else if (h1Tags.length > 1) {
      checks.push({ id: 'h1_single', category: 'SEO', name: 'Single H1', passed: false, severity: 'medium', message: `${h1Tags.length} H1s found`, value: h1Tags.length })
      quickWins.push(`Use only one H1 per page (found ${h1Tags.length})`)
    } else {
      checks.push({ id: 'h1_single', category: 'SEO', name: 'H1 Tag', passed: true, severity: 'low', message: 'Single H1 present' })
    }

    const h2Count = $('h2').length
    const h3Count = $('h3').length
    const hasHierarchy = h1Tags.length === 1 && h2Count > 0
    checks.push({
      id: 'heading_hierarchy',
      category: 'SEO',
      name: 'Heading Hierarchy',
      passed: hasHierarchy,
      severity: 'medium',
      message: `H1:${h1Tags.length}, H2:${h2Count}, H3:${h3Count}`,
      value: `${h1Tags.length}/${h2Count}/${h3Count}`
    })
    if (!hasHierarchy && h2Count === 0) quickWins.push('Add H2 subheadings to structure your content')

    if (wordCount < 300) {
      checks.push({ id: 'word_count', category: 'Content', name: 'Word Count', passed: false, severity: 'medium', message: `${wordCount} words`, value: wordCount })
      quickWins.push(`Add more content (currently ${wordCount} words, aim for 300+)`)
    } else {
      checks.push({ id: 'word_count', category: 'Content', name: 'Word Count', passed: true, severity: 'low', message: `${wordCount} words`, value: wordCount })
    }

    const hostname = new URL(url).hostname
    const allLinks = $('a[href]')
    const internalLinks = allLinks.filter((_, el) => {
      const href = $(el).attr('href') || ''
      return href.startsWith('/') || href.includes(hostname)
    }).length
    checks.push({
      id: 'internal_links',
      category: 'SEO',
      name: 'Internal Links',
      passed: internalLinks >= 5,
      severity: 'medium',
      message: `${internalLinks} found`,
      value: internalLinks
    })
    if (internalLinks < 5) quickWins.push('Add more internal links for better navigation and SEO')

    const externalLinks = allLinks.filter((_, el) => {
      const href = $(el).attr('href') || ''
      return href.startsWith('http') && !href.includes(hostname)
    }).length
    checks.push({ id: 'external_links', category: 'SEO', name: 'External Links', passed: true, severity: 'low', message: `${externalLinks} found`, value: externalLinks })

    const canonical = $('link[rel="canonical"]').attr('href')
    checks.push({ id: 'canonical', category: 'Technical', name: 'Canonical Tag', passed: !!canonical, severity: 'medium', message: canonical ? 'Present' : 'Missing' })
    if (!canonical) quickWins.push('Add canonical tag to prevent duplicate content issues')

    // ============ TECHNICAL SEO (7 checks) ============
    checks.push({ id: 'https', category: 'Technical', name: 'HTTPS', passed: url.startsWith('https://'), severity: 'high', message: url.startsWith('https://') ? 'Secure' : 'Not secure' })
    if (!url.startsWith('https://')) issues.push({ title: 'Not Using HTTPS', description: 'Switch to HTTPS for security and SEO.', severity: 'high' })

    const robotsMeta = $('meta[name="robots"]').attr('content')
    const hasNoIndex = robotsMeta?.includes('noindex')
    checks.push({ id: 'robots_meta', category: 'Technical', name: 'Robots Meta', passed: !hasNoIndex, severity: hasNoIndex ? 'high' : 'low', message: robotsMeta || 'Default (index)' })
    if (hasNoIndex) issues.push({ title: 'Page Set to NoIndex', description: 'Remove noindex directive to allow indexing.', severity: 'high' })

    const viewport = $('meta[name="viewport"]').attr('content')
    const hasMobileViewport = viewport?.includes('width=device-width')
    checks.push({ id: 'viewport', category: 'Mobile', name: 'Mobile Viewport', passed: !!hasMobileViewport, severity: 'high', message: hasMobileViewport ? 'Mobile-friendly' : 'Missing' })
    if (!hasMobileViewport) issues.push({ title: 'Missing Mobile Viewport', description: 'Add viewport meta for mobile rendering.', severity: 'high' })

    const htmlLang = $('html').attr('lang')
    checks.push({ id: 'lang', category: 'Technical', name: 'Language', passed: !!htmlLang, severity: 'medium', message: htmlLang || 'Not set' })

    const charset = $('meta[charset]').attr('charset')
    checks.push({ id: 'charset', category: 'Technical', name: 'Charset', passed: !!charset, severity: 'low', message: charset || 'Not declared' })

    const favicon = $('link[rel="icon"], link[rel="shortcut icon"]').length > 0
    checks.push({ id: 'favicon', category: 'Technical', name: 'Favicon', passed: favicon, severity: 'low', message: favicon ? 'Present' : 'Missing' })

    const jsonLd = $('script[type="application/ld+json"]').length
    checks.push({ id: 'schema', category: 'Technical', name: 'Schema Markup', passed: jsonLd > 0, severity: 'low', message: jsonLd > 0 ? `${jsonLd} blocks` : 'None found', value: jsonLd })
    if (jsonLd === 0) quickWins.push('Add JSON-LD structured data for rich snippets')

    // ============ SECURITY HEADERS (3 checks) ============
    const csp = response.headers.get('content-security-policy')
    checks.push({ id: 'csp', category: 'Security', name: 'Content Security Policy', passed: !!csp, severity: 'medium', message: csp ? 'Configured' : 'Not set' })

    const xFrame = response.headers.get('x-frame-options')
    checks.push({ id: 'x_frame', category: 'Security', name: 'X-Frame-Options', passed: !!xFrame, severity: 'medium', message: xFrame || 'Not set' })

    const hsts = response.headers.get('strict-transport-security')
    checks.push({ id: 'hsts', category: 'Security', name: 'HSTS', passed: !!hsts, severity: 'low', message: hsts ? 'Enabled' : 'Not enabled' })

    // ============ SOCIAL META (4 checks) ============
    const ogTitle = $('meta[property="og:title"]').attr('content')
    const ogDesc = $('meta[property="og:description"]').attr('content')
    const ogImage = $('meta[property="og:image"]').attr('content')
    const twitterCard = $('meta[name="twitter:card"]').attr('content')

    checks.push({ id: 'og_title', category: 'Social', name: 'OG Title', passed: !!ogTitle, severity: 'low', message: ogTitle ? 'Set' : 'Missing' })
    checks.push({ id: 'og_desc', category: 'Social', name: 'OG Description', passed: !!ogDesc, severity: 'low', message: ogDesc ? 'Set' : 'Missing' })
    checks.push({ id: 'og_image', category: 'Social', name: 'OG Image', passed: !!ogImage, severity: 'medium', message: ogImage ? 'Set' : 'Missing' })
    checks.push({ id: 'twitter_card', category: 'Social', name: 'Twitter Card', passed: !!twitterCard, severity: 'low', message: twitterCard || 'Not set' })
    if (!ogImage) quickWins.push('Add Open Graph image for better social sharing')

    // ============ ACCESSIBILITY (6 checks) ============
    const images = $('img')
    const imagesWithoutAlt = images.filter((_, el) => !$(el).attr('alt')).length
    const altPercent = images.length > 0 ? Math.round(((images.length - imagesWithoutAlt) / images.length) * 100) : 100
    checks.push({ id: 'img_alt', category: 'Accessibility', name: 'Image Alt Text', passed: imagesWithoutAlt === 0, severity: 'medium', message: `${altPercent}% have alt`, value: altPercent })
    if (imagesWithoutAlt > 0) issues.push({ title: `${imagesWithoutAlt} Images Missing Alt`, description: 'Add alt text to all images for accessibility.', severity: 'medium' })

    const landmarks = $('main, nav, header, footer, [role="main"], [role="navigation"], [role="banner"], [role="contentinfo"]').length
    checks.push({ id: 'landmarks', category: 'Accessibility', name: 'ARIA Landmarks', passed: landmarks >= 3, severity: 'medium', message: `${landmarks} landmarks`, value: landmarks })
    if (landmarks < 3) quickWins.push('Add semantic HTML5 elements (main, nav, header, footer)')

    const inputs = $('input:not([type="hidden"]), textarea, select')
    const labeledInputs = inputs.filter((_, el) => {
      const id = $(el).attr('id')
      const ariaLabel = $(el).attr('aria-label')
      return !!((id && $(`label[for="${id}"]`).length > 0) || ariaLabel)
    }).length
    if (inputs.length > 0) {
      const labelPercent = Math.round((labeledInputs / inputs.length) * 100)
      checks.push({ id: 'form_labels', category: 'Accessibility', name: 'Form Labels', passed: labeledInputs === inputs.length, severity: 'medium', message: `${labelPercent}% labeled`, value: labelPercent })
      if (labeledInputs < inputs.length) issues.push({ title: 'Unlabeled Form Inputs', description: `${inputs.length - labeledInputs} inputs need labels or aria-label.`, severity: 'medium' })
    }

    const buttons = $('button, [role="button"]')
    const labeledButtons = buttons.filter((_, el) => !!($(el).text().trim() || $(el).attr('aria-label'))).length
    if (buttons.length > 0) {
      const btnPercent = Math.round((labeledButtons / buttons.length) * 100)
      checks.push({ id: 'button_labels', category: 'Accessibility', name: 'Button Labels', passed: labeledButtons === buttons.length, severity: 'medium', message: `${btnPercent}% labeled`, value: btnPercent })
    }

    const emptyLinks = $('a').filter((_, el) => !$(el).text().trim() && !$(el).attr('aria-label')).length
    checks.push({ id: 'link_text', category: 'Accessibility', name: 'Link Text', passed: emptyLinks === 0, severity: 'medium', message: emptyLinks > 0 ? `${emptyLinks} empty links` : 'All links labeled', value: emptyLinks })

    const skipLink = $('a[href^="#"]').first().text().toLowerCase().includes('skip')
    checks.push({ id: 'skip_link', category: 'Accessibility', name: 'Skip to Content', passed: skipLink, severity: 'low', message: skipLink ? 'Present' : 'Missing' })

    // ============ PERFORMANCE (5 checks) ============
    const loadSec = (loadTime / 1000).toFixed(2)
    checks.push({ id: 'load_time', category: 'Performance', name: 'Server Response', passed: loadTime < 1000, severity: loadTime > 2000 ? 'high' : 'medium', message: `${loadSec}s`, value: loadTime })
    if (loadTime > 1000) issues.push({ title: 'Slow Server Response', description: `Server took ${loadSec}s. Aim for under 1s.`, severity: loadTime > 2000 ? 'high' : 'medium' })

    const sizeKB = Math.round(htmlSize / 1024)
    checks.push({ id: 'html_size', category: 'Performance', name: 'HTML Size', passed: sizeKB < 100, severity: sizeKB > 150 ? 'medium' : 'low', message: `${sizeKB}KB`, value: sizeKB })
    if (sizeKB > 100) quickWins.push(`Reduce HTML size (${sizeKB}KB, aim for <100KB)`)

    const nonOptimizedImages = images.filter((_, el) => {
      const src = $(el).attr('src') || ''
      return !src.includes('.webp') && !src.includes('.svg') && !src.includes('.avif')
    }).length
    const imgOptPercent = images.length > 0 ? Math.round(((images.length - nonOptimizedImages) / images.length) * 100) : 100
    checks.push({ id: 'img_format', category: 'Performance', name: 'Image Format', passed: imgOptPercent > 70, severity: 'medium', message: `${imgOptPercent}% optimized`, value: imgOptPercent })

    const scripts = $('script[src]').length
    checks.push({ id: 'scripts', category: 'Performance', name: 'External Scripts', passed: scripts < 10, severity: scripts > 15 ? 'medium' : 'low', message: `${scripts} scripts`, value: scripts })

    const deferredScripts = $('script[defer], script[async]').length
    const deferPercent = scripts > 0 ? Math.round((deferredScripts / scripts) * 100) : 100
    checks.push({ id: 'deferred_scripts', category: 'Performance', name: 'Async Scripts', passed: deferPercent > 60, severity: 'medium', message: `${deferPercent}% async`, value: deferPercent })

    // ============ CONTENT ANALYSIS ============
    const readabilityScore = calculateReadability(bodyText)
    const keywords = extractKeywords(bodyText, 5)

    // ============ CALCULATE SCORES ============
    const totalChecks = checks.length
    const passedChecks = checks.filter(c => c.passed).length
    const failedChecks = totalChecks - passedChecks

    const weights = { high: 3, medium: 2, low: 1 }
    let weightedScore = 0
    let totalWeight = 0
    checks.forEach(check => {
      const weight = weights[check.severity]
      totalWeight += weight
      if (check.passed) weightedScore += weight
    })
    const score = Math.round((weightedScore / totalWeight) * 100)

    const byCategory = checks.reduce((acc, check) => {
      if (!acc[check.category]) acc[check.category] = { total: 0, passed: 0, checks: [] }
      acc[check.category].total++
      if (check.passed) acc[check.category].passed++
      acc[check.category].checks.push(check)
      return acc
    }, {} as Record<string, { total: number; passed: number; checks: CheckResult[] }>)

    return NextResponse.json({
      score,
      url,
      criticalIssues: issues.slice(0, 5),
      quickWins: quickWins.slice(0, 3),
      checks,
      checksByCategory: byCategory,
      isLite: true,
      fullReportAvailable: true,
      message: 'Sign up free to unlock Core Web Vitals, full accessibility audit, crawling, and detailed recommendations',
      stats: { totalChecks, passedChecks, failedChecks },
      performance: { loadTime: parseFloat(loadSec), htmlSize: sizeKB },
      contentAnalysis: {
        readability: readabilityScore,
        keywords: keywords,
        wordCount
      }
    })

  } catch (error) {
    console.error('Lite audit error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to audit website. Please check the URL and try again.' },
      { status: 500 }
    )
  }
}
