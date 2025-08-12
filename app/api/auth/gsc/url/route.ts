import { NextRequest, NextResponse } from "next/server";
import { getGscAuthUrl, isGscConfigured } from "../../../../../lib/gsc";

export async function GET(req: NextRequest) {
  try {
    if (!isGscConfigured()) {
      return NextResponse.json(
        { error: "Google Search Console is not configured" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const state = searchParams.get("state") || crypto.randomUUID();

    const authUrl = await getGscAuthUrl(state);

    return NextResponse.json({
      authUrl,
      state
    });

  } catch (error) {
    console.error("Error generating GSC auth URL:", error);
    return NextResponse.json(
      { error: "Failed to generate auth URL" },
      { status: 500 }
    );
  }
}
