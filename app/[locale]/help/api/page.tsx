import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import ApiPage from './page-translated'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    ...pageSEO.help,
    locale: locale as Locale,
    path: 'help/api',
    title: 'API Integration Guide | AI SEO Turbo Help',
    description: 'Integrate AI SEO Turbo\'s powerful SEO tools into your applications with our comprehensive REST API. Automate audits, access real-time data, and build custom workflows.'
  })
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedApiPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ApiPage />
}