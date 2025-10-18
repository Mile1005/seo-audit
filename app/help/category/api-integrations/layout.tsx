import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API & Integrations Help - Connect & Automate | AI SEO Turbo',
  description: 'Master API integrations and automation with AI SEO Turbo. Learn to connect with your tools, set up webhooks, and automate SEO workflows.',
  keywords: ['API integrations', 'automation', 'webhooks', 'API documentation', 'workflow automation', 'SEO API', 'integrations guide'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/category/api-integrations'
  },
  openGraph: {
    title: 'API & Integrations Help - Connect & Automate | AI SEO Turbo',
    description: 'Master API integrations and automation with AI SEO Turbo. Learn to connect with your tools, set up webhooks, and automate SEO workflows.',
    url: 'https://www.aiseoturbo.com/help/category/api-integrations',
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
    title: 'API & Integrations Help - Connect & Automate | AI SEO Turbo',
    description: 'Master API integrations and automation with AI SEO Turbo. Learn to connect with your tools, set up webhooks, and automate SEO workflows.',
  }
}

export default function APIIntegrationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}