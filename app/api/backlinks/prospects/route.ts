import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

// GET /api/backlinks/prospects - Get link prospects for outreach
export async function GET(request: NextRequest) {
  try {
    await requireUser(request);

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const minDomainRating = searchParams.get("minDomainRating");
    const maxDomainRating = searchParams.get("maxDomainRating");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = { projectId };

    if (status && status !== "all") {
      where.outreachStatus = status;
    }

    if (priority && priority !== "all") {
      where.priority = priority;
    }

    if (minDomainRating || maxDomainRating) {
      where.domainRating = {};
      if (minDomainRating) where.domainRating.gte = parseInt(minDomainRating);
      if (maxDomainRating) where.domainRating.lte = parseInt(maxDomainRating);
    }

    // Get prospects with pagination
    const [prospects, total] = await Promise.all([
      prisma.linkProspect.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.linkProspect.count({ where }),
    ]);

    // Get stats
    const [statusStats, priorityStats] = await Promise.all([
      prisma.linkProspect.groupBy({
        by: ["outreachStatus"],
        where: { projectId },
        _count: true,
      }),
      prisma.linkProspect.groupBy({
        by: ["priority"],
        where: { projectId },
        _count: true,
      }),
    ]);

    return NextResponse.json({
      prospects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: {
        total,
        byStatus: statusStats.reduce(
          (acc, item) => {
            acc[item.outreachStatus] = item._count;
            return acc;
          },
          {} as Record<string, number>
        ),
        byPriority: priorityStats.reduce(
          (acc, item) => {
            acc[item.priority] = item._count;
            return acc;
          },
          {} as Record<string, number>
        ),
      },
    });
  } catch (error) {
    console.error("Error fetching link prospects:", error);
    return NextResponse.json({ error: "Failed to fetch link prospects" }, { status: 500 });
  }
}

// POST /api/backlinks/prospects - Create new link prospects
export async function POST(request: NextRequest) {
  try {
    await requireUser(request);

    const body = await request.json();
    const { projectId, prospects } = body;

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const results: Array<{ success: boolean; prospect?: any; error?: string; domain?: string }> =
      [];

    if (Array.isArray(prospects)) {
      // Bulk create
      for (const prospectData of prospects) {
        try {
          const prospect = await prisma.linkProspect.upsert({
            where: {
              projectId_domain: {
                projectId,
                domain: prospectData.domain,
              },
            },
            update: {
              url: prospectData.url,
              contactEmail: prospectData.contactEmail,
              contactName: prospectData.contactName,
              priority: prospectData.priority || "MEDIUM",
              domainRating: prospectData.domainRating,
              traffic: prospectData.traffic,
              relevanceScore: prospectData.relevanceScore,
              notes: prospectData.notes,
            },
            create: {
              projectId,
              domain: prospectData.domain,
              url: prospectData.url,
              contactEmail: prospectData.contactEmail,
              contactName: prospectData.contactName,
              priority: prospectData.priority || "MEDIUM",
              domainRating: prospectData.domainRating,
              traffic: prospectData.traffic,
              relevanceScore: prospectData.relevanceScore,
              notes: prospectData.notes,
            },
          });

          results.push({ success: true, prospect });
        } catch (error) {
          console.error("Error processing prospect:", error);
          results.push({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
            domain: prospectData.domain,
          });
        }
      }
    } else {
      // Single prospect
      const prospectData = body;
      const prospect = await prisma.linkProspect.create({
        data: {
          projectId,
          domain: prospectData.domain,
          url: prospectData.url,
          contactEmail: prospectData.contactEmail,
          contactName: prospectData.contactName,
          priority: prospectData.priority || "MEDIUM",
          domainRating: prospectData.domainRating,
          traffic: prospectData.traffic,
          relevanceScore: prospectData.relevanceScore,
          notes: prospectData.notes,
        },
      });

      return NextResponse.json({ prospect });
    }

    return NextResponse.json({
      message: "Link prospects processed",
      results,
      successCount: results.filter((r) => r.success).length,
      errorCount: results.filter((r) => !r.success).length,
    });
  } catch (error) {
    console.error("Error creating link prospects:", error);
    return NextResponse.json({ error: "Failed to create link prospects" }, { status: 500 });
  }
}

// PUT /api/backlinks/prospects - Update prospect status
export async function PUT(request: NextRequest) {
  try {
    await requireUser(request);

    const body = await request.json();
    const { id, outreachStatus, priority, notes, contactEmail, contactName, nextFollowupAt } = body;

    if (!id) {
      return NextResponse.json({ error: "Prospect ID is required" }, { status: 400 });
    }

    const updateData: any = {};

    if (outreachStatus) {
      updateData.outreachStatus = outreachStatus;

      // Update timestamps based on status
      if (outreachStatus === "SENT" && !updateData.lastContactedAt) {
        updateData.lastContactedAt = new Date();
      } else if (outreachStatus === "REPLIED" && !updateData.responseAt) {
        updateData.responseAt = new Date();
      } else if (outreachStatus === "LINKED" && !updateData.linkedAt) {
        updateData.linkedAt = new Date();
      }
    }

    if (priority) updateData.priority = priority;
    if (notes !== undefined) updateData.notes = notes;
    if (contactEmail) updateData.contactEmail = contactEmail;
    if (contactName) updateData.contactName = contactName;
    if (nextFollowupAt) updateData.nextFollowupAt = new Date(nextFollowupAt);

    const prospect = await prisma.linkProspect.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ prospect });
  } catch (error) {
    console.error("Error updating prospect:", error);
    return NextResponse.json({ error: "Failed to update prospect" }, { status: 500 });
  }
}

// DELETE /api/backlinks/prospects - Delete a prospect
export async function DELETE(request: NextRequest) {
  try {
    await requireUser(request);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Prospect ID is required" }, { status: 400 });
    }

    await prisma.linkProspect.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Prospect deleted successfully" });
  } catch (error) {
    console.error("Error deleting prospect:", error);
    return NextResponse.json({ error: "Failed to delete prospect" }, { status: 500 });
  }
}
