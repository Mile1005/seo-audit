import { NextRequest, NextResponse } from 'next/server';

const PPLX_API_KEY = process.env.PPLX_API_KEY;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!PPLX_API_KEY) {
    console.error('Perplexity API key not configured');
    return NextResponse.json({ error: 'Perplexity API key not configured' }, { status: 500 });
  }

  // Try main model first, then fallback to 7b if it fails
  const tryModels = async (models: string[]): Promise<Response> => {
    for (const model of models) {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PPLX_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: 'You are an expert SEO consultant.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });
      if (response.ok) return response;
      const error = await response.text();
      console.error(`Perplexity API error for model ${model}:`, error);
    }
    // If all models fail, return the last error
    return new Response('All models failed', { status: 500 });
  };

  const response = await tryModels(['pplx-70b-online', 'pplx-7b-online']);

  if (!response.ok) {
    const error = await response.text();
    console.error('Final Perplexity API error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
