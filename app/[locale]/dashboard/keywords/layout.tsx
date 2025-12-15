import { Metadata } from "next";
import { generateSEOMeta, pageSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEOMeta(pageSEO["dashboard/keywords"]);

export default function KeywordsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
