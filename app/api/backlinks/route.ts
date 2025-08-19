import { NextRequest, NextResponse } from 'next/server';
import { OpenLinkProfilerProvider } from '@/lib/backlinks/provider';

export async function POST(req: NextRequest) {
  try {
    const { domain } = await req.json();
    if (!domain) {
      return NextResponse.json({ error: 'Missing domain' }, { status: 400 });
    }
    const provider = new OpenLinkProfilerProvider();
    const result = await provider.getBacklinkSnapshot(domain);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
