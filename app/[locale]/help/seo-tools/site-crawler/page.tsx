import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generateSEOMeta } from "@/lib/seo";
import { generateAlternates } from "@/lib/metadata-utils";
import { type Locale } from "@/i18n";
import { SiteCrawlerContent } from "./SiteCrawlerContent";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "help.categories.seoTools.articles.siteCrawler",
  });

  return {
    ...generateSEOMeta({
      title: t("header.title"),
      description: t("header.description"),
      locale: locale as Locale,
      path: "help/seo-tools/site-crawler",
    }),
    alternates: generateAlternates("/help/seo-tools/site-crawler", locale as Locale),
  };
}

export default function SiteCrawlerPage() {
  return <SiteCrawlerContent />;
}
