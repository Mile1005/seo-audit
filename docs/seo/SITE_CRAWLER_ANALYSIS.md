# Site Crawler Feature Analysis

## Overview
Comprehensive analysis of the Site Crawler feature at https://www.aiseoturbo.com/features/site-crawler

**Analysis Date:** October 14, 2025

---

## 🎯 Feature Purpose
The Site Crawler is an AI-powered tool that systematically browses and analyzes all pages on a website, discovering pages, analyzing content, checking for SEO issues, and mapping the site's structure.

---

## 📊 Crawling Limits & Quotas

### Frontend Limits (UI)
Located in: `app/features/site-crawler/site-crawler-content.tsx`

**User-Facing Options:**
- **5 pages** - Quick scan
- **10 pages** - Recommended (default)
- **15 pages** - Deep analysis

**Note:** UI displays "Free users can crawl up to 15 pages"

### Backend Limits

#### 1. Simple Crawler (`/api/crawl/start`)
Located in: `app/api/crawl/start/route.ts`
- **Hard limit:** Max 25 pages per crawl
- **Default:** 10 pages
- **Validation:** `Math.min(limit, 25)`
- **Usage:** Free tier - no authentication required

#### 2. Advanced Crawler (`/api/seo-audit/site-crawl/start`)
Located in: `app/api/seo-audit/site-crawl/start/route.ts`
- **Hard limit:** Max 200 pages per crawl
- **Default:** 20 pages
- **Max depth:** 5 levels (default: 2)
- **Validation:** 
  - `maxPages = Math.min(200, Math.max(1, maxPages))`
  - `maxDepth = Math.min(5, Math.max(0, maxDepth))`

### Usage Quotas
Located in: `lib/server/quota.ts`

**Free Tier Limits:**
- **Single-page audits:** 30 per month
- **Site crawls:** 2 per month
- **Reset:** Monthly (tracks by YYYY-MM format)

**Quota Enforcement:**
- Enforced only for authenticated users
- If quota exceeded: Returns 402 status with upgrade message
- Increments usage counter after successful crawl

---

## 🛣️ API Routes & Endpoints

### Primary Endpoints

#### 1. `/api/crawl/start` (Simple Crawler)
**Method:** POST  
**Request Body:**
```json
{
  "startUrl": "https://example.com",
  "limit": 10
}
```

**Response:**
```json
{
  "status": "completed",
  "result": {
    "startUrl": "string",
    "pages": [],
    "totalPages": 0,
    "successfulPages": 0,
    "failedPages": 0,
    "averageLoadTime": 0,
    "crawlTime": 0,
    "issues": {},
    "robotsTxt": { "found": false },
    "sitemapXml": { "found": false },
    "brokenLinks": []
  }
}
```

**Features:**
- Synchronous crawling
- No authentication required
- Max 25 pages
- 10 second timeout per page
- Checks robots.txt and sitemap.xml

#### 2. `/api/seo-audit/site-crawl/start` (Advanced Crawler)
**Method:** POST  
**Request Body:**
```json
{
  "url": "https://example.com",
  "maxPages": 20,
  "maxDepth": 2
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "processing"
}
```

**Features:**
- Asynchronous crawling (background job)
- Authentication required
- Quota enforcement (2 crawls/month for free users)
- Max 200 pages
- Max depth 5 levels
- 12 second timeout per page
- Comprehensive SEO audit on root page
- Lightweight audit on all other pages
- Stores results in database (Prisma)
- Associates crawls with user projects

---

## 🔍 Crawling Mechanism

### How It Works

#### 1. Simple Crawler Flow
```
1. Validate & normalize URL
2. Check robots.txt (HEAD request)
3. Check sitemap.xml (HEAD request)
4. Initialize queue with start URL
5. While queue not empty AND pages < limit:
   - Fetch page (10s timeout)
   - Parse HTML with Cheerio
   - Extract SEO data
   - Find internal links
   - Add links to queue
6. Calculate statistics
7. Return results
```

#### 2. Advanced Crawler Flow
```
1. Authenticate user
2. Check quota limits
3. Create crawl job in memory (crawl-store)
4. Create database record (Prisma)
5. Start async background job:
   - Crawl pages breadth-first
   - Track depth levels
   - Perform lightweight audit on each page
   - Perform comprehensive audit on root page
   - Extract and queue internal links
   - Respect maxPages and maxDepth
6. Update job progress in real-time
7. Mark job as completed
8. Finalize database record
9. Increment usage quota
```

### Crawl Store (In-Memory)
Located in: `lib/server/crawl-store.ts`

**Purpose:** Track real-time progress of async crawls

**Data Structure:**
```typescript
interface CrawlJobRecord {
  id: string
  rootUrl: string
  status: 'processing' | 'completed' | 'failed'
  startedAt: number
  updatedAt: number
  pages: CrawlPageResult[]
  maxPages: number
  maxDepth: number
  processed: number
  queued: number
  progress: number // 0-100
  cancelled?: boolean
}
```

---

