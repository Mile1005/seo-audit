"use client";

import { useState, useEffect } from 'react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Progress } from '../../../components/ui/progress'
import { Alert, AlertDescription } from '../../../components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { 
  Search, 
  Globe, 
  Shield, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  ExternalLink,
  Image as ImageIcon,
  FileText,
  Link,
  Eye,
  Layers,
  Code,
  Smartphone,
  Monitor,
  XCircle,
  RefreshCw,
  Download,
  Share
} from 'lucide-react'

interface AuditResult {
  id: string
  url: string
  timestamp: string
  scores: {
    seo: number
    performance: number
    accessibility: number
    bestPractices: number
    pwa: number
  }
  coreWebVitals: {
    fcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' }
    lcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' }
    cls: { value: number; rating: 'good' | 'needs-improvement' | 'poor' }
    fid: { value: number; rating: 'good' | 'needs-improvement' | 'poor' }
  }
  technical: {
    title: { content: string; issues: string[] }
    meta_description: { content: string; issues: string[] }
    headings: { h1: number; h2: number; h3: number; h4: number; h5: number; h6: number; issues: string[] }
    images: { total: number; missingAlt: number; oversized: number; issues: string[] }
    links: { internal: number; external: number; broken: number; issues: string[] }
    schema: { found: boolean; types: string[]; errors: string[] }
    ssl: boolean
    mobile_friendly: boolean
    robots_txt: boolean
    sitemap: boolean
  }
  accessibility: {
    score: number
    alt_text_missing: number
    contrast_issues: number
    aria_issues: number
    keyboard_navigation: boolean
    issues: string[]
  }
  recommendations: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low'
    category: string
    issue: string
    description: string
    fix: string
    impact: string
    effort: string
  }>
  contentAnalysis: {
    word_count: number
    reading_level: string
    keyword_density: Array<{ keyword: string; count: number; density: number }>
    content_gaps: string[]
  }
}

