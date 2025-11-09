import APIOverviewPage from '@/app/help/api/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    ...pageSEO.help,
    locale: locale as Locale,
    path: 'help/api',
    title: 'API Integration Guide | AI SEO Turbo Help',
    description: 'Integrate AI SEO Turbo\'s powerful SEO tools into your applications with our comprehensive REST API. Automate audits, access real-time data, and build custom workflows.'
  })
}

export default function Page() {
  return <APIOverviewPage />
}