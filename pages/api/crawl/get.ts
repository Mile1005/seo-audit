import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { id } = req.query;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Missing crawl ID parameter' });
    }
    
    // For now, return a simple mock response since we're not using DB
    // In production, this would query the database or queue status
    return res.status(200).json({
      status: 'ready',
      crawlId: id,
      startUrl: 'example.com',
      result: {
        type: 'crawl',
        pages: [],
        summary: {
          total: 0,
          crawled: 0,
          failed: 0
        }
      }
    });
  } catch (error) {
    console.error('Get crawl error:', error);
    return res.status(500).json({ 
      error: 'Failed to get crawl status', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
