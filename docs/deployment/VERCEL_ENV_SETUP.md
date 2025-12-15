# 🔧 Vercel Environment Setup Guide

## Problem

Your dashboard redirects to `localhost:3001` instead of staying on your Vercel domain because the environment variables are set for local development.

## Solution

### Step 1: Update Vercel Environment Variables

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your `seo-audit` project**
3. **Go to Settings → Environment Variables**
4. **Update these variables:**

```
NEXTAUTH_URL = https://seo-audit-git-feature-homepage-revamp-miles-projects-d985bf34.vercel.app
NEXT_PUBLIC_APP_URL = https://seo-audit-git-feature-homepage-revamp-miles-projects-d985bf34.vercel.app
```

> **Note**: Replace with your actual Vercel URL from the browser address bar

### Step 2: Update Google OAuth Configuration

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Navigate to APIs & Services → Credentials**
3. **Find your OAuth 2.0 Client ID**
4. **Add to Authorized redirect URIs:**
   ```
   https://YOUR-VERCEL-URL.vercel.app/api/auth/callback/google
   ```
5. **Add to Authorized JavaScript origins:**
   ```
   https://YOUR-VERCEL-URL.vercel.app
   ```

### Step 3: Redeploy

After updating environment variables, trigger a new deployment:

- Push any small change to your repository, or
- Go to Vercel dashboard → Deployments → Redeploy

### Step 4: Test

1. Visit your Vercel URL
2. Try to login
3. Dashboard should now work without redirecting to localhost

## Environment Variables Needed

```
NEXTAUTH_URL=https://your-vercel-url.vercel.app
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DATABASE_URL=your-database-url
RESEND_API_KEY=your-resend-key
EMAIL_FROM=noreply@seoaudit.dev
PSI_API_KEY=your-psi-api-key
NEXT_PUBLIC_APP_URL=https://your-vercel-url.vercel.app
```

## ✅ After Setup

- Login will work properly
- Dashboard will be accessible
- No more localhost redirects
- Google OAuth will function correctly
