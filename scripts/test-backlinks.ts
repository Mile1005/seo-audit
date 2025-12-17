/**
 * Test script for backlink collection
 * Run with: npx tsx scripts/test-backlinks.ts
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

// Test domains - use well-known domains that definitely have backlinks
const TEST_DOMAINS = ["github.com", "vercel.com"];

async function testCommonCrawl(domain: string): Promise<void> {
  console.log(`\n🔍 Testing Common Crawl for: ${domain}`);
  console.log("=".repeat(50));

  // Common Crawl CDX API - search for pages LINKING to domain
  // The trick: we can't directly find backlinks via CC index
  // CC indexes pages BY their URL, not by outbound links
  // This is a fundamental limitation

  const indexes = [
    "CC-MAIN-2024-51", // December 2024
    "CC-MAIN-2024-46", // November 2024
    "CC-MAIN-2024-42", // October 2024
  ];

  for (const index of indexes) {
    // Try to query the index to see if it exists
    const testUrl = `https://index.commoncrawl.org/${index}-index?url=*.${domain}&output=json&limit=5`;
    console.log(`\nTrying index: ${index}`);
    console.log(`URL: ${testUrl}`);

    try {
      const response = await fetch(testUrl, {
        headers: {
          "User-Agent": "AISEOTurbo/1.0 (backlink-test)",
        },
        signal: AbortSignal.timeout(30000),
      });

      console.log(`Status: ${response.status} ${response.statusText}`);

      if (response.ok) {
        const text = await response.text();
        const lines = text.trim().split("\n").filter((l) => l.trim());
        console.log(`Found ${lines.length} records`);
        if (lines.length > 0) {
          console.log("First record:", lines[0].substring(0, 200) + "...");
        }
      } else {
        const errorText = await response.text();
        console.log("Error response:", errorText.substring(0, 500));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

async function testGoogleSearch(domain: string): Promise<void> {
  console.log(`\n🔍 Testing Google Custom Search for: ${domain}`);
  console.log("=".repeat(50));

  // Check both possible env var names
  const apiKey =
    process.env.GOOGLE_SEARCH_API_KEY || process.env.GOOGLE_CUSTOM_SEARCH_API_KEY;
  const cx =
    process.env.GOOGLE_SEARCH_ENGINE_ID || process.env.GOOGLE_CUSTOM_SEARCH_CX;

  console.log("API Key exists:", !!apiKey);
  console.log("Search Engine ID exists:", !!cx);

  if (!apiKey || !cx) {
    console.log("❌ Google Search API not configured");
    console.log("Expected env vars: GOOGLE_SEARCH_API_KEY, GOOGLE_SEARCH_ENGINE_ID");
    return;
  }

  // Search for pages mentioning the domain (backlink discovery)
  const query = `"${domain}" -site:${domain}`;
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}&num=10`;

  console.log(`Query: ${query}`);

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(15000),
    });

    console.log(`Status: ${response.status} ${response.statusText}`);

    const data = await response.json();

    if (data.error) {
      console.log("❌ API Error:", data.error.message);
      return;
    }

    const items = data.items || [];
    console.log(`✅ Found ${items.length} results`);

    for (const item of items.slice(0, 3)) {
      console.log(`  - ${item.title}`);
      console.log(`    ${item.link}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function testOpenPageRank(domains: string[]): Promise<void> {
  console.log(`\n🔍 Testing OpenPageRank for: ${domains.join(", ")}`);
  console.log("=".repeat(50));

  const apiKey = process.env.OPEN_PAGERANK_API_KEY;

  console.log("API Key exists:", !!apiKey);

  if (!apiKey) {
    console.log("❌ OpenPageRank API not configured");
    console.log("Expected env var: OPEN_PAGERANK_API_KEY");
    return;
  }

  const queryParams = domains.map((d) => `domains[]=${encodeURIComponent(d)}`).join("&");
  const url = `https://openpagerank.com/api/v1.0/getPageRank?${queryParams}`;

  try {
    const response = await fetch(url, {
      headers: {
        "API-OPR": apiKey,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(15000),
    });

    console.log(`Status: ${response.status} ${response.statusText}`);

    const data = await response.json();

    if (data.status_code === 200 && data.response) {
      console.log(`✅ Got metrics for ${data.response.length} domains`);
      for (const item of data.response) {
        console.log(
          `  - ${item.domain}: PageRank=${item.page_rank_decimal || 0}, Status=${item.status_code}`
        );
      }
    } else {
      console.log("❌ API Error:", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function testSerpApi(domain: string): Promise<void> {
  console.log(`\n🔍 Testing SerpAPI for: ${domain}`);
  console.log("=".repeat(50));

  const apiKey = process.env.SERPAPI_KEY;

  console.log("API Key exists:", !!apiKey);

  if (!apiKey) {
    console.log("❌ SerpAPI not configured");
    console.log("Expected env var: SERPAPI_KEY");
    return;
  }

  const query = `"${domain}" -site:${domain}`;
  const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&api_key=${apiKey}&num=10`;

  console.log(`Query: ${query}`);

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(15000),
    });

    console.log(`Status: ${response.status} ${response.statusText}`);

    const data = await response.json();

    if (data.error) {
      console.log("❌ API Error:", data.error);
      return;
    }

    const results = data.organic_results || [];
    console.log(`✅ Found ${results.length} results`);

    for (const item of results.slice(0, 3)) {
      console.log(`  - ${item.title}`);
      console.log(`    ${item.link}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function main() {
  console.log("🚀 BACKLINK API TEST SUITE");
  console.log("=".repeat(50));
  console.log("\nEnvironment Variables Check:");
  console.log("  OPEN_PAGERANK_API_KEY:", !!process.env.OPEN_PAGERANK_API_KEY);
  console.log("  GOOGLE_SEARCH_API_KEY:", !!process.env.GOOGLE_SEARCH_API_KEY);
  console.log("  GOOGLE_SEARCH_ENGINE_ID:", !!process.env.GOOGLE_SEARCH_ENGINE_ID);
  console.log("  SERPAPI_KEY:", !!process.env.SERPAPI_KEY);

  const testDomain = "github.com"; // Well-known domain with many backlinks

  // Test each API
  await testCommonCrawl(testDomain);
  await testGoogleSearch(testDomain);
  await testOpenPageRank(["github.com", "google.com", "microsoft.com"]);
  await testSerpApi(testDomain);

  console.log("\n" + "=".repeat(50));
  console.log("✅ TEST COMPLETE");
}

main().catch(console.error);
