import { fetch } from "undici";
import * as cheerio from "cheerio";
import { URL } from "url";

export interface CrawlPage {
  url: string;
  depth: number;
  status: number;
  title: string | null;
  h1_presence: boolean;
  word_count: number;
  images_missing_alt: number;
  noindex: boolean;
  canonical: string | null;
  meta_description: string | null;
  h1_count: number;
  h2_count: number;
  h3_count: number;
  internal_links: number;
  external_links: number;
  images_total: number;
  load_time_ms: number;
  error?: string;
}

export interface CrawlResult {
  startUrl: string;
  pages: CrawlPage[];
  totalPages: number;
  successfulPages: number;
  failedPages: number;
  averageLoadTime: number;
  issues: {
    noindex_pages: number;
    missing_titles: number;
    missing_h1: number;
    missing_meta_descriptions: number;
    images_without_alt: number;
    pages_without_canonical: number;
  };
  crawlTime: number;
  timestamp: string;
}

export interface CrawlOptions {
  limit?: number;
  sameHostOnly?: boolean;
  maxDepth?: number;
  timeout?: number;
  userAgent?: string;
}

/**
 * Mini crawler using bounded BFS
 */
export async function miniCrawl(
  startUrl: string,
  options: CrawlOptions = {}
): Promise<CrawlResult> {
  const {
    limit = 200,
    sameHostOnly = true,
    maxDepth = 5,
    timeout = 10000,
    userAgent = "SEO-Audit-Crawler/1.0",
  } = options;

  const startTime = Date.now();
  const visited = new Set<string>();
  const queue: Array<{ url: string; depth: number }> = [{ url: startUrl, depth: 0 }];
  const pages: CrawlPage[] = [];
  const baseHost = new URL(startUrl).hostname;

  console.log(`Starting crawl of ${startUrl} (limit: ${limit}, maxDepth: ${maxDepth})`);

  while (queue.length > 0 && pages.length < limit) {
    const { url, depth } = queue.shift()!;

    // Skip if already visited or too deep
    if (visited.has(url) || depth > maxDepth) {
      continue;
    }

    visited.add(url);

    try {
      console.log(`Crawling ${url} (depth: ${depth})`);
      const page = await crawlPage(url, depth, timeout, userAgent);
      pages.push(page);

      // Extract links for next level if not at max depth
      if (depth < maxDepth && page.status === 200) {
        const links = await extractLinks(url, page.html || "");

        for (const link of links) {
          const absoluteUrl = new URL(link, url).href;

          // Filter by host if sameHostOnly is true
          if (sameHostOnly && new URL(absoluteUrl).hostname !== baseHost) {
            continue;
          }

          // Skip if already visited or in queue
          if (!visited.has(absoluteUrl) && !queue.some((q) => q.url === absoluteUrl)) {
            queue.push({ url: absoluteUrl, depth: depth + 1 });
          }
        }
      }

      // Add small delay to be polite
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Error crawling ${url}:`, error);
      pages.push({
        url,
        depth,
        status: 0,
        title: null,
        h1_presence: false,
        word_count: 0,
        images_missing_alt: 0,
        noindex: false,
        canonical: null,
        meta_description: null,
        h1_count: 0,
        h2_count: 0,
        h3_count: 0,
        internal_links: 0,
        external_links: 0,
        images_total: 0,
        load_time_ms: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  const crawlTime = Date.now() - startTime;
  const successfulPages = pages.filter((p) => p.status === 200).length;
  const failedPages = pages.length - successfulPages;
  const averageLoadTime =
    pages.length > 0 ? pages.reduce((sum, p) => sum + p.load_time_ms, 0) / pages.length : 0;

  // Calculate issues summary
  const issues = {
    noindex_pages: pages.filter((p) => p.noindex).length,
    missing_titles: pages.filter((p) => !p.title).length,
    missing_h1: pages.filter((p) => !p.h1_presence).length,
    missing_meta_descriptions: pages.filter((p) => !p.meta_description).length,
    images_without_alt: pages.reduce((sum, p) => sum + p.images_missing_alt, 0),
    pages_without_canonical: pages.filter((p) => !p.canonical).length,
  };

  return {
    startUrl,
    pages,
    totalPages: pages.length,
    successfulPages,
    failedPages,
    averageLoadTime,
    issues,
    crawlTime,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Crawl a single page and extract SEO data
 */
async function crawlPage(
  url: string,
  depth: number,
  timeout: number,
  userAgent: string
): Promise<CrawlPage & { html?: string }> {
  const startTime = Date.now();

  const response = await fetch(url, {
    headers: {
      "User-Agent": userAgent,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate",
      Connection: "keep-alive",
      "Upgrade-Insecure-Requests": "1",
    },
    signal: AbortSignal.timeout(timeout),
  });

  const loadTime = Date.now() - startTime;
  const html = await response.text();
  const $ = cheerio.load(html);

  // Extract basic SEO data
  const title = $("title").text().trim() || null;
  const h1Count = $("h1").length;
  const h1Presence = h1Count > 0;
  const h2Count = $("h2").length;
  const h3Count = $("h3").length;

  // Meta data
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() || null;
  const canonical = $('link[rel="canonical"]').attr("href") || null;
  const robots = $('meta[name="robots"]').attr("content") || "";
  const noindex = robots.toLowerCase().includes("noindex");

  // Images
  const images = $("img");
  const imagesTotal = images.length;
  const imagesMissingAlt = images.filter((_, img) => !$(img).attr("alt")).length;

  // Links
  const links = $("a[href]");
  const internalLinks = links.filter((_, link) => {
    const href = $(link).attr("href");
    if (!href) return false;
    try {
      const linkUrl = new URL(href, url);
      const pageUrl = new URL(url);
      return linkUrl.hostname === pageUrl.hostname;
    } catch {
      return false;
    }
  }).length;

  const externalLinks = links.length - internalLinks;

  // Word count (approximate)
  const text = $("body").text().replace(/\s+/g, " ").trim();
  const wordCount = text.split(" ").filter((word) => word.length > 0).length;

  return {
    url,
    depth,
    status: response.status,
    title,
    h1_presence: h1Presence,
    word_count: wordCount,
    images_missing_alt: imagesMissingAlt,
    noindex,
    canonical,
    meta_description: metaDescription,
    h1_count: h1Count,
    h2_count: h2Count,
    h3_count: h3Count,
    internal_links: internalLinks,
    external_links: externalLinks,
    images_total: imagesTotal,
    load_time_ms: loadTime,
    html,
  };
}

/**
 * Extract all links from HTML content
 */
async function extractLinks(baseUrl: string, html: string): Promise<string[]> {
  const $ = cheerio.load(html);
  const links: string[] = [];

  $("a[href]").each((_, element) => {
    const href = $(element).attr("href");
    if (href) {
      try {
        const absoluteUrl = new URL(href, baseUrl).href;
        links.push(absoluteUrl);
      } catch {
        // Skip invalid URLs
      }
    }
  });

  return [...new Set(links)]; // Remove duplicates
}

/**
 * Generate CSV export from crawl results
 */
export function generateCrawlCSV(result: CrawlResult): string {
  const headers = [
    "URL",
    "Depth",
    "Status",
    "Title",
    "H1 Present",
    "Word Count",
    "Images Missing Alt",
    "Noindex",
    "Canonical",
    "Meta Description",
    "H1 Count",
    "H2 Count",
    "H3 Count",
    "Internal Links",
    "External Links",
    "Total Images",
    "Load Time (ms)",
    "Error",
  ];

  const rows = result.pages.map((page) => [
    page.url,
    page.depth,
    page.status,
    page.title || "",
    page.h1_presence ? "Yes" : "No",
    page.word_count,
    page.images_missing_alt,
    page.noindex ? "Yes" : "No",
    page.canonical || "",
    page.meta_description || "",
    page.h1_count,
    page.h2_count,
    page.h3_count,
    page.internal_links,
    page.external_links,
    page.images_total,
    page.load_time_ms,
    page.error || "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
  ].join("\n");

  return csvContent;
}
