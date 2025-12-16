import { generateSEOMeta } from "@/lib/seo";
import { type Locale } from "@/i18n";
import CancellationContent from "./cancellation-content";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    description:
      "Learn about the account cancellation process, subscription termination, data retention policies, and how to properly close your AI SEO Turbo account.",
    keywords: [
      "account cancellation",
      "subscription termination",
      "cancel account",
      "data retention",
      "account closure",
    ],
    path: "help/billing/cancellation",
    locale: params.locale as Locale,
  });
}

export default function Page() {
  return <CancellationContent />;
}
