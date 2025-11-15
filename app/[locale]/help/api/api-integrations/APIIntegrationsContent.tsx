"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BookOpen, Database, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function APIIntegrationsContent() {
  const t = useTranslations('apiContent.api-integrations')

  const categoryArticles = [
    {
      title: t('articles.authentication.title'),
      href: t('articles.authentication.href'),
      time: t('articles.authentication.time'),
      description: t('articles.authentication.description'),
      icon: BookOpen
    },
    {
      title: t('articles.webhooks.title'),
      href: t('articles.webhooks.href'),
      time: t('articles.webhooks.time'),
      description: t('articles.webhooks.description'),
      icon: BookOpen
    },
    {
      title: t('articles.apiIntegrations.title'),
      href: t('articles.apiIntegrations.href'),
      time: t('articles.apiIntegrations.time'),
      description: t('articles.apiIntegrations.description'),
      icon: Database
    }
  ]

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumb */}
        <section className="bg-slate-900/50 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                {t('breadcrumb.help')}
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">{t('breadcrumb.apiIntegrations')}</span>
            </nav>
          </div>
        </section>

        {/* Category Header */}
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
                {t('header.backToHelp')}
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-3">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-orange-400 text-sm font-medium">Category</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {t('header.title')}
                  </h1>
                </div>
              </div>

              <h2 className="text-xl text-gray-400 mb-8">
                {t('header.subtitle')}
              </h2>

              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{categoryArticles.length} articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{t('header.lastUpdated')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* Main Intro */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">{t('sections.mainIntro.title')}</h2>
                <p className="text-gray-300 text-lg">
                  {t('sections.mainIntro.description')}
                </p>
              </div>

              {/* Getting Started */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">{t('sections.gettingStarted.title')}</h3>
                <p className="text-gray-300 mb-6">
                  {t('sections.gettingStarted.description')}
                </p>

                <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🔑 {t('sections.gettingStarted.requirements.title')}
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-blue-400">✓</span>
                      <p className="text-gray-300"><strong>{t('sections.gettingStarted.requirements.apiKey.title')}:</strong> {t('sections.gettingStarted.requirements.apiKey.description')}</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400">✓</span>
                      <p className="text-gray-300"><strong>{t('sections.gettingStarted.requirements.rateLimits.title')}:</strong> {t('sections.gettingStarted.requirements.rateLimits.description')}</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400">✓</span>
                      <p className="text-gray-300"><strong>{t('sections.gettingStarted.requirements.httpsOnly.title')}:</strong> {t('sections.gettingStarted.requirements.httpsOnly.description')}</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400">✓</span>
                      <p className="text-gray-300"><strong>{t('sections.gettingStarted.requirements.jsonFormat.title')}:</strong> {t('sections.gettingStarted.requirements.jsonFormat.description')}</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Core Endpoints */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">{t('sections.coreEndpoints.title')}</h3>
                <p className="text-gray-300 mb-6">
                  {t('sections.coreEndpoints.description')}
                </p>

                <div className="space-y-4">
                  {/* Audit API */}
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">🔍 {t('sections.coreEndpoints.auditApi.title')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex gap-2">
                        <span className="text-indigo-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>{t('sections.coreEndpoints.auditApi.features.siteAudit.title')}:</strong> {t('sections.coreEndpoints.auditApi.features.siteAudit.description')}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-indigo-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>{t('sections.coreEndpoints.auditApi.features.pageAnalysis.title')}:</strong> {t('sections.coreEndpoints.auditApi.features.pageAnalysis.description')}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-indigo-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>{t('sections.coreEndpoints.auditApi.features.crawlerControl.title')}:</strong> {t('sections.coreEndpoints.auditApi.features.crawlerControl.description')}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-indigo-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>{t('sections.coreEndpoints.auditApi.features.reports.title')}:</strong> {t('sections.coreEndpoints.auditApi.features.reports.description')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Keyword API */}
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">📊 {t('sections.coreEndpoints.keywordApi.title')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex gap-2">
                        <span className="text-emerald-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>{t('sections.coreEndpoints.keywordApi.features.discovery.title')}:</strong> {t('sections.coreEndpoints.keywordApi.features.discovery.description')}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-emerald-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>{t('sections.coreEndpoints.keywordApi.features.serpAnalysis.title')}:</strong> {t('sections.coreEndpoints.keywordApi.features.serpAnalysis.description')}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-emerald-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>{t('sections.coreEndpoints.keywordApi.features.competitorKeywords.title')}:</strong> {t('sections.coreEndpoints.keywordApi.features.competitorKeywords.description')}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-emerald-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>{t('sections.coreEndpoints.keywordApi.features.longTail.title')}:</strong> {t('sections.coreEndpoints.keywordApi.features.longTail.description')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Backlink API */}
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">🔗 {t('sections.coreEndpoints.backlinkApi.title')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex gap-2">
                        <span className="text-orange-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>{t('sections.coreEndpoints.backlinkApi.features.discovery.title')}:</strong> {t('sections.coreEndpoints.backlinkApi.features.discovery.description')}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-orange-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>{t('sections.coreEndpoints.backlinkApi.features.qualityScoring.title')}:</strong> {t('sections.coreEndpoints.backlinkApi.features.qualityScoring.description')}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-orange-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>{t('sections.coreEndpoints.backlinkApi.features.competitorCompare.title')}:</strong> {t('sections.coreEndpoints.backlinkApi.features.competitorCompare.description')}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-orange-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>{t('sections.coreEndpoints.backlinkApi.features.monitoring.title')}:</strong> {t('sections.coreEndpoints.backlinkApi.features.monitoring.description')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Features */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">{t('sections.advancedFeatures.title')}</h3>
                <p className="text-gray-300 mb-6">
                  {t('sections.advancedFeatures.description')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-5">
                    <h4 className="text-purple-300 font-semibold mb-3 flex items-center gap-2">⚡ {t('sections.advancedFeatures.webhooks.title')}</h4>
                    <ul className="space-y-2">
                      <li className="text-gray-300 text-sm">{t('sections.advancedFeatures.webhooks.features.realTime')}</li>
                      <li className="text-gray-300 text-sm">{t('sections.advancedFeatures.webhooks.features.automatedWorkflows')}</li>
                      <li className="text-gray-300 text-sm">{t('sections.advancedFeatures.webhooks.features.customCallbacks')}</li>
                      <li className="text-gray-300 text-sm">{t('sections.advancedFeatures.webhooks.features.retryLogic')}</li>
                    </ul>
                  </div>
                  <div className="bg-pink-600/10 border border-pink-500/30 rounded-lg p-5">
                    <h4 className="text-pink-300 font-semibold mb-3 flex items-center gap-2">🏷️ {t('sections.advancedFeatures.whiteLabel.title')}</h4>
                    <ul className="space-y-2">
                      <li className="text-gray-300 text-sm">{t('sections.advancedFeatures.whiteLabel.features.customBranding')}</li>
                      <li className="text-gray-300 text-sm">{t('sections.advancedFeatures.whiteLabel.features.apiReselling')}</li>
                      <li className="text-gray-300 text-sm">{t('sections.advancedFeatures.whiteLabel.features.customDomains')}</li>
                      <li className="text-gray-300 text-sm">{t('sections.advancedFeatures.whiteLabel.features.prioritySupport')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SDKs */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">{t('sections.sdks.title')}</h3>
                <p className="text-gray-300 mb-6">
                  {t('sections.sdks.description')}
                </p>

                <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    💻 {t('sections.sdks.available.title')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold min-w-fit">{t('sections.sdks.languages.js.label')}</span>
                      <p className="text-gray-300">{t('sections.sdks.languages.js.description')}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold min-w-fit">{t('sections.sdks.languages.python.label')}</span>
                      <p className="text-gray-300">{t('sections.sdks.languages.python.description')}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold min-w-fit">{t('sections.sdks.languages.php.label')}</span>
                      <p className="text-gray-300">{t('sections.sdks.languages.php.description')}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold min-w-fit">{t('sections.sdks.languages.java.label')}</span>
                      <p className="text-gray-300">{t('sections.sdks.languages.java.description')}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold min-w-fit">{t('sections.sdks.languages.go.label')}</span>
                      <p className="text-gray-300">{t('sections.sdks.languages.go.description')}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold min-w-fit">{t('sections.sdks.languages.ruby.label')}</span>
                      <p className="text-gray-300">{t('sections.sdks.languages.ruby.description')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rate Limits */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">{t('sections.rateLimits.title')}</h3>
                <p className="text-gray-300 mb-6">
                  {t('sections.rateLimits.description')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-5">
                    <h4 className="text-blue-300 font-semibold mb-3">{t('sections.rateLimits.tiers.free.title')}</h4>
                    <div className="text-gray-300 text-sm space-y-1">
                      <div>{t('sections.rateLimits.tiers.free.requestsPerHour')}</div>
                      <div>{t('sections.rateLimits.tiers.free.requestsPerMonth')}</div>
                    </div>
                  </div>
                  <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-5">
                    <h4 className="text-emerald-300 font-semibold mb-3">{t('sections.rateLimits.tiers.pro.title')}</h4>
                    <div className="text-gray-300 text-sm space-y-1">
                      <div>{t('sections.rateLimits.tiers.pro.requestsPerHour')}</div>
                      <div>{t('sections.rateLimits.tiers.pro.requestsPerMonth')}</div>
                    </div>
                  </div>
                  <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-5">
                    <h4 className="text-purple-300 font-semibold mb-3">{t('sections.rateLimits.tiers.agency.title')}</h4>
                    <div className="text-gray-300 text-sm space-y-1">
                      <div>{t('sections.rateLimits.tiers.agency.requestsPerHour')}</div>
                      <div>{t('sections.rateLimits.tiers.agency.requestsPerMonth')}</div>
                    </div>
                  </div>
                  <div className="bg-pink-600/10 border border-pink-500/30 rounded-lg p-5">
                    <h4 className="text-pink-300 font-semibold mb-3">{t('sections.rateLimits.tiers.enterprise.title')}</h4>
                    <div className="text-gray-300 text-sm space-y-1">
                      <div>{t('sections.rateLimits.tiers.enterprise.customLimits')}</div>
                      <div>{t('sections.rateLimits.tiers.enterprise.dedicatedInfrastructure')}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">{t('sections.security.title')}</h3>
                <p className="text-gray-300 mb-6">
                  {t('sections.security.description')}
                </p>

                <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🔒 {t('sections.security.features.title')}
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-red-400">✓</span>
                      <p className="text-gray-300"><strong>{t('sections.security.features.oauth.title')}:</strong> {t('sections.security.features.oauth.description')}</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-400">✓</span>
                      <p className="text-gray-300"><strong>{t('sections.security.features.keyRotation.title')}:</strong> {t('sections.security.features.keyRotation.description')}</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-400">✓</span>
                      <p className="text-gray-300"><strong>{t('sections.security.features.auditLogging.title')}:</strong> {t('sections.security.features.auditLogging.description')}</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-400">✓</span>
                      <p className="text-gray-300"><strong>{t('sections.security.features.gdpr.title')}:</strong> {t('sections.security.features.gdpr.description')}</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-400">✓</span>
                      <p className="text-gray-300"><strong>{t('sections.security.features.soc2.title')}:</strong> {t('sections.security.features.soc2.description')}</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Developer Resources */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">{t('sections.documentation.title')}</h3>
                <p className="text-gray-300 mb-6">
                  {t('sections.documentation.description')}
                </p>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">📖</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{t('sections.documentation.items.explorer.title')}</h4>
                      <p className="text-gray-300 text-sm">{t('sections.documentation.items.explorer.description')}</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{t('sections.documentation.items.examples.title')}</h4>
                      <p className="text-gray-300 text-sm">{t('sections.documentation.items.examples.description')}</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">🎥</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{t('sections.documentation.items.tutorials.title')}</h4>
                      <p className="text-gray-300 text-sm">{t('sections.documentation.items.tutorials.description')}</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">👥</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{t('sections.documentation.items.forums.title')}</h4>
                      <p className="text-gray-300 text-sm">{t('sections.documentation.items.forums.description')}</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">🎧</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{t('sections.documentation.items.support.title')}</h4>
                      <p className="text-gray-300 text-sm">{t('sections.documentation.items.support.description')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">{t('sections.useCases.title')}</h3>
                <p className="text-gray-300 mb-6">
                  {t('sections.useCases.description')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">{t('sections.useCases.items.agencies.title')}</h4>
                    <p className="text-gray-300 text-sm">{t('sections.useCases.items.agencies.description')}</p>
                  </div>
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">{t('sections.useCases.items.cms.title')}</h4>
                    <p className="text-gray-300 text-sm">{t('sections.useCases.items.cms.description')}</p>
                  </div>
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">{t('sections.useCases.items.ecommerce.title')}</h4>
                    <p className="text-gray-300 text-sm">{t('sections.useCases.items.ecommerce.description')}</p>
                  </div>
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">{t('sections.useCases.items.automation.title')}</h4>
                    <p className="text-gray-300 text-sm">{t('sections.useCases.items.automation.description')}</p>
                  </div>
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">{t('sections.useCases.items.monitoring.title')}</h4>
                    <p className="text-gray-300 text-sm">{t('sections.useCases.items.monitoring.description')}</p>
                  </div>
                </div>
              </div>

              {/* Closing CTA */}
              <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700/50">
                <h3 className="text-2xl font-bold text-white mb-4">{t('sections.closing.title')}</h3>
                <p className="text-gray-300 mb-4">
                  {t('sections.closing.description1')}
                </p>
                <p className="text-gray-300">
                  {t('sections.closing.description2')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {categoryArticles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300"
                >
                  <Link href={article.href} className="block">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-2 flex-shrink-0">
                          <article.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-400 mb-4">
                            {article.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{article.time} read</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-orange-400 transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* API Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">{t('sections.apiResources.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/help/api/authentication"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-orange-400 transition-colors">{t('sections.apiResources.items.authentication.title')}</div>
                    <div className="text-gray-400 text-sm">{t('sections.apiResources.items.authentication.description')}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
                </Link>
                <Link
                  href="/status"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-orange-400 transition-colors">{t('sections.apiResources.items.status.title')}</div>
                    <div className="text-gray-400 text-sm">{t('sections.apiResources.items.status.description')}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
                </Link>
              </div>
            </motion.div>

            {/* Related Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">{t('sections.relatedCategories.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/help/troubleshooting"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-yellow-400 transition-colors">{t('sections.relatedCategories.items.troubleshooting.title')}</div>
                    <div className="text-gray-400 text-sm">{t('sections.relatedCategories.items.troubleshooting.description')}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 transition-colors" />
                </Link>
                <Link
                  href="/help/seo-tools-features"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-blue-400 transition-colors">{t('sections.relatedCategories.items.tools.title')}</div>
                    <div className="text-gray-400 text-sm">{t('sections.relatedCategories.items.tools.description')}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </Link>
              </div>
            </motion.div>

            {/* Need More Help */}
            <div
              className="mt-12 bg-orange-500/10 border border-orange-500/20 rounded-xl p-8 text-center"
            >
              <h3 className="text-white text-xl font-bold mb-4">{t('sections.needHelp.title')}</h3>
              <p className="text-gray-400 mb-6">
                {t('sections.needHelp.description')}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/contact"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {t('sections.needHelp.developerSupport')}
                </Link>
                <Link
                  href="/help"
                  className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {t('sections.needHelp.browseAllHelp')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}