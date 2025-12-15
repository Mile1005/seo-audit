# 🎯 i18n Migration Plan - Complete & Safe Implementation

## 📊 Current State Analysis

### What We Have

- ✅ All pages at **root level** (`app/page.tsx`, `app/dashboard/page.tsx`, etc.)
- ✅ Root layout working (`app/layout.tsx`)
- ✅ Locale-specific layout ready (`app/[locale]/layout-main.tsx`)
- ✅ LanguageSwitcher component built (currently disabled)
- ✅ Translation files ready (492 keys × 6 locales)
- ✅ Database schema with `preferredLocale` field
- ✅ Middleware disabled (no locale routing)
- ✅ App fully functional at normal URLs

### Architecture Understanding

**Current Structure:**

```
app/
├── layout.tsx              ← ROOT LAYOUT (currently active)
├── page.tsx                ← Homepage (accessible at /)
├── dashboard/
│   ├── page.tsx           ← Dashboard (accessible at /dashboard)
│   ├── audit/page.tsx
│   └── ...
├── login/page.tsx
├── signup/page.tsx
└── [locale]/
    ├── layout.tsx         ← Locale-specific layout (not used yet)
    ├── layout-main.tsx    ← Extended locale layout (not used yet)
    └── dashboard/         ← Empty directory (created but no pages)
```

**Import Patterns in Your Code:**

- Server components use direct imports: `import { Component } from "@/components/..."`
- Dynamic imports: `const Component = dynamic(() => import("@/components/..."))`
- No "use client" in page files (mostly server components)
- Metadata exported from pages (server-side)

---

## 🎯 Migration Strategy: Hybrid Approach

Instead of moving ALL pages at once (risky), we'll use a **hybrid approach**:

### Phase 1: Setup Dual Routing (Safe)

- Keep existing pages working at root URLs
- Add locale-based routing ALONGSIDE (not replacing)
- Test incrementally
- No breaking changes

### Phase 2: Migrate Critical Pages

- Move dashboard pages to [locale] folder
- Enable language switcher for logged-in users only
- Test thoroughly

### Phase 3: Migrate Public Pages

- Move homepage and marketing pages
- Full language switcher everywhere
- Redirect root URLs to locale URLs

---

## 📋 Detailed Step-by-Step Plan

### STAGE 1: Pre-Migration Validation (5 minutes)

**Goal:** Ensure current state is stable

1. ✅ **Test current build**

   ```bash
   pnpm build
   ```

   - Verify: Build succeeds
   - Verify: No TypeScript errors

2. ✅ **Test current dev server**

   ```bash
   pnpm dev
   ```

   - Visit: `http://localhost:3000` (homepage)
   - Visit: `http://localhost:3000/dashboard`
   - Visit: `http://localhost:3000/login`
   - Verify: All pages load without errors

3. ✅ **Check no console errors**
   - Open browser DevTools
   - Verify: No React errors
   - Verify: No "more hooks" errors

---

### STAGE 2: Setup Locale Routing Foundation (15 minutes)

**Goal:** Configure routing without breaking existing pages

#### Step 2.1: Create i18n configuration (if not exists)

```typescript
// i18n.ts (verify it exists and has correct structure)
export const locales = ["en", "fr", "it", "es", "id", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  it: "Italiano",
  es: "Español",
  id: "Bahasa Indonesia",
  de: "Deutsch",
};
```

#### Step 2.2: Create lib/navigation.ts (verify exists)

```typescript
// lib/navigation.ts
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "@/i18n";

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
});
```

#### Step 2.3: Update middleware with HYBRID approach

```typescript
// middleware.ts - NEW HYBRID VERSION
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "./i18n";

// Create next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed", // /en is optional, other locales required
  localeDetection: true,
});

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Skip static files
  if (
    pathname.includes("/_next/") ||
    pathname.includes("/favicon.ico") ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|otf)$/)
  ) {
    return NextResponse.next();
  }

  // Check if path starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If it has locale, use intl middleware
  if (pathnameHasLocale) {
    return intlMiddleware(req);
  }

  // Otherwise, allow root-level pages to work normally
  // This allows both /dashboard and /en/dashboard to coexist
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

**Test:**

```bash
pnpm dev
# Visit: http://localhost:3000/dashboard (should work - root level)
# Visit: http://localhost:3000/en (should work - will use locale layout when page exists)
```

---

### STAGE 3: Migrate Dashboard Page (20 minutes)

**Goal:** Get ONE page working with locale routing

#### Step 3.1: Create locale-based dashboard page

```typescript
// app/[locale]/dashboard/page.tsx (NEW FILE)
import { Metadata } from 'next'
import DashboardContent from '@/components/dashboard/DashboardContent';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });

  return {
    title: t('dashboardTitle'),
    description: t('dashboardDescription'),
    robots: {
      index: false,
      follow: false
    }
  }
}

export default async function DashboardPage({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: 'dashboard' });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Server-rendered H2 sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            {t('seoOverview')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {t('seoOverviewDesc')}
          </p>
        </div>
        {/* ... similar for other cards */}
      </div>

      {/* Client-side content */}
      <DashboardContent />
    </div>
  )
}
```

#### Step 3.2: Add translation keys

```json
// messages/en.json - Add to dashboard namespace
{
  "dashboard": {
    "title": "AI SEO Turbo Dashboard",
    "subtitle": "Monitor your SEO performance and track key metrics",
    "seoOverview": "SEO Overview",
    "seoOverviewDesc": "Monitor your website's search engine optimization performance",
    "keywordTracking": "Keyword Tracking",
    "keywordTrackingDesc": "Track keyword rankings and performance metrics",
    "backlinkAnalysis": "Backlink Analysis",
    "backlinkAnalysisDesc": "Analyze your backlink profile and domain authority",
    "competitorInsights": "Competitor Insights",
    "competitorInsightsDesc": "Compare your performance against competitors"
  },
  "meta": {
    "dashboardTitle": "Dashboard - AI SEO Turbo Control Center",
    "dashboardDescription": "Access your comprehensive SEO dashboard to monitor rankings, track keywords, analyze competitors, and optimize your website performance."
  }
}
```

**Test:**

```bash
pnpm dev
# Visit: http://localhost:3000/dashboard (old - should still work)
# Visit: http://localhost:3000/en/dashboard (new - should work with translations)
# Visit: http://localhost:3000/fr/dashboard (should work with French translations)
```

---

### STAGE 4: Enable Language Switcher (10 minutes)

**Goal:** Show language switcher in dashboard only

#### Step 4.1: Update DashboardHeader

```typescript
// components/dashboard/DashboardHeader.tsx
// UNCOMMENT the language switcher import and usage
import { LanguageSwitcher } from "@/components/layout/language-switcher"

// In JSX, add between logo and project switcher:
<LanguageSwitcher />
```

#### Step 4.2: Verify LanguageSwitcher uses correct hooks

```typescript
// components/layout/language-switcher.tsx
// Should use:
import { usePathname, useRouter } from "@/lib/navigation"; // next-intl navigation
import { useLocale, useTranslations } from "next-intl";
```

**Test:**

```bash
pnpm dev
# Visit: http://localhost:3000/en/dashboard
# Look for language switcher in header
# Click to switch languages
# Verify URL changes to /fr/dashboard, /es/dashboard, etc.
# Verify translations update
# Check browser DevTools for errors
```

---

### STAGE 5: Migrate Remaining Dashboard Pages (30 minutes)

**Goal:** Move all dashboard sub-pages

#### Step 5.1: Identify all dashboard pages

```bash
# List all pages to migrate:
app/dashboard/audit/page.tsx
app/dashboard/keywords/page.tsx
app/dashboard/backlinks/page.tsx
app/dashboard/competitors/page.tsx
app/dashboard/content/page.tsx
app/dashboard/technical/page.tsx
app/dashboard/settings/page.tsx
# ... etc
```

#### Step 5.2: Migrate each page

For EACH page:

1. Copy file to `app/[locale]/dashboard/[subpage]/page.tsx`
2. Add `params: { locale: string }` to props
3. Use `getTranslations()` for server components
4. Update metadata to use translations
5. Test individual page

**Template for migration:**

```typescript
// Before (app/dashboard/audit/page.tsx)
export const metadata: Metadata = {
  title: 'Audit Results - AI SEO Turbo',
  description: 'View your comprehensive SEO audit results'
}

export default function AuditPage() {
  return <AuditContent />
}

// After (app/[locale]/dashboard/audit/page.tsx)
import { getTranslations } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });
  return {
    title: t('auditTitle'),
    description: t('auditDescription')
  }
}

export default function AuditPage({ params }: Props) {
  return <AuditContent />
}
```

**Test after each migration:**

```bash
# Visit the locale version and verify it works:
# http://localhost:3000/en/dashboard/audit
# http://localhost:3000/fr/dashboard/audit
```

---

### STAGE 6: Migrate Public Pages (40 minutes)

**Goal:** Move homepage and marketing pages

#### Step 6.1: Homepage

```typescript
// app/[locale]/page.tsx
import { HeroSection } from "@/components/hero/hero-section"
import { MainLayout } from "@/components/layout/main-layout"
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next'

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    // ... rest of metadata
  }
}

export default async function HomePage({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: 'home' });

  return (
    <MainLayout>
      <HeroSection locale={params.locale} />
      {/* ... rest of homepage */}
    </MainLayout>
  )
}
```

#### Step 6.2: Other public pages

- `/pricing` → `/[locale]/pricing/page.tsx`
- `/features` → `/[locale]/features/page.tsx`
- `/about` → `/[locale]/about/page.tsx`
- etc.

---

### STAGE 7: Setup Redirects (10 minutes)

**Goal:** Redirect old URLs to locale URLs

#### Step 7.1: Update middleware for redirects

```typescript
// middleware.ts - Add redirect logic
export function middleware(req: NextRequest) {
  // ... existing code ...

  // If path doesn't have locale AND is not an exception
  if (!pathnameHasLocale) {
    // Check if corresponding locale page exists
    const localePath = `/${defaultLocale}${pathname}`;

    // Redirect to default locale version
    return NextResponse.redirect(new URL(localePath, req.url));
  }

  return intlMiddleware(req);
}
```

**Test:**

```bash
# Visit: http://localhost:3000/dashboard
# Should redirect to: http://localhost:3000/en/dashboard
```

---

### STAGE 8: Cleanup (5 minutes)

**Goal:** Remove old root-level pages

#### Step 8.1: Keep root layout, remove pages

```bash
# KEEP: app/layout.tsx (root layout needed)
# REMOVE: app/page.tsx (now at app/[locale]/page.tsx)
# REMOVE: app/dashboard/page.tsx (now at app/[locale]/dashboard/page.tsx)
# etc.
```

#### Step 8.2: Final test

```bash
pnpm build
pnpm start
# Test all major routes with different locales
# Verify language switcher works
# Check for errors
```

---

## 🛡️ Safety Measures

### At Each Stage:

1. ✅ **Build before continuing**

   ```bash
   pnpm build
   ```

   - If build fails, revert last change

2. ✅ **Test in browser**
   - Check the specific page you just migrated
   - Check language switcher
   - Check for console errors

3. ✅ **Git commit**

   ```bash
   git add .
   git commit -m "feat: migrate [page-name] to locale routing"
   ```

   - Easy rollback if needed

### Testing Checklist for Each Page:

- [ ] Page loads at `/en/[path]`
- [ ] Page loads at `/fr/[path]`
- [ ] Translations are correct
- [ ] No console errors
- [ ] Language switcher works
- [ ] Auth still works (for protected pages)
- [ ] Links navigate correctly

---

## 🚨 Rollback Plan

If something breaks at any stage:

```bash
# Rollback last commit
git reset --hard HEAD~1

# Or disable middleware again
# In middleware.ts, set:
export function middleware(req: NextRequest) {
  return NextResponse.next(); // Pass through everything
}

# Disable language switcher in DashboardHeader.tsx
// import { LanguageSwitcher } from "..."
// {/* <LanguageSwitcher /> */}
```

---

## 📝 Translation Keys Needed

### Core Namespaces:

```json
// messages/en.json
{
  "common": {
    "selectLanguage": "Select Language",
    "languageChanged": "Language Changed",
    "languageChangeFailed": "Failed to change language",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success"
  },
  "meta": {
    "defaultTitle": "SEO Audit Tool - Boost Rankings Fast | AI SEO Turbo",
    "defaultDescription": "Get actionable SEO insights...",
    "dashboardTitle": "Dashboard - AI SEO Turbo Control Center",
    "dashboardDescription": "Access your comprehensive SEO dashboard...",
    "auditTitle": "Audit Results - AI SEO Turbo",
    "auditDescription": "View your comprehensive SEO audit results"
  },
  "dashboard": {
    "title": "AI SEO Turbo Dashboard",
    "subtitle": "Monitor your SEO performance and track key metrics"
    // ... more keys
  }
}
```

Replicate for all 6 locales: en, fr, it, es, id, de

---

## 🎯 Estimated Timeline

- **Stage 1** (Validation): 5 minutes
- **Stage 2** (Foundation): 15 minutes
- **Stage 3** (Dashboard page): 20 minutes
- **Stage 4** (Language switcher): 10 minutes
- **Stage 5** (Dashboard sub-pages): 30 minutes
- **Stage 6** (Public pages): 40 minutes
- **Stage 7** (Redirects): 10 minutes
- **Stage 8** (Cleanup): 5 minutes

**Total: ~2.5 hours** (with testing)

---

## ✅ Success Criteria

When complete:

- [ ] All pages accessible at `/en/[path]`, `/fr/[path]`, etc.
- [ ] Language switcher visible in dashboard
- [ ] Language changes update URL and content
- [ ] User preference saved to database
- [ ] Guest preference saved to cookie
- [ ] No 404 errors
- [ ] No React errors
- [ ] Build succeeds
- [ ] All tests pass
- [ ] No console errors

---

## 🎬 Ready to Start?

I'll execute this plan step by step, testing at each stage. We can pause at any point if you see issues. Just say:

**"Let's start Stage 1"** and I'll begin! 🚀
