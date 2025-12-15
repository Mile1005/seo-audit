"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  User,
  CheckCircle,
  BarChart,
  Search,
  AlertTriangle,
  TrendingUp,
  Settings,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

// Safe translation hook with fallbacks
function useSafeTranslations(namespace: string) {
  try {
    return useTranslations(namespace);
  } catch (error) {
    // Fallback when context is not available
    return (key: string) => key;
  }
}

export default function SEOAuditContent() {
  const t = useSafeTranslations("help.categories.seoTools.articles.seoAudit");

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: t("breadcrumb.home"), url: "https://www.aiseoturbo.com" },
            { name: t("breadcrumb.help"), url: "https://www.aiseoturbo.com/help" },
            { name: t("breadcrumb.seoTools"), url: "https://www.aiseoturbo.com/help/seo-tools" },
            {
              name: t("breadcrumb.seoAudit"),
              url: "https://www.aiseoturbo.com/help/seo-tools/seo-audit",
            },
          ]}
          includeHome={false}
        />

        {/* Article Header */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/help/seo-tools"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {t("backToCategory")}
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">{t("header.category")}</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{t("header.title")}</h1>
                </div>
              </div>

              <p className="text-xl text-gray-400 mb-8">{t("header.description")}</p>

              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{t("header.author")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{t("header.lastUpdated")}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* Introduction */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Search className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">{t("intro.title")}</h2>
                    <p className="text-gray-300 mb-0">{t("intro.description")}</p>
                  </div>
                </div>
              </div>

              {/* What Gets Audited */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">{t("auditAnalyzes.title")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      🔧 {t("auditAnalyzes.technical.title")}
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• {t("auditAnalyzes.technical.pageSpeed")}</li>
                      <li>• {t("auditAnalyzes.technical.mobile")}</li>
                      <li>• {t("auditAnalyzes.technical.ssl")}</li>
                      <li>• {t("auditAnalyzes.technical.sitemap")}</li>
                      <li>• {t("auditAnalyzes.technical.structuredData")}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Understanding SEO Audits */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {t("sections.understanding.title")}
                </h2>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                  <p className="text-gray-300 mb-4">{t("sections.understanding.description")}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">
                        {t("sections.understanding.benefits.1")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">
                        {t("sections.understanding.benefits.2")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">
                        {t("sections.understanding.benefits.3")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">
                        {t("sections.understanding.benefits.4")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Categories */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {t("sections.analysis.title")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {t("sections.analysis.categories.technical.title")}
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• {t("sections.analysis.categories.technical.items.1")}</li>
                      <li>• {t("sections.analysis.categories.technical.items.2")}</li>
                      <li>• {t("sections.analysis.categories.technical.items.3")}</li>
                      <li>• {t("sections.analysis.categories.technical.items.4")}</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {t("sections.analysis.categories.content.title")}
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• {t("sections.analysis.categories.content.items.1")}</li>
                      <li>• {t("sections.analysis.categories.content.items.2")}</li>
                      <li>• {t("sections.analysis.categories.content.items.3")}</li>
                      <li>• {t("sections.analysis.categories.content.items.4")}</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {t("sections.analysis.categories.performance.title")}
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• {t("sections.analysis.categories.performance.items.1")}</li>
                      <li>• {t("sections.analysis.categories.performance.items.2")}</li>
                      <li>• {t("sections.analysis.categories.performance.items.3")}</li>
                      <li>• {t("sections.analysis.categories.performance.items.4")}</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {t("sections.analysis.categories.mobile.title")}
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• {t("sections.analysis.categories.mobile.items.1")}</li>
                      <li>• {t("sections.analysis.categories.mobile.items.2")}</li>
                      <li>• {t("sections.analysis.categories.mobile.items.3")}</li>
                      <li>• {t("sections.analysis.categories.mobile.items.4")}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How to Run */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {t("sections.running.title")}
                </h2>
                <div className="space-y-6">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t("sections.running.steps.1.title")}
                    </h3>
                    <p className="text-gray-300">{t("sections.running.steps.1.description")}</p>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t("sections.running.steps.2.title")}
                    </h3>
                    <p className="text-gray-300">{t("sections.running.steps.2.description")}</p>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t("sections.running.steps.3.title")}
                    </h3>
                    <p className="text-gray-300">{t("sections.running.steps.3.description")}</p>
                  </div>
                </div>
              </div>

              {/* Results Interpretation */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {t("sections.results.title")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-900/20 border border-green-700 rounded-lg p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t("sections.results.statuses.passed.title")}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {t("sections.results.statuses.passed.description")}
                    </p>
                  </div>
                  <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-6 text-center">
                    <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t("sections.results.statuses.warnings.title")}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {t("sections.results.statuses.warnings.description")}
                    </p>
                  </div>
                  <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 text-center">
                    <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t("sections.results.statuses.errors.title")}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {t("sections.results.statuses.errors.description")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Common Issues */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">{t("sections.issues.title")}</h2>
                <div className="space-y-6">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t("sections.issues.common.1.title")}
                    </h3>
                    <p className="text-gray-300 mb-2">
                      {t("sections.issues.common.1.description")}
                    </p>
                    <p className="text-blue-400 text-sm">
                      {t("sections.issues.common.1.solution")}
                    </p>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t("sections.issues.common.2.title")}
                    </h3>
                    <p className="text-gray-300 mb-2">
                      {t("sections.issues.common.2.description")}
                    </p>
                    <p className="text-blue-400 text-sm">
                      {t("sections.issues.common.2.solution")}
                    </p>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t("sections.issues.common.3.title")}
                    </h3>
                    <p className="text-gray-300 mb-2">
                      {t("sections.issues.common.3.description")}
                    </p>
                    <p className="text-blue-400 text-sm">
                      {t("sections.issues.common.3.solution")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {t("sections.practices.title")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {t("sections.practices.do.title")}
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• {t("sections.practices.do.items.1")}</li>
                      <li>• {t("sections.practices.do.items.2")}</li>
                      <li>• {t("sections.practices.do.items.3")}</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {t("sections.practices.dont.title")}
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• {t("sections.practices.dont.items.1")}</li>
                      <li>• {t("sections.practices.dont.items.2")}</li>
                      <li>• {t("sections.practices.dont.items.3")}</li>
                    </ul>
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
