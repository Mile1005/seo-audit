import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generateSEOMeta } from "@/lib/seo";
import { generateAlternates } from "@/lib/metadata-utils";
import { type Locale } from "@/i18n";
import CompetitorAnalysisContent from "./CompetitorAnalysisContent";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "help.categories.seoTools.articles.competitorGuide",
  });

  return {
    ...generateSEOMeta({
      title: t("header.title"),
      description: t("header.description"),
      locale: locale as Locale,
      path: "help/seo-tools/competitor-analysis",
    }),
    alternates: generateAlternates("/help/seo-tools/competitor-analysis", locale as Locale),
  };
}

export default function CompetitorAnalysisPage() {
  return <CompetitorAnalysisContent />;
}
