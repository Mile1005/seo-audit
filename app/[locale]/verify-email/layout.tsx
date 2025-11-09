import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    ...generateSEOMeta({
      ...pageSEO['verify-email'],
      locale: locale as Locale,
      path: '/verify-email',
    }),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function VerifyEmailLayout({
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
