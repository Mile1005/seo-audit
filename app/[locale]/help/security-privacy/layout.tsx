import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security & Privacy Guide - Data Protection | AI SEO Turbo',
  description: 'Learn about AI SEO Turbo security measures, data privacy, GDPR compliance, and best practices for protecting your SEO data and account.',
  keywords: ['security', 'data protection', 'GDPR compliance', 'account security', 'two-factor authentication', 'data privacy'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/security-privacy'
  },
  openGraph: {
    images: ['/logo.png'],
    url: 'https://www.aiseoturbo.com/help/security-privacy',
    siteName: 'AI SEO Turbo',
    title: 'Security & Privacy Guide - Data Protection | AI SEO Turbo',
    description: 'Learn about AI SEO Turbo security measures, data privacy, GDPR compliance, and best practices for protecting your SEO data and account.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security & Privacy Guide - Data Protection | AI SEO Turbo',
    description: 'Learn about AI SEO Turbo security measures, data privacy, GDPR compliance, and best practices for protecting your SEO data and account.',
  }
}

export default function SecurityPrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}