import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import TroubleshootingPage from '@/app/help/troubleshooting/page'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    title: 'Troubleshooting Guide - Common Issues & Solutions | AI SEO Turbo',
    description: 'Having trouble with AI SEO Turbo? Find solutions to common issues, error messages, and technical problems in our troubleshooting guide.',
    keywords: ['troubleshooting', 'error fixes', 'technical support', 'common issues', 'SEO tool problems'],
    path: 'help/troubleshooting',
    locale: params.locale as Locale,
  })
}

export default function LocalizedTroubleshootingPage() {
  return <TroubleshootingPage />
}