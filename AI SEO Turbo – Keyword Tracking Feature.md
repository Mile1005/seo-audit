# AI SEO Turbo – Keyword Tracking Feature Implementation Plan

You are an expert TypeScript/Next.js AI coding agent working in the `seo-audit` repo.  
Your task is to implement a fully working, **free** keyword research and tracking MVP for the `KeywordTrackingFeaturePage` and related flows, **without any paid APIs**.  

Follow the steps below in order. Each step contains:

- Goal
- Constraints
- Files to edit/create
- Implementation details
- Acceptance criteria
- Example prompts (if you need to call tools yourself)

Use idiomatic, clean, well-typed TypeScript. Keep the existing UX/UI intact.

## Status (implemented)

- ✅ Free keyword research endpoint is working (Google Autocomplete + deterministic heuristics)
- ✅ Related keywords + deterministic trend data included in results
- ✅ Marketing CTAs are wired to real internal routes
- ✅ A11y improvements applied (labels/ids/aria + GTM noscript iframe)
- ℹ️ Keyword dashboard route already exists in this repo (`/[locale]/dashboard/keywords`)
- ✅ Rate limiting added to free keyword research endpoint
- ✅ Logged-in users: research results persist to DB under owned projects
- ✅ Dashboard: auto-selects a real project (falls back to demo when logged out)
- ✅ Dashboard keyword APIs secured (analytics/competitors/alerts/serp-features): auth + ownership enforced
- ✅ Dashboard keyword panels handle 401 with clear “sign in” messaging
- ✅ Removed demo-only `x-user-id` headers from keyword dashboard fetches

---

## 0. Context – Existing Implementation

**Repository:** `Mile1005/seo-audit`  
**Feature page:** `components/features/keyword-tracking/KeywordTrackingFeaturePage.tsx`  
**Hero form:** `components/features/keyword-tracking/keyword-tracking-hero.tsx`  

Currently:

- The hero form calls `onKeywordSubmit` which POSTs to `/api/keywords/research`.
- `/api/keywords/research` exists in this repo, but previously could fail due to DB coupling and inconsistent output; it has been refactored to be free + deterministic and to work without a DB.
- CTA buttons do not navigate to any real flows (dashboard, signup, pricing).
- Accessibility scan shows:
  - 2 missing form labels
  - 8 contrast errors
  - 5 alerts (orphaned labels, select missing label, noscript element)

This plan will make the feature **fully functional** with a free stack: Google Autocomplete + simple trends estimation + local persistence.

---

## 1. Create `/api/keywords/research` Endpoint (1–2h)

### Goal

Implement a robust API route at `app/api/keywords/research/route.ts` that:

- Accepts `{ keywords: string[], projectId?: string, location: string, language: string, device: string, domain?: string }`
- For each keyword:
  - Fetches Google Autocomplete suggestions (free endpoint)
  - Generates **fake but realistic** metrics (searchVolume, difficulty, cpc, competition, intent)
- Returns `{ success: true, data: { keywords: KeywordResult[] } }` in the shape the frontend expects.

### Constraints

- No paid APIs.
- No scraping libraries for now (keep it simple and fast).
- Keep logic in `lib` utilities so it’s easy to replace with real SERP/trends later.

### Files

- **Create:** `app/api/keywords/research/route.ts`
- **Create:** `lib/keyword-research/freeKeywordResearch.ts`
- **Verify:** `components/features/keyword-tracking/KeywordTrackingFeaturePage.tsx` stays compatible.

### Implementation Details

**1.1. Define shared types**

Create `types/keywords.ts`:

export interface KeywordResult {
id: string;
keyword: string;
searchVolume: number;
difficulty: number; // 0–100
cpc: number; // in USD, 0 for now
competition: number; // 0–1
intent: string; // informational | commercial | transactional | navigational
status: string; // active | paused | archived
country: string;
device: string; // DESKTOP | MOBILE
createdAt: string;
}


Update `KeywordTrackingFeaturePage.tsx` to import this type instead of its internal `interface`.

**1.2. Implement free keyword research logic**

`lib/keyword-research/freeKeywordResearch.ts`:

