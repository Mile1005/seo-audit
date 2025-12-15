import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  withAuth,
  withRateLimit,
  withErrorHandling,
  type AuthenticatedRequest,
} from "@/lib/api/middleware";

// GET /api/projects - List user's projects
async function handleGET(req: NextRequest) {
  try {
    // For now, use a simple auth check via header
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
        },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const sortBy = url.searchParams.get("sortBy") || "createdAt";
    const sortOrder = url.searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: {
          OR: [
            { ownerId: userId },
            {
              members: {
                some: { userId: userId },
              },
            },
          ],
        },
        include: {
          owner: {
            select: { id: true, name: true, email: true },
          },
          members: {
            include: {
              user: {
                select: { id: true, name: true, email: true },
              },
            },
          },
          _count: {
            select: {
              keywords: true,
              siteAudits: true,
              backlinks: true,
            },
          },
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.project.count({
        where: {
          OR: [
            { ownerId: userId },
            {
              members: {
                some: { userId: userId },
              },
            },
          ],
        },
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
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create new project
async function handlePOST(req: NextRequest) {
  try {
    // For now, use a simple auth check via header
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, domain, description, settings } = body;

    // Basic validation
    if (!name || !domain) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and domain are required",
        },
        { status: 400 }
      );
    }

    // Check if domain already exists for this user
    const existingProject = await prisma.project.findFirst({
      where: {
        domain,
        ownerId: userId,
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
        ownerId: userId,
        status: "ACTIVE",
        settings: settings || {
          trackingEnabled: true,
          auditFrequency: "weekly",
          keywords: [],
        },
      },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: {
            keywords: true,
            siteAudits: true,
            backlinks: true,
          },
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
    console.error("Error creating project:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Simple export without middleware for now - can be enhanced later
export const GET = handleGET;
export const POST = handlePOST;
