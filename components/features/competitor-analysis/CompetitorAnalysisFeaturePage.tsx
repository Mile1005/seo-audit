"use client";

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, Target, Zap, TrendingUp, Shield, Play, ChevronRight, Clock, BarChart, Users, Star, AlertTriangle, Loader2, Search, Globe, Link, ExternalLink, FileText, Image, Zap as ZapIcon, TrendingDown, TrendingUp as TrendingUpIcon, Minus } from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { ApiErrorBoundary } from '@/components/ui/error-boundary'
import { useFormSubmission } from '@/hooks/use-api'
import { api } from '@/lib/api-client'

// Dynamic imports to prevent lambda issues
import dynamic from 'next/dynamic'

const SERPComparison = dynamic(() => import('@/components/features/competitor-analysis/serp-comparison'), { ssr: false })
const GapAnalysis = dynamic(() => import('@/components/features/competitor-analysis/gap-analysis'), { ssr: false })
const MonitoringDashboard = dynamic(() => import('@/components/features/competitor-analysis/monitoring-dashboard'), { ssr: false })
const StrategyRecommendations = dynamic(() => import('@/components/features/competitor-analysis/strategy-recommendations'), { ssr: false })
const CompetitorAnalysisHero = dynamic(() => import('@/components/features/competitor-analysis/competitor-analysis-hero').then(mod => ({ default: mod.CompetitorAnalysisHero })), { ssr: false })

interface CompetitorAnalysisResult {
  targetUrl: string;
  competitors: string[];
  analysis: {
    serpComparison: any[];
    gapAnalysis: any;
    backlinkAnalysis: any[];
    contentAnalysis: any[];
    technicalAnalysis: any[];
  };
  generatedAt: string;
}

