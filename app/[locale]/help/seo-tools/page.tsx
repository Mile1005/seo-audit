import SEOToolsOverviewPage from '@/app/help/seo-tools/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    description: 'Discover our comprehensive suite of SEO tools designed to boost your search rankings, analyze competitors, and optimize your website performance.',
    keywords: ['SEO tools', 'SEO features', 'search rankings', 'competitor analysis', 'website optimization', 'SEO toolkit'],
    locale: locale as Locale,
    path: 'help/seo-tools'
  })
}

export default function Page() {
  return <SEOToolsOverviewPage />
}