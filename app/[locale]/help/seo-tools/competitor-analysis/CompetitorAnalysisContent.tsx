"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import {
  ArrowLeft,
  Users,
  Target,
  TrendingUp,
  Eye,
  BarChart3,
  CheckCircle,
  Search,
} from "lucide-react";

export default function CompetitorAnalysisContent() {
  const t = useTranslations("help.categories.seoTools.articles.competitorGuide");

  const breadcrumbItems = [
    { name: t("breadcrumb.help"), url: "/help" },
    { name: t("breadcrumb.seoTools"), url: "/help/seo-tools" },
    { name: t("breadcrumb.competitorGuide"), url: "/help/seo-tools/competitor-analysis" },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={breadcrumbItems}
            className="mb-6"
            includeHome={true}
            darkMode={false}
          />

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
              <Users className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t("intro.title")}</h2>
                <p className="text-gray-600">{t("intro.description")}</p>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("benefits.keywordGaps.title")}
                </h3>
                <p className="text-sm text-gray-600">{t("benefits.keywordGaps.description")}</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("benefits.strategyInsights.title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("benefits.strategyInsights.description")}
                </p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("benefits.contentIdeas.title")}
                </h3>
                <p className="text-sm text-gray-600">{t("benefits.contentIdeas.description")}</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("benefits.performanceTracking.title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("benefits.performanceTracking.description")}
                </p>
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
                    {t("howItWorks.identifyCompetitors.title")}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {t("howItWorks.identifyCompetitors.description")}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {t("howItWorks.identifyCompetitors.whereToFind.title")}
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• {t("howItWorks.identifyCompetitors.whereToFind.googleSearch")}</li>
                      <li>
                        • {t("howItWorks.identifyCompetitors.whereToFind.industryDirectories")}
                      </li>
                      <li>• {t("howItWorks.identifyCompetitors.whereToFind.socialMedia")}</li>
                      <li>• {t("howItWorks.identifyCompetitors.whereToFind.seoTools")}</li>
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
                    {t("howItWorks.analyzeStrategy.title")}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {t("howItWorks.analyzeStrategy.description")}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-blue-600 font-medium mb-1">
                        {t("howItWorks.analyzeStrategy.onPageFactors.title")}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• {t("howItWorks.analyzeStrategy.onPageFactors.titleTags")}</div>
                        <div>• {t("howItWorks.analyzeStrategy.onPageFactors.headings")}</div>
                        <div>• {t("howItWorks.analyzeStrategy.onPageFactors.contentQuality")}</div>
                        <div>• {t("howItWorks.analyzeStrategy.onPageFactors.internalLinking")}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-purple-600 font-medium mb-1">
                        {t("howItWorks.analyzeStrategy.offPageFactors.title")}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• {t("howItWorks.analyzeStrategy.offPageFactors.backlinks")}</div>
                        <div>• {t("howItWorks.analyzeStrategy.offPageFactors.socialMedia")}</div>
                        <div>• {t("howItWorks.analyzeStrategy.offPageFactors.brandMentions")}</div>
                        <div>
                          • {t("howItWorks.analyzeStrategy.offPageFactors.domainAuthority")}
                        </div>
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
                    {t("howItWorks.identifyOpportunities.title")}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {t("howItWorks.identifyOpportunities.description")}
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-blue-800 font-medium mb-2">
                      {t("howItWorks.identifyOpportunities.commonOpportunities.title")}
                    </h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li>
                        • {t("howItWorks.identifyOpportunities.commonOpportunities.lowCompetition")}
                      </li>
                      <li>
                        • {t("howItWorks.identifyOpportunities.commonOpportunities.contentFormats")}
                      </li>
                      <li>
                        •{" "}
                        {t("howItWorks.identifyOpportunities.commonOpportunities.technicalIssues")}
                      </li>
                      <li>
                        • {t("howItWorks.identifyOpportunities.commonOpportunities.linkStrategies")}
                      </li>
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
                    {t("howItWorks.trackMonitor.title")}
                  </h3>
                  <p className="text-gray-600 mb-3">{t("howItWorks.trackMonitor.description")}</p>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                    <div>
                      <div className="text-gray-900 font-medium">
                        {t("howItWorks.trackMonitor.continuousMonitoring.title")}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {t("howItWorks.trackMonitor.continuousMonitoring.description")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t("bestPractices.title")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("bestPractices.focusDirect.title")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("bestPractices.focusDirect.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("bestPractices.lookPatterns.title")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("bestPractices.lookPatterns.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("bestPractices.dontCopyBlindly.title")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("bestPractices.dontCopyBlindly.description")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("bestPractices.monitorRegularly.title")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("bestPractices.monitorRegularly.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("bestPractices.combineData.title")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("bestPractices.combineData.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("bestPractices.trackImplementation.title")}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("bestPractices.trackImplementation.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tools and Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t("toolsFeatures.title")}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <Search className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t("toolsFeatures.keywordGap.title")}
                </h3>
                <p className="text-sm text-gray-600">{t("toolsFeatures.keywordGap.description")}</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <BarChart3 className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t("toolsFeatures.backlinkAnalysis.title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("toolsFeatures.backlinkAnalysis.description")}
                </p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <TrendingUp className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t("toolsFeatures.serpTracking.title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("toolsFeatures.serpTracking.description")}
                </p>
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
                {t("gettingStarted.startAnalysis")}
              </Link>
              <Link
                href="/help/getting-started/quick-start"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {t("gettingStarted.viewGuide")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
