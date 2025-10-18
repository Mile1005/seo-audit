import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Webhooks Setup - Real-time SEO Alerts | AI SEO Turbo',
  description: 'Set up webhooks for real-time SEO notifications and workflows. Learn to configure webhook endpoints for audit completions, ranking changes, and alerts.',
  keywords: ['webhooks', 'API integration', 'real-time notifications', 'SEO automation', 'webhook endpoints', 'audit notifications', 'ranking alerts'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/api/webhooks'
  },
  openGraph: {
    title: 'Webhooks Integration Guide - Real-time SEO Notifications | AI SEO Turbo',
    description: 'Set up webhooks for real-time SEO notifications and workflows. Learn to configure webhook endpoints for audit completions, ranking changes, and alerts.',
    url: 'https://www.aiseoturbo.com/help/api/webhooks',
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
    title: 'Webhooks Integration Guide - Real-time SEO Notifications | AI SEO Turbo',
    description: 'Set up webhooks for real-time SEO notifications and workflows. Learn to configure webhook endpoints for audit completions, ranking changes, and alerts.',
  }
}

export default function WebhooksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}