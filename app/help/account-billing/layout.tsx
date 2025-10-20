import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account & Billing - Subscription Management | AI SEO Turbo',
  description: 'Complete guide to account management and billing for AI SEO Turbo. Learn about subscriptions, payments, invoices, and account settings.',
  keywords: ['account management', 'billing help', 'subscription management', 'payment help', 'account settings', 'billing support'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/account-billing'
  },
  openGraph: {
    images: ['/logo.png'],
    title: 'Account & Billing - Subscription Management | AI SEO Turbo',
    description: 'Complete guide to account management and billing for AI SEO Turbo. Learn about subscriptions, payments, invoices, and account settings.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Account & Billing - Subscription Management | AI SEO Turbo',
    description: 'Complete guide to account management and billing for AI SEO Turbo. Learn about subscriptions, payments, invoices, and account settings.',
  }
}

export default function AccountBillingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}