/**
 * Backlink Collector Orchestrator
 *
 * Combines multiple data sources to discover and enrich backlinks:
 * 1. Common Crawl - Massive web archive (FREE, unlimited)
 * 2. OpenPageRank - Domain metrics (FREE, 1000/day)
 * 3. Search Crawler - Active web crawling (FREE, rate-limited)
 *
 * Features:
 * - Intelligent deduplication
 * - Metric enrichment
 * - Quality scoring
 * - Progress tracking
 */

import { BacklinkData, CollectionStats } from "./types";
import { CommonCrawlProvider } from "./data-sources/common-crawl";
import { OpenPageRankProvider, getOpenPageRankProvider } from "./data-sources/openpagerank";
import { SearchCrawler } from "./data-sources/search-crawler";

export interface CollectorOptions {
  maxBacklinks?: number;
  useCommonCrawl?: boolean;
  useSearch?: boolean;
  useGoogleAPI?: boolean;
  enrichWithMetrics?: boolean;
  onProgress?: (message: string, progress: number) => void;
}

export class BacklinkCollector {
  private commonCrawl: CommonCrawlProvider;
  private pageRank: OpenPageRankProvider;
  private searchCrawler: SearchCrawler;

  constructor() {
    this.commonCrawl = new CommonCrawlProvider();
    this.pageRank = getOpenPageRankProvider();
    this.searchCrawler = new SearchCrawler();
  }

  /**
   * Collect backlinks from all available sources
   */
  async collectBacklinks(
    targetDomain: string,
    options: CollectorOptions = {}
  ): Promise<{ backlinks: BacklinkData[]; stats: CollectionStats }> {
    const startTime = Date.now();
    const maxBacklinks = options.maxBacklinks || 100;

    console.log(`\n🚀 Starting backlink collection for ${targetDomain}`);
    console.log(`📊 Target: ${maxBacklinks} backlinks\n`);

    const allBacklinks: BacklinkData[] = [];
    const sources = {
      commonCrawl: 0,
      search: 0,
      manual: 0,
    };

    try {
      // Phase 1: Common Crawl (if enabled)
      if (options.useCommonCrawl !== false) {
        this.reportProgress(options, "🔍 Searching Common Crawl archive...", 10);

        const ccLinks = await this.commonCrawl.findBacklinks(targetDomain, {
          limit: Math.ceil(maxBacklinks * 0.6), // 60% from Common Crawl
          recentOnly: true,
        });

        allBacklinks.push(...ccLinks);
        sources.commonCrawl = ccLinks.length;

        this.reportProgress(options, `✓ Common Crawl: Found ${ccLinks.length} backlinks`, 30);
      }

      // Phase 2: Search Crawler (if enabled)
      if (options.useSearch !== false && allBacklinks.length < maxBacklinks) {
        this.reportProgress(options, "🔎 Crawling via search engines...", 50);

        const remaining = maxBacklinks - allBacklinks.length;
        const searchLinks = await this.searchCrawler.findBacklinksViaSearch(targetDomain, {
          maxResults: Math.min(remaining, 40), // 40% from search
          useGoogleAPI: options.useGoogleAPI,
        });

        allBacklinks.push(...searchLinks);
        sources.search = searchLinks.length;

        this.reportProgress(options, `✓ Search Crawler: Found ${searchLinks.length} backlinks`, 70);
      }

      // Phase 3: Deduplicate
      this.reportProgress(options, "🔄 Deduplicating backlinks...", 80);
      const uniqueBacklinks = this.deduplicateBacklinks(allBacklinks);

      console.log(`\n📋 Deduplication: ${allBacklinks.length} → ${uniqueBacklinks.length} unique`);

      // Phase 4: Enrich with metrics (if enabled)
      if (options.enrichWithMetrics !== false && this.pageRank.isConfigured()) {
        this.reportProgress(options, "📊 Enriching with domain metrics...", 90);
        await this.enrichWithMetrics(uniqueBacklinks);
      }

      // Phase 5: Calculate quality scores
      this.reportProgress(options, "⚡ Calculating quality scores...", 95);
      this.calculateQualityScores(uniqueBacklinks);

      // Limit to requested amount
      const finalBacklinks = uniqueBacklinks.slice(0, maxBacklinks);

      // Calculate stats
      const duration = Date.now() - startTime;
      const stats: CollectionStats = {
        totalFound: allBacklinks.length,
        uniqueBacklinks: uniqueBacklinks.length,
        uniqueDomains: new Set(finalBacklinks.map((b) => b.sourceDomain)).size,
        averageDomainRating: this.calculateAverageDR(finalBacklinks),
        sources,
        duration,
      };

      this.reportProgress(options, "✅ Collection complete!", 100);

      console.log(`\n✅ Collection Summary:`);
      console.log(`   Total Found: ${stats.totalFound}`);
      console.log(`   Unique Backlinks: ${stats.uniqueBacklinks}`);
      console.log(`   Unique Domains: ${stats.uniqueDomains}`);
      console.log(`   Avg Domain Rating: ${stats.averageDomainRating.toFixed(1)}`);
      console.log(`   Duration: ${(duration / 1000).toFixed(1)}s`);
      console.log(`   Sources:`);
      console.log(`     - Common Crawl: ${sources.commonCrawl}`);
      console.log(`     - Search: ${sources.search}\n`);

      return {
        backlinks: finalBacklinks,
        stats,
      };
    } catch (error) {
      console.error("❌ Collection error:", error);
      throw error;
    }
  }

  /**
   * Deduplicate backlinks by source URL + target URL
   */
  private deduplicateBacklinks(backlinks: BacklinkData[]): BacklinkData[] {
    const seen = new Map<string, BacklinkData>();

    for (const link of backlinks) {
      const key = `${link.sourceDomain}|${link.targetUrl}`;

      if (!seen.has(key)) {
        seen.set(key, link);
      } else {
        // Keep the one with more data
        const existing = seen.get(key)!;
        if (this.hasMoreData(link, existing)) {
          seen.set(key, link);
        }
      }
    }

    return Array.from(seen.values());
  }

  /**
   * Check which backlink has more data
   */
  private hasMoreData(a: BacklinkData, b: BacklinkData): boolean {
    const scoreA = (a.domainRating || 0) + (a.context ? 100 : 0) + (a.anchorText ? 50 : 0);
    const scoreB = (b.domainRating || 0) + (b.context ? 100 : 0) + (b.anchorText ? 50 : 0);
    return scoreA > scoreB;
  }

  /**
   * Enrich backlinks with domain metrics from OpenPageRank
   */
  private async enrichWithMetrics(backlinks: BacklinkData[]): Promise<void> {
    try {
      // Get unique domains
      const domains = [...new Set(backlinks.map((b) => b.sourceDomain))];
      console.log(`   Fetching metrics for ${domains.length} domains...`);

      // Fetch metrics in batches
      const metrics = await this.pageRank.getBatchDomainMetrics(domains);

      // Apply metrics to backlinks
      let enriched = 0;
      for (const backlink of backlinks) {
        const metric = metrics.get(backlink.sourceDomain);
        if (metric) {
          backlink.domainRating = metric.domainRating;
          backlink.pageRating = metric.pageRating;
          enriched++;
        }
      }

      console.log(`   ✓ Enriched ${enriched}/${domains.length} domains with metrics`);
    } catch (error) {
      console.error("   ⚠️ Metric enrichment failed:", error);
    }
  }

  /**
   * Calculate quality scores for backlinks
   */
  private calculateQualityScores(backlinks: BacklinkData[]): void {
    for (const backlink of backlinks) {
      let score = 0;

      // Domain Rating (0-40 points)
      if (backlink.domainRating) {
        score += Math.min(backlink.domainRating * 0.4, 40);
      }

      // Link Type (20 points for follow)
      if (backlink.linkType === "FOLLOW") {
        score += 20;
      }

      // Link Position (20 points for content)
      if (backlink.linkPosition === "content") {
        score += 20;
      } else if (backlink.linkPosition === "nav") {
        score += 10;
      }

      // Anchor Text Quality (10 points)
      if (backlink.anchorText && backlink.anchorText.length > 3) {
        score += 10;
      }

      // Context (10 points)
      if (backlink.context && backlink.context.length > 50) {
        score += 10;
      }

      // Classify link strength based on score
      if (score >= 80) backlink.linkStrength = "VERY_STRONG";
      else if (score >= 60) backlink.linkStrength = "STRONG";
      else if (score >= 40) backlink.linkStrength = "NORMAL";
      else backlink.linkStrength = "WEAK";
    }
  }

  /**
   * Calculate average domain rating
   */
  private calculateAverageDR(backlinks: BacklinkData[]): number {
    const withDR = backlinks.filter((b) => b.domainRating && b.domainRating > 0);
    if (withDR.length === 0) return 0;

    const sum = withDR.reduce((acc, b) => acc + (b.domainRating || 0), 0);
    return sum / withDR.length;
  }

  /**
   * Report progress
   */
  private reportProgress(options: CollectorOptions, message: string, progress: number): void {
    if (options.onProgress) {
      options.onProgress(message, progress);
    }
  }

  /**
   * Get remaining OpenPageRank requests
   */
  getRemainingRequests(): number {
    return this.pageRank.getRemainingRequests();
  }
}
