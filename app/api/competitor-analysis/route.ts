import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";
import { enforceQuota, incrementUsage } from "../../../lib/server/quota";
import { getLocaleFromHeaders, translateError } from "@/lib/i18n-server";

export async function POST(request: NextRequest) {
  try {
    const locale = getLocaleFromHeaders(request.headers);
    const body = await request.json();
    const { targetUrl, competitorUrls, keywords } = body;

    const session = await auth();
    const userId = session?.user?.id;

    if (userId) {
      try {
        const user = await (
          await import("../../../lib/prisma")
        ).prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
          console.warn("Skipping quota enforcement: user id not found in DB", userId);
        } else {
          const quota = await enforceQuota(userId, "AUDIT");
          if (!quota.allowed) {
            return NextResponse.json(
              { success: false, error: quota.reason, upgrade: quota.upgrade },
              { status: 402 }
            );
          }
        }
      } catch (e) {
        console.warn("Quota/user existence check failed, allowing analysis", e);
      }
    }

    // Validate required fields
    if (!targetUrl || !competitorUrls || competitorUrls.length === 0) {
      const msg = await translateError("missing_competitor_data", locale);
      return NextResponse.json({ success: false, error: msg }, { status: 400 });
    }

    // Normalize URLs
    const normalizedTargetUrl = targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`;
    const normalizedCompetitorUrls = competitorUrls.map((url: string) =>
      url.startsWith("http") ? url : `https://${url}`
    );

    // Mock competitor analysis data (in a real implementation, this would call external APIs)
    const analysisResults = {
      targetUrl: normalizedTargetUrl,
      competitors: normalizedCompetitorUrls,
      analysis: {
        serpComparison: generateSerpComparison(keywords || ["seo audit tool", "website analyzer"]),
        gapAnalysis: generateGapAnalysis(normalizedTargetUrl, normalizedCompetitorUrls),
        backlinkAnalysis: generateBacklinkAnalysis(normalizedTargetUrl, normalizedCompetitorUrls),
        contentAnalysis: generateContentAnalysis(normalizedTargetUrl, normalizedCompetitorUrls),
        technicalAnalysis: generateTechnicalAnalysis(normalizedTargetUrl, normalizedCompetitorUrls),
      },
      generatedAt: new Date().toISOString(),
    };

    // Increment usage if user is authenticated
    if (userId) {
      try {
        await incrementUsage(userId, "AUDIT");
      } catch (e) {
        console.warn("Failed to increment usage", e);
      }
    }

    return NextResponse.json({
      success: true,
      data: analysisResults,
    });
  } catch (error) {
    console.error("Competitor analysis error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

function generateSerpComparison(keywords: string[]) {
  return keywords.map((keyword) => ({
    keyword,
    yourRank: Math.floor(Math.random() * 20) + 1,
    yourChange: Math.floor(Math.random() * 10) - 5,
    competitors: [
      {
        name: "semrush.com",
        rank: Math.floor(Math.random() * 5) + 1,
        change: Math.floor(Math.random() * 6) - 3,
      },
      {
        name: "ahrefs.com",
        rank: Math.floor(Math.random() * 5) + 1,
        change: Math.floor(Math.random() * 6) - 3,
      },
      {
        name: "screaming-frog.co.uk",
        rank: Math.floor(Math.random() * 5) + 1,
        change: Math.floor(Math.random() * 6) - 3,
      },
      {
        name: "sitechecker.pro",
        rank: Math.floor(Math.random() * 5) + 1,
        change: Math.floor(Math.random() * 6) - 3,
      },
    ],
    volume: Math.floor(Math.random() * 50000) + 1000,
    difficulty: Math.floor(Math.random() * 100),
  }));
}

function generateGapAnalysis(targetUrl: string, competitorUrls: string[]) {
  return {
    keywordGaps: [
      {
        keyword: "free seo audit tool",
        competitorRank: 3,
        yourRank: null,
        volume: 18000,
        difficulty: 45,
        opportunity: "high",
      },
      {
        keyword: "website analyzer online",
        competitorRank: 5,
        yourRank: null,
        volume: 12100,
        difficulty: 52,
        opportunity: "medium",
      },
      {
        keyword: "technical seo checker",
        competitorRank: 2,
        yourRank: 8,
        volume: 8900,
        difficulty: 38,
        opportunity: "high",
      },
      {
        keyword: "site audit software",
        competitorRank: 4,
        yourRank: null,
        volume: 15600,
        difficulty: 61,
        opportunity: "medium",
      },
    ],
    contentGaps: [
      { type: "blog posts", count: 45, competitors: ["semrush.com", "ahrefs.com"] },
      { type: "case studies", count: 23, competitors: ["screaming-frog.co.uk"] },
      { type: "video content", count: 12, competitors: ["sitechecker.pro"] },
    ],
    backlinkGaps: [
      { domain: "moz.com", da: 85, competitors: ["semrush.com", "ahrefs.com"] },
      { domain: "searchengineland.com", da: 92, competitors: ["ahrefs.com"] },
      { domain: "seo-hacker.com", da: 67, competitors: ["semrush.com"] },
    ],
  };
}

function generateBacklinkAnalysis(targetUrl: string, competitorUrls: string[]) {
  return competitorUrls.map((url) => ({
    domain: url,
    totalBacklinks: Math.floor(Math.random() * 10000) + 1000,
    referringDomains: Math.floor(Math.random() * 500) + 50,
    domainAuthority: Math.floor(Math.random() * 50) + 50,
    anchorTexts: [
      { text: "seo audit", count: Math.floor(Math.random() * 100) + 10 },
      { text: "website analyzer", count: Math.floor(Math.random() * 80) + 5 },
      { text: "technical seo", count: Math.floor(Math.random() * 60) + 3 },
    ],
  }));
}

function generateContentAnalysis(targetUrl: string, competitorUrls: string[]) {
  return competitorUrls.map((url) => ({
    domain: url,
    totalPages: Math.floor(Math.random() * 5000) + 500,
    blogPosts: Math.floor(Math.random() * 1000) + 100,
    avgWordCount: Math.floor(Math.random() * 2000) + 500,
    contentTypes: {
      blog: Math.floor(Math.random() * 60) + 20,
      landing: Math.floor(Math.random() * 20) + 5,
      resource: Math.floor(Math.random() * 15) + 5,
      caseStudy: Math.floor(Math.random() * 10) + 2,
    },
  }));
}

function generateTechnicalAnalysis(targetUrl: string, competitorUrls: string[]) {
  return competitorUrls.map((url) => ({
    domain: url,
    pageSpeed: Math.floor(Math.random() * 30) + 70,
    mobileFriendly: Math.random() > 0.2,
    sslEnabled: Math.random() > 0.1,
    structuredData: Math.random() > 0.3,
    coreWebVitals: {
      lcp: Math.floor(Math.random() * 1000) + 2000,
      fid: Math.floor(Math.random() * 50) + 50,
      cls: Math.random() * 0.1,
    },
  }));
}
