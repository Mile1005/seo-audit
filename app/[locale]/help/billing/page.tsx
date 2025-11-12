import BillingOverviewPage from '@/app/help/billing/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    locale: locale as Locale,
    path: 'help/billing',
    description: 'Everything you need to know about managing your AI SEO Turbo account, billing, subscriptions, and payment methods.',
    keywords: ['billing', 'subscriptions', 'payment methods', 'account management', 'pricing plans']
  })
}

export default function Page() {
  return <BillingOverviewPage />
}