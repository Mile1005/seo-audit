import { generateSEOMeta } from '@/lib/seo'
import { generateAlternates } from '@/lib/metadata-utils'
import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import SEOAuditContent from './SEOAuditContent'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: 'seoAudit' })

  return {
    ...generateSEOMeta({
      title: t('meta.title'),
      description: t('meta.description'),
      path: '/help/seo-tools/seo-audit',
      locale: locale as 'en' | 'fr' | 'it' | 'es' | 'id' | 'de',
    }),
    alternates: generateAlternates('/help/seo-tools/seo-audit', locale as 'en' | 'fr' | 'it' | 'es' | 'id' | 'de')
  }
}

export default async function SEOAuditPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <SEOAuditContent />
}