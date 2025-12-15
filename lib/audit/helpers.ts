/**
 * Enhanced Audit Engine - Helper Methods
 * Analysis helper methods for technical SEO, security, mobile, and performance
 */

import * as cheerio from "cheerio";
import { URL } from "url";

export class AuditHelpers {
  /**
   * Analyze robots.txt file
   */
  static async analyzeRobotsTxt(origin: string) {
    try {
      const response = await fetch(`${origin}/robots.txt`);
      if (!response.ok) {
        return {
          found: false,
          allows: false,
          errors: ["robots.txt not found"],
          warnings: [],
        };
      }

      const content = await response.text();
      const allows = !content.toLowerCase().includes("disallow: /");

      return {
        found: true,
        allows,
        errors: [],
        warnings: [],
      };
    } catch (error) {
      return {
        found: false,
        allows: false,
        errors: [`Failed to fetch robots.txt: ${error}`],
        warnings: [],
      };
    }
  }

  /**
   * Analyze meta robots tags
   */
  static analyzeMetaRobots($: cheerio.CheerioAPI) {
    const metaRobots = $('meta[name="robots"]').attr("content") || "";
    const content = metaRobots.toLowerCase();

    return {
      noindex: content.includes("noindex"),
      nofollow: content.includes("nofollow"),
      noarchive: content.includes("noarchive"),
      nosnippet: content.includes("nosnippet"),
    };
  }

  /**
   * Analyze canonical URL
   */
  static analyzeCanonical($: cheerio.CheerioAPI, currentUrl: string) {
    const canonicalLink = $('link[rel="canonical"]').attr("href");

    if (!canonicalLink) {
      return {
        found: false,
        url: null,
        isSelfReferencing: false,
        chainLength: 0,
        errors: ["No canonical URL found"],
      };
    }

    const canonicalUrl = new URL(canonicalLink, currentUrl).toString();
    const isSelfReferencing = canonicalUrl === currentUrl;

    return {
      found: true,
      url: canonicalUrl,
      isSelfReferencing,
      chainLength: 1, // TODO: Implement chain detection
      errors: [],
    };
  }

  /**
   * Analyze crawlability
   */
  static analyzeCrawlability(headers: Record<string, string>, html: string) {
    return {
      statusCode: 200, // This would come from the actual response
      redirectChain: [], // TODO: Implement redirect chain tracking
      loadTime: 0, // TODO: Implement timing measurement
      responseSize: html.length,
      serverErrors: [],
    };
  }

  /**
   * Analyze sitemaps
   */
  static async analyzeSitemaps(origin: string, html: string) {
    // Check for XML sitemap
    let xmlSitemap = {
      found: false,
      url: null as string | null,
      urlCount: 0,
      errors: [] as string[],
      lastModified: null as string | null,
    };

    try {
      const response = await fetch(`${origin}/sitemap.xml`);
      if (response.ok) {
        const content = await response.text();
        const urlMatches = content.match(/<url>/g);
        xmlSitemap = {
          found: true,
          url: `${origin}/sitemap.xml`,
          urlCount: urlMatches ? urlMatches.length : 0,
          errors: [],
          lastModified: response.headers.get("last-modified"),
        };
      }
    } catch (error) {
      xmlSitemap.errors.push(`Failed to fetch sitemap: ${error}`);
    }

    // Check for HTML sitemap
    const $ = cheerio.load(html);
    const sitemapLinks = $('a[href*="sitemap"]').length;

    return {
      xmlSitemap,
      htmlSitemap: {
        found: sitemapLinks > 0,
        linkCount: sitemapLinks,
      },
    };
  }

  /**
   * Analyze URL structure
   */
  static analyzeUrlStructure(url: string) {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const hasParameters = urlObj.search.length > 0;

    const isClean =
      !hasParameters &&
      !pathname.includes("?") &&
      !pathname.includes("#") &&
      pathname.split("/").every((segment) => segment === "" || /^[a-z0-9-]+$/.test(segment));

    const issues: string[] = [];
    if (hasParameters) issues.push("Contains query parameters");
    if (pathname.length > 100) issues.push("URL is too long");
    if (pathname.includes("_")) issues.push("Contains underscores");

    return {
      isClean,
      hasParameters,
      length: url.length,
      isDescriptive: pathname.split("/").some((segment) => segment.length > 3),
      issues,
    };
  }

