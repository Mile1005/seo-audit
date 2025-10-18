import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Getting Started Guide - Quick SEO Setup | AI SEO Turbo',
  description: 'Get started with AI SEO Turbo quickly. Learn dashboard setup, run your first audit, understand SEO scores, and optimize your website performance.',
  keywords: ['getting started', 'SEO setup', 'first audit', 'dashboard guide', 'SEO tutorial', 'beginner guide', 'quick start'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/category/getting-started'
  },
  openGraph: {
    title: 'Getting Started Guide - Quick SEO Setup | AI SEO Turbo',
    description: 'Get started with AI SEO Turbo quickly. Learn dashboard setup, run your first audit, understand SEO scores, and optimize your website performance.',
    url: 'https://www.aiseoturbo.com/help/category/getting-started',
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
    title: 'Getting Started Guide - Quick SEO Setup | AI SEO Turbo',
    description: 'Get started with AI SEO Turbo quickly. Learn dashboard setup, run your first audit, understand SEO scores, and optimize your website performance.',
  }
}

export default function GettingStartedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}