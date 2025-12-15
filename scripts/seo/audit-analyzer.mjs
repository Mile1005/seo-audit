#!/usr/bin/env node

/**
 * SEO Audit Results Analyzer
 *
 * Analyzes the comprehensive SEO audit results and provides prioritized recommendations
 */

import { readFile } from "fs/promises";

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
};

class SEOAuditAnalyzer {
  constructor() {
    this.results = null;
    this.issueCounts = {
      critical: {},
      high: {},
      medium: {},
      low: {},
    };
    this.checkStats = {};
  }

  log(color, message) {
    console.log(`${color}${message}${COLORS.reset}`);
  }

  async loadResults() {
    try {
      const data = await readFile("./scripts/ultimate-seo-audit-results.json", "utf8");
      this.results = JSON.parse(data);
      this.log(COLORS.green, `✅ Loaded results for ${this.results.total} pages`);
    } catch (error) {
      this.log(COLORS.red, `❌ Error loading results: ${error.message}`);
      process.exit(1);
    }
  }

  analyzeIssues() {
    this.log(COLORS.blue, "\n🔍 Analyzing issues by severity and type...");

    // Initialize check stats
    const checks = [
      "hierarchy",
      "titles",
      "descriptions",
      "metaTags",
      "socialGraphs",
      "schemas",
      "hreflang",
      "canonical",
      "urlFormat",
      "technical",
      "content",
      "performance",
      "accessibility",
    ];

    checks.forEach((check) => {
      this.checkStats[check] = { passed: 0, warning: 0, failed: 0, unknown: 0 };
    });

    // Analyze each page
    this.results.pages.forEach((page) => {
      Object.entries(page.checks).forEach(([checkName, checkData]) => {
        const status = checkData.status || "unknown";
        this.checkStats[checkName][status] = (this.checkStats[checkName][status] || 0) + 1;

        // Count issues by severity
        if (checkData.issues && Array.isArray(checkData.issues)) {
          checkData.issues.forEach((issue) => {
            if (issue.severity) {
              if (!this.issueCounts[issue.severity][issue.type]) {
                this.issueCounts[issue.severity][issue.type] = 0;
              }
              this.issueCounts[issue.severity][issue.type]++;
            }
          });
        }
      });
    });
  }

  generatePriorityReport() {
    console.log("\n" + "=".repeat(100));
    console.log("🚨 SEO AUDIT PRIORITY REPORT - 312 PAGES ANALYZED");
    console.log("=".repeat(100));

    console.log(`\n📊 OVERALL SUMMARY:`);
    console.log(`   📄 Total Pages: ${this.results.total}`);
    console.log(`   ✅ Passed: ${this.results.passed}`);
    console.log(`   ⚠️  Warnings: ${this.results.warnings}`);
    console.log(`   ❌ Failed: ${this.results.failed}`);
    console.log(`   📈 Average SEO Score: ${this.calculateAverageScore()}/100`);

    this.showCriticalIssues();
    this.showCheckBreakdown();
    this.showGlobalIssues();
    this.showRecommendations();
  }

  calculateAverageScore() {
    // Simple scoring based on check statuses
    let totalScore = 0;
    this.results.pages.forEach((page) => {
      let pageScore = 0;
      let checkCount = 0;

      Object.values(page.checks).forEach((check) => {
        checkCount++;
        switch (check.status) {
          case "passed":
            pageScore += 100;
            break;
          case "warning":
            pageScore += 50;
            break;
          case "failed":
            pageScore += 0;
            break;
          default:
            pageScore += 25;
            break;
        }
      });

      totalScore += pageScore / checkCount;
    });

    return Math.round(totalScore / this.results.total);
  }

  showCriticalIssues() {
    console.log(`\n🚨 CRITICAL ISSUES (FIX FIRST):`);
    console.log(`   ${this.getIssueCount("critical", "multiple")} pages have multiple title tags`);
    console.log(`   ${this.getIssueCount("critical", "missing")} pages missing title tags`);
    console.log(`   ${this.getIssueCount("high", "missing")} pages missing meta descriptions`);
    console.log(
      `   ${this.getIssueCount("high", "not_self_referencing")} pages have incorrect canonical URLs`
    );
    console.log(
      `   ${this.getIssueCount("high", "double_slashes")} pages have double slashes in URLs`
    );
  }

