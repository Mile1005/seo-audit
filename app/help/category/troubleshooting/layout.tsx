import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Troubleshooting Guide - Fix SEO Issues | AI SEO Turbo',
  description: 'Solve common SEO problems with AI SEO Turbo. Find solutions for audit issues, login problems, performance errors, and sync issues.',
  keywords: ['troubleshooting', 'SEO issues', 'fix problems', 'audit errors', 'login issues', 'performance problems', 'sync issues'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/category/troubleshooting'
  },
  openGraph: {
    title: 'Troubleshooting Guide - Fix SEO Issues | AI SEO Turbo',
    description: 'Solve common SEO problems with AI SEO Turbo. Find solutions for audit issues, login problems, performance errors, and sync issues.',
    url: 'https://www.aiseoturbo.com/help/category/troubleshooting',
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
    title: 'Troubleshooting Guide - Fix SEO Issues | AI SEO Turbo',
    description: 'Solve common SEO problems with AI SEO Turbo. Find solutions for audit issues, login problems, performance errors, and sync issues.',
  }
}

export default function TroubleshootingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}