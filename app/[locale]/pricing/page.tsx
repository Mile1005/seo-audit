import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import PricingPage from '@/app/pricing/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    title: pageSEO.pricing.title,
    description: pageSEO.pricing.description,
    keywords: pageSEO.pricing.keywords,
    locale: locale as Locale,
    path: 'pricing'
  })
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedPricingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <PricingPage />
}
