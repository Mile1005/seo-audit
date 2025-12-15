/**
 * Enhanced Audit Engine - Main Export
 * Comprehensive SEO audit system with advanced crawling and analysis
 */

export * from "./types";
export * from "./engine";
export * from "./analyzer";
export * from "./helpers";

// Default configuration for quick start
export const defaultAuditConfig = {
  // Crawl Settings
  depth: 1,
  pageLimit: 10,
  includeExternal: false,
  respectRobotsTxt: true,
  userAgent: "AISEOTurbo-Bot/2.0 (+https://aiseoturbo.com)",

  // Analysis Options
  targetKeywords: [],
  includePerformance: true,
  includeAccessibility: true,
  includeSecurity: true,
  includeCompetitor: false,
  competitorUrls: [],

  // Advanced Options
  mobileFirst: true,
  includeSchemaValidation: true,
  checkBrokenLinks: false,
  analyzePageSpeed: true,
  generateScreenshots: false,

  // Thresholds
  performanceThreshold: 80,
  accessibilityThreshold: 95,
  minWordCount: 300,
  maxPageSize: 1024, // In KB
};
