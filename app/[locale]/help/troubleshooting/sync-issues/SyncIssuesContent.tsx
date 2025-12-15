"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  User,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Wifi,
  Database,
  Settings,
  Zap,
  Monitor,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SyncIssuesContent() {
  const t = useTranslations("help.categories.troubleshooting.articles.syncIssues");

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
              name: t("breadcrumb.syncIssues"),
              url: "https://www.aiseoturbo.com/help/troubleshooting/sync-issues",
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 p-3">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-yellow-400 text-sm font-medium">
                    {t("header.category")}
                  </span>
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
                  <Database className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">{t("intro.title")}</h2>
                    <p className="text-gray-300 mb-0">{t("intro.description")}</p>
                  </div>
                </div>
              </div>

              {/* Quick Checks */}
              <h2 className="text-2xl font-bold text-white mb-6">{t("quickChecks.title")}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Wifi className="w-6 h-6 text-green-400" />
                    <h3 className="text-white font-semibold">
                      {t("quickChecks.connection.title")}
                    </h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• {t("quickChecks.connection.instructions.0")}</div>
                    <div>• {t("quickChecks.connection.instructions.1")}</div>
                    <div>• {t("quickChecks.connection.instructions.2")}</div>
                    <div>• {t("quickChecks.connection.instructions.3")}</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <RefreshCw className="w-6 h-6 text-blue-400" />
                    <h3 className="text-white font-semibold">
                      {t("quickChecks.forceRefresh.title")}
                    </h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• {t("quickChecks.forceRefresh.instructions.0")}</div>
                    <div>• {t("quickChecks.forceRefresh.instructions.1")}</div>
                    <div>• {t("quickChecks.forceRefresh.instructions.2")}</div>
                    <div>• {t("quickChecks.forceRefresh.instructions.3")}</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Monitor className="w-6 h-6 text-purple-400" />
                    <h3 className="text-white font-semibold">
                      {t("quickChecks.appRestart.title")}
                    </h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• {t("quickChecks.appRestart.instructions.0")}</div>
                    <div>• {t("quickChecks.appRestart.instructions.1")}</div>
                    <div>• {t("quickChecks.appRestart.instructions.2")}</div>
                    <div>• {t("quickChecks.appRestart.instructions.3")}</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-6 h-6 text-orange-400" />
                    <h3 className="text-white font-semibold">
                      {t("quickChecks.settingsCheck.title")}
                    </h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• {t("quickChecks.settingsCheck.instructions.0")}</div>
                    <div>• {t("quickChecks.settingsCheck.instructions.1")}</div>
                    <div>• {t("quickChecks.settingsCheck.instructions.2")}</div>
                    <div>• {t("quickChecks.settingsCheck.instructions.3")}</div>
                  </div>
                </div>
              </div>

              {/* Common Sync Issues */}
              <h3 className="text-2xl font-bold text-white mb-6">{t("commonProblems.title")}</h3>

              <div className="space-y-6 mb-8">
                {/* Outdated Data */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <RefreshCw className="w-6 h-6 text-blue-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">
                        {t("commonProblems.outdatedData.title")}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {t("commonProblems.outdatedData.description")}
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <p className="text-gray-300 text-sm">
                            {t("commonProblems.outdatedData.solutions.0")}
                          </p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <p className="text-gray-300 text-sm">
                            {t("commonProblems.outdatedData.solutions.1")}
                          </p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <p className="text-gray-300 text-sm">
                            {t("commonProblems.outdatedData.solutions.2")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sync Errors */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">
                        {t("commonProblems.syncErrors.title")}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {t("commonProblems.syncErrors.description")}
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <p className="text-gray-300 text-sm">
                            {t("commonProblems.syncErrors.solutions.0")}
                          </p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <p className="text-gray-300 text-sm">
                            {t("commonProblems.syncErrors.solutions.1")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Device Sync Issues */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Smartphone className="w-6 h-6 text-purple-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">
                        {t("deviceSyncIssues.title")}
                      </h3>
                      <p className="text-gray-300 mb-4">{t("deviceSyncIssues.description")}</p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-purple-400 font-medium mb-1">Cross-Device Sync:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• {t("deviceSyncIssues.crossDeviceSync.0")}</li>
                            <li>• {t("deviceSyncIssues.crossDeviceSync.1")}</li>
                            <li>• {t("deviceSyncIssues.crossDeviceSync.2")}</li>
                            <li>• {t("deviceSyncIssues.crossDeviceSync.3")}</li>
                            <li>• {t("deviceSyncIssues.crossDeviceSync.4")}</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-purple-400 font-medium mb-1">
                            Account Verification:
                          </div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• {t("deviceSyncIssues.accountVerification.0")}</li>
                            <li>• {t("deviceSyncIssues.accountVerification.1")}</li>
                            <li>• {t("deviceSyncIssues.accountVerification.2")}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slow Sync */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Zap className="w-6 h-6 text-yellow-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">
                        {t("slowSync.title")}
                      </h3>
                      <p className="text-gray-300 mb-4">{t("slowSync.description")}</p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-yellow-400 font-medium mb-1">
                            Performance Factors:
                          </div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• {t("slowSync.performanceFactors.0")}</li>
                            <li>• {t("slowSync.performanceFactors.1")}</li>
                            <li>• {t("slowSync.performanceFactors.2")}</li>
                            <li>• {t("slowSync.performanceFactors.3")}</li>
                            <li>• {t("slowSync.performanceFactors.4")}</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-yellow-400 font-medium mb-1">Optimization Tips:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• {t("slowSync.optimizationTips.0")}</li>
                            <li>• {t("slowSync.optimizationTips.1")}</li>
                            <li>• {t("slowSync.optimizationTips.2")}</li>
                            <li>• {t("slowSync.optimizationTips.3")}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Troubleshooting */}
              <h3 className="text-2xl font-bold text-white mb-6">
                {t("advancedTroubleshooting.title")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-400" />
                    Account Settings
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• {t("advancedTroubleshooting.accountSettings.0")}</li>
                    <li>• {t("advancedTroubleshooting.accountSettings.1")}</li>
                    <li>• {t("advancedTroubleshooting.accountSettings.2")}</li>
                    <li>• {t("advancedTroubleshooting.accountSettings.3")}</li>
                    <li>• {t("advancedTroubleshooting.accountSettings.4")}</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-green-400" />
                    Application Settings
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• {t("advancedTroubleshooting.applicationSettings.0")}</li>
                    <li>• {t("advancedTroubleshooting.applicationSettings.1")}</li>
                    <li>• {t("advancedTroubleshooting.applicationSettings.2")}</li>
                    <li>• {t("advancedTroubleshooting.applicationSettings.3")}</li>
                    <li>• {t("advancedTroubleshooting.applicationSettings.4")}</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-purple-400" />
                    Network Issues
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• {t("advancedTroubleshooting.networkIssues.0")}</li>
                    <li>• {t("advancedTroubleshooting.networkIssues.1")}</li>
                    <li>• {t("advancedTroubleshooting.networkIssues.2")}</li>
                    <li>• {t("advancedTroubleshooting.networkIssues.3")}</li>
                    <li>• {t("advancedTroubleshooting.networkIssues.4")}</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-orange-400" />
                    Device Issues
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• {t("advancedTroubleshooting.deviceIssues.0")}</li>
                    <li>• {t("advancedTroubleshooting.deviceIssues.1")}</li>
                    <li>• {t("advancedTroubleshooting.deviceIssues.2")}</li>
                    <li>• {t("advancedTroubleshooting.deviceIssues.3")}</li>
                    <li>• {t("advancedTroubleshooting.deviceIssues.4")}</li>
                  </ul>
                </div>
              </div>

              {/* Sync Status Dashboard */}
              <h3 className="text-2xl font-bold text-white mb-6">
                {t("syncStatusDashboard.title")}
              </h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <h3 className="text-white font-semibold mb-4">
                  {t("syncStatusDashboard.howToCheck")}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("syncStatusDashboard.dashboardIndicator.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("syncStatusDashboard.dashboardIndicator.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("syncStatusDashboard.lastSyncTime.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("syncStatusDashboard.lastSyncTime.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("syncStatusDashboard.errorLogs.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("syncStatusDashboard.errorLogs.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("syncStatusDashboard.serviceStatus.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("syncStatusDashboard.serviceStatus.description")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prevention */}
              <h3 className="text-2xl font-bold text-white mb-6">{t("prevention.title")}</h3>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("prevention.practices.0.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("prevention.practices.0.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("prevention.practices.1.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("prevention.practices.1.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("prevention.practices.2.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("prevention.practices.2.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        {t("prevention.practices.3.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {t("prevention.practices.3.description")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Still Having Issues */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">
                  {t("stillHavingIssues.title")}
                </h3>
                <p className="text-gray-300 mb-4">{t("stillHavingIssues.description")}</p>
                <p className="text-gray-300 mb-4">{t("contactSupport")}</p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    {t("stillHavingIssues.contactSupport")}
                  </Link>
                  <Link
                    href="/help/troubleshooting/performance"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    {t("stillHavingIssues.performanceIssues")}
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
