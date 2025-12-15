/**
 * Enhanced Audit Engine - Core Analysis Methods
 * Helper methods for comprehensive SEO analysis
 */

import * as cheerio from "cheerio";
import { URL } from "url";
import {
  TechnicalSEO,
  SecurityAudit,
  MobileUsability,
  SchemaMarkup,
  ContentAnalysis,
  AccessibilityAudit,
  PerformanceMetrics,
  CategoryScores,
  AuditIssue,
  ExecutiveSummary,
} from "./types";

export class AuditAnalyzer {
  /**
   * Calculate category scores from analysis results
   */
  calculateCategoryScores(results: {
    technicalSEO: TechnicalSEO;
    content: ContentAnalysis;
    security: SecurityAudit;
    mobile: MobileUsability;
    schema: SchemaMarkup;
    performance: PerformanceMetrics | null;
    accessibility: AccessibilityAudit | null;
  }): CategoryScores {
    const technicalScore = this.calculateTechnicalScore(results.technicalSEO);
    const contentScore = this.calculateContentScore(results.content);
    const securityScore = this.calculateSecurityScore(results.security);
    const mobileScore = this.calculateMobileScore(results.mobile);
    const seoScore = this.calculateSEOScore(results.technicalSEO, results.content, results.schema);
    const performanceScore = results.performance?.performanceScore || 0;
    const accessibilityScore = results.accessibility?.score || 0;

    return {
      technical: technicalScore,
      performance: performanceScore,
      accessibility: accessibilityScore,
      seo: seoScore,
      content: contentScore,
      security: securityScore,
      mobile: mobileScore,
    };
  }

  /**
   * Calculate overall score from category scores
   */
  calculateOverallScore(categoryScores: CategoryScores): number {
    const weights = {
      technical: 0.2,
      performance: 0.2,
      accessibility: 0.15,
      seo: 0.15,
      content: 0.15,
      security: 0.1,
      mobile: 0.05,
    };

    const weightedScore =
      categoryScores.technical * weights.technical +
      categoryScores.performance * weights.performance +
      categoryScores.accessibility * weights.accessibility +
      categoryScores.seo * weights.seo +
      categoryScores.content * weights.content +
      categoryScores.security * weights.security +
      categoryScores.mobile * weights.mobile;

    return Math.round(weightedScore);
  }

