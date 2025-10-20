import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'First SEO Audit - Website Analysis Guide | AI SEO Turbo',
  description: 'Step-by-step guide to running your first SEO audit with AI SEO Turbo. Learn to analyze websites, configure settings, and get SEO recommendations.',
  keywords: ['first SEO audit', 'website analysis', 'SEO audit guide', 'audit configuration', 'SEO recommendations', 'beginner guide'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/getting-started/first-audit'
  },
  openGraph: {
    images: ['/logo.png'],
    url: 'https://www.aiseoturbo.com/help/getting-started/first-audit',
    siteName: 'AI SEO Turbo',
    title: 'First SEO Audit Guide - Run Your Website Analysis | AI SEO Turbo',
    description: 'Step-by-step guide to running your first SEO audit with AI SEO Turbo. Learn to analyze websites, configure settings, and get SEO recommendations.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'First SEO Audit Guide - Run Your Website Analysis | AI SEO Turbo',
    description: 'Step-by-step guide to running your first SEO audit with AI SEO Turbo. Learn to analyze websites, configure settings, and get SEO recommendations.',
  }
}

export default function FirstAuditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}