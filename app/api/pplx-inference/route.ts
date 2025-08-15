import { NextRequest, NextResponse } from 'next/server';

const PPLX_API_KEY = process.env.PPLX_API_KEY;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!PPLX_API_KEY) {
    console.error('Perplexity API key not configured');
    return NextResponse.json({ error: 'Perplexity API key not configured' }, { status: 500 });
  }

  // Use a supported model for Perplexity Pro (llama-3-sonar-large-32k-online)
  const model = 'llama-3-sonar-large-32k-online';

  try {
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
    if (!response.ok) {
      const error = await response.text();
      console.error(`Perplexity API error for model ${model}:`, error);
      return NextResponse.json({ error: `Perplexity API error: ${error}` }, { status: 500 });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Unexpected error in Perplexity API route:', err);
    return NextResponse.json({ error: 'Unexpected error in Perplexity API route.' }, { status: 500 });
  }
}
