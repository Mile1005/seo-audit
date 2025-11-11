#!/usr/bin/env node

/**
 * SEO HTML Diagnostic Script
 *
 * Shows exactly what HTML Puppeteer is capturing vs what we expect
 */

import puppeteer from 'puppeteer';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aiseoturbo.com';

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
};

class SEODiagnostic {
  log(color, message) {
    console.log(`${color}${message}${COLORS.reset}`);
  }

  async diagnosePage(url) {
    this.log(COLORS.blue, `\n🔍 Diagnosing: ${url}`);

    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });

      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Get the full HTML
      const html = await page.content();

      this.log(COLORS.green, `✅ HTML Length: ${html.length} characters`);

      // Extract head section
      const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
      if (headMatch) {
        const headContent = headMatch[1];
        this.log(COLORS.cyan, `\n📋 HEAD SECTION CONTENT:`);
        console.log(headContent.substring(0, 2000) + (headContent.length > 2000 ? '\n... (truncated)' : ''));

        // Count title tags
        const titleMatches = headContent.match(/<title[^>]*>[\s\S]*?<\/title>/gi) || [];
        this.log(COLORS.yellow, `\n🏷️  TITLE TAGS FOUND: ${titleMatches.length}`);

        titleMatches.forEach((titleTag, index) => {
          const titleContent = titleTag.match(/<title[^>]*>([^<]+)<\/title>/i);
          console.log(`   ${index + 1}. ${titleContent ? titleContent[1].trim() : 'NO CONTENT'}`);
          console.log(`      Full tag: ${titleTag.replace(/\s+/g, ' ').substring(0, 100)}`);
        });

        // Count meta descriptions
        const descMatches = headContent.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/gi) || [];
        this.log(COLORS.yellow, `\n📝 META DESCRIPTIONS FOUND: ${descMatches.length}`);

        descMatches.forEach((descTag, index) => {
          const descContent = descTag.match(/content=["']([^"']+)["']/i);
          console.log(`   ${index + 1}. ${descContent ? descContent[1].substring(0, 100) + '...' : 'NO CONTENT'}`);
        });

        // Count canonical tags
        const canonicalMatches = headContent.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/gi) || [];
        this.log(COLORS.yellow, `\n🔗 CANONICAL TAGS FOUND: ${canonicalMatches.length}`);

        canonicalMatches.forEach((canonicalTag, index) => {
          const canonicalHref = canonicalTag.match(/href=["']([^"']+)["']/i);
          console.log(`   ${index + 1}. ${canonicalHref ? canonicalHref[1] : 'NO HREF'}`);
        });

      } else {
        this.log(COLORS.red, `❌ No head section found!`);
      }

      // Check for common Next.js issues
      const nextData = html.includes('__NEXT_DATA__');
      const reactRoot = html.includes('data-reactroot');
      const multipleHeads = (html.match(/<head[^>]*>/gi) || []).length;

      this.log(COLORS.cyan, `\n🔧 NEXT.JS ANALYSIS:`);
      console.log(`   __NEXT_DATA__ present: ${nextData ? '✅' : '❌'}`);
      console.log(`   data-reactroot present: ${reactRoot ? '✅' : '❌'}`);
      console.log(`   Head sections found: ${multipleHeads}`);

      if (multipleHeads > 1) {
        this.log(COLORS.red, `⚠️  Multiple head sections detected! This could cause SEO issues.`);
      }

    } catch (error) {
      this.log(COLORS.red, `❌ Error diagnosing ${url}: ${error.message}`);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  async run() {
    this.log(COLORS.bright, '🔬 SEO HTML Diagnostic Tool');
    this.log(COLORS.bright, '='.repeat(50));

    // Test a few key pages
    const testUrls = [
      `${BASE_URL}/`,
      `${BASE_URL}/features`,
      `${BASE_URL}/help`,
      `${BASE_URL}/fr`,
      `${BASE_URL}/help/api/authentication`
    ];

    for (const url of testUrls) {
      await this.diagnosePage(url);
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    this.log(COLORS.green, '\n🎯 Diagnostic complete!');
    this.log(COLORS.cyan, '\n💡 If you see multiple title/description tags, the issue is likely:');
    console.log('   1. Next.js rendering multiple head sections');
    console.log('   2. React components adding duplicate meta tags');
    console.log('   3. Server-side vs client-side rendering mismatch');
  }
}

// Run the diagnostic
const diagnostic = new SEODiagnostic();
diagnostic.run().catch(error => {
  console.error('❌ Diagnostic failed:', error);
  process.exit(1);
});