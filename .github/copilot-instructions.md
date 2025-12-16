# Copilot instructions (seo-audit)

## Architecture
- Next.js App Router (Next 14) with `next-intl`. UI lives under `app/[locale]/*`; API routes under `app/api/*/route.ts`.
- Locale layering: `app/layout.tsx` (global providers/metadata) → `app/layout-root.tsx` (next-intl pass-through) → `app/[locale]/layout.tsx` (validate locale, `setRequestLocale`, `NextIntlClientProvider`).
- SEO/audit core: `lib/comprehensive-audit.ts` (page audit used by API + crawlers) and `lib/audit/engine.ts` (enhanced engine).
- Crawling runs in-process via API routes and in BullMQ workers (`worker/*`) backed by Redis.
- Prisma persistence: `lib/prisma.ts` + `prisma/schema.prisma`. Some “Phase” models are optional at runtime; probe `(prisma as any).auditRun` / `.auditIssueSnapshot` before using.

## i18n conventions
- Locales: `i18n.ts` and `lib/i18n-config.ts`; routing uses `localePrefix: "as-needed"`.
- Edge middleware (`middleware.ts`) must stay lightweight; it skips `/api`, assets, and 301-redirects `/en/*` → `/*` to avoid duplicate SEO paths.
- Messages live in `messages/*.json`. For API/background jobs use `lib/i18n-server.ts` (`getLocaleFromHeaders`, `getServerTranslations`, `translateError`).
- Rich-text message gotcha: some pages read raw JSON directly to avoid next-intl tag parsing issues (see `app/[locale]/page.tsx`).

## API + progress patterns
- Public audit: `app/api/seo-audit/start/route.ts` creates `auditId`, updates an in-memory store, and runs `performComprehensiveAudit(...)` async (timeouts via `AUDIT_FETCH_TIMEOUT_MS`, `AUDIT_TOTAL_TIMEOUT_MS`).
- Polling: `GET /api/seo-audit/status?auditId=...` reads in-memory first, then falls back to `AuditRun` (Phase 4) if the instance is cold.
- Public crawl: `app/api/seo-audit/site-crawl/start/route.ts` + `GET /api/seo-audit/site-crawl/status?id=...` + `POST /api/seo-audit/site-crawl/cancel` (stores in `lib/server/crawl-store`).
- Dashboard crawl: `app/api/dashboard/page-crawler/start/route.ts` is auth-required (`dynamic = "force-dynamic"`, `runtime = "nodejs"`); status uses `GET /api/dashboard/page-crawler/status?id=...` (memory first, then DB `Crawl` with `type: "DASHBOARD"`).

## Auth/DB safety
- NextAuth v5 in `auth.ts` uses JWT strategy. Prefer `safeDbOperation(...)` (`lib/db-health.ts`) for best-effort writes so UX/API doesn’t hard-fail when DB is unhealthy.
- Redis is optional: `lib/redis.ts` uses `REDIS_URL`/`REDIS_KV_URL` and falls back to in-memory when unset.

## Workflows
- `pnpm dev` / `pnpm dev:fast`; `pnpm build` runs `prisma generate` first.
- Real type safety: `pnpm type-check` (build ignores TS/ESLint errors via `next.config.mjs`).
- Tests: `pnpm test` (Vitest), `pnpm test:e2e` (Playwright), `pnpm test:i18n` + `pnpm validate:i18n`.

## Gotchas
- `tsconfig.json` excludes `worker/**/*` and `src/**/*` from `pnpm type-check`; if you change worker code, run/check it explicitly.