  /**
   * Extract performance strategies
   */
  static extractPerformanceStrategies(result: any): string[] {
    const strategies: string[] = [];

    if (result.lighthouseResult?.audits) {
      const audits = result.lighthouseResult.audits;

      if (audits["unused-css-rules"]?.score === 0) {
        strategies.push("Remove unused CSS");
      }
      if (audits["unused-javascript"]?.score === 0) {
        strategies.push("Remove unused JavaScript");
      }
      if (audits["render-blocking-resources"]?.score === 0) {
        strategies.push("Eliminate render-blocking resources");
      }
      if (audits["offscreen-images"]?.score === 0) {
        strategies.push("Defer offscreen images");
      }
    }

    return strategies;
  }

  /**
   * Analyze heading structure
   */
  static analyzeHeadingStructure($: cheerio.CheerioAPI) {
    const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const counts = {
      h1Count: $("h1").length,
      h2Count: $("h2").length,
      h3Count: $("h3").length,
      h4Count: $("h4").length,
      h5Count: $("h5").length,
      h6Count: $("h6").length,
    };

    const missingHeadings: string[] = [];
    let previousLevel = 0;

    headings.forEach((heading, index) => {
      const level = index + 1;
      const count = $(heading).length;

      if (count > 0) {
        if (previousLevel > 0 && level > previousLevel + 1) {
          missingHeadings.push(`Missing h${previousLevel + 1} before h${level}`);
        }
        previousLevel = level;
      }
    });

    return {
      ...counts,
      isStructured: missingHeadings.length === 0,
      missingHeadings,
    };
  }

  /**
   * Analyze link structure
   */
  static analyzeLinkStructure($: cheerio.CheerioAPI, currentUrl?: string) {
    const hostname = currentUrl ? new URL(currentUrl).hostname : "localhost";

    const internalLinks = $("a[href]").filter((_, el) => {
      const href = $(el).attr("href") || "";
      return href.startsWith("/") || href.startsWith("#") || href.includes(hostname);
    });

    const externalLinks = $("a[href]").filter((_, el) => {
      const href = $(el).attr("href") || "";
      return href.startsWith("http") && !href.includes(hostname);
    });

    const nofollowLinks = $('a[rel*="nofollow"]');

    // Extract unique domains
    const domains: string[] = [];
    externalLinks.each((_, el) => {
      try {
        const href = $(el).attr("href") || "";
        const domain = new URL(href).hostname;
        if (!domains.includes(domain)) {
          domains.push(domain);
        }
      } catch (e) {
        // Invalid URL
      }
    });

    return {
      internal: {
        count: internalLinks.length,
        unique: new Set(internalLinks.map((_, el) => $(el).attr("href")).get()).size,
        broken: 0, // TODO: Implement broken link detection
      },
      external: {
        count: externalLinks.length,
        unique: domains.length,
        nofollow: nofollowLinks.length,
        broken: 0, // TODO: Implement broken link detection
        domains,
      },
    };
  }

  /**
   * Analyze images
   */
  static analyzeImages($: cheerio.CheerioAPI) {
    const images = $("img");
    const total = images.length;
    let withoutAlt = 0;
    let oversized = 0;
    let unoptimized = 0;
    let decorativeCount = 0;

    images.each((_, img) => {
      const $img = $(img);
      const alt = $img.attr("alt");
      const src = $img.attr("src") || "";

      if (!alt) withoutAlt++;
      if (alt === "") decorativeCount++;
      if (src.match(/\.(jpg|jpeg|png)$/i)) unoptimized++;

      // Simple heuristic for oversized images
      const width = parseInt($img.attr("width") || "0");
      const height = parseInt($img.attr("height") || "0");
      if (width > 1200 || height > 1200) oversized++;
    });

    return {
      total,
      withoutAlt,
      oversized,
      unoptimized,
      decorativeCount,
    };
  }

  /**
   * Detect mixed content
   */
  static detectMixedContent($: cheerio.CheerioAPI, httpsEnabled: boolean) {
    if (!httpsEnabled) return [];

    const mixedContent: Array<{
      type: "image" | "script" | "stylesheet" | "iframe" | "other";
      url: string;
      description: string;
    }> = [];

    // Check for HTTP resources on HTTPS page
    $("script[src], link[href], img[src], iframe[src]").each((_, el) => {
      const $el = $(el);
      const src = $el.attr("src") || $el.attr("href") || "";

      if (src.startsWith("http://")) {
        const tagName = ($el.prop("tagName") as string)?.toLowerCase() || "unknown";
        let type: "image" | "script" | "stylesheet" | "iframe" | "other" = "other";

        switch (tagName) {
          case "img":
            type = "image";
            break;
          case "script":
            type = "script";
            break;
          case "link":
            type = "stylesheet";
            break;
          case "iframe":
            type = "iframe";
            break;
        }

        mixedContent.push({
          type,
          url: src,
          description: `${tagName} element loads HTTP resource`,
        });
      }
    });

    return mixedContent;
  }

