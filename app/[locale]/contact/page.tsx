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
      description: 'Get expert SEO help from certified specialists. Contact us for personalized consultation, technical support, and partnership inquiries. Join 10,000+ businesses achieving SEO success.',
      keywords: ['SEO support', 'contact SEO experts', 'SEO consultation', 'technical SEO help', 'SEO partnership'],
      locale: locale as Locale,
      path: 'contact'
    }),
    alternates: generateAlternates('/contact')
  }
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ContactPage />
}
