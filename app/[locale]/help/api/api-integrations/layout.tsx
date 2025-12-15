import { Metadata } from "next";

export const metadata: Metadata = {
  title: "API & Integrations Help - Connect & Automate | AI SEO Turbo",
  description:
    "Master API integrations and automation with AI SEO Turbo. Learn to connect with your tools, set up webhooks, and automate SEO workflows.",
  keywords: [
    "API integrations",
    "automation",
    "webhooks",
    "API documentation",
    "workflow automation",
    "SEO API",
    "integrations guide",
  ],
  alternates: {
    canonical: "https://www.aiseoturbo.com/help/api/api-integrations",
  },
  openGraph: {
    images: ["/logo.png"],
    url: "https://www.aiseoturbo.com/help/api/api-integrations",
    siteName: "AI SEO Turbo",
    title: "API & Integrations Help - Connect & Automate | AI SEO Turbo",
    description:
      "Master API integrations and automation with AI SEO Turbo. Learn to connect with your tools, set up webhooks, and automate SEO workflows.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "API & Integrations Help - Connect & Automate | AI SEO Turbo",
    description:
      "Master API integrations and automation with AI SEO Turbo. Learn to connect with your tools, set up webhooks, and automate SEO workflows.",
  },
};

export default function APIIntegrationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