  /**
   * Analyze security headers
   */
  static analyzeSecurityHeaders(headers: Record<string, string>) {
    return {
      contentSecurityPolicy: !!headers["content-security-policy"],
      strictTransportSecurity: !!headers["strict-transport-security"],
      xFrameOptions: !!headers["x-frame-options"],
      xContentTypeOptions: !!headers["x-content-type-options"],
      referrerPolicy: !!headers["referrer-policy"],
      permissionsPolicy: !!headers["permissions-policy"],
    };
  }

  /**
   * Detect security vulnerabilities
   */
  static detectSecurityVulnerabilities(
    $: cheerio.CheerioAPI,
    headers: Record<string, string>
  ): string[] {
    const vulnerabilities: string[] = [];

    // Check for inline JavaScript
    if ($("script").filter((_, el) => !$(el).attr("src")).length > 0) {
      vulnerabilities.push("Inline JavaScript detected");
    }

    // Check for missing security headers
    if (!headers["x-content-type-options"]) {
      vulnerabilities.push("Missing X-Content-Type-Options header");
    }

    if (!headers["x-frame-options"]) {
      vulnerabilities.push("Missing X-Frame-Options header");
    }

    return vulnerabilities;
  }

  /**
   * Analyze viewport configuration
   */
  static analyzeViewport($: cheerio.CheerioAPI) {
    const viewportMeta = $('meta[name="viewport"]').attr("content") || "";
    const hasValidViewport = viewportMeta.includes("width=device-width");

    return {
      hasValidViewport,
      content: viewportMeta,
      width: viewportMeta.includes("width=device-width") ? "device-width" : "unknown",
      initialScale: viewportMeta.match(/initial-scale=([0-9.]+)/)?.[1] || "unknown",
    };
  }

  /**
   * Analyze touch targets
   */
  static analyzeTouchTargets($: cheerio.CheerioAPI) {
    const touchTargets: Array<{
      selector: string;
      width: number;
      height: number;
      isTooSmall: boolean;
    }> = [];

    $("a, button, input, textarea, select").each((_, el) => {
      const $el = $(el);
      const selector = ($el.prop("tagName") as string)?.toLowerCase() || "unknown";

      // Simple heuristic - in a real implementation, you'd measure actual dimensions
      const isTooSmall = selector === "a" && ($el.text().length < 3 || !$el.text().trim());

      touchTargets.push({
        selector,
        width: 48, // Default assumption
        height: 48,
        isTooSmall,
      });
    });

    return touchTargets;
  }

  /**
   * Analyze text readability
   */
  static analyzeTextReadability($: cheerio.CheerioAPI) {
    const text = $("body").text();
    const fontSize = 16; // Default assumption
    const contrast = 100; // Default assumption - would need actual color analysis

    // Simple readability score based on text length and structure
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length;
    const avgWordsPerSentence = words / sentences;

    let score = 100;
    if (avgWordsPerSentence > 20) score -= 20;
    if (fontSize < 14) score -= 30;
    if (contrast < 7) score -= 20;

    return {
      score: Math.max(0, score),
      fontSize,
      contrast,
      textLength: text.length,
    };
  }

  /**
   * Analyze content fit for mobile
   */
  static analyzeContentFit($: cheerio.CheerioAPI): boolean {
    // Check for horizontal scrolling indicators
    const fixedWidthElements = $('[style*="width:"][style*="px"]').length;
    const tableElements = $("table").length;

    // Simple heuristic
    return fixedWidthElements < 5 && tableElements < 3;
  }

  /**
   * Analyze interactive elements
   */
  static analyzeInteractiveElements($: cheerio.CheerioAPI) {
    const buttons = $('button, input[type="button"], input[type="submit"]').length;
    const links = $("a[href]").length;
    const forms = $("form").length;

    return {
      buttons,
      links,
      forms,
      total: buttons + links + forms,
    };
  }
}
