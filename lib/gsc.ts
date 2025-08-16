import { google } from "googleapis";
import { getPrisma } from "./db";

// OAuth2 client setup with explicit redirect URI
const redirectUri =
  process.env.GSC_REDIRECT_URI || "https://seo-audit-seven.vercel.app/api/auth/gsc/callback";

const oauth2Client = new google.auth.OAuth2(
  process.env.GSC_CLIENT_ID,
  process.env.GSC_CLIENT_SECRET,
  redirectUri
);

export async function getGscAuthUrl(state: string): Promise<string> {
  const scopes = ["https://www.googleapis.com/auth/webmasters.readonly"];

  console.log("GSC Auth URL Generation:", {
    clientId: process.env.GSC_CLIENT_ID ? "Set" : "Missing",
    redirectUri: redirectUri,
    state: state,
  });

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: state,
    redirect_uri: redirectUri, // Explicitly set redirect URI
  });
}

export async function handleGscCallback(code: string, state: string): Promise<boolean> {
  try {
    console.log("GSC Callback: Getting tokens for state:", state);
    console.log("GSC Callback: Environment check:", {
      hasClientId: !!process.env.GSC_CLIENT_ID,
      hasClientSecret: !!process.env.GSC_CLIENT_SECRET,
      redirectUri: redirectUri
    });
    
    const { tokens } = await oauth2Client.getToken(code);
    console.log("GSC Callback: Tokens received:", {
      hasAccessToken: !!tokens.access_token,
      hasRefreshToken: !!tokens.refresh_token,
      tokenType: tokens.token_type
    });
    
    console.log("GSC Callback: Storing tokens in database for state:", state);
    
    // Store tokens in database
    const prisma = await getPrisma();
    await (prisma as any).gscToken.upsert({
      where: { state },
      update: { tokens },
      create: { state, tokens },
    });
    
    oauth2Client.setCredentials(tokens);
    console.log("GSC Callback: Success! Tokens stored in database for state:", state);
    return true;
  } catch (error) {
    console.error("Error getting GSC tokens:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return false;
  }
}

// In-memory cache for GSC results (simple, per-process)
const gscCache = new Map<string, { result: any; timestamp: number }>();
const GSC_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Monitoring for GSC API failures
let gscFailureCount = 0;
let gscFailureWindowStart = Date.now();
const GSC_FAILURE_WINDOW = 10 * 60 * 1000; // 10 minutes
const GSC_FAILURE_THRESHOLD = 5;

export async function fetchGscInsightsForUrl(url: string, state?: string): Promise<any> {
  // Check cache first
  const cacheKey = `${url}|${state || ''}`;
  const now = Date.now();
  const cached = gscCache.get(cacheKey);
  if (cached && now - cached.timestamp < GSC_CACHE_TTL) {
    return cached.result;
  }

  try {
    const prisma = await getPrisma();
    let tokenRecord = await (prisma as any).gscToken.findFirst({ where: state ? { state } : undefined, orderBy: { createdAt: 'desc' } });
    if (!tokenRecord) {
      tokenRecord = await (prisma as any).gscToken.findFirst({ orderBy: { createdAt: 'desc' } });
    }

    if (!tokenRecord) {
      return {
        available: false,
        top_queries: [],
        ctr: null,
        impressions: null,
        clicks: null,
        message: "GSC authentication required. Please authenticate first.",
      };
    }

    oauth2Client.setCredentials(tokenRecord.tokens as any);
    const searchConsole = google.searchconsole({ version: 'v1', auth: oauth2Client });

    const siteUrl = await resolveSiteUrlForDomain(searchConsole, url);
    if (!siteUrl) {
      const urlObj = new URL(url);
      return {
        available: false,
        top_queries: [],
        ctr: null,
        impressions: null,
        clicks: null,
        message: `This Google account has no Search Console property for ${urlObj.hostname}. Add the site in GSC to view metrics.`,
      };
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 28);

    console.log(`Fetching GSC data for ${siteUrl} from ${startDate.toISOString()} to ${endDate.toISOString()}`);

    const response = await searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['query'],
        rowLimit: 10
      }
    });

    const rows = response.data.rows || [];

    let totalClicks = 0;
    let totalImpressions = 0;
    const topQueries = rows.map((row: any) => {
      totalClicks += row.clicks || 0;
      totalImpressions += row.impressions || 0;
      return {
        query: row.keys?.[0] || '',
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position || 0
      };
    });

    const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) : 0;

    const result = {
      available: true,
      top_queries: topQueries,
      ctr: avgCtr,
      impressions: totalImpressions,
      clicks: totalClicks,
      message: `Data for ${siteUrl} (last 28 days)`,
    };

    // Store in cache
    gscCache.set(cacheKey, { result, timestamp: now });

    return result;

  } catch (error) {
    // Monitoring logic
    const now = Date.now();
    if (now - gscFailureWindowStart > GSC_FAILURE_WINDOW) {
      gscFailureWindowStart = now;
      gscFailureCount = 0;
    }
    gscFailureCount++;
    if (gscFailureCount >= GSC_FAILURE_THRESHOLD) {
      console.warn(`GSC API has failed ${gscFailureCount} times in the last 10 minutes. Check API quota or service health.`);
      // In production, send alert to monitoring system here
    }
    console.error("Error fetching GSC data:", error);
    return {
      available: false,
      top_queries: [],
      ctr: null,
      impressions: null,
      clicks: null,
      message: `GSC error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// Helper function to check if GSC is configured
export function isGscConfigured(): boolean {
  return !!(process.env.GSC_CLIENT_ID && process.env.GSC_CLIENT_SECRET);
}

// Helper function to check if we have any tokens stored
export async function hasGscTokens(state?: string): Promise<boolean> {
  try {
    const prisma = await getPrisma();
    if (state) {
      const tokenCountForState = await (prisma as any).gscToken.count({ where: { state } });
      return tokenCountForState > 0;
    }
    const tokenCount = await (prisma as any).gscToken.count();
    return tokenCount > 0;
  } catch (error) {
    console.error("Error checking GSC tokens:", error);
    return false;
  }
}

// Helper function to validate GSC tokens and check if they're working
export async function validateGscTokens(state?: string): Promise<{ isValid: boolean; hasProperties: boolean; message: string }> {
  try {
    const prisma = await getPrisma();
    let tokenRecord = await (prisma as any).gscToken.findFirst({ where: state ? { state } : undefined, orderBy: { createdAt: 'desc' } });

    // Fallback to latest token if no record for this state
    if (!tokenRecord) {
      tokenRecord = await (prisma as any).gscToken.findFirst({ orderBy: { createdAt: 'desc' } });
      if (!tokenRecord) {
        console.log("validateGscTokens: No token record found in database", { state });
        return { isValid: false, hasProperties: false, message: "No GSC tokens found" };
      }
    }

    console.log("validateGscTokens: Found token record, validating...", { state });

    const oauth2Client = new google.auth.OAuth2(
      process.env.GSC_CLIENT_ID,
      process.env.GSC_CLIENT_SECRET,
      process.env.GSC_REDIRECT_URI
    );

    oauth2Client.setCredentials(tokenRecord.tokens as any);

    const searchConsole = google.searchconsole({ version: 'v1', auth: oauth2Client });

    const sitesResponse = await searchConsole.sites.list();
    const siteCount = sitesResponse.data.siteEntry?.length || 0;
    console.log("validateGscTokens: API call successful, sites found:", siteCount);

    return { isValid: true, hasProperties: siteCount > 0, message: siteCount > 0 ? "GSC tokens are valid" : "Connected, but no properties found on this Google account" };
  } catch (error) {
    console.error("validateGscTokens: Error validating GSC tokens:", error);
    return {
      isValid: false,
      hasProperties: false,
      message: `Token validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Choose a siteUrl for a given page URL by inspecting available properties
async function resolveSiteUrlForDomain(searchConsole: any, pageUrl: string): Promise<string | null> {
  const urlObj = new URL(pageUrl);
  const hostname = urlObj.hostname.toLowerCase();
  const rootDomain = hostname.replace(/^www\./, "");

  const sitesResponse = await searchConsole.sites.list();
  const entries: Array<{ siteUrl?: string }> = (sitesResponse.data.siteEntry || []) as any;

  // Prefer domain property if present
  const domainProp = entries.find(e => (e.siteUrl || "").toLowerCase() === `sc-domain:${rootDomain}`);
  if (domainProp?.siteUrl) return domainProp.siteUrl;

  // Try exact hostname URL-prefix
  const urlPrefix = `https://${hostname}/`;
  const urlProp = entries.find(e => (e.siteUrl || "").toLowerCase() === urlPrefix);
  if (urlProp?.siteUrl) return urlProp.siteUrl;

  // Try http version
  const httpPrefix = `http://${hostname}/`;
  const httpProp = entries.find(e => (e.siteUrl || "").toLowerCase() === httpPrefix);
  if (httpProp?.siteUrl) return httpProp.siteUrl;

  return null;
}
