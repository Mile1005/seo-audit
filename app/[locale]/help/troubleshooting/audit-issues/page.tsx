import { generateSEOMeta } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'
import AuditIssuesContent from './AuditIssuesContent'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params

  return generateSEOMeta({
    title: 'Audit Issues Troubleshooting - AISEOTurbo Help',
    description: 'Complete troubleshooting guide for fixing SEO audit issues in AISEOTurbo. Solutions for stuck audits, timeout errors, and technical problems.',
    path: '/help/troubleshooting/audit-issues',
    locale: locale as 'en' | 'fr' | 'it' | 'es' | 'id' | 'de',
  })
}

export default async function AuditIssuesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <AuditIssuesContent />
}
