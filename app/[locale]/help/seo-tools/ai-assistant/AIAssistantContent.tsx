'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import {
  ArrowLeft,
  Bot,
  MessageSquare,
  Lightbulb,
  Target,
  Zap,
  Brain,
  CheckCircle,
  Sparkles,
  TrendingUp
} from 'lucide-react'

export default function AIAssistantContent() {
  const t = useTranslations('help.categories.seoTools.articles.aiAssistant')

  const breadcrumbItems = [
    { name: t('breadcrumb.help'), url: '/help' },
    { name: t('breadcrumb.seoTools'), url: '/help/seo-tools' },
    { name: t('breadcrumb.aiAssistant'), url: '/help/seo-tools/ai-assistant' }
  ]

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={breadcrumbItems}
            className="mb-6"
            includeHome={true}
            darkMode={false}
          />

          {/* Header */}
          <div className="mb-8">
            <Link
              href="/help"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToHelp')}
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('header.title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              {t('header.description')}
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <Brain className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('intro.title')}</h2>
                <p className="text-gray-600">
                  {t('intro.description')}
                </p>
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">{t('capabilities.keywordResearch.title')}</h3>
                <p className="text-sm text-gray-600">{t('capabilities.keywordResearch.description')}</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Lightbulb className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">{t('capabilities.contentOptimization.title')}</h3>
                <p className="text-sm text-gray-600">{t('capabilities.contentOptimization.description')}</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">{t('capabilities.technicalSEO.title')}</h3>
                <p className="text-sm text-gray-600">{t('capabilities.technicalSEO.description')}</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">{t('capabilities.strategyDevelopment.title')}</h3>
                <p className="text-sm text-gray-600">{t('capabilities.strategyDevelopment.description')}</p>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('bestPractices.title')}</h2>

            <div className="space-y-8">
              {/* Be Specific */}
              <div className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('bestPractices.beSpecific.title')}</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {t('bestPractices.beSpecific.description')}
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">{t('bestPractices.beSpecific.examplesTitle')}</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• {t('bestPractices.beSpecific.example1')}</li>
                    <li>• {t('bestPractices.beSpecific.example2')}</li>
                    <li>• {t('bestPractices.beSpecific.example3')}</li>
                  </ul>
                </div>
              </div>

              {/* Provide Context */}
              <div className="border-l-4 border-green-500 pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('bestPractices.provideContext.title')}</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {t('bestPractices.provideContext.description')}
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">{t('bestPractices.provideContext.includeTitle')}</h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• {t('bestPractices.provideContext.item1')}</li>
                    <li>• {t('bestPractices.provideContext.item2')}</li>
                    <li>• {t('bestPractices.provideContext.item3')}</li>
                    <li>• {t('bestPractices.provideContext.item4')}</li>
                  </ul>
                </div>
              </div>

              {/* Ask Follow-up Questions */}
              <div className="border-l-4 border-purple-500 pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('bestPractices.followUp.title')}</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {t('bestPractices.followUp.description')}
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">{t('bestPractices.followUp.strategiesTitle')}</h4>
                  <ul className="space-y-2 text-sm text-purple-800">
                    <li>• {t('bestPractices.followUp.strategy1')}</li>
                    <li>• {t('bestPractices.followUp.strategy2')}</li>
                    <li>• {t('bestPractices.followUp.strategy3')}</li>
                    <li>• {t('bestPractices.followUp.strategy4')}</li>
                  </ul>
                </div>
              </div>

              {/* Combine AI with Expertise */}
              <div className="border-l-4 border-orange-500 pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold">4</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('bestPractices.combineExpertise.title')}</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {t('bestPractices.combineExpertise.description')}
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">{t('bestPractices.combineExpertise.bestApproachTitle')}</h4>
                  <ul className="space-y-2 text-sm text-orange-800">
                    <li>• {t('bestPractices.combineExpertise.approach1')}</li>
                    <li>• {t('bestPractices.combineExpertise.approach2')}</li>
                    <li>• {t('bestPractices.combineExpertise.approach3')}</li>
                    <li>• {t('bestPractices.combineExpertise.approach4')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Common Use Cases */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('useCases.title')}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <MessageSquare className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('useCases.contentStrategy.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('useCases.contentStrategy.description')}
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• {t('useCases.contentStrategy.item1')}</li>
                  <li>• {t('useCases.contentStrategy.item2')}</li>
                  <li>• {t('useCases.contentStrategy.item3')}</li>
                  <li>• {t('useCases.contentStrategy.item4')}</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <Target className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('useCases.technicalSEO.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('useCases.technicalSEO.description')}
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• {t('useCases.technicalSEO.item1')}</li>
                  <li>• {t('useCases.technicalSEO.item2')}</li>
                  <li>• {t('useCases.technicalSEO.item3')}</li>
                  <li>• {t('useCases.technicalSEO.item4')}</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('useCases.competitorAnalysis.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('useCases.competitorAnalysis.description')}
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• {t('useCases.competitorAnalysis.item1')}</li>
                  <li>• {t('useCases.competitorAnalysis.item2')}</li>
                  <li>• {t('useCases.competitorAnalysis.item3')}</li>
                  <li>• {t('useCases.competitorAnalysis.item4')}</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <Sparkles className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('useCases.performanceOptimization.title')}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('useCases.performanceOptimization.description')}
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• {t('useCases.performanceOptimization.item1')}</li>
                  <li>• {t('useCases.performanceOptimization.item2')}</li>
                  <li>• {t('useCases.performanceOptimization.item3')}</li>
                  <li>• {t('useCases.performanceOptimization.item4')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tips for Success */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">{t('tipsForSuccess.title')}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-3">{t('tipsForSuccess.dos.title')}</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{t('tipsForSuccess.dos.item1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{t('tipsForSuccess.dos.item2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{t('tipsForSuccess.dos.item3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{t('tipsForSuccess.dos.item4')}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-3">{t('tipsForSuccess.donts.title')}</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{t('tipsForSuccess.donts.item1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{t('tipsForSuccess.donts.item2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{t('tipsForSuccess.donts.item3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{t('tipsForSuccess.donts.item4')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('gettingStarted.title')}</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('gettingStarted.step1.title')}</h3>
                  <p className="text-gray-600">{t('gettingStarted.step1.description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('gettingStarted.step2.title')}</h3>
                  <p className="text-gray-600">{t('gettingStarted.step2.description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('gettingStarted.step3.title')}</h3>
                  <p className="text-gray-600">{t('gettingStarted.step3.description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('gettingStarted.step4.title')}</h3>
                  <p className="text-gray-600">{t('gettingStarted.step4.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}