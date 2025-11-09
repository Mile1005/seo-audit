import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import CompetitorAnalysisPage from '@/app/help/features/competitor-analysis/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/features/competitor-analysis',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <CompetitorAnalysisPage />
}
