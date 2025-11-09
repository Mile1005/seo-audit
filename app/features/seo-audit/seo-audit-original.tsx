"use client";

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, Target, Zap, TrendingUp, Shield, Play, ChevronRight, Clock, BarChart, Users, Star, AlertTriangle, Loader2, Search } from 'lucide-react'
import { MainLayout } from '../../../components/layout/main-layout'
import { Breadcrumbs } from '../../../components/navigation/breadcrumbs'
import { ApiErrorBoundary } from '../../../components/ui/error-boundary'
import { useFormSubmission } from '../../../hooks/use-api'
import { api, AuditResult, ApiResponse } from '../../../lib/api-client'

// Dynamic imports to prevent lambda issues while preserving all functionality
import dynamic from 'next/dynamic'

const AuditCategories = dynamic(() => import('../../../components/features/seo-audit/audit-categories'), { ssr: false })
const AuditPreview = dynamic(() => import('../../../components/features/seo-audit/audit-preview'), { ssr: false })
const TechnicalBreakdown = dynamic(() => import('../../../components/features/seo-audit/technical-breakdown'), { ssr: false })
const ResultsShowcase = dynamic(() => import('../../../components/features/seo-audit/results-showcase'), { ssr: false })

// SEO Audit Result Interface
interface SEOAuditResult {
  auditId: string
  status: 'completed' | 'processing' | 'failed'
  url: string
  score: number
  timestamp: string
  pageData: {
    title: string | null
    metaDescription: string | null
    h1Count: number
    h2Count: number
    h3Count: number
    wordCount: number
    imagesTotal: number
    imagesWithoutAlt: number
    internalLinks: number
    externalLinks: number
    loadTime: number
    canonical: string | null
    noindex: boolean
  }
  issues: any
  recommendations: Array<{
    type: 'critical' | 'warning' | 'suggestion'
    category: string
    title: string
    description: string
    priority: number
  }>
  robotsTxt: any
  sitemapXml: any
  keyword?: string | null
  email?: string | null
  // Add comprehensive rawData structure
  rawData?: {
    url?: string
    scores?: {
      overall?: number
      performance?: number
      accessibility?: number
      seo?: number
      best_practices?: number
    }
    stats?: {
      internal_links?: number
      external_links?: number
      images_count?: number
      images_size?: number
      scripts_count?: number
      scripts_size?: number
      text_size?: number
      text_rate?: number
      word_count?: number
      reading_time_min?: number
    }
    h_tags?: {
      h1?: string[]
      h2?: string[]
      h3?: string[]
    }
    social_meta?: {
      og_title?: string | null
      og_url?: string | null
      og_description?: string | null
      og_image?: string | null
      twitter_card?: string | null
      twitter_title?: string | null
      twitter_description?: string | null
    }
    accessibility?: {
      passed_checks?: string[]
      failed_checks?: string[]
    }
    indexability?: {
      passed_checks?: string[]
      failed_checks?: string[]
    }
    seo_checks?: {
      passed_checks?: string[]
      failed_checks?: string[]
    }
    performance_metrics?: {
      first_contentful_paint?: number
      largest_contentful_paint?: number
      total_blocking_time?: number
      cumulative_layout_shift?: number
      speed_index?: number
      time_to_interactive?: number
      max_potential_first_input_delay?: number
    }
    performance_opportunities?: string[]
    performance_diagnostics?: string[]
    issues?: Array<{
      title?: string
      description?: string
      severity?: 'high' | 'medium' | 'low'
      recommendation?: string
    }>
    quick_wins?: Array<{
      title?: string
      description?: string
    }>
    fetched_at?: string
  }
  // Support for new comprehensive results format
  comprehensiveResults?: any
}

