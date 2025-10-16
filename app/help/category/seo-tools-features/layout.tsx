import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Tools & Features - Master AI SEO Turbo | AI SEO Turbo',
  description: 'Comprehensive guide to AI SEO Turbo features. Learn about SEO audits, competitor analysis, keyword tracking, site crawling, and AI assistant capabilities.',
  keywords: ['SEO tools', 'SEO features', 'SEO audit guide', 'competitor analysis', 'keyword tracking', 'site crawler', 'AI assistant'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/category/seo-tools-features'
  },
  openGraph: {
    title: 'SEO Tools & Features - Master AI SEO Turbo | AI SEO Turbo',
    description: 'Comprehensive guide to AI SEO Turbo features. Learn about SEO audits, competitor analysis, keyword tracking, site crawling, and AI assistant capabilities.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Tools & Features - Master AI SEO Turbo | AI SEO Turbo',
    description: 'Comprehensive guide to AI SEO Turbo features. Learn about SEO audits, competitor analysis, keyword tracking, site crawling, and AI assistant capabilities.',
  }
}

export default function SEOToolsFeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}