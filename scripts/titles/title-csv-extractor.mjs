#!/usr/bin/env node

/**
 * Title Extractor - CSV Export
 * Extracts all page titles from live site and creates a comprehensive CSV
 */

import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'fs';

const BASE_URL = 'https://www.aiseoturbo.com';
const LOCALES = ['en', 'fr', 'de', 'es', 'it', 'id'];

const LOCALE_NAMES = {
  'en': 'English',
  'fr': 'Français',
  'de': 'Deutsch',
  'es': 'Español',
  'it': 'Italiano',
  'id': 'Bahasa Indonesia'
};

// Load URLs from sitemap
let ALL_URLS = [];
try {
  const sitemapData = JSON.parse(readFileSync('sitemap-valid-urls.json', 'utf8'));
  ALL_URLS = sitemapData.validUrls || [];
  console.log(`Loaded ${ALL_URLS.length} URLs from sitemap`);
} catch (error) {
  console.error('Failed to load sitemap URLs:', error.message);
  process.exit(1);
}

class TitleExtractor {
  constructor() {
    this.results = [];
  }

  extractLocaleFromUrl(url) {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/').filter(p => p);

      if (pathParts.length === 0) return 'en'; // Root is English

      const firstPart = pathParts[0];
      return LOCALES.includes(firstPart) ? firstPart : 'en';
    } catch (error) {
      return 'unknown';
    }
  }

  async analyzePage(url) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();

      // Set user agent to avoid bot detection
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Get title
      const title = await page.evaluate(() => document.title);

      // Get HTML lang attribute
      const htmlLang = await page.evaluate(() => {
        const html = document.querySelector('html');
        return html ? html.getAttribute('lang') : null;
      });

      // Get page status
      const status = await page.evaluate(() => {
        // Check if page has content
        const body = document.body;
        const hasContent = body && body.textContent && body.textContent.trim().length > 0;
        return hasContent ? 'OK' : 'EMPTY';
      });

      await browser.close();

      return {
        url,
        title: title || 'NO TITLE',
        htmlLang,
        status,
        locale: this.extractLocaleFromUrl(url),
        error: null
      };

    } catch (error) {
      await browser.close();
      return {
        url,
        title: 'ERROR',
        htmlLang: null,
        status: 'ERROR',
        locale: this.extractLocaleFromUrl(url),
        error: error.message
      };
    }
  }

  generateCSV(results) {
    const csvHeader = 'URL,Locale,Locale Name,Title,Title Length,HTML Lang,Status,Error\n';

    const csvRows = results.map(result => {
      const localeName = LOCALE_NAMES[result.locale] || result.locale;
      const escapedTitle = `"${(result.title || '').replace(/"/g, '""')}"`;
      const titleLength = result.title && result.title !== 'ERROR' && result.title !== 'NO TITLE' ? result.title.length : 0;
      const escapedError = result.error ? `"${result.error.replace(/"/g, '""')}"` : '';

      return `${result.url},${result.locale},${localeName},${escapedTitle},${titleLength},${result.htmlLang || ''},${result.status},${escapedError}`;
    });

    return csvHeader + csvRows.join('\n');
  }

  printSummary(results) {
    const totalPages = results.length;
    const successfulPages = results.filter(r => r.status === 'OK').length;
    const errorPages = results.filter(r => r.status === 'ERROR').length;
    const emptyPages = results.filter(r => r.status === 'EMPTY').length;

    const titlesByLocale = {};
    LOCALES.forEach(locale => {
      titlesByLocale[locale] = results.filter(r => r.locale === locale && r.title && r.title !== 'ERROR');
    });

    console.log('📊 TITLE EXTRACTION SUMMARY');
    console.log('===========================\n');

    console.log(`📈 OVERVIEW:`);
    console.log(`   Total URLs processed: ${totalPages}`);
    console.log(`   Successful extractions: ${successfulPages}`);
    console.log(`   Errors: ${errorPages}`);
    console.log(`   Empty pages: ${emptyPages}\n`);

    console.log(`🌍 TITLES BY LOCALE:`);
    Object.entries(titlesByLocale).forEach(([locale, pages]) => {
      const localeName = LOCALE_NAMES[locale];
      console.log(`   ${localeName} (${locale}): ${pages.length} pages with titles`);
    });

    // Find duplicate titles
    const titleCounts = {};
    results.forEach(result => {
      if (result.title && result.title !== 'ERROR' && result.title !== 'NO TITLE') {
        titleCounts[result.title] = (titleCounts[result.title] || 0) + 1;
      }
    });

    const duplicates = Object.entries(titleCounts).filter(([title, count]) => count > 1);
    const uniqueTitles = Object.keys(titleCounts).length;

    console.log(`🎯 TITLE ANALYSIS:`);
    console.log(`   Unique titles: ${uniqueTitles}`);
    console.log(`   Duplicate title groups: ${duplicates.length}`);
    console.log(`   Total duplicate instances: ${duplicates.reduce((sum, [title, count]) => sum + count, 0)}\n`);

    // Title length analysis
    const titleLengths = results
      .filter(r => r.title && r.title !== 'ERROR' && r.title !== 'NO TITLE')
      .map(r => r.title.length);

    if (titleLengths.length > 0) {
      const avgLength = Math.round(titleLengths.reduce((sum, len) => sum + len, 0) / titleLengths.length);
      const minLength = Math.min(...titleLengths);
      const maxLength = Math.max(...titleLengths);
      const optimalRange = titleLengths.filter(len => len >= 50 && len <= 60).length;

      console.log(`📏 TITLE LENGTH ANALYSIS:`);
      console.log(`   Average length: ${avgLength} characters`);
      console.log(`   Shortest title: ${minLength} characters`);
      console.log(`   Longest title: ${maxLength} characters`);
      console.log(`   Titles in optimal range (50-60 chars): ${optimalRange}/${titleLengths.length} (${Math.round((optimalRange/titleLengths.length)*100)}%)\n`);
    }

    if (duplicates.length > 0) {
      console.log(`🚨 TOP DUPLICATE TITLES:`);
      duplicates
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .forEach(([title, count], index) => {
          console.log(`   ${index + 1}. "${title}" (${count} pages)`);
        });

      if (duplicates.length > 10) {
        console.log(`   ... and ${duplicates.length - 10} more`);
      }
    }

    console.log(`\n💾 CSV EXPORT:`);
    console.log(`   File: all-page-titles.csv`);
    console.log(`   Ready for analysis in Excel/Google Sheets`);
  }

  async run() {
    console.log('🔍 Starting Title Extraction...');
    console.log(`   Base URL: ${BASE_URL}`);
    console.log(`   Total URLs to process: ${ALL_URLS.length}\n`);

    const results = [];

    // Process URLs in batches to avoid overwhelming the site
    const batchSize = 10;
    for (let i = 0; i < ALL_URLS.length; i += batchSize) {
      const batch = ALL_URLS.slice(i, i + batchSize);
      console.log(`   Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(ALL_URLS.length / batchSize)} (${batch.length} URLs)`);

      const batchPromises = batch.map(async (url, batchIndex) => {
        const globalIndex = i + batchIndex + 1;
        console.log(`     [${globalIndex}/${ALL_URLS.length}] ${url.replace(BASE_URL, '')}`);
        return await this.analyzePage(url);
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Small delay between batches to be respectful
      if (i + batchSize < ALL_URLS.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Generate CSV
    const csvContent = this.generateCSV(results);
    writeFileSync('all-page-titles.csv', csvContent, 'utf8');

    // Print summary
    this.printSummary(results);

    console.log(`\n✅ Extraction complete!`);
    console.log(`   CSV saved as: all-page-titles.csv`);
    console.log(`   JSON details saved as: title-extraction-results.json`);

    // Also save detailed JSON for programmatic analysis
    writeFileSync('title-extraction-results.json', JSON.stringify(results, null, 2));
  }
}

// Run the extraction
const extractor = new TitleExtractor();
extractor.run().catch(console.error);