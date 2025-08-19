import { NextRequest, NextResponse } from 'next/server';
import { fetchBacklinkSnapshot } from '@/lib/backlinks';
import { getPrisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { domainId, domainUrl } = await req.json();
    if (!domainId || !domainUrl) {
      return NextResponse.json({ error: 'Missing domainId or domainUrl' }, { status: 400 });
    }
    const snapshot = await fetchBacklinkSnapshot(domainUrl);
    const prisma = await getPrisma();
    const saved = await prisma.backlinkSnapshot.create({
      data: {
        domainId,
        totalBacklinks: snapshot.totalBacklinks,
        referringDomains: snapshot.referringDomains,
        provider: snapshot.provider,
      },
    });
    return NextResponse.json(saved);
  } catch (error: any) {
    if (error.message && error.message.toLowerCase().includes('quota')) {
      return NextResponse.json({ error: 'Quota reached, try again later' }, { status: 429 });
    }
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
