"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Globe, 
  FileText, 
  Link, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Loader2,
  Search,
  Code,
  Shield,
  Zap,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState, useRef } from 'react'
import { useTranslations } from 'next-intl'

interface CrawlProgress {
  status: 'idle' | 'starting' | 'crawling' | 'analyzing' | 'completed' | 'error'
  currentPage: string
  pagesScanned: number
  totalPages: number
  currentAction: string
}

interface AnimatedCrawlVisualizationProps {
  url: string
  maxPages?: number
  onProgressUpdate?: (progress: CrawlProgress) => void
}

interface ActivityItem {
  id: number
  type: 'crawl' | 'check' | 'success' | 'warning' | 'info'
  message: string
  timestamp: Date
}

export function AnimatedCrawlVisualization({ url, maxPages = 25 }: AnimatedCrawlVisualizationProps) {
  const t = useTranslations('crawlResults.visualization');
  const [progress, setProgress] = useState<CrawlProgress>({
    status: 'starting',
    currentPage: url,
    pagesScanned: 0,
    totalPages: maxPages,
    currentAction: t('actions.initializing')
  })
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const activityIdRef = useRef(0)
  const activityContainerRef = useRef<HTMLDivElement>(null)
  const [estimatedProgress, setEstimatedProgress] = useState(0)

  // Auto-scroll activity feed
  useEffect(() => {
    if (activityContainerRef.current) {
      activityContainerRef.current.scrollTop = activityContainerRef.current.scrollHeight
    }
  }, [activities])

  // Realistic progress animation based on estimated crawl time
  useEffect(() => {
    // Estimate: ~200ms per page + 2s initial setup
    const estimatedTotalTime = (maxPages * 200) + 2000
    const startTime = Date.now()
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      // Use a logarithmic curve for more realistic progress feel
      // Progress fast at start, slows down toward the end
      const linearProgress = Math.min(elapsed / estimatedTotalTime, 0.95)
      const curvedProgress = Math.pow(linearProgress, 0.7) * 100
      setEstimatedProgress(Math.round(curvedProgress))
    }, 100)

    return () => clearInterval(progressInterval)
  }, [maxPages])

  // Simulate crawling progress with realistic activities
  useEffect(() => {
    const actions = [
      { action: t('actions.connecting'), type: 'info' as const },
      { action: t('actions.checkingRobots'), type: 'check' as const },
      { action: t('actions.fetchingSitemap'), type: 'check' as const },
      { action: t('actions.startingCrawl'), type: 'crawl' as const },
    ]

    const pageActions = [
      t('pageActions.extractingMeta'),
      t('pageActions.analyzingHeadings'),
      t('pageActions.checkingLinks'),
      t('pageActions.scanningImages'),
      t('pageActions.validatingData'),
      t('pageActions.measuringPerformance'),
      t('pageActions.checkingMobile'),
      t('pageActions.analyzingContent')
    ]

    let currentStep = 0
    let pagesScanned = 0

    const addActivity = (type: ActivityItem['type'], message: string) => {
      activityIdRef.current++
      setActivities(prev => [...prev.slice(-15), { 
        id: activityIdRef.current, 
        type, 
        message, 
        timestamp: new Date() 
      }])
    }

    // Initial actions
    const initialInterval = setInterval(() => {
      if (currentStep < actions.length) {
        const action = actions[currentStep]
        setProgress(prev => ({ ...prev, currentAction: action.action, status: 'crawling' }))
        addActivity(action.type, action.action)
        currentStep++
      } else {
        clearInterval(initialInterval)
        // Start page crawling simulation
        startPageCrawl()
      }
    }, 800)

    const startPageCrawl = () => {
      const crawlInterval = setInterval(() => {
        if (pagesScanned < maxPages) {
          pagesScanned++
          const pagePath = pagesScanned === 1 ? '/' : `/page-${pagesScanned}`
          const fullUrl = new URL(url).origin + pagePath
          
          // Random action for this page
          const randomAction = pageActions[Math.floor(Math.random() * pageActions.length)]
          
          setProgress(prev => ({
            ...prev,
            status: 'crawling',
            currentPage: fullUrl,
            pagesScanned,
            currentAction: `${randomAction}...`
          }))

          addActivity('crawl', `Crawling: ${pagePath}`)
          
          // Occasionally add check results
          if (Math.random() > 0.6) {
            setTimeout(() => {
              const checks = [
                { type: 'success' as const, msg: t('checks.metaValid') },
                { type: 'warning' as const, msg: t('checks.missingAlt', { count: Math.floor(Math.random() * 5) + 1 }) },
                { type: 'success' as const, msg: t('checks.h1Present') },
                { type: 'warning' as const, msg: t('checks.longTitle', { chars: 60 + Math.floor(Math.random() * 20) }) },
                { type: 'success' as const, msg: t('checks.internalLinks', { count: Math.floor(Math.random() * 20) + 5 }) },
              ]
              const check = checks[Math.floor(Math.random() * checks.length)]
              addActivity(check.type, check.msg)
            }, 400)
          }
        } else {
          clearInterval(crawlInterval)
          setProgress(prev => ({
            ...prev,
            status: 'analyzing',
            currentAction: t('actions.analyzing')
          }))
          addActivity('info', t('actions.generatingReport'))
        }
      }, 600)
    }

    return () => {
      clearInterval(initialInterval)
    }
  }, [url, maxPages])

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'crawl': return <Globe className="w-3 h-3 text-blue-400" />
      case 'check': return <Search className="w-3 h-3 text-purple-400" />
      case 'success': return <CheckCircle className="w-3 h-3 text-green-400" />
      case 'warning': return <AlertTriangle className="w-3 h-3 text-yellow-400" />
      case 'info': return <Zap className="w-3 h-3 text-cyan-400" />
    }
  }

  // Use the smoother estimated progress instead of discrete page count
  const progressPercent = estimatedProgress

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      {/* Main visualization card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl shadow-2xl">
        {/* Animated background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{t('header.title')}</h3>
                  <p className="text-sm text-gray-400 truncate max-w-[300px]">{url}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30">
                <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                <span className="text-sm font-medium text-blue-300">
                  {progress.status === 'analyzing' ? t('status.analyzing') : t('status.crawling')}
                </span>
              </div>
            </div>
          </div>

          {/* Progress section */}
          <div className="px-6 py-4 border-b border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">{t('progress.label')}</span>
              <span className="text-sm font-bold text-white">
                {t('progress.complete', { percent: progressPercent })}
              </span>
            </div>
            <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              {/* Animated shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-400">{progress.currentAction}</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-px bg-white/5">
            {[
              { icon: FileText, label: t('statsGrid.pages'), value: progress.pagesScanned, color: 'blue' },
              { icon: Link, label: t('statsGrid.links'), value: Math.floor(progress.pagesScanned * 8.5), color: 'purple' },
              { icon: ImageIcon, label: t('statsGrid.images'), value: Math.floor(progress.pagesScanned * 4.2), color: 'cyan' },
              { icon: Code, label: t('statsGrid.issues'), value: Math.floor(progress.pagesScanned * 1.3), color: 'orange' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 bg-slate-800/30 text-center"
              >
                <stat.icon className={cn(
                  "w-5 h-5 mx-auto mb-2",
                  stat.color === 'blue' && 'text-blue-400',
                  stat.color === 'purple' && 'text-purple-400',
                  stat.color === 'cyan' && 'text-cyan-400',
                  stat.color === 'orange' && 'text-orange-400',
                )} />
                <motion.div
                  key={stat.value}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-xl font-bold text-white"
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Activity feed */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-400">{t('activity.title')}</h4>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-500">{t('activity.realtime')}</span>
              </div>
            </div>
            <div 
              ref={activityContainerRef}
              className="h-40 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent"
            >
              <AnimatePresence mode="popLayout">
                {activities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {getActivityIcon(activity.type)}
                    <span className="text-xs text-gray-300 flex-1 truncate">{activity.message}</span>
                    <span className="text-[10px] text-gray-600">
                      {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Current page being crawled */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <Loader2 className="w-4 h-4 text-blue-400 animate-spin flex-shrink-0" />
              <span className="text-sm text-gray-300 truncate">
                {t('current.label')}: <span className="text-blue-300 font-mono">{progress.currentPage}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
