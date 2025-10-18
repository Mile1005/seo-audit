import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security & Privacy Guide - Data Protection | AI SEO Turbo',
  description: 'Learn about AI SEO Turbo security measures, data privacy, GDPR compliance, and best practices for protecting your SEO data and account.',
  keywords: ['security', 'privacy', 'data protection', 'GDPR compliance', 'account security', 'two-factor authentication', 'data privacy'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/category/security-privacy'
  },
  openGraph: {
    title: 'Security & Privacy Guide - Data Protection | AI SEO Turbo',
    description: 'Learn about AI SEO Turbo security measures, data privacy, GDPR compliance, and best practices for protecting your SEO data and account.',
    url: 'https://www.aiseoturbo.com/help/category/security-privacy',
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