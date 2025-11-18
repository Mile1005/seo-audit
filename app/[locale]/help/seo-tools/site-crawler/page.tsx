import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { SiteCrawlerContent } from './SiteCrawlerContent'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'help.categories.seoTools.articles.siteCrawler' })

  return {
    title: t('header.title'),
    description: t('header.description'),
  }
}

export default function SiteCrawlerPage() {
  return <SiteCrawlerContent />
}