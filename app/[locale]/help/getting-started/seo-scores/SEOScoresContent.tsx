"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  User,
  CheckCircle,
  BarChart3,
  AlertTriangle,
  Target,
  TrendingUp,
  Award,
  Zap,
  Star,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SEOScoresContent() {
  const t = useTranslations("help.seo-scores");

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: t("breadcrumb.help"), url: "https://www.aiseoturbo.com/help" },
            {
              name: t("breadcrumb.gettingStarted"),
              url: "https://www.aiseoturbo.com/help/getting-started",
            },
            {
              name: t("breadcrumb.seoScores"),
              url: "https://www.aiseoturbo.com/help/getting-started/seo-scores",
            },
          ]}
        />

        {/* JSON-LD Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Understanding SEO Scores: Complete Guide to AISEOTurbo Scoring System",
              description:
                "Comprehensive guide to understanding SEO scores, metrics, and how AISEOTurbo calculates your website's search optimization performance.",
              image: "https://aiseoturbo.com/help/seo-scores-guide.jpg",
              author: {
                "@type": "Organization",
                name: "AISEOTurbo",
                url: "https://aiseoturbo.com",
              },
              publisher: {
                "@type": "Organization",
                name: "AISEOTurbo",
                logo: {
                  "@type": "ImageObject",
                  url: "https://aiseoturbo.com/logo.png",
                },
              },
              datePublished: "2025-03-01",
              dateModified: "2025-03-15",
              wordCount: 2500,
              timeRequired: "PT7M",
              articleSection: "SEO Education",
              keywords: [
                "SEO scores",
                "website optimization",
                "search rankings",
                "SEO metrics",
                "performance analysis",
              ],
              about: [
                {
                  "@type": "Thing",
                  name: "Search Engine Optimization",
                },
                {
                  "@type": "Thing",
                  name: "Website Performance",
                },
                {
                  "@type": "Thing",
                  name: "Digital Marketing",
                },
              ],
            }),
          }}
        />

        {/* Breadcrumb */}
        <section className="bg-slate-900/50 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                {t("breadcrumb.help")}
              </Link>
              <span className="text-gray-600" aria-hidden="true">
                /
              </span>
              <Link
                href="/help/getting-started"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t("breadcrumb.gettingStarted")}
              </Link>
              <span className="text-gray-600" aria-hidden="true">
                /
              </span>
              <span className="text-white">{t("breadcrumb.seoScores")}</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/help"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 group"
                aria-label="Return to Help Center"
              >
                <ArrowLeft
                  className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                  aria-hidden="true"
                />
                {t("backToHelp")}
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3"
                  aria-hidden="true"
                >
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">{t("header.category")}</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{t("header.title")}</h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>{t("header.readTime")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" aria-hidden="true" />
                  <span>{t("header.lastUpdated")}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              {/* Introduction */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Target className="w-6 h-6 text-blue-400 mt-1" aria-hidden="true" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">
                      {t("introduction.title")}
                    </h2>
                    <h3 className="text-white text-lg font-semibold mb-2">
                      {t("introduction.subtitle")}
                    </h3>
                    <p className="text-gray-300 mb-0">{t("introduction.description")}</p>
                  </div>
                </div>
              </div>

              {/* Overall Score Section */}
              <h2 className="text-2xl font-bold text-white mb-6">{t("overallScore.title")}</h2>

              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/50 rounded-xl p-6 mb-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-2xl font-bold mb-4">
                    85
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {t("overallScore.subtitle")}
                  </h3>
                  <p className="text-gray-300">{t("overallScore.description")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {t("overallScore.ranges.excellent.score")}
                    </div>
                    <div className="text-green-300 text-sm font-medium">
                      {t("overallScore.ranges.excellent.label")}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {t("overallScore.ranges.excellent.description")}
                    </div>
                  </div>
                  <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {t("overallScore.ranges.good.score")}
                    </div>
                    <div className="text-blue-300 text-sm font-medium">
                      {t("overallScore.ranges.good.label")}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {t("overallScore.ranges.good.description")}
                    </div>
                  </div>
                  <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">
                      {t("overallScore.ranges.needsWork.score")}
                    </div>
                    <div className="text-yellow-300 text-sm font-medium">
                      {t("overallScore.ranges.needsWork.label")}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {t("overallScore.ranges.needsWork.description")}
                    </div>
                  </div>
                  <div className="bg-red-900/30 border border-red-600/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-400 mb-1">
                      {t("overallScore.ranges.critical.score")}
                    </div>
                    <div className="text-red-300 text-sm font-medium">
                      {t("overallScore.ranges.critical.label")}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {t("overallScore.ranges.critical.description")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Categories */}
              <h3 className="text-2xl font-bold text-white mb-6">{t("scoreBreakdown.title")}</h3>

              <div className="space-y-6">
                {/* Technical SEO */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-2">
                        <Zap className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {t("scoreBreakdown.categories.technical.title")}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {t("scoreBreakdown.categories.technical.description")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400">
                        {t("scoreBreakdown.categories.technical.score")}
                      </div>
                      <div className="text-cyan-300 text-sm">
                        {t("scoreBreakdown.categories.technical.rating")}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">
                        {t("scoreBreakdown.categories.technical.metrics.pageLoadSpeed.label")}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-green-400 text-sm font-medium">
                          {t("scoreBreakdown.categories.technical.metrics.pageLoadSpeed.score")}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">
                        {t("scoreBreakdown.categories.technical.metrics.mobileFriendliness.label")}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-green-400 text-sm font-medium">
                          {t(
                            "scoreBreakdown.categories.technical.metrics.mobileFriendliness.score"
                          )}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">
                        {t("scoreBreakdown.categories.technical.metrics.siteSecurity.label")}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-green-400 text-sm font-medium">
                          {t("scoreBreakdown.categories.technical.metrics.siteSecurity.score")}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">
                        {t("scoreBreakdown.categories.technical.metrics.crawlability.label")}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-yellow-400 text-sm font-medium">
                          {t("scoreBreakdown.categories.technical.metrics.crawlability.score")}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Quality */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-2">
                        <Star className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {t("scoreBreakdown.categories.content.title")}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {t("scoreBreakdown.categories.content.description")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-400">
                        {t("scoreBreakdown.categories.content.score")}
                      </div>
                      <div className="text-blue-300 text-sm">
                        {t("scoreBreakdown.categories.content.rating")}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">
                        {t("scoreBreakdown.categories.content.metrics.keywordOptimization.label")}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-green-400 text-sm font-medium">
                          {t("scoreBreakdown.categories.content.metrics.keywordOptimization.score")}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">
                        {t("scoreBreakdown.categories.content.metrics.contentLength.label")}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-3/5 h-full bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-yellow-400 text-sm font-medium">
                          {t("scoreBreakdown.categories.content.metrics.contentLength.score")}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">
                        {t("scoreBreakdown.categories.content.metrics.readabilityScore.label")}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-blue-400 text-sm font-medium">
                          {t("scoreBreakdown.categories.content.metrics.readabilityScore.score")}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">
                        {t("scoreBreakdown.categories.content.metrics.contentFreshness.label")}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-blue-400 text-sm font-medium">
                          {t("scoreBreakdown.categories.content.metrics.contentFreshness.score")}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Experience */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-2">
                        <Award className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {t("scoreBreakdown.categories.userExperience.title")}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {t("scoreBreakdown.categories.userExperience.description")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">
                        {t("scoreBreakdown.categories.userExperience.score")}
                      </div>
                      <div className="text-green-300 text-sm">
                        {t("scoreBreakdown.categories.userExperience.rating")}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">
                        {t("scoreBreakdown.categories.userExperience.metrics.lcp.label")}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-5/6 h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-green-400 text-sm font-medium">
                          {t("scoreBreakdown.categories.userExperience.metrics.lcp.score")}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">
                        {t("scoreBreakdown.categories.userExperience.metrics.fid.label")}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-green-400 text-sm font-medium">
                          {t("scoreBreakdown.categories.userExperience.metrics.fid.score")}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-gray-300">
                        {t("scoreBreakdown.categories.userExperience.metrics.cls.label")}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-blue-400 text-sm font-medium">
                          {t("scoreBreakdown.categories.userExperience.metrics.cls.score")}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* How Scores Are Calculated */}
              <h3 className="text-2xl font-bold text-white mt-12 mb-6">
                {t("calculationMethodology.title")}
              </h3>

              <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <Info className="w-6 h-6 text-blue-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-blue-400 text-lg font-semibold mb-2">
                      {t("calculationMethodology.subtitle")}
                    </h3>
                    <p className="text-gray-300">{t("calculationMethodology.description")}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" aria-hidden="true" />
                      <div>
                        <h4 className="text-white font-medium">
                          {t("calculationMethodology.factors.0.title")}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {t("calculationMethodology.factors.0.description")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" aria-hidden="true" />
                      <div>
                        <h4 className="text-white font-medium">
                          {t("calculationMethodology.factors.1.title")}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {t("calculationMethodology.factors.1.description")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" aria-hidden="true" />
                      <div>
                        <h4 className="text-white font-medium">
                          {t("calculationMethodology.factors.2.title")}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {t("calculationMethodology.factors.2.description")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" aria-hidden="true" />
                      <div>
                        <h4 className="text-white font-medium">
                          {t("calculationMethodology.factors.3.title")}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {t("calculationMethodology.factors.3.description")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Improving Your Scores */}
              <h3 className="text-2xl font-bold text-white mb-6">{t("improvingScores.title")}</h3>

              <div className="space-y-6">
                <div className="bg-green-900/20 border border-green-600/30 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <TrendingUp className="w-6 h-6 text-green-400 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="text-green-400 text-lg font-semibold mb-2">
                        {t("improvingScores.quickWins.title")}
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• {t("improvingScores.quickWins.items.0")}</li>
                        <li>• {t("improvingScores.quickWins.items.1")}</li>
                        <li>• {t("improvingScores.quickWins.items.2")}</li>
                        <li>• {t("improvingScores.quickWins.items.3")}</li>
                        <li>• {t("improvingScores.quickWins.items.4")}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Target className="w-6 h-6 text-blue-400 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="text-blue-400 text-lg font-semibold mb-2">
                        {t("improvingScores.mediumTerm.title")}
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• {t("improvingScores.mediumTerm.items.0")}</li>
                        <li>• {t("improvingScores.mediumTerm.items.1")}</li>
                        <li>• {t("improvingScores.mediumTerm.items.2")}</li>
                        <li>• {t("improvingScores.mediumTerm.items.3")}</li>
                        <li>• {t("improvingScores.mediumTerm.items.4")}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/20 border border-purple-600/30 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Award className="w-6 h-6 text-purple-400 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="text-purple-400 text-lg font-semibold mb-2">
                        {t("improvingScores.longTerm.title")}
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• {t("improvingScores.longTerm.items.0")}</li>
                        <li>• {t("improvingScores.longTerm.items.1")}</li>
                        <li>• {t("improvingScores.longTerm.items.2")}</li>
                        <li>• {t("improvingScores.longTerm.items.3")}</li>
                        <li>• {t("improvingScores.longTerm.items.4")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Troubleshooting */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6 mt-12">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-yellow-400 text-lg font-semibold mb-2">
                      {t("troubleshooting.title")}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white font-medium">
                          {t("troubleshooting.sections.0.title")}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {t("troubleshooting.sections.0.description")}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">
                          {t("troubleshooting.sections.1.title")}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {t("troubleshooting.sections.1.description")}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">
                          {t("troubleshooting.sections.2.title")}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {t("troubleshooting.sections.2.description")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <h3 className="text-2xl font-bold text-white mt-12 mb-6">{t("nextSteps.title")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href={t("nextSteps.links.0.href")}
                  className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                  aria-label="Learn about complete SEO audit walkthrough"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {t("nextSteps.links.0.title")}
                  </h3>
                  <p className="text-gray-400 text-sm">{t("nextSteps.links.0.description")}</p>
                </Link>

                <Link
                  href={t("nextSteps.links.1.href")}
                  className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                  aria-label="Follow the quick start guide"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {t("nextSteps.links.1.title")}
                  </h3>
                  <p className="text-gray-400 text-sm">{t("nextSteps.links.1.description")}</p>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
