import { NextRequest, NextResponse } from "next/server";
import { handleGscCallback } from "../../../../../lib/gsc";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}?gsc_error=${error}`
      );
    }

    if (!code || !state) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}?gsc_error=missing_code_or_state`
      );
    }

    const success = await handleGscCallback(code, state);

    if (success) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}?gsc_success=true&state=${state}`
      );
    } else {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}?gsc_error=auth_failed`
      );
    }
  } catch (error) {
    console.error("GSC callback error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}?gsc_error=callback_error`
    );
  }
}
