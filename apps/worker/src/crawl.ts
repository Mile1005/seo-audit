import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { dbHelpers, miniCrawl } from '@repo/shared/server';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', { maxRetriesPerRequest: null });

const crawlWorker = new Worker(
  'crawl',
  async job => {
    const { crawlId, startUrl, limit, sameHostOnly, maxDepth, timeout } = job.data;
    try {
      await dbHelpers.updateRunStatus(crawlId, 'running');
      const crawlResult = await miniCrawl(startUrl, { limit, sameHostOnly, maxDepth, timeout });
  await dbHelpers.saveAudit({ id: job.id ?? '', runId: crawlId ?? '', json: { type: 'crawl', ...crawlResult } });
      await dbHelpers.updateRunStatus(crawlId, 'ready');
    } catch (err) {
      await dbHelpers.updateRunStatus(crawlId, 'failed');
      throw err;
    }
  },
  {
    connection,
  concurrency: 3,
  }
);

crawlWorker.on('completed', job => {
  console.log(`Crawl job ${job.id} completed`);
});
crawlWorker.on('failed', (job, err) => {
  console.error(`Crawl job ${job?.id} failed:`, err);
});

console.log('Crawl Worker started. Waiting for jobs...');
