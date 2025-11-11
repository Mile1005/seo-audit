import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import SEOAuditWalkthroughPage from '@/app/help/features/seo-audit/page'

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  return generateSEOMeta({
    title: 'SEO Audit Feature Guide - Comprehensive Website Analysis | AI SEO Turbo',
    description: 'Learn how to use AI SEO Turbo\'s comprehensive SEO audit feature. Discover how to analyze your website\'s SEO performance, identify issues, and get actionable recommendations.',
    keywords: ['SEO audit', 'website analysis', 'SEO checker', 'site audit guide', 'SEO performance'],
    path: '/help/features/seo-audit',
    locale: params.locale as Locale,
  })
}

export default function LocalizedSEOAuditPage() {
  return <SEOAuditWalkthroughPage />
}