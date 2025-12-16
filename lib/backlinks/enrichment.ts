/**
 * Backlink Enrichment Service
 *
 * Enriches raw backlinks with domain metrics from OpenPageRank API.
 * Implements 30-day caching via DomainMetric model to minimize API calls.
 */

import type { RawBacklink, EnrichedBacklink, DomainMetric } from "./types";
import { chunkArray, scaleToDomainRating } from "./utils";
import { prisma } from "@/lib/prisma";

/**
 * Get domain metrics from OpenPageRank API
 * FREE: 1,000 requests/day
 */
async function fetchOpenPageRankMetrics(
  domains: string[]
): Promise<Map<string, DomainMetric>> {
  const API_KEY = process.env.OPEN_PAGERANK_API_KEY;

  if (!API_KEY) {
    console.error("[OpenPageRank] API key not configured");
    return new Map();
  }

  const metrics = new Map<string, DomainMetric>();

  try {
    console.log(`[OpenPageRank] Fetching metrics for ${domains.length} domains`);

    // Build query string for GET request (OPR uses GET with query params)
    const queryParams = domains.map((d) => `domains[]=${encodeURIComponent(d)}`).join("&");
    const url = `https://openpagerank.com/api/v1.0/getPageRank?${queryParams}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "API-OPR": API_KEY,
        "User-Agent": "AISEOTurbo/1.0",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.warn("[OpenPageRank] Rate limit exceeded");
      } else if (response.status === 401) {
        console.error("[OpenPageRank] Invalid API key");
      } else {
        console.error(`[OpenPageRank] HTTP ${response.status}`);
      }
      return metrics;
    }

    const data = await response.json();

    if (data.status_code === 200 && data.response) {
      for (const result of data.response) {
        if (result.status_code === 200) {
          const pageRank = result.page_rank_decimal || 0;

          metrics.set(result.domain, {
            domain: result.domain,
            domainRating: scaleToDomainRating(pageRank), // Scale to 0-100
            domainAuthority: pageRank, // Raw 0-10 score
            pageRank: pageRank,
            statusCode: result.status_code || 200,
            lastUpdated: new Date(),
          });
        }
      }
    }

    console.log(`[OpenPageRank] Successfully fetched metrics for ${metrics.size} domains`);
    return metrics;
  } catch (error) {
    console.error("[OpenPageRank] Error:", error);
    return metrics;
  }
}

/**
 * Get cached domain metrics from database (valid for DOMAIN_METRICS_CACHE_DAYS)
 */
async function getCachedDomainMetrics(
  domains: string[]
): Promise<Map<string, DomainMetric>> {
  const cacheDays = parseInt(process.env.DOMAIN_METRICS_CACHE_DAYS || "30", 10);
  const cacheExpiry = new Date(Date.now() - cacheDays * 24 * 60 * 60 * 1000);

  try {
    const cached = await prisma.domainMetric.findMany({
      where: {
        domain: { in: domains },
        lastUpdated: { gte: cacheExpiry },
      },
    });

    const metricsMap = new Map<string, DomainMetric>();

    for (const metric of cached) {
      metricsMap.set(metric.domain, {
        domain: metric.domain,
        domainRating: metric.domainRating,
        domainAuthority: metric.domainAuthority,
        pageRank: metric.pageRank,
        statusCode: 200,
        lastUpdated: metric.lastUpdated,
      });
    }

    console.log(`[Cache] Found ${metricsMap.size} cached domain metrics`);
    return metricsMap;
  } catch (error) {
    console.error("[Cache] Error fetching cached metrics:", error);
    return new Map();
  }
}

/**
 * Save domain metrics to database cache
 */
async function saveDomainMetrics(metrics: DomainMetric[]): Promise<void> {
  if (metrics.length === 0) return;

  try {
    for (const metric of metrics) {
      await prisma.domainMetric.upsert({
        where: { domain: metric.domain },
        update: {
          domainRating: metric.domainRating,
          domainAuthority: metric.domainAuthority,
          pageRank: metric.pageRank,
          lastUpdated: new Date(),
        },
        create: {
          domain: metric.domain,
          domainRating: metric.domainRating,
          domainAuthority: metric.domainAuthority,
          pageRank: metric.pageRank,
          lastUpdated: new Date(),
        },
      });
    }

    console.log(`[Cache] Saved ${metrics.length} domain metrics`);
  } catch (error) {
    console.error("[Cache] Error saving metrics:", error);
  }
}

/**
 * Enrich backlinks with domain metrics.
 * Uses 30-day cache to minimize OpenPageRank API calls.
 */
export async function enrichWithMetrics(
  backlinks: RawBacklink[]
): Promise<EnrichedBacklink[]> {
  // Get unique domains
  const uniqueDomains = [...new Set(backlinks.map((bl) => bl.sourceDomain))].filter(
    Boolean
  );

  console.log(`[Enrichment] Enriching ${uniqueDomains.length} unique domains`);

  // 1. Check cache first
  const cachedMetrics = await getCachedDomainMetrics(uniqueDomains);

  // 2. Find domains not in cache
  const uncachedDomains = uniqueDomains.filter(
    (domain) => !cachedMetrics.has(domain)
  );

  console.log(
    `[Enrichment] ${cachedMetrics.size} cached, ${uncachedDomains.length} need fetching`
  );

  // 3. Fetch metrics for uncached domains (max 100 per request per OPR API)
  const newMetrics = new Map<string, DomainMetric>();

  if (uncachedDomains.length > 0) {
    const batches = chunkArray(uncachedDomains, 100);

    for (const batch of batches) {
      const batchMetrics = await fetchOpenPageRankMetrics(batch);

      for (const [domain, metric] of batchMetrics) {
        newMetrics.set(domain, metric);
      }

      // Rate limiting: wait 1 second between batches
      if (batches.length > 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Save new metrics to cache
    await saveDomainMetrics(Array.from(newMetrics.values()));
  }

  // 4. Combine cached and new metrics
  const allMetrics = new Map([...cachedMetrics, ...newMetrics]);

  // 5. Enrich backlinks
  const enriched: EnrichedBacklink[] = backlinks.map((bl) => {
    const metric = allMetrics.get(bl.sourceDomain);

    return {
      ...bl,
      anchorText: bl.snippet || bl.title || "Unknown",
      domainRating: metric?.domainRating || 0,
      domainAuthority: metric?.domainAuthority || 0,
      pageRank: metric?.pageRank || 0,
      linkType: "FOLLOW" as const,
      status: "ACTIVE" as const,
    };
  });

  console.log(`[Enrichment] Successfully enriched ${enriched.length} backlinks`);

  return enriched;
}
