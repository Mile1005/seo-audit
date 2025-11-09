# Dashboard Page Crawler - Quick Start Guide

## 🚀 What's New

A comprehensive **Page Crawler** feature has been added to your dashboard! This allows you to crawl up to **100 pages** of any website with detailed SEO analysis.

## 📍 Location

**Dashboard:** `/dashboard/page-crawler`  
**Navigation:** Sidebar → Page Crawler (between Site Audit and Backlinks)

## ✨ Features

- ✅ Crawl 10-100 pages per session
- ✅ 5 crawls per month (free tier)
- ✅ Comprehensive SEO metrics per page
- ✅ Filter & sort results
- ✅ CSV export
- ✅ Full crawl history
- ✅ Real-time progress tracking

## 🛠️ Setup Instructions

### 1. Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name add_crawl_type_field

# Or for production
npx prisma migrate deploy
```

### 2. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 3. Access the Feature

Navigate to: `http://localhost:3000/dashboard/page-crawler`

## 📊 How to Use

### Starting a New Crawl

1. Click **"New Crawl"** tab
2. Enter website URL (e.g., `https://example.com`)
3. Select **number of pages** (10, 25, 50, 75, or 100)
4. Choose **crawl depth** (1-5 levels)
5. Click **"Start Crawl"**
6. Watch real-time progress
7. View results automatically when complete

### Viewing Crawl History

1. Click **"Crawl History"** tab
2. Browse previous crawls
3. Click any crawl to view detailed results
4. Use filters to find specific issues
5. Export to CSV for analysis

## 📈 What Gets Analyzed

For each page crawled:
- ✅ Title tag
- ✅ Meta description
- ✅ H1 and H2 headings
- ✅ Word count
- ✅ Images (total & missing alt text)
- ✅ Internal links
- ✅ HTTP status code
- ✅ Comprehensive audit (root page only)

## 🎯 Use Cases

1. **SEO Audit** - Find pages with missing titles, H1s, or meta descriptions
2. **Content Analysis** - Track word counts and content quality
3. **Image Optimization** - Identify images without alt text
4. **Technical SEO** - Monitor HTTP status codes and crawlability
5. **Progress Tracking** - Compare crawls over time

## 📝 Limits & Quotas

| Tier | Crawls/Month | Max Pages | Max Depth |
|------|--------------|-----------|-----------|
| Free | 5 | 100 | 5 |
| Pro | Unlimited | 1000+ | 10 |

## 🔗 Related Features

- **Site Audit** (`/dashboard/audit`) - Comprehensive single-page SEO audit
- **Keywords** (`/dashboard/keywords`) - Keyword research and tracking
- **Public Crawler** (`/features/site-crawler`) - Quick 15-page public tool

## 📚 Documentation

Full documentation available at:
- `docs/PAGE_CRAWLER_IMPLEMENTATION.md` - Complete technical guide
- `docs/SITE_CRAWLER_ANALYSIS.md` - Original crawler analysis

## 🆘 Troubleshooting

### "Authentication required" error
→ Make sure you're logged in to the dashboard

### Crawl not starting
→ Check your quota (5 crawls/month for free users)

### Results not showing
→ Wait for crawl to complete (check progress bar)

### Database error
→ Run `npx prisma migrate dev` to apply schema changes

## 🎉 That's It!

You now have a professional-grade page crawler integrated into your dashboard. Start crawling and optimizing your websites today!

---

**Need Help?** Check the full documentation or contact support.
