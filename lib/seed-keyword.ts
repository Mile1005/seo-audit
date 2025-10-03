/**
 * Reusable Keyword Seeding Functions
 * Auto-generates realistic demo data when keywords are added
 */

import { PrismaClient } from '@prisma/client';

// Realistic competitor domains
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
  'screaming-frog.com',
  'sitebulb.com',
  'raven-tools.com',
  'conductor.com',
  'searchmetrics.com'
];

const COUNTRIES = [
  { code: 'US', name: 'United States', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'] },
  { code: 'GB', name: 'United Kingdom', cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'] },
  { code: 'CA', name: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'] },
  { code: 'AU', name: 'Australia', cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'] },
  { code: 'DE', name: 'Germany', cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'] },
  { code: 'FR', name: 'France', cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'] },
  { code: 'ES', name: 'Spain', cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao'] },
  { code: 'IT', name: 'Italy', cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Florence'] },
  { code: 'NL', name: 'Netherlands', cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'] },
  { code: 'IN', name: 'India', cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'] }
];

const DEVICES = ['DESKTOP', 'MOBILE', 'TABLET'] as const;

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
 * Auto-seed a keyword with realistic demo data
 */
export async function seedKeyword(
  prisma: PrismaClient,
  keywordId: string,
  keyword: string,
  projectId: string,
  searchVolume: number,
  basePosition: number = 8 // Default starting position
) {
  try {
    console.log(`🌱 Auto-seeding keyword: "${keyword}"`);

    // 1. Generate 90 days of position history
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

      // Generate SERP features (MORE ACTIVE FEATURES for rich display)
      const serpFeatures: Record<string, boolean> = {};
      SERP_FEATURES.forEach(feature => {
        // 70% chance of being present (was 50% before)
        serpFeatures[feature] = Math.random() > 0.3;
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

    await prisma.keywordPosition.createMany({
      data: positions,
      skipDuplicates: true
    });
    console.log(`  ✅ Created ${positions.length} position records`);

    // 2. Generate competitor data (7-10 competitors)
    const competitorCount = 7 + Math.floor(Math.random() * 4);
    const competitors = [];
    const usedDomains = new Set<string>();

    for (let i = 0; i < competitorCount && usedDomains.size < competitorCount; i++) {
      const domain = COMPETITOR_DOMAINS[Math.floor(Math.random() * COMPETITOR_DOMAINS.length)];
      
      if (usedDomains.has(domain)) continue;
      usedDomains.add(domain);

      const position = i + 1;
      const domainRating = 50 + Math.floor(Math.random() * 40);
      const backlinks = Math.floor(Math.random() * 500000) + 10000;

      competitors.push({
        keywordId,
        domain,
        url: `https://${domain}/`,
        position,
        title: `${keyword} - ${domain.split('.')[0]}`,
        domainRating,
        backlinks
      });
    }

    if (competitors.length > 0) {
      await prisma.keywordCompetitor.createMany({
        data: competitors,
        skipDuplicates: true
      });
      console.log(`  ✅ Created ${competitors.length} competitor records`);
    }

    // 3. Generate multi-location rankings (ALL countries × ALL cities × 3 devices = RICH DATA!)
    const locationRankings = [];
    
    for (const country of COUNTRIES) {
      // Add country-level rankings for each device
      for (const device of DEVICES) {
        const position = basePosition + Math.floor(Math.random() * 15) - 7; // ±7 variation
        const clampedPosition = Math.max(1, Math.min(50, position));
        const change = Math.floor(Math.random() * 8) - 4; // -4 to +4

        locationRankings.push({
          keywordId,
          position: clampedPosition,
          previousRank: clampedPosition - change,
          change,
          url: 'https://yourdomain.com/blog/seo-guide',
          location: country.name,
          device,
          checkedAt: new Date()
        });
      }

      // Add city-level rankings for each city in the country
      for (const city of country.cities) {
        for (const device of DEVICES) {
          const position = basePosition + Math.floor(Math.random() * 20) - 10; // ±10 variation for cities
          const clampedPosition = Math.max(1, Math.min(50, position));
          const change = Math.floor(Math.random() * 10) - 5; // -5 to +5

          locationRankings.push({
            keywordId,
            position: clampedPosition,
            previousRank: clampedPosition - change,
            change,
            url: 'https://yourdomain.com/blog/seo-guide',
            location: `${city}, ${country.name}`,
            device,
            checkedAt: new Date()
          });
        }
      }
    }

    await prisma.keywordPosition.createMany({
      data: locationRankings,
      skipDuplicates: true
    });
    console.log(`  ✅ Created ${locationRankings.length} location-specific rankings (countries + cities)`);

    // 4. Generate alert configurations
    const alertTypes = ['ranking_drop', 'ranking_gain', 'traffic_drop', 'serp_feature'];
    const alerts = alertTypes.map(type => ({
      projectId,
      keywordId,
      type,
      threshold: type.includes('drop') ? -3 : 3,
      isActive: true,
      emailEnabled: true,
      slackEnabled: false,
      lastTriggered: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : null
    }));

    await prisma.rankingAlert.createMany({
      data: alerts,
      skipDuplicates: true
    });
    console.log(`  ✅ Created ${alerts.length} alert configurations`);

    console.log(`✨ Keyword "${keyword}" fully seeded with demo data!`);
    return true;
  } catch (error) {
    console.error(`❌ Error seeding keyword "${keyword}":`, error);
    return false;
  }
}

/**
 * Batch seed multiple keywords
 */
export async function seedKeywords(
  prisma: PrismaClient,
  keywords: Array<{
    id: string;
    keyword: string;
    projectId: string;
    searchVolume: number;
  }>
) {
  console.log(`🌱 Batch seeding ${keywords.length} keywords...`);
  
  const results = [];
  for (const kw of keywords) {
    const basePosition = 5 + Math.floor(Math.random() * 10); // Random position 5-15
    const success = await seedKeyword(
      prisma,
      kw.id,
      kw.keyword,
      kw.projectId,
      kw.searchVolume || 1000,
      basePosition
    );
    results.push({ keyword: kw.keyword, success });
  }

  const successCount = results.filter(r => r.success).length;
  console.log(`✅ Seeded ${successCount}/${keywords.length} keywords successfully`);
  
  return results;
}
