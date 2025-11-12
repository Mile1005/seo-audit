import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import FeaturesPage from '@/components/features/FeaturesPage'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

// SEO metadata for the features page with hreflang support
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    description: 'Discover powerful SEO features including technical audits, competitor analysis, keyword tracking, and AI-powered recommendations for better rankings.',
    keywords: ['SEO features', 'technical SEO audit', 'competitor analysis', 'keyword tracking'],
    ogImage: '/logo.png',
    locale: locale as Locale,
    path: 'features'
  })
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedFeaturesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <FeaturesPage />
}
