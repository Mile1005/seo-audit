import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'

// Reuse existing non-localized feature pages
import SeoAuditPage from '@/app/features/seo-audit/page'
import SiteCrawlerPage from '@/app/features/site-crawler/page'
import KeywordTrackingPage from '@/app/features/keyword-tracking/page'
import CompetitorAnalysisPage from '@/app/features/competitor-analysis/page'
import AIAssistantPage from '@/app/features/ai-assistant/page'

export const metadata: Metadata = {
  title: 'SEO Features - AI SEO Turbo',
}

type Props = { params: { locale: string; slug: string } }

export default async function LocalizedFeatureSlugPage({ params }: Props) {
  const { locale, slug } = params
  setRequestLocale(locale)

  switch (slug) {
    case 'seo-audit':
      return <SeoAuditPage />
    case 'site-crawler':
      return <SiteCrawlerPage />
    case 'keyword-tracking':
      return <KeywordTrackingPage />
    case 'competitor-analysis':
      return <CompetitorAnalysisPage />
    case 'ai-assistant':
      return <AIAssistantPage />
    default:
      // Fallback: show top-level features page for unknown slugs (prevents 404)
      const FeaturesPage = (await import('@/app/features/page')).default
      return <FeaturesPage />
  }
}
