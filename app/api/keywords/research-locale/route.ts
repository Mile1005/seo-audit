/**
 * EXAMPLE: Locale-aware Keyword Research API
 * Shows how to handle 1100+ keyword ideas with localization
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getLocaleFromHeaders,
  getServerTranslations,
  formatNumber,
  formatCurrency,
} from "@/lib/i18n-server";
import { safeGetWithLocale, safeSetWithLocale } from "@/lib/redis";
import { createUserNotification } from "@/lib/server/notifications";

/**
 * POST /api/keywords/research-locale
 * Generate keyword ideas with locale-specific formatting
 */
export async function POST(request: NextRequest) {
  try {
    const locale = getLocaleFromHeaders(request.headers);
    const body = await request.json();
    const { seedKeyword, country = "US" } = body;

    console.log(`[Keywords API] Research for "${seedKeyword}" in ${country} (locale: ${locale})`);

    const session = await auth();
    const userId = session?.user?.id;

    // 1. Check cache with locale
    const cacheKey = `keywords:${seedKeyword}:${country}`;
    const cached = await safeGetWithLocale(cacheKey, locale);

    if (cached) {
      await createUserNotification({
        userId,
        type: "REPORT_READY",
        title: "Keyword research ready",
        message: `Keyword research for "${seedKeyword}" is ready (cached).`,
        data: {
          seedKeyword,
          country,
          cached: true,
          href: "/dashboard/keywords",
        },
      });

      return NextResponse.json({
        cached: true,
        locale,
        data: JSON.parse(cached),
      });
    }

    // 2. Generate/fetch keywords (mock data for example)
    const keywords = generateMockKeywords(seedKeyword, 1100);

    // 3. Format numbers according to locale
    const formattedKeywords = keywords.map((kw) => ({
      ...kw,
      searchVolume: formatNumber(kw.searchVolume, locale),
      competition: formatNumber(kw.competition, locale, {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
      // CPC in local currency
      cpc: formatCurrency(kw.cpc, locale, getCurrencyForCountry(country)),
    }));

    // 4. Get translated labels
    const t = await getServerTranslations(locale);

    const result = {
      seedKeyword,
      country,
      locale,
      totalKeywords: formattedKeywords.length,
      keywords: formattedKeywords,
      labels: {
        searchVolume: t("keywords.search_volume" as any),
        competition: t("keywords.competition" as any),
        cpc: t("keywords.cpc" as any),
        difficulty: t("keywords.difficulty" as any),
        trend: t("keywords.trend" as any),
      },
      generatedAt: new Date().toISOString(),
    };

    // 5. Cache result with locale
    await safeSetWithLocale(cacheKey, locale, JSON.stringify(result), 3600); // 1 hour

    await createUserNotification({
      userId,
      type: "REPORT_READY",
      title: "Keyword research ready",
      message: `Generated ${result.totalKeywords} keyword ideas for "${seedKeyword}".`,
      data: {
        seedKeyword,
        country,
        totalKeywords: result.totalKeywords,
        href: "/dashboard/keywords",
      },
    });

    return NextResponse.json(result);
  } catch (error: any) {
    const locale = getLocaleFromHeaders(request.headers);
    const t = await getServerTranslations(locale);

    return NextResponse.json(
      {
        error: t("errors.keyword_research_failed" as any),
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/keywords/ranking-alert
 * Send ranking alert notification in user's language
 */
export async function POST_RANKING_ALERT(request: NextRequest) {
  try {
    const locale = getLocaleFromHeaders(request.headers);
    const body = await request.json();
    const { keyword, oldPosition, newPosition, url, email } = body;

    // Calculate position change
    const change = oldPosition - newPosition;
    const changeType = change > 0 ? "improved" : "declined";

    // Get localized notification
    const t = await getServerTranslations(locale);

    const notification = {
      title: t(`notifications.ranking_${changeType}.title` as any),
      message: t(`notifications.ranking_${changeType}.message` as any, {
        keyword,
        oldPosition,
        newPosition,
        change: Math.abs(change),
        url,
      }),
      locale,
    };

    // In production, send email notification here
    // await sendEmail(email, notification.title, notification.message, locale);

    return NextResponse.json({
      success: true,
      notification,
      locale,
    });
  } catch (error: any) {
    const locale = getLocaleFromHeaders(request.headers);
    const t = await getServerTranslations(locale);

    return NextResponse.json(
      {
        error: t("errors.notification_failed" as any),
      },
      { status: 500 }
    );
  }
}

// Helper functions

function generateMockKeywords(seed: string, count: number) {
  const keywords = [];
  for (let i = 0; i < count; i++) {
    keywords.push({
      keyword: `${seed} ${i + 1}`,
      searchVolume: Math.floor(Math.random() * 10000) + 100,
      competition: Math.random(),
      cpc: Math.random() * 5 + 0.5,
      difficulty: Math.floor(Math.random() * 100),
      trend: Math.random() > 0.5 ? "up" : "down",
    });
  }
  return keywords;
}

function getCurrencyForCountry(country: string): string {
  const currencyMap: Record<string, string> = {
    US: "USD",
    GB: "GBP",
    EU: "EUR",
    ES: "EUR",
    FR: "EUR",
    DE: "EUR",
    IT: "EUR",
    JP: "JPY",
    CA: "CAD",
    AU: "AUD",
    BR: "BRL",
    MX: "MXN",
    IN: "INR",
    ID: "IDR",
  };
  return currencyMap[country] || "USD";
}
