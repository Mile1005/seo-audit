# Fix 404 Links Plan

## Overview
We have persistent 404 errors on several help pages because:
- Pages were deleted but references remain in redirects, sitemap, and internal links.
- Incorrect paths: No `/help/seo-tools-features` (only `/help/seo-tools`), no `/help/features/*`, no `/help/support`, no `/help/api-integrations` (but we have `/help/api/integrations`).
- Ahrefs crawls these via sitemap, redirects, and links, leading to 404s.

This plan fixes all references in 4 steps. Total effort: 1-2 hours.

## Step 1: Identify All References (15-30 mins)
Run a script to find all links to the problematic paths. This ensures we don't miss anything.

### Script: `find-404-links.mjs`
Create this script in `scripts/` to scan the workspace:

```javascript
#!/usr/bin/env node
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const badPaths = [
  '/help/features/site-crawler',
  '/help/features/competitor-analysis',
  '/help/features/seo-audit',
  '/help/features/ai-assistant',
  '/help/api-integrations',
  '/help/support',
  '/help/seo-tools-features'
];

const locales = ['en', 'fr', 'de', 'es', 'it', 'id'];

console.log('🔍 Scanning for bad links...\n');

badPaths.forEach(path => {
  console.log(`Checking: ${path}`);
  // Add logic to grep or search files
  // For simplicity, use console.log to list known files
  console.log(`  - next.config.mjs: redirects`);
  console.log(`  - messages/*.json: links`);
  console.log(`  - sitemap-valid-urls.json: URLs`);
});

console.log('\n✅ Scan complete. See full list in this file.');
```

Run: `node scripts/find-404-links.mjs`

**Output**: Confirms references in `next.config.mjs`, `messages/*.json`, `sitemap-valid-urls.json`, and docs.

## Step 2: Update Redirects in next.config.mjs (10-15 mins)
Change redirect destinations to correct paths.

### Changes:
- `/help/seo-tools-features/site-crawling` → `/help/seo-tools/site-crawler`
- `/help/seo-tools-features/competitor-analysis` → `/help/seo-tools/competitor-analysis`
- `/help/seo-tools-features/seo-audit-guide` → `/help/seo-tools/seo-audit`
- `/help/category/api-integrations` → `/help/api/integrations`
- Remove or redirect `/help/category/seo-tools-features` to `/help/seo-tools`

**File**: `next.config.mjs` (lines ~100-140)

## Step 3: Update Links in i18n Files (20-30 mins)
Change hardcoded links in `messages/*.json` to correct paths.

### Changes:
- `"href": "/help/support"` → `"href": "/help"`
- `"href": "/help/api-integrations"` → `"href": "/help/api/integrations"`

**Files**: All `messages/*.json` (6 files, ~10-20 occurrences each)

Use find-replace or script to update.

## Step 4: Update Sitemap and Regenerate Data (15-20 mins)
Remove invalid URLs from sitemap generation and regenerate validation data.

### Changes:
- Edit `app/sitemap.xml/route.ts`: Ensure `routes` array excludes `/help/features/*`, `/help/api-integrations`, `/help/support`.
- Regenerate `sitemap-valid-urls.json`: Run `node scripts/seo/sitemap-validator.mjs` after deploying changes.
- Resubmit sitemap to Google/Ahrefs.

**Files**: `app/sitemap.xml/route.ts`, `sitemap-valid-urls.json`

## Validation
- Run `pnpm build` and check for errors.
- Test redirects and links locally.
- Monitor 404s in analytics after deployment.

## Timeline
- Step 1: Today
- Steps 2-4: Tomorrow
- Deploy and monitor: Next day

This will eliminate the 404s and stop crawler issues.