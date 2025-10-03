# 🔗 Professional Backlinks Feature - Complete Implementation Plan

## 📊 Current State Analysis

### ✅ What You Already Have (EXCELLENT Foundation!)

1. **Complete Database Schema** ✅
   - `Backlink` model with all necessary fields
   - `ReferringDomain` model for domain-level tracking
   - `LinkProspect` model for outreach
   - `OutreachCampaign` model for link building
   - `DisavowFile` model for toxic link management

2. **Full API Infrastructure** ✅
   - `/api/backlinks` - Complete CRUD with advanced filtering
   - `/api/backlinks/domains` - Referring domain analysis
   - `/api/backlinks/prospects` - Link building prospects
   - `/api/backlinks/disavow` - Disavow file generation
   - `/api/backlinks/mock-data` - Demo data generation

3. **Professional Dashboard** ✅
   - Comprehensive backlink dashboard component
   - Advanced filtering (status, type, toxic, domain rating)
   - Charts and visualizations (Recharts integration)
   - Pagination and search
   - Responsive design

4. **Core Tools** ✅
   - Cheerio for HTML parsing
   - Playwright for advanced scraping
   - Existing `fetchHtml()` utility with retry logic
   - Auth system integrated
   - Prisma ORM with PostgreSQL

### ⚠️ What's Missing (To Be Implemented)

1. **Real Data Collection** - Currently using mock data only
2. **Advanced Analytics** - Toxicity algorithms, anchor analysis
3. **Competitor Analysis** - Gap analysis, common backlinks
4. **Link Building Tools** - Broken link finder, unlinked mentions
5. **Monitoring & Alerts** - Real-time tracking, notifications
6. **Export & Reporting** - PDF/Excel exports, scheduled reports

---

## 🎯 Implementation Phases (FREE Methods Only)

### **PHASE 1: Enhanced Data Collection Layer** 🚀

#### 1.1 Common Crawl Integration (FREE - Unlimited)
Common Crawl is a massive web archive with 250+ billion pages. Perfect for finding backlinks!

**Benefits:**
- ✅ Completely FREE
- ✅ Massive dataset (3.5+ petabytes)
- ✅ Updated monthly
- ✅ No API key required

