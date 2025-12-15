# Vercel Deployment Guide

This document outlines the configuration needed for successful Vercel deployment with Prisma.

## Prisma + Vercel Configuration

### 1. Build Scripts (package.json)

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

### 2. Vercel Configuration (vercel.json)

```json
{
  "buildCommand": "pnpm run build",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "env": {
    "PRISMA_GENERATE_SKIP_AUTOINSTALL": "true",
    "SKIP_ENV_VALIDATION": "true"
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### 3. Next.js Configuration (next.config.mjs)

```javascript
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("_http_common");
    }
    return config;
  },
};
```

## Environment Variables

### Required Environment Variables for Vercel:

1. `DATABASE_URL` - PostgreSQL connection string
2. `NEXTAUTH_SECRET` - Random secret for NextAuth.js
3. `NEXTAUTH_URL` - Your deployment URL
4. `GOOGLE_CLIENT_ID` - Google OAuth Client ID
5. `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret
6. `RESEND_API_KEY` - Resend API key for emails

### Setting Environment Variables:

```bash
# In Vercel dashboard or CLI
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
vercel env add RESEND_API_KEY
```

## Deployment Steps

1. **Commit and push changes**:

   ```bash
   git add .
   git commit -m "fix: Configure Prisma for Vercel deployment"
   git push
   ```

2. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically on push

3. **Database Setup**:
   ```bash
   # After deployment, push database schema
   npx prisma db push
   ```

## Troubleshooting

### Common Issues:

1. **Prisma Client not generated**:
   - Ensure `postinstall` script is in package.json
   - Check that `prisma generate` runs during build

2. **Database connection issues**:
   - Verify `DATABASE_URL` is correctly set
   - Ensure database is accessible from Vercel

3. **Build timeouts**:
   - Function timeout is set to 30 seconds in vercel.json
   - Optimize database queries if needed

4. **Environment variable issues**:
   - Use Vercel dashboard to set production variables
   - Don't commit `.env` files to git

## Security Notes

- Never commit `.env` files containing secrets
- Use Vercel's environment variable system
- Enable GitHub push protection for secrets
- Rotate secrets regularly

## Performance Optimization

- Database queries are optimized for production
- Static pages are pre-rendered where possible
- API routes have appropriate caching headers
- Prisma connection pooling is configured
