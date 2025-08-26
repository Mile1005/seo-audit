import type { NextApiRequest, NextApiResponse } from 'next';
import { dbHelpers } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { id } = req.query;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Missing crawl ID parameter' });
    }
    const run = await dbHelpers.getRun(id);
    if (!run) return res.status(404).json({ error: 'Crawl not found' });
    const response: any = { status: run.status, crawlId: id, startUrl: run.pageUrl };
    if (run.status === 'ready') {
      const audit = await dbHelpers.getAuditByRunId(id);
      if (audit) response.result = audit.json;
    } else if (run.status === 'failed') {
      response.error = 'Crawl failed';
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get crawl status', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}
