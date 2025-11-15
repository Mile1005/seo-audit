import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import APIIntegrationsPage from '@/app/help/api-integrations/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

// SEO metadata for the API integrations help page
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    ...pageSEO.help,
    locale: locale as Locale,
    path: 'help/api-integrations'
  })
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedAPIIntegrationsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <APIIntegrationsPage />
}