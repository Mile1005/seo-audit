import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import BestPracticesPage from '@/app/help/security/best-practices/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/security/best-practices',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <BestPracticesPage />
}
