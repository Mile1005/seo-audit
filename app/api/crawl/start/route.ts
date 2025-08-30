import { NextRequest, NextResponse } from 'next/server';
import { fetch } from 'undici';
import * as cheerio from 'cheerio';

interface CrawlPage {
  url: string;
  title: string | null;
  h1_presence: boolean;
  word_count: number;
  images_missing_alt: number;
  meta_description: string | null;
  h1_count: number;
  h2_count: number;
  internal_links: number;
  external_links: number;
  images_total: number;
  load_time_ms: number;
  status: number;
}

interface CrawlResult {
  startUrl: string;
  pages: CrawlPage[];
  totalPages: number;
  successfulPages: number;
  failedPages: number;
  averageLoadTime: number;
  crawlTime: number;
  issues: {
    missing_titles: number;
    missing_h1: number;
    missing_meta_descriptions: number;
    images_without_alt: number;
  };
  robotsTxt: { found: boolean };
  sitemapXml: { found: boolean };
  brokenLinks: string[];
}

async function simpleCrawl(startUrl: string, limit: number = 10): Promise<CrawlResult> {
  const startTime = Date.now();
  const pages: CrawlPage[] = [];
  const visited = new Set<string>();
  const queue = [startUrl];
  
  console.log(`Starting simple crawl for: ${startUrl}`);
  
  // Check robots.txt
  let robotsFound = false;
  try {
    const robotsUrl = new URL('/robots.txt', startUrl).toString();
    const robotsRes = await fetch(robotsUrl, { 
      method: 'HEAD',
      signal: AbortSignal.timeout(5000)
    });
    robotsFound = robotsRes.status === 200;
  } catch (e) {
    console.log('Robots.txt check failed:', e);
  }

  // Check sitemap.xml
  let sitemapFound = false;
  try {
    const sitemapUrl = new URL('/sitemap.xml', startUrl).toString();
    const sitemapRes = await fetch(sitemapUrl, { 
      method: 'HEAD',
      signal: AbortSignal.timeout(5000)
    });
    sitemapFound = sitemapRes.status === 200;
  } catch (e) {
    console.log('Sitemap.xml check failed:', e);
  }

  // Crawl pages
  while (queue.length > 0 && pages.length < limit) {
    const url = queue.shift()!;
    
    if (visited.has(url)) continue;
    visited.add(url);

    try {
      const pageStartTime = Date.now();
      console.log(`Crawling: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'SEO-Audit-Crawler/2.0'
        },
        signal: AbortSignal.timeout(10000)
      });

      const loadTime = Date.now() - pageStartTime;
      
      if (!response.ok) {
        pages.push({
          url,
          title: null,
          h1_presence: false,
          word_count: 0,
          images_missing_alt: 0,
          meta_description: null,
          h1_count: 0,
          h2_count: 0,
          internal_links: 0,
          external_links: 0,
          images_total: 0,
          load_time_ms: loadTime,
          status: response.status
        });
        continue;
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Extract page data
      const title = $('title').text().trim() || null;
      const metaDescription = $('meta[name="description"]').attr('content') || null;
      const h1Elements = $('h1');
      const h2Elements = $('h2');
      const images = $('img');
      const links = $('a[href]');
      
      // Count words in text content
      const textContent = $('body').text().replace(/\s+/g, ' ').trim();
      const wordCount = textContent.split(' ').filter(word => word.length > 0).length;

      // Count images without alt text
      let imagesWithoutAlt = 0;
      images.each((_, img) => {
        const alt = $(img).attr('alt');
        if (!alt || alt.trim() === '') {
          imagesWithoutAlt++;
        }
      });

      // Count internal vs external links
      const baseHost = new URL(startUrl).hostname;
      let internalLinks = 0;
      let externalLinks = 0;
      
      links.each((_, link) => {
        const href = $(link).attr('href');
        if (href) {
          try {
            const linkUrl = new URL(href, url);
            if (linkUrl.hostname === baseHost) {
              internalLinks++;
              // Add internal links to queue for crawling
              if (queue.length + pages.length < limit && !visited.has(linkUrl.toString())) {
                queue.push(linkUrl.toString());
              }
            } else {
              externalLinks++;
            }
          } catch (e) {
            // Invalid URL, skip
          }
        }
      });

      const page: CrawlPage = {
        url,
        title,
        h1_presence: h1Elements.length > 0,
        word_count: wordCount,
        images_missing_alt: imagesWithoutAlt,
        meta_description: metaDescription,
        h1_count: h1Elements.length,
        h2_count: h2Elements.length,
        internal_links: internalLinks,
        external_links: externalLinks,
        images_total: images.length,
        load_time_ms: loadTime,
        status: response.status
      };

      pages.push(page);
      console.log(`Crawled successfully: ${url} - Title: ${title?.substring(0, 50) || 'No title'}`);

    } catch (error) {
      console.error(`Failed to crawl ${url}:`, error);
      pages.push({
        url,
        title: null,
        h1_presence: false,
        word_count: 0,
        images_missing_alt: 0,
        meta_description: null,
        h1_count: 0,
        h2_count: 0,
        internal_links: 0,
        external_links: 0,
        images_total: 0,
        load_time_ms: 0,
        status: 0
      });
    }
  }

  const crawlTime = Date.now() - startTime;
  const successfulPages = pages.filter(p => p.status === 200).length;
  const failedPages = pages.length - successfulPages;
  const averageLoadTime = pages.length > 0 
    ? pages.reduce((sum, p) => sum + p.load_time_ms, 0) / pages.length 
    : 0;

  // Calculate issues
  const issues = {
    missing_titles: pages.filter(p => !p.title).length,
    missing_h1: pages.filter(p => !p.h1_presence).length,
    missing_meta_descriptions: pages.filter(p => !p.meta_description).length,
    images_without_alt: pages.reduce((sum, p) => sum + p.images_missing_alt, 0)
  };

  console.log(`Crawl completed: ${pages.length} pages in ${crawlTime}ms`);

  return {
    startUrl,
    pages,
    totalPages: pages.length,
    successfulPages,
    failedPages,
    averageLoadTime,
    crawlTime,
    issues,
    robotsTxt: { found: robotsFound },
    sitemapXml: { found: sitemapFound },
    brokenLinks: []
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { startUrl, limit = 10 } = body;

    if (!startUrl) {
      return NextResponse.json(
        { error: 'Start URL is required' },
        { status: 400 }
      );
    }

    // Validate and normalize URL
    let normalizedUrl: string;
    try {
      const url = new URL(startUrl.startsWith('http') ? startUrl : `https://${startUrl}`);
      normalizedUrl = url.toString();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    console.log(`Starting crawl for: ${normalizedUrl} with limit: ${limit}`);

    // Perform the crawl
    const crawlResult = await simpleCrawl(normalizedUrl, Math.min(limit, 25));

    console.log(`Crawl completed for ${normalizedUrl}:`, {
      totalPages: crawlResult.totalPages,
      successfulPages: crawlResult.successfulPages,
      failedPages: crawlResult.failedPages
    });

    return NextResponse.json({
      status: 'completed',
      result: crawlResult
    });

  } catch (error) {
    console.error('Crawl error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'An error occurred during crawling',
        status: 'failed'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Site Crawler API - Use POST to start crawling',
    example: {
      method: 'POST',
      body: {
        startUrl: 'https://example.com',
        limit: 10
      }
    }
  });
}