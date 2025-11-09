import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account Cancellation - Cancel Subscription | AI SEO Turbo',
  description: 'Learn how to cancel your AI SEO Turbo subscription safely. Understand cancellation policies, data retention, and account closure procedures.',
  keywords: ['cancel subscription', 'account cancellation', 'cancel AI SEO Turbo', 'subscription cancellation', 'account closure', 'billing cancellation'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/billing/cancellation'
  },
  openGraph: {
    images: ['/logo.png'],
    url: 'https://www.aiseoturbo.com/help/billing/cancellation',
    siteName: 'AI SEO Turbo',
    title: 'Account Cancellation Guide - Cancel Subscription | AI SEO Turbo',
    description: 'Learn how to cancel your AI SEO Turbo subscription safely. Understand cancellation policies, data retention, and account closure procedures.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Account Cancellation Guide - Cancel Subscription | AI SEO Turbo',
    description: 'Learn how to cancel your AI SEO Turbo subscription safely. Understand cancellation policies, data retention, and account closure procedures.',
  }
}

export default function CancellationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}