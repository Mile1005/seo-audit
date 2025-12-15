/**
 * Enhanced Site Audit Engine - Core Types
 * Comprehensive TypeScript interfaces for SEMrush/Ahrefs-level auditing
 */

export interface CoreWebVitals {
  lcp: number | null; // Largest Contentful Paint
  cls: number | null; // Cumulative Layout Shift
  inp: number | null; // Interaction to Next Paint
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
  tbt: number | null; // Total Blocking Time
  si: number | null; // Speed Index
  tti: number | null; // Time to Interactive
}

export interface PerformanceMetrics extends CoreWebVitals {
  performanceScore: number; // 0-100 score
  opportunitiesCount: number;
  diagnosticsCount: number;
  strategies: Array<{
    id: string;
    title: string;
    description: string;
    impact: "high" | "medium" | "low";
    savings: number; // Estimated time savings in ms
  }>;
  labData: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    speedIndex: number;
    timeToInteractive: number;
    totalBlockingTime: number;
    cumulativeLayoutShift: number;
  };
  fieldData: {
    origin: string;
    metrics: CoreWebVitals;
  } | null;
}

export interface SecurityAudit {
  httpsEnabled: boolean;
  mixedContent: Array<{
    type: "image" | "script" | "stylesheet" | "iframe" | "other";
    url: string;
    description: string;
  }>;
  serverSignature: string | null;
  securityHeaders: {
    contentSecurityPolicy: boolean;
    strictTransportSecurity: boolean;
    xFrameOptions: boolean;
    xContentTypeOptions: boolean;
    referrerPolicy: boolean;
    permissionsPolicy: boolean;
  };
  vulnerabilities: Array<{
    type: string;
    severity: "critical" | "high" | "medium" | "low";
    description: string;
    recommendation: string;
  }>;
}

export interface MobileUsability {
  isMobileFriendly: boolean;
  viewport: {
    configured: boolean;
    content: string | null;
    hasValidViewport: boolean;
  };
  touchTargets: Array<{
    selector: string;
    size: { width: number; height: number };
    isTooSmall: boolean;
  }>;
  textReadability: {
    score: number; // 0-100
    issues: Array<{
      type: "small-text" | "unreadable-font";
      selector: string;
      fontSize: number;
    }>;
  };
  contentFits: boolean;
  interactiveElements: Array<{
    type: string;
    isAccessible: boolean;
    issues: string[];
  }>;
}

export interface SchemaMarkup {
  found: boolean;
  types: string[];
  structuredData: Array<{
    type: string;
    properties: Record<string, any>;
    errors: string[];
    warnings: string[];
  }>;
  breadcrumbs: boolean;
  organization: boolean;
  website: boolean;
  article: boolean;
  product: boolean;
  review: boolean;
  faq: boolean;
  howTo: boolean;
}

export interface ContentAnalysis {
  wordCount: number;
  readabilityScore: number; // Flesch-Kincaid
  keywordDensity: Array<{
    keyword: string;
    count: number;
    density: number; // Percentage
  }>;
  headingStructure: {
    h1Count: number;
    h2Count: number;
    h3Count: number;
    h4Count: number;
    h5Count: number;
    h6Count: number;
    isStructured: boolean; // Proper hierarchy
    missingHeadings: string[];
  };
  internalLinks: {
    count: number;
    unique: number;
    broken: number;
    nofollow: number;
    orphanPages: string[];
  };
  externalLinks: {
    count: number;
    unique: number;
    nofollow: number;
    broken: number;
    domains: string[];
  };
  images: {
    total: number;
    withoutAlt: number;
    oversized: number;
    unoptimized: number;
    decorativeCount: number;
  };
  duplicateContent: {
    found: boolean;
    percentage: number;
    sources: string[];
  };
}

export interface TechnicalSEO {
  indexability: {
    robotsTxt: {
      found: boolean;
      allows: boolean;
      errors: string[];
      warnings: string[];
    };
    metaRobots: {
      noindex: boolean;
      nofollow: boolean;
      noarchive: boolean;
      nosnippet: boolean;
    };
    canonical: {
      found: boolean;
      url: string | null;
      isSelfReferencing: boolean;
      chainLength: number;
      errors: string[];
    };
  };
  crawlability: {
    statusCode: number;
    redirectChain: Array<{
      url: string;
      statusCode: number;
      type: string;
    }>;
    loadTime: number;
    responseSize: number;
    serverErrors: string[];
  };
  sitemaps: {
    xmlSitemap: {
      found: boolean;
      url: string | null;
      urlCount: number;
      errors: string[];
      lastModified: string | null;
    };
    htmlSitemap: {
      found: boolean;
      linkCount: number;
    };
  };
  urlStructure: {
    isClean: boolean;
    hasParameters: boolean;
    length: number;
    isDescriptive: boolean;
    issues: string[];
  };
}

