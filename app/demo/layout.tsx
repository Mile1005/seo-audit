import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free SEO Audit Demo - Try AI SEO Turbo | AI SEO Turbo',
  description: 'Try our AI-powered SEO audit tool for free. Analyze any website instantly and get recommendations to improve search rankings and drive traffic.',
  keywords: ['SEO audit demo', 'free SEO tool', 'website analysis', 'SEO checker', 'SEO audit free'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/demo'
  },
  openGraph: {
    title: 'Free SEO Audit Demo - Try AI SEO Turbo | AI SEO Turbo',
    description: 'Try our AI-powered SEO audit tool for free. Analyze any website instantly and get recommendations to improve search rankings and drive traffic.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.aiseoturbo.com/demo',
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
    title: 'Free SEO Audit Demo - Try AI SEO Turbo | AI SEO Turbo',
    description: 'Try our AI-powered SEO audit tool for free. Analyze any website instantly and get recommendations to improve search rankings and drive traffic.',
  }
}

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}