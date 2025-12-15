import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { checkUserScopes, generateScopeAuthUrl, getScopesForFeature } from "@/lib/google-oauth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { feature } = await request.json();

    if (!feature) {
      return NextResponse.json({ error: "Feature parameter required" }, { status: 400 });
    }

    // Get required scopes for the feature
    const requiredScopes = getScopesForFeature(feature);

    if (requiredScopes.length === 0) {
      return NextResponse.json({ error: "Unknown feature" }, { status: 400 });
    }

    // Check if user already has the required scopes
    const scopeCheck = await checkUserScopes(session.user.id, requiredScopes);

    if (scopeCheck.hasAllScopes) {
      return NextResponse.json({
        success: true,
        message: "User already has required scopes",
        grantedScopes: scopeCheck.grantedScopes,
      });
    }

    // Generate authorization URL for additional scopes
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const authUrl = generateScopeAuthUrl(baseUrl, requiredScopes, `feature-${feature}`);

    return NextResponse.json({
      success: true,
      requiresConsent: true,
      authUrl,
      missingScopes: scopeCheck.missingScopes,
      feature,
    });
  } catch (error) {
    console.error("Scope request error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const feature = searchParams.get("feature");

    if (!feature) {
      return NextResponse.json({ error: "Feature parameter required" }, { status: 400 });
    }

    // Check user's current scopes
    const requiredScopes = getScopesForFeature(feature);
    const scopeCheck = await checkUserScopes(session.user.id, requiredScopes);

    return NextResponse.json({
      hasScopes: scopeCheck.hasAllScopes,
      grantedScopes: scopeCheck.grantedScopes,
      missingScopes: scopeCheck.missingScopes,
      feature,
    });
  } catch (error) {
    console.error("Scope check error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
