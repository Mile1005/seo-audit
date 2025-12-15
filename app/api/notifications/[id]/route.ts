import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

// Force dynamic rendering
export const dynamic = "force-dynamic";

/**
 * PATCH /api/notifications/[id]
 * Mark a notification as read
 */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Verify notification belongs to user
    const notification = await (prisma as any).notification.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!notification) {
      return NextResponse.json(
        { success: false, error: "Notification not found" },
        { status: 404 }
      );
    }

    const updated = await (prisma as any).notification.update({
      where: { id },
      data: {
        read: true,
        readAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      notification: updated,
    });
  } catch (error) {
    console.error("❌ Error updating notification:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update notification",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/notifications/[id]
 * Delete a notification
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Verify notification belongs to user
    const notification = await (prisma as any).notification.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!notification) {
      return NextResponse.json(
        { success: false, error: "Notification not found" },
        { status: 404 }
      );
    }

    await (prisma as any).notification.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    console.error("❌ Error deleting notification:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete notification",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
