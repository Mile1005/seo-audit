import type { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { task, text, labels } = req.body;
  if (!task || !text || !MODEL_ENDPOINTS[task]) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
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
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'AI inference failed', details: error?.toString() });
  }
}
