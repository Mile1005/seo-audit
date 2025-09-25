import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// Helper type guards (Phase 4 persistence) - ensures models exist at runtime even if TS lags regeneration
export const hasAuditRunModel = (prisma as any).auditRun !== undefined
export const hasAuditIssueSnapshotModel = (prisma as any).auditIssueSnapshot !== undefined

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
