import { NextRequest, NextResponse } from 'next/server';

const PPLX_API_KEY = process.env.PPLX_API_KEY;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!PPLX_API_KEY) {
    return NextResponse.json({ error: 'Perplexity API key not configured' }, { status: 500 });
  }

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PPLX_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'pplx-70b-online',
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
    return NextResponse.json({ error }, { status: 500 });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
