import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)

  return generateSEOMeta({
    ...pageSEO.terms,
    locale: locale as Locale,
    path: 'terms'
  })
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}