import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Tools & Features - Master AI SEO Turbo | AI SEO Turbo',
  description: 'Guide to AI SEO Turbo features: audits, competitor analysis, keyword tracking, site crawling, and AI assistant.',
  keywords: ['SEO tools', 'SEO features', 'SEO audit guide', 'competitor analysis', 'keyword tracking', 'site crawler', 'AI assistant'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/category/seo-tools-features'
  },
  openGraph: {
    title: 'SEO Tools & Features - Master AI SEO Turbo | AI SEO Turbo',
    description: 'Guide to AI SEO Turbo features: audits, competitor analysis, keyword tracking, site crawling, and AI assistant.',
    url: 'https://www.aiseoturbo.com/help/category/seo-tools-features',
    type: 'article',
    locale: 'en_US',
    siteName: 'AISEOTurbo',
    images: [
      {
        url: 'https://www.aiseoturbo.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'AISEOTurbo - AI-Powered SEO Audits',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Tools & Features - Master AI SEO Turbo | AI SEO Turbo',
    description: 'Guide to AI SEO Turbo features: audits, competitor analysis, keyword tracking, site crawling, and AI assistant.',
  }
}

export default function SEOToolsFeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}