import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Audit ID is required' });
    }

    // For now, return mock data - in production this would come from the actual audit results
    const mockResult = {
      id: id,
      url: 'https://example.com',
      keyword: 'example keyword',
      status: 'completed' as const,
      scores: {
        overall: 78,
        technical: 85,
        accessibility: 72,
        performance: 68,
        content: 82,
      },
      issues: [
        {
          id: '1',
          category: 'technical',
          severity: 'medium' as const,
          title: 'Missing Meta Description',
          description: 'The page is missing a meta description tag.',
          impact: 'Medium impact on click-through rates from search results',
          recommendation: 'Add a compelling meta description between 150-160 characters',
        },
        {
          id: '2',
          category: 'performance',
          severity: 'high' as const,
          title: 'Large Image Files',
          description: 'Several images are not optimized for web.',
          impact: 'High impact on page load speed and user experience',
          recommendation: 'Compress images and use WebP format where possible',
        },
        {
          id: '3',
          category: 'accessibility',
          severity: 'low' as const,
          title: 'Missing Alt Text',
          description: 'Some images are missing alt text attributes.',
          impact: 'Low impact on accessibility for screen readers',
          recommendation: 'Add descriptive alt text to all images',
        },
      ],
      recommendations: [
        {
          id: '1',
          title: 'Optimize Page Speed',
          description: 'Implement image compression and lazy loading to improve page load times.',
          priority: 'high' as const,
          estimatedImpact: 'High - 15-20% improvement in page speed',
        },
        {
          id: '2',
          title: 'Add Meta Description',
          description: 'Create a compelling meta description to improve click-through rates.',
          priority: 'medium' as const,
          estimatedImpact: 'Medium - 10-15% improvement in CTR',
        },
        {
          id: '3',
          title: 'Improve Accessibility',
          description: 'Add alt text to images and ensure proper heading structure.',
          priority: 'low' as const,
          estimatedImpact: 'Low - Better accessibility compliance',
        },
      ],
    };

    res.status(200).json(mockResult);
  } catch (error) {
    console.error('SEO audit results error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
