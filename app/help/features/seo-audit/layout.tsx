import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Audit Guide - Complete Website Analysis | AI SEO Turbo',
  description: 'Complete walkthrough of SEO audits with AI SEO Turbo. Learn to analyze websites, identify issues, and get recommendations for better rankings.',
  keywords: ['SEO audit', 'website analysis', 'SEO issues', 'audit walkthrough', 'SEO recommendations', 'technical SEO', 'on-page SEO'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/features/seo-audit'
  },
  openGraph: {
    images: ['/logo.png'],
    url: 'https://www.aiseoturbo.com/help/features/seo-audit',
    siteName: 'AI SEO Turbo',
    title: 'SEO Audit Guide - Complete Website Analysis | AI SEO Turbo',
    description: 'Complete walkthrough of SEO audits with AI SEO Turbo. Learn to analyze websites, identify issues, and get recommendations for better rankings.',
    type: 'article',
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