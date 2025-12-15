// Phase 9: Minimal in-memory cron scheduler using node-cron style (manual interval)
// NOTE: This resets each deployment / server restart. Acceptable for early phase.
// It scans RecurringAudit rows and triggers new audits when due.

import { prisma } from "./prisma";

let started = false;
let timer: NodeJS.Timeout | null = null;

// Compute next run time based on frequency
function computeNextRun(frequency: string, from: Date = new Date()): Date {
  const d = new Date(from);
  if (frequency === "DAILY") {
    d.setDate(d.getDate() + 1);
  } else if (frequency === "WEEKLY") {
    d.setDate(d.getDate() + 7);
  } else {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

async function scanAndTrigger() {
  try {
    // Naive distributed lock: attempt to update a singleton row's timestamp; if recently updated by another instance, skip.
    const lockKey = "cron-recurring-audits";
    const nowTs = Date.now();
    const lock = (await (prisma as any).kv?.upsert)
      ? await (prisma as any).kv.upsert({
          where: { key: lockKey },
          update: { value: JSON.stringify({ ts: nowTs }) },
          create: { key: lockKey, value: JSON.stringify({ ts: nowTs }) },
        })
      : null;
    if (lock) {
      // parse previous value if available to detect contention (best-effort)
      try {
        const prev = JSON.parse(lock.value || "{}");
        if (prev.ts && nowTs - prev.ts < 55_000) {
          // Another instance ran within last 55s, skip this tick.
          return;
        }
      } catch {}
    }
    const now = new Date();
    // fetch at most 10 due jobs per tick to avoid stampede
    const due = await (prisma as any).recurringAudit.findMany({
      where: { isActive: true, OR: [{ nextRunAt: { lte: now } }, { nextRunAt: null }] },
      take: 10,
      orderBy: { nextRunAt: "asc" },
    });
    for (const job of due) {
      const nextRunAt = computeNextRun(job.frequency, now);
      // update scheduling fields optimistically
      await (prisma as any).recurringAudit.update({
        where: { id: job.id },
        data: { lastRunAt: now, nextRunAt },
      });
      // Fire audit (internal fetch) - fire and forget
      (async () => {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/seo-audit/start`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: job.url }),
          });
          // Optionally log
          console.log("[cron] Triggered audit for", job.url);
        } catch (err) {
          console.error("[cron] Failed to trigger audit", job.url, err);
        }
      })();
    }
  } catch (err) {
    console.error("[cron] scanAndTrigger error", err);
  }
}

export function initCronScheduler() {
  if (started) return;
  started = true;
  // initial delay to allow server warmup
  setTimeout(() => {
    scanAndTrigger();
    timer = setInterval(scanAndTrigger, 60 * 1000); // every minute
  }, 5000);
  console.log("[cron] scheduler initialized");
}

// For hot reload in dev, avoid duplicate intervals
if (process.env.NODE_ENV !== "production") {
  // @ts-ignore
  if (!global.__CRON_INIT__) {
    initCronScheduler();
    // @ts-ignore
    global.__CRON_INIT__ = true;
  }
} else {
  initCronScheduler();
}
