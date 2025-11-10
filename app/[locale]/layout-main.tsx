import "../globals.css";
import type { Metadata, Viewport } from "next";
import React from "react";
import { Inter } from "next/font/google";
import { AuthProvider } from "../../components/auth/auth-provider";
import { ThemeProvider } from "../../components/ui/theme-provider";
import dynamicImport from 'next/dynamic';
import { ClientAnalytics } from "@/components/layout/client-analytics";
import { ConsentBanner } from "@/components/privacy/consent-banner";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale, localeNames } from '../../i18n';

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
  maximumScale: 1,
  userScalable: false,
};

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale: Locale) => ({ locale }));
}

// Generate metadata with hreflang support
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'meta' });
  
  // Locale to language mapping for Open Graph
  const localeToOGLocale: Record<string, string> = {
    en: 'en_US',
    fr: 'fr_FR',
    it: 'it_IT',
    es: 'es_ES',
    id: 'id_ID',
    de: 'de_DE',
  };

  const baseUrl = 'https://www.aiseoturbo.com';
  const currentPath = `/${locale}`;

  return {
    title: t('defaultTitle'),
    description: t('defaultDescription'),
    keywords: "SEO audit, AI SEO analysis, website optimization, organic traffic, search rankings",
    authors: [{ name: "AI SEO Turbo" }],
    creator: "AI SEO Turbo",
    publisher: "AI SEO Turbo",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}${currentPath}`,
    },
    openGraph: {
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      url: `${baseUrl}${currentPath}`,
      siteName: "AI SEO Turbo",
      locale: localeToOGLocale[locale] || 'en_US',
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
      title: t('defaultTitle'),
      description: t('defaultDescription'),
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
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Fetch messages for the current locale
  const messages = await getMessages();

  // GA4 Measurement ID: use env if provided, otherwise fall back to the provided ID
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-VL8V8L4G7X';
  
  // Get the appropriate language code for the html lang attribute
  const htmlLang = locale;

  // Organization Schema - Company/Business Entity
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.aiseoturbo.com/#organization",
    "name": "AISEOTurbo",
    "legalName": "AISEOTurbo",
    "alternateName": "AI SEO Turbo",
    "url": "https://www.aiseoturbo.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.aiseoturbo.com/logo.png",
      "width": 600,
      "height": 60,
      "caption": "AISEOTurbo Logo"
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://www.aiseoturbo.com/logo.png",
      "width": 1200,
      "height": 630,
      "caption": "AISEOTurbo - AI-Powered SEO Audits"
    },
    "description": "AI-powered SEO audit platform that helps marketers and businesses identify critical SEO issues in minutes.",
    "slogan": "AI-Powered SEO Audits That Drive Results",
    "foundingDate": "2025-09",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Partizanska 24",
      "addressLocality": "Skopje",
      "postalCode": "1000",
      "addressRegion": "Skopje",
      "addressCountry": "MK"
    },
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
        "availableLanguage": ["en", "fr", "it", "es", "id", "de"],
        "areaServed": "Worldwide"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Sales",
        "email": "sales@aiseoturbo.com",
        "availableLanguage": ["en", "fr", "it", "es", "id", "de"],
        "areaServed": "Worldwide"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Billing Support",
        "email": "billing@aiseoturbo.com",
        "availableLanguage": ["en", "fr", "it", "es", "id", "de"],
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
    "name": "AI SEO Turbo",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "url": "https://www.aiseoturbo.com",
    "image": {
      "@type": "ImageObject",
      "url": "https://www.aiseoturbo.com/logo.png",
      "width": 1200,
      "height": 630,
      "caption": "AISEOTurbo Platform Screenshot"
    },
    "description": "AI-powered SEO audit platform that helps marketers and businesses identify critical SEO issues in minutes. Get actionable insights to boost rankings and drive organic traffic with comprehensive website audits.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "url": "https://www.aiseoturbo.com/pricing",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "description": "Free plan available with premium features"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1000",
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
      "@type": "Organization",
      "@id": "https://www.aiseoturbo.com/#organization"
    },
    "provider": {
      "@type": "Organization",
      "@id": "https://www.aiseoturbo.com/#organization"
    },
    "creator": {
      "@type": "Organization",
      "@id": "https://www.aiseoturbo.com/#organization"
    }
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.aiseoturbo.com/#website",
    "url": "https://www.aiseoturbo.com",
    "name": "AI SEO Turbo",
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
    "inLanguage": htmlLang
  };

  return (
    <html lang={htmlLang} className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* Consent Mode v2: initialize defaults BEFORE loading gtag.js */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                functionality_storage: 'granted',
                security_storage: 'granted'
              });
            `,
          }}
        />
        {/* Google Tag Manager — placed as high in <head> as possible */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-K7SGKVC9');
            `,
          }}
        />
        
        {/* LCP Optimization: Resource hints for critical 3rd-party resources only */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
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
        
        {/* Resource hints for performance */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* EMERGENCY: Critical CSS - loads immediately */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* LCP OPTIMIZATION: Critical above-the-fold styles - minimal reset only */
            *,*::before,*::after{box-sizing:border-box}*{margin:0}html,body{line-height:1.5;-webkit-font-smoothing:antialiased}
            body{font-family:var(--font-inter),system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
            @media(max-width:1023px){.desktop-only{display:none!important}}
          `
        }} />
        
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
      </head>
      <body className={`${inter.className} font-inter dark`} style={{ backgroundColor: '#0b1220' }} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K7SGKVC9"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* Skip links for keyboard navigation - visually hidden but focusable */}
        <a 
          href="#main-content" 
          className="absolute top-0 left-0 z-50 px-4 py-2 bg-blue-600 text-white rounded opacity-0 focus:opacity-100 -translate-y-full focus:translate-y-0 transition-transform duration-200"
          style={{ outlineOffset: '2px' }}
        >
          Skip to main content
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <ThemeProvider>
              <main id="main-content">
                {children}
              </main>
            </ThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
        {/* Privacy: consent banner for GA Consent Mode v2 */}
        <ConsentBanner />
        {/* Defer non-critical analytics scripts to reduce initial page requests */}
        <Analytics />
        <SpeedInsights />
        {/* Manual SPA pageview tracking for GA4 */}
        <ClientAnalytics />
      </body>
    </html>
  );
}
