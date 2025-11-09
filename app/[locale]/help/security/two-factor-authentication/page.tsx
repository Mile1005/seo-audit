import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import TwoFactorAuthPage from '@/app/help/security/two-factor-authentication/page'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/security/two-factor-authentication',
    locale: params.locale as Locale,
  })
}

export default function LocalizedTwoFactorAuthPage() {
  return <TwoFactorAuthPage />
}