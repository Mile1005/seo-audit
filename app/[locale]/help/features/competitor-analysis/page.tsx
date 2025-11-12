import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import CompetitorAnalysisPage from '@/app/help/features/competitor-analysis/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    description: 'Master competitor analysis to gain insights into your competitors\' SEO strategies, keywords, backlinks, and content performance.',
    keywords: ['competitor analysis', 'SEO intelligence', 'competitive research', 'keyword analysis', 'backlink analysis'],
    path: 'help/features/competitor-analysis',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <CompetitorAnalysisPage />
}
