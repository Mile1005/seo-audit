import type { NextApiRequest, NextApiResponse } from 'next';
import { miniCrawl, type CrawlResult } from '../../../lib/crawl';
import { saveCrawlRecord } from '../../../lib/crawl-store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { id, url, limit = 10 } = req.body || {};
    if (!id || !url) {
      return res.status(400).json({ error: 'Missing id or url' });
    }

    // Safer, fast options to fit Vercel serverless time limits
    const fastLimit = Math.min(Number(limit) || 10, 6);
    const options = {
      limit: fastLimit,
      sameHostOnly: true,
      maxDepth: 1,
      timeout: 2500,
      userAgent: 'SEO-Audit-Bot/2.0 (+https://seo-audit-seven.vercel.app)',
      crawlDelay: 10,
    } as const;

    const result = await miniCrawl(url, options);

    await saveCrawlRecord(id, { status: 'completed', result });

    return res.status(200).json({ ok: true, id, pages: result.totalPages });
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Unknown error';
    const { id, url } = req.body || {};
    if (id && url) {
      const fallback: CrawlResult = {
        startUrl: url,
        pages: [{
          url,
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
          error
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
        robotsTxt: { found: false, url: `${new URL(url).origin}/robots.txt` },
        sitemapXml: { found: false, url: `${new URL(url).origin}/sitemap.xml` },
        brokenLinks: [],
        crawlTime: 0,
        timestamp: new Date().toISOString()
      };
      await saveCrawlRecord(id, { status: 'failed', error, result: fallback });
    }
    return res.status(200).json({ ok: false, error });
  }
}
