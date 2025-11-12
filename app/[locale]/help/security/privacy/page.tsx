import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import PrivacyPage from '@/app/help/security/privacy/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    description: 'Manage your privacy settings, data collection preferences, and understand how AI SEO Turbo handles your personal information.',
    keywords: ['privacy settings', 'data management', 'personal information', 'privacy controls', 'data protection'],
    path: 'help/security/privacy',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <PrivacyPage />
}
