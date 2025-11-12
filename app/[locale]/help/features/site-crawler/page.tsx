import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import SiteCrawlerPage from '@/app/help/features/site-crawler/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    description: 'Master the site crawler feature to automatically discover and analyze all pages on your website for comprehensive SEO insights.',
    keywords: ['site crawler', 'website analysis', 'page discovery', 'SEO crawling', 'site indexing'],
    path: 'help/features/site-crawler',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <SiteCrawlerPage />
}
