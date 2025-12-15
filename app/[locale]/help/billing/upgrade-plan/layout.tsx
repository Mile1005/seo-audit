import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upgrade to Pro Plan - Subscription Guide | AI SEO Turbo",
  description:
    "Learn how to upgrade your AI SEO Turbo subscription to Pro plan. Unlock advanced features, unlimited audits, priority support, and premium SEO tools.",
  keywords: [
    "upgrade plan",
    "pro subscription",
    "premium features",
    "unlimited audits",
    "priority support",
    "SEO tools upgrade",
  ],
  alternates: {
    canonical: "https://www.aiseoturbo.com/help/billing/upgrade-plan",
  },
  openGraph: {
    images: ["/logo.png"],
    url: "https://www.aiseoturbo.com/help/billing/upgrade-plan",
    siteName: "AI SEO Turbo",
    title: "Upgrade Subscription Guide - Pro Plan Benefits | AI SEO Turbo",
    description:
      "Learn how to upgrade your AI SEO Turbo subscription to Pro plan. Unlock advanced features, unlimited audits, priority support, and premium SEO tools.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upgrade Subscription Guide - Pro Plan Benefits | AI SEO Turbo",
    description:
      "Learn how to upgrade your AI SEO Turbo subscription to Pro plan. Unlock advanced features, unlimited audits, priority support, and premium SEO tools.",
  },
};

export default function UpgradePlanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
