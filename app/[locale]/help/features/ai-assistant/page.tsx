import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import AIAssistantPage from '@/app/help/features/ai-assistant/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/features/ai-assistant',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <AIAssistantPage />
}
