import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { domain, keyword } = await request.json();
    
    if (!domain || !keyword) {
      return NextResponse.json({ error: 'domain and keyword are required' }, { status: 400 });
    }

    // Call the real SERP API
    const serpApiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(keyword)}&domain=${domain}&apikey=${process.env.SERP_API_KEY}`;
    
    const response = await fetch(serpApiUrl);
    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 429) {
        return NextResponse.json({ error: 'SERP API quota exceeded. Please try again later.' }, { status: 429 });
      }
      return NextResponse.json({ error: errorData.error?.message || 'Failed to fetch rank from SERP API' }, { status: response.status });
    }

    const data = await response.json();
    
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
      }
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
