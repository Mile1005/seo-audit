# SEO-Audit — AI-Readiness Audit (Next.js 14)

Production-ready Single-Page AI Visibility Audit SaaS.

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Zod for validation
- Prisma + SQLite (dev) with easy Postgres switch
- BullMQ + Redis (background jobs)
- undici for HTTP + Cheerio for parsing
- Optional Playwright fallback (feature flag)

## Quickstart

1) Install deps
```bash
pnpm i
```

2) Configure env
```bash
cp .env.example .env.local
# edit .env.local if needed
```

3) Setup DB
```bash
pnpm db:push
```

4) Start Redis (Docker)
```bash
docker compose up -d redis
```

5) Run app and worker
```bash
pnpm dev        # terminal 1
pnpm worker     # terminal 2
```

Open http://localhost:3000. Use /debug to render the UI using a sample audit without running a job.

## Scripts
- dev, build, start, worker, db:push, lint, format, test

## Environment
- `REDIS_URL=redis://localhost:6379`
- `DATABASE_URL="file:./dev.db"`
- `FEATURE_PLAYWRIGHT_FALLBACK=false`
- Optional GSC OAuth:
  - `GSC_CLIENT_ID=`
  - `GSC_CLIENT_SECRET=`
  - `GSC_REDIRECT_URI=`

## API
- POST `/api/audit.start` → `{ runId, status: "queued" }`
- GET `/api/audit.get?id=...` → `{ status, result? }`

## Worker Flow
1. Fetch HTML with realistic headers and timeout/backoff
2. Parse with Cheerio (title, meta, canonical, headings, images, internal links, JSON-LD types)
3. Heuristics scoring and issue generation
4. Optional GSC enrichment (if env configured)
5. Save `AuditResultV1` to DB and mark run ready

## Playwright fallback
Disabled by default. If `FEATURE_PLAYWRIGHT_FALLBACK=true`, modify `lib/scrape.ts` to use Playwright. Note: Playwright is not suited for Vercel serverless; run worker on a separate host (Fly/Render/Railway). Keep the web app on Vercel and the worker elsewhere.

## Switch DB to Postgres
- Change `DATABASE_URL` to your Neon/Supabase URL, e.g.
  - `DATABASE_URL=postgresql://user:pass@host:5432/db?schema=public`
- Update `prisma/schema.prisma` datasource provider to `postgresql` and run `pnpm db:push`.

## Production Deploy
- Frontend/API (Next.js) on Vercel
- Worker on a separate host (Fly/Render/Railway)
- Managed Redis (Upstash/Redis Cloud)
- Set env vars for both app and worker

## Notes on GSC
If configured, pull last 28 days page metrics (clicks, impressions, ctr, avg position) and top queries. Respect quotas; implement backoff on HTTP 429. In this starter, a safe placeholder is returned unless credentials are present.

## Tests
Run tests with:
```bash
pnpm test
```

## License
MIT


