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

  // Case studies data
  const caseStudies = [
    {
      id: 'cloudsync-pro',
      title: t('cases.cloudsync.title'),
      description: t('cases.cloudsync.description'),
      results: [
        t('cases.cloudsync.results.0'),
        t('cases.cloudsync.results.1'),
        t('cases.cloudsync.results.2')
      ],
      category: t('cases.cloudsync.category'),
      image: '/case-studies/cloudsync-pro.jpg'
    },
    {
      id: 'digital-growth-agency',
      title: t('cases.digitalGrowth.title'),
      description: t('cases.digitalGrowth.description'),
      results: [
        t('cases.digitalGrowth.results.0'),
        t('cases.digitalGrowth.results.1'),
        t('cases.digitalGrowth.results.2')
      ],
      category: t('cases.digitalGrowth.category'),
      image: '/case-studies/digital-growth-agency.jpg'
    },
    {
      id: 'stylecraft-boutique',
      title: t('cases.stylecraft.title'),
      description: t('cases.stylecraft.description'),
      results: [
        t('cases.stylecraft.results.0'),
        t('cases.stylecraft.results.1'),
        t('cases.stylecraft.results.2')
      ],
      category: t('cases.stylecraft.category'),
      image: '/case-studies/stylecraft-boutique.jpg'
    },
    {
      id: 'peak-performance',
      title: t('cases.peak.title'),
      description: t('cases.peak.description'),
      results: [
        t('cases.peak.results.0'),
        t('cases.peak.results.1'),
        t('cases.peak.results.2')
      ],
      category: t('cases.peak.category'),
      image: '/case-studies/peak-performance.jpg'
    },
    {
      id: 'gearhub-pro',
      title: t('cases.gearhub.title'),
      description: t('cases.gearhub.description'),
      results: [
        t('cases.gearhub.results.0'),
        t('cases.gearhub.results.1'),
        t('cases.gearhub.results.2')
      ],
      category: t('cases.gearhub.category'),
      image: '/case-studies/gearhub-pro.jpg'
    },
    {
      id: 'techflow-solutions',
      title: t('cases.techflow.title'),
      description: t('cases.techflow.description'),
      results: [
        t('cases.techflow.results.0'),
        t('cases.techflow.results.1'),
        t('cases.techflow.results.2')
      ],
      category: t('cases.techflow.category'),
      image: '/case-studies/techflow-solutions.jpg'
    }
  ];

  const itemListSchema = generateItemListSchema(
    caseStudies.map(study => ({
      name: study.title,
      url: `https://www.aiseoturbo.com/case-studies/${study.id}`,
      description: study.description,
      image: `https://www.aiseoturbo.com${study.image}`,
      datePublished: '2025-01-15'
    }))
  );

  return (
    <MainLayout>
      <StructuredData data={itemListSchema} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
                <Award className="w-4 h-4 mr-2" />
                {t('hero.badge')}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {caseStudies.map((study) => (
                <div key={study.id} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">
                        {study.category}
                      </span>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Case Study</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {study.title}
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      {study.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3">Results:</h4>
                      <ul className="space-y-2">
                        {study.results.map((result, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/case-studies/${study.id}`}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-600/25"
                    >
                                            {t('common.readMore')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}