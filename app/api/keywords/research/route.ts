import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import type { KeywordDevice, KeywordResult } from "@/types/keywords";
import { runFreeKeywordResearch } from "@/lib/keyword-research/freeKeywordResearch";
import { checkRateLimit } from "@/lib/rate-limit";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  keywords: z.array(z.string()).optional(),
  keyword: z.string().optional(),
  projectId: z.string().optional(),
  location: z.string().default("US"),
  language: z.string().default("en"),
  device: z.enum(["DESKTOP", "MOBILE"]).default("DESKTOP"),
  domain: z.string().optional(),
});

type KeywordStore = Map<string, KeywordResult[]>;

const globalForKeywordStore = globalThis as unknown as {
  __keywordStore?: KeywordStore;
};

const keywordStore: KeywordStore = globalForKeywordStore.__keywordStore ?? new Map();
if (process.env.NODE_ENV !== "production") globalForKeywordStore.__keywordStore = keywordStore;

function getKeywordList(body: z.infer<typeof bodySchema>): string[] {
  const list = Array.isArray(body.keywords) ? body.keywords : [];
  const legacy = body.keyword ? [body.keyword] : [];
  return [...list, ...legacy]
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 20);
}

function dbEnabled() {
  // If DATABASE_URL isn't set, Prisma queries will fail at runtime.
  return Boolean(process.env.DATABASE_URL);
}

function normalizeDomain(input: string): string {
  const trimmed = input.trim().toLowerCase();
  const withoutProtocol = trimmed.replace(/^https?:\/\//, "");
  const withoutPath = withoutProtocol.split("/")[0] ?? "";
  return withoutPath.replace(/\.+$/, (m) => m); // no-op but keeps intent obvious
}

async function assertProjectOwnership(params: {
  projectId: string;
  userId: string;
}): Promise<boolean> {
  const project = await prisma.project.findFirst({
    where: {
      id: params.projectId,
      ownerId: params.userId,
    },
    select: { id: true },
  });

  return Boolean(project);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        {
          success: false,
          error: "Project ID is required",
        },
        { status: 400 }
      );
    }

    const session = await auth().catch(() => null);
    const userId = session?.user?.id;

    // If not authenticated, never read from DB. Only return demo/in-memory results.
    if (!userId || !dbEnabled()) {
      const cached = keywordStore.get(projectId) ?? [];
      return NextResponse.json({
        success: true,
        data: {
          keywords: cached,
        },
      });
    }

    const allowed = await assertProjectOwnership({ projectId, userId });
    if (!allowed) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    const keywords = await prisma.keyword.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: {
        keywords: keywords.map((k) => ({
          id: k.id,
          keyword: k.keyword,
          searchVolume: k.searchVolume ?? 0,
          difficulty: k.difficulty ?? 0,
          cpc: k.cpc ?? 0,
          competition: k.competition ?? 0,
          intent: (k.intent ?? "UNKNOWN") as any,
          status: (k.status ?? "ACTIVE") as any,
          country: k.country,
          device: k.device as any,
          createdAt: k.createdAt.toISOString(),
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching keywords:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch keywords",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const ipHeader = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip");
    const ip = (ipHeader ?? "unknown").split(",")[0]?.trim() || "unknown";

    const session = await auth().catch(() => null);
    const userId = session?.user?.id;
    const rateKey = userId ? `user:${userId}` : `ip:${ip}`;
    const limit = userId ? 50 : 5;
    const windowMs = 24 * 60 * 60 * 1000;

    const rate = checkRateLimit({ key: rateKey, limit, windowMs });
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Rate limit exceeded for free keyword research. Please try again later or create an account.",
        },
        {
          status: 429,
          headers: rate.retryAfterSeconds
            ? {
                "Retry-After": String(rate.retryAfterSeconds),
              }
            : undefined,
        }
      );
    }

    const rawBody: unknown = await request.json();
    const body = bodySchema.parse(rawBody);

    let projectId = body.projectId;
    if (projectId && userId && dbEnabled()) {
      const allowed = await assertProjectOwnership({ projectId, userId });
      if (!allowed) {
        return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
      }
    }

    // If logged in but no projectId provided, attach to a sensible project.
    if (!projectId && userId && dbEnabled()) {
      const normalizedDomain = body.domain ? normalizeDomain(body.domain) : "";

      if (normalizedDomain) {
        const existing = await prisma.project.findFirst({
          where: { ownerId: userId, domain: normalizedDomain },
          select: { id: true },
        });

        if (existing) {
          projectId = existing.id;
        } else {
          const created = await prisma.project.create({
            data: {
              ownerId: userId,
              domain: normalizedDomain,
              name: normalizedDomain,
              status: "ACTIVE" as any,
            },
            select: { id: true },
          });
          projectId = created.id;
        }
      } else {
        const mostRecent = await prisma.project.findFirst({
          where: { ownerId: userId },
          orderBy: { createdAt: "desc" },
          select: { id: true },
        });
        if (mostRecent) {
          projectId = mostRecent.id;
        }
      }
    }

    // Demo/fallback when logged out or no DB projects exist.
    if (!projectId) projectId = "demo-keyword-project";
    const location = body.location;
    const language = body.language;
    const device = body.device as KeywordDevice;
    const domain = body.domain;

    const keywordList = getKeywordList(body);

    if (!keywordList.length) {
      return NextResponse.json(
        { success: false, error: "At least one keyword is required" },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      keywordList.map((kw) =>
        runFreeKeywordResearch({
          keyword: kw,
          location,
          language,
          device,
          projectId,
          domain,
        })
      )
    );

    let persisted: KeywordResult[] = results;

    // Persist only when authenticated and DB is configured.
    if (userId && dbEnabled()) {
      try {
        const project = await prisma.project.findFirst({
          where: { id: projectId, ownerId: userId },
        });
        if (project) {
          const saved = await Promise.all(
            results.map(async (r) => {
              const savedKeyword = await prisma.keyword.upsert({
                where: {
                  keyword_projectId_country_device: {
                    keyword: r.keyword,
                    projectId,
                    country: location,
                    device: device as any,
                  },
                },
                update: {
                  searchVolume: r.searchVolume,
                  difficulty: r.difficulty,
                  cpc: r.cpc,
                  competition: r.competition,
                  intent: r.intent as any,
                  lastChecked: new Date(),
                  trend: r.trend as any,
                },
                create: {
                  projectId,
                  keyword: r.keyword,
                  country: location,
                  language,
                  device: device as any,
                  searchVolume: r.searchVolume,
                  difficulty: r.difficulty,
                  cpc: r.cpc,
                  competition: r.competition,
                  intent: r.intent as any,
                  status: "ACTIVE" as any,
                  lastChecked: new Date(),
                  trend: r.trend as any,
                },
              });

              return {
                ...r,
                id: savedKeyword.id,
                createdAt: savedKeyword.createdAt.toISOString(),
              };
            })
          );
          persisted = saved;
        }
      } catch (err) {
        console.error("[keywords/research] DB persist failed, falling back to memory", err);
      }
    }

    // Store in-memory for free/demo usage (and as DB fallback)
    const existing = keywordStore.get(projectId) ?? [];
    keywordStore.set(projectId, [...persisted, ...existing]);

    return NextResponse.json({
      success: true,
      data: {
        projectId,
        keywords: persisted,
        totalResults: persisted.length,
        searchTime: "0.20s",
      },
    });
  } catch (error) {
    console.error("Error in keyword research:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to research keywords",
      },
      { status: 500 }
    );
  }
}
