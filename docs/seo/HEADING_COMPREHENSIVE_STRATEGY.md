# Comprehensive Heading Hierarchy Strategy - Full Audit & Fix Plan

## Executive Summary

**Current State:** 69 heading issues across 79 pages
**Root Cause:** Complex component imports with uncontrolled heading levels + missing H1 tags on many pages

### Issue Categories

| Issue Type             | Count | Examples                                    |
| ---------------------- | ----- | ------------------------------------------- |
| MISSING_H1             | ~30   | Blog pages, help pages, auth pages          |
| HIERARCHY_SKIP (H1→H3) | ~20   | Help pages (H1→H3 skips), dashboard         |
| H2→H4 SKIP             | ~10   | Blog posts, help pages                      |
| H3→H5 SKIP             | ~5    | Feature pages with nested components        |
| MIXED HIERARCHY        | ~4    | Pages importing multiple heading components |

---

## Page Category Analysis

### A. Blog Pages (9 pages) - 13 Issues

**Problem:** Missing H1 tag on index + H2→H4 skips within content

Pages affected:

- `/blog` (MISSING_H1: h2 "{featuredPost.title}")
- `/blog/[slug]` (MISSING_H1: h2 "Introduction")
- `ai-powered-seo-future` (H2→H4 skip + MISSING_H1)
- `complete-seo-audit-checklist-2025` (2x H2→H4 skip + MISSING_H1)
- Other 5 blog posts (each has MISSING_H1)

**Root Cause:**

- Blog layout imports `blog-post-client.tsx` which outputs h2 "Related Articles" at root level
- Blog post pages have H2 "Related Articles" without H1 parent
- Content sections skip from H2 to H4

**Fix Strategy:**

1. Add H1 to each blog page (title of post)
2. Downgrade h2→h3 for "Related Articles"
3. Upgrade H4→H3 in content sections (1. Content Performance Analysis, etc.)

### B. Case Studies (7 pages) - 7 Issues

**Problem:** All missing H1 tags

Pages: 7 case study pages + index

- cloudsync-pro, digital-growth-agency, gearhub-pro, peak-performance, stylecraft-boutique, techflow-solutions, case-studies index

**Root Cause:** Pages start with H2 "The Challenge: ..." instead of H1

**Fix Strategy:**

- Add H1 to each case study page (company name or heading)
- Downgrade h2 "The Challenge" → h2 (keep as is, this should be h2 under h1)

### C. Help Pages (21 pages) - 22 Issues

**Problem:** Help pages have H1→H3 skips (missing H2 middle layer)

Example pages:

- `/help/api/authentication` (H1→H3 skip)
- `/help/billing/*` (4 pages, all H1→H3 skip)
- `/help/features/*` (4 pages, all H1→H3 skip)
- `/help/getting-started/*` (3 pages, all H1→H3 skip)
- `/help/security/*` (5 pages, all H1→H3 skip)
- `/help/troubleshooting/*` (3 pages, all H1→H3 skip)

**Pattern:**

```html
<h1>Title</h1>
<h3>Subtitle (should be h2)</h3>
```

**Fix Strategy:**

- Downgrade all h3 after h1 to h2 in help pages
- This affects 15+ help pages

### D. Feature Pages (6 pages) - 6 Issues

**Problem:** Feature pages missing H1 or have H3→H5 skips

Pages:

- `/features/ai-assistant` (MISSING_H1: h3 "AI SEO Assistant", H3→H5 skip)
- `/features/competitor-analysis` (MISSING_H1: h2 in component)
- `/features/keyword-tracking` (MISSING_H1: h3 "Keyword Rankings")
- `/features/seo-audit` (MISSING_H1: h2 "Loading SEO Audit Tool")
- `/features/site-crawler` (MISSING_H1: h2 "Loading Site Crawler")

**Root Cause:**

- Feature pages import `recommendation-types.tsx` which has:
  - H2 "Intelligent Recommendation Types"
  - H3 "title" for each recommendation
  - H5 "Implementation Example" (skips h4)

**Fix Strategy:**

- Add H1 to feature page (feature name)
- Downgrade h2→h2, h3→h2 for recommendations (same level)
- Downgrade h5→h4 for "Implementation Example"

### E. Dashboard Pages (4 pages) - 4 Issues

**Problem:** H1→H3 skips in dashboard components

Pages:

- `/dashboard/audit` (2x H2→H4 skips)
- `/dashboard/page-crawler` (H1→H3 skip)
- `/dashboard` (H1→H3 skip)
- `/dashboard/projects` (MISSING_H1: h2 "Please log in...")

**Root Cause:** Components like `DashboardEmptyState.tsx` output h3 without h2

**Fix Strategy:**

- Downgrade h3→h2 in component
- Add H1 to projects page

### F. Authentication Pages (3 pages) - 3 Issues

**Problem:** Missing H1

Pages:

- `/login` (MISSING_H1: h2 "Access Your SEO Dashboard")
- `/forgot-password` (MISSING_H1: h2 "Password Security Best Practices")
- `/onboarding` (H1→H3 skip)

**Fix Strategy:**

- Add H1 to login/forgot-password
- Downgrade h3→h2 in onboarding

### G. Other Pages (Multiple Issues)

**Missing H1 pages:**

