// Lazy-load Prisma only when needed so deployments without DB don't require it
import { PrismaClient, type Run, type Audit, type Prisma } from '@prisma/client';

// Synchronous Prisma client for NextAuth and other sync consumers
let prismaInstance: PrismaClient | undefined = undefined;
export function getPrismaSync(): PrismaClient {
  if (!prismaInstance) {
    const globalForPrisma = global as typeof global & { prisma?: PrismaClient };
    prismaInstance = globalForPrisma.prisma ?? new PrismaClient();
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaInstance;
  }
  return prismaInstance;
}

// Async version for other consumers (kept for compatibility)
export async function getPrisma(): Promise<PrismaClient> {
  return getPrismaSync();
}

export const dbHelpers = {
  async createRun(data: {
    id: string;
    pageUrl: string;
    targetKeyword?: string;
    email?: string;
    status?: string;
  }): Promise<Run | null> {
    const prisma = await getPrisma();
    await prisma.run.create({
      data: {
        id: data.id,
        pageUrl: data.pageUrl,
        targetKeyword: data.targetKeyword || null,
        email: data.email || null,
        status: (data.status as any) || "queued",
      },
    });
    return prisma.run.findUnique({ where: { id: data.id } });
  },

  async updateRunStatus(runId: string, status: string): Promise<Run> {
    const prisma = await getPrisma();
    return prisma.run.update({ where: { id: runId }, data: { status: status as any } });
  },

  async getRun(runId: string): Promise<Run | null> {
    const prisma = await getPrisma();
    return prisma.run.findUnique({ where: { id: runId } });
  },

  async getRunWithAudit(runId: string): Promise<(Omit<Run, 'audits'> & { audits: Audit[]; audit: Audit | null }) | null> {
    const prisma = await getPrisma();
    const run = await prisma.run.findUnique({
      where: { id: runId },
      include: { audits: { orderBy: { createdAt: "desc" }, take: 1 } },
    });
    if (!run) return null;
    const audit: Audit | null = run.audits && run.audits.length > 0 ? run.audits[0] : null;
    return {
      ...run,
      audit,
    };
  },

  async getRunsByEmail(email: string, limit: number = 10, offset: number = 0) {
    const prisma = await getPrisma();
    const [runs, total] = await Promise.all([
      prisma.run.findMany({
        where: { email },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      }),
      prisma.run.count({ where: { email } }),
    ]);

    const runIds = runs.map((r: any) => r.id);
    const audits = await prisma.audit.findMany({
      where: { runId: { in: runIds } },
      select: { runId: true },
    });
    const runIdHasAudit = new Set(audits.map((a: any) => a.runId));

    return {
      runs: runs.map((run: any) => ({
        ...run,
        hasResults: runIdHasAudit.has(run.id),
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    } as any;
  },

  async saveAudit(data: { id: string; runId: string; json: unknown }) {
    const prisma = await getPrisma();
    // Prisma's Json field requires a value that can be serialized to JSON
    // If the value is not a string/number/boolean/null/object/array, this will throw
  // @ts-expect-error: Prisma InputJsonValue type is too strict, but this is safe and works at runtime
  return prisma.audit.create({ data: { id: data.id, runId: data.runId, json: data.json as any } });
  },

  async getAuditByRunId(runId: string) {
    const prisma = await getPrisma();
    return await prisma.audit.findFirst({
      where: { runId },
      orderBy: { createdAt: "desc" },
    });
  },

  async getRecentRuns() {
    const prisma = await getPrisma();
    return prisma.run.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        status: true,
        pageUrl: true,
        createdAt: true,
      },
    });
  },
};
