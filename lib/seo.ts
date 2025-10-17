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
  twitterCard: 'summary_large_image'
  // ogImage will be set per page if needed
}

/**
 * Generate metadata for Next.js pages
 */
export function generateSEOMeta(config: Partial<SEOConfig> = {}): Metadata {
  const seo = { ...defaultSEO, ...config }
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aiseoturbo.com'
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aiseoturbo.com'
  
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
    title: 'AI SEO Audit Tool - Boost Rankings 300% Faster',
    description: 'Transform your SEO with AI-powered audits that identify 47+ critical issues. Join 10,000+ marketers using data-driven insights to skyrocket organic traffic and dominate search results.',
    keywords: ['AI SEO audit', 'SEO optimization tool', 'website ranking boost', 'organic traffic growth', 'technical SEO analysis']
  },
  
  features: {
    title: 'SEO Features - Complete Audit & Analysis | AI SEO Turbo',
    description: 'Discover powerful SEO features including technical audits, competitor analysis, keyword tracking, and AI-powered recommendations for better rankings.',
    keywords: ['SEO features', 'technical SEO audit', 'competitor analysis', 'keyword tracking'],
    canonical: 'https://www.aiseoturbo.com/features'
  },

  'features/seo-audit': {
    title: 'SEO Audit Feature - Comprehensive Analysis | AI SEO Turbo',
    description: 'Get detailed SEO audits with 47+ technical checks, AI-powered recommendations, and actionable insights to improve your website rankings.',
    keywords: ['SEO audit', 'technical SEO', 'website analysis', 'SEO recommendations'],
    canonical: 'https://www.aiseoturbo.com/features/seo-audit'
  },

  'features/site-crawler': {
    title: 'Site Crawler - Deep Website Analysis | AI SEO Turbo',
    description: 'Comprehensive website crawler that detects broken links, analyzes site structure, and identifies technical SEO issues for better search performance.',
    keywords: ['site crawler', 'website analysis', 'SEO crawler', 'broken links'],
    canonical: 'https://www.aiseoturbo.com/features/site-crawler'
  },

  'features/competitor-analysis': {
    title: 'Competitor Analysis - SEO Intelligence | AI SEO Turbo',
    description: 'Analyze competitor SEO strategies, keyword rankings, and backlink profiles. Discover opportunities to outrank competitors and gain market share.',
    keywords: ['competitor analysis', 'SEO intelligence', 'keyword tracking', 'competitive research'],
    canonical: 'https://www.aiseoturbo.com/features/competitor-analysis'
  },

  'features/ai-assistant': {
    title: 'AI SEO Assistant - Smart Recommendations | AI SEO Turbo',
    description: 'AI-powered SEO assistant providing personalized recommendations, content optimization suggestions, and automated insights for better rankings.',
    keywords: ['AI SEO assistant', 'SEO recommendations', 'AI optimization', 'SEO insights'],
    canonical: 'https://www.aiseoturbo.com/features/ai-assistant'
  },

  'features/keyword-tracking': {
    title: 'Keyword Tracking - Monitor Rankings | AI SEO Turbo',
    description: 'Track keyword positions across search engines, monitor ranking changes, and get alerts for SERP movements to optimize your SEO strategy.',
    keywords: ['keyword tracking', 'ranking monitor', 'SERP tracking', 'SEO alerts'],
    canonical: 'https://www.aiseoturbo.com/features/keyword-tracking'
  },
  
  pricing: {
    title: 'SEO Audit Pricing - Plans From $29/month | AI SEO Turbo',
    description: 'Choose the perfect SEO audit plan for your business. Start with our free plan or upgrade to Pro for advanced features and priority support.',
    keywords: ['SEO audit pricing', 'SEO tools cost', 'website audit plans']
  },
  
  about: {
    title: 'About AI SEO Turbo - Expert SEO Team & AI Innovation',
    description: 'Meet the SEO experts and AI engineers behind AI SEO Turbo. Learn how our 10+ years of combined experience helps 10,000+ businesses achieve 300% traffic growth through AI-powered optimization.',
    keywords: ['SEO company', 'AI SEO experts', 'SEO consultants', 'technical SEO team', 'AI optimization specialists']
  },
  
  contact: {
    title: 'Contact AI SEO Turbo - Expert SEO Support & Consultation',
    description: 'Get expert SEO help from certified specialists. Contact us for personalized consultation, technical support, and partnership inquiries. Join 10,000+ businesses achieving SEO success.',
    keywords: ['SEO support', 'contact SEO experts', 'SEO consultation', 'technical SEO help', 'SEO partnership']
  },

  blog: {
    title: 'SEO Blog - Tips & Strategies | AI SEO Turbo',
    description: 'Stay updated with the latest SEO tips, strategies, and best practices. Learn from expert insights on technical SEO, content optimization, and algorithms.',
    keywords: ['SEO blog', 'SEO tips', 'SEO strategies', 'search engine optimization'],
    canonical: 'https://www.aiseoturbo.com/blog'
  },

  help: {
    title: 'Help Center - SEO Support & Guides | AI SEO Turbo',
    description: 'Get help with AI SEO Turbo. Find answers to common questions, tutorials, troubleshooting guides, and contact support for personalized assistance.',
    keywords: ['SEO help', 'support center', 'SEO tutorials', 'troubleshooting'],
    canonical: 'https://www.aiseoturbo.com/help'
  },

  terms: {
    title: 'Terms of Service - Legal Agreement | AI SEO Turbo',
    description: 'Read our terms of service and legal agreement for using AI SEO Turbo. Understand your rights and responsibilities when using our SEO audit tools.',
    keywords: ['terms of service', 'legal agreement', 'SEO terms', 'user agreement'],
    canonical: 'https://www.aiseoturbo.com/terms'
  },

  privacy: {
    title: 'Privacy Policy - Data Protection | AI SEO Turbo',
    description: 'Learn how AISEOTurbo protects your privacy and handles your data. Our privacy policy covers GDPR compliance and data security measures.',
    keywords: ['privacy policy', 'data protection', 'GDPR', 'privacy rights'],
    canonical: 'https://www.aiseoturbo.com/privacy'
  },

  dashboard: {
    title: 'SEO Dashboard - Track Performance | AI SEO Turbo',
    description: 'Access your personalized SEO dashboard to monitor performance, track rankings, analyze competitors, and get AI-powered optimization recommendations.',
    keywords: ['SEO dashboard', 'analytics', 'keyword tracking', 'competitor analysis'],
    canonical: 'https://www.aiseoturbo.com/dashboard',
    noIndex: true
  },

  login: {
    title: 'Login - Access Your SEO Dashboard | AI SEO Turbo',
    description: 'Sign in to your AI SEO Turbo account to access comprehensive SEO audits, analytics dashboard, and optimization tools for your websites.',
    keywords: ['login', 'sign in', 'SEO dashboard', 'account access'],
    canonical: 'https://www.aiseoturbo.com/login',
    noIndex: true
  },

  signup: {
    title: 'Sign Up - Start Your SEO Journey | AI SEO Turbo',
    description: 'Create your free AI SEO Turbo account and start optimizing your website with AI-powered SEO audits, competitor analysis, and expert recommendations.',
    keywords: ['sign up', 'register', 'SEO tools', 'free account'],
    canonical: 'https://www.aiseoturbo.com/signup',
    noIndex: true
  },

  'forgot-password': {
    title: 'Reset Password - Account Recovery | AI SEO Turbo',
    description: 'Reset your AI SEO Turbo account password securely. Regain access to your SEO dashboard, audits, and optimization tools quickly and safely.',
    keywords: ['reset password', 'forgot password', 'account recovery'],
    canonical: 'https://www.aiseoturbo.com/forgot-password',
    noIndex: true
  },

  community: {
    title: 'SEO Community - Connect & Learn | AI SEO Turbo',
    description: 'Join the AI SEO Turbo community to connect with SEO professionals, share insights, learn from experts, and stay updated with the latest SEO trends.',
    keywords: ['SEO community', 'SEO professionals', 'SEO networking', 'SEO insights']
  },

  demo: {
    title: 'Free SEO Audit Demo - Try AI Analysis Tool Online',
    description: 'Experience our AI-powered SEO audit tool free. Analyze any website instantly with 47+ technical checks, competitor insights, and actionable recommendations that boost rankings.',
    keywords: ['SEO audit demo', 'free SEO analysis', 'AI SEO tool demo', 'website audit online', 'technical SEO checker']
  },

  careers: {
    title: 'Careers - Join SEO Experts Team | AI SEO Turbo',
    description: 'Join AISEOTurbo to revolutionize SEO with AI. We\'re hiring talented individuals passionate about search engine optimization and cutting-edge technology.',
    keywords: ['careers', 'jobs', 'SEO', 'AI', 'technology', 'remote work'],
    canonical: 'https://www.aiseoturbo.com/careers'
  },

  'case-studies': {
    title: 'SEO Success Stories & Case Studies | AI SEO Turbo',
    description: 'Explore real SEO success stories and case studies. See how businesses achieved significant traffic growth and ranking improvements using AI SEO Turbo.',
    keywords: ['SEO case studies', 'SEO success stories', 'SEO results', 'website optimization case studies'],
    canonical: 'https://www.aiseoturbo.com/case-studies'
  },

  'dashboard/projects': {
    title: 'Projects - Manage SEO Audits | AI SEO Turbo',
    description: 'Manage your SEO projects, organize website audits, and track optimization progress across all your domains from your dashboard.',
    keywords: ['SEO projects', 'website audits', 'project management', 'SEO tracking'],
    canonical: 'https://www.aiseoturbo.com/dashboard/projects',
    noIndex: true
  },

  'dashboard/audit': {
    title: 'SEO Audit Dashboard | AI SEO Turbo',
    description: 'Run comprehensive SEO audits from your dashboard, analyze technical issues, and receive AI-powered recommendations to improve website performance.',
    keywords: ['SEO audit dashboard', 'technical audit', 'SEO analysis', 'performance optimization'],
    canonical: 'https://www.aiseoturbo.com/dashboard/audit',
    noIndex: true
  },

  'dashboard/keywords': {
    title: 'Keyword Tracking Dashboard | AI SEO Turbo',
    description: 'Monitor keyword rankings, track SERP position changes, and analyze keyword performance data across all search engines from your dashboard.',
    keywords: ['keyword dashboard', 'ranking tracker', 'SERP monitoring', 'keyword analytics'],
    canonical: 'https://www.aiseoturbo.com/dashboard/keywords',
    noIndex: true
  },

  'dashboard/competitors': {
    title: 'Competitor Analysis Dashboard | AI SEO Turbo',
    description: 'Analyze competitor SEO strategies, track their performance metrics, and discover opportunities to gain competitive advantage from your dashboard.',
    keywords: ['competitor dashboard', 'SEO analysis', 'competitive intelligence', 'market research'],
    canonical: 'https://www.aiseoturbo.com/dashboard/competitors',
    noIndex: true
  },

  'dashboard/page-crawler': {
    title: 'Page Crawler Dashboard | AI SEO Turbo',
    description: 'Use advanced page crawling tools from your dashboard to detect SEO issues, analyze site structure, and monitor website health comprehensively.',
    keywords: ['page crawler', 'website analysis', 'SEO crawler', 'site audit'],
    canonical: 'https://www.aiseoturbo.com/dashboard/page-crawler',
    noIndex: true
  },

  'dashboard/backlinks': {
    title: 'Backlinks Dashboard | AI SEO Turbo',
    description: 'Monitor your backlink profile, analyze link quality metrics, and track new backlink acquisitions to improve domain authority from your dashboard.',
    keywords: ['backlinks dashboard', 'link analysis', 'backlink monitoring', 'domain authority'],
    canonical: 'https://www.aiseoturbo.com/dashboard/backlinks',
    noIndex: true
  },

  'dashboard/reports': {
    title: 'SEO Reports Dashboard | AI SEO Turbo',
    description: 'Generate comprehensive SEO reports, track performance metrics over time, and create custom reports for stakeholders from your dashboard.',
    keywords: ['SEO reports', 'performance reports', 'analytics dashboard', 'SEO metrics'],
    canonical: 'https://www.aiseoturbo.com/dashboard/reports',
    noIndex: true
  },

  'dashboard/settings': {
    title: 'Account Settings | AI SEO Turbo',
    description: 'Manage your AI SEO Turbo account settings, billing preferences, and dashboard configuration options for a personalized experience.',
    keywords: ['account settings', 'user preferences', 'billing settings', 'account management'],
    canonical: 'https://www.aiseoturbo.com/dashboard/settings',
    noIndex: true
  },
}
