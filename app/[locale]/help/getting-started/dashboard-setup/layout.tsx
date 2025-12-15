import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Setup - Configure AI SEO Turbo | AI SEO Turbo",
  description:
    "Complete guide to setting up your AI SEO Turbo dashboard. Learn to configure projects, customize layouts, and optimize your SEO workflow.",
  keywords: [
    "dashboard setup",
    "SEO dashboard",
    "project configuration",
    "workflow setup",
    "dashboard customization",
    "SEO tools setup",
  ],
  alternates: {
    canonical: "https://www.aiseoturbo.com/help/getting-started/dashboard-setup",
  },
  openGraph: {
    images: ["/logo.png"],
    url: "https://www.aiseoturbo.com/help/getting-started/dashboard-setup",
    siteName: "AI SEO Turbo",
    title: "Dashboard Setup Guide - Configure AI SEO Turbo | AI SEO Turbo",
    description:
      "Complete guide to setting up your AI SEO Turbo dashboard. Learn to configure projects, customize layouts, and optimize your SEO workflow.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard Setup Guide - Configure AI SEO Turbo | AI SEO Turbo",
    description:
      "Complete guide to setting up your AI SEO Turbo dashboard. Learn to configure projects, customize layouts, and optimize your SEO workflow.",
  },
};

export default function DashboardSetupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
