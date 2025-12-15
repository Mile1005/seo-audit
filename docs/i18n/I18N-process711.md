# I18N Process 7.11 – Full Completion Plan

Document date: 2025-11-07
**Last updated: 2025-11-07** - Blog pages internationalization completed

This document consolidates the current i18n implementation status and provides a clear, phased plan to reach "fully translated" across all public-facing content, with concrete acceptance criteria, strategies, and verification steps.

---

## Executive summary

- Current state
  - 6 locales live: en, fr, it, es, de, id
  - Routing: Next.js App Router + next-intl with localePrefix: "as-needed" (English at `/`, others under `/<locale>`)
  - Language switcher: cookie + optional user preference persistence
  - i18n tests: Passing (key parity)
  - Typecheck: Passing
- Pages fully translated: All feature pages, pricing, case studies, help center, contact, blog index, 6 technical blog posts
- Blog articles: All 6 translated via t() namespaces- Remaining top items to achieve "fully translated"
  1. Localize legal pages (Privacy, Terms) and decide routing strategy
  2. Make blog structured data + canonical URLs locale-aware (include inLanguage)
  3. Enable preferred-locale redirect logic in middleware (currently commented out)
  4. Add automation: tests to catch raw English content and schema URL mismatches
  5. (Optional) Split translation files by namespace to reduce bundle overhead
  6. Hreflang alternates in sitemap for all localized routes
  7. Audit & localize trust pages (careers, community, status, onboarding) if public

---

## Architecture recap (as-built)

- i18n config: `i18n.ts`
  - Locales: `['en','fr','it','es','id','de']`
  - `getRequestConfig` loads `./messages/${locale}.json`

- Routing utilities: `lib/navigation.ts`
  - `localePrefix: 'as-needed'` → EN on `/`, others on `/<locale>`

- Middleware: `middleware.ts`
  - Uses next-intl middleware
  - Skips `/api` and selected non-localized root pages: `/demo`, `/careers`, `/community`, `/privacy`, `/terms`, `/status`, `/share`, `/onboarding`
  - Preferred-locale redirect logic exists but is commented out

- Language switcher: `components/layout/language-switcher.tsx`
  - Updates `NEXT_LOCALE` cookie and user preference (if authenticated), then client-side navigates

- Messages: `messages/{locale}.json`
  - Large monolithic files (~5.4k lines in `en.json`)

- Blog implementation status
  - Translated via t() namespaces: `technical-seo-best-practices-2025`, `core-web-vitals-optimization-guide`, `ai-powered-seo-future`, `complete-seo-audit-checklist-2025`, `local-seo-strategies-that-work`, `content-seo-creating-search-friendly-content`
  - Structured data generated but canonical/URL not locale-aware

---

## Problems to finish (with IDs, strategies, estimates)

P1. Legal pages not localized

- Affected files:
  - `app/privacy/page.tsx` (English-only)
  - `app/terms/page.tsx` (English-only)
  - Middleware excludes these from localization
- Strategy (choose one)
  - A) Full localization: move content under `app/[locale]/privacy` and `app/[locale]/terms`, add `legal.privacy`, `legal.terms` namespaces; remove from `nonLocalizedPaths`
  - B) English canonical with localized alternates: keep root in EN, add translated pages and hreflang alternates, or add notice/disclaimer if translations are non-authoritative
- Acceptance
  - Per-locale content served at localized routes (if A)
  - Hreflang/alternate links correct; canonical coherent
  - Legal review completed on translations
- Estimate: 8–12 hours (depends on legal review)
- Affected files:
  - `app/privacy/page.tsx` (English-only)
  - `app/terms/page.tsx` (English-only)
  - Middleware excludes these from localization
- Strategy (choose one)
  - A) Full localization: move content under `app/[locale]/privacy` and `app/[locale]/terms`, add `legal.privacy`, `legal.terms` namespaces; remove from `nonLocalizedPaths`
  - B) English canonical with localized alternates: keep root in EN, add translated pages and hreflang alternates, or add notice/disclaimer if translations are non-authoritative
- Acceptance
  - Per-locale content served at localized routes (if A)
  - Hreflang/alternate links correct; canonical coherent
  - Legal review completed on translations
- Estimate: 8–12 hours (depends on legal review)

P2. Blog structured data and canonical not locale-aware

- Affected: all blog article pages
- Strategy
  - Centralize a locale-aware URL builder (respecting EN at `/` and others at `/<locale>`)
  - Add `inLanguage` to structured data
  - Ensure canonical and `StructuredData` URLs reflect current locale
- Acceptance
  - Viewing `/fr/blog/...` shows FR URLs in schema and canonical; `inLanguage` set to `fr`
- Estimate: 1–2 hours

P3. Preferred-locale redirect disabled in middleware

