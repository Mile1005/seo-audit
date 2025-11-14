# i18n Fix Plan for aiseoturbo.com

## Overview
Based on the automated i18n audit, the project has 65% fully translated content, 30% partially translated, and 5% untranslated. Total hardcodes identified: ~332 instances across 115 page files and 200+ components. This plan outlines phased fixes to achieve 100% translation coverage.

## Phase 1: High Priority - SEO and Accessibility (Week 1-2)
Focus on public-facing SEO elements and accessibility to prevent traffic loss and compliance issues.

### 1.1 Homepage Meta Descriptions and Titles
- **Files**: `app/[locale]/page.tsx`, `app/[locale]/features/page.tsx`, `app/[locale]/pricing/page.tsx`
- **Issues**: Hardcoded descriptions in `generateMetadata`
- **Fixes**:
  - Extract to `messages/[locale].json` under `meta.home.description`, `meta.features.description`, etc.
  - Update `generateSEOMeta` calls to use `t('meta.home.description')`
  - Ensure all locales have translations
- **Effort**: 2 hours
- **Impact**: High - Affects SERP appearance and click-through rates

### 1.2 Image Alt Texts ✅ COMPLETED
- **Files**: All components with `<img>` or `<Image>` tags
- **Issues**: 29 hardcoded alt attributes
- **Fixes**: ✅ DONE
  - Added alt text keys to `messages/[locale].json` under `home.images.*` namespace
  - Updated `hero-mockup.tsx` and `feature-mockups.tsx` to use `useTranslations` hook
  - Replaced hardcoded alt with `alt={t('home.images.heroDashboard')}` etc.
  - Verified Next.js Image components use proper alt props
  - All 6 locales (en/fr/it/es/de/id) have complete alt text translations
- **Effort**: 1 hour ✅ COMPLETED
- **Impact**: High - Accessibility and SEO compliance ✅ ACHIEVED

### 1.3 Hero Section Subtitles and CTAs
- **Files**: `components/hero/hero-section.tsx`
- **Issues**: Hardcoded subtitle with HTML tags
- **Fixes**:
  - Move subtitle to messages with proper ICU formatting if needed
  - Handle HTML tags in translation rendering
- **Effort**: 1 hour
- **Impact**: High - Main conversion element

## Phase 2: Medium Priority - User Experience (Week 3-4)
Focus on forms, interactive elements, and dashboard for better UX.

### 2.1 Authentication Forms
- **Files**: `app/[locale]/login/page.tsx`, `app/[locale]/signup/page.tsx`, `components/auth/login-form.tsx`
- **Issues**: 15 placeholder and label hardcodes
- **Fixes**:
  - Add auth namespace keys: `auth.email.placeholder`, `auth.password.label`
  - Update form components to use `t()` for all text
  - Ensure error messages are translated
- **Effort**: 1.5 hours
- **Impact**: Medium - User onboarding experience

### 2.2 Dashboard UI Strings
- **Files**: `app/[locale]/dashboard/page.tsx`, `components/dashboard/*.tsx`
- **Issues**: 30 hardcoded strings in buttons, labels, tooltips
- **Fixes**:
  - Create dashboard namespace in messages
  - Extract all UI text to translations
  - Handle dynamic content with ICU plurals
- **Effort**: 2 hours
- **Impact**: Medium - User retention and usability

### 2.3 Sample Content and Previews
- **Files**: `app/[locale]/page.tsx` (sampleContent object)
- **Issues**: Hardcoded preview and full content text
- **Fixes**:
  - Move content to messages with proper formatting
  - Consider using markdown or HTML in translations if needed
- **Effort**: 1 hour
- **Impact**: Medium - Content gate effectiveness

## Phase 3: Low Priority - Polish and Legal (Week 5-6)
Complete remaining translations for completeness.

### 3.1 Legal Pages Meta
- **Files**: `app/[locale]/privacy/page.tsx`, `app/[locale]/terms/page.tsx`
- **Issues**: Basic meta titles and descriptions
- **Fixes**:
  - Add legal namespace keys
  - Update generateMetadata
- **Effort**: 30 minutes
- **Impact**: Low - Legal page SEO

### 3.2 Help and Blog Content
- **Files**: `app/[locale]/help/**/*.tsx`, `app/[locale]/blog/**/*.tsx`
- **Issues**: Mixed hardcodes in content
- **Fixes**:
  - Audit and extract remaining hardcodes
  - Ensure content uses t() consistently
- **Effort**: 2 hours
- **Impact**: Low - Support content localization

### 3.3 Component Library Cleanup
- **Files**: `components/ui/*.tsx`, `components/forms/*.tsx`
- **Issues**: Remaining hardcodes in shared components
- **Fixes**:
  - Systematic extraction of all hardcoded strings
  - Update component props to accept translation keys
- **Effort**: 1.5 hours
- **Impact**: Low - Code maintainability

## Phase 4: Validation and Testing (Week 7)
Ensure everything works correctly.

### 4.1 Translation Completeness Check
- Run automated audit again
- Verify all locales have 100% parity
- Check for empty values in messages

### 4.2 Build and Runtime Testing
- Run `pnpm type-check` to ensure no type errors
- Test locale switching in browser
- Verify hreflang tags and canonical URLs

### 4.3 User Acceptance Testing
- Test key user flows in all locales
- Check for hydration mismatches
- Validate SEO meta in different locales

## Implementation Guidelines

### Translation Key Naming Convention
- Use dot notation: `namespace.subnamespace.key`
- Examples: `home.hero.title`, `auth.login.email.placeholder`
- Keep keys descriptive and hierarchical

### Handling Dynamic Content
- Use ICU MessageFormat for plurals: `{count, plural, one {# item} other {# items}}`
- For interpolations: `Hello {name}!`

### Code Patterns
```tsx
// Good: Use t() for all user-facing text
<h1>{t('page.title')}</h1>
<input placeholder={t('form.email.placeholder')} />

// Avoid: Hardcoded strings
<h1>Hardcoded Title</h1>
<input placeholder="Enter email" />
```

### Message File Structure
```json
{
  "common": {
    "loading": "Loading...",
    "save": "Save"
  },
  "home": {
    "hero": {
      "title": "AI-Powered SEO Audits",
      "subtitle": "Get insights that boost rankings"
    }
  }
}
```

## Success Metrics
- 100% translation coverage (0 hardcodes)
- All locales have complete message parity
- Build passes without i18n warnings
- SEO meta localized correctly
- Accessibility compliance (alt texts)

## Timeline and Resources
- **Total Effort**: ~12 hours
- **Team**: 1-2 developers familiar with Next.js and i18n
- **Tools**: next-intl, automated audit scripts
- **Testing**: Manual QA in all locales

This plan prioritizes impact while maintaining development velocity. Start with Phase 1 to fix critical SEO issues immediately.</content>
<parameter name="filePath">c:\Users\Mile\Desktop\seo-audit-fresh\i18n-fix-plan.md