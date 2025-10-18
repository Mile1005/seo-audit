import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Settings Guide - Control Your Data | AI SEO Turbo',
  description: 'Manage your privacy settings in AI SEO Turbo. Learn to control data sharing, configure privacy preferences, and protect your SEO analysis data.',
  keywords: ['privacy settings', 'data control', 'privacy preferences', 'data protection', 'privacy controls', 'account privacy'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/security/privacy'
  },
  openGraph: {
    title: 'Privacy Settings Guide - Control Your Data | AI SEO Turbo',
    description: 'Manage your privacy settings in AI SEO Turbo. Learn to control data sharing, configure privacy preferences, and protect your SEO analysis data.',
    url: 'https://www.aiseoturbo.com/help/security/privacy',
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
    title: 'Privacy Settings Guide - Control Your Data | AI SEO Turbo',
    description: 'Manage your privacy settings in AI SEO Turbo. Learn to control data sharing, configure privacy preferences, and protect your SEO analysis data.',
  }
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}