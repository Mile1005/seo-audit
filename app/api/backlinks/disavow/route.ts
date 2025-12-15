import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

// GET /api/backlinks/disavow - Get disavow files for a project
export async function GET(request: NextRequest) {
  try {
    await requireUser(request);

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const disavowFiles = await prisma.disavowFile.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ disavowFiles });
  } catch (error) {
    console.error("Error fetching disavow files:", error);
    return NextResponse.json({ error: "Failed to fetch disavow files" }, { status: 500 });
  }
}

// POST /api/backlinks/disavow - Generate disavow file from toxic backlinks
export async function POST(request: NextRequest) {
  try {
    await requireUser(request);

    const body = await request.json();
    const {
      projectId,
      includeAllToxic = true,
      specificBacklinkIds = [],
      customDomains = [],
    } = body;

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const backlinksToDisavow: { sourceUrl: string; sourceDomain: string }[] = [];
    const domainsToDisavow = new Set<string>();

    // Get toxic backlinks if requested
    if (includeAllToxic) {
      const toxicBacklinks = await prisma.backlink.findMany({
        where: {
          projectId,
          isToxic: true,
        },
        select: {
          sourceUrl: true,
          sourceDomain: true,
        },
      });

      backlinksToDisavow.push(...toxicBacklinks);
      toxicBacklinks.forEach((bl) => domainsToDisavow.add(bl.sourceDomain));
    }

    // Get specific backlinks if provided
    if (specificBacklinkIds.length > 0) {
      const specificBacklinks = await prisma.backlink.findMany({
        where: {
          id: { in: specificBacklinkIds },
          projectId,
        },
        select: {
          sourceUrl: true,
          sourceDomain: true,
        },
      });

      backlinksToDisavow.push(...specificBacklinks);
      specificBacklinks.forEach((bl) => domainsToDisavow.add(bl.sourceDomain));
    }

    // Add custom domains
    customDomains.forEach((domain: string) => domainsToDisavow.add(domain));

    // Generate disavow file content
    const lines: string[] = [];

    // Add header comment
    lines.push("# Disavow file generated on " + new Date().toISOString());
    lines.push("# This file contains domains and URLs to disavow");
    lines.push("");

    // Add domains (more efficient than individual URLs)
    const domains = Array.from(domainsToDisavow).sort();
    domains.forEach((domain) => {
      lines.push(`domain:${domain}`);
    });

    // Add individual URLs if needed (for partial domain disavows)
    const individualUrls = backlinksToDisavow
      .filter((bl) => !domainsToDisavow.has(bl.sourceDomain))
      .map((bl) => bl.sourceUrl)
      .sort();

    if (individualUrls.length > 0) {
      lines.push("");
      lines.push("# Individual URLs");
      individualUrls.forEach((url) => {
        lines.push(url);
      });
    }

    const content = lines.join("\n");
    const filename = `disavow-${new Date().toISOString().split("T")[0]}.txt`;

    // Save to database
    const disavowFile = await prisma.disavowFile.create({
      data: {
        projectId,
        filename,
        content,
        domains: domains.length,
        urls: individualUrls.length,
      },
    });

    return NextResponse.json({
      disavowFile,
      content,
      stats: {
        totalDomains: domains.length,
        totalUrls: individualUrls.length,
        totalLines: lines.filter((line) => line && !line.startsWith("#")).length,
      },
    });
  } catch (error) {
    console.error("Error generating disavow file:", error);
    return NextResponse.json({ error: "Failed to generate disavow file" }, { status: 500 });
  }
}

// PUT /api/backlinks/disavow - Mark disavow file as uploaded to GSC
export async function PUT(request: NextRequest) {
  try {
    await requireUser(request);

    const body = await request.json();
    const { id, uploadedToGSC } = body;

    if (!id) {
      return NextResponse.json({ error: "Disavow file ID is required" }, { status: 400 });
    }

    const disavowFile = await prisma.disavowFile.update({
      where: { id },
      data: {
        uploadedToGSC,
        ...(uploadedToGSC && { uploadedAt: new Date() }),
      },
    });

    return NextResponse.json({ disavowFile });
  } catch (error) {
    console.error("Error updating disavow file:", error);
    return NextResponse.json({ error: "Failed to update disavow file" }, { status: 500 });
  }
}

// DELETE /api/backlinks/disavow - Delete a disavow file
export async function DELETE(request: NextRequest) {
  try {
    await requireUser(request);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Disavow file ID is required" }, { status: 400 });
    }

    await prisma.disavowFile.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Disavow file deleted successfully" });
  } catch (error) {
    console.error("Error deleting disavow file:", error);
    return NextResponse.json({ error: "Failed to delete disavow file" }, { status: 500 });
  }
}
