# Worker Service

This service runs BullMQ workers for audits and crawl jobs.

## Setup
- Copy `.env.example` to `.env` and fill in your values.
- Install dependencies: `pnpm install`
- Run in dev: `pnpm dev`
- Build: `pnpm build`
- Start: `pnpm start`

## Environment Variables
- `REDIS_URL` - Redis connection string
- `DATABASE_URL` - Postgres connection string
