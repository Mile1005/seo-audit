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
    type: 'website',
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