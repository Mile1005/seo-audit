import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import AccountBillingPage from '@/app/help/account-billing/page'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/account-billing',
    locale: params.locale as Locale,
  })
}

export default function LocalizedAccountBillingPage() {
  return <AccountBillingPage />
}
