import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      )
    }

    const keywordId = params.id;

    if (!keywordId) {
      return NextResponse.json({ 
        success: false,
        error: 'Keyword ID is required' 
      }, { status: 400 });
    }

    const keyword = await prisma.keyword.findFirst({
      where: { id: keywordId, project: { ownerId: userId } },
      select: { id: true },
    })

    if (!keyword) {
      return NextResponse.json(
        { success: false, error: 'Keyword not found' },
        { status: 404 },
      )
    }

    // Delete the keyword and all related data (cascade delete handles relations)
    await prisma.keyword.delete({
      where: { id: keywordId }
    });

    return NextResponse.json({ 
      success: true,
      message: 'Keyword deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting keyword:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to delete keyword' 
    }, { status: 500 });
  }
}
