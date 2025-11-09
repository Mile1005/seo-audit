import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  return generateSEOMeta({
    ...pageSEO['blog/local-seo-strategies-that-work'],
    locale: locale as Locale,
    path: '/blog/local-seo-strategies-that-work',
  });
}

export default async function AppBlogLocalSeoStrategiesThatWorkLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return children
}
