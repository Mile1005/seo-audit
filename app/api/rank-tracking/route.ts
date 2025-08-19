import { NextRequest, NextResponse } from 'next/server';
import { SerpApiProvider } from '@/lib/rankTracking/provider';

export async function POST(req: NextRequest) {
  try {
    const { domain, keyword } = await req.json();
    if (!domain || !keyword) {
      return NextResponse.json({ error: 'Missing domain or keyword' }, { status: 400 });
    }
    const provider = new SerpApiProvider();
    const result = await provider.getRankSnapshot(domain, keyword);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
