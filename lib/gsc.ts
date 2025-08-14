import { google } from "googleapis";

// OAuth2 client setup with explicit redirect URI
const redirectUri =
  process.env.GSC_REDIRECT_URI || "https://seo-audit-seven.vercel.app/api/auth/gsc/callback";

const oauth2Client = new google.auth.OAuth2(
  process.env.GSC_CLIENT_ID,
  process.env.GSC_CLIENT_SECRET,
  redirectUri
);

// Store tokens in memory (in production, use a database)
const tokenStore = new Map<string, any>();

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
    const { tokens } = await oauth2Client.getToken(code);
    tokenStore.set(state, tokens);
    oauth2Client.setCredentials(tokens);
    return true;
  } catch (error) {
    console.error("Error getting GSC tokens:", error);
    return false;
  }
}

export async function fetchGscInsightsForUrl(url: string, state?: string): Promise<any> {
  // Simplified GSC implementation - returns basic structure
  // In a full implementation, this would fetch real GSC data
  return {
    available: false,
    top_queries: [],
    ctr: null,
    impressions: null,
    clicks: null,
    message: "GSC integration coming soon",
  };
}

// Helper function to check if GSC is configured
export function isGscConfigured(): boolean {
  return !!(process.env.GSC_CLIENT_ID && process.env.GSC_CLIENT_SECRET);
}
