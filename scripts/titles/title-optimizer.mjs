#!/usr/bin/env node

/**
 * Title Optimizer - Creates SEO-optimized page titles for all locales
 * Based on comprehensive analysis of URLs and page types
 */

import { readFileSync, writeFileSync } from "fs";

// Location targeting suffixes based on research
const LOCATION_TARGETING = {
  en: "", // No suffix for English (global)
  fr: " - France",
  de: " - Deutschland",
  es: " - España",
  it: " - Italia",
  id: " - Indonesia",
};

// Primary keywords for different page types
const PAGE_KEYWORDS = {
  homepage: {
    primary: "AI SEO Audit Tool",
    secondary: "Boost Rankings 300% Faster",
  },
  pricing: {
    primary: "SEO Audit Pricing",
    secondary: "Plans From $29/month",
  },
  features: {
    primary: "SEO Features",
    secondary: "Complete Audit & Analysis",
  },
  "features/seo-audit": {
    primary: "SEO Audit Tool",
    secondary: "Comprehensive Website Analysis",
  },
  "features/site-crawler": {
    primary: "Site Crawler",
    secondary: "Technical SEO Analysis",
  },
  "features/keyword-tracking": {
    primary: "Keyword Tracking",
    secondary: "Monitor Search Rankings",
  },
  "features/competitor-analysis": {
    primary: "Competitor Analysis",
    secondary: "SEO Intelligence & Insights",
  },
  "features/ai-assistant": {
    primary: "AI SEO Assistant",
    secondary: "Smart Recommendations",
  },
  about: {
    primary: "About AI SEO Turbo",
    secondary: "Expert SEO Team & AI Innovation",
  },
  contact: {
    primary: "Contact AI SEO Turbo",
    secondary: "Expert SEO Support & Consultation",
  },
  blog: {
    primary: "SEO Blog",
    secondary: "Latest SEO Tips & Strategies",
  },
  "case-studies": {
    primary: "SEO Case Studies",
    secondary: "Real Results & Success Stories",
  },
};

// Blog post specific titles
const BLOG_TITLES = {
  "ai-powered-seo-future": "AI-Powered SEO: The Future is Here | AI SEO Turbo Blog",
  "complete-seo-audit-checklist-2025": "Complete SEO Audit Checklist 2025 | AI SEO Turbo Blog",
  "content-seo-creating-search-friendly-content":
    "Content SEO: Creating Search-Friendly Content | AI SEO Turbo Blog",
  "core-web-vitals-optimization-guide":
    "Core Web Vitals Optimization Guide - Improve Page Experience | AI SEO Turbo Blog",
  "local-seo-strategies-that-work": "Local SEO Strategies That Work | AI SEO Turbo Blog",
  "technical-seo-best-practices-2025": "Technical SEO Best Practices 2025 | AI SEO Turbo Blog",
};

// Case study specific titles
const CASE_STUDY_TITLES = {
  "cloudsync-pro": "CloudSync Pro Case Study - 312% Organic Traffic Increase",
  "digital-growth-agency": "Digital Growth Agency Case Study - 245% Client Acquisition",
  "gearhub-pro": "GearHub Pro Case Study - #1 Rankings in 4 Months",
  "peak-performance": "Peak Performance Case Study - 189% Revenue Growth",
  "stylecraft-boutique": "StyleCraft Boutique Case Study - 427% Organic Traffic",
  "techflow-solutions": "TechFlow Solutions Case Study - Enterprise SEO Success",
};

