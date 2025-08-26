import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API called:', req.method, req.url);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed', 
      method: req.method,
      expectedMethod: 'POST'
    });
  }
  
  try {
    const { startUrl, limit = 30 } = req.body || {};
    console.log('Request body:', req.body);
    
    if (!startUrl) {
      return res.status(400).json({ error: 'Missing startUrl' });
    }
    
    // Simple mock response for now to test if the endpoint works
    const crawlId = Math.random().toString(36).slice(2);
    
    console.log('Returning mock response for:', startUrl);
    
    return res.status(200).json({ 
      crawlId, 
      status: 'ready', 
      message: `Mock crawl completed for ${startUrl}`, 
      result: {
        type: 'crawl',
        startUrl: startUrl,
        totalPages: 3,
        successfulPages: 3,
        failedPages: 0,
        averageLoadTime: 245,
        crawlTime: 3500,
        pages: [
          {
            url: startUrl,
            title: 'Home Page - Mock Title',
            description: 'Mock page description for home page',
            statusCode: 200,
            h1: 'Welcome to Our Website',
            meta_description: 'Mock meta description',
            canonical: startUrl,
            noindex: false,
            internal_links: 5,
            external_links: 2,
            load_time_ms: 230,
            images_without_alt: 0,
            og: { title: 'Mock OG Title', description: 'Mock OG Description' },
            twitter: { card: 'summary', title: 'Mock Twitter Title' },
            structuredData: {}
          },
          {
            url: `${startUrl}/about`,
            title: 'About Us - Mock Title',
            description: 'Mock about page description',
            statusCode: 200,
            h1: 'About Our Company',
            meta_description: 'Learn more about our company',
            canonical: `${startUrl}/about`,
            noindex: false,
            internal_links: 8,
            external_links: 1,
            load_time_ms: 255,
            images_without_alt: 1,
            og: { title: 'About Us', description: 'About our company' },
            twitter: { card: 'summary' },
            structuredData: {}
          },
          {
            url: `${startUrl}/contact`,
            title: 'Contact Us - Mock Title',
            description: 'Get in touch with us',
            statusCode: 200,
            h1: 'Contact Information',
            meta_description: 'Contact us for more information',
            canonical: `${startUrl}/contact`,
            noindex: false,
            internal_links: 3,
            external_links: 0,
            load_time_ms: 250,
            images_without_alt: 0,
            og: { title: 'Contact Us', description: 'Get in touch' },
            twitter: { card: 'summary' },
            structuredData: {}
          }
        ],
        issues: {
          noindex_pages: 0,
          missing_titles: 0,
          missing_h1: 0,
          missing_meta_descriptions: 0,
          images_without_alt: 1,
          pages_without_canonical: 0,
          broken_links: 0,
          duplicate_titles: [],
          duplicate_canonicals: []
        },
        robotsTxt: {
          found: true,
          content: 'User-agent: *\nAllow: /'
        },
        sitemapXml: {
          found: true,
          urls: [startUrl, `${startUrl}/about`, `${startUrl}/contact`]
        }
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
