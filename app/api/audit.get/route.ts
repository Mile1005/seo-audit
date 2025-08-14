import { NextRequest, NextResponse } from "next/server";
import { dbHelpers } from "../../../lib/db";
import { GetAuditResponse } from "../../../lib/schemas";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// UUID validation schema
const UUIDSchema = z.string().uuid("Invalid UUID format");

export async function GET(req: NextRequest) {
  try {
    // If DB is disabled (serverless inline mode) OR no DATABASE_URL is set,
    // indicate processing instead of attempting to load Prisma.
    if (process.env.DISABLE_DB === "true" || !process.env.DATABASE_URL) {
      return NextResponse.json({ status: "queued" });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id parameter is required" }, { status: 400 });
    }

    // Validate ?id as UUID
    const uuidValidation = UUIDSchema.safeParse(id);
    if (!uuidValidation.success) {
      return NextResponse.json(
        {
          error: "Invalid UUID format",
          details: uuidValidation.error.message,
        },
        { status: 400 }
      );
    }

    // Fetch Run and related Audit
    const run = await dbHelpers.getRunWithAudit(id);
    if (!run) {
      return NextResponse.json({ error: "Run not found" }, { status: 404 });
    }

    // If ready: return { status:"ready", result: AuditResultV1 }
    if (run.status === "ready" && run.audit) {
      const auditResult = typeof run.audit.json === "string" ? JSON.parse(run.audit.json) : run.audit.json;
      const response: z.infer<typeof GetAuditResponse> = {
        status: "ready",
        result: auditResult,
      };
      return NextResponse.json(response);
    }

    // Else: { status }
    const response: z.infer<typeof GetAuditResponse> = { status: run.status };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching audit:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
