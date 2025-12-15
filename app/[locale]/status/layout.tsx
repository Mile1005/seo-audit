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
  const statusMeta = t.raw("status");

  return generateSEOMeta({
    title: statusMeta.title,
    description: statusMeta.description,
    keywords: statusMeta.keywords,
    locale: locale as Locale,
    path: "status",
  });
}

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return children;
}
