import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Crawl ID is required' });
    }

    // For now, return mock data - in production this would check the actual crawl status
    const mockResult = {
      status: 'completed',
      result: {
        startUrl: 'https://example.com',
        pages: [
          {
            url: 'https://example.com',
            depth: 0,
            status: 200,
            title: 'Example Domain',
            h1_presence: true,
            word_count: 150,
            images_missing_alt: 2,
            noindex: false,
            canonical: 'https://example.com',
            meta_description: 'This domain is for use in illustrative examples.',
            h1_count: 1,
            h2_count: 3,
            h3_count: 2,
            internal_links: 5,
            external_links: 2,
            images_total: 4,
            load_time_ms: 1200,
          },
          {
            url: 'https://example.com/about',
            depth: 1,
            status: 200,
            title: 'About Us',
            h1_presence: true,
            word_count: 300,
            images_missing_alt: 1,
            noindex: false,
            canonical: 'https://example.com/about',
            meta_description: 'Learn more about our company and mission.',
            h1_count: 1,
            h2_count: 2,
            h3_count: 1,
            internal_links: 3,
            external_links: 1,
            images_total: 2,
            load_time_ms: 980,
          },
        ],
        totalPages: 2,
        successfulPages: 2,
        failedPages: 0,
        averageLoadTime: 1090,
        issues: {
          noindex_pages: 0,
          missing_titles: 0,
          missing_h1: 0,
          missing_meta_descriptions: 0,
          images_without_alt: 3,
          pages_without_canonical: 0,
          broken_links: 0,
          duplicate_titles: [],
          duplicate_canonicals: [],
        },
        robotsTxt: { found: true, url: 'https://example.com/robots.txt', status: 200 },
        sitemapXml: { found: false, url: 'https://example.com/sitemap.xml', status: 404 },
        brokenLinks: [],
        crawlTime: 45,
        timestamp: new Date().toISOString(),
      },
    };

    res.status(200).json(mockResult);
  } catch (error) {
    console.error('Site crawler status error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
