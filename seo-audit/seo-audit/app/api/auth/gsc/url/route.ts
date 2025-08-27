import { NextRequest, NextResponse } from "next/server";
import { getGscAuthUrl, isGscConfigured } from "../../../../../lib/gsc";

export async function POST(req: NextRequest) {
  try {
    if (!isGscConfigured()) {
      return NextResponse.json(
        { error: "Google Search Console is not configured" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const state = body.state || crypto.randomUUID();

    const authUrl = await getGscAuthUrl(state);

    const res = NextResponse.json({ authUrl, state });
    // Persist state cookie for this session (10 minutes)
    res.headers.append('Set-Cookie', `gsc_state=${state}; Path=/; Max-Age=${10*60}; SameSite=Lax; Secure`);
    return res;
  } catch (error) {
    console.error("Error generating GSC auth URL:", error);
    return NextResponse.json({ error: "Failed to generate auth URL" }, { status: 500 });
  }
}

// Keep GET for backward compatibility
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

    const res = NextResponse.json({ authUrl, state });
    res.headers.append('Set-Cookie', `gsc_state=${state}; Path=/; Max-Age=${10*60}; SameSite=Lax; Secure`);
    return res;
  } catch (error) {
    console.error("Error generating GSC auth URL:", error);
    return NextResponse.json({ error: "Failed to generate auth URL" }, { status: 500 });
  }
}
