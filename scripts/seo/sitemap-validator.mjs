#!/usr/bin/env node

/**
 * Sitemap URL Validator
 *
 * This script validates all URLs from the sitemap to ensure they are accessible
 * before running the full SEO audit.
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aiseoturbo.com';

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
};

class SitemapValidator {
  constructor() {
    this.validUrls = [];
    this.invalidUrls = [];
    this.redirectUrls = [];
  }

  log(color, message) {
    console.log(`${color}${message}${COLORS.reset}`);
  }

  async fetchSitemapUrls() {
    try {
      this.log(COLORS.cyan, `📡 Fetching sitemap from: ${BASE_URL}/sitemap.xml`);

      const response = await fetch(`${BASE_URL}/sitemap.xml`, {
        headers: {
          'User-Agent': 'Sitemap-Validator/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch sitemap: ${response.status}`);
      }

      const sitemapXml = await response.text();
      const urlMatches = sitemapXml.match(/<loc>([^<]+)<\/loc>/g) || [];

      const urls = urlMatches
        .map(match => match.match(/<loc>([^<]+)<\/loc>/))
        .filter(match => match)
        .map(match => match[1])
        .filter(url => url.startsWith(BASE_URL));

      this.log(COLORS.green, `✅ Found ${urls.length} URLs in sitemap`);
      return urls;

    } catch (error) {
      this.log(COLORS.red, `❌ Error fetching sitemap: ${error.message}`);
      return [];
    }
  }

  async validateUrl(url) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Sitemap-Validator/1.0'
        },
        redirect: 'manual' // Don't follow redirects automatically
      });

      if (response.status === 200) {
        return { url, status: 'valid', code: 200 };
      } else if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location');
        return {
          url,
          status: 'redirect',
          code: response.status,
          redirectTo: location
        };
      } else if (response.status === 404) {
        return { url, status: 'not_found', code: 404 };
      } else if (response.status === 403) {
        return { url, status: 'forbidden', code: 403 };
      } else if (response.status === 500) {
        return { url, status: 'server_error', code: 500 };
      } else {
        return { url, status: 'other', code: response.status };
      }

    } catch (error) {
      return { url, status: 'error', error: error.message };
    }
  }

  async validateAllUrls(urls) {
    this.log(COLORS.blue, `\n🔍 Validating ${urls.length} URLs...`);

    const batchSize = 10; // Check 10 URLs at a time
    let processed = 0;

    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      const promises = batch.map(url => this.validateUrl(url));

      const results = await Promise.all(promises);

      results.forEach(result => {
        processed++;

        if (result.status === 'valid') {
          this.validUrls.push(result.url);
          this.log(COLORS.green, `✅ ${result.url}`);
        } else if (result.status === 'redirect') {
          this.redirectUrls.push(result);
          this.log(COLORS.yellow, `↪️  ${result.url} -> ${result.code} ${result.redirectTo || 'unknown'}`);
        } else {
          this.invalidUrls.push(result);
          this.log(COLORS.red, `❌ ${result.url} -> ${result.status} (${result.code || result.error})`);
        }
      });

      // Progress indicator
      const progress = Math.round((processed / urls.length) * 100);
      this.log(COLORS.cyan, `📊 Progress: ${processed}/${urls.length} URLs (${progress}%)`);

      // Small delay between batches to be respectful
      if (i + batchSize < urls.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }

  async generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('🏁 SITEMAP URL VALIDATION REPORT');
    console.log('='.repeat(80));

    console.log(`\n📊 SUMMARY:`);
    console.log(`   ✅ Valid URLs: ${this.validUrls.length}`);
    console.log(`   ↪️  Redirects: ${this.redirectUrls.length}`);
    console.log(`   ❌ Invalid URLs: ${this.invalidUrls.length}`);
    console.log(`   📈 Total URLs: ${this.validUrls.length + this.redirectUrls.length + this.invalidUrls.length}`);

    if (this.redirectUrls.length > 0) {
      console.log(`\n🔄 REDIRECTS:`);
      this.redirectUrls.forEach(redirect => {
        console.log(`   ${redirect.url} -> ${redirect.code} ${redirect.redirectTo || 'unknown'}`);
      });
    }

    if (this.invalidUrls.length > 0) {
      console.log(`\n❌ INVALID URLs:`);
      this.invalidUrls.forEach(invalid => {
        const reason = invalid.code ? `HTTP ${invalid.code}` : invalid.error;
        console.log(`   ${invalid.url} -> ${reason}`);
      });
    }

    console.log('\n💾 Saving valid URLs to: sitemap-valid-urls.json');

    const fs = await import('fs/promises');
    await fs.writeFile(
      join(__dirname, '..', '..', 'sitemap-valid-urls.json'),
      JSON.stringify({
        summary: {
          total: this.validUrls.length + this.redirectUrls.length + this.invalidUrls.length,
          valid: this.validUrls.length,
          redirects: this.redirectUrls.length,
          invalid: this.invalidUrls.length,
          generatedAt: new Date().toISOString()
        },
        validUrls: this.validUrls,
        redirects: this.redirectUrls,
        invalidUrls: this.invalidUrls
      }, null, 2)
    );

    console.log('✅ Report saved!');
  }

  async run() {
    this.log(COLORS.bright, '🚀 Starting Sitemap URL Validation...\n');

    const urls = await this.fetchSitemapUrls();

    if (urls.length === 0) {
      this.log(COLORS.red, '❌ No URLs found in sitemap. Exiting.');
      return;
    }

    await this.validateAllUrls(urls);
    await this.generateReport();

    this.log(COLORS.green, `\n🎉 Validation complete! Found ${this.validUrls.length} valid URLs ready for SEO audit.`);

    if (this.invalidUrls.length > 0) {
      this.log(COLORS.yellow, `⚠️  ${this.invalidUrls.length} URLs are invalid and will be excluded from the audit.`);
    }
  }
}

// Run the validator
const validator = new SitemapValidator();
validator.run().catch(error => {
  console.error('❌ Validation failed:', error);
  process.exit(1);
});