# i18n Fix Plan for aiseoturbo.com (Updated)

## Overview

After re-checking the codebase, most content is already translated. The main hardcoded elements are in homepage meta, trust indicators, and some image alt texts. Total critical hardcodes: ~15 instances.

## Phase 1: High Priority - SEO and Trust Indicators (Week 1)

Focus on homepage SEO meta and trust/social proof elements.

### 1.1 Homepage Meta Description and Keywords

- **File**: `app/[locale]/page.tsx` (generateMetadata function)
- **Issues**: Hardcoded description and keywords
- **Current**: 'Transform your SEO with AI-powered audits identifying 47+ critical issues...'
- **Fixes**:
  - Add `meta.home.description` and `meta.home.keywords` to messages
  - Update generateSEOMeta to use translations
- **Effort**: 30 minutes

### 1.2 Trust Logos Social Proof Text

- **File**: `components/hero/trust-logos.tsx`
- **Issues**: "1,000+ marketers trust our platform" and "4.9/5 average rating"
- **Fixes**:
  - Add `home.trustLogos.marketersText` and `home.trustLogos.ratingText`
  - Replace hardcoded text with translations
- **Effort**: 20 minutes

### 1.3 Key Image Alt Texts

- **Files**: Logo and dashboard images in navigation, footer, hero components
- **Issues**: Hardcoded alt texts like "AISEOTurbo Logo"
- **Fixes**:
  - Add `common.logo.alt`, `visuals.dashboard.alt` to messages
  - Update alt props
- **Effort**: 30 minutes

## Phase 2: Medium Priority - Component Cleanup

Focus on remaining hardcoded elements.

### 2.1 Sample Content in Homepage

- **File**: `app/[locale]/page.tsx` (sampleContent object)
- **Issues**: Hardcoded preview and full content text
- **Fixes**: Move to messages with proper formatting
- **Effort**: 30 minutes

## Phase 3: Validation and Testing

- Run type-check, test locale switching, validate changes

## Implementation Guidelines

### Translation Key Naming

- `meta.home.description`, `home.trustLogos.marketersText`, `common.logo.alt`

### Code Patterns

```tsx
// Meta
generateSEOMeta({
  description: t('meta.home.description'),
  keywords: t('meta.home.keywords').split(','),
})

// Trust text
{t('home.trustLogos.marketersText')}

// Alt texts
alt={t('common.logo.alt')}
```

## Success Metrics

- Homepage meta localized
- Trust indicators translated
- Alt texts accessible
- Build passes

## Timeline

- **Total Effort**: ~2 hours for Phase 1
- **Team**: 1 developer</content>
  <parameter name="filePath">c:\Users\Mile\Desktop\seo-audit-fresh\i18n-fix-plan-updated.md
