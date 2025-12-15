#!/usr/bin/env node

/**
 * SEO Analysis Script - Find Pages Without Proper Metadata
 * Analyzes the workspace to find pages that are missing generateMetadata
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🔍 SEO Metadata Analysis - Finding Pages Without Proper Metadata");
console.log("================================================================\n");

// Problematic URLs from CSV that need fixing
const problematicUrls = [
  "/en/dashboard",
  "/en/help/getting-started/dashboard-setup",
  "/en/help/getting-started/quick-start",
  "/en/help/getting-started/seo-scores",
  "/en/help/getting-started/first-audit",
  "/en/help/troubleshooting/sync-issues",
  "/en/help/troubleshooting/audit-issues",
  "/en/help/troubleshooting/performance",
  "/en/help/troubleshooting/login-issues",
  "/en/help/api-integrations",
];

console.log("📋 Problematic URLs from CSV:");
problematicUrls.forEach((url) => console.log(`  ❌ ${url}`));
console.log();

// Function to find page files
function findPageFiles(dir, results = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and .next
      if (item !== "node_modules" && item !== ".next" && item !== ".git") {
        findPageFiles(fullPath, results);
      }
    } else if (item === "page.tsx" || item === "page.ts") {
      results.push(fullPath);
    }
  }

  return results;
}

// Analyze pages
const appDir = path.join(__dirname, "app");
const pageFiles = findPageFiles(appDir);

console.log(`📁 Found ${pageFiles.length} page files to analyze\n`);

let issues = [];

pageFiles.forEach((filePath) => {
  const content = fs.readFileSync(filePath, "utf8");
  const relativePath = path.relative(appDir, filePath);

  // Check if it's a client component
  const isClientComponent = content.includes('"use client"') || content.includes("'use client'");

  // Check if it has generateMetadata
  const hasGenerateMetadata = content.includes("generateMetadata");

  // Check if it has hardcoded canonical
  const hasHardcodedCanonical =
    content.includes("canonical:") && !content.includes("generateSEOMeta");

  // Check if it's in the problematic URLs list
  const isProblematic = problematicUrls.some((url) => {
    const pagePath =
      "/" +
      relativePath
        .replace(/\[locale\]/g, "en")
        .replace(/\/page\.tsx?$/, "")
        .replace(/\\/g, "/");
    return url === pagePath;
  });

  if (isProblematic) {
    console.log(`🔴 PROBLEMATIC PAGE: ${relativePath}`);
    console.log(`   Path: ${relativePath.replace("[locale]", "en")}`);
    console.log(`   Client Component: ${isClientComponent ? "YES" : "NO"}`);
    console.log(`   Has generateMetadata: ${hasGenerateMetadata ? "YES" : "NO"}`);
    console.log(`   Has hardcoded canonical: ${hasHardcodedCanonical ? "YES" : "NO"}`);

    if (isClientComponent && !hasGenerateMetadata) {
      console.log(
        `   ❌ ISSUE: Client component without generateMetadata - no SEO metadata generated`
      );
      issues.push({
        file: relativePath,
        issue: "Client component without generateMetadata",
        path: relativePath.replace("[locale]", "en"),
      });
    } else if (hasHardcodedCanonical) {
      console.log(`   ❌ ISSUE: Has hardcoded canonical URL`);
      issues.push({
        file: relativePath,
        issue: "Hardcoded canonical URL",
        path: relativePath.replace("[locale]", "en"),
      });
    }
    console.log();
  }
});

console.log("📊 SUMMARY:");
console.log("===========");
console.log(`Total problematic URLs: ${problematicUrls.length}`);
console.log(`Pages with issues found: ${issues.length}`);

if (issues.length > 0) {
  console.log("\n🔧 FIXES NEEDED:");
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.file}: ${issue.issue}`);
  });

  console.log("\n💡 RECOMMENDED FIXES:");
  console.log("1. Convert client components to server components where possible");
  console.log("2. Add generateMetadata functions to pages that need SEO");
  console.log("3. Remove hardcoded canonical URLs and use dynamic generation");
  console.log("4. Use generateSEOMeta() from lib/seo.ts for consistent canonical/hreflang URLs");
} else {
  console.log("\n✅ No issues found in the analyzed pages");
}
