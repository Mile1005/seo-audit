# 🚀 SEO Audit Tool - Deployment Guide

## 📋 Environment Alignment & Subdomain Strategy

### DNS Configuration

- **Production**: `app.aiseoturbo.com` → Product app (SEO Audit Tool)
- **Marketing**: `aiseoturbo.com` → Marketing site
- **Preview**: Inherits Vercel preview subdomains per repository
- **Local Development**: Product app on port 3001, Marketing on port 3000

### Port Configuration

```bash
# Local Development
Marketing Site: http://localhost:3000
Product App:   http://localhost:3001

# Production
Marketing Site: https://aiseoturbo.com
Product App:   https://app.aiseoturbo.com
```

### CORS Strategy

- **Local**: CORS disabled by colocating APIs within product app
- **Production**: APIs served from same domain as frontend
- **Cross-domain**: Configured for marketing → product app communication

## 🔧 Environment Variables

### Required Variables

```bash
# Database
DATABASE_URL=file:./dev.db                    # SQLite for dev, Postgres for prod
REDIS_URL=redis://localhost:6379              # Background job processing

# Authentication & Security
AUTH_SECRET=your-auth-secret-here             # Generate: openssl rand -base64 32
AUTH_EMAIL_SERVER=smtp://user:pass@smtp.example.com:587
AUTH_EMAIL_FROM=noreply@aiseoturbo.com

# Payment Processing
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3001     # Local: 3001, Prod: https://app.aiseoturbo.com

# Google Search Console
GSC_CLIENT_ID=your_gsc_client_id
GSC_CLIENT_SECRET=your_gsc_client_secret
GSC_REDIRECT_URI=http://localhost:3001/api/auth/gsc/callback

# PageSpeed Insights
PSI_API_KEY=your_psi_api_key
```

### Optional Variables

```bash
# Feature Flags
FEATURE_PLAYWRIGHT_FALLBACK=false
FORCE_INLINE_AUDIT=false

# Development
NEXT_TELEMETRY_DISABLED=1
FAST_REFRESH=false

# Worker Configuration
WORKER_CONCURRENCY=3

# Cache Configuration
PSI_CACHE_TTL=1800    # 30 minutes
GSC_CACHE_TTL=600     # 10 minutes
```

## 🚦 Rate Limiting Configuration

### Default Limits (Configurable via Environment)

```bash
# PageSpeed Insights API
PSI_RATE_LIMIT_QPS=1          # 1 request per second per user
PSI_RATE_LIMIT_DAILY=20       # 20 requests per day (free tier)

# Audit Limits
AUDIT_RATE_LIMIT_DAILY=5      # 5 audits per day (free tier)

# Crawl Limits
CRAWL_PAGE_LIMIT=30           # 30 pages per crawl (free tier)

# Job Processing
JOB_CONCURRENCY_PER_DOMAIN=1  # 1 concurrent job per domain
```

### Rate Limit Implementation

- **PSI API**: In-memory tracking with exponential backoff
- **User Limits**: Per-IP tracking for free tier enforcement
- **Job Queues**: BullMQ with Redis for background processing
- **Caching**: Aggressive caching to reduce API calls

## 🏗️ Deployment Architecture

### Local Development

```bash
# Terminal 1: Marketing Site
cd aiseoturbo-site
pnpm dev  # Runs on http://localhost:3000

# Terminal 2: Product App
cd seo-audit
pnpm dev  # Runs on http://localhost:3001
```

### Production Deployment

1. **Marketing Site**: Deploy to `aiseoturbo.com`
2. **Product App**: Deploy to `app.aiseoturbo.com`
3. **Database**: PostgreSQL on Vercel
4. **Redis**: Upstash Redis for job queues
5. **CDN**: Vercel Edge Network

### Environment-Specific Configurations

#### Development

```bash
DATABASE_URL=file:./dev.db
REDIS_URL=redis://localhost:6379
NEXT_PUBLIC_APP_URL=http://localhost:3001
GSC_REDIRECT_URI=http://localhost:3001/api/auth/gsc/callback
```

#### Preview (Vercel)

```bash
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
NEXT_PUBLIC_APP_URL=https://seo-audit-git-feature-branch.vercel.app
GSC_REDIRECT_URI=https://seo-audit-git-feature-branch.vercel.app/api/auth/gsc/callback
```

#### Production

```bash
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
NEXT_PUBLIC_APP_URL=https://app.aiseoturbo.com
GSC_REDIRECT_URI=https://app.aiseoturbo.com/api/auth/gsc/callback
```

## 🔄 Background Job Processing

### Queue Configuration

- **Redis**: Required for background processing
- **Fallback**: Inline processing when Redis unavailable
- **Concurrency**: Configurable per domain to prevent abuse
- **Retry Logic**: Exponential backoff for transient failures

### Job Types

1. **SEO Audits**: HTML parsing, PSI calls, GSC data
2. **Site Crawls**: Multi-page analysis with configurable limits
3. **Email Notifications**: Audit completion alerts
4. **Data Export**: Report generation and delivery

## 🛡️ Security & Authentication

### OAuth Flow

1. **Google Search Console**: OAuth2 with state validation
2. **Token Storage**: Encrypted in database
3. **Scope**: Read-only access to search analytics
4. **Refresh**: Automatic token refresh handling

### API Security

- **Rate Limiting**: Per-user and per-endpoint limits
- **CORS**: Configured for marketing → product communication
- **Validation**: Zod schemas for all API inputs
- **Sanitization**: Input cleaning and validation

## 📊 Monitoring & Analytics

### Health Checks

- **Database**: Connection status and query performance
- **Redis**: Queue health and job processing
- **External APIs**: PSI and GSC availability
- **Endpoints**: `/api/health` for comprehensive status

### Error Tracking

- **PSI Failures**: Automatic retry with exponential backoff
- **GSC Errors**: Graceful degradation when unavailable
- **Job Failures**: Permanent vs transient error classification
- **User Limits**: Free tier enforcement and upgrade prompts

## 🚀 Quick Start

### 1. Environment Setup

```bash
# Copy environment template
cp env.sample .env.local

# Edit with your values
nano .env.local
```

### 2. Database Setup

```bash
# Install dependencies
pnpm install

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

### 3. Verify Configuration

```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Test GSC configuration
curl http://localhost:3001/api/debug/gsc-config
```

## 📈 Scaling Considerations

### Free Tier Limits

- **Audits**: 5 per day
- **Crawls**: 30 pages per crawl
- **PSI Calls**: 20 per day
- **Storage**: SQLite for development

### Paid Tier Scaling

- **Database**: PostgreSQL with connection pooling
- **Redis**: Dedicated instance for job queues
- **CDN**: Global edge caching
- **Monitoring**: Advanced analytics and alerting

## 🔍 Troubleshooting

### Common Issues

1. **PSI API Limits**: Check rate limiting configuration
2. **GSC Authentication**: Verify OAuth credentials and redirect URI
3. **Database Connection**: Ensure DATABASE_URL is correct
4. **Redis Connection**: Check REDIS_URL and network access

### Debug Endpoints

- `/api/health` - System health status
- `/api/debug/gsc-config` - GSC configuration check
- `/debug` - Sample audit results for testing

## ✅ Acceptance Criteria

- [x] Both repos boot with `.env.local` derived from `.env.sample`
- [x] No missing environment variables
- [x] No external hardcoded secrets
- [x] Clear DNS and port configuration
- [x] Rate limiting strategy documented
- [x] Local development setup documented
- [x] Production deployment path defined
