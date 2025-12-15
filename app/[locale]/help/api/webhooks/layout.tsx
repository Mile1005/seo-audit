import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webhooks Setup - Real-time SEO Alerts | AI SEO Turbo",
  description:
    "Set up webhooks for real-time SEO notifications and workflows. Learn to configure webhook endpoints for audit completions, ranking changes, and alerts.",
  keywords: [
    "webhooks",
    "API integration",
    "real-time notifications",
    "SEO automation",
    "webhook endpoints",
    "audit notifications",
    "ranking alerts",
  ],
  alternates: {
    canonical: "https://www.aiseoturbo.com/help/api/webhooks",
  },
  openGraph: {
    images: ["/logo.png"],
    url: "https://www.aiseoturbo.com/help/api/webhooks",
    siteName: "AI SEO Turbo",
    title: "Webhooks Integration Guide - Real-time SEO Notifications | AI SEO Turbo",
    description:
      "Set up webhooks for real-time SEO notifications and workflows. Learn to configure webhook endpoints for audit completions, ranking changes, and alerts.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webhooks Integration Guide - Real-time SEO Notifications | AI SEO Turbo",
    description:
      "Set up webhooks for real-time SEO notifications and workflows. Learn to configure webhook endpoints for audit completions, ranking changes, and alerts.",
  },
};

export default function WebhooksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
