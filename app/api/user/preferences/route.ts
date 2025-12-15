import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { safeGet, safeSet } from "@/lib/redis";
import { prisma } from "@/lib/prisma";
import { locales } from "@/i18n";

// In-memory fallback (per server instance) if Redis unavailable
const memoryStore = new Map<
  string,
  { company: string; timezone: string; preferredLocale?: string }
>();

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Try to get from database first (source of truth)
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        // @ts-ignore - preferredLocale added to schema, types will update after migration
        preferredLocale: true,
        timezone: true,
        company: true,
        emailNotifications: true,
        marketingEmails: true,
      },
    });

    if (user) {
      return NextResponse.json({
        preferences: {
          company: user.company || "",
          timezone: user.timezone || "UTC",
          // @ts-ignore - preferredLocale types will update after migration
          preferredLocale: user.preferredLocale || "en",
          emailNotifications: user.emailNotifications,
          marketingEmails: user.marketingEmails,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching user from database:", error);
  }

  // Fallback to Redis cache
  const key = `user:prefs:${session.user.email}`;
  try {
    const prefs = await safeGet(key);
    return NextResponse.json({
      preferences: prefs
        ? JSON.parse(prefs)
        : memoryStore.get(key) || { company: "", timezone: "UTC", preferredLocale: "en" },
    });
  } catch (e) {
    // Fallback to in-memory
    return NextResponse.json({
      preferences: memoryStore.get(key) || { company: "", timezone: "UTC", preferredLocale: "en" },
      fallback: true,
    });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { company = "", timezone = "UTC", preferredLocale } = body || {};

  if (typeof company !== "string" || typeof timezone !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Validate locale if provided
  if (preferredLocale && !locales.includes(preferredLocale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const prefs = { company, timezone, ...(preferredLocale && { preferredLocale }) };
  const key = `user:prefs:${session.user.email}`;
  memoryStore.set(key, prefs);

  // Update database if available
  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        company,
        timezone,
        // @ts-ignore - preferredLocale added to schema, types will update after migration
        ...(preferredLocale && { preferredLocale }),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error updating user in database:", error);
  }

  // Also cache in Redis
  try {
    await safeSet(key, JSON.stringify(prefs));
    return NextResponse.json({ ok: true, persisted: true });
  } catch (e) {
    return NextResponse.json({ ok: true, persisted: false, fallback: true });
  }
}

// PATCH method for partial updates (used by language switcher)
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { preferredLocale } = body;

  // Validate locale
  if (!preferredLocale || !locales.includes(preferredLocale)) {
    return NextResponse.json({ error: "Invalid or missing locale" }, { status: 400 });
  }

  try {
    // Update database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        // @ts-ignore - preferredLocale added to schema, types will update after migration
        preferredLocale,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        // @ts-ignore - preferredLocale types will update after migration
        preferredLocale: true,
      },
    });

    // Update cache
    const key = `user:prefs:${session.user.email}`;
    try {
      const existing = await safeGet(key);
      const prefs = existing ? JSON.parse(existing) : {};
      await safeSet(key, JSON.stringify({ ...prefs, preferredLocale }));
    } catch (e) {
      console.log("Cache update failed, continuing anyway");
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating preferred locale:", error);
    return NextResponse.json({ error: "Failed to update locale" }, { status: 500 });
  }
}
