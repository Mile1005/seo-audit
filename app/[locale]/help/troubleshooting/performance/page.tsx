import { generateSEOMeta } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'
import PerformanceContent from './PerformanceContent'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params

  return generateSEOMeta({
    title: 'Performance Issues Troubleshooting - AISEOTurbo Help',
    description: 'Complete troubleshooting guide for fixing performance issues in AISEOTurbo. Solutions for slow loading, lag, and responsiveness problems.',
    path: '/help/troubleshooting/performance',
    locale: locale as 'en' | 'fr' | 'it' | 'es' | 'id' | 'de',
  })
}

export default async function PerformancePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <PerformanceContent />
}
