import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quick Start - Get Started with AI SEO Turbo | AI SEO Turbo',
  description: 'Quick start guide for AI SEO Turbo. Create account, run first audit, and optimize your website in minutes.',
  keywords: ['quick start', 'getting started', 'SEO tutorial', 'first steps', 'beginner guide', 'SEO setup', 'account setup'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/getting-started/quick-start'
  },
  openGraph: {
    images: ['/logo.png'],
    url: 'https://www.aiseoturbo.com/help/getting-started/quick-start',
    siteName: 'AI SEO Turbo',
    title: 'Quick Start Guide - Get Started with AI SEO Turbo | AI SEO Turbo',
    description: 'Quick start guide for AI SEO Turbo. Create account, run first audit, and optimize your website in minutes.',
    type: 'article',
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