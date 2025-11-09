import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import ContactPage from '@/app/contact/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    ...pageSEO.contact,
    locale: locale as Locale,
    path: 'contact'
  })
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ContactPage />
}
