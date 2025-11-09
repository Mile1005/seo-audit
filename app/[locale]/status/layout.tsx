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
    ...pageSEO.status,
    locale: locale as Locale,
    path: 'status'
  })
}

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}