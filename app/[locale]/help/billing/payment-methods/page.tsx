import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import PaymentMethodsPage from '@/app/help/billing/payment-methods/page'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/billing/payment-methods',
    locale: params.locale as Locale,
  })
}

export default function LocalizedPaymentMethodsPage() {
  return <PaymentMethodsPage />
}