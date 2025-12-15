import { generateSEOMeta } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SEOScoresContent from "./SEOScoresContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "help.seo-scores" });

  return generateSEOMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/help/getting-started/seo-scores",
    locale: locale as "en" | "fr" | "it" | "es" | "id" | "de",
  });
}

export default async function SEOScoresPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SEOScoresContent />;
}
