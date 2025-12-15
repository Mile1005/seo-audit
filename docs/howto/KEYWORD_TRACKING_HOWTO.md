# Keyword Research & Tracking — How it works now (Free MVP)

This document explains, in simple terms:

- What we had before vs what we have now
- What files/endpoints were changed
- Whether the feature-page form works
- What metrics you get now and where they come from
- How to use the feature (marketing page + dashboard)

## Before vs After

### Before

- Keyword research existed, but the implementation was **inconsistent** across marketing and dashboard.
- Some keyword-related API routes were **DB-coupled** or assumed demo behavior.
- Several dashboard endpoints were **unauthenticated**, meaning they could leak data or break under real-user flows.
- Some dashboard components sent a demo header (`x-user-id: demo-user`) that didn’t correspond to real auth.
- The keyword-tracking marketing CTAs were not reliably wired to real internal routes.

### After (current state)

- Keyword research is a **free-only MVP** based on Google Autocomplete + deterministic heuristics.
- The marketing keyword-tracking page and the dashboard both use the same research endpoint.
- Logged-out users can still use the feature in **demo mode** (no DB required).
- Logged-in users get **DB persistence** under their own projects, with ownership checks.
- Secondary keyword dashboard endpoints are now **secured** (auth + ownership enforced).
- Dashboard components no longer rely on demo-only headers and show a clear message when logged out.

## What we changed (high-level)

### 1) Shared keyword result types

- Added shared types so the feature page and APIs agree on the payload shape.

Files:
- types/keywords.ts

### 2) Free keyword research implementation (deterministic)

- Implemented free keyword research powered by Google Autocomplete, plus deterministic (stable) heuristics so results don’t “randomly change” between runs.

Files:
- lib/keyword-research/freeKeywordResearch.ts

### 3) Research API route (works with and without DB)

- Refactored the main research endpoint to:
  - validate input
  - cap request size
  - return consistent shapes
  - persist only when authenticated and project is owned
  - fall back to in-memory storage when logged out

Files:
- app/api/keywords/research/route.ts

### 4) Rate limiting

- Added a free-tier in-memory limiter to prevent abuse.

Files:
- lib/rate-limit.ts
- app/api/keywords/research/route.ts

### 5) Security hardening for keyword CRUD and “secondary” keyword endpoints

- Secured CRUD and auxiliary endpoints so they require auth and enforce ownership.

Files:
- app/api/keywords/route.ts
- app/api/keywords/[id]/route.ts
- app/api/keywords/analytics/route.ts
- app/api/keywords/competitors/route.ts
- app/api/keywords/alerts/route.ts
- app/api/keywords/serp-features/route.ts

### 6) Dashboard and UI consistency

- Dashboard now chooses a real project ID for logged-in users; logged-out users fall back to demo.
- Removed demo-only headers in dashboard keyword components.
- Improved user-facing messaging for `401 Unauthorized`.

Files:
- app/[locale]/dashboard/keywords/page.tsx
- components/keywords/keyword-research.tsx
- components/keywords/ranking-dashboard.tsx
- components/keywords/keyword-opportunities.tsx
- components/keywords/traffic-analytics.tsx
- components/keywords/competitive-intelligence.tsx
- components/keywords/smart-alert-system.tsx

### 7) Marketing keyword-tracking page quality fixes

- Wired CTAs to real internal routes.
- Added basic accessibility fixes (labels/ids/aria) and small compliance fixes.
- Added localStorage persistence for demo continuity.

Files:
- components/features/keyword-tracking/KeywordTrackingFeaturePage.tsx
- components/features/keyword-tracking/keyword-tracking-hero.tsx
- app/layout.tsx
- app/[locale]/layout-main.tsx

## Does the keyword research form on the feature page work now?

Yes.

- The hero form submits to the research endpoint.
- Results render immediately from the API response.
- For logged-out users, results are preserved on the marketing page using localStorage.

## What metrics do we get now?

Each keyword result returns a set of “SEO-style” metrics that look realistic but are not from paid data providers.

You currently get (at minimum):

- `keyword`: the keyword text
- `searchVolume`: estimated monthly search volume (integer)
- `difficulty`: estimated difficulty (0–100)
- `competition`: estimated competition (0–1)
- `cpc`: estimated CPC (USD)
- `intent`: inferred search intent (informational / commercial / transactional / navigational)
- `country`, `device`, `createdAt`

Optional/enrichment fields that are included where supported:

- `relatedKeywords`: derived from autocomplete suggestions
- `trend`: a deterministic 12-point trend series (for future charts)

## Where do these metrics come from?

### Free source: Google Autocomplete

The system queries the Google Autocomplete endpoint:

- `https://www.google.com/complete/search?client=firefox&q=...&hl=...`

It returns suggestion phrases, which are used to:

- generate `relatedKeywords`
- feed into heuristic scoring

### Deterministic heuristics (stable, free)

Because we are not using any paid datasets:

- `searchVolume`, `difficulty`, `competition`, `cpc`, and `trend` are computed using deterministic heuristics.
- Deterministic means: same input keyword => same output (no randomness), making the UI stable and tests predictable.

Important note:

- These values are **estimates for UX/MVP**. They’re good for demonstrating the product flow, not for claiming exact real-world numbers.

## How persistence works now

### Logged-out (demo)

- Research can still run.
- Results are stored either:
  - in memory on the server (API-side demo store) for short-term continuity, and/or
  - in localStorage on the marketing page for UX continuity.

### Logged-in

- Keyword research results can be persisted to the database.
- Persistence is only allowed when the target project belongs to the logged-in user.

## How to use it (step-by-step)

### A) Marketing page flow

1. Open the keyword tracking feature page.
2. Enter keywords and submit.
3. You should see a results table with metrics.

If logged out:
- It still works as a demo.

### B) Dashboard flow

1. Sign in.
2. Go to the keywords dashboard page.
3. The dashboard will auto-select one of your projects.
4. Use Keyword Research to add keywords; those keywords will persist to your project.

If logged out:
- Dashboard panels that require auth will show a clear “Sign in…” message.

## API reference (quick)

### POST /api/keywords/research

Purpose: run free research for a list of keywords.

Body shape (typical):

- `projectId?: string`
- `keywords: string[]`
- `location: string` (example: `US`)
- `language: string` (example: `en`)
- `device: "DESKTOP" | "MOBILE"`
- `domain?: string`

Response shape:

- `{ success: true, data: { keywords: KeywordResult[], projectId?: string } }`

### GET /api/keywords/research?projectId=...

Purpose: load saved keywords for a project (demo/in-memory for logged-out; DB for logged-in).

## How to verify quickly (developer)

- Typecheck: `pnpm type-check`
- Build: `pnpm build`

## What is still “MVP-ish” by design

- Metrics are heuristic estimates (free-only). They are not sourced from paid providers.
- Some deeper features (true rank tracking at scale, real traffic from GSC, real competitor SERPs) would require additional data sources or integrations.
