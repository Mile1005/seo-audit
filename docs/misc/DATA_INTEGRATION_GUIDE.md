# 🔌 Data Integration Guide - How to Get Real SEO Data

## Current Situation

Your components are **working correctly** - they fetch from the database, but your database is **empty**. You need to populate it with real SEO data.

---

## 📊 Data Sources Needed

### 1. **Competitor Data** (KeywordCompetitor table)

- Top 10-20 ranking websites for each keyword
- Their positions
- Domain metrics (DA, backlinks)
- URLs and titles

### 2. **Position History** (KeywordPosition table)

- Your daily/weekly ranking position
- Changes over time
- SERP features present
- Location and device specific

### 3. **SERP Features** (stored in KeywordPosition.serpFeatures JSON)

- Featured snippets
- Local packs
- People Also Ask
- Image/video results
- Shopping results
- etc.

### 4. **Traffic Analytics** (calculated from KeywordPosition)

- Your position over time
- Search volume
- CTR calculations
- Conversion estimates

### 5. **Alerts** (RankingAlert table)

- Alert configurations
- Threshold settings
- Notification preferences

---

## 🚀 Integration Options

### **Option 1: Use SerpApi (Easiest)**

**What it provides:**

- Real-time Google search results
- All SERP features
- Competitor detection
- Position tracking

**Cost:** $50/month (5,000 searches)

**Implementation:**

1. **Sign up:** https://serpapi.com
2. **Get API key**
3. **Install package:**

```bash
npm install serpapi
```

4. **Create background job:**

```typescript
// scripts/track-rankings.ts
import { getJson } from "serpapi";
import prisma from "@/lib/prisma";

async function trackKeyword(keywordId: string) {
  const keyword = await prisma.keyword.findUnique({
    where: { id: keywordId },
  });

  // Fetch Google results
  const results = await getJson({
    engine: "google",
    q: keyword.keyword,
    location: keyword.country,
    gl: keyword.country.toLowerCase(),
    hl: "en",
    device: keyword.device,
    api_key: process.env.SERPAPI_KEY,
  });

  // Store position data
  const yourPosition = findYourPosition(results.organic_results, "yourdomain.com");

  await prisma.keywordPosition.create({
    data: {
      keywordId: keyword.id,
      position: yourPosition,
      serpFeatures: {
        "featured-snippet": !!results.answer_box,
        "local-pack": !!results.local_results,
        "people-also-ask": !!results.related_questions,
        "image-pack": !!results.inline_images,
        "video-results": !!results.inline_videos,
        // ... more features
      },
      checkedAt: new Date(),
    },
  });

  // Store competitors
  for (const result of results.organic_results.slice(0, 10)) {
    await prisma.keywordCompetitor.create({
      data: {
        keywordId: keyword.id,
        domain: extractDomain(result.link),
        url: result.link,
        position: result.position,
        title: result.title,
        checkedAt: new Date(),
      },
    });
  }
}

function findYourPosition(results: any[], yourDomain: string): number {
  const index = results.findIndex((r) => r.link.includes(yourDomain));
  return index === -1 ? 100 : index + 1;
}

function extractDomain(url: string): string {
  return new URL(url).hostname.replace("www.", "");
}
```

5. **Run daily via cron job:**

```typescript
// app/api/cron/track-rankings/route.ts
export async function GET() {
  const keywords = await prisma.keyword.findMany({
    where: { status: "ACTIVE" },
  });

  for (const keyword of keywords) {
    await trackKeyword(keyword.id);
  }

  return Response.json({ success: true });
}
```

---

### **Option 2: Use DataForSEO API**

**What it provides:**

- Historical ranking data
- Competitor analysis
- SERP features
- More affordable ($0.003 per search)

**Implementation:**

