import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import TroubleshootingTranslatedPage from "./page-translated";
import { generateSEOMeta, pageSEO } from "@/lib/seo";
import { type Locale } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMeta({
    description:
      "Find solutions to common issues, error messages, and technical problems you might encounter while using AI SEO Turbo.",
    keywords: [
      "troubleshooting",
      "error fixes",
      "technical support",
      "common issues",
      "SEO tool problems",
    ],
    locale: locale as Locale,
    path: "help/troubleshooting",
  });
}

type Props = { params: Promise<{ locale: string }> };

export default async function LocalizedTroubleshootingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TroubleshootingTranslatedPage />;
}