  showCheckBreakdown() {
    console.log(`\n📈 CHECK BREAKDOWN:`);

    Object.entries(this.checkStats).forEach(([check, stats]) => {
      const total = stats.passed + stats.warning + stats.failed + stats.unknown;
      const passRate = Math.round((stats.passed / total) * 100);
      const status = passRate >= 80 ? "✅" : passRate >= 60 ? "⚠️" : "❌";

      console.log(
        `   ${status} ${check.padEnd(15)}: ${stats.passed} passed, ${stats.warning} warnings, ${stats.failed} failed (${passRate}% pass rate)`
      );
    });
  }

  showGlobalIssues() {
    console.log(`\n🌍 GLOBAL ISSUES:`);

    if (this.results.globalIssues.duplicateTitles.length > 0) {
      console.log(
        `   📝 ${this.results.globalIssues.duplicateTitles.length} duplicate title groups found`
      );
    }

    if (this.results.globalIssues.duplicateDescriptions.length > 0) {
      console.log(
        `   📝 ${this.results.globalIssues.duplicateDescriptions.length} duplicate description groups found`
      );
    }

    if (this.results.globalIssues.brokenHreflangs.length > 0) {
      console.log(`   🔗 ${this.results.globalIssues.brokenHreflangs.length} broken hreflang URLs`);
    }
  }

  showRecommendations() {
    console.log(`\n🎯 PRIORITY RECOMMENDATIONS:`);

    // Priority 1: Critical issues
    if (this.getIssueCount("critical", "multiple") > 0) {
      console.log(
        `   🔥 PRIORITY 1: Fix multiple title tags (${this.getIssueCount("critical", "multiple")} pages)`
      );
      console.log(`      - Remove duplicate title tags from head section`);
      console.log(`      - Keep only the most relevant title tag`);
    }

    // Priority 2: Missing titles
    if (this.getIssueCount("critical", "missing") > 0) {
      console.log(
        `   🔥 PRIORITY 2: Add missing title tags (${this.getIssueCount("critical", "missing")} pages)`
      );
      console.log(`      - Every page needs exactly one <title> tag`);
      console.log(`      - Title should be 30-60 characters`);
    }

    // Priority 3: Meta descriptions
    if (this.getIssueCount("high", "missing") > 0) {
      console.log(
        `   ⚡ PRIORITY 3: Add missing meta descriptions (${this.getIssueCount("high", "missing")} pages)`
      );
      console.log(`      - Every page needs a meta description (120-160 chars)`);
      console.log(`      - Should be unique and compelling`);
    }

    // Priority 4: URL format issues
    if (this.getIssueCount("high", "double_slashes") > 0) {
      console.log(
        `   🔗 PRIORITY 4: Fix URL formatting issues (${this.getIssueCount("high", "double_slashes")} pages)`
      );
      console.log(`      - Remove double slashes (//) from URLs`);
      console.log(`      - Fix malformed URLs causing redirects`);
    }

    // Priority 5: Canonical issues
    if (this.getIssueCount("high", "not_self_referencing") > 0) {
      console.log(
        `   ⚡ PRIORITY 5: Fix canonical URLs (${this.getIssueCount("high", "not_self_referencing")} pages)`
      );
      console.log(`      - Canonical should point to the current page URL`);
      console.log(`      - Use absolute URLs`);
    }

    // Priority 6: Social media tags
    const ogIssues = this.getIssueCount("medium", "incomplete_og");
    if (ogIssues > 0) {
      console.log(`   📱 PRIORITY 6: Complete OpenGraph tags (${ogIssues} pages missing og:image)`);
      console.log(`      - Add og:image, og:title, og:description`);
      console.log(`      - Ensure proper social media sharing`);
    }

    // Priority 7: Schema markup
    const schemaIssues = this.getIssueCount("medium", "invalid_schema");
    if (schemaIssues > 0) {
      console.log(`   🏷️  PRIORITY 7: Fix schema markup (${schemaIssues} validation errors)`);
      console.log(`      - Add @language for localized content`);
      console.log(`      - Ensure proper JSON-LD structure`);
    }
  }

  getIssueCount(severity, type) {
    return this.issueCounts[severity][type] || 0;
  }

  async run() {
    await this.loadResults();
    this.analyzeIssues();
    this.generatePriorityReport();
  }
}

// Run the analyzer
const analyzer = new SEOAuditAnalyzer();
analyzer.run().catch((error) => {
  console.error("❌ Analysis failed:", error);
  process.exit(1);
});
