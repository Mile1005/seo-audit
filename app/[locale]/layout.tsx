import { notFound } from 'next/navigation';
import { locales, type Locale } from '../../i18n';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale: Locale) => ({ locale }));
}

// Locale segment layout - wraps with NextIntlClientProvider only
// The root layout (app/layout.tsx) provides HTML structure and other providers
export default async function LocaleLayout({ children, params }: Props) {
  // Await params (Next.js 15+ requirement)
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load messages for this locale
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
