import { generateSEOMeta, pageSEO } from "@/lib/seo";
import { type Locale } from "@/i18n";
import AuthenticationPage from "@/app/help/api/authentication/page";

export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    title: "API Authentication - Developer Guide | AI SEO Turbo",
    description:
      "Authenticate securely with AI SEO Turbo API. Use keys, OAuth, and best practices for data access. Integrate while protecting your info.",
    keywords: [
      "API authentication",
      "API keys",
      "developer guide",
      "SEO API",
      "authentication methods",
    ],
    path: "help/api/authentication",
    locale: params.locale as Locale,
  });
}

export default function Page() {
  return <AuthenticationPage />;
}
