import { NextRequest, NextResponse } from 'next/server';

const HF_API_TOKEN = process.env.HF_API_TOKEN;

const MODEL_ENDPOINTS: Record<string, string> = {
  'sentiment': 'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest',
  'intent': 'https://api-inference.huggingface.co/models/facebook/bart-large-mnli', // Using a zero-shot model for intent
  'summarization': 'https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6',
  'ner': 'https://api-inference.huggingface.co/models/dslim/bert-base-NER',
  'topic': 'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
  'toxicity': 'https://api-inference.huggingface.co/models/unitary/toxic-bert',
  'language': 'https://api-inference.huggingface.co/models/papluca/xlm-roberta-base-language-detection',
  'paraphrase': 'https://api-inference.huggingface.co/models/tuner007/pegasus_paraphrase',
  'question': 'https://api-inference.huggingface.co/models/valhalla/t5-base-qg-hl', // Switched to a more reliable question generator
};

export async function POST(req: NextRequest) {
  try {
    const { task, text, labels } = await req.json();
    
    if (!task || !text || !MODEL_ENDPOINTS[task]) {
      return NextResponse.json({ 
        error: 'Invalid request', 
        availableTasks: Object.keys(MODEL_ENDPOINTS) 
      }, { status: 400 });
    }

    if (!HF_API_TOKEN) {
      return NextResponse.json({ 
        error: 'Hugging Face API token not configured',
        hint: 'Please set HF_API_TOKEN environment variable'
      }, { status: 500 });
    }

    // Prepare request body based on task type
    let body: any = { inputs: text };
    
    if ((task === 'topic' || task === 'intent') && labels) {
      body.parameters = { candidate_labels: labels };
    } else if (task === 'summarization') {
      body = { 
        inputs: text,
        parameters: {
          max_length: 150,
          min_length: 30,
          do_sample: false
        }
      };
    } else if (task === 'paraphrase') {
      body = { 
        inputs: `paraphrase: ${text}`,
        parameters: {
          max_length: 200,
          temperature: 0.7
        }
      };
    } else if (task === 'question') {
      body = { 
        inputs: `generate questions: ${text}`,
        parameters: {
          max_length: 100,
          num_return_sequences: 3
        }
      };
    }

    console.log(`Making request to ${MODEL_ENDPOINTS[task]} for task: ${task}`);
    
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
      console.error('Hugging Face API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        model: MODEL_ENDPOINTS[task],
        task
      });
      
      return NextResponse.json({ 
        error: 'AI inference failed', 
        details: `Status: ${response.status} ${response.statusText}`,
        model: MODEL_ENDPOINTS[task],
        task: task,
        rawError: errorText
      }, { status: 500 });
    }

    const data = await response.json();
    console.log(`Successful response for task ${task}:`, data);
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('AI inference error:', error);
    return NextResponse.json({ 
      error: 'AI inference failed', 
      details: error?.toString(),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
