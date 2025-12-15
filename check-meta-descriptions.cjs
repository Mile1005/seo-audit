#!/usr/bin/env node

const https = require("https");
const http = require("http");

/**
 * Script to check meta descriptions and titles for help pages across all locales
 * Usage: node check-meta-descriptions.cjs [baseUrl] [page]
 * Example: node check-meta-descriptions.cjs http://localhost:3000 pricing
 * Example: node check-meta-descriptions.cjs http://localhost:3000 seo-tools
 */

const baseUrl = process.argv[2] || "http://localhost:3000";
const pageArg = process.argv[3] || "both";
const locales = ["en", "it", "de", "fr", "es", "id"];

const pagePaths = {
  pricing: "/pricing",
  "seo-tools": "/help/seo-tools",
};

const pagesToCheck = pageArg === "both" ? ["pricing", "seo-tools"] : [pageArg];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https:") ? https : http;

    const req = client.get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

function extractMetaInfo(html, url) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const descriptionMatch = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );
  const ogTitleMatch = html.match(
    /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );
  const ogDescriptionMatch = html.match(
    /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);

  return {
    url,
    title: titleMatch ? titleMatch[1].trim() : null,
    description: descriptionMatch ? descriptionMatch[1].trim() : null,
    ogTitle: ogTitleMatch ? ogTitleMatch[1].trim() : null,
    ogDescription: ogDescriptionMatch ? ogDescriptionMatch[1].trim() : null,
    h1: h1Match ? h1Match[1].trim() : null,
  };
}

async function checkPage(locale) {
  const path = pagePaths[page];
  const url = locale === "en" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

  try {
    console.log(`\n🔍 Checking ${locale.toUpperCase()}: ${url}`);
    const html = await fetchPage(url);
    const meta = extractMetaInfo(html, url);

    console.log(`   📄 Title: ${meta.title || "NOT FOUND"}`);
    console.log(`   📝 Description: ${meta.description || "NOT FOUND"}`);
    console.log(`   📰 OG Title: ${meta.ogTitle || "NOT FOUND"}`);
    console.log(`   📰 OG Description: ${meta.ogDescription || "NOT FOUND"}`);
    console.log(`   🏷️  H1: ${meta.h1 || "NOT FOUND"}`);

    // Check H1 length (Google recommends 20-70 characters)
    if (meta.h1) {
      const h1Length = meta.h1.length;
      if (h1Length < 20) {
        console.log(
          `   ⚠️  WARNING: H1 is too short (${h1Length} chars). Google recommends 20-70 characters.`
        );
      } else if (h1Length > 70) {
        console.log(
          `   ⚠️  WARNING: H1 is too long (${h1Length} chars). Google recommends 20-70 characters.`
        );
      } else {
        console.log(`   ✅ H1 length is optimal (${h1Length} chars)`);
      }
    }

    // Check for hardcoded English
    const hasEnglishWords = (text) => {
      if (!text) return false;
      const englishIndicators =
        page === "pricing"
          ? ["Choose the perfect", "SEO audit", "pricing plans", "SEO tools"]
          : ["Explore our comprehensive", "SEO tools", "search rankings", "competitor analysis"];
      return englishIndicators.some((indicator) =>
        text.toLowerCase().includes(indicator.toLowerCase())
      );
    };

    if (meta.description && hasEnglishWords(meta.description) && locale !== "en") {
      console.log(`   ⚠️  WARNING: Description contains English text in ${locale} locale!`);
    }

    return meta;
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
    return { url, error: error.message };
  }
}

