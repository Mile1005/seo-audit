/**
 * Integration test for the backlink discovery function
 * Run with: npx tsx scripts/test-discovery.ts
 */

// Load env vars BEFORE importing modules
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(rootDir, ".env.local") });
dotenv.config({ path: path.join(rootDir, ".env") });

console.log("Loaded SERPAPI_KEY:", !!process.env.SERPAPI_KEY);

// NOW import the modules (they'll see the env vars)
const { discoverBacklinks } = await import("../lib/backlinks/discovery");
const { enrichWithMetrics } = await import("../lib/backlinks/enrichment");

async function main() {
  console.log("🚀 BACKLINK DISCOVERY INTEGRATION TEST");
  console.log("=".repeat(50));
  console.log("\nEnvironment Variables:");
  console.log("  SERPAPI_KEY:", !!process.env.SERPAPI_KEY);
  console.log("  GOOGLE_SEARCH_API_KEY:", !!process.env.GOOGLE_SEARCH_API_KEY);
  console.log("  OPEN_PAGERANK_API_KEY:", !!process.env.OPEN_PAGERANK_API_KEY);

  // Test with a domain that should have backlinks
  const testDomain = "github.com";

  console.log(`\n🔍 Testing discoverBacklinks("${testDomain}")`);
  console.log("=".repeat(50));

  try {
    const backlinks = await discoverBacklinks(testDomain, {
      maxResults: 20,
      useSerpApi: true,
      useGoogle: true,
    });

    console.log(`\n✅ Found ${backlinks.length} backlinks:`);

    for (const bl of backlinks.slice(0, 5)) {
      console.log(`\n  Source: ${bl.sourceUrl}`);
      console.log(`  Domain: ${bl.sourceDomain}`);
      console.log(`  Title: ${bl.title || "(no title)"}`);
    }

    if (backlinks.length > 5) {
      console.log(`\n  ... and ${backlinks.length - 5} more`);
    }

    // Test enrichment if we have backlinks
    if (backlinks.length > 0 && process.env.OPEN_PAGERANK_API_KEY) {
      console.log("\n\n🔍 Testing enrichWithMetrics()");
      console.log("=".repeat(50));

      const enriched = await enrichWithMetrics(backlinks);

      console.log(`\n✅ Enriched ${enriched.length} backlinks:`);

      for (const bl of enriched.slice(0, 5)) {
        console.log(`\n  Domain: ${bl.sourceDomain}`);
        console.log(`  Domain Rating: ${bl.domainRating}`);
        console.log(`  Anchor Text: ${bl.anchorText?.substring(0, 50) || "(none)"}`);
      }
    } else if (!process.env.OPEN_PAGERANK_API_KEY) {
      console.log("\n⚠️ Skipping enrichment test - OPEN_PAGERANK_API_KEY not set locally");
    }
  } catch (error) {
    console.error("\n❌ Error:", error);
  }

  console.log("\n" + "=".repeat(50));
  console.log("✅ TEST COMPLETE");
}

main().catch(console.error);
