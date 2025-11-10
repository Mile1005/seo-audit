import { generateSEOMeta } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'
import SyncIssuesContent from './SyncIssuesContent'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params

  return generateSEOMeta({
    title: 'Sync Issues Troubleshooting - AISEOTurbo Help',
    description: 'Complete troubleshooting guide for fixing data synchronization issues in AISEOTurbo. Solutions for sync errors, outdated data, and cross-device sync problems.',
    path: '/help/troubleshooting/sync-issues',
    locale: locale as 'en' | 'fr' | 'it' | 'es' | 'id' | 'de',
  })
}

export default async function SyncIssuesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <SyncIssuesContent />
}
