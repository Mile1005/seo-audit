/**
 * EXAMPLE: PDF/CSV Export with Full Localization
 * Demonstrates translated headers and content for all 47 SEO checks
 */

import { getServerTranslations, SEO_CHECK_IDS, formatDate, formatNumber } from '@/lib/i18n-server';
import type { Locale } from '@/i18n';

/**
 * Generate CSV export with translated headers
 */
export async function generateLocalizedCSV(
  auditData: any,
  locale: Locale = 'en'
): Promise<string> {
  const t = await getServerTranslations(locale);
  
  // Translated CSV headers
  const headers = [
    t('export.check_name' as any),
    t('export.status' as any),
    t('export.severity' as any),
    t('export.description' as any),
    t('export.recommendation' as any),
    t('export.impact' as any)
  ];
  
  const rows: string[][] = [headers];
  
  // Add all 47 SEO checks with translations
  for (const checkId of SEO_CHECK_IDS) {
    const check = auditData.checks?.find((c: any) => c.id === checkId);
    
    if (check) {
      rows.push([
        t(`audit.checks.${checkId}.name` as any),
        t(`export.status_${check.passed ? 'passed' : 'failed'}` as any),
        t(`export.severity_${check.severity}` as any),
        t(`audit.checks.${checkId}.description` as any),
        t(`audit.checks.${checkId}.recommendation` as any),
        check.impact || t('export.no_impact' as any)
      ]);
    }
  }
  
  // Add metadata row
  rows.push([]);
  rows.push([
    t('export.generated_at' as any),
    formatDate(new Date(), locale, { 
      dateStyle: 'full',
      timeStyle: 'short'
    })
  ]);
  
  rows.push([
    t('export.page_url' as any),
    auditData.url
  ]);
  
  rows.push([
    t('export.overall_score' as any),
    formatNumber(auditData.score, locale)
  ]);
  
  // Convert to CSV string
  return rows
    .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n');
}

/**
 * Generate PDF export data with translated content
 * Returns structured data that can be passed to a PDF library
 */
