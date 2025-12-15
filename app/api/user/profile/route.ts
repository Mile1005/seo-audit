import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRecord = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!userRecord) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const { password, ...user } = userRecord;
    return NextResponse.json({ user: { ...user, hasPassword: !!password } });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, company, timezone } = body;

    // Validate input
    if (name && (typeof name !== "string" || name.length < 1 || name.length > 100)) {
      return NextResponse.json(
        { error: "Name must be between 1 and 100 characters" },
        { status: 400 }
      );
    }
    if (company && typeof company !== "string") {
      return NextResponse.json({ error: "Invalid company" }, { status: 400 });
    }
    if (timezone && typeof timezone !== "string") {
      return NextResponse.json({ error: "Invalid timezone" }, { status: 400 });
    }

    // Update user profile
    const updated = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        ...(name !== undefined && { name }),
        // company/timezone handled in preferences or future expansion
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const { password: pw, ...safe } = updated;
    return NextResponse.json({ user: { ...safe, hasPassword: !!pw } });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
