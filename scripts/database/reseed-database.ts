/**
 * Re-seed Script - Clear and regenerate with RICH demo data
 * Run with: npm run reseed
 */

import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { seedKeyword } from "../lib/seed-keyword";

// Load environment variables from .env.local
config({ path: ".env.local", override: true });

// Use direct database connection (not Accelerate) for seeding
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function reseed() {
  try {
    console.log("🔄 Re-seeding database with RICH demo data...\n");

    // Get all keywords
    const keywords = await prisma.keyword.findMany({
      include: { project: true },
    });

    if (keywords.length === 0) {
      console.log("❌ No keywords found. Please run the main seed script first: npm run seed");
      return;
    }

    console.log(`Found ${keywords.length} keywords to re-seed\n`);

    // Clear existing tracking data for each keyword
    for (const keyword of keywords) {
      console.log(`\n🧹 Clearing old data for: "${keyword.keyword}"`);

      await prisma.keywordPosition.deleteMany({
        where: { keywordId: keyword.id },
      });
      console.log("  ✅ Deleted position records");

      await prisma.keywordCompetitor.deleteMany({
        where: { keywordId: keyword.id },
      });
      console.log("  ✅ Deleted competitor records");

      await prisma.rankingAlert.deleteMany({
        where: { keywordId: keyword.id },
      });
      console.log("  ✅ Deleted alert records");

      // Re-seed with RICH data
      console.log(`\n🌱 Re-seeding "${keyword.keyword}" with RICH demo data...`);

      const basePosition = 5 + Math.floor(Math.random() * 10); // Random position 5-15

      await seedKeyword(
        prisma,
        keyword.id,
        keyword.keyword,
        keyword.projectId,
        keyword.searchVolume || 5000,
        basePosition
      );
    }

    console.log("\n\n✨ Re-seeding completed successfully!");
    console.log("\n📊 Each keyword now has:");
    console.log("   • 91 position records (90 days of history)");
    console.log("   • 180+ location-specific rankings (10 countries + 50 cities × 3 devices)");
    console.log("   • 6-10 competitors with real domains");
    console.log("   • 70% SERP features present (rich display)");
    console.log("   • 4 alert configurations");
    console.log("\n🚀 Visit /dashboard/keywords to see the beautiful, rich demo data!");
  } catch (error) {
    console.error("❌ Error re-seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

reseed();
