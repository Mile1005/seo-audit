import type { NextApiRequest, NextApiResponse } from 'next';
import { performComprehensiveAudit } from '../../../lib/comprehensive-audit';
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
      // If database is disabled, we need to return a comprehensive mock result
      // In a real implementation, you might want to store results in memory or use a different approach
      
      // Mock HTML content for comprehensive audit
      const mockHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <title>Launch and Scale your Brand with AI</title>
          <meta name="description" content="Create a name, design your logo, and launch your website - everything you need to build a brand and establish your online presence in minutes.">
          <link rel="canonical" href="https://produkto.io/">
          <meta property="og:title" content="Launch and Scale your Brand with AI">
          <meta property="og:url" content="https://produkto.io/">
          <meta property="og:description" content="Create a name, design your logo, and launch your website - everything you need to build a brand and establish your online presence in minutes.">
          <meta property="og:image" content="https://produkto.io/og-image.jpg">
          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:title" content="Launch and Scale your Brand with AI">
          <meta name="twitter:description" content="Create a name, design your logo, and launch your website - everything you need to build a brand and establish your online presence in minutes.">
        </head>
        <body>
          <main>
            <h1>Launch and Scale your Brand with AI</h1>
            <h2>Tools for Your Business Success</h2>
            <h2>How to Build Your Brand?</h2>
            <h2>Trusted by Small Businesses</h2>
            <h2>Get Your Free AI-Generated Brand</h2>
            <h3>Logo Maker</h3>
            <h3>Slogan Generator</h3>
            <h3>Website Builder</h3>
            <h3>Color Palette Generator</h3>
            <h3>Business Name Generator</h3>
            <h3>Icon Generator</h3>
            <h3>1. Select an industry</h3>
            <h3>4. Select a logo</h3>
            <h3>2. Enter a brand name</h3>
            <h3>5. Generate your brand</h3>
            <h3>3. Select a color palette</h3>
            <h3>6. Launch your business</h3>
            <p>Create a name, design your logo, and launch your website - everything you need to build a brand and establish your online presence in minutes.</p>
            <img src="logo.png" alt="Brand Logo">
            <a href="/tools">Tools</a>
            <a href="/about">About</a>
            <button>Get Started</button>
          </main>
        </body>
        </html>
      `;

      const mockResult = performComprehensiveAudit(mockHtml, "https://produkto.io/");
      
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
