import { PrismaClient, type Audit, type User, type Prisma } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database facade with async operations isolated
export class DB {
  // Audit operations
  async createAudit(data: {
    id: string;
    runId: string;
    json: any;
    projectId?: string;
    createdBy?: string;
  }): Promise<Audit | null> {
    try {
      return await prisma.audit.create({
        data: {
          id: data.id,
          runId: data.runId,
          json: data.json,
          projectId: data.projectId || null,
          createdBy: data.createdBy || null,
        },
      });
    } catch {
      return null;
    }
  }

  async getAudit(id: string): Promise<Audit | null> {
    return prisma.audit.findUnique({ 
      where: { id },
      include: { user: true }
    });
  }

  async getAuditsByUser(userId: string, limit = 10): Promise<Audit[]> {
    return prisma.audit.findMany({
      where: { createdBy: userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getRecentAudits(limit = 10): Promise<Audit[]> {
    return prisma.audit.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { user: true }
    });
  }

  async deleteAudit(id: string): Promise<boolean> {
    try {
      await prisma.audit.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async updateAudit(id: string, data: {
    json?: any;
  }): Promise<Audit | null> {
    try {
      return await prisma.audit.update({
        where: { id },
        data: {
          json: data.json,
        },
      });
    } catch {
      return null;
    }
  }

  // User operations
  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
      include: { audits: true }
    });
  }

  async getUserAuditStats(userId: string) {
    const totalAudits = await prisma.audit.count({ 
      where: { createdBy: userId } 
    });

    return {
      totalAudits,
      averageScore: null, // Score is no longer in the schema
    };
  }
}

export const db = new DB();
