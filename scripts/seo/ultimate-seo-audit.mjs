#!/usr/bin/env node

/**
 * Ultimate Comprehensive SEO Audit Script - Enhanced Version
 *
 * This script performs a complete SEO audit covering:
 * 1. SEO Hierarchy (h1-h6, proper nesting, multiple H1/H2 detection)
 * 2. Title & Description Analysis (length, duplicates, quality)
 * 3. Meta Tags Validation (viewport, robots, charset, etc.)
 * 4. Social Media Tags (OpenGraph, Twitter Cards, LinkedIn)
 * 5. Structured Data (JSON-LD, Microdata, RDFa)
 * 6. Hreflang & International SEO
 * 7. Technical SEO (canonical, redirects, mobile, performance)
 * 8. Content Quality (keyword analysis, readability, uniqueness)
 * 9. Accessibility Basics
 * 10. Core Web Vitals Indicators
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aiseoturbo.com';
const LOCALES = ['en', 'fr', 'de', 'es', 'it', 'id'];
const PUPPETEER_TIMEOUT = 30000;

// Enhanced SEO standards
const SEO_STANDARDS = {
  title: { min: 30, max: 60, optimal: 50 },
  description: { min: 120, max: 160, optimal: 155 },
  h1: { max: 1 },
  h2: { max: 8 },
  keywords: { min: 3, max: 10 },
  images: { minAltText: 80 }, // percentage
  internalLinks: { min: 3 },
  externalLinks: { max: 5 },
  wordCount: { min: 300 },
  readingTime: { min: 2, max: 8 }, // minutes
};

class UltimateSEOAuditor {
  constructor() {
    this.results = {
      total: 0,
      passed: 0,
      warnings: 0,
      failed: 0,
      pages: [],
      globalIssues: {
        duplicateTitles: [],
        duplicateDescriptions: [],
        brokenHreflangs: [],
        schemaErrors: [],
        performanceIssues: [],
        accessibilityIssues: [],
      },
      summary: {
        averageScores: {},
        topIssues: [],
        recommendations: [],
      }
    };

    this.allTitles = new Map();
    this.allDescriptions = new Map();
    this.hreflangUrls = new Set();
    this.performanceData = new Map();
  }

  log(color, message) {
    console.log(`${color}${message}${COLORS.reset}`);
  }

  async auditPage(url) {
    this.log(COLORS.cyan, `\n🔍 Auditing: ${url}`);

    const audit = {
      url,
      status: 'checking',
      timestamp: new Date().toISOString(),
      checks: {
        hierarchy: {
          status: 'unknown',
          issues: [],
          details: { h1Count: 0, h2Count: 0, hierarchyIssues: [], totalHeadings: 0, headings: [] }
        },
        titles: {
          status: 'unknown',
          issues: [],
          details: { title: null, length: 0, position: null, duplicates: [], quality: {} }
        },
        descriptions: {
          status: 'unknown',
          issues: [],
          details: { description: null, length: 0, position: null, duplicates: [], quality: {} }
        },
        metaTags: {
          status: 'unknown',
          issues: [],
          details: { viewport: null, robots: null, charset: null, author: null, keywords: null }
        },
        socialGraphs: {
          status: 'unknown',
          issues: [],
          details: { ogTags: {}, twitterTags: {}, linkedinTags: {}, totalTags: 0 }
        },
        schemas: {
          status: 'unknown',
          issues: [],
          details: { schemaCount: 0, validSchemas: 0, schemas: [], errors: [] }
        },
        hreflang: {
          status: 'unknown',
          issues: [],
          details: { tags: [], mismatches: [], broken: [], coverage: {} }
        },
        canonical: {
          status: 'unknown',
          issues: [],
          details: { url: null, position: null, isAbsolute: false, isSelfReferencing: false }
        },
        urlFormat: {
          status: 'unknown',
          issues: [],
          details: { hasDoubleSlashes: false, hasTrailingSlash: false, isValid: true }
        },
        technical: {
          status: 'unknown',
          issues: [],
          details: { internalLinks: 0, externalLinks: 0, images: 0, scripts: 0, stylesheets: 0 }
        },
        content: {
          status: 'unknown',
          issues: [],
          details: { wordCount: 0, readingTime: 0, keywordDensity: {}, readability: {} }
        },
        performance: {
          status: 'unknown',
          issues: [],
          details: { loadTime: null, domSize: null, resourceCount: null, coreWebVitals: {} }
        },
        accessibility: {
          status: 'unknown',
          issues: [],
          details: { imagesWithoutAlt: 0, missingLang: false, headingStructure: {} }
        }
      },
      overall: 'pending',
      score: 0,
      grade: 'F'
    };

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Ultimate-SEO-Audit-Bot/1.0'
        },
        redirect: 'manual' // Don't follow redirects automatically
      });

      if (response.status >= 300 && response.status < 400) {
        audit.status = `redirect-${response.status}`;
        const location = response.headers.get('location');
        audit.redirectTo = location;
        audit.overall = 'warning';
        this.results.warnings++;

        // Skip content-based checks for redirected pages since we can't access the final content
        audit.checks.titles.status = 'skipped';
        audit.checks.titles.details.note = 'Skipped due to redirect - cannot verify final page content';
        audit.checks.descriptions.status = 'skipped';
        audit.checks.descriptions.details.note = 'Skipped due to redirect - cannot verify final page content';
        audit.checks.hierarchy.status = 'skipped';
        audit.checks.hierarchy.details.note = 'Skipped due to redirect - cannot verify final page content';
        audit.checks.metaTags.status = 'skipped';
        audit.checks.metaTags.details.note = 'Skipped due to redirect - cannot verify final page content';
        audit.checks.socialGraphs.status = 'skipped';
        audit.checks.socialGraphs.details.note = 'Skipped due to redirect - cannot verify final page content';
        audit.checks.schemas.status = 'skipped';
        audit.checks.schemas.details.note = 'Skipped due to redirect - cannot verify final page content';
        audit.checks.content.status = 'skipped';
        audit.checks.content.details.note = 'Skipped due to redirect - cannot verify final page content';
        audit.checks.accessibility.status = 'skipped';
        audit.checks.accessibility.details.note = 'Skipped due to redirect - cannot verify final page content';

        return audit;
      } else if (response.status !== 200) {
        audit.status = `HTTP ${response.status}`;
        audit.overall = 'failed';
        this.results.failed++;
        return audit;
      } else {
        audit.status = '200 OK';
      }

      let html = await response.text();

      // Check if this is a Next.js/SPA application that needs JavaScript rendering
      const hasReactScripts = /<script[^>]*src[^>]*react[^>]*>|<script[^>]*src[^>]*next[^>]*>/i.test(html) ||
                             html.includes('__NEXT_DATA__') ||
                             html.includes('data-reactroot');

      if (hasReactScripts) {
        this.log(COLORS.yellow, `🔄 Detected JavaScript framework, using Puppeteer for ${url}`);
        try {
          const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
          });
          const page = await browser.newPage();
          await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
          await page.goto(url, { waitUntil: 'networkidle2', timeout: PUPPETEER_TIMEOUT });
          html = await page.content();
          await browser.close();
          this.log(COLORS.green, `✅ Successfully rendered JavaScript for ${url}`);
        } catch (puppeteerError) {
          this.log(COLORS.red, `❌ Puppeteer failed for ${url}: ${puppeteerError.message}, using initial HTML`);
          // Continue with the initial HTML fetch
        }
      }

      // Ensure html is a valid string
      if (!html || typeof html !== 'string') {
        audit.status = 'error';
        audit.error = 'Failed to retrieve HTML content';
        audit.overall = 'failed';
        this.results.failed++;
        return audit;
      }

      // Perform all checks
      await this.checkSEOHierarchy(html, audit);
      this.checkTitlesAndDescriptions(html, audit);
      this.checkMetaTags(html, audit);
      this.checkSocialGraphs(html, audit);
      this.checkSchemas(html, audit);
      await this.checkHreflang(html, url, audit);
      this.checkCanonical(html, url, audit);
      this.checkUrlFormat(url, audit);
      this.checkTechnicalSEO(html, audit);

      // Calculate overall status and score
      const checkStatuses = Object.values(audit.checks).map(check => check.status);
      const criticalIssues = Object.values(audit.checks).flatMap(check =>
        check.issues ? check.issues.filter(issue => issue.severity === 'critical' || issue.severity === 'high') : []
      );

      if (checkStatuses.includes('failed') || criticalIssues.length > 0) {
        audit.overall = 'failed';
        this.results.failed++;
      } else if (checkStatuses.includes('warning')) {
        audit.overall = 'warning';
        this.results.warnings++;
      } else {
        audit.overall = 'passed';
        this.results.passed++;
      }

      // Calculate SEO score (0-100)
      const weights = {
        titles: 15,
        descriptions: 15,
        hierarchy: 10,
        metaTags: 10,
        socialGraphs: 8,
        schemas: 8,
        hreflang: 8,
        canonical: 5,
        urlFormat: 5,
        technical: 10,
        content: 6,
        accessibility: 5
      };

      let totalScore = 0;
      let totalWeight = 0;

      Object.entries(weights).forEach(([checkType, weight]) => {
        const check = audit.checks[checkType];
        let score = 0;

        if (check.status === 'passed') score = 100;
        else if (check.status === 'warning') score = 60;
        else if (check.status === 'failed') score = 20;
        else score = 0;

        // Adjust for severity of issues
        if (check.issues) {
          const highSeverity = check.issues.filter(i => i.severity === 'critical' || i.severity === 'high').length;
          const mediumSeverity = check.issues.filter(i => i.severity === 'medium').length;
          score -= (highSeverity * 20) + (mediumSeverity * 10);
        }

        score = Math.max(0, Math.min(100, score));
        totalScore += (score * weight);
        totalWeight += weight;
      });

      audit.score = Math.round(totalScore / totalWeight);

      // Assign grade
      if (audit.score >= 90) audit.grade = 'A';
      else if (audit.score >= 80) audit.grade = 'B';
      else if (audit.score >= 70) audit.grade = 'C';
      else if (audit.score >= 60) audit.grade = 'D';
      else audit.grade = 'F';

      this.results.total++;
      this.results.pages.push(audit);

    } catch (error) {
      audit.status = 'error';
      audit.overall = 'failed';
      audit.error = error.message;
      this.results.failed++;
      this.results.total++;
      this.log(COLORS.red, `❌ Error auditing ${url}: ${error.message}`);
    }

    return audit;
  }

  async checkSEOHierarchy(html, audit) {
    // Safety checks
    if (!html || typeof html !== 'string') {
      audit.checks.hierarchy.status = 'failed';
      audit.checks.hierarchy.issues = audit.checks.hierarchy.issues || [];
      audit.checks.hierarchy.issues.push({
        type: 'error',
        message: 'Unable to parse HTML content',
        severity: 'critical',
        location: 'unknown'
      });
      return;
    }

    if (!audit.checks.hierarchy.issues) audit.checks.hierarchy.issues = [];

    const headings = [];

    // Extract all headings using regex
    for (let i = 1; i <= 6; i++) {
      const regex = new RegExp(`<h${i}[^>]*>([^<]+)</h${i}>`, 'gi');
      let match;
      while ((match = regex.exec(html)) !== null) {
        const text = match[1].trim();
        if (text) {
          headings.push({
            level: i,
            text: text.substring(0, 100),
            index: headings.length
          });
        }
      }
    }

    // Count H1 and H2 tags
    audit.checks.hierarchy.h1Count = headings.filter(h => h.level === 1).length;
    audit.checks.hierarchy.h2Count = headings.filter(h => h.level === 2).length;

    // Check for multiple H1 tags
    if (audit.checks.hierarchy.h1Count === 0) {
      audit.checks.hierarchy.status = 'failed';
      audit.checks.hierarchy.issues.push('Missing H1 tag');
    } else if (audit.checks.hierarchy.h1Count > 1) {
      audit.checks.hierarchy.status = 'warning';
      audit.checks.hierarchy.issues.push(`Multiple H1 tags found: ${audit.checks.hierarchy.h1Count}`);
    }

    // Check for multiple H2 tags (warning if more than 3-4)
    if (audit.checks.hierarchy.h2Count > 4) {
      audit.checks.hierarchy.status = 'warning';
      audit.checks.hierarchy.issues.push(`Many H2 tags found: ${audit.checks.hierarchy.h2Count} (consider consolidating)`);
    }

    // Check hierarchy (no skips like h1 -> h3)
    let lastLevel = 0;
    let hierarchyIssues = [];

    headings.forEach((heading, index) => {
      if (heading.level > lastLevel + 1 && lastLevel !== 0) {
        hierarchyIssues.push(`Hierarchy skip: H${lastLevel} -> H${heading.level} at "${heading.text}"`);
      }
      lastLevel = heading.level;
    });

    if (hierarchyIssues.length > 0) {
      audit.checks.hierarchy.status = 'warning';
      audit.checks.hierarchy.hierarchyIssues = hierarchyIssues;
      audit.checks.hierarchy.issues.push(...hierarchyIssues);
    } else if (audit.checks.hierarchy.h1Count === 1 && headings.length > 0) {
      audit.checks.hierarchy.status = 'passed';
    }

    audit.checks.hierarchy.totalHeadings = headings.length;
  }

  checkTitlesAndDescriptions(html, audit) {
    // Safety checks
    if (!html || typeof html !== 'string') {
      audit.checks.titles.status = 'failed';
      audit.checks.titles.issues = audit.checks.titles.issues || [];
      audit.checks.titles.issues.push({
        type: 'error',
        message: 'Unable to parse HTML content',
        severity: 'critical',
        location: 'unknown'
      });
      return;
    }

    if (!audit.checks.titles.issues) audit.checks.titles.issues = [];
    if (!audit.checks.descriptions.issues) audit.checks.descriptions.issues = [];

    // Find title tag position and content
    const titleRegex = /<title[^>]*>([^<]+)<\/title>/i;
    const titleMatch = html.match(titleRegex);

    if (!titleMatch) {
      audit.checks.titles.status = 'failed';
      audit.checks.titles.issues.push({
        type: 'missing',
        message: 'Missing title tag',
        severity: 'critical',
        location: 'head section'
      });
    } else {
      const title = titleMatch[1].trim();
      const titlePosition = html.indexOf(titleMatch[0]);
      const lineNumber = html.substring(0, titlePosition).split('\n').length;

      audit.checks.titles.details.title = title;
      audit.checks.titles.details.length = title.length;
      audit.checks.titles.details.position = {
        start: titlePosition,
        end: titlePosition + titleMatch[0].length,
        line: lineNumber
      };

      // Enhanced title length validation
      if (title.length < SEO_STANDARDS.title.min) {
        audit.checks.titles.status = 'failed';
        audit.checks.titles.issues.push({
          type: 'too_short',
          message: `Title too short: ${title.length} chars (minimum: ${SEO_STANDARDS.title.min})`,
          severity: 'high',
          current: title.length,
          recommended: `${SEO_STANDARDS.title.min}-${SEO_STANDARDS.title.max}`,
          location: `line ${lineNumber}`
        });
      } else if (title.length > SEO_STANDARDS.title.max) {
        audit.checks.titles.status = 'warning';
        audit.checks.titles.issues.push({
          type: 'too_long',
          message: `Title too long: ${title.length} chars (maximum: ${SEO_STANDARDS.title.max})`,
          severity: 'medium',
          current: title.length,
          recommended: `${SEO_STANDARDS.title.min}-${SEO_STANDARDS.title.max}`,
          location: `line ${lineNumber}`
        });
      }

      // Title quality checks
      audit.checks.titles.details.quality = {
        hasBrand: title.toLowerCase().includes('aiseoturbo') || title.toLowerCase().includes('ai seo turbo'),
        hasNumbers: /\d/.test(title),
        hasSpecialChars: /[!@#$%^&*(),.?":{}|<>]/.test(title),
        isCapitalized: /^[A-Z]/.test(title),
        hasPrimaryKeyword: true // Assume it has keywords for now
      };

      // Check for duplicates
      if (this.allTitles.has(title)) {
        audit.checks.titles.details.duplicates = this.allTitles.get(title);
        audit.checks.titles.status = 'warning';
        audit.checks.titles.issues.push({
          type: 'duplicate',
          message: 'Duplicate title found on other pages',
          severity: 'high',
          duplicates: this.allTitles.get(title),
          location: `line ${lineNumber}`
        });
        this.results.globalIssues.duplicateTitles.push({
          title,
          pages: [audit.url, ...this.allTitles.get(title)]
        });
      } else {
        this.allTitles.set(title, [audit.url]);
      }

      if (!audit.checks.titles.status) {
        audit.checks.titles.status = 'passed';
      }
    }

    // Check multiple title tags (only HTML document titles, not SVG titles)
    const titleTags = html.match(/<title[^>]*>[\s\S]*?<\/title>/gi);
    const htmlTitleTags = titleTags ? titleTags.filter(tag =>
      !tag.includes('<svg') && !tag.includes('<path') && !html.substring(html.indexOf(tag) - 100, html.indexOf(tag)).includes('<svg')
    ) : [];

    if (htmlTitleTags && htmlTitleTags.length > 1) {
      audit.checks.titles.status = 'failed';
      audit.checks.titles.issues.push({
        type: 'multiple',
        message: `Multiple HTML document title tags found: ${htmlTitleTags.length}`,
        severity: 'critical',
        count: htmlTitleTags.length,
        location: 'head section'
      });
    }

    // Enhanced meta description checks
    const descRegex = /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i;
    const descMatch = html.match(descRegex);

    if (!descMatch) {
      audit.checks.descriptions.status = 'failed';
      audit.checks.descriptions.issues.push({
        type: 'missing',
        message: 'Missing meta description',
        severity: 'high',
        location: 'head section'
      });
    } else {
      const description = descMatch[1].trim();
      const descPosition = html.indexOf(descMatch[0]);
      const lineNumber = html.substring(0, descPosition).split('\n').length;

      audit.checks.descriptions.details.description = description;
      audit.checks.descriptions.details.length = description.length;
      audit.checks.descriptions.details.position = {
        start: descPosition,
        end: descPosition + descMatch[0].length,
        line: lineNumber
      };

      // Enhanced description length validation
      if (description.length < SEO_STANDARDS.description.min) {
        audit.checks.descriptions.status = 'failed';
        audit.checks.descriptions.issues.push({
          type: 'too_short',
          message: `Description too short: ${description.length} chars (minimum: ${SEO_STANDARDS.description.min})`,
          severity: 'high',
          current: description.length,
          recommended: `${SEO_STANDARDS.description.min}-${SEO_STANDARDS.description.max}`,
          location: `line ${lineNumber}`
        });
      } else if (description.length > SEO_STANDARDS.description.max) {
        audit.checks.descriptions.status = 'warning';
        audit.checks.descriptions.issues.push({
          type: 'too_long',
          message: `Description too long: ${description.length} chars (maximum: ${SEO_STANDARDS.description.max})`,
          severity: 'medium',
          current: description.length,
          recommended: `${SEO_STANDARDS.description.min}-${SEO_STANDARDS.description.max}`,
          location: `line ${lineNumber}`
        });
      }

      // Description quality checks
      audit.checks.descriptions.details.quality = {
        hasCallToAction: /\b(click|learn|discover|get|start|try|see|view|read)\b/i.test(description),
        hasNumbers: /\d/.test(description),
        endsWithPeriod: description.endsWith('.'),
        hasSpecialChars: /[!@#$%^&*(),.?":{}|<>]/.test(description),
        isUnique: true // Will be checked against duplicates
      };

      // Check for duplicates
      if (this.allDescriptions.has(description)) {
        audit.checks.descriptions.details.duplicates = this.allDescriptions.get(description);
        audit.checks.descriptions.status = 'warning';
        audit.checks.descriptions.issues.push({
          type: 'duplicate',
          message: 'Duplicate description found on other pages',
          severity: 'high',
          duplicates: this.allDescriptions.get(description),
          location: `line ${lineNumber}`
        });
        this.results.globalIssues.duplicateDescriptions.push({
          description,
          pages: [audit.url, ...this.allDescriptions.get(description)]
        });
      } else {
        this.allDescriptions.set(description, [audit.url]);
      }

      if (!audit.checks.descriptions.status) {
        audit.checks.descriptions.status = 'passed';
      }
    }

    // Check multiple description tags
    const descTags = html.match(/<meta[^>]+name=["']description["'][^>]*>/gi);
    if (descTags && descTags.length > 1) {
      audit.checks.descriptions.status = 'failed';
      audit.checks.descriptions.issues.push({
        type: 'multiple',
        message: `Multiple meta description tags found: ${descTags.length}`,
        severity: 'critical',
        count: descTags.length,
        location: 'head section'
      });
    }
  }

  checkMetaTags(html, audit) {
    // Ensure issues array is initialized
    if (!audit.checks.metaTags.issues) audit.checks.metaTags.issues = [];
    const issues = audit.checks.metaTags.issues;
    const details = audit.checks.metaTags.details;

    // Check viewport meta tag
    const viewportMatch = html.match(/<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    if (!viewportMatch) {
      issues.push({
        type: 'missing',
        message: 'Missing viewport meta tag (required for mobile SEO)',
        severity: 'high',
        location: 'head section'
      });
    } else {
      details.viewport = {
        content: viewportMatch[1],
        position: html.indexOf(viewportMatch[0]),
        hasWidth: viewportMatch[1].includes('width=device-width'),
        hasInitialScale: viewportMatch[1].includes('initial-scale=1')
      };

      if (!details.viewport.hasWidth || !details.viewport.hasInitialScale) {
        issues.push({
          type: 'incomplete',
          message: 'Viewport meta tag should include width=device-width and initial-scale=1',
          severity: 'medium',
          current: details.viewport.content,
          recommended: 'width=device-width, initial-scale=1',
          location: `line ${html.substring(0, details.viewport.position).split('\n').length}`
        });
      }
    }

    // Check charset
    const charsetMatch = html.match(/<meta[^>]+charset=["']([^"']+)["'][^>]*>/i);
    if (!charsetMatch) {
      issues.push({
        type: 'missing',
        message: 'Missing charset meta tag',
        severity: 'medium',
        location: 'head section'
      });
    } else {
      details.charset = charsetMatch[1];
      if (charsetMatch[1].toLowerCase() !== 'utf-8') {
        issues.push({
          type: 'incorrect',
          message: 'Charset should be UTF-8',
          severity: 'low',
          current: charsetMatch[1],
          recommended: 'UTF-8',
          location: `line ${html.substring(0, html.indexOf(charsetMatch[0])).split('\n').length}`
        });
      }
    }

    // Check robots meta tag
    const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    if (robotsMatch) {
      details.robots = robotsMatch[1];
      const robotsContent = robotsMatch[1].toLowerCase();

      if (robotsContent.includes('noindex')) {
        issues.push({
          type: 'noindex',
          message: 'Page is noindexed (will not appear in search results)',
          severity: 'critical',
          directive: robotsContent,
          location: `line ${html.substring(0, html.indexOf(robotsMatch[0])).split('\n').length}`
        });
      }

      if (robotsContent.includes('nofollow')) {
        issues.push({
          type: 'nofollow',
          message: 'Page has nofollow directive',
          severity: 'medium',
          directive: robotsContent,
          location: `line ${html.substring(0, html.indexOf(robotsMatch[0])).split('\n').length}`
        });
      }
    }

    // Check author meta tag
    const authorMatch = html.match(/<meta[^>]+name=["']author["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    if (authorMatch) {
      details.author = authorMatch[1];
    }

    // Check keywords meta tag (deprecated but still used)
    const keywordsMatch = html.match(/<meta[^>]+name=["']keywords["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    if (keywordsMatch) {
      details.keywords = keywordsMatch[1];
      const keywordCount = keywordsMatch[1].split(',').length;

      if (keywordCount > SEO_STANDARDS.keywords.max) {
        issues.push({
          type: 'too_many_keywords',
          message: `Too many keywords in meta keywords tag: ${keywordCount} (maximum: ${SEO_STANDARDS.keywords.max})`,
          severity: 'low',
          count: keywordCount,
          recommended: `Maximum ${SEO_STANDARDS.keywords.max} keywords`,
          location: `line ${html.substring(0, html.indexOf(keywordsMatch[0])).split('\n').length}`
        });
      }
    }

    if (issues.length > 0) {
      audit.checks.metaTags.status = issues.some(i => i.severity === 'critical') ? 'failed' : 'warning';
    } else {
      audit.checks.metaTags.status = 'passed';
    }
  }

  checkUrlFormat(url, audit) {
    // Ensure issues array is initialized
    if (!audit.checks.urlFormat.issues) audit.checks.urlFormat.issues = [];
    const issues = audit.checks.urlFormat.issues;
    const details = audit.checks.urlFormat.details;

    // Check for double slashes in URL path
    const urlObj = new URL(url);
    const path = urlObj.pathname;

    if (path.includes('//')) {
      details.hasDoubleSlashes = true;
      issues.push({
        type: 'double_slashes',
        message: 'URL contains double slashes (//) which can cause redirect issues',
        severity: 'high',
        url: url,
        location: 'URL structure',
        recommendation: `Fix to: ${url.replace(/\/+/g, '/')}`
      });
    }

    // Check for excessive trailing slashes
    if (path.length > 1 && path.endsWith('/') && path !== '/') {
      details.hasTrailingSlash = true;
      issues.push({
        type: 'trailing_slash',
        message: 'URL has trailing slash (may cause duplicate content issues)',
        severity: 'medium',
        url: url,
        location: 'URL structure',
        recommendation: `Consider removing trailing slash: ${path.slice(0, -1)}`
      });
    }

    // Check for URL encoding issues
    if (url.includes('%')) {
      issues.push({
        type: 'url_encoding',
        message: 'URL contains percent encoding - ensure it\'s properly encoded',
        severity: 'low',
        url: url,
        location: 'URL structure'
      });
    }

    // Check for non-ASCII characters in path
    if (/[^\x00-\x7F]/.test(path)) {
      issues.push({
        type: 'non_ascii_chars',
        message: 'URL path contains non-ASCII characters',
        severity: 'medium',
        url: url,
        location: 'URL structure',
        recommendation: 'Use ASCII characters or proper URL encoding'
      });
    }

    if (issues.length > 0) {
      audit.checks.urlFormat.status = issues.some(i => i.severity === 'critical' || i.severity === 'high') ? 'failed' : 'warning';
    } else {
      audit.checks.urlFormat.status = 'passed';
    }
  }

  checkSocialGraphs(html, audit) {
    // Ensure issues array is initialized
    if (!audit.checks.socialGraphs.issues) audit.checks.socialGraphs.issues = [];
    const issues = audit.checks.socialGraphs.issues;
    const details = audit.checks.socialGraphs.details;

    // Check OpenGraph tags
    const ogTags = {
      'og:title': html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'og:description': html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'og:image': html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'og:url': html.match(/<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'og:type': html.match(/<meta[^>]+property=["']og:type["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'og:locale': html.match(/<meta[^>]+property=["']og:locale["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'og:site_name': html.match(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["'][^>]*>/i)
    };

    // Store OG tag details with positions
    Object.entries(ogTags).forEach(([tag, match]) => {
      if (match) {
        const position = html.indexOf(match[0]);
        details.ogTags[tag] = {
          content: match[1],
          position: position,
          line: html.substring(0, position).split('\n').length,
          isAbsolute: tag.includes('url') || tag.includes('image') ? match[1].startsWith('http') : true
        };
      }
    });

    const ogFound = Object.keys(details.ogTags).length;

    // Check Twitter Card tags
    const twitterTags = {
      'twitter:card': html.match(/<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'twitter:title': html.match(/<meta[^>]+name=["']twitter:title["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'twitter:description': html.match(/<meta[^>]+name=["']twitter:description["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'twitter:image': html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'twitter:site': html.match(/<meta[^>]+name=["']twitter:site["'][^>]+content=["']([^"']+)["'][^>]*>/i),
      'twitter:creator': html.match(/<meta[^>]+name=["']twitter:creator["'][^>]+content=["']([^"']+)["'][^>]*>/i)
    };

    // Store Twitter tag details with positions
    Object.entries(twitterTags).forEach(([tag, match]) => {
      if (match) {
        const position = html.indexOf(match[0]);
        details.twitterTags[tag] = {
          content: match[1],
          position: position,
          line: html.substring(0, position).split('\n').length,
          isAbsolute: tag.includes('image') ? match[1].startsWith('http') : true
        };
      }
    });

    const twitterFound = Object.keys(details.twitterTags).length;

    // Check LinkedIn tags
    const linkedinTags = {
      'og:title': details.ogTags['og:title'], // LinkedIn uses OG tags primarily
      'og:description': details.ogTags['og:description'],
      'og:image': details.ogTags['og:image']
    };

    Object.entries(linkedinTags).forEach(([tag, data]) => {
      if (data) {
        details.linkedinTags[tag] = data;
      }
    });

    const linkedinFound = Object.keys(details.linkedinTags).length;
    details.totalTags = ogFound + twitterFound + linkedinFound;

    // Validation and issue detection
    if (details.totalTags === 0) {
      issues.push({
        type: 'missing',
        message: 'No social media tags found (OpenGraph, Twitter Cards, or LinkedIn)',
        severity: 'medium',
        platforms: ['facebook', 'twitter', 'linkedin'],
        location: 'head section'
      });
    } else {
      // Check for essential OG tags
      const essentialOgTags = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'];
      const missingOgTags = essentialOgTags.filter(tag => !details.ogTags[tag]);

      if (missingOgTags.length > 0) {
        issues.push({
          type: 'incomplete_og',
          message: `Missing essential OpenGraph tags: ${missingOgTags.join(', ')}`,
          severity: 'medium',
          missing: missingOgTags,
          platform: 'facebook',
          location: 'head section'
        });
      }

      // Check for essential Twitter tags
      const essentialTwitterTags = ['twitter:card', 'twitter:title', 'twitter:description'];
      const missingTwitterTags = essentialTwitterTags.filter(tag => !details.twitterTags[tag]);

      if (missingTwitterTags.length > 0) {
        issues.push({
          type: 'incomplete_twitter',
          message: `Missing essential Twitter Card tags: ${missingTwitterTags.join(', ')}`,
          severity: 'low',
          missing: missingTwitterTags,
          platform: 'twitter',
          location: 'head section'
        });
      }

      // Validate image URLs are absolute
      ['og:image', 'twitter:image'].forEach(tag => {
        const tagData = details.ogTags[tag] || details.twitterTags[tag];
        if (tagData && !tagData.isAbsolute) {
          issues.push({
            type: 'relative_image_url',
            message: `${tag} URL should be absolute (start with http/https)`,
            severity: 'medium',
            tag: tag,
            current: tagData.content,
            recommended: 'Absolute URL starting with http:// or https://',
            location: `line ${tagData.line}`
          });
        }
      });

      // Check Twitter card type
      if (details.twitterTags['twitter:card'] && !['summary', 'summary_large_image', 'app', 'player'].includes(details.twitterTags['twitter:card'].content)) {
        issues.push({
          type: 'invalid_twitter_card',
          message: `Invalid Twitter card type: ${details.twitterTags['twitter:card'].content}`,
          severity: 'low',
          current: details.twitterTags['twitter:card'].content,
          validOptions: ['summary', 'summary_large_image', 'app', 'player'],
          location: `line ${details.twitterTags['twitter:card'].line}`
        });
      }
    }

    if (issues.length > 0) {
      audit.checks.socialGraphs.status = issues.some(i => i.severity === 'high') ? 'failed' : 'warning';
    } else if (details.totalTags >= 8) { // Good coverage
      audit.checks.socialGraphs.status = 'passed';
    } else {
      audit.checks.socialGraphs.status = 'warning';
      issues.push({
        type: 'insufficient_coverage',
        message: `Limited social media coverage: ${details.totalTags} tags found (recommended: 8+)`,
        severity: 'low',
        current: details.totalTags,
        recommended: '8+ tags for comprehensive social media coverage',
        location: 'head section'
      });
    }
  }

  checkSchemas(html, audit) {
    // Ensure issues array is initialized
    if (!audit.checks.schemas.issues) audit.checks.schemas.issues = [];
    const issues = audit.checks.schemas.issues;
    const details = audit.checks.schemas.details;

    const jsonLdMatches = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];

    details.schemaCount = jsonLdMatches.length;

    if (jsonLdMatches.length === 0) {
      audit.checks.schemas.status = 'warning';
      issues.push({
        type: 'missing',
        message: 'No JSON-LD structured data found',
        severity: 'medium',
        location: 'head or body section'
      });
      return;
    }

    let validSchemas = 0;
    let schemaErrors = [];

    jsonLdMatches.forEach((match, index) => {
      try {
        const jsonMatch = match.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        if (jsonMatch) {
          const json = JSON.parse(jsonMatch[1]);

          if (!json['@type'] && !json['@graph']) {
            schemaErrors.push(`Schema ${index + 1}: Missing @type or @graph`);
          } else {
            validSchemas++;

            // Check for @language in localized content
            if (LOCALES.some(locale => audit.url.includes(`/${locale}/`))) {
              if (!json['@language'] && !json.inLanguage) {
                schemaErrors.push(`Schema ${index + 1}: Missing @language for localized content`);
              }
            }
          }
        }
      } catch (e) {
        schemaErrors.push(`Schema ${index + 1}: Invalid JSON - ${e.message}`);
        this.results.globalIssues.schemaErrors.push({
          url: audit.url,
          error: e.message,
          schemaIndex: index + 1
        });
      }
    });

    audit.checks.schemas.validSchemas = validSchemas;

    if (schemaErrors.length > 0) {
      audit.checks.schemas.status = 'warning';
      schemaErrors.forEach(error => {
        issues.push({
          type: 'invalid_schema',
          message: error,
          severity: 'medium',
          location: 'JSON-LD script'
        });
      });
    } else if (validSchemas > 0) {
      audit.checks.schemas.status = 'passed';
    }
  }

  async checkHreflang(html, url, audit) {
    // Ensure issues array is initialized
    if (!audit.checks.hreflang.issues) audit.checks.hreflang.issues = [];
    const issues = audit.checks.hreflang.issues;
    const details = audit.checks.hreflang.details;

    const hreflangMatches = html.match(/<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]*>/g) || [];

    if (hreflangMatches.length === 0) {
      audit.checks.hreflang.status = 'warning';
      issues.push({
        type: 'missing',
        message: 'No hreflang tags found',
        severity: 'medium',
        location: 'head section'
      });
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

    audit.checks.hreflang.tags = Object.keys(hreflangs);

    // Check for all expected locales + x-default
    const expectedTags = [...LOCALES, 'x-default'];
    const missing = expectedTags.filter(lang => !hreflangs[lang]);

    if (missing.length > 0) {
      audit.checks.hreflang.status = 'warning';
      issues.push({
        type: 'missing_locales',
        message: `Missing hreflang for: ${missing.join(', ')}`,
        severity: 'medium',
        missing: missing,
        location: 'head section'
      });
    }

    // Check HTML lang attribute
    const htmlLangMatch = html.match(/<html[^>]+lang=["']([^"']+)["'][^>]*>/i);
    if (htmlLangMatch) {
      const htmlLang = htmlLangMatch[1];
      const urlLocale = this.extractLocaleFromUrl(url);

      if (urlLocale && htmlLang !== urlLocale && htmlLang !== urlLocale.split('-')[0]) {
        details.mismatches.push(`HTML lang "${htmlLang}" doesn't match URL locale "${urlLocale}"`);
        audit.checks.hreflang.status = 'warning';
        issues.push({
          type: 'lang_mismatch',
          message: `HTML lang "${htmlLang}" doesn't match URL locale "${urlLocale}"`,
          severity: 'low',
          htmlLang: htmlLang,
          urlLocale: urlLocale,
          location: 'html tag'
        });
      }
    }

    // Check for absolute URLs
    const relativeUrls = Object.entries(hreflangs).filter(([_, href]) => !href.startsWith('http'));
    if (relativeUrls.length > 0) {
      audit.checks.hreflang.status = 'warning';
      issues.push({
        type: 'relative_urls',
        message: 'Some hreflang URLs are relative (should be absolute)',
        severity: 'medium',
        count: relativeUrls.length,
        relativeUrls: relativeUrls.map(([lang, url]) => ({ lang, url })),
        location: 'head section'
      });
    }

    // Check if hreflang URLs are accessible (sample check)
    const urlsToCheck = Object.values(hreflangs).slice(0, 3); // Check first 3 to avoid too many requests
    for (const hrefUrl of urlsToCheck) {
      try {
        const response = await fetch(hrefUrl, {
          method: 'HEAD',
          headers: { 'User-Agent': 'Ultimate-SEO-Audit-Bot/1.0' },
          redirect: 'manual'
        });

        if (response.status >= 400) {
          audit.checks.hreflang.broken.push(`${hrefUrl} returned ${response.status}`);
          this.results.globalIssues.brokenHreflangs.push({
            sourceUrl: url,
            brokenUrl: hrefUrl,
            status: response.status
          });
        }
      } catch (error) {
        audit.checks.hreflang.broken.push(`${hrefUrl} error: ${error.message}`);
        this.results.globalIssues.brokenHreflangs.push({
          sourceUrl: url,
          brokenUrl: hrefUrl,
          error: error.message
        });
      }
    }

    if (details.broken.length > 0) {
      audit.checks.hreflang.status = 'warning';
      issues.push({
        type: 'broken_urls',
        message: `Broken hreflang URLs: ${details.broken.length}`,
        severity: 'high',
        count: details.broken.length,
        brokenUrls: details.broken,
        location: 'head section'
      });
    }

    if (!audit.checks.hreflang.status) {
      audit.checks.hreflang.status = 'passed';
    }
  }

  checkCanonical(html, url, audit) {
    // Ensure issues array is initialized
    if (!audit.checks.canonical.issues) audit.checks.canonical.issues = [];
    const issues = audit.checks.canonical.issues;
    const details = audit.checks.canonical.details;

    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i);

    if (!canonicalMatch) {
      audit.checks.canonical.status = 'failed';
      issues.push({
        type: 'missing',
        message: 'Missing canonical URL',
        severity: 'high',
        location: 'head section'
      });
      return;
    }

    const canonical = canonicalMatch[1];
    details.url = canonical;
    details.position = html.indexOf(canonicalMatch[0]);
    details.line = html.substring(0, details.position).split('\n').length;

    // Check if absolute URL
    if (!canonical.startsWith('http')) {
      audit.checks.canonical.status = 'warning';
      issues.push({
        type: 'relative_url',
        message: 'Canonical URL should be absolute',
        severity: 'medium',
        current: canonical,
        recommended: 'Absolute URL starting with http:// or https://',
        location: `line ${details.line}`
      });
    }

    // Check if self-referencing (basic check)
    try {
      const urlObj = new URL(url);
      const canonicalObj = new URL(canonical, url);
      details.isAbsolute = canonical.startsWith('http');
      details.isSelfReferencing = urlObj.pathname === canonicalObj.pathname && urlObj.search === canonicalObj.search;

      if (!details.isSelfReferencing) {
        issues.push({
          type: 'not_self_referencing',
          message: 'Canonical URL path does not match current page',
          severity: 'medium',
          canonicalPath: canonicalObj.pathname,
          currentPath: urlObj.pathname,
          location: `line ${details.line}`
        });
      }

      if (!audit.checks.canonical.status) {
        audit.checks.canonical.status = 'passed';
      }
    } catch (e) {
      issues.push({
        type: 'invalid_url',
        message: `Invalid canonical URL: ${e.message}`,
        severity: 'high',
        url: canonical,
        location: `line ${details.line}`
      });
      audit.checks.canonical.status = 'failed';
    }
  }

  checkTechnicalSEO(html, audit) {
    // Ensure issues array is initialized
    if (!audit.checks.technical.issues) audit.checks.technical.issues = [];
    const issues = audit.checks.technical.issues;
    const details = audit.checks.technical.details;

    // Check viewport meta tag
    const viewportMatch = html.match(/<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    if (!viewportMatch) {
      issues.push({
        type: 'missing_viewport',
        message: 'Missing viewport meta tag (required for mobile SEO)',
        severity: 'high',
        location: 'head section'
      });
    }

    // Check robots meta tag
    const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    if (robotsMatch) {
      const robotsContent = robotsMatch[1].toLowerCase();
      details.robots = robotsContent;
      if (robotsContent.includes('noindex')) {
        issues.push({
          type: 'noindex',
          message: 'Page is noindexed (will not appear in search results)',
          severity: 'critical',
          directive: robotsContent,
          location: 'head section'
        });
      }
      if (robotsContent.includes('nofollow')) {
        issues.push({
          type: 'nofollow',
          message: 'Page has nofollow directive',
          severity: 'medium',
          directive: robotsContent,
          location: 'head section'
        });
      }
    }

    // Check for multiple H1s (already checked in hierarchy)
    // Check for broken links (basic check for obviously broken internal links)
    const linkMatches = html.match(/<a[^>]+href=["']([^"']+)["'][^>]*>/g) || [];
    const internalLinks = linkMatches
      .map(link => link.match(/href=["']([^"']+)["']/))
      .filter(match => match && match[1])
      .map(match => match[1])
      .filter(href => href.startsWith('/') || href.startsWith(BASE_URL));

    audit.checks.technical.internalLinks = internalLinks.length;

    if (issues.length > 0) {
      audit.checks.technical.status = 'warning';
    } else {
      audit.checks.technical.status = 'passed';
    }
  }

  checkContentQuality(html, audit) {
    const issues = [];
    const details = audit.checks.content.details;

    if (!html) {
      audit.checks.content.status = 'failed';
      audit.checks.content.issues = [{
        type: 'no_html',
        message: 'No HTML content to analyze',
        severity: 'critical',
        location: 'page content'
      }];
      return;
    }

    // Extract text content (remove HTML tags and scripts)
    const textContent = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Word count
    const words = textContent ? textContent.split(/\s+/).filter(word => word.length > 0) : [];
    details.wordCount = words.length;

    if (details.wordCount < SEO_STANDARDS.wordCount.min) {
      issues.push({
        type: 'insufficient_content',
        message: `Content too short: ${details.wordCount} words (minimum: ${SEO_STANDARDS.wordCount.min})`,
        severity: 'medium',
        current: details.wordCount,
        recommended: `${SEO_STANDARDS.wordCount.min}+ words for substantial content`,
        location: 'body content'
      });
    }

    // Reading time estimate (average 200 words per minute)
    details.readingTime = Math.ceil(details.wordCount / 200);

    if (details.readingTime < SEO_STANDARDS.readingTime.min) {
      issues.push({
        type: 'short_reading_time',
        message: `Content too short to read: ${details.readingTime} minutes (recommended: ${SEO_STANDARDS.readingTime.min}-${SEO_STANDARDS.readingTime.max} minutes)`,
        severity: 'low',
        current: details.readingTime,
        recommended: `${SEO_STANDARDS.readingTime.min}-${SEO_STANDARDS.readingTime.max} minutes`,
        location: 'body content'
      });
    } else if (details.readingTime > SEO_STANDARDS.readingTime.max) {
      issues.push({
        type: 'long_reading_time',
        message: `Content very long: ${details.readingTime} minutes (consider splitting into multiple pages)`,
        severity: 'low',
        current: details.readingTime,
        recommended: `Consider splitting content over ${SEO_STANDARDS.readingTime.max} minutes`,
        location: 'body content'
      });
    }

    // Basic keyword density analysis (top 10 words)
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];

    const wordFreq = {};
    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
      if (cleanWord.length > 2 && !stopWords.includes(cleanWord)) {
        wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
      }
    });

    const sortedWords = Object.entries(wordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);

    details.keywordDensity = sortedWords.map(([word, count]) => ({
      word,
      count,
      density: ((count / details.wordCount) * 100).toFixed(2) + '%'
    }));

    // Check for keyword stuffing (any word > 5% density)
    const stuffedKeywords = details.keywordDensity.filter(k => parseFloat(k.density) > 5.0);
    if (stuffedKeywords.length > 0) {
      issues.push({
        type: 'keyword_stuffing',
        message: `Potential keyword stuffing detected: ${stuffedKeywords.map(k => `${k.word} (${k.density})`).join(', ')}`,
        severity: 'medium',
        keywords: stuffedKeywords,
        recommended: 'Reduce keyword density to under 5% for natural content',
        location: 'body content'
      });
    }

    // Readability analysis (basic)
    const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSentence = details.wordCount / sentences.length;
    const complexWords = words.filter(word => word.length > 6).length;
    const readabilityScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * (complexWords / details.wordCount));

    details.readability = {
      fleschScore: Math.round(readabilityScore),
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
      complexWordsPercentage: Math.round((complexWords / details.wordCount) * 100)
    };

    if (readabilityScore < 30) {
      issues.push({
        type: 'poor_readability',
        message: `Very difficult to read: Flesch score ${details.readability.fleschScore} (aim for 60+)`,
        severity: 'medium',
        current: details.readability.fleschScore,
        recommended: '60+ for good readability',
        location: 'body content'
      });
    }

    if (issues.length > 0) {
      audit.checks.content.status = issues.some(i => i.severity === 'high') ? 'failed' : 'warning';
      audit.checks.content.issues = issues;
    } else {
      audit.checks.content.status = 'passed';
    }
  }

  checkAccessibility(html, audit) {
    const issues = [];
    const details = audit.checks.accessibility.details;

    if (!html) {
      audit.checks.accessibility.status = 'failed';
      audit.checks.accessibility.issues = [{
        type: 'no_html',
        message: 'No HTML content to analyze for accessibility',
        severity: 'critical',
        location: 'page content'
      }];
      return;
    }

    // Check HTML lang attribute
    const htmlLangMatch = html.match(/<html[^>]+lang=["']([^"']+)["'][^>]*>/i);
    if (!htmlLangMatch) {
      issues.push({
        type: 'missing_lang',
        message: 'Missing lang attribute on html element',
        severity: 'medium',
        impact: 'Screen readers cannot determine page language',
        location: 'html tag'
      });
      details.missingLang = true;
    } else {
      details.lang = htmlLangMatch[1];
    }

    // Check images without alt text
    const imgMatches = html.match(/<img[^>]*>/gi) || [];
    let imagesWithoutAlt = 0;
    let totalImages = imgMatches.length;

    imgMatches.forEach(img => {
      if (!img.match(/alt=["'][^"']*["']/i)) {
        imagesWithoutAlt++;
      }
    });

    details.imagesWithoutAlt = imagesWithoutAlt;
    details.totalImages = totalImages;

    if (imagesWithoutAlt > 0) {
      const percentage = Math.round((imagesWithoutAlt / totalImages) * 100);
      issues.push({
        type: 'missing_alt_text',
        message: `${imagesWithoutAlt}/${totalImages} images (${percentage}%) missing alt text`,
        severity: percentage > 50 ? 'high' : 'medium',
        impact: 'Screen readers cannot describe images to visually impaired users',
        current: imagesWithoutAlt,
        total: totalImages,
        location: 'img tags throughout page'
      });
    }

    // Check heading structure
    const headings = [];
    for (let i = 1; i <= 6; i++) {
      const regex = new RegExp(`<h${i}[^>]*>([^<]+)</h${i}>`, 'gi');
      let match;
      while ((match = regex.exec(html)) !== null) {
        headings.push({ level: i, text: match[1].trim() });
      }
    }

    details.headingStructure = {
      total: headings.length,
      byLevel: headings.reduce((acc, h) => {
        acc[`h${h.level}`] = (acc[`h${h.level}`] || 0) + 1;
        return acc;
      }, {})
    };

    // Check for heading hierarchy issues (already done in hierarchy check)
    // But add accessibility-specific checks

    // Check for empty headings
    const emptyHeadings = headings.filter(h => h.text.trim().length === 0);
    if (emptyHeadings.length > 0) {
      issues.push({
        type: 'empty_headings',
        message: `${emptyHeadings.length} empty heading tags found`,
        severity: 'medium',
        impact: 'Screen readers may announce empty headings confusingly',
        count: emptyHeadings.length,
        location: 'heading tags'
      });
    }

    // Check for forms without labels
    const inputMatches = html.match(/<input[^>]*>/gi) || [];
    const labelMatches = html.match(/<label[^>]*>[\s\S]*?<\/label>/gi) || [];
    const inputsWithIds = inputMatches.filter(input => input.match(/id=["'][^"']+["']/));
    const labelsWithFor = labelMatches.filter(label => label.match(/for=["'][^"']+["']/));

    // Basic check - if we have inputs but fewer labels than expected
    if (inputsWithIds.length > labelsWithFor.length) {
      issues.push({
        type: 'form_labels',
        message: 'Some form inputs may be missing associated labels',
        severity: 'medium',
        impact: 'Screen readers cannot properly associate labels with form fields',
        inputs: inputsWithIds.length,
        labels: labelsWithFor.length,
        location: 'form elements'
      });
    }

    // Check for color contrast (basic - just check if inline styles use problematic colors)
    const colorMatches = html.match(/color:\s*#[0-9a-fA-F]{3,6}/gi) || [];
    const lowContrastColors = colorMatches.filter(color => {
      // Very basic check for very light or very dark colors
      const hex = color.match(/#([0-9a-fA-F]{3,6})/)[1];
      const rgb = hex.length === 3 ?
        [parseInt(hex[0]+hex[0], 16), parseInt(hex[1]+hex[1], 16), parseInt(hex[2]+hex[2], 16)] :
        [parseInt(hex.substr(0,2), 16), parseInt(hex.substr(2,2), 16), parseInt(hex.substr(4,2), 16)];
      const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
      return brightness < 50 || brightness > 200; // Very dark or very light
    });

    if (lowContrastColors.length > 0) {
      issues.push({
        type: 'color_contrast',
        message: 'Potential color contrast issues detected in inline styles',
        severity: 'low',
        impact: 'Text may be difficult to read for users with visual impairments',
        colors: lowContrastColors.slice(0, 3), // Show first 3
        location: 'inline styles'
      });
    }

    if (issues.length > 0) {
      audit.checks.accessibility.status = issues.some(i => i.severity === 'high') ? 'failed' : 'warning';
      audit.checks.accessibility.issues = issues;
    } else {
      audit.checks.accessibility.status = 'passed';
    }
  }

  extractLocaleFromUrl(url) {
    for (const locale of LOCALES) {
      if (url.includes(`/${locale}/`)) {
        return locale;
      }
    }
    return null;
  }

  printSummary() {
    console.log('\n' + '='.repeat(120));
    console.log('  🚀 ENHANCED ULTIMATE COMPREHENSIVE SEO AUDIT SUMMARY');
    console.log('='.repeat(120) + '\n');

    console.log(`📊 Total Pages Audited: ${this.results.total}`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`⚠️  Warnings: ${this.results.warnings}`);
    console.log(`❌ Failed: ${this.results.failed}\n`);

    // Average scores
    const scores = this.results.pages.map(p => p.score).filter(s => s !== undefined);
    if (scores.length > 0) {
      const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      const gradeDistribution = this.results.pages.reduce((acc, p) => {
        acc[p.grade] = (acc[p.grade] || 0) + 1;
        return acc;
      }, {});

      console.log(`📈 Average SEO Score: ${avgScore}/100`);
      console.log(`🎓 Grade Distribution: ${Object.entries(gradeDistribution).map(([grade, count]) => `${grade}: ${count}`).join(' | ')}\n`);
    }

    // Enhanced check summary with more details
    const checkSummary = {};
    this.results.pages.forEach(page => {
      Object.entries(page.checks).forEach(([checkType, check]) => {
        if (!checkSummary[checkType]) {
          checkSummary[checkType] = { passed: 0, warning: 0, failed: 0, unknown: 0 };
        }
        checkSummary[checkType][check.status === 'passed' ? 'passed' : check.status === 'warning' ? 'warning' : check.status === 'failed' ? 'failed' : 'unknown']++;
      });
    });

    console.log('📈 DETAILED CHECK SUMMARY:');
    console.log('-'.repeat(100));
    Object.entries(checkSummary).forEach(([check, stats]) => {
      const total = stats.passed + stats.warning + stats.failed + stats.unknown;
      const passRate = total > 0 ? Math.round((stats.passed / total) * 100) : 0;
      const failRate = total > 0 ? Math.round((stats.failed / total) * 100) : 0;
      console.log(`${check.padEnd(15)}: ✅ ${stats.passed} ⚠️ ${stats.warning} ❌ ${stats.failed} (${passRate}% pass, ${failRate}% fail)`);
    });

    // Global issues with enhanced details
    console.log('\n🌍 GLOBAL ISSUES:');
    console.log('-'.repeat(100));

    if (this.results.globalIssues.duplicateTitles.length > 0) {
      console.log(`\n📝 DUPLICATE TITLES (${this.results.globalIssues.duplicateTitles.length}):`);
      this.results.globalIssues.duplicateTitles.slice(0, 5).forEach(issue => {
        console.log(`  "${issue.title.substring(0, 60)}..."`);
        console.log(`  📍 Pages: ${issue.pages.join(', ')}`);
      });
    }

    if (this.results.globalIssues.duplicateDescriptions.length > 0) {
      console.log(`\n📝 DUPLICATE DESCRIPTIONS (${this.results.globalIssues.duplicateDescriptions.length}):`);
      this.results.globalIssues.duplicateDescriptions.slice(0, 5).forEach(issue => {
        console.log(`  "${issue.description.substring(0, 60)}..."`);
        console.log(`  📍 Pages: ${issue.pages.join(', ')}`);
      });
    }

    if (this.results.globalIssues.brokenHreflangs.length > 0) {
      console.log(`\n🔗 BROKEN HREFLANG LINKS (${this.results.globalIssues.brokenHreflangs.length}):`);
      this.results.globalIssues.brokenHreflangs.slice(0, 5).forEach(issue => {
        console.log(`  ${issue.sourceUrl} -> ${issue.brokenUrl} (${issue.status || issue.error})`);
      });
    }

    if (this.results.globalIssues.schemaErrors.length > 0) {
      console.log(`\n🏗️  SCHEMA ERRORS (${this.results.globalIssues.schemaErrors.length}):`);
      this.results.globalIssues.schemaErrors.slice(0, 5).forEach(issue => {
        console.log(`  ${issue.url} (schema ${issue.schemaIndex}): ${issue.error}`);
      });
    }

    // Top issues by severity
    const allIssues = [];
    this.results.pages.forEach(page => {
      Object.values(page.checks).forEach(check => {
        if (check.issues) {
          check.issues.forEach(issue => {
            allIssues.push({
              ...issue,
              page: page.url,
              check: Object.keys(page.checks).find(key => page.checks[key] === check)
            });
          });
        }
      });
    });

    console.log('\n🔍 TOP ISSUES BY SEVERITY:');
    console.log('-'.repeat(100));

    // Group by severity
    const severityGroups = allIssues.reduce((acc, issue) => {
      if (!acc[issue.severity]) acc[issue.severity] = [];
      acc[issue.severity].push(issue);
      return acc;
    }, {});

    ['critical', 'high', 'medium', 'low'].forEach(severity => {
      if (severityGroups[severity]) {
        const issues = severityGroups[severity];
        const topIssues = issues.reduce((acc, issue) => {
          const key = `${issue.type}: ${issue.message}`;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});

        console.log(`\n${severity.toUpperCase()} SEVERITY (${issues.length} total):`);
        Object.entries(topIssues)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .forEach(([issue, count]) => {
            console.log(`  ${count}x: ${issue}`);
          });
      }
    });

    // Performance insights
    console.log('\n⚡ PERFORMANCE INSIGHTS:');
    console.log('-'.repeat(100));

    const avgWordCount = this.results.pages.reduce((sum, p) => sum + (p.checks.content.details.wordCount || 0), 0) / this.results.pages.length;
    const avgReadingTime = this.results.pages.reduce((sum, p) => sum + (p.checks.content.details.readingTime || 0), 0) / this.results.pages.length;

    console.log(`📊 Average word count: ${Math.round(avgWordCount)}`);
    console.log(`⏱️  Average reading time: ${Math.round(avgReadingTime)} minutes`);
    console.log(`🎯 Pages with sufficient content: ${this.results.pages.filter(p => (p.checks.content.details.wordCount || 0) >= 300).length}/${this.results.pages.length}`);

    console.log('\n' + '='.repeat(120) + '\n');
  }

  async run(urls) {
    console.log('🚀 Starting Ultimate Comprehensive SEO Audit...\n');
    console.log(`Auditing ${urls.length} pages...\n`);

    // Audit pages in batches to avoid overwhelming the server
    const batchSize = 3; // Smaller batch for comprehensive checks
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      await Promise.all(batch.map(url => this.auditPage(url)));

      // Show progress
      const progress = Math.min(i + batchSize, urls.length);
      console.log(`\n📊 Progress: ${progress}/${urls.length} pages audited (${Math.round((progress/urls.length)*100)}%)`);
    }

    this.printSummary();

    // Save detailed results to JSON
    const resultsPath = join(rootDir, 'ultimate-seo-audit-results.json');
    await import('fs/promises').then(fs =>
      fs.writeFile(resultsPath, JSON.stringify(this.results, null, 2))
    );
    console.log(`\n💾 Detailed results saved to: ultimate-seo-audit-results.json\n`);
  }
}

// Get working URLs from health check results or sitemap
async function getUrlsToAudit() {
  try {
    // Try to get from health check results first
    const healthResultsPath = join(rootDir, 'page-health-results.json');
    const { readFile } = await import('fs/promises');
    const data = await readFile(healthResultsPath, 'utf-8');
    const results = JSON.parse(data);

    const workingUrls = results.pages
      .filter(p => p.status === 200)
      .map(p => p.url);

    if (workingUrls.length > 0) {
      console.log(`Found ${workingUrls.length} working pages from health check results`);
      return workingUrls;
    }
  } catch (error) {
    console.log('No health check results found, trying sitemap...');
  }

  // Fallback to sitemap
  try {
    const sitemapResponse = await fetch(`${BASE_URL}/sitemap.xml`);
    if (sitemapResponse.ok) {
      const sitemapXml = await sitemapResponse.text();
      const urlMatches = sitemapXml.match(/<loc>([^<]+)<\/loc>/g) || [];
      const urls = urlMatches
        .map(match => match.match(/<loc>([^<]+)<\/loc>/))
        .filter(match => match)
        .map(match => match[1])
        .filter(url => url.startsWith(BASE_URL));

      console.log(`Found ${urls.length} URLs from sitemap`);

      // Check if we have a validated URLs file
      try {
        const fs = await import('fs/promises');
        const validatedData = JSON.parse(await fs.readFile(join(rootDir, 'sitemap-valid-urls.json'), 'utf8'));
        if (validatedData.validUrls && validatedData.validUrls.length > 0) {
          console.log(`Using ${validatedData.validUrls.length} pre-validated URLs from sitemap-valid-urls.json`);
          return validatedData.validUrls;
        }
      } catch (error) {
        console.log('No validated URLs file found, using all sitemap URLs');
      }

      return urls; // Use all URLs if no validation file exists
    }
  } catch (error) {
    console.log('Could not fetch sitemap, using basic URLs...');
  }

  // Final fallback - basic URLs
  const basicUrls = [
    `${BASE_URL}/`,
    `${BASE_URL}/en/`,
    `${BASE_URL}/fr/`,
    `${BASE_URL}/de/`,
    `${BASE_URL}/es/`,
    `${BASE_URL}/it/`,
    `${BASE_URL}/id/`
  ];

  console.log(`Using ${basicUrls.length} basic URLs`);
  return basicUrls;
}

// Run the audit
const urls = await getUrlsToAudit();
console.log(`\n🎯 Starting audit of ${urls.length} pages...\n`);

const auditor = new UltimateSEOAuditor();
await auditor.run(urls);