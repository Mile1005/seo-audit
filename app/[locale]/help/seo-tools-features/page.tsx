import SEOToolsFeaturesCategoryPage from '../../../help/seo-tools-features/page'
import { generateSEOMeta } from '@/lib/seo'
import { Metadata } from 'next'
import { type Locale } from '@/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    title: 'SEO Tools Features - Complete Guide | AI SEO Turbo',
    description: 'Explore all SEO tools features including audit walkthroughs, competitor analysis, site crawler configuration, and AI assistant best practices.',
    keywords: ['SEO tools', 'SEO features', 'audit guide', 'competitor analysis', 'site crawler'],
    locale: locale as Locale,
    path: 'help/seo-tools-features'
  })
}

export default function LocalizedSEOToolsFeaturesPage({ params }: { params: Promise<{ locale: string }> }) {
  return <SEOToolsFeaturesCategoryPage />
}
