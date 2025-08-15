import { NextRequest, NextResponse } from 'next/server';

const HF_API_TOKEN = process.env.HF_API_TOKEN;

const MODEL_ENDPOINTS: Record<string, string> = {
  'sentiment': 'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
  'intent': 'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
  'summarization': 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
  'ner': 'https://api-inference.huggingface.co/models/dbmdz/bert-large-cased-finetuned-conll03-english',
  'topic': 'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
  'toxicity': 'https://api-inference.huggingface.co/models/unitary/toxic-bert',
  'language': 'https://api-inference.huggingface.co/models/papluca/xlm-roberta-base-language-detection',
  'paraphrase': 'https://api-inference.huggingface.co/models/Vamsi/T5_Paraphrase_Paws',
  'question': 'https://api-inference.huggingface.co/models/valhalla/t5-base-qg-hl',
};

export async function POST(req: NextRequest) {
  try {
    const { task, text, labels } = await req.json();
    
    if (!task || !text || !MODEL_ENDPOINTS[task]) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (!HF_API_TOKEN) {
      return NextResponse.json({ error: 'Hugging Face API token not configured' }, { status: 500 });
    }

    const body: any = { inputs: text };
    // For zero-shot classification (topic)
    if (task === 'topic' && labels) {
      body.parameters = { candidate_labels: labels };
    }

    const response = await fetch(MODEL_ENDPOINTS[task], {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API error:', response.status, errorText);
      return NextResponse.json({ 
        error: 'AI inference failed', 
        details: `Status: ${response.status}, ${errorText}` 
      }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('AI inference error:', error);
    return NextResponse.json({ 
      error: 'AI inference failed', 
      details: error?.toString() 
    }, { status: 500 });
  }
}
