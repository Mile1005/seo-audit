import type { NextApiRequest, NextApiResponse } from 'next';

// Import functions with error handling
let crawlQueue: any, isCrawlQueueConfigured: any, miniCrawl: any, dbHelpers: any;

async function loadDependencies() {
  try {
    const crawlQueueModule = await import('../../../lib/crawl-queue');
    crawlQueue = crawlQueueModule.crawlQueue;
    isCrawlQueueConfigured = crawlQueueModule.isCrawlQueueConfigured;
    
    const crawlModule = await import('../../../lib/crawl');
    miniCrawl = crawlModule.miniCrawl;
    
    const dbModule = await import('../../../lib/db');
    dbHelpers = dbModule.dbHelpers;
    
    return true;
  } catch (error) {
    console.error('Failed to load dependencies:', error);
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Load dependencies dynamically
    const depsLoaded = await loadDependencies();
    if (!depsLoaded) {
      return res.status(500).json({ error: 'Failed to load dependencies' });
    }
    
    const { startUrl, limit = 30, sameHostOnly = true, maxDepth = 5, timeout = 10000, userAgent, crawlDelay } = req.body;
    if (!startUrl) return res.status(400).json({ error: 'Missing startUrl' });
    
    const crawlId = (global as any).crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
    const useDb = process.env.DISABLE_DB !== 'true';
    
    // For now, always use simple crawl to avoid queue issues
    const crawlResult = await miniCrawl(startUrl, { limit, sameHostOnly, maxDepth, timeout, userAgent, crawlDelay });
    
    return res.status(200).json({ 
      crawlId, 
      status: 'ready', 
      message: `Crawl completed for ${startUrl}`, 
      result: { type: 'crawl', ...crawlResult } 
    });
  } catch (error) {
    console.error('Crawl error:', error);
    return res.status(500).json({ 
      error: 'Failed to start crawl', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
