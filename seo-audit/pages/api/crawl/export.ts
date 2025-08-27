import type { NextApiRequest, NextApiResponse } from 'next';
import { getCrawlRecord } from '../../../lib/crawl-store';
import { generateCrawlCSV } from '../../../lib/crawl';

// Simple CSV generation function for mock data
function generateMockCSV(crawlData: any): string {
  const headers = [
    'URL', 'Status', 'Title', 'H1', 'Meta Description', 'Canonical',
    'Noindex', 'Internal Links', 'External Links', 'Load Time (ms)',
    'Images Missing Alt'
  ];
  
  const rows = [headers.join(',')];
  
  crawlData.pages.forEach((page: any) => {
    const row = [
      `"${page.url}"`,
      page.statusCode,
      `"${(page.title || '').replace(/"/g, '""')}"`,
      page.h1 ? 'Yes' : 'No',
      `"${(page.meta_description || '').replace(/"/g, '""')}"`,
      `"${page.canonical || ''}"`,
      page.noindex ? 'Yes' : 'No',
      page.internal_links || 0,
      page.external_links || 0,
      page.load_time_ms || 0,
      page.images_without_alt || 0
    ];
    rows.push(row.join(','));
  });
  
  return rows.join('\n');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { id, format } = req.query;
    console.log('Export request:', { id, format });
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Missing crawl ID parameter' });
    }
    
  // Check if we have real crawl data
  const crawlData = await getCrawlRecord(id);
    
  if (crawlData && crawlData.status === 'completed' && crawlData.result) {
      console.log('Exporting real crawl data');
      
      if (format === 'json') {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="crawl-${id}.json"`);
        return res.status(200).send(JSON.stringify(crawlData.result, null, 2));
      }
      
      // Use the real CSV generator from lib/crawl.ts
      const csvContent = generateCrawlCSV(crawlData.result);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="crawl-${id}.csv"`);
      return res.status(200).send(csvContent);
  }
    
    // Fallback to mock data
    console.log('Exporting mock crawl data');
    const mockData = {
      type: 'crawl',
      startUrl: 'https://example.com',
      totalPages: 3,
      successfulPages: 3,
      failedPages: 0,
      averageLoadTime: 245,
      crawlTime: 3500,
      pages: [
        {
          url: 'https://example.com',
          title: 'Home Page - Mock Title',
          description: 'Mock page description for home page',
          statusCode: 200,
          h1: 'Welcome to Our Website',
          meta_description: 'Mock meta description',
          canonical: 'https://example.com',
          noindex: false,
          internal_links: 5,
          external_links: 2,
          load_time_ms: 230,
          images_without_alt: 0
        },
        {
          url: 'https://example.com/about',
          title: 'About Us - Mock Title',
          description: 'Mock about page description',
          statusCode: 200,
          h1: 'About Our Company',
          meta_description: 'Learn more about our company',
          canonical: 'https://example.com/about',
          noindex: false,
          internal_links: 8,
          external_links: 1,
          load_time_ms: 255,
          images_without_alt: 1
        },
        {
          url: 'https://example.com/contact',
          title: 'Contact Us - Mock Title',
          description: 'Get in touch with us',
          statusCode: 200,
          h1: 'Contact Information',
          meta_description: 'Contact us for more information',
          canonical: 'https://example.com/contact',
          noindex: false,
          internal_links: 3,
          external_links: 0,
          load_time_ms: 250,
          images_without_alt: 0
        }
      ]
    };
    
    if (format === 'json') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="crawl-${id}.json"`);
      return res.status(200).send(JSON.stringify(mockData, null, 2));
    }
    
    // Default to CSV
    const csvContent = generateMockCSV(mockData);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="crawl-${id}.csv"`);
    return res.status(200).send(csvContent);
  } catch (error) {
    console.error('Export error:', error);
    return res.status(500).json({ 
      error: 'Failed to export crawl data', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
