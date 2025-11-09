import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import PrivacyPage from '@/app/help/security/privacy/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/security/privacy',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <PrivacyPage />
}
