import { Metadata } from "next";
import { generateSEOMeta, pageSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEOMeta(pageSEO["dashboard/reports"]);

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
