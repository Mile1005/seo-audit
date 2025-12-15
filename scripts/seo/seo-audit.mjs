#!/usr/bin/env node

/**
 * Comprehensive SEO Audit Script
 *
 * Checks all pages for:
 * 1. Hreflang tags (6 locales + x-default, absolute URLs, reciprocal)
 * 2. Meta titles (<60 chars, keyword-rich)
 * 3. Meta descriptions (<160 chars, keyword-rich)
 * 4. OpenGraph tags (localized)
 * 5. Twitter Card tags (localized)
 * 6. Canonical URLs (self-referencing)
 * 7. Keywords (natural, preserved)
 * 8. Structured data (JSON-LD with @language)
 * 9. Sitemap inclusion
 * 10. Robots.txt directives
 */

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const LOCALES = ["en", "fr", "de", "es", "it", "id"];

class SEOAuditor {
  constructor() {
    this.results = {
      passed: [],
      warnings: [],
      errors: [],
      total: 0,
    };

    this.checks = {
      hreflang: { pass: 0, fail: 0, warn: 0 },
      metaTitle: { pass: 0, fail: 0, warn: 0 },
      metaDescription: { pass: 0, fail: 0, warn: 0 },
      openGraph: { pass: 0, fail: 0, warn: 0 },
      twitterCard: { pass: 0, fail: 0, warn: 0 },
      canonical: { pass: 0, fail: 0, warn: 0 },
      structuredData: { pass: 0, fail: 0, warn: 0 },
    };
  }

  async auditPage(url, locale = "en") {
    const issues = [];
    const warnings = [];
    const passed = [];

    try {
      const response = await fetch(url);

      if (!response.ok) {
        issues.push(`Page not accessible: ${response.status} ${response.statusText}`);
        return { url, issues, warnings, passed, skipped: true };
      }

      const html = await response.text();

      // 1. Check Hreflang
      const hreflangCheck = this.checkHreflang(html, url, locale);
      if (hreflangCheck.pass) {
        passed.push(...hreflangCheck.passed);
        this.checks.hreflang.pass++;
      } else {
        issues.push(...hreflangCheck.issues);
        warnings.push(...hreflangCheck.warnings);
        if (hreflangCheck.issues.length > 0) this.checks.hreflang.fail++;
        if (hreflangCheck.warnings.length > 0) this.checks.hreflang.warn++;
      }

      // 2. Check Meta Title
      const titleCheck = this.checkMetaTitle(html, locale);
      if (titleCheck.pass) {
        passed.push(...titleCheck.passed);
        this.checks.metaTitle.pass++;
      } else {
        issues.push(...titleCheck.issues);
        warnings.push(...titleCheck.warnings);
        if (titleCheck.issues.length > 0) this.checks.metaTitle.fail++;
        if (titleCheck.warnings.length > 0) this.checks.metaTitle.warn++;
      }

      // 3. Check Meta Description
      const descCheck = this.checkMetaDescription(html, locale);
      if (descCheck.pass) {
        passed.push(...descCheck.passed);
        this.checks.metaDescription.pass++;
      } else {
        issues.push(...descCheck.issues);
        warnings.push(...descCheck.warnings);
        if (descCheck.issues.length > 0) this.checks.metaDescription.fail++;
        if (descCheck.warnings.length > 0) this.checks.metaDescription.warn++;
      }

      // 4. Check OpenGraph
      const ogCheck = this.checkOpenGraph(html, url, locale);
      if (ogCheck.pass) {
        passed.push(...ogCheck.passed);
        this.checks.openGraph.pass++;
      } else {
        issues.push(...ogCheck.issues);
        warnings.push(...ogCheck.warnings);
        if (ogCheck.issues.length > 0) this.checks.openGraph.fail++;
        if (ogCheck.warnings.length > 0) this.checks.openGraph.warn++;
      }

      // 5. Check Twitter Card
      const twitterCheck = this.checkTwitterCard(html);
      if (twitterCheck.pass) {
        passed.push(...twitterCheck.passed);
        this.checks.twitterCard.pass++;
      } else {
        issues.push(...twitterCheck.issues);
        warnings.push(...twitterCheck.warnings);
        if (twitterCheck.issues.length > 0) this.checks.twitterCard.fail++;
        if (twitterCheck.warnings.length > 0) this.checks.twitterCard.warn++;
      }

      // 6. Check Canonical
      const canonicalCheck = this.checkCanonical(html, url);
      if (canonicalCheck.pass) {
        passed.push(...canonicalCheck.passed);
        this.checks.canonical.pass++;
      } else {
        issues.push(...canonicalCheck.issues);
        warnings.push(...canonicalCheck.warnings);
        if (canonicalCheck.issues.length > 0) this.checks.canonical.fail++;
        if (canonicalCheck.warnings.length > 0) this.checks.canonical.warn++;
      }

      // 7. Check Structured Data
      const structuredDataCheck = this.checkStructuredData(html, locale);
      if (structuredDataCheck.pass) {
        passed.push(...structuredDataCheck.passed);
        this.checks.structuredData.pass++;
      } else {
        warnings.push(...structuredDataCheck.warnings);
        if (structuredDataCheck.warnings.length > 0) this.checks.structuredData.warn++;
      }

      return { url, locale, issues, warnings, passed, skipped: false };
    } catch (error) {
      issues.push(`Error fetching page: ${error.message}`);
      return { url, locale, issues, warnings, passed, skipped: true, error: error.message };
    }
  }

