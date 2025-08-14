import { PrismaClient, RunStatus } from "@prisma/client";

// Ensure a single PrismaClient instance across hot reloads in dev
const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const dbHelpers = {
  async createRun(data: { id: string; pageUrl: string; targetKeyword?: string; email?: string; status?: string }) {
    await prisma.run.create({
      data: {
        id: data.id,
        pageUrl: data.pageUrl,
        targetKeyword: data.targetKeyword || null,
        email: data.email || null,
        status: (data.status as RunStatus) || RunStatus.queued
      }
    });
    return prisma.run.findUnique({ where: { id: data.id } });
  },

  async updateRunStatus(runId: string, status: string) {
    return prisma.run.update({ where: { id: runId }, data: { status: status as RunStatus } });
  },

  async getRun(runId: string) {
    return prisma.run.findUnique({ where: { id: runId } });
  },

  async getRunWithAudit(runId: string) {
    const run = await prisma.run.findUnique({ where: { id: runId }, include: { audits: true } });
    if (!run) return null as any;
    const audit = run.audits[0] || null;
    return {
      ...run,
      audit: audit
    } as any;
  },

  async getRunsByEmail(email: string, limit: number = 10, offset: number = 0) {
    const [runs, total] = await Promise.all([
      prisma.run.findMany({
        where: { email },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit
      }),
      prisma.run.count({ where: { email } })
    ]);

    const runIds = runs.map((r) => r.id);
    const audits = await prisma.audit.findMany({
      where: { runId: { in: runIds } },
      select: { runId: true }
    });
    const runIdHasAudit = new Set(audits.map((a) => a.runId));

    return {
      runs: runs.map((run) => ({
        ...run,
        hasResults: runIdHasAudit.has(run.id)
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    } as any;
  },

  async getRecentRuns() {
    const runs = await prisma.run.findMany({
      orderBy: { createdAt: "desc" },
      take: 10
    });
    return runs.map((run) => ({
      id: run.id,
      status: run.status,
      pageUrl: run.pageUrl,
      createdAt: run.createdAt
    }));
  },

  async createAudit(data: { id: string; runId: string; json: string }) {
    return prisma.audit.create({ data: { id: data.id, runId: data.runId, json: data.json } });
  }
};



