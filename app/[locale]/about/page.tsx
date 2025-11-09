import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import AboutPage from '@/app/about/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    ...pageSEO.about,
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
