import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invoice Management - Download & View Bills | AI SEO Turbo',
  description: 'Access, download, and manage your AI SEO Turbo invoices. Learn how to view billing history, download PDF receipts, and understand invoice details.',
  keywords: ['invoices', 'billing history', 'download invoices', 'receipts', 'billing management', 'invoice PDF', 'payment history'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/billing/invoices'
  },
  openGraph: {
    title: 'Invoice Management Guide - Download & View Bills | AI SEO Turbo',
    description: 'Access, download, and manage your AI SEO Turbo invoices. Learn how to view billing history, download PDF receipts, and understand invoice details.',
    url: 'https://www.aiseoturbo.com/help/billing/invoices',
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
    title: 'Invoice Management Guide - Download & View Bills | AI SEO Turbo',
    description: 'Access, download, and manage your AI SEO Turbo invoices. Learn how to view billing history, download PDF receipts, and understand invoice details.',
  }
}

export default function InvoicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}