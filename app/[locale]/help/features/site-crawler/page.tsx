import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import SiteCrawlerPage from '@/app/help/features/site-crawler/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/features/site-crawler',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <SiteCrawlerPage />
}
