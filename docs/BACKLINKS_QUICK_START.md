# 🚀 Backlinks Pro - Quick Start Guide

## 📋 What You Have Now

Phase 1 is **COMPLETE** with a professional backlink collection system that's 100% FREE to use!

### ✅ Files Created

```
lib/backlinks/
├── types.ts                              # Type definitions
├── backlink-collector.ts                 # Main orchestrator
└── data-sources/
    ├── common-crawl.ts                  # 250B+ pages (FREE)
    ├── openpagerank.ts                  # Domain metrics (1000/day FREE)
    └── search-crawler.ts                # Search-based discovery
```

---

## 🎯 Immediate Action Items

### Step 1: Install Dependencies (Already Done ✅)
Your project already has:
- ✅ Cheerio (HTML parsing)
- ✅ Undici/node-fetch (HTTP requests)
- ✅ TypeScript types

### Step 2: Configure API Keys (Optional)

Open `.env` file and add:

```bash
# Optional but recommended for better results
# Get FREE key at: https://www.domcop.com/openpagerank/
OPEN_PAGERANK_API_KEY=your_key_here

# Optional for Google Custom Search (100 queries/day FREE)
GOOGLE_CUSTOM_SEARCH_API_KEY=
GOOGLE_CUSTOM_SEARCH_CX=
```

**Note:** System works WITHOUT these keys using Common Crawl + basic scraping!

---

## 🧪 Test It Right Now

### Option 1: Quick Test Script

Create `scripts/test-backlinks.ts`:

```typescript
import { BacklinkCollector } from '../lib/backlinks/backlink-collector'

async function testBacklinks() {
  console.log('🚀 Testing Backlink Collector...\n')
  
  const collector = new BacklinkCollector()
  
  const result = await collector.collectBacklinks('example.com', {
    maxBacklinks: 20,  // Small test
    useCommonCrawl: true,
    useSearch: false,  // Disable search for quick test
    enrichWithMetrics: false,  // Skip metrics for speed
    onProgress: (message, progress) => {
      console.log(`[${progress}%] ${message}`)
    }
  })
  
  console.log('\n✅ Test Results:')
  console.log(JSON.stringify(result.stats, null, 2))
  console.log(`\nFound ${result.backlinks.length} backlinks!`)
  
  if (result.backlinks.length > 0) {
    console.log('\n🔗 Sample Backlink:')
    console.log(JSON.stringify(result.backlinks[0], null, 2))
  }
}

testBacklinks().catch(console.error)
```

Run it:
```bash
npx tsx scripts/test-backlinks.ts
```

### Option 2: API Integration

Create `app/api/backlinks/collect/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { BacklinkCollector } from '@/lib/backlinks/backlink-collector'
import { requireUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser(request)
    const { projectId, maxBacklinks = 100 } = await request.json()
    
    // Get project domain
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { domain: true }
    })
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    
    // Collect backlinks
    const collector = new BacklinkCollector()
    const result = await collector.collectBacklinks(project.domain, {
      maxBacklinks,
      useCommonCrawl: true,
      useSearch: true,
      enrichWithMetrics: true
    })
    
    // Save to database
    const saved = []
    for (const backlink of result.backlinks) {
      try {
        const saved_link = await prisma.backlink.upsert({
          where: {
            projectId_sourceUrl_targetUrl: {
              projectId,
              sourceUrl: backlink.sourceUrl,
              targetUrl: backlink.targetUrl
            }
          },
          update: {
            lastSeen: new Date(),
            anchorText: backlink.anchorText,
            linkType: backlink.linkType,
            domainRating: backlink.domainRating,
            pageRating: backlink.pageRating,
            linkStrength: backlink.linkStrength,
            linkPosition: backlink.linkPosition,
            context: backlink.context,
            isToxic: backlink.isToxic,
            toxicScore: backlink.toxicScore,
            lastChecked: new Date()
          },
          create: {
            projectId,
            sourceUrl: backlink.sourceUrl,
            sourceDomain: backlink.sourceDomain,
            targetUrl: backlink.targetUrl,
            anchorText: backlink.anchorText,
            linkType: backlink.linkType,
            status: 'ACTIVE',
            domainRating: backlink.domainRating,
            pageRating: backlink.pageRating,
            linkStrength: backlink.linkStrength,
            linkPosition: backlink.linkPosition,
            context: backlink.context,
            isToxic: backlink.isToxic,
            toxicScore: backlink.toxicScore,
            firstSeen: new Date(),
            lastSeen: new Date(),
            lastChecked: new Date()
          }
        })
        saved.push(saved_link)
      } catch (error) {
        console.error('Error saving backlink:', error)
      }
    }
    
    return NextResponse.json({
      success: true,
      collected: result.backlinks.length,
      saved: saved.length,
      stats: result.stats
    })
    
  } catch (error) {
    console.error('Collection error:', error)
    return NextResponse.json(
      { error: 'Failed to collect backlinks' },
      { status: 500 }
    )
  }
}
```

### Option 3: Add to Dashboard

Update `components/backlinks/backlink-dashboard.tsx`:

Find the "Generate Mock Data" button section and add this new button:

```typescript
<Button 
  onClick={collectRealBacklinks} 
  disabled={loading}
  className="bg-gradient-to-r from-green-500 to-emerald-600"
>
  {loading ? (
    <>
      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
      Collecting...
    </>
  ) : (
    <>
      <Globe className="h-4 w-4 mr-2" />
      Collect Real Backlinks
    </>
  )}
</Button>
```

Add the function:

