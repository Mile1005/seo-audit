/**
 * SMART String Extraction Script for AI SEO Turbo
 *
 * This enhanced version uses better filtering and pattern recognition
 * to extract only user-facing strings, excluding code artifacts.
 *
 * Usage: tsx scripts/extract-strings-smart.ts
 */

import fs from "fs";
import path from "path";
import { glob } from "glob";

interface TranslationEntry {
  value: string;
  context: string;
  namespace: string;
}

// Patterns to EXCLUDE (code artifacts, not user-facing text)
const EXCLUDE_PATTERNS = [
  /^[\d\s\-+%$,.]+$/, // Pure numbers/symbols: "123", "$45", "12%", "1,000"
  /^[a-z\-]+:[a-z\-]+$/, // CSS-like: "text-center", "bg-red-500"
  /^(px|em|rem|vh|vw|ms|s)$/i, // Units
  /^#[0-9a-fA-F]{3,8}$/, // Hex colors
  /^https?:\/\//, // URLs
  /^\/[\w\-/]*$/, // Paths: "/dashboard", "/api/audit"
  /^@\//, // Import paths
  /^\d{1,2}:\d{2}$/, // Times: "9:41"
  /^[A-Z_]{2,}$/, // CONSTANTS
  /^(true|false|null|undefined)$/, // Literals
  /^(className|id|key|ref|type|name|value)$/i, // Common prop names
  /^[a-z]+\.[a-z]+$/, // File extensions or dot notation
  /\{.*\}/, // Template brackets (handled separately)
  /^(GET|POST|PUT|DELETE|PATCH)$/, // HTTP methods
  /^[\W]+$/, // Only special characters
];

// Minimum requirements for valid strings
const MIN_LENGTH = 3;
const MIN_WORD_LENGTH = 2;
const MAX_LENGTH = 200;

// Words that indicate this is user-facing content
const USER_FACING_INDICATORS = [
  "the",
  "your",
  "you",
  "our",
  "we",
  "is",
  "are",
  "have",
  "get",
  "see",
  "click",
  "start",
  "stop",
  "show",
  "hide",
  "open",
  "close",
  "add",
  "edit",
  "delete",
  "save",
  "cancel",
  "submit",
  "send",
  "load",
  "view",
  "download",
];

class SmartStringExtractor {
  private translations = new Map<string, TranslationEntry>();
  private stats = {
    filesScanned: 0,
    totalExtracted: 0,
    filtered: 0,
  };

  /**
   * Improved string validation
   */
  private isValidUserFacingString(str: string): boolean {
    const cleaned = str.trim();

    // Length checks
    if (cleaned.length < MIN_LENGTH || cleaned.length > MAX_LENGTH) {
      return false;
    }

    // Check exclusion patterns
    for (const pattern of EXCLUDE_PATTERNS) {
      if (pattern.test(cleaned)) {
        return false;
      }
    }

    // Must contain at least one letter
    if (!/[a-zA-Z]/.test(cleaned)) {
      return false;
    }

    // Check if it's likely user-facing content
    const words = cleaned.toLowerCase().split(/\s+/);

    // Single word checks
    if (words.length === 1) {
      const word = words[0];
      // Must be at least MIN_WORD_LENGTH chars and start with letter
      if (word.length < MIN_WORD_LENGTH || !/^[a-zA-Z]/.test(word)) {
        return false;
      }
      // Single words should be capitalized or common UI words
      const isCapitalized = /^[A-Z]/.test(cleaned);
      const isCommonUI = [
        "save",
        "cancel",
        "delete",
        "edit",
        "create",
        "update",
        "close",
        "back",
        "next",
      ].includes(word);
      return isCapitalized || isCommonUI;
    }

    // Multi-word strings: should contain user-facing indicators or be capitalized
    const startsWithCapital = /^[A-Z]/.test(cleaned);
    const hasUserFacingWord = words.some((w) => USER_FACING_INDICATORS.includes(w));

    return startsWithCapital || hasUserFacingWord;
  }

  /**
   * Get namespace from file path
   */
  private getNamespace(filePath: string): string {
    if (filePath.includes("/dashboard/") || filePath.includes("\\dashboard\\")) return "dashboard";
    if (filePath.includes("/audit/") || filePath.includes("\\audit\\")) return "audit";
    if (filePath.includes("/keywords/") || filePath.includes("\\keywords\\")) return "keywords";
    if (filePath.includes("/backlinks/") || filePath.includes("\\backlinks\\")) return "backlinks";
    if (filePath.includes("/pricing/") || filePath.includes("\\pricing\\")) return "pricing";
    if (filePath.includes("/features/") || filePath.includes("\\features\\")) return "features";
    if (
      filePath.includes("/login/") ||
      filePath.includes("/signup/") ||
      filePath.includes("\\login\\") ||
      filePath.includes("\\signup\\") ||
      filePath.includes("/auth/") ||
      filePath.includes("\\auth\\")
    )
      return "auth";
    if (filePath.includes("/navigation/") || filePath.includes("\\navigation\\")) return "nav";
    if (filePath.includes("/forms/") || filePath.includes("\\forms\\")) return "forms";
    if (filePath.includes("/hero/") || filePath.includes("\\hero\\")) return "hero";
    if (filePath.includes("/page.tsx") || filePath.includes("\\page.tsx")) return "pages";
    if (filePath.includes("/layout.tsx") || filePath.includes("\\layout.tsx")) return "layout";
    return "common";
  }

  /**
   * Generate clean translation key
   */
  private generateKey(str: string, namespace: string): string {
    const cleaned = str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 2)
      .slice(0, 4)
      .join("_");

