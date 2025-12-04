"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertTriangle, ArrowRight, Lock, Zap, RefreshCw, ChevronDown, FileDown, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScoreRing } from '@/components/ui/score-ring'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface CheckResult {
  id: string
  category: string
  name: string
  passed: boolean
  severity: 'high' | 'medium' | 'low'
  message: string
  value?: string | number
}

interface LiteAuditResult {
  score: number
  url: string
  criticalIssues: Array<{ title: string; description: string; severity: 'high' | 'medium' | 'low' }>
  quickWins: string[]
  checks: CheckResult[]
  checksByCategory: Record<string, { total: number; passed: number; checks: CheckResult[] }>
  isLite: boolean
  fullReportAvailable: boolean
  message: string
  stats: { totalChecks: number; passedChecks: number; failedChecks: number }
  performance: { loadTime: number; htmlSize: number }
  contentAnalysis?: {
    readability: number
    keywords: Array<{ word: string; count: number }>
    wordCount: number
  }
}

interface LiteAuditResultsProps {
  results: LiteAuditResult
  onViewFull: () => void
  onRunAnother: () => void
}

export function LiteAuditResults({ results, onViewFull, onRunAnother }: LiteAuditResultsProps) {
  const t = useTranslations('liteAudit')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(Object.keys(results.checksByCategory || {}))
  )
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null)
  const [screenshotLoading, setScreenshotLoading] = useState(true)

  // Fetch screenshot of the audited website
  useEffect(() => {
    if (results.url) {
      setScreenshotLoading(true)
      
      // thum.io expects the raw URL after the last slash
      // Format: https://image.thum.io/get/width/1280/crop/720/https://example.com
      const screenshotUrl = `https://image.thum.io/get/width/1280/crop/720/noanimate/${results.url}`
      
      // Pre-load the image
      const img = new Image()
      img.onload = () => {
        setScreenshotUrl(screenshotUrl)
        setScreenshotLoading(false)
      }
      img.onerror = () => {
        // Fallback to gradient
        setScreenshotUrl(null)
        setScreenshotLoading(false)
      }
      img.src = screenshotUrl
      
      // Timeout after 10 seconds (screenshots can take time)
      const timeout = setTimeout(() => {
        setScreenshotLoading(false)
      }, 10000)
      
      return () => clearTimeout(timeout)
    }
  }, [results.url])

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  const getCategoryScore = (cat: { total: number; passed: number }) => {
    return Math.round((cat.passed / cat.total) * 100)
  }

  const getCategoryColor = (score: number) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#f59e0b'
    return '#ef4444'
  }

  if (!results || !results.score) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">{t('errors.invalidResults')}</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto space-y-8"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* Score Section with Screenshot Background */}
        <div className="relative p-12 text-center border-b border-gray-200 dark:border-gray-800 overflow-hidden min-h-[280px]">
          {/* Screenshot Background */}
          {screenshotUrl && (
            <div className="absolute inset-0 z-0">
              <img 
                src={screenshotUrl} 
                alt="" 
                className="w-full h-full object-cover object-top opacity-30 blur-sm scale-105"
                onError={() => setScreenshotUrl(null)}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
            </div>
          )}
          
          {/* Fallback animated gradient if no screenshot */}
          {!screenshotUrl && !screenshotLoading && (
            <div className="absolute inset-0 z-0 bg-slate-900">
              <motion.div
                className="absolute inset-0 opacity-40"
                style={{
                  background: 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)'
                }}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>
          )}
          
          {/* Loading shimmer effect */}
          {screenshotLoading && (
            <div className="absolute inset-0 z-0 bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-slate-500 text-sm animate-pulse">{t('results.loadingPreview')}</div>
              </div>
            </div>
          )}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block relative z-10"
          >
            <ScoreRing score={results.score} size={180} strokeWidth={14} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-lg text-gray-300 relative z-10"
          >
            {t('results.seoPerformanceScore')}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-800">
          {[
            { label: t('stats.totalChecks'), value: results.stats?.totalChecks || 0, color: 'text-gray-900 dark:text-white' },
            { label: t('stats.passed'), value: results.stats?.passedChecks || 0, color: 'text-green-600 dark:text-green-400' },
            { label: t('stats.issues'), value: results.stats?.failedChecks || 0, color: 'text-red-600 dark:text-red-400' },
            { label: t('stats.loadTime'), value: `${results.performance?.loadTime || 0}s`, color: 'text-blue-600 dark:text-blue-400' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 text-center"
            >
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {results.checksByCategory && Object.keys(results.checksByCategory).length > 0 && (
          <div className="p-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('results.categoryBreakdown')}</h3>
            <div className="space-y-3">
              {Object.entries(results.checksByCategory).map(([category, data], idx) => {
                const catScore = getCategoryScore(data)
                const isExpanded = expandedCategories.has(category)
                const color = getCategoryColor(catScore)

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-750 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
                          <span className="text-xl font-bold">{catScore}</span>
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900 dark:text-white">{category}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {t('results.passedOfTotal', { passed: data.passed, total: data.total })}
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 space-y-2 bg-white dark:bg-slate-900">
                            {data.checks.map((check, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-800"
                              >
                                {check.passed ? (
                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                ) : (
                                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm text-gray-900 dark:text-white">{check.name}</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400 truncate">{check.message}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {results.criticalIssues && results.criticalIssues.length > 0 && (
          <div className="p-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              {t('results.criticalIssues')}
            </h3>
            <div className="space-y-3">
              {results.criticalIssues.map((issue, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="p-4 rounded-lg border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">{issue.title}</div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{issue.description}</p>
                    </div>
                    <Badge variant={issue.severity === 'high' ? 'destructive' : 'secondary'} className="flex-shrink-0">
                      {issue.severity}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {results.quickWins && results.quickWins.length > 0 && (
          <div className="p-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-500" />
              {t('results.quickWins')}
            </h3>
            <div className="space-y-2">
              {results.quickWins.map((win, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800"
                >
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{win}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="relative p-16 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
            {/* Animated gradient orbs */}
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
              animate={{
                x: [0, -40, 0],
                y: [0, -20, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10 text-center space-y-6 max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-semibold"
            >
              <Lock className="w-4 h-4" />
              <span>{t('cta.unlockPremium')}</span>
            </motion.div>
            <motion.h4 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white"
            >
              {t('cta.getCompleteReport')}
            </motion.h4>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-300"
            >
              {t('cta.signUpDescription')}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  {t('cta.signUpFree')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                onClick={() => generatePdfReport(results)}
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-lg transition-all"
              >
                <FileDown className="w-5 h-5 mr-2" />
                {t('cta.downloadPdf')}
              </Button>
            </motion.div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={onRunAnother}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors mt-4"
            >
              <RefreshCw className="w-4 h-4" />
              {t('cta.tryAnotherUrl')}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// PDF Report Generation Function
function generatePdfReport(results: LiteAuditResult) {
  const getGradeLabel = (score: number) => {
    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'F'
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#f59e0b'
    return '#ef4444'
  }

  const scoreColor = getScoreColor(results.score)
  const grade = getGradeLabel(results.score)

  // Create PDF content using HTML
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>SEO Audit Report - ${results.url}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #1a1a2e; background: #fff; }
        .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #e0e0e0; }
        .header h1 { font-size: 28px; color: #1a1a2e; margin-bottom: 8px; }
        .header p { color: #666; font-size: 14px; }
        .score-section { display: flex; justify-content: center; align-items: center; gap: 40px; margin-bottom: 40px; padding: 30px; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); border-radius: 16px; }
        .score-circle { width: 140px; height: 140px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: ${scoreColor}; color: white; box-shadow: 0 10px 40px ${scoreColor}40; }
        .score-circle .number { font-size: 48px; font-weight: bold; line-height: 1; }
        .score-circle .grade { font-size: 18px; opacity: 0.9; margin-top: 4px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
        .stat-box { text-align: center; padding: 20px; background: #f8f9fa; border-radius: 12px; border: 1px solid #e0e0e0; }
        .stat-box .number { font-size: 28px; font-weight: bold; margin-bottom: 4px; }
        .stat-box .label { font-size: 12px; color: #666; }
        .stat-box.passed .number { color: #10b981; }
        .stat-box.issues .number { color: #ef4444; }
        .section { margin-bottom: 30px; }
        .section h2 { font-size: 18px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; gap: 8px; }
        .category-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .category-card { padding: 20px; border-radius: 12px; border: 1px solid #e0e0e0; }
        .category-card h3 { font-size: 16px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
        .category-card .score-badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .check-item { display: flex; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; }
        .check-item:last-child { border-bottom: none; }
        .check-icon { width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; }
        .check-icon.pass { background: #d1fae5; color: #065f46; }
        .check-icon.fail { background: #fee2e2; color: #991b1b; }
        .issues-list { background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 20px; }
        .issue-item { padding: 12px; margin-bottom: 8px; background: white; border-radius: 8px; border-left: 4px solid #ef4444; }
        .issue-item:last-child { margin-bottom: 0; }
        .issue-item h4 { font-size: 14px; color: #1a1a2e; margin-bottom: 4px; }
        .issue-item p { font-size: 12px; color: #666; }
        .quick-wins { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; }
        .quick-win-item { display: flex; align-items: start; gap: 8px; padding: 8px 0; font-size: 13px; color: #166534; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center; color: #666; font-size: 12px; }
        .perf-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px; }
        .perf-item { text-align: center; padding: 16px; background: #f0f9ff; border-radius: 12px; }
        .perf-item .value { font-size: 24px; font-weight: bold; color: #0369a1; }
        .perf-item .label { font-size: 11px; color: #666; margin-top: 4px; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🔍 SEO Performance Report</h1>
        <p><strong>${results.url}</strong> • Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div class="score-section">
        <div class="score-circle">
          <span class="number">${results.score}</span>
          <span class="grade">Grade: ${grade}</span>
        </div>
        <div style="text-align: left;">
          <h3 style="font-size: 24px; margin-bottom: 8px;">SEO Performance Score</h3>
          <p style="color: #666;">
            ${results.score >= 80 ? '✅ Excellent - Your site is well optimized for search engines' : 
              results.score >= 60 ? '⚠️ Good - Some improvements recommended for better rankings' : 
              results.score >= 40 ? '🔶 Needs Work - Several issues affecting your SEO' : 
              '❌ Poor - Critical issues need immediate attention'}
          </p>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-box">
          <div class="number">${results.stats?.totalChecks || 0}</div>
          <div class="label">Total Checks</div>
        </div>
        <div class="stat-box passed">
          <div class="number">${results.stats?.passedChecks || 0}</div>
          <div class="label">Passed</div>
        </div>
        <div class="stat-box issues">
          <div class="number">${results.stats?.failedChecks || 0}</div>
          <div class="label">Issues Found</div>
        </div>
        <div class="stat-box">
          <div class="number">${results.performance?.loadTime || 0}s</div>
          <div class="label">Load Time</div>
        </div>
      </div>

      ${results.criticalIssues && results.criticalIssues.length > 0 ? `
        <div class="section">
          <h2>⚠️ Critical Issues</h2>
          <div class="issues-list">
            ${results.criticalIssues.map(issue => `
              <div class="issue-item">
                <h4>${issue.title}</h4>
                <p>${issue.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${results.quickWins && results.quickWins.length > 0 ? `
        <div class="section">
          <h2>⚡ Quick Wins</h2>
          <div class="quick-wins">
            ${results.quickWins.map(win => `
              <div class="quick-win-item">
                <span>✓</span>
                <span>${win}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${results.checksByCategory ? `
        <div class="section">
          <h2>📋 Category Breakdown</h2>
          <div class="category-grid">
            ${Object.entries(results.checksByCategory).map(([category, data]) => {
              const catScore = Math.round((data.passed / data.total) * 100)
              const catColor = catScore >= 80 ? '#10b981' : catScore >= 60 ? '#f59e0b' : '#ef4444'
              return `
                <div class="category-card">
                  <h3>
                    ${category}
                    <span class="score-badge" style="background: ${catColor}20; color: ${catColor};">${catScore}%</span>
                  </h3>
                  ${data.checks.slice(0, 5).map(check => `
                    <div class="check-item">
                      <span class="check-icon ${check.passed ? 'pass' : 'fail'}">${check.passed ? '✓' : '✗'}</span>
                      <span>${check.name}</span>
                      <span style="margin-left: auto; color: #666; font-size: 11px;">${check.message}</span>
                    </div>
                  `).join('')}
                  ${data.checks.length > 5 ? `<div style="text-align: center; color: #666; font-size: 11px; padding-top: 8px;">+${data.checks.length - 5} more checks</div>` : ''}
                </div>
              `
            }).join('')}
          </div>
        </div>
      ` : ''}

      ${results.contentAnalysis ? `
        <div class="section">
          <h2>📝 Content Analysis</h2>
          <div class="perf-grid">
            <div class="perf-item">
              <div class="value">${results.contentAnalysis.wordCount}</div>
              <div class="label">Word Count</div>
            </div>
            <div class="perf-item">
              <div class="value">${results.contentAnalysis.readability}</div>
              <div class="label">Readability Score</div>
            </div>
            <div class="perf-item">
              <div class="value">${results.performance?.htmlSize || 0}KB</div>
              <div class="label">HTML Size</div>
            </div>
          </div>
          ${results.contentAnalysis.keywords && results.contentAnalysis.keywords.length > 0 ? `
            <div style="margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 12px;">
              <div style="font-weight: 600; margin-bottom: 8px; font-size: 14px;">Top Keywords</div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${results.contentAnalysis.keywords.map(kw => `
                  <span style="padding: 4px 12px; background: #e0e7ff; color: #3730a3; border-radius: 20px; font-size: 12px;">${kw.word} (${kw.count})</span>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      ` : ''}

      <div class="footer">
        <p>Generated by <strong>AI SEO Turbo</strong> • https://aiseoturbo.com</p>
        <p style="margin-top: 8px;">This is a lite audit. Sign up free for Core Web Vitals, accessibility audit, and detailed recommendations.</p>
      </div>
    </body>
    </html>
  `

  // Open print dialog with the HTML content
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    
    // Wait for content to load then trigger print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
      }, 250)
    }
  }
}
