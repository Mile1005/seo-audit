import { generateSEOMeta } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import SyncIssuesContent from "./SyncIssuesContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "help.categories.troubleshooting.articles.syncIssues",
  });

  return generateSEOMeta({
    title: `${t("title")} - AISEOTurbo Help`,
    description: t("description"),
    path: "/help/troubleshooting/sync-issues",
    locale: locale as "en" | "fr" | "it" | "es" | "id" | "de",
  });
}

export default async function SyncIssuesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SyncIssuesContent />;
}
