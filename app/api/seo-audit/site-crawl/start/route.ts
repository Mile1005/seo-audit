import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  initCrawl,
  updateCrawl,
  completeCrawl,
  failCrawl,
  getCrawl,
} from "../../../../../lib/server/crawl-store";
import { enforceQuota, incrementUsage } from "../../../../../lib/server/quota";
import { auth } from "../../../../../auth";
import { lightPageAudit } from "../../../../../lib/server/light-page-audit";
import { performComprehensiveAudit } from "../../../../../lib/comprehensive-audit";
import { prisma } from "../../../../../lib/prisma";
import * as cheerio from "cheerio";
import { createUserNotification } from "@/lib/server/notifications";

interface QueueItem {
  url: string;
  depth: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    let { url, maxPages = 20, maxDepth = 2 } = body;
    if (!url) return NextResponse.json({ error: "url required" }, { status: 400 });
    if (!/^https?:\/\//.test(url)) url = "https://" + url;
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "invalid url" }, { status: 400 });
    }
    maxPages = Math.min(200, Math.max(1, maxPages));
    maxDepth = Math.min(5, Math.max(0, maxDepth));

    const session = await auth();
    const userId = session?.user?.id;
    if (userId) {
      const quota = await enforceQuota(userId, "SITE_CRAWL");
      if (!quota.allowed) {
        return NextResponse.json({ error: quota.reason, upgrade: quota.upgrade }, { status: 402 });
      }
    }

    const id = crypto.randomUUID();
    initCrawl(id, { rootUrl: url, maxPages, maxDepth, ownerId: userId || undefined });

    // Persist initial Crawl DB record (associate with or create a project for this domain if user present)
    let crawlDbId: string | null = null;
    if (userId) {
      try {
        const hostname = new URL(url).hostname;
        // find or create project for this domain owned by user
        let project = await (prisma as any).project.findFirst({
          where: { ownerId: userId, domain: hostname },
        });
        if (!project) {
          project = await (prisma as any).project.create({
            data: { ownerId: userId, name: hostname, domain: hostname },
          });
        }
        const crawl = await (prisma as any).crawl.create({
          data: {
            projectId: project.id,
            startUrl: url,
            status: "QUEUED",
            pages: 0,
            errors: 0,
            settings: { maxPages, maxDepth },
          },
        });
        crawlDbId = crawl.id;
      } catch (e) {
        console.warn("[crawl] failed to persist initial crawl record", e);
      }
    }

    (async () => {
      try {
        const origin = new URL(url).origin;
        const visited = new Set<string>();
        const queue: QueueItem[] = [{ url, depth: 0 }];
        const pages: { url: string; html: string; status: number }[] = [];
        let rootComprehensiveAttached = false;
        while (queue.length && pages.length < maxPages) {
          const currentJob = getCrawl(id);
          if (currentJob?.cancelled) break;
          const { url: current, depth } = queue.shift()!;
          if (visited.has(current)) continue;
          visited.add(current);
          let status = 0;
          let html = "";
          try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 12000);
            const res = await fetch(current, {
              signal: controller.signal,
              headers: { "User-Agent": "Mozilla/5.0 (compatible; SEO-Audit-Crawler/1.0)" },
            });
            clearTimeout(timeout);
            status = res.status;
            if (res.ok) {
              html = await res.text();
              pages.push({ url: current, html, status });
            }
          } catch (err) {
            updateCrawl(id, (job) => {
              job.pages.push({
                url: current,
                status: status || 0,
                fetchedAt: new Date().toISOString(),
                error: (err as any)?.message,
              });
              job.processed++;
            });
            continue;
          }

          // lightweight audit each page; for root page also perform comprehensive audit for richer summary
          try {
            const result = lightPageAudit(html, origin);
            let comprehensiveSummary: any = undefined;
            if (!rootComprehensiveAttached) {
              try {
                const full = await performComprehensiveAudit(html, current);
                comprehensiveSummary = {
                  scores: full.scores,
                  stats: full.stats,
                  h_tags: full.h_tags,
                  social_meta: full.social_meta,
                  accessibility: full.accessibility,
                  indexability: full.indexability,
                  seo_checks: full.seo_checks,
                  performance_metrics: full.performance_metrics,
                };
                rootComprehensiveAttached = true;
              } catch (err) {
                console.warn("[crawl] comprehensive root audit failed", (err as any)?.message);
              }
            }
            updateCrawl(id, (job) => {
              job.pages.push({
                url: current,
                status,
                fetchedAt: new Date().toISOString(),
                title: result.title,
                metaDescription: result.metaDescription,
                wordCount: result.wordCount,
                h1Count: result.h1Count,
                h2Count: result.h2Count,
                images: result.images,
                imagesWithoutAlt: result.imagesWithoutAlt,
                internalLinkCount: result.internalLinkCount,
                ...(comprehensiveSummary ? { comprehensive: comprehensiveSummary } : {}),
              });
              job.processed = job.pages.length;
            });
          } catch (err) {
            updateCrawl(id, (job) => {
              job.pages.push({
                url: current,
                status,
                fetchedAt: new Date().toISOString(),
                error: (err as any)?.message,
              });
              job.processed = job.pages.length;
            });
          }

          // enhanced link extraction with cheerio capturing rel/nofollow and canonical reference
          if (depth < maxDepth && html) {
            try {
              const $ = cheerio.load(html);
              const candidate = new Set<string>();
              $("a[href]").each((_, el) => {
                const href = $(el).attr("href") || "";
                if (
                  !href ||
                  href.startsWith("#") ||
                  href.startsWith("mailto:") ||
                  href.startsWith("javascript:")
                )
                  return;
                try {
                  const u = new URL(href, origin);
                  if (u.origin === origin) candidate.add(u.toString().split("#")[0]);
                } catch {
                  /* ignore */
                }
              });
              const canonical = $('link[rel="canonical"]').attr("href");
              if (canonical) {
                try {
                  const cu = new URL(canonical, origin);
                  if (cu.origin === origin) candidate.add(cu.toString().split("#")[0]);
                } catch {}
              }
              for (const link of candidate) {
                if (visited.has(link)) continue;
                if (queue.length + pages.length >= maxPages) break;
                queue.push({ url: link, depth: depth + 1 });
              }
            } catch {
              /* fallback to previous extraction skipped */
            }
          }
          updateCrawl(id, (job) => {
            job.queued = queue.length;
          });
        }

        completeCrawl(id);
        if (userId) incrementUsage(userId, "SITE_CRAWL").catch(() => {});

        await createUserNotification({
          userId,
          type: "REPORT_READY",
          title: "Crawl completed",
          message: `Site crawl finished for ${new URL(url).hostname}.`,
          data: {
            crawlId: id,
            href: "/dashboard/page-crawler",
          },
        });

        // finalize DB record
        if (crawlDbId) {
          try {
            const job = getCrawl(id);
            if (job) {
              await (prisma as any).crawl.update({
                where: { id: crawlDbId },
                data: {
                  status:
                    job.status === "completed"
                      ? "COMPLETED"
                      : job.status === "failed"
                        ? "FAILED"
                        : "QUEUED",
                  pages: job.pages.length,
                  results: {
                    pages: job.pages.map((p) => ({
                      url: p.url,
                      status: p.status,
                      title: p.title,
                      h1Count: p.h1Count,
                      h2Count: p.h2Count,
                      wordCount: p.wordCount,
                      images: p.images,
                      imagesWithoutAlt: p.imagesWithoutAlt,
                      internalLinkCount: p.internalLinkCount,
                      comprehensive: (p as any).comprehensive ? true : false,
                    })),
                    summary: job.summary,
                    rootComprehensive:
                      job.pages.find((p) => (p as any).comprehensive)?.comprehensive || null,
                  },
                  completedAt: new Date(),
                },
              });
            }
          } catch (e) {
            console.warn("[crawl] failed to finalize crawl persistence", e);
          }
        }
      } catch (err: any) {
        failCrawl(id, err.message || "crawl failed");

        await createUserNotification({
          userId,
          type: "SYSTEM_ALERT",
          title: "Crawl failed",
          message: `Site crawl failed for ${(() => {
            try {
              return new URL(url).hostname;
            } catch {
              return url;
            }
          })()}: ${err?.message || "Unknown error"}`,
          data: {
            crawlId: id,
            href: "/dashboard/page-crawler",
          },
        });

        if (crawlDbId) {
          try {
            await (prisma as any).crawl.update({
              where: { id: crawlDbId },
              data: { status: "FAILED", errors: { increment: 1 } },
            });
          } catch {}
        }
      }
    })();

    return NextResponse.json({ id, status: "processing" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "internal error" }, { status: 500 });
  }
}
