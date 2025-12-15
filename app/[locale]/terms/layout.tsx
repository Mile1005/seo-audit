import { Metadata } from "next";
import { generateSEOMeta } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("meta");
  const termsMeta = t.raw("terms");

  return generateSEOMeta({
    title: termsMeta.title,
    description: termsMeta.description,
    keywords: termsMeta.keywords,
    locale: locale as Locale,
    path: "terms",
  });
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
