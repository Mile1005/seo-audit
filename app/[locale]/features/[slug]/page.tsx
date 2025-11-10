import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'

// Reuse existing non-localized feature pages
import SeoAuditPage from '@/app/features/seo-audit/page'
import SiteCrawlerPage from '@/app/features/site-crawler/page'
import KeywordTrackingPage from '@/app/features/keyword-tracking/page'
import CompetitorAnalysisPage from '@/app/features/competitor-analysis/page'
import AIAssistantPage from '@/app/features/ai-assistant/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

// SEO metadata for feature pages with hreflang support
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params

  // Get the appropriate SEO config based on slug
  const seoKey = `features/${slug}` as keyof typeof pageSEO
  const seoConfig = pageSEO[seoKey] || pageSEO.features

  return generateSEOMeta({
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    locale: locale as Locale,
    path: `features/${slug}`
  })
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function LocalizedFeatureSlugPage({ params }: Props) {
  const { locale, slug } = await params
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
      const FeaturesPage = (await import('@/components/features/FeaturesPage')).default
      return <FeaturesPage />
  }
}
