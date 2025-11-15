import { generateSEOMeta } from '@/lib/seo'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import APIIntegrationsContent from '../api-integrations/APIIntegrationsContent'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('apiContent.api-integrations.header')

  return generateSEOMeta({
    title: `${t('title')} - AI SEO Turbo Help`,
    description: t('subtitle'),
    keywords: ['API integrations', 'RESTful API', 'webhooks', 'SDK', 'enterprise integration', 'API endpoints'],
    path: '/help/api-integrations',
    locale: locale as 'en' | 'fr' | 'it' | 'es' | 'id' | 'de',
  })
}

export default async function APIIntegrationsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <APIIntegrationsContent />
}