// Help center titles (hierarchical but unique)
const HELP_TITLES = {
  help: "Help Center - SEO Support & Guides | AI SEO Turbo",
  "help/getting-started": "Getting Started - AI SEO Turbo Setup Guide",
  "help/getting-started/quick-start": "Quick Start Guide - AISEOTurbo Setup in 10 Minutes",
  "help/getting-started/first-audit": "First SEO Audit - Complete Step-by-Step Guide",
  "help/getting-started/seo-scores": "Understanding SEO Scores - Performance Metrics Guide",
  "help/seo-tools-features": "SEO Tools Features - Complete Guide | AI SEO Turbo",
  "help/features/seo-audit": "SEO Audit Feature Guide - Comprehensive Analysis",
  "help/features/site-crawler": "Site Crawler Feature - Technical SEO Analysis Guide",
  "help/features/competitor-analysis": "Competitor Analysis Feature - SEO Intelligence Guide",
  "help/features/ai-assistant": "AI Assistant Feature - Smart SEO Recommendations",
  "help/account-billing": "Account & Billing - Subscription Management Guide",
  "help/billing/payment-methods": "Payment Methods - Secure Billing Options",
  "help/billing/upgrade-plan": "Upgrade Plan - Choose Your SEO Solution",
  "help/billing/invoices": "Invoices & Billing History - Account Management",
  "help/billing/cancellation": "Cancellation Policy - Account Management Guide",
  "help/security-privacy": "Security & Privacy - Data Protection Guide",
  "help/security/privacy": "Privacy Policy - Data Protection & GDPR Compliance",
  "help/security/gdpr": "GDPR Compliance - Data Protection Guide",
  "help/security/two-factor-authentication": "Two-Factor Authentication - Account Security",
  "help/security/best-practices": "Security Best Practices - Account Protection Guide",
  "help/troubleshooting": "Troubleshooting - Common Issues & Solutions",
  "help/troubleshooting/login-issues": "Login Issues Troubleshooting - AISEOTurbo Help",
  "help/troubleshooting/audit-issues": "Audit Issues Troubleshooting - SEO Analysis Help",
  "help/troubleshooting/performance": "Performance Issues Troubleshooting - AISEOTurbo Help",
  "help/troubleshooting/sync-issues": "Sync Issues Troubleshooting - AISEOTurbo Help",
  "help/api-integrations": "API & Integrations - Developer Documentation",
  "help/api/authentication": "API Authentication - Developer Guide",
  "help/api/webhooks": "Webhooks API - Integration Guide",
};

class TitleOptimizer {
  constructor() {
    this.csvData = [];
    this.optimizedTitles = new Map(); // Track used titles to prevent duplicates
    this.duplicateCount = 0;
  }

  loadCSV() {
    const csvContent = readFileSync("all-page-titles.csv", "utf8");
    const lines = csvContent.split("\n");

    // Parse CSV (simple parsing, assuming no commas in quoted fields)
    for (let i = 1; i < lines.length; i++) {
      // Skip header
      const line = lines[i].trim();
      if (!line) continue;

      const parts = line.split(",");
      if (parts.length >= 6) {
        const url = parts[0];
        const locale = parts[1];
        const localeName = parts[2];
        const title = parts[3].replace(/^"|"$/g, ""); // Remove quotes
        const htmlLang = parts[4];
        const status = parts[5];
        const error = parts.slice(6).join(",");

        this.csvData.push({
          url,
          locale,
          localeName,
          title,
          htmlLang,
          status,
          error,
          optimizedTitle: null,
        });
      }
    }

    console.log(`Loaded ${this.csvData.length} rows from CSV`);
  }

  extractPageType(url) {
    // Remove domain and locale prefix
    let path = url.replace("https://www.aiseoturbo.com", "");

    // Check for root domain (English homepage)
    if (path === "" || path === "/") {
      return "homepage";
    }

    // Check for locale homepages (e.g., /fr, /de, /es, /it, /id)
    if (/^\/(fr|de|es|it|id)$/.test(path)) {
      return "homepage";
    }

    // Remove locale prefix if present
    if (
      path.startsWith("/fr/") ||
      path.startsWith("/de/") ||
      path.startsWith("/es/") ||
      path.startsWith("/it/") ||
      path.startsWith("/id/")
    ) {
      path = path.substring(4); // Remove /xx/
    }

    if (path === "" || path === "/") return "homepage";

    // Remove leading slash
    path = path.startsWith("/") ? path.substring(1) : path;

    // Check for exact matches first
    if (PAGE_KEYWORDS[path]) return path;
    if (HELP_TITLES[`help/${path}`]) return `help/${path}`;
    if (BLOG_TITLES[path]) return `blog/${path}`;
    if (CASE_STUDY_TITLES[path]) return `case-studies/${path}`;

    // Check for blog posts
    if (path.startsWith("blog/")) {
      const blogSlug = path.replace("blog/", "");
      if (BLOG_TITLES[blogSlug]) return `blog/${blogSlug}`;
      return "blog"; // Generic blog
    }

    // Check for case studies
    if (path.startsWith("case-studies/")) {
      const caseSlug = path.replace("case-studies/", "");
      if (CASE_STUDY_TITLES[caseSlug]) return `case-studies/${caseSlug}`;
      return "case-studies"; // Generic case studies
    }

    // Check for help pages
    if (path.startsWith("help/")) {
      const helpPath = `help/${path.replace("help/", "")}`;
      if (HELP_TITLES[helpPath]) return helpPath;
      return "help"; // Generic help
    }

    return path; // Return the path as page type
  }

