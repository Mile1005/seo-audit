import type { NextApiRequest, NextApiResponse } from 'next';
import { miniCrawl, CrawlResult } from '../../../lib/crawl';

// Global store for crawl results
const crawlResults = new Map<string, { status: 'processing' | 'completed' | 'failed', result?: CrawlResult, error?: string }>();

// Validate URL format
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Clean URL by adding protocol if missing
function cleanUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API called:', req.method, req.url);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed', 
      method: req.method,
      expectedMethod: 'POST'
    });
  }
  
  try {
    const { startUrl: rawUrl, limit = 10 } = req.body || {};
    console.log('Request body:', req.body);
    
    if (!rawUrl) {
      return res.status(400).json({ error: 'Missing startUrl' });
    }
    
    // Clean and validate URL
    const startUrl = cleanUrl(rawUrl);
    if (!isValidUrl(startUrl)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }
    
    const crawlId = Math.random().toString(36).slice(2);
    console.log('Starting crawl for:', startUrl);
    
    // Store crawl as processing
    crawlResults.set(crawlId, { status: 'processing' });
    
    // Start crawling asynchronously with timeout
    (async () => {
      const crawlTimeout = setTimeout(() => {
        console.log('Crawl timeout reached, setting to failed');
        crawlResults.set(crawlId, { 
          status: 'failed', 
          error: 'Crawl timeout - took longer than 60 seconds'
        });
      }, 60000); // 60 second timeout

      try {
        console.log('Using real crawler with enhanced options');
        const crawlResult = await miniCrawl(startUrl, { 
          limit: Math.min(limit, 10), // Cap at 10 pages for free tier
          sameHostOnly: true, 
          maxDepth: 2, // Reduce depth further for faster completion
          timeout: 10000, // Reduce timeout for faster response
          userAgent: 'SEO-Audit-Bot/2.0 (+https://seo-audit-seven.vercel.app)',
          crawlDelay: 50 // Reduce delay for faster crawling
        });
        
        clearTimeout(crawlTimeout);
        
        console.log('Real crawl completed successfully:', {
          startUrl,
          totalPages: crawlResult.totalPages,
          successfulPages: crawlResult.successfulPages,
          failedPages: crawlResult.failedPages
        });
        
        // Store successful result
        crawlResults.set(crawlId, { 
          status: 'completed', 
          result: crawlResult 
        });
        
      } catch (crawlError) {
        clearTimeout(crawlTimeout);
        console.error('Real crawl failed:', crawlError);
        
        // Store error but create a fallback result with some real data
        const fallbackResult: CrawlResult = {
          startUrl,
          pages: [{
            url: startUrl,
            depth: 0,
            status: 0,
            title: null,
            h1_presence: false,
            word_count: 0,
            images_missing_alt: 0,
            noindex: false,
            canonical: null,
            meta_description: null,
            h1_count: 0,
            h2_count: 0,
            h3_count: 0,
            internal_links: 0,
            external_links: 0,
            images_total: 0,
            load_time_ms: 0,
            error: crawlError instanceof Error ? crawlError.message : 'Crawl failed'
          }],
          totalPages: 1,
          successfulPages: 0,
          failedPages: 1,
          averageLoadTime: 0,
          issues: {
            noindex_pages: 0,
            missing_titles: 1,
            missing_h1: 1,
            missing_meta_descriptions: 1,
            images_without_alt: 0,
            pages_without_canonical: 1,
            broken_links: 0,
            duplicate_titles: [],
            duplicate_canonicals: []
          },
          robotsTxt: { found: false, url: `${new URL(startUrl).origin}/robots.txt` },
          sitemapXml: { found: false, url: `${new URL(startUrl).origin}/sitemap.xml` },
          brokenLinks: [],
          crawlTime: 0,
          timestamp: new Date().toISOString()
        };
        
        crawlResults.set(crawlId, { 
          status: 'failed', 
          result: fallbackResult,
          error: crawlError instanceof Error ? crawlError.message : 'Unknown error'
        });
      }
    })();
    
    // Return crawl ID immediately for polling
    return res.status(200).json({ 
      crawlId, 
      status: 'processing', 
      message: `Crawl started for ${startUrl}. Use /api/crawl/get?id=${crawlId} to check status.`,
      estimatedTime: '5-30 seconds'
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}

// Export the results store for access from other endpoints
export { crawlResults };