- Strategy
  - Uncomment and verify cookie-based redirect logic
  - Add safety exclusions for paths where redirect could be confusing (e.g., auth callbacks)
- Acceptance
  - Users consistently land on preferred locale after choosing language
- Estimate: 0.5–1 hour

P4. Missing automation for untranslated content

- Strategy
  - Add test to scan `app/[locale]/blog/**/*.tsx` for large raw English blocks in non-EN pages (heuristic: > N contiguous A–Z characters outside `t(` usage)
  - Add CI step to fail on detection
- Acceptance
  - CI fails if future contributors add raw English to localized pages
- Estimate: 1–3 hours

P5. Monolithic translation files (performance/maintainability)

- Strategy (optional but recommended)
  - Split messages by namespace, e.g., `messages/en/blog.coreWebVitals2025.json`
  - Update `getRequestConfig` to lazy-load namespaces as needed
- Acceptance
  - Measured reduction in initial parse time/memory
- Estimate: 6–10 hours (mechanical + QA)

P6. Help center subpages audit

- Strategy
  - Verify each `app/[locale]/help/**/page.tsx` uses `t()`; extract any remaining English strings
- Acceptance
  - All help articles localized; parity test green
- Estimate: 3–6 hours

P7. Hreflang alternates in sitemap

- Strategy
  - Extend sitemap generator to emit alternates per locale for every localized page
- Acceptance
  - Search Console shows hreflang coverage for localized routes
- Estimate: 1–2 hours

P8. Trust pages localization (if public): careers, community, status, onboarding

- Strategy
  - Add namespaces and integrate translations; remove from `nonLocalizedPaths`
- Acceptance
  - Public-facing trust pages localized with parity
- Estimate: 4–8 hours

P9. Fallback detection at runtime (dev-only)

- Strategy
  - Wrap `useTranslations` to warn in dev when non-EN locale returns an EN string (heuristic)
- Acceptance
  - Visible console warnings during QA for missed keys
- Estimate: 1–2 hours

P10. Locale addition guide + RTL readiness

- Strategy
  - Add `I18N_LOCALE_ADD_GUIDE.md` covering adding locales, flags, RTL handling, tests
- Acceptance
  - A new contributor can add a locale in < 15 minutes
- Estimate: 1–2 hours

---

## Phased execution plan

### Phase 1 – Immediate (Highest ROI)

Scope: P1, P2, P3

Tasks

1. Localize legal pages and finalize routing approach
2. Implement locale-aware schema/canonical URLs (`inLanguage`)
3. Enable preferred-locale redirect logic in middleware

Acceptance criteria

- Legal pages localized (and/or canonical/hreflang strategy documented and implemented)
- Blog schemas show locale URLs + `inLanguage`
- Preferred-locale redirect works end-to-end

Verification

- Run i18n parity tests and typecheck
- Manual spot-check in each locale for the legal pages
- Validate structured data in Rich Results Test (optional)

Estimate: 9–15 hours

### Phase 2 – Content parity & trust

Scope: P6, P8

Tasks

1. Audit help center subpages for any remaining hardcoded strings
2. Localize careers/community/status/onboarding (if intended public pages)

Acceptance criteria

- All help subpages and trust pages use `t()`; parity holds across locales

Verification

- i18n tests pass; manual spot-checks on key subpages

Estimate: 7–14 hours

### Phase 3 – Quality & automation

Scope: P4, P7, P10

Tasks

1. Add untranslated-content detection test for blog/content pages
2. Emit hreflang alternates in sitemap
3. Write locale addition guide and document RTL readiness

Acceptance criteria

- CI fails on new raw English in localized pages
- Sitemap contains alternate hreflang entries per locale
- Guide empowers a new contributor to add a locale quickly

Verification

- CI runs green, sitemap validated in Search Console (post-deploy)

Estimate: 3–6 hours

### Phase 4 – Performance & ergonomics (optional but recommended)

Scope: P5, P9

Tasks

1. Split translation files by namespace; update loader to lazy-load
2. Add dev-only runtime fallback warnings around `useTranslations`

Acceptance criteria

- Measurable build/runtime improvement (documented)
- Dev warnings surface missed translations during QA

Verification

- Compare before/after timings; ensure parity tests keep passing

Estimate: 7–12 hours

---

## Detailed task guidance

### T1. Localize legal pages (P1)

- If choosing localized routing
  - Move to `app/[locale]/privacy` and `app/[locale]/terms`
  - Create `legal.privacy` and `legal.terms` namespaces
  - Remove `/privacy` & `/terms` from `nonLocalizedPaths` in `middleware.ts`
- If keeping canonical in EN
  - Keep `/privacy` and `/terms` as EN canonical
  - Provide translated versions under locale paths + hreflang
  - Add a disclaimer if legal requires EN precedence