export interface AccessibilityAudit {
  score: number; // 0-100
  violations: Array<{
    id: string;
    impact: "critical" | "serious" | "moderate" | "minor";
    description: string;
    help: string;
    helpUrl: string;
    nodes: Array<{
      target: string[];
      html: string;
    }>;
  }>;
  passes: Array<{
    id: string;
    description: string;
  }>;
  incomplete: Array<{
    id: string;
    description: string;
    reason: string;
  }>;
}

export interface CompetitorInsights {
  ranking: {
    position: number | null;
    keyword: string;
    searchVolume: number | null;
  }[];
  backlinks: {
    totalCount: number;
    domainCount: number;
    avgDomainRating: number;
  };
  content: {
    avgWordCount: number;
    topTopics: string[];
    contentGaps: string[];
  };
}

export interface CategoryScores {
  technical: number; // 0-100
  performance: number; // 0-100
  accessibility: number; // 0-100
  seo: number; // 0-100
  content: number; // 0-100
  security: number; // 0-100
  mobile: number; // 0-100
}

export interface AuditIssue {
  id: string;
  category:
    | "technical"
    | "performance"
    | "accessibility"
    | "seo"
    | "content"
    | "security"
    | "mobile";
  priority: "critical" | "important" | "low";
  title: string;
  description: string;
  impact: string;
  effort: "low" | "medium" | "high";
  recommendation: string;
  resources: Array<{
    title: string;
    url: string;
    type: "documentation" | "tool" | "guide";
  }>;
  affectedElements: string[];
}

export interface ExecutiveSummary {
  keyFindings: string[];
  priorityActions: string[];
  estimatedImpact: string;
  timeToImplement: string;
}

export interface EnhancedAuditResult {
  // Basic Info
  url: string;
  scannedAt: string;
  version: string;

  // Overall Scores
  overallScore: number; // 0-100 composite score
  categoryScores: CategoryScores;

  // Detailed Analysis
  technicalSEO: TechnicalSEO;
  performance: PerformanceMetrics;
  accessibility: AccessibilityAudit;
  content: ContentAnalysis;
  security: SecurityAudit;
  mobile: MobileUsability;
  schema: SchemaMarkup;

  // Issues & Recommendations
  issues: AuditIssue[];

  // Quick Wins
  quickWins: Array<{
    title: string;
    description: string;
    effort: "low" | "medium";
    impact: "high" | "medium";
    category: string;
    steps: string[];
  }>;

  // Historical Comparison
  comparison: {
    previousScore: number | null;
    scoreChange: number | null;
    newIssues: number;
    resolvedIssues: number;
    trendDirection: "improving" | "declining" | "stable" | null;
  } | null;

  // Competitor Context
  competitorInsights: CompetitorInsights | null;

  // Executive Summary
  summary: ExecutiveSummary;
}

export interface AuditConfiguration {
  // Crawl Settings
  depth: number;
  pageLimit: number;
  includeExternal: boolean;
  respectRobotsTxt: boolean;
  userAgent: string;

  // Analysis Options
  targetKeywords: string[];
  includePerformance: boolean;
  includeAccessibility: boolean;
  includeSecurity: boolean;
  includeCompetitor: boolean;
  competitorUrls: string[];

  // Advanced Options
  mobileFirst: boolean;
  includeSchemaValidation: boolean;
  checkBrokenLinks: boolean;
  analyzePageSpeed: boolean;
  generateScreenshots: boolean;

  // Thresholds
  performanceThreshold: number; // Target performance score
  accessibilityThreshold: number; // Target accessibility score
  minWordCount: number;
  maxPageSize: number; // In KB
}

export interface AuditProgress {
  stage: "initializing" | "crawling" | "analyzing" | "generating" | "complete" | "error";
  progress: number; // 0-100
  currentTask: string;
  estimatedTimeRemaining: number; // In seconds
  pagesProcessed: number;
  totalPages: number;
  errors: string[];
}
