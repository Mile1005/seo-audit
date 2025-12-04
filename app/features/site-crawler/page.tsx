"use client"

import { useState, useRef, useEffect } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { normalizeUrl } from '@/lib/url/normalize'
import { 
  Globe, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Zap, 
  Loader2,
  ArrowDown,
  Sparkles,
  TrendingUp,
  Shield,
  Link,
  Image as ImageIcon,
  Code,
  ChevronDown,
  ExternalLink,
  Download,
  RefreshCw,
  BarChart3
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedCrawlVisualization } from '@/components/crawl/animated-crawl-visualization'

interface CrawlPage {
  url: string
  statusCode: number
  title: string | null
  metaDescription?: string | null
  h1?: string | null
  loadTime?: number
  issues: string[]
}

interface CrawlResult {
  pages: CrawlPage[]
  stats: {
    totalPages: number
    successful: number
    failed: number
    avgLoadTimeMs: number
  }
  robots: 'present' | 'missing'
  sitemap: 'present' | 'missing'
  issuesSummary: {
    missingTitles: number
    missingMeta: number
    missingH1: number
    imagesWithoutAlt: number
    brokenLinks?: number
    redirectChains?: number
    duplicateContent?: number
  }
  duplicates?: Array<{ type: string; content: string; urls: string[] }>
  redirectChains?: Array<{ from: string; to: string }>
  brokenLinks?: string[]
}

const PAGE_OPTIONS = [
  { value: 10, label: '10 pages', description: 'Quick scan' },
  { value: 25, label: '25 pages', description: 'Standard' },
  { value: 50, label: '50 pages', description: 'Deep crawl' },
]

