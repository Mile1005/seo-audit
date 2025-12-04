"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { normalizeUrl } from '@/lib/url/normalize'
import { AnimatedAuditVisualization } from './animated-audit-visualization'
import { LiteAuditResults } from './lite-audit-results'
import { ArrowRight, Loader2, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface AuditProgress {
  status: 'idle' | 'fetching' | 'analyzing' | 'processing' | 'completed' | 'error'
  currentStep: string
  progress: number
  steps: string[]
}

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

export function HomepageAuditSearch() {
  const t = useTranslations('home.auditSearch')
  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState<AuditProgress>({
    status: 'idle',
    currentStep: '',
    progress: 0,
    steps: []
  })
  const [results, setResults] = useState<LiteAuditResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleStartAudit = async () => {
    const normalized = normalizeUrl(url)
    if (!normalized) {
      setError('Please enter a valid URL (e.g., example.com or https://example.com)')
      return
    }

    setError(null)
    setIsAnalyzing(true)
    setResults(null)
    
    // Initialize progress
    setProgress({
      status: 'fetching',
      currentStep: 'Initializing audit...',
      progress: 10,
      steps: ['fetching', 'analyzing', 'processing']
    })

    try {
      // Start the lite audit
      const response = await fetch('/api/seo-audit/lite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to start audit')
      }

      // Simulate progress updates for better UX
      const progressSteps = [
        { status: 'fetching' as const, step: 'Fetching page content...', progress: 20, delay: 800 },
        { status: 'analyzing' as const, step: 'Analyzing HTML structure...', progress: 40, delay: 1200 },
        { status: 'analyzing' as const, step: 'Checking meta tags...', progress: 55, delay: 900 },
        { status: 'processing' as const, step: 'Evaluating SEO factors...', progress: 70, delay: 1000 },
        { status: 'processing' as const, step: 'Scanning for issues...', progress: 85, delay: 800 },
        { status: 'completed' as const, step: 'Generating report...', progress: 95, delay: 600 }
      ]

      let currentIndex = 0
      const progressInterval = setInterval(() => {
        if (currentIndex < progressSteps.length) {
          const current = progressSteps[currentIndex]
          setProgress(prev => ({
            ...prev,
            status: current.status,
            currentStep: current.step,
            progress: current.progress
          }))
          currentIndex++
        } else {
          clearInterval(progressInterval)
        }
      }, 1000)

      // Get the results
      const data = await response.json()
      
      // Clear progress interval and show results
      clearInterval(progressInterval)
      setProgress(prev => ({ ...prev, status: 'completed', progress: 100, currentStep: 'Complete!' }))
      
      // Small delay before showing results for smooth transition
      setTimeout(() => {
        setResults(data)
        setIsAnalyzing(false)
      }, 500)

    } catch (err) {
      console.error('Audit failed:', err)
      setError(err instanceof Error ? err.message : 'An error occurred during the audit')
      setProgress(prev => ({ ...prev, status: 'error' }))
      setIsAnalyzing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isAnalyzing && url.trim()) {
      handleStartAudit()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Search Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border-2 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
          <Input
            type="url"
            placeholder="Enter your website URL (e.g., example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isAnalyzing}
            className="flex-1 text-lg border-0 focus-visible:ring-0 bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500"
            aria-label="Website URL for SEO audit"
          />
          <Button
            onClick={handleStartAudit}
            disabled={isAnalyzing || !url.trim()}
            size="lg"
            className="px-8 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Analyze Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Indicators */}
        {!isAnalyzing && !results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-6 text-sm text-gray-400 dark:text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Free instant analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>No signup required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>47+ SEO checks</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Animated Audit Visualization - Replaces static mockup */}
      <AnimatePresence mode="wait">
        {isAnalyzing && (
          <AnimatedAuditVisualization 
            progress={progress}
            url={url}
          />
        )}
      </AnimatePresence>

      {/* Results Display */}
      <AnimatePresence mode="wait">
        {results && !isAnalyzing && (
          <LiteAuditResults
            results={results}
            onViewFull={() => window.location.href = '/dashboard'}
            onRunAnother={() => {
              setResults(null)
              setUrl('')
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
