/**
 * Database Seed Script
 * Populates the database with realistic demo data for testing/demo purposes
 * 
 * Run with: npm run seed
 */

import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables from .env.local (override .env)
config({ path: '.env.local', override: true });

// Use direct database connection (not Accelerate) for seeding
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

// Realistic domains for competitors
const COMPETITOR_DOMAINS = [
  'semrush.com',
  'ahrefs.com',
  'moz.com',
  'serpstat.com',
  'spyfu.com',
  'ubersuggest.com',
  'majestic.com',
  'mangools.com',
  'seranking.com',
  'brightlocal.com',
  'searchmetrics.com',
  'sistrix.com',
  'conductor.com',
  'raven-tools.com',
  'link-assistant.com'
];

// Popular countries with codes
const COUNTRIES = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Spain', code: 'ES' },
  { name: 'Italy', code: 'IT' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'India', code: 'IN' }
];

// Major cities
const CITIES = [
  'New York', 'Los Angeles', 'London', 'Paris', 'Berlin',
  'Tokyo', 'Sydney', 'Toronto', 'Mumbai', 'Madrid'
];

// Device types (uppercase to match Prisma schema)
const DEVICES = ['DESKTOP', 'MOBILE', 'TABLET'] as const;

// SERP features
const SERP_FEATURES = [
  'featured-snippet',
  'local-pack',
  'people-also-ask',
  'image-pack',
  'video-results',
  'shopping-results',
  'knowledge-panel',
  'site-links',
  'reviews-ratings',
  'top-stories',
  'carousel'
];

/**
 * Generate realistic CTR based on position
 */
function getCTRByPosition(position: number): number {
  const ctrMap: Record<number, number> = {
    1: 31.7, 2: 24.7, 3: 18.7, 4: 13.6, 5: 9.5,
    6: 6.3, 7: 4.3, 8: 3.1, 9: 2.4, 10: 1.9,
    11: 1.5, 12: 1.2, 13: 1.0, 14: 0.9, 15: 0.8
  };
  return ctrMap[position] || 0.5;
}

/**
 * Generate position history for the last 90 days
 */
function generatePositionHistory(keywordId: string, basePosition: number, searchVolume: number) {
  const positions = [];
  const now = new Date();

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Add realistic fluctuation (±2 positions)
    const fluctuation = Math.floor(Math.random() * 5) - 2;
    const position = Math.max(1, Math.min(50, basePosition + fluctuation));
    const previousRank: number = i < 89 ? positions[positions.length - 1]?.position || position : position;
    const change = previousRank - position;

    // Generate SERP features (some features present, some absent)
    const serpFeatures: Record<string, boolean> = {};
    SERP_FEATURES.forEach(feature => {
      serpFeatures[feature] = Math.random() > 0.5;
    });

    positions.push({
      keywordId,
      position,
      previousRank,
      change,
      url: 'https://yourdomain.com/blog/seo-guide',
      featured: serpFeatures['featured-snippet'],
      localPack: serpFeatures['local-pack'],
      serpFeatures: JSON.stringify(serpFeatures),
      location: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)].name,
      device: DEVICES[Math.floor(Math.random() * DEVICES.length)],
      checkedAt: date
    });
  }

  return positions;
}

/**
 * Generate competitor data for a keyword
 */
function generateCompetitors(keywordId: string, count: number = 10) {
  const competitors = [];
  const usedDomains = new Set<string>();

  for (let i = 0; i < count && usedDomains.size < count; i++) {
    const domain = COMPETITOR_DOMAINS[Math.floor(Math.random() * COMPETITOR_DOMAINS.length)];
    
    if (usedDomains.has(domain)) continue;
    usedDomains.add(domain);

    const position = i + 1;
    const domainRating = 50 + Math.floor(Math.random() * 40); // 50-90
    const backlinks = Math.floor(Math.random() * 500000) + 10000;

    competitors.push({
      keywordId,
      domain,
      url: `https://${domain}/seo-tools`,
      position,
      title: `SEO Tools & Keyword Research - ${domain}`,
      domainRating,
      backlinks,
      checkedAt: new Date()
    });
  }

  return competitors;
}

/**
 * Generate ranking alerts
 */
function generateAlerts(projectId: string, keywordId: string) {
  const alertTypes = [
    { type: 'ranking_drop', threshold: 3 },
    { type: 'ranking_gain', threshold: 3 },
    { type: 'traffic_drop', threshold: 25 },
    { type: 'serp_feature', threshold: 0 }
  ];

  return alertTypes.map(alert => ({
    projectId,
    keywordId,
    type: alert.type,
    threshold: alert.threshold,
    isActive: true,
    emailEnabled: Math.random() > 0.3,
    slackEnabled: Math.random() > 0.5,
    webhookUrl: Math.random() > 0.7 ? 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL' : null,
    lastTriggered: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : null
  }));
}

/**
 * Main seed function
 */
async function seed() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Clean existing data (optional - comment out if you want to keep existing data)
    console.log('🧹 Cleaning existing seed data...');
    await prisma.keywordPosition.deleteMany({});
    await prisma.keywordCompetitor.deleteMany({});
    await prisma.rankingAlert.deleteMany({});
    console.log('✅ Cleaned existing data\n');

    // Get or create a demo project
    console.log('📁 Setting up demo project...');
    let project = await prisma.project.findFirst({
      where: { name: 'Demo Project' }
    });

    if (!project) {
      // Get the first user or create a demo user
      let user = await prisma.user.findFirst();
      
      if (!user) {
        console.log('👤 Creating demo user...');
        user = await prisma.user.create({
          data: {
            email: 'demo@example.com',
            name: 'Demo User',
            emailVerified: new Date()
          }
        });
      }

      project = await prisma.project.create({
        data: {
          name: 'Demo Project',
          domain: 'yourdomain.com',
          ownerId: user.id,
          status: 'ACTIVE'
        }
      });
      console.log(`✅ Created project: ${project.name}\n`);
    } else {
      console.log(`✅ Using existing project: ${project.name}\n`);
    }

    // Get all keywords from the project
    const keywords = await prisma.keyword.findMany({
      where: { projectId: project.id }
    });

    if (keywords.length === 0) {
      console.log('⚠️  No keywords found in project. Creating sample keywords...\n');
      
      // Create sample keywords
      const sampleKeywords = [
        {
          keyword: 'seo audit tool',
          searchVolume: 8100,
          difficulty: 65,
          cpc: 12.50,
          competition: 0.85,
          intent: 'COMMERCIAL',
          country: 'US',
          device: 'DESKTOP'
        },
        {
          keyword: 'keyword research',
          searchVolume: 14800,
          difficulty: 72,
          cpc: 15.30,
          competition: 0.90,
          intent: 'INFORMATIONAL',
          country: 'US',
          device: 'DESKTOP'
        },
        {
          keyword: 'backlink checker',
          searchVolume: 6600,
          difficulty: 58,
          cpc: 9.80,
          competition: 0.75,
          intent: 'COMMERCIAL',
          country: 'US',
          device: 'DESKTOP'
        }
      ];

      for (const kw of sampleKeywords) {
        await prisma.keyword.create({
          data: {
            ...kw,
            projectId: project.id,
            status: 'ACTIVE'
          } as any
        });
      }

      // Reload keywords
      const newKeywords = await prisma.keyword.findMany({
        where: { projectId: project.id }
      });
      keywords.push(...newKeywords);
      console.log(`✅ Created ${sampleKeywords.length} sample keywords\n`);
    }

    console.log(`📊 Found ${keywords.length} keywords to seed\n`);

    // Seed data for each keyword
    for (const keyword of keywords) {
      console.log(`\n🔑 Processing keyword: "${keyword.keyword}"`);
      
      // Generate position history
      console.log('  📈 Generating 90 days of position history...');
      const basePosition = 5 + Math.floor(Math.random() * 10); // Position 5-15
      const positions = generatePositionHistory(keyword.id, basePosition, keyword.searchVolume || 1000);
      
      await prisma.keywordPosition.createMany({
        data: positions
      });
      console.log(`  ✅ Created ${positions.length} position records`);

      // Generate competitors
      console.log('  🏆 Generating competitor data...');
      const competitors = generateCompetitors(keyword.id, 10);
      
      await prisma.keywordCompetitor.createMany({
        data: competitors
      });
      console.log(`  ✅ Created ${competitors.length} competitor records`);

      // Generate location-specific rankings
      console.log('  🌍 Generating multi-location rankings...');
      const locationRankings = [];
      
      for (const country of COUNTRIES.slice(0, 5)) {
        for (const device of DEVICES) {
          const position = basePosition + Math.floor(Math.random() * 10) - 5;
          const previousRank = position + Math.floor(Math.random() * 5) - 2;
          
          const serpFeatures: Record<string, boolean> = {};
          SERP_FEATURES.forEach(feature => {
            serpFeatures[feature] = Math.random() > 0.6;
          });

          locationRankings.push({
            keywordId: keyword.id,
            position: Math.max(1, position),
            previousRank: Math.max(1, previousRank),
            change: previousRank - position,
            url: 'https://yourdomain.com/blog/seo-guide',
            featured: serpFeatures['featured-snippet'],
            localPack: serpFeatures['local-pack'],
            serpFeatures: JSON.stringify(serpFeatures),
            location: country.name,
            device: device,
            checkedAt: new Date()
          });
        }
      }

      await prisma.keywordPosition.createMany({
        data: locationRankings
      });
      console.log(`  ✅ Created ${locationRankings.length} location-specific rankings`);

      // Generate alerts
      console.log('  🔔 Generating alert configurations...');
      const alerts = generateAlerts(project.id, keyword.id);
      
      await prisma.rankingAlert.createMany({
        data: alerts
      });
      console.log(`  ✅ Created ${alerts.length} alert configurations`);
    }

    console.log('\n\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   • Project: ${project.name}`);
    console.log(`   • Keywords: ${keywords.length}`);
    console.log(`   • Position records per keyword: ~${90 + COUNTRIES.slice(0, 5).length * DEVICES.length}`);
    console.log(`   • Competitors per keyword: 10`);
    console.log(`   • Alerts per keyword: 4`);
    console.log('\n✨ Your components should now display real-looking data!');
    console.log('🚀 Visit /dashboard/keywords to see the results\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seed()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
