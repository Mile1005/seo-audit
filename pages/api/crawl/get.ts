import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('GET API called:', req.method, req.url, req.query);
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { id } = req.query;
    console.log('Crawl ID requested:', id);
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Missing crawl ID parameter' });
    }
    
    // Simple mock response
    console.log('Returning mock crawl result for ID:', id);
    
    return res.status(200).json({
      status: 'ready',
      crawlId: id,
      startUrl: 'https://example.com',
      result: {
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
            images_without_alt: 0,
            og: { title: 'Mock OG Title', description: 'Mock OG Description' },
            twitter: { card: 'summary', title: 'Mock Twitter Title' },
            structuredData: {}
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
            images_without_alt: 1,
            og: { title: 'About Us', description: 'About our company' },
            twitter: { card: 'summary' },
            structuredData: {}
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
          urls: ['https://example.com', 'https://example.com/about', 'https://example.com/contact']
        }
      }
    });
  } catch (error) {
    console.error('Get crawl error:', error);
    return res.status(500).json({ 
      error: 'Failed to get crawl status', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
