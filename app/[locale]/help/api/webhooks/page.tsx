import { generateSEOMeta, pageSEO } from "@/lib/seo";
import { type Locale } from "@/i18n";
import WebhooksPage from "@/app/help/api/webhooks/page";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    description:
      "Learn how to set up and use API webhooks for real-time notifications about audit completions, keyword changes, and other events.",
    keywords: [
      "API webhooks",
      "real-time notifications",
      "webhook integration",
      "event notifications",
      "API callbacks",
    ],
    path: "help/api/webhooks",
    locale: params.locale as Locale,
  });
}

export default function Page() {
  return <WebhooksPage />;
}
