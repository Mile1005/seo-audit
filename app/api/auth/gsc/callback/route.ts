import { NextRequest, NextResponse } from "next/server";
import { handleGscCallback } from "../../../../../lib/gsc";

export async function GET(req: NextRequest) {
  try {
    console.log("GSC Callback: Starting callback processing");
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    console.log("GSC Callback: Received params:", { 
      hasCode: !!code, 
      hasState: !!state, 
      error: error,
      state: state 
    });

    if (error) {
      console.error("GSC Callback: OAuth error from Google:", error);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "https://seo-audit-seven.vercel.app"}?gsc_error=${error}`
      );
    }

    if (!code || !state) {
      console.error("GSC Callback: Missing code or state:", { code: !!code, state: !!state });
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "https://seo-audit-seven.vercel.app"}?gsc_error=missing_code_or_state`
      );
    }

    console.log("GSC Callback: Calling handleGscCallback with state:", state);
    const success = await handleGscCallback(code, state);

    if (success) {
      console.log("GSC Callback: Success! Redirecting to success page");
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "https://seo-audit-seven.vercel.app"}?gsc_success=true&state=${state}`
      );
    } else {
      console.error("GSC Callback: handleGscCallback returned false");
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "https://seo-audit-seven.vercel.app"}?gsc_error=auth_failed`
      );
    }
  } catch (error) {
    console.error("GSC Callback: Unexpected error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || "https://seo-audit-seven.vercel.app"}?gsc_error=callback_error`
    );
  }
}
