import { Metadata } from 'next'
import { locales, defaultLocale, type Locale } from '../i18n'

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
  locale?: Locale
  path?: string
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

// Cache for CSV data
let csvTitleCache: Map<string, Map<string, string>> | null = null;

/**
 * Parse a CSV line properly handling quoted fields
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  // Add the last field
  result.push(current);

  return result;
}

/**
 * Load and cache CSV title data
 */
function loadCSVTitleData(): Map<string, Map<string, string>> {
  if (csvTitleCache) return csvTitleCache;

  csvTitleCache = new Map();

  try {
    // Try to read the CSV file
    const fs = require('fs');
    const path = require('path');
    const csvPath = path.join(process.cwd(), 'all-page-titles-complete.csv');

    if (!fs.existsSync(csvPath)) {
      console.warn('CSV file not found, using fallback titles');
      return csvTitleCache;
    }

    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const lines = csvContent.split('\n');

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = parseCSVLine(line);
      if (parts.length >= 8) {
        const url = parts[0];
        const locale = parts[1];
        const finalTitle = parts[6].replace(/^"|"$/g, '');

        // Extract page path
        let pagePath = url.replace('https://www.aiseoturbo.com', '');
        if (pagePath === '' || pagePath === '/') {
          pagePath = 'home';
        } else if (pagePath.startsWith('/fr') || pagePath.startsWith('/de') || pagePath.startsWith('/es') ||
                   pagePath.startsWith('/it') || pagePath.startsWith('/id')) {
          // Check if this is just a locale prefix (no path after it)
          const localePart = pagePath.substring(1, 3); // 'fr', 'de', etc.
          const rest = pagePath.substring(3); // should be empty or start with '/'
          if (rest === '' || rest === '/') {
            pagePath = 'home';
          } else {
            pagePath = rest.startsWith('/') ? rest.substring(1) : rest;
          }
        } else {
          pagePath = pagePath.startsWith('/') ? pagePath.substring(1) : pagePath;
        }
        if (pagePath === '') pagePath = 'home';

        if (!csvTitleCache.has(pagePath)) {
          csvTitleCache.set(pagePath, new Map());
        }
        csvTitleCache.get(pagePath)!.set(locale, finalTitle);
      }
    }
  } catch (error) {
    console.warn('Error loading CSV data:', error);
  }

  return csvTitleCache;
}

/**
 * Get localized title from CSV data
 */
function getLocalizedTitle(pagePath: string, locale: string): string | null {
  const csvData = loadCSVTitleData();
  const pageTitles = csvData.get(pagePath);
  if (pageTitles) {
    return pageTitles.get(locale) || pageTitles.get('en') || null;
  }
  return null;
}

/**
 * Generate hreflang alternate links for multilingual SEO
 * Includes x-default hreflang for better international SEO
 */
export function generateLanguageAlternates(path: string = '', currentLocale: Locale = defaultLocale) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aiseoturbo.com';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  const languages: Record<string, string> = {};
  locales.forEach((locale) => {
    let url: string;
    if (locale === 'en') {
      // English at root (no prefix)
      url = cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
    } else {
      // Others prefixed
      url = `${baseUrl}/${locale}/${cleanPath}`;
    }
    languages[locale] = url.replace(/\/$/, '');
  });

  // x-default always points to English root
  languages['x-default'] = cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;

  return languages;
}

/**
 * Generate metadata for Next.js pages
 */
