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
	// ...existing code...
}

export async function handleGscCallback(code: string, state: string): Promise<boolean> {
	// ...existing code...
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
	// ...existing code...
}

// Helper function to check if GSC is configured
export function isGscConfigured(): boolean {
	// ...existing code...
}

// Helper function to check if we have any tokens stored
export async function hasGscTokens(state?: string): Promise<boolean> {
	// ...existing code...
}

// Helper function to validate GSC tokens and check if they're working
export async function validateGscTokens(state?: string): Promise<{ isValid: boolean; hasProperties: boolean; message: string }> {
	// ...existing code...
}

// Choose a siteUrl for a given page URL by inspecting available properties
async function resolveSiteUrlForDomain(searchConsole: any, pageUrl: string): Promise<string | null> {
	// ...existing code...
}
