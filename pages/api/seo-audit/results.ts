import type { NextApiRequest, NextApiResponse } from 'next';
// import { dbHelpers } from '../../../lib/db'; // Temporarily disabled for Vercel deployment

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

    // Temporarily disable database for Vercel deployment
    const useDb = false; // process.env.DISABLE_DB !== "true" && !!process.env.DATABASE_URL;

    // if (useDb) {
    //   // Get the run and its associated audit from database
    //   const run = await dbHelpers.getRunWithAudit(id);

    //   if (!run) {
    //     return res.status(404).json({ error: 'Audit not found' });
    //   }

    //   // If audit is ready, return the results
    //   if (run.status === "ready" && run.audit) {
    //     const json = typeof run.audit.json === "string" ? JSON.parse(run.audit.json) : run.audit.json;
    //     return res.status(200).json({
    //       status: "done",
    //       result: json,
    //     });
    //   }

    //   // If audit failed
    //   if (run.status === "failed") {
    //     return res.status(500).json({
    //       status: "error",
    //       error: "Audit processing failed",
    //     });
    //   }

    //   // Still processing
    //   return res.status(200).json({
    //     status: run.status,
    //     message: `Audit is ${run.status}`,
    //   });
    // } else {
      // If database is disabled, we need to return a mock result since we can't access the previous response
      // In a real implementation, you might want to store results in memory or use a different approach
      const mockResult = {
        url: "https://example.com",
        scores: {
          overall: 85
        },
        issues: [
          {
            title: "Missing Meta Description",
            description: "The page is missing a meta description tag.",
            severity: "medium",
            recommendation: "Add a compelling meta description between 150-160 characters."
          },
          {
            title: "Slow Page Load Time",
            description: "The page takes longer than 3 seconds to load.",
            severity: "high",
            recommendation: "Optimize images, minify CSS/JS, and use a CDN."
          }
        ],
        quick_wins: [
          {
            title: "Add Meta Description",
            description: "Improve click-through rates from search results."
          },
          {
            title: "Optimize Images",
            description: "Reduce page load time and improve user experience."
          }
        ],
        fetched_at: new Date().toISOString()
      };
      
      return res.status(200).json({
        status: "done",
        result: mockResult
      });
    // }

  } catch (error) {
    console.error('SEO audit results error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
