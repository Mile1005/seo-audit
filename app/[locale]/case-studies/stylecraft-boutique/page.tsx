'use client'

import { MainLayout } from "@/components/layout/main-layout"
import { Breadcrumbs } from "@/components/navigation/breadcrumbs"
import { StructuredData, generateCaseStudySchema } from "@/components/seo/StructuredData"
import { useTranslations } from 'next-intl'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  Award,
  BarChart3,
  Zap,
  Globe,
  ArrowLeft,
  Share2,
  Download,
  ExternalLink,
  ShoppingCart,
  Package,
  CreditCard,
  Search,
  Crown
} from "lucide-react"

// SEO metadata for reference (not exported in client components)
const pageMetadata = {
  title: 'E-commerce SEO - 420% Sales Growth | AI SEO Turbo',
  description: 'E-commerce fashion boutique case study: 280% organic traffic growth, 300+ ranked product pages, 420% conversion increase with AI-powered SEO.',
  keywords: [
    'ecommerce SEO case study',
    'product page optimization',
    'online store SEO',
    'fashion boutique SEO',
    'conversion rate optimization',
    'product ranking SEO',
    'retail SEO success'
  ],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/case-studies/stylecraft-boutique'
  },
  openGraph: {
    images: ['/logo.png'],
    url: 'https://www.aiseoturbo.com/case-studies/stylecraft-boutique',
    siteName: 'AI SEO Turbo',
    title: 'E-commerce SEO Case Study - 420% Sales Increase StyleCraft Boutique | AI SEO Turbo',
    description: 'E-commerce fashion boutique case study: 280% organic traffic growth, 300+ ranked product pages, 420% conversion increase with AI-powered SEO.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-commerce SEO Case Study - 420% Sales Increase StyleCraft Boutique | AI SEO Turbo',
    description: 'E-commerce fashion boutique case study: 280% organic traffic growth, 300+ ranked product pages, 420% conversion increase with AI-powered SEO.',
  }
}

export default function StyleCraftBoutiqueCaseStudy() {
  const t = useTranslations('caseStudies.stylecraftBoutique')
  const tBreadcrumbs = useTranslations('caseStudies.breadcrumbs')

  const challengePoints = [
    t('challengePoints.0'),
    t('challengePoints.1'),
    t('challengePoints.2'),
    t('challengePoints.3'),
    t('challengePoints.4')
  ]

  const solutionSteps = [
    {
      title: t('solutionSteps.0.title'),
      description: t('solutionSteps.0.description'),
      icon: Package
    },
    {
      title: t('solutionSteps.1.title'),
      description: t('solutionSteps.1.description'),
      icon: Zap
    },
    {
      title: t('solutionSteps.2.title'),
      description: t('solutionSteps.2.description'),
      icon: Search
    },
    {
      title: t('solutionSteps.3.title'),
      description: t('solutionSteps.3.description'),
      icon: CreditCard
    }
  ]

  const results = [
    {
      metric: t('results.sales.metric'),
      value: t('results.sales.value'),
      description: t('results.sales.description'),
      icon: ShoppingCart
    },
    {
      metric: t('results.rankings.metric'),
      value: t('results.rankings.value'),
      description: t('results.rankings.description'),
      icon: Target
    },
    {
      metric: t('results.bounce.metric'),
      value: t('results.bounce.value'),
      description: t('results.bounce.description'),
      icon: TrendingUp
    },
    {
      metric: t('results.orderValue.metric'),
      value: t('results.orderValue.value'),
      description: t('results.orderValue.description'),
      icon: CreditCard
    }
  ]

  const timeline = [
    {
      month: t('timeline.0.month'),
      title: t('timeline.0.title'),
      description: t('timeline.0.description'),
      results: [
        t('timeline.0.results.0'),
        t('timeline.0.results.1'),
        t('timeline.0.results.2')
      ]
    },
    {
      month: t('timeline.1.month'),
      title: t('timeline.1.title'),
      description: t('timeline.1.description'),
      results: [
        t('timeline.1.results.0'),
        t('timeline.1.results.1'),
        t('timeline.1.results.2')
      ]
    },
    {
      month: t('timeline.2.month'),
      title: t('timeline.2.title'),
      description: t('timeline.2.description'),
      results: [
        t('timeline.2.results.0'),
        t('timeline.2.results.1'),
        t('timeline.2.results.2')
      ]
    }
  ]

  const caseStudySchema = generateCaseStudySchema({
    title: "StyleCraft Boutique: E-commerce SEO Success - 420% Conversion Increase",
    description: "Comprehensive e-commerce SEO case study showing how StyleCraft Boutique transformed their online retail performance with AI-powered optimization.",
    datePublished: "2024-10-14T10:00:00+00:00",
    dateModified: "2025-10-17T10:00:00+00:00",
    url: "https://www.aiseoturbo.com/case-studies/stylecraft-boutique",
    companyName: "StyleCraft Boutique",
    industry: "E-commerce - Fashion Retail",
    reviewRating: 5,
    reviewAuthor: "Emma Thompson",
    reviewText: "Our online sales have never been better. AI SEO Turbo helped us understand exactly what our customers were searching for. We went from being a local boutique to a digital retail leader, and our revenue reflects that transformation."
  });

  return (
    <MainLayout>
      <StructuredData data={caseStudySchema} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <Breadcrumbs
              items={[
                { name: tBreadcrumbs('caseStudies'), url: 'https://www.aiseoturbo.com/case-studies' },
                { name: t('name'), url: 'https://www.aiseoturbo.com/case-studies/stylecraft-boutique' }
              ]}
              darkMode={true}
              className="mb-8"
            />

            {/* Hero Content */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-500/10 rounded-full mb-6">
                <ShoppingCart className="w-10 h-10 text-pink-400" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  {t('name')}
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
                  {t('title')}
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                {t('subtitle')}
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {results.map((result) => (
                  <div key={result.metric} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <result.icon className="w-8 h-8 text-pink-400 mx-auto mb-2" aria-hidden="true" />
                    <div className="text-2xl font-bold text-pink-400 mb-1">{result.value}</div>
                    <div className="text-sm text-gray-400">{result.metric}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/features/seo-audit">
                  <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-pink-600/25 hover:shadow-xl hover:shadow-pink-500/30 hover:scale-105 border border-pink-500/20">
                    <Target className="w-5 h-5 mr-2" aria-hidden="true" />
                    {t('heroButtons.audit')}
                  </Button>
                </Link>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  <Share2 className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t('heroButtons.share')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  {t('challengeTitle')}
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {t('challengeDescription')}
                </p>
                <ul className="space-y-3" role="list">
                  {challengePoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" aria-hidden="true"></div>
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400 mb-2">{t('challengeMetrics.bounceRate.value')}</div>
                  <div className="text-gray-400 mb-4">{t('challengeMetrics.bounceRate.label')}</div>
                  <div className="text-4xl font-bold text-red-400 mb-2">{t('challengeMetrics.orderValue.value')}</div>
                  <div className="text-gray-400">{t('challengeMetrics.orderValue.label')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('solutionTitle')}
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              {t('solutionDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutionSteps.map((step, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-pink-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">
                {t('timelineTitle')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('timelineSubtitle')}
              </p>
            </div>

            <div className="space-y-8">
              {timeline.map((phase, index) => (
                <div key={index} className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{phase.month.split(' ')[1]}</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                    <p className="text-gray-400 mb-4">{phase.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {phase.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <div className="text-center mb-8">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" aria-hidden="true" />
                <blockquote className="text-2xl text-white font-medium mb-6 leading-relaxed">
                  "{t('testimonial.quote')}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center">
                    <span className="text-pink-400 font-bold">{t('testimonial.author').split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">{t('testimonial.author')}</div>
                    <div className="text-gray-400">{t('testimonial.role')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Achievements Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">
                {t('technicalAchievementsTitle')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('technicalAchievementsSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">{t('productPerformance.title')}</h3>
                <ul className="space-y-3">
                  {[0, 1, 2].map((index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                      <span className="text-gray-300">{t(`productPerformance.items.${index}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">{t('technicalImprovements.title')}</h3>
                <ul className="space-y-3">
                  {[0, 1, 2].map((index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                      <span className="text-gray-300">{t(`technicalImprovements.items.${index}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-xl p-8 border border-pink-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">{t('roiTitle')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400 mb-2">{t('roiMetrics.overallROI.value')}</div>
                  <div className="text-gray-400">{t('roiMetrics.overallROI.label')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{t('roiMetrics.additionalRevenue.value')}</div>
                  <div className="text-gray-400">{t('roiMetrics.additionalRevenue.label')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{t('roiMetrics.paybackPeriod.value')}</div>
                  <div className="text-gray-400">{t('roiMetrics.paybackPeriod.label')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('relatedCaseStudiesTitle')}
            </h2>
            <p className="text-gray-400 mb-12">
              {t('relatedCaseStudiesSubtitle')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/case-studies/gearhub-pro" className="group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                        {t('relatedCaseStudies.gearhubPro.name')}
                      </h3>
                      <p className="text-gray-400 text-sm">{t('relatedCaseStudies.gearhubPro.category')}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {t('relatedCaseStudies.gearhubPro.description')}
                  </p>
                  <div className="flex items-center text-orange-400 text-sm font-medium">
                    {t('relatedCaseStudies.gearhubPro.cta')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </Link>

              <Link href="/case-studies/peak-performance" className="group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {t('relatedCaseStudies.peakPerformance.name')}
                      </h3>
                      <p className="text-gray-400 text-sm">{t('relatedCaseStudies.peakPerformance.category')}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {t('relatedCaseStudies.peakPerformance.description')}
                  </p>
                  <div className="flex items-center text-blue-400 text-sm font-medium">
                    {t('relatedCaseStudies.peakPerformance.cta')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500/10 rounded-full mb-6">
              <Crown className="w-8 h-8 text-pink-400" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/features/seo-audit">
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-pink-600/25 hover:shadow-xl hover:shadow-pink-500/30 hover:scale-105 border border-pink-500/20">
                  <Target className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t('ctaButtons.audit')}
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t('ctaButtons.contact')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