- Function `detectIntent(keyword: string): string`
- Function `estimateDifficulty(keyword: string, suggestions: string[]): number`
- Function `estimateSearchVolumeFromSuggestions(suggestions: string[]): number`
- Function `estimateCompetition(keyword: string): number`
- Function `fetchAutocomplete(keyword: string, lang: string): Promise<string[]>`

Use Google Autocomplete (free):

const url = https://www.google.com/complete/search?client=firefox&q=${encodeURIComponent(keyword)}&hl=${lang};
const res = await fetch(url);
const json = await res.json();
// json is usually the array of suggestion strings​

text

Generate values with deterministic heuristics (no randomness so tests are stable).

**1.3. Implement API route**

`app/api/keywords/research/route.ts`:

- Validate request body (keywords array, location, language, device).
- Limit to **max 20 keywords** per call for free tier.
- For each keyword:
  - Get autocomplete suggestions.
  - Compute metrics using helper functions.
- Return JSON in format expected by existing UI.

Structure:

import { NextRequest, NextResponse } from 'next/server';
import { KeywordResult } from '@/types/keywords';
import { runFreeKeywordResearch } from '@/lib/keyword-research/freeKeywordResearch';

export async function POST(req: NextRequest) {
try {
const body = await req.json();
const { keywords, location, language, device = 'DESKTOP', projectId, domain } = body;

text
// Basic validation & limits
// ...

const results: KeywordResult[] = [];
for (const kw of keywords) {
  const result = await runFreeKeywordResearch({
    keyword: kw,
    location,
    language,
    device,
    projectId,
    domain,
  });
  results.push(result);
}

return NextResponse.json({
  success: true,
  data: { keywords: results },
});
} catch (error) {
console.error('[keywords/research] error', error);
return NextResponse.json(
{ success: false, error: 'Failed to research keywords' },
{ status: 500 },
);
}
}

text

### Acceptance Criteria

- Calling `POST /api/keywords/research` with valid body returns `200` and `data.keywords` array matching `KeywordResult`.
- `KeywordTrackingFeaturePage` shows results table as soon as research completes.
- When endpoint fails, existing `submitError` UI displays a clear message.

---

## 2. Implement Google Autocomplete (already used in Step 1) (30m)

This is largely covered in Step 1, but ensure:

- Autocomplete is **used to enrich** results:
  - `relatedKeywords` (optional) can be returned as part of each keyword result.
- If you change the shape to include `relatedKeywords`, update the UI to show them in a hover tooltip or expandable row.

### Acceptance Criteria

- Each keyword result internally has an array of related keywords, even if UI does not show them yet.
- API still returns at least the fields currently consumed by the table.

---

## 3. Add Simple “Trends” Estimation (2–3h)

### Goal

Simulate “trend” data using free sources and heuristics (no paid APIs).  
This is **optional** in UI but should be available for future use.

### Files

- `lib/keyword-research/freeKeywordResearch.ts`
- Optional: `types/keywords.ts` – add:

export interface KeywordTrendPoint {
date: string; // ISO
value: number; // 0–100
}

export interface KeywordResult {
// ...existing fields
trend?: KeywordTrendPoint[];
}

text

### Implementation Details

- For each keyword, create a simple time-series of last 12 months:
  - Use a deterministic function (e.g., base + slope based on keyword length or presence of “2025” etc.).
- Optionally call a free Google Trends wrapper if you later configure it.

UI changes (optional):

- In `KeywordTrackingFeaturePage`, under the table, show an info block “Trend data is simulated for free tier and for demo purposes”.

### Acceptance Criteria

- `KeywordResult` contains `trend` array with 6–12 points.
- No UI breaks if `trend` is undefined.
- All values are deterministic and within 0–100.

---

## 4. Fix All CTA Links (1h)

### Goal

Ensure every CTA in the keyword-tracking feature navigates to a **real path** within the app.

### Files

- `components/features/keyword-tracking/keyword-tracking-hero.tsx`
- `components/features/keyword-tracking/KeywordTrackingFeaturePage.tsx`
- Any CTA inside `tracking-capabilities`, `performance-analytics`, `serp-features`, `alert-system` components.

### Implementation Details

Use `next/navigation`:

import { useRouter } from 'next/navigation';
const router = useRouter();

text

