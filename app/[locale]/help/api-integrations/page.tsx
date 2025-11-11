import { generateSEOMeta } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'
import APIIntegrationsContent from './APIIntegrationsContent'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params

  return generateSEOMeta({
    title: 'API & Integrations Guide - RESTful Endpoints, Webhooks & SDKs | AI SEO Turbo',
    description: 'Complete guide to AI SEO Turbo API and integrations. Learn about RESTful API endpoints, webhooks, SDKs, and enterprise integration features.',
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
