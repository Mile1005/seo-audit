import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Test endpoint works', method: req.method });
  }
  if (req.method === 'POST') {
    return res.status(200).json({ message: 'POST test endpoint works', body: req.body });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
