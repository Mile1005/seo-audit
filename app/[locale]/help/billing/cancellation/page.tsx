import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import CancellationPage from '@/app/help/billing/cancellation/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    title: 'Account Cancellation & Subscription Termination Guide | AI SEO Turbo',
    description: 'Learn about the account cancellation process, subscription termination, data retention policies, and how to properly close your AI SEO Turbo account.',
    keywords: ['account cancellation', 'subscription termination', 'cancel account', 'data retention', 'account closure'],
    path: '/help/billing/cancellation',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <CancellationPage />
}
