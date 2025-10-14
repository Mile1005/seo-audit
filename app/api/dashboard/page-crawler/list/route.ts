import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../../../../../auth'
import { prisma } from '../../../../../lib/prisma'

// Get list of user's crawls
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    
    if (!userId) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const projectId = searchParams.get('projectId')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build query
    const where: any = {
      project: {
        ownerId: userId
      },
      type: 'DASHBOARD' // Only dashboard crawls
    }

    if (projectId) {
      where.projectId = projectId
    }

    // Get crawls with project info
    const crawls = await (prisma as any).crawl.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            domain: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit,
      skip: offset
    })

    // Get total count
    const total = await (prisma as any).crawl.count({ where })

    return NextResponse.json({
      crawls: crawls.map((crawl: any) => ({
        id: crawl.id,
        projectId: crawl.projectId,
        projectName: crawl.project?.name,
        projectDomain: crawl.project?.domain,
        startUrl: crawl.startUrl,
        status: crawl.status,
        pages: crawl.pages,
        errors: crawl.errors,
        settings: crawl.settings,
        results: crawl.results,
        createdAt: crawl.createdAt,
        completedAt: crawl.completedAt
      })),
      total,
      limit,
      offset
    })
  } catch (err: any) {
    console.error('[page-crawler] list error:', err)
    return NextResponse.json({ error: err.message || 'internal error' }, { status: 500 })
  }
}