export function generateSEOMeta(config: Partial<SEOConfig> = {}): Metadata {
  const seo = { ...defaultSEO, ...config }

  // Get localized title from CSV if available
  let finalTitle = seo.title;
  if (seo.locale && seo.path) {
    const csvTitle = getLocalizedTitle(seo.path, seo.locale);
    if (csvTitle) {
      finalTitle = csvTitle;
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aiseoturbo.com'
  
  // Generate canonical URL dynamically based on locale and path
  let canonical: string
  if (seo.locale && seo.path !== undefined) {
    const pathSegment = seo.path.startsWith('/') ? seo.path.slice(1) : seo.path;
    if (seo.locale === 'en') {
      // English canonical at root
      canonical = pathSegment ? `${baseUrl}/${pathSegment}` : baseUrl;
    } else {
      // Others prefixed
      canonical = pathSegment ? `${baseUrl}/${seo.locale}/${pathSegment}` : `${baseUrl}/${seo.locale}`;
    }
    canonical = canonical.replace(/\/$/, '') || baseUrl;
  } else {
    // Fallback to config canonical or base URL
    canonical = seo.canonical || baseUrl
  }
  
  const ogImageUrl = seo.ogImage
    ? (seo.ogImage.startsWith('http') ? seo.ogImage : `${baseUrl}${seo.ogImage}`)
    : undefined

  // Generate hreflang alternates if locale and path provided, and not noindex
  const languageAlternates = (seo.locale && seo.path !== undefined && !seo.noIndex) 
    ? generateLanguageAlternates(seo.path, seo.locale)
    : undefined

  return {
    title: finalTitle,
    description: seo.description,
    keywords: seo.keywords?.join(', '),
    robots: seo.noIndex ? 'noindex,nofollow' : 'index,follow',
    
    openGraph: {
      title: finalTitle,
      description: seo.description,
      url: canonical,
      type: seo.ogType,
      locale: seo.locale ? `${seo.locale}_${seo.locale.toUpperCase()}` : 'en_US',
      ...(ogImageUrl ? { images: [{ url: ogImageUrl, width: 1200, height: 630, alt: finalTitle }] } : {}),
      siteName: 'AISEOTurbo',
    },
    
    twitter: {
      card: seo.twitterCard,
      title: finalTitle,
      description: seo.description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
      creator: '@aiseoturbo',
      site: '@aiseoturbo',
    },
    
    alternates: {
      canonical,
      ...(languageAlternates ? { languages: languageAlternates } : {}),
    },
    
    other: {
      'theme-color': '#8B5CF6',
      'msapplication-TileColor': '#8B5CF6',
    }
  }
}

/**
 * Generate JSON-LD structured data with enhanced validation
 */
export function generateStructuredData(type: 'website' | 'organization' | 'product' | 'article' | 'breadcrumb' | 'faq' | 'howto', data: Record<string, any> = {}, locale?: Locale) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aiseoturbo.com'
  
  const commonData = {
    '@context': 'https://schema.org',
    '@type': type === 'website' ? 'WebSite' : 
              type === 'organization' ? 'Organization' :
              type === 'product' ? 'SoftwareApplication' :
              type === 'article' ? 'Article' :
              type === 'breadcrumb' ? 'BreadcrumbList' :
              type === 'faq' ? 'FAQPage' : 'HowTo',
    ...(locale ? { '@language': locale } : {})
  }

  switch (type) {
    case 'website':
      return {
        ...commonData,
        name: 'AISEOTurbo',
        description: 'AI-powered SEO audit platform that helps marketers and businesses identify critical SEO issues in minutes.',
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
        alternateName: 'AI SEO Turbo',
        description: 'Leading provider of AI-powered SEO audit and optimization tools for businesses worldwide',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        foundingDate: '2023-01-01',
        numberOfEmployees: '10-50',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          email: 'support@aiseoturbo.com',
          availableLanguage: ['en', 'fr', 'it', 'es', 'id', 'de'],
          areaServed: 'Worldwide',
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '17:00',
            timeZone: 'UTC'
          }
        },
        sameAs: [
          'https://twitter.com/aiseoturbo',
          'https://linkedin.com/company/aiseoturbo',
          'https://github.com/aiseoturbo',
          'https://youtube.com/@aiseoturbo'
        ],
        knowsAbout: [
          'Search Engine Optimization',
          'SEO Audit Tools',
          'Technical SEO',
          'Content Optimization',
          'Keyword Research',
          'Competitor Analysis',
          'AI Technology',
          'Digital Marketing',
          'Web Analytics'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'SEO Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI SEO Audit',
                description: 'Comprehensive SEO analysis powered by artificial intelligence'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Technical SEO Optimization',
                description: 'Complete technical SEO audit and optimization services'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Content Optimization',
                description: 'AI-powered content analysis and optimization recommendations'
              }
            }
          ]
        },
        ...data
      }

    case 'product':
      return {
        ...commonData,
        name: 'AI SEO Turbo',
        description: 'Comprehensive SEO audit and optimization platform powered by AI',
        url: baseUrl,
        applicationCategory: 'BusinessApplication',
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

    case 'article':
      return {
        ...commonData,
        headline: data.headline || 'SEO Article',
        description: data.description || 'SEO optimization guide',
        author: {
          '@type': 'Organization',
          name: 'AISEOTurbo Team'
        },
        publisher: {
          '@type': 'Organization',
          name: 'AISEOTurbo',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`
          }
        },
        datePublished: data.datePublished || new Date().toISOString(),
        dateModified: data.dateModified || new Date().toISOString(),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url || baseUrl
        },
        ...data
      }

    case 'breadcrumb':
      return {
        ...commonData,
        itemListElement: data.breadcrumbs || [],
        ...data
      }

    case 'faq':
      return {
        ...commonData,
        mainEntity: data.questions || [],
        ...data
      }

    case 'howto':
      return {
        ...commonData,
        name: data.name || 'How-to Guide',
        description: data.description || 'Step-by-step instructions',
        step: data.steps || [],
        ...data
      }

    default:
      return { ...commonData, ...data }
  }
}

/**
 * Validate structured data JSON-LD
 */
export function validateStructuredData(schema: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Check required fields based on type
  if (!schema['@context']) {
    errors.push('Missing @context field')
  }
  
  if (!schema['@type']) {
    errors.push('Missing @type field')
  }
  
  // Type-specific validation
  switch (schema['@type']) {
    case 'Article':
      if (!schema.headline) errors.push('Article missing headline')
      if (!schema.author) errors.push('Article missing author')
      if (!schema.publisher) errors.push('Article missing publisher')
      break
    case 'Organization':
      if (!schema.name) errors.push('Organization missing name')
      if (!schema.url) errors.push('Organization missing url')
      break
    case 'SoftwareApplication':
      if (!schema.name) errors.push('SoftwareApplication missing name')
      if (!schema.offers) errors.push('SoftwareApplication missing offers')
      break
  }
  
  return { isValid: errors.length === 0, errors }
}

/**
 * Page-specific SEO configurations
 */
export const pageSEO = {
  home: {
    title: 'AI SEO Audit Tool - Boost Rankings 300% Faster',
    description: 'Transform your SEO with AI-powered audits identifying 47+ critical issues. Get data-driven insights to boost organic traffic and dominate rankings.',
    keywords: ['AI SEO audit', 'SEO optimization tool', 'website ranking boost', 'organic traffic growth', 'technical SEO analysis'],
    ogImage: '/logo.png'
  },
  
  features: {
    title: 'SEO Features - Complete Audit & Analysis | AI SEO Turbo',
    description: 'Discover powerful SEO features including technical audits, competitor analysis, keyword tracking, and AI-powered recommendations for better rankings.',
    keywords: ['SEO features', 'technical SEO audit', 'competitor analysis', 'keyword tracking'],
    ogImage: '/logo.png'
  },

  'features/seo-audit': {
    title: 'SEO Audit Feature - Comprehensive Analysis | AI SEO Turbo',
    description: 'Get detailed SEO audits with 47+ technical checks, AI-powered recommendations, and actionable insights to improve your website rankings.',
    keywords: ['SEO audit', 'technical SEO', 'website analysis', 'SEO recommendations'],
    ogImage: '/logo.png'
  },

  'features/site-crawler': {
    title: 'Site Crawler - Deep Website Analysis | AI SEO Turbo',
    description: 'Comprehensive website crawler that detects broken links, analyzes site structure, and identifies technical SEO issues for better search performance.',
    keywords: ['site crawler', 'website analysis', 'SEO crawler', 'broken links'],
    ogImage: '/logo.png'
  },

  'features/competitor-analysis': {
    title: 'Competitor Analysis - SEO Intelligence | AI SEO Turbo',
    description: 'Analyze competitor SEO strategies, keyword rankings, and backlink profiles. Discover opportunities to outrank competitors and gain market share.',
    keywords: ['competitor analysis', 'SEO intelligence', 'keyword tracking', 'competitive research'],
    ogImage: '/logo.png'
  },

  'features/ai-assistant': {
    title: 'AI SEO Assistant - Smart Recommendations | AI SEO Turbo',
    description: 'AI-powered SEO assistant providing personalized recommendations, content optimization suggestions, and automated insights for better rankings.',
    keywords: ['AI SEO assistant', 'SEO recommendations', 'AI optimization', 'SEO insights'],
    ogImage: '/logo.png'
  },

  'features/keyword-tracking': {
    title: 'Keyword Tracking - Monitor Rankings | AI SEO Turbo',
    description: 'Track keyword positions across search engines, monitor ranking changes, and get alerts for SERP movements to optimize your SEO strategy.',
    keywords: ['keyword tracking', 'ranking monitor', 'SERP tracking', 'SEO alerts'],
    ogImage: '/logo.png'
  },
  
  pricing: {
    title: 'SEO Audit Pricing - Plans From $29/month | AI SEO Turbo',
    description: 'Choose the perfect SEO audit plan for your business. Free plan with analysis, Pro plans from $29/month with advanced features and priority support.',
    keywords: ['SEO audit pricing', 'SEO tools cost', 'website audit plans'],
    ogImage: '/logo.png'
  },
  
  about: {
    title: 'About AI SEO Turbo - Expert SEO Team & AI Innovation',
    description: 'Discover AISEOTurbo\'s mission to revolutionize SEO with AI technology. Meet our team of experts committed to helping businesses succeed online.',
    keywords: ['SEO company', 'AI SEO experts', 'SEO consultants', 'technical SEO team', 'AI optimization specialists'],
    ogImage: '/logo.png'
  },
  
  contact: {
    title: 'Contact AI SEO Turbo - Expert SEO Support & Consultation',
    description: 'Get expert SEO help from certified specialists. Contact us for personalized consultation, technical support, and partnership inquiries. Join 10,000+ businesses achieving SEO success.',
    keywords: ['SEO support', 'contact SEO experts', 'SEO consultation', 'technical SEO help', 'SEO partnership'],
    ogImage: '/logo.png'
  },

  blog: {
    title: 'SEO Blog - Tips & Strategies | AI SEO Turbo',
    description: 'Stay updated with the latest SEO tips, strategies, and best practices. Learn expert insights on technical SEO, content optimization, and algorithms.',
    keywords: ['SEO blog', 'SEO tips', 'SEO strategies', 'search engine optimization'],
    ogImage: '/logo.png'
  },

  'blog/ai-powered-seo-future': {
    title: 'AI-Powered SEO: The Future of Search Optimization | AI SEO Turbo',
    description: 'Explore how artificial intelligence is revolutionizing SEO. Learn about AI-powered tools, automation, and the future of search engine optimization.',
    keywords: ['AI SEO', 'AI-powered SEO', 'future of SEO', 'SEO automation', 'machine learning SEO'],
    ogImage: '/logo.png'
  },

  'blog/complete-seo-audit-checklist-2025': {
    title: 'Complete SEO Audit Checklist 2025 - Step-by-Step Guide',
    description: 'Follow our comprehensive SEO audit checklist for 2025. Covers technical SEO, on-page optimization, content analysis, and performance metrics.',
    keywords: ['SEO audit checklist', '2025 SEO guide', 'SEO audit steps', 'technical SEO checklist'],
    ogImage: '/logo.png'
  },

  'blog/content-seo-creating-search-friendly-content': {
    title: 'Content SEO: Creating Search-Friendly Content That Ranks',
    description: 'Master content SEO with proven strategies for creating search-friendly content. Learn keyword optimization, content structure, and user intent matching.',
    keywords: ['content SEO', 'SEO content writing', 'search-friendly content', 'keyword optimization'],
    ogImage: '/logo.png'
  },

  'blog/core-web-vitals-optimization-guide': {
    title: 'Core Web Vitals Optimization Guide - Improve Page Experience',
    description: 'Complete guide to optimizing Core Web Vitals. Learn how to improve LCP, FID, and CLS for better Google rankings and user experience.',
    keywords: ['Core Web Vitals', 'LCP optimization', 'FID improvement', 'CLS fixes', 'page experience'],
    ogImage: '/logo.png'
  },

  'blog/local-seo-strategies-that-work': {
    title: 'Local SEO Strategies That Work in 2025 - Complete Guide',
    description: 'Boost your local search rankings with proven local SEO strategies. Learn Google Business Profile optimization, local citations, and review management.',
    keywords: ['local SEO', 'local search optimization', 'Google Business Profile', 'local citations'],
    ogImage: '/logo.png'
  },

  'blog/technical-seo-best-practices-2025': {
    title: 'Technical SEO Best Practices 2025 - Expert Guide',
    description: 'Master technical SEO with 2025 best practices. Covers site structure, crawlability, indexation, schema markup, and performance optimization.',
    keywords: ['technical SEO', 'SEO best practices', 'technical optimization', 'site structure'],
    ogImage: '/logo.png'
  },

  'case-studies': {
    title: 'SEO Case Studies - Real Results & Success Stories',
    description: 'Explore real SEO success stories and case studies. See how businesses achieved significant traffic growth and ranking improvements with AI SEO Turbo.',
    keywords: ['SEO case studies', 'SEO success stories', 'SEO results', 'client testimonials'],
    ogImage: '/logo.png'
  },

  'case-studies/cloudsync-pro': {
    title: 'CloudSync Pro Case Study - 312% Organic Traffic Increase',
    description: 'How CloudSync Pro achieved 312% organic traffic growth in 6 months using AI-powered SEO audits and technical optimization strategies.',
    keywords: ['SaaS SEO', 'traffic growth case study', 'B2B SEO success'],
    ogImage: '/logo.png'
  },

  'case-studies/digital-growth-agency': {
    title: 'Digital Growth Agency Case Study - 245% Client Acquisition',
    description: 'Learn how Digital Growth Agency scaled their SEO services and increased client acquisition by 245% using automated SEO audits.',
    keywords: ['agency SEO', 'SEO agency case study', 'client growth'],
    ogImage: '/logo.png'
  },

  'case-studies/gearhub-pro': {
    title: 'GearHub Pro Case Study - #1 Rankings in 4 Months',
    description: 'How GearHub Pro achieved #1 rankings for 47 competitive keywords in just 4 months through comprehensive SEO optimization.',
    keywords: ['ecommerce SEO', 'ranking improvement', 'SEO success story'],
    ogImage: '/logo.png'
  },

  'case-studies/peak-performance': {
    title: 'Peak Performance Case Study - 189% Revenue Growth',
    description: 'Discover how Peak Performance Fitness increased online revenue by 189% through local SEO optimization and technical improvements.',
    keywords: ['local business SEO', 'revenue growth', 'fitness SEO'],
    ogImage: '/logo.png'
  },

  'case-studies/stylecraft-boutique': {
    title: 'StyleCraft Boutique Case Study - 427% Organic Traffic',
    description: 'How StyleCraft Boutique achieved 427% organic traffic growth and dominated fashion search results through AI-powered SEO.',
    keywords: ['fashion SEO', 'ecommerce growth', 'retail SEO'],
    ogImage: '/logo.png'
  },

  'case-studies/techflow-solutions': {
    title: 'TechFlow Solutions Case Study - Enterprise SEO Success',
    description: 'Learn how TechFlow Solutions scaled their enterprise SEO strategy to achieve market leadership and 300% lead generation growth.',
    keywords: ['enterprise SEO', 'B2B SEO', 'lead generation'],
    ogImage: '/logo.png'
  },

  help: {
    title: 'Help Center - SEO Support & Guides | AI SEO Turbo',
    description: 'Get help with AI SEO Turbo. Find answers to common questions, tutorials, troubleshooting guides, and contact support for personalized assistance.',
    keywords: ['SEO help', 'support center', 'SEO tutorials', 'troubleshooting'],
    ogImage: '/logo.png'
  },

  terms: {
    title: 'Terms of Service - Legal Agreement | AI SEO Turbo',
    description: 'Read our terms of service and legal agreement for using AI SEO Turbo. Understand your rights and responsibilities when using our SEO audit tools.',
    keywords: ['terms of service', 'legal agreement', 'SEO terms', 'user agreement'],
    ogImage: '/logo.png'
  },

  privacy: {
    title: 'Privacy Policy - Data Protection | AI SEO Turbo',
    description: 'Learn how AISEOTurbo protects your privacy and handles your data. Our privacy policy covers GDPR compliance and data security measures.',
    keywords: ['privacy policy', 'data protection', 'GDPR', 'privacy rights'],
    ogImage: '/logo.png'
  },

  dashboard: {
    title: 'SEO Dashboard - Track Performance | AI SEO Turbo',
    description: 'Access your personalized SEO dashboard to monitor performance, track rankings, analyze competitors, and get AI-powered optimization recommendations.',
    keywords: ['SEO dashboard', 'analytics', 'keyword tracking', 'competitor analysis'],
    noIndex: true
  },

  login: {
    title: 'Login - Access Your SEO Dashboard | AI SEO Turbo',
    description: 'Sign in to your AI SEO Turbo account to access comprehensive SEO audits, analytics dashboard, and optimization tools for your websites.',
    keywords: ['login', 'sign in', 'SEO dashboard', 'account access'],
    noIndex: true
  },

  signup: {
    title: 'Sign Up - Start Your SEO Journey | AI SEO Turbo',
    description: 'Create your free AI SEO Turbo account and start optimizing your website with AI-powered SEO audits, competitor analysis, and expert recommendations.',
    keywords: ['sign up', 'register', 'SEO tools', 'free account'],
    noIndex: true
  },

  'forgot-password': {
    title: 'Reset Password - Account Recovery | AI SEO Turbo',
    description: 'Reset your AI SEO Turbo account password securely. Regain access to your SEO dashboard, audits, and optimization tools quickly and safely.',
    keywords: ['reset password', 'forgot password', 'account recovery'],
    noIndex: true
  },

  'reset-password': {
    title: 'Set New Password - Complete Password Reset | AI SEO Turbo',
    description: 'Complete your password reset process for AI SEO Turbo. Set a new secure password and regain access to your account.',
    keywords: ['reset password', 'new password', 'password change'],
    noIndex: true
  },

  'verify-email': {
    title: 'Verify Email - Complete Registration | AI SEO Turbo',
    description: 'Verify your email address to complete your AI SEO Turbo account setup and unlock all features.',
    keywords: ['email verification', 'verify email', 'account activation'],
    noIndex: true
  },

  onboarding: {
    title: 'Getting Started - Account Setup | AI SEO Turbo',
    description: 'Complete your AI SEO Turbo account setup and learn how to use our powerful SEO tools to boost your website rankings.',
    keywords: ['onboarding', 'getting started', 'account setup', 'SEO tutorial'],
    noIndex: true
  },

  demo: {
    title: 'Free SEO Audit Demo - Try AI Analysis Tool Online',
    description: 'Experience our AI-powered SEO audit tool free. Analyze any website instantly with 47+ checks, competitor insights, and actionable recommendations.',
    keywords: ['SEO audit demo', 'free SEO analysis', 'AI SEO tool demo', 'website audit online', 'technical SEO checker'],
    ogImage: '/logo.png'
  },

  'dashboard/projects': {
    title: 'Projects - Manage SEO Audits | AI SEO Turbo',
    description: 'Manage your SEO projects, organize website audits, and track optimization progress across all your domains from your dashboard.',
    keywords: ['SEO projects', 'website audits', 'project management', 'SEO tracking'],
    noIndex: true
  },

  'dashboard/audit': {
    title: 'SEO Audit Dashboard | AI SEO Turbo',
    description: 'Run comprehensive SEO audits from your dashboard, analyze technical issues, and receive AI-powered recommendations to improve website performance.',
    keywords: ['SEO audit dashboard', 'technical audit', 'SEO analysis', 'performance optimization'],
    noIndex: true
  },

  'dashboard/keywords': {
    title: 'Keyword Tracking Dashboard | AI SEO Turbo',
    description: 'Monitor keyword rankings, track SERP position changes, and analyze keyword performance data across all search engines from your dashboard.',
    keywords: ['keyword dashboard', 'ranking tracker', 'SERP monitoring', 'keyword analytics'],
    noIndex: true
  },

  'dashboard/competitors': {
    title: 'Competitor Analysis Dashboard | AI SEO Turbo',
    description: 'Analyze competitor SEO strategies, track their performance metrics, and discover opportunities to gain competitive advantage from your dashboard.',
    keywords: ['competitor dashboard', 'SEO analysis', 'competitive intelligence', 'market research'],
    noIndex: true
  },

  'dashboard/page-crawler': {
    title: 'Page Crawler Dashboard | AI SEO Turbo',
    description: 'Use advanced page crawling tools from your dashboard to detect SEO issues, analyze site structure, and monitor website health comprehensively.',
    keywords: ['page crawler', 'website analysis', 'SEO crawler', 'site audit'],
    noIndex: true
  },

  'dashboard/backlinks': {
    title: 'Backlinks Dashboard | AI SEO Turbo',
    description: 'Monitor your backlink profile, analyze link quality metrics, and track new backlink acquisitions to improve domain authority from your dashboard.',
    keywords: ['backlinks dashboard', 'link analysis', 'backlink monitoring', 'domain authority'],
    noIndex: true
  },

  'dashboard/reports': {
    title: 'SEO Reports Dashboard | AI SEO Turbo',
    description: 'Generate comprehensive SEO reports, track performance metrics over time, and create custom reports for stakeholders from your dashboard.',
    keywords: ['SEO reports', 'performance reports', 'analytics dashboard', 'SEO metrics'],
    noIndex: true
  },

  'dashboard/settings': {
    title: 'Account Settings | AI SEO Turbo',
    description: 'Manage your AI SEO Turbo account settings, billing preferences, and dashboard configuration options for a personalized experience.',
    keywords: ['account settings', 'user preferences', 'billing settings', 'account management'],
    noIndex: true
  },

  status: {
    title: 'System Status - Service Availability | AI SEO Turbo',
    description: 'Check the current status of AI SEO Turbo services including API, web application, database, and crawler services. Monitor uptime and service health.',
    keywords: ['system status', 'service availability', 'uptime', 'API status', 'service health'],
    ogImage: '/logo.png'
  },
}

// SEO UTILITIES FOR OPTIMIZATION AND VALIDATION

/**
 * Title optimization utilities
 */
export const titleUtils = {
  /**
   * Validate title length (50-60 characters recommended)
   */
  validateLength: (title: string): { isValid: boolean; length: number; recommendation?: string } => {
    const length = title.length
    if (length < 30) {
      return { isValid: false, length, recommendation: 'Title too short. Add primary keywords to reach 50-60 characters.' }
    }
    if (length > 60) {
      return { isValid: false, length, recommendation: 'Title too long. Consider shortening to 50-60 characters for better display.' }
    }
    return { isValid: true, length }
  },

  /**
   * Check if title contains primary keyword
   */
  containsKeyword: (title: string, keyword: string): boolean => {
    return title.toLowerCase().includes(keyword.toLowerCase())
  },

  /**
   * Optimize title for better SEO
   */
  optimize: (title: string, primaryKeyword: string, brandName?: string): string => {
    const brand = brandName || 'AI SEO Turbo'
    
    // If title already contains brand, don't add it again
    if (title.toLowerCase().includes(brand.toLowerCase())) {
      return title.length <= 60 ? title : title.substring(0, 57) + '...'
    }
    
    // Add brand if space allows
    const withBrand = `${title} | ${brand}`
    if (withBrand.length <= 60) {
      return withBrand
    }
    
    // If too long, prioritize title content
    return title.length <= 60 ? title : title.substring(0, 57) + '...'
  }
}

/**
 * Meta description utilities
 */
export const metaDescriptionUtils = {
  /**
   * Validate description length (120-160 characters recommended)
   */
  validateLength: (description: string): { isValid: boolean; length: number; recommendation?: string } => {
    const length = description.length
    if (length < 120) {
      return { isValid: false, length, recommendation: 'Description too short. Expand to 120-160 characters for better SERP display.' }
    }
    if (length > 160) {
      return { isValid: false, length, recommendation: 'Description too long. Consider shortening to 120-160 characters.' }
    }
    return { isValid: true, length }
  },

  /**
   * Check description uniqueness compared to other descriptions
   */
  checkUniqueness: (description: string, otherDescriptions: string[]): { isUnique: boolean; similarity: number } => {
    // Simple similarity check - in production, use more sophisticated algorithms
    const similarities = otherDescriptions.map(other => {
      const words1 = description.toLowerCase().split(' ')
      const words2 = other.toLowerCase().split(' ')
      const common = words1.filter(word => words2.includes(word)).length
      return common / Math.max(words1.length, words2.length)
    })
    
    const maxSimilarity = Math.max(...similarities)
    return { isUnique: maxSimilarity < 0.7, similarity: maxSimilarity }
  },

  /**
   * Optimize description for better CTR
   */
  optimize: (description: string, primaryKeyword: string, callToAction?: string): string => {
    let optimized = description
    
    // Ensure primary keyword is included
    if (!optimized.toLowerCase().includes(primaryKeyword.toLowerCase())) {
      optimized = `${primaryKeyword} - ${optimized}`
    }
    
    // Add call to action if provided and space allows
    if (callToAction && optimized.length + callToAction.length + 3 <= 160) {
      optimized = `${optimized} ${callToAction}`
    }
    
    // Trim to optimal length
    return optimized.length <= 160 ? optimized : optimized.substring(0, 157) + '...'
  }
}

/**
 * Keyword density utilities
 */
export const keywordDensityUtils = {
  /**
   * Calculate keyword density in text
   */
  calculateDensity: (text: string, keyword: string): number => {
    const cleanText = text.toLowerCase().replace(/[^\w\s]/g, '')
    const words = cleanText.split(/\s+/).filter(word => word.length > 0)
    const keywordCount = words.filter(word => word === keyword.toLowerCase()).length
    return words.length > 0 ? (keywordCount / words.length) * 100 : 0
  },

  /**
   * Check if keyword density is within optimal range (0.5-2.5%)
   */
  validateDensity: (density: number): { isValid: boolean; recommendation?: string } => {
    if (density < 0.5) {
      return { isValid: false, recommendation: 'Keyword density too low. Consider adding the keyword more naturally.' }
    }
    if (density > 2.5) {
      return { isValid: false, recommendation: 'Keyword density too high. This may appear as keyword stuffing to search engines.' }
    }
    return { isValid: true }
  },

  /**
   * Analyze keyword density for multiple keywords
   */
  analyzeKeywords: (text: string, keywords: string[]): Array<{ keyword: string; density: number; isValid: boolean }> => {
    return keywords.map(keyword => {
      const density = keywordDensityUtils.calculateDensity(text, keyword)
      const validation = keywordDensityUtils.validateDensity(density)
      return {
        keyword,
        density,
        isValid: validation.isValid
      }
    })
  }
}

/**
 * Comprehensive SEO validation function
 */
export function validateSEO(config: Partial<SEOConfig> & { content?: string }): {
  title: ReturnType<typeof titleUtils.validateLength>
  description: ReturnType<typeof metaDescriptionUtils.validateLength>
  keywords?: Array<{ keyword: string; density: number; isValid: boolean }>
  overall: { score: number; issues: string[] }
} {
  const issues: string[] = []
  let score = 100

  // Title validation
  const titleValidation = titleUtils.validateLength(config.title || '')
  if (!titleValidation.isValid) {
    issues.push(`Title: ${titleValidation.recommendation}`)
    score -= 15
  }

  // Description validation
  const descValidation = metaDescriptionUtils.validateLength(config.description || '')
  if (!descValidation.isValid) {
    issues.push(`Description: ${descValidation.recommendation}`)
    score -= 10
  }

  // Keyword density analysis
  let keywordAnalysis: Array<{ keyword: string; density: number; isValid: boolean }> | undefined
  if (config.keywords && config.content) {
    keywordAnalysis = keywordDensityUtils.analyzeKeywords(config.content, config.keywords)
    const invalidKeywords = keywordAnalysis.filter(k => !k.isValid)
    if (invalidKeywords.length > 0) {
      issues.push(`Keywords: ${invalidKeywords.length} keywords have suboptimal density`)
      score -= invalidKeywords.length * 5
    }
  }

  return {
    title: titleValidation,
    description: descValidation,
    keywords: keywordAnalysis,
    overall: { score: Math.max(0, score), issues }
  }
}


