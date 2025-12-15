/**
 * Database Testing Script
 * Tests all database models and relationships
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testDatabaseSchema() {
  console.log("🧪 Starting database schema tests...");

  try {
    // Test User model
    console.log("\n📊 Testing User model...");
    const users = await prisma.user.findMany({
      include: {
        ownedProjects: true,
        subscriptions: true,
        teamMembers: true,
      },
    });
    console.log(`✅ Found ${users.length} users`);

    if (users.length > 0) {
      console.log(`   - User: ${users[0].name} (${users[0].email})`);
      console.log(`   - Projects owned: ${users[0].ownedProjects.length}`);
      console.log(`   - Subscriptions: ${users[0].subscriptions.length}`);
    }

    // Test Project model with relationships
    console.log("\n📊 Testing Project model...");
    const projects = await prisma.project.findMany({
      include: {
        owner: true,
        keywords: true,
        siteAudits: true,
        backlinks: true,
        competitors: true,
      },
    });
    console.log(`✅ Found ${projects.length} projects`);

    if (projects.length > 0) {
      const project = projects[0];
      console.log(`   - Project: ${project.name} (${project.domain})`);
      console.log(`   - Owner: ${project.owner.name}`);
      console.log(`   - Keywords: ${project.keywords.length}`);
      console.log(`   - Site Audits: ${project.siteAudits.length}`);
      console.log(`   - Backlinks: ${project.backlinks.length}`);
      console.log(`   - Competitors: ${project.competitors.length}`);
    }

    // Test Keyword model with positions
    console.log("\n📊 Testing Keyword model...");
    const keywords = await prisma.keyword.findMany({
      include: {
        positions: {
          orderBy: { checkedAt: "desc" },
          take: 2,
        },
      },
    });
    console.log(`✅ Found ${keywords.length} keywords`);

    if (keywords.length > 0) {
      const keyword = keywords[0];
      console.log(`   - Keyword: "${keyword.keyword}" (${keyword.country}/${keyword.device})`);
      console.log(`   - Search Volume: ${keyword.searchVolume}`);
      console.log(`   - Difficulty: ${keyword.difficulty}`);
      console.log(`   - Position History: ${keyword.positions.length} records`);

      if (keyword.positions.length > 0) {
        console.log(`     - Latest Position: ${keyword.positions[0].position}`);
      }
    }

    // Test SiteAudit model with issues
    console.log("\n📊 Testing SiteAudit model...");
    const audits = await prisma.siteAudit.findMany({
      include: {
        issues: true,
        creator: true,
      },
    });
    console.log(`✅ Found ${audits.length} site audits`);

    if (audits.length > 0) {
      const audit = audits[0];
      console.log(`   - Audit: ${audit.url} (Score: ${audit.overallScore})`);
      console.log(`   - Status: ${audit.status}`);
      console.log(`   - Issues: ${audit.issues.length}`);
      console.log(`   - Creator: ${audit.creator.name}`);

      if (audit.issues.length > 0) {
        const criticalIssues = audit.issues.filter((i) => i.severity === "CRITICAL");
        console.log(`     - Critical Issues: ${criticalIssues.length}`);
      }
    }

    // Test Backlink model
    console.log("\n📊 Testing Backlink model...");
    const backlinks = await prisma.backlink.findMany({
      include: {
        project: true,
      },
    });
    console.log(`✅ Found ${backlinks.length} backlinks`);

    if (backlinks.length > 0) {
      const backlink = backlinks[0];
      console.log(`   - Backlink: ${backlink.sourceDomain} → ${backlink.targetUrl}`);
      console.log(`   - Anchor Text: "${backlink.anchorText}"`);
      console.log(`   - Domain Rating: ${backlink.domainRating}`);
      console.log(`   - Project: ${backlink.project.name}`);
    }

    // Test Competitor model
    console.log("\n📊 Testing Competitor model...");
    const competitors = await prisma.competitor.findMany({
      include: {
        project: true,
      },
    });
    console.log(`✅ Found ${competitors.length} competitors`);

    if (competitors.length > 0) {
      competitors.forEach((competitor) => {
        console.log(`   - Competitor: ${competitor.name} (${competitor.domain})`);
      });
    }

    // Test database statistics
    console.log("\n📊 Database Statistics:");
    const stats = {
      users: await prisma.user.count(),
      projects: await prisma.project.count(),
      keywords: await prisma.keyword.count(),
      keywordPositions: await prisma.keywordPosition.count(),
      siteAudits: await prisma.siteAudit.count(),
      auditIssues: await prisma.auditIssue.count(),
      backlinks: await prisma.backlink.count(),
      competitors: await prisma.competitor.count(),
      subscriptions: await prisma.subscription.count(),
    };

    Object.entries(stats).forEach(([key, value]) => {
      console.log(`   - ${key}: ${value}`);
    });

    // Test complex queries
    console.log("\n📊 Testing complex queries...");

    // Get project with all related data
    const projectWithData = await prisma.project.findFirst({
      include: {
        owner: true,
        keywords: {
          include: {
            positions: {
              orderBy: { checkedAt: "desc" },
              take: 1,
            },
          },
        },
        siteAudits: {
          include: {
            issues: {
              where: { severity: "CRITICAL" },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        backlinks: {
          where: { status: "ACTIVE" },
        },
        competitors: true,
      },
    });

    if (projectWithData) {
      console.log(`✅ Complex query successful for project: ${projectWithData.name}`);
      console.log(`   - Keywords with positions: ${projectWithData.keywords.length}`);

      const criticalIssues = projectWithData.siteAudits.reduce(
        (acc, audit) => acc + audit.issues.length,
        0
      );
      console.log(`   - Critical issues in latest audit: ${criticalIssues}`);
      console.log(`   - Active backlinks: ${projectWithData.backlinks.length}`);
    }

    // Test aggregation queries
    console.log("\n📊 Testing aggregation queries...");

    const keywordStats = await prisma.keyword.aggregate({
      _avg: { searchVolume: true, difficulty: true },
      _max: { searchVolume: true },
      _min: { difficulty: true },
      _count: true,
    });

    console.log(`✅ Keyword aggregations:`);
    console.log(`   - Average search volume: ${Math.round(keywordStats._avg.searchVolume || 0)}`);
    console.log(`   - Average difficulty: ${Math.round(keywordStats._avg.difficulty || 0)}`);
    console.log(`   - Max search volume: ${keywordStats._max.searchVolume}`);
    console.log(`   - Min difficulty: ${keywordStats._min.difficulty}`);

    console.log("\n🎉 All database tests completed successfully!");

    return {
      success: true,
      stats,
      message: "All database tests passed",
    };
  } catch (error) {
    console.error("❌ Database test failed:", error);
    throw error;
  }
}

async function testDatabasePerformance() {
  console.log("\n⚡ Testing database performance...");

  try {
    const start = Date.now();

    // Test simple query performance
    await prisma.user.findMany();
    const simpleQueryTime = Date.now() - start;

    const complexStart = Date.now();
    // Test complex query performance
    await prisma.project.findMany({
      include: {
        owner: true,
        keywords: {
          include: {
            positions: {
              orderBy: { checkedAt: "desc" },
              take: 1,
            },
          },
        },
        siteAudits: {
          include: {
            issues: true,
          },
        },
      },
    });
    const complexQueryTime = Date.now() - complexStart;

    console.log(`✅ Performance Results:`);
    console.log(`   - Simple query: ${simpleQueryTime}ms`);
    console.log(`   - Complex query: ${complexQueryTime}ms`);

    if (simpleQueryTime < 50 && complexQueryTime < 200) {
      console.log(`✅ Performance is good!`);
    } else {
      console.log(`⚠️  Performance could be improved`);
    }

    return {
      simpleQueryTime,
      complexQueryTime,
      performance: simpleQueryTime < 50 && complexQueryTime < 200 ? "good" : "needs improvement",
    };
  } catch (error) {
    console.error("❌ Performance test failed:", error);
    throw error;
  }
}

async function main() {
  try {
    const schemaResults = await testDatabaseSchema();
    const performanceResults = await testDatabasePerformance();

    console.log("\n📋 Test Summary:");
    console.log(`   - Schema tests: ${schemaResults.success ? "✅ PASSED" : "❌ FAILED"}`);
    console.log(
      `   - Performance: ${performanceResults.performance === "good" ? "✅ GOOD" : "⚠️  NEEDS IMPROVEMENT"}`
    );

    return {
      schema: schemaResults,
      performance: performanceResults,
    };
  } catch (error) {
    console.error("❌ Database testing failed:", error);
    throw error;
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export { testDatabaseSchema, testDatabasePerformance };
