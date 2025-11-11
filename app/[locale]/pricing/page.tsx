import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import PricingPage from '@/app/pricing/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    title: 'SEO Audit Pricing - Plans From $29/month | AI SEO Turbo',
    description: 'Choose the perfect SEO audit plan for your business. Free plan with analysis, Pro plans from $29/month with advanced features and priority support.',
    keywords: ['SEO audit pricing', 'SEO tools cost', 'website audit plans'],
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