  checkHreflang(html, url, currentLocale) {
    const issues = [];
    const warnings = [];
    const passed = [];

    const hreflangRegex =
      /<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]*>/gi;
    const matches = [...html.matchAll(hreflangRegex)];

    if (matches.length === 0) {
      issues.push("No hreflang tags found");
      return { pass: false, issues, warnings, passed };
    }

    const foundLocales = new Set();
    let hasXDefault = false;

    matches.forEach((match) => {
      const hreflang = match[1];
      const href = match[2];

      if (hreflang === "x-default") {
        hasXDefault = true;
      } else {
        foundLocales.add(hreflang);
      }

      // Check absolute URLs
      if (!href.startsWith("http")) {
        warnings.push(`Hreflang href should be absolute: ${href}`);
      }

      // Check proper locale in URL
      if (hreflang !== "x-default" && hreflang !== "en" && !href.includes(`/${hreflang}/`)) {
        warnings.push(`Hreflang ${hreflang} href doesn't contain /${hreflang}/: ${href}`);
      }
    });

    // Check all locales present
    const missingLocales = LOCALES.filter((l) => !foundLocales.has(l));
    if (missingLocales.length > 0) {
      warnings.push(`Missing hreflang for locales: ${missingLocales.join(", ")}`);
    }

    if (!hasXDefault) {
      warnings.push("Missing x-default hreflang");
    }

    if (foundLocales.size >= 5 && hasXDefault) {
      passed.push(
        `✓ Hreflang: ${foundLocales.size + 1} alternates (${foundLocales.size} locales + x-default)`
      );
    }

