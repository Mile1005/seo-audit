import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import TroubleshootingPage from '@/app/help/troubleshooting/page'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/troubleshooting',
    locale: params.locale as Locale,
  })
}

export default function LocalizedTroubleshootingPage() {
  return <TroubleshootingPage />
}