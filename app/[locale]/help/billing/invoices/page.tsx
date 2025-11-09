import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import InvoicesPage from '@/app/help/billing/invoices/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/billing/invoices',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <InvoicesPage />
}