export default function SEOAuditFeaturePage() {
  const t = useTranslations('featurePages.seoAudit');
  const steps = [
    {
      step: "1",
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      icon: Target,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "2",
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      icon: Zap,
      color: "from-purple-500 to-violet-500"
    },
    {
      step: "3",
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      icon: BarChart,
      color: "from-green-500 to-emerald-500"
    }
  ];
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [keyword, setKeyword] = useState("");
  const [errors, setErrors] = useState<{ url?: string; email?: string }>({});
  const [auditResult, setAuditResult] = useState<SEOAuditResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  
  const { isSubmitting, submitError, submit } = useFormSubmission<any, SEOAuditResult>();

  const validateForm = () => {
    const newErrors: { url?: string; email?: string } = {};

    if (!url.trim()) {
      newErrors.url = "URL is required";
    } else {
      const trimmedUrl = url.trim();
      // More flexible URL validation - allow domains with or without protocol
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
      const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
      
      if (!urlPattern.test(trimmedUrl) && !domainPattern.test(trimmedUrl)) {
        newErrors.url = "Please enter a valid URL (e.g., example.com, produkto.io, or https://youtube.com)";
      }
    }

    if (email.trim() && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted!', { url, email, keyword });
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return (
        <MainLayout>
          <div className="min-h-screen bg-background overflow-x-hidden">
          {/* Breadcrumbs */}
          ...existing code...
          </div>
        </MainLayout>
      );
  }
    try {
      const result = await submit(
        (data) => {
          console.log('API call data:', data);
          return api.audit.start(data) as Promise<ApiResponse<SEOAuditResult>>;
        },
        { 
          url: url.trim(), 
          email: email.trim() || undefined,
          keyword: keyword.trim() || undefined
        },
        (response) => {
          console.log('Success callback called with response:', response);
          
          // Handle the fact that response might be the wrapped API response
          const actualData = (response as any).data ? (response as any).data : response;
          
          console.log('Actual data:', actualData);
          console.log('Data score:', actualData.score);
          console.log('Data pageData exists?', !!actualData.pageData);
          console.log('Data recommendations count:', actualData.recommendations?.length || 0);
          
          // Show rich results inline on the same page
          setAuditResult(actualData);
          setShowResults(true);
          setUrl("");
          setEmail("");
          setKeyword("");
          
          // Smooth scroll to results section
          setTimeout(() => {
            const resultsSection = document.getElementById('audit-results');
            if (resultsSection) {
              resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
          
          console.log('State updated with actual data');
        }
      );
      console.log('Submit completed:', result);
    } catch (error) {
      console.error('Error starting audit:', error);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Work';
    return 'Poor';
  };

    return (
      <MainLayout>
        <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs
            items={[
              { name: 'Features', url: 'https://www.aiseoturbo.com/features' },
              { name: 'SEO Audit', url: 'https://www.aiseoturbo.com/features/seo-audit' }
            ]}
            className="mb-4"
          />
        </div>

        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  {t('hero.badge')}
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  {t('hero.title')}
                  <span className="text-primary"> {t('hero.titleHighlight')}</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  {t('hero.subtitle')}
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">{t('hero.feature1')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">{t('hero.feature2')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">{t('hero.feature3')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">{t('hero.feature4')}</span>
                </div>
              </div>
            </motion.div>

            {/* Audit Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-background rounded-2xl shadow-2xl border p-8"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">{t('form.heading')}</h2>
                <p className="text-muted-foreground">{t('form.subheading')}</p>
              </div>

              <form onSubmit={handleSubmit} action="/api/audit" method="post" className="space-y-6">
                <div>
                  <label htmlFor="website-url" className="block text-sm font-medium text-foreground mb-2">
                    {t('form.urlLabel')}
                  </label>
                  <input
                    type="url"
                    id="website-url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t('form.urlPlaceholder')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                      errors.url ? 'border-red-500' : 'border-muted-foreground/20'
                    }`}
                  />
                  {errors.url && (
                    <p className="mt-1 text-sm text-red-600">{errors.url}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t('form.emailLabel')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('form.emailPlaceholder')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-500' : 'border-muted-foreground/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('form.submittingButton')}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Zap className="w-5 h-5 mr-2" />
                      {t('form.submitButton')}
                    </span>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>✓ No credit card required  ✓ Results in under 3 minutes  ✓ 47+ checks included</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-background rounded-2xl shadow-xl p-8"
              >
                <div className="flex items-center justify-center mb-6">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Analyzing Your Website...
                </h3>
                <p className="text-muted-foreground mb-6">
                  We're performing a comprehensive SEO audit with 47+ checks including:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {[
                    "Page Speed Analysis",
                    "Mobile Optimization",
                    "Meta Tags Check",
                    "Content Analysis",
                    "Image Optimization",
                    "Link Structure",
                    "Technical SEO",
                    "Accessibility Check"
                  ].map((check, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-muted-foreground">{check}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  This usually takes 10-30 seconds...
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {submitError && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="py-10 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center"
              >
                <div className="flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Audit Failed
                </h3>
                <p className="text-red-600 mb-4">{submitError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <AnimatePresence>
        {showResults && auditResult && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-muted/20"
            id="audit-results"
          >
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-foreground mb-4"
                >
                  Comprehensive SEO Audit Results
                </motion.h2>
                <p className="text-xl text-muted-foreground">
                  Analysis for {auditResult.url}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Report Generated: {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              {/* Main Results Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Left Column - Website Snapshot */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="lg:col-span-1"
                >
                  <div className="bg-background rounded-2xl shadow-xl p-6 border">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Website Snapshot</h3>
                    <div className="bg-muted/50 rounded-lg p-4 mb-4">
                      <div className="text-sm text-muted-foreground mb-2">Website Preview</div>
                      <div className="bg-background rounded border p-3">
                        <div className="text-sm font-medium text-foreground truncate">
                          {auditResult.url}
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                      Export PDF
                    </button>
                  </div>
                </motion.div>

                {/* Right Column - Overall Score */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <div className="bg-background rounded-2xl shadow-xl p-8 border">
                    <div className="text-center mb-6">
                      {/* Animated Main Score Circle */}
                      <motion.div className="relative w-32 h-32 mx-auto mb-4">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                          {/* Background circle */}
                          <circle
                            cx="60"
                            cy="60"
                            r="50"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-muted/20"
                          />
                          {/* Progress circle */}
                          <motion.circle
                            cx="60"
                            cy="60"
                            r="50"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className={getScoreColor(auditResult.score || 0)}
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 50}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                            animate={{ 
                              strokeDashoffset: 2 * Math.PI * 50 * (1 - (auditResult.score || 0) / 100)
                            }}
                            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                          />
                        </svg>
                        {/* Score text overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="text-center"
                          >
                            <div className={`text-4xl font-bold ${getScoreColor(auditResult.score || 0)}`}>
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.2 }}
                              >
                                {auditResult.score || 0}
                              </motion.span>
                            </div>
                            <div className="text-xs font-medium text-muted-foreground">/ 100</div>
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="text-2xl font-semibold text-foreground mb-2"
                      >
                        Overall Score
                      </motion.h3>
                    </div>

                    {/* Score Breakdown with Mini Progress Circles */}
                    {(auditResult.comprehensiveResults || auditResult.rawData)?.scores && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                      >
                        {[
                          { 
                            name: 'Performance', 
                            score: (auditResult.comprehensiveResults || auditResult.rawData)?.scores?.performance || auditResult.score || 0,
                            color: 'text-green-600',
                            bgColor: 'text-green-100',
                            icon: '⚡'
                          },
                          { 
                            name: 'Accessibility', 
                            score: (auditResult.comprehensiveResults || auditResult.rawData)?.scores?.accessibility || auditResult.score || 0,
                            color: 'text-blue-600',
                            bgColor: 'text-blue-100',
                            icon: '♿'
                          },
                          { 
                            name: 'SEO', 
                            score: (auditResult.comprehensiveResults || auditResult.rawData)?.scores?.seo || auditResult.score || 0,
                            color: 'text-purple-600',
                            bgColor: 'text-purple-100',
                            icon: '🔍'
                          },
                          { 
                            name: 'Best Practices', 
                            score: (auditResult.comprehensiveResults || auditResult.rawData)?.scores?.best_practices || auditResult.score || 0,
                            color: 'text-orange-600',
                            bgColor: 'text-orange-100',
                            icon: '⭐'
                          }
                        ].map((metric, index) => (
                          <motion.div
                            key={metric.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2 + index * 0.1 }}
                            className="text-center"
                          >
                            <div className="relative w-16 h-16 mx-auto mb-2">
                              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 60 60">
                                <circle
                                  cx="30"
                                  cy="30"
                                  r="25"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="transparent"
                                  className="text-muted/20"
                                />
                                <motion.circle
                                  cx="30"
                                  cy="30"
                                  r="25"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="transparent"
                                  className={metric.color}
                                  strokeLinecap="round"
                                  strokeDasharray={`${2 * Math.PI * 25}`}
                                  initial={{ strokeDashoffset: 2 * Math.PI * 25 }}
                                  animate={{ 
                                    strokeDashoffset: 2 * Math.PI * 25 * (1 - metric.score / 100)
                                  }}
                                  transition={{ duration: 1.5, ease: "easeOut", delay: 2.2 + index * 0.1 }}
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg">{metric.icon}</span>
                              </div>
                            </div>
                            <div className={`text-lg font-bold ${metric.color}`}>
                              {metric.score}
                            </div>
                            <div className="text-xs text-muted-foreground">{metric.name}</div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Detailed Statistics */}
              {((auditResult.comprehensiveResults || auditResult.rawData)?.stats || auditResult.pageData) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-background rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-foreground">Page Statistics</h3>
                    <div className="text-2xl font-bold text-primary">
                      {auditResult.score || 0}%
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.stats?.internal_links || auditResult.pageData?.internalLinks || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Internal Links</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.stats?.external_links || auditResult.pageData?.externalLinks || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">External Links</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.stats?.images_count || auditResult.pageData?.imagesTotal || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Images</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.stats?.word_count || auditResult.pageData?.wordCount || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Word Count</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.stats?.reading_time_min || Math.round((auditResult.pageData?.loadTime || 0) / 1000) || 0}m
                      </div>
                      <div className="text-sm text-muted-foreground">Reading Time</div>
                    </div>
                  </div>
                  
                  {/* Additional Technical Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t">
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.stats?.scripts_count || 'N/A'}
                      </div>
                      <div className="text-xs text-muted-foreground">Scripts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {((auditResult.comprehensiveResults || auditResult.rawData)?.stats?.scripts_size ? 
                          `${Math.round((auditResult.comprehensiveResults || auditResult.rawData)?.stats?.scripts_size / 1024)}KB` : 'N/A')}
                      </div>
                      <div className="text-xs text-muted-foreground">Scripts Size</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {((auditResult.comprehensiveResults || auditResult.rawData)?.stats?.images_size ? 
                          `${Math.round((auditResult.comprehensiveResults || auditResult.rawData)?.stats?.images_size / 1024)}KB` : 'N/A')}
                      </div>
                      <div className="text-xs text-muted-foreground">Images Size</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {((auditResult.comprehensiveResults || auditResult.rawData)?.stats?.text_rate ? 
                          `${Math.round((auditResult.comprehensiveResults || auditResult.rawData)?.stats?.text_rate * 100)}%` : 'N/A')}
                      </div>
                      <div className="text-xs text-muted-foreground">Text Rate</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Social Media Meta Tags */}
              {(auditResult.comprehensiveResults || auditResult.rawData)?.social_meta && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-background rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Social Media Meta Tags</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Open Graph</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Title:</span>
                          <p className="text-sm text-foreground">{(auditResult.comprehensiveResults || auditResult.rawData)?.social_meta?.og_title || 'Not set'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">URL:</span>
                          <p className="text-sm text-foreground truncate">{(auditResult.comprehensiveResults || auditResult.rawData)?.social_meta?.og_url || 'Not set'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Description:</span>
                          <p className="text-sm text-foreground">{(auditResult.comprehensiveResults || auditResult.rawData)?.social_meta?.og_description || 'Not set'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Image:</span>
                          <p className="text-sm text-foreground">{(auditResult.comprehensiveResults || auditResult.rawData)?.social_meta?.og_image || 'Not set'}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Twitter</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Card Type:</span>
                          <p className="text-sm text-foreground">{(auditResult.comprehensiveResults || auditResult.rawData)?.social_meta?.twitter_card || 'Not set'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Title:</span>
                          <p className="text-sm text-foreground">{(auditResult.comprehensiveResults || auditResult.rawData)?.social_meta?.twitter_title || 'Not set'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Description:</span>
                          <p className="text-sm text-foreground">{(auditResult.comprehensiveResults || auditResult.rawData)?.social_meta?.twitter_description || 'Not set'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Accessibility Checks */}
              {(auditResult.comprehensiveResults || auditResult.rawData)?.accessibility && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-background rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Accessibility Audit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-green-600 mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Passed Checks ({(auditResult.comprehensiveResults || auditResult.rawData)?.accessibility?.passed_checks?.length || 0})
                      </h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.accessibility?.passed_checks?.map((check: any, index: number) => (
                          <div key={index} className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-foreground">{check}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-red-600 mb-3 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Failed Checks ({(auditResult.comprehensiveResults || auditResult.rawData)?.accessibility?.failed_checks?.length || 0})
                      </h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.accessibility?.failed_checks?.map((check: any, index: number) => (
                          <div key={index} className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-foreground">{check}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Indexability Checks */}
              {(auditResult.comprehensiveResults || auditResult.rawData)?.indexability && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-background rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Indexability Checks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-green-600 mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Passed Checks ({(auditResult.comprehensiveResults || auditResult.rawData)?.indexability?.passed_checks?.length || 0})
                      </h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.indexability?.passed_checks?.map((check: any, index: number) => (
                          <div key={index} className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-foreground">{check}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-red-600 mb-3 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Failed Checks ({(auditResult.comprehensiveResults || auditResult.rawData)?.indexability?.failed_checks?.length || 0})
                      </h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.indexability?.failed_checks?.map((check: any, index: number) => (
                          <div key={index} className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-foreground">{check}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SEO Checks */}
              {(auditResult.comprehensiveResults || auditResult.rawData)?.seo_checks && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-background rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-6">SEO Checks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-green-600 mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Passed Checks ({(auditResult.comprehensiveResults || auditResult.rawData)?.seo_checks?.passed_checks?.length || 0})
                      </h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.seo_checks?.passed_checks?.map((check: any, index: number) => (
                          <div key={index} className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-foreground">{check}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-red-600 mb-3 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Failed Checks ({(auditResult.comprehensiveResults || auditResult.rawData)?.seo_checks?.failed_checks?.length || 0})
                      </h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.seo_checks?.failed_checks?.map((check: any, index: number) => (
                          <div key={index} className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-foreground">{check}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Performance Metrics */}
              {(auditResult.comprehensiveResults || auditResult.rawData)?.performance_metrics && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-background rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.performance_metrics?.first_contentful_paint?.toFixed(1)}s
                      </div>
                      <div className="text-sm text-muted-foreground">First Contentful Paint</div>
                      <div className="text-xs text-muted-foreground mt-1">Time to first content</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.performance_metrics?.largest_contentful_paint?.toFixed(1)}s
                      </div>
                      <div className="text-sm text-muted-foreground">Largest Contentful Paint</div>
                      <div className="text-xs text-muted-foreground mt-1">Time to main content</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.performance_metrics?.total_blocking_time}ms
                      </div>
                      <div className="text-sm text-muted-foreground">Total Blocking Time</div>
                      <div className="text-xs text-muted-foreground mt-1">Time blocking main thread</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.performance_metrics?.cumulative_layout_shift?.toFixed(3)}
                      </div>
                      <div className="text-sm text-muted-foreground">Cumulative Layout Shift</div>
                      <div className="text-xs text-muted-foreground mt-1">Visual stability score</div>
                    </div>
                  </div>
                  
                  {/* Additional Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t">
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.performance_metrics?.speed_index?.toFixed(1)}s
                      </div>
                      <div className="text-sm text-muted-foreground">Speed Index</div>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.performance_metrics?.time_to_interactive?.toFixed(1)}s
                      </div>
                      <div className="text-sm text-muted-foreground">Time to Interactive</div>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.performance_metrics?.max_potential_first_input_delay}ms
                      </div>
                      <div className="text-sm text-muted-foreground">Max Potential FID</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Performance Opportunities */}
              {(auditResult.comprehensiveResults || auditResult.rawData)?.performance_opportunities && (auditResult.comprehensiveResults || auditResult.rawData)?.performance_opportunities?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-background rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-3 text-orange-500" />
                    Performance Opportunities
                  </h3>
                  <div className="space-y-3">
                    {(auditResult.comprehensiveResults || auditResult.rawData)?.performance_opportunities?.map((opportunity: any, index: number) => (
                      <div key={index} className="flex items-start p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <span className="text-sm text-foreground font-medium">{opportunity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Performance Diagnostics */}
              {(auditResult.comprehensiveResults || auditResult.rawData)?.performance_diagnostics && (auditResult.comprehensiveResults || auditResult.rawData)?.performance_diagnostics?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-background rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <BarChart className="w-6 h-6 mr-3 text-blue-500" />
                    Performance Diagnostics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(auditResult.comprehensiveResults || auditResult.rawData)?.performance_diagnostics?.map((diagnostic: any, index: number) => (
                      <div key={index} className="flex items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-foreground">{diagnostic}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* H Tags Section */}
              {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="bg-background rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Heading Tags Analysis</h3>
                  
                  {/* H1 Tags */}
                  {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h1 && (auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h1?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                        <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-sm mr-2">H1</span>
                        We found {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h1?.length} H1 tags on this page
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h1?.length !== 1 && (
                          <AlertTriangle className="w-4 h-4 ml-2 text-orange-500" />
                        )}
                      </h4>
                      {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h1?.length !== 1 && (
                        <div className="mb-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                          <p className="text-sm text-orange-800 dark:text-orange-200">
                            {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h1?.length === 0 
                              ? "⚠️ No H1 tag found. Every page should have exactly one H1 tag."
                              : `⚠️ Multiple H1 tags found (${(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h1?.length}). Pages should have exactly one H1 tag for optimal SEO.`
                            }
                          </p>
                        </div>
                      )}
                      <div className="space-y-2">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h1?.map((h1: any, index: number) => (
                          <div key={index} className="bg-muted/50 rounded-lg p-3 border">
                            <div className="flex items-start">
                              <span className="text-sm font-medium text-muted-foreground mr-2">{index + 1}.</span>
                              <div className="flex-1">
                                <p className="text-foreground">{h1}</p>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Length: {h1.length} characters
                                  {h1.length < 20 && <span className="text-orange-600 ml-2">⚠️ Too short</span>}
                                  {h1.length > 70 && <span className="text-orange-600 ml-2">⚠️ Too long</span>}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* H2 Tags */}
                  {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h2 && (auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h2?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                        <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-sm mr-2">H2</span>
                        We found {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h2?.length} H2 tags on this page
                      </h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h2?.map((h2: any, index: number) => (
                          <div key={index} className="bg-muted/50 rounded-lg p-3 border">
                            <div className="flex items-start">
                              <span className="text-sm font-medium text-muted-foreground mr-2">{index + 1}.</span>
                              <div className="flex-1">
                                <p className="text-foreground">{h2}</p>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Length: {h2.length} characters
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* H3 Tags */}
                  {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h3 && (auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h3?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                        <span className="bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-sm mr-2">H3</span>
                        We found {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h3?.length} H3 tags on this page
                      </h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h3?.map((h3: any, index: number) => (
                          <div key={index} className="bg-muted/50 rounded-lg p-3 border">
                            <div className="flex items-start">
                              <span className="text-sm font-medium text-muted-foreground mr-2">{index + 1}.</span>
                              <div className="flex-1">
                                <p className="text-foreground">{h3}</p>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Length: {h3.length} characters
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Heading Structure Analysis */}
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="text-lg font-semibold text-foreground mb-3">Heading Structure Summary</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">
                          {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h1?.length || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">H1 Tags</div>
                        {((auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h1?.length || 0) === 1 && (
                          <div className="text-xs text-green-400 mt-1">✓ Perfect</div>
                        )}
                      </div>
                      <div className="text-center p-4 bg-green-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">
                          {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h2?.length || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">H2 Tags</div>
                      </div>
                      <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">
                          {(auditResult.comprehensiveResults || auditResult.rawData)?.h_tags?.h3?.length || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">H3 Tags</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Detailed Issues Section */}
              {(auditResult.comprehensiveResults || auditResult.rawData)?.issues && (auditResult.comprehensiveResults || auditResult.rawData)?.issues?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="bg-background rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 }}
                    className="text-2xl font-semibold text-foreground mb-6 flex items-center"
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                    >
                      <AlertTriangle className="w-6 h-6 mr-3 text-red-500" />
                    </motion.div>
                    Issues Found 
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.7 }}
                      className="ml-auto bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {(auditResult.comprehensiveResults || auditResult.rawData)?.issues?.length} issues
                    </motion.div>
                  </motion.h3>
                  
                  <div className="space-y-6">
                    {(auditResult.comprehensiveResults || auditResult.rawData)?.issues?.map((issue: any, index: number) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 + index * 0.1 }}
                        className="group border border-red-500/20 rounded-xl p-4 sm:p-6 bg-red-500/10 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] overflow-hidden"
                      >
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.6 + index * 0.1 }}
                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                              issue.severity === 'high' ? 'bg-red-500' :
                              issue.severity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                            }`}
                          >
                            <AlertTriangle className="w-5 h-5 text-white" />
                          </motion.div>
                          
                          <div className="flex-1 min-w-0 w-full">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-semibold text-foreground text-lg group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">
                                    {issue.title}
                                  </h4>
                                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                    issue.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200' :
                                    issue.severity === 'medium' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200' : 
                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
                                  }`}>
                                    {issue.severity?.toUpperCase()} PRIORITY
                                  </span>
                                </div>
                                
                                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                  {issue.description}
                                </p>
                                
                                {/* Specific Location Information */}
                                {issue.location && (
                                  <div className="bg-card rounded-lg p-4 border border-red-200 dark:border-red-700 mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Target className="w-4 h-4 text-red-600" />
                                      <span className="text-sm font-medium text-red-700 dark:text-red-300">Problem Location:</span>
                                    </div>
                                    <div className="bg-card rounded p-3">
                                      <code className="text-xs text-foreground font-mono break-words">
                                        {issue.location}
                                      </code>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Affected Elements */}
                                {issue.selector && (
                                  <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20 mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Search className="w-4 h-4 text-orange-400" />
                                      <span className="text-sm font-medium text-orange-400">Affected Element:</span>
                                    </div>
                                    <div className="bg-card rounded p-3">
                                      <code className="text-xs text-foreground font-mono break-words">
                                        {issue.selector}
                                      </code>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Current vs Expected Values */}
                                {issue.current_value && issue.expected_value && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                                      <div className="text-sm font-medium text-red-400 mb-2">Current (Problematic):</div>
                                      <div className="text-xs text-red-400 font-mono bg-card p-3 rounded break-words overflow-hidden">
                                        {issue.current_value}
                                      </div>
                                    </div>
                                    <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                                      <div className="text-sm font-medium text-green-400 mb-2">Expected:</div>
                                      <div className="text-xs text-green-400 font-mono bg-card p-3 rounded break-words overflow-hidden">
                                        {issue.expected_value}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {/* How to Fix Section */}
                                {issue.recommendation && (
                                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <CheckCircle className="w-4 h-4 text-blue-600" />
                                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">How to Fix:</span>
                                    </div>
                                    <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                                      {issue.recommendation}
                                    </p>
                                  </div>
                                )}
                                
                                {/* Technical Details */}
                                <div className="flex items-center gap-6 text-sm">
                                  {issue.impact && (
                                    <div className="flex items-center gap-1">
                                      <span className="text-muted-foreground">SEO Impact:</span>
                                      <span className={`font-medium ${
                                        issue.impact === 'high' ? 'text-red-600' :
                                        issue.impact === 'medium' ? 'text-orange-600' : 'text-yellow-600'
                                      }`}>
                                        {issue.impact.charAt(0).toUpperCase() + issue.impact.slice(1)}
                                      </span>
                                    </div>
                                  )}
                                  
                                  {issue.effort && (
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-muted-foreground" />
                                      <span className="text-muted-foreground">Fix Time:</span>
                                      <span className="font-medium text-purple-600">
                                        {issue.effort}
                                      </span>
                                    </div>
                                  )}
                                  
                                  {issue.category && (
                                    <div className="flex items-center gap-1">
                                      <span className="text-muted-foreground">Category:</span>
                                      <span className="font-medium text-indigo-600">
                                        {issue.category}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quick Wins Section */}
              {(auditResult.comprehensiveResults || auditResult.rawData)?.quick_wins && (auditResult.comprehensiveResults || auditResult.rawData)?.quick_wins?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="bg-background rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 }}
                    className="text-2xl font-semibold text-foreground mb-6 flex items-center"
                  >
                    <motion.div
                      initial={{ rotate: 0, scale: 1 }}
                      animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                      transition={{ delay: 1.6, duration: 0.6 }}
                    >
                      <Zap className="w-6 h-6 mr-3 text-yellow-500" />
                    </motion.div>
                    Quick Wins & Easy Improvements
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2 }}
                      className="ml-auto bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {(auditResult.comprehensiveResults || auditResult.rawData)?.quick_wins?.length} improvements
                    </motion.div>
                  </motion.h3>
                  
                  <div className="space-y-4">
                    {(auditResult.comprehensiveResults || auditResult.rawData)?.quick_wins?.map((win: any, index: number) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 + index * 0.1 }}
                        className="group border border-green-500/20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="flex items-start gap-4">
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.7 + index * 0.1 }}
                            className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                          >
                            <CheckCircle className="w-5 h-5 text-white" />
                          </motion.div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground mb-2 text-lg group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                                  {win.title}
                                </h4>
                                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                                  {win.description}
                                </p>
                                
                                {/* Enhanced Location Information */}
                                {win.location && (
                                  <div className="bg-card rounded-lg p-3 border border-green-500/20 mb-3">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Target className="w-4 h-4 text-green-400" />
                                      <span className="text-sm font-medium text-green-400">Found at:</span>
                                    </div>
                                    <code className="text-xs bg-card text-foreground px-2 py-1 rounded font-mono break-words">
                                      {win.location}
                                    </code>
                                  </div>
                                )}
                                
                                {/* Specific Element/Selector Information */}
                                {win.selector && (
                                  <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20 mb-3">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Search className="w-4 h-4 text-blue-400" />
                                      <span className="text-sm font-medium text-blue-400">Element:</span>
                                    </div>
                                    <code className="text-xs bg-card text-foreground px-2 py-1 rounded font-mono break-words">
                                      {win.selector}
                                    </code>
                                  </div>
                                )}
                                
                                {/* Current vs Recommended Values */}
                                {win.current_value && win.recommended_value && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                    <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                                      <div className="text-sm font-medium text-red-400 mb-1">Current:</div>
                                      <div className="text-xs text-red-400 font-mono bg-card p-2 rounded break-words overflow-hidden">
                                        {win.current_value}
                                      </div>
                                    </div>
                                    <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                                      <div className="text-sm font-medium text-green-400 mb-1">Recommended:</div>
                                      <div className="text-xs text-green-400 font-mono bg-card p-2 rounded break-words overflow-hidden">
                                        {win.recommended_value}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Priority and Impact Information */}
                                <div className="flex items-center gap-4 text-sm">
                                  {win.priority && (
                                    <div className="flex items-center gap-1">
                                      <span className="text-muted-foreground">Priority:</span>
                                      <span className={`font-medium ${
                                        win.priority === 'high' ? 'text-red-600' :
                                        win.priority === 'medium' ? 'text-orange-600' : 'text-green-600'
                                      }`}>
                                        {win.priority.charAt(0).toUpperCase() + win.priority.slice(1)}
                                      </span>
                                    </div>
                                  )}
                                  
                                  {win.impact && (
                                    <div className="flex items-center gap-1">
                                      <span className="text-muted-foreground">Impact:</span>
                                      <span className="font-medium text-blue-600">
                                        {win.impact}
                                      </span>
                                    </div>
                                  )}
                                  
                                  {win.effort && (
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-muted-foreground" />
                                      <span className="text-muted-foreground">Effort:</span>
                                      <span className="font-medium text-purple-600">
                                        {win.effort}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Fallback Recommendations for older format */}
              {auditResult.recommendations && auditResult.recommendations.length > 0 && !auditResult.rawData?.quick_wins ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="bg-background rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-3 text-orange-500" />
                    Key Recommendations
                  </h3>
                  <div className="space-y-3">
                    {auditResult.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                        <div className={`w-3 h-3 rounded-full mt-1 ${
                          rec.type === 'critical' ? 'bg-red-500' :
                          rec.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                        }`} />
                        <div>
                          <div className="font-semibold text-foreground">{rec.title}</div>
                          <div className="text-sm text-muted-foreground">{rec.description}</div>
                          <div className="text-xs text-muted-foreground mt-1 capitalize">
                            {rec.category} • {rec.type}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : null}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="text-center"
              >
                <button
                  onClick={() => {
                    setShowResults(false);
                    setAuditResult(null);
                  }}
                  className="bg-muted text-foreground px-8 py-3 rounded-lg hover:bg-muted/80 transition-colors mr-4"
                >
                  Audit Another Page
                </button>
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                  Export Detailed Report
                </button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('howItWorks.description')}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} p-4`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold mb-2">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Categories */}
      <AuditCategories />

      {/* Technical Deep Dive */}
      <TechnicalBreakdown />

      {/* Interactive Preview */}
      <AuditPreview />

      {/* Customer Results */}
      <ResultsShowcase />

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('whyChoose.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('whyChoose.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">{t('whyChoose.comprehensive.title')}</h3>
              <div className="space-y-4">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{t(`whyChoose.comprehensive.feature${i}`)}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-muted/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">{t('whyChoose.basic.title')}</h3>
              <div className="space-y-4">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground/70">{t(`whyChoose.basic.limitation${i}`)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t('readyToImprove.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('readyToImprove.description')}
            </p>
            
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">{t('readyToImprove.rating')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">{t('readyToImprove.completed')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-500" />
                <span className="text-sm text-muted-foreground">{t('readyToImprove.time')}</span>
              </div>
            </div>

            <button
              onClick={() => {
                document.querySelector('#website-url')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg group"
            >
              {t('readyToImprove.cta')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  </MainLayout>
);
}
