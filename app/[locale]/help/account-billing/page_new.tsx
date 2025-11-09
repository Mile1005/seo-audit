import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import AccountBillingPage from '@/app/help/account-billing/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

// SEO metadata for the account billing help page
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    ...pageSEO.help,
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