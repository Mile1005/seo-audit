import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import SEOAuditWalkthroughPage from '@/app/help/features/seo-audit/page'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/features/seo-audit',
    locale: params.locale as Locale,
  })
}

export default function LocalizedSEOAuditPage() {
  return <SEOAuditWalkthroughPage />
}