export async function generateLocalizedPDFData(
  auditData: any,
  locale: Locale = 'en'
): Promise<PDFExportData> {
  const t = await getServerTranslations(locale);
  
  // PDF Header in user's language
  const header = {
    title: t('export.pdf_title' as any),
    subtitle: t('export.pdf_subtitle' as any, {
      url: auditData.url
    }),
    generatedAt: formatDate(new Date(), locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
  // Executive Summary
  const summary = {
    title: t('export.executive_summary' as any),
    overallScore: {
      label: t('export.overall_score' as any),
      value: formatNumber(auditData.score, locale),
      description: t('export.score_description' as any, {
        score: auditData.score
      })
    },
    criticalIssues: {
      label: t('export.critical_issues' as any),
      count: auditData.criticalIssues || 0
    },
    warnings: {
      label: t('export.warnings' as any),
      count: auditData.warnings || 0
    },
    passedChecks: {
      label: t('export.passed_checks' as any),
      count: auditData.passedChecks || 0
    }
  };
  
  // Category sections with all 47 checks
  const sections = await generatePDFSections(auditData, locale, t);
  
  // Recommendations
  const recommendations = {
    title: t('export.recommendations_title' as any),
    items: await generateRecommendations(auditData, locale, t)
  };
  
  // Footer
  const footer = {
    text: t('export.pdf_footer' as any),
    pageNumbers: true,
    locale
  };
  
  return {
    header,
    summary,
    sections,
    recommendations,
    footer,
    locale
  };
}

async function generatePDFSections(
  auditData: any,
  locale: Locale,
  t: any
): Promise<PDFSection[]> {
  const sections: PDFSection[] = [];
  
  // 1. Technical Foundation (10 checks)
  sections.push({
    title: t('audit.categories.technical_foundation' as any),
    checks: await translateChecks([
      'site_crawlability', 'xml_sitemap', 'robots_txt', 'url_structure',
      'internal_linking', 'canonical_tags', 'schema_markup', 'https_implementation',
      'redirect_chains', 'error_404'
    ], auditData, locale, t)
  });
  
  // 2. Page Speed Optimization (10 checks)
  sections.push({
    title: t('audit.categories.page_speed' as any),
    checks: await translateChecks([
      'core_web_vitals', 'image_optimization', 'css_js_optimization', 'server_response',
      'browser_caching', 'cdn_implementation', 'lazy_loading', 'font_optimization',
      'third_party_scripts', 'database_optimization'
    ], auditData, locale, t)
  });
  
  // 3. Mobile Optimization (8 checks)
  sections.push({
    title: t('audit.categories.mobile_optimization' as any),
    checks: await translateChecks([
      'mobile_first_indexing', 'responsive_design', 'touch_targets', 'viewport_config',
      'mobile_speed', 'app_store_optimization', 'amp_implementation', 'mobile_usability'
    ], auditData, locale, t)
  });
  
  // 4. Content Optimization (12 checks)
  sections.push({
    title: t('audit.categories.content_optimization' as any),
    checks: await translateChecks([
      'title_tags', 'meta_descriptions', 'header_structure', 'keyword_density',
      'content_length', 'readability', 'internal_link_strategy', 'image_alt_text',
      'content_freshness', 'duplicate_content', 'content_quality', 'structured_content'
    ], auditData, locale, t)
  });
  
  // 5. Link Building (7 checks)
  sections.push({
    title: t('audit.categories.link_building' as any),
    checks: await translateChecks([
      'backlink_profile', 'anchor_text_distribution', 'domain_authority', 'toxic_links',
      'link_velocity', 'broken_backlinks', 'competitor_backlinks'
    ], auditData, locale, t)
  });
  
  return sections;
}

async function translateChecks(
  checkIds: string[],
  auditData: any,
  locale: Locale,
  t: any
): Promise<PDFCheck[]> {
  return checkIds.map(checkId => {
    const check = auditData.checks?.find((c: any) => c.id === checkId) || {
      id: checkId,
      passed: false,
      severity: 'info'
    };
    
    try {
      return {
        name: t(`audit.checks.${checkId}.name` as any),
        status: check.passed 
          ? t('export.status_passed' as any) 
          : t('export.status_failed' as any),
        severity: t(`export.severity_${check.severity}` as any),
        description: t(`audit.checks.${checkId}.description` as any),
        recommendation: t(`audit.checks.${checkId}.recommendation` as any),
        impact: check.impact || t('export.no_impact' as any),
        icon: check.passed ? '✓' : '✗',
        color: check.passed ? 'green' : getSeverityColor(check.severity)
      };
    } catch (err) {
      // Fallback if translation missing
      return {
        name: checkId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        status: check.passed ? 'Passed' : 'Failed',
        severity: check.severity,
        description: `Check for ${checkId}`,
        recommendation: 'Please review this check',
        impact: check.impact || 'N/A',
        icon: check.passed ? '✓' : '✗',
        color: check.passed ? 'green' : 'red'
      };
    }
  });
}

async function generateRecommendations(
  auditData: any,
  locale: Locale,
  t: any
): Promise<PDFRecommendation[]> {
  const failedChecks = auditData.checks?.filter((c: any) => !c.passed) || [];
  
  // Sort by severity: critical > warning > info
  const severityOrder = { critical: 0, warning: 1, info: 2 };
  failedChecks.sort((a: any, b: any) => 
    severityOrder[a.severity as keyof typeof severityOrder] - 
    severityOrder[b.severity as keyof typeof severityOrder]
  );
  
  return failedChecks.map((check: any, index: number) => ({
    priority: index + 1,
    title: t(`audit.checks.${check.id}.name` as any),
    description: t(`audit.checks.${check.id}.recommendation` as any),
    severity: t(`export.severity_${check.severity}` as any),
    estimatedImpact: check.impact || t('export.moderate_impact' as any)
  }));
}

function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    critical: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6'
  };
  return colors[severity] || '#6B7280';
}

// Type definitions
export interface PDFExportData {
  header: {
    title: string;
    subtitle: string;
    generatedAt: string;
  };
  summary: {
    title: string;
    overallScore: {
      label: string;
      value: string;
      description: string;
    };
    criticalIssues: { label: string; count: number };
    warnings: { label: string; count: number };
    passedChecks: { label: string; count: number };
  };
  sections: PDFSection[];
  recommendations: {
    title: string;
    items: PDFRecommendation[];
  };
  footer: {
    text: string;
    pageNumbers: boolean;
    locale: Locale;
  };
  locale: Locale;
}

export interface PDFSection {
  title: string;
  checks: PDFCheck[];
}

export interface PDFCheck {
  name: string;
  status: string;
  severity: string;
  description: string;
  recommendation: string;
  impact: string;
  icon: string;
  color: string;
}

export interface PDFRecommendation {
  priority: number;
  title: string;
  description: string;
  severity: string;
  estimatedImpact: string;
}
