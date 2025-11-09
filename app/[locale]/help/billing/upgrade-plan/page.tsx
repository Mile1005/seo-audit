import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import UpgradePlanPage from '@/app/help/billing/upgrade-plan/page'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/billing/upgrade-plan',
    locale: params.locale as Locale,
  })
}

export default function LocalizedUpgradePlanPage() {
  return <UpgradePlanPage />
}