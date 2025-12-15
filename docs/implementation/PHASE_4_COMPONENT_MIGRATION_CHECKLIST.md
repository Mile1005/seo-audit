# 🔄 i18n Integration - Component Refactoring Checklist

## ✅ Phase 4: Complete i18n Integration into Core Components

### 📊 Implementation Status

**Total Files to Refactor**: 87 files  
**Completed**: 0 files  
**In Progress**: 1 file  
**Pending**: 86 files

---

## 🎯 Priority 1: Critical User-Facing Pages (15 files)

### ✅ Layout & Core Structure

- [ ] `app/[locale]/layout-main.tsx` - **ALREADY COMPLETE** ✨
- [ ] `app/page.tsx` - Homepage with hero, features, pricing
- [ ] `app/[locale]/page.tsx` - Localized homepage wrapper

### 🔍 Audit Interface (47-Point Analysis)

- [ ] `app/dashboard/audit/page.tsx` - Main audit interface
- [ ] `components/audit/ScoreSummary.tsx` - Score cards (SEO, Performance, Accessibility)
- [ ] `components/audit/CoreWebVitalsGrid.tsx` - LCP, FID, CLS metrics
- [ ] `components/audit/IssuesList.tsx` - Critical issues display
- [ ] `components/audit/QuickWinsList.tsx` - Quick win recommendations
- [ ] `components/audit/MetaTagsPanel.tsx` - Meta tags analysis
- [ ] `components/audit/HeadingStructure.tsx` - H1-H6 structure
- [ ] `components/audit/SocialMetaPanel.tsx` - OG tags, Twitter cards
- [ ] `components/audit/StructuredDataPanel.tsx` - Schema.org validation
- [ ] `components/audit/PerformanceOpportunities.tsx` - Performance optimizations
- [ ] `components/audit/PerformanceDiagnostics.tsx` - Performance diagnostics
- [ ] `components/audit/HistoryPanel.tsx` - Audit history
- [ ] `components/audit/CrawledPagesAnalysis.tsx` - Multi-page analysis

---

## 🎯 Priority 2: Dashboard Pages (8 files)

### 📊 Dashboard Main

- [ ] `app/dashboard/page.tsx` - Dashboard overview
- [ ] `components/dashboard/overview-stats.tsx` - Statistics cards
- [ ] `components/dashboard/recent-audits.tsx` - Recent audits list

### 🔑 Keywords Tool (1100+ Variations)

- [ ] `app/dashboard/keywords/page.tsx` - Keyword research interface
- [ ] `components/keywords/keyword-table.tsx` - Search volume, difficulty, CPC
- [ ] `components/keywords/variations-generator.tsx` - 1100+ keyword variations

### 🔗 Backlink Monitor

- [ ] `app/dashboard/backlinks/page.tsx` - Backlink analysis
- [ ] `components/backlinks/backlink-table.tsx` - DA, PA, anchor text

### 🏆 Competitor Analysis

- [ ] `app/dashboard/competitors/page.tsx` - Competitor tracking

---

## 🎯 Priority 3: Authentication & User Management (10 files)

### 🔐 Auth Pages

- [ ] `app/login/page.tsx` - Login page
- [ ] `app/signup/page.tsx` - Signup page
- [ ] `app/forgot-password/page.tsx` - Password reset
- [ ] `app/reset-password/page.tsx` - Reset password form
- [ ] `app/verify-email/page.tsx` - Email verification
- [ ] `components/auth/auth-provider.tsx` - Auth context (preserve NextAuth)
- [ ] `components/auth/login-form.tsx` - Login form component
- [ ] `components/auth/signup-form.tsx` - Signup form component
- [ ] `components/auth/oauth-buttons.tsx` - Google/GitHub OAuth

### 👤 User Profile

- [ ] `app/dashboard/profile/page.tsx` - User profile page
- [ ] `app/dashboard/settings/page.tsx` - Account settings

---

## 🎯 Priority 4: Marketing Pages (12 files)

### 💰 Pricing & Features

- [ ] `app/pricing/page.tsx` - Pricing tiers (Free, Pro, Enterprise)
- [ ] `components/pricing/pricing-cards.tsx` - Plan cards
- [ ] `components/pricing/pricing-faq.tsx` - Pricing FAQ
- [ ] `app/features/page.tsx` - Features page
- [ ] `components/features/features-showcase.tsx` - Feature grid
- [ ] `components/features/interactive-demo.tsx` - Demo widget

### 📚 Content Pages

