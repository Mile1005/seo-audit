"use client"

import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Lock,
  Zap,
  Award,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface LiteAuditResult {
  score: number
  url: string
  criticalIssues: Array<{
    title: string
    description: string
    severity: 'high' | 'medium' | 'low'
  }>
  quickWins: string[]
  isLite: boolean
  fullReportAvailable: boolean
  message: string
  stats: {
    totalChecks: number
    passedChecks: number
    failedChecks: number
  }
}

interface LiteAuditResultsProps {
  results: LiteAuditResult
  onViewFull: () => void
  onRunAnother: () => void
}

export function LiteAuditResults({ results, onViewFull, onRunAnother }: LiteAuditResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-600'
    if (score >= 70) return 'from-yellow-500 to-orange-500'
    if (score >= 50) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-red-700'
  }

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'F'
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700'
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700'
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-6"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-purple-500/20 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            className="inline-flex flex-col items-center"
          >
            <div className={cn(
              'w-40 h-40 rounded-full flex items-center justify-center mb-4 shadow-2xl',
              'bg-gradient-to-br',
              getScoreColor(results.score)
            )}>
              <div className="text-center">
                <div className="text-6xl font-bold">{results.score}</div>
                <div className="text-xl font-semibold opacity-90">/ 100</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-6 h-6" />
              <span className="text-2xl font-bold">Grade: {getScoreGrade(results.score)}</span>
            </div>
            <p className="text-lg opacity-90">SEO Performance Score</p>
          </motion.div>
        </div>

        <div className="p-6 grid grid-cols-3 gap-4 border-b border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {results.stats.totalChecks}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Checks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {results.stats.passedChecks}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Passed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              {results.stats.failedChecks}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Issues</div>
          </div>
        </div>

        {results.criticalIssues.length > 0 && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Top Issues to Fix
            </h3>
            <div className="space-y-3">
              {results.criticalIssues.map((issue, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className={cn(
                    'p-4 rounded-lg border-2',
                    getSeverityColor(issue.severity)
                  )}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 mt-1 flex-shrink-0 text-red-500" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {issue.title}
                        </h4>
                        <Badge variant={issue.severity === 'high' ? 'destructive' : 'secondary'}>
                          {issue.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {issue.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {results.quickWins.length > 0 && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Quick Wins (Easy Fixes)
            </h3>
            <div className="space-y-2">
              {results.quickWins.map((win, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <Zap className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{win}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="relative p-6">
          <div className="blur-sm opacity-50 pointer-events-none space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Advanced Insights (Premium)
            </h3>
            <div className="space-y-2">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-white dark:from-slate-900 via-white/95 dark:via-slate-900/95 to-transparent">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-4 max-w-md px-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-300 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>40+ Additional SEO Checks</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                See Your Full SEO Report
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {results.message}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={onViewFull}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold shadow-xl"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Unlock Full Report
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  onClick={onRunAnother}
                  size="lg"
                  variant="outline"
                  className="border-2"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Try Another URL
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
