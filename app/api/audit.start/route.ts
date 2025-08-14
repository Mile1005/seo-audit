import { NextRequest, NextResponse } from "next/server";
import { StartAuditRequest } from "../../../lib/schemas";
import { dbHelpers } from "../../../lib/db";
import { addAuditJob, isQueueConfigured } from "../../../lib/queue";
import { fetchHtml } from "../../../lib/scrape";
import { parseHtml } from "../../../lib/parse";
import { calculateAudit } from "../../../lib/heuristics";
import { fetchPageSpeed } from "../../../lib/psi";
import { fetchGscInsightsForUrl } from "../../../lib/gsc";

// Utility function to add HTTPS if missing
function ensureHttps(url: string): string {
  if (!url) return url;

  // Remove any leading/trailing whitespace
  url = url.trim();

  // If it already has a protocol, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Add https:// prefix
  return `https://${url}`;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // avoid static optimization
export const maxDuration = 60; // Vercel function limit (seconds)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Zod-validate against StartAuditRequest
    const validatedData = StartAuditRequest.parse(body);

    const pageUrl = ensureHttps(validatedData.pageUrl);
    const email = validatedData.email === "" ? undefined : validatedData.email;
    const targetKeyword =
      validatedData.targetKeyword === "" ? undefined : validatedData.targetKeyword;

    // Use DB only when explicitly enabled AND a DATABASE_URL is present.
    // On Vercel (no DB), this safely defaults to inline/serverless mode.
    const useDb = process.env.DISABLE_DB !== "true" && !!process.env.DATABASE_URL;

    // Create run with status=queued (if DB enabled)
    const runId = crypto.randomUUID();
    if (useDb) {
      await dbHelpers.createRun({
        id: runId,
        pageUrl,
        targetKeyword,
        email,
        status: "queued",
      });
    }

    // If queue is configured (REDIS_URL set), enqueue for background processing.
    // Otherwise, process inline (useful for local dev and Vercel serverless without Redis).
    let lastInlineResult: any | undefined;
    let inlineError = false;
    if (process.env.FORCE_INLINE_AUDIT === "true") {
      try {
        if (useDb) {
          await dbHelpers.updateRunStatus(runId, "running");
        }
        const html = await fetchHtml(pageUrl);
        const parsed = await parseHtml(html, pageUrl);
        
        // Fetch PageSpeed Insights data if API key is available
        let performanceData = null;
        const psiApiKey = process.env.PSI_API_KEY;
        if (psiApiKey) {
          try {
            console.log("Fetching PageSpeed Insights data");
            performanceData = await fetchPageSpeed(pageUrl, psiApiKey);
            console.log("PSI data retrieved successfully");
          } catch (error) {
            console.warn("Failed to fetch PSI data:", error);
            // Continue without PSI data - it's optional
          }
        } else {
          console.log("PSI API key not provided - skipping performance analysis");
        }
        
        const auditResult = await calculateAudit(pageUrl, parsed, {
          targetKeyword,
          performance: performanceData || undefined,
        });
        lastInlineResult = auditResult;
        if (useDb) {
          await dbHelpers.saveAudit({ id: crypto.randomUUID(), runId, json: auditResult });
          await dbHelpers.updateRunStatus(runId, "ready");
        }
      } catch (e) {
        if (useDb) {
          await dbHelpers.updateRunStatus(runId, "failed");
        }
        console.error("Inline audit processing failed:", e);
        inlineError = true;
      }
    } else if (isQueueConfigured()) {
      await addAuditJob({ runId, pageUrl, targetKeyword, email });
    } else {
      try {
        if (useDb) {
          await dbHelpers.updateRunStatus(runId, "running");
        }
        const html = await fetchHtml(pageUrl);
        const parsed = await parseHtml(html, pageUrl);
        
        // Fetch PageSpeed Insights data if API key is available
        let performanceData = null;
        const psiApiKey = process.env.PSI_API_KEY;
        if (psiApiKey) {
          try {
            console.log("Fetching PageSpeed Insights data");
            performanceData = await fetchPageSpeed(pageUrl, psiApiKey);
            console.log("PSI data retrieved successfully");
          } catch (error) {
            console.warn("Failed to fetch PSI data:", error);
            // Continue without PSI data - it's optional
          }
        } else {
          console.log("PSI API key not provided - skipping performance analysis");
        }
        
        const auditResult = await calculateAudit(pageUrl, parsed, {
          targetKeyword,
          performance: performanceData || undefined,
        });
        lastInlineResult = auditResult;
        if (useDb) {
          await dbHelpers.saveAudit({ id: crypto.randomUUID(), runId, json: auditResult });
          await dbHelpers.updateRunStatus(runId, "ready");
        }
      } catch (e) {
        if (useDb) {
          await dbHelpers.updateRunStatus(runId, "failed");
        }
        console.error("Inline audit processing failed:", e);
        inlineError = true;
      }
    }

    // If audit finished inline, include the result in response to avoid needing persistence
    let inlineResult: any | undefined = lastInlineResult;
    if (inlineResult === undefined && useDb) {
      const savedAudit = await dbHelpers.getAuditByRunId(runId).catch(() => null);
      inlineResult = savedAudit
        ? typeof savedAudit.json === "string"
          ? JSON.parse(savedAudit.json)
          : savedAudit.json
        : undefined;
    }

    // If DB is disabled, always return a final status to the client to avoid polling
    if (!useDb) {
      return NextResponse.json({
        runId,
        status: inlineResult ? "ready" : inlineError ? "failed" : "queued",
        result: inlineResult,
        error: inlineError && !inlineResult ? "Audit failed" : undefined,
      });
    }

    return NextResponse.json({ runId, status: inlineResult ? "ready" : "queued", result: inlineResult });
  } catch (error) {
    console.error("Error starting audit:", error);

    // Handle Zod validation errors
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data", details: error.message },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
