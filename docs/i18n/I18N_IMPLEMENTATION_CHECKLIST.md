# i18n Implementation Checklist - AI SEO Turbo

## Phase 1: Initial Setup ✅ COMPLETE

- [x] Install next-intl package
- [x] Create i18n.ts configuration
- [x] Update middleware.ts for locale routing
- [x] Configure next.config.mjs with next-intl plugin
- [x] Create messages directory with all 6 locale files
- [x] Add TypeScript types for type safety
- [x] Create navigation utilities (lib/navigation.ts)
- [x] Build language switcher component
- [x] Implement hreflang tags in layout
- [x] Add localized meta tags for SEO
- [x] Verify TypeScript compilation
- [x] Document setup and usage

## Phase 2: Page Migration ⏳ PENDING (Prompt 2)

### Root Pages

- [ ] Migrate `app/page.tsx` → `app/[locale]/page.tsx`
- [ ] Migrate `app/error.tsx` → `app/[locale]/error.tsx`
- [ ] Migrate `app/not-found.tsx` → `app/[locale]/not-found.tsx`

### Marketing Pages

- [ ] `app/features/` → `app/[locale]/features/`
- [ ] `app/pricing/` → `app/[locale]/pricing/`
- [ ] `app/about/` → `app/[locale]/about/`
- [ ] `app/contact/` → `app/[locale]/contact/`
- [ ] `app/case-studies/` → `app/[locale]/case-studies/`
- [ ] `app/blog/` → `app/[locale]/blog/`
- [ ] `app/careers/` → `app/[locale]/careers/`
- [ ] `app/community/` → `app/[locale]/community/`
- [ ] `app/demo/` → `app/[locale]/demo/`

### Auth Pages

- [ ] `app/login/` → `app/[locale]/login/`
- [ ] `app/signup/` → `app/[locale]/signup/`
- [ ] `app/forgot-password/` → `app/[locale]/forgot-password/`
- [ ] `app/reset-password/` → `app/[locale]/reset-password/`
- [ ] `app/verify-email/` → `app/[locale]/verify-email/`

### App Pages (Authenticated)

- [ ] `app/dashboard/` → `app/[locale]/dashboard/`
- [ ] `app/onboarding/` → `app/[locale]/onboarding/`

### Legal Pages

- [ ] `app/privacy/` → `app/[locale]/privacy/`
- [ ] `app/terms/` → `app/[locale]/terms/`

### Help/Support Pages

- [ ] `app/help/` → `app/[locale]/help/`
- [ ] `app/status/` → `app/[locale]/status/`

### Other Pages

- [ ] `app/share/` → `app/[locale]/share/`
- [ ] Move original `app/layout.tsx` content to `app/[locale]/layout-main.tsx`

## Phase 3: Component Translation ⏳ PENDING (Prompt 3)

### Navigation Components

- [ ] `components/navigation/navbar.tsx` - Add useTranslations
- [ ] `components/navigation/footer.tsx` - Add useTranslations
- [ ] `components/navigation/mobile-nav.tsx` - Add useTranslations

### Homepage Components

- [ ] `components/homepage/hero.tsx`
- [ ] `components/homepage/features-section.tsx`
- [ ] `components/homepage/testimonials-section.tsx`
- [ ] `components/homepage/cta-section.tsx`
- [ ] `components/homepage/stats-section.tsx`

### Features Components

- [ ] `components/features/feature-card.tsx`
- [ ] `components/features/feature-list.tsx`

### Pricing Components

- [ ] `components/pricing/pricing-card.tsx`
- [ ] `components/pricing/pricing-table.tsx`
- [ ] `components/pricing/plan-comparison.tsx`

### Dashboard Components

- [ ] `components/dashboard/sidebar.tsx`
- [ ] `components/dashboard/stats-cards.tsx`
- [ ] `components/dashboard/recent-audits.tsx`
- [ ] `components/dashboard/project-list.tsx`

