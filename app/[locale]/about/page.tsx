import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import AboutPage from '@/app/about/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    title: 'About AI SEO Turbo - Expert SEO Team & AI Innovation',
    description: 'Discover AISEOTurbo\'s mission to revolutionize SEO with AI technology. Meet our team of experts committed to helping businesses succeed online.',
    keywords: ['SEO company', 'AI SEO experts', 'SEO consultants', 'technical SEO team', 'AI optimization specialists'],
    locale: locale as Locale,
    path: 'about'
  })
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedAboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <AboutPage />
}
