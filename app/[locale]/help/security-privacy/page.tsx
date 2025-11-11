import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import SecurityPrivacyPage from '@/app/help/security-privacy/page'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    title: 'Security & Privacy Policies - Data Protection & Compliance | AI SEO Turbo',
    description: 'Learn about AI SEO Turbo\'s security measures, privacy policies, data protection practices, GDPR compliance, and how we safeguard your information.',
    keywords: ['security', 'privacy policy', 'data protection', 'GDPR compliance', 'information security'],
    path: '/help/security-privacy',
    locale: params.locale as Locale,
  })
}

export default function LocalizedSecurityPrivacyPage() {
  return <SecurityPrivacyPage />
}