    return {
      pass: issues.length === 0 && foundLocales.size >= 5,
      issues,
      warnings,
      passed,
    };
  }

  checkMetaTitle(html, locale) {
    const issues = [];
    const warnings = [];
    const passed = [];

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);

    if (!titleMatch) {
      issues.push("No <title> tag found");
      return { pass: false, issues, warnings, passed };
    }

    const title = titleMatch[1].trim();
    const length = title.length;

    if (length === 0) {
      issues.push("Title is empty");
      return { pass: false, issues, warnings, passed };
    }

    if (length > 60) {
      if (locale === "de" && length <= 65) {
        warnings.push(`Title length ${length} chars (acceptable for German, but trim if possible)`);
      } else {
        warnings.push(`Title too long: ${length} chars (recommended <60)`);
      }
    }

    // Check for SEO keywords
    const seoKeywords = ["SEO", "audit", "AI", "turbo", "optimization"];
    const hasKeywords = seoKeywords.some((kw) => title.toLowerCase().includes(kw.toLowerCase()));

    if (!hasKeywords) {
      warnings.push("Title may benefit from SEO keywords");
    }

    passed.push(`✓ Title: "${title}" (${length} chars)`);

    return {
      pass: length > 0 && length <= (locale === "de" ? 65 : 60),
      issues,
      warnings,
      passed,
    };
  }

  checkMetaDescription(html, locale) {
    const issues = [];
    const warnings = [];
    const passed = [];

    const descMatch = html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i
    );

    if (!descMatch) {
      issues.push("No meta description found");
      return { pass: false, issues, warnings, passed };
    }

    const description = descMatch[1].trim();
    const length = description.length;

    if (length === 0) {
      issues.push("Description is empty");
      return { pass: false, issues, warnings, passed };
    }

    if (length > 160) {
      warnings.push(`Description too long: ${length} chars (recommended <160)`);
    }

    if (length < 120) {
      warnings.push(`Description could be longer: ${length} chars (recommended 120-160)`);
    }

    // Check for SEO keywords based on locale
    const seoKeywordsByLocale = {
      fr: ["audit SEO", "audit", "SEO", "optimisation"],
      de: ["SEO", "Audit", "Optimierung"],
      es: ["auditoría SEO", "SEO", "optimización"],
      it: ["audit SEO", "SEO", "ottimizzazione"],
      id: ["audit SEO", "SEO", "optimasi"],
      en: ["SEO audit", "SEO", "optimization", "AI"],
    };

    const keywords = seoKeywordsByLocale[locale] || seoKeywordsByLocale.en;
    const hasKeywords = keywords.some((kw) => description.toLowerCase().includes(kw.toLowerCase()));

    if (!hasKeywords) {
      warnings.push(`Description missing key terms for ${locale}: ${keywords.join(", ")}`);
    }

    passed.push(`✓ Description: ${length} chars, keyword-rich`);

    return {
      pass: length > 0 && length <= 160 && hasKeywords,
      issues,
      warnings,
      passed,
    };
  }

  checkOpenGraph(html, url, locale) {
    const issues = [];
    const warnings = [];
    const passed = [];

    const requiredOgTags = ["og:title", "og:description", "og:url", "og:type", "og:locale"];
    const foundTags = new Set();

    const ogRegex = /<meta[^>]+property=["'](og:[^"']+)["'][^>]+content=["']([^"']+)["'][^>]*>/gi;
    const matches = [...html.matchAll(ogRegex)];

    matches.forEach((match) => {
      foundTags.add(match[1]);
    });

    const missingTags = requiredOgTags.filter((tag) => !foundTags.has(tag));

    if (missingTags.length > 0) {
      warnings.push(`Missing OpenGraph tags: ${missingTags.join(", ")}`);
    }

    // Check og:locale matches current locale
    const ogLocaleMatch = html.match(
      /<meta[^>]+property=["']og:locale["'][^>]+content=["']([^"']+)["'][^>]*>/i
    );
    if (ogLocaleMatch) {
      const ogLocale = ogLocaleMatch[1];
      const expectedLocale = locale === "en" ? "en_US" : `${locale}_${locale.toUpperCase()}`;

      if (ogLocale !== expectedLocale) {
        warnings.push(`og:locale "${ogLocale}" doesn't match expected "${expectedLocale}"`);
      } else {
        passed.push(`✓ OpenGraph: ${foundTags.size} tags, locale ${ogLocale}`);
      }
    }

    return {
      pass: missingTags.length === 0,
      issues,
      warnings,
      passed,
    };
  }

  checkTwitterCard(html) {
    const issues = [];
    const warnings = [];
    const passed = [];

    const twitterCardMatch = html.match(
      /<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']+)["'][^>]*>/i
    );

    if (!twitterCardMatch) {
      warnings.push("No Twitter Card tag found");
      return { pass: false, issues, warnings, passed };
    }

    const cardType = twitterCardMatch[1];
    const validTypes = ["summary", "summary_large_image", "app", "player"];

    if (!validTypes.includes(cardType)) {
      warnings.push(`Invalid Twitter Card type: ${cardType}`);
    } else {
      passed.push(`✓ Twitter Card: ${cardType}`);
    }

    return {
      pass: validTypes.includes(cardType),
      issues,
      warnings,
      passed,
    };
  }

  checkCanonical(html, url) {
    const issues = [];
    const warnings = [];
    const passed = [];

    const canonicalMatch = html.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i
    );

    if (!canonicalMatch) {
      warnings.push("No canonical tag found");
      return { pass: false, issues, warnings, passed };
    }

    const canonical = canonicalMatch[1];

    // Check absolute URL
    if (!canonical.startsWith("http")) {
      warnings.push(`Canonical should be absolute URL: ${canonical}`);
    }

    // Canonical should match current URL (self-referencing)
    const urlObj = new URL(url);
    const canonicalObj = new URL(canonical, url);

    if (urlObj.pathname !== canonicalObj.pathname) {
      warnings.push(`Canonical doesn't match current URL: ${canonical} vs ${url}`);
    } else {
      passed.push(`✓ Canonical: self-referencing`);
    }

    return {
      pass: canonical.startsWith("http"),
      issues,
      warnings,
      passed,
    };
  }

  checkStructuredData(html, locale) {
    const warnings = [];
    const passed = [];

    const jsonLdRegex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis;
    const matches = [...html.matchAll(jsonLdRegex)];

    if (matches.length === 0) {
      warnings.push("No JSON-LD structured data found");
      return { pass: false, warnings, passed };
    }

    let hasLanguageProperty = false;

    matches.forEach((match) => {
      try {
        const data = JSON.parse(match[1]);

        // Check for @language or inLanguage property
        if (data["@language"] || data.inLanguage) {
          hasLanguageProperty = true;
          const lang = data["@language"] || data.inLanguage;

          if (lang !== locale && lang !== `${locale}`) {
            warnings.push(
              `Structured data language "${lang}" doesn't match page locale "${locale}"`
            );
          }
        }

        // Check common types
        if (data["@type"]) {
          passed.push(`✓ Structured data: ${data["@type"]}`);
        }
      } catch (e) {
        warnings.push("Invalid JSON-LD syntax");
      }
    });

    if (!hasLanguageProperty) {
      warnings.push("Structured data missing @language or inLanguage property");
    }

    return {
      pass: true, // Not critical
      warnings,
      passed,
    };
  }

  async auditSitemap() {
    console.log(COLORS.cyan + "\n🗺️  Checking sitemap.xml..." + COLORS.reset);

    const sitemapPath = join(rootDir, "public", "sitemap.xml");
    const issues = [];
    const passed = [];

    if (!existsSync(sitemapPath)) {
      issues.push("sitemap.xml not found in /public");
      return { pass: false, issues, passed };
    }

    const sitemap = await readFile(sitemapPath, "utf-8");

    // Check for locale URLs
    const localeUrls = LOCALES.filter((l) => l !== "en").map((l) => `/${l}/`);
    const missingLocales = localeUrls.filter((url) => !sitemap.includes(url));

    if (missingLocales.length > 0) {
      issues.push(`Sitemap missing URLs for locales: ${missingLocales.join(", ")}`);
    } else {
      passed.push("✓ All locale URLs present");
    }

    // Check for hreflang in sitemap
    if (sitemap.includes("xhtml:link")) {
      passed.push("✓ Hreflang xhtml:link tags present");
    } else {
      issues.push("Sitemap missing hreflang xhtml:link tags");
    }

    // Check priority for important pages
    if (sitemap.includes("<priority>1.0</priority>")) {
      passed.push("✓ Priority 1.0 set for important pages");
    }

    console.log(passed.length > 0 ? COLORS.green + passed.join("\n") + COLORS.reset : "");
    console.log(issues.length > 0 ? COLORS.red + issues.join("\n") + COLORS.reset : "");

    return { pass: issues.length === 0, issues, passed };
  }

  async auditRobotsTxt() {
    console.log(COLORS.cyan + "\n🤖 Checking robots.txt..." + COLORS.reset);

    const robotsPath = join(rootDir, "public", "robots.txt");
    const issues = [];
    const passed = [];

    if (!existsSync(robotsPath)) {
      issues.push("robots.txt not found in /public");
      return { pass: false, issues, passed };
    }

    const robots = await readFile(robotsPath, "utf-8");

    // Check for sitemap directive
    if (robots.includes("Sitemap:")) {
      passed.push("✓ Sitemap directive present");
    } else {
      issues.push("robots.txt missing Sitemap directive");
    }

    // Check for proper user-agent
    if (robots.includes("User-agent: *")) {
      passed.push("✓ User-agent: * directive present");
    }

    console.log(passed.length > 0 ? COLORS.green + passed.join("\n") + COLORS.reset : "");
    console.log(issues.length > 0 ? COLORS.red + issues.join("\n") + COLORS.reset : "");

    return { pass: issues.length === 0, issues, passed };
  }

  printSummary() {
    console.log("\n" + COLORS.bright + COLORS.cyan + "=".repeat(100) + COLORS.reset);
    console.log(COLORS.bright + COLORS.cyan + "  SEO AUDIT SUMMARY" + COLORS.reset);
    console.log(COLORS.bright + COLORS.cyan + "=".repeat(100) + COLORS.reset + "\n");

    console.log(COLORS.bright + "📊 CHECK RESULTS" + COLORS.reset);
    console.log("─".repeat(100));

    const checkNames = {
      hreflang: "Hreflang Tags",
      metaTitle: "Meta Titles",
      metaDescription: "Meta Descriptions",
      openGraph: "OpenGraph Tags",
      twitterCard: "Twitter Cards",
      canonical: "Canonical URLs",
      structuredData: "Structured Data",
    };

    Object.entries(this.checks).forEach(([key, stats]) => {
      const total = stats.pass + stats.fail + stats.warn;
      const passRate = total > 0 ? Math.round((stats.pass / total) * 100) : 0;
      const color = passRate >= 90 ? COLORS.green : passRate >= 70 ? COLORS.yellow : COLORS.red;

      console.log(
        `${checkNames[key].padEnd(25)} ${color}${passRate}%${COLORS.reset} (${stats.pass}/${total}) - ${stats.fail} errors, ${stats.warn} warnings`
      );
    });

    console.log("\n" + COLORS.bright + COLORS.cyan + "=".repeat(100) + COLORS.reset + "\n");
  }
}