**Implementation:**
```typescript
// lib/backlinks/data-sources/common-crawl.ts
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

export class CommonCrawlProvider {
  private readonly indexUrl = 'https://index.commoncrawl.org/CC-MAIN-2024-38-index'
  
  async findBacklinks(targetDomain: string, limit: number = 100): Promise<Backlink[]> {
    const backlinks: Backlink[] = []
    
    // Search for pages linking to target domain
    const searchUrl = `${this.indexUrl}?url=*.${targetDomain}&output=json&limit=${limit}`
    
    try {
      const response = await fetch(searchUrl)
      const lines = (await response.text()).split('\n')
      
      for (const line of lines) {
        if (!line.trim()) continue
        
        const record = JSON.parse(line)
        const warc = record.filename
        const offset = record.offset
        const length = record.length
        
        // Fetch WARC record to get actual HTML
        const html = await this.fetchWarcRecord(warc, offset, length)
        const links = this.extractBacklinks(html, targetDomain)
        backlinks.push(...links)
      }
      
      return backlinks
    } catch (error) {
      console.error('Common Crawl error:', error)
      return []
    }
  }
  
  private async fetchWarcRecord(warc: string, offset: number, length: number): Promise<string> {
    const url = `https://data.commoncrawl.org/${warc}`
    const headers = {
      'Range': `bytes=${offset}-${offset + length - 1}`
    }
    
    const response = await fetch(url, { headers })
    return await response.text()
  }
  
  private extractBacklinks(html: string, targetDomain: string): Backlink[] {
    const $ = cheerio.load(html)
    const backlinks: Backlink[] = []
    
    $('a[href]').each((_, element) => {
      const href = $(element).attr('href')
      if (href && href.includes(targetDomain)) {
        backlinks.push({
          id: this.generateId(),
          sourceUrl: this.getCurrentPageUrl(html),
          sourceDomain: new URL(this.getCurrentPageUrl(html)).hostname,
          targetUrl: href,
          anchorText: $(element).text().trim(),
          linkType: this.getLinkType($(element)),
          status: 'ACTIVE',
          firstSeen: new Date(),
          lastSeen: new Date(),
          // ... other fields
        })
      }
    })
    
    return backlinks
  }
  
  private getLinkType(element: any): 'FOLLOW' | 'NOFOLLOW' {
    const rel = element.attr('rel') || ''
    return rel.includes('nofollow') ? 'NOFOLLOW' : 'FOLLOW'
  }
  
  private generateId(): string {
    return `bl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  
  private getCurrentPageUrl(html: string): string {
    // Extract from HTML headers or return placeholder
    return 'https://example.com'
  }
}
```

#### 1.2 OpenPageRank API (FREE - 1000 requests/day)
For Domain Authority metrics

**Implementation:**
```typescript
// lib/backlinks/data-sources/openpagerank.ts
export class OpenPageRankProvider {
  private readonly apiKey = process.env.OPEN_PAGERANK_API_KEY || ''
  private readonly baseUrl = 'https://openpagerank.com/api/v1.0'
  
  async getDomainMetrics(domains: string[]): Promise<Map<string, DomainMetrics>> {
    const metrics = new Map<string, DomainMetrics>()
    
    // Batch domains (max 100 per request)
    const batches = this.chunk(domains, 100)
    
    for (const batch of batches) {
      try {
        const response = await fetch(
          `${this.baseUrl}/getPageRank?${batch.map(d => `domains[]=${d}`).join('&')}`,
          {
            headers: { 'API-OPR': this.apiKey }
          }
        )
        
        const data = await response.json()
        
        data.response.forEach((item: any) => {
          metrics.set(item.domain, {
            domainRating: Math.round(item.page_rank_decimal * 10), // Convert 0-10 to 0-100
            pageRating: Math.round(item.page_rank_decimal * 10),
            rank: item.rank,
            status: item.status_code
          })
        })
      } catch (error) {
        console.error('OpenPageRank error:', error)
      }
    }
    
    return metrics
  }
  
  private chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }
}
```

#### 1.3 Custom Web Crawler (FREE - Respectful)
For finding backlinks via Google/Bing search

**Implementation:**
```typescript
// lib/backlinks/data-sources/search-crawler.ts
import { fetchHtml } from '@/lib/scrape'
import * as cheerio from 'cheerio'

export class SearchCrawler {
  private readonly userAgent = 'Mozilla/5.0 (compatible; YourSEOBot/1.0; +https://yoursite.com/bot)'
  
  async findBacklinksViaSearch(targetDomain: string, maxResults: number = 50): Promise<Backlink[]> {
    const backlinks: Backlink[] = []
    
    // Multiple search strategies
    const queries = [
      `"${targetDomain}"`,
      `link:${targetDomain}`,
      `site:*.edu "${targetDomain}"`,
      `site:*.gov "${targetDomain}"`,
      `intext:"${targetDomain}"`,
    ]
    
    for (const query of queries) {
      const results = await this.searchGoogle(query, 10)
      
      for (const result of results) {
        try {
          const links = await this.extractBacklinks(result.url, targetDomain)
          backlinks.push(...links)
          
          if (backlinks.length >= maxResults) break
        } catch (error) {
          console.error(`Error crawling ${result.url}:`, error)
        }
      }
      
      if (backlinks.length >= maxResults) break
      
      // Respectful delay between queries
      await this.delay(2000)
    }
    
    return backlinks.slice(0, maxResults)
  }
  
  private async searchGoogle(query: string, numResults: number): Promise<SearchResult[]> {
    // Note: For production, use Google Custom Search API (free tier: 100 queries/day)
    // Or use a service like SerpAPI's free tier
    const encodedQuery = encodeURIComponent(query)
    const url = `https://www.google.com/search?q=${encodedQuery}&num=${numResults}`
    
    try {
      const html = await fetchHtml(url)
      return this.parseGoogleResults(html)
    } catch (error) {
      console.error('Google search error:', error)
      return []
    }
  }
  
  private parseGoogleResults(html: string): SearchResult[] {
    const $ = cheerio.load(html)
    const results: SearchResult[] = []
    
    // Google result selector (may need updates)
    $('div.g').each((_, element) => {
      const titleElement = $(element).find('h3').first()
      const linkElement = $(element).find('a').first()
      const url = linkElement.attr('href')
      
      if (url && url.startsWith('http')) {
        results.push({
          title: titleElement.text(),
          url: url,
          snippet: $(element).find('.VwiC3b').text()
        })
      }
    })
    
    return results
  }
  
  private async extractBacklinks(sourceUrl: string, targetDomain: string): Promise<Backlink[]> {
    const backlinks: Backlink[] = []
    
    try {
      const html = await fetchHtml(sourceUrl)
      const $ = cheerio.load(html)
      
      $('a[href]').each((_, element) => {
        const href = $(element).attr('href')
        
        if (href && (href.includes(targetDomain) || href.includes(`//${targetDomain}`))) {
          const anchorText = $(element).text().trim()
          const context = this.getContext($, element)
          const linkPosition = this.detectLinkPosition($, element)
          
          backlinks.push({
            id: this.generateId(),
            sourceUrl: sourceUrl,
            sourceDomain: new URL(sourceUrl).hostname,
            targetUrl: this.normalizeUrl(href, sourceUrl),
            anchorText: anchorText,
            linkType: this.getLinkType($(element)),
            status: 'ACTIVE',
            context: context,
            linkPosition: linkPosition,
            firstSeen: new Date(),
            lastSeen: new Date(),
            // ... other fields
          })
        }
      })
    } catch (error) {
      console.error(`Error extracting backlinks from ${sourceUrl}:`, error)
    }
    
    return backlinks
  }
  
  private getContext($: any, element: any): string {
    const parent = $(element).parent()
    const text = parent.text()
    
    // Get 200 chars around the link
    const linkText = $(element).text()
    const index = text.indexOf(linkText)
    
    if (index === -1) return text.slice(0, 200)
    
    const start = Math.max(0, index - 100)
    const end = Math.min(text.length, index + linkText.length + 100)
    
    return text.slice(start, end)
  }
  
  private detectLinkPosition($: any, element: any): string {
    const parents = $(element).parents()
    
    if (parents.is('footer')) return 'footer'
    if (parents.is('nav, header')) return 'nav'
    if (parents.is('aside, .sidebar')) return 'sidebar'
    if (parents.is('article, main, .content, .post')) return 'content'
    if (parents.is('.comment, .comments')) return 'comment'
    
    return 'other'
  }
  
  private getLinkType(element: any): 'FOLLOW' | 'NOFOLLOW' {
    const rel = element.attr('rel') || ''
    return rel.includes('nofollow') ? 'NOFOLLOW' : 'FOLLOW'
  }
  
  private normalizeUrl(href: string, baseUrl: string): string {
    try {
      return new URL(href, baseUrl).toString()
    } catch {
      return href
    }
  }
  
  private generateId(): string {
    return `bl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

interface SearchResult {
  title: string
  url: string
  snippet: string
}
```

#### 1.4 Orchestrator (Combines All Sources)

```typescript
// lib/backlinks/backlink-collector.ts
import { CommonCrawlProvider } from './data-sources/common-crawl'
import { OpenPageRankProvider } from './data-sources/openpagerank'
import { SearchCrawler } from './data-sources/search-crawler'

export class BacklinkCollector {
  private commonCrawl: CommonCrawlProvider
  private pageRank: OpenPageRankProvider
  private searchCrawler: SearchCrawler
  
  constructor() {
    this.commonCrawl = new CommonCrawlProvider()
    this.pageRank = new OpenPageRankProvider()
    this.searchCrawler = new SearchCrawler()
  }
  
  async collectBacklinks(targetDomain: string): Promise<Backlink[]> {
    console.log(`🔍 Collecting backlinks for ${targetDomain}...`)
    
    // Collect from multiple sources in parallel
    const [commonCrawlLinks, searchLinks] = await Promise.allSettled([
      this.commonCrawl.findBacklinks(targetDomain, 50),
      this.searchCrawler.findBacklinksViaSearch(targetDomain, 50)
    ])
    
    // Combine results
    const allBacklinks: Backlink[] = []
    
    if (commonCrawlLinks.status === 'fulfilled') {
      allBacklinks.push(...commonCrawlLinks.value)
    }
    
    if (searchLinks.status === 'fulfilled') {
      allBacklinks.push(...searchLinks.value)
    }
    
    // Deduplicate by source URL + target URL
    const uniqueBacklinks = this.deduplicateBacklinks(allBacklinks)
    
    // Enrich with domain metrics
    await this.enrichWithMetrics(uniqueBacklinks)
    
    console.log(`✅ Found ${uniqueBacklinks.length} unique backlinks`)
    
    return uniqueBacklinks
  }
  
  private deduplicateBacklinks(backlinks: Backlink[]): Backlink[] {
    const seen = new Set<string>()
    const unique: Backlink[] = []
    
    for (const link of backlinks) {
      const key = `${link.sourceUrl}|${link.targetUrl}`
      if (!seen.has(key)) {
        seen.add(key)
        unique.push(link)
      }
    }
    
    return unique
  }
  
  private async enrichWithMetrics(backlinks: Backlink[]): Promise<void> {
    // Get unique domains
    const domains = [...new Set(backlinks.map(b => b.sourceDomain))]
    
    // Fetch metrics in batches
    const metrics = await this.pageRank.getDomainMetrics(domains)
    
    // Apply metrics to backlinks
    for (const backlink of backlinks) {
      const metric = metrics.get(backlink.sourceDomain)
      if (metric) {
        backlink.domainRating = metric.domainRating
        backlink.pageRating = metric.pageRating
      }
    }
  }
}
```

---

### **PHASE 2: Advanced Analytics Engine** 📊

#### 2.1 Toxicity Detection Algorithm

```typescript
// lib/backlinks/analysis/toxicity-analyzer.ts
export class ToxicityAnalyzer {
  
  calculateToxicityScore(backlink: Backlink, domain: ReferringDomain): number {
    let score = 0
    
    // 1. Domain Quality Signals (40 points)
    if (domain.domainRating < 10) score += 15
    else if (domain.domainRating < 20) score += 10
    else if (domain.domainRating < 30) score += 5
    
    // 2. Spam Indicators in Domain (30 points)
    const spamKeywords = ['casino', 'viagra', 'porn', 'pills', 'loan', 'payday']
    for (const keyword of spamKeywords) {
      if (domain.domain.includes(keyword)) {
        score += 30
        break
      }
    }
    
    // 3. Suspicious TLDs (15 points)
    const suspiciousTlds = ['.xyz', '.top', '.loan', '.work', '.click', '.download']
    for (const tld of suspiciousTlds) {
      if (domain.domain.endsWith(tld)) {
        score += 15
        break
      }
    }
    
    // 4. Link Position (10 points)
    if (backlink.linkPosition === 'footer' || backlink.linkPosition === 'sidebar') {
      score += 10
    }
    
    // 5. Anchor Text Quality (5 points)
    const spamAnchors = ['click here', 'buy now', 'cheap', 'discount']
    for (const anchor of spamAnchors) {
      if (backlink.anchorText?.toLowerCase().includes(anchor)) {
        score += 5
        break
      }
    }
    
    return Math.min(score, 100)
  }
  
  classifyToxicLevel(score: number): 'safe' | 'warning' | 'toxic' | 'dangerous' {
    if (score < 20) return 'safe'
    if (score < 40) return 'warning'
    if (score < 70) return 'toxic'
    return 'dangerous'
  }
}
```

#### 2.2 Anchor Text Distribution Analysis

```typescript
// lib/backlinks/analysis/anchor-analyzer.ts
export class AnchorTextAnalyzer {
  
  analyzeDistribution(backlinks: Backlink[], targetDomain: string): AnchorAnalysis {
    const distribution = {
      branded: 0,
      exact: 0,
      partial: 0,
      generic: 0,
      naked: 0,
      image: 0,
      other: 0
    }
    
    const brandName = this.extractBrandName(targetDomain)
    const anchorCounts = new Map<string, number>()
    
    for (const link of backlinks) {
      const anchor = link.anchorText?.toLowerCase() || ''
      
      // Count occurrences
      anchorCounts.set(anchor, (anchorCounts.get(anchor) || 0) + 1)
      
      // Classify
      if (!anchor) {
        distribution.image++
      } else if (anchor.includes(brandName.toLowerCase())) {
        distribution.branded++
      } else if (anchor.match(/^https?:\/\//)) {
        distribution.naked++
      } else if (this.isGeneric(anchor)) {
        distribution.generic++
      } else {
        distribution.partial++
      }
    }
    
    const total = backlinks.length
    const percentages = Object.fromEntries(
      Object.entries(distribution).map(([key, val]) => [key, (val / total) * 100])
    )
    
    return {
      distribution,
      percentages,
      topAnchors: this.getTopAnchors(anchorCounts, 20),
      isNatural: this.isNaturalDistribution(percentages),
      recommendations: this.getRecommendations(percentages)
    }
  }
  
  private extractBrandName(domain: string): string {
    return domain.replace(/^www\./, '').split('.')[0]
  }
  
  private isGeneric(anchor: string): boolean {
    const genericPhrases = [
      'click here', 'read more', 'learn more', 'visit site',
      'website', 'homepage', 'check it out', 'see more'
    ]
    return genericPhrases.some(phrase => anchor.includes(phrase))
  }
  
  private getTopAnchors(counts: Map<string, number>, limit: number): Array<{ text: string; count: number }> {
    return Array.from(counts.entries())
      .map(([text, count]) => ({ text, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }
  
  private isNaturalDistribution(percentages: Record<string, number>): boolean {
    // Natural profile: 40-60% branded, <20% exact, rest mixed
    const { branded, exact } = percentages
    return branded >= 30 && branded <= 70 && exact <= 25
  }
  
  private getRecommendations(percentages: Record<string, number>): string[] {
    const recs: string[] = []
    
    if (percentages.exact > 30) {
      recs.push('⚠️ Too many exact match anchors - risk of over-optimization penalty')
    }
    
    if (percentages.branded < 20) {
      recs.push('📌 Increase branded anchor texts for natural link profile')
    }
    
    if (percentages.generic > 40) {
      recs.push('💡 Too many generic anchors - get more descriptive anchor text')
    }
    
    if (percentages.naked > 25) {
      recs.push('🔗 High percentage of naked URLs - optimize anchor text')
    }
    
    return recs
  }
}

interface AnchorAnalysis {
  distribution: Record<string, number>
  percentages: Record<string, number>
  topAnchors: Array<{ text: string; count: number }>
  isNatural: boolean
  recommendations: string[]
}
```

#### 2.3 Link Velocity Tracker

```typescript
// lib/backlinks/analysis/velocity-analyzer.ts
export class VelocityAnalyzer {
  
  analyzeVelocity(backlinks: Backlink[]): VelocityAnalysis {
    const now = new Date()
    const periods = {
      last7Days: 0,
      last30Days: 0,
      last90Days: 0,
      last365Days: 0
    }
    
    const lostLinks = {
      last7Days: 0,
      last30Days: 0,
      last90Days: 0
    }
    
    for (const link of backlinks) {
      const daysSinceFirst = this.daysBetween(new Date(link.firstSeen), now)
      const daysSinceLast = this.daysBetween(new Date(link.lastSeen), now)
      
      // New links
      if (daysSinceFirst <= 7) periods.last7Days++
      if (daysSinceFirst <= 30) periods.last30Days++
      if (daysSinceFirst <= 90) periods.last90Days++
      if (daysSinceFirst <= 365) periods.last365Days++
      
      // Lost links
      if (link.status === 'LOST') {
        if (daysSinceLast <= 7) lostLinks.last7Days++
        if (daysSinceLast <= 30) lostLinks.last30Days++
        if (daysSinceLast <= 90) lostLinks.last90Days++
      }
    }
    
    const weeklyAverage = periods.last30Days / 4
    const monthlyAverage = periods.last90Days / 3
    
    const trend = this.calculateTrend(periods)
    const isNatural = this.isNaturalGrowth(periods)
    
    return {
      newLinks: periods,
      lostLinks,
      averages: {
        weekly: weeklyAverage,
        monthly: monthlyAverage
      },
      trend,
      isNatural,
      warnings: this.getWarnings(periods, lostLinks, isNatural)
    }
  }
  
  private daysBetween(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
  
  private calculateTrend(periods: any): 'rapid_growth' | 'steady_growth' | 'stable' | 'declining' {
    const weeklyRate = periods.last7Days / 7
    const monthlyRate = periods.last30Days / 30
    
    if (weeklyRate > monthlyRate * 2) return 'rapid_growth'
    if (weeklyRate > monthlyRate * 1.2) return 'steady_growth'
    if (weeklyRate < monthlyRate * 0.5) return 'declining'
    return 'stable'
  }
  
  private isNaturalGrowth(periods: any): boolean {
    // Natural growth is gradual, not sudden spikes
    const ratio = periods.last7Days / (periods.last30Days / 4)
    return ratio > 0.5 && ratio < 2.5
  }
  
  private getWarnings(periods: any, lostLinks: any, isNatural: boolean): string[] {
    const warnings: string[] = []
    
    if (!isNatural && periods.last7Days > periods.last30Days / 2) {
      warnings.push('⚠️ Sudden spike in new backlinks - may trigger Google review')
    }
    
    if (lostLinks.last7Days > periods.last7Days) {
      warnings.push('🚨 Losing more links than gaining - investigate causes')
    }
    
    if (periods.last30Days === 0) {
      warnings.push('📉 No new backlinks in 30 days - consider outreach campaigns')
    }
    
    return warnings
  }
}

interface VelocityAnalysis {
  newLinks: {
    last7Days: number
    last30Days: number
    last90Days: number
    last365Days: number
  }
  lostLinks: {
    last7Days: number
    last30Days: number
    last90Days: number
  }
  averages: {
    weekly: number
    monthly: number
  }
  trend: 'rapid_growth' | 'steady_growth' | 'stable' | 'declining'
  isNatural: boolean
  warnings: string[]
}
```

---

### **PHASE 3: Competitor Analysis** 🎯

```typescript
// lib/backlinks/analysis/competitor-analyzer.ts
export class CompetitorAnalyzer {
  
  async compareBacklinks(
    yourBacklinks: Backlink[],
    competitorBacklinks: Backlink[]
  ): Promise<CompetitorComparison> {
    
    const yourDomains = new Set(yourBacklinks.map(b => b.sourceDomain))
    const compDomains = new Set(competitorBacklinks.map(b => b.sourceDomain))
    
    // Find gaps (they have, you don't)
    const gaps = competitorBacklinks.filter(b => !yourDomains.has(b.sourceDomain))
    
    // Find common backlinks
    const common = yourBacklinks.filter(b => compDomains.has(b.sourceDomain))
    
    // Find your unique backlinks
    const unique = yourBacklinks.filter(b => !compDomains.has(b.sourceDomain))
    
    // Prioritize gaps by quality
    const prioritizedGaps = this.prioritizeOpportunities(gaps)
    
    return {
      summary: {
        yourTotal: yourBacklinks.length,
        yourDomains: yourDomains.size,
        competitorTotal: competitorBacklinks.length,
        competitorDomains: compDomains.size,
        commonDomains: common.length,
        gapOpportunities: gaps.length
      },
      topGaps: prioritizedGaps.slice(0, 50),
      commonBacklinks: common.slice(0, 50),
      yourUniqueBacklinks: unique.slice(0, 50)
    }
  }
  
  private prioritizeOpportunities(gaps: Backlink[]): Backlink[] {
    return gaps.sort((a, b) => {
      // Score based on: domain rating, link type, position
      const scoreA = this.calculateOpportunityScore(a)
      const scoreB = this.calculateOpportunityScore(b)
      return scoreB - scoreA
    })
  }
  
  private calculateOpportunityScore(backlink: Backlink): number {
    let score = 0
    
    // Domain rating (0-100 points)
    score += backlink.domainRating || 0
    
    // Link type bonus
    if (backlink.linkType === 'FOLLOW') score += 20
    
    // Position bonus
    if (backlink.linkPosition === 'content') score += 30
    else if (backlink.linkPosition === 'nav') score += 10
    
    // Traffic bonus
    if (backlink.traffic && backlink.traffic > 10000) score += 20
    if (backlink.traffic && backlink.traffic > 100000) score += 30
    
    return score
  }
}

interface CompetitorComparison {
  summary: {
    yourTotal: number
    yourDomains: number
    competitorTotal: number
    competitorDomains: number
    commonDomains: number
    gapOpportunities: number
  }
  topGaps: Backlink[]
  commonBacklinks: Backlink[]
  yourUniqueBacklinks: Backlink[]
}
```

---

## 📅 Implementation Timeline

### Week 1-2: Data Collection
- ✅ Set up Common Crawl integration
- ✅ Set up OpenPageRank API
- ✅ Build search crawler
- ✅ Create orchestrator
- ✅ Test with real domains

### Week 3: Analytics Engine
- ✅ Implement toxicity detection
- ✅ Build anchor text analyzer
- ✅ Create velocity tracker
- ✅ Add domain quality scoring

### Week 4: Competitor Analysis
- ✅ Build comparison engine
- ✅ Create gap analysis
- ✅ Implement opportunity scoring

### Week 5: Link Building Tools
- ✅ Broken link finder
- ✅ Unlinked mention detector
- ✅ Email outreach templates

### Week 6: Dashboard Enhancement
- ✅ Add new charts and visualizations
- ✅ Implement real-time updates
- ✅ Create export functionality

---

## 🎨 Free Resources to Use

### Data Sources (100% Free)
1. ✅ **Common Crawl** - Unlimited, massive dataset
2. ✅ **OpenPageRank** - 1000 requests/day FREE
3. ✅ **Google Custom Search** - 100 queries/day FREE
4. ✅ **Robots.txt** - Check before crawling
5. ✅ **Archive.org Wayback Machine** - Historical data

### Metrics & Analysis
1. ✅ **Custom algorithms** - Toxicity, anchor analysis (no API needed)
2. ✅ **Domain parsing** - Built-in tools
3. ✅ **Link classification** - Rule-based system

### Tools You Already Have
1. ✅ Cheerio - HTML parsing
2. ✅ Playwright - Advanced scraping
3. ✅ Recharts - Beautiful charts
4. ✅ Prisma - Database ORM
5. ✅ Next.js API routes - Backend

---

## 🚀 Next Steps

1. **Review this plan** and approve phases
2. **I'll start implementing** Phase 1 - Data Collection
3. **Test with your domain** to ensure it works
4. **Iterate and enhance** based on results

This plan will give you a **professional backlinks feature** that rivals SEMrush, using **100% FREE** data sources and your existing infrastructure!

Ready to start implementation? 🎯
