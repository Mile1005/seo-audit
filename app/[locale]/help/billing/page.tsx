import BillingOverviewPage from '@/app/help/billing/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    ...pageSEO.help,
    locale: locale as Locale,
    path: 'help/billing',
    title: 'Billing & Account Management | AI SEO Turbo Help',
    description: 'Everything you need to know about managing your AI SEO Turbo account, billing, subscriptions, and payment methods.'
  })
}

export default function Page() {
  return <BillingOverviewPage />
}