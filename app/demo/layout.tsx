import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free SEO Audit Demo - Try AI SEO Turbo | AI SEO Turbo',
  description: 'Try our AI-powered SEO audit tool for free. Analyze any website instantly and get recommendations to improve search rankings and drive traffic.',
  keywords: ['SEO audit demo', 'free SEO tool', 'website analysis', 'SEO checker', 'SEO audit free'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/demo'
  },
  openGraph: {
    images: ['/logo.png'],
    title: 'Free SEO Audit Demo - Try AI SEO Turbo | AI SEO Turbo',
    description: 'Try our AI-powered SEO audit tool for free. Analyze any website instantly and get recommendations to improve search rankings and drive traffic.',
    type: 'website',
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