### Audit Components

- [ ] `components/audit/audit-form.tsx`
- [ ] `components/audit/audit-results.tsx`
- [ ] `components/audit/audit-summary.tsx`
- [ ] `components/audit/audit-issue-card.tsx`
- [ ] `components/audit/audit-score.tsx`

### Form Components

- [ ] `components/forms/input.tsx` - Labels, placeholders
- [ ] `components/forms/textarea.tsx`
- [ ] `components/forms/select.tsx`
- [ ] `components/forms/checkbox.tsx`
- [ ] `components/forms/radio.tsx`
- [ ] `components/forms/form-error.tsx`

### Auth Components

- [ ] `components/auth/login-form.tsx`
- [ ] `components/auth/signup-form.tsx`
- [ ] `components/auth/forgot-password-form.tsx`
- [ ] `components/auth/social-login.tsx`

### UI Components (Feedback)

- [ ] `components/ui/toast.tsx` - Success/error messages
- [ ] `components/ui/alert.tsx`
- [ ] `components/ui/dialog.tsx` - Confirm dialogs
- [ ] `components/ui/loading.tsx`

### SEO Components

- [ ] `components/seo/breadcrumbs.tsx`
- [ ] `components/seo/structured-data.tsx`

## Phase 4: Translation Content Expansion ⏳ PENDING (Prompt 4)

### Core Features Translation

- [ ] SEO Audit (47-point checklist)
  - [ ] All audit criteria descriptions
  - [ ] Severity levels (Critical, Warning, Info)
  - [ ] Recommendations
  - [ ] Technical explanations
- [ ] Keyword Research
  - [ ] Category labels
  - [ ] Metric descriptions
  - [ ] Suggestion types
- [ ] Backlink Analysis
  - [ ] Metric labels
  - [ ] Status indicators
  - [ ] Quality scores
- [ ] Performance Metrics
  - [ ] Core Web Vitals labels
  - [ ] Score interpretations
  - [ ] Optimization tips

### Data Tables

- [ ] Column headers
- [ ] Sort options
- [ ] Filter labels
- [ ] Empty states
- [ ] Loading states
- [ ] Pagination

### Charts & Visualizations

- [ ] Axis labels
- [ ] Legend items
- [ ] Tooltips
- [ ] No data messages

### Notifications

- [ ] Email notifications
- [ ] In-app notifications
- [ ] Push notifications (if any)

### Error Messages

- [ ] Form validation errors
- [ ] API errors
- [ ] Network errors
- [ ] Permission errors
- [ ] Rate limit messages

### Success Messages

- [ ] CRUD operations
- [ ] Upload success
- [ ] Export success
- [ ] Payment success

## Phase 5: Dynamic Content Translation ⏳ PENDING (Prompt 5)

### API Responses

- [ ] Update `/api/audit` - Return localized messages
- [ ] Update `/api/keywords` - Return localized suggestions
- [ ] Update `/api/backlinks` - Return localized status
- [ ] Update error handling middleware - Localized errors
- [ ] Update success responses - Localized messages

### Audit Engine

- [ ] Localize audit criteria (`lib/audit/`)
- [ ] Localize recommendations
- [ ] Localize severity descriptions
- [ ] Localize action items

### Keyword Generator

- [ ] Localize keyword suggestions
- [ ] Localize category names
- [ ] Localize search intent labels

### PDF/CSV Exports

- [ ] Localize PDF report templates
- [ ] Localize CSV headers
- [ ] Localize export filenames
- [ ] Date/number formatting per locale

## Phase 6: Email Translation ⏳ PENDING (Prompt 6)

### Transactional Emails (Resend)

- [ ] Welcome email
- [ ] Email verification
- [ ] Password reset
- [ ] Password changed confirmation
- [ ] Account deletion confirmation
- [ ] Project invitation
- [ ] Team member added
- [ ] Audit complete notification
- [ ] Weekly report digest
- [ ] Payment receipt
- [ ] Subscription renewal
- [ ] Trial expiring warning
- [ ] Downgrade confirmation
- [ ] Upgrade confirmation

