import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'System Status - Service Availability | AI SEO Turbo',
  description: 'Check the current status of AI SEO Turbo services including API, web application, database, and crawler services. Monitor uptime and service health.',
  keywords: ['system status', 'service availability', 'uptime', 'API status', 'service health'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/status'
  },
  openGraph: {
    title: 'System Status - Service Availability | AI SEO Turbo',
    description: 'Check the current status of AI SEO Turbo services including API, web application, database, and crawler services.',
    url: 'https://www.aiseoturbo.com/status',
    type: 'website',
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
    title: 'System Status - Service Availability | AI SEO Turbo',
    description: 'Check the current status of AI SEO Turbo services including API, web application, database, and crawler services.',
  }
}

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}