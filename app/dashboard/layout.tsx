import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import DashboardLayoutClient from "./dashboard-layout-client";

// The /dashboard route is NOT under [locale], so we need to provide
// NextIntlClientProvider manually for useTranslations to work.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Load English messages as the default for non-localized dashboard
  const messages = await getMessages({ locale: "en" });

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </NextIntlClientProvider>
  );
}
