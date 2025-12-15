"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  User,
  Zap,
  AlertTriangle,
  CheckCircle,
  Monitor,
  Smartphone,
  Wifi,
  Database,
  Settings,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function PerformanceContent() {
  const t = useTranslations("help.categories.troubleshooting.articles.performance");

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: t("breadcrumb.home"), url: "https://www.aiseoturbo.com" },
            { name: t("breadcrumb.help"), url: "https://www.aiseoturbo.com/help" },
            {
              name: t("breadcrumb.troubleshooting"),
              url: "https://www.aiseoturbo.com/help/troubleshooting",
            },
            {
              name: t("breadcrumb.performance"),
              url: "https://www.aiseoturbo.com/help/troubleshooting/performance",
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
                href="/help"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {t("backToHelp")}
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-green-400 text-sm font-medium">{t("header.category")}</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{t("header.title")}</h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{t("header.readTime")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
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
                  <Cpu className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">{t("intro.title")}</h2>
                    <p className="text-gray-300 mb-0">{t("intro.description")}</p>
                  </div>
                </div>
              </div>

              {/* Quick Performance Checks */}
              <h2 className="text-2xl font-bold text-white mb-6">{t("quickChecks.title")}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Wifi className="w-6 h-6 text-blue-400" />
                    <h3 className="text-white font-semibold">
                      {t("quickChecks.networkConnection.title")}
                    </h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• {t("quickChecks.networkConnection.instructions.0")}</div>
                    <div>• {t("quickChecks.networkConnection.instructions.1")}</div>
                    <div>• {t("quickChecks.networkConnection.instructions.2")}</div>
                    <div>• {t("quickChecks.networkConnection.instructions.3")}</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Monitor className="w-6 h-6 text-green-400" />
                    <h3 className="text-white font-semibold">
                      {t("quickChecks.deviceResources.title")}
                    </h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• {t("quickChecks.deviceResources.instructions.0")}</div>
                    <div>• {t("quickChecks.deviceResources.instructions.1")}</div>
                    <div>• {t("quickChecks.deviceResources.instructions.2")}</div>
                    <div>• {t("quickChecks.deviceResources.instructions.3")}</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-6 h-6 text-purple-400" />
                    <h3 className="text-white font-semibold">
                      {t("quickChecks.browserOptimization.title")}
                    </h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• {t("quickChecks.browserOptimization.instructions.0")}</div>
                    <div>• {t("quickChecks.browserOptimization.instructions.1")}</div>
                    <div>• {t("quickChecks.browserOptimization.instructions.2")}</div>
                    <div>• {t("quickChecks.browserOptimization.instructions.3")}</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-6 h-6 text-orange-400" />
                    <h3 className="text-white font-semibold">
                      {t("quickChecks.applicationUpdates.title")}
                    </h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• {t("quickChecks.applicationUpdates.instructions.0")}</div>
                    <div>• {t("quickChecks.applicationUpdates.instructions.1")}</div>
                    <div>• {t("quickChecks.applicationUpdates.instructions.2")}</div>
                    <div>• {t("quickChecks.applicationUpdates.instructions.3")}</div>
                  </div>
                </div>
              </div>

              {/* Common Performance Issues */}
              <h3 className="text-2xl font-bold text-white mb-6">{t("commonProblems.title")}</h3>

              <div className="space-y-6 mb-8">
                {/* Slow Loading */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Zap className="w-6 h-6 text-yellow-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">
                        {t("commonProblems.slowLoading.title")}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {t("commonProblems.slowLoading.description")}
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">
                              {t("commonProblems.slowLoading.networkIssues")}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {t("commonProblems.slowLoading.networkIssuesDesc")}
                          </p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">
                              {t("commonProblems.slowLoading.browserCache")}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {t("commonProblems.slowLoading.browserCacheDesc")}
                          </p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">
                              {t("commonProblems.slowLoading.serverLoad")}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {t("commonProblems.slowLoading.serverLoadDesc")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lag and Responsiveness */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">
                        {t("commonProblems.lagging.title")}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {t("commonProblems.lagging.description")}
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-red-400 font-medium mb-1">
                            {t("commonProblems.lagging.devicePerformanceTitle")}
                          </div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• {t("commonProblems.lagging.devicePerformance.0")}</li>
                            <li>• {t("commonProblems.lagging.devicePerformance.1")}</li>
                            <li>• {t("commonProblems.lagging.devicePerformance.2")}</li>
                            <li>• {t("commonProblems.lagging.devicePerformance.3")}</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-red-400 font-medium mb-1">
                            {t("commonProblems.lagging.browserIssuesTitle")}
                          </div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• {t("commonProblems.lagging.browserIssues.0")}</li>
                            <li>• {t("commonProblems.lagging.browserIssues.1")}</li>
                            <li>• {t("commonProblems.lagging.browserIssues.2")}</li>
                            <li>• {t("commonProblems.lagging.browserIssues.3")}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SEO Audit Speed */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Database className="w-6 h-6 text-blue-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">
                        {t("commonProblems.slowAudits.title")}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {t("commonProblems.slowAudits.description")}
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-blue-400 font-medium mb-1">
                            {t("commonProblems.slowAudits.auditFactorsTitle")}
                          </div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• {t("commonProblems.slowAudits.auditFactors.0")}</li>
                            <li>• {t("commonProblems.slowAudits.auditFactors.1")}</li>
                            <li>• {t("commonProblems.slowAudits.auditFactors.2")}</li>
                            <li>• {t("commonProblems.slowAudits.auditFactors.3")}</li>
                            <li>• {t("commonProblems.slowAudits.auditFactors.4")}</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-blue-400 font-medium mb-1">
                            {t("commonProblems.slowAudits.optimizationTipsTitle")}
                          </div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• {t("commonProblems.slowAudits.optimizationTips.0")}</li>
                            <li>• {t("commonProblems.slowAudits.optimizationTips.1")}</li>
                            <li>• {t("commonProblems.slowAudits.optimizationTips.2")}</li>
                            <li>• {t("commonProblems.slowAudits.optimizationTips.3")}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Memory Issues */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Cpu className="w-6 h-6 text-purple-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">
                        {t("commonProblems.memoryIssues.title")}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {t("commonProblems.memoryIssues.description")}
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-purple-400 font-medium mb-1">
                            {t("commonProblems.memoryIssues.memoryManagementTitle")}
                          </div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• {t("commonProblems.memoryIssues.memoryManagement.0")}</li>
                            <li>• {t("commonProblems.memoryIssues.memoryManagement.1")}</li>
                            <li>• {t("commonProblems.memoryIssues.memoryManagement.2")}</li>
                            <li>• {t("commonProblems.memoryIssues.memoryManagement.3")}</li>
                            <li>• {t("commonProblems.memoryIssues.memoryManagement.4")}</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-purple-400 font-medium mb-1">
                            {t("commonProblems.memoryIssues.deviceResourcesTitle")}
                          </div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• {t("commonProblems.memoryIssues.deviceResources.0")}</li>
                            <li>• {t("commonProblems.memoryIssues.deviceResources.1")}</li>
                            <li>• {t("commonProblems.memoryIssues.deviceResources.2")}</li>
                            <li>• {t("commonProblems.memoryIssues.deviceResources.3")}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform-Specific Issues */}
              <h3 className="text-2xl font-bold text-white mb-6">{t("platformSpecific.title")}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-blue-400" />
                    {t("platformSpecific.desktopBrowsersTitle")}
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• {t("platformSpecific.desktopBrowsers.0")}</li>
                    <li>• {t("platformSpecific.desktopBrowsers.1")}</li>
                    <li>• {t("platformSpecific.desktopBrowsers.2")}</li>
                    <li>• {t("platformSpecific.desktopBrowsers.3")}</li>
                    <li>• {t("platformSpecific.desktopBrowsers.4")}</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-green-400" />
                    {t("platformSpecific.mobileDevicesTitle")}
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• {t("platformSpecific.mobileDevices.0")}</li>
                    <li>• {t("platformSpecific.mobileDevices.1")}</li>
                    <li>• {t("platformSpecific.mobileDevices.2")}</li>
                    <li>• {t("platformSpecific.mobileDevices.3")}</li>
                    <li>• {t("platformSpecific.mobileDevices.4")}</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-purple-400" />
                    {t("platformSpecific.networkOptimizationTitle")}
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• {t("platformSpecific.networkOptimization.0")}</li>
                    <li>• {t("platformSpecific.networkOptimization.1")}</li>
                    <li>• {t("platformSpecific.networkOptimization.2")}</li>
                    <li>• {t("platformSpecific.networkOptimization.3")}</li>
                    <li>• {t("platformSpecific.networkOptimization.4")}</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5 text-orange-400" />
                    {t("platformSpecific.dataManagementTitle")}
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• {t("platformSpecific.dataManagement.0")}</li>
                    <li>• {t("platformSpecific.dataManagement.1")}</li>
                    <li>• {t("platformSpecific.dataManagement.2")}</li>
                    <li>• {t("platformSpecific.dataManagement.3")}</li>
                    <li>• {t("platformSpecific.dataManagement.4")}</li>
                  </ul>
                </div>
              </div>

              {/* Performance Monitoring */}
              <h3 className="text-2xl font-bold text-white mb-6">
                {t("performanceMonitoring.title")}
              </h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <h3 className="text-white font-semibold mb-4">
                  {t("performanceMonitoring.toolsTitle")}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("performanceMonitoring.browserDevTools.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("performanceMonitoring.browserDevTools.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("performanceMonitoring.systemMonitoring.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("performanceMonitoring.systemMonitoring.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("performanceMonitoring.networkTesting.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("performanceMonitoring.networkTesting.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("performanceMonitoring.applicationMetrics.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("performanceMonitoring.applicationMetrics.description")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Tips */}
              <h3 className="text-2xl font-bold text-white mb-6">{t("advancedTips.title")}</h3>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("advancedTips.optimizeAuditSettings.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("advancedTips.optimizeAuditSettings.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("advancedTips.scheduleStrategically.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("advancedTips.scheduleStrategically.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("advancedTips.useAppropriatePlans.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("advancedTips.useAppropriatePlans.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("advancedTips.monitorAndOptimize.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("advancedTips.monitorAndOptimize.description")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* When to Contact Support */}
              <h3 className="text-2xl font-bold text-white mb-6">{t("contactSupport.title")}</h3>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-blue-400 text-lg font-semibold mb-3">
                      {t("contactSupport.persistentIssues.title")}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {t("contactSupport.persistentIssues.description")}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white font-medium mb-1">
                          {t("contactSupport.persistentIssues.reportItemsTitle")}
                        </h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• {t("contactSupport.persistentIssues.reportItems.0")}</li>
                          <li>• {t("contactSupport.persistentIssues.reportItems.1")}</li>
                          <li>• {t("contactSupport.persistentIssues.reportItems.2")}</li>
                          <li>• {t("contactSupport.persistentIssues.reportItems.3")}</li>
                          <li>• {t("contactSupport.persistentIssues.reportItems.4")}</li>
                          <li>• {t("contactSupport.persistentIssues.reportItems.5")}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prevention */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">{t("prevention.title")}</h3>
                <p className="text-gray-300 mb-4">{t("prevention.description")}</p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Report Performance Issue
                  </Link>
                  <Link
                    href="/help/troubleshooting/sync-issues"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Sync Issues
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
