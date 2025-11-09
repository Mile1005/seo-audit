import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import WebhooksPage from '@/app/help/api/webhooks/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/api/webhooks',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <WebhooksPage />
}
