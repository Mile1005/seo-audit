import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import TroubleshootingPage from '@/app/help/troubleshooting/page'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    title: pageSEO.help.title,
    description: pageSEO.help.description,
    keywords: pageSEO.help.keywords,
    path: 'help/troubleshooting',
    locale: params.locale as Locale,
  })
}

export default function LocalizedTroubleshootingPage() {
  return <TroubleshootingPage />
}