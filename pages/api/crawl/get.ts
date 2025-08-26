import type { NextApiRequest, NextApiResponse } from 'next';
import { getCrawlRecord } from '../../../lib/crawl-store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { id } = req.query;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Missing crawl ID parameter' });
    }

  const data = await getCrawlRecord(id);
    if (!data) {
      // Not found yet: still processing/queued
      return res.status(202).json({ status: 'processing' });
    }

    if (data.status === 'processing') {
      return res.status(202).json({ status: 'processing' });
    }

    if (data.status === 'failed') {
      return res.status(200).json({ status: 'failed', error: data.error, result: data.result });
    }

    // completed
  const result = data.result!;
    const transformed = {
      type: 'crawl',
      startUrl: result.startUrl,
      totalPages: result.totalPages,
      successfulPages: result.successfulPages,
      failedPages: result.failedPages,
      averageLoadTime: Math.round(result.averageLoadTime),
      crawlTime: result.crawlTime,
      pages: result.pages.map(p => ({
        url: p.url,
        title: p.title || 'No Title',
        description: p.meta_description || 'No description',
        statusCode: p.status,
        h1: p.h1_presence ? 'Present' : 'Missing',
        meta_description: p.meta_description || '',
        canonical: p.canonical || '',
        noindex: p.noindex,
        internal_links: p.internal_links,
        external_links: p.external_links,
        load_time_ms: p.load_time_ms,
        images_without_alt: p.images_missing_alt,
        h1_count: p.h1_count,
        h2_count: p.h2_count,
        h3_count: p.h3_count,
        word_count: p.word_count,
        images_total: p.images_total,
        depth: p.depth,
        error: p.error || undefined,
      })),
      issues: result.issues,
      robotsTxt: result.robotsTxt,
      sitemapXml: result.sitemapXml,
      brokenLinks: result.brokenLinks,
      timestamp: result.timestamp,
    };

    return res.status(200).json({ status: 'completed', result: transformed });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to get crawl data' });
  }
}
