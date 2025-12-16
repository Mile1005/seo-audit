/**
 * Backlink utility helpers (guide-specified)
 */

/**
 * Extract domain from URL and remove www prefix
 */
export function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/**
 * Extract a hostname from either a domain or a URL-like string.
 */
export function normalizeDomain(input: string): string {
  const trimmed = (input || "").trim();
  if (!trimmed) return "";

  // If it's already a bare domain (no scheme), URL() will throw.
  // Add a scheme to parse, then strip.
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return extractDomain(withScheme);
  } catch {
    return "";
  }
}

/**
 * Chunk array into batches for API calls
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Scale OpenPageRank score (0-10) to Domain Rating scale (0-100)
 */
export function scaleToDomainRating(oprScore: number): number {
  return Math.round(Math.min(oprScore * 10, 100));
}

/**
 * Check if date is within specified days
 */
export function isWithinDays(date: Date, days: number): boolean {
  const diff = Date.now() - date.getTime();
  return diff < days * 24 * 60 * 60 * 1000;
}

/**
 * Deduplicate backlinks by sourceUrl
 */
export function deduplicateBacklinks<T extends { sourceUrl: string }>(backlinks: T[]): T[] {
  const seen = new Map<string, T>();

  for (const backlink of backlinks) {
    if (!seen.has(backlink.sourceUrl)) {
      seen.set(backlink.sourceUrl, backlink);
    }
  }

  return Array.from(seen.values());
}

/**
 * Sanitize URL for storage
 */
export function sanitizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.href;
  } catch {
    return "";
  }
}

/**
 * Calculate average domain rating
 */
export function calculateAvgDR(backlinks: Array<{ domainRating?: number | null }>): number {
  const ratings = backlinks
    .map((bl) => bl.domainRating || 0)
    .filter((rating) => rating > 0);

  if (ratings.length === 0) return 0;

  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round(sum / ratings.length);
}
