import * as cheerio from "cheerio";
import { URL } from "url";

export interface ParsedHtml {
  title: string | null;
  metaDescription: string | null;
  canonical: string | null;
  h1: string | null;
  h2: string[];
  h3: string[];
  images: Array<{ src: string; alt: string | null }>;
  internalLinks: Array<{ href: string; anchor: string | null }>;
  jsonLdTypes: string[];
  textBlocks: string[];
  // Auxiliary data
  robots: string | null;
  viewport: string | null;
  tablesCount: number;
  listsCount: number;
  // Technical SEO additions
  h1Count: number;
  mixedContentCandidates: Array<{ type: "img" | "script" | "link" | "iframe"; src: string }>;
  isCanonicalSelfReference: boolean;
  hasNoindex: boolean;
  hasNofollow: boolean;
  // Accessibility/ARIA checks
  accessibilityIssues: Array<{
    type: string;
    selector: string;
    message: string;
    snippet: string;
  }>;
}

/**
 * Parses HTML content and extracts SEO-relevant elements
 * @param html - The HTML content to parse
 * @param baseUrl - The base URL for resolving relative links
 * @returns ParsedHtml object with extracted data
 */
export function parseHtml(html: string, baseUrl: string): ParsedHtml {
  const $ = cheerio.load(html);
  const baseUrlObj = new URL(baseUrl);

  // Extract title
  const title = $("title").first().text().trim() || null;

  // Extract meta description
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() || null;

  // Extract canonical URL
  const canonical = $('link[rel="canonical"]').attr("href")?.trim() || null;

  // Extract headings
  const h1Elements = $("h1");
  const h1 = h1Elements.first().text().trim() || null;
  const h1Count = h1Elements.length;
  const h2 = $("h2")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean);
  const h3 = $("h3")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean);

  // Extract images
  const images = $("img")
    .map((_, el) => {
      const $img = $(el);
      const src = $img.attr("src")?.trim();
      const alt = $img.attr("alt")?.trim() || null;

      if (src) {
        return { src: normalizeUrl(src, baseUrlObj), alt };
      }
      return null;
    })
    .get()
    .filter(Boolean) as Array<{ src: string; alt: string | null }>;

  // Extract internal links (same host)
  const internalLinks = $("a[href]")
    .map((_, el) => {
      const $link = $(el);
      const href = $link.attr("href")?.trim();
      const anchor = $link.text().trim() || null;

      if (href) {
        const normalizedHref = normalizeUrl(href, baseUrlObj);
        // Check if it's an internal link (same host)
        try {
          const hrefUrl = new URL(normalizedHref);
          if (hrefUrl.hostname === baseUrlObj.hostname) {
            return { href: normalizedHref, anchor };
          }
        } catch (error) {
          // Invalid URL, skip
        }
      }
      return null;
    })
    .get()
    .filter(Boolean) as Array<{ href: string; anchor: string | null }>;

  // Extract JSON-LD types
  const jsonLdTypes: string[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const content = $(el).html()?.trim();
      if (content) {
        const jsonLd = JSON.parse(content);

        // Handle both single objects and arrays
        const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

        items.forEach((item) => {
          if (item && typeof item === "object") {
            // Extract @type
            if (item["@type"]) {
              const types = Array.isArray(item["@type"]) ? item["@type"] : [item["@type"]];
              jsonLdTypes.push(...types);
            }

            // Extract @graph if present
            if (item["@graph"] && Array.isArray(item["@graph"])) {
              item["@graph"].forEach((graphItem: any) => {
                if (graphItem && graphItem["@type"]) {
                  const types = Array.isArray(graphItem["@type"])
                    ? graphItem["@type"]
                    : [graphItem["@type"]];
                  jsonLdTypes.push(...types);
                }
              });
            }
          }
        });
      }
    } catch (error) {
      console.warn("Failed to parse JSON-LD:", error);
    }
  });

  // Remove duplicates from JSON-LD types
  const uniqueJsonLdTypes = [...new Set(jsonLdTypes)];

  // Extract text blocks for word count and answerability
  const textBlocks: string[] = [];

  // Remove script and style elements for text extraction
  $("script, style, noscript").remove();

  // Extract text from body content
  $("body")
    .find("p, div, span, h1, h2, h3, h4, h5, h6, li, td, th, article, section")
    .each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 10) {
        // Only include substantial text blocks
        textBlocks.push(text);
      }
    });

  // Extract auxiliary data
  const robots = $('meta[name="robots"]').attr("content")?.trim() || null;
  const viewport = $('meta[name="viewport"]').attr("content")?.trim() || null;

  // Count tables and lists
  const tablesCount = $("table").length;
  const listsCount = $("ul, ol").length;

  // Technical SEO checks
  const hasNoindex = robots?.toLowerCase().includes("noindex") || false;
  const hasNofollow = robots?.toLowerCase().includes("nofollow") || false;

  // Check canonical self-reference
  const isCanonicalSelfReference = canonical === baseUrl || canonical === baseUrlObj.href;

  // Detect mixed content candidates
  const mixedContentCandidates: Array<{ type: "img" | "script" | "link" | "iframe"; src: string }> =
    [];

  // Check images
  $("img[src^='http://']").each((_, el) => {
    const src = $(el).attr("src");
    if (src) {
      mixedContentCandidates.push({ type: "img", src });
    }
  });

  // Check scripts
  $("script[src^='http://']").each((_, el) => {
    const src = $(el).attr("src");
    if (src) {
      mixedContentCandidates.push({ type: "script", src });
    }
  });

  // Check stylesheets
  $("link[href^='http://']").each((_, el) => {
    const href = $(el).attr("href");
    if (href) {
      mixedContentCandidates.push({ type: "link", src: href });
    }
  });

  // Check iframes
  $("iframe[src^='http://']").each((_, el) => {
    const src = $(el).attr("src");
    if (src) {
      mixedContentCandidates.push({ type: "iframe", src });
    }
  });

  // Accessibility/ARIA checks
  const accessibilityIssues: Array<{
    type: string;
    selector: string;
    message: string;
    snippet: string;
  }> = [];

  // Check for images missing alt (already done above, but add selector)
  $("img").each((_, el) => {
    const $img = $(el);
    const src = $img.attr("src") || "";
    const alt = $img.attr("alt");
    if (!alt || alt.trim() === "") {
      accessibilityIssues.push({
        type: "missing-alt",
        selector: `img[src='${src}']`,
        message: "Image is missing alt text.",
        snippet: $.html(el),
      });
    }
  });

  // Check for form elements missing label
  $("input, select, textarea").each((_, el) => {
    const $el = $(el);
    const id = $el.attr("id");
    const hasLabel = id && $(`label[for='${id}']`).length > 0;
    if (!hasLabel) {
      accessibilityIssues.push({
        type: "missing-label",
        selector: id ? `${el.tagName}[id='${id}']` : el.tagName,
        message: "Form element is missing a label.",
        snippet: $.html(el),
      });
    }
  });

  // Check for elements with invalid ARIA roles
  $("[role]").each((_, el) => {
    const $el = $(el);
    const role = $el.attr("role");
    const validRoles = [
      "banner",
      "navigation",
      "main",
      "complementary",
      "contentinfo",
      "region",
      "form",
      "search",
      "alert",
      "dialog",
      "button",
      "checkbox",
      "grid",
      "link",
      "listbox",
      "menu",
      "menubar",
      "menuitem",
      "option",
      "progressbar",
      "radio",
      "radiogroup",
      "scrollbar",
      "slider",
      "spinbutton",
      "status",
      "switch",
      "tab",
      "tabpanel",
      "textbox",
      "timer",
      "tooltip",
      "tree",
      "treeitem",
    ];
    if (role && !validRoles.includes(role)) {
      accessibilityIssues.push({
        type: "invalid-role",
        selector: `[role='${role}']`,
        message: `Invalid ARIA role: ${role}`,
        snippet: $.html(el),
      });
    }
  });

  // Check for missing main landmark
  if ($("main").length === 0) {
    accessibilityIssues.push({
      type: "missing-main-landmark",
      selector: "body",
      message: "No <main> landmark found. Every page should have a <main> element.",
      snippet: $.html("body"),
    });
  }

  return {
    title,
    metaDescription,
    canonical,
    h1,
    h2,
    h3,
    images,
    internalLinks,
    jsonLdTypes: uniqueJsonLdTypes,
    textBlocks,
    robots,
    viewport,
    tablesCount,
    listsCount,
    h1Count,
    mixedContentCandidates,
    isCanonicalSelfReference,
    hasNoindex,
    hasNofollow,
    accessibilityIssues,
  };
}

/**
 * Normalizes a URL to absolute form
 * @param url - The URL to normalize (can be relative or absolute)
 * @param baseUrl - The base URL for resolving relative URLs
 * @returns Normalized absolute URL
 */
function normalizeUrl(url: string, baseUrl: URL): string {
  try {
    // Handle protocol-relative URLs
    if (url.startsWith("//")) {
      return `${baseUrl.protocol}${url}`;
    }

    // Handle relative URLs
    if (url.startsWith("/")) {
      return `${baseUrl.protocol}//${baseUrl.host}${url}`;
    }

    // Handle absolute URLs
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // Handle relative URLs without leading slash
    return new URL(url, baseUrl.href).href;
  } catch (error) {
    console.warn(`Failed to normalize URL: ${url}`, error);
    return url; // Return original if normalization fails
  }
}

/**
 * Cleans text content by removing extra whitespace and normalizing
 * @param text - The text to clean
 * @returns Cleaned text
 */
export function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ") // Replace multiple whitespace with single space
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim();
}

/**
 * Calculates word count from text blocks
 * @param textBlocks - Array of text blocks
 * @returns Word count
 */
export function calculateWordCount(textBlocks: string[]): number {
  const combinedText = textBlocks.join(" ");
  const cleanedText = cleanText(combinedText);
  const words = cleanedText.split(/\s+/).filter((word) => word.length > 0);
  return words.length;
}

/**
 * Calculates reading time in minutes (average 200 words per minute)
 * @param wordCount - Number of words
 * @returns Reading time in minutes
 */
export function calculateReadingTime(wordCount: number): number {
  const wordsPerMinute = 200;
  return Math.ceil(wordCount / wordsPerMinute);
}
