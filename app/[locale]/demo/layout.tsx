import { Metadata } from "next";
import { generateSEOMeta, pageSEO } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  setRequestLocale(locale);

  return generateSEOMeta({
    ...pageSEO.demo,
    locale,
    path: "demo",
  });
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