### Email Templates

- [ ] Create locale-specific templates in `lib/emails/`
- [ ] Add email subject line translations
- [ ] Add email body translations
- [ ] Add CTA button translations
- [ ] Add footer translations

## Phase 7: Blog & MDX Content ⏳ PENDING (Prompt 7)

### Blog Structure

- [ ] Create `content/blog/[locale]/` directories
- [ ] Migrate existing blog posts to English
- [ ] Add frontmatter locale field
- [ ] Update blog listing to filter by locale
- [ ] Add language selector for blog
- [ ] Create translations for blog posts (minimum 5 key articles)

### MDX Components

- [ ] Translate inline CTAs
- [ ] Translate code block labels
- [ ] Translate image captions
- [ ] Translate alert/warning boxes

## Phase 8: Testing & Quality Assurance ⏳ PENDING (Prompt 8)

### Unit Tests (Vitest)

- [ ] Test translation loading
- [ ] Test locale switching
- [ ] Test missing translation fallback
- [ ] Test pluralization
- [ ] Test date/number formatting
- [ ] Test translated components render correctly

### E2E Tests (Playwright)

- [ ] Test language switcher functionality
- [ ] Test navigation between locales
- [ ] Test locale persistence (cookies)
- [ ] Test SEO tags (hreflang) generation
- [ ] Test form validation in all languages
- [ ] Test API responses in all languages
- [ ] Test auth flows in all languages

### Manual Testing

- [ ] Verify all pages in all 6 locales
- [ ] Test mobile responsiveness per locale
- [ ] Verify RTL support (if applicable)
- [ ] Test text overflow with longer translations
- [ ] Verify date/time formats
- [ ] Verify number formats
- [ ] Verify currency formatting
- [ ] Test browser language detection
- [ ] Test cookie persistence

### Accessibility Testing

- [ ] Screen reader compatibility per locale
- [ ] Keyboard navigation
- [ ] ARIA labels translated
- [ ] Form labels and errors
- [ ] Alt text for images

### Performance Testing

- [ ] Lighthouse audit per locale
- [ ] Bundle size check (translation files)
- [ ] Lazy loading verification
- [ ] SSR performance

## Phase 9: Production Readiness ⏳ PENDING

### Translation Review

- [ ] Professional translation review (native speakers)
- [ ] Consistency check across all files
- [ ] Cultural appropriateness check
- [ ] Terminology consistency
- [ ] Proofread all error messages
- [ ] Proofread all success messages
- [ ] Verify brand name consistency

### SEO Verification

- [ ] Verify hreflang tags on all pages
- [ ] Verify canonical URLs
- [ ] Verify sitemap includes all locales
- [ ] Verify robots.txt allows all locales
- [ ] Verify meta descriptions per locale
- [ ] Verify Open Graph tags per locale
- [ ] Verify Twitter Card tags per locale

### Documentation

- [ ] Update README with i18n instructions
- [ ] Document translation workflow for team
- [ ] Create style guide for translators
- [ ] Document locale-specific configurations

### Deployment

- [ ] Test on Vercel preview deployment
- [ ] Verify environment variables
- [ ] Test edge functions with locale routing
- [ ] Verify analytics tracking per locale
- [ ] Test payment flows per locale
- [ ] Monitor error rates after deployment

## Quick Stats

- **Total Locales**: 6 (en, fr, it, es, id, de)
- **Phase 1 Progress**: 100% ✅
- **Overall Progress**: ~12% (Phase 1 complete)
- **Estimated Remaining Work**: 7 phases

## Next Immediate Action

**Start Prompt 2**: Page migration from `app/` to `app/[locale]/`

This is the most critical step as it establishes the routing structure for all localized content.
