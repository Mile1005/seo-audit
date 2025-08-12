import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const config = {
      clientId: process.env.GSC_CLIENT_ID ? "✅ Set" : "❌ Missing",
      clientSecret: process.env.GSC_CLIENT_SECRET ? "✅ Set" : "❌ Missing", 
      redirectUri: process.env.GSC_REDIRECT_URI || "❌ Missing",
      appUrl: process.env.NEXT_PUBLIC_APP_URL || "❌ Missing"
    };

    return NextResponse.json({
      message: "GSC Configuration Check",
      config,
      expectedRedirectUri: "https://seo-audit-seven.vercel.app/api/auth/gsc/callback"
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check GSC config" },
      { status: 500 }
    );
  }
}
