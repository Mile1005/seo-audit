"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  User,
  CheckCircle,
  AlertTriangle,
  Target,
  Zap,
  RefreshCw,
  Globe,
  Search,
  Bug,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AuditIssuesContent() {
  const t = useTranslations("help.categories.troubleshooting.articles.auditIssues");
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        {/* JSON-LD Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "HowTo",
                name: t("schema.name"),
                description: t("schema.description"),
                image: {
                  "@type": "ImageObject",
                  url: "https://aiseoturbo.com/help/troubleshooting-audits.jpg",
                  width: 1200,
                  height: 630,
                },
                step: [
                  {
                    "@type": "HowToStep",
                    name: t("schema.steps.stuck.name"),
                    text: t("schema.steps.stuck.text"),
                    url: "https://www.aiseoturbo.com/help/troubleshooting/audit-issues#stuck",
                  },
                  {
                    "@type": "HowToStep",
                    name: t("schema.steps.restart.name"),
                    text: t("schema.steps.restart.text"),
                    url: "https://www.aiseoturbo.com/help/troubleshooting/audit-issues#restart",
                  },
                  {
                    "@type": "HowToStep",
                    name: t("schema.steps.timeout.name"),
                    text: t("schema.steps.timeout.text"),
                    url: "https://www.aiseoturbo.com/help/troubleshooting/audit-issues#timeout",
                  },
                ],
                author: {
                  "@type": "Organization",
                  name: "AISEOTurbo",
                  url: "https://aiseoturbo.com",
                },
                datePublished: "2025-03-01",
                dateModified: "2025-03-15",
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: t("schema.faq.stuck.question"),
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: t("schema.faq.stuck.answer"),
                    },
                  },
                  {
                    "@type": "Question",
                    name: t("schema.faq.timeout.question"),
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: t("schema.faq.timeout.answer"),
                    },
                  },
                ],
              },
            ]),
          }}
        />

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
              name: t("breadcrumb.auditIssues"),
              url: "https://www.aiseoturbo.com/help/troubleshooting/audit-issues",
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
                aria-label={t("backToHelp.ariaLabel")}
              >
                <ArrowLeft
                  className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                  aria-hidden="true"
                />
                {t("backToHelp.text")}
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 p-3"
                  aria-hidden="true"
                >
                  <Bug className="w-6 h-6 text-white" />
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
                    <h2 className="text-white text-lg font-semibold mb-2">{t("intro.title")}</h2>
                    <p className="text-gray-300 mb-0">{t("intro.description")}</p>
                  </div>
                </div>
              </div>

              {/* Quick Diagnostics */}
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-6 mb-8">
                <h3 className="text-blue-400 text-lg font-semibold mb-4">
                  {t("diagnostics.title")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                      <span className="text-gray-300 text-sm">
                        {t("diagnostics.checklist.siteAccessible")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                      <span className="text-gray-300 text-sm">
                        {t("diagnostics.checklist.connectionStable")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                      <span className="text-gray-300 text-sm">
                        {t("diagnostics.checklist.waitedFiveMinutes")}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                      <span className="text-gray-300 text-sm">
                        {t("diagnostics.checklist.siteRespondsQuickly")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                      <span className="text-gray-300 text-sm">
                        {t("diagnostics.checklist.correctUrlFormat")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                      <span className="text-gray-300 text-sm">
                        {t("diagnostics.checklist.triedRefreshing")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Issues & Solutions */}
              <h2 className="text-2xl font-bold text-white mb-6">{t("issues.title")}</h2>

              <div className="space-y-8">
                {/* Issue 1: Stuck at Analyzing */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 p-2">
                      <RefreshCw className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {t("issues.stuck.title")}
                      </h3>
                      <p className="text-gray-300 mb-4">{t("issues.stuck.description")}</p>

                      <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 mb-4">
                        <h4 className="text-white font-medium mb-3">
                          {t("issues.stuck.solution.title")}
                        </h4>
                        <ol className="space-y-2 text-gray-300 list-decimal list-inside">
                          <li>{t("issues.stuck.solution.steps.wait")}</li>
                          <li>{t("issues.stuck.solution.steps.refresh")}</li>
                          <li>{t("issues.stuck.solution.steps.checkStatus")}</li>
                          <li>{t("issues.stuck.solution.steps.cancelRestart")}</li>
                          <li>{t("issues.stuck.solution.steps.offPeak")}</li>
                        </ol>
                      </div>

                      <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-4">
                        <h4 className="text-green-400 font-medium mb-2">
                          {t("issues.stuck.proTip.title")}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {t("issues.stuck.proTip.description")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issue 2: Timeout Errors */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 p-2">
                      <AlertTriangle className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {t("issues.timeout.title")}
                      </h3>
                      <p className="text-gray-300 mb-4">{t("issues.timeout.description")}</p>

                      <div className="space-y-4">
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-3">
                            {t("issues.timeout.solutions.title")}
                          </h4>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 font-bold">
                                {t("issues.timeout.solutions.limitScope.marker")}
                              </span>
                              <span>{t("issues.timeout.solutions.limitScope.text")}</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 font-bold">
                                {t("issues.timeout.solutions.checkPerformance.marker")}
                              </span>
                              <span>{t("issues.timeout.solutions.checkPerformance.text")}</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 font-bold">
                                {t("issues.timeout.solutions.optimize.marker")}
                              </span>
                              <span>{t("issues.timeout.solutions.optimize.text")}</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 font-bold">
                                {t("issues.timeout.solutions.contactHosting.marker")}
                              </span>
                              <span>{t("issues.timeout.solutions.contactHosting.text")}</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-4">
                          <h4 className="text-yellow-400 font-medium mb-2">
                            {t("issues.timeout.largeSites.title")}
                          </h4>
                          <p className="text-gray-300 text-sm">
                            {t("issues.timeout.largeSites.description")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issue 3: Access Denied */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-2">
                      <Globe className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {t("issues.accessDenied.title")}
                      </h3>
                      <p className="text-gray-300 mb-4">{t("issues.accessDenied.description")}</p>

                      <div className="space-y-4">
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-3">
                            {t("issues.accessDenied.causes.title")}
                          </h4>
                          <div className="space-y-3">
                            <div className="border-l-4 border-blue-500 pl-4">
                              <h5 className="text-white font-medium">
                                {t("issues.accessDenied.causes.password.title")}
                              </h5>
                              <p className="text-gray-300 text-sm">
                                {t("issues.accessDenied.causes.password.description")}
                              </p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4">
                              <h5 className="text-white font-medium">
                                {t("issues.accessDenied.causes.firewall.title")}
                              </h5>
                              <p className="text-gray-300 text-sm">
                                {t("issues.accessDenied.causes.firewall.description")}
                              </p>
                            </div>
                            <div className="border-l-4 border-yellow-500 pl-4">
                              <h5 className="text-white font-medium">
                                {t("issues.accessDenied.causes.robots.title")}
                              </h5>
                              <p className="text-gray-300 text-sm">
                                {t("issues.accessDenied.causes.robots.description")}
                              </p>
                            </div>
                            <div className="border-l-4 border-red-500 pl-4">
                              <h5 className="text-white font-medium">
                                {t("issues.accessDenied.causes.downtime.title")}
                              </h5>
                              <p className="text-gray-300 text-sm">
                                {t("issues.accessDenied.causes.downtime.description")}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-4">
                          <h4 className="text-blue-400 font-medium mb-2">
                            {t("issues.accessDenied.testing.title")}
                          </h4>
                          <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                            <li>{t("issues.accessDenied.testing.steps.incognito")}</li>
                            <li>{t("issues.accessDenied.testing.steps.exactUrl")}</li>
                            <li>{t("issues.accessDenied.testing.steps.loginPrompts")}</li>
                            <li>{t("issues.accessDenied.testing.steps.differentDevices")}</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issue 4: Partial Results */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-2">
                      <Search className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {t("issues.partial.title")}
                      </h3>
                      <p className="text-gray-300 mb-4">{t("issues.partial.description")}</p>

                      <div className="space-y-4">
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-3">
                            {t("issues.partial.causes.title")}
                          </h4>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                              <span className="text-orange-400 font-bold">
                                {t("issues.partial.causes.inaccessible.marker")}
                              </span>
                              <span>{t("issues.partial.causes.inaccessible.text")}</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-orange-400 font-bold">
                                {t("issues.partial.causes.javascript.marker")}
                              </span>
                              <span>{t("issues.partial.causes.javascript.text")}</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-orange-400 font-bold">
                                {t("issues.partial.causes.rateLimit.marker")}
                              </span>
                              <span>{t("issues.partial.causes.rateLimit.text")}</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-orange-400 font-bold">
                                {t("issues.partial.causes.interruptions.marker")}
                              </span>
                              <span>{t("issues.partial.causes.interruptions.text")}</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-4">
                          <h4 className="text-green-400 font-medium mb-2">
                            {t("issues.partial.solutions.title")}
                          </h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>{t("issues.partial.solutions.offPeak")}</li>
                            <li>{t("issues.partial.solutions.serverSideRendering")}</li>
                            <li>{t("issues.partial.solutions.increaseResources")}</li>
                            <li>{t("issues.partial.solutions.checkSitemap")}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Troubleshooting */}
              <h2 className="text-2xl font-bold text-white mt-12 mb-6">{t("advanced.title")}</h2>

              <div className="bg-purple-900/20 border border-purple-600/30 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Zap className="w-6 h-6 text-purple-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-purple-400 text-lg font-semibold mb-4">
                      {t("advanced.forTechnicalUsers")}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">
                          {t("advanced.serverLogs.title")}
                        </h4>
                        <p className="text-gray-300 text-sm mb-2">
                          {t("advanced.serverLogs.description")}
                        </p>
                        <code className="block bg-slate-800 p-3 rounded text-green-400 text-sm">
                          {t("advanced.serverLogs.commands.apache")}
                          <br />
                          {t("advanced.serverLogs.commands.or")}
                          <br />
                          {t("advanced.serverLogs.commands.nginx")}
                        </code>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">
                          {t("advanced.robotsTxt.title")}
                        </h4>
                        <p className="text-gray-300 text-sm mb-2">
                          {t("advanced.robotsTxt.description")}
                        </p>
                        <code className="block bg-slate-800 p-3 rounded text-green-400 text-sm">
                          {t("advanced.robotsTxt.commands.curl")}
                          <br />
                          {t("advanced.robotsTxt.commands.comment")}
                        </code>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">{t("advanced.ssl.title")}</h4>
                        <p className="text-gray-300 text-sm mb-2">
                          {t("advanced.ssl.description")}
                        </p>
                        <code className="block bg-slate-800 p-3 rounded text-green-400 text-sm">
                          {t("advanced.ssl.commands.openssl")}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* When to Contact Support */}
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-blue-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-blue-400 text-lg font-semibold mb-4">
                      {t("support.title")}
                    </h3>
                    <p className="text-gray-300 mb-4">{t("support.description")}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">
                            {t("support.info.websiteUrl")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">
                            {t("support.info.exactErrors")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">
                            {t("support.info.timeOccurred")}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">
                            {t("support.info.stepsTried")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">
                            {t("support.info.browserInfo")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">
                            {t("support.info.screenshots")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prevention Tips */}
              <div className="bg-green-900/20 border border-green-600/30 rounded-xl p-6 mt-12">
                <div className="flex items-start gap-4">
                  <Target className="w-6 h-6 text-green-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-green-400 text-lg font-semibold mb-2">
                      {t("prevention.title")}
                    </h3>
                    <p className="text-gray-300 mb-4">{t("prevention.description")}</p>
                    <ul className="space-y-2 text-gray-300">
                      <li>{t("prevention.tips.fastLoading")}</li>
                      <li>{t("prevention.tips.reliableHosting")}</li>
                      <li>{t("prevention.tips.simpleRobots")}</li>
                      <li>{t("prevention.tips.errorHandling")}</li>
                      <li>{t("prevention.tips.scheduleAudits")}</li>
                      <li>{t("prevention.tips.monitorPerformance")}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <h2 className="text-2xl font-bold text-white mt-12 mb-6">{t("related.title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/help/getting-started/first-audit"
                  className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                  aria-label={t("related.firstAudit.ariaLabel")}
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {t("related.firstAudit.title")}
                  </h3>
                  <p className="text-gray-400 text-sm">{t("related.firstAudit.description")}</p>
                </Link>

                <Link
                  href="/help/troubleshooting/performance"
                  className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                  aria-label={t("related.performance.ariaLabel")}
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {t("related.performance.title")}
                  </h3>
                  <p className="text-gray-400 text-sm">{t("related.performance.description")}</p>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
