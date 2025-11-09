import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import GDPRPage from '@/app/help/security/gdpr/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/security/gdpr',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <GDPRPage />
}