## 📈 SEO Metrics Analyzed

### Per-Page Analysis

**Content Metrics:**
- Title tag presence & content
- Meta description presence & content
- H1 presence & count
- H2 count
- Word count
- Text content analysis

**Image Metrics:**
- Total images count
- Images missing alt text
- Image optimization opportunities

**Link Metrics:**
- Internal links count
- External links count
- Broken links detection

**Performance Metrics:**
- Page load time (milliseconds)
- HTTP status codes
- Fetch errors

**Indexability:**
- Robots.txt compliance
- Canonical tags
- Sitemap presence

### Comprehensive Root Page Audit
Additional metrics for the first page:
- Overall SEO score
- Social meta tags (Open Graph, Twitter)
- Accessibility checks
- Schema markup
- Performance metrics
- Core Web Vitals
- Security headers

---

## 💾 Data Storage

### Database Schema (Prisma)

**Crawl Table:**
- `id` - UUID
- `projectId` - Foreign key to Project
- `startUrl` - Starting URL
- `status` - QUEUED | COMPLETED | FAILED
- `pages` - Number of pages crawled
- `errors` - Error count
- `settings` - JSON (maxPages, maxDepth)
- `results` - JSON (full crawl results)
- `completedAt` - Timestamp

**Associations:**
- Each crawl belongs to a Project
- Projects are owned by Users
- Auto-creates projects based on domain

---

## 🚀 Performance Characteristics

### Timeouts
- **Simple Crawler:** 10 seconds per page
- **Advanced Crawler:** 12 seconds per page
- **Overall API timeout:** 30 seconds (client-side)

### Speed
- **Average:** 50-100 pages per minute
- **Marketing claim:** < 5 minutes average crawl time
- **Background processing:** Non-blocking for async crawler

### User Agent
- Simple: `SEO-Audit-Crawler/2.0`
- Advanced: `Mozilla/5.0 (compatible; SEO-Audit-Crawler/1.0)`

---

## 🎨 Frontend Implementation

### Main Component
Located in: `app/features/site-crawler/site-crawler-content.tsx` (918 lines)

**Key Features:**
- Dynamic import (SSR disabled)
- Loading states with progress bar
- Progressive messages during crawl
- Auto-scroll to results
- CSV export functionality
- Detailed results table
- Issue summary cards
- Animations with Framer Motion

### Supporting Components
1. **CrawlCapabilities** - Feature showcase
2. **IssueDetection** - Issue types display
3. **SiteArchitecture** - Architecture visualization
4. **MonitoringFeatures** - Monitoring capabilities
5. **IntegrationOptions** - Integration possibilities

### User Experience
1. Enter URL
2. Select page limit (5, 10, or 15)
3. Click "Start Crawling"
4. View progress (0-100%)
5. See progressive status messages
6. View results:
   - Quick stats
   - Issues summary
   - Detailed page table
   - Export to CSV option

---

## 📋 Issue Detection

### Types Detected (50+ total)

**Content Issues:**
- Missing title tags
- Missing H1 tags
- Missing meta descriptions
- Duplicate content
- Thin content (low word count)

**Image Issues:**
- Missing alt text
- Oversized images
- Incorrect format recommendations

**Technical Issues:**
- Broken links
- Slow page load times
- HTTP errors (4xx, 5xx)
- Missing robots.txt
- Missing sitemap.xml

**SEO Issues:**
- Missing canonical tags
- Duplicate titles
- Missing schema markup
- Poor internal linking

---

## 🔐 Security & Rate Limiting

### Authentication
- Optional for simple crawler
- Required for advanced crawler
- Uses NextAuth.js session management

### Rate Limiting
- Free tier: 2 site crawls per month
- Enforced at API level
- Returns 402 Payment Required when exceeded

### Input Validation
- URL format validation
- Scheme validation (http/https)
- Origin checking for internal links
- Sanitized error messages

---

## 🎯 Marketing Claims vs Reality

| Claim | Reality |
|-------|---------|
| "10,000+ Pages Per Crawl" | ❌ Max 200 pages (advanced), 25 (simple) |
| "< 5min Average Crawl Time" | ✅ Realistic for small/medium sites |
| "50+ Issue Types" | ✅ Comprehensive detection |
| "99.9% Accuracy Rate" | ⚠️ Not verified/measured |
| "24/7 Monitoring" | ❌ On-demand only, no continuous monitoring |

**Note:** The marketing stats in `crawl-capabilities.tsx` show "10,000+ Pages Per Crawl" but this is not currently implemented.

---

## 🔧 Configuration Files

### Help Documentation
Located in: `app/help/features/site-crawler/page.tsx`

**Recommended Configurations:**
- **Small sites (< 100 pages):** No limit, crawl all pages
- **Medium sites (100-1000 pages):** Max 500 pages, depth 3
- **Large sites (> 1000 pages):** Max 1000 pages, depth 4
- **E-commerce sites:** Focus on product/category pages first

**Note:** These are documentation recommendations, not actual implementation limits.

---

## 🐛 Known Limitations

