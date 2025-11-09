#!/usr/bin/env node

/**
 * Comprehensive SEO Audit Script
 * 
 * Audits all working pages for:
 * - Hreflang tags (6 locales + x-default, absolute URLs, reciprocal)
 * - Meta titles (<60 chars, keyword-rich)
 * - Meta descriptions (<160 chars, keyword-rich)
 * - OpenGraph & Twitter Card tags (localized)
 * - Canonical URLs (self-referencing, absolute)
 * - Keywords (natural, preserved)
 * - Structured Data (JSON-LD with @language)
 * - Sitemap.xml presence and structure
 * - Robots.txt directives
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const BASE_URL = 'http://localhost:3000';
const LOCALES = ['en', 'fr', 'de', 'es', 'it', 'id'];

class SEOAuditor {
  constructor() {
    this.results = {
      total: 0,
      passed: 0,
      warnings: 0,
      failed: 0,
      issues: [],
      pages: []
    };
  }

  async auditPage(url) {
    console.log(`\n🔍 Auditing: ${url}`);
    
    const audit = {
      url,
      status: 'checking',
      hreflang: { status: 'unknown', issues: [] },
      title: { status: 'unknown', issues: [] },
      description: { status: 'unknown', issues: [] },
      openGraph: { status: 'unknown', issues: [] },
      twitter: { status: 'unknown', issues: [] },
      canonical: { status: 'unknown', issues: [] },
      structuredData: { status: 'unknown', issues: [] },
      overall: 'pending'
    };

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'SEO-Audit-Bot/1.0'
        }
      });

      if (response.status !== 200) {
        audit.status = `HTTP ${response.status}`;
        audit.overall = 'skipped';
        return audit;
      }

      const html = await response.text();
      
      // Parse HTML for meta tags
      this.auditHreflang(html, url, audit);
      this.auditTitle(html, audit);
      this.auditDescription(html, audit);
      this.auditOpenGraph(html, audit);
      this.auditTwitter(html, audit);
      this.auditCanonical(html, url, audit);
      this.auditStructuredData(html, audit);

      // Calculate overall status
      const statuses = [
        audit.hreflang.status,
        audit.title.status,
        audit.description.status,
        audit.canonical.status
      ];

      if (statuses.includes('failed')) {
        audit.overall = 'failed';
        this.results.failed++;
      } else if (statuses.includes('warning')) {
        audit.overall = 'warning';
        this.results.warnings++;
      } else {
        audit.overall = 'passed';
        this.results.passed++;
      }

      this.results.total++;
      this.results.pages.push(audit);

    } catch (error) {
      audit.status = 'error';
      audit.overall = 'failed';
      audit.error = error.message;
      this.results.failed++;
      this.results.total++;
    }

    return audit;
  }

  auditHreflang(html, url, audit) {
    const hreflangMatches = html.match(/<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]*>/g) || [];
    
    audit.hreflang.found = hreflangMatches.length;
    
    if (hreflangMatches.length === 0) {
      audit.hreflang.status = 'failed';
      audit.hreflang.issues.push('No hreflang tags found');
      return;
    }

    const hreflangs = {};
    hreflangMatches.forEach(tag => {
      const langMatch = tag.match(/hreflang=["']([^"']+)["']/);
      const hrefMatch = tag.match(/href=["']([^"']+)["']/);
      
      if (langMatch && hrefMatch) {
        hreflangs[langMatch[1]] = hrefMatch[1];
      }
    });

    // Check for all locales + x-default
    const expectedTags = [...LOCALES, 'x-default'];
    const missing = expectedTags.filter(lang => !hreflangs[lang]);
    
    if (missing.length > 0) {
      audit.hreflang.status = 'warning';
      audit.hreflang.issues.push(`Missing hreflang for: ${missing.join(', ')}`);
    } else {
      audit.hreflang.status = 'passed';
    }

    // Check for absolute URLs
    const relativeUrls = Object.entries(hreflangs).filter(([_, href]) => !href.startsWith('http'));
    if (relativeUrls.length > 0) {
      audit.hreflang.status = 'warning';
      audit.hreflang.issues.push('Some hreflang URLs are relative (should be absolute)');
    }

    audit.hreflang.tags = hreflangs;
  }

  auditTitle(html, audit) {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/);
    
    if (!titleMatch) {
      audit.title.status = 'failed';
      audit.title.issues.push('No title tag found');
      return;
    }

    const title = titleMatch[1].trim();
    audit.title.content = title;
    audit.title.length = title.length;

    if (title.length === 0) {
      audit.title.status = 'failed';
      audit.title.issues.push('Title is empty');
    } else if (title.length > 60) {
      audit.title.status = 'warning';
      audit.title.issues.push(`Title too long: ${title.length} chars (recommended: <60)`);
    } else if (title.length < 30) {
      audit.title.status = 'warning';
      audit.title.issues.push(`Title too short: ${title.length} chars (recommended: 30-60)`);
    } else {
      audit.title.status = 'passed';
    }

    // Check for SEO keywords
    const hasKeywords = /seo|audit|optimization|ranking|search/i.test(title);
    if (!hasKeywords) {
      audit.title.issues.push('Title may lack SEO keywords');
    }
  }

  auditDescription(html, audit) {
    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    
    if (!descMatch) {
      audit.description.status = 'failed';
      audit.description.issues.push('No meta description found');
      return;
    }

    const description = descMatch[1].trim();
    audit.description.content = description;
    audit.description.length = description.length;

    if (description.length === 0) {
      audit.description.status = 'failed';
      audit.description.issues.push('Description is empty');
    } else if (description.length > 160) {
      audit.description.status = 'warning';
      audit.description.issues.push(`Description too long: ${description.length} chars (recommended: <160)`);
    } else if (description.length < 50) {
      audit.description.status = 'warning';
      audit.description.issues.push(`Description too short: ${description.length} chars (recommended: 50-160)`);
    } else {
      audit.description.status = 'passed';
    }
  }

  auditOpenGraph(html, audit) {
    const ogTags = {
      'og:title': html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'og:description': html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'og:image': html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'og:url': html.match(/<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'og:type': html.match(/<meta[^>]+property=["']og:type["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'og:locale': html.match(/<meta[^>]+property=["']og:locale["'][^>]+content=["']([^"']+)["'][^>]*>/i)
    };

    const found = Object.entries(ogTags).filter(([_, match]) => match).length;
    audit.openGraph.found = found;

    if (found === 0) {
      audit.openGraph.status = 'warning';
      audit.openGraph.issues.push('No OpenGraph tags found');
    } else if (found < 4) {
      audit.openGraph.status = 'warning';
      audit.openGraph.issues.push(`Only ${found}/6 OpenGraph tags found`);
    } else {
      audit.openGraph.status = 'passed';
    }

    audit.openGraph.tags = Object.entries(ogTags)
      .filter(([_, match]) => match)
      .reduce((acc, [key, match]) => ({ ...acc, [key]: match[1] }), {});
  }

  auditTwitter(html, audit) {
    const twitterTags = {
      'twitter:card': html.match(/<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'twitter:title': html.match(/<meta[^>]+name=["']twitter:title["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'twitter:description': html.match(/<meta[^>]+name=["']twitter:description["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'twitter:image': html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i)
    };

    const found = Object.entries(twitterTags).filter(([_, match]) => match).length;
    audit.twitter.found = found;

    if (found === 0) {
      audit.twitter.status = 'warning';
      audit.twitter.issues.push('No Twitter Card tags found');
    } else if (found < 3) {
      audit.twitter.status = 'warning';
      audit.twitter.issues.push(`Only ${found}/4 Twitter Card tags found`);
    } else {
      audit.twitter.status = 'passed';
    }

    audit.twitter.tags = Object.entries(twitterTags)
      .filter(([_, match]) => match)
      .reduce((acc, [key, match]) => ({ ...acc, [key]: match[1] }), {});
  }

  auditCanonical(html, url, audit) {
    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i);
    
    if (!canonicalMatch) {
      audit.canonical.status = 'failed';
      audit.canonical.issues.push('No canonical URL found');
      return;
    }

    const canonical = canonicalMatch[1];
    audit.canonical.url = canonical;

    // Check if absolute URL
    if (!canonical.startsWith('http')) {
      audit.canonical.status = 'warning';
      audit.canonical.issues.push('Canonical URL is relative (should be absolute)');
    } else {
      audit.canonical.status = 'passed';
    }

    // Check if self-referencing
    const urlObj = new URL(url);
    const canonicalObj = new URL(canonical, url);
    if (urlObj.pathname !== canonicalObj.pathname) {
      audit.canonical.issues.push('Canonical URL does not match current page');
    }
  }

  auditStructuredData(html, audit) {
    const jsonLdMatches = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
    
    audit.structuredData.found = jsonLdMatches.length;

    if (jsonLdMatches.length === 0) {
      audit.structuredData.status = 'warning';
      audit.structuredData.issues.push('No JSON-LD structured data found');
      return;
    }

    const schemas = [];
    jsonLdMatches.forEach((match, index) => {
      try {
        const jsonMatch = match.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        if (jsonMatch) {
          const json = JSON.parse(jsonMatch[1]);
          schemas.push({
            '@type': json['@type'],
            hasLanguage: !!json['@language'] || !!json.inLanguage
          });
        }
      } catch (e) {
        audit.structuredData.issues.push(`Invalid JSON-LD at index ${index}`);
      }
    });

    audit.structuredData.schemas = schemas;
    audit.structuredData.status = schemas.length > 0 ? 'passed' : 'warning';

    // Check for @language attribute
    const withoutLanguage = schemas.filter(s => !s.hasLanguage);
    if (withoutLanguage.length > 0) {
      audit.structuredData.issues.push(`${withoutLanguage.length} schema(s) missing @language attribute`);
    }
  }

  async auditSitemap() {
    console.log('\n📄 Auditing sitemap.xml...\n');
    
    try {
      const response = await fetch(`${BASE_URL}/sitemap.xml`);
      
      if (response.status !== 200) {
        console.log(`❌ Sitemap not found (HTTP ${response.status})`);
        return { status: 'failed', exists: false };
      }

      const xml = await response.text();
      
      const urlMatches = xml.match(/<url>/g) || [];
      const locMatches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
      const hreflangMatches = xml.match(/<xhtml:link[^>]+rel=["']alternate["'][^>]*>/g) || [];
      
      console.log(`✅ Sitemap found`);
      console.log(`   URLs: ${urlMatches.length}`);
      console.log(`   <loc> tags: ${locMatches.length}`);
      console.log(`   Hreflang links: ${hreflangMatches.length}`);

      // Check for locale URLs
      const localeUrls = LOCALES.map(locale => 
        locMatches.filter(loc => loc.includes(`/${locale}/`)).length
      );

      console.log(`\n   Locale distribution:`);
      LOCALES.forEach((locale, i) => {
        console.log(`   - ${locale}: ${localeUrls[i]} URLs`);
      });

      return {
        status: 'passed',
        exists: true,
        totalUrls: urlMatches.length,
        hreflangTags: hreflangMatches.length,
        localeUrls
      };

    } catch (error) {
      console.log(`❌ Error fetching sitemap: ${error.message}`);
      return { status: 'failed', exists: false, error: error.message };
    }
  }

  async auditRobotsTxt() {
    console.log('\n🤖 Auditing robots.txt...\n');
    
    try {
      const response = await fetch(`${BASE_URL}/robots.txt`);
      
      if (response.status !== 200) {
        console.log(`❌ robots.txt not found (HTTP ${response.status})`);
        return { status: 'failed', exists: false };
      }

      const content = await response.text();
      
      console.log(`✅ robots.txt found`);
      console.log(`\nContent:\n${content}\n`);

      const hasSitemap = content.includes('Sitemap:');
      const hasUserAgent = content.includes('User-agent:');

      if (!hasSitemap) {
        console.log(`⚠️  Missing Sitemap directive`);
      }
      if (!hasUserAgent) {
        console.log(`⚠️  Missing User-agent directive`);
      }

      return {
        status: hasSitemap && hasUserAgent ? 'passed' : 'warning',
        exists: true,
        hasSitemap,
        hasUserAgent,
        content
      };

    } catch (error) {
      console.log(`❌ Error fetching robots.txt: ${error.message}`);
      return { status: 'failed', exists: false, error: error.message };
    }
  }

  printSummary() {
    console.log('\n' + '='.repeat(80));
    console.log('  SEO AUDIT SUMMARY');
    console.log('='.repeat(80) + '\n');

    console.log(`Total Pages Audited: ${this.results.total}`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`⚠️  Warnings: ${this.results.warnings}`);
    console.log(`❌ Failed: ${this.results.failed}\n`);

    // Group issues by type
    const issuesByType = {
      hreflang: [],
      title: [],
      description: [],
      canonical: [],
      openGraph: [],
      twitter: [],
      structuredData: []
    };

    this.results.pages.forEach(page => {
      ['hreflang', 'title', 'description', 'canonical', 'openGraph', 'twitter', 'structuredData'].forEach(type => {
        if (page[type].issues && page[type].issues.length > 0) {
          issuesByType[type].push({
            url: page.url,
            issues: page[type].issues
          });
        }
      });
    });

    // Print issues by category
    Object.entries(issuesByType).forEach(([type, pages]) => {
      if (pages.length > 0) {
        console.log(`\n${type.toUpperCase()} ISSUES (${pages.length} pages):`);
        console.log('-'.repeat(80));
        pages.slice(0, 10).forEach(({ url, issues }) => {
          console.log(`\n${url}`);
          issues.forEach(issue => console.log(`  • ${issue}`));
        });
        if (pages.length > 10) {
          console.log(`\n... and ${pages.length - 10} more pages with ${type} issues`);
        }
      }
    });

    console.log('\n' + '='.repeat(80) + '\n');
  }

  async run(urls) {
    console.log('🚀 Starting Comprehensive SEO Audit...\n');
    console.log(`Auditing ${urls.length} pages...\n`);

    // Audit pages in batches to avoid overwhelming the server
    const batchSize = 5;
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      await Promise.all(batch.map(url => this.auditPage(url)));
      
      // Show progress
      const progress = Math.min(i + batchSize, urls.length);
      console.log(`\nProgress: ${progress}/${urls.length} pages audited`);
    }

    // Audit sitemap and robots.txt
    const sitemapResult = await this.auditSitemap();
    const robotsResult = await this.auditRobotsTxt();

    this.results.sitemap = sitemapResult;
    this.results.robots = robotsResult;

    this.printSummary();

    // Save detailed results to JSON
    const resultsPath = join(rootDir, 'seo-audit-results.json');
    await import('fs/promises').then(fs => 
      fs.writeFile(resultsPath, JSON.stringify(this.results, null, 2))
    );
    console.log(`\n📊 Detailed results saved to: seo-audit-results.json\n`);
  }
}

// Get working URLs from health check results
async function getWorkingUrls() {
  try {
    const healthResultsPath = join(rootDir, 'page-health-results.json');
    const { readFile } = await import('fs/promises');
    const data = await readFile(healthResultsPath, 'utf-8');
    const results = JSON.parse(data);
    
    // Get all 200 status pages
    return results.pages
      .filter(p => p.status === 200)
      .map(p => p.url);
  } catch (error) {
    console.error('Error reading health check results:', error.message);
    console.log('Please run: node scripts/check-page-health.mjs first');
    process.exit(1);
  }
}

// Run audit
const urls = await getWorkingUrls();
console.log(`Found ${urls.length} working pages to audit\n`);

// Audit a sample of pages (you can change this to audit all)
const sampleUrls = urls.slice(0, 20); // Audit first 20 pages as sample
console.log(`Auditing ${sampleUrls.length} pages (sample)...\n`);

const auditor = new SEOAuditor();
await auditor.run(sampleUrls);