export default function SiteCrawlerPage() {
  const [url, setUrl] = useState('')
  const [maxPages, setMaxPages] = useState(25)
  const [crawling, setCrawling] = useState(false)
  const [results, setResults] = useState<CrawlResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showPageOptions, setShowPageOptions] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const crawlVisualizationRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to visualization when crawl starts
  useEffect(() => {
    if (crawling && crawlVisualizationRef.current) {
      setTimeout(() => {
        crawlVisualizationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  }, [crawling])

  // Auto-scroll to results when complete
  useEffect(() => {
    if (results && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 500)
    }
  }, [results])

  const handleCrawl = async () => {
    const normalized = normalizeUrl(url.trim())
    if (!normalized) {
      setError('Please enter a valid URL (e.g., example.com, www.example.com, or https://example.com)')
      return
    }

    setError(null)
    setCrawling(true)
    setResults(null)

    try {
      const response = await fetch('/api/crawl/lite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized, maxPages })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to crawl site')
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      console.error('Crawl error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred during crawling')
    } finally {
      setCrawling(false)
    }
  }

  const handleNewCrawl = () => {
    setUrl('')
    setResults(null)
    setError(null)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-green-500/20 to-emerald-500/20 border-green-500/30'
    if (score >= 50) return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
    return 'from-red-500/20 to-rose-500/20 border-red-500/30'
  }

  // Calculate a simple score based on issues
  const calculateScore = (result: CrawlResult): number => {
    const totalIssues = 
      result.issuesSummary.missingTitles +
      result.issuesSummary.missingMeta +
      result.issuesSummary.missingH1 +
      result.issuesSummary.imagesWithoutAlt
    const maxIssues = result.stats.totalPages * 4 // 4 checks per page
    const issueScore = Math.max(0, 100 - (totalIssues / maxIssues) * 100)
    
    // Factor in robots and sitemap
    let bonus = 0
    if (result.robots === 'present') bonus += 5
    if (result.sitemap === 'present') bonus += 5
    
    return Math.min(100, Math.round(issueScore + bonus))
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          <div className="container mx-auto px-4 py-16 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full text-sm mb-6">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300">AI-Powered Site Analysis</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Site Crawler
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Deep-dive into your website's technical SEO health. Crawl up to 50 pages and uncover issues that impact your rankings.
              </p>
            </motion.div>

            {/* Main Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-3xl mx-auto"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl shadow-2xl">
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-50 blur-xl" />
                
                <div className="relative p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">Start Your Crawl</h2>
                      <p className="text-sm text-gray-400">Enter any URL format - we'll handle the rest</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* URL Input */}
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="example.com, www.example.com, or https://example.com"
                        value={url}
                        onChange={(e) => {
                          setUrl(e.target.value)
                          if (error) setError(null)
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && !crawling && url.trim() && handleCrawl()}
                        disabled={crawling}
                        className="h-14 text-lg pl-12 pr-4 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-gray-500 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>

                    {/* Page limit selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowPageOptions(!showPageOptions)}
                        disabled={crawling}
                        className="w-full h-12 px-4 bg-slate-800/50 border border-slate-600/50 rounded-xl flex items-center justify-between text-left hover:bg-slate-700/50 transition-colors disabled:opacity-50"
                      >
                        <div className="flex items-center gap-3">
                          <BarChart3 className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-300">
                            Crawl up to <span className="text-white font-semibold">{maxPages} pages</span>
                          </span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showPageOptions ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {showPageOptions && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 p-2 bg-slate-800 border border-slate-600/50 rounded-xl shadow-2xl z-50"
                          >
                            {PAGE_OPTIONS.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                  setMaxPages(option.value)
                                  setShowPageOptions(false)
                                }}
                                className={`w-full px-4 py-3 rounded-lg flex items-center justify-between hover:bg-slate-700/50 transition-colors ${
                                  maxPages === option.value ? 'bg-blue-500/20 border border-blue-500/30' : ''
                                }`}
                              >
                                <div>
                                  <span className="text-white font-medium">{option.label}</span>
                                  <span className="text-gray-500 text-sm ml-2">— {option.description}</span>
                                </div>
                                {maxPages === option.value && (
                                  <CheckCircle className="w-5 h-5 text-blue-400" />
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Error message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3"
                        >
                          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <p className="text-red-300 text-sm">{error}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit button */}
                    <Button
                      onClick={handleCrawl}
                      disabled={crawling || !url.trim()}
                      size="lg"
                      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 disabled:opacity-50 disabled:shadow-none"
                    >
                      {crawling ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Crawling in progress...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Zap className="w-5 h-5" />
                          Start Crawl
                        </span>
                      )}
                    </Button>
                  </div>

                  {/* Trust indicators */}
                  <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span>Secure & Private</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span>Fast Analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                      <span>No signup required</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Scroll indicator when crawling */}
            {crawling && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center mt-8"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown className="w-6 h-6 text-blue-400" />
                </motion.div>
                <p className="text-sm text-gray-500 mt-2">Scroll to see live progress</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Crawl Visualization Section */}
        <AnimatePresence>
          {crawling && (
            <motion.div
              ref={crawlVisualizationRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="container mx-auto px-4 py-12"
            >
              <AnimatedCrawlVisualization url={normalizeUrl(url.trim()) || url} maxPages={maxPages} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {results && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="container mx-auto px-4 py-12"
            >
              {/* Success banner */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex justify-center mb-8"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 font-semibold">Crawl Completed Successfully</span>
                </div>
              </motion.div>

              {/* Main results header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Results for{' '}
                  <span className="text-blue-400">
                    {(() => {
                      try {
                        return new URL(results.pages[0]?.url || url).hostname
                      } catch {
                        return url
                      }
                    })()}
                  </span>
                </h2>
                <p className="text-gray-400">
                  Crawled {results.stats.totalPages} pages in {(results.stats.avgLoadTimeMs * results.stats.totalPages / 1000).toFixed(1)}s
                </p>
              </div>

              {/* Score Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto mb-12"
              >
                <div className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${getScoreBg(calculateScore(results))} p-8 text-center`}>
                  <div className="relative z-10">
                    <div className={`text-6xl font-bold mb-2 ${getScoreColor(calculateScore(results))}`}>
                      {calculateScore(results)}
                    </div>
                    <div className="text-gray-400 text-lg">SEO Health Score</div>
                    <div className="mt-4 flex justify-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{results.stats.successful}</div>
                        <div className="text-xs text-gray-500">Passed</div>
                      </div>
                      <div className="w-px bg-white/10" />
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">{results.stats.failed}</div>
                        <div className="text-xs text-gray-500">Failed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: FileText, label: 'Total Pages', value: results.stats.totalPages, color: 'blue' },
                  { icon: CheckCircle, label: 'Successful', value: results.stats.successful, color: 'green' },
                  { icon: AlertTriangle, label: 'Issues Found', value: results.stats.failed, color: 'red' },
                  { icon: Zap, label: 'Avg Load Time', value: `${results.stats.avgLoadTimeMs}ms`, color: 'orange' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-xl bg-slate-800/50 border border-white/5 text-center"
                  >
                    <stat.icon className={`w-6 h-6 mx-auto mb-3 ${
                      stat.color === 'blue' ? 'text-blue-400' :
                      stat.color === 'green' ? 'text-green-400' :
                      stat.color === 'red' ? 'text-red-400' : 'text-orange-400'
                    }`} />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Technical SEO Checks */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 rounded-xl bg-slate-800/50 border border-white/5"
                >
                  <h3 className="text-lg font-semibold mb-4 text-white">Technical SEO</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <span>Robots.txt</span>
                      </div>
                      <Badge variant={results.robots === 'present' ? 'default' : 'destructive'} className={results.robots === 'present' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}>
                        {results.robots === 'present' ? 'Found' : 'Missing'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-purple-400" />
                        <span>Sitemap.xml</span>
                      </div>
                      <Badge variant={results.sitemap === 'present' ? 'default' : 'destructive'} className={results.sitemap === 'present' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}>
                        {results.sitemap === 'present' ? 'Found' : 'Missing'}
                      </Badge>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 rounded-xl bg-slate-800/50 border border-white/5"
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    Issues Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Missing Titles', value: results.issuesSummary.missingTitles, color: 'red' },
                      { label: 'Missing H1', value: results.issuesSummary.missingH1, color: 'yellow' },
                      { label: 'Missing Meta', value: results.issuesSummary.missingMeta, color: 'orange' },
                      { label: 'Images w/o Alt', value: results.issuesSummary.imagesWithoutAlt, color: 'purple' },
                    ].map((issue) => (
                      <div key={issue.label} className="p-3 rounded-lg bg-slate-700/30 text-center">
                        <div className={`text-xl font-bold ${
                          issue.color === 'red' ? 'text-red-400' :
                          issue.color === 'yellow' ? 'text-yellow-400' :
                          issue.color === 'orange' ? 'text-orange-400' : 'text-purple-400'
                        }`}>
                          {issue.value}
                        </div>
                        <div className="text-xs text-gray-500">{issue.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Crawled Pages Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-slate-800/50 border border-white/5 overflow-hidden"
              >
                <div className="p-6 border-b border-white/5">
                  <h3 className="text-lg font-semibold text-white">Crawled Pages</h3>
                  <p className="text-sm text-gray-500">Detailed analysis of each page</p>
                </div>
                <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
                  {results.pages.map((page, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-4 hover:bg-slate-700/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge 
                              variant={page.statusCode === 200 ? 'default' : 'destructive'}
                              className={page.statusCode === 200 ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                            >
                              {page.statusCode}
                            </Badge>
                            <a 
                              href={page.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm font-mono text-blue-400 hover:text-blue-300 truncate flex items-center gap-1"
                            >
                              {page.url}
                              <ExternalLink className="w-3 h-3 flex-shrink-0" />
                            </a>
                          </div>
                          {page.title && (
                            <p className="text-sm text-gray-400 truncate">
                              <span className="text-gray-600">Title:</span> {page.title}
                            </p>
                          )}
                          {page.issues.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {page.issues.map((issue, j) => (
                                <Badge key={j} variant="outline" className="text-xs bg-orange-500/10 text-orange-400 border-orange-500/30">
                                  {issue}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        {page.loadTime && (
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-medium text-gray-400">{page.loadTime}ms</div>
                            <div className="text-xs text-gray-600">Load time</div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Button
                  onClick={handleNewCrawl}
                  variant="outline"
                  size="lg"
                  className="gap-2 border-white/10 hover:bg-white/5"
                >
                  <RefreshCw className="w-4 h-4" />
                  Crawl Another Site
                </Button>
                <Button
                  onClick={() => window.location.href = '/dashboard'}
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                >
                  <TrendingUp className="w-4 h-4" />
                  Get Full Report
                </Button>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-center"
              >
                <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Want unlimited crawls?</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Unlock unlimited page crawls, scheduled monitoring, and advanced export options with our Pro plan.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600"
                  onClick={() => window.location.href = '/pricing'}
                >
                  View Pricing →
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features section (show when not crawling and no results) */}
        {!crawling && !results && (
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-2">What We Analyze</h2>
              <p className="text-gray-500">Comprehensive technical SEO checks</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: FileText, title: 'Meta Tags', desc: 'Title, description, and Open Graph tags' },
                { icon: Code, title: 'HTML Structure', desc: 'Headings, semantic markup, and accessibility' },
                { icon: Link, title: 'Link Analysis', desc: 'Internal links, broken links, and redirects' },
                { icon: ImageIcon, title: 'Image Optimization', desc: 'Alt text, file sizes, and formats' },
                { icon: Shield, title: 'Security', desc: 'HTTPS, robots.txt, and sitemap' },
                { icon: Zap, title: 'Performance', desc: 'Load times and page speed metrics' },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl bg-slate-800/30 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
