import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    // For now, get all projects for the demo admin user
    const user = await prisma.user.findFirst({
      where: { email: "admin@aiseoturbo.com" },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: { ownerId: user.id },
        include: {
          owner: {
            select: { id: true, name: true, email: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.project.count({
        where: { ownerId: user.id },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: projects,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Projects API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch projects",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, domain, description } = body;

    if (!name || !domain) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and domain are required",
        },
        { status: 400 }
      );
    }

    // Get demo admin user
    const user = await prisma.user.findFirst({
      where: { email: "admin@aiseoturbo.com" },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    // Check if project with this domain already exists for user
    const existingProject = await prisma.project.findFirst({
      where: {
        domain,
        ownerId: user.id,
      },
    });

    if (existingProject) {
      return NextResponse.json(
        {
          success: false,
          error: "A project with this domain already exists",
        },
        { status: 409 }
      );
    }

    const project = await prisma.project.create({
      data: {
        name,
        domain,
        description,
        ownerId: user.id,
        status: "ACTIVE",
      },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Project creation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create project",
      },
      { status: 500 }
    );
  }
}
