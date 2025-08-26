import type { NextApiRequest, NextApiResponse } from 'next';
import { getCrawlRecord, saveCrawlRecord } from '../../../lib/crawl-store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const hasRedis = Boolean(process.env.REDIS_URL || process.env.REDIS_REDIS_URL || process.env.REDIS_KV_URL);
    // Try a quick write/read roundtrip (best effort)
    const id = 'health-' + Math.random().toString(36).slice(2);
    await saveCrawlRecord(id, { status: 'processing' });
    const record = await getCrawlRecord(id);
    const ok = !!record;
    return res.status(200).json({ ok, hasRedis, recordExists: ok });
  } catch (e) {
    return res.status(200).json({ ok: false, error: e instanceof Error ? e.message : 'unknown' });
  }
}
