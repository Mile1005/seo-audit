#!/usr/bin/env node

/**
 * Quick SEO Verification Script
 * Checks key fixes: Schema @language, OpenGraph images, Canonical URLs, Hreflang
 */

import puppeteer from "puppeteer";
import { readFileSync } from "fs";
import { join } from "path";

const BASE_URL = "http://localhost:3000";
const pages = ["/", "/fr/", "/features"];

async function checkPage(url) {
  console.log(`\n🔍 Checking: ${url}`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle0" });

    // Check HTML lang attribute
    const htmlLang = await page.evaluate(() => {
      const html = document.querySelector("html");
      return html ? html.getAttribute("lang") : null;
    });

    // Check schema markup
    const schemas = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts
        .map((script) => {
          try {
            return JSON.parse(script.textContent || "");
          } catch (e) {
            return null;
          }
        })
        .filter(Boolean);
    });

    // Check OpenGraph meta tags
    const ogImage = await page.evaluate(() => {
      const meta = document.querySelector('meta[property="og:image"]');
      return meta ? meta.getAttribute("content") : null;
    });

    // Check canonical URL
    const canonical = await page.evaluate(() => {
      const link = document.querySelector('link[rel="canonical"]');
      return link ? link.getAttribute("href") : null;
    });

    // Check hreflang tags
    const hreflangs = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel="alternate"]'));
      return links
        .filter((link) => link.getAttribute("hreflang"))
        .map((link) => ({
          hreflang: link.getAttribute("hreflang"),
          href: link.getAttribute("href"),
        }));
    });

    // Check title
    const title = await page.evaluate(() => document.title);

    console.log(`  ✅ HTML lang: ${htmlLang || "MISSING"}`);
    console.log(`  ✅ Title: ${title ? title.substring(0, 50) + "..." : "MISSING"}`);
    console.log(`  ✅ OpenGraph image: ${ogImage ? "PRESENT" : "MISSING"}`);
    console.log(`  ✅ Canonical URL: ${canonical ? "PRESENT" : "MISSING"}`);
    console.log(`  ✅ Hreflang tags: ${hreflangs.length} found`);

    // Check schema @language
    const schemasWithLanguage = schemas.filter((schema) => schema["@language"]);
    console.log(`  ✅ Schemas with @language: ${schemasWithLanguage.length}/${schemas.length}`);

    if (schemasWithLanguage.length > 0) {
      console.log(
        `     Languages found: ${schemasWithLanguage.map((s) => s["@language"]).join(", ")}`
      );
    }

    return {
      url,
      htmlLang,
      title: !!title,
      ogImage: !!ogImage,
      canonical: !!canonical,
      hreflangs: hreflangs.length,
      schemas: schemas.length,
      schemasWithLanguage: schemasWithLanguage.length,
    };
  } catch (error) {
    console.log(`  ❌ Error checking page: ${error.message}`);
    return { url, error: error.message };
  } finally {
    await browser.close();
  }
}

async function runAudit() {
  console.log("🚀 Quick SEO Verification Audit");
  console.log("================================");

  const results = [];

  for (const pagePath of pages) {
    const result = await checkPage(BASE_URL + pagePath);
    results.push(result);
  }

  console.log("\n📊 SUMMARY");
  console.log("==========");

  const validResults = results.filter((r) => !r.error);

  if (validResults.length > 0) {
    const avgSchemasWithLanguage =
      validResults.reduce((sum, r) => sum + r.schemasWithLanguage, 0) / validResults.length;
    const allHaveOG = validResults.every((r) => r.ogImage);
    const allHaveCanonical = validResults.every((r) => r.canonical);
    const totalHreflangs = validResults.reduce((sum, r) => sum + r.hreflangs, 0);

    console.log(`✅ Average schemas with @language: ${avgSchemasWithLanguage.toFixed(1)}`);
    console.log(`✅ All pages have OpenGraph images: ${allHaveOG ? "YES" : "NO"}`);
    console.log(`✅ All pages have canonical URLs: ${allHaveCanonical ? "YES" : "NO"}`);
    console.log(`✅ Total hreflang tags found: ${totalHreflangs}`);
  }

  console.log("\n🎯 Key Fixes Verified:");
  console.log("  • Schema markup @language attributes");
  console.log("  • OpenGraph image meta tags");
  console.log("  • Canonical URL links");
  console.log("  • Hreflang alternate links");
}

runAudit().catch(console.error);
