import { BacklinkCollector } from "./backlink-collector";
import type { RawBacklink, CollectionOptions } from "./types";
import { deduplicateBacklinks, sanitizeUrl, extractDomain, normalizeDomain } from "./utils";

/**
 * Main discovery function - combines all sources.
 *
 * Note: This wraps the existing BacklinkCollector implementation.
 */
export async function discoverBacklinks(
  domainOrUrl: string,
  options: CollectionOptions = {}
): Promise<RawBacklink[]> {
  const maxResults = options.maxResults ?? 100;

  const targetDomain = normalizeDomain(domainOrUrl);
  const targetUrl = /^https?:\/\//i.test(domainOrUrl)
    ? domainOrUrl
    : `https://${targetDomain}`;

  const collector = new BacklinkCollector();

  const result = await collector.collectBacklinks(targetUrl, {
    maxBacklinks: maxResults,
    useCommonCrawl: options.useCommonCrawl !== false,
    useSearch: options.useGoogle !== false || options.useSerpApi !== false,
    useGoogleAPI: true,
    enrichWithMetrics: false,
  });

  const raw: RawBacklink[] = result.backlinks
    .map((b) => ({
      sourceUrl: sanitizeUrl(b.sourceUrl) || b.sourceUrl,
      sourceDomain: b.sourceDomain || extractDomain(b.sourceUrl),
      targetUrl: sanitizeUrl(b.targetUrl) || b.targetUrl,
      snippet: b.anchorText || undefined,
      title: undefined,
      timestamp: undefined,
    }))
    .filter((b) => !!b.sourceUrl && !!b.sourceDomain && !!b.targetUrl);

  return deduplicateBacklinks(raw).slice(0, maxResults);
}
