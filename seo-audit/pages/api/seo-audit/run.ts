import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchHtml } from '../../../lib/scrape';
import { parseHtml } from '../../../lib/parse';
import { calculateAudit } from '../../../lib/heuristics';
import { fetchPageSpeed } from '../../../lib/psi';
// import { dbHelpers } from '../../../lib/db'; // Temporarily disabled for Vercel deployment

// Utility function to add HTTPS if missing
function ensureHttps(url: string): string {
  if (!url) return url;
  url = url.trim();
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, email, targetKeyword } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const pageUrl = ensureHttps(url);
    const runId = crypto.randomUUID();

    // Temporarily disable database for Vercel deployment
    const useDb = false; // process.env.DISABLE_DB !== "true" && !!process.env.DATABASE_URL;

    // Create run with status=queued (if DB enabled)
    // if (useDb) {
    //   await dbHelpers.createRun({
    //     id: runId,
    //     pageUrl,
    //     targetKeyword,
    //     email,
    //     status: "queued",
    //   });
    // }

          try {
        // if (useDb) {
        //   await dbHelpers.updateRunStatus(runId, "running");
        // }

      console.log(`Starting SEO audit for: ${pageUrl}`);

      // Fetch HTML content
      const html = await fetchHtml(pageUrl);
      console.log(`HTML fetched successfully for: ${pageUrl}`);

      // Parse HTML
      const parsed = await parseHtml(html, pageUrl);
      console.log(`HTML parsed successfully for: ${pageUrl}`);

      // Fetch PageSpeed Insights data if API key is available
      let performanceData = null;
      const psiApiKey = process.env.PSI_API_KEY;
      if (psiApiKey) {
        try {
          console.log("Fetching PageSpeed Insights data");
          performanceData = await fetchPageSpeed(pageUrl, psiApiKey);
          console.log("PSI data retrieved successfully");
        } catch (error) {
          console.warn("Failed to fetch PSI data:", error);
          // Continue without PSI data - it's optional
        }
      } else {
        console.log("PSI API key not provided - skipping performance analysis");
      }

      // Calculate comprehensive SEO audit
      const auditResult = await calculateAudit(pageUrl, parsed, {
        targetKeyword,
        performance: performanceData || undefined,
      });

      console.log(`SEO audit completed for: ${pageUrl}`);

              // Save audit result to database if enabled
        // if (useDb) {
        //   await dbHelpers.saveAudit({ 
        //     id: crypto.randomUUID(), 
        //     runId, 
        //     json: auditResult 
        //   });
        //   await dbHelpers.updateRunStatus(runId, "ready");
        // }

      // Return the audit result immediately (inline processing)
      const response = {
        auditId: runId,
        status: 'ready',
        message: `SEO audit completed for ${pageUrl}`,
        result: auditResult,
        estimatedTime: 'Completed',
      };

      res.status(200).json(response);

          } catch (e) {
        console.error("SEO audit processing failed:", e);
        
        // if (useDb) {
        //   await dbHelpers.updateRunStatus(runId, "failed");
        // }

      res.status(500).json({ 
        error: 'SEO audit failed',
        message: e instanceof Error ? e.message : 'Unknown error during audit processing'
      });
    }

  } catch (error) {
    console.error('Start audit error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
