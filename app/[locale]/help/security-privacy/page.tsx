import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import SecurityPrivacyPage from '@/app/help/security-privacy/page'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/security-privacy',
    locale: params.locale as Locale,
  })
}

export default function LocalizedSecurityPrivacyPage() {
  return <SecurityPrivacyPage />
}
