🚀 COMPLETE AI AGENT IMPLEMENTATION PROMPT
BACKLINKS FEATURE - COMPLETE IMPLEMENTATION GUIDE
PROJECT CONTEXT
Project: AISEOTurbo - SEO Audit SaaS Platform
Repository: Mile1005/seo-audit
Framework: Next.js 14+ with App Router, TypeScript, Prisma, PostgreSQL
Current Status: Beautiful UI exists, but no real backlink data collection
Goal: Implement 100% FREE backlink checker with real data

ENVIRONMENT VARIABLES (ALREADY CONFIGURED IN VERCEL ✅)
OPEN_PAGERANK_API_KEY=xxx                    # ✅ Configured
GOOGLE_SEARCH_API_KEY=xxx                    # ✅ Configured
GOOGLE_SEARCH_ENGINE_ID=xxx                  # ✅ Configured
SERPAPI_KEY=xxx                              # ✅ Configured
MAX_BACKLINK_CHECKS_PER_DAY=4               # ✅ Configured
BACKLINK_CACHE_DAYS=7                       # ✅ Configured
DOMAIN_METRICS_CACHE_DAYS=30                # ✅ Configured

Note: All API keys are already set in Vercel. You only need to implement the code.

SYSTEM ARCHITECTURE
User clicks "Collect Real Backlinks"
    ↓
1. Check rate limit (4 checks/day per project)
    ↓
2. Check cache (7 days)
    ↓
3. If no cache, discover backlinks:
   • Common Crawl (unlimited FREE)
   • Google Custom Search (100/day FREE)
   • SerpAPI (100/month FREE)
    ↓
4. Enrich with metrics:
   • OpenPageRank (1,000/day FREE) → Domain Rating
   • Cache domain metrics (30 days)
    ↓
5. Extract anchor text from pages
    ↓
6. Save to database (BacklinkCheck + Backlink models)
    ↓
7. Return results to beautiful UI

EXISTING FILES TO EXAMINE FIRST
Before writing any code, you MUST examine these files:

app/[locale]/dashboard/backlinks/page.tsx - Dashboard page

components/backlinks/backlink-dashboard.tsx - Main UI component (has button that calls API)

app/api/backlinks/route.ts - Existing API endpoint (GET for fetching saved backlinks)

prisma/schema.prisma - Database schema (check Backlink, ReferringDomain models)

lib/auth.ts or similar - Find authentication middleware/helpers

Any existing utility files in lib/ directory

Questions to answer before coding:

What is the exact structure of the Project model?

How is authentication handled? (where is requireUser or similar?)

What Backlink model fields already exist?

Does BacklinkCheck model exist? If not, we need to create it.

FILES TO CREATE
1. TypeScript Types
File: lib/backlinks/types.ts
export interface RawBacklink {
  sourceUrl: string;
  sourceDomain: string;
  targetUrl: string;
  timestamp?: string;
  title?: string;
  snippet?: string;
}

export interface EnrichedBacklink extends RawBacklink {
  anchorText: string;
  domainRating: number;      // 0-100 scale (from OpenPageRank, scaled)
  domainAuthority: number;   // 0-10 scale (raw from OpenPageRank)
  pageRank: number;
  linkType: 'FOLLOW' | 'NOFOLLOW';
  status: 'ACTIVE' | 'LOST' | 'BROKEN' | 'REDIRECT';
}

export interface DomainMetric {
  domain: string;
  domainRating: number;
  domainAuthority: number;
  pageRank: number;
  statusCode: number;
  lastUpdated: Date;
}

export interface BacklinkStats {
  totalBacklinks: number;
  uniqueDomains: number;
  avgDomainRating: number;
  checksUsed: number;
  checksRemaining: number;
}

export interface CollectionOptions {
  maxResults?: number;
  useCommonCrawl?: boolean;
  useGoogle?: boolean;
  useSerpApi?: boolean;
}

