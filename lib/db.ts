import { PrismaClient, type Prisma } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database facade - Legacy audit functionality temporarily disabled
// Will be re-enabled once new schema is fully implemented
export class DB {
  // Note: All audit operations temporarily disabled due to schema migration
  // The new schema uses different models and relationships
  
  async createAudit(data: any): Promise<any | null> {
    console.warn('Legacy audit creation temporarily disabled')
    return null;
  }

  async getAudit(id: string): Promise<any | null> {
    console.warn('Legacy audit retrieval temporarily disabled')
    return null;
  }

  async getAuditsByUser(userId: string, limit = 10): Promise<any[]> {
    console.warn('Legacy audit listing temporarily disabled')
    return [];
  }

  async getAllAudits(): Promise<any[]> {
    console.warn('Legacy audit listing temporarily disabled')
    return [];
  }

  async deleteAudit(id: string): Promise<boolean> {
    console.warn('Legacy audit deletion temporarily disabled')
    return false;
  }

  async deleteAuditsByUser(userId: string): Promise<boolean> {
    console.warn('Legacy audit bulk deletion temporarily disabled')
    return false;
  }
}

export const db = new DB();
