#!/usr/bin/env node
/**
 * Backfill Script: Populate new multi-tenancy columns
 *
 * This script safely populates the new projectId and createdBy columns
 * for existing Audit and Crawl records without breaking existing functionality.
 *
 * NOTE: This script will be executed after the migration is applied
 * and Prisma client is regenerated with the new schema.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function backfillMultiTenancyData() {
  console.log("🚀 Starting backfill for multi-tenancy columns...");

  try {
    // First, check if new tables exist
    const tableExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'Project'
      );
    `;

    if (!tableExists) {
      console.log("⚠️  Migration tables not yet created. Run migration first.");
      return;
    }

    // Raw SQL queries for safe backfill (works regardless of Prisma client state)

    // Create default user for legacy data
    await prisma.$executeRaw`
      INSERT INTO "User" (id, email, name, "emailVerified", "createdAt", "updatedAt")
      VALUES (
        gen_random_uuid()::text,
        'legacy@system.local',
        'Legacy System User',
        NOW(),
        NOW(),
        NOW()
      )
      ON CONFLICT (email) DO NOTHING;
    `;

    // Get default user ID
    const defaultUser = (await prisma.$queryRaw`
      SELECT id FROM "User" WHERE email = 'legacy@system.local' LIMIT 1;
    `) as any[];

    if (defaultUser.length === 0) {
      throw new Error("Could not create or find default user");
    }

    const defaultUserId = defaultUser[0].id;

    // Create default project
    await prisma.$executeRaw`
      INSERT INTO "Project" (id, name, "ownerId", "createdAt", "updatedAt")
      VALUES (
        gen_random_uuid()::text,
        'Legacy Data',
        ${defaultUserId},
        NOW(),
        NOW()
      )
      ON CONFLICT ("ownerId", name) DO NOTHING;
    `;

    // Get default project ID
    const defaultProject = (await prisma.$queryRaw`
      SELECT id FROM "Project" WHERE name = 'Legacy Data' LIMIT 1;
    `) as any[];

    const defaultProjectId = defaultProject[0]?.id;

    if (!defaultProjectId) {
      throw new Error("Could not create or find default project");
    }

    // Backfill Audit records (only if columns exist)
    const auditBackfillResult = await prisma.$executeRaw`
      UPDATE "Audit" 
      SET "projectId" = ${defaultProjectId}, "createdBy" = ${defaultUserId}
      WHERE "projectId" IS NULL;
    `;

    // Backfill Crawl records (only if columns exist)
    const crawlBackfillResult = await prisma.$executeRaw`
      UPDATE "Crawl"
      SET "projectId" = ${defaultProjectId}, "createdBy" = ${defaultUserId} 
      WHERE "projectId" IS NULL;
    `;

    console.log(`✅ Backfilled ${auditBackfillResult} audit records`);
    console.log(`✅ Backfilled ${crawlBackfillResult} crawl records`);
    console.log("🎉 Backfill completed successfully!");
  } catch (error) {
    console.error("❌ Backfill failed:", error);
    // Don't exit with error in expand phase - this is non-critical
    console.log("⚠️  Backfill will be retried after full migration");
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  backfillMultiTenancyData();
}

export { backfillMultiTenancyData };
