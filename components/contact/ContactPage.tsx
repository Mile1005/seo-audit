import { Metadata } from "next";
import { generateSEOMeta, pageSEO } from "@/lib/seo";
import { MainLayout } from "../../components/layout/main-layout";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = generateSEOMeta(pageSEO.contact);

export default async function ContactPage() {
  const t = await getTranslations("contact");
  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                {t("hero.titlePrefix")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  {t("hero.titleHighlight")}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Why Contact Us Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t("services.title")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t("services.subtitle")}
              </p>
            </div>

            {/* Service Types Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all duration-200">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t("services.cards.technical.title")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("services.cards.technical.desc")}
                </p>
              </div>

              <div className="text-center p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all duration-200">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t("services.cards.strategy.title")}
                </h3>
                <p className="text-muted-foreground text-sm">{t("services.cards.strategy.desc")}</p>
              </div>

              <div className="text-center p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all duration-200">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t("services.cards.training.title")}
                </h3>
                <p className="text-muted-foreground text-sm">{t("services.cards.training.desc")}</p>
              </div>

              <div className="text-center p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all duration-200">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7 text-orange-600 dark:text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t("services.cards.partnerships.title")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("services.cards.partnerships.desc")}
                </p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">{t("why.title")}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t("why.subtitle")}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-5 h-5 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {t("why.items.certified.title")}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {t("why.items.certified.desc")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-5 h-5 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {t("why.items.fast.title")}
                      </h3>
                      <p className="text-muted-foreground text-sm">{t("why.items.fast.desc")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-5 h-5 text-purple-600 dark:text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {t("why.items.steps.title")}
                      </h3>
                      <p className="text-muted-foreground text-sm">{t("why.items.steps.desc")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-5 h-5 text-orange-600 dark:text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {t("why.items.results.title")}
                      </h3>
                      <p className="text-muted-foreground text-sm">{t("why.items.results.desc")}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                    {t("why.guarantee.title")}
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        24h
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t("why.guarantee.general")}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                        4h
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t("why.guarantee.urgent")}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                        100%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t("why.guarantee.satisfaction")}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    {t("why.guarantee.note")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="bg-background border rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6">{t("form.title")}</h2>

                <form action="/api/contact" method="POST" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t("form.nameLabel")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={t("form.namePlaceholder")}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t("form.emailLabel")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={t("form.emailPlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t("form.companyLabel")}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t("form.companyPlaceholder")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t("form.messageLabel")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t("form.messagePlaceholder")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span>{t("form.submit")}</span>
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">{t("info.title")}</h2>
                  <p className="text-muted-foreground text-lg">{t("info.subtitle")}</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t("info.general.title")}</h3>
                      <a
                        href="mailto:support@aiseoturbo.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        support@aiseoturbo.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t("info.sales.title")}</h3>
                      <a
                        href="mailto:sales@aiseoturbo.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        sales@aiseoturbo.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-amber-600 dark:text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t("info.billing.title")}</h3>
                      <a
                        href="mailto:billing@aiseoturbo.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        billing@aiseoturbo.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t("info.phone.title")}</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t("info.address.title")}</h3>
                      <p className="text-muted-foreground">
                        123 SEO Street, Digital City, DC 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t("info.hours.title")}</h3>
                      <p className="text-muted-foreground">{t("info.hours.value")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
