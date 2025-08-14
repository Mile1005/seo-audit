import { NextRequest, NextResponse } from "next/server";
import { hasGscTokens, validateGscTokens } from "../../../../lib/gsc";
import { getPrisma } from "../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const cookies = req.headers.get('cookie') || '';
    const stateCookie = cookies.split(';').map(c => c.trim()).find(c => c.startsWith('gsc_state='));
    const state = stateCookie ? stateCookie.split('=')[1] : undefined;

    const config = {
      clientId: process.env.GSC_CLIENT_ID ? "✅ Set" : "❌ Missing",
      clientSecret: process.env.GSC_CLIENT_SECRET ? "✅ Set" : "❌ Missing",
      redirectUri: process.env.GSC_REDIRECT_URI || "❌ Missing",
      appUrl: process.env.NEXT_PUBLIC_APP_URL || "❌ Missing",
      state
    };

    // Check if we have any tokens stored in database
    const hasTokens = await hasGscTokens(state);
    
    // Validate the tokens to see if they're actually working
    const tokenValidation = await validateGscTokens(state);
    
    const isConfigured = !!(process.env.GSC_CLIENT_ID && process.env.GSC_CLIENT_SECRET);

    return NextResponse.json({
      message: "GSC Configuration Check",
      config,
      isConfigured,
      hasTokens,
      isAuthenticated: tokenValidation.isValid,
      validationMessage: tokenValidation.message,
      expectedRedirectUri: "https://seo-audit-seven.vercel.app/api/auth/gsc/callback",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to check GSC config" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const cookies = req.headers.get('cookie') || '';
    const stateCookie = cookies.split(';').map(c => c.trim()).find(c => c.startsWith('gsc_state='));
    const state = stateCookie ? stateCookie.split('=')[1] : undefined;

    const prisma = await getPrisma();
    if (state) {
      await (prisma as any).gscToken.deleteMany({ where: { state } });
    } else {
      await (prisma as any).gscToken.deleteMany();
    }
    
    const res = NextResponse.json({
      message: "GSC tokens cleared successfully",
      cleared: true,
      state: state || null
    });
    // Clear cookie
    res.headers.append('Set-Cookie', `gsc_state=; Path=/; Max-Age=0; SameSite=Lax; Secure`);
    return res;
  } catch (error) {
    console.error("Error clearing GSC tokens:", error);
    return NextResponse.json({ error: "Failed to clear GSC tokens" }, { status: 500 });
  }
}
