import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CompetitorAnalysisContent from './CompetitorAnalysisContent'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'help.categories.seoTools.articles.competitorGuide' })

  return {
    title: t('header.title'),
    description: t('header.description'),
  }
}

export default function CompetitorAnalysisPage() {
  return <CompetitorAnalysisContent />
}