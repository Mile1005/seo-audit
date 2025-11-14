import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import SecurityPage from './page-translated'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    description: 'Learn about our security measures, privacy policies, data protection practices, and how we keep your information safe and compliant.',
    keywords: ['security', 'data protection', 'account safety', 'privacy policies', 'compliance'],
    locale: locale as Locale,
    path: 'help/security'
  })
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedSecurityPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <SecurityPage />
}