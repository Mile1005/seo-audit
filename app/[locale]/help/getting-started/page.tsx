import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import GettingStartedPage from '@/app/help/getting-started/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

// SEO metadata for the getting started help page
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    description: 'New to AI SEO Turbo? Start here with our comprehensive getting started guide. Learn the basics, set up your account, and begin optimizing your website\'s SEO.',
    keywords: ['getting started', 'beginner guide', 'SEO tutorial', 'AI SEO Turbo basics', 'website optimization'],
    locale: locale as Locale,
    path: 'help/getting-started'
  })
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedGettingStartedPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <GettingStartedPage />
}
