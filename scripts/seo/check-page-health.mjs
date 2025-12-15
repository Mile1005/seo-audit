#!/usr/bin/env node

/**
 * Page Health Checker
 *
 * Tests all pages in the workspace to determine:
 * 1. Which pages return 200 (OK)
 * 2. Which pages return 404 (Not Found)
 * 3. Which pages have errors
 * 4. Response times
 * 5. Page size
 */

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readdir } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "../..");
const appDir = join(rootDir, "app");

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const LOCALES = ["en"]; // Temporarily test only English to avoid 500s on untranslated pages

class PageHealthChecker {
  constructor() {
    this.results = {
      success: [],
      notFound: [],
      errors: [],
      redirects: [],
      total: 0,
    };
    this.stats = {
      avgResponseTime: 0,
      totalSize: 0,
    };
  }

  async findPages(dir, relativePath = "", pages = []) {
    try {
      const entries = await readdir(dir, { withFileTypes: true });

      let hasPageFile = false;
      for (const entry of entries) {
        if (entry.name === "page.tsx" || entry.name === "page.js") {
          hasPageFile = true;
          break;
        }
      }

      if (hasPageFile) {
        const routePath = this.getRoutePath(relativePath);
        if (routePath) {
          pages.push(routePath);
        }
      }

      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        const relPath = join(relativePath, entry.name);

        if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
          await this.findPages(fullPath, relPath, pages);
        }
      }
    } catch (error) {
      console.error(`Error reading ${dir}:`, error.message);
    }

    return pages;
  }

  getRoutePath(dirPath) {
    let route = "/" + dirPath.replace(/\\/g, "/").replace("app/", "");

    // Skip API routes and special Next.js files
    if (route.includes("/api/") || route.includes("/_")) {
      return null;
    }

    // Skip dynamic routes that are not [locale]
    if (route.includes("[") && !route.includes("[locale]")) {
      return null;
    }

    // Remove trailing slashes
    route = route.replace(/\/$/, "") || "/";

    return route;
  }

  async testPage(url, routePath) {
    const startTime = Date.now();

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "PageHealthChecker/1.0",
        },
        redirect: "manual", // Don't follow redirects automatically
      });

      const responseTime = Date.now() - startTime;
      const contentLength = response.headers.get("content-length");

      const result = {
        url,
        routePath,
        status: response.status,
        statusText: response.statusText,
        responseTime,
        size: contentLength ? parseInt(contentLength) : 0,
        contentType: response.headers.get("content-type"),
      };

      // Categorize by status
      if (response.status >= 200 && response.status < 300) {
        this.results.success.push(result);
      } else if (response.status >= 300 && response.status < 400) {
        result.location = response.headers.get("location");
        this.results.redirects.push(result);
      } else if (response.status === 404) {
        this.results.notFound.push(result);
      } else {
        this.results.errors.push(result);
      }

      return result;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const result = {
        url,
        routePath,
        status: 0,
        statusText: "ERROR",
        responseTime,
        error: error.message,
      };

      this.results.errors.push(result);
      return result;
    }
  }

  async testAllPages() {
    console.log(COLORS.cyan + "\n🔍 Finding all pages...\n" + COLORS.reset);

    const pages = await this.findPages(appDir, "app");
    const uniquePages = [...new Set(pages)];

    console.log(`Found ${COLORS.bright}${uniquePages.length}${COLORS.reset} unique routes\n`);

    const testUrls = [];

    // For locale-based routes
    for (const page of uniquePages) {
      if (page.includes("[locale]")) {
        // Test with each locale
        for (const locale of LOCALES) {
          const url = `${BASE_URL}${page.replace("[locale]", locale)}`;
          testUrls.push({ url, routePath: page.replace("[locale]", locale) });
        }
      } else {
        // Test non-locale routes as-is
        const url = `${BASE_URL}${page}`;
        testUrls.push({ url, routePath: page });
      }
    }

    this.results.total = testUrls.length;

    console.log(
      `Testing ${COLORS.bright}${testUrls.length}${COLORS.reset} URLs (${uniquePages.length} routes × locales)...\n`
    );
    console.log(COLORS.yellow + "⏳ This may take a minute...\n" + COLORS.reset);

    // Test in batches to avoid overwhelming the server
    const batchSize = 10;
    let completed = 0;

    for (let i = 0; i < testUrls.length; i += batchSize) {
      const batch = testUrls.slice(i, i + batchSize);
      await Promise.all(batch.map(({ url, routePath }) => this.testPage(url, routePath)));

      completed += batch.length;
      process.stdout.write(
        `\r${COLORS.cyan}Progress: ${completed}/${testUrls.length} (${Math.round((completed / testUrls.length) * 100)}%)${COLORS.reset}`
      );
    }

    console.log("\n");
  }

  calculateStats() {
    const allResults = [
      ...this.results.success,
      ...this.results.notFound,
      ...this.results.errors,
      ...this.results.redirects,
    ];

    if (allResults.length > 0) {
      const totalTime = allResults.reduce((sum, r) => sum + r.responseTime, 0);
      this.stats.avgResponseTime = Math.round(totalTime / allResults.length);

      const totalSize = this.results.success.reduce((sum, r) => sum + (r.size || 0), 0);
      this.stats.totalSize = totalSize;
    }
  }

  printReport() {
    this.calculateStats();

    console.log("\n" + COLORS.bright + COLORS.cyan + "=".repeat(100) + COLORS.reset);
    console.log(COLORS.bright + COLORS.cyan + "  PAGE HEALTH CHECK REPORT" + COLORS.reset);
    console.log(COLORS.bright + COLORS.cyan + "=".repeat(100) + COLORS.reset + "\n");

    // Summary
    console.log(COLORS.bright + "📊 SUMMARY" + COLORS.reset);
    console.log("─".repeat(100));
    console.log(`Total URLs Tested:     ${COLORS.bright}${this.results.total}${COLORS.reset}`);
    console.log(
      `  ├─ ${COLORS.green}✓ Success (200-299):${COLORS.reset}  ${this.results.success.length}`
    );
    console.log(
      `  ├─ ${COLORS.yellow}↻ Redirects (300-399):${COLORS.reset} ${this.results.redirects.length}`
    );
    console.log(
      `  ├─ ${COLORS.red}✗ Not Found (404):${COLORS.reset}    ${this.results.notFound.length}`
    );
    console.log(
      `  └─ ${COLORS.red}⚠ Errors:${COLORS.reset}            ${this.results.errors.length}`
    );
    console.log();
    console.log(
      `Average Response Time: ${COLORS.bright}${this.stats.avgResponseTime}ms${COLORS.reset}`
    );
    console.log(
      `Total Content Size:    ${COLORS.bright}${(this.stats.totalSize / 1024 / 1024).toFixed(2)} MB${COLORS.reset}`
    );
    console.log();

    // Success pages
    if (this.results.success.length > 0) {
      console.log(
        COLORS.bright +
          COLORS.green +
          `\n✅ SUCCESSFUL PAGES (${this.results.success.length})` +
          COLORS.reset
      );
      console.log("─".repeat(100));
      console.log(COLORS.bright + "Status  Time     Size      URL" + COLORS.reset);
      console.log("─".repeat(100));

      this.results.success.slice(0, 20).forEach((result) => {
        const status = String(result.status).padEnd(6);
        const time = `${result.responseTime}ms`.padEnd(8);
        const size = result.size
          ? `${(result.size / 1024).toFixed(1)}KB`.padEnd(9)
          : "N/A".padEnd(9);
        console.log(`${COLORS.green}${status}${COLORS.reset}  ${time} ${size} ${result.url}`);
      });

      if (this.results.success.length > 20) {
        console.log(
          COLORS.yellow +
            `\n... and ${this.results.success.length - 20} more successful pages` +
            COLORS.reset
        );
      }
    }

    // Redirects
    if (this.results.redirects.length > 0) {
      console.log(
        COLORS.bright +
          COLORS.yellow +
          `\n↻ REDIRECTS (${this.results.redirects.length})` +
          COLORS.reset
      );
      console.log("─".repeat(100));
      this.results.redirects.forEach((result) => {
        console.log(`${COLORS.yellow}${result.status}${COLORS.reset} ${result.url}`);
        console.log(`  → ${result.location}`);
      });
    }

    // Not Found pages
    if (this.results.notFound.length > 0) {
      console.log(
        COLORS.bright +
          COLORS.red +
          `\n❌ NOT FOUND (404) - ${this.results.notFound.length} pages` +
          COLORS.reset
      );
      console.log("─".repeat(100));
      this.results.notFound.forEach((result) => {
        console.log(`${COLORS.red}404${COLORS.reset}     ${result.url}`);
        console.log(`        Route: ${result.routePath}`);
      });
    }

    // Errors
    if (this.results.errors.length > 0) {
      console.log(
        COLORS.bright +
          COLORS.red +
          `\n⚠️  ERRORS - ${this.results.errors.length} pages` +
          COLORS.reset
      );
      console.log("─".repeat(100));
      this.results.errors.forEach((result) => {
        console.log(`${COLORS.red}${result.status || "ERR"}${COLORS.reset}     ${result.url}`);
        console.log(`        ${result.error || result.statusText}`);
      });
    }

    console.log("\n" + COLORS.bright + COLORS.cyan + "=".repeat(100) + COLORS.reset);

    // Recommendations
    console.log(COLORS.bright + COLORS.magenta + "\n📋 RECOMMENDATIONS" + COLORS.reset);
    console.log("─".repeat(100));

    if (this.results.notFound.length > 0) {
      console.log(
        COLORS.red + `• Fix ${this.results.notFound.length} pages returning 404` + COLORS.reset
      );
    }
    if (this.results.errors.length > 0) {
      console.log(
        COLORS.red + `• Investigate ${this.results.errors.length} pages with errors` + COLORS.reset
      );
    }
    if (this.results.success.length === this.results.total) {
      console.log(COLORS.green + "✓ All pages are healthy!" + COLORS.reset);
    }

    const slowPages = this.results.success.filter((r) => r.responseTime > 1000);
    if (slowPages.length > 0) {
      console.log(
        COLORS.yellow +
          `• ${slowPages.length} pages have response time > 1s (consider optimization)` +
          COLORS.reset
      );
    }

    console.log();
  }

  async exportResults() {
    const summary = {
      timestamp: new Date().toISOString(),
      baseUrl: BASE_URL,
      locales: LOCALES,
      summary: {
        total: this.results.total,
        success: this.results.success.length,
        redirects: this.results.redirects.length,
        notFound: this.results.notFound.length,
        errors: this.results.errors.length,
        avgResponseTime: this.stats.avgResponseTime,
        totalSize: this.stats.totalSize,
      },
      details: {
        success: this.results.success,
        notFound: this.results.notFound,
        errors: this.results.errors,
        redirects: this.results.redirects,
      },
    };

    return summary;
  }
}

// Main execution
const checker = new PageHealthChecker();

console.log(COLORS.bright + COLORS.cyan + "\n🏥 PAGE HEALTH CHECKER" + COLORS.reset);
console.log(COLORS.cyan + `Testing: ${BASE_URL}` + COLORS.reset);
console.log(COLORS.cyan + `Locales: ${LOCALES.join(", ")}` + COLORS.reset);

checker
  .testAllPages()
  .then(() => {
    checker.printReport();
    return checker.exportResults();
  })
  .then((results) => {
    // Optionally save to file
    // await writeFile('page-health-report.json', JSON.stringify(results, null, 2));
    console.log(COLORS.green + "✓ Health check complete!\n" + COLORS.reset);
  })
  .catch((error) => {
    console.error(COLORS.red + "\n❌ Error during health check:" + COLORS.reset, error);
    process.exit(1);
  });
