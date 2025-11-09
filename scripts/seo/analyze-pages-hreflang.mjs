#!/usr/bin/env node

/**
 * Page & Hreflang Analysis Script
 * 
 * This script:
 * 1. Finds all page.tsx/page.js files in the app directory
 * 2. Checks if they have generateMetadata or metadata export
 * 3. Verifies if hreflang is implemented
 * 4. Identifies pages that need hreflang tags
 * 5. Reports broken/error pages
 */

import { fileURLToPath } from 'url';
import { dirname, join, relative, sep } from 'path';
import { readdir, readFile, stat } from 'fs/promises';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const appDir = join(rootDir, 'app');

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

class PageAnalyzer {
  constructor() {
    this.pages = [];
    this.stats = {
      total: 0,
      withLocale: 0,
      withoutLocale: 0,
      withHreflang: 0,
      withoutHreflang: 0,
      withStaticMetadata: 0,
      withDynamicMetadata: 0,
      noMetadata: 0,
      errors: [],
      needsHreflang: [],
    };
  }

  async findPages(dir, relativePath = '') {
    try {
      const entries = await readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        const relPath = join(relativePath, entry.name);

        if (entry.isDirectory()) {
          // Skip node_modules, .next, etc.
          if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
            await this.findPages(fullPath, relPath);
          }
        } else if (entry.name === 'page.tsx' || entry.name === 'page.js') {
          await this.analyzePage(fullPath, relativePath);
        }
      }
    } catch (error) {
      this.stats.errors.push({
        path: dir,
        error: error.message,
      });
    }
  }

  async analyzePage(filePath, dirPath) {
    this.stats.total++;

    try {
      const content = await readFile(filePath, 'utf-8');
      const routePath = this.getRoutePath(dirPath);
      const isLocaleRoute = dirPath.includes('[locale]');
      
      const analysis = {
        filePath: relative(rootDir, filePath),
        routePath,
        isLocaleRoute,
        hasGenerateMetadata: /export\s+(async\s+)?function\s+generateMetadata/.test(content),
        hasStaticMetadata: /export\s+const\s+metadata/.test(content),
        hasHreflang: false,
        hasLocaleParam: /params.*locale/.test(content),
        usesGenerateSEOMeta: /generateSEOMeta/.test(content),
        usesSetRequestLocale: /setRequestLocale/.test(content),
        errors: [],
      };

      // Check for hreflang implementation
      analysis.hasHreflang = 
        /alternates.*languages/.test(content) ||
        /generateLanguageAlternates/.test(content) ||
        (analysis.usesGenerateSEOMeta && /locale:/.test(content) && /path:/.test(content));

      // Update stats
      if (isLocaleRoute) {
        this.stats.withLocale++;
      } else {
        this.stats.withoutLocale++;
      }

      if (analysis.hasGenerateMetadata) {
        this.stats.withDynamicMetadata++;
      } else if (analysis.hasStaticMetadata) {
        this.stats.withStaticMetadata++;
      } else {
        this.stats.noMetadata++;
      }

      if (analysis.hasHreflang) {
        this.stats.withHreflang++;
      } else {
        this.stats.withoutHreflang++;
        
        // Determine if page should have hreflang
        const shouldHaveHreflang = this.shouldHaveHreflang(routePath, isLocaleRoute);
        if (shouldHaveHreflang) {
          this.stats.needsHreflang.push({
            ...analysis,
            reason: this.getHreflangReason(routePath, isLocaleRoute),
          });
        }
      }

      // Check for common issues
      if (isLocaleRoute && !analysis.hasLocaleParam) {
        analysis.errors.push('Missing locale param in locale route');
      }

      if (isLocaleRoute && !analysis.usesSetRequestLocale) {
        analysis.errors.push('Missing setRequestLocale call');
      }

      if (analysis.hasStaticMetadata && isLocaleRoute) {
        analysis.errors.push('Using static metadata in locale route (should be dynamic)');
      }

      this.pages.push(analysis);

      if (analysis.errors.length > 0) {
        this.stats.errors.push(...analysis.errors.map(err => ({
          path: analysis.filePath,
          error: err,
        })));
      }
    } catch (error) {
      this.stats.errors.push({
        path: relative(rootDir, filePath),
        error: error.message,
      });
    }
  }

  getRoutePath(dirPath) {
    // Convert file path to route path
    let route = '/' + dirPath.replace(/\\/g, '/');
    
    // Remove trailing slashes
    route = route.replace(/\/$/, '') || '/';
    
    return route;
  }

  shouldHaveHreflang(routePath, isLocaleRoute) {
    // Pages that should NOT have hreflang (private/auth pages typically don't need it for SEO)
    const noHreflangPatterns = [
      /\/api\//,
      /\/dashboard\//,
      /\/_/,
    ];

    // Auth pages can have hreflang for better UX but it's optional
    // Public content pages SHOULD have hreflang
    const publicPages = [
      /^\/$/,
      /\/features/,
      /\/pricing/,
      /\/about/,
      /\/contact/,
      /\/blog/,
      /\/help/,
      /\/case-studies/,
      /\/careers/,
      /\/community/,
      /\/demo/,
    ];

    // Check if it's a page that shouldn't have hreflang
    if (noHreflangPatterns.some(pattern => pattern.test(routePath))) {
      return false;
    }

    // If it's in locale route and a public page, it should have hreflang
    if (isLocaleRoute && publicPages.some(pattern => pattern.test(routePath))) {
      return true;
    }

    // Default: public pages in locale routes should have hreflang
    return isLocaleRoute && !routePath.includes('/dashboard');
  }

  getHreflangReason(routePath, isLocaleRoute) {
    if (!isLocaleRoute) {
      return 'Not in locale route structure';
    }
    if (routePath.includes('/dashboard')) {
      return 'Dashboard page (hreflang optional)';
    }
    return 'Public page missing hreflang implementation';
  }

  printReport() {
    console.log('\n' + COLORS.bright + COLORS.cyan + '='.repeat(80) + COLORS.reset);
    console.log(COLORS.bright + COLORS.cyan + '  PAGE & HREFLANG ANALYSIS REPORT' + COLORS.reset);
    console.log(COLORS.bright + COLORS.cyan + '='.repeat(80) + COLORS.reset + '\n');

    // Summary Stats
    console.log(COLORS.bright + '📊 SUMMARY STATISTICS' + COLORS.reset);
    console.log('─'.repeat(80));
    console.log(`Total Pages Found:           ${COLORS.bright}${this.stats.total}${COLORS.reset}`);
    console.log(`  ├─ In [locale] routes:     ${COLORS.green}${this.stats.withLocale}${COLORS.reset}`);
    console.log(`  └─ Outside [locale]:       ${COLORS.yellow}${this.stats.withoutLocale}${COLORS.reset}`);
    console.log();
    console.log(`Metadata Implementation:`);
    console.log(`  ├─ Dynamic (generateMetadata): ${COLORS.green}${this.stats.withDynamicMetadata}${COLORS.reset}`);
    console.log(`  ├─ Static (export metadata):   ${COLORS.yellow}${this.stats.withStaticMetadata}${COLORS.reset}`);
    console.log(`  └─ No metadata:                ${COLORS.red}${this.stats.noMetadata}${COLORS.reset}`);
    console.log();
    console.log(`Hreflang Status:`);
    console.log(`  ├─ With hreflang:    ${COLORS.green}${this.stats.withHreflang}${COLORS.reset}`);
    console.log(`  ├─ Without hreflang: ${COLORS.yellow}${this.stats.withoutHreflang}${COLORS.reset}`);
    console.log(`  └─ Needs hreflang:   ${COLORS.red}${this.stats.needsHreflang.length}${COLORS.reset}`);
    console.log();

    // Pages needing hreflang
    if (this.stats.needsHreflang.length > 0) {
      console.log(COLORS.bright + COLORS.red + '\n🚨 PAGES NEEDING HREFLANG' + COLORS.reset);
      console.log('─'.repeat(80));
      this.stats.needsHreflang.forEach((page, index) => {
        console.log(`\n${index + 1}. ${COLORS.bright}${page.routePath}${COLORS.reset}`);
        console.log(`   File: ${page.filePath}`);
        console.log(`   Reason: ${page.reason}`);
        console.log(`   Metadata Type: ${page.hasGenerateMetadata ? 'Dynamic' : page.hasStaticMetadata ? 'Static' : 'None'}`);
        console.log(`   Uses generateSEOMeta: ${page.usesGenerateSEOMeta ? COLORS.green + 'Yes' + COLORS.reset : COLORS.red + 'No' + COLORS.reset}`);
      });
      console.log();
    }

    // Errors
    if (this.stats.errors.length > 0) {
      console.log(COLORS.bright + COLORS.red + '\n⚠️  ERRORS & ISSUES' + COLORS.reset);
      console.log('─'.repeat(80));
      this.stats.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${COLORS.yellow}${error.path}${COLORS.reset}`);
        console.log(`   ${COLORS.red}${error.error}${COLORS.reset}`);
      });
      console.log();
    }

    // Pages with hreflang (success)
    console.log(COLORS.bright + COLORS.green + '\n✅ PAGES WITH HREFLANG' + COLORS.reset);
    console.log('─'.repeat(80));
    const pagesWithHreflang = this.pages.filter(p => p.hasHreflang);
    if (pagesWithHreflang.length > 0) {
      pagesWithHreflang.forEach((page, index) => {
        console.log(`${index + 1}. ${page.routePath} ${COLORS.cyan}(${page.filePath})${COLORS.reset}`);
      });
    } else {
      console.log(COLORS.yellow + 'No pages with hreflang found' + COLORS.reset);
    }
    console.log();

    // Detailed page list
    console.log(COLORS.bright + '\n📄 COMPLETE PAGE LIST' + COLORS.reset);
    console.log('─'.repeat(80));
    console.log(COLORS.bright + 'Route'.padEnd(40) + 'Locale'.padEnd(8) + 'Hreflang'.padEnd(10) + 'Metadata' + COLORS.reset);
    console.log('─'.repeat(80));
    
    this.pages.forEach(page => {
      const route = page.routePath.padEnd(40);
      const locale = (page.isLocaleRoute ? COLORS.green + '✓' : COLORS.red + '✗').padEnd(8 + 9);
      const hreflang = (page.hasHreflang ? COLORS.green + '✓' : COLORS.red + '✗').padEnd(10 + 9);
      const metadata = page.hasGenerateMetadata ? COLORS.green + 'Dynamic' : 
                       page.hasStaticMetadata ? COLORS.yellow + 'Static' : 
                       COLORS.red + 'None';
      
      console.log(route + locale + COLORS.reset + hreflang + COLORS.reset + metadata + COLORS.reset);
    });

    console.log('\n' + COLORS.bright + COLORS.cyan + '='.repeat(80) + COLORS.reset + '\n');

    // Action items
    console.log(COLORS.bright + COLORS.magenta + '📋 ACTION ITEMS' + COLORS.reset);
    console.log('─'.repeat(80));
    if (this.stats.needsHreflang.length > 0) {
      console.log(`${COLORS.red}${this.stats.needsHreflang.length}${COLORS.reset} pages need hreflang implementation:`);
      console.log('   1. Add locale and path params to generateSEOMeta() calls');
      console.log('   2. Convert static metadata to generateMetadata() function');
      console.log('   3. Import and use Locale type from @/i18n');
    }
    if (this.stats.errors.length > 0) {
      console.log(`\n${COLORS.red}${this.stats.errors.length}${COLORS.reset} errors need fixing`);
    }
    if (this.stats.needsHreflang.length === 0 && this.stats.errors.length === 0) {
      console.log(COLORS.green + '✅ All pages are properly configured!' + COLORS.reset);
    }
    console.log();
  }

  async run() {
    console.log(COLORS.cyan + '\n🔍 Analyzing pages in app directory...\n' + COLORS.reset);
    await this.findPages(appDir);
    this.printReport();
  }
}

// Run the analyzer
const analyzer = new PageAnalyzer();
analyzer.run().catch(console.error);
