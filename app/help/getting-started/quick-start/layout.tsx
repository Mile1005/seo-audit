import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quick Start - Get Started with AI SEO Turbo | AI SEO Turbo',
  description: 'Quick start guide for AI SEO Turbo. Create account, run first audit, and optimize your website in minutes.',
  keywords: ['quick start', 'getting started', 'SEO tutorial', 'first steps', 'beginner guide', 'SEO setup', 'account setup'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/getting-started/quick-start'
  },
  openGraph: {
    title: 'Quick Start Guide - Get Started with AI SEO Turbo | AI SEO Turbo',
    description: 'Quick start guide for AI SEO Turbo. Create account, run first audit, and optimize your website in minutes.',
    url: 'https://www.aiseoturbo.com/help/getting-started/quick-start',
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
    title: 'Quick Start Guide - Get Started with AI SEO Turbo | AI SEO Turbo',
    description: 'Quick start guide for AI SEO Turbo. Create account, run first audit, and optimize your website in minutes.',
  }
}

export default function QuickStartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}