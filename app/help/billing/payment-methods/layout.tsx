import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment Methods Guide - Add & Manage Cards | AI SEO Turbo',
  description: 'Manage your payment methods for AI SEO Turbo subscriptions. Learn how to add credit cards, update billing information, and secure payment processing.',
  keywords: ['payment methods', 'credit cards', 'billing information', 'payment security', 'card management', 'subscription payments'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/billing/payment-methods'
  },
  openGraph: {
    title: 'Payment Methods Guide - Add & Manage Cards | AI SEO Turbo',
    description: 'Manage your payment methods for AI SEO Turbo subscriptions. Learn how to add credit cards, update billing information, and secure payment processing.',
    url: 'https://www.aiseoturbo.com/help/billing/payment-methods',
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
    title: 'Payment Methods Guide - Add & Manage Cards | AI SEO Turbo',
    description: 'Manage your payment methods for AI SEO Turbo subscriptions. Learn how to add credit cards, update billing information, and secure payment processing.',
  }
}

export default function PaymentMethodsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}