import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fetch } from "undici";

// Input validation schema
const SerpSnapshotRequest = z.object({
  keyword: z.string().min(1).max(100),
  country: z.string().optional().default("us"),
});

// Response types
interface SerpResult {
  title: string;
  url: string;
  description: string;
  position: number;
}

interface SerpSnapshotResponse {
  keyword: string;
  country: string;
  results: SerpResult[];
  cached: boolean;
  timestamp: string;
}

// Simple in-memory cache (in production, use Redis)
const serpCache = new Map<string, { data: SerpSnapshotResponse; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// User agents for rotation
const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
];

// Country to Google domain mapping
const COUNTRY_DOMAINS: Record<string, string> = {
  us: "google.com",
  uk: "google.co.uk",
  ca: "google.ca",
  au: "google.com.au",
  de: "google.de",
  fr: "google.fr",
  es: "google.es",
  it: "google.it",
  nl: "google.nl",
  jp: "google.co.jp",
  br: "google.com.br",
  mx: "google.com.mx",
  in: "google.co.in",
};

/**
 * Extracts search results from Google HTML
 */
function extractSerpResults(html: string): SerpResult[] {
  const results: SerpResult[] = [];

  // Simple regex-based extraction (in production, use proper HTML parsing)
  const resultBlocks = html.match(/<div[^>]*class="[^"]*g[^"]*"[^>]*>.*?<\/div>/gs) || [];

  let position = 1;

  for (const block of resultBlocks) {
    if (position > 10) break; // Only top 10 results

    // Extract title
    const titleMatch = block.match(/<h3[^>]*>.*?<a[^>]*>([^<]+)<\/a>/);
    if (!titleMatch) continue;

    // Extract URL
    const urlMatch = block.match(/href="([^"]+)"/);
    if (!urlMatch) continue;

    // Extract description
    const descMatch = block.match(/<div[^>]*class="[^"]*VwiC3b[^"]*"[^>]*>([^<]+)/);

    const title = titleMatch[1].replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    const url = urlMatch[1];
    const description = descMatch
      ? descMatch[1].replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      : "";

    // Skip if it's not a regular organic result
    if (url.includes("google.com") || url.includes("youtube.com") || url.includes("maps.google")) {
      continue;
    }

    results.push({
      title,
      url,
      description,
      position,
    });

    position++;
  }

  return results;
}

/**
 * Fetches Google search results with polite scraping
 */
async function fetchGoogleSerp(keyword: string, country: string): Promise<SerpResult[]> {
  const domain = COUNTRY_DOMAINS[country] || "google.com";
  const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

  // Add random delay (1-3 seconds)
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

  const searchUrl = `https://www.${domain}/search?q=${encodeURIComponent(keyword)}&hl=en&num=10`;

  try {
    console.log(`Fetching SERP for "${keyword}" from ${domain}`);

    const response = await fetch(searchUrl, {
      headers: {
        "User-Agent": userAgent,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        DNT: "1",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Cache-Control": "max-age=0",
      },
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const results = extractSerpResults(html);

    console.log(`Extracted ${results.length} SERP results for "${keyword}"`);
    return results;
  } catch (error) {
    console.error(`SERP fetch error for "${keyword}":`, error);
    throw new Error(
      `Failed to fetch search results: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Generates cache key for keyword + country
 */
function getCacheKey(keyword: string, country: string): string {
  return `${keyword.toLowerCase().trim()}:${country.toLowerCase()}`;
}

/**
 * Checks if cached data is still valid
 */
function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_DURATION;
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { keyword, country } = SerpSnapshotRequest.parse(body);

    // Check cache first
    const cacheKey = getCacheKey(keyword, country);
    const cached = serpCache.get(cacheKey);

    if (cached && isCacheValid(cached.timestamp)) {
      console.log(`Returning cached SERP data for "${keyword}"`);
      return NextResponse.json({
        ...cached.data,
        cached: true,
        timestamp: new Date().toISOString(),
      });
    }

    // Fetch fresh data
    const results = await fetchGoogleSerp(keyword, country);

    const response: SerpSnapshotResponse = {
      keyword,
      country,
      results,
      cached: false,
      timestamp: new Date().toISOString(),
    };

    // Cache the results
    serpCache.set(cacheKey, {
      data: response,
      timestamp: Date.now(),
    });

    // Clean up old cache entries (keep only last 100)
    if (serpCache.size > 100) {
      const entries = Array.from(serpCache.entries());
      entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
      const toDelete = entries.slice(100);
      toDelete.forEach(([key]) => serpCache.delete(key));
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("SERP snapshot error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to fetch search results",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