export interface CollectionResult {
  success: boolean;
  cached: boolean;
  cacheAge?: number;
  data: {
    backlinks: EnrichedBacklink[];
    stats: BacklinkStats;
  };
  error?: string;
}
FILES TO CREATE
1. TypeScript Types
File: lib/backlinks/types.ts
export interface RawBacklink {
  sourceUrl: string;
  sourceDomain: string;
  targetUrl: string;
  timestamp?: string;
  title?: string;
  snippet?: string;
}

export interface EnrichedBacklink extends RawBacklink {
  anchorText: string;
  domainRating: number;      // 0-100 scale (from OpenPageRank, scaled)
  domainAuthority: number;   // 0-10 scale (raw from OpenPageRank)
  pageRank: number;
  linkType: 'FOLLOW' | 'NOFOLLOW';
  status: 'ACTIVE' | 'LOST' | 'BROKEN' | 'REDIRECT';
}

export interface DomainMetric {
  domain: string;
  domainRating: number;
  domainAuthority: number;
  pageRank: number;
  statusCode: number;
  lastUpdated: Date;
}

export interface BacklinkStats {
  totalBacklinks: number;
  uniqueDomains: number;
  avgDomainRating: number;
  checksUsed: number;
  checksRemaining: number;
}

export interface CollectionOptions {
  maxResults?: number;
  useCommonCrawl?: boolean;
  useGoogle?: boolean;
  useSerpApi?: boolean;
}

export interface CollectionResult {
  success: boolean;
  cached: boolean;
  cacheAge?: number;
  data: {
    backlinks: EnrichedBacklink[];
    stats: BacklinkStats;
  };
  error?: string;
}
2. Utility Functions

File: lib/backlinks/utils.ts
/**
 * Extract domain from URL and remove www prefix
 */
export function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace(/^www\./, '');
  } catch {
    return '';
  }
}

/**
 * Chunk array into batches for API calls
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Scale OpenPageRank score (0-10) to Domain Rating scale (0-100)
 */
export function scaleToDomainRating(oprScore: number): number {
  return Math.round(Math.min(oprScore * 10, 100));
}

/**
 * Check if date is within specified days
 */
export function isWithinDays(date: Date, days: number): boolean {
  const diff = Date.now() - date.getTime();
  return diff < days * 24 * 60 * 60 * 1000;
}

/**
 * Deduplicate backlinks by sourceUrl
 */
export function deduplicateBacklinks<T extends { sourceUrl: string }>(backlinks: T[]): T[] {
  const seen = new Map<string, T>();
  
  for (const backlink of backlinks) {
    if (!seen.has(backlink.sourceUrl)) {
      seen.set(backlink.sourceUrl, backlink);
    }
  }
  
  return Array.from(seen.values());
}

/**
 * Sanitize URL for storage
 */
export function sanitizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.href;
  } catch {
    return '';
  }
}

/**
 * Calculate average domain rating
 */
export function calculateAvgDR(backlinks: Array<{ domainRating?: number }>): number {
  const ratings = backlinks
    .map(bl => bl.domainRating || 0)
    .filter(rating => rating > 0);
  
  if (ratings.length === 0) return 0;
  
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round(sum / ratings.length);
}
3. Backlink Discovery Service
File: lib/backlinks/discovery.ts
import { RawBacklink } from './types';
import { extractDomain, sanitizeUrl } from './utils';

/**
 * Search Common Crawl Index for backlinks
 * FREE & UNLIMITED - Use as primary source
 */
export async function searchCommonCrawl(
  domain: string,
  limit = 100
): Promise<RawBacklink[]> {
  try {
    console.log(`[Common Crawl] Searching for: ${domain}`);
    
    // Use latest Common Crawl index (update index name as needed)
    const cdxUrl = `https://index.commoncrawl.org/CC-MAIN-2024-38-index?url=${domain}&output=json&limit=${limit}`;
    
    const response = await fetch(cdxUrl, {
      headers: { 'User-Agent': 'AISEOTurbo/1.0' }
    });
    
    if (!response.ok) {
      console.error(`[Common Crawl] Error: ${response.status}`);
      return [];
    }
    
    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim());
    
    const backlinks: RawBacklink[] = [];
    
    for (const line of lines) {
      try {
        const data = JSON.parse(line);
        const sourceUrl = sanitizeUrl(data.url);
        
        if (!sourceUrl) continue;
        
        backlinks.push({
          sourceUrl,
          sourceDomain: extractDomain(sourceUrl),
          targetUrl: domain,
          timestamp: data.timestamp
        });
      } catch (error) {
        // Skip invalid JSON lines
        continue;
      }
    }
    
    console.log(`[Common Crawl] Found ${backlinks.length} backlinks`);
    return backlinks;
    
  } catch (error) {
    console.error('[Common Crawl] Error:', error);
    return [];
  }
}

