import { generateSEOMeta } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import DashboardSetupContent from "./DashboardSetupContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "help.dashboard-setup" });

  return generateSEOMeta({
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/help/getting-started/dashboard-setup",
    locale: locale as "en" | "fr" | "it" | "es" | "id" | "de",
  });
}

export default async function DashboardSetupPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DashboardSetupContent />;
}
