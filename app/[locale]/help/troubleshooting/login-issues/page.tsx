import { generateSEOMeta } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'
import LoginIssuesContent from './LoginIssuesContent'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params

  return generateSEOMeta({
    title: 'Login Issues Troubleshooting - AISEOTurbo Help',
    description: 'Complete troubleshooting guide for login problems in AISEOTurbo. Solutions for invalid credentials, account lockouts, 2FA issues, and password reset problems.',
    path: '/help/troubleshooting/login-issues',
    locale: locale as 'en' | 'fr' | 'it' | 'es' | 'id' | 'de',
  })
}

export default async function LoginIssuesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <LoginIssuesContent />
}
