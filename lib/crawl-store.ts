import IORedis from 'ioredis';
import type { CrawlResult } from './crawl';

export type CrawlStatus = 'processing' | 'completed' | 'failed';
export interface CrawlRecord {
  status: CrawlStatus;
  result?: CrawlResult;
  error?: string;
}

const TTL_SECONDS = 60 * 30; // 30 minutes
const KEY = (id: string) => `crawl:${id}`;

let redis: IORedis | null = null;
let memoryStore = new Map<string, CrawlRecord>();

function getRedisUrl(): string | null {
  return (
    process.env.REDIS_URL ||
    process.env.REDIS_REDIS_URL ||
    process.env.REDIS_KV_URL ||
    null
  );
}

function isRedisEnabled() {
  return Boolean(getRedisUrl());
}

function getRedis(): IORedis {
  if (!redis) {
  const url = getRedisUrl();
    if (!url) throw new Error('REDIS_URL not set');
    redis = new IORedis(url, { maxRetriesPerRequest: null });
  }
  return redis;
}

export async function saveCrawlRecord(id: string, record: CrawlRecord): Promise<void> {
  if (isRedisEnabled()) {
    try {
      const client = getRedis();
      await client.set(KEY(id), JSON.stringify(record), 'EX', TTL_SECONDS);
    } catch (err) {
      // Log and continue with memory fallback
      console.warn('[crawl-store] Redis set failed:', err instanceof Error ? err.message : err);
    }
  }
  // Always mirror in memory as a fallback
  memoryStore.set(id, record);
}

export async function getCrawlRecord(id: string): Promise<CrawlRecord | null> {
  if (isRedisEnabled()) {
    try {
      const client = getRedis();
      const raw = await client.get(KEY(id));
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as CrawlRecord;
          // Mirror to memory for quicker subsequent access
          memoryStore.set(id, parsed);
          return parsed;
        } catch {
          // ignore parse error, fall through to memory
        }
      }
    } catch (err) {
      console.warn('[crawl-store] Redis get failed:', err instanceof Error ? err.message : err);
    }
  }
  return memoryStore.get(id) || null;
}

export async function deleteCrawlRecord(id: string): Promise<void> {
  if (isRedisEnabled()) {
    try {
      const client = getRedis();
      await client.del(KEY(id));
    } catch (err) {
      console.warn('[crawl-store] Redis del failed:', err instanceof Error ? err.message : err);
    }
  }
  memoryStore.delete(id);
}
