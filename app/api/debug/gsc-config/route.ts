import { NextRequest, NextResponse } from "next/server";
import { hasGscTokens } from "../../../../lib/gsc";

export async function GET(req: NextRequest) {
  try {
    const config = {
      clientId: process.env.GSC_CLIENT_ID ? "✅ Set" : "❌ Missing",
      clientSecret: process.env.GSC_CLIENT_SECRET ? "✅ Set" : "❌ Missing",
      redirectUri: process.env.GSC_REDIRECT_URI || "❌ Missing",
      appUrl: process.env.NEXT_PUBLIC_APP_URL || "❌ Missing",
    };

    // Check if we have any tokens stored in database
    const hasTokens = await hasGscTokens();
    const isConfigured = !!(process.env.GSC_CLIENT_ID && process.env.GSC_CLIENT_SECRET);

    return NextResponse.json({
      message: "GSC Configuration Check",
      config,
      isConfigured,
      hasTokens,
      expectedRedirectUri: "https://seo-audit-seven.vercel.app/api/auth/gsc/callback",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to check GSC config" }, { status: 500 });
  }
}
