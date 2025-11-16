import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import TwoFactorContent from './two-factor-content'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    description: 'Learn how to enable and configure two-factor authentication (2FA) to secure your AI SEO Turbo account with an extra layer of protection.',
    keywords: ['two-factor authentication', '2FA', 'account security', 'login protection', 'security settings'],
    path: '/help/security/two-factor-authentication',
    locale: params.locale as Locale,
  })
}

export default function LocalizedTwoFactorAuthPage() {
  return <TwoFactorContent />
}