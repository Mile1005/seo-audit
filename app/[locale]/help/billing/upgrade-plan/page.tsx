import { generateSEOMeta } from '@/lib/seo'
import { type Locale } from '@/i18n'
import UpgradePlanContent from './upgrade-plan-content'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    description: 'Explore available subscription plans and learn how to upgrade your AI SEO Turbo account for more features and higher usage limits.',
    keywords: ['upgrade plan', 'subscription plans', 'pricing tiers', 'account upgrade', 'premium features'],
    path: 'help/billing/upgrade-plan',
    locale: params.locale as Locale,
  })
}

export default function LocalizedUpgradePlanPage() {
  return <UpgradePlanContent />
}