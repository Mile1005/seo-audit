import type { RawBacklink, CollectionOptions } from "./types";
import { deduplicateBacklinks, sanitizeUrl, extractDomain, normalizeDomain } from "./utils";

/**
 * Search Google Custom Search API for backlinks
 * FREE: 100 searches/day
 */
async function searchGoogleCustom(
  domain: string,
  maxResults = 10
): Promise<RawBacklink[]> {
  const API_KEY = process.env.GOOGLE_SEARCH_API_KEY || process.env.GOOGLE_CUSTOM_SEARCH_API_KEY;
  const ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID || process.env.GOOGLE_CUSTOM_SEARCH_CX;

  if (!API_KEY || !ENGINE_ID) {
    console.log("[Google] API not configured, skipping");
    return [];
  }

  try {
    console.log(`[Google] Searching for backlinks to: ${domain}`);

    // Search for pages mentioning domain (exclude the domain itself)
    const query = `"${domain}" -site:${domain}`;
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${ENGINE_ID}&q=${encodeURIComponent(query)}&num=${Math.min(maxResults, 10)}`;

    const response = await fetch(url, {
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error(`[Google] HTTP ${response.status}`);
      return [];
    }

    const data = await response.json();

    if (data.error) {
      console.error("[Google] API Error:", data.error.message);
      return [];
    }

    const backlinks: RawBacklink[] = (data.items || [])
      .map((item: any) => {
        const sourceUrl = sanitizeUrl(item.link);
        if (!sourceUrl) return null;

        return {
          sourceUrl,
          sourceDomain: extractDomain(sourceUrl),
          targetUrl: `https://${domain}`,
          title: item.title,
          snippet: item.snippet,
        };
      })
      .filter((bl: RawBacklink | null): bl is RawBacklink => bl !== null && !!bl.sourceDomain);

    console.log(`[Google] Found ${backlinks.length} potential backlinks`);
    return backlinks;
  } catch (error) {
    console.error("[Google] Error:", error);
    return [];
  }
}

/**
 * Search SerpAPI for backlinks
 * FREE: 100 searches/month
 */
async function searchSerpApi(
  domain: string,
  maxResults = 10
): Promise<RawBacklink[]> {
  const API_KEY = process.env.SERPAPI_KEY;

  if (!API_KEY) {
    console.log("[SerpAPI] API not configured, skipping");
    return [];
  }

  try {
    console.log(`[SerpAPI] Searching for backlinks to: ${domain}`);

    const query = `"${domain}" -site:${domain}`;
    const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&api_key=${API_KEY}&num=${maxResults}`;

    const response = await fetch(url, {
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      console.error(`[SerpAPI] HTTP ${response.status}`);
      return [];
    }

    const data = await response.json();

    if (data.error) {
      console.error("[SerpAPI] Error:", data.error);
      return [];
    }

    const backlinks: RawBacklink[] = (data.organic_results || [])
      .map((result: any) => {
        const sourceUrl = sanitizeUrl(result.link);
        if (!sourceUrl) return null;

        return {
          sourceUrl,
          sourceDomain: extractDomain(sourceUrl),
          targetUrl: `https://${domain}`,
          title: result.title,
          snippet: result.snippet,
        };
      })
      .filter((bl: RawBacklink | null): bl is RawBacklink => bl !== null && !!bl.sourceDomain);

    console.log(`[SerpAPI] Found ${backlinks.length} potential backlinks`);
    return backlinks;
  } catch (error) {
    console.error("[SerpAPI] Error:", error);
    return [];
  }
}

/**
 * Main discovery function - combines Google Search and SerpAPI
 * Common Crawl is NOT used for backlink discovery (it finds pages ON a domain, not linking TO it)
 */
export async function discoverBacklinks(
  domainOrUrl: string,
  options: CollectionOptions = {}
): Promise<RawBacklink[]> {
  const maxResults = options.maxResults ?? 100;
  const targetDomain = normalizeDomain(domainOrUrl);

  if (!targetDomain) {
    console.error("[Discovery] Invalid domain/URL provided");
    return [];
  }

  console.log(`[Discovery] Starting backlink discovery for: ${targetDomain}`);

  const allBacklinks: RawBacklink[] = [];

  // 1. Try SerpAPI first (most reliable for finding mentions)
  if (options.useSerpApi !== false) {
    const serpResults = await searchSerpApi(targetDomain, Math.min(maxResults, 20));
    allBacklinks.push(...serpResults);
  }

  // 2. Try Google Custom Search (secondary source)
  if (options.useGoogle !== false && allBacklinks.length < maxResults) {
    const googleResults = await searchGoogleCustom(targetDomain, Math.min(maxResults - allBacklinks.length, 10));
    allBacklinks.push(...googleResults);
  }

  // Deduplicate by sourceUrl
  const uniqueBacklinks = deduplicateBacklinks(allBacklinks);

  console.log(`[Discovery] Total unique backlinks found: ${uniqueBacklinks.length}`);

  return uniqueBacklinks.slice(0, maxResults);
}
