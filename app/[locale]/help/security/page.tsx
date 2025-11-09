import SecurityOverviewPage from '@/app/help/security/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    ...pageSEO.help,
    locale: locale as Locale,
    path: 'help/security',
    title: 'Security & Privacy Guide | AI SEO Turbo Help',
    description: 'Learn about our security measures, privacy policies, data protection practices, and how we keep your information safe and compliant.'
  })
}

export default function Page() {
  return <SecurityOverviewPage />
}