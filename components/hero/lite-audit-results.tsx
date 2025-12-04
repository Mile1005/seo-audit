"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertTriangle, ArrowRight, Lock, Zap, RefreshCw, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScoreRing } from '@/components/ui/score-ring'
import { cn } from '@/lib/utils'
import { useState } from 'react'

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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(Object.keys(results.checksByCategory || {}))
  )

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
        <p className="text-red-600">Error: Invalid audit results</p>
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
        <div className="p-12 text-center border-b border-gray-200 dark:border-gray-800">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block"
          >
            <ScoreRing score={results.score} size={180} strokeWidth={14} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-lg text-gray-600 dark:text-gray-400"
          >
            SEO Performance Score
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-800">
          {[
            { label: 'Total Checks', value: results.stats?.totalChecks || 0, color: 'text-gray-900 dark:text-white' },
            { label: 'Passed', value: results.stats?.passedChecks || 0, color: 'text-green-600 dark:text-green-400' },
            { label: 'Issues', value: results.stats?.failedChecks || 0, color: 'text-red-600 dark:text-red-400' },
            { label: 'Load Time', value: `${results.performance?.loadTime || 0}s`, color: 'text-blue-600 dark:text-blue-400' },
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
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Category Breakdown</h3>
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
                            {data.passed} of {data.total} passed
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
              Critical Issues
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
              Quick Wins
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

        <div className="relative p-16 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-900">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full text-indigo-700 dark:text-indigo-300 text-sm font-semibold">
              <Lock className="w-4 h-4" />
              <span>Unlock Premium Features</span>
            </div>
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white">Get Your Complete SEO Report</h4>
            <p className="text-lg text-gray-600 dark:text-gray-400">{results.message || 'Sign up to unlock full features'}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={onViewFull}
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-6 text-lg"
              >
                <Lock className="w-5 h-5 mr-2" />
                Unlock Full Report
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={onRunAnother}
                size="lg"
                variant="outline"
                className="border-2 px-8 py-6 text-lg"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Another URL
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
