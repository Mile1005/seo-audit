import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Scores Guide - Understand Your Rankings | AI SEO Turbo',
  description: 'Learn to interpret SEO scores and metrics in AI SEO Turbo. Understand ranking factors, score calculations, and how to improve your website performance.',
  keywords: ['SEO scores', 'ranking metrics', 'SEO performance', 'score interpretation', 'ranking factors', 'website analysis'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/getting-started/seo-scores'
  },
  openGraph: {
    images: ['/logo.png'],
    title: 'SEO Scores Guide - Understand Your Rankings | AI SEO Turbo',
    description: 'Learn to interpret SEO scores and metrics in AI SEO Turbo. Understand ranking factors, score calculations, and how to improve your website performance.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Scores Guide - Understand Your Rankings | AI SEO Turbo',
    description: 'Learn to interpret SEO scores and metrics in AI SEO Turbo. Understand ranking factors, score calculations, and how to improve your website performance.',
  }
}

export default function SEOScoresLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}