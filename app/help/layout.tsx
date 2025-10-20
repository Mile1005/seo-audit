import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help Center - SEO Support & Guides | AI SEO Turbo',
  description: 'Get help with AI SEO Turbo. Find answers to common questions, tutorials, troubleshooting guides, and contact support for personalized assistance.',
  keywords: ['SEO help', 'support center', 'SEO tutorials', 'troubleshooting', 'SEO guides', 'customer support'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help'
  },
  openGraph: {
    images: ['/logo.png'],
    title: 'Help Center - SEO Support & Guides | AI SEO Turbo',
    description: 'Get help with AI SEO Turbo. Find answers to common questions, tutorials, troubleshooting guides, and contact support for personalized assistance.',
    type: 'website',
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
