import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

/**
 * GET /api/gsc/status
 * Check if the current user has connected their Google Search Console
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has a GSC token
    const gscToken = await (prisma.gscToken as any).findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      connected: !!gscToken,
      connectionDate: gscToken?.createdAt || null,
      lastUpdated: gscToken?.updatedAt || null,
    });
  } catch (error) {
    console.error("GSC Status check error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to check GSC status" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/gsc/status
 * Disconnect Google Search Console for the current user
 */
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Delete all GSC tokens for this user
    await (prisma.gscToken as any).deleteMany({
      where: { userId: session.user.id },
    });

    console.log("🔓 GSC disconnected for user:", session.user.email);

    return NextResponse.json({
      success: true,
      message: "Google Search Console disconnected successfully",
    });
  } catch (error) {
    console.error("GSC Disconnect error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to disconnect GSC" },
      { status: 500 }
    );
  }
}
