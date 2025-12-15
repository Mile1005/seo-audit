#!/usr/bin/env node

/**
 * Bundle Size Analysis Script
 * Analyzes Next.js bundle composition and provides optimization recommendations
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  buildDir: ".next",
  outputFile: "bundle-analysis.json",
  sizeThresholds: {
    // Size limits in KB
    totalBundle: 500,
    vendorChunk: 200,
    pageChunk: 100,
    cssFile: 50,
  },
  performanceBudget: {
    // Performance budgets
    jsInitial: 300, // KB
    jsAsync: 200, // KB
    css: 50, // KB
    images: 500, // KB per page
  },
};

class BundleAnalyzer {
  constructor() {
    this.buildStats = null;
    this.analysis = {
      timestamp: new Date().toISOString(),
      totalSize: 0,
      chunks: [],
      assets: [],
      recommendations: [],
      performanceScore: 0,
    };
  }

  /**
   * Run complete bundle analysis
   */
  async analyze() {
    console.log("🔍 Starting bundle analysis...\n");

    try {
      // Step 1: Build the application if not already built
      await this.ensureBuild();

      // Step 2: Read build statistics
      await this.readBuildStats();

      // Step 3: Analyze chunks and assets
      await this.analyzeChunks();
      await this.analyzeAssets();

      // Step 4: Generate recommendations
      this.generateRecommendations();

      // Step 5: Calculate performance score
      this.calculatePerformanceScore();

      // Step 6: Output results
      this.outputResults();

      console.log("✅ Bundle analysis completed successfully!");
    } catch (error) {
      console.error("❌ Bundle analysis failed:", error.message);
      process.exit(1);
    }
  }

  /**
   * Ensure the application is built
   */
  async ensureBuild() {
    const buildPath = path.join(process.cwd(), CONFIG.buildDir);

    if (!fs.existsSync(buildPath)) {
      console.log("📦 Building application...");
      try {
        execSync("npm run build", { stdio: "inherit" });
      } catch (error) {
        console.log("⚠️  Build failed, trying with pnpm...");
        execSync("pnpm build", { stdio: "inherit" });
      }
    } else {
      console.log("✅ Using existing build");
    }
  }

  /**
   * Read Next.js build statistics
   */
  async readBuildStats() {
    const manifestPath = path.join(CONFIG.buildDir, "build-manifest.json");

    if (fs.existsSync(manifestPath)) {
      this.buildStats = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    }

    // Also try to read webpack stats if available
    const statsPath = path.join(CONFIG.buildDir, "webpack-stats.json");
    if (fs.existsSync(statsPath)) {
      this.webpackStats = JSON.parse(fs.readFileSync(statsPath, "utf8"));
    }
  }

  /**
   * Analyze JavaScript chunks
   */
  async analyzeChunks() {
    console.log("📊 Analyzing JavaScript chunks...");

    const staticPath = path.join(CONFIG.buildDir, "static");
    if (!fs.existsSync(staticPath)) return;

    const chunks = [];

    // Analyze chunks directory
    const chunksPath = path.join(staticPath, "chunks");
    if (fs.existsSync(chunksPath)) {
      const chunkFiles = fs.readdirSync(chunksPath);

      for (const file of chunkFiles) {
        if (file.endsWith(".js")) {
          const filePath = path.join(chunksPath, file);
          const stats = fs.statSync(filePath);
          const sizeKB = Math.round(stats.size / 1024);

          chunks.push({
            name: file,
            path: filePath,
            size: stats.size,
            sizeKB,
            type: this.getChunkType(file),
          });
        }
      }
    }

    // Sort by size (largest first)
    chunks.sort((a, b) => b.size - a.size);
    this.analysis.chunks = chunks;

    // Calculate total JS size
    const totalJSSize = chunks.reduce((sum, chunk) => sum + chunk.size, 0);
    console.log(`   Total JS size: ${Math.round(totalJSSize / 1024)} KB`);
  }

  /**
   * Analyze static assets
   */
  async analyzeAssets() {
    console.log("🎨 Analyzing static assets...");

    const assets = [];
    const staticPath = path.join(CONFIG.buildDir, "static");

    if (fs.existsSync(staticPath)) {
      this.walkDirectory(staticPath, (filePath, stats) => {
        const relativePath = path.relative(staticPath, filePath);
        const extension = path.extname(filePath).toLowerCase();
        const sizeKB = Math.round(stats.size / 1024);

        assets.push({
          name: path.basename(filePath),
          path: relativePath,
          size: stats.size,
          sizeKB,
          type: this.getAssetType(extension),
        });
      });
    }

    // Sort by size
    assets.sort((a, b) => b.size - a.size);
    this.analysis.assets = assets;

    // Calculate totals by type
    const totals = assets.reduce((acc, asset) => {
      acc[asset.type] = (acc[asset.type] || 0) + asset.size;
      return acc;
    }, {});

    console.log("   Asset breakdown:");
    Object.entries(totals).forEach(([type, size]) => {
      console.log(`     ${type}: ${Math.round(size / 1024)} KB`);
    });
  }

  /**
   * Walk directory recursively
   */
  walkDirectory(dir, callback) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        this.walkDirectory(filePath, callback);
      } else {
        callback(filePath, stats);
      }
    }
  }

  /**
   * Determine chunk type
   */
  getChunkType(filename) {
    if (filename.includes("framework")) return "framework";
    if (filename.includes("main")) return "main";
    if (filename.includes("vendor")) return "vendor";
    if (filename.includes("runtime")) return "runtime";
    if (filename.match(/^\d+\./)) return "async";
    return "page";
  }

  /**
   * Determine asset type
   */
  getAssetType(extension) {
    const types = {
      ".js": "javascript",
      ".css": "stylesheet",
      ".woff": "font",
      ".woff2": "font",
      ".ttf": "font",
      ".otf": "font",
      ".jpg": "image",
      ".jpeg": "image",
      ".png": "image",
      ".webp": "image",
      ".avif": "image",
      ".svg": "image",
      ".ico": "image",
    };

    return types[extension] || "other";
  }

  /**
   * Generate optimization recommendations
   */
  generateRecommendations() {
    console.log("💡 Generating recommendations...");

    const recommendations = [];

    // Check total bundle size
    const totalJSSize = this.analysis.chunks.reduce((sum, chunk) => sum + chunk.size, 0);
    const totalJSSizeKB = Math.round(totalJSSize / 1024);

    if (totalJSSizeKB > CONFIG.sizeThresholds.totalBundle) {
      recommendations.push({
        type: "critical",
        title: "Large Bundle Size",
        description: `Total JavaScript bundle is ${totalJSSizeKB} KB (target: <${CONFIG.sizeThresholds.totalBundle} KB)`,
        suggestions: [
          "Implement code splitting for large components",
          "Use dynamic imports for non-critical features",
          "Consider removing unused dependencies",
          "Enable tree shaking for better dead code elimination",
        ],
      });
    }

    // Check for large chunks
    const largeChunks = this.analysis.chunks.filter(
      (chunk) => chunk.sizeKB > CONFIG.sizeThresholds.pageChunk && chunk.type !== "framework"
    );

    if (largeChunks.length > 0) {
      recommendations.push({
        type: "warning",
        title: "Large Chunks Detected",
        description: `Found ${largeChunks.length} chunks larger than ${CONFIG.sizeThresholds.pageChunk} KB`,
        chunks: largeChunks.map((chunk) => `${chunk.name} (${chunk.sizeKB} KB)`),
        suggestions: [
          "Split large components into smaller chunks",
          "Use React.lazy() for component-level code splitting",
          "Move third-party libraries to separate vendor chunks",
        ],
      });
    }

    // Check CSS size
    const cssAssets = this.analysis.assets.filter((asset) => asset.type === "stylesheet");
    const totalCSSSize = cssAssets.reduce((sum, asset) => sum + asset.size, 0);
    const totalCSSSizeKB = Math.round(totalCSSSize / 1024);

    if (totalCSSSizeKB > CONFIG.sizeThresholds.cssFile) {
      recommendations.push({
        type: "warning",
        title: "Large CSS Bundle",
        description: `Total CSS size is ${totalCSSSizeKB} KB (target: <${CONFIG.sizeThresholds.cssFile} KB)`,
        suggestions: [
          "Remove unused CSS with PurgeCSS",
          "Optimize Tailwind CSS configuration",
          "Use CSS-in-JS for component-specific styles",
          "Split CSS by route or component",
        ],
      });
    }

    // Check for duplicate dependencies
    const duplicateCheck = this.checkForDuplicates();
    if (duplicateCheck.length > 0) {
      recommendations.push({
        type: "info",
        title: "Potential Duplicate Dependencies",
        description: "Found potential duplicate or similar dependencies",
        duplicates: duplicateCheck,
        suggestions: [
          "Consolidate similar libraries",
          "Use webpack-bundle-analyzer for detailed analysis",
          "Check for multiple versions of the same package",
        ],
      });
    }

    this.analysis.recommendations = recommendations;
  }

  /**
   * Check for potential duplicate dependencies
   */
  checkForDuplicates() {
    // This is a simplified check - in a real scenario you'd analyze the actual bundle
    const chunkNames = this.analysis.chunks.map((chunk) => chunk.name);
    const duplicates = [];

    // Look for common patterns that might indicate duplicates
    const patterns = ["react", "lodash", "moment", "axios"];

    patterns.forEach((pattern) => {
      const matches = chunkNames.filter((name) => name.includes(pattern));
      if (matches.length > 1) {
        duplicates.push({
          pattern,
          chunks: matches,
        });
      }
    });

    return duplicates;
  }

  /**
   * Calculate performance score
   */
  calculatePerformanceScore() {
    let score = 100;

    // Deduct points for bundle size
    const totalJSSize = this.analysis.chunks.reduce((sum, chunk) => sum + chunk.size, 0);
    const totalJSSizeKB = Math.round(totalJSSize / 1024);

    if (totalJSSizeKB > CONFIG.performanceBudget.jsInitial) {
      const excess = totalJSSizeKB - CONFIG.performanceBudget.jsInitial;
      score -= Math.min(excess / 10, 30); // Max 30 points deduction
    }

    // Deduct points for large chunks
    const largeChunks = this.analysis.chunks.filter((chunk) => chunk.sizeKB > 100);
    score -= largeChunks.length * 5;

    // Deduct points for critical recommendations
    const criticalRecommendations = this.analysis.recommendations.filter(
      (r) => r.type === "critical"
    );
    score -= criticalRecommendations.length * 15;

    // Deduct points for warning recommendations
    const warningRecommendations = this.analysis.recommendations.filter(
      (r) => r.type === "warning"
    );
    score -= warningRecommendations.length * 10;

    this.analysis.performanceScore = Math.max(0, Math.round(score));
  }

  /**
   * Output analysis results
   */
  outputResults() {
    console.log("\n📈 Bundle Analysis Results");
    console.log("========================\n");

    // Performance Score
    const score = this.analysis.performanceScore;
    const scoreColor = score >= 80 ? "🟢" : score >= 60 ? "🟡" : "🔴";
    console.log(`${scoreColor} Performance Score: ${score}/100\n`);

    // Top 5 largest chunks
    console.log("📦 Largest JavaScript Chunks:");
    this.analysis.chunks.slice(0, 5).forEach((chunk, index) => {
      console.log(`   ${index + 1}. ${chunk.name} (${chunk.sizeKB} KB) - ${chunk.type}`);
    });

    // Asset summary
    const assetSummary = this.analysis.assets.reduce((acc, asset) => {
      acc[asset.type] = (acc[asset.type] || 0) + asset.size;
      return acc;
    }, {});

    console.log("\n🎨 Asset Summary:");
    Object.entries(assetSummary).forEach(([type, size]) => {
      console.log(`   ${type}: ${Math.round(size / 1024)} KB`);
    });

    // Recommendations
    if (this.analysis.recommendations.length > 0) {
      console.log("\n💡 Recommendations:");
      this.analysis.recommendations.forEach((rec, index) => {
        const icon = rec.type === "critical" ? "🔴" : rec.type === "warning" ? "🟡" : "🔵";
        console.log(`\n   ${icon} ${rec.title}`);
        console.log(`      ${rec.description}`);
        if (rec.suggestions) {
          rec.suggestions.forEach((suggestion) => {
            console.log(`      • ${suggestion}`);
          });
        }
      });
    }

    // Save detailed results to file
    const outputPath = path.join(process.cwd(), CONFIG.outputFile);
    fs.writeFileSync(outputPath, JSON.stringify(this.analysis, null, 2));
    console.log(`\n💾 Detailed analysis saved to: ${CONFIG.outputFile}`);

    // Performance budget status
    console.log("\n🎯 Performance Budget Status:");
    const totalJSSize = this.analysis.chunks.reduce((sum, chunk) => sum + chunk.size, 0);
    const totalJSSizeKB = Math.round(totalJSSize / 1024);
    const jsStatus = totalJSSizeKB <= CONFIG.performanceBudget.jsInitial ? "✅" : "❌";
    console.log(
      `   ${jsStatus} JavaScript: ${totalJSSizeKB} KB / ${CONFIG.performanceBudget.jsInitial} KB`
    );

    const cssSize = this.analysis.assets
      .filter((asset) => asset.type === "stylesheet")
      .reduce((sum, asset) => sum + asset.size, 0);
    const cssSizeKB = Math.round(cssSize / 1024);
    const cssStatus = cssSizeKB <= CONFIG.performanceBudget.css ? "✅" : "❌";
    console.log(`   ${cssStatus} CSS: ${cssSizeKB} KB / ${CONFIG.performanceBudget.css} KB`);
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new BundleAnalyzer();
  analyzer.analyze().catch(console.error);
}

export default BundleAnalyzer;
