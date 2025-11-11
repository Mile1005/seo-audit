"use client";

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, Target, Zap, TrendingUp, Shield, Play, ChevronRight, Clock, BarChart, Users, Star, AlertTriangle, Loader2, Search, Globe, Link, ExternalLink, FileText, Image, Zap as ZapIcon } from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { ApiErrorBoundary } from '@/components/ui/error-boundary'
import { useFormSubmission } from '@/hooks/use-api'
import { api, CrawlResult } from '@/lib/api-client'

// Dynamic imports to prevent lambda issues
import dynamic from 'next/dynamic'

const SiteArchitecture = dynamic(() => import('@/components/features/site-crawler/site-architecture'), { ssr: false })
const MonitoringFeatures = dynamic(() => import('@/components/features/site-crawler/monitoring-features'), { ssr: false })
const IssueDetection = dynamic(() => import('@/components/features/site-crawler/issue-detection'), { ssr: false })
const IntegrationOptions = dynamic(() => import('@/components/features/site-crawler/integration-options'), { ssr: false })
const CrawlCapabilities = dynamic(() => import('@/components/features/site-crawler/crawl-capabilities'), { ssr: false })
const SiteCrawlerHero = dynamic(() => import('@/components/features/site-crawler/site-crawler-hero').then(mod => ({ default: mod.SiteCrawlerHero })), { ssr: false })

