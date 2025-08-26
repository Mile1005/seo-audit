import type { NextApiRequest, NextApiResponse } from 'next';

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
    const { startUrl, limit = 30 } = req.body || {};
    console.log('Request body:', req.body);
    
    if (!startUrl) {
      return res.status(400).json({ error: 'Missing startUrl' });
    }
    
    // Simple mock response for now to test if the endpoint works
    const crawlId = Math.random().toString(36).slice(2);
    
    console.log('Returning mock response for:', startUrl);
    
    return res.status(200).json({ 
      crawlId, 
      status: 'ready', 
      message: `Mock crawl completed for ${startUrl}`, 
      result: { 
        type: 'crawl',
        pages: [
          {
            url: startUrl,
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
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
