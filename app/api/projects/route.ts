import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/projects - List user's projects
export async function GET(req: NextRequest) {
  try {
    // Parse query parameters
    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const userId = req.headers.get('x-user-id') || 'demo-user'
    
    // Get projects from database
    const projects = await prisma.project.findMany({
      where: {
        ownerId: userId
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            keywords: true,
            siteAudits: true,
            backlinks: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await prisma.project.count({
      where: {
        ownerId: userId
      }
    })

    return NextResponse.json({
      success: true,
      data: projects,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Projects API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create new project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const userId = req.headers.get('x-user-id') || 'demo-user'
    
    if (!body.name || !body.domain) {
      return NextResponse.json(
        { success: false, error: 'Name and domain are required' },
        { status: 400 }
      )
    }

    // Ensure user exists
    let user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      // Create demo user if doesn't exist
      user = await prisma.user.create({
        data: {
          id: userId,
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'USER'
        }
      })
    }

    // Create project in database
    const project = await prisma.project.create({
      data: {
        name: body.name.trim(),
        domain: body.domain.replace(/^https?:\/\//, '').replace(/\/$/, ''),
        status: 'ACTIVE',
        ownerId: userId
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            keywords: true,
            siteAudits: true,
            backlinks: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: project
    }, { status: 201 })
  } catch (error) {
    console.error('Create project error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
