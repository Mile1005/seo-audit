import { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
  noIndex?: boolean
  structuredData?: Record<string, any>
}

const defaultSEO: SEOConfig = {
  title: 'AISEOTurbo - AI-Powered SEO Audits & Optimization Tools',
  description: 'Boost your website rankings with comprehensive SEO audits, competitor analysis, and AI-powered recommendations. Get actionable insights to drive organic traffic.',
  keywords: [
    'SEO audit',
    'SEO analysis',
    'website optimization',
    'organic traffic',
    'search engine optimization',
    'competitor analysis',
    'keyword research',
    'technical SEO',
    'AI SEO tools'
  ],
  ogType: 'website',
  twitterCard: 'summary_large_image',
  ogImage: '/images/og-default.webp'
}

/**
 * Generate metadata for Next.js pages
 */
export function generateSEOMeta(config: Partial<SEOConfig> = {}): Metadata {
  const seo = { ...defaultSEO, ...config }
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aiseoturbo.com'
  const canonical = seo.canonical || baseUrl
  const ogImageUrl = seo.ogImage?.startsWith('http') 
    ? seo.ogImage 
    : `${baseUrl}${seo.ogImage}`

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(', '),
    robots: seo.noIndex ? 'noindex,nofollow' : 'index,follow',
    
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      type: seo.ogType,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: seo.title,
        }
      ],
      siteName: 'AISEOTurbo',
    },
    
    twitter: {
      card: seo.twitterCard,
      title: seo.title,
      description: seo.description,
      images: [ogImageUrl],
      creator: '@aiseoturbo',
      site: '@aiseoturbo',
    },
    
    alternates: {
      canonical,
    },
    
    other: {
      'theme-color': '#8B5CF6',
      'msapplication-TileColor': '#8B5CF6',
    }
  }
}

/**
 * Generate JSON-LD structured data
 */
export function generateStructuredData(type: 'website' | 'organization' | 'product' | 'article', data: Record<string, any> = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aiseoturbo.com'
  
  const commonData = {
    '@context': 'https://schema.org',
    '@type': type === 'website' ? 'WebSite' : 
              type === 'organization' ? 'Organization' :
              type === 'product' ? 'SoftwareApplication' : 'Article'
  }

  switch (type) {
    case 'website':
      return {
        ...commonData,
        name: 'AISEOTurbo',
        description: 'AI-Powered SEO Audits & Optimization Tools',
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        },
        ...data
      }

    case 'organization':
      return {
        ...commonData,
        name: 'AISEOTurbo',
        description: 'Leading provider of AI-powered SEO audit and optimization tools',
        url: baseUrl,
        logo: `${baseUrl}/images/logo.webp`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-555-SEO-TURBO',
          contactType: 'customer service',
          availableLanguage: 'English'
        },
        sameAs: [
          'https://twitter.com/aiseoturbo',
          'https://linkedin.com/company/aiseoturbo',
          'https://github.com/aiseoturbo'
        ],
        ...data
      }

    case 'product':
      return {
        ...commonData,
        name: 'AISEOTurbo SEO Audit Tool',
        description: 'Comprehensive SEO audit and optimization platform powered by AI',
        url: baseUrl,
        applicationCategory: 'SEO Tool',
        operatingSystem: 'Web Browser',
        offers: {
          '@type': 'Offer',
          price: '49.00',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          availability: 'https://schema.org/InStock'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '1247',
          bestRating: '5',
          worstRating: '1'
        },
        ...data
      }

    default:
      return { ...commonData, ...data }
  }
}

/**
 * Page-specific SEO configurations
 */
export const pageSEO = {
  home: {
    title: 'AISEOTurbo - AI-Powered SEO Audits That Drive Results',
    description: 'Get comprehensive SEO audits, competitor analysis, and AI-powered recommendations. Boost your organic traffic with actionable insights from industry experts.',
    keywords: ['SEO audit tool', 'AI SEO analysis', 'website optimization', 'organic traffic growth']
  },
  
  features: {
    title: 'Advanced SEO Features - Comprehensive Analysis & Optimization',
    description: 'Discover powerful SEO features including technical audits, competitor analysis, keyword tracking, and AI-powered recommendations for better rankings.',
    keywords: ['SEO features', 'technical SEO audit', 'competitor analysis', 'keyword tracking']
  },
  
  pricing: {
    title: 'SEO Audit Pricing - Affordable Plans for Every Business',
    description: 'Choose the perfect SEO audit plan for your business. Get comprehensive audits, unlimited reports, and expert recommendations starting at $49/month.',
    keywords: ['SEO audit pricing', 'SEO tools cost', 'website audit plans']
  },
  
  about: {
    title: 'About AISEOTurbo - SEO Experts & AI Innovation',
    description: 'Learn about our mission to democratize professional SEO audits through AI-powered tools. Meet our team of SEO experts and data scientists.',
    keywords: ['SEO company', 'AI SEO experts', 'search engine optimization team']
  },
  
  contact: {
    title: 'Contact Us - Get Expert SEO Help & Support',
    description: 'Get in touch with our SEO experts for personalized guidance, technical support, or partnership inquiries. We\'re here to help optimize your success.',
    keywords: ['SEO support', 'contact SEO experts', 'SEO consultation']
  }
}
