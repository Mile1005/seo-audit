import "./globals.css";
import type { Metadata, Viewport } from "next";
import React from "react";
import { Inter } from "next/font/google";
import { AuthProvider } from "../components/auth/auth-provider";
import { ThemeProvider } from "../components/ui/theme-provider";
import dynamicImport from 'next/dynamic';

// Lazy load Vercel monitoring scripts (not critical for page render)
const Analytics = dynamicImport(() => import('@vercel/analytics/react').then(mod => ({ default: mod.Analytics })), { 
  ssr: false 
});
const SpeedInsights = dynamicImport(() => import('@vercel/speed-insights/next').then(mod => ({ default: mod.SpeedInsights })), { 
  ssr: false 
});

// Force dynamic rendering to avoid Vercel lambda routing issues
export const dynamic = 'force-dynamic';

// Ultra-optimized font loading for maximum performance
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Ensures text is visible during font load
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter'
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Removed maximumScale to allow user scaling for accessibility
};

export const metadata: Metadata = {
  title: "SEO Audit Tool - Boost Rankings Fast | AI SEO Turbo",
  description: "Get actionable SEO insights that boost rankings and drive organic traffic. Join 1,000+ marketers using our AI-powered audits to identify critical issues in minutes.",
  keywords: "SEO audit, AI SEO analysis, website optimization, organic traffic, search rankings",
  authors: [{ name: "AI SEO Turbo" }],
  creator: "AI SEO Turbo",
  publisher: "AI SEO Turbo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.aiseoturbo.com"),
  openGraph: {
    title: "AI SEO Turbo - AI-Powered SEO Audits",
    description: "Get actionable SEO insights that boost rankings and drive organic traffic in minutes.",
    url: "https://www.aiseoturbo.com",
    siteName: "AI SEO Turbo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "AISEOTurbo - AI-Powered SEO Audits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SEO Turbo - AI-Powered SEO Audits",
    description: "Get actionable SEO insights that boost rankings and drive organic traffic in minutes.",
    creator: "@aiseoturbo",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Organization Schema - Company/Business Entity
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.aiseoturbo.com/#organization",
    "name": "AISEOTurbo",
    "legalName": "AISEOTurbo",
    "alternateName": "AI SEO Turbo",
    "url": "https://www.aiseoturbo.com",
    "logo": "https://www.aiseoturbo.com/logo.png",
    "image": "https://www.aiseoturbo.com/logo.png",
    "description": "AI-powered SEO audit platform that helps marketers and businesses identify critical SEO issues in minutes.",
    "slogan": "AI-Powered SEO Audits That Drive Results",
    "foundingDate": "2025-09",
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "MK",
        "addressLocality": "Skopje",
        "addressRegion": "Macedonia"
      }
    },
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 1,
      "maxValue": 10
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "support@aiseoturbo.com",
        "availableLanguage": ["en", "mk", "sq"],
        "areaServed": "Worldwide"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Sales",
        "email": "sales@aiseoturbo.com",
        "availableLanguage": ["en", "mk", "sq"],
        "areaServed": "Worldwide"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Billing Support",
        "email": "billing@aiseoturbo.com",
        "availableLanguage": ["en", "mk", "sq"],
        "areaServed": "Worldwide"
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "Mile Stoev",
      "url": "https://www.linkedin.com/in/milestoev/",
      "jobTitle": "Founder & CEO",
      "sameAs": [
        "https://x.com/MILE100EV",
        "https://github.com/Mile1005"
      ]
    },
    "sameAs": [
      "https://linkedin.com/company/aiseoturbo",
      "https://x.com/AiSEOTurbo",
      "https://www.instagram.com/aiseoturbo/",
      "https://github.com/Aiseoturbo"
    ],
    "knowsAbout": [
      "SEO",
      "Technical SEO",
      "Website Audits",
      "Search Engine Optimization",
      "AI-powered SEO Tools",
      "SEO Analytics",
      "On-page SEO",
      "SEO Optimization"
    ]
  };

  // SoftwareApplication Schema - The Product
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.aiseoturbo.com/#software",
    "name": "AISEOTurbo Platform",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "url": "https://www.aiseoturbo.com",
    "image": "https://www.aiseoturbo.com/logo.png",
    "description": "AI-powered SEO audit platform that helps marketers and businesses identify critical SEO issues in minutes. Get actionable insights to boost rankings and drive organic traffic with comprehensive website audits.",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "0",
      "highPrice": "99",
      "url": "https://www.aiseoturbo.com/pricing"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Comprehensive SEO Audits",
      "Technical SEO Analysis",
      "On-page SEO Optimization",
      "Actionable Insights",
      "AI-powered Recommendations",
      "Fast Results in Minutes",
      "100+ SEO Checks",
      "Automated SEO Reports"
    ],
    "author": {
      "@id": "https://www.aiseoturbo.com/#organization"
    },
    "provider": {
      "@id": "https://www.aiseoturbo.com/#organization"
    }
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.aiseoturbo.com/#website",
    "url": "https://www.aiseoturbo.com",
    "name": "AISEOTurbo",
    "description": "AI-powered SEO audit platform for marketers",
    "publisher": {
      "@id": "https://www.aiseoturbo.com/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.aiseoturbo.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-US"
  };

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        
        {/* LCP Optimization: Resource hints for critical 3rd-party resources only */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Favicon and Touch Icons - SVG scales better for larger display */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="64x64" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        {/* Critical performance optimizations - Google Fonts only */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Resource hints for performance */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* EMERGENCY: Critical CSS - loads immediately */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold styles */
            *,*::before,*::after{box-sizing:border-box}
            *{margin:0}
            html,body{height:100%;line-height:1.5;-webkit-font-smoothing:antialiased;font-family:var(--font-inter),system-ui,-apple-system,sans-serif}
            .container{width:100%;max-width:1200px;margin:0 auto;padding:0 1rem}
            .nav-bar{position:fixed;top:0;left:0;right:0;z-index:50;backdrop-filter:blur(10px);background:rgba(255,255,255,0.95);border-bottom:1px solid rgba(0,0,0,0.1)}
            .hero{padding:6rem 0 4rem;text-align:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white}
            .animate-pulse{animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite}
            @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
            @media(min-width:640px){.container{padding:0 1.5rem}}
            @media(min-width:1024px){.container{padding:0 2rem}}
          `
        }} />
        
        {/* Resource hints for faster loading - removed API prefetch that causes 405 errors */}
        
        {/* Early loading of critical scripts */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Immediately available performance helpers
            window.__performance = {
              start: Date.now(),
              preloadImage: function(src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
              }
            };
          `
        }} />
        
        {/* Defer non-critical styles to prevent render blocking - using media="print" trick */}
        <link 
          rel="stylesheet" 
          href="/_next/static/css/globals.css" 
          media="print"
        />
        
        {/* Script to convert media from print to all after load */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              // Defer CSS loading without blocking render
              const link = document.querySelector('link[media="print"]');
              if (link) {
                link.onload = function() { link.media = 'all'; }
              }
            `
          }}
        />
        
        <noscript>
          <link rel="stylesheet" href="/_next/static/css/globals.css" />
        </noscript>
      </head>
      <body className={`${inter.className} font-inter`} suppressHydrationWarning>
        {/* Skip links for keyboard navigation - visually hidden */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
        >
          Skip to main content
        </a>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
        {/* Defer non-critical analytics scripts to reduce initial page requests */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
