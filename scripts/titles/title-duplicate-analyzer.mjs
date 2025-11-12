#!/usr/bin/env node

/**
 * Title Duplicate Analyzer
 * Comprehensive analysis of duplicate page titles across all locales
 */

import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';

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

const LOCALE_COUNTRIES = {
  'en': 'Global',
  'fr': 'France',
  'de': 'Germany',
  'es': 'Spain',
  'it': 'Italy',
  'id': 'Indonesia'
};

// Load URLs from sitemap
let KEY_URLS = [];
try {
  const sitemapData = JSON.parse(readFileSync('sitemap-valid-urls.json', 'utf8'));
  KEY_URLS = sitemapData.validUrls || [];
  console.log(`Loaded ${KEY_URLS.length} URLs from sitemap`);
} catch (error) {
  console.error('Failed to load sitemap URLs:', error.message);
  process.exit(1);
}

class TitleDuplicateAnalyzer {
  constructor() {
    this.results = {
      totalPages: 0,
      uniqueTitles: new Set(),
      duplicateGroups: new Map(),
      titleToPages: new Map(),
      localeStats: {},
      recommendations: []
    };

    LOCALES.forEach(locale => {
      this.results.localeStats[locale] = {
        totalPages: 0,
        uniqueTitles: 0,
        duplicates: 0
      };
    });
  }

  async analyzePage(url, expectedLocale) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      // Get title
      const title = await page.evaluate(() => document.title);

      // Get HTML lang attribute
      const htmlLang = await page.evaluate(() => {
        const html = document.querySelector('html');
        return html ? html.getAttribute('lang') : null;
      });

      await browser.close();

