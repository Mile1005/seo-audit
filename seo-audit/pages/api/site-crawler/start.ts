import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, max_pages, max_depth, same_host_only } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Generate unique crawl ID
    const crawlId = crypto.randomUUID();

    // For now, return a mock response
    // In a real implementation, this would:
    // 1. Create a crawl record in the database
    // 2. Queue the crawl job
    // 3. Return the crawl ID for polling

    const response = {
      crawlId,
      status: 'queued',
      message: `Site crawl started for ${url}`,
      estimatedTime: '2-5 minutes',
      settings: {
        maxPages: max_pages || 50,
        maxDepth: max_depth || 3,
        sameHostOnly: same_host_only !== false,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Site crawler start error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
