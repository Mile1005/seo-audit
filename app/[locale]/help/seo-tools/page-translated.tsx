"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BookOpen, Search, TrendingUp, Globe, Bot, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function SEOToolsPage() {
  const t = useTranslations('help.categories.seoTools')

  const categoryArticles = [
    {
      title: t('articles.seoAudit.title'),
      href: t('articles.seoAudit.href'),
      time: t('articles.seoAudit.time'),
      description: t('articles.seoAudit.description'),
      icon: Search
    },
    {
      title: t('articles.competitorAnalysis.title'),
      href: t('articles.competitorAnalysis.href'),
      time: t('articles.competitorAnalysis.time'),
      description: t('articles.competitorAnalysis.description'),
      icon: TrendingUp
    },
    {
      title: t('articles.siteCrawler.title'),
      href: t('articles.siteCrawler.href'),
      time: t('articles.siteCrawler.time'),
      description: t('articles.siteCrawler.description'),
      icon: Globe
    },
    {
      title: t('articles.aiAssistant.title'),
      href: t('articles.aiAssistant.href'),
      time: t('articles.aiAssistant.time'),
      description: t('articles.aiAssistant.description'),
      icon: Bot
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

          {/* Additional Resources */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('additionalResources.title')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/features/keyword-tracking"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">{t('additionalResources.keywordTracking.title')}</h3>
                <p className="text-sm text-gray-600">{t('additionalResources.keywordTracking.description')}</p>
              </Link>
              <Link
                href="/dashboard/backlinks"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">{t('additionalResources.backlinkAnalysis.title')}</h3>
                <p className="text-sm text-gray-600">{t('additionalResources.backlinkAnalysis.description')}</p>
              </Link>
              <Link
                href="/contact"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <ArrowLeft className="w-8 h-8 text-blue-600 mx-auto mb-2" />
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