/**
 * Search Google Custom Search API for backlinks
 * FREE: 100 searches/day
 */
export async function searchGoogleCustom(
  domain: string,
  maxResults = 10
): Promise<RawBacklink[]> {
  const API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
  const ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;
  
  if (!API_KEY || !ENGINE_ID) {
    console.log('[Google] API not configured, skipping');
    return [];
  }
  
  try {
    console.log(`[Google] Searching for: ${domain}`);
    
    // Search for pages linking to domain (exclude the domain itself)
    const query = `"${domain}" -site:${domain}`;
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${ENGINE_ID}&q=${encodeURIComponent(query)}&num=${maxResults}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      console.error('[Google] API Error:', data.error.message);
      return [];
    }
    
    const backlinks: RawBacklink[] = (data.items || []).map(item => ({
      sourceUrl: sanitizeUrl(item.link),
      sourceDomain: extractDomain(item.link),
      targetUrl: domain,
      title: item.title,
      snippet: item.snippet
    })).filter(bl => bl.sourceUrl);
    
    console.log(`[Google] Found ${backlinks.length} backlinks`);
    return backlinks;
    
  } catch (error) {
    console.error('[Google] Error:', error);
    return [];
  }
}

/**
 * Search SerpAPI for backlinks
 * FREE: 100 searches/month
 */
export async function searchSerpApi(
  domain: string,
  maxResults = 10
): Promise<RawBacklink[]> {
  const API_KEY = process.env.SERPAPI_KEY;
  
  if (!API_KEY) {
    console.log('[SerpAPI] API not configured, skipping');
    return [];
  }
  
  try {
    console.log(`[SerpAPI] Searching for: ${domain}`);
    
    const query = `"${domain}" -site:${domain}`;
    const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&api_key=${API_KEY}&num=${maxResults}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      console.error('[SerpAPI] Error:', data.error);
      return [];
    }
    
    const backlinks: RawBacklink[] = (data.organic_results || []).map(result => ({
      sourceUrl: sanitizeUrl(result.link),
      sourceDomain: extractDomain(result.link),
      targetUrl: domain,
      title: result.title,
      snippet: result.snippet
    })).filter(bl => bl.sourceUrl);
    
    console.log(`[SerpAPI] Found ${backlinks.length} backlinks`);
    return backlinks;
    
  } catch (error) {
    console.error('[SerpAPI] Error:', error);
    return [];
  }
}

/**
 * Main discovery function - combines all sources
 */
export async function discoverBacklinks(
  domain: string,
  options: { maxResults?: number } = {}
): Promise<RawBacklink[]> {
  const maxResults = options.maxResults || 100;
  const backlinks: RawBacklink[] = [];
  
  console.log(`[Discovery] Starting backlink discovery for: ${domain}`);
  
  // 1. Common Crawl (PRIMARY - Unlimited FREE)
  const ccLinks = await searchCommonCrawl(domain, maxResults);
  backlinks.push(...ccLinks);
  
  // 2. Google Custom Search (SECONDARY - Fresh links)
  if (backlinks.length < maxResults) {
    const googleLinks = await searchGoogleCustom(domain, 10);
    backlinks.push(...googleLinks);
  }
  
  // 3. SerpAPI (TERTIARY - Alternative source)
  if (backlinks.length < maxResults && process.env.SERPAPI_KEY) {
    const serpLinks = await searchSerpApi(domain, 10);
    backlinks.push(...serpLinks);
  }
  
  // Deduplicate by sourceUrl
  const uniqueBacklinks = Array.from(
    new Map(backlinks.map(bl => [bl.sourceUrl, bl])).values()
  );
  
  console.log(`[Discovery] Total unique backlinks found: ${uniqueBacklinks.length}`);
  
  return uniqueBacklinks.slice(0, maxResults);
}
4. Metrics Enrichment Service
File: lib/backlinks/enrichment.ts
import { RawBacklink, EnrichedBacklink, DomainMetric } from './types';
import { chunkArray, scaleToDomainRating } from './utils';
import { prisma } from '@/lib/prisma'; // Adjust import path as needed

/**
 * Get domain metrics from OpenPageRank API
 * FREE: 1,000 requests/day
 */
async function fetchOpenPageRankMetrics(domains: string[]): Promise<Map<string, DomainMetric>> {
  const API_KEY = process.env.OPEN_PAGERANK_API_KEY;
  
  if (!API_KEY) {
    console.error('[OpenPageRank] API key not configured');
    return new Map();
  }
  
  const metrics = new Map<string, DomainMetric>();
  
  try {
    console.log(`[OpenPageRank] Fetching metrics for ${domains.length} domains`);
    
    const response = await fetch('https://openpagerank.com/api/v1.0/getPageRank', {
      method: 'POST',
      headers: {
        'API-OPR': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ domains })
    });
    
    const data = await response.json();
    
    if (data.error) {
      console.error('[OpenPageRank] API Error:', data.error);
      return metrics;
    }
    
    for (const result of data.response || []) {
      const pageRank = result.page_rank_decimal || 0;
      
      metrics.set(result.domain, {
        domain: result.domain,
        domainRating: scaleToDomainRating(pageRank), // Scale to 0-100
        domainAuthority: pageRank, // Raw 0-10 score
        pageRank: pageRank,
        statusCode: result.status_code || 200,
        lastUpdated: new Date()
      });
    }
    
    console.log(`[OpenPageRank] Successfully fetched metrics for ${metrics.size} domains`);
    return metrics;
    
  } catch (error) {
    console.error('[OpenPageRank] Error:', error);
    return metrics;
  }
}

/**
 * Get cached domain metrics from database
 */
async function getCachedDomainMetrics(domains: string[]): Promise<Map<string, DomainMetric>> {
  const cacheDays = parseInt(process.env.DOMAIN_METRICS_CACHE_DAYS || '30');
  const cacheExpiry = new Date(Date.now() - cacheDays * 24 * 60 * 60 * 1000);
  
  try {
    const cached = await prisma.domainMetric.findMany({
      where: {
        domain: { in: domains },
        lastUpdated: { gte: cacheExpiry }
      }
    });
    
    const metricsMap = new Map<string, DomainMetric>();
    
    for (const metric of cached) {
      metricsMap.set(metric.domain, {
        domain: metric.domain,
        domainRating: metric.domainRating,
        domainAuthority: metric.domainAuthority,
        pageRank: metric.pageRank || 0,
        statusCode: 200,
        lastUpdated: metric.lastUpdated
      });
    }
    
    console.log(`[Cache] Found ${metricsMap.size} cached domain metrics`);
    return metricsMap;
    
  } catch (error) {
    console.error('[Cache] Error fetching cached metrics:', error);
    return new Map();
  }
}

/**
 * Save domain metrics to database cache
 */
async function saveDomainMetrics(metrics: DomainMetric[]): Promise<void> {
  try {
    for (const metric of metrics) {
      await prisma.domainMetric.upsert({
        where: { domain: metric.domain },
        update: {
          domainRating: metric.domainRating,
          domainAuthority: metric.domainAuthority,
          pageRank: metric.pageRank,
          lastUpdated: new Date()
        },
        create: {
          domain: metric.domain,
          domainRating: metric.domainRating,
          domainAuthority: metric.domainAuthority,
          pageRank: metric.pageRank,
          lastUpdated: new Date()
        }
      });
    }
    
    console.log(`[Cache] Saved ${metrics.length} domain metrics`);
  } catch (error) {
    console.error('[Cache] Error saving metrics:', error);
  }
}

