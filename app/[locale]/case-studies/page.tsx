import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import CaseStudiesPage from '@/app/case-studies/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

// SEO metadata for the case studies page with hreflang support
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    ...pageSEO['case-studies'],
    locale: locale as Locale,
    path: 'case-studies'
  })
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedCaseStudiesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CaseStudiesPage />
}