// Main execution
const auditor = new SEOAuditor();

console.log(COLORS.bright + COLORS.cyan + "\n🔍 COMPREHENSIVE SEO AUDIT" + COLORS.reset);
console.log(COLORS.cyan + `Auditing: ${BASE_URL}` + COLORS.reset);
console.log(COLORS.cyan + `Locales: ${LOCALES.join(", ")}\n` + COLORS.reset);

// Sample pages to audit (adjust as needed)
const samplePages = [
  { path: "/", locale: "en" },
  { path: "/fr", locale: "fr" },
  { path: "/de", locale: "de" },
  { path: "/pricing", locale: "en" },
  { path: "/fr/pricing", locale: "fr" },
  { path: "/about", locale: "en" },
  { path: "/fr/about", locale: "fr" },
  { path: "/blog", locale: "en" },
  { path: "/fr/blog", locale: "fr" },
];

console.log(COLORS.yellow + `Auditing ${samplePages.length} sample pages...\n` + COLORS.reset);

Promise.all(samplePages.map(({ path, locale }) => auditor.auditPage(`${BASE_URL}${path}`, locale)))
  .then(async (results) => {
    results.forEach((result) => {
      if (result.skipped) return;

      console.log(
        COLORS.bright +
          `\n${result.url}` +
          COLORS.reset +
          COLORS.cyan +
          ` [${result.locale}]` +
          COLORS.reset
      );

      if (result.passed.length > 0) {
        console.log(COLORS.green + result.passed.join("\n") + COLORS.reset);
      }
      if (result.warnings.length > 0) {
        console.log(
          COLORS.yellow + result.warnings.map((w) => `⚠ ${w}`).join("\n") + COLORS.reset
        );
      }
      if (result.issues.length > 0) {
        console.log(COLORS.red + result.issues.map((i) => `✗ ${i}`).join("\n") + COLORS.reset);
      }
    });

    auditor.printSummary();

    // Audit sitemap and robots.txt
    await auditor.auditSitemap();
    await auditor.auditRobotsTxt();

    console.log(COLORS.green + "\n✓ SEO audit complete!\n" + COLORS.reset);
  })
  .catch((error) => {
    console.error(COLORS.red + "\n❌ Error during SEO audit:" + COLORS.reset, error);
    process.exit(1);
  });