Update CTAs:

- Hero primary: go to **signup / app**  
- Hero primary: go to signup (`/signup`).
- Hero secondary (demo): scroll to keyword research form:  
  `document.getElementById('keyword-form')?.scrollIntoView({ behavior: 'smooth' })`.
- “Start Tracking Keywords” buttons → `/dashboard/keywords`.
- Footer/CTA final section button → `/pricing`.

### Acceptance Criteria

- No CTA is a dead button; all lead to a real route.
- No navigation to absolute external URLs where internal route exists.

---

## 5. Fix Accessibility Issues (1h)

### Goal

Resolve all issues shown in your a11y scan (labels, orphaned labels, contrast, noscript).

### Files

- `components/features/keyword-tracking/keyword-tracking-hero.tsx` (form)
- Global layout / theme if contrast changes are needed.

### Implementation Details

**5.1. Form labels**

Ensure each `input`, `textarea`, `select` has:

- A unique `id`
- Matching `<label htmlFor="...">`
- Descriptive label text
- (Optional) `aria-describedby` for helper/error text

Example:

<label
htmlFor="keywords-input"
className="block text-sm font-medium text-foreground mb-2"

Keywords (one per line)
</label>

<textarea id="keywords-input" name="keywords" aria-describedby="keywords-help" ... /> <p id="keywords-help" className="text-xs text-muted-foreground mt-1"> Enter one keyword per line to analyze. </p> ``` Fix any “orphaned labels” by either binding them or removing unused labels. 

**5.2. Select label** Add `htmlFor` for the location `<select>`.

 **5.3. Contrast** - Increase text color contrast in dark areas (`text-slate-400` → `text-slate-200/300`). - Avoid very low opacity backgrounds for critical text. 
 
 **5.4. Noscript element**

Your `<noscript>` with GTM is fine, but ensure it has no a11y issue:

- Add `aria-hidden="true"` on the iframe if needed.

### Acceptance Criteria

- Re-run your browser a11y tool: no “missing form label” or “orphaned label”.
- Contrast errors are reduced/removed on this page.
- Page remains visually consistent with design.

---

## 6. Keyword Dashboard Page (already exists)

### Status

This repo already has a keywords dashboard route at `app/[locale]/dashboard/keywords/page.tsx`, so no new page creation is required.

For the free-tier MVP, the marketing feature page stores results in `localStorage` under `ai-seo-keywords` after successful research.

---

## 7. Authentication & Database Persistence (follow-up)

### Status

✅ Implemented end-to-end for the existing project model:

- `/api/keywords/research` now enforces **auth + project ownership** for DB reads/writes.
- If authenticated and `projectId` is missing:
  - Uses `domain` (if provided) to find/create a project for the user, otherwise falls back to the user’s most recent project.
- If unauthenticated (or DB is not configured):
  - Uses an in-memory demo store (`demo-keyword-project`) so the public marketing page still works.

Dashboard note:

- The keywords dashboard page now resolves a real `projectId` by calling `/api/projects` and falls back to `demo-keyword-project` if unauthorized.

---

## 8. Implement Simple Rate Limiting (follow-up)

✅ Implemented for `POST /api/keywords/research`:

- Unauthenticated: 5 requests per 24h (per IP)
- Authenticated: 50 requests per 24h (per user)
- Returns `429` with `Retry-After` header

---

## 9. Example Agent Prompt for VS Code

> You are an AI coding assistant working in the Next.js/TypeScript repo `seo-audit`.
> Use the implementation plan in this markdown as the source of truth.
> Implement each step sequentially.
> After each step, run TypeScript type-check and `pnpm build`.

---

## 10. High-Level Checklist (current)

- [x] `/api/keywords/research` returns data.
- [x] Free keyword research logic using Google Autocomplete.
- [x] Basic trend data generated (optional for UI).
- [x] All CTAs wired to real routes.
- [x] Accessibility issues resolved (labels + GTM noscript iframe + contrast improvements).
- [x] `/dashboard/keywords` exists in repo.
- [ ] Auth + Prisma persistence fully wired up for keywords.
- [x] Rate limiting implemented for research endpoint.
- [ ] Manual smoke test: landing → research → dashboard → CTAs → no console errors.