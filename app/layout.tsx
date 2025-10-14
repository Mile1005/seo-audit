import "./globals.css";
import type { Metadata, Viewport } from "next";
import React from "react";
import { Inter } from "next/font/google";
import { AuthProvider } from "../components/auth/auth-provider";

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
  title: "AI SEO Turbo - AI-Powered SEO Audits That Move the Needle",
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
  metadataBase: new URL("https://aiseoturbo.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI SEO Turbo - AI-Powered SEO Audits",
    description: "Get actionable SEO insights that boost rankings and drive organic traffic in minutes.",
    url: "https://aiseoturbo.com",
    siteName: "AI SEO Turbo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SEO Turbo - AI-Powered SEO Audits",
    description: "Get actionable SEO insights that boost rankings and drive organic traffic in minutes.",
    creator: "@aiseoturbo",
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
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        
        {/* Critical performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        
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
        
        {/* Preload critical resources with proper priority */}
        <link rel="preload" href="/images/hero/hero-laptop-dashboard.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        
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
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
