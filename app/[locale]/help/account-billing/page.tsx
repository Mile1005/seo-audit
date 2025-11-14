import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import AccountBillingPage from './page-translated'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    description: 'Manage your AI SEO Turbo account settings, billing information, subscription plans, and payment methods. Learn about account security and billing preferences.',
    keywords: ['account management', 'billing', 'subscription', 'payment methods', 'account settings'],
    locale: locale as Locale,
    path: 'help/account-billing'
  })
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedAccountBillingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <AccountBillingPage />
}