- [ ] `app/about/page.tsx` - About page
- [ ] `app/contact/page.tsx` - Contact page
- [ ] `app/help/page.tsx` - Help center
- [ ] `app/case-studies/page.tsx` - Case studies
- [ ] `app/blog/page.tsx` - Blog listing
- [ ] `app/status/page.tsx` - Status page

---

## 🎯 Priority 5: Navigation & Layout (8 files)

### 🧭 Navigation Components

- [ ] `components/layout/main-layout.tsx` - Main layout wrapper
- [ ] `components/navigation/main-nav.tsx` - Primary navigation
- [ ] `components/navigation/mobile-nav.tsx` - Mobile menu
- [ ] `components/navigation/user-nav.tsx` - User dropdown
- [ ] `components/layout/footer.tsx` - Footer with links
- [ ] `components/layout/language-switcher.tsx` - **ALREADY COMPLETE** ✨
- [ ] `components/layout/breadcrumbs.tsx` - Breadcrumb navigation
- [ ] `components/navigation/sidebar.tsx` - Dashboard sidebar

---

## 🎯 Priority 6: Shared UI Components (15 files)

### 🎨 Reusable Components

- [ ] `components/hero/hero-section.tsx` - Homepage hero
- [ ] `components/hero/trust-logos.tsx` - Social proof logos
- [ ] `components/testimonials/testimonials-carousel.tsx` - Customer reviews
- [ ] `components/lead/email-capture-inline.tsx` - Email capture form
- [ ] `components/lead/exit-intent-modal.tsx` - Exit popup
- [ ] `components/lead/content-gate.tsx` - Content gate
- [ ] `components/forms/contact-form.tsx` - Contact form
- [ ] `components/notifications/toast-provider.tsx` - Toast notifications
- [ ] `components/modals/confirmation-dialog.tsx` - Confirmation dialogs
- [ ] `components/ui/empty-state.tsx` - Empty state placeholders
- [ ] `components/ui/error-message.tsx` - Error displays
- [ ] `components/ui/loading-spinner.tsx` - Loading states
- [ ] `components/skeletons/*.tsx` - Skeleton loaders (10 files)

---

## 🎯 Priority 7: Projects & Reports (8 files)

### 📁 Project Management

- [ ] `app/dashboard/projects/page.tsx` - Projects list
- [ ] `components/projects/project-card.tsx` - Project card
- [ ] `components/projects/project-form.tsx` - Create/edit project
- [ ] `components/projects/delete-dialog.tsx` - Delete confirmation

### 📄 Reports & Exports

- [ ] `app/dashboard/reports/page.tsx` - Reports page
- [ ] `components/reports/export-button.tsx` - PDF/CSV export
- [ ] `components/reports/scheduled-reports.tsx` - Report scheduling
- [ ] `components/reports/report-history.tsx` - Report history

---

## 🎯 Priority 8: Legal & Compliance (4 files)

### ⚖️ Legal Pages

- [ ] `app/privacy/page.tsx` - Privacy policy
- [ ] `app/terms/page.tsx` - Terms of service
- [ ] `components/privacy/consent-banner.tsx` - Cookie consent
- [ ] `components/privacy/gdpr-compliance.tsx` - GDPR notice

---

## 🎯 Priority 9: Error Pages (5 files)

### ❌ Error Handling

- [ ] `app/not-found.tsx` - 404 page
- [ ] `app/error.tsx` - 500 error page
- [ ] `components/errors/network-error.tsx` - Network error
- [ ] `components/errors/rate-limit-error.tsx` - Rate limit exceeded
- [ ] `components/errors/maintenance-mode.tsx` - Maintenance page

---

## 📋 Refactoring Patterns

### Pattern 1: Server Components (use `getTranslations`)

```typescript
// ❌ BEFORE
export default function Page() {
  return <h1>SEO Audit Tool</h1>;
}

// ✅ AFTER
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('home');
  return <h1>{t('title')}</h1>;
}
```

### Pattern 2: Client Components (use `useTranslations`)

```typescript
// ❌ BEFORE
'use client';
export default function Button() {
  return <button>Start Audit</button>;
}

// ✅ AFTER
'use client';
import { useTranslations } from 'next-intl';

export default function Button() {
  const t = useTranslations('audit');
  return <button>{t('startAudit')}</button>;
}
```

### Pattern 3: Dynamic Values with Interpolation

```typescript
// ❌ BEFORE
<p>Welcome back, {userName}!</p>

// ✅ AFTER
const t = useTranslations('dashboard');
<p>{t('welcome', { name: userName })}</p>
```

### Pattern 4: Pluralization

