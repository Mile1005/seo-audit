import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import FeaturesPage from '@/app/features/page'

export const metadata: Metadata = {
  title: 'SEO Features - AI SEO Turbo',
}

type Props = { params: { locale: string } }

export default function LocalizedFeaturesPage({ params }: Props) {
  const { locale } = params
  setRequestLocale(locale)
  return <FeaturesPage />
}
