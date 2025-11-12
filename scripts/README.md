# Scripts Organization

This directory contains all project scripts organized by category:

## Folder Structure

### `database/`
Database setup, migration, and seeding scripts
- `seed-database.ts` - Database seeding
- `reseed-database.ts` - Database reseeding
- `setup-prisma.js` - Prisma setup
- Migration scripts for production deployment

### `data/`
Data processing and URL management scripts
- `analyze-csv.js` - CSV analysis utilities
- `fetch_urls.js` - URL fetching scripts
- `fix_urls.js` - URL fixing utilities
- `update_urls.js` - URL update scripts

### `help/`
Help center and documentation scripts
- `check-english-help.js` - English help validation
- `check-help-csv.js` - Help CSV validation
- `check-help-subpages.js` - Help subpages checking
- `check-help-titles.js` - Help titles validation
- `check-localized-help.js` - Localized help checking
- `fetch-help-titles.js` - Help titles fetching

### `misc/`
Miscellaneous utility scripts
- `check-userusage.ts` - User usage checking
- `fix-layout-paths.mjs` - Layout path fixes
- `route-check.js` - Route validation

### `optimization/`
Performance and optimization scripts
- `bundle-analyzer.js` - Bundle analysis
- `mobile-optimizer.js` - Mobile optimization
- Logo optimization scripts

### `seo/`
SEO analysis and audit scripts
- `analyze-seo-issues.js` - SEO issue analysis
- `audit-analyzer.mjs` - Audit analysis
- `csv-to-seo-applier.mjs` - CSV to SEO application
- `find-multiple-titles.js` - Multiple title detection
- `quick-seo-check.mjs` - Quick SEO checks
- `seo_bestaudit.js` - Best SEO audit
- `simple-seo-audit.js` - Simple SEO audit
- `simple-seo-updater.mjs` - SEO updater
- Various other SEO diagnostic tools

### `testing/`
Testing and validation scripts
- `test-csv.js`, `test-csv.mjs` - CSV testing
- `test-puppeteer.js` - Puppeteer testing
- `test-titles.mjs` - Title testing
- API endpoint testing scripts
- Database testing scripts

### `titles/`
Title management and optimization scripts
- `title-analysis-results.json` - Title analysis results
- `title-csv-extractor.mjs` - CSV title extraction
- `title-duplicate-analyzer.mjs` - Duplicate title analysis
- `title-error-recovery.mjs` - Title error recovery
- `title-extraction-results.json` - Extraction results
- `title-full-localization-optimizer.mjs` - Full localization optimization
- `title-optimizer.mjs` - Title optimization

### `translations/`
Internationalization and translation scripts
- Translation generation and validation scripts
- i18n audit tools
- Message extraction utilities

## Usage

Run scripts from the project root using relative paths:
```bash
node scripts/seo/analyze-seo-issues.js
node scripts/data/fetch_urls.js
node scripts/help/check-help-titles.js
```