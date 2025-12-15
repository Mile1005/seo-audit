import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { generateSEOMeta, pageSEO } from "@/lib/seo";
import { type Locale } from "@/i18n";
import { generateAlternates } from "@/lib/metadata-utils";
import {
  Search,
  MessageCircle,
  BookOpen,
  CreditCard,
  Settings,
  Users,
  Shield,
  BarChart,
  Bot,
  ArrowRight,
  HelpCircle,
  Phone,
  Mail,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Zap,
  Globe,
  Target,
  TrendingUp,
  Database,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import {
  StructuredData,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/components/seo/StructuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...generateSEOMeta({
      title: pageSEO.help.title,
      description: pageSEO.help.description,
      keywords: pageSEO.help.keywords,
      locale: locale as Locale,
      path: "help",
    }),
    alternates: generateAlternates("/help", locale as Locale),
  };
}

export default async function HelpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "helpCenter" });

  // FAQ Schema for Help Center
  const faqSchema = generateFAQSchema([
    {
      question: "How do I run my first SEO audit?",
      answer:
        "To run your first SEO audit, sign up for a free account, connect your website, and click 'Start Audit'. Our AI will analyze your site and provide detailed recommendations within minutes.",
    },
    {
      question: "What SEO metrics should I focus on first?",
      answer:
        "Start with Core Web Vitals (LCP, FID, CLS), title tags, meta descriptions, and mobile-friendliness. These have the biggest impact on search rankings and user experience.",
    },
    {
      question: "How often should I run SEO audits?",
      answer:
        "Run comprehensive audits monthly and quick checks weekly. Major content changes or technical updates should trigger immediate audits.",
    },
    {
      question: "Can I export my SEO audit results?",
      answer:
        "Yes, all audit results can be exported as PDF reports or CSV files. Premium plans include advanced reporting and team sharing features.",
    },
    {
      question: "What makes AI SEO Turbo different from other SEO tools?",
      answer:
        "Our AI provides personalized recommendations, competitor intelligence, and automated optimization suggestions that other tools miss. We focus on actionable insights over just data.",
    },
  ]);

  const helpCategories = [
    {
      key: "gettingStarted",
      icon: Lightbulb,
      color: "from-green-500 to-emerald-500",
      articles: [
        { key: "firstAudit", href: "/help/getting-started/first-audit" },
        { key: "dashboardSetup", href: "/help/getting-started/dashboard-setup" },
        { key: "seoScores", href: "/help/getting-started/seo-scores" },
        { key: "quickStart", href: "/help/getting-started/quick-start" },
      ],
    },
    {
      key: "seoTools",
      icon: BarChart,
      color: "from-blue-500 to-cyan-500",
      articles: [
        { key: "auditWalkthrough", href: "/help/seo-tools/seo-audit" },
        { key: "competitorGuide", href: "/help/seo-tools/competitor-analysis" },
        { key: "crawlerConfig", href: "/help/seo-tools/site-crawler" },
        { key: "aiAssistant", href: "/help/seo-tools/ai-assistant" },
      ],
    },
    {
      key: "billing",
      icon: CreditCard,
      color: "from-purple-500 to-violet-500",
      articles: [
        { key: "upgrade", href: "/help/billing/upgrade-plan" },
        { key: "paymentMethods", href: "/help/billing/payment-methods" },
        { key: "invoices", href: "/help/billing/invoices" },
        { key: "cancellation", href: "/help/billing/cancellation" },
      ],
    },
    {
      key: "api",
      icon: Database,
      color: "from-orange-500 to-red-500",
      articles: [
        { key: "authentication", href: "/help/api/authentication" },
        { key: "webhooks", href: "/help/api/webhooks" },
        { key: "apiIntegrations", href: "/help/api/api-integrations" },
      ],
    },
    {
      key: "troubleshooting",
      icon: Settings,
      color: "from-yellow-500 to-amber-500",
      articles: [
        { key: "loginIssues", href: "/help/troubleshooting/login-issues" },
        { key: "syncIssues", href: "/help/troubleshooting/sync-issues" },
        { key: "performance", href: "/help/troubleshooting/performance" },
        { key: "auditIssues", href: "/help/troubleshooting/audit-issues" },
      ],
    },
    {
      key: "security",
      icon: Shield,
      color: "from-indigo-500 to-purple-500",
      articles: [
        { key: "twoFactor", href: "/help/security/two-factor-authentication" },
        { key: "privacy", href: "/help/security/privacy" },
        { key: "gdpr", href: "/help/security/gdpr" },
        { key: "bestPractices", href: "/help/security/best-practices" },
      ],
    },
  ];

  const quickHelp = [
    {
      key: "firstAudit",
      icon: Target,
      type: "popular",
    },
    {
      key: "freePlan",
      icon: Star,
      type: "billing",
    },
    {
      key: "aiAccuracy",
      icon: Bot,
      type: "features",
    },
    {
      key: "exportReports",
      icon: TrendingUp,
      type: "features",
    },
    {
      key: "auditFrequency",
      icon: Clock,
      type: "popular",
    },
    {
      key: "customerSupport",
      icon: MessageCircle,
      type: "support",
    },
  ];

  const contactOptions = [
    {
      key: "liveChat",
      icon: MessageCircle,
      color: "from-green-500 to-emerald-500",
      href: "#chat",
    },
    {
      key: "email",
      icon: Mail,
      color: "from-blue-500 to-cyan-500",
      href: "mailto:support@aiseoturbo.com",
    },
    {
      key: "phone",
      icon: Phone,
      color: "from-purple-500 to-violet-500",
      href: "tel:+1-555-0123",
    },
  ];

  return (
    <MainLayout>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen bg-slate-950">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumbs */}
            <div className="mb-8">
              <Breadcrumbs
                items={[{ name: "Help Center", url: "https://www.aiseoturbo.com/help" }]}
                darkMode={true}
              />
            </div>

            <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
              <HelpCircle className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                {t("hero.title")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {t("hero.titleHighlight")}
                </span>
                {t("hero.titleEnd")}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                {t("hero.subtitle")}
              </p>

              <div className="mb-8">
                <p className="text-gray-300 mb-4">
                  Need help getting started? Check out our{" "}
                  <Link href="/features" className="text-blue-400 hover:text-blue-300 underline">
                    features
                  </Link>{" "}
                  or{" "}
                  <Link href="/pricing" className="text-blue-400 hover:text-blue-300 underline">
                    pricing plans
                  </Link>
                  .
                </p>
              </div>

              {/* Search Bar - Static for SEO */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <div className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-400 cursor-not-allowed">
                  {t("hero.searchPlaceholder")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Help Section */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t("quickAnswers.title")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {t("quickAnswers.titleHighlight")}
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">{t("quickAnswers.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {quickHelp.map((item: any, index: number) => (
                <div
                  key={index}
                  className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <item.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {t(`questions.${item.key}.q`)}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {t(`questions.${item.key}.a`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t("categories.title")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {t("categories.titleHighlight")}
                </span>
              </h2>
              <p className="text-xl text-gray-400">{t("categories.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {helpCategories.map((category, index) => (
                <div
                  key={index}
                  className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="mb-6">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {t(`categories.${category.key}.title`)}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {t(`categories.${category.key}.description`)}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {category.articles.slice(0, 4).map((article, articleIndex) => (
                      <Link
                        key={articleIndex}
                        href={article.href}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 hover:bg-slate-900 transition-colors group/article"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-300 group-hover/article:text-white transition-colors">
                            {t(`categories.${category.key}.articles.${article.key}.title`)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {t(`categories.${category.key}.articles.${article.key}.time`)}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-500 group-hover/article:text-blue-400 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={`/help/${category.key.replace(/([A-Z])/g, "-$1").toLowerCase()}`}
                    className="inline-flex items-center gap-2 mt-6 text-blue-400 hover:text-blue-300 font-medium group/link"
                  >
                    {t("categories.viewAll")}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t("contact.title")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {t("contact.titleHighlight")}
                </span>
                {t("contact.titleEnd")}
              </h2>
              <p className="text-xl text-gray-400">{t("contact.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactOptions.map((option, index) => (
                <div
                  key={index}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <Link
                    href={option.href}
                    className="block bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 h-full"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${option.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <option.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {t(`contact.${option.key}.title`)}
                    </h3>
                    <p className="text-gray-400 mb-4">{t(`contact.${option.key}.description`)}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {t(`contact.${option.key}.availability`)}
                      </span>
                      <span className="text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                        {t(`contact.${option.key}.action`)}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Status & Community */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* System Status */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{t("status.title")}</h3>
                    <p className="text-gray-400">{t("status.subtitle")}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "auditEngine", uptime: "99.9%" },
                    { key: "apiServices", uptime: "99.8%" },
                    { key: "dashboard", uptime: "100%" },
                    { key: "dataProcessing", uptime: "99.7%" },
                  ].map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-gray-300">{t(`status.services.${service.key}`)}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 text-sm font-medium">
                          {t("status.operational")}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {t("status.uptime", { percent: service.uptime })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/status"
                  className="inline-flex items-center gap-2 mt-6 text-blue-400 hover:text-blue-300 font-medium group"
                >
                  {t("status.viewDetailed")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
