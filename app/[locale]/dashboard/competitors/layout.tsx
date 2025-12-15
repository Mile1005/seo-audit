import { Metadata } from "next";
import { generateSEOMeta, pageSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEOMeta(pageSEO["dashboard/competitors"]);

export default function CompetitorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
