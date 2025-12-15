// In-memory audit store (Phase 1)
// TODO Phase 4: Replace with persistent storage (Prisma models AuditRun, etc.)
import { AuditStoreRecord, AuditResultUnified, ComprehensiveResults } from "../types/audit";

const store = new Map<string, AuditStoreRecord>();

export function initAudit(auditId: string, ownerId?: string) {
  const now = Date.now();
  store.set(auditId, {
    status: 'processing',
    ownerId,
    stage: 'queued',
    progress: 2,
    message: 'Queued',
    startedAt: now,
    updatedAt: now,
  });
}

export function setAuditProgress(
  auditId: string,
  patch: { stage?: string; progress?: number; message?: string }
) {
  const prev = store.get(auditId);
  if (!prev || prev.status !== 'processing') return;
  const now = Date.now();
  store.set(auditId, {
    ...prev,
    ...patch,
    updatedAt: now,
  });
}

export function setAuditCompleted(auditId: string, data: AuditResultUnified) {
  const now = Date.now();
  const prev = store.get(auditId);
  store.set(auditId, {
    status: 'completed',
    ownerId: prev?.ownerId,
    data,
    stage: 'completed',
    progress: 100,
    message: 'Completed',
    startedAt: prev?.startedAt || now,
    updatedAt: now,
  });
}

export function setAuditFailed(auditId: string, error: string) {
  const now = Date.now();
  const prev = store.get(auditId);
  store.set(auditId, {
    status: 'failed',
    ownerId: prev?.ownerId,
    error,
    stage: 'failed',
    message: error,
    startedAt: prev?.startedAt || now,
    updatedAt: now,
  });
}

export function getAudit(auditId: string): AuditStoreRecord | undefined {
  return store.get(auditId);
}

export function buildUnifiedResult(params: { auditId: string; url: string; audit: ComprehensiveResults; keyword?: string|null; email?: string|null; }): AuditResultUnified {
  const { auditId, url, audit, keyword=null, email=null } = params;
  // Derive pageData from comprehensive audit
  const pageData = {
    title: audit.h_tags.h1[0] || 'No Title Found',
    metaDescription: audit.social_meta.og_description || 'No meta description found',
    h1Count: audit.h_tags.h1.length,
    h2Count: audit.h_tags.h2.length,
    h3Count: audit.h_tags.h3.length,
    wordCount: audit.stats.word_count,
    imagesTotal: audit.stats.images_count,
    imagesWithoutAlt: audit.accessibility.failed_checks.includes('Images have alt text') ? audit.stats.images_count : 0,
    internalLinks: audit.stats.internal_links,
    externalLinks: audit.stats.external_links,
    loadTime: audit.performance_metrics.largest_contentful_paint * 1000,
    canonical: null,
    noindex: false
  };

  const recommendations = [
    ...audit.issues.map(issue => ({
      type: issue.severity === 'high' ? 'critical' as const : issue.severity === 'medium' ? 'warning' as const : 'suggestion' as const,
      category: issue.category || 'SEO',
      title: issue.title,
      description: issue.description,
      priority: issue.severity === 'high' ? 1 : issue.severity === 'medium' ? 2 : 3,
    })),
    ...audit.quick_wins.map(win => ({
      type: 'suggestion' as const,
      category: win.category || 'Quick Win',
      title: win.title,
      description: win.description,
      priority: 3,
    }))
  ];

  return {
    auditId,
    status: 'completed',
    url,
    score: audit.scores.overall,
    timestamp: audit.fetched_at || new Date().toISOString(),
    pageData,
    comprehensiveResults: audit,
    recommendations,
    keyword,
    email,
    robotsTxt: null,
    sitemapXml: null
  };
}
