# Dashboard Page Crawler Feature - Implementation Guide

**Created:** October 14, 2025  
**Feature:** Professional Page Crawler for Dashboard  
**Status:** ✅ Complete and Ready to Use

---

## 🎯 Overview

The Dashboard Page Crawler is a comprehensive website analysis tool that allows authenticated users to crawl up to **100 pages** of their websites with detailed SEO insights. This feature is integrated into the main dashboard alongside Site Audit, Keywords, and other core features.

---

## ✨ Key Features

### Crawling Capabilities

- **Page Limits:** 10 to 100 pages per crawl
- **Depth Control:** 1 to 5 levels deep
- **Smart Crawling:** Breadth-first search with depth tracking
- **Timeout:** 15 seconds per page
- **User Agent:** `Mozilla/5.0 (compatible; AISEOTurbo-PageCrawler/1.0)`

### Analysis Features

- ✅ Title tag analysis
- ✅ Meta description checking
- ✅ H1/H2 heading analysis
- ✅ Word count tracking
- ✅ Image analysis (total images, missing alt text)
- ✅ Internal link counting
- ✅ HTTP status codes
- ✅ Comprehensive root page audit

### User Experience

- 📊 Real-time progress tracking
- 📁 Crawl history with filtering
- 🔍 Advanced search and filtering
- 📈 Sortable results table
- 💾 CSV export functionality
- 📱 Responsive design
- 🌙 Dark mode support

---

## 📁 File Structure

```
app/
├── api/
│   └── dashboard/
│       └── page-crawler/
│           ├── start/
│           │   └── route.ts       # Start crawl endpoint
│           ├── status/
│           │   └── route.ts       # Get crawl status
│           └── list/
│               └── route.ts       # List user crawls
└── dashboard/
    ├── layout.tsx                  # Updated with Page Crawler nav
    └── page-crawler/
        └── page.tsx                # Main UI component

prisma/
└── schema.prisma                   # Updated Crawl model with type field

lib/
└── server/
    └── quota.ts                    # Updated quota limits (5 crawls/month)

docs/
├── SITE_CRAWLER_ANALYSIS.md       # Original analysis
└── PAGE_CRAWLER_IMPLEMENTATION.md  # This file
```

---

## 🔌 API Endpoints

### 1. Start Crawl

**Endpoint:** `POST /api/dashboard/page-crawler/start`

**Authentication:** Required

**Request Body:**

```json
{
  "url": "https://example.com",
  "maxPages": 50,
  "maxDepth": 3,
  "projectId": "optional-project-id"
}
```

**Response:**

```json
{
  "crawlId": "uuid",
  "dbId": "db-record-id",
  "status": "processing",
  "message": "Crawl started successfully"
}
```

**Features:**

- Validates and normalizes URLs
- Enforces authentication
- Checks quota limits
- Creates database record
- Associates with project (auto-creates if needed)
- Starts async background crawl job
- Returns immediately with job ID

**Limits:**

- Min pages: 10
- Max pages: 100
- Min depth: 1
- Max depth: 5

---

### 2. Get Crawl Status

**Endpoint:** `GET /api/dashboard/page-crawler/status?id={crawlId}`

**Authentication:** Not required (job-based)

**Response:**

```json
{
  "id": "uuid",
  "status": "processing|completed|failed",
  "progress": 75,
  "processed": 38,
  "queued": 12,
  "maxPages": 50,
  "pages": [...],
  "error": null,
  "startedAt": 1234567890,
  "updatedAt": 1234567899
}
```

**Usage:**

- Poll every 2 seconds during crawl
- Automatically stops when status is 'completed' or 'failed'

---

### 3. List Crawls

**Endpoint:** `GET /api/dashboard/page-crawler/list`

**Authentication:** Required

**Query Parameters:**

- `projectId` (optional): Filter by project
- `limit` (default: 20): Number of results
- `offset` (default: 0): Pagination offset

**Response:**

