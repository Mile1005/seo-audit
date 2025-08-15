import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fetch } from "undici";
import { chromium } from "playwright";
import * as cheerio from "cheerio";

// Input validation schema
const SerpSnapshotRequest = z.object({
  keyword: z.union([z.string(), z.array(z.string())]),
  country: z.union([z.string(), z.array(z.string())]),
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
  ads?: any[];
  featured_snippet?: any;
  people_also_ask?: any[];
  related_searches?: any[];
  local_results?: any;
  knowledge_graph?: any;
  sitelinks?: any[];
  cached: boolean;
  timestamp: string;
  usedFallback?: boolean;
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

async function fetchGoogleSerpPlaywright(keyword: string, country: string): Promise<SerpResult[]> {
  const domain = COUNTRY_DOMAINS[country] || "google.com";
  const searchUrl = `https://www.${domain}/search?q=${encodeURIComponent(keyword)}&hl=en&num=10`;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    userAgent: USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
  });
  try {
    await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2000 + Math.random() * 2000); // Wait for results to load
    const html = await page.content();
    await browser.close();
    return extractSerpResultsCheerio(html);
  } catch (err) {
    await browser.close();
    throw err;
  }
}

function extractSerpResultsCheerio(html: string): SerpResult[] {
  const $ = cheerio.load(html);
  const results: SerpResult[] = [];
  let position = 1;
  $("div.g").each((_, el) => {
    if (position > 10) return false;
    const title = $(el).find("h3").text().trim();
    const url = $(el).find("a").attr("href") || "";
    const description = $(el).find(".VwiC3b").text().trim();
    if (!title || !url || url.includes("google.com") || url.includes("youtube.com") || url.includes("maps.google")) return;
    results.push({ title, url, description, position });
    position++;
  });
  return results;
}

async function fetchSerpApiFallback(keyword: string, country: string, isBatch = false): Promise<any> {
  // Example: SerpAPI (https://serpapi.com/) - requires API key
  const SERPAPI_KEY = process.env.SERPAPI_KEY;
  if (!SERPAPI_KEY) throw new Error("No SERPAPI_KEY set in environment");
  const domain = COUNTRY_DOMAINS[country] || "google.com";
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(keyword)}&google_domain=${domain}&hl=en&num=10&api_key=${SERPAPI_KEY}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error("SerpAPI error: " + resp.statusText);
  const data = await resp.json();
  // Type assertion for SerpAPI response
  const organicResults = (data as any).organic_results;
  if (!organicResults) throw new Error("No results from SerpAPI");
  return { organic_results: organicResults.slice(0, 10).map((r: any, i: number) => ({
    title: r.title,
    url: r.link,
    description: r.snippet || "",
    position: i + 1,
  })), ads: (data as any).ads || [], featured_snippet: (data as any).featured_snippet || null, people_also_ask: (data as any).people_also_ask || [], related_searches: (data as any).related_searches || [], local_results: (data as any).local_results || null, knowledge_graph: (data as any).knowledge_graph || null, sitelinks: (data as any).sitelinks || [] };
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

const MAX_KEYWORDS = 5;
const MAX_COUNTRIES = 2;

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    let { keyword, country } = SerpSnapshotRequest.parse(body);
    // Support batch: keyword and country can be arrays
    const keywords = Array.isArray(keyword) ? keyword : keyword.split(/[,\n]+/).map((k: string) => k.trim()).filter(Boolean);
    const countries = Array.isArray(country) ? country : [country];
    if (keywords.length > MAX_KEYWORDS) {
      return NextResponse.json({ error: `Max ${MAX_KEYWORDS} keywords allowed per analysis.` }, { status: 400 });
    }
    if (countries.length > MAX_COUNTRIES) {
      return NextResponse.json({ error: `Max ${MAX_COUNTRIES} countries allowed per analysis.` }, { status: 400 });
    }
    // Track usage
    let usage = 0;
    const results: Record<string, any> = {};
    for (const kw of keywords) {
      for (const c of countries) {
        const cacheKey = getCacheKey(kw, c);
        const cached = serpCache.get(cacheKey);
        if (cached && isCacheValid(cached.timestamp)) {
          results[`${kw}:${c}`] = { ...cached.data, cached: true, timestamp: new Date().toISOString() };
        } else {
          let serpData: any = {};
          let usedFallback = false;
          const isServerless = !!process.env.VERCEL || !!process.env.NEXT_PUBLIC_DISABLE_PLAYWRIGHT;
          if (isServerless) {
            try {
              serpData = await fetchSerpApiFallback(kw, c, true);
              usedFallback = true;
            } catch (apiErr) {
              results[`${kw}:${c}`] = { error: "SerpAPI failed", details: apiErr instanceof Error ? apiErr.message : apiErr };
              continue;
            }
          } else {
            try {
              serpData = await fetchGoogleSerpPlaywright(kw, c);
            } catch (err) {
              try {
                serpData = await fetchSerpApiFallback(kw, c, true);
                usedFallback = true;
              } catch (apiErr) {
                results[`${kw}:${c}`] = { error: "Both Playwright and SerpAPI failed", details: apiErr instanceof Error ? apiErr.message : apiErr };
                continue;
              }
            }
          }
          const response: SerpSnapshotResponse = {
            keyword: kw,
            country: c,
            results: serpData.organic_results || [],
            ads: serpData.ads || [],
            featured_snippet: serpData.featured_snippet || null,
            people_also_ask: serpData.people_also_ask || [],
            related_searches: serpData.related_searches || [],
            local_results: serpData.local_results || null,
            knowledge_graph: serpData.knowledge_graph || null,
            sitelinks: serpData.sitelinks || [],
            cached: false,
            timestamp: new Date().toISOString(),
            usedFallback,
          };
          serpCache.set(cacheKey, { data: response, timestamp: Date.now() });
          results[`${kw}:${c}`] = response;
          usage++;
        }
      }
    }
    return NextResponse.json({ results, usage, keywords: keywords.length, countries: countries.length, maxKeywords: MAX_KEYWORDS, maxCountries: MAX_COUNTRIES });
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
