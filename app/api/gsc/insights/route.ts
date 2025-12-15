import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { fetchGscInsightsForUrl, isGscConfigured } from "@/lib/gsc";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!isGscConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: "GSC not configured",
          hint: "Check GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET (or GSC_CLIENT_ID/GSC_CLIENT_SECRET)",
        },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const urlParam = searchParams.get("url");
    if (!urlParam) {
      return NextResponse.json({ success: false, error: "Missing url" }, { status: 400 });
    }

    let url = urlParam.trim();
    if (!/^https?:\/\//i.test(url)) url = `https://${url}`;

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ success: false, error: "Invalid url" }, { status: 400 });
    }

    try {
      const data = await fetchGscInsightsForUrl(url, { userId });

      // If the user has not connected GSC yet, return 401 so the UI can show a clear "Connect" state.
      if (
        data &&
        data.available === false &&
        typeof data.message === "string" &&
        /authentication required|authenticate first/i.test(data.message)
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Google Search Console is not connected. Connect it to see metrics for this site.",
            code: "gsc_not_connected",
          },
          { status: 401 }
        );
      }

      return NextResponse.json({ success: true, data });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      // Google OAuth refresh token is invalid/expired/revoked.
      if (/invalid_grant/i.test(message)) {
        try {
          await prisma.gscToken.deleteMany({ where: { userId } });
        } catch {
          // ignore
        }
        return NextResponse.json(
          {
            success: false,
            error: "Google Search Console connection expired. Please reconnect.",
            code: "gsc_reconnect_required",
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { success: false, error: message || "Failed to load GSC metrics" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("GSC insights error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}
