"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { motion } from 'framer-motion'
import { CheckCircle, Settings, Target, Monitor, Smartphone, Palette, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function DashboardSetupContent() {
  const t = useTranslations('help.dashboard-setup')
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumb */}
        <section className="bg-slate-900/50 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: t('breadcrumb.home'), url: 'https://www.aiseoturbo.com' },
                { name: t('breadcrumb.help'), url: 'https://www.aiseoturbo.com/help' },
                { name: t('breadcrumb.gettingStarted'), url: 'https://www.aiseoturbo.com/help/getting-started' },
                { name: t('breadcrumb.dashboardSetup'), url: 'https://www.aiseoturbo.com/help/getting-started/dashboard-setup' }
              ]}
              darkMode={true}
              includeHome={false}
            />
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
            >

              <h1 className="text-3xl font-bold text-white mb-6">{t('header.title')}</h1>

              {/* Introduction */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Target className="w-6 h-6 text-blue-400 mt-1" aria-hidden="true" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">{t('intro.title')}</h2>
                    <p className="text-gray-300 mb-0">
                      {t('intro.description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step-by-step Guide */}
              <h2 className="text-2xl font-bold text-white mb-6">Dashboard customization guide</h2>

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
                      <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 mb-4">
                        <h4 className="text-green-400 font-medium mb-2">{t('steps.1.tip.title')}</h4>
                        <p className="text-gray-300 text-sm mb-0">
                          {t('steps.1.tip.description')}
                        </p>
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {t.raw('steps.2.layouts').map((layout: any, index: number) => (
                          <div key={index} className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              {index === 0 && <Monitor className="w-5 h-5 text-blue-400" aria-hidden="true" />}
                              {index === 1 && <Smartphone className="w-5 h-5 text-green-400" aria-hidden="true" />}
                              {index === 2 && <Palette className="w-5 h-5 text-purple-400" aria-hidden="true" />}
                              <h4 className="text-white font-medium">{layout.name}</h4>
                            </div>
                            <p className="text-gray-300 text-sm">{layout.description}</p>
                          </div>
                        ))}
                      </div>
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
                      <div className="space-y-3">
                        {t.raw('steps.3.notifications').map((notification: any, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
                            <CheckCircle className={`w-5 h-5 mt-0.5 ${index === 0 ? 'text-green-400' : index === 1 ? 'text-yellow-400' : 'text-blue-400'}`} aria-hidden="true" />
                            <div>
                              <h4 className="text-white font-medium">{notification.name}</h4>
                              <p className="text-gray-400 text-sm">{notification.description}</p>
                            </div>
                          </div>
                        ))}
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
                      <ul className="space-y-2 text-gray-300">
                        {t.raw('steps.4.features').map((feature: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                            <span dangerouslySetInnerHTML={{ __html: feature }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Tips */}
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-6 mt-12">
                <div className="flex items-start gap-4">
                  <Settings className="w-6 h-6 text-blue-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-blue-400 text-lg font-semibold mb-2">{t('advancedTips.title')}</h3>
                    <ul className="space-y-2 text-gray-300">
                      {t.raw('advancedTips.tips').map((tip: string, index: number) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: `• ${tip}` }} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6 mt-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-yellow-400 text-lg font-semibold mb-4">{t('faq.title')}</h3>
                    <div className="space-y-4">
                      {t.raw('faq.questions').map((item: any, index: number) => (
                        <div key={index}>
                          <h4 className="text-white font-medium">{item.question}</h4>
                          <p className="text-gray-300 text-sm">{item.answer}</p>
                        </div>
                      ))}
                    </div>
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
                    aria-label={`Learn about ${article.title.toLowerCase()}`}
                  >
                    <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h4>
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