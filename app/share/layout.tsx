import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shared SEO Audit Results | AI SEO Turbo",
  description: "View shared SEO audit results and insights from AI SEO Turbo analysis.",
  keywords: ["shared SEO audit", "SEO results", "audit report"],
  robots: {
    index: false,
    follow: false,
  },
};

export default function ShareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
