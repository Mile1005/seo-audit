import { fetch } from "undici";
import * as cheerio from "cheerio";
import { URL } from "url";
import xml2js from "xml2js";

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
  pages: (CrawlPage & { brokenLinks?: string[] })[];
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
    broken_links: number;
    duplicate_titles: string[];
    duplicate_canonicals: string[];
  };
  robotsTxt: { found: boolean; url: string; status?: number };
  sitemapXml: { found: boolean; url: string; status?: number; urls?: string[] };
  brokenLinks: { url: string; from: string }[];
  crawlTime: number;
  timestamp: string;
}

export interface CrawlOptions {
  limit?: number;
  sameHostOnly?: boolean;
  maxDepth?: number;
  timeout?: number;
  userAgent?: string;
  crawlDelay?: number;
}

/**
 * Mini crawler using bounded BFS
 */
export async function miniCrawl(
  startUrl: string,
  options: CrawlOptions = {}
): Promise<CrawlResult> {
  const {
    limit = 30, // Enforce hard limit
    sameHostOnly = true,
    maxDepth = 3, // Reduced for better reliability
    timeout = 15000, // Increased timeout
    userAgent = "SEO-Audit-Crawler/2.0 (+https://seo-audit-seven.vercel.app)",
    crawlDelay = 100,
  } = options;

  const startTime = Date.now();
  const visited = new Set<string>();
  let queue: Array<{ url: string; depth: number }> = [{ url: startUrl, depth: 0 }];
  const pages: (CrawlPage & { brokenLinks?: string[]; og?: any; twitter?: any; structuredData?: any[] })[] = [];
  const baseHost = new URL(startUrl).hostname;
  const concurrency = 3; // Reduced concurrency for better reliability
  let active = 0;
  let shouldStop = false;

  console.log(`Starting crawl for ${startUrl} with options:`, { limit, maxDepth, timeout, concurrency });

  // robots.txt detection with better error handling
  const robotsUrl = new URL("/robots.txt", startUrl).origin + "/robots.txt";
  let robotsStatus = 0;
  let robotsFound = false;
  try {
    console.log('Checking robots.txt:', robotsUrl);
    const robotsRes = await fetch(robotsUrl, { 
      method: "GET", 
      headers: { "User-Agent": userAgent }, 
      signal: AbortSignal.timeout(timeout / 2) 
    });
    robotsStatus = robotsRes.status;
    robotsFound = robotsRes.status === 200;
    console.log('Robots.txt result:', { found: robotsFound, status: robotsStatus });
  } catch (err) {
    console.log('Robots.txt check failed:', err instanceof Error ? err.message : 'Unknown error');
  }

  // sitemap.xml detection and parsing with better error handling
  const sitemapUrl = new URL("/sitemap.xml", startUrl).origin + "/sitemap.xml";
  let sitemapStatus = 0;
  let sitemapFound = false;
  let sitemapUrls: string[] = [];
  try {
    console.log('Checking sitemap.xml:', sitemapUrl);
    const sitemapRes = await fetch(sitemapUrl, { 
      method: "GET", 
      headers: { "User-Agent": userAgent }, 
      signal: AbortSignal.timeout(timeout / 2) 
    });
    sitemapStatus = sitemapRes.status;
    sitemapFound = sitemapRes.status === 200;
    if (sitemapFound) {
      const xml = await sitemapRes.text();
      const parsed = await xml2js.parseStringPromise(xml);
      const urlset = parsed.urlset?.url || [];
      sitemapUrls = urlset.map((u: any) => u.loc?.[0]).filter(Boolean).slice(0, limit);
      // Add sitemap URLs to queue but don't replace the start URL
      const newUrls = sitemapUrls.filter(url => url !== startUrl);
      queue.push(...newUrls.slice(0, limit - 1).map(url => ({ url, depth: 0 })));
      console.log('Sitemap URLs found:', sitemapUrls.length, 'added to queue:', newUrls.length);
    }
    console.log('Sitemap.xml result:', { found: sitemapFound, status: sitemapStatus, urls: sitemapUrls.length });
  } catch (err) {
    console.log('Sitemap.xml check failed:', err instanceof Error ? err.message : 'Unknown error');
  }

  const brokenLinks: { url: string; from: string }[] = [];
  const titleMap: Record<string, string[]> = {};
  const canonicalMap: Record<string, string[]> = {};

  async function crawlWorker() {
    while (true) {
      if (shouldStop || pages.length >= limit) {
        console.log('Worker stopping: shouldStop=', shouldStop, 'pages.length=', pages.length, 'limit=', limit);
        return;
      }
      
      let item: { url: string; depth: number } | undefined;
      // Lock queue
      if (queue.length > 0 && pages.length < limit) {
        item = queue.shift();
      } else {
        console.log('Worker stopping: no more work. Queue length:', queue.length, 'Pages:', pages.length);
        break;
      }
      
      if (!item) break;
      const { url, depth } = item;
      
      if (visited.has(url) || depth > maxDepth) {
        console.log(`Skipping ${url}: visited=${visited.has(url)}, depth=${depth}>${maxDepth}`);
        continue;
      }
      
      visited.add(url);
      
      try {
        const page = await crawlPage(url, depth, timeout, userAgent, true);
        
        if (crawlDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, crawlDelay));
        }
        
        // Simplified broken link detection (only for successful pages)
        let pageBroken: string[] = [];
        if (page.status === 200 && page.html && depth < maxDepth - 1) {
          try {
            const $ = cheerio.load(page.html);
            const links = $("a[href]").map((_, el) => $(el).attr("href")).get().filter(Boolean).slice(0, 10); // Limit link checking
            
            for (const link of links) {
              try {
                const abs = new URL(link, url).href;
                if (sameHostOnly && new URL(abs).hostname !== baseHost) continue;
                if (!visited.has(abs)) {
                  // Quick HEAD request to check if link is broken
                  const res = await fetch(abs, { 
                    method: "HEAD", 
                    headers: { "User-Agent": userAgent }, 
                    signal: AbortSignal.timeout(timeout / 4) 
                  });
                  if (res.status >= 400) {
                    brokenLinks.push({ url: abs, from: url });
                    pageBroken.push(abs);
                  }
                }
              } catch {
                // Skip broken link check on error
              }
            }
          } catch (err) {
            console.log('Error during broken link check for', url, ':', err);
          }
        }
        
        // Track titles/canonicals for duplicate detection
        if (page.title) {
          if (!titleMap[page.title]) titleMap[page.title] = [];
          titleMap[page.title].push(url);
        }
        if (page.canonical) {
          if (!canonicalMap[page.canonical]) canonicalMap[page.canonical] = [];
          canonicalMap[page.canonical].push(url);
        }
        
        // Extract Open Graph, Twitter, and structured data (simplified)
        const og: any = {};
        const twitter: any = {};
        const structuredData: any[] = [];
        
        if (page.html && page.status === 200) {
          try {
            const $ = cheerio.load(page.html);
            $("meta").each((_, el) => {
              const prop = $(el).attr("property") || $(el).attr("name");
              const content = $(el).attr("content");
              if (prop && content) {
                if (prop.startsWith("og:")) og[prop] = content;
                if (prop.startsWith("twitter:")) twitter[prop] = content;
              }
            });
            $("script[type='application/ld+json']").each((_, el) => {
              try {
                const json = JSON.parse($(el).html() || "");
                structuredData.push(json);
              } catch {}
            });
          } catch (err) {
            console.log('Error extracting metadata for', url, ':', err);
          }
        }
        
        pages.push({ ...page, brokenLinks: pageBroken, og, twitter, structuredData });
        
        // Extract links for next level if not at max depth and page was successful
        if (depth < maxDepth && page.status === 200 && page.html && pages.length < limit) {
          try {
            const nextLinks = await extractLinks(url, page.html);
            let addedLinks = 0;
            for (const link of nextLinks) {
              if (addedLinks >= 5) break; // Limit new links per page
              try {
                const abs = new URL(link, url).href;
                if (sameHostOnly && new URL(abs).hostname !== baseHost) continue;
                if (!visited.has(abs) && !queue.some((q) => q.url === abs)) {
                  queue.push({ url: abs, depth: depth + 1 });
                  addedLinks++;
                }
              } catch {
                // Skip invalid URLs
              }
            }
            console.log(`Added ${addedLinks} new links from ${url} to queue (queue size: ${queue.length})`);
          } catch (err) {
            console.log('Error extracting links from', url, ':', err);
          }
        }
        
        // Small delay between requests to be respectful
        await new Promise((resolve) => setTimeout(resolve, 100));
        
      } catch (error) {
        console.log('Error crawling page', url, ':', error);
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
          brokenLinks: [],
          og: {},
          twitter: {},
          structuredData: [],
        });
      }
    }
    console.log('Worker finished');
  }

  // Launch concurrent workers
  const workers = Array.from({ length: concurrency }, () => crawlWorker());
  await Promise.all(workers);

  // Duplicate title/canonical detection
  const duplicateTitles = Object.entries(titleMap).filter(([_, urls]) => urls.length > 1).map(([title]) => title);
  const duplicateCanonicals = Object.entries(canonicalMap).filter(([_, urls]) => urls.length > 1).map(([canonical]) => canonical);

  const crawlTime = Date.now() - startTime;
  const successfulPages = pages.filter((p) => p.status === 200).length;
  const failedPages = pages.length - successfulPages;
  const averageLoadTime = pages.length > 0 ? pages.reduce((sum, p) => sum + p.load_time_ms, 0) / pages.length : 0;
  const issues = {
    noindex_pages: pages.filter((p) => p.noindex).length,
    missing_titles: pages.filter((p) => !p.title).length,
    missing_h1: pages.filter((p) => !p.h1_presence).length,
    missing_meta_descriptions: pages.filter((p) => !p.meta_description).length,
    images_without_alt: pages.reduce((sum, p) => sum + p.images_missing_alt, 0),
    pages_without_canonical: pages.filter((p) => !p.canonical).length,
    broken_links: brokenLinks.length,
    duplicate_titles: duplicateTitles,
    duplicate_canonicals: duplicateCanonicals,
  };

  return {
    startUrl,
    pages,
    totalPages: pages.length,
    successfulPages,
    failedPages,
    averageLoadTime,
    issues,
    robotsTxt: { found: robotsFound, url: robotsUrl, status: robotsStatus },
    sitemapXml: { found: sitemapFound, url: sitemapUrl, status: sitemapStatus, urls: sitemapUrls },
    brokenLinks,
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
  userAgent: string,
  followRedirects = true
): Promise<CrawlPage & { html?: string }> {
  const startTime = Date.now();

  let response;
  let redirected = false;
  let finalUrl = url;
  
  try {
    console.log(`Crawling page: ${url} (depth: ${depth})`);
    
    response = await fetch(url, {
      headers: {
        "User-Agent": userAgent,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none"
      },
      signal: AbortSignal.timeout(timeout),
      redirect: followRedirects ? "follow" : "manual",
    });
    
    if (response.url && response.url !== url) {
      redirected = true;
      finalUrl = response.url;
      console.log(`Redirected: ${url} -> ${finalUrl}`);
    }
    
    // Check for successful response
    if (!response.ok) {
      console.log(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      return {
        url: finalUrl,
        depth,
        status: response.status,
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
        load_time_ms: Date.now() - startTime,
        error: `HTTP ${response.status}: ${response.statusText}`,
        html: "",
      };
    }
    
  } catch (err) {
    const loadTime = Date.now() - startTime;
    console.log(`Error fetching ${url}:`, err instanceof Error ? err.message : 'Unknown error');
    
    return {
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
      load_time_ms: loadTime,
      error: err instanceof Error ? err.message : "Unknown error",
      html: "",
    };
  }

  const loadTime = Date.now() - startTime;
  
  let html = "";
  try {
    html = await response.text();
  } catch (err) {
    console.log(`Error reading response body for ${url}:`, err);
    return {
      url: finalUrl,
      depth,
      status: response.status,
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
      load_time_ms: loadTime,
      error: "Failed to read response body",
      html: "",
    };
  }

  const $ = cheerio.load(html);

  // Extract basic SEO data with better error handling
  const title = $("title").text().trim() || null;
  const h1Elements = $("h1");
  const h1Count = h1Elements.length;
  const h1Presence = h1Count > 0;
  const h2Count = $("h2").length;
  const h3Count = $("h3").length;

  // Meta data
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() || null;
  const canonical = $('link[rel="canonical"]').attr("href") || null;
  const robots = $('meta[name="robots"]').attr("content") || "";
  const noindex = robots.toLowerCase().includes("noindex");

  // Images with better counting
  const images = $("img");
  const imagesTotal = images.length;
  let imagesMissingAlt = 0;
  images.each((_, img) => {
    const alt = $(img).attr("alt");
    if (!alt || alt.trim() === "") {
      imagesMissingAlt++;
    }
  });

  // Links with better counting and validation
  const links = $("a[href]");
  let internalLinks = 0;
  let externalLinks = 0;
  
  links.each((_, link) => {
    const href = $(link).attr("href");
    if (!href || href.trim() === "") return;
    
    try {
      // Handle relative URLs and fragments
      if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return; // Skip anchors and special schemes
      }
      
      const linkUrl = new URL(href, finalUrl);
      const pageUrl = new URL(finalUrl);
      
      if (linkUrl.hostname === pageUrl.hostname) {
        internalLinks++;
      } else {
        externalLinks++;
      }
    } catch {
      // Skip invalid URLs
    }
  });

  // Word count (approximate, excluding script and style content)
  $("script, style, nav, header, footer").remove();
  const text = $("body").text().replace(/\s+/g, " ").trim();
  const wordCount = text ? text.split(" ").filter((word) => word.length > 0).length : 0;

  console.log(`Crawled ${finalUrl}: ${response.status}, title: "${title}", h1: ${h1Count}, words: ${wordCount}, images: ${imagesTotal}/${imagesMissingAlt} missing alt`);

  return {
    url: finalUrl,
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
    error: redirected ? `Redirected to ${finalUrl}` : undefined,
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
