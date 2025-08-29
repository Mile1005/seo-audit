import { NextRequest, NextResponse } from 'next/server'
import { performComprehensiveAudit } from '../../../../lib/comprehensive-audit'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, email, keyword } = body

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

    console.log(`Starting SEO audit for: ${normalizedUrl}`)

    // Fetch the webpage with timeout and better error handling
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout
    
    console.log(`Fetching ${normalizedUrl}...`)
    
    let response: Response
    try {
      response = await fetch(normalizedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-Audit-Bot/1.0; +https://seo-audit.com)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        signal: controller.signal,
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error(`Fetch error for ${normalizedUrl}:`, fetchError)
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Request timeout. The website took too long to respond.' 
          },
          { status: 408 }
        )
      }
      
      // Try with http:// if https:// failed
      if (normalizedUrl.startsWith('https://')) {
        const httpUrl = normalizedUrl.replace('https://', 'http://')
        console.log(`Retrying with HTTP: ${httpUrl}`)
        
        try {
          response = await fetch(httpUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; SEO-Audit-Bot/1.0; +https://seo-audit.com)',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            },
            signal: controller.signal,
          })
          normalizedUrl = httpUrl // Update the URL for the results
        } catch (httpError) {
          console.error(`HTTP retry failed for ${httpUrl}:`, httpError)
          return NextResponse.json(
            { 
              success: false, 
              error: `Cannot reach ${url}. Please check if the website is accessible and try again.` 
            },
            { status: 503 }
          )
        }
      } else {
        return NextResponse.json(
          { 
            success: false, 
            error: `Cannot reach ${url}. Please check if the website is accessible and try again.` 
          },
          { status: 503 }
        )
      }
    }
    
    clearTimeout(timeoutId)
    
    console.log(`Response status: ${response.status} for ${normalizedUrl}`)

    if (!response.ok) {
      console.error(`HTTP ${response.status} for ${normalizedUrl}: ${response.statusText}`)
      return NextResponse.json(
        { 
          success: false, 
          error: `Website returned ${response.status} ${response.statusText}. Please check if the URL is correct.` 
        },
        { status: 400 }
      )
    }

    console.log(`Successfully fetched ${normalizedUrl}, parsing HTML...`)
    const html = await response.text()
    console.log(`HTML length: ${html.length} characters`)

    // Perform comprehensive audit
    console.log(`Starting comprehensive audit for ${normalizedUrl}...`)
    const auditResult = await performComprehensiveAudit(html, normalizedUrl)
    console.log(`Audit completed with overall score: ${auditResult.scores.overall}`)

    // Transform the result to match our expected format
    const result = {
      auditId: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'completed' as const,
      url: normalizedUrl,
      score: auditResult.scores.overall,
      timestamp: auditResult.fetched_at,
      pageData: {
        title: auditResult.h_tags.h1[0] || 'No Title Found',
        metaDescription: auditResult.social_meta.og_description || 'No meta description found',
        h1Count: auditResult.h_tags.h1.length,
        h2Count: auditResult.h_tags.h2.length,
        h3Count: auditResult.h_tags.h3.length,
        wordCount: auditResult.stats.word_count,
        imagesTotal: auditResult.stats.images_count,
        imagesWithoutAlt: auditResult.accessibility.failed_checks.includes('Images have alt text') ? auditResult.stats.images_count : 0,
        internalLinks: auditResult.stats.internal_links,
        externalLinks: auditResult.stats.external_links,
        loadTime: auditResult.performance_metrics.largest_contentful_paint * 1000, // Convert to ms
        canonical: null, // Would need to extract from HTML
        noindex: false, // Would need to check robots meta tag
      },
      issues: auditResult.issues,
      recommendations: [
        ...auditResult.issues.map(issue => ({
          type: issue.severity === 'high' ? 'critical' as const : 
                issue.severity === 'medium' ? 'warning' as const : 'suggestion' as const,
          category: 'SEO',
          title: issue.title,
          description: issue.description,
          priority: issue.severity === 'high' ? 1 : issue.severity === 'medium' ? 2 : 3,
        })),
        ...auditResult.quick_wins.map((win, index) => ({
          type: 'suggestion' as const,
          category: 'Quick Win',
          title: win.title,
          description: win.description,
          priority: 3,
        }))
      ],
      robotsTxt: null, // Would need to fetch robots.txt
      sitemapXml: null, // Would need to detect sitemap
      keyword: keyword || null,
      email: email || null,
      
      // Additional comprehensive audit data
      comprehensiveResults: auditResult
    }

    console.log('Sending result with score:', result.score);
    console.log('PageData summary:', {
      h1Count: result.pageData.h1Count,
      wordCount: result.pageData.wordCount,
      imagesTotal: result.pageData.imagesTotal,
      internalLinks: result.pageData.internalLinks
    });
    console.log('Recommendations count:', result.recommendations.length);

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('SEO Audit Error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}
