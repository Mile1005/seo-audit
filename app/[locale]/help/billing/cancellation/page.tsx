import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import CancellationPage from '@/app/help/billing/cancellation/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/billing/cancellation',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <CancellationPage />
}
