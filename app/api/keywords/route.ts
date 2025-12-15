import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      )
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const projectId = searchParams.get('projectId')
    const query = searchParams.get('query')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    where.project = { ownerId: userId }
    if (projectId) {
      // Ensure projectId belongs to the current user
      const project = await prisma.project.findFirst({
        where: { id: projectId, ownerId: userId },
        select: { id: true },
      })
      if (!project) {
        return NextResponse.json(
          { success: false, error: 'Project not found' },
          { status: 404 },
        )
      }

      where.projectId = projectId
    }
    if (query) {
      where.keyword = {
        contains: query,
        mode: 'insensitive'
      }
    }

    // Build orderBy clause
    const orderBy: any = {}
    if (sortBy === 'volume') {
      orderBy.searchVolume = sortOrder
    } else if (sortBy === 'difficulty') {
      orderBy.difficulty = sortOrder
    } else {
      orderBy.createdAt = sortOrder
    }

    // Get keywords with pagination
    const [keywords, totalCount] = await Promise.all([
      prisma.keyword.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          project: {
            select: {
              id: true,
              name: true,
              domain: true
            }
          }
        }
      }),
      prisma.keyword.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        keywords: keywords.map(keyword => ({
          id: keyword.id,
          keyword: keyword.keyword,
          searchVolume: keyword.searchVolume,
          difficulty: keyword.difficulty,
          cpc: keyword.cpc,
          intent: keyword.intent,
          status: keyword.status,
          createdAt: keyword.createdAt,
          updatedAt: keyword.updatedAt,
          project: keyword.project
        })),
        pagination: {
          page,
          limit,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          hasNextPage: page < Math.ceil(totalCount / limit),
          hasPreviousPage: page > 1
        }
      }
    })

  } catch (error) {
    console.error("Error fetching keywords:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch keywords" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      )
    }

    const body = await req.json()
    const { projectId, keyword, searchVolume, difficulty, cpc, intent } = body

    // Validate required fields
    if (!projectId || !keyword) {
      return NextResponse.json(
        { success: false, error: "Project ID and keyword are required" },
        { status: 400 }
      )
    }

    // Validate project exists and belongs to user
    const project = await prisma.project.findFirst({
      where: { id: projectId, ownerId: userId }
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      )
    }

    // Check if keyword already exists for this project
    const existingKeyword = await prisma.keyword.findFirst({
      where: {
        projectId,
        keyword: keyword.toLowerCase().trim()
      }
    })

    if (existingKeyword) {
      return NextResponse.json(
        { success: false, error: "Keyword already exists for this project" },
        { status: 409 }
      )
    }

    // Create new keyword
    const newKeyword = await prisma.keyword.create({
      data: {
        projectId,
        keyword: keyword.toLowerCase().trim(),
        searchVolume: searchVolume || null,
        difficulty: difficulty || null,
        cpc: cpc || null,
        intent: intent || 'UNKNOWN'
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            domain: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        keyword: {
          id: newKeyword.id,
          keyword: newKeyword.keyword,
          searchVolume: newKeyword.searchVolume,
          difficulty: newKeyword.difficulty,
          cpc: newKeyword.cpc,
          intent: newKeyword.intent,
          status: newKeyword.status,
          createdAt: newKeyword.createdAt,
          updatedAt: newKeyword.updatedAt,
          project: newKeyword.project
        }
      }
    })

  } catch (error) {
    console.error("Error creating keyword:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create keyword" },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      )
    }

    const body = await req.json()
    const { id, searchVolume, difficulty, cpc, intent } = body

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Keyword ID is required" },
        { status: 400 }
      )
    }

    // Find existing keyword and ensure it belongs to the current user
    const existingKeyword = await prisma.keyword.findFirst({
      where: { id, project: { ownerId: userId } }
    })

    if (!existingKeyword) {
      return NextResponse.json(
        { success: false, error: "Keyword not found" },
        { status: 404 }
      )
    }

    // Update keyword
    const updatedKeyword = await prisma.keyword.update({
      where: { id },
      data: {
        searchVolume: searchVolume !== undefined ? searchVolume : existingKeyword.searchVolume,
        difficulty: difficulty !== undefined ? difficulty : existingKeyword.difficulty,
        cpc: cpc !== undefined ? cpc : existingKeyword.cpc,
        intent: intent !== undefined ? intent : existingKeyword.intent
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            domain: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        keyword: {
          id: updatedKeyword.id,
          keyword: updatedKeyword.keyword,
          searchVolume: updatedKeyword.searchVolume,
          difficulty: updatedKeyword.difficulty,
          cpc: updatedKeyword.cpc,
          intent: updatedKeyword.intent,
          status: updatedKeyword.status,
          createdAt: updatedKeyword.createdAt,
          updatedAt: updatedKeyword.updatedAt,
          project: updatedKeyword.project
        }
      }
    })

  } catch (error) {
    console.error("Error updating keyword:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update keyword" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      )
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Keyword ID is required" },
        { status: 400 }
      )
    }

    // Check if keyword exists and belongs to current user
    const existingKeyword = await prisma.keyword.findFirst({
      where: { id, project: { ownerId: userId } }
    })

    if (!existingKeyword) {
      return NextResponse.json(
        { success: false, error: "Keyword not found" },
        { status: 404 }
      )
    }

    // Delete keyword
    await prisma.keyword.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      data: { message: "Keyword deleted successfully" }
    })

  } catch (error) {
    console.error("Error deleting keyword:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete keyword" },
      { status: 500 }
    )
  }
}
