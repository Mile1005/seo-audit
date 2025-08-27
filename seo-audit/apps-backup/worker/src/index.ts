import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { dbHelpers, miniCrawl, calculateAudit } from '@repo/shared/server';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', { maxRetriesPerRequest: null });

const auditsWorker = new Worker(
  'audits',
  async job => {
    const { runId, pageUrl, targetKeyword, email } = job.data;
    try {
      await dbHelpers.updateRunStatus(runId, 'running');
      const crawlResult = await miniCrawl(pageUrl, {});
      // Assume the first page is the main page for audit
      const mainPage = crawlResult.pages[0];
      const parsedHtml = mainPage ? {
        title: mainPage.title,
        metaDescription: mainPage.meta_description,
        canonical: mainPage.canonical,
        h1: null,
        h2: [],
        h3: [],
        images: [],
        internalLinks: [],
        jsonLdTypes: [],
        textBlocks: [],
        robots: null,
        viewport: null,
        tablesCount: 0,
        listsCount: 0,
        h1Count: 0,
        mixedContentCandidates: [],
        isCanonicalSelfReference: false,
        hasNoindex: false,
        hasNofollow: false,
        accessibilityIssues: [],
      } : undefined;
      const auditResult = parsedHtml ? calculateAudit(pageUrl, parsedHtml, { targetKeyword }) : null;
      await dbHelpers.saveAudit({ id: job.id ?? '', runId: runId ?? '', json: auditResult });
      await dbHelpers.updateRunStatus(runId, 'ready');
    } catch (err) {
      await dbHelpers.updateRunStatus(runId, 'failed');
      throw err;
    }
  },
  {
    connection,
  concurrency: 3,
  }
);

auditsWorker.on('completed', job => {
  console.log(`Audit job ${job.id} completed`);
});
auditsWorker.on('failed', (job, err) => {
  console.error(`Audit job ${job?.id} failed:`, err);
});

console.log('Audit Worker started. Waiting for jobs...');
