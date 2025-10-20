// components/seo/StructuredData.tsx
import React from 'react';

interface StructuredDataProps {
  data: Record<string, any> | Record<string, any>[];
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0)
      }}
    />
  );
}

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// FAQ Schema Generator
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Product Schema Generator for Pricing
export function generateProductSchema(product: {
  name: string;
  description: string;
  price: string;
  currency: string;
  url: string;
  features?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "url": product.url,
    "brand": {
      "@type": "Brand",
      "name": "AISEOTurbo"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": product.currency,
      "availability": "https://schema.org/InStock",
      "url": product.url,
      "seller": {
        "@type": "Organization",
        "name": "AISEOTurbo"
      }
    },
    ...(product.features && {
      "additionalProperty": product.features.map(feature => ({
        "@type": "PropertyValue",
        "name": "feature",
        "value": feature
      }))
    })
  };
}

// Multi-Plan Product Schema Generator for Pricing Page
export function generateMultiPlanProductSchema(plans: Array<{
  name: string;
  price: string;
  currency: string;
  description: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AI SEO Turbo Platform",
    "description": "AI-powered SEO audit and optimization platform for businesses",
    "brand": {
      "@type": "Brand",
      "name": "AISEOTurbo"
    },
    "offers": plans.map(plan => ({
      "@type": "Offer",
      "name": plan.name,
      "price": plan.price,
      "priceCurrency": plan.currency,
      "availability": "https://schema.org/InStock",
      "url": "https://www.aiseoturbo.com/pricing",
      "priceValidUntil": "2026-12-31",
      "description": plan.description
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1000",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

// Article Schema Generator for Blog Posts
export function generateArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "AISEOTurbo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.aiseoturbo.com/logo.png"
      }
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    ...(article.image && { "image": article.image }),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };
}

// BlogPosting Schema Generator (More specific than Article for blog content)
export function generateBlogPostingSchema(post: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  wordCount?: number;
  keywords?: string[];
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image ? {
      "@type": "ImageObject",
      "url": post.image,
      "width": 1200,
      "height": 630
    } : undefined,
    "datePublished": post.datePublished,
    "dateModified": post.dateModified || post.datePublished,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://www.aiseoturbo.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AISEOTurbo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.aiseoturbo.com/logo.png",
        "width": 600,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url
    },
    ...(post.wordCount && { "wordCount": post.wordCount }),
    ...(post.keywords && post.keywords.length > 0 && { "keywords": post.keywords }),
    ...(post.category && { "articleSection": post.category }),
    "inLanguage": "en-US"
  };
}

// HowTo Schema Generator
export function generateHowToSchema(howTo: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; image?: string; url?: string }>;
  image?: string;
  totalTime?: string; // ISO 8601 duration format (e.g., "PT5M" for 5 minutes)
  url?: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": howTo.name,
    "description": howTo.description,
    ...(howTo.image && { "image": howTo.image }),
    ...(howTo.totalTime && { "totalTime": howTo.totalTime }),
    ...(howTo.url && {
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": howTo.url
      }
    }),
    ...(howTo.datePublished && { "datePublished": howTo.datePublished }),
    "step": howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image }),
      ...(step.url && { "url": step.url })
    }))
  };
}

// Service Schema Generator
export function generateServiceSchema(service: {
  name: string;
  description: string;
  serviceType: string;
  provider: string;
  areaServed: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "serviceType": service.serviceType,
    "provider": {
      "@type": "Organization",
      "name": service.provider,
      "url": "https://www.aiseoturbo.com"
    },
    "areaServed": service.areaServed,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SEO Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.name
          }
        }
      ]
    }
  };
}

// SoftwareApplication Schema Generator for Feature Pages
export function generateFeatureSchema(feature: {
  name: string;
  description: string;
  url: string;
  features: string[];
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": feature.name,
    "description": feature.description,
    "url": feature.url,
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "SEO Tool",
    "operatingSystem": "Web Browser",
    "featureList": feature.features,
    "provider": {
      "@type": "Organization",
      "name": "AISEOTurbo",
      "url": "https://www.aiseoturbo.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "description": "Available in free and paid plans",
      "url": "https://www.aiseoturbo.com/pricing"
    },
    "softwareVersion": "1.0",
    "inLanguage": "en-US",
    ...(feature.category && { "category": feature.category })
  };
}

// AboutPage Schema Generator
export function generateAboutPageSchema(about: {
  organizationName: string;
  description: string;
  foundingDate?: string;
  founders?: Array<{ name: string; jobTitle: string }>;
  numberOfEmployees?: string;
  url?: string;
  email?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": about.organizationName,
      "alternateName": "AI SEO Turbo",
      "description": about.description,
      ...(about.foundingDate && { "foundingDate": about.foundingDate }),
      ...(about.founders && about.founders.length > 0 && {
        "founders": about.founders.map(founder => ({
          "@type": "Person",
          "name": founder.name,
          "jobTitle": founder.jobTitle
        }))
      }),
      ...(about.numberOfEmployees && {
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": about.numberOfEmployees
        }
      }),
      "knowsAbout": [
        "Search Engine Optimization",
        "Artificial Intelligence",
        "Machine Learning",
        "Web Development",
        "Digital Marketing",
        "Technical SEO",
        "Content Optimization"
      ],
      "url": about.url || "https://www.aiseoturbo.com",
      "logo": "https://www.aiseoturbo.com/logo.png",
      ...(about.email && { "email": about.email }),
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "MK"
      }
    }
  };
}

// Case Study Schema Generator with Review
export function generateCaseStudySchema(caseStudy: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
  companyName: string;
  industry: string;
  reviewRating?: number;
  reviewAuthor?: string;
  reviewText?: string;
  results?: Array<{ metric: string; value: string; description: string }>;
}) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": caseStudy.title,
    "description": caseStudy.description,
    "datePublished": caseStudy.datePublished,
    "dateModified": caseStudy.dateModified || caseStudy.datePublished,
    "author": {
      "@type": "Organization",
      "name": "AI SEO Turbo",
      "url": "https://www.aiseoturbo.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI SEO Turbo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.aiseoturbo.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": caseStudy.url
    },
    ...(caseStudy.image && {
      "image": {
        "@type": "ImageObject",
        "url": caseStudy.image
      }
    }),
    "about": {
      "@type": "Organization",
      "name": caseStudy.companyName
    }
  };

  // Add Review schema if rating is provided
  if (caseStudy.reviewRating && caseStudy.reviewAuthor && caseStudy.reviewText) {
    return [
      articleSchema,
      {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "Service",
          "name": "AI SEO Turbo - SEO Services",
          "description": "AI-powered SEO audit and optimization services"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": caseStudy.reviewRating,
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": caseStudy.reviewAuthor,
          "jobTitle": "Decision Maker",
          "worksFor": {
            "@type": "Organization",
            "name": caseStudy.companyName
          }
        },
        "reviewBody": caseStudy.reviewText,
        "datePublished": caseStudy.datePublished
      }
    ];
  }

  return articleSchema;
}

// ItemList Schema Generator for Index Pages
export function generateItemListSchema(items: Array<{
  name: string;
  url: string;
  description?: string;
  image?: string;
  datePublished?: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": item.url,
      "name": item.name,
      ...(item.description && { "description": item.description }),
      ...(item.image && { 
        "image": {
          "@type": "ImageObject",
          "url": item.image
        }
      }),
      ...(item.datePublished && { "datePublished": item.datePublished })
    }))
  };
}

