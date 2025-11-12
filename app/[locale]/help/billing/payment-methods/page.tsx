import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import PaymentMethodsPage from '@/app/help/billing/payment-methods/page'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    description: 'Manage your payment methods, update billing information, and learn about supported payment options for your AI SEO Turbo subscription.',
    keywords: ['payment methods', 'billing information', 'update payment', 'payment options', 'billing details'],
    path: 'help/billing/payment-methods',
    locale: params.locale as Locale,
  })
}

export default function LocalizedPaymentMethodsPage() {
  return <PaymentMethodsPage />
}