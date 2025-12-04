"use client"

import { useState } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { normalizeUrl } from '@/lib/url/normalize'
import { Globe, Search, AlertTriangle, CheckCircle, Clock, TrendingUp, FileText, Link as LinkIcon, Image as ImageIcon, Zap, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CrawlPage {
  url: string
  statusCode: number
  title: string | null
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
  }
}

export default function SiteCrawlerPage() {
  const [url, setUrl] = useState('')
  const [crawling, setCrawling] = useState(false)
  const [results, setResults] = useState<CrawlResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const handleCrawl = async () => {
    const normalized = normalizeUrl(url)
    if (!normalized) {
      setError('Please enter a valid URL (e.g., example.com or https://example.com)')
      return
    }

    setError(null)
    setCrawling(true)
    setResults(null)
    setProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90))
    }, 500)

    try {
      const response = await fetch('/api/crawl/lite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to crawl site')
      }

      const data = await response.json()
      clearInterval(progressInterval)
      setProgress(100)
      setResults(data)
    } catch (err) {
      console.error('Crawl error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred during crawling')
      clearInterval(progressInterval)
    } finally {
      setCrawling(false)
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Site Crawler</h1>
            <p className="text-xl text-gray-300 mb-6">Deep website analysis - crawls up to 10 pages and identifies technical issues</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-sm font-medium text-blue-300">
              <Zap className="w-4 h-4" />
              <span>Free lite crawl - Sign up for unlimited pages</span>
            </div>
          </div>

          {/* Crawl Form */}
          <Card className="mb-12 bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white"><Globe className="w-5 h-5" />Start Website Crawl</CardTitle>
              <CardDescription className="text-gray-400">Enter your website URL to analyze up to 10 pages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="https://example.com or example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !crawling && handleCrawl()}
                  disabled={crawling}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button onClick={handleCrawl} disabled={crawling || !url.trim()} size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700">
                  {crawling ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Crawling...</>
                  ) : (
                    <><Search className="w-5 h-5 mr-2" />Start Crawl</>
                  )}
                </Button>
              </div>
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}
              {crawling && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Crawling pages...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          <AnimatePresence>
            {results && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Success Badge */}
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-900/20 border-2 border-green-500/50 rounded-full">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-700 dark:text-green-300 font-semibold">Crawl Completed Successfully</span>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-center">Crawl Results for {new URL(url).hostname}</h2>
                <p className="text-center text-gray-400">Crawled {results.pages.length} pages in {(results.stats.avgLoadTimeMs / 1000).toFixed(1)} seconds</p>

                {/* Stats Overview */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader><CardTitle className="text-white">Crawl Overview</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-blue-400">{results.stats.totalPages}</div>
                        <div className="text-sm text-gray-400">Total Pages</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-green-400">{results.stats.successful}</div>
                        <div className="text-sm text-gray-400">Successful</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-red-400">{results.stats.failed}</div>
                        <div className="text-sm text-gray-400">Failed</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div className="text-3xl font-bold text-orange-400">{results.stats.avgLoadTimeMs}ms</div>
                        <div className="text-sm text-gray-400">Avg Load Time</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Technical SEO Checks */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader><CardTitle className="text-white">Technical SEO Checks</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-400" />
                          <span className="font-medium">Robots.txt</span>
                        </div>
                        <Badge variant={results.robots === 'present' ? 'default' : 'destructive'}>
                          {results.robots === 'present' ? 'Present' : 'Missing'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-purple-400" />
                          <span className="font-medium">Sitemap.xml</span>
                        </div>
                        <Badge variant={results.sitemap === 'present' ? 'default' : 'destructive'}>
                          {results.sitemap === 'present' ? 'Present' : 'Missing'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SEO Issues Found */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      SEO Issues Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-red-900/20 rounded-lg border border-red-800/50">
                        <div className="text-2xl font-bold text-red-400">{results.issuesSummary.missingTitles}</div>
                        <div className="text-sm text-gray-400">Missing Titles</div>
                      </div>
                      <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
                        <div className="text-2xl font-bold text-yellow-400">{results.issuesSummary.missingH1}</div>
                        <div className="text-sm text-gray-400">Missing H1 Tags</div>
                      </div>
                      <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-800/50">
                        <div className="text-2xl font-bold text-orange-400">{results.issuesSummary.missingMeta}</div>
                        <div className="text-sm text-gray-400">Missing Meta Desc</div>
                      </div>
                      <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/50">
                        <div className="text-2xl font-bold text-purple-400">{results.issuesSummary.imagesWithoutAlt}</div>
                        <div className="text-sm text-gray-400">Images Without Alt</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Crawled Pages Table */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader><CardTitle className="text-white">Crawled Pages</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {results.pages.map((page, i) => (
                        <div key={i} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={page.statusCode === 200 ? 'default' : 'destructive'}>{page.statusCode}</Badge>
                                <span className="text-sm font-mono text-gray-300 truncate">{page.url}</span>
                              </div>
                              {page.title && <p className="text-sm text-gray-400">Title: {page.title}</p>}
                              {page.issues.length > 0 && (
                                <div className="flex gap-2 mt-2">
                                  {page.issues.map((issue, j) => (
                                    <Badge key={j} variant="outline" className="text-xs">{issue}</Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upgrade CTA */}
                <div className="text-center p-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl border-2 border-purple-500/30">
                  <h3 className="text-2xl font-bold mb-2">Want to crawl your entire site?</h3>
                  <p className="text-gray-300 mb-4">Unlock unlimited page crawls, advanced filters, and export options</p>
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700" onClick={() => window.location.href = '/dashboard'}>
                    Upgrade to Full Crawler →
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  )
}
