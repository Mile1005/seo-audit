import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Audit Pricing Plans | AISEOTurbo - Free & Pro Plans Available',
  description: 'Choose the perfect SEO audit plan for your business. Free plan available with comprehensive SEO analysis. Pro plans starting at $29/month with advanced features and priority support.',
  keywords: [
    'SEO audit pricing',
    'SEO tools pricing', 
    'website audit cost',
    'SEO analysis plans',
    'digital marketing tools',
    'SEO software pricing',
    'competitor analysis pricing',
    'keyword tracking plans'
  ],
  authors: [{ name: 'AISEOTurbo Team' }],
  openGraph: {
    title: 'SEO Audit Pricing Plans | AISEOTurbo',
    description: 'Transparent pricing for powerful SEO audit tools. Start free or choose Pro plans with advanced features, unlimited audits, and priority support.',
    url: 'https://aiseoturbo.com/pricing',
    siteName: 'AISEOTurbo',
    type: 'website',
    images: [
      {
        url: '/api/og?title=SEO%20Audit%20Pricing%20Plans&description=Transparent%20pricing%20for%20powerful%20SEO%20tools',
        width: 1200,
        height: 630,
        alt: 'AISEOTurbo Pricing Plans'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Audit Pricing Plans | AISEOTurbo', 
    description: 'Transparent pricing for powerful SEO audit tools. Start free or choose Pro plans with advanced features.',
    images: ['/api/og?title=SEO%20Audit%20Pricing%20Plans&description=Transparent%20pricing%20for%20powerful%20SEO%20tools']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://aiseoturbo.com/pricing'
  }
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
