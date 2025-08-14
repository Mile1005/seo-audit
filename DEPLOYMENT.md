# Deployment Guide

## Serverless (Vercel) without DB/Redis
- Set env vars:
  - `DISABLE_DB=true`
  - `NEXT_PUBLIC_DISABLE_DB=true`
  - Optional: `FORCE_INLINE_AUDIT=true`
- Audits are processed inline and returned in the `POST /api/audit.start` response. The homepage stores the result in `sessionStorage` and redirects.
- Do not open results links in new tabs; persistence requires a DB.

## With DB (SQLite/Postgres) and optional Redis workers
- Set `DATABASE_URL`.
- Run `pnpm db:push` to apply schema.
- Unset `DISABLE_DB` and `NEXT_PUBLIC_DISABLE_DB`.
- Optional: set `REDIS_URL` and run workers locally (`pnpm worker`) or on a separate process in production.

# Deployment Guide

This guide covers deploying the SEO Audit Tool to various hosting platforms.

## Prerequisites

- Node.js 18+ installed
- Git repository access
- Database service (Postgres recommended for production)
- Redis service (managed Redis recommended for production)

## Environment Setup

1. **Copy environment template**
   ```bash
   cp env.example .env.local
   ```

2. **Configure required variables**
   ```bash
   # Database (use production URL)
   DATABASE_URL=postgresql://user:password@host:port/database
   
   # Redis (use production URL)
   REDIS_URL=redis://user:password@host:port
   
   # Feature flags
   FEATURE_PLAYWRIGHT_FALLBACK=false
   ```

3. **Optional integrations**
   ```bash
   # PageSpeed Insights (for Core Web Vitals)
   PSI_API_KEY=your_psi_api_key
   
   # Google Search Console (for GSC data)
   GSC_CLIENT_ID=your_gsc_client_id
   GSC_CLIENT_SECRET=your_gsc_client_secret
   GSC_REDIRECT_URI=https://yourdomain.com/api/auth/gsc/callback
   ```

## Vercel Deployment (Recommended)

### 1. Deploy Next.js App

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts to configure:
# - Project name: seo-audit
# - Directory: ./
# - Override settings: No
```

### 2. Configure Environment Variables

In Vercel dashboard:
1. Go to your project
2. Navigate to Settings → Environment Variables
3. Add all variables from your `.env.local`

### 3. Deploy Background Workers

Since Vercel doesn't support long-running processes, deploy workers separately:

#### Option A: Railway
```bash
# Create new Railway project
railway init

# Add environment variables
railway variables set DATABASE_URL=your_db_url
railway variables set REDIS_URL=your_redis_url

# Deploy worker
railway up
```

#### Option B: Render
1. Create new Background Worker service
2. Connect your Git repository
3. Set build command: `pnpm install`
4. Set start command: `pnpm worker`
5. Add environment variables

#### Option C: DigitalOcean App Platform
1. Create new App
2. Connect Git repository
3. Set build command: `pnpm install`
4. Set run command: `pnpm worker`
5. Add environment variables

### 4. Configure Custom Domain

In Vercel dashboard:
1. Go to Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## Railway Deployment (All-in-One)

### 1. Deploy App and Worker

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add services
railway service create seo-audit-app
railway service create seo-audit-worker

# Deploy app
railway up --service seo-audit-app

# Deploy worker
railway up --service seo-audit-worker
```

### 2. Configure Services

**App Service:**
- Build Command: `pnpm install && pnpm build`
- Start Command: `pnpm start`
- Port: 3000

**Worker Service:**
- Build Command: `pnpm install`
- Start Command: `pnpm worker`
- No port needed

### 3. Add Managed Services

Railway provides managed Postgres and Redis:
1. Create Postgres service
2. Create Redis service
3. Link services to your app and worker

## Render Deployment

### 1. Deploy Web Service (App)

1. Create new Web Service
2. Connect Git repository
3. Configure:
   - Build Command: `pnpm install && pnpm build`
   - Start Command: `pnpm start`
   - Environment: Node

### 2. Deploy Background Worker

1. Create new Background Worker
2. Connect same Git repository
3. Configure:
   - Build Command: `pnpm install`
   - Start Command: `pnpm worker`
   - Environment: Node

### 3. Add Managed Services

Render provides managed Postgres and Redis:
1. Create Postgres database
2. Create Redis instance
3. Link to both services

## Self-Hosted Deployment

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### 2. Application Deployment

```bash
# Clone repository
git clone <your-repo-url>
cd seo-audit

# Install dependencies
pnpm install

# Build application
pnpm build

# Set up environment
cp env.example .env.local
# Edit .env.local with production values

# Set up database
pnpm db:push

# Start Redis
docker compose up -d redis
```

### 3. Process Management

Use PM2 for process management:

```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start "pnpm start" --name "seo-audit-app"

# Start worker
pm2 start "pnpm worker" --name "seo-audit-worker"

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

### 4. Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Docker Deployment

### 1. Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN pnpm build

# Expose port
EXPOSE 3000

# Start command
CMD ["pnpm", "start"]
```

### 2. Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - redis
      - postgres

  worker:
    build: .
    command: pnpm worker
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - redis
      - postgres

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=seo_audit
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### 3. Deploy with Docker

```bash
# Build and start services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

## Production Checklist

### Security
- [ ] Use HTTPS everywhere
- [ ] Set secure environment variables
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Use strong database passwords
- [ ] Enable security headers

### Performance
- [ ] Enable CDN (Cloudflare, etc.)
- [ ] Configure caching headers
- [ ] Optimize images
- [ ] Enable compression
- [ ] Set up monitoring

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure logging
- [ ] Set up health checks
- [ ] Monitor database performance
- [ ] Set up uptime monitoring

### Backup
- [ ] Configure database backups
- [ ] Set up file backups
- [ ] Test restore procedures
- [ ] Document backup schedule

### Maintenance
- [ ] Set up automatic updates
- [ ] Configure log rotation
- [ ] Set up SSL certificate renewal
- [ ] Plan for scaling

## Troubleshooting

### Common Issues

**Build Failures:**
- Check Node.js version (18+ required)
- Verify all dependencies are installed
- Check for TypeScript errors

**Database Connection:**
- Verify DATABASE_URL format
- Check database server is running
- Ensure network connectivity

**Redis Connection:**
- Verify REDIS_URL format
- Check Redis server is running
- Ensure network connectivity

**Worker Issues:**
- Check worker logs
- Verify environment variables
- Ensure Redis is accessible

**Performance Issues:**
- Check database query performance
- Monitor Redis memory usage
- Review application logs

### Debug Commands

```bash
# Check application status
pnpm typecheck
pnpm lint
pnpm test

# Check database connection
pnpm db:push

# Test Redis connection
redis-cli ping

# View application logs
pm2 logs

# Check system resources
htop
df -h
free -h
```

## Support

For deployment issues:
1. Check the troubleshooting section
2. Review application logs
3. Verify environment configuration
4. Test locally first
5. Check platform-specific documentation
