// Lazy-load Prisma only when needed so deployments without DB don't require it
type PrismaClientType = any;
let prismaInstance: PrismaClientType | undefined;

async function getPrisma(): Promise<PrismaClientType> {
  if (!prismaInstance) {
    const prismaModule = await import("@prisma/client");
    const PrismaClient = (prismaModule as any).PrismaClient || (prismaModule as any).default?.PrismaClient;
    const globalForPrisma = global as unknown as { prisma?: PrismaClientType };
    prismaInstance = globalForPrisma.prisma ?? new PrismaClient();
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaInstance;
  }
  return prismaInstance as PrismaClientType;
}

export const dbHelpers = {
  async createRun(data: {
    id: string;
    pageUrl: string;
    targetKeyword?: string;
    email?: string;
    status?: string;
  }) {
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

  async updateRunStatus(runId: string, status: string) {
    const prisma = await getPrisma();
    return prisma.run.update({ where: { id: runId }, data: { status: status as any } });
  },

  async getRun(runId: string) {
    const prisma = await getPrisma();
    return prisma.run.findUnique({ where: { id: runId } });
  },

  async getRunWithAudit(runId: string) {
    const prisma = await getPrisma();
    const run = await prisma.run.findUnique({
      where: { id: runId },
      include: { audits: { orderBy: { createdAt: "desc" }, take: 1 } },
    });
    if (!run) return null as any;
    const audit = run.audits[0] || null;
    return {
      ...run,
      audit: audit,
    } as any;
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
