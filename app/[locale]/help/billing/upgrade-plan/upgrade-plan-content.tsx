'use client';

import { useTranslations } from 'next-intl';
import { MainLayout } from '@/components/layout/main-layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, CreditCard, CheckCircle, Clock, Star } from 'lucide-react';

export default function UpgradePlanContent() {
  const t = useTranslations('helpCenter.categories.upgradePlan');

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
              <Link href="/help/billing" className="text-gray-400 hover:text-white transition-colors">
                {t('breadcrumb.billing')}
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">{t('breadcrumb.upgradePlan')}</span>
            </nav>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/help/billing"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t('backToBilling')}
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-white mb-4">{t('title')}</h1>
              <p className="text-xl text-gray-300 max-w-3xl">{t('subtitle')}</p>
            </motion.div>
          </div>

          {/* Benefits of Upgrading Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-800">
              <div className="flex items-start gap-4 mb-6">
                <TrendingUp className="w-8 h-8 text-green-400 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('benefits.title')}</h2>
                  <p className="text-gray-300 mb-6">{t('benefits.description')}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {t.raw('benefits.features').map((feature: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <feature.icon className="w-6 h-6 text-green-400" />
                      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    </div>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* How to Upgrade Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-800">
              <div className="flex items-start gap-4 mb-6">
                <CreditCard className="w-8 h-8 text-blue-400 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('howToUpgrade.title')}</h2>
                  <p className="text-gray-300 mb-6">{t('howToUpgrade.description')}</p>
                </div>
              </div>

              <div className="space-y-6">
                {t.raw('howToUpgrade.steps').map((step: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-slate-800/30 rounded-lg border border-slate-700"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-300 mb-4">{step.description}</p>
                      {step.details && (
                        <div className="space-y-2">
                          {step.details.map((detail: string, detailIndex: number) => (
                            <div key={detailIndex} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                              <p className="text-gray-300 text-sm">{detail}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Billing Changes Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-800">
              <div className="flex items-start gap-4 mb-6">
                <Clock className="w-8 h-8 text-purple-400 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('billingChanges.title')}</h2>
                  <p className="text-gray-300 mb-6">{t('billingChanges.description')}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {t.raw('billingChanges.scenarios').map((scenario: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <scenario.icon className="w-6 h-6 text-purple-400" />
                      <h3 className="text-lg font-semibold text-white">{scenario.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-3">{scenario.description}</p>
                    <div className="text-sm text-gray-400">
                      <strong className="text-white">{scenario.billing}</strong>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Premium Features Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-800">
              <div className="flex items-start gap-4 mb-6">
                <Star className="w-8 h-8 text-yellow-400 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('premiumFeatures.title')}</h2>
                  <p className="text-gray-300 mb-6">{t('premiumFeatures.description')}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {t.raw('premiumFeatures.features').map((feature: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 text-center"
                  >
                    <feature.icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </MainLayout>
  );
}