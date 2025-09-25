import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireUser } from '@/lib/auth'

// POST /api/backlinks/mock-data - Generate mock backlink data for testing
export async function POST(request: NextRequest) {
  try {
    await requireUser(request)
    
    const body = await request.json()
    const { projectId, count = 50 } = body

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Mock domains and their properties
    const mockDomains = [
      { domain: 'techcrunch.com', rating: 94, category: 'Technology', traffic: 50000000, toxic: false },
      { domain: 'medium.com', rating: 96, category: 'Publishing', traffic: 200000000, toxic: false },
      { domain: 'wikipedia.org', rating: 99, category: 'Reference', traffic: 15000000000, toxic: false },
      { domain: 'github.com', rating: 96, category: 'Technology', traffic: 2000000000, toxic: false },
      { domain: 'stackoverflow.com', rating: 91, category: 'Technology', traffic: 1500000000, toxic: false },
      { domain: 'forbes.com', rating: 94, category: 'Business', traffic: 120000000, toxic: false },
      { domain: 'techblog.example.com', rating: 45, category: 'Technology', traffic: 50000, toxic: false },
      { domain: 'spammy-site.com', rating: 15, category: 'Spam', traffic: 1000, toxic: true },
      { domain: 'low-quality-blog.net', rating: 8, category: 'Blog', traffic: 500, toxic: true },
      { domain: 'link-farm.biz', rating: 3, category: 'Link Farm', traffic: 100, toxic: true },
      { domain: 'reddit.com', rating: 91, category: 'Social', traffic: 1700000000, toxic: false },
      { domain: 'linkedin.com', rating: 98, category: 'Professional', traffic: 900000000, toxic: false },
      { domain: 'dev.to', rating: 75, category: 'Technology', traffic: 15000000, toxic: false },
      { domain: 'hashnode.com', rating: 65, category: 'Technology', traffic: 2000000, toxic: false },
      { domain: 'hackernews.com', rating: 85, category: 'Technology', traffic: 50000000, toxic: false }
    ]

    const mockAnchorTexts = [
      'click here',
      'read more',
      'learn about SEO',
      'best SEO tools',
      'website optimization',
      'digital marketing',
      'SEO analysis',
      'check this out',
      'awesome tool',
      'must-have resource',
      project.domain,
      `${project.name} - SEO Tool`,
      'SEO audit tool',
      'website analyzer'
    ]

    const mockBacklinks = []
    const createdDomains = new Set()

    for (let i = 0; i < count; i++) {
      const mockDomain = mockDomains[Math.floor(Math.random() * mockDomains.length)]
      const anchorText = mockAnchorTexts[Math.floor(Math.random() * mockAnchorTexts.length)]
      
      // Ensure referring domain exists
      if (!createdDomains.has(mockDomain.domain)) {
        await prisma.referringDomain.upsert({
          where: {
            projectId_domain: {
              projectId,
              domain: mockDomain.domain
            }
          },
          update: {
            domainRating: mockDomain.rating,
            traffic: mockDomain.traffic,
            category: mockDomain.category,
            isToxic: mockDomain.toxic,
            toxicScore: mockDomain.toxic ? Math.random() * 100 : Math.random() * 20,
            trustFlow: mockDomain.rating + Math.floor(Math.random() * 10) - 5,
            citationFlow: mockDomain.rating + Math.floor(Math.random() * 15) - 7,
            country: 'US',
            language: 'en',
            lastSeen: new Date(),
            lastChecked: new Date()
          },
          create: {
            projectId,
            domain: mockDomain.domain,
            domainRating: mockDomain.rating,
            traffic: mockDomain.traffic,
            category: mockDomain.category,
            isToxic: mockDomain.toxic,
            toxicScore: mockDomain.toxic ? Math.random() * 100 : Math.random() * 20,
            trustFlow: mockDomain.rating + Math.floor(Math.random() * 10) - 5,
            citationFlow: mockDomain.rating + Math.floor(Math.random() * 15) - 7,
            country: 'US',
            language: 'en',
            firstSeen: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
            lastSeen: new Date(),
            lastChecked: new Date()
          }
        })
        createdDomains.add(mockDomain.domain)
      }

      // Create mock backlink
      const sourceUrl = `https://${mockDomain.domain}/${Math.random().toString(36).substring(7)}`
      const targetUrl = `https://${project.domain}/${Math.random() > 0.7 ? '' : Math.random().toString(36).substring(7)}`
      
      const backlink = {
        projectId,
        sourceUrl,
        sourceDomain: mockDomain.domain,
        targetUrl,
        anchorText,
        linkType: Math.random() > 0.9 ? ('NOFOLLOW' as const) : ('FOLLOW' as const),
        status: Math.random() > 0.95 ? ('LOST' as const) : ('ACTIVE' as const),
        domainRating: mockDomain.rating,
        pageRating: Math.max(1, mockDomain.rating - Math.floor(Math.random() * 30)),
        traffic: Math.floor(mockDomain.traffic * Math.random() * 0.1),
        isToxic: mockDomain.toxic,
        toxicScore: mockDomain.toxic ? Math.random() * 100 : Math.random() * 20,
        linkStrength: (mockDomain.rating > 70 ? 'STRONG' : mockDomain.rating > 40 ? 'NORMAL' : 'WEAK') as 'STRONG' | 'NORMAL' | 'WEAK',
        context: `This is some context around the ${anchorText} link in the article.`,
        isNofollow: Math.random() > 0.9,
        isSponsored: Math.random() > 0.95,
        isUGC: Math.random() > 0.98,
        httpStatus: Math.random() > 0.95 ? 404 : 200,
        firstSeen: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        lastSeen: new Date(),
        lastChecked: new Date()
      }

      // Create backlink in database
      try {
        await prisma.backlink.upsert({
          where: {
            projectId_sourceUrl_targetUrl: {
              projectId,
              sourceUrl,
              targetUrl
            }
          },
          update: {
            anchorText: backlink.anchorText,
            linkType: backlink.linkType,
            status: backlink.status,
            domainRating: backlink.domainRating,
            pageRating: backlink.pageRating,
            traffic: backlink.traffic,
            isToxic: backlink.isToxic,
            toxicScore: backlink.toxicScore,
            linkStrength: backlink.linkStrength,
            context: backlink.context,
            isNofollow: backlink.isNofollow,
            isSponsored: backlink.isSponsored,
            isUGC: backlink.isUGC,
            httpStatus: backlink.httpStatus,
            lastSeen: backlink.lastSeen,
            lastChecked: backlink.lastChecked
          },
          create: backlink
        })
        
        mockBacklinks.push(backlink)
      } catch (error) {
        console.error('Error creating mock backlink:', error)
        // Continue with next backlink
      }
    }

    // Update referring domain backlink counts
    for (const domain of createdDomains) {
      const backlinkCount = await prisma.backlink.count({
        where: {
          projectId,
          sourceDomain: domain as string
        }
      })

      await prisma.referringDomain.update({
        where: {
          projectId_domain: {
            projectId,
            domain: domain as string
          }
        },
        data: {
          backlinkCount
        }
      })
    }

    return NextResponse.json({
      message: 'Mock backlink data generated successfully',
      stats: {
        backlinksCreated: mockBacklinks.length,
        referringDomainsCreated: createdDomains.size,
        toxicBacklinks: mockBacklinks.filter(bl => bl.isToxic).length,
        followLinks: mockBacklinks.filter(bl => bl.linkType === 'FOLLOW').length,
        nofollowLinks: mockBacklinks.filter(bl => bl.linkType === 'NOFOLLOW').length
      }
    })
  } catch (error) {
    console.error('Error generating mock data:', error)
    return NextResponse.json(
      { error: 'Failed to generate mock data' },
      { status: 500 }
    )
  }
}
