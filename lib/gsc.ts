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
      expiresIn: tokens.expires_in
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

export async function fetchGscInsightsForUrl(url: string, state?: string): Promise<any> {
  try {
    // Get tokens from database
    const prisma = await getPrisma();
    const tokenRecord = await (prisma as any).gscToken.findFirst({
      where: state ? { state } : undefined,
      orderBy: { createdAt: 'desc' }
    });
    
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

    // Set credentials
    oauth2Client.setCredentials(tokenRecord.tokens as any);

    // Create Search Console API client
    const searchConsole = google.searchconsole({ version: 'v1', auth: oauth2Client });

    // Extract domain from URL
    const urlObj = new URL(url);
    const domain = urlObj.hostname;

    // Get the last 28 days of data
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 28);

    console.log(`Fetching GSC data for ${domain} from ${startDate.toISOString()} to ${endDate.toISOString()}`);

    // Fetch search analytics data
    const response = await searchConsole.searchanalytics.query({
      siteUrl: `sc-domain:${domain}`,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['query'],
        rowLimit: 10
      }
    });

    const rows = response.data.rows || [];
    
    // Calculate totals
    let totalClicks = 0;
    let totalImpressions = 0;
    const topQueries = rows.map((row: any) => {
      totalClicks += row.clicks || 0;
      totalImpressions += row.impressions || 0;
      
      return {
        query: row.keys[0] || '',
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position || 0
      };
    });

    const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

    return {
      available: true,
      top_queries: topQueries,
      ctr: avgCtr,
      impressions: totalImpressions,
      clicks: totalClicks,
      message: `Data for ${domain} (last 28 days)`,
    };

  } catch (error) {
    console.error("Error fetching GSC data:", error);
    
    // Return error information
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
export async function hasGscTokens(): Promise<boolean> {
  try {
    const prisma = await getPrisma();
    const tokenCount = await (prisma as any).gscToken.count();
    return tokenCount > 0;
  } catch (error) {
    console.error("Error checking GSC tokens:", error);
    return false;
  }
}
