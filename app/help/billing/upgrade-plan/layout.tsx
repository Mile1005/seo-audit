import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upgrade to Pro Plan - Subscription Guide | AI SEO Turbo',
  description: 'Learn how to upgrade your AI SEO Turbo subscription to Pro plan. Unlock advanced features, unlimited audits, priority support, and premium SEO tools.',
  keywords: ['upgrade plan', 'pro subscription', 'premium features', 'unlimited audits', 'priority support', 'SEO tools upgrade'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/billing/upgrade-plan'
  },
  openGraph: {
    title: 'Upgrade Subscription Guide - Pro Plan Benefits | AI SEO Turbo',
    description: 'Learn how to upgrade your AI SEO Turbo subscription to Pro plan. Unlock advanced features, unlimited audits, priority support, and premium SEO tools.',
    url: 'https://www.aiseoturbo.com/help/billing/upgrade-plan',
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
    title: 'Upgrade Subscription Guide - Pro Plan Benefits | AI SEO Turbo',
    description: 'Learn how to upgrade your AI SEO Turbo subscription to Pro plan. Unlock advanced features, unlimited audits, priority support, and premium SEO tools.',
  }
}

export default function UpgradePlanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}