```typescript
// ❌ BEFORE
<span>{count === 1 ? '1 Point' : `${count} Points`}</span>

// ✅ AFTER
const t = useTranslations('audit');
<span>{t('points', { count })}</span>
```

### Pattern 5: Nested Keys

```typescript
// ❌ BEFORE
<h2>Core Web Vitals</h2>
<p>Largest Contentful Paint (LCP)</p>

// ✅ AFTER
const t = useTranslations('audit');
<h2>{t('coreWebVitals.title')}</h2>
<p>{t('coreWebVitals.lcp')}</p>
```

### Pattern 6: Metadata (Server-Side)

```typescript
// ❌ BEFORE
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Monitor your SEO performance",
};

// ✅ AFTER
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "dashboard" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}
```

---

## 🔍 Testing Checklist

### Per-Component Testing

- [ ] Component renders in all 6 locales (en, fr, it, es, id, de)
- [ ] Dynamic values interpolate correctly (`{name}`, `{count}`)
- [ ] Pluralization works for different counts
- [ ] TypeScript types are preserved
- [ ] Props interface unchanged (backward compatible)
- [ ] No console errors in browser
- [ ] Mobile responsive (Core Web Vitals maintained)
- [ ] Loading states work correctly
- [ ] Error states display translated messages

### Page-Level Testing

- [ ] All text visible and translated (no hardcoded English)
- [ ] Metadata (title, description) translated
- [ ] Hreflang tags present for all locales
- [ ] URL structure correct (`/`, `/fr`, `/it`, etc.)
- [ ] Navigation links work across locales
- [ ] Forms submit with correct locale
- [ ] API calls pass locale parameter
- [ ] Date/time formatting localized
- [ ] Currency formatting correct per locale

### SEO Testing

- [ ] Translated meta tags in `<head>`
- [ ] Hreflang links for all locales
- [ ] Canonical URL set correctly
- [ ] Open Graph tags translated
- [ ] Twitter Cards translated
- [ ] Structured data (JSON-LD) translated where applicable
- [ ] Alt text for images translated
- [ ] Page title format: `{page} | AI SEO Turbo`

---

## 🚀 Migration Strategy

### Phase 4A: Critical Path (Week 1)

1. ✅ Layout and providers (DONE)
2. Homepage (`app/page.tsx`)
3. Audit page (`app/dashboard/audit/page.tsx`)
4. Login/Signup (`app/login`, `app/signup`)

### Phase 4B: Dashboard (Week 2)

5. Dashboard overview
6. Keywords tool
7. Backlink monitor
8. Competitor analysis

### Phase 4C: Marketing (Week 3)

9. Pricing page
10. Features page
11. Contact page
12. Help center

### Phase 4D: Supporting Pages (Week 4)

13. Profile & settings
14. Projects & reports
15. Error pages
16. Legal pages

---

## 📊 Progress Tracking

| Priority           | Files  | Status         | Completion    |
| ------------------ | ------ | -------------- | ------------- |
| P1: Critical Pages | 15     | 🟡 In Progress | 6% (1/15)     |
| P2: Dashboard      | 8      | ⚪ Pending     | 0% (0/8)      |
| P3: Auth & User    | 10     | ⚪ Pending     | 0% (0/10)     |
| P4: Marketing      | 12     | ⚪ Pending     | 0% (0/12)     |
| P5: Navigation     | 8      | 🟢 Partial     | 12% (1/8)     |
| P6: Shared UI      | 15     | ⚪ Pending     | 0% (0/15)     |
| P7: Projects       | 8      | ⚪ Pending     | 0% (0/8)      |
| P8: Legal          | 4      | ⚪ Pending     | 0% (0/4)      |
| P9: Errors         | 5      | ⚪ Pending     | 0% (0/5)      |
| **TOTAL**          | **85** | **🟡**         | **2% (2/85)** |

---

## 🎯 Next Actions

1. **Immediate**: Refactor `app/dashboard/audit/page.tsx` (Priority 1)
2. **Next**: Update audit sub-components (ScoreSummary, CoreWebVitalsGrid)
3. **Then**: Refactor homepage (`app/page.tsx`)
4. **After**: Auth flows (login, signup)

---

## 📚 Resources

- **Translation Files**: `messages/{locale}.json`
- **TypeScript Types**: `types/messages.d.ts`
- **Usage Guide**: `messages/USAGE_GUIDE.md`
- **i18n Config**: `i18n.ts`
- **Navigation Utilities**: `lib/navigation.ts`

---

**Status**: Ready for Phase 4 implementation 🚀  
**Last Updated**: 2025-11-01
