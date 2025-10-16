import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free SEO Audit Demo - Try AI SEO Turbo | AI SEO Turbo',
  description: 'Try our AI-powered SEO audit tool for free. Analyze any website instantly and get actionable recommendations to improve search rankings and drive more traffic.',
  keywords: ['SEO audit demo', 'free SEO tool', 'website analysis', 'SEO checker', 'SEO audit free'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/demo'
  },
  openGraph: {
    title: 'Free SEO Audit Demo - Try AI SEO Turbo | AI SEO Turbo',
    description: 'Try our AI-powered SEO audit tool for free. Analyze any website instantly and get actionable recommendations to improve search rankings and drive more traffic.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SEO Audit Demo - Try AI SEO Turbo | AI SEO Turbo',
    description: 'Try our AI-powered SEO audit tool for free. Analyze any website instantly and get actionable recommendations to improve search rankings and drive more traffic.',
  }
}

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}