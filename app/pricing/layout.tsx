import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Audit Pricing - Free & Pro Plans | AI SEO Turbo',
  description: 'Choose the perfect SEO plan for your business. Free plan with analysis. Pro plans start at $29/month.',
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
    title: 'SEO Audit Pricing - Free & Pro Plans | AI SEO Turbo',
    description: 'Choose the perfect SEO plan. Free plan with analysis. Pro plans start at $29/month with advanced features.',
    url: 'https://www.aiseoturbo.com/pricing',
    siteName: 'AISEOTurbo',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Audit Pricing Plans | AISEOTurbo', 
    description: 'Choose the perfect SEO plan. Free plan with analysis. Pro plans start at $29/month.'
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
    canonical: 'https://www.aiseoturbo.com/pricing'
  }
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
