import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help Center - SEO Support & Guides | AI SEO Turbo',
  description: 'Get help with AI SEO Turbo. Find answers to common questions, tutorials, troubleshooting guides, and contact support for personalized assistance.',
  keywords: ['SEO help', 'support center', 'SEO tutorials', 'troubleshooting', 'SEO guides', 'customer support'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help'
  },
  openGraph: {
    title: 'Help Center - SEO Support & Guides | AI SEO Turbo',
    description: 'Get help with AI SEO Turbo. Find answers to common questions, tutorials, troubleshooting guides, and contact support for personalized assistance.',
    url: 'https://www.aiseoturbo.com/help',
    type: 'website',
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
    title: 'Help Center - SEO Support & Guides | AI SEO Turbo',
    description: 'Get help with AI SEO Turbo. Find answers to common questions, tutorials, troubleshooting guides, and contact support for personalized assistance.',
  }
}

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