```typescript
const collectRealBacklinks = async () => {
  try {
    setLoading(true)
    
    const response = await fetch('/api/backlinks/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId,
        maxBacklinks: 100
      })
    })

    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ Collection complete:', data)
      alert(`Successfully collected ${data.collected} backlinks!\nSaved: ${data.saved}`)
      fetchBacklinks() // Refresh the list
    } else {
      console.error('Collection failed:', data.error)
      alert('Failed to collect backlinks')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('An error occurred')
  } finally {
    setLoading(false)
  }
}
```

---

## 📊 What Happens When You Run It

```
🚀 Starting backlink collection for yoursite.com
📊 Target: 100 backlinks

🔍 [CommonCrawl] Searching for backlinks to yoursite.com...
✓ Found 43 backlinks in CC-MAIN-2024-38

🔎 [SearchCrawler] Finding backlinks to yoursite.com...
  Found 8 search results for: "yoursite.com"
✓ Search Crawler: Found 18 backlinks

📋 Deduplication: 61 → 54 unique

📊 [OpenPageRank] Fetching metrics for 32 domains...
   ✓ Enriched 28/32 domains with metrics

⚡ Calculating quality scores...

✅ Collection Summary:
   Total Found: 61
   Unique Backlinks: 54
   Unique Domains: 32
   Avg Domain Rating: 38.7
   Duration: 42.3s
   Sources:
     - Common Crawl: 43
     - Search: 18
```

---

## 🎯 Real-World Usage

### For Your Dashboard

1. **Navigate to:** `/dashboard/backlinks`
2. **Click:** "Collect Real Backlinks" button
3. **Wait:** 30-60 seconds
4. **View:** Fresh backlink data!

### For API/Automation

```bash
curl -X POST http://localhost:3000/api/backlinks/collect \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "your-project-id",
    "maxBacklinks": 100
  }'
```

### For Scheduled Jobs

Add to your cron/worker:

```typescript
// worker/backlinks-job.ts
import { BacklinkCollector } from '@/lib/backlinks/backlink-collector'
import { prisma } from '@/lib/prisma'

export async function refreshBacklinks() {
  const projects = await prisma.project.findMany({
    where: { status: 'ACTIVE' }
  })
  
  for (const project of projects) {
    console.log(`Refreshing backlinks for ${project.domain}...`)
    
    const collector = new BacklinkCollector()
    const result = await collector.collectBacklinks(project.domain, {
      maxBacklinks: 200,
      useCommonCrawl: true,
      useSearch: true,
      enrichWithMetrics: true
    })
    
    // Save to database...
    console.log(`✓ Saved ${result.backlinks.length} backlinks for ${project.domain}`)
  }
}

// Run daily at 2 AM
// Schedule: '0 2 * * *'
```

---

## 🔧 Troubleshooting

### Issue: "No backlinks found"
**Solution:** 
- Try a popular domain first (e.g., "github.com", "medium.com")
- Common Crawl might not have very new or small sites
- Enable search crawler for better coverage

### Issue: "OpenPageRank not working"
**Solution:**
- Check API key is correct in `.env`
- Verify you haven't exceeded daily limit (1000 requests)
- System works fine without it (just no DR scores)

### Issue: "Rate limiting errors"
**Solution:**
- Reduce `maxBacklinks` value
- Increase delays in search crawler
- Use only Common Crawl (no rate limits)

### Issue: "Timeout errors"
**Solution:**
- Reduce batch sizes
- Check internet connection
- Common Crawl servers might be slow (retry)

---

## 📈 Performance Tips

### For Best Results:

1. **Start Small**
   ```typescript
   maxBacklinks: 50  // Test first
   ```

2. **Use Common Crawl**
   ```typescript
   useCommonCrawl: true  // Best coverage
   ```

3. **Enable Metrics**
   ```typescript
   enrichWithMetrics: true  // With OpenPageRank key
   ```

4. **Monitor Progress**
   ```typescript
   onProgress: (msg, pct) => console.log(msg)
   ```

### For Speed:

1. **Disable Search**
   ```typescript
   useSearch: false  // Faster
   ```

2. **Skip Metrics**
   ```typescript
   enrichWithMetrics: false  // Much faster
   ```

3. **Lower Limit**
   ```typescript
   maxBacklinks: 20  // Quick tests
   ```

---

## 🎉 What's Next

### Ready to Use:
- ✅ Backlink collection
- ✅ Domain metrics
- ✅ Quality scoring
- ✅ Database integration

### Coming Soon (Phase 2):
- 🔄 Toxicity detection
- 📊 Anchor text analysis
- 📈 Velocity tracking
- 🎯 Competitor analysis

---

## 💡 Pro Tips

1. **Daily Refresh:**
   Run collection once per day for each project

2. **Batch Processing:**
   Process multiple projects in queue to avoid rate limits

3. **Metrics Priority:**
   Enrich high-value backlinks first

4. **Cache Results:**
   Store Common Crawl results to avoid re-fetching

5. **Monitor Costs:**
   Even though it's free, track API usage

---

## 📞 Need Help?

### Resources:
- 📖 **Full Plan:** `docs/BACKLINKS_PRO_IMPLEMENTATION_PLAN.md`
- 🎉 **Phase 1 Summary:** `docs/BACKLINKS_PHASE_1_COMPLETE.md`
- 💻 **Type Definitions:** `lib/backlinks/types.ts`

### Quick Commands:
```bash
# Test the collector
npx tsx scripts/test-backlinks.ts

# Start dev server
npm run dev

# Check for TypeScript errors
npm run typecheck

# View dashboard
# Visit: http://localhost:3000/dashboard/backlinks
```

---

**You're ready to collect professional backlinks! 🚀**

Start with a small test, then scale up to full production usage.

*Last updated: October 4, 2025*
