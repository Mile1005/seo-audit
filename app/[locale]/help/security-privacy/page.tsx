import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import SecurityPrivacyPage from './page-translated'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateSEOMeta({
    title: 'Security & Privacy Policies: Data Protection Guide﻿',
    description: 'Learn about AI SEO Turbo\'s security measures, privacy policies, data protection practices, GDPR compliance, and how we safeguard your information.',
    keywords: ['security', 'privacy policy', 'data protection', 'GDPR compliance', 'information security'],
    path: '/help/security-privacy',
    locale: params.locale as Locale,
  })
}

type Props = { params: { locale: string } }

export default async function LocalizedSecurityPrivacyPage({ params }: Props) {
  const { locale } = params
  setRequestLocale(locale)
  return <SecurityPrivacyPage />
}
