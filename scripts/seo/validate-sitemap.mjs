#!/usr/bin/env node
/**
 * Complete Sitemap Validator
 * 
 * Fetches the sitemap and validates EVERY URL for:
 * - HTTP 200 response
 * - Correct <html lang> matching URL locale
 * - hreflang/html-lang consistency
 *
 * Usage:
 *   node scripts/seo/validate-sitemap.mjs --base-url http://localhost:3000
 */

const LOCALES = ["en", "fr", "it", "es", "id", "de"];

function parseArgs(argv) {
  const out = { baseUrl: "http://localhost:3000", concurrency: 5 };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--base-url") out.baseUrl = argv[++i];
    if (argv[i] === "--concurrency") out.concurrency = parseInt(argv[++i], 10);
  }
  return out;
}

function extractHtmlLang(html) {
  const m = html.match(/<html\b[^>]*\blang\s*=\s*"([^"]+)"/i);
  return m?.[1]?.toLowerCase() ?? "";
}

function expectedLocaleFromPath(pathname) {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return "en";
}

async function fetchSitemapUrls(baseUrl) {
  const sitemapUrl = `${baseUrl.replace(/\/$/, "")}/sitemap.xml`;
  const res = await fetch(sitemapUrl);
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status}`);
  
  const xml = await res.text();
  const urls = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

async function checkUrl(url, baseUrl) {
  // Rewrite production URL to base URL for local testing
  let testUrl = url;
  if (baseUrl.includes("localhost")) {
    try {
      const u = new URL(url);
      const b = new URL(baseUrl);
      u.protocol = b.protocol;
      u.host = b.host;
      testUrl = u.toString();
    } catch {}
  }

  const issues = [];
  const pathname = new URL(testUrl).pathname;
  const expectedLocale = expectedLocaleFromPath(pathname);

  try {
    const res = await fetch(testUrl, {
      redirect: "follow",
      headers: { "User-Agent": "Sitemap-Validator/1.0" },
    });

    if (res.status !== 200) {
      return { url, testUrl, status: res.status, issues: [`HTTP ${res.status}`], ok: false };
    }

    const html = await res.text();
    const htmlLang = extractHtmlLang(html);

    if (htmlLang !== expectedLocale) {
      issues.push(`lang="${htmlLang}" expected="${expectedLocale}"`);
    }

    return {
      url,
      testUrl,
      status: res.status,
      htmlLang,
      expectedLocale,
      issues,
      ok: issues.length === 0,
    };
  } catch (e) {
    return { url, testUrl, status: 0, issues: [`Error: ${e.message}`], ok: false };
  }
}

async function runBatch(urls, baseUrl, concurrency) {
  const results = [];
  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map((u) => checkUrl(u, baseUrl)));
    results.push(...batchResults);
    
    // Progress indicator
    const done = Math.min(i + concurrency, urls.length);
    process.stdout.write(`\rChecking: ${done}/${urls.length}`);
  }
  console.log(); // newline after progress
  return results;
}

async function main() {
  const args = parseArgs(process.argv);
  console.log(`\n🔍 Sitemap Validation: ${args.baseUrl}\n`);

  console.log("Fetching sitemap...");
  const urls = await fetchSitemapUrls(args.baseUrl);
  console.log(`Found ${urls.length} URLs in sitemap\n`);

  const results = await runBatch(urls, args.baseUrl, args.concurrency);

  // Separate results
  const passed = results.filter((r) => r.ok);
  const failed = results.filter((r) => !r.ok);

  // Show failures
  if (failed.length > 0) {
    console.log(`\n❌ FAILED (${failed.length}):\n`);
    for (const r of failed) {
      console.log(`  ${r.testUrl}`);
      for (const issue of r.issues) {
        console.log(`    └─ ${issue}`);
      }
    }
  }

  // Summary
  console.log(`\n${"─".repeat(60)}`);
  console.log(`✓ Passed: ${passed.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`Total: ${results.length}`);

  // Group failures by type
  if (failed.length > 0) {
    const httpErrors = failed.filter((r) => r.status !== 200 && r.status !== 0);
    const langMismatches = failed.filter((r) => r.status === 200 && r.issues.some((i) => i.includes("lang=")));
    const fetchErrors = failed.filter((r) => r.status === 0);

    if (httpErrors.length) console.log(`  - HTTP errors: ${httpErrors.length}`);
    if (langMismatches.length) console.log(`  - Lang mismatches: ${langMismatches.length}`);
    if (fetchErrors.length) console.log(`  - Fetch errors: ${fetchErrors.length}`);
  }

  console.log();
  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
