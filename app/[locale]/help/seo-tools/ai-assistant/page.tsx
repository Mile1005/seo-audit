import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AIAssistantContent from './AIAssistantContent'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'help.categories.seoTools.articles.aiAssistant' })

  return {
    title: t('header.title'),
    description: t('header.description'),
  }
}

export default function AIAssistantPage() {
  return <AIAssistantContent />
}