      return {
        url,
        title,
        htmlLang,
        expectedLocale,
        localeMatch: htmlLang === expectedLocale
      };

    } catch (error) {
      await browser.close();
      return {
        url,
        error: error.message,
        expectedLocale
      };
    }
  }

  processTitleData(pageData) {
    if (pageData.error) return;

    const { url, title, expectedLocale } = pageData;

    this.results.totalPages++;

    // Update locale stats
    this.results.localeStats[expectedLocale].totalPages++;

    // Check for duplicates
    if (this.results.titleToPages.has(title)) {
      // This is a duplicate
      const existingPages = this.results.titleToPages.get(title);

      if (!this.results.duplicateGroups.has(title)) {
        this.results.duplicateGroups.set(title, [existingPages[0]]);
      }

      this.results.duplicateGroups.get(title).push(url);
      this.results.titleToPages.get(title).push(url);

      // Mark locales as having duplicates
      existingPages.forEach(existingUrl => {
        const existingLocale = this.extractLocaleFromUrl(existingUrl);
        this.results.localeStats[existingLocale].duplicates++;
      });
      this.results.localeStats[expectedLocale].duplicates++;

    } else {
      // First occurrence of this title
      this.results.titleToPages.set(title, [url]);
      this.results.uniqueTitles.add(title);

      // Count unique titles per locale
      this.results.localeStats[expectedLocale].uniqueTitles++;
    }
  }

  extractLocaleFromUrl(url) {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(p => p);

    if (pathParts.length === 0) return 'en'; // Root is English

    const firstPart = pathParts[0];
    return LOCALES.includes(firstPart) ? firstPart : 'en';
  }

  generateRecommendations() {
    const recommendations = [];

    // Analyze duplicate groups
    for (const [title, urls] of this.results.duplicateGroups) {
      if (urls.length < 2) continue;

      const locales = urls.map(url => this.extractLocaleFromUrl(url));
      const uniqueLocales = [...new Set(locales)];

      recommendations.push({
        title,
        duplicateCount: urls.length,
        affectedLocales: uniqueLocales,
        urls,
        recommendation: this.generateTitleRecommendation(title, uniqueLocales)
      });
    }

    this.results.recommendations = recommendations;
  }

  generateTitleRecommendation(originalTitle, locales) {
    const recommendations = [];

    // Remove brand suffix if present
    let baseTitle = originalTitle.replace(/\s*\|\s*AI SEO Turbo.*$/i, '').trim();

    locales.forEach(locale => {
      if (locale === 'en') {
        recommendations.push({
          locale: 'en',
          title: `${baseTitle} | AI SEO Turbo`,
          reasoning: 'Keep original English title for global audience'
        });
      } else {
        const countryName = LOCALE_COUNTRIES[locale];
        const localizedTitle = `${baseTitle} - ${countryName} | AI SEO Turbo`;

        recommendations.push({
          locale,
          title: localizedTitle,
          reasoning: `Add country name for better localization and targeting`
        });
      }
    });

    return recommendations;
  }

  printResults() {
    console.log('🎯 TITLE DUPLICATE ANALYSIS RESULTS');
    console.log('=====================================\n');

    console.log(`📊 OVERVIEW:`);
    console.log(`   Total pages analyzed: ${this.results.totalPages}`);
    console.log(`   Unique titles: ${this.results.uniqueTitles.size}`);
    console.log(`   Duplicate title groups: ${this.results.duplicateGroups.size}`);
    console.log(`   Total duplicate instances: ${Array.from(this.results.duplicateGroups.values()).reduce((sum, urls) => sum + urls.length, 0)}\n`);

    console.log(`🌍 LOCALE BREAKDOWN:`);
    Object.entries(this.results.localeStats).forEach(([locale, stats]) => {
      const localeName = LOCALE_NAMES[locale];
      const duplicatePercentage = stats.totalPages > 0 ? ((stats.duplicates / stats.totalPages) * 100).toFixed(1) : '0.0';
      console.log(`   ${localeName} (${locale}): ${stats.totalPages} pages, ${stats.duplicates} duplicates (${duplicatePercentage}%)`);
    });

    console.log(`\n🚨 DUPLICATE TITLE GROUPS (${this.results.duplicateGroups.size}):`);

    let groupCount = 1;
    for (const [title, urls] of this.results.duplicateGroups) {
      console.log(`\n   ${groupCount}. "${title}"`);
      console.log(`      Found on ${urls.length} pages:`);

      const urlsByLocale = {};
      urls.forEach(url => {
        const locale = this.extractLocaleFromUrl(url);
        if (!urlsByLocale[locale]) urlsByLocale[locale] = [];
        urlsByLocale[locale].push(url);
      });

      Object.entries(urlsByLocale).forEach(([locale, localeUrls]) => {
        const localeName = LOCALE_NAMES[locale];
        console.log(`         ${localeName}: ${localeUrls.length} pages`);
        localeUrls.forEach(url => {
          const shortUrl = url.replace(BASE_URL, '');
          console.log(`            ${shortUrl}`);
        });
      });

      groupCount++;
      if (groupCount > 10) { // Limit output
        console.log(`   ... and ${this.results.duplicateGroups.size - 10} more groups`);
        break;
      }
    }

    console.log(`\n💡 RECOMMENDATIONS:`);
    console.log(`   ${this.results.recommendations.length} title groups need fixing`);

    this.results.recommendations.slice(0, 5).forEach((rec, index) => {
      console.log(`\n   ${index + 1}. "${rec.title}" (${rec.duplicateCount} duplicates)`);
      rec.recommendation.forEach(suggestion => {
        console.log(`      ${LOCALE_NAMES[suggestion.locale]}: "${suggestion.title}"`);
        console.log(`         ${suggestion.reasoning}`);
      });
    });

    if (this.results.recommendations.length > 5) {
      console.log(`\n   ... and ${this.results.recommendations.length - 5} more recommendations`);
    }

    console.log(`\n📋 SUMMARY:`);
    console.log(`   • ${this.results.duplicateGroups.size} title groups have duplicates`);
    console.log(`   • ${Array.from(this.results.duplicateGroups.values()).reduce((sum, urls) => sum + urls.length, 0)} total duplicate instances`);
    console.log(`   • All localized pages need country-specific titles`);
    console.log(`   • Fix will improve SEO targeting and reduce confusion`);
  }

  async run() {
    console.log('🔍 Starting Title Duplicate Analysis...');
    console.log(`   Base URL: ${BASE_URL}`);
    console.log(`   Locales: ${LOCALES.join(', ')}`);
    console.log(`   Total URLs to analyze: ${KEY_URLS.length}\n`);

    // Analyze each URL
    for (let i = 0; i < KEY_URLS.length; i++) {
      const url = KEY_URLS[i];
      const expectedLocale = this.extractLocaleFromUrl(url);

      console.log(`   [${i + 1}/${KEY_URLS.length}] Checking: ${url.replace(BASE_URL, '')}`);
      const pageData = await this.analyzePage(url, expectedLocale);
      this.processTitleData(pageData);
    }

    // Generate recommendations
    this.generateRecommendations();

    // Print results
    this.printResults();

    // Export detailed results
    console.log(`\n💾 Exporting detailed results to title-analysis-results.json`);
    const fs = await import('fs');
    fs.writeFileSync('title-analysis-results.json', JSON.stringify(this.results, null, 2));
  }
}

// Run the analysis
const analyzer = new TitleDuplicateAnalyzer();
analyzer.run().catch(console.error);