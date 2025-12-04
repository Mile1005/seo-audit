"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  Search, 
  FileText, 
  Link, 
  Image as ImageIcon, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Globe,
  Smartphone,
  Eye,
  Code,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface AuditProgress {
  status: 'idle' | 'fetching' | 'analyzing' | 'processing' | 'completed' | 'error'
  currentStep: string
  progress: number
  steps: string[]
}

interface AnimatedAuditVisualizationProps {
  progress?: AuditProgress
  url?: string
}

interface CheckItem {
  icon: React.ReactNode
  label: string
  status: 'pending' | 'checking' | 'complete' | 'issue'
  delay: number
}

export function AnimatedAuditVisualization({ progress: propProgress, url = 'Analyzing...' }: AnimatedAuditVisualizationProps) {
  const t = useTranslations('liteAudit.visualization')
  
  // Default progress for auto-animation mode
  const defaultProgress: AuditProgress = {
    status: 'fetching',
    currentStep: t('status.connecting'),
    progress: 0,
    steps: ['Fetching', 'Analyzing', 'Processing', 'Complete']
  }
  
  // Auto-animate when no progress prop is provided
  const [autoProgress, setAutoProgress] = useState<AuditProgress>(defaultProgress)
  const isAutoMode = !propProgress
  const progress = propProgress || autoProgress

  // Auto-animation effect
  useEffect(() => {
    if (!isAutoMode) return

    const stages = [
      { progress: 15, status: 'fetching' as const, step: t('status.connecting') },
      { progress: 35, status: 'analyzing' as const, step: t('status.parsingHtml') },
      { progress: 55, status: 'analyzing' as const, step: t('status.analyzingMeta') },
      { progress: 75, status: 'processing' as const, step: t('status.runningSeo') },
      { progress: 90, status: 'processing' as const, step: t('status.calculatingScores') },
      { progress: 100, status: 'completed' as const, step: t('status.auditComplete') },
    ]

    let currentStage = 0
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        const stage = stages[currentStage]
        setAutoProgress({
          status: stage.status,
          currentStep: stage.step,
          progress: stage.progress,
          steps: ['Fetching', 'Analyzing', 'Processing', 'Complete']
        })
        currentStage++
      } else {
        // Loop back for continuous animation
        currentStage = 0
        setAutoProgress({
          status: 'fetching',
          currentStep: t('status.connecting'),
          progress: 0,
          steps: ['Fetching', 'Analyzing', 'Processing', 'Complete']
        })
      }
    }, 1200)

    return () => clearInterval(interval)
  }, [isAutoMode, t])
  // Dynamic check items based on progress
  const getCheckItems = (): CheckItem[] => {
    const items: CheckItem[] = [
      {
        icon: <Globe className="w-5 h-5" />,
        label: t('checkItems.pageAccessibility'),
        status: progress.progress > 15 ? 'complete' : progress.progress > 10 ? 'checking' : 'pending',
        delay: 0.1
      },
      {
        icon: <FileText className="w-5 h-5" />,
        label: t('checkItems.metaTags'),
        status: progress.progress > 35 ? 'complete' : progress.progress > 25 ? 'checking' : 'pending',
        delay: 0.2
      },
      {
        icon: <Code className="w-5 h-5" />,
        label: t('checkItems.htmlStructure'),
        status: progress.progress > 50 ? 'complete' : progress.progress > 40 ? 'checking' : 'pending',
        delay: 0.3
      },
      {
        icon: <Link className="w-5 h-5" />,
        label: t('checkItems.internalLinks'),
        status: progress.progress > 65 ? 'complete' : progress.progress > 55 ? 'checking' : 'pending',
        delay: 0.4
      },
      {
        icon: <ImageIcon className="w-5 h-5" />,
        label: t('checkItems.imageOptimization'),
        status: progress.progress > 75 ? 'complete' : progress.progress > 68 ? 'checking' : 'pending',
        delay: 0.5
      },
      {
        icon: <Smartphone className="w-5 h-5" />,
        label: t('checkItems.mobileFriendly'),
        status: progress.progress > 85 ? 'complete' : progress.progress > 78 ? 'checking' : 'pending',
        delay: 0.6
      },
      {
        icon: <Zap className="w-5 h-5" />,
        label: t('checkItems.pageSpeed'),
        status: progress.progress > 92 ? 'complete' : progress.progress > 87 ? 'checking' : 'pending',
        delay: 0.7
      },
      {
        icon: <Eye className="w-5 h-5" />,
        label: t('checkItems.seoScore'),
        status: progress.progress > 98 ? 'complete' : progress.progress > 93 ? 'checking' : 'pending',
        delay: 0.8
      }
    ]

    return items
  }

  const checkItems = getCheckItems()

  const getStatusColor = (status: CheckItem['status']) => {
    switch (status) {
      case 'complete':
        return 'text-green-500 bg-green-500/10 border-green-500/30'
      case 'checking':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/30 animate-pulse'
      case 'issue':
        return 'text-red-500 bg-red-500/10 border-red-500/30'
      default:
        return 'text-gray-400 bg-gray-500/5 border-gray-500/20'
    }
  }

  const getStatusIcon = (item: CheckItem) => {
    switch (item.status) {
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'checking':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      case 'issue':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-purple-500/20 overflow-hidden"
    >
      {/* Header - Simulated Browser Bar */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-3 bg-slate-700/50 rounded-lg px-4 py-2">
          <Globe className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-300 truncate flex-1">{url}</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-400">Auditing</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {progress.currentStep}
          </span>
          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
            {progress.progress}%
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress.progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Animated Checks Grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence>
          {checkItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item.delay, duration: 0.4 }}
              className={cn(
                'flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300',
                getStatusColor(item.status)
              )}
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {item.label}
                </p>
              </div>
              <div className="flex-shrink-0">
                {getStatusIcon(item)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Live Activity Feed */}
      <div className="px-6 pb-6">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                {progress.status === 'fetching' && t('activityFeed.fetching')}
                {progress.status === 'analyzing' && t('activityFeed.analyzing')}
                {progress.status === 'processing' && t('activityFeed.processing')}
                {progress.status === 'completed' && t('activityFeed.completed')}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={progress.status}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-wrap gap-2"
                >
                  {progress.status === 'fetching' && (
                    <>
                      <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{t('tags.dnsLookup')}</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{t('tags.sslCheck')}</span>
                    </>
                  )}
                  {progress.status === 'analyzing' && (
                    <>
                      <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">{t('tags.metaTags')}</span>
                      <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">{t('tags.headings')}</span>
                      <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">{t('tags.links')}</span>
                    </>
                  )}
                  {progress.status === 'processing' && (
                    <>
                      <span className="text-xs px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded">{t('tags.performance')}</span>
                      <span className="text-xs px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded">{t('tags.accessibility')}</span>
                      <span className="text-xs px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded">{t('tags.mobile')}</span>
                    </>
                  )}
                  {progress.status === 'completed' && (
                    <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">{t('tags.ready')}</span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Animation */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
          >
            <motion.div
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.min(Math.floor(progress.progress / 10), 8)}
            </motion.div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{t('stats.checksDone')}</div>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
          >
            <motion.div
              className="text-2xl font-bold text-green-600 dark:text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.max(0, Math.floor(progress.progress / 15) - 1)}
            </motion.div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{t('stats.issuesFound')}</div>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
          >
            <motion.div
              className="text-2xl font-bold text-purple-600 dark:text-purple-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ~{Math.floor(progress.progress / 20)}
            </motion.div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{t('stats.quickWins')}</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
