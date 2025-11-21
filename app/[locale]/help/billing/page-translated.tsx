"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BookOpen, CreditCard, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function AccountBillingPage() {
  const t = useTranslations('help.categories.accountBilling')

  const categoryArticles = [
    {
      title: t('articles.upgradePlan.title'),
      href: t('articles.upgradePlan.href'),
      time: t('articles.upgradePlan.time'),
      description: t('articles.upgradePlan.description'),
      icon: BookOpen
    },
    {
      title: t('articles.paymentMethods.title'),
      href: t('articles.paymentMethods.href'),
      time: t('articles.paymentMethods.time'),
      description: t('articles.paymentMethods.description'),
      icon: CreditCard
    },
    {
      title: t('articles.invoices.title'),
      href: t('articles.invoices.href'),
      time: t('articles.invoices.time'),
      description: t('articles.invoices.description'),
      icon: BookOpen
    },
    {
      title: t('articles.cancellation.title'),
      href: t('articles.cancellation.href'),
      time: t('articles.cancellation.time'),
      description: t('articles.cancellation.description'),
      icon: BookOpen
    }
  ]

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
              {t('backToHelp')}
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              {t('subtitle')}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('accountManagement.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/dashboard"
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t('accountManagement.accessDashboard.title')}</h3>
                    <p className="text-blue-100">{t('accountManagement.accessDashboard.description')}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link
                href="/pricing"
                className="group bg-white border-2 border-gray-200 text-gray-900 p-6 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t('accountManagement.viewPlans.title')}</h3>
                    <p className="text-gray-600">{t('accountManagement.viewPlans.description')}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {categoryArticles.map((article, index) => (
              <motion.div
                key={article.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={article.href}
                  className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <article.icon className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.time}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{article.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Billing Information */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('billingFAQ.title')}</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('billingFAQ.whenCharged.question')}</h3>
                <p className="text-gray-600">
                  {t('billingFAQ.whenCharged.answer')}
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('billingFAQ.changePlans.question')}</h3>
                <p className="text-gray-600">
                  {t('billingFAQ.changePlans.answer')}
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('billingFAQ.paymentMethods.question')}</h3>
                <p className="text-gray-600">
                  {t('billingFAQ.paymentMethods.answer')}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('additionalResources.title')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/help/security"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">{t('additionalResources.securityPrivacy.title')}</h3>
                <p className="text-sm text-gray-600">{t('additionalResources.securityPrivacy.description')}</p>
              </Link>
              <Link
                href="/help/api/api-integrations"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <ArrowRight className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">{t('additionalResources.apiIntegrations.title')}</h3>
                <p className="text-sm text-gray-600">{t('additionalResources.apiIntegrations.description')}</p>
              </Link>
              <Link
                href="/contact"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">{t('additionalResources.contactSupport.title')}</h3>
                <p className="text-sm text-gray-600">{t('additionalResources.contactSupport.description')}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}