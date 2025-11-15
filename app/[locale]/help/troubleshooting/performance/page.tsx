import { generateSEOMeta } from '@/lib/seo'
import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import PerformanceContent from './PerformanceContent'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: 'performance' })

  return generateSEOMeta({
    title: t('meta.title'),
    description: t('meta.description'),
    path: '/help/troubleshooting/performance',
    locale: locale as 'en' | 'fr' | 'it' | 'es' | 'id' | 'de',
  })
}

export default async function PerformancePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <PerformanceContent />
}
