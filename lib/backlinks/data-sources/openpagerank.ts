/**
 * OpenPageRank API Provider
 *
 * Fetches domain authority metrics for backlink analysis
 * - FREE tier: 1000 requests per day
 * - PageRank scores (0-10 scale)
 * - Domain authority metrics
 * - No credit card required for free tier
 *
 * Sign up: https://www.domcop.com/openpagerank/
 * API Docs: https://www.domcop.com/openpagerank/documentation
 */

import { DomainMetrics } from "../types";

export class OpenPageRankProvider {
  private readonly apiKey: string;
  private readonly baseUrl = "https://openpagerank.com/api/v1.0";
  private readonly maxBatchSize = 100; // API limit
  private requestCount = 0;
  private readonly dailyLimit = 1000;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPEN_PAGERANK_API_KEY || "";

    if (!this.apiKey) {
      console.warn(
        "⚠️ [OpenPageRank] No API key provided. Get free key at https://www.domcop.com/openpagerank/"
      );
    }
  }

  /**
   * Get domain metrics for a single domain
   */
  async getDomainMetrics(domain: string): Promise<DomainMetrics | null> {
    const results = await this.getBatchDomainMetrics([domain]);
    return results.get(domain) || null;
  }

  /**
   * Get domain metrics for multiple domains (batched)
   */
  async getBatchDomainMetrics(domains: string[]): Promise<Map<string, DomainMetrics>> {
    if (!this.apiKey) {
      console.warn("⚠️ [OpenPageRank] Skipping - no API key");
      return new Map();
    }

    const metrics = new Map<string, DomainMetrics>();

    try {
      console.log(`🔍 [OpenPageRank] Fetching metrics for ${domains.length} domains...`);

      // Split into batches
      const batches = this.chunk(domains, this.maxBatchSize);

      for (const batch of batches) {
        // Check daily limit
        if (this.requestCount >= this.dailyLimit) {
          console.warn(`⚠️ [OpenPageRank] Daily limit reached (${this.dailyLimit} requests)`);
          break;
        }

        const batchMetrics = await this.fetchBatch(batch);
        batchMetrics.forEach((value, key) => metrics.set(key, value));

        this.requestCount++;

        // Respectful delay between batches
        if (batches.length > 1) {
          await this.delay(500);
        }
      }

      console.log(`✅ [OpenPageRank] Retrieved metrics for ${metrics.size} domains`);
    } catch (error) {
      console.error("❌ [OpenPageRank] Error:", error);
    }

    return metrics;
  }

  /**
   * Fetch metrics for a batch of domains
   */
  private async fetchBatch(domains: string[]): Promise<Map<string, DomainMetrics>> {
    const metrics = new Map<string, DomainMetrics>();

    try {
      // Build query string
      const queryParams = domains.map((d) => `domains[]=${encodeURIComponent(d)}`).join("&");
      const url = `${this.baseUrl}/getPageRank?${queryParams}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "API-OPR": this.apiKey,
          "User-Agent": "SEO-Audit-Tool/1.0",
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      if (!response.ok) {
        if (response.status === 429) {
          console.warn("⚠️ [OpenPageRank] Rate limit exceeded");
        } else if (response.status === 401) {
          console.error("❌ [OpenPageRank] Invalid API key");
        } else {
          console.error(`❌ [OpenPageRank] HTTP ${response.status}`);
        }
        return metrics;
      }

      const data = await response.json();

      if (data.status_code === 200 && data.response) {
        for (const item of data.response) {
          const domain = item.domain;

          if (item.status_code === 200) {
            // Convert 0-10 PageRank to 0-100 Domain Rating
            const domainRating = Math.round(item.page_rank_decimal * 10);

            metrics.set(domain, {
              domain,
              domainRating,
              pageRating: domainRating, // Same as DR for PageRank
              rank: item.rank,
              status: item.status_code,
            });
          }
        }
      }
    } catch (error) {
      console.error("❌ [OpenPageRank] Fetch error:", error);
    }

    return metrics;
  }

  /**
   * Get remaining daily requests
   */
  getRemainingRequests(): number {
    return Math.max(0, this.dailyLimit - this.requestCount);
  }

  /**
   * Reset request counter (call this daily)
   */
  resetRequestCount(): void {
    this.requestCount = 0;
  }

  /**
   * Check if API key is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey && this.apiKey.length > 0;
  }

  /**
   * Split array into chunks
   */
  private chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Singleton instance for shared request counting
 */
let sharedInstance: OpenPageRankProvider | null = null;

export function getOpenPageRankProvider(): OpenPageRankProvider {
  if (!sharedInstance) {
    sharedInstance = new OpenPageRankProvider();
  }
  return sharedInstance;
}
