"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { StructuredData, generateHowToSchema } from '@/components/seo/StructuredData'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, Lightbulb, AlertTriangle, Target } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function FirstAuditContent() {
  const t = useTranslations('help.first-audit')

  const howToSchema = generateHowToSchema({
    name: "How to Create Your First SEO Audit",
    description: "Run Your First Audit. Step-by-step guide to analyzing your site, finding errors, and improving health scores with AI SEO Turbo. Start now.",
    totalTime: "PT5M", // 5 minutes
    url: "https://www.aiseoturbo.com/help/getting-started/first-audit",
    datePublished: "2025-03-01T10:00:00+00:00",
    steps: [
      {
        name: "Enter your website URL",
        text: "Navigate to the SEO Audit tool and enter your website's URL in the input field. Make sure to include the full URL including 'https://' or 'http://'."
      },
      {
        name: "Configure audit settings",
        text: "Choose your audit preferences: Enable Mobile Analysis for mobile-first indexing insights, add up to 3 competitor URLs for Competitor Analysis, and enable Deep Crawl to analyze up to 100 pages (Pro feature)."
      },
      {
        name: "Start the audit",
        text: "Click the 'Start Audit' button and wait for the AI to analyze your website. This typically takes 2-5 minutes depending on your site's size."
      },
      {
        name: "Review your results",
        text: "Once complete, review your SEO score and detailed analysis. Results are organized into categories: Passed (Green) for items your site handles well, Warnings (Yellow) for areas needing attention, Errors (Red) for critical issues to fix immediately, and Info (Blue) for additional insights."
      }
    ]
  });

  return (
    <MainLayout>
      <StructuredData data={howToSchema} />
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumb */}
        <section className="bg-slate-900/50 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: t('breadcrumb.home'), url: 'https://www.aiseoturbo.com' },
                { name: t('breadcrumb.help'), url: 'https://www.aiseoturbo.com/help' },
                { name: t('breadcrumb.gettingStarted'), url: 'https://www.aiseoturbo.com/help/getting-started' },
                { name: t('breadcrumb.firstAudit'), url: 'https://www.aiseoturbo.com/help/getting-started/first-audit' }
              ]}
              includeHome={false}
              darkMode={true}
            />
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
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {t('backToHelp')}
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">{t('header.category')}</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {t('header.title')}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{t('header.readTime')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{t('header.lastUpdated')}</span>
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
                  <Target className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">{t('intro.title')}</h2>
                    <p className="text-gray-300 mb-0">
                      {t('intro.description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step-by-step Guide */}
              <h2 className="text-2xl font-bold text-white mb-6">{t('stepByStepTitle')}</h2>

              <div className="space-y-8">

                {/* Step 1 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">{t('steps.1.title')}</h3>
                      <p className="text-gray-300 mb-4">
                        {t('steps.1.description')}
                      </p>
                      <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                        <code className="text-green-400">{t('steps.1.example')}</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">{t('steps.2.title')}</h3>
                      <p className="text-gray-300 mb-4">
                        {t('steps.2.description')}
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        {t.raw('steps.2.options').map((option: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>{option}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">{t('steps.3.title')}</h3>
                      <p className="text-gray-300 mb-4">
                        {t('steps.3.description')}
                      </p>
                      <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="text-blue-300">{t('steps.3.status')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">{t('steps.4.title')}</h3>
                      <p className="text-gray-300 mb-4">
                        {t('steps.4.description')}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-3">
                          <h4 className="text-green-400 font-medium">{t('steps.4.categories.passed.title')}</h4>
                          <p className="text-gray-300 text-sm">{t('steps.4.categories.passed.description')}</p>
                        </div>
                        <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-3">
                          <h4 className="text-yellow-400 font-medium">{t('steps.4.categories.warnings.title')}</h4>
                          <p className="text-gray-300 text-sm">{t('steps.4.categories.warnings.description')}</p>
                        </div>
                        <div className="bg-red-900/30 border border-red-600/30 rounded-lg p-3">
                          <h4 className="text-red-400 font-medium">{t('steps.4.categories.errors.title')}</h4>
                          <p className="text-gray-300 text-sm">{t('steps.4.categories.errors.description')}</p>
                        </div>
                        <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-3">
                          <h4 className="text-blue-400 font-medium">{t('steps.4.categories.info.title')}</h4>
                          <p className="text-gray-300 text-sm">{t('steps.4.categories.info.description')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6 mt-12">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-yellow-400 text-lg font-semibold mb-2">{t('proTips.title')}</h3>
                    <ul className="space-y-2 text-gray-300">
                      {t.raw('proTips.tips').map((tip: string, index: number) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <h3 className="text-2xl font-bold text-white mt-12 mb-6">{t('nextSteps.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.raw('nextSteps.articles').map((article: any, index: number) => (
                  <Link
                    key={index}
                    href={article.href}
                    className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                  >
                    <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {article.description}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}