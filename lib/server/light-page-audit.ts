// Phase 10: lightweight page audit (subset)
// Extract meta title, description, headings, word count, images alt ratio, internal link count
import * as cheerio from "cheerio";

export interface LightPageAuditResult {
  title?: string;
  metaDescription?: string;
  h1Count: number;
  h2Count: number;
  wordCount: number;
  images: number;
  imagesWithoutAlt: number;
  internalLinkCount: number;
}

export function lightPageAudit(html: string, origin: string): LightPageAuditResult {
  const $ = cheerio.load(html);

  // Extract title and meta description
  const title = $("title").first().text().trim() || undefined;
  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() ||
    $('meta[property="og:description"]').attr("content")?.trim() ||
    undefined;

  // Count headings
  const h1Count = $("h1").length;
  const h2Count = $("h2").length;

  // Calculate word count from body text
  const bodyText = $("body").text() || "";
  const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

  // Count images and images without alt text
  const allImages = $("img");
  const images = allImages.length;
  const imagesWithoutAlt = allImages.filter((_, el) => !$(el).attr("alt")).length;

  // Count internal links
  const internalLinkCount = $("a[href]").filter((_, el) => {
    const href = $(el).attr("href") || "";
    if (!href || href.startsWith("#")) return false;
    try {
      const u = new URL(href, origin);
      return u.origin === origin;
    } catch {
      return false;
    }
  }).length;

  return {
    title,
    metaDescription,
    h1Count,
    h2Count,
    wordCount,
    images,
    imagesWithoutAlt,
    internalLinkCount,
  };
}