- `/about` (MISSING_H1: h2 "Our Story")
- `/careers` (MISSING_H1: h2 "Shape the Future of SEO")
- `/community` (MISSING_H1: h2 "Why Join Our Community?")
- `/contact` (MISSING_H1: h2 "Expert SEO Support When You Need It")
- `/demo` (MISSING_H1: h3 "47-Point Technical Analysis")
- `/help` (MISSING_H1: h3 "item.question")
- `/signup` (MISSING_H1: h2 "AI SEO Turbo Pricing Plans")
- `/status` (MISSING_H1: h2 "Committed to Reliability & Transparency")
- `/pricing` (MISSING_H1: h3 from email-capture-inline.tsx)
- `/privacy` (H2→H4 skip)

**Fix Strategy:**

- Add H1 to each main page
- Downgrade problematic h3 tags to h2

---

## Component Heading Audit

### Components Adding Headings

| Component                     | Headings Added | Level | Issue                      |
| ----------------------------- | -------------- | ----- | -------------------------- |
| `recommendation-types.tsx`    | h2, h3, h5     | -     | H3→H5 skip (missing h4)    |
| `industry-specialization.tsx` | h2, h3, h4     | -     | Correct hierarchy          |
| `features-showcase.tsx`       | h2, h3         | -     | Correct hierarchy          |
| `email-capture-inline.tsx`    | h2, h3         | -     | Output h3 at wrong level   |
| `exit-intent-modal.tsx`       | h3, h2         | -     | Mixed order (h3 before h2) |
| `DashboardEmptyState.tsx`     | h1, h3         | -     | H1→H3 skip (should be h2)  |
| `pricing-cards.tsx`           | h2, h3, h4     | -     | Correct hierarchy          |
| `keyword-research.tsx`        | h2, h3         | -     | Correct hierarchy          |
| `trust-logos.tsx`             | h2             | -     | Correct                    |
| `hero components`             | h1             | -     | OK                         |

### Problematic Patterns

1. **`email-capture-inline.tsx`** - Outputs h3 directly without h1/h2 context
   - Location: Used on `/pricing` page
   - Output: `<h3 className="...">Success! Check Your Email</h3>`
   - Fix: Make output adaptive based on parent context

2. **`recommendation-types.tsx`** - H3→H5 skip
   - Location: `/features/ai-assistant`
   - Output structure:
     ```html
     <h2>Intelligent Recommendation Types</h2>
     <h3>{rec.title}</h3>
     <!-- Multiple recommendations -->
     <h5>Implementation Example</h5>
     <!-- Should be h4 -->
     ```
   - Fix: Change h5→h4

3. **`DashboardEmptyState.tsx`** - H1→H3 skip
   - Output: `<h1>...</h1><h3>Connect Google Search Console</h3>`
   - Fix: Change h3→h2

4. **`exit-intent-modal.tsx`** - Mixed heading order
   - Outputs h3 before h2
   - Fix: Ensure proper ordering

---

## Implementation Plan (Priority Order)

### Phase 1: Quick Fixes (Lowest Risk) - 30 minutes

Components to fix (3 files):

- [ ] `recommendation-types.tsx`: h5 → h4 (1 change)
- [ ] `DashboardEmptyState.tsx`: h1→h3→h2 (1 change)
- [ ] `email-capture-inline.tsx`: h3 handling (1 change)

### Phase 2: Add Missing H1s (High Impact) - 45 minutes

Pages to fix (16 files):

- [ ] Homepage (`/page.tsx`): Add H1
- [ ] Blog pages (7 files): Add H1 to each
- [ ] Case studies (7 files): Add H1 to each
- [ ] Feature pages (5 files): Add H1 to each

### Phase 3: Help Pages H1→H2 Downgrades (Systematic) - 30 minutes

- [ ] 15 help pages: Change first h3 after h1 → h2

### Phase 4: Blog Post Content H2→H4 Fixes - 15 minutes

- [ ] Blog post templates: Upgrade h4→h3 in content sections

### Phase 5: Miscellaneous Fixes - 20 minutes

- [ ] Auth pages: Add H1
- [ ] Dashboard pages: Add H1, downgrade h3→h2
- [ ] Other single issues: Fix individually

---

## CSV Data Analysis (Non-Sequential H2s)

From your CSV, 6 pages have non-sequential H2s:

1. **`/features/competitor-analysis`** - 2 H2s
   - "Competitive Gap Analysis" (H2-1)
   - "SERP Intelligence & Position Tracking" (H2-2)
   - Issue: No H1 parent, H2s should be H3 or have H1 parent

2. **`/features/site-crawler`** - 2 H2s
   - "What Gets Detected" → should be H3
   - "Powerful Crawling Capabilities" → should be H3

3. **`/pricing`** - 2 H2s
   - "Frequently Asked Questions"
   - "Trusted by 10,000+ Businesses"
   - Issue: No H1, page starts with H2

4. **`/features/ai-assistant`** - 2 H2s
   - "How Our AI Works"
   - "Intelligent Recommendation Types"

5. **`/features/keyword-tracking`** - 2 H2s
   - "SERP Features Monitoring"
   - "Comprehensive Tracking Capabilities"

6. **`/help/troubleshooting/login-issues`** - 2 H2s
   - "Quick fixes to try first"
   - "Specific login problems"

**Strategy:** All these pages need H1 + proper H2→H3 hierarchy established.

---

## Validation Steps

After fixes:

```bash
node scripts/audit-headings.js
```

Expected result: 0 issues (after all 5 phases)

---

## Timeline

- Phase 1 (Components): 30 min
- Phase 2 (H1 additions): 45 min
- Phase 3 (Help pages): 30 min
- Phase 4 (Blog content): 15 min
- Phase 5 (Misc): 20 min
- Testing: 10 min
- **Total: ~2.5 hours**

After each phase, run audit script to verify fixes.
