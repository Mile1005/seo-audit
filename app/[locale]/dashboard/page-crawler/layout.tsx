import { Metadata } from "next";
import { generateSEOMeta, pageSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEOMeta(pageSEO["dashboard/page-crawler"]);

export default function PageCrawlerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