```typescript
// lib/dataforseo.ts
const username = process.env.DATAFORSEO_LOGIN;
const password = process.env.DATAFORSEO_PASSWORD;

export async function trackKeywordWithDataForSEO(keyword: string, location: string) {
  const response = await fetch("https://api.dataforseo.com/v3/serp/google/organic/live/advanced", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        keyword: keyword,
        location_name: location,
        language_name: "English",
        device: "desktop",
        os: "windows",
      },
    ]),
  });

  const data = await response.json();
  return data.tasks[0].result[0];
}
```

---

### **Option 3: Build Your Own Scraper (Advanced)**

**Pros:** Free, full control  
**Cons:** Can get blocked, maintenance required

```typescript
// lib/scraper.ts
import puppeteer from "puppeteer";

export async function scrapeGoogle(keyword: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set user agent to avoid detection
  await page.setUserAgent("Mozilla/5.0 ...");

  // Search Google
  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(keyword)}`);

  // Extract results
  const results = await page.$$eval(".g", (elements) =>
    elements.map((el, index) => ({
      position: index + 1,
      title: el.querySelector("h3")?.textContent,
      url: el.querySelector("a")?.href,
      snippet: el.querySelector(".VwiC3b")?.textContent,
    }))
  );

  // Detect SERP features
  const serpFeatures = {
    featuredSnippet: (await page.$(".kp-blk")) !== null,
    localPack: (await page.$(".rllt__details")) !== null,
    peopleAlsoAsk: (await page.$(".related-question-pair")) !== null,
    // ... more features
  };

  await browser.close();

  return { results, serpFeatures };
}
```

**Note:** Use proxies and rate limiting to avoid being blocked.

---

## 🎯 **Recommended Approach**

### **For Production:**

1. **Start with SerpApi** ($50/month is affordable)
2. **Track keywords daily** (background job)
3. **Store data in your database**
4. **Your components will automatically show real data**

### **For Demo/Testing:**

Use the seed script I'll create below to populate with sample data

---

## 📝 **Database Population Flow**

```
1. User adds keyword → Keyword table
2. Cron job runs daily → Calls SerpApi
3. SerpApi returns results → Parse data
4. Store in database:
   - KeywordPosition (your rank)
   - KeywordCompetitor (top 10)
   - Update Keyword.trend
5. Your components fetch → Show real data!
```

---

## 💰 **Cost Breakdown**

### **SerpApi**

- 5,000 searches/month: $50
- If you track 100 keywords daily: 3,000 searches/month
- Affordable for most businesses

### **DataForSEO**

- $0.003 per search
- 100 keywords daily = $9/month
- More economical for scale

### **DIY Scraper**

- Free (but risky)
- Need proxies (~$20-50/month)
- Maintenance time

---

## 🔧 **Setup Steps**

### **Step 1: Choose Provider**

Sign up for SerpApi or DataForSEO

### **Step 2: Add API Key**

```env
# .env.local
SERPAPI_KEY=your_api_key_here
# OR
DATAFORSEO_LOGIN=your_login
DATAFORSEO_PASSWORD=your_password
```

### **Step 3: Create Background Job**

I'll create this for you

### **Step 4: Run Manually First**

```bash
npm run track-rankings
```

### **Step 5: Setup Cron**

Use Vercel Cron or external service

---

## 🎨 **Alternative: Seed Script for Demo**

For testing/demo purposes, I can create a script that:

- Generates realistic competitor data
- Creates position history
- Populates SERP features
- Makes your dashboard look alive

**This is NOT real data** but perfect for:

- Demos to clients
- Testing the UI
- Development
- Screenshots

Would you like me to create this seed script?

---

## ❓ **What Should You Do?**

### **Option A: Real Production Data**

1. Choose SerpApi or DataForSEO
2. I'll create the integration code
3. Run daily to populate database
4. Get real SEO data

### **Option B: Demo/Test Data**

1. I'll create a seed script
2. Run once to populate database
3. See components with realistic data
4. Perfect for demos

**Which would you prefer?**
