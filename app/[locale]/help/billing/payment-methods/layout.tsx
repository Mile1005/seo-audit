import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Methods Guide - Add & Manage Cards | AI SEO Turbo",
  description:
    "Manage your payment methods for AI SEO Turbo subscriptions. Learn how to add credit cards, update billing information, and secure payment processing.",
  keywords: [
    "payment methods",
    "credit cards",
    "billing information",
    "payment security",
    "card management",
    "subscription payments",
  ],
  alternates: {
    canonical: "https://www.aiseoturbo.com/help/billing/payment-methods",
  },
  openGraph: {
    images: ["/logo.png"],
    url: "https://www.aiseoturbo.com/help/billing/payment-methods",
    siteName: "AI SEO Turbo",
    title: "Payment Methods Guide - Add & Manage Cards | AI SEO Turbo",
    description:
      "Manage your payment methods for AI SEO Turbo subscriptions. Learn how to add credit cards, update billing information, and secure payment processing.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment Methods Guide - Add & Manage Cards | AI SEO Turbo",
    description:
      "Manage your payment methods for AI SEO Turbo subscriptions. Learn how to add credit cards, update billing information, and secure payment processing.",
  },
};

export default function PaymentMethodsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
