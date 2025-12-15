import { generateSEOMeta } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import FirstAuditContent from "./FirstAuditContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "help.first-audit" });

  return generateSEOMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/help/getting-started/first-audit",
    locale: locale as "en" | "fr" | "it" | "es" | "id" | "de",
  });
}

export default async function FirstAuditPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FirstAuditContent />;
}
