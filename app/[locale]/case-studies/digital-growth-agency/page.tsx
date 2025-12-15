import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { StructuredData, generateCaseStudySchema } from "@/components/seo/StructuredData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  Award,
  BarChart3,
  Zap,
  Globe,
  ArrowLeft,
  Share2,
  Download,
  ExternalLink,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { generateSEOMeta, pageSEO } from "@/lib/seo";
import { type Locale } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMeta({
    ...pageSEO["case-studies/digital-growth-agency"],
    locale: locale as Locale,
    path: "case-studies/digital-growth-agency",
  });
}

const iconMap = {
  TrendingUp,
  Target,
  Users,
  Zap,
  BarChart3,
  Globe,
};

export default async function DigitalGrowthAgencyCaseStudy({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "caseStudies.digitalGrowthAgency",
  });
  const tBreadcrumbs = await getTranslations({
    locale: params.locale,
    namespace: "caseStudies.breadcrumbs",
  });

  const caseStudySchema = generateCaseStudySchema({
    title: t("title"),
    description: t("subtitle"),
    datePublished: "2024-10-14T10:00:00+00:00",
    dateModified: "2025-10-17T10:00:00+00:00",
    url: "https://www.aiseoturbo.com/case-studies/digital-growth-agency",
    companyName: t("name"),
    industry: t("industry"),
    reviewRating: 5,
    reviewAuthor: t("testimonial.author"),
    reviewText: t("testimonial.quote"),
  });

  return (
    <MainLayout>
      <StructuredData data={caseStudySchema} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <Breadcrumbs
              items={[
                {
                  name: tBreadcrumbs("caseStudies"),
                  url: "https://www.aiseoturbo.com/case-studies",
                },
                {
                  name: t("name"),
                  url: "https://www.aiseoturbo.com/case-studies/digital-growth-agency",
                },
              ]}
              darkMode={true}
              className="mb-8"
            />

            {/* Hero Content */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-6">
                <Award className="w-10 h-10 text-green-400" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  {t("name")}
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  {t("title")}
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">{t("subtitle")}</p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {(
                  [
                    "organicTraffic",
                    "keywordRankings",
                    "clientRetention",
                    "timeEfficiency",
                  ] as const
                ).map((key) => {
                  const Icon = iconMap[t(`results.${key}.icon`) as keyof typeof iconMap];
                  return (
                    <div
                      key={key}
                      className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                    >
                      <Icon className="w-8 h-8 text-green-400 mx-auto mb-2" aria-hidden="true" />
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        {t(`results.${key}.value`)}
                      </div>
                      <div className="text-sm text-gray-400">{t(`results.${key}.metric`)}</div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/features/seo-audit">
                  <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 border border-green-500/20">
                    <Target className="w-5 h-5 mr-2" aria-hidden="true" />
                    {t("heroButtons.freeAudit")}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                >
                  <Share2 className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t("heroButtons.shareStory")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">{t("challengeTitle")}</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">{t("challengeDescription")}</p>
                <ul className="space-y-3" role="list">
                  {([0, 1, 2, 3, 4] as const).map((index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"
                        aria-hidden="true"
                      ></div>
                      <span className="text-gray-300">{t(`challengePoints.${index}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400 mb-2">
                    {t("challengeMetrics.hoursPerClient.value")}
                  </div>
                  <div className="text-gray-400 mb-4">
                    {t("challengeMetrics.hoursPerClient.label")}
                  </div>
                  <div className="text-4xl font-bold text-red-400 mb-2">
                    {t("challengeMetrics.churnRate.value")}
                  </div>
                  <div className="text-gray-400">{t("challengeMetrics.churnRate.label")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">{t("solutionTitle")}</h2>
            <p className="text-xl text-gray-400 leading-relaxed">{t("solutionDescription")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(
              [
                "aiAudit",
                "competitorAnalysis",
                "contentOptimization",
                "workflowAutomation",
              ] as const
            ).map((key) => {
              const Icon = iconMap[t(`solutionSteps.${key}.icon`) as keyof typeof iconMap];
              return (
                <div
                  key={key}
                  className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {t(`solutionSteps.${key}.title`)}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {t(`solutionSteps.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">{t("timelineTitle")}</h2>
              <p className="text-xl text-gray-400">{t("timelineSubtitle")}</p>
            </div>

            <div className="space-y-8">
              {([0, 1, 2] as const).map((index) => (
                <div key={index} className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {t(`timeline.${index}.month`).split("-")[0]}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {t(`timeline.${index}.title`)}
                    </h3>
                    <p className="text-gray-400 mb-4">{t(`timeline.${index}.description`)}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {([0, 1, 2] as const).map((resultIndex) => (
                        <div key={resultIndex} className="flex items-center gap-2">
                          <CheckCircle
                            className="w-5 h-5 text-green-400 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span className="text-gray-300 text-sm">
                            {t(`timeline.${index}.results.${resultIndex}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <div className="text-center mb-8">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" aria-hidden="true" />
                <blockquote className="text-2xl text-white font-medium mb-6 leading-relaxed">
                  "{t("testimonial.quote")}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <span className="text-blue-400 font-bold">SC</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">{t("testimonial.author")}</div>
                    <div className="text-gray-400">{t("testimonial.role")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Results Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">
                {t("technicalAchievementsTitle")}
              </h2>
              <p className="text-xl text-gray-400">{t("technicalAchievementsSubtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">{t("clientPortfolio.title")}</h3>
                <ul className="space-y-3">
                  {([0, 1, 2] as const).map((index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-green-400 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-gray-300">{t(`clientPortfolio.items.${index}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">
                  {t("operationalEfficiency.title")}
                </h3>
                <ul className="space-y-3">
                  {([0, 1, 2] as const).map((index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-green-400 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-gray-300">
                        {t(`operationalEfficiency.items.${index}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-8 border border-green-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">{t("roiTitle")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(["overallRoi", "revenueIncrease", "paybackPeriod"] as const).map((key) => (
                  <div key={key} className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {t(`roiMetrics.${key}.value`)}
                    </div>
                    <div className="text-gray-400">{t(`roiMetrics.${key}.label`)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">{t("relatedCaseStudiesTitle")}</h2>
            <p className="text-gray-400 mb-12">{t("relatedCaseStudiesSubtitle")}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/case-studies/techflow-solutions" className="group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {t("relatedCaseStudies.techflow.name")}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {t("relatedCaseStudies.techflow.category")}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {t("relatedCaseStudies.techflow.description")}
                  </p>
                  <div className="flex items-center text-blue-400 text-sm font-medium">
                    {t("relatedCaseStudies.techflow.cta")}
                    <ArrowRight
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>

              <Link href="/case-studies/stylecraft-boutique" className="group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-green-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                        {t("relatedCaseStudies.stylecraft.name")}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {t("relatedCaseStudies.stylecraft.category")}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {t("relatedCaseStudies.stylecraft.description")}
                  </p>
                  <div className="flex items-center text-green-400 text-sm font-medium">
                    {t("relatedCaseStudies.stylecraft.cta")}
                    <ArrowRight
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-6">
              <TrendingUp className="w-8 h-8 text-blue-400" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{t("ctaTitle")}</h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">{t("ctaDescription")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/features/seo-audit">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 border border-blue-500/20">
                  <Target className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t("ctaButtons.freeAudit")}
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                >
                  <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t("ctaButtons.talkToTeam")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
