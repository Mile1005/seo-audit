import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { domain } = await request.json();
    
    if (!domain) {
      return NextResponse.json({ error: 'domain is required' }, { status: 400 });
    }

    // Call the real OpenLinkProfiler API
    const olpApiUrl = `https://openlinkprofiler.org/api/domain/links?domain=${domain}&apikey=${process.env.OLP_API_KEY}`;
    
    const response = await fetch(olpApiUrl);
    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 429) {
        return NextResponse.json({ error: 'OpenLinkProfiler API quota exceeded. Please try again later.' }, { status: 429 });
      }
      return NextResponse.json({ error: errorData.message || 'Failed to fetch backlink data from OpenLinkProfiler API' }, { status: response.status });
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      domain, 
      totalBacklinks: data.total_links || 0,
      referringDomains: data.refdomains || 0,
      timestamp: new Date().toISOString(),
      rawData: process.env.NODE_ENV === 'development' ? data : undefined
    });
    
  } catch (error: any) {
    console.error('Backlinks error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to get backlink snapshot',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
