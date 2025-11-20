import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import SEOToolsPage from './page-translated'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import { generateAlternates } from '@/lib/metadata-utils';

// SEO metadata for the seo tools help page
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    ...generateSEOMeta({
      description: 'Explore our comprehensive suite of SEO tools designed to boost your search rankings, analyze competitors, and optimize your website performance.',
      keywords: ['SEO tools', 'SEO features', 'search rankings', 'competitor analysis', 'website optimization', 'SEO toolkit'],
      locale: locale as Locale,
      path: 'help/seo-tools'
    }),
    alternates: generateAlternates('/help/seo-tools', locale as Locale)
  }
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedSEOToolsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <SEOToolsPage />
}