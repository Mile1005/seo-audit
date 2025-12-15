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
  const privacyMeta = t.raw("privacy");

  return generateSEOMeta({
    title: privacyMeta.title,
    description: privacyMeta.description,
    keywords: privacyMeta.keywords,
    locale: locale as Locale,
    path: "privacy",
  });
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
