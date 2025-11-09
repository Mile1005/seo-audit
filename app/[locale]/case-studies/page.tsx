"use client";

import { MainLayout } from "@/components/layout/main-layout"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StructuredData, generateItemListSchema } from "@/components/seo/StructuredData"
import { useTranslations } from "next-intl"
import {
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  Award
} from "lucide-react"

export default function CaseStudiesPage() {
  const t = useTranslations('caseStudies');
  const tHero = useTranslations('caseStudies.hero');
  const tFilters = useTranslations('caseStudies.filters');
  const tCta = useTranslations('caseStudies.cta');
  const tCommon = useTranslations('caseStudies.common');
  const tCases = useTranslations('caseStudies.cases');

  // Case studies data from translations
  const caseStudiesData = [
    'digitalGrowthAgency',
    'techflowSolutions',
    'stylecraftBoutique',
    'cloudsyncPro',
    'peakPerformance',
    'gearhubPro'
  ];

  const caseStudies = caseStudiesData.map(id => {
    const caseKey = id === 'techflowSolutions' ? 'techflowSolutions' : id;
    
    // Define metric keys for each case
    const metricKeys = ['organicTraffic', 'keywordRankings', 'clientSatisfaction', 'timeSaved'];
    
    return {
      id: id.replace(/([A-Z])/g, '-$1').toLowerCase(),
      title: tCases(`${caseKey}.title`),
      client: tCases(`${caseKey}.client`),
      industry: tCases(`${caseKey}.industry`),
      duration: tCases(`${caseKey}.duration`),
      results: {
        traffic: tCases(`${caseKey}.results.traffic`),
        rankings: tCases(`${caseKey}.results.rankings`),
        conversions: tCases(`${caseKey}.results.conversions`),
        roi: tCases(`${caseKey}.results.roi`)
      },
      challenge: tCases(`${caseKey}.challenge`),
      testimonial: {
        quote: tCases(`${caseKey}.testimonial.quote`),
        author: tCases(`${caseKey}.testimonial.author`),
        role: tCases(`${caseKey}.testimonial.role`)
      },
      metrics: metricKeys.map(key => ({
        label: tCases(`${caseKey}.metrics.${key}.label`),
        value: tCases(`${caseKey}.metrics.${key}.value`),
        change: tCases(`${caseKey}.metrics.${key}.value`).includes('-') ? 'decrease' : 'increase'
      }))
    };
  });

  const industries = [
    { key: 'allIndustries', label: tFilters('allIndustries') },
    { key: 'digitalMarketing', label: tFilters('digitalMarketing') },
    { key: 'saas', label: tFilters('saas') },
    { key: 'ecommerce', label: tFilters('ecommerce') },
    { key: 'b2bSaas', label: tFilters('b2bSaas') },
    { key: 'localServices', label: tFilters('localServices') },
    { key: 'nicheEcommerce', label: tFilters('nicheEcommerce') }
  ];

  // Generate ItemList schema for all case studies
  const itemListSchema = generateItemListSchema(
    caseStudies.map(study => ({
      name: study.title,
      url: `https://www.aiseoturbo.com/case-studies/${study.id}`,
      description: study.challenge
    }))
  )

  return (
    <MainLayout>
      <StructuredData data={itemListSchema} />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-6">
              <Award className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                {tHero('title')}
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              {tHero('subtitle')}
            </p>
            <Link href="/features/seo-audit">
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 border border-green-500/20">
                <Target className="w-5 h-5 mr-2" />
                {tCta('button')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industry Filter */}
      <section className="py-12 bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry) => (
              <button
                key={industry.key}
                className="px-4 py-2 rounded-full bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white transition-all duration-300 text-sm font-medium"
              >
                {industry.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {tHero('title')}
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              {tHero('subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <div key={study.id} className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-300 group">
                {/* Header */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium">
                      {study.industry}
                    </span>
                    <span className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {study.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {study.challenge}
                  </p>

                  {/* Key Results */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">{study.results.traffic}</div>
                      <div className="text-sm text-gray-400">{tCommon('trafficGrowth')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">{study.results.conversions}</div>
                      <div className="text-sm text-gray-400">{tCommon('conversionIncrease')}</div>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="px-8 pb-8">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {study.metrics.slice(0, 4).map((metric) => (
                      <div key={metric.label} className="text-center p-4 bg-slate-800/50 rounded-lg">
                        <div className={`text-lg font-bold mb-1 ${
                          metric.change === 'increase' ? 'text-green-400' :
                          metric.change === 'decrease' ? 'text-red-400' : 'text-blue-400'
                        }`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href={`/case-studies/${study.id}`}>
                    <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-slate-500">
                      {tCommon('readFullCaseStudy')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-6">
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{tCta('title')}</h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              {tCta('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/features/seo-audit">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 border border-blue-500/20">
                  <Target className="w-5 h-5 mr-2" />
                  {tCta('button')}
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  <Users className="w-5 h-5 mr-2" />
                  {tCommon('talkToOurTeam')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
