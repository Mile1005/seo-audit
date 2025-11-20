import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import ContactPage from '@/components/contact/ContactPage'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import { generateAlternates } from '@/lib/metadata-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    ...generateSEOMeta({
      title: 'Contact AI SEO Turbo - Expert SEO Support & Consultation',
      description: 'Contact AI SEO Turbo. Get 24/7 support for your account, SEO tools, or technical questions. We are here to help you grow. Reach out now!',
      keywords: ['SEO support', 'contact SEO experts', 'SEO consultation', 'technical SEO help', 'SEO partnership'],
      locale: locale as Locale,
      path: 'contact'
    }),
    alternates: generateAlternates('/contact', locale as Locale)
  }
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ContactPage />
}
