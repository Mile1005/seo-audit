import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice Management - Download & View Bills | AI SEO Turbo",
  description:
    "Access, download, and manage your AI SEO Turbo invoices. Learn how to view billing history, download PDF receipts, and understand invoice details.",
  keywords: [
    "invoices",
    "billing history",
    "download invoices",
    "receipts",
    "billing management",
    "invoice PDF",
    "payment history",
  ],
  alternates: {
    canonical: "https://www.aiseoturbo.com/help/billing/invoices",
  },
  openGraph: {
    images: ["/logo.png"],
    url: "https://www.aiseoturbo.com/help/billing/invoices",
    siteName: "AI SEO Turbo",
    title: "Invoice Management Guide - Download & View Bills | AI SEO Turbo",
    description:
      "Access, download, and manage your AI SEO Turbo invoices. Learn how to view billing history, download PDF receipts, and understand invoice details.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice Management Guide - Download & View Bills | AI SEO Turbo",
    description:
      "Access, download, and manage your AI SEO Turbo invoices. Learn how to view billing history, download PDF receipts, and understand invoice details.",
  },
};

export default function InvoicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
