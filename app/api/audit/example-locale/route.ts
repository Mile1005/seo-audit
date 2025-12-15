/**
 * EXAMPLE: Locale-aware API endpoint for SEO audits
 * This demonstrates how to integrate i18n with audit processing
 */

import { NextRequest, NextResponse } from "next/server";
import {
  getLocaleFromHeaders,
  getServerTranslations,
  translateError,
  translateNotification,
} from "@/lib/i18n-server";
import { safeGetWithLocale, safeSetWithLocale } from "@/lib/redis";
import type { Locale } from "@/i18n";

/**
 * POST /api/audit/start-with-locale
 * Start a new SEO audit with full locale support
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Extract locale from request
    const locale = getLocaleFromHeaders(request.headers);
    console.log(`[API] Starting audit with locale: ${locale}`);

    // 2. Parse request body
    const body = await request.json();
    const { url, targetKeyword, email } = body;

    // 3. Validate input with localized error messages
    if (!url || typeof url !== "string") {
      const errorMsg = await translateError("invalid_url", locale);
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    // 4. Check Redis cache with locale-specific key
    const cacheKey = `audit:${url}`;
    const cachedResult = await safeGetWithLocale(cacheKey, locale);

    if (cachedResult) {
      console.log(`[API] Cache hit for ${url} (locale: ${locale})`);
      return NextResponse.json({
        cached: true,
        locale,
        result: JSON.parse(cachedResult),
      });
    }

    // 5. Create audit job with locale
    // In your actual implementation, you would enqueue a BullMQ job here
    const jobData = {
      pageUrl: url,
      targetKeyword,
      email,
      locale, // <- IMPORTANT: Pass locale to worker
    };

    // Example: await auditQueue.add('process-audit', jobData);

    // 6. Get localized response message
    const t = await getServerTranslations(locale);

    return NextResponse.json({
      success: true,
      message: t("audit.started" as any),
      locale,
      jobData, // For demo purposes
    });
  } catch (error: any) {
    console.error("[API] Audit start error:", error);

    // Get locale for error message
    const locale = getLocaleFromHeaders(request.headers);
    const errorMsg = await translateError("internal_error", locale);

    return NextResponse.json({ error: errorMsg, details: error.message }, { status: 500 });
  }
}

/**
 * GET /api/audit/result-with-locale/:id
 * Get audit result with localized content
 */
export async function GET(request: NextRequest) {
  try {
    const locale = getLocaleFromHeaders(request.headers);
    const url = new URL(request.url);
    const auditId = url.searchParams.get("id");

    if (!auditId) {
      const errorMsg = await translateError("missing_audit_id", locale);
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    // Fetch audit result from database
    // const audit = await prisma.audit.findUnique({ where: { id: auditId } });

    // Example audit result
    const audit = {
      id: auditId,
      url: "https://example.com",
      score: 85,
      checks: [
        {
          id: "meta_title",
          passed: true,
          severity: "info",
        },
        {
          id: "h1_tag",
          passed: false,
          severity: "critical",
        },
      ],
      locale, // Stored locale from job
    };

    // Translate check names and descriptions
    const t = await getServerTranslations(locale);
    const translatedChecks = await Promise.all(
      audit.checks.map(async (check) => {
        try {
          return {
            ...check,
            name: t(`audit.checks.${check.id}.name` as any),
            description: t(`audit.checks.${check.id}.description` as any),
            recommendation: t(`audit.checks.${check.id}.recommendation` as any),
          };
        } catch (err) {
          // Fallback if translation missing
          return {
            ...check,
            name: check.id.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            description: `Check for ${check.id}`,
            recommendation: "Please review this check",
          };
        }
      })
    );

    return NextResponse.json({
      ...audit,
      checks: translatedChecks,
      locale,
    });
  } catch (error: any) {
    const locale = getLocaleFromHeaders(request.headers);
    const errorMsg = await translateError("internal_error", locale);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