export default function SiteCrawlerFeaturePage() {
  const t = useTranslations('featurePages.siteCrawler');
  const [showResults, setShowResults] = useState(false);
  const [crawlResult, setCrawlResult] = useState<CrawlResult | null>(null);

  const { isSubmitting, submitError, submit } = useFormSubmission<any, any>();

  const handleCrawl = async (data: { url: string; maxPages?: number; includeSubdomains?: boolean }) => {
    await submit(
      (formData) => api.crawl.start(formData),
      {
        startUrl: data.url.startsWith('http') ? data.url : `https://${data.url}`,
        limit: data.maxPages || 1000,
        includeSubdomains: data.includeSubdomains || false,
      },
      (response: any) => {
        if (response.result) {
          setCrawlResult(response.result);
          setShowResults(true);
        } else if (response.startUrl) {
          // Direct result format
          setCrawlResult(response);
          setShowResults(true);
        }
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
              { name: 'Site Crawler', url: 'https://www.aiseoturbo.com/features/site-crawler' }
            ]}
            className="mb-4"
          />
        </div>

        {/* Hero Section */}
        <SiteCrawlerHero
          onCrawlSubmit={handleCrawl}
          isSubmitting={isSubmitting}
          submitError={submitError ?? undefined}
        />

        {/* Crawl Results Display */}
        <AnimatePresence>
          {showResults && crawlResult && (
            <motion.section
              id="crawl-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="py-16 px-4 sm:px-6 lg:px-8 bg-background"
            >
              <div className="max-w-6xl mx-auto">
                {/* Results Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-12"
                >
                  <div className="inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold mb-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Crawl Completed Successfully
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    Crawl Results for {crawlResult.result?.startUrl}
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Crawled {crawlResult.result?.totalPages} pages in {((crawlResult.result?.crawlTime || 0) / 1000).toFixed(1)} seconds
                  </p>
                </motion.div>

                {/* Overview Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Crawl Overview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">
                        {crawlResult.result?.totalPages}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Pages</div>
                    </div>
                    <div className="text-center p-4 bg-green-500/10 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">
                        {crawlResult.result?.successfulPages}
                      </div>
                      <div className="text-sm text-muted-foreground">Successful</div>
                    </div>
                    <div className="text-center p-4 bg-red-500/10 rounded-lg">
                      <div className="text-3xl font-bold text-red-600">
                        {crawlResult.result?.failedPages}
                      </div>
                      <div className="text-sm text-muted-foreground">Failed</div>
                    </div>
                    <div className="text-center p-4 bg-orange-500/10 rounded-lg">
                      <div className="text-3xl font-bold text-orange-600">
                        {crawlResult.result?.averageLoadTime?.toFixed(0)}ms
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Load Time</div>
                    </div>
                  </div>
                </motion.div>

                {/* Technical Checks */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-card rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Technical SEO Checks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-blue-600" />
                        <span className="font-medium">Robots.txt</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        crawlResult.result?.robotsTxt?.found ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {crawlResult.result?.robotsTxt?.found ? 'Found' : 'Missing'}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-purple-600" />
                        <span className="font-medium">Sitemap.xml</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        crawlResult.result?.sitemapXml?.found ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {crawlResult.result?.sitemapXml?.found ? 'Found' : 'Missing'}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Issues Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-card rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-3 text-red-500" />
                    SEO Issues Found
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-red-500/10 rounded-lg">
                      <div className="text-3xl font-bold text-red-600">
                        {crawlResult.result?.issues?.missing_titles}
                      </div>
                      <div className="text-sm text-muted-foreground">Missing Titles</div>
                    </div>
                    <div className="text-center p-4 bg-orange-500/10 rounded-lg">
                      <div className="text-3xl font-bold text-orange-600">
                        {crawlResult.result?.issues?.missing_h1}
                      </div>
                      <div className="text-sm text-muted-foreground">Missing H1 Tags</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-600">
                        {crawlResult.result?.issues?.missing_meta_descriptions}
                      </div>
                      <div className="text-sm text-muted-foreground">Missing Meta Desc</div>
                    </div>
                    <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">
                        {crawlResult.result?.issues?.images_without_alt}
                      </div>
                      <div className="text-sm text-muted-foreground">Images Without Alt</div>
                    </div>
                  </div>
                </motion.div>

                {/* Pages Table */}
                {crawlResult.result?.pages && crawlResult.result.pages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-card rounded-2xl shadow-xl p-8 mb-8 border"
                  >
                    <h3 className="text-2xl font-semibold text-foreground mb-6">Crawled Pages</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold">URL</th>
                            <th className="text-left py-3 px-4 font-semibold">Title</th>
                            <th className="text-center py-3 px-4 font-semibold">Status</th>
                            <th className="text-center py-3 px-4 font-semibold">Load Time</th>
                            <th className="text-center py-3 px-4 font-semibold">Issues</th>
                          </tr>
                        </thead>
                        <tbody>
                          {crawlResult.result?.pages?.map((page: any, index: number) => (
                            <motion.tr
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + index * 0.05 }}
                              className="border-b hover:bg-muted/30"
                            >
                              <td className="py-3 px-4">
                                <div className="flex items-center">
                                  <ExternalLink className="w-4 h-4 mr-2 text-muted-foreground" />
                                  <a
                                    href={page.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline truncate max-w-xs"
                                  >
                                    {page.url.replace(crawlResult.result?.startUrl || '', '/')}
                                  </a>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className={page.title ? 'text-foreground' : 'text-red-600'}>
                                  {page.title || 'Missing Title'}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  page.status === 200 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                  page.status >= 400 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                }`}>
                                  {page.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                {page.load_time_ms}ms
                              </td>
                              <td className="py-3 px-4 text-center">
                                <div className="flex justify-center space-x-1">
                                  {!page.title && <span className="w-2 h-2 bg-red-500 rounded-full" title="Missing title" />}
                                  {!page.h1_presence && <span className="w-2 h-2 bg-orange-500 rounded-full" title="Missing H1" />}
                                  {!page.meta_description && <span className="w-2 h-2 bg-yellow-500 rounded-full" title="Missing meta description" />}
                                  {page.images_missing_alt > 0 && <span className="w-2 h-2 bg-purple-500 rounded-full" title={`${page.images_missing_alt} images without alt`} />}
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* Broken Links */}
                {crawlResult.result?.brokenLinks?.length && crawlResult.result?.brokenLinks?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-card rounded-2xl shadow-xl p-8 mb-8 border"
                  >
                    <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-3 text-red-500" />
                      Broken Links ({crawlResult.result?.brokenLinks?.length})
                    </h3>

                    <div className="space-y-2">
                      {crawlResult.result?.brokenLinks?.map((link: string, index: number) => (
                        <div key={index} className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <Link className="w-4 h-4 mr-3 text-red-600" />
                          <span className="text-red-800 dark:text-red-300 font-mono text-sm">{link}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setCrawlResult(null);
                    }}
                    className="bg-muted text-foreground px-8 py-3 rounded-lg hover:bg-muted/80 transition-colors mr-4"
                  >
                    Crawl Another Site
                  </button>
                  <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                    Export Detailed Report
                  </button>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Site Architecture */}
        <SiteArchitecture />

        {/* Crawl Capabilities */}
        <CrawlCapabilities />

        {/* Issue Detection */}
        <IssueDetection />

        {/* Monitoring Features */}
        <MonitoringFeatures />

        {/* Integration Options */}
        <IntegrationOptions />

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