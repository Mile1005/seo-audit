import { generateSEOMeta } from "@/lib/seo";
import { type Locale } from "@/i18n";
import InvoicesContent from "./invoices-content";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    description:
      "Access and download your billing history, view past invoices, and manage your payment records with AI SEO Turbo.",
    keywords: [
      "invoices",
      "billing history",
      "payment records",
      "download invoices",
      "billing management",
    ],
    path: "help/billing/invoices",
    locale: params.locale as Locale,
  });
}

export default function Page() {
  return <InvoicesContent />;
}
