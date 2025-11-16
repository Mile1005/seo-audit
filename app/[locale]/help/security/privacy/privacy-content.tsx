"use client"

import { useTranslations } from 'next-intl'
import { MainLayout } from '@/components/layout/main-layout'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyContent() {
  const t = useTranslations('helpCenter.categories.privacy')

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
              <Link href="/help/security" className="text-gray-400 hover:text-white transition-colors">
                {t('breadcrumb.security')}
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">{t('breadcrumb.privacy')}</span>
            </nav>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/help/security"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t('backToSecurity')}
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

          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-slate-800/50 rounded-xl p-8 mb-8 border border-slate-700"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              {t('introduction.title')}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {t('introduction.description')}
            </p>
          </motion.section>

          {/* Privacy Controls */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('privacyControls.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {t.raw('privacyControls.settings').map((setting: any, index: number) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {setting.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {setting.description}
                    </p>
                    <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      {setting.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Data Usage */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('dataUsage.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {t('dataUsage.description')}
              </p>
              <div className="space-y-4">
                {t.raw('dataUsage.purposes').map((purpose: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{purpose}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Data Retention */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('dataRetention.title')}
              </h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                <p className="text-yellow-800 dark:text-yellow-300">
                  {t('dataRetention.policy')}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Your Rights */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('yourRights.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {t.raw('yourRights.rights').map((right: string, index: number) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300">{right}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Contact Support */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('contactSupport.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                {t('contactSupport.description')}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                {t('contactSupport.buttonText')}
              </button>
            </div>
          </motion.section>
        </div>
      </div>
    </MainLayout>
  )
}