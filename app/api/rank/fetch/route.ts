import { NextRequest, NextResponse } from 'next/server';
import { fetchKeywordRank } from '@/lib/rank';
import { getPrisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { domainId, keyword } = await req.json();
    if (!domainId || !keyword) {
      return NextResponse.json({ error: 'Missing domainId or keyword' }, { status: 400 });
    }
    const prisma = await getPrisma();
    const domain = await prisma.domain.findUnique({ where: { id: domainId } });
    if (!domain) {
      return NextResponse.json({ error: 'Domain not found' }, { status: 404 });
    }
    const { position, provider } = await fetchKeywordRank(domain.url, keyword);
    const saved = await prisma.rankSnapshot.create({
      data: {
        domainId,
        keyword,
        position,
        provider,
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