export default function AuditPage() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentAudit, setCurrentAudit] = useState<AuditResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [auditHistory, setAuditHistory] = useState<AuditResult[]>([])

  // Load audit history on component mount
  useEffect(() => {
    loadAuditHistory()
  }, [])

  const loadAuditHistory = async () => {
    try {
      const response = await fetch('/api/seo-audit/history')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.audits) {
          setAuditHistory(data.audits)
        }
      }
    } catch (error) {
      console.error('Failed to load audit history:', error)
    }
  }

  const handleStartAudit = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL')
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/seo-audit/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() })
      })

      const result = await response.json()
      
      if (result.success && result.audit) {
        setCurrentAudit(result.audit)
        setUrl('')
        // Reload history to include new audit
        loadAuditHistory()
      } else {
        setError(result.error || 'Failed to perform audit')
      }
    } catch (error) {
      console.error('Error starting audit:', error)
      setError('Failed to connect to audit service')
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 dark:text-emerald-400'
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800'
    if (score >= 70) return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800'
    return 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
  }

  const getRatingColor = (rating: 'good' | 'needs-improvement' | 'poor') => {
    switch (rating) {
      case 'good': return 'text-emerald-600 dark:text-emerald-400'
      case 'needs-improvement': return 'text-yellow-600 dark:text-yellow-400'
      case 'poor': return 'text-red-600 dark:text-red-400'
    }
  }

  const getRatingBg = (rating: 'good' | 'needs-improvement' | 'poor') => {
    switch (rating) {
      case 'good': return 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800'
      case 'needs-improvement': return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800'
      case 'poor': return 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
    }
  }

  const getPriorityIcon = (priority: 'critical' | 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'critical': return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
      case 'medium': return <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      case 'low': return <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
    }
  }

  const getPriorityBg = (priority: 'critical' | 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'critical': return 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
      case 'high': return 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
      case 'medium': return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800'
      case 'low': return 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800'
    }
  }

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">SEO Audit</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Comprehensive SEO analysis with detailed performance, accessibility, and technical insights
            </p>
          </div>
          {currentAudit && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          )}
        </div>

        {/* Audit Form */}
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Search className="h-5 w-5" />
              Start New Audit
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Enter a website URL to get comprehensive SEO analysis with real data and actionable insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="url" className="text-slate-700 dark:text-slate-300">Website URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="mt-1 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleStartAudit} 
                  disabled={isLoading || !url.trim()}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Start Audit
                    </>
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <Alert className="mt-4 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <AlertDescription className="text-red-800 dark:text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Audit Results */}
        {currentAudit && (
          <div className="space-y-8">
            {/* Audit Header */}
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-slate-900 dark:text-white">{currentAudit.url}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Analyzed on {new Date(currentAudit.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Complete
                  </Badge>
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Overall Scores */}
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <TrendingUp className="h-5 w-5" />
                  Overall Performance Scores
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Key metrics that determine your website's search engine ranking potential
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {Object.entries(currentAudit.scores).map(([metric, score]) => (
                    <Card key={metric} className={`text-center ${getScoreBg(score)}`}>
                      <CardContent className="p-4">
                        <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                          {score}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 capitalize mt-1">
                          {metric === 'bestPractices' ? 'Best Practices' : metric}
                        </div>
                        <Progress 
                          value={score} 
                          className="mt-2 h-2" 
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis Tabs */}
            <Tabs defaultValue="core-vitals" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-slate-100 dark:bg-slate-800">
                <TabsTrigger value="core-vitals" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                  Core Vitals
                </TabsTrigger>
                <TabsTrigger value="technical" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                  Technical SEO
                </TabsTrigger>
                <TabsTrigger value="content" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                  Content
                </TabsTrigger>
                <TabsTrigger value="accessibility" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                  Accessibility
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                  Recommendations
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                  History
                </TabsTrigger>
              </TabsList>

              {/* Core Web Vitals */}
              <TabsContent value="core-vitals" className="space-y-6">
                <Card className="border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                      <Zap className="h-5 w-5" />
                      Core Web Vitals & Performance Metrics
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Critical metrics that affect user experience and search rankings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {Object.entries(currentAudit.coreWebVitals).map(([metric, data]) => (
                        <Card key={metric} className={`${getRatingBg(data.rating)}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase">
                                {metric}
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getRatingColor(data.rating)}`}
                              >
                                {data.rating.replace('-', ' ')}
                              </Badge>
                            </div>
                            <div className={`text-2xl font-bold ${getRatingColor(data.rating)}`}>
                              {metric === 'cls' ? data.value.toFixed(3) : 
                               metric === 'fid' ? `${data.value}ms` :
                               `${data.value.toFixed(1)}s`}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              {metric === 'fcp' && 'Time for first content to appear'}
                              {metric === 'lcp' && 'Time for largest content element'}
                              {metric === 'cls' && 'Visual stability during loading'}
                              {metric === 'fid' && 'Response time to first interaction'}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Technical SEO */}
              <TabsContent value="technical" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Page Elements */}
                  <Card className="border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                        <FileText className="h-5 w-5" />
                        Page Elements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Title */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-slate-700 dark:text-slate-300">Page Title</Label>
                          {currentAudit.technical.title.issues.length > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {currentAudit.technical.title.issues.length} issue(s)
                            </Badge>
                          )}
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md text-sm text-slate-900 dark:text-white">
                          {currentAudit.technical.title.content}
                        </div>
                        {currentAudit.technical.title.issues.map((issue, index) => (
                          <div key={index} className="text-xs text-red-600 dark:text-red-400 mt-1">
                            • {issue}
                          </div>
                        ))}
                      </div>

                      {/* Meta Description */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-slate-700 dark:text-slate-300">Meta Description</Label>
                          {currentAudit.technical.meta_description.issues.length > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {currentAudit.technical.meta_description.issues.length} issue(s)
                            </Badge>
                          )}
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md text-sm text-slate-900 dark:text-white">
                          {currentAudit.technical.meta_description.content}
                        </div>
                        {currentAudit.technical.meta_description.issues.map((issue, index) => (
                          <div key={index} className="text-xs text-red-600 dark:text-red-400 mt-1">
                            • {issue}
                          </div>
                        ))}
                      </div>

                      {/* Headings Structure */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-slate-700 dark:text-slate-300">Heading Structure</Label>
                          {currentAudit.technical.headings.issues.length > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {currentAudit.technical.headings.issues.length} issue(s)
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                          {Object.entries(currentAudit.technical.headings)
                            .filter(([key]) => key.startsWith('h'))
                            .map(([tag, count]) => (
                            <div key={tag} className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                              <div className="text-xs text-slate-600 dark:text-slate-400 uppercase">{tag}</div>
                              <div className="text-lg font-bold text-slate-900 dark:text-white">{count as number}</div>
                            </div>
                          ))}
                        </div>
                        {currentAudit.technical.headings.issues.map((issue, index) => (
                          <div key={index} className="text-xs text-red-600 dark:text-red-400 mt-1">
                            • {issue}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Technical Checks */}
                  <Card className="border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                        <Shield className="h-5 w-5" />
                        Technical Checks
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* SSL Certificate */}
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span className="text-slate-900 dark:text-white">SSL Certificate</span>
                        </div>
                        {currentAudit.technical.ssl ? (
                          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>

                      {/* Mobile Friendly */}
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          <span className="text-slate-900 dark:text-white">Mobile Friendly</span>
                        </div>
                        {currentAudit.technical.mobile_friendly ? (
                          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>

                      {/* Robots.txt */}
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span className="text-slate-900 dark:text-white">Robots.txt</span>
                        </div>
                        {currentAudit.technical.robots_txt ? (
                          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>

                      {/* Sitemap */}
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4" />
                          <span className="text-slate-900 dark:text-white">XML Sitemap</span>
                        </div>
                        {currentAudit.technical.sitemap ? (
                          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>

                      {/* Schema Markup */}
                      <div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md mb-2">
                          <div className="flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            <span className="text-slate-900 dark:text-white">Schema Markup</span>
                          </div>
                          {currentAudit.technical.schema.found ? (
                            <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        {currentAudit.technical.schema.found && (
                          <div className="pl-4">
                            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Types found:</div>
                            <div className="flex flex-wrap gap-1">
                              {currentAudit.technical.schema.types.map((type, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                            {currentAudit.technical.schema.errors.length > 0 && (
                              <div className="mt-2">
                                <div className="text-sm text-red-600 dark:text-red-400">Errors:</div>
                                {currentAudit.technical.schema.errors.map((error, index) => (
                                  <div key={index} className="text-xs text-red-600 dark:text-red-400">
                                    • {error}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Content Analysis */}
              <TabsContent value="content" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Images Analysis */}
                  <Card className="border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                        <ImageIcon aria-hidden="true" className="h-5 w-5" />
                        Images Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            {currentAudit.technical.images.total}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Total Images</div>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950 rounded-md">
                          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {currentAudit.technical.images.missingAlt}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Missing Alt</div>
                        </div>
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-md">
                          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                            {currentAudit.technical.images.oversized}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Oversized</div>
                        </div>
                      </div>
                      {currentAudit.technical.images.issues.length > 0 && (
                        <div>
                          <Label className="text-slate-700 dark:text-slate-300">Issues Found:</Label>
                          {currentAudit.technical.images.issues.map((issue, index) => (
                            <div key={index} className="text-sm text-red-600 dark:text-red-400 mt-1">
                              • {issue}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Links Analysis */}
                  <Card className="border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                        <Link className="h-5 w-5" />
                        Links Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {currentAudit.technical.links.internal}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Internal</div>
                        </div>
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950 rounded-md">
                          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {currentAudit.technical.links.external}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">External</div>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950 rounded-md">
                          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {currentAudit.technical.links.broken}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Broken</div>
                        </div>
                      </div>
                      {currentAudit.technical.links.issues.length > 0 && (
                        <div>
                          <Label className="text-slate-700 dark:text-slate-300">Issues Found:</Label>
                          {currentAudit.technical.links.issues.map((issue, index) => (
                            <div key={index} className="text-sm text-red-600 dark:text-red-400 mt-1">
                              • {issue}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Content Analysis */}
                  <Card className="border-slate-200 dark:border-slate-700 lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                        <FileText className="h-5 w-5" />
                        Content Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            {currentAudit.contentAnalysis.word_count}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Word Count</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            {currentAudit.contentAnalysis.reading_level}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Reading Level</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            {currentAudit.contentAnalysis.keyword_density.length}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Top Keywords</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            {currentAudit.contentAnalysis.content_gaps.length}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Content Gaps</div>
                        </div>
                      </div>

                      {/* Top Keywords */}
                      {currentAudit.contentAnalysis.keyword_density.length > 0 && (
                        <div>
                          <Label className="text-slate-700 dark:text-slate-300 mb-2 block">Top Keywords:</Label>
                          <div className="flex flex-wrap gap-2">
                            {currentAudit.contentAnalysis.keyword_density.slice(0, 10).map((keyword, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {keyword.keyword} ({keyword.density.toFixed(1)}%)
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Content Gaps */}
                      {currentAudit.contentAnalysis.content_gaps.length > 0 && (
                        <div>
                          <Label className="text-slate-700 dark:text-slate-300 mb-2 block">Content Gaps to Address:</Label>
                          <div className="space-y-1">
                            {currentAudit.contentAnalysis.content_gaps.map((gap, index) => (
                              <div key={index} className="text-sm text-slate-600 dark:text-slate-400">
                                • {gap}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Accessibility */}
              <TabsContent value="accessibility" className="space-y-6">
                <Card className="border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                      <Eye className="h-5 w-5" />
                      Accessibility Analysis
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Compliance with WCAG guidelines and screen reader accessibility
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Accessibility Score */}
                    <div className="text-center">
                      <Card className={`inline-block ${getScoreBg(currentAudit.accessibility.score)}`}>
                        <CardContent className="p-6">
                          <div className={`text-4xl font-bold ${getScoreColor(currentAudit.accessibility.score)}`}>
                            {currentAudit.accessibility.score}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Accessibility Score
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Accessibility Issues */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {currentAudit.accessibility.alt_text_missing}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Missing Alt Text</div>
                        </CardContent>
                      </Card>
                      <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                            {currentAudit.accessibility.contrast_issues}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Contrast Issues</div>
                        </CardContent>
                      </Card>
                      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {currentAudit.accessibility.aria_issues}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">ARIA Issues</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Keyboard Navigation */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-md">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 dark:text-white">Keyboard Navigation Support</span>
                      </div>
                      {currentAudit.accessibility.keyboard_navigation ? (
                        <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>

                    {/* Accessibility Issues List */}
                    {currentAudit.accessibility.issues.length > 0 && (
                      <div>
                        <Label className="text-slate-700 dark:text-slate-300 mb-3 block">Accessibility Issues:</Label>
                        <div className="space-y-2">
                          {currentAudit.accessibility.issues.map((issue, index) => (
                            <Alert key={index} className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                              <AlertDescription className="text-red-800 dark:text-red-200">
                                {issue}
                              </AlertDescription>
                            </Alert>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Recommendations */}
              <TabsContent value="recommendations" className="space-y-6">
                <Card className="border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                      <Star className="h-5 w-5" />
                      SEO Recommendations & Action Items
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Prioritized recommendations with specific actions to improve your SEO performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentAudit.recommendations.map((rec, index) => (
                        <Card key={index} className={`${getPriorityBg(rec.priority)}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              {getPriorityIcon(rec.priority)}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      rec.priority === 'critical' ? 'border-red-300 text-red-700 dark:border-red-700 dark:text-red-300' :
                                      rec.priority === 'high' ? 'border-red-300 text-red-700 dark:border-red-700 dark:text-red-300' :
                                      rec.priority === 'medium' ? 'border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-300' :
                                      'border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300'
                                    }`}
                                  >
                                    {rec.priority}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {rec.category}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {rec.effort} effort
                                  </Badge>
                                </div>
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                                  {rec.issue}
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                  {rec.description}
                                </p>
                                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
                                  <div className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                                    Recommended Fix:
                                  </div>
                                  <div className="text-sm text-blue-800 dark:text-blue-200">
                                    {rec.fix}
                                  </div>
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                  Expected Impact: {rec.impact}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* History */}
              <TabsContent value="history" className="space-y-6">
                <Card className="border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                      <Clock className="h-5 w-5" />
                      Audit History
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Previous audits and performance trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {auditHistory.length > 0 ? (
                      <div className="space-y-4">
                        {auditHistory.map((audit, index) => (
                          <Card key={index} className="border-slate-200 dark:border-slate-700">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium text-slate-900 dark:text-white">
                                    {audit.url}
                                  </div>
                                  <div className="text-sm text-slate-600 dark:text-slate-400">
                                    {new Date(audit.timestamp).toLocaleDateString()}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Badge className={`${getScoreColor(audit.scores.seo)}`}>
                                    SEO: {audit.scores.seo}
                                  </Badge>
                                  <Badge className={`${getScoreColor(audit.scores.performance)}`}>
                                    Performance: {audit.scores.performance}
                                  </Badge>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentAudit(audit)}
                                  >
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                        No previous audits found. Start your first audit above!
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
  )
}
