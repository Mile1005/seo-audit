import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

// Import proper feature components
import SEOAuditFeaturePage from '@/components/features/seo-audit/SEOAuditFeaturePage'
import SiteCrawlerFeaturePage from '@/components/features/site-crawler/SiteCrawlerFeaturePage'
import KeywordTrackingFeaturePage from '@/components/features/keyword-tracking/KeywordTrackingFeaturePage'
import CompetitorAnalysisFeaturePage from '@/components/features/competitor-analysis/CompetitorAnalysisFeaturePage'
import AIAssistantFeaturePage from '@/components/features/ai-assistant/AIAssistantFeaturePage'

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
      return <SEOAuditFeaturePage />
    case 'site-crawler':
      return <SiteCrawlerFeaturePage />
    case 'keyword-tracking':
      return <KeywordTrackingFeaturePage />
    case 'competitor-analysis':
      return <CompetitorAnalysisFeaturePage />
    case 'ai-assistant':
      return <AIAssistantFeaturePage />
    default:
      // Fallback: show top-level features page for unknown slugs (prevents 404)
      const FeaturesPage = (await import('@/components/features/FeaturesPage')).default
      return <FeaturesPage />
  }
}
