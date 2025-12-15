"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  Search,
  BarChart3,
  Zap,
  Target,
  Eye,
  CheckCircle,
  Clock,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function SiteCrawlerContent() {
  const t = useTranslations("help.categories.seoTools.articles.siteCrawler");

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/help"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToHelp")}
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("header.title")}</h1>
            <p className="text-xl text-gray-600 max-w-3xl">{t("header.description")}</p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <Globe className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t("intro.title")}</h2>
                <p className="text-gray-600">{t("intro.description")}</p>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Search className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("keyFeatures.completeCoverage.title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("keyFeatures.completeCoverage.description")}
                </p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("keyFeatures.technicalAnalysis.title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("keyFeatures.technicalAnalysis.description")}
                </p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("keyFeatures.contentInsights.title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("keyFeatures.contentInsights.description")}
                </p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("keyFeatures.fastResults.title")}
                </h3>
                <p className="text-sm text-gray-600">{t("keyFeatures.fastResults.description")}</p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t("howItWorks.title")}</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("howItWorks.startCrawl.title")}
                  </h3>
                  <p className="text-gray-600 mb-3">{t("howItWorks.startCrawl.description")}</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {t("howItWorks.startCrawl.crawlOptions.title")}
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• {t("howItWorks.startCrawl.crawlOptions.quickScan")}</li>
                      <li>• {t("howItWorks.startCrawl.crawlOptions.fullCrawl")}</li>
                      <li>• {t("howItWorks.startCrawl.crawlOptions.customDepth")}</li>
                      <li>• {t("howItWorks.startCrawl.crawlOptions.includeExclude")}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("howItWorks.intelligentDiscovery.title")}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {t("howItWorks.intelligentDiscovery.description")}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-blue-600 font-medium mb-1">
                        {t("howItWorks.intelligentDiscovery.crawls.title")}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• {t("howItWorks.intelligentDiscovery.crawls.htmlPages")}</div>
                        <div>• {t("howItWorks.intelligentDiscovery.crawls.xmlSitemaps")}</div>
                        <div>• {t("howItWorks.intelligentDiscovery.crawls.imagesMedia")}</div>
                        <div>• {t("howItWorks.intelligentDiscovery.crawls.cssJs")}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-purple-600 font-medium mb-1">
                        {t("howItWorks.intelligentDiscovery.analyzes.title")}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• {t("howItWorks.intelligentDiscovery.analyzes.titlesMeta")}</div>
                        <div>• {t("howItWorks.intelligentDiscovery.analyzes.headings")}</div>
                        <div>• {t("howItWorks.intelligentDiscovery.analyzes.links")}</div>
                        <div>• {t("howItWorks.intelligentDiscovery.analyzes.performance")}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("howItWorks.comprehensiveAnalysis.title")}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {t("howItWorks.comprehensiveAnalysis.description")}
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-blue-800 font-medium mb-2">
                      {t("howItWorks.comprehensiveAnalysis.categories.title")}
                    </h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li>• {t("howItWorks.comprehensiveAnalysis.categories.onPage")}</li>
                      <li>• {t("howItWorks.comprehensiveAnalysis.categories.technical")}</li>
                      <li>• {t("howItWorks.comprehensiveAnalysis.categories.content")}</li>
                      <li>• {t("howItWorks.comprehensiveAnalysis.categories.linking")}</li>
                      <li>• {t("howItWorks.comprehensiveAnalysis.categories.mobile")}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("howItWorks.generateReports.title")}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {t("howItWorks.generateReports.description")}
                  </p>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                    <div>
                      <div className="text-gray-900 font-medium">
                        {t("howItWorks.generateReports.reporting.title")}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {t("howItWorks.generateReports.reporting.description")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t("keyBenefits.title")}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("keyBenefits.completeVisibility.title")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("keyBenefits.completeVisibility.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("keyBenefits.technicalDetection.title")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("keyBenefits.technicalDetection.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("keyBenefits.seoMonitoring.title")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("keyBenefits.seoMonitoring.description")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("keyBenefits.contentOptimization.title")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("keyBenefits.contentOptimization.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("keyBenefits.performanceInsights.title")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("keyBenefits.performanceInsights.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("keyBenefits.actionableRecommendations.title")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("keyBenefits.actionableRecommendations.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Common Issues Found */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t("commonIssues.title")}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h3 className="font-semibold text-red-800 mb-2">
                    {t("commonIssues.criticalIssues.title")}
                  </h3>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• Broken internal/external links</li>
                    <li>• Pages returning 4xx/5xx errors</li>
                    <li>• Missing or duplicate title tags</li>
                    <li>• Pages blocked by robots.txt</li>
                  </ul>
                </div>
                <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <h3 className="font-semibold text-yellow-800 mb-2">
                    {t("commonIssues.warningIssues.title")}
                  </h3>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    <li>• Slow loading pages</li>
                    <li>• Missing meta descriptions</li>
                    <li>• Non-mobile-friendly pages</li>
                    <li>• Large images without optimization</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    {t("commonIssues.optimizationOpportunities.title")}
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• Thin or duplicate content</li>
                    <li>• Missing heading structure</li>
                    <li>• Internal linking opportunities</li>
                    <li>• Content gaps to fill</li>
                  </ul>
                </div>
                <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                  <h3 className="font-semibold text-green-800 mb-2">
                    {t("commonIssues.performanceIssues.title")}
                  </h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Uncompressed resources</li>
                    <li>• Render-blocking JavaScript</li>
                    <li>• Missing caching headers</li>
                    <li>• Large page sizes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t("bestPractices.title")}
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Settings className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t("bestPractices.configureSettings.title")}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {t("bestPractices.configureSettings.description")}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use crawl delays to avoid overwhelming your server</li>
                    <li>• Set user agents to identify your crawler</li>
                    <li>• Exclude admin areas and development pages</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t("bestPractices.scheduleCrawls.title")}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {t("bestPractices.scheduleCrawls.description")}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Weekly crawls for active sites</li>
                    <li>• Monthly crawls for stable sites</li>
                    <li>• After major content or technical changes</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Target className="w-6 h-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t("bestPractices.prioritizeIssues.title")}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {t("bestPractices.prioritizeIssues.description")}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Fix critical errors first (404s, broken links)</li>
                    <li>• Address performance issues affecting Core Web Vitals</li>
                    <li>• Optimize content and metadata for better rankings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              {t("gettingStarted.title")}
            </h2>
            <p className="text-gray-600 mb-6">{t("gettingStarted.description")}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {t("gettingStarted.startCrawl")}
              </Link>
              <Link
                href="/help/getting-started/quick-start"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {t("gettingStarted.quickStartGuide")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