1. **Page Limit Discrepancy:** UI shows 15 max, but backend limits to 25 (simple) or 200 (advanced)
2. **Marketing vs Reality:** Claims of 10,000+ pages not implemented
3. **No Monitoring:** Despite "24/7 Monitoring" claim, only on-demand crawls
4. **No Resume:** Cancelled/failed crawls cannot be resumed
5. **Memory Store:** In-memory job tracking is lost on server restart
6. **Timeout Issues:** Long-running crawls may hit timeout limits

---

## 📁 File Structure

```
app/
├── api/
│   ├── crawl/
│   │   └── start/
│   │       └── route.ts              # Simple crawler API
│   └── seo-audit/
│       └── site-crawl/
│           └── start/
│               └── route.ts          # Advanced crawler API
├── features/
│   └── site-crawler/
│       ├── page.tsx                  # Route entry
│       ├── site-crawler-content.tsx  # Main UI component
│       └── page-simple.tsx           # Alternative entry
└── help/
    └── features/
        └── site-crawler/
            └── page.tsx              # Help documentation

components/
└── features/
    └── site-crawler/
        ├── crawl-capabilities.tsx    # Feature showcase
        ├── issue-detection.tsx       # Issue types
        ├── site-architecture.tsx     # Architecture viz
        ├── monitoring-features.tsx   # Monitoring display
        └── integration-options.tsx   # Integration info

lib/
├── server/
│   ├── crawl-store.ts               # In-memory job tracking
│   ├── quota.ts                     # Usage limits
│   └── light-page-audit.ts          # Lightweight SEO audit
└── comprehensive-audit.ts           # Full SEO audit
```

---

## 🚀 Recommendations for Improvement

### 1. Align Marketing with Reality
- Update marketing materials to reflect actual limits (200 pages max)
- OR implement the 10,000+ page crawling capability

### 2. Implement True Monitoring
- Add scheduled crawls
- Add webhook notifications
- Add continuous monitoring dashboard

### 3. Improve Scalability
- Move from in-memory to database job tracking
- Add job resumption capability
- Implement distributed crawling

### 4. Enhance Quotas
- Add paid tiers with higher limits
- Implement priority queue for paid users
- Add crawl scheduling

### 5. Better Error Handling
- Add retry logic for failed pages
- Better timeout handling
- Detailed error reporting

### 6. Performance Optimization
- Parallel page fetching
- Smart queue prioritization
- Caching of common checks (robots.txt, sitemap)

---

## 📞 Routes Summary

### Working Routes
1. `GET /features/site-crawler` - Main feature page
2. `POST /api/crawl/start` - Simple crawler (up to 25 pages)
3. `POST /api/seo-audit/site-crawl/start` - Advanced crawler (up to 200 pages)
4. `GET /help/features/site-crawler` - Help documentation

### Legacy/Redirect Routes
- `/api/legacy/crawl-start` - Redirects to `/api/crawl/start`

---

## 🎯 Current Capabilities Summary

✅ **Working Features:**
- URL crawling up to 200 pages
- Depth-based link following (max 5 levels)
- SEO issue detection (50+ types)
- robots.txt and sitemap.xml checking
- CSV export of results
- Quota enforcement (2 crawls/month free)
- Real-time progress tracking
- Comprehensive root page analysis
- Database persistence of results

❌ **Not Implemented:**
- 10,000+ page crawling
- 24/7 continuous monitoring
- Scheduled crawls
- Webhook notifications
- JavaScript rendering (uses static HTML only)
- Distributed crawling
- Advanced authentication/authorization beyond basic quotas

---

## 📊 Data Flow Diagram

```
User Input (URL + Limit)
    ↓
Frontend Validation
    ↓
API Request → /api/crawl/start
    ↓
Authentication Check (optional)
    ↓
Quota Enforcement (if authenticated)
    ↓
Create Crawl Job
    ↓
Initialize In-Memory Tracker
    ↓
Create DB Record (Prisma)
    ↓
Start Background Crawl:
  - Fetch pages (BFS)
  - Parse HTML (Cheerio)
  - Extract SEO data
  - Find links
  - Update progress
    ↓
Complete Crawl Job
    ↓
Update DB Record
    ↓
Increment Usage Quota
    ↓
Return Results to Frontend
    ↓
Display Results + Export Option
```

---

## 🏁 Conclusion

The Site Crawler feature is a **functional, well-structured tool** with:
- ✅ Solid backend implementation
- ✅ Good SEO analysis capabilities
- ✅ User-friendly interface
- ⚠️ Marketing claims that exceed implementation
- ⚠️ Limited scalability (200 pages max vs 10,000+ claimed)
- ⚠️ No true monitoring despite claims

**Primary Use Case:** Small to medium website SEO audits (up to 200 pages)  
**Best For:** Quick SEO scans, issue identification, and basic site structure analysis  
**Not Suitable For:** Large enterprise sites, continuous monitoring, JavaScript-heavy sites

---

*Document generated on October 14, 2025*
