# SEO Audit Tool - Deployment Guide

## 🚀 Quick Setup

### 1. Run the Complete Setup Script

```bash
# Windows
deploy-setup.bat

# Or manually:
pnpm install
pnpm build
```

### 2. Environment Variables

The setup script automatically configures:

- **PageSpeed Insights API**: Core Web Vitals data
- **Google Search Console**: Search analytics data
- **Database**: SQLite for development
- **Redis**: Background job processing

## 🔧 API Configuration

### PageSpeed Insights (Core Web Vitals)

- **API Key**: `YOUR_PSI_API_KEY`
- **Features**: LCP, CLS, INP metrics with performance insights
- **Status**: ✅ Fully implemented

### Google Search Console

- **Client ID**: `[YOUR_GSC_CLIENT_ID]`
- **Client Secret**: `[YOUR_GSC_CLIENT_SECRET]`
- **Redirect URI**: `https://seo-audit-seven.vercel.app/api/auth/gsc/callback`
- **Features**: Search analytics, top queries, CTR data
- **Status**: ✅ Fully implemented

## 📊 New Features

### 1. Core Web Vitals Panel

- **LCP** (Largest Contentful Paint) with target ≤2.5s
- **CLS** (Cumulative Layout Shift) with target ≤0.1
- **INP** (Interaction to Next Paint) with target ≤200ms
- **Performance insights** with specific recommendations
- **Color-coded status indicators** (Good/Needs Improvement/Poor)

### 2. Google Search Console Integration

- **Search analytics** for the last 28 days
- **Top performing queries** with metrics
- **Click-through rates** and impressions
- **Domain-specific data** for audited websites

### 3. Enhanced Audit Results

- **Performance data** from PageSpeed Insights
- **GSC insights** when available
- **Comprehensive scoring** across all SEO factors
- **Actionable recommendations** with quick wins

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**: All changes are ready for deployment
2. **Automatic Deployment**: Vercel will build and deploy automatically
3. **Environment Variables**: Add the same environment variables to Vercel

### Environment Variables for Vercel

```bash
# PageSpeed Insights
PSI_API_KEY=YOUR_PSI_API_KEY

# Google Search Console
GSC_CLIENT_ID=[YOUR_GSC_CLIENT_ID]
GSC_CLIENT_SECRET=[YOUR_GSC_CLIENT_SECRET]
GSC_REDIRECT_URI=https://seo-audit-seven.vercel.app/api/auth/gsc/callback

# App Configuration
NEXT_PUBLIC_APP_URL=https://seo-audit-seven.vercel.app
```

## 🧪 Testing

### Local Testing

```bash
# Start development server
pnpm dev

# Test GSC configuration
curl http://localhost:3000/api/debug/gsc-config

# Test PSI configuration
# Run an audit and check for Core Web Vitals data
```

### Production Testing

1. **Run an audit** on any website
2. **Check Core Web Vitals** section in results
3. **Verify GSC integration** (requires authentication)
4. **Test all features** work as expected

## 📋 Feature Status

| Feature               | Status      | Notes                        |
| --------------------- | ----------- | ---------------------------- |
| PageSpeed Insights    | ✅ Complete | Core Web Vitals working      |
| Google Search Console | ✅ Complete | Requires user authentication |
| Site Crawl            | ✅ Complete | Basic crawling implemented   |
| Competitor Analysis   | ⚠️ Basic    | SERP scraping available      |
| AI Insights           | ⚠️ Basic    | Local AI models working      |
| Email Notifications   | ⚠️ Basic    | Console logging only         |

## 🔍 Troubleshooting

### Common Issues

1. **GSC not working**: Check authentication flow
2. **PSI data missing**: Verify API key is set
3. **Build errors**: Run `pnpm typecheck` to check TypeScript
4. **Deployment fails**: Check environment variables in Vercel

### Debug Endpoints

- **GSC Config**: `/api/debug/gsc-config`
- **Health Check**: `/api/health`
- **Sample Data**: `/debug` (shows sample audit results)

## 🎉 Ready for Production!

Your SEO Audit Tool now includes:

- ✅ **Core Web Vitals** from PageSpeed Insights
- ✅ **Search Console** integration
- ✅ **Enhanced audit results**
- ✅ **Performance insights**
- ✅ **Production-ready deployment**

All APIs are configured and ready to use!
