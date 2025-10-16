import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Competitor Analysis - Spy on Competitors | AI SEO Turbo',
  description: 'Master competitor analysis with AI SEO Turbo. Learn to identify competitors, analyze their strategies, find keyword opportunities, and gain competitive advantage.',
  keywords: ['competitor analysis', 'SEO spying', 'competitor research', 'keyword opportunities', 'competitive intelligence', 'SEO strategy'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/features/competitor-analysis'
  },
  openGraph: {
    title: 'Competitor Analysis Guide - Spy on Competitors | AI SEO Turbo',
    description: 'Master competitor analysis with AI SEO Turbo. Learn to identify competitors, analyze their strategies, find keyword opportunities, and gain competitive advantage.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Competitor Analysis Guide - Spy on Competitors | AI SEO Turbo',
    description: 'Master competitor analysis with AI SEO Turbo. Learn to identify competitors, analyze their strategies, find keyword opportunities, and gain competitive advantage.',
  }
}

export default function CompetitorAnalysisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}