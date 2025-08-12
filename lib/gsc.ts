import { google } from 'googleapis';

// OAuth2 client setup
const oauth2Client = new google.auth.OAuth2(
  process.env.GSC_CLIENT_ID,
  process.env.GSC_CLIENT_SECRET,
  process.env.GSC_REDIRECT_URI
);

// Google Search Console API
const searchConsole = google.searchconsole({ version: 'v1', auth: oauth2Client });

// Store tokens in memory (in production, use a database)
const tokenStore = new Map<string, any>();

export async function getGscAuthUrl(state: string): Promise<string> {
  const scopes = [
    'https://www.googleapis.com/auth/webmasters.readonly'
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: state
  });
}

export async function handleGscCallback(code: string, state: string): Promise<boolean> {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    tokenStore.set(state, tokens);
    oauth2Client.setCredentials(tokens);
    return true;
  } catch (error) {
    console.error('Error getting GSC tokens:', error);
    return false;
  }
}

export async function fetchGscInsightsForUrl(url: string, state?: string): Promise<any> {
  try {
    // If we have a state token, use it
    if (state && tokenStore.has(state)) {
      oauth2Client.setCredentials(tokenStore.get(state));
    }

    // Check if we have valid credentials
    if (!oauth2Client.credentials.access_token) {
      return {
        available: false,
        top_queries: [],
        ctr: null,
        impressions: null,
        clicks: null,
        error: 'No GSC authentication available'
      };
    }

    // Get the domain from the URL
    const domain = new URL(url).hostname;
    
    // Get Search Console properties to find the correct one
    const { data: sites } = await searchConsole.sites.list();
    const site = sites.siteEntry?.find(site => 
      site.siteUrl === `https://${domain}/` || 
      site.siteUrl === `http://${domain}/` ||
      site.siteUrl === `https://${domain}` ||
      site.siteUrl === `http://${domain}`
    );

    if (!site) {
      return {
        available: false,
        top_queries: [],
        ctr: null,
        impressions: null,
        clicks: null,
        error: 'Site not found in Search Console'
      };
    }

    // Get the last 28 days of data
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 28);

    // Get page metrics
    const { data: pageMetrics } = await searchConsole.searchAnalytics.query({
      siteUrl: site.siteUrl,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['query', 'page'],
        rowLimit: 10,
        filters: [{
          dimension: 'page',
          operator: 'equals',
          expression: url
        }]
      }
    });

    // Get top queries for this page
    const { data: queryMetrics } = await searchConsole.searchAnalytics.query({
      siteUrl: site.siteUrl,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['query'],
        rowLimit: 10,
        filters: [{
          dimension: 'page',
          operator: 'equals',
          expression: url
        }]
      }
    });

    // Calculate totals
    const totalClicks = pageMetrics.rows?.reduce((sum, row) => sum + (row.clicks || 0), 0) || 0;
    const totalImpressions = pageMetrics.rows?.reduce((sum, row) => sum + (row.impressions || 0), 0) || 0;
    const avgCtr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;

    // Format top queries
    const topQueries = queryMetrics.rows?.map(row => ({
      query: row.keys?.[0] || '',
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0
    })) || [];

    return {
      available: true,
      top_queries,
      ctr: avgCtr,
      impressions: totalImpressions,
      clicks: totalClicks,
      siteUrl: site.siteUrl
    };

  } catch (error) {
    console.error('Error fetching GSC insights:', error);
    return {
      available: false,
      top_queries: [],
      ctr: null,
      impressions: null,
      clicks: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Helper function to check if GSC is configured
export function isGscConfigured(): boolean {
  return !!(process.env.GSC_CLIENT_ID && process.env.GSC_CLIENT_SECRET);
}