- If choosing localized routing
  - Move to `app/[locale]/privacy` and `app/[locale]/terms`
  - Create `legal.privacy` and `legal.terms` namespaces
  - Remove `/privacy` & `/terms` from `nonLocalizedPaths` in `middleware.ts`
- If keeping canonical in EN
  - Keep `/privacy` and `/terms` as EN canonical
  - Provide translated versions under locale paths + hreflang
  - Add a disclaimer if legal requires EN precedence

### T2. Locale-aware schema & canonical (P2)

- Centralize a helper: `lib/localeUrl.ts`:
  - `blogUrl(locale, slug): string`
  - EN → `/blog/${slug}`; non-EN → `/${locale}/blog/${slug}`
  - Use in both canonical and `StructuredData`
  - Add `inLanguage: locale` in schema

### T3. Enable preferred-locale redirects (P3)

- In `middleware.ts` uncomment cookie logic; ensure it doesn't affect asset routes
- Verify redirect loop protections

### T4. Automation tests (P4)

- Add a vitest file e.g., `__tests__/i18n.content-coverage.test.ts`
  - Crawl `app/[locale]/blog/**/*.tsx`
  - Heuristic regex to detect long English-only blocks not within `t(` usage
  - Allowlist metadata and code identifiers

### T5. Namespace splitting (P5)

- File structure example
  - `messages/en/common.json`, `messages/en/blog.coreWebVitals2025.json`, …
- Loader approach
  - In `getRequestConfig`, dynamically import only required namespaces based on route
  - Or maintain a small manifest per route to bundle minimal sets

### T6. Hreflang in sitemap (P7)

- For each URL, include `<xhtml:link rel="alternate" hreflang="{locale}" href="{localizedUrl}"/>`
  - Ensure `x-default` points to English root

### T7. Trust pages (P8)

- Add namespaces for `careers`, `community`, `status`, `onboarding` if these pages are user-facing
- Remove them from `nonLocalizedPaths` once localized

### T8. Fallback warnings (P9)

- Wrap `useTranslations` once in a small utility
- In dev, log warning when non-EN locale returns EN default for a key### T9. Locale addition guide (P10)
- Create `I18N_LOCALE_ADD_GUIDE.md` including
  - Update `locales` array + `localeNames` + flag emoji/icon mapping
  - Add messages files (copy from EN; fill translations)
  - RTL handling steps (if adding ar/he/fa): CSS direction, fonts, components review
  - Run parity and content coverage tests

---

## Acceptance criteria checklist (project-level)

- Public pages (marketing, blog, help, legal, trust) render native content for all locales
- No raw English paragraphs visible on non-EN locales
- Canonical, alternates (hreflang), and structured data URLs reflect current locale
- `inLanguage` present in blog schemas
- Preferred-locale redirects work reliably
- Parity test + content coverage test both green
- Namespace split (if implemented) doesn’t regress parity or performance

---

## Quality gates and verification

- Typecheck: `pnpm type-check` → PASS
- i18n parity tests: `pnpm test:i18n` → PASS
- New content coverage test (to be added): PASS
- Manual QA
  - Spot-check 1–2 key pages per locale (blog + legal + one feature page)
  - Validate structured data (Rich Results Test) for at least one locale per article
  - Validate hreflang via Search Console after deployment

---

## Timeline & estimates

- Phase 1: 12–20 hours
- Phase 2: 7–14 hours
- Phase 3: 3–6 hours
- Phase 4 (optional): 7–12 hours

Total remaining: ~22–40 hours (without optional phase: ~15–28 hours)

---

## Roles & owners (to assign)

- Content extraction & translation mapping: …
- Legal translation & review: …
- Middleware & routing changes: …
- SEO/structured data & sitemap: …
- Test automation (vitest) & CI: …

---

## Appendix

Key files

- `i18n.ts`, `middleware.ts`, `lib/navigation.ts`, `components/layout/language-switcher.tsx`
- Blog pages under: `app/[locale]/blog/**`
- Messages: `messages/{locale}.json`

Coding patterns

- Server components: `getTranslations('namespace')`
- Client components: `useTranslations('namespace')`
- Blog composition: build HTML with `t()` strings; keep structure in code, sentences in messages

Operational tips

- When adding large prose, prefer smaller granular keys over single huge paragraphs to ease translator iteration
- Keep consistent namespace naming: `blog.coreWebVitals2025`, `blog.technicalSEO2025`, `blog.localSEOStrategiesThatWork`, …

This plan is intended to be executed as-is. Once Phase 1 completes, the site will be functionally “fully translated” from a user perspective, with Phases 2–4 enhancing coverage, trust, automation, and maintainability.
