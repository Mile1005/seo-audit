import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { domain, keyword } = await request.json();
    
    if (!domain || !keyword) {
      return NextResponse.json({ error: 'domain and keyword are required' }, { status: 400 });
    }

    // Check if API key is available
    if (!process.env.SERP_API_KEY) {
      console.error('SERP_API_KEY is not set');
      
      // Fallback mode for testing without API key
      if (process.env.NODE_ENV === 'development' || process.env.ALLOW_FALLBACK === 'true') {
        console.log('Using fallback mode for rank tracking');
        const mockPosition = Math.floor(Math.random() * 50) + 1; // Random position 1-50
        
        return NextResponse.json({ 
          domain, 
          keyword, 
          position: mockPosition,
          totalResults: 100,
          timestamp: new Date().toISOString(),
          note: 'Fallback mode - not real data'
        });
      }
      
      return NextResponse.json({ error: 'SERP API key not configured' }, { status: 500 });
    }

    console.log('Rank tracking request:', { domain, keyword, hasApiKey: !!process.env.SERP_API_KEY });

    // Call the real SERP API
    const serpApiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(keyword)}&domain=${domain}&apikey=${process.env.SERP_API_KEY}`;
    
    console.log('Calling SERP API:', serpApiUrl.replace(process.env.SERP_API_KEY!, '***'));
    
    const response = await fetch(serpApiUrl);
    console.log('SERP API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('SERP API error response:', errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: { message: errorText } };
      }
      
      if (response.status === 429) {
        return NextResponse.json({ error: 'SERP API quota exceeded. Please try again later.' }, { status: 429 });
      }
      
      return NextResponse.json({ 
        error: errorData.error?.message || `SERP API error: ${response.status}`,
        details: errorText.substring(0, 200) // First 200 chars for debugging
      }, { status: response.status });
    }

    const data = await response.json();
    console.log('SERP API success response keys:', Object.keys(data));
    
    // Find the position of the domain in the organic results
    const organicResults = data.organic_results;
    let position = 0;
    
    if (organicResults && Array.isArray(organicResults)) {
      const foundResult = organicResults.find((result: any) => {
        try {
          const url = new URL(result.link);
          return url.hostname.includes(new URL(domain).hostname);
        } catch {
          return false;
        }
      });
      
      if (foundResult) {
        position = foundResult.position || 0;
        console.log('Found domain in results:', { position, link: foundResult.link });
      } else {
        console.log('Domain not found in organic results');
      }
    } else {
      console.log('No organic results found in SERP response');
    }

    return NextResponse.json({ 
      domain, 
      keyword, 
      position,
      totalResults: organicResults?.length || 0,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('Rank tracking error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to track rank',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
