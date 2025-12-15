import { Metadata } from "next";
import { generateSEOMeta, pageSEO } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return generateSEOMeta({
    ...pageSEO["blog/content-seo-creating-search-friendly-content"],
    locale: locale as Locale,
    path: "/blog/content-seo-creating-search-friendly-content",
  });
}

export default async function AppBlogContentSeoCreatingSearchFriendlyContentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return children;
}
