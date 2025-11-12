import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import AccountBillingPage from '@/app/help/account-billing/page'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    description: 'Manage your AI SEO Turbo account settings, billing information, subscription plans, and payment methods. Learn about account security and billing preferences.',
    keywords: ['account management', 'billing', 'subscription', 'payment methods', 'account settings'],
    path: '/help/account-billing',
    locale: params.locale as Locale,
  })
}

export default function LocalizedAccountBillingPage() {
  return <AccountBillingPage />
}
