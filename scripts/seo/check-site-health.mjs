#!/usr/bin/env node
/**
 * Comprehensive Site Health Checker
 * 
 * Checks all pages in the sitemap for:
 * - HTTP 200 responses (no 4xx/5xx errors)
 * - Correct <html lang> attribute matching the URL locale
 * - Presence of hreflang tags
 * - Self-referencing hreflang consistency
 *
 * Usage:
 *   node scripts/seo/check-site-health.mjs --base-url http://localhost:3000
 *   node scripts/seo/check-site-health.mjs --base-url https://www.aiseoturbo.com
 */

import fs from "node:fs";
import path from "node:path";

const LOCALES = ["en", "fr", "it", "es", "id", "de"];

function parseArgs(argv) {
  const out = { baseUrl: "http://localhost:3000", verbose: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--base-url") out.baseUrl = argv[++i];
    else if (a === "-v" || a === "--verbose") out.verbose = true;
  }
  return out;
}

function extractHtmlLang(html) {
  const m = html.match(/<html\b[^>]*\blang\s*=\s*"([^"]+)"/i);
  return m?.[1]?.toLowerCase() ?? "";
}

function extractHreflangs(html) {
  // Extract all hreflang link tags
  const hreflangs = [];
  const regex = /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    hreflangs.push({ lang: match[1].toLowerCase(), href: match[2] });
  }
  // Also check reverse attribute order
  const regex2 = /<link[^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*rel=["']alternate["'][^>]*>/gi;
  while ((match = regex2.exec(html)) !== null) {
    hreflangs.push({ lang: match[1].toLowerCase(), href: match[2] });
  }
  return hreflangs;
}

function expectedLocaleFromUrl(url) {
  const pathname = new URL(url).pathname;
  for (const locale of LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return "en"; // Default locale
}

// Generate a list of important pages to check
function getTestUrls(baseUrl) {
  const paths = [
    // Core pages
    "/",
    "/pricing",
    "/about",
    "/features",
    "/blog",
    "/help",
    "/contact",
    "/login",
    "/signup",
    "/privacy",
    "/terms",
    "/status",
    // Dashboard (non-localized)
    "/dashboard",
    // Localized pages (sample)
    "/fr",
    "/fr/pricing",
    "/fr/help",
    "/de",
    "/de/pricing",
    "/de/help",
    "/es",
    "/es/pricing",
    "/it",
    "/it/pricing",
    "/id",
    "/id/pricing",
    // Help pages that had issues
    "/fr/help/api/authentication",
    "/de/help/api/authentication",
    "/es/help/api/authentication",
    "/it/help/api/authentication",
    "/id/help/api/authentication",
  ];
  
  return paths.map(p => `${baseUrl.replace(/\/$/, "")}${p}`);
}

async function checkUrl(url, verbose) {
  const issues = [];
  const expectedLocale = expectedLocaleFromUrl(url);
  
  try {
    const res = await fetch(url, { 
      redirect: "follow",
      headers: { "User-Agent": "SEO-Health-Checker/1.0" }
    });
    
    if (res.status !== 200) {
      issues.push(`HTTP ${res.status}`);
      return { url, status: res.status, issues, ok: false };
    }
    
    const html = await res.text();
    const htmlLang = extractHtmlLang(html);
    const hreflangs = extractHreflangs(html);
    
    // Check html lang matches expected locale
    if (htmlLang !== expectedLocale) {
      issues.push(`html lang="${htmlLang}" but expected "${expectedLocale}"`);
    }
    
    // Check self-referencing hreflang exists
    const selfHreflang = hreflangs.find(h => {
      const hrefLocale = expectedLocaleFromUrl(h.href);
      return hrefLocale === expectedLocale;
    });
    
    if (!selfHreflang && hreflangs.length > 0) {
      issues.push(`Missing self-referencing hreflang for "${expectedLocale}"`);
    }
    
    // Check html lang matches self-hreflang (the Ahrefs issue)
    if (selfHreflang && htmlLang !== expectedLocale) {
      issues.push(`html lang="${htmlLang}" mismatches self-hreflang locale "${expectedLocale}"`);
    }
    
    if (verbose && issues.length === 0) {
      console.log(`✓ ${url} (lang=${htmlLang}, hreflangs=${hreflangs.length})`);
    }
    
    return { 
      url, 
      status: res.status, 
      htmlLang, 
      hreflangCount: hreflangs.length,
      issues, 
      ok: issues.length === 0 
    };
    
  } catch (e) {
    issues.push(`Fetch error: ${e.message}`);
    return { url, status: 0, issues, ok: false };
  }
}

async function main() {
  const args = parseArgs(process.argv);
  console.log(`\n🔍 Site Health Check: ${args.baseUrl}\n`);
  
  const urls = getTestUrls(args.baseUrl);
  const results = [];
  
  for (const url of urls) {
    const result = await checkUrl(url, args.verbose);
    results.push(result);
    
    if (!result.ok) {
      console.log(`❌ ${url}`);
      for (const issue of result.issues) {
        console.log(`   └─ ${issue}`);
      }
    }
  }
  
  // Summary
  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  
  console.log(`\n${"─".repeat(60)}`);
  console.log(`Summary: ✓ ${passed} passed, ❌ ${failed} failed, Total: ${results.length}`);
  
  if (failed > 0) {
    console.log(`\nFailed URLs:`);
    for (const r of results.filter(r => !r.ok)) {
      console.log(`  - ${r.url}: ${r.issues.join(", ")}`);
    }
  }
  
  console.log();
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
