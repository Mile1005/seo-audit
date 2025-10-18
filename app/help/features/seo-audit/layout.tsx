import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Audit Guide - Complete Website Analysis | AI SEO Turbo',
  description: 'Complete walkthrough of SEO audits with AI SEO Turbo. Learn to analyze websites, identify issues, and get recommendations for better rankings.',
  keywords: ['SEO audit', 'website analysis', 'SEO issues', 'audit walkthrough', 'SEO recommendations', 'technical SEO', 'on-page SEO'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/features/seo-audit'
  },
  openGraph: {
    title: 'SEO Audit Guide - Complete Website Analysis | AI SEO Turbo',
    description: 'Complete walkthrough of SEO audits with AI SEO Turbo. Learn to analyze websites, identify issues, and get recommendations for better rankings.',
    url: 'https://www.aiseoturbo.com/help/features/seo-audit',
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
    title: 'SEO Audit Guide - Complete Website Analysis | AI SEO Turbo',
    description: 'Complete walkthrough of SEO audits with AI SEO Turbo. Learn to analyze websites, identify issues, and get recommendations for better rankings.',
  }
}

export default function SEOAuditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}