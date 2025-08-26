import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('GET API called:', req.method, req.url, req.query);
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { id } = req.query;
    console.log('Crawl ID requested:', id);
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Missing crawl ID parameter' });
    }
    
    // Simple mock response
    console.log('Returning mock crawl result for ID:', id);
    
    return res.status(200).json({
      status: 'ready',
      crawlId: id,
      startUrl: 'https://example.com',
      result: {
        type: 'crawl',
        pages: [
          {
            url: 'https://example.com',
            title: 'Mock Page Title',
            description: 'Mock page description',
            statusCode: 200
          }
        ],
        summary: {
          total: 1,
          crawled: 1,
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
