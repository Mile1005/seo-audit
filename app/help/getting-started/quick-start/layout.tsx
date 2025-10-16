import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quick Start - Get Started with AI SEO Turbo | AI SEO Turbo',
  description: 'Complete quick start guide for AI SEO Turbo. Learn to create account, run first audit, and optimize your website in minutes with step-by-step instructions.',
  keywords: ['quick start', 'getting started', 'SEO tutorial', 'first steps', 'beginner guide', 'SEO setup', 'account setup'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/getting-started/quick-start'
  },
  openGraph: {
    title: 'Quick Start Guide - Get Started with AI SEO Turbo | AI SEO Turbo',
    description: 'Complete quick start guide for AI SEO Turbo. Learn to create account, run first audit, and optimize your website in minutes with step-by-step instructions.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick Start Guide - Get Started with AI SEO Turbo | AI SEO Turbo',
    description: 'Complete quick start guide for AI SEO Turbo. Learn to create account, run first audit, and optimize your website in minutes with step-by-step instructions.',
  }
}

export default function QuickStartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}