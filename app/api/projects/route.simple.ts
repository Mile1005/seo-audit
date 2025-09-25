import { NextRequest, NextResponse } from 'next/server'

// GET /api/projects - List user's projects
export async function GET(req: NextRequest) {
  try {
    // Parse query parameters
    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    
    // For now, return mock data to avoid Prisma issues during build
    const mockProjects = [
      {
        id: '1',
        name: 'Main Website',
        domain: 'https://example.com',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        owner: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com'
        },
        _count: {
          keywords: 125,
          siteAudits: 8,
          backlinks: 450
        }
      }
    ]

    return NextResponse.json({
      success: true,
      data: mockProjects,
      meta: {
        page,
        limit,
        total: 1,
        totalPages: 1
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
    
    // For now, return mock response
    const mockProject = {
      id: String(Date.now()),
      name: body.name || 'New Project',
      domain: body.domain || 'https://example.com',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      owner: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com'
      },
      _count: {
        keywords: 0,
        siteAudits: 0,
        backlinks: 0
      }
    }

    return NextResponse.json({
      success: true,
      data: mockProject
    }, { status: 201 })
  } catch (error) {
    console.error('Create project error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