/**
 * Enrich backlinks with domain metrics
 */
export async function enrichWithMetrics(backlinks: RawBacklink[]): Promise<EnrichedBacklink[]> {
  // Get unique domains
  const uniqueDomains = [...new Set(backlinks.map(bl => bl.sourceDomain))].filter(Boolean);
  
  console.log(`[Enrichment] Enriching ${uniqueDomains.length} unique domains`);
  
  // 1. Check cache first
  const cachedMetrics = await getCachedDomainMetrics(uniqueDomains);
  
  // 2. Find domains not in cache
  const uncachedDomains = uniqueDomains.filter(domain => !cachedMetrics.has(domain));
  
  console.log(`[Enrichment] ${cachedMetrics.size} cached, ${uncachedDomains.length} need fetching`);
  
  // 3. Fetch metrics for uncached domains (max 100 per request)
  const newMetrics = new Map<string, DomainMetric>();
  
  if (uncachedDomains.length > 0) {
    const batches = chunkArray(uncachedDomains, 100);
    
    for (const batch of batches) {
      const batchMetrics = await fetchOpenPageRankMetrics(batch);
      
      for (const [domain, metric] of batchMetrics) {
        newMetrics.set(domain, metric);
      }
      
      // Rate limiting: wait 1 second between batches
      if (batches.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Save new metrics to cache
    await saveDomainMetrics(Array.from(newMetrics.values()));
  }
  
  // 4. Combine cached and new metrics
  const allMetrics = new Map([...cachedMetrics, ...newMetrics]);
  
  // 5. Enrich backlinks
  const enriched: EnrichedBacklink[] = backlinks.map(bl => {
    const metric = allMetrics.get(bl.sourceDomain);
    
    return {
      ...bl,
      anchorText: bl.snippet || bl.title || 'Unknown',
      domainRating: metric?.domainRating || 0,
      domainAuthority: metric?.domainAuthority || 0,
      pageRank: metric?.pageRank || 0,
      linkType: 'FOLLOW' as const, // Default, can be detected from HTML
      status: 'ACTIVE' as const
    };
  });
  
  console.log(`[Enrichment] Successfully enriched ${enriched.length} backlinks`);
  
  return enriched;
}
5. Main Collection API Endpoint
File: app/api/backlinks/collect/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust import as needed
import { discoverBacklinks } from '@/lib/backlinks/discovery';
import { enrichWithMetrics } from '@/lib/backlinks/enrichment';
import { calculateAvgDR } from '@/lib/backlinks/utils';

// TODO: Import your auth helper
// import { requireUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('[API] Starting backlink collection...');
    
    // TODO: Add authentication
    // const user = await requireUser(request);
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    
    const body = await request.json();
    const { projectId } = body;
    
    if (!projectId) {
      return NextResponse.json(
        { error: 'projectId is required' },
        { status: 400 }
      );
    }
    
    // 1. Validate project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { domain: true }
    });
    
    if (!project || !project.domain) {
      return NextResponse.json(
        { error: 'Project not found or has no domain' },
        { status: 404 }
      );
    }
    
    const domain = project.domain;
    console.log(`[API] Collecting backlinks for domain: ${domain}`);
    
    // 2. Check rate limit (4 checks per day)
    const maxChecks = parseInt(process.env.MAX_BACKLINK_CHECKS_PER_DAY || '4');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checksToday = await prisma.backlinkCheck.count({
      where: {
        projectId,
        createdAt: { gte: today }
      }
    });
    
    if (checksToday >= maxChecks) {
      console.log(`[API] Rate limit reached: ${checksToday}/${maxChecks}`);
      return NextResponse.json(
        {
          error: 'Daily limit reached',
          message: `You can check backlinks ${maxChecks} times per day. Limit resets at midnight.`,
          checksUsed: checksToday,
          checksRemaining: 0
        },
        { status: 429 }
      );
    }
    
    // 3. Check for cached results (within 7 days)
    const cacheDays = parseInt(process.env.BACKLINK_CACHE_DAYS || '7');
    const cacheExpiry = new Date(Date.now() - cacheDays * 24 * 60 * 60 * 1000);
    
    const cachedCheck = await prisma.backlinkCheck.findFirst({
      where: {
        projectId,
        createdAt: { gte: cacheExpiry }
      },
      include: {
        backlinks: {
          orderBy: { domainRating: 'desc' },
          take: 100
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    if (cachedCheck) {
      const cacheAge = Date.now() - cachedCheck.createdAt.getTime();
      const cacheAgeDays = Math.floor(cacheAge / (1000 * 60 * 60 * 24));
      
      console.log(`[API] Returning cached data (${cacheAgeDays} days old)`);
      
      return NextResponse.json({
        success: true,
        cached: true,
        cacheAge: cacheAgeDays,
        data: {
          backlinks: cachedCheck.backlinks,
          stats: {
            totalBacklinks: cachedCheck.totalBacklinks,
            uniqueDomains: cachedCheck.uniqueDomains,
            avgDomainRating: cachedCheck.avgDomainRating,
            checksUsed: checksToday,
            checksRemaining: maxChecks - checksToday
          }
        }
      });
    }
    
    // 4. Discover new backlinks
    console.log('[API] No cache found, discovering new backlinks...');
    const rawBacklinks = await discoverBacklinks(domain, { maxResults: 100 });
    
    if (rawBacklinks.length === 0) {
      return NextResponse.json({
        success: true,
        cached: false,
        data: {
          backlinks: [],
          stats: {
            totalBacklinks: 0,
            uniqueDomains: 0,
            avgDomainRating: 0,
            checksUsed: checksToday + 1,
            checksRemaining: maxChecks - (checksToday + 1)
          }
        },
        message: 'No backlinks found for this domain'
      });
    }
    
    // 5. Enrich with metrics
    console.log('[API] Enriching backlinks with metrics...');
    const enrichedBacklinks = await enrichWithMetrics(rawBacklinks);
    
    // 6. Calculate stats
    const uniqueDomains = new Set(enrichedBacklinks.map(bl => bl.sourceDomain)).size;
    const avgDR = calculateAvgDR(enrichedBacklinks);
    
    // 7. Save to database
    console.log('[API] Saving to database...');
    
    const backlinkCheck = await prisma.backlinkCheck.create({
      data: {
        projectId,
        totalBacklinks: enrichedBacklinks.length,
        uniqueDomains,
        avgDomainRating: avgDR,
        backlinks: {
          create: enrichedBacklinks.map(bl => ({
            projectId,
            sourceUrl: bl.sourceUrl,
            sourceDomain: bl.sourceDomain,
            targetUrl: bl.targetUrl,
            anchorText: bl.anchorText,
            domainRating: bl.domainRating,
            domainAuthority: bl.domainAuthority,
            linkType: bl.linkType,
            status: bl.status,
            traffic: 0,
            isToxic: false,
            toxicScore: 0,
            linkStrength: bl.domainRating > 70 ? 'VERY_STRONG' :
                         bl.domainRating > 50 ? 'STRONG' :
                         bl.domainRating > 30 ? 'NORMAL' : 'WEAK',
            firstSeen: new Date(),
            lastSeen: new Date(),
            lastChecked: new Date()
          }))
        }
      },
      include: {
        backlinks: {
          orderBy: { domainRating: 'desc' }
        }
      }
    });
    
    console.log(`[API] Successfully saved ${backlinkCheck.backlinks.length} backlinks`);
    
    // 8. Return success response
    return NextResponse.json({
      success: true,
      cached: false,
      data: {
        backlinks: backlinkCheck.backlinks,
        stats: {
          totalBacklinks: backlinkCheck.totalBacklinks,
          uniqueDomains: backlinkCheck.uniqueDomains,
          avgDomainRating: backlinkCheck.avgDomainRating,
          checksUsed: checksToday + 1,
          checksRemaining: maxChecks - (checksToday + 1)
        }
      }
    });
    
  } catch (error) {
    console.error('[API] Collection error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to collect backlinks',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}


DATABASE SCHEMA UPDATES
File: prisma/schema.prisma

Check if these models exist. If not, add them:
model BacklinkCheck {
  id              String     @id @default(cuid())
  projectId       String
  project         Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
  totalBacklinks  Int
  uniqueDomains   Int
  avgDomainRating Float      @default(0)
  createdAt       DateTime   @default(now())
  backlinks       Backlink[]
  
  @@index([projectId, createdAt])
  @@map("backlink_checks")
}

model DomainMetric {
  id              String   @id @default(cuid())
  domain          String   @unique
  domainRating    Int      @default(0)
  domainAuthority Float    @default(0)
  pageRank        Float    @default(0)
  lastUpdated     DateTime @default(now())
  
  @@index([domain])
  @@index([lastUpdated])
  @@map("domain_metrics")
}
Update Backlink model to include these fields (if missing):
model Backlink {
  id              String     @id @default(cuid())
  projectId       String
  project         Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
  backlinkCheckId String?
  backlinkCheck   BacklinkCheck? @relation(fields: [backlinkCheckId], references: [id], onDelete: Cascade)
  
  sourceUrl       String
  sourceDomain    String
  targetUrl       String
  anchorText      String     @default("Unknown")
  
  linkType        String     @default("FOLLOW") // FOLLOW or NOFOLLOW
  status          String     @default("ACTIVE")  // ACTIVE, LOST, BROKEN, REDIRECT
  
  domainRating    Int        @default(0)
  domainAuthority Float      @default(0)
  pageRating      Int        @default(0)
  traffic         Int        @default(0)
  
  isToxic         Boolean    @default(false)
  toxicScore      Int        @default(0)
  linkStrength    String     @default("NORMAL") // WEAK, NORMAL, STRONG, VERY_STRONG
  
  firstSeen       DateTime   @default(now())
  lastSeen        DateTime   @default(now())
  lastChecked     DateTime   @default(now())
  
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt
  
  @@unique([projectId, sourceUrl, targetUrl])
  @@index([projectId])
  @@index([sourceDomain])
  @@index([domainRating])
  @@map("backlinks")
}
Also update Project model to include relation (if missing):
model Project {
  // ... existing fields
  backlinkChecks BacklinkCheck[]
  backlinks      Backlink[]
}
After updating schema, run:
npx prisma generate
npx prisma db push


UPDATE DASHBOARD COMPONENT
File: components/backlinks/backlink-dashboard.tsx

Find the collectRealBacklinks function and update it:

const collectRealBacklinks = async () => {
  try {
    setLoading(true);
    
    const response = await fetch("/api/backlinks/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId }),
    });

    const data = await response.json();

    if (response.ok) {
      const { cached, cacheAge, data: responseData } = data;
      
      if (cached) {
        alert(
          `Showing cached results from ${cacheAge} day(s) ago.\n` +
          `Found ${responseData.stats.totalBacklinks} backlinks from ${responseData.stats.uniqueDomains} domains.\n` +
          `Checks remaining today: ${responseData.stats.checksRemaining}/${process.env.NEXT_PUBLIC_MAX_CHECKS || 4}`
        );
      } else {
        alert(
          `Successfully collected ${responseData.stats.totalBacklinks} backlinks from ${responseData.stats.uniqueDomains} domains!\n` +
          `Average Domain Rating: ${responseData.stats.avgDomainRating}\n` +
          `Checks remaining today: ${responseData.stats.checksRemaining}/${process.env.NEXT_PUBLIC_MAX_CHECKS || 4}`
        );
      }
      
      fetchBacklinks();
    } else {
      const errorMessage = data.message || data.error || 'Failed to collect backlinks';
      alert(errorMessage);
      console.error("Failed to collect backlinks:", data);
    }
  } catch (error) {
    console.error("Error collecting backlinks:", error);
    alert("Error collecting backlinks. Check console for details.");
  } finally {
    setLoading(false);
  }
};
TESTING CHECKLIST
After implementation, test these scenarios:

1. First Check
 Click "Collect Real Backlinks" button

 Should take 15-30 seconds

 Should show loading state

 Should display success message with stats

 Should show backlinks in table

 Should show "3 checks remaining today"

2. Cached Check
 Click button again immediately

 Should return instantly (< 1 second)

 Should show "cached" message

 Should show cache age

 Should show same backlinks

3. Rate Limiting
 Perform 4 checks in one day

 5th check should fail with rate limit error

 Should show "0 checks remaining"

 Next day should reset to 4 checks

4. Data Quality
 Verify Domain Rating shows 0-100 range

 Verify anchor text is displayed

 Verify source domains are correct

 Verify no duplicate backlinks

5. Error Handling
 Test with invalid project ID → should show error

 Test with domain that has no backlinks → should handle gracefully

 Test with API keys missing → should show appropriate error


 DEBUGGING TIPS
Check API Logs
bash
# In Vercel dashboard or local terminal
# Look for console.log messages from API endpoint
[API] Starting backlink collection...
[Discovery] Starting backlink discovery...
[Common Crawl] Found X backlinks
[Google] Found Y backlinks
[Enrichment] Enriching Z domains
[Cache] Found N cached domain metrics
[OpenPageRank] Successfully fetched metrics...
[API] Successfully saved X backlinks
Common Issues
Issue: "OpenPageRank API key not configured"

Solution: Verify OPEN_PAGERANK_API_KEY is set in Vercel environment variables

Re-deploy after adding

Issue: "No backlinks found"

Solution: Try with popular domain first (github.com, medium.com)

Check if Common Crawl index is accessible

Update Common Crawl index name if outdated

Issue: "Rate limit reached" immediately

Solution: Check if BacklinkCheck records are being created correctly

Verify timezone handling in rate limit logic

Clear old test records from database

Issue: Database errors when saving

Solution: Run npx prisma generate and npx prisma db push

Check that all model fields exist in schema

Verify relations are set up correctly

PERFORMANCE OPTIMIZATION
Caching Strategy
Domain metrics cached for 30 days (reduces OpenPageRank calls by 80%+)

Backlink results cached for 7 days (instant response for repeat checks)

After first week, API usage drops to 20% of initial usage

API Usage Estimates
Week 1: ~800-1,000 OpenPageRank requests/day (within free tier)
Week 2+: ~200-300 requests/day (heavy caching)

Scaling Considerations
Can support 20-30 active clients with current free tiers

To scale beyond, consider paid APIs or increase cache duration

Monitor API usage in Vercel logs

SUCCESS CRITERIA
✅ Implementation is successful when:

User can click "Collect Real Backlinks" and see real data

Domain Rating (DR) displays correctly (0-100 scale)

Source domains and anchor text are visible

Rate limiting works (4 checks/day max)

Caching works (instant response for cached data)

No errors in Vercel logs

Database stores backlinks correctly

UI displays all data beautifully (already exists)

FINAL NOTES
What AI Agent Should Do:
✅ Examine all existing files first

✅ Create all new service files (types, utils, discovery, enrichment)

✅ Create collection API endpoint

✅ Update database schema if needed

✅ Update dashboard component

✅ Test locally if possible

✅ Provide summary of changes made

What AI Agent Should NOT Do:
❌ Change existing UI components (they're perfect)

❌ Modify authentication logic (use existing)

❌ Add Azure/Bing APIs (not available)

❌ Create unnecessary complexity

Environment Variables:
All required API keys are already configured in Vercel ✅

OPEN_PAGERANK_API_KEY

GOOGLE_SEARCH_API_KEY

GOOGLE_SEARCH_ENGINE_ID

SERPAPI_KEY

MAX_BACKLINK_CHECKS_PER_DAY=4

BACKLINK_CACHE_DAYS=7

DOMAIN_METRICS_CACHE_DAYS=30

START IMPLEMENTATION NOW!