    return `${namespace}.${cleaned || "text"}`;
  }

  /**
   * Extract strings from JSX/TSX content
   */
  private extractFromJSX(content: string, filePath: string): void {
    const namespace = this.getNamespace(filePath);

    // Pattern 1: JSX text content: >Text<
    const jsxTextRegex = />([^<>{}\n]+)</g;
    let match;

    while ((match = jsxTextRegex.exec(content)) !== null) {
      const str = match[1].trim();
      if (this.isValidUserFacingString(str)) {
        this.addTranslation(str, filePath, namespace);
      }
    }

    // Pattern 2: String literals in JSX attributes: title="Text"
    const attrRegex = /\b(title|placeholder|label|alt|aria-label|data-tooltip)=["']([^"']+)["']/gi;
    while ((match = attrRegex.exec(content)) !== null) {
      const str = match[2].trim();
      if (this.isValidUserFacingString(str)) {
        this.addTranslation(str, filePath, namespace);
      }
    }

    // Pattern 3: Standalone quoted strings that look like UI text
    const quotedRegex = /["']([A-Z][^"']{2,100})["']/g;
    while ((match = quotedRegex.exec(content)) !== null) {
      const str = match[1].trim();
      if (this.isValidUserFacingString(str)) {
        this.addTranslation(str, filePath, namespace);
      }
    }
  }

  /**
   * Add translation if not duplicate
   */
  private addTranslation(value: string, filePath: string, namespace: string): void {
    const key = this.generateKey(value, namespace);

    if (!this.translations.has(key)) {
      this.translations.set(key, {
        value,
        context: filePath,
        namespace,
      });
      this.stats.totalExtracted++;
    }
  }

  /**
   * Scan a single file
   */
  private scanFile(filePath: string): void {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      this.extractFromJSX(content, filePath);
      this.stats.filesScanned++;
    } catch (error) {
      console.error(`Error scanning ${filePath}:`, error);
    }
  }

  /**
   * Scan entire project
   */
  async scanProject(): Promise<void> {
    console.log("🔍 Smart Extraction Started\n");

    const patterns = ["app/**/*.{tsx,ts}", "components/**/*.{tsx,ts}"];

    for (const pattern of patterns) {
      const files = await glob(pattern, {
        ignore: ["**/node_modules/**", "**/.next/**", "**/messages/**"],
        cwd: process.cwd(),
      });

      console.log(`📂 Scanning ${files.length} files for ${pattern}`);

      for (const file of files) {
        this.scanFile(path.join(process.cwd(), file));
      }
    }

    console.log(`\n✅ Extraction Complete`);
    console.log(`📊 Files Scanned: ${this.stats.filesScanned}`);
    console.log(`📝 Unique Strings: ${this.stats.totalExtracted}`);
  }

  /**
   * Build nested structure
   */
  private buildNested(): any {
    const result: any = {};

    this.translations.forEach((entry, key) => {
      const parts = key.split(".");
      let current = result;

      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          current[part] = entry.value;
        } else {
          current[part] = current[part] || {};
          current = current[part];
        }
      });
    });

    return this.sortKeys(result);
  }

  /**
   * Sort object keys alphabetically
   */
  private sortKeys(obj: any): any {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
      return obj;
    }

    return Object.keys(obj)
      .sort()
      .reduce((sorted: any, key) => {
        sorted[key] = this.sortKeys(obj[key]);
        return sorted;
      }, {});
  }

  /**
   * Generate output files
   */
  async generateOutput(): Promise<void> {
    // Generate JSON
    const nested = this.buildNested();
    const outputPath = path.join(process.cwd(), "messages", "en-smart-extracted.json");

    fs.writeFileSync(outputPath, JSON.stringify(nested, null, 2), "utf-8");

    console.log(`\n📝 Generated: ${outputPath}`);

    // Generate report
    const reportPath = path.join(process.cwd(), "scripts", "smart-extraction-report.txt");
    let report = "Smart String Extraction Report\n";
    report += "=".repeat(60) + "\n\n";
    report += `Files Scanned: ${this.stats.filesScanned}\n`;
    report += `Unique Strings Extracted: ${this.stats.totalExtracted}\n\n`;

    // Count by namespace
    const byNamespace: Record<string, number> = {};
    this.translations.forEach((entry) => {
      byNamespace[entry.namespace] = (byNamespace[entry.namespace] || 0) + 1;
    });

    report += "Distribution by Namespace:\n";
    report += "-".repeat(60) + "\n";
    Object.entries(byNamespace)
      .sort((a, b) => b[1] - a[1])
      .forEach(([ns, count]) => {
        report += `  ${ns.padEnd(20)} ${count.toString().padStart(5)} strings\n`;
      });

    report += "\n" + "=".repeat(60) + "\n";
    report += "Sample Extracted Strings (First 30):\n\n";

    Array.from(this.translations.entries())
      .slice(0, 30)
      .forEach(([key, entry]) => {
        report += `${key}:\n`;
        report += `  "${entry.value}"\n`;
        report += `  (${entry.context})\n\n`;
      });

    fs.writeFileSync(reportPath, report, "utf-8");
    console.log(`📄 Report: ${reportPath}`);
  }
}

// Main execution
async function main() {
  console.log("🚀 AI SEO Turbo - Smart String Extractor\n");

  const extractor = new SmartStringExtractor();
  await extractor.scanProject();
  await extractor.generateOutput();

  console.log("\n✨ Done! Review the generated files and merge into messages/en.json\n");
}

main().catch(console.error);