```json
{
  "crawls": [
    {
      "id": "crawl-id",
      "projectId": "project-id",
      "projectName": "Example Site",
      "projectDomain": "example.com",
      "startUrl": "https://example.com",
      "status": "COMPLETED",
      "pages": 45,
      "errors": 2,
      "settings": {
        "maxPages": 50,
        "maxDepth": 3
      },
      "results": {
        "pages": [...],
        "summary": {...}
      },
      "createdAt": "2025-10-14T...",
      "completedAt": "2025-10-14T..."
    }
  ],
  "total": 15,
  "limit": 20,
  "offset": 0
}
```

---

## 💾 Database Schema

### Crawl Model (Updated)

```prisma
model Crawl {
  id          String      @id @default(cuid())
  projectId   String
  startUrl    String
  status      CrawlStatus @default(QUEUED)
  pages       Int         @default(0)
  errors      Int         @default(0)
  settings    Json?
  results     Json?
  type        String?     @default("STANDARD") // "STANDARD" or "DASHBOARD"
  startedAt   DateTime?
  completedAt DateTime?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@index([projectId, status])
  @@index([status])
  @@index([type])
}
```

**New Fields:**

- `type`: Distinguishes between standard crawls and dashboard crawls
- Indexed for efficient querying

---

## 📊 Results Data Structure

### Summary Object

```typescript
{
  totalPages: number;
  pagesWithIssues: number;
  averageWordCount: number;
  totalImages: number;
  imagesWithoutAlt: number;
  missingTitles: number;
  missingH1: number;
  missingMetaDesc: number;
}
```

### Page Object

```typescript
{
  url: string;
  status: number | null;
  title?: string;
  metaDescription?: string;
  wordCount?: number;
  h1Count?: number;
  h2Count?: number;
  images?: number;
  imagesWithoutAlt?: number;
  internalLinkCount?: number;
  fetchedAt: string;
  error?: string;
  comprehensive?: object; // Only for root page
}
```

---

## 🎨 UI Components

### Main Page: `/dashboard/page-crawler`

**Two Tabs:**

1. **New Crawl Tab**
   - URL input with validation
   - Page limit selector (10, 25, 50, 75, 100)
   - Depth selector (1-5)
   - Start crawl button
   - Real-time progress bar
   - Status messages

2. **Crawl History Tab**
   - List of previous crawls
   - Summary cards for each crawl
   - Click to view detailed results
   - Filter by project
   - Pagination support

### Results View

**Summary Cards:**

- Total Pages
- Pages with Issues
- Average Word Count
- Images without Alt Text

**Issue Breakdown:**

- Missing Titles count
- Missing H1 count
- Missing Meta Descriptions count

**Detailed Table:**

- Sortable columns (URL, Status, H1, Words, Images)
- Filter options:
  - All Pages
  - Pages with Issues
  - Missing Title
  - Missing H1
  - Missing Meta Description
  - Images without Alt
- Search functionality
- Expandable rows for full details
- CSV export button

**Table Columns:**

- URL (clickable, external link)
- Status Code (color-coded badge)
- H1 Presence (checkmark/X)
- Word Count
- Images (with alt text warnings)
- Issue Count (badge if >0)
- Details (expand button)

**Expanded Row Details:**

- Full title
- Full meta description
- H1 Count
- H2 Count
- Internal Links
- Crawl timestamp

---

## 🔐 Authentication & Quotas

### Authentication

- **Required** for all dashboard page crawler endpoints
- Uses NextAuth.js session
- Validated via `auth()` function

### Quota System

**Free Tier Limits:**

- **Site Crawls per Month:** 5 (increased from 2)
- Resets monthly (tracks by YYYY-MM)
- Enforced before starting crawl
- Returns 402 Payment Required if exceeded

**Quota Tracking:**

- Stored in `UserUsage` model
- Keyed by userId + monthKey
- Incremented after successful crawl
- Graceful fallback if quota system unavailable

---

## 🚀 Crawling Algorithm

### Flow

1. **Initialization**
   - Validate URL and parameters
   - Check authentication and quota
   - Create database record
   - Initialize in-memory job tracker
   - Start async background job

2. **Breadth-First Crawling**

   ```
   Queue: [{ url: startUrl, depth: 0 }]
   Visited: Set()

   While queue not empty AND pages < maxPages:
     - Dequeue next URL
     - Skip if already visited
     - Fetch page (15s timeout)
     - Parse HTML with Cheerio
     - Extract SEO data
     - Perform lightweight audit
     - If root page: comprehensive audit
     - Extract internal links
     - Add links to queue with depth+1
     - Update progress
   ```

