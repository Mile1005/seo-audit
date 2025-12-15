// Phase 10: In-memory site crawl job store
// Tracks progress of multi-page lightweight crawl audits.

export interface CrawlPageResult {
  url: string;
  status: number | null;
  title?: string;
  metaDescription?: string;
  wordCount?: number;
  h1Count?: number;
  h2Count?: number;
  images?: number;
  imagesWithoutAlt?: number;
  internalLinkCount?: number;
  fetchedAt: string;
  error?: string;
  comprehensive?: {
    scores: any;
    stats: any;
    h_tags: any;
    social_meta: any;
    accessibility: any;
    indexability: any;
    seo_checks: any;
    performance_metrics: any;
  };
}

export interface CrawlJobRecord {
  id: string;
  ownerId?: string;
  rootUrl: string;
  status: "processing" | "completed" | "failed";
  stage?: string;
  message?: string;
  currentUrl?: string;
  error?: string;
  startedAt: number;
  updatedAt: number;
  pages: CrawlPageResult[];
  maxPages: number;
  maxDepth: number;
  processed: number;
  queued: number;
  progress: number; // 0-100
  cancelled?: boolean;
  summary?: {
    averageWordCount?: number;
    averageImagesPerPage?: number;
    pagesWithMissingMeta?: number;
  };
}

const crawlStore = new Map<string, CrawlJobRecord>();

export function initCrawl(
  id: string,
  params: { rootUrl: string; maxPages: number; maxDepth: number; ownerId?: string }
) {
  const now = Date.now();
  crawlStore.set(id, {
    id,
    ownerId: params.ownerId,
    rootUrl: params.rootUrl,
    status: "processing",
    stage: "queued",
    message: "Queued",
    startedAt: now,
    updatedAt: now,
    pages: [],
    maxPages: params.maxPages,
    maxDepth: params.maxDepth,
    processed: 0,
    queued: 0,
    progress: 0,
  });
}

export function updateCrawl(id: string, mut: (job: CrawlJobRecord) => void) {
  const job = crawlStore.get(id);
  if (!job) return;
  mut(job);
  job.updatedAt = Date.now();
  // recompute progress simple: processed/maxPages
  job.progress = Math.min(100, Math.round((job.processed / job.maxPages) * 100));
}

export function completeCrawl(id: string) {
  updateCrawl(id, (job) => {
    job.status = "completed";
    job.stage = "completed";
    job.message = "Completed";
    job.currentUrl = undefined;
    job.progress = 100;
    // summary compute
    if (job.pages.length) {
      const wc = job.pages.map((p) => p.wordCount || 0);
      const img = job.pages.map((p) => p.images || 0);
      const missingMeta = job.pages.filter((p) => !p.metaDescription).length;
      job.summary = {
        averageWordCount: wc.reduce((a, b) => a + b, 0) / wc.length || 0,
        averageImagesPerPage: img.reduce((a, b) => a + b, 0) / img.length || 0,
        pagesWithMissingMeta: missingMeta,
      };
    }
  });
}

export function failCrawl(id: string, error: string) {
  updateCrawl(id, (job) => {
    job.status = "failed";
    job.error = error;
    job.stage = "failed";
    job.message = error;
    job.currentUrl = undefined;
  });
}

export function cancelCrawl(id: string) {
  updateCrawl(id, (job) => {
    job.cancelled = true;
    if (job.status === "processing") {
      job.status = "failed";
      job.error = "cancelled";
      job.stage = "cancelled";
      job.message = "Cancelled";
      job.currentUrl = undefined;
    }
  });
}

export function getCrawl(id: string): CrawlJobRecord | undefined {
  return crawlStore.get(id);
}
