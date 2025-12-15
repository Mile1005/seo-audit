import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import PricingPage from "@/app/pricing/page";
import { generateSEOMeta } from "@/lib/seo";
import { type Locale } from "@/i18n";
import { generateAlternates } from "@/lib/metadata-utils";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta");

  return {
    ...generateSEOMeta({
      description: t("pricing.description"),
      keywords: t.raw("pricing.keywords"),
      locale: locale as Locale,
      path: "pricing",
    }),
    alternates: generateAlternates("/pricing", locale as Locale),
  };
}

type Props = { params: Promise<{ locale: string }> };

export default async function LocalizedPricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PricingPage />;
}
