import type { NextApiRequest, NextApiResponse } from 'next';
import { crawlQueue, isCrawlQueueConfigured } from '../../../lib/crawl-queue';
import { miniCrawl } from '../../../lib/crawl';
import { dbHelpers } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { startUrl, limit = 30, sameHostOnly = true, maxDepth = 5, timeout = 10000, userAgent, crawlDelay } = req.body;
    if (!startUrl) return res.status(400).json({ error: 'Missing startUrl' });
    const crawlId = (global as any).crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
    const useDb = process.env.DISABLE_DB !== 'true';
    if (useDb) {
      await dbHelpers.createRun({ id: crawlId, pageUrl: startUrl, status: 'queued' });
    }
    if (isCrawlQueueConfigured() && useDb) {
      await crawlQueue.add('crawl', { crawlId, startUrl, limit, sameHostOnly, maxDepth, timeout, userAgent, crawlDelay }, { jobId: crawlId, removeOnComplete: true, removeOnFail: false });
      return res.status(200).json({ crawlId, status: 'queued', message: `Crawl job started for ${startUrl}` });
    } else {
      if (useDb) await dbHelpers.updateRunStatus(crawlId, 'running');
      const crawlResult = await miniCrawl(startUrl, { limit, sameHostOnly, maxDepth, timeout, userAgent, crawlDelay });
      if (useDb) {
        await dbHelpers.saveAudit({ id: (global as any).crypto?.randomUUID?.() || Math.random().toString(36).slice(2), runId: crawlId, json: { type: 'crawl', ...crawlResult } });
        await dbHelpers.updateRunStatus(crawlId, 'ready');
      }
      return res.status(200).json({ crawlId, status: 'ready', message: `Crawl completed for ${startUrl}`, result: { type: 'crawl', ...crawlResult } });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to start crawl', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}
