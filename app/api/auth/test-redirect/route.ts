import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://www.aiseoturbo.com";
  const expectedRedirectUri = `${baseUrl}/api/auth/callback/google`;

  return NextResponse.json({
    baseUrl,
    expectedRedirectUri,
    message: "This is the exact redirect URI that should be configured in Google Cloud Console",
    instruction:
      "Make sure your Google OAuth app has EXACTLY this URI in the authorized redirect URIs list",
  });
}
