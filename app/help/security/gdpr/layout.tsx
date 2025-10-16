import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GDPR Compliance Guide - Data Protection Rights | AI SEO Turbo',
  description: 'Complete GDPR compliance guide for AI SEO Turbo. Learn about your data rights, privacy protection, and how we ensure GDPR compliance for your SEO data.',
  keywords: ['GDPR compliance', 'data protection', 'privacy rights', 'GDPR regulations', 'data privacy', 'EU privacy law'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/security/gdpr'
  },
  openGraph: {
    title: 'GDPR Compliance Guide - Data Protection Rights | AI SEO Turbo',
    description: 'Complete GDPR compliance guide for AI SEO Turbo. Learn about your data rights, privacy protection, and how we ensure GDPR compliance for your SEO data.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDPR Compliance Guide - Data Protection Rights | AI SEO Turbo',
    description: 'Complete GDPR compliance guide for AI SEO Turbo. Learn about your data rights, privacy protection, and how we ensure GDPR compliance for your SEO data.',
  }
}

export default function GDPRLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}