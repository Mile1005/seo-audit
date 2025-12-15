/**
 * Search-Based Backlink Crawler
 *
 * Discovers backlinks by searching for mentions of target domain
 * Uses Google Custom Search API (free tier: 100 queries/day)
 * Falls back to respectful web scraping when needed
 *
 * Google Custom Search: https://developers.google.com/custom-search
 */

import { BacklinkData } from "../types";
import { fetchHtml } from "@/lib/scrape";
import * as cheerio from "cheerio";

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  position?: number;
}

export class SearchCrawler {
  private readonly googleApiKey: string;
  private readonly googleCx: string;
  private readonly userAgent =
    "Mozilla/5.0 (compatible; SEOAuditBot/1.0; +https://seo-audit.com/bot)";
  private visitedUrls = new Set<string>();

  constructor() {
    this.googleApiKey = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY || "";
    this.googleCx = process.env.GOOGLE_CUSTOM_SEARCH_CX || "";
  }

  /**
   * Find backlinks via search engines
   */
  async findBacklinksViaSearch(
    targetDomain: string,
    options: {
      maxResults?: number;
      useGoogleAPI?: boolean;
    } = {}
  ): Promise<BacklinkData[]> {
    const maxResults = options.maxResults || 50;
    const backlinks: BacklinkData[] = [];

    try {
      console.log(`🔍 [SearchCrawler] Finding backlinks to ${targetDomain}...`);

      // Multiple search strategies
      const queries = this.buildSearchQueries(targetDomain);

      for (const query of queries) {
        if (backlinks.length >= maxResults) break;

        // Try Google Custom Search API first (if configured)
        let results: SearchResult[] = [];

        if (options.useGoogleAPI && this.googleApiKey && this.googleCx) {
          results = await this.searchViaGoogleAPI(query, 10);
        } else {
          // Fallback: Direct search (use with caution)
          results = await this.searchViaWeb(query, 10);
        }

        console.log(`  Found ${results.length} search results for: "${query}"`);

        // Extract backlinks from each result
        for (const result of results) {
          if (backlinks.length >= maxResults) break;

          // Skip if already visited
          if (this.visitedUrls.has(result.url)) continue;
          this.visitedUrls.add(result.url);

          try {
            const links = await this.extractBacklinks(result.url, targetDomain);
            backlinks.push(...links);
          } catch (error) {
            console.warn(`  ⚠️ Error extracting from ${result.url}:`, error);
          }

          // Respectful delay
          await this.delay(1000);
        }

        // Delay between queries
        await this.delay(2000);
      }

      console.log(`✅ [SearchCrawler] Found ${backlinks.length} backlinks`);
      return backlinks;
    } catch (error) {
      console.error("❌ [SearchCrawler] Error:", error);
      return [];
    }
  }

  /**
   * Build effective search queries
   */
  private buildSearchQueries(targetDomain: string): string[] {
    return [
      `"${targetDomain}"`,
      `link:${targetDomain}`,
      `intext:"${targetDomain}"`,
      `site:*.edu "${targetDomain}"`,
      `site:*.gov "${targetDomain}"`,
      `site:*.org "${targetDomain}"`,
    ];
  }

  /**
   * Search via Google Custom Search API (Recommended - 100 free queries/day)
   */
  private async searchViaGoogleAPI(query: string, numResults: number): Promise<SearchResult[]> {
    const results: SearchResult[] = [];

    try {
      const url = new URL("https://www.googleapis.com/customsearch/v1");
      url.searchParams.set("key", this.googleApiKey);
      url.searchParams.set("cx", this.googleCx);
      url.searchParams.set("q", query);
      url.searchParams.set("num", numResults.toString());

      const response = await fetch(url.toString(), {
        signal: AbortSignal.timeout(15000),
      });

      if (!response.ok) {
        console.warn(`⚠️ [GoogleAPI] HTTP ${response.status}`);
        return results;
      }

      const data = await response.json();

      if (data.items) {
        for (const item of data.items) {
          results.push({
            title: item.title,
            url: item.link,
            snippet: item.snippet,
          });
        }
      }
    } catch (error) {
      console.error("❌ [GoogleAPI] Error:", error);
    }

    return results;
  }

  /**
   * Search via web scraping (Fallback - use sparingly)
   */
  private async searchViaWeb(query: string, numResults: number): Promise<SearchResult[]> {
    const results: SearchResult[] = [];

    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `https://www.google.com/search?q=${encodedQuery}&num=${numResults}`;

      const html = await fetchHtml(url);
      const $ = cheerio.load(html);

      // Parse Google search results
      // Note: Google's HTML structure changes frequently
      $("div.g, div[data-sokoban-container]").each((index, element) => {
        const titleEl = $(element).find("h3").first();
        const linkEl = $(element).find("a").first();
        const snippetEl = $(element).find(".VwiC3b, .lEBKkf").first();

        const url = linkEl.attr("href");

        if (url && url.startsWith("http")) {
          results.push({
            title: titleEl.text().trim(),
            url: url,
            snippet: snippetEl.text().trim(),
            position: index + 1,
          });
        }
      });
    } catch (error) {
      console.error("❌ [WebSearch] Error:", error);
    }

    return results;
  }

  /**
   * Extract backlinks from a source URL
   */
  private async extractBacklinks(sourceUrl: string, targetDomain: string): Promise<BacklinkData[]> {
    const backlinks: BacklinkData[] = [];

    try {
      const html = await fetchHtml(sourceUrl);
      const $ = cheerio.load(html);
      const sourceDomain = this.extractDomain(sourceUrl);

      // Find all links
      $("a[href]").each((_, element) => {
        const href = $(element).attr("href");

        if (!href) return;

        // Check if link points to target domain
        if (this.isBacklinkToTarget(href, targetDomain)) {
          const anchorText = $(element).text().trim();
          const rel = $(element).attr("rel") || "";
          const title = $(element).attr("title") || "";
          const context = this.getContext($, element);
          const linkPosition = this.detectLinkPosition($, element);

          backlinks.push({
            id: this.generateId(),
            sourceUrl,
            sourceDomain,
            targetUrl: this.normalizeUrl(href, sourceUrl),
            anchorText: anchorText || title || null,
            linkType: rel.includes("nofollow") ? "NOFOLLOW" : "FOLLOW",
            status: "ACTIVE",
            isToxic: false,
            toxicScore: 0,
            linkPosition,
            context,
            isNofollow: rel.includes("nofollow"),
            isSponsored: rel.includes("sponsored"),
            isUGC: rel.includes("ugc"),
            firstSeen: new Date(),
            lastSeen: new Date(),
          });
        }
      });
    } catch (error) {
      // Silently skip extraction errors
    }

    return backlinks;
  }

  /**
   * Check if URL is a backlink to target domain
   */
  private isBacklinkToTarget(href: string, targetDomain: string): boolean {
    const lowerHref = href.toLowerCase();
    const lowerTarget = targetDomain.toLowerCase();

    return (
      lowerHref.includes(lowerTarget) ||
      lowerHref.includes(`//${lowerTarget}`) ||
      lowerHref.includes(`www.${lowerTarget}`)
    );
  }

  /**
   * Get context text around the link
   */
  private getContext($: any, element: any): string {
    const parent = $(element).parent();
    const text = parent.text().trim();

    const linkText = $(element).text();
    const index = text.indexOf(linkText);

    if (index === -1) return text.slice(0, 200);

    const start = Math.max(0, index - 100);
    const end = Math.min(text.length, index + linkText.length + 100);

    return text.slice(start, end);
  }

  /**
   * Detect link position
   */
  private detectLinkPosition(
    $: any,
    element: any
  ): "content" | "footer" | "sidebar" | "nav" | "comment" | "other" {
    const parents = $(element).parents();

    if (parents.is("footer, .footer")) return "footer";
    if (parents.is("nav, header, .header, .navigation")) return "nav";
    if (parents.is("aside, .sidebar, .widget")) return "sidebar";
    if (parents.is("article, main, .content, .post, .entry")) return "content";
    if (parents.is(".comment, .comments, #comments")) return "comment";

    return "other";
  }

  /**
   * Extract domain from URL
   */
  private extractDomain(url: string): string {
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  }

  /**
   * Normalize URL
   */
  private normalizeUrl(href: string, baseUrl: string): string {
    try {
      return new URL(href, baseUrl).toString();
    } catch {
      return href;
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `bl_search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Clear visited URLs cache
   */
  clearCache(): void {
    this.visitedUrls.clear();
  }
}