3. **Link Extraction**
   - Parse all `<a href>` tags
   - Check canonical tags
   - Filter same-origin only
   - Remove fragments (#)
   - Respect maxDepth limit
   - Deduplicate URLs

4. **Finalization**
   - Calculate summary statistics
   - Update database record
   - Mark job as completed
   - Increment usage quota

### Error Handling

- Page fetch failures: Log error, continue
- Timeout: Abort after 15s, continue
- Parse errors: Log, continue
- Critical errors: Mark job as failed

---

## 📈 Performance Characteristics

### Speed

- **Pages per minute:** 4-8 (with 15s timeout)
- **100 pages:** ~12-25 minutes
- **50 pages:** ~6-12 minutes
- **Background execution:** Non-blocking

### Timeouts

- **Per page:** 15 seconds
- **Polling interval:** 2 seconds
- **Max poll duration:** 10 minutes
- **Overall:** No hard limit (async)

### Resource Usage

- **Memory:** In-memory job tracking
- **Database:** One record per crawl
- **Network:** Sequential page fetching
- **Storage:** JSON results in database

---

## 🎯 Use Cases

### Website Audit

- Identify pages with missing titles
- Find H1 tag issues across entire site
- Detect meta description problems
- Track image optimization needs

### Content Analysis

- Average word count across site
- Content distribution analysis
- Identify thin content pages
- Monitor content quality

### Technical SEO

- HTTP status code monitoring
- Internal linking structure
- Site depth analysis
- Crawlability issues

### Reporting

- Export data to CSV
- Historical comparison
- Progress tracking over time
- Issue prioritization

---

## 🔄 Comparison with Original Site Crawler

| Feature             | Original Crawler            | Dashboard Page Crawler         |
| ------------------- | --------------------------- | ------------------------------ |
| Max Pages           | 25 (simple), 200 (advanced) | **100**                        |
| Authentication      | Optional                    | **Required**                   |
| Quota               | 2/month                     | **5/month**                    |
| UI Location         | /features/site-crawler      | **/dashboard/page-crawler**    |
| Results Storage     | Temporary                   | **Persistent in DB**           |
| History             | No                          | **Yes, full history**          |
| Export              | No                          | **CSV export**                 |
| Project Association | No                          | **Yes, auto-links**            |
| Progress Tracking   | Basic                       | **Real-time with polling**     |
| Results View        | Simple table                | **Comprehensive with filters** |
| Search              | No                          | **Yes**                        |
| Sorting             | No                          | **Yes, multiple fields**       |
| Mobile Friendly     | Partial                     | **Fully responsive**           |

---

## 🛠️ Migration from Old Crawler

No migration needed - this is a new parallel feature. Users can:

- Use the public site crawler at `/features/site-crawler` for quick 15-page scans
- Use the dashboard page crawler at `/dashboard/page-crawler` for comprehensive 100-page analysis

---

## 📝 Usage Instructions

### For Developers

1. **Database Setup**

   ```bash
   # Generate Prisma client with new schema
   npx prisma generate

   # Create migration
   npx prisma migrate dev --name add_crawl_type_field
   ```

2. **Test the Feature**

   ```bash
   # Start development server
   npm run dev

   # Navigate to
   http://localhost:3000/dashboard/page-crawler
   ```

3. **Environment Variables**
   - Ensure `DATABASE_URL` is configured
   - NextAuth.js must be properly set up
   - No additional env vars needed

### For Users

1. **Access the Feature**
   - Log in to your dashboard
   - Click "Page Crawler" in the sidebar
   - Or navigate directly to `/dashboard/page-crawler`

2. **Start a Crawl**
   - Select "New Crawl" tab
   - Enter your website URL
   - Choose number of pages (10-100)
   - Select crawl depth (1-5)
   - Click "Start Crawl"

3. **Monitor Progress**
   - Watch real-time progress bar
   - Percentage updates every 2 seconds
   - Automatic redirect when complete

4. **View Results**
   - Automatically shown when crawl completes
   - Or access from "Crawl History" tab
   - Click any previous crawl to view details

5. **Analyze Data**
   - Review summary statistics
   - Use filters to find specific issues
   - Search for specific URLs/titles
   - Sort by any column
   - Expand rows for full details

6. **Export Data**
   - Click "Export CSV" button
   - Opens in Excel or Google Sheets
   - All page data included
   - Includes issue descriptions

---

## 🐛 Known Limitations

1. **JavaScript Rendering**
   - Does not execute JavaScript
   - SPAs may show incomplete content
   - Use server-side rendered pages for best results

2. **Rate Limiting**
   - No built-in rate limiting
   - May trigger site rate limits for large crawls
   - Consider adding delays for sensitive sites

3. **Memory Usage**
   - In-memory job tracking
   - Lost on server restart
   - Database records persist

4. **Concurrent Crawls**
   - No limit on concurrent crawls per user
   - May want to add this in future

5. **Max Pages**
   - Hard limit of 100 pages
   - Marketing materials may mention higher limits
   - Can be increased by changing code

---

## 🔮 Future Enhancements

### Short Term

- [ ] Add rate limiting configuration
- [ ] Implement crawl cancellation
- [ ] Add email notifications on completion
- [ ] Enable JavaScript rendering (Puppeteer)
- [ ] Add more export formats (JSON, PDF)

### Medium Term

- [ ] Scheduled crawls
- [ ] Crawl comparison (before/after)
- [ ] AI-powered insights
- [ ] Custom crawl rules (include/exclude patterns)
- [ ] Webhooks for crawl completion

### Long Term

- [ ] Distributed crawling
- [ ] Real-time monitoring
- [ ] Change detection alerts
- [ ] Advanced SEO scoring
- [ ] Competitor crawling

---

## 🎓 Best Practices

### For Users

1. **Start Small**
   - Begin with 10-25 pages
   - Verify results are as expected
   - Then increase to 50-100

2. **Choose Appropriate Depth**
   - Depth 1: Homepage analysis only
   - Depth 2-3: Most sites (recommended)
   - Depth 4-5: Large, complex sites only

3. **Review Regularly**
   - Weekly for active sites
   - Monthly for stable sites
   - After major updates

4. **Act on Issues**
   - Prioritize missing titles/H1s
   - Fix images without alt text
   - Improve thin content pages

### For Developers

1. **Error Handling**
   - Always wrap in try-catch
   - Provide meaningful error messages
   - Log errors for debugging

2. **Performance**
   - Keep timeouts reasonable
   - Monitor database size
   - Clean old crawl data periodically

3. **Security**
   - Always validate input
   - Sanitize URLs
   - Enforce authentication
   - Check quotas

4. **Monitoring**
   - Track crawl success rates
   - Monitor average completion times
   - Watch for timeout patterns
   - Alert on high failure rates

---

## 📞 API Testing with cURL

### Start a Crawl

```bash
curl -X POST https://aiseoturbo.com/api/dashboard/page-crawler/start \
  -H "Content-Type: application/json" \
  -H "Cookie: your-auth-cookie" \
  -d '{
    "url": "https://example.com",
    "maxPages": 50,
    "maxDepth": 3
  }'
```

### Check Status

```bash
curl "https://aiseoturbo.com/api/dashboard/page-crawler/status?id=CRAWL_ID" \
  -H "Cookie: your-auth-cookie"
```

### List Crawls

```bash
curl "https://aiseoturbo.com/api/dashboard/page-crawler/list?limit=10" \
  -H "Cookie: your-auth-cookie"
```

---

## 🎉 Summary

The Dashboard Page Crawler is now **fully implemented and ready to use**. It provides:

✅ **100 pages per crawl** (vs 15 in public crawler)  
✅ **Full dashboard integration** with sidebar navigation  
✅ **Comprehensive results** with filtering, sorting, search  
✅ **CSV export** for further analysis  
✅ **Crawl history** with persistent storage  
✅ **Real-time progress** tracking  
✅ **Project association** for organization  
✅ **Increased quota** (5 crawls/month)

This feature matches and exceeds the functionality shown in your Semrush screenshot reference, providing a professional-grade page crawler tool directly in your dashboard!

---

_Documentation created on October 14, 2025_