async function main() {
  console.log("🚀 Meta Description & SEO Checker");
  console.log("=".repeat(50));
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Page: ${page}`);
  console.log(`Locales: ${locales.join(", ")}`);
  console.log("=".repeat(50));

  const results = [];

  for (const locale of locales) {
    const result = await checkPage(locale);
    results.push(result);

    // Add small delay to avoid overwhelming the server
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log("\n" + "=".repeat(50));
  console.log("📊 SUMMARY");

  const successful = results.filter((r) => !r.error);
  const failed = results.filter((r) => r.error);

  console.log(`✅ Successful checks: ${successful.length}`);
  console.log(`❌ Failed checks: ${failed.length}`);

  if (failed.length > 0) {
    console.log("\nFailed URLs:");
    failed.forEach((f) => console.log(`   - ${f.url}: ${f.error}`));
  }

  // Check for translation consistency
  const descriptions = successful.map((r) => r.description).filter((d) => d);
  const uniqueDescriptions = [...new Set(descriptions)];

  if (uniqueDescriptions.length > 1) {
    console.log("\n✅ Translations detected: Different descriptions found across locales");
  } else if (uniqueDescriptions.length === 1) {
    console.log(
      "\n⚠️  WARNING: All descriptions are identical - may indicate missing translations"
    );
  }

  // Check H1 optimization
  const h1Lengths = successful.map((r) => (r.h1 ? r.h1.length : 0)).filter((l) => l > 0);
  const avgH1Length = h1Lengths.reduce((a, b) => a + b, 0) / h1Lengths.length;
  console.log(`\n📏 Average H1 length: ${avgH1Length.toFixed(1)} characters`);

  console.log("\n🎯 Done!");
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkPage, extractMetaInfo };

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https:") ? https : http;

    const req = client.get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

function extractMetaInfo(html, url) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const descriptionMatch = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );
  const ogTitleMatch = html.match(
    /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );
  const ogDescriptionMatch = html.match(
    /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i
  );

  return {
    url,
    title: titleMatch ? titleMatch[1].trim() : null,
    description: descriptionMatch ? descriptionMatch[1].trim() : null,
    ogTitle: ogTitleMatch ? ogTitleMatch[1].trim() : null,
    ogDescription: ogDescriptionMatch ? ogDescriptionMatch[1].trim() : null,
  };
}

async function checkPage(locale, pageType) {
  const path = pagePaths[pageType];
  const url = locale === "en" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

  try {
    console.log(`\n🔍 Checking ${pageType.toUpperCase()} - ${locale.toUpperCase()}: ${url}`);
    const html = await fetchPage(url);
    const meta = extractMetaInfo(html, url);

    console.log(`   📄 Title: ${meta.title || "NOT FOUND"}`);
    console.log(`   📝 Description: ${meta.description || "NOT FOUND"}`);
    console.log(`   📰 OG Title: ${meta.ogTitle || "NOT FOUND"}`);
    console.log(`   📰 OG Description: ${meta.ogDescription || "NOT FOUND"}`);

    // Check for hardcoded English based on page type
    const hasEnglishWords = (text, pageType) => {
      if (!text) return false;
      const indicators = {
        pricing: ["Choose the perfect", "SEO audit", "pricing plans", "SEO tools"],
        "seo-tools": [
          "Explore our comprehensive",
          "SEO tools",
          "boost your search",
          "competitor analysis",
        ],
      };
      const englishIndicators = indicators[pageType] || [];
      return englishIndicators.some((indicator) =>
        text.toLowerCase().includes(indicator.toLowerCase())
      );
    };

    if (meta.description && hasEnglishWords(meta.description, pageType) && locale !== "en") {
      console.log(`   ⚠️  WARNING: Description contains English text in ${locale} locale!`);
    }

    return { ...meta, pageType };
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
    return { url, error: error.message, pageType };
  }
}

async function main() {
  console.log("🚀 Meta Description Checker for Multiple Pages");
  console.log("=".repeat(50));
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Pages: ${pagesToCheck.join(", ")}`);
  console.log(`Locales: ${locales.join(", ")}`);
  console.log("=".repeat(50));

  const results = [];

  for (const pageType of pagesToCheck) {
    console.log(`\n📄 Checking page: ${pageType.toUpperCase()}`);
    console.log("─".repeat(30));

    for (const locale of locales) {
      const result = await checkPage(locale, pageType);
      results.push(result);

      // Add small delay to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("📊 SUMMARY");

  // Group results by page type
  const resultsByPage = {};
  pagesToCheck.forEach((pageType) => {
    resultsByPage[pageType] = results.filter((r) => r.pageType === pageType);
  });

  let totalSuccessful = 0;
  let totalFailed = 0;

  for (const pageType of pagesToCheck) {
    const pageResults = resultsByPage[pageType];
    const successful = pageResults.filter((r) => !r.error);
    const failed = pageResults.filter((r) => r.error);

    console.log(`\n📄 ${pageType.toUpperCase()}:`);
    console.log(`   ✅ Successful: ${successful.length}`);
    console.log(`   ❌ Failed: ${failed.length}`);

    totalSuccessful += successful.length;
    totalFailed += failed.length;

    if (failed.length > 0) {
      console.log("   Failed URLs:");
      failed.forEach((f) => console.log(`     - ${f.url}: ${f.error}`));
    }

    // Check for translation consistency per page
    const descriptions = successful.map((r) => r.description).filter((d) => d);
    const uniqueDescriptions = [...new Set(descriptions)];

    if (uniqueDescriptions.length > 1) {
      console.log("   ✅ Translations detected: Different descriptions found across locales");
    } else if (uniqueDescriptions.length === 1) {
      console.log(
        "   ⚠️  WARNING: All descriptions are identical - may indicate missing translations"
      );
    }
  }

  console.log(`\n📈 OVERALL:`);
  console.log(`   ✅ Total successful: ${totalSuccessful}`);
  console.log(`   ❌ Total failed: ${totalFailed}`);

  console.log("\n🎯 Done!");
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkPage, extractMetaInfo };
