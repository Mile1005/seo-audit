import { generateSEOMeta } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import AuditIssuesContent from "./AuditIssuesContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "audit-issues" });

  return generateSEOMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/help/troubleshooting/audit-issues",
    locale: locale as "en" | "fr" | "it" | "es" | "id" | "de",
  });
}

export default async function AuditIssuesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AuditIssuesContent />;
}
