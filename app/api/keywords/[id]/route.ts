import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const keywordId = params.id;

    if (!keywordId) {
      return NextResponse.json({ 
        success: false,
        error: 'Keyword ID is required' 
      }, { status: 400 });
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
