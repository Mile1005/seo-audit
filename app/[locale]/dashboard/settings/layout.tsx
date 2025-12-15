import { Metadata } from "next";
import { generateSEOMeta, pageSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEOMeta(pageSEO["dashboard/settings"]);

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
