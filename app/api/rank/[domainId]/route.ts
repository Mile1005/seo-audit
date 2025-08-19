import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { domainId: string } }) {
  try {
    const { domainId } = params;
    if (!domainId) {
      return NextResponse.json({ error: 'Missing domainId' }, { status: 400 });
    }
    const prisma = await getPrisma();
    const snapshots = await prisma.rankSnapshot.findMany({
      where: { domainId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return NextResponse.json(snapshots);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