  generateOptimizedTitle(row) {
    const { url, locale, status } = row;

    // Skip error pages
    if (status === "ERROR") {
      return row.title; // Keep original
    }

    const pageType = this.extractPageType(url);
    const locationSuffix = LOCATION_TARGETING[locale] || "";

    let baseTitle = "";

    // Special handling for homepage
    if (pageType === "homepage") {
      if (locale === "en") {
        baseTitle = "AI SEO Audit Tool - Boost Rankings 300% Faster | AI SEO Turbo";
      } else {
        // Localized homepage titles with proper keywords
        const localizedTitles = {
          fr: "Outil d'Audit SEO IA - Améliorez vos Classements 300% Plus Rapidement | AI SEO Turbo - France",
          de: "KI-SEO-Audit-Tool - Rankings um 300% Schneller Steigern | AI SEO Turbo - Deutschland",
          es: "Herramienta de Auditoría SEO IA - Mejora Rankings 300% Más Rápido | AI SEO Turbo - España",
          it: "Strumento di Audit SEO IA - Migliora i Ranking 300% Più Velocemente | AI SEO Turbo - Italia",
          id: "Alat Audit SEO AI - Tingkatkan Ranking 300% Lebih Cepat | AI SEO Turbo - Indonesia",
        };
        baseTitle =
          localizedTitles[locale] ||
          `AI SEO Audit Tool - Boost Rankings 300% Faster | AI SEO Turbo${locationSuffix}`;
      }
    }
    // Handle other page types
    else if (HELP_TITLES[pageType]) {
      baseTitle = HELP_TITLES[pageType];
      if (locationSuffix && !baseTitle.includes(" | AI SEO Turbo")) {
        baseTitle += " | AI SEO Turbo";
      }
      if (locationSuffix) {
        baseTitle = baseTitle.replace(" | AI SEO Turbo", `${locationSuffix} | AI SEO Turbo`);
      }
    } else if (pageType.startsWith("blog/")) {
      const blogSlug = pageType.replace("blog/", "");
      baseTitle =
        BLOG_TITLES[blogSlug] ||
        `${PAGE_KEYWORDS.blog.primary} - ${PAGE_KEYWORDS.blog.secondary} | AI SEO Turbo`;
      if (locationSuffix) {
        baseTitle = baseTitle.replace(
          " | AI SEO Turbo Blog",
          `${locationSuffix} | AI SEO Turbo Blog`
        );
      }
    } else if (pageType.startsWith("case-studies/")) {
      const caseSlug = pageType.replace("case-studies/", "");
      baseTitle =
        CASE_STUDY_TITLES[caseSlug] ||
        `${PAGE_KEYWORDS["case-studies"].primary} - ${PAGE_KEYWORDS["case-studies"].secondary} | AI SEO Turbo`;
      if (locationSuffix) {
        baseTitle = baseTitle.replace(" Case Study", `${locationSuffix} Case Study`);
      }
    } else if (PAGE_KEYWORDS[pageType]) {
      const keywords = PAGE_KEYWORDS[pageType];
      baseTitle = `${keywords.primary} - ${keywords.secondary} | AI SEO Turbo`;
      if (locationSuffix) {
        baseTitle = baseTitle.replace(" | AI SEO Turbo", `${locationSuffix} | AI SEO Turbo`);
      }
    } else {
      // Fallback for unknown pages
      const cleanPageType = pageType.replace(/[-/]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      baseTitle = `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo`;
      if (locationSuffix) {
        baseTitle = baseTitle.replace(" | AI SEO Turbo", `${locationSuffix} | AI SEO Turbo`);
      }
    }

    // Ensure uniqueness
    let uniqueTitle = baseTitle;
    let counter = 1;
    while (this.optimizedTitles.has(uniqueTitle)) {
      this.duplicateCount++;
      // Add a subtle differentiator for duplicates
      if (uniqueTitle.includes(" | AI SEO Turbo")) {
        uniqueTitle = uniqueTitle.replace(" | AI SEO Turbo", ` ${counter} | AI SEO Turbo`);
      } else {
        uniqueTitle = `${uniqueTitle} ${counter}`;
      }
      counter++;
    }

    this.optimizedTitles.set(uniqueTitle, url);
    return uniqueTitle;
  }

  validateTitleLength(title) {
    // Optimal length: 50-60 characters for desktop, but allow up to 70
    return title.length <= 70;
  }

  optimizeAllTitles() {
    console.log("🔄 Starting title optimization process...\n");

    let processed = 0;
    let optimized = 0;
    let keptOriginal = 0;

    for (const row of this.csvData) {
      const originalTitle = row.title;
      const optimizedTitle = this.generateOptimizedTitle(row);

      row.optimizedTitle = optimizedTitle;

      if (optimizedTitle !== originalTitle) {
        optimized++;
      } else {
        keptOriginal++;
      }

      processed++;

      if (processed % 50 === 0) {
        console.log(`   Processed ${processed}/${this.csvData.length} titles...`);
      }
    }

    console.log(`\n✅ Optimization complete!`);
    console.log(`   Total processed: ${processed}`);
    console.log(`   Titles optimized: ${optimized}`);
    console.log(`   Titles kept original: ${keptOriginal}`);
    console.log(`   Duplicate resolutions: ${this.duplicateCount}`);
  }

  generateUpdatedCSV() {
    const header = "URL,Locale,Locale Name,Original Title,Optimized Title,HTML Lang,Status,Error\n";

    const rows = this.csvData.map((row) => {
      const escapedOriginal = `"${row.title.replace(/"/g, '""')}"`;
      const escapedOptimized = `"${row.optimizedTitle.replace(/"/g, '""')}"`;
      const escapedError = row.error ? `"${row.error.replace(/"/g, '""')}"` : "";

      return `${row.url},${row.locale},${row.localeName},${escapedOriginal},${escapedOptimized},${row.htmlLang},${row.status},${escapedError}`;
    });

    return header + rows.join("\n");
  }

  printSummary() {
    console.log("\n📊 OPTIMIZATION SUMMARY");
    console.log("========================\n");

    // Count by locale
    const localeStats = {};
    this.csvData.forEach((row) => {
      if (!localeStats[row.locale]) {
        localeStats[row.locale] = { total: 0, optimized: 0, errors: 0 };
      }
      localeStats[row.locale].total++;

      if (row.status === "ERROR") {
        localeStats[row.locale].errors++;
      } else if (row.optimizedTitle !== row.title) {
        localeStats[row.locale].optimized++;
      }
    });

    console.log("🌍 OPTIMIZATION BY LOCALE:");
    Object.entries(localeStats).forEach(([locale, stats]) => {
      const localeName = this.csvData.find((r) => r.locale === locale)?.localeName || locale;
      console.log(
        `   ${localeName} (${locale}): ${stats.total} pages, ${stats.optimized} optimized, ${stats.errors} errors`
      );
    });

    // Title length validation
    const validLengths = this.csvData.filter(
      (row) => row.status !== "ERROR" && this.validateTitleLength(row.optimizedTitle)
    ).length;

    const totalValid = this.csvData.filter((row) => row.status !== "ERROR").length;

    console.log(`\n📏 TITLE LENGTH VALIDATION:`);
    console.log(`   Valid length (≤70 chars): ${validLengths}/${totalValid} titles`);
    console.log(
      `   Average length: ${Math.round(this.csvData.filter((r) => r.status !== "ERROR").reduce((sum, r) => sum + r.optimizedTitle.length, 0) / totalValid)} characters`
    );

    // Unique titles check
    const uniqueTitles = new Set(this.csvData.map((r) => r.optimizedTitle));
    console.log(`\n🎯 UNIQUENESS CHECK:`);
    console.log(`   Unique titles: ${uniqueTitles.size}/${this.csvData.length}`);
    console.log(`   Duplicate count: ${this.duplicateCount}`);

    console.log(`\n💾 OUTPUT FILES:`);
    console.log(`   Original: all-page-titles.csv`);
    console.log(`   Optimized: all-page-titles-optimized.csv`);
  }

  run() {
    this.loadCSV();
    this.optimizeAllTitles();
    this.printSummary();

    // Save optimized CSV
    const optimizedCSV = this.generateUpdatedCSV();
    writeFileSync("all-page-titles-optimized.csv", optimizedCSV, "utf8");

    console.log(`\n🎉 Optimization complete! Check 'all-page-titles-optimized.csv' for results.`);
  }
}

// Run the optimizer
const optimizer = new TitleOptimizer();
optimizer.run();
