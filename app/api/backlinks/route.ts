import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { domain } = await request.json();
    
    if (!domain) {
      return NextResponse.json({ error: 'domain is required' }, { status: 400 });
    }

    // Check if API key is available
    if (!process.env.OLP_API_KEY) {
      console.error('OLP_API_KEY is not set');
      
      // Fallback mode for testing without API key
      if (process.env.NODE_ENV === 'development' || process.env.ALLOW_FALLBACK === 'true') {
        console.log('Using fallback mode for backlinks');
        const mockBacklinks = Math.floor(Math.random() * 10000) + 100;
        const mockDomains = Math.floor(Math.random() * 500) + 10;
        
        return NextResponse.json({ 
          domain, 
          totalBacklinks: mockBacklinks,
          referringDomains: mockDomains,
          timestamp: new Date().toISOString(),
          note: 'Fallback mode - not real data'
        });
      }
      
      return NextResponse.json({ error: 'OpenLinkProfiler API key not configured' }, { status: 500 });
    }

    console.log('Backlinks request:', { domain, hasApiKey: !!process.env.OLP_API_KEY });

    // Call the real OpenLinkProfiler API
    const olpApiUrl = `https://openlinkprofiler.org/api/domain/links?domain=${domain}&apikey=${process.env.OLP_API_KEY}`;
    
    console.log('Calling OpenLinkProfiler API:', olpApiUrl.replace(process.env.OLP_API_KEY!, '***'));
    
    const response = await fetch(olpApiUrl);
    console.log('OpenLinkProfiler API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenLinkProfiler API error response:', errorText.substring(0, 500));
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        // If it's HTML, extract useful info
        if (errorText.includes('<!DOCTYPE') || errorText.includes('<html')) {
          errorData = { 
            message: 'API returned HTML instead of JSON. This usually means authentication failed or the endpoint is incorrect.',
            status: response.status
          };
        } else {
          errorData = { message: errorText.substring(0, 200) };
        }
      }
      
      if (response.status === 429) {
        return NextResponse.json({ error: 'OpenLinkProfiler API quota exceeded. Please try again later.' }, { status: 429 });
      }
      
      return NextResponse.json({ 
        error: errorData.message || `OpenLinkProfiler API error: ${response.status}`,
        details: errorText.substring(0, 200) // First 200 chars for debugging
      }, { status: response.status });
    }

    const responseText = await response.text();
    console.log('OpenLinkProfiler API response length:', responseText.length);
    
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('OpenLinkProfiler API success response keys:', Object.keys(data));
    } catch (parseError) {
      console.error('Failed to parse OpenLinkProfiler response as JSON:', parseError);
      console.error('Response preview:', responseText.substring(0, 500));
      
      return NextResponse.json({ 
        error: 'OpenLinkProfiler API returned invalid JSON',
        details: responseText.substring(0, 200),
        status: response.status
      }, { status: 500 });
    }
    
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
