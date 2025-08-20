import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '../../../../lib/db';

export async function GET(req: NextRequest, { params }: { params: { domainId: string } }) {
  try {
    const { domainId } = params;
    if (!domainId) {
      return NextResponse.json({ error: 'Missing domainId' }, { status: 400 });
    }
    
    console.log(`Fetching backlink snapshots for domainId: ${domainId}`);
    
    const prisma = await getPrisma();
    const snapshots = await prisma.backlinkSnapshot.findMany({
      where: { domainId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
    
    console.log(`Found ${snapshots.length} backlink snapshots for domainId: ${domainId}`);
    return NextResponse.json(snapshots);
  } catch (error: any) {
    console.error(`Error fetching backlink snapshots for domainId ${params.domainId}:`, error);
    
    // If it's a database connection error, return empty array instead of error
    if (error.message?.includes('database') || error.message?.includes('connection')) {
      console.log('Database connection issue, returning empty array');
      return NextResponse.json([]);
    }
    
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
