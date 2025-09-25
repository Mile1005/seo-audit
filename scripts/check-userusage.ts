import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient()
  const tables = await prisma.$queryRawUnsafe<any[]>("SELECT name FROM sqlite_master WHERE type='table' AND name='UserUsage'")
  console.log('UserUsage table exists?', tables.length > 0)
  if (tables.length === 0) {
    console.log('Creating table manually (should not normally be needed) ...')
    await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "UserUsage" (
      "userId" TEXT PRIMARY KEY,
      "auditsThisMonth" INTEGER DEFAULT 0,
      "siteCrawlsThisMonth" INTEGER DEFAULT 0,
      "monthKey" TEXT NOT NULL,
      "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
      "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
    );`)
    console.log('Created fallback UserUsage table. Run prisma db push afterwards to align schema.')
  }
  await prisma.$disconnect()
}

main().catch(e=>{console.error(e); process.exit(1)})
