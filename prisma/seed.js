/**
 * Database Seeding Script
 * Seeds the database with initial data for development
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // Create default admin user
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@aiseoturbo.com' },
      update: {},
      create: {
        email: 'admin@aiseoturbo.com',
        name: 'AISEOTurbo Admin',
        role: 'ADMIN',
        emailVerified: new Date(),
      }
    })

    console.log('✅ Created admin user:', adminUser.email)

    // Create default subscription for admin (check if exists first)
    const existingSubscription = await prisma.subscription.findFirst({
      where: { userId: adminUser.id }
    })

    if (!existingSubscription) {
      const subscription = await prisma.subscription.create({
        data: {
          userId: adminUser.id,
          plan: 'ENTERPRISE',
          status: 'ACTIVE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        }
      })

      console.log('✅ Created subscription for admin user')
    } else {
      console.log('✅ Subscription already exists for admin user')
    }

    // Create demo project
    const demoProject = await prisma.project.upsert({
      where: { 
        ownerId_domain: {
          ownerId: adminUser.id,
          domain: 'aiseoturbo.com'
        }
      },
      update: {},
      create: {
        name: 'AISEOTurbo Demo',
        domain: 'aiseoturbo.com',
        description: 'Demo project for AISEOTurbo dashboard',
        ownerId: adminUser.id,
        status: 'ACTIVE',
      }
    })

    console.log('✅ Created demo project:', demoProject.name)

    // Create demo keywords
    const demoKeywords = [
      { keyword: 'seo audit tool', searchVolume: 1200, difficulty: 45 },
      { keyword: 'website seo analysis', searchVolume: 800, difficulty: 38 },
      { keyword: 'free seo checker', searchVolume: 2400, difficulty: 52 },
      { keyword: 'seo optimization tool', searchVolume: 950, difficulty: 41 },
      { keyword: 'ai seo tool', searchVolume: 650, difficulty: 35 },
    ]

    for (const keywordData of demoKeywords) {
      const keyword = await prisma.keyword.upsert({
        where: {
          projectId_keyword_country_device: {
            projectId: demoProject.id,
            keyword: keywordData.keyword,
            country: 'US',
            device: 'DESKTOP'
          }
        },
        update: {},
        create: {
          projectId: demoProject.id,
          keyword: keywordData.keyword,
          searchVolume: keywordData.searchVolume,
          difficulty: keywordData.difficulty,
          status: 'ACTIVE',
        }
      })

      // Create some position history
      await prisma.keywordPosition.create({
        data: {
          keywordId: keyword.id,
          position: Math.floor(Math.random() * 50) + 1,
          url: `https://aiseoturbo.com/${keywordData.keyword.replace(/\s+/g, '-')}`,
          title: `${keywordData.keyword} - AISEOTurbo`,
          checkedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        }
      })

      await prisma.keywordPosition.create({
        data: {
          keywordId: keyword.id,
          position: Math.floor(Math.random() * 50) + 1,
          url: `https://aiseoturbo.com/${keywordData.keyword.replace(/\s+/g, '-')}`,
          title: `${keywordData.keyword} - AISEOTurbo`,
          checkedAt: new Date(),
        }
      })
    }

    console.log('✅ Created demo keywords with position history')

    // Create demo competitors
    const competitors = [
      { domain: 'semrush.com', name: 'SEMrush' },
      { domain: 'ahrefs.com', name: 'Ahrefs' },
      { domain: 'moz.com', name: 'Moz' },
    ]

    for (const competitor of competitors) {
      await prisma.competitor.upsert({
        where: {
          projectId_domain: {
            projectId: demoProject.id,
            domain: competitor.domain
          }
        },
        update: {},
        create: {
          projectId: demoProject.id,
          domain: competitor.domain,
          name: competitor.name,
        }
      })
    }

    console.log('✅ Created demo competitors')

    // Create demo site audit
    const siteAudit = await prisma.siteAudit.create({
      data: {
        projectId: demoProject.id,
        createdBy: adminUser.id,
        url: 'https://aiseoturbo.com',
        status: 'COMPLETED',
        overallScore: 85,
        summary: {
          totalPages: 15,
          totalIssues: 8,
          criticalIssues: 1,
          warningIssues: 3,
          infoIssues: 4
        },
        completedAt: new Date(),
      }
    })

    // Create demo audit issues
    const auditIssues = [
      {
        type: 'TECHNICAL',
        severity: 'CRITICAL',
        title: 'Missing meta descriptions',
        description: '3 pages are missing meta descriptions',
        count: 3
      },
      {
        type: 'PERFORMANCE',
        severity: 'HIGH',
        title: 'Large image files',
        description: 'Images are not optimized for web',
        count: 5
      },
      {
        type: 'CONTENT',
        severity: 'MEDIUM',
        title: 'Duplicate title tags',
        description: '2 pages have duplicate title tags',
        count: 2
      }
    ]

    for (const issue of auditIssues) {
      await prisma.auditIssue.create({
        data: {
          auditId: siteAudit.id,
          ...issue
        }
      })
    }

    console.log('✅ Created demo site audit with issues')

    // Create demo backlinks
    const backlinks = [
      {
        sourceUrl: 'https://example.com/blog/seo-tools',
        sourceDomain: 'example.com',
        targetUrl: 'https://aiseoturbo.com',
        anchorText: 'AI SEO Tool',
        domainRating: 45,
        firstSeen: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        lastSeen: new Date()
      },
      {
        sourceUrl: 'https://techblog.io/seo-review',
        sourceDomain: 'techblog.io',
        targetUrl: 'https://aiseoturbo.com/features',
        anchorText: 'SEO audit features',
        domainRating: 38,
        firstSeen: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        lastSeen: new Date()
      }
    ]

    for (const backlink of backlinks) {
      await prisma.backlink.create({
        data: {
          projectId: demoProject.id,
          ...backlink
        }
      })
    }

    console.log('✅ Created demo backlinks')

    console.log('🎉 Database seeding completed successfully!')
    
    return {
      adminUser,
      demoProject,
      message: 'Database seeded successfully'
    }

  } catch (error) {
    console.error('❌ Database seeding failed:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
