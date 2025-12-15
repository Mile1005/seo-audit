import { NextResponse } from "next/server";

export async function GET() {
  const nodeEnv = process.env.NODE_ENV;
  const nextauthUrl = process.env.NEXTAUTH_URL;
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;

  const baseUrl = nextauthUrl || "https://www.aiseoturbo.com";
  const redirectUri = `${baseUrl}/api/auth/callback/google`;

  return NextResponse.json({
    environment: nodeEnv,
    nextauthUrl,
    computedBaseUrl: baseUrl,
    redirectUri,
    environmentStatus: {
      hasGoogleClientId: !!googleClientId,
      hasGoogleClientSecret: !!googleClientSecret,
      hasAuthSecret: !!authSecret,
      googleClientIdPrefix: googleClientId ? googleClientId.substring(0, 12) + "***" : "MISSING",
    },
    instructions: {
      message: "COPY THIS EXACT URI TO GOOGLE CLOUD CONSOLE",
      redirectUriForGoogleConsole: redirectUri,
      steps: [
        "1. Go to Google Cloud Console > APIs & Services > Credentials",
        "2. Find your OAuth 2.0 Client ID",
        '3. In "Authorized redirect URIs", add EXACTLY this URI:',
        redirectUri,
        "4. Remove any other redirect URIs (especially apex domain ones)",
        "5. Save the changes",
      ],
    },
    timestamp: new Date().toISOString(),
  });
}
