/**
 * Server-side i18n utilities for background jobs, API endpoints, and non-UI contexts
 * This provides translation capabilities outside of React components
 */

import { getTranslations } from 'next-intl/server';
import type { Locale } from '../i18n';

// Type-safe translation keys for audit reports
export type AuditTranslationKey = 
  | 'audit.title'
  | 'audit.description'
  | 'audit.score'
  | 'audit.issues'
  | 'audit.recommendations'
  | 'audit.critical'
  | 'audit.warning'
  | 'audit.info'
  | 'audit.passed'
  | 'audit.failed'
  | 'audit.processing'
  | 'audit.completed'
  | 'audit.error'
  | 'notification.ranking_alert'
  | 'notification.audit_complete'
  | 'notification.backlink_change'
  | 'notification.keyword_opportunity'
  | 'error.quota_exceeded'
  | 'error.invalid_url'
  | 'error.crawl_failed'
  | 'error.network_error'
  | 'export.pdf_header'
  | 'export.csv_header'
  | 'export.generated_at'
  | 'export.page_url'
  | 'export.score'
  | 'export.issues_found';

/**
 * Get translations for server-side contexts (API routes, background jobs, etc.)
 * @param locale - The user's locale (e.g., 'en', 'es', 'fr')
 * @returns Translation function
 */
export async function getServerTranslations(locale: Locale = 'en') {
  try {
    const t = await getTranslations({ locale, namespace: 'server' });
    return t;
  } catch (error) {
    console.warn(`Failed to load translations for locale ${locale}, falling back to English`, error);
    // Fallback to English if translation fails
    const t = await getTranslations({ locale: 'en', namespace: 'server' });
    return t;
  }
}

/**
 * Translate audit check results for reports and exports
 * @param checkId - The audit check identifier (e.g., 'meta_title', 'h1_tag')
 * @param locale - The user's locale
 * @returns Translated check name and description
 */
export async function translateAuditCheck(
  checkId: string,
  locale: Locale = 'en'
): Promise<{ name: string; description: string }> {
  const t = await getServerTranslations(locale);
  
  try {
    return {
      name: t(`audit.checks.${checkId}.name` as any),
      description: t(`audit.checks.${checkId}.description` as any)
    };
  } catch (error) {
    // Fallback to check ID if translation missing
    console.warn(`Translation missing for audit check: ${checkId}`);
    return {
      name: checkId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: `Check for ${checkId}`
    };
  }
}

/**
 * Get translated error message
 * @param errorKey - Error type (e.g., 'quota_exceeded', 'invalid_url')
 * @param locale - The user's locale
 * @param details - Optional error details to interpolate
 * @returns Translated error message
 */
export async function translateError(
  errorKey: string,
  locale: Locale = 'en',
  details?: Record<string, string | number>
): Promise<string> {
  const t = await getServerTranslations(locale);
  
  try {
    return t(`errors.${errorKey}` as any, details as any);
  } catch (error) {
    console.warn(`Translation missing for error: ${errorKey}`);
    return `Error: ${errorKey}`;
  }
}

/**
 * Get translated notification message
 * @param notificationType - Type of notification (e.g., 'ranking_alert', 'audit_complete')
 * @param locale - The user's locale
 * @param data - Notification data to interpolate
 * @returns Translated notification message
 */
export async function translateNotification(
  notificationType: string,
  locale: Locale = 'en',
  data?: Record<string, string | number>
): Promise<{ title: string; message: string }> {
  const t = await getServerTranslations(locale);
  
  try {
    return {
      title: t(`notifications.${notificationType}.title` as any, data as any),
      message: t(`notifications.${notificationType}.message` as any, data as any)
    };
  } catch (error) {
    console.warn(`Translation missing for notification: ${notificationType}`);
    return {
      title: 'Notification',
      message: notificationType
    };
  }
}

/**
 * Format number based on locale (for search volume, currency, etc.)
 * @param value - The number to format
 * @param locale - The user's locale
 * @param options - Intl.NumberFormat options
 * @returns Formatted number string
 */
export function formatNumber(
  value: number,
  locale: Locale = 'en',
  options?: Intl.NumberFormatOptions
): string {
  try {
    return new Intl.NumberFormat(locale, options).format(value);
  } catch (error) {
    return value.toString();
  }
}

/**
 * Format currency based on locale
 * @param value - The amount to format
 * @param locale - The user's locale
 * @param currency - Currency code (e.g., 'USD', 'EUR')
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number,
  locale: Locale = 'en',
  currency: string = 'USD'
): string {
  return formatNumber(value, locale, {
    style: 'currency',
    currency
  });
}

/**
 * Format date based on locale
 * @param date - The date to format
 * @param locale - The user's locale
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  locale: Locale = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, options || {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);
  } catch (error) {
    return date.toString();
  }
}

/**
 * Extract locale from request headers (for API routes)
 * Checks Accept-Language header and custom X-Locale header
 * @param headers - Request headers
 * @returns Detected locale or default 'en'
 */
export function getLocaleFromHeaders(headers: Headers): Locale {
  // Check custom locale header first
  const customLocale = headers.get('X-Locale');
  if (customLocale && isValidLocale(customLocale)) {
    return customLocale as Locale;
  }
  
  // Parse Accept-Language header
  const acceptLanguage = headers.get('Accept-Language');
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang => {
      const [code] = lang.trim().split(';');
      return code.split('-')[0]; // Get just the language code (e.g., 'en' from 'en-US')
    });
    
    for (const lang of languages) {
      if (isValidLocale(lang)) {
        return lang as Locale;
      }
    }
  }
  
  return 'en'; // Default to English
}

/**
 * Check if a string is a valid locale
 */
function isValidLocale(locale: string): boolean {
  const validLocales: Locale[] = ['en', 'es', 'fr', 'de', 'it', 'id'];
  return validLocales.includes(locale as Locale);
}

/**
 * Generate Redis cache key with locale
 * @param baseKey - Base cache key
 * @param locale - User's locale
 * @param params - Additional parameters
 * @returns Locale-aware cache key
 */
export function getLocaleCacheKey(
  baseKey: string,
  locale: Locale,
  ...params: string[]
): string {
  const parts = [baseKey, locale, ...params].filter(Boolean);
  return parts.join(':');
}

// Example usage:
// const cacheKey = getLocaleCacheKey('audit', 'en', 'example.com') 
// Result: 'audit:en:example.com'

/**
 * All 47 SEO check IDs for translation
 */
export const SEO_CHECK_IDS = [
  // Technical Foundation (10 checks)
  'site_crawlability',
  'xml_sitemap',
  'robots_txt',
  'url_structure',
  'internal_linking',
  'canonical_tags',
  'schema_markup',
  'https_implementation',
  'redirect_chains',
  'error_404',
  
  // Page Speed (10 checks)
  'core_web_vitals',
  'image_optimization',
  'css_js_optimization',
  'server_response',
  'browser_caching',
  'cdn_implementation',
  'lazy_loading',
  'font_optimization',
  'third_party_scripts',
  'database_optimization',
  
  // Mobile Optimization (8 checks)
  'mobile_first_indexing',
  'responsive_design',
  'touch_targets',
  'viewport_config',
  'mobile_speed',
  'app_store_optimization',
  'amp_implementation',
  'mobile_usability',
  
  // Content Optimization (12 checks)
  'title_tags',
  'meta_descriptions',
  'header_structure',
  'keyword_density',
  'content_length',
  'readability',
  'internal_link_strategy',
  'image_alt_text',
  'content_freshness',
  'duplicate_content',
  'content_quality',
  'structured_content',
  
  // Link Building (7 checks)
  'backlink_profile',
  'anchor_text_distribution',
  'domain_authority',
  'toxic_links',
  'link_velocity',
  'broken_backlinks',
  'competitor_backlinks'
] as const;

export type SEOCheckId = typeof SEO_CHECK_IDS[number];