  /**
   * Generate audit issues from analysis results
   */
  generateIssues(results: {
    technicalSEO: TechnicalSEO;
    content: ContentAnalysis;
    security: SecurityAudit;
    mobile: MobileUsability;
    schema: SchemaMarkup;
    performance: PerformanceMetrics | null;
    accessibility: AccessibilityAudit | null;
  }): AuditIssue[] {
    const issues: AuditIssue[] = [];

    // Technical SEO issues
    issues.push(...this.generateTechnicalIssues(results.technicalSEO));

    // Content issues
    issues.push(...this.generateContentIssues(results.content));

    // Security issues
    issues.push(...this.generateSecurityIssues(results.security));

    // Mobile issues
    issues.push(...this.generateMobileIssues(results.mobile));

    // Performance issues
    if (results.performance) {
      issues.push(...this.generatePerformanceIssues(results.performance));
    }

    // Accessibility issues
    if (results.accessibility) {
      issues.push(...this.generateAccessibilityIssues(results.accessibility));
    }

    // Schema issues
    issues.push(...this.generateSchemaIssues(results.schema));

    // Sort by priority (critical first)
    return issues.sort((a, b) => {
      const priorityOrder = { critical: 0, important: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  /**
   * Generate quick wins from issues
   */
  generateQuickWins(issues: AuditIssue[]): Array<{
    title: string;
    description: string;
    effort: "low" | "medium";
    impact: "high" | "medium";
    category: string;
    steps: string[];
  }> {
    return issues
      .filter(
        (issue) => issue.effort === "low" && ["critical", "important"].includes(issue.priority)
      )
      .slice(0, 5) // Top 5 quick wins
      .map((issue) => ({
        title: issue.title,
        description: issue.description,
        effort: issue.effort as "low" | "medium",
        impact: issue.priority === "critical" ? ("high" as const) : ("medium" as const),
        category: issue.category,
        steps: this.generateActionSteps(issue),
      }));
  }

  /**
   * Generate executive summary
   */
  generateExecutiveSummary(
    overallScore: number,
    categoryScores: CategoryScores,
    issues: AuditIssue[]
  ): ExecutiveSummary {
    const criticalIssues = issues.filter((i) => i.priority === "critical").length;
    const importantIssues = issues.filter((i) => i.priority === "important").length;

    const keyFindings = this.generateKeyFindings(overallScore, categoryScores, criticalIssues);
    const priorityActions = this.generatePriorityActions(issues.slice(0, 3));
    const estimatedImpact = this.estimateImpact(criticalIssues, importantIssues);
    const timeToImplement = this.estimateTimeToImplement(issues);

    return {
      keyFindings,
      priorityActions,
      estimatedImpact,
      timeToImplement,
    };
  }

  // Helper methods for scoring
  private calculateTechnicalScore(technical: TechnicalSEO): number {
    let score = 100;

    // Indexability checks
    if (!technical.indexability.robotsTxt.found) score -= 10;
    if (!technical.indexability.robotsTxt.allows) score -= 20;
    if (technical.indexability.metaRobots.noindex) score -= 30;
    if (!technical.indexability.canonical.found) score -= 15;
    if (!technical.indexability.canonical.isSelfReferencing) score -= 10;

    // Crawlability checks
    if (technical.crawlability.statusCode !== 200) score -= 25;
    if (technical.crawlability.redirectChain.length > 1) score -= 10;
    if (technical.crawlability.loadTime > 3000) score -= 15;

    // URL structure
    if (!technical.urlStructure.isClean) score -= 10;
    if (technical.urlStructure.length > 100) score -= 5;

    // Sitemaps
    if (!technical.sitemaps.xmlSitemap.found) score -= 15;

    return Math.max(0, score);
  }

  private calculateContentScore(content: ContentAnalysis): number {
    let score = 100;

    // Word count
    if (content.wordCount < 300) score -= 20;
    else if (content.wordCount < 500) score -= 10;

    // Readability
    if (content.readabilityScore < 60) score -= 15;
    else if (content.readabilityScore < 70) score -= 5;

    // Heading structure
    if (content.headingStructure.h1Count === 0) score -= 15;
    if (content.headingStructure.h1Count > 1) score -= 10;
    if (content.headingStructure.missingHeadings.length > 0) score -= 5;

    // Images
    if (content.images.withoutAlt > 0) score -= 10;
    if (content.images.oversized > 0) score -= 5;

    // Links
    if (content.internalLinks.count === 0) score -= 10;
    if (content.externalLinks.nofollow / content.externalLinks.count > 0.8) score -= 5;

    return Math.max(0, score);
  }

  private calculateSecurityScore(security: SecurityAudit): number {
    let score = 100;

    if (!security.httpsEnabled) score -= 30;
    if (security.mixedContent.length > 0) score -= 20;
    if (!security.securityHeaders.strictTransportSecurity) score -= 10;
    if (!security.securityHeaders.xFrameOptions) score -= 10;
    if (!security.securityHeaders.xContentTypeOptions) score -= 5;
    if (!security.securityHeaders.referrerPolicy) score -= 5;
    if (security.vulnerabilities.length > 0) {
      score -= security.vulnerabilities.length * 10;
    }

    return Math.max(0, score);
  }

  private calculateMobileScore(mobile: MobileUsability): number {
    let score = 100;

    if (!mobile.isMobileFriendly) score -= 40;
    if (!mobile.viewport.hasValidViewport) score -= 20;
    if (mobile.touchTargets.filter((t) => t.isTooSmall).length > 0) score -= 15;
    if (mobile.textReadability.score < 80) score -= 10;
    if (!mobile.contentFits) score -= 10;

    return Math.max(0, score);
  }

  private calculateSEOScore(
    technical: TechnicalSEO,
    content: ContentAnalysis,
    schema: SchemaMarkup
  ): number {
    let score = 100;

    // Title and meta
    if (content.headingStructure.h1Count === 0) score -= 15;
    if (content.headingStructure.h1Count > 1) score -= 10;

    // Schema markup
    if (!schema.found) score -= 15;
    if (!schema.organization) score -= 5;
    if (!schema.website) score -= 5;

    // Technical factors
    if (!technical.indexability.canonical.found) score -= 10;
    if (!technical.sitemaps.xmlSitemap.found) score -= 10;

    return Math.max(0, score);
  }

  // Issue generation methods
  private generateTechnicalIssues(technical: TechnicalSEO): AuditIssue[] {
    const issues: AuditIssue[] = [];

    if (!technical.indexability.robotsTxt.found) {
      issues.push({
        id: "robots-txt-missing",
        category: "technical",
        priority: "important",
        title: "Missing robots.txt file",
        description: "No robots.txt file found",
        impact: "Search engines may have difficulty crawling your site",
        effort: "low",
        recommendation: "Create a robots.txt file",
        resources: [
          {
            title: "Robots.txt Guide",
            url: "https://developers.google.com/search/docs/crawling-indexing/robots/intro",
            type: "documentation",
          },
        ],
        affectedElements: ["/robots.txt"],
      });
    }

    if (technical.crawlability.statusCode !== 200) {
      issues.push({
        id: "http-status-error",
        category: "technical",
        priority: "critical",
        title: `HTTP ${technical.crawlability.statusCode} Error`,
        description: `Page returns ${technical.crawlability.statusCode} status code`,
        impact: "Page may not be indexed by search engines",
        effort: "high",
        recommendation: "Fix server configuration to return 200 status code",
        resources: [
          {
            title: "HTTP Status Codes",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
            type: "documentation",
          },
        ],
        affectedElements: ["page"],
      });
    }

    return issues;
  }

  private generateContentIssues(content: ContentAnalysis): AuditIssue[] {
    const issues: AuditIssue[] = [];

    if (content.wordCount < 300) {
      issues.push({
        id: "low-word-count",
        category: "content",
        priority: "important",
        title: "Low word count",
        description: `Page has only ${content.wordCount} words`,
        impact: "May be considered thin content by search engines",
        effort: "medium",
        recommendation: "Add more comprehensive, valuable content",
        resources: [
          {
            title: "Content Quality Guidelines",
            url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
            type: "documentation",
          },
        ],
        affectedElements: ["body"],
      });
    }

    if (content.headingStructure.h1Count === 0) {
      issues.push({
        id: "missing-h1",
        category: "seo",
        priority: "critical",
        title: "Missing H1 heading",
        description: "Page does not have an H1 heading",
        impact: "Reduced SEO performance and poor content structure",
        effort: "low",
        recommendation: "Add a descriptive H1 heading to the page",
        resources: [
          {
            title: "HTML Headings Best Practices",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h1",
            type: "documentation",
          },
        ],
        affectedElements: ["h1"],
      });
    }

    return issues;
  }

  private generateSecurityIssues(security: SecurityAudit): AuditIssue[] {
    const issues: AuditIssue[] = [];

    if (!security.httpsEnabled) {
      issues.push({
        id: "no-https",
        category: "security",
        priority: "critical",
        title: "HTTPS not enabled",
        description: "Site is not served over HTTPS",
        impact: "Security risk and negative SEO impact",
        effort: "medium",
        recommendation: "Enable HTTPS with SSL certificate",
        resources: [
          {
            title: "HTTPS Setup Guide",
            url: "https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https",
            type: "documentation",
          },
        ],
        affectedElements: ["site"],
      });
    }

    if (security.mixedContent.length > 0) {
      issues.push({
        id: "mixed-content",
        category: "security",
        priority: "important",
        title: "Mixed content detected",
        description: "HTTP resources loaded on HTTPS page",
        impact: "Security warnings and blocked content",
        effort: "medium",
        recommendation: "Update all resource URLs to use HTTPS",
        resources: [
          {
            title: "Mixed Content Guide",
            url: "https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content",
            type: "documentation",
          },
        ],
        affectedElements: security.mixedContent.map((item) => item.url),
      });
    }

    return issues;
  }

  private generateMobileIssues(mobile: MobileUsability): AuditIssue[] {
    const issues: AuditIssue[] = [];

    if (!mobile.viewport.hasValidViewport) {
      issues.push({
        id: "missing-viewport",
        category: "mobile",
        priority: "critical",
        title: "Missing viewport meta tag",
        description: "Page lacks proper viewport configuration",
        impact: "Poor mobile user experience",
        effort: "low",
        recommendation:
          'Add viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1">',
        resources: [
          {
            title: "Viewport Meta Tag",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag",
            type: "documentation",
          },
        ],
        affectedElements: ["head"],
      });
    }

    const smallTouchTargets = mobile.touchTargets.filter((t) => t.isTooSmall);
    if (smallTouchTargets.length > 0) {
      issues.push({
        id: "small-touch-targets",
        category: "mobile",
        priority: "important",
        title: "Touch targets too small",
        description: `${smallTouchTargets.length} touch targets are smaller than 48px`,
        impact: "Difficult mobile navigation",
        effort: "medium",
        recommendation: "Increase touch target size to at least 48x48px",
        resources: [
          {
            title: "Touch Target Guidelines",
            url: "https://web.dev/accessible-tap-targets/",
            type: "documentation",
          },
        ],
        affectedElements: smallTouchTargets.map((t) => t.selector),
      });
    }

    return issues;
  }

  private generatePerformanceIssues(performance: PerformanceMetrics): AuditIssue[] {
    const issues: AuditIssue[] = [];

    if (performance.lcp && performance.lcp > 2500) {
      issues.push({
        id: "poor-lcp",
        category: "performance",
        priority: "critical",
        title: "Poor Largest Contentful Paint",
        description: `LCP is ${Math.round(performance.lcp)}ms (target: <2.5s)`,
        impact: "Poor user experience and SEO rankings",
        effort: "high",
        recommendation: "Optimize largest content element loading",
        resources: [
          {
            title: "LCP Optimization",
            url: "https://web.dev/lcp/",
            type: "documentation",
          },
        ],
        affectedElements: ["largest-contentful-paint"],
      });
    }

    if (performance.cls && performance.cls > 0.1) {
      issues.push({
        id: "poor-cls",
        category: "performance",
        priority: "important",
        title: "Poor Cumulative Layout Shift",
        description: `CLS is ${performance.cls.toFixed(3)} (target: <0.1)`,
        impact: "Poor user experience from unexpected layout shifts",
        effort: "medium",
        recommendation: "Stabilize layout by reserving space for dynamic content",
        resources: [
          {
            title: "CLS Optimization",
            url: "https://web.dev/cls/",
            type: "documentation",
          },
        ],
        affectedElements: ["layout-shifting-elements"],
      });
    }

    return issues;
  }

  private generateAccessibilityIssues(accessibility: AccessibilityAudit): AuditIssue[] {
    return accessibility.violations.map((violation) => ({
      id: violation.id,
      category: "accessibility" as const,
      priority:
        violation.impact === "critical"
          ? ("critical" as const)
          : violation.impact === "serious"
            ? ("important" as const)
            : ("low" as const),
      title: violation.description,
      description: violation.help,
      impact: `Accessibility barrier for users with disabilities`,
      effort: "medium" as const,
      recommendation: violation.help,
      resources: [
        {
          title: "Accessibility Guide",
          url: violation.helpUrl,
          type: "documentation" as const,
        },
      ],
      affectedElements: violation.nodes.map((node) => node.target.join(" ")),
    }));
  }

  private generateSchemaIssues(schema: SchemaMarkup): AuditIssue[] {
    const issues: AuditIssue[] = [];

    if (!schema.found) {
      issues.push({
        id: "no-schema",
        category: "seo",
        priority: "important",
        title: "No structured data found",
        description: "Page lacks structured data markup",
        impact: "Missed opportunities for rich snippets",
        effort: "medium",
        recommendation: "Add relevant structured data markup",
        resources: [
          {
            title: "Structured Data Guide",
            url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data",
            type: "documentation",
          },
        ],
        affectedElements: ["head", "body"],
      });
    }

    return issues;
  }

  // Helper methods for summary generation
  private generateKeyFindings(
    overallScore: number,
    categoryScores: CategoryScores,
    criticalIssues: number
  ): string[] {
    const findings: string[] = [];

    if (overallScore >= 80) {
      findings.push("Overall SEO health is good with room for optimization");
    } else if (overallScore >= 60) {
      findings.push("SEO performance needs improvement in several areas");
    } else {
      findings.push("Significant SEO issues require immediate attention");
    }

    if (criticalIssues > 0) {
      findings.push(`${criticalIssues} critical issues found that need immediate action`);
    }

    // Find lowest scoring category
    const categories = Object.entries(categoryScores);
    const lowestCategory = categories.reduce((min, current) =>
      current[1] < min[1] ? current : min
    );

    if (lowestCategory[1] < 70) {
      findings.push(
        `${lowestCategory[0]} performance is the primary concern (${lowestCategory[1]}/100)`
      );
    }

    return findings;
  }

  private generatePriorityActions(topIssues: AuditIssue[]): string[] {
    return topIssues.map((issue) => issue.recommendation);
  }

  private estimateImpact(criticalIssues: number, importantIssues: number): string {
    if (criticalIssues >= 3) {
      return "High impact - addressing critical issues could significantly improve SEO performance";
    } else if (criticalIssues >= 1 || importantIssues >= 5) {
      return "Medium impact - fixing key issues will provide noticeable improvements";
    } else {
      return "Low impact - optimizations will provide incremental improvements";
    }
  }

  private estimateTimeToImplement(issues: AuditIssue[]): string {
    const effortCounts = {
      low: issues.filter((i) => i.effort === "low").length,
      medium: issues.filter((i) => i.effort === "medium").length,
      high: issues.filter((i) => i.effort === "high").length,
    };

    const estimatedHours = effortCounts.low * 1 + effortCounts.medium * 4 + effortCounts.high * 16;

    if (estimatedHours <= 8) {
      return "1 day";
    } else if (estimatedHours <= 40) {
      return "1 week";
    } else if (estimatedHours <= 160) {
      return "1 month";
    } else {
      return "2+ months";
    }
  }

  private generateActionSteps(issue: AuditIssue): string[] {
    // This would contain specific implementation steps based on issue type
    // For now, return generic steps
    return [
      "Identify affected elements",
      "Implement recommended changes",
      "Test the implementation",
      "Validate the fix",
    ];
  }
}
