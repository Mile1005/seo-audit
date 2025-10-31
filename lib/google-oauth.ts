import Google from "next-auth/providers/google"
import { prisma } from "./db"

/**
 * Google OAuth Scopes used by the application
 */
export const GOOGLE_SCOPES = {
  // Basic authentication scopes (always requested)
  BASIC: [
    "openid",
    "email",
    "profile"
  ],

  // Google Search Console (requested when user accesses GSC features)
  SEARCH_CONSOLE: [
    "https://www.googleapis.com/auth/webmasters.readonly"
  ],

  // Future: Google Analytics (for website analytics integration)
  ANALYTICS: [
    "https://www.googleapis.com/auth/analytics.readonly"
  ],

  // Future: Google Drive (for report storage/export)
  DRIVE: [
    "https://www.googleapis.com/auth/drive.file"
  ],

  // Future: Google Sheets (for data export)
  SHEETS: [
    "https://www.googleapis.com/auth/spreadsheets"
  ]
} as const

/**
 * Check if user has granted specific scopes
 */
export async function checkUserScopes(userId: string, requiredScopes: string[]): Promise<{
  hasAllScopes: boolean
  grantedScopes: string[]
  missingScopes: string[]
}> {
  const account = await prisma.account.findFirst({
    where: {
      userId,
      provider: 'google'
    },
    select: {
      scope: true
    }
  })

  if (!account?.scope) {
    return {
      hasAllScopes: false,
      grantedScopes: [],
      missingScopes: requiredScopes
    }
  }

  const grantedScopes = account.scope.split(' ')
  const missingScopes = requiredScopes.filter(scope => !grantedScopes.includes(scope))

  return {
    hasAllScopes: missingScopes.length === 0,
    grantedScopes,
    missingScopes
  }
}

/**
 * Generate authorization URL for additional scopes
 */
export function generateScopeAuthUrl(baseUrl: string, additionalScopes: string[], state?: string) {
  const allScopes = [...GOOGLE_SCOPES.BASIC, ...additionalScopes]

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${baseUrl}/api/auth/callback/google`,
    scope: allScopes.join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    ...(state && { state })
  })

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

/**
 * Get scope requirements for different features
 */
export function getScopesForFeature(feature: string): string[] {
  switch (feature) {
    case 'search-console':
      return [...GOOGLE_SCOPES.SEARCH_CONSOLE]
    case 'analytics':
      return [...GOOGLE_SCOPES.ANALYTICS]
    case 'drive':
      return [...GOOGLE_SCOPES.DRIVE]
    case 'sheets':
      return [...GOOGLE_SCOPES.SHEETS]
    default:
      return []
  }
}