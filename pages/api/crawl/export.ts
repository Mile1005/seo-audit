import type { NextApiRequest, NextApiResponse } from 'next';
import { dbHelpers } from '../../../lib/db';
import { generateCrawlCSV } from '../../../lib/crawl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { id, format } = req.query;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Missing crawl ID parameter' });
    }
    const run = await dbHelpers.getRun(id);
    if (!run) return res.status(404).json({ error: 'Crawl not found' });
    if (run.status !== 'ready') return res.status(400).json({ error: 'Crawl not completed yet' });
    const audit = await dbHelpers.getAuditByRunId(id);
    if (!audit) return res.status(404).json({ error: 'Crawl result not found' });
    const crawlData = audit.json;
    if (format === 'json') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="crawl-${id}.json"`);
      return res.status(200).send(JSON.stringify(crawlData));
    }
    // Default to CSV
    const csvContent = generateCrawlCSV(crawlData);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="crawl-${id}.csv"`);
    return res.status(200).send(csvContent);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to export crawl data', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}
