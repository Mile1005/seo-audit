import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import ApiPage from './page-translated'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { getTranslations } from 'next-intl/server'
import { type Locale } from '@/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'help.categories.api' })

  return generateSEOMeta({
    ...pageSEO.help,
    locale: locale as Locale,
    path: 'help/api',
    title: t('title'),
    description: t('subtitle')
  })
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedApiPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ApiPage />
}