export default function CompetitorAnalysisFeaturePage() {
  const t = useTranslations('featurePages.competitorAnalysis');
  const [keywords, setKeywords] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<CompetitorAnalysisResult | null>(null);

  const { isSubmitting, submitError, submit } = useFormSubmission<any, CompetitorAnalysisResult>();

  const handleCompetitorSubmit = async (data: { domain: string; competitors?: string[] }) => {
    const keywordList = keywords.split('\n').map(k => k.trim()).filter(k => k.length > 0);

    await submit(
      async (data) => {
        const response = await fetch('/api/competitor-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error('Failed to analyze competitors');
        }
        return response.json();
      },
      {
        targetUrl: data.domain,
        competitorUrls: data.competitors || [],
        keywords: keywordList.length > 0 ? keywordList : undefined
      },
      (result) => {
        setAnalysisResults(result);
        setShowResults(true);
      }
    );
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs
            items={[
              { name: 'Features', url: 'https://www.aiseoturbo.com/features' },
              { name: 'Competitor Analysis', url: 'https://www.aiseoturbo.com/features/competitor-analysis' }
            ]}
            className="mb-4"
          />
        </div>

        {/* Hero Section */}
        <CompetitorAnalysisHero
          onCompetitorSubmit={handleCompetitorSubmit}
          isSubmitting={isSubmitting}
          submitError={submitError || undefined}
        />

        {/* Results Section */}
        <AnimatePresence>
          {showResults && analysisResults && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="py-16 px-4 sm:px-6 lg:px-8"
            >
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {t('results.title')}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {t('results.subtitle')}
                  </p>
                </div>

                {/* Analysis Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-card rounded-xl p-6 border">
                    <div className="flex items-center gap-3 mb-3">
                      <Target className="w-8 h-8 text-primary" />
                      <h3 className="text-lg font-semibold">{t('results.summary.target')}</h3>
                    </div>
                    <p className="text-2xl font-bold text-primary">{analysisResults.targetUrl}</p>
                  </div>
                  <div className="bg-card rounded-xl p-6 border">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-8 h-8 text-primary" />
                      <h3 className="text-lg font-semibold">{t('results.summary.competitors')}</h3>
                    </div>
                    <p className="text-2xl font-bold text-primary">{analysisResults.competitors.length}</p>
                  </div>
                  <div className="bg-card rounded-xl p-6 border">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-8 h-8 text-primary" />
                      <h3 className="text-lg font-semibold">{t('results.summary.generated')}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(analysisResults.generatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* SERP Comparison */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-foreground mb-6">{t('results.serpComparison')}</h3>
                  <div className="bg-card rounded-xl p-6 border">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold">Keyword</th>
                            <th className="text-center py-3 px-4 font-semibold">Your Rank</th>
                            <th className="text-center py-3 px-4 font-semibold">Change</th>
                            <th className="text-center py-3 px-4 font-semibold">Volume</th>
                            <th className="text-center py-3 px-4 font-semibold">Difficulty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analysisResults.analysis.serpComparison.map((item: any, index: number) => (
                            <tr key={index} className="border-b border-muted">
                              <td className="py-3 px-4 font-medium">{item.keyword}</td>
                              <td className="py-3 px-4 text-center">
                                <span className={`px-2 py-1 rounded text-sm font-medium ${
                                  item.yourRank <= 3 ? 'bg-green-100 text-green-800' :
                                  item.yourRank <= 10 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  #{item.yourRank}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className={`flex items-center justify-center gap-1 ${
                                  item.yourChange > 0 ? 'text-green-600' :
                                  item.yourChange < 0 ? 'text-red-600' : 'text-muted-foreground'
                                }`}>
                                  {item.yourChange > 0 ? <TrendingUp className="w-4 h-4" /> :
                                   item.yourChange < 0 ? <TrendingDown className="w-4 h-4" /> :
                                   <Minus className="w-4 h-4" />}
                                  {Math.abs(item.yourChange)}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">{item.volume.toLocaleString()}</td>
                              <td className="py-3 px-4 text-center">
                                <span className={`px-2 py-1 rounded text-sm font-medium ${
                                  item.difficulty <= 30 ? 'bg-green-100 text-green-800' :
                                  item.difficulty <= 60 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {item.difficulty}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Gap Analysis */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-foreground mb-6">{t('results.gapAnalysis')}</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Keyword Gaps */}
                    <div className="bg-card rounded-xl p-6 border">
                      <h4 className="text-lg font-semibold mb-4">{t('results.keywordGaps')}</h4>
                      <div className="space-y-3">
                        {analysisResults.analysis.gapAnalysis.keywordGaps.slice(0, 5).map((gap: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <p className="font-medium">{gap.keyword}</p>
                              <p className="text-sm text-muted-foreground">
                                Volume: {gap.volume.toLocaleString()} | Difficulty: {gap.difficulty}%
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              gap.opportunity === 'high' ? 'bg-green-100 text-green-800' :
                              gap.opportunity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {gap.opportunity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Gaps */}
                    <div className="bg-card rounded-xl p-6 border">
                      <h4 className="text-lg font-semibold mb-4">{t('results.contentGaps')}</h4>
                      <div className="space-y-3">
                        {analysisResults.analysis.gapAnalysis.contentGaps.map((gap: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <p className="font-medium capitalize">{gap.type.replace('-', ' ')}</p>
                              <p className="text-sm text-muted-foreground">{gap.count} opportunities</p>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {gap.competitors.length} competitors
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backlink Analysis */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-foreground mb-6">{t('results.backlinkAnalysis')}</h3>
                  <div className="bg-card rounded-xl p-6 border">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold">Competitor</th>
                            <th className="text-center py-3 px-4 font-semibold">Backlinks</th>
                            <th className="text-center py-3 px-4 font-semibold">Domains</th>
                            <th className="text-center py-3 px-4 font-semibold">DA</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analysisResults.analysis.backlinkAnalysis.map((competitor: any, index: number) => (
                            <tr key={index} className="border-b border-muted">
                              <td className="py-3 px-4 font-medium">{competitor.domain}</td>
                              <td className="py-3 px-4 text-center">{competitor.totalBacklinks.toLocaleString()}</td>
                              <td className="py-3 px-4 text-center">{competitor.referringDomains.toLocaleString()}</td>
                              <td className="py-3 px-4 text-center">
                                <span className={`px-2 py-1 rounded text-sm font-medium ${
                                  competitor.domainAuthority >= 80 ? 'bg-green-100 text-green-800' :
                                  competitor.domainAuthority >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {competitor.domainAuthority}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Static Components (shown when no results) */}
        {!showResults && (
          <>
            <SERPComparison />
            <GapAnalysis />
            <MonitoringDashboard />
            <StrategyRecommendations />
          </>
        )}

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl shadow-xl p-8 border"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {t('cta.subtitle')}
              </p>
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                {t('cta.button')}
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}