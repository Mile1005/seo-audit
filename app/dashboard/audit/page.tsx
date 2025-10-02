"use client";

import React, { useState, useEffect } from 'react'
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
  FileText,
  Link,
  Eye,
  Layers,
  Code,
  Smartphone,
  XCircle,
  RefreshCw,
  Download,
  Share,
  Image as ImageIcon,
  BarChart3,
  Target,
  Gauge,
  Users,
  Award,
  Lightbulb,
  Settings,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  Camera,
  Accessibility,
  Monitor,
  Server,
  Lock,
  Wifi,
  ArrowRight
} from 'lucide-react'
import { useAudit } from '../../../lib/hooks/use-audit'
import { normalizeUrl } from '../../../lib/url/normalize'
import { AuditResultUnified } from '../../../lib/types/audit'
// Phase 2 extracted components
import { ScoreSummary } from '../../../components/audit/ScoreSummary'
import { ScoreSkeleton } from '../../../components/skeletons/ScoreSkeleton'
import { IssuesSkeleton } from '../../../components/skeletons/IssuesSkeleton'
import { CoreWebVitalsGrid } from '../../../components/audit/CoreWebVitalsGrid'
import { PerformanceOpportunities } from '../../../components/audit/PerformanceOpportunities'
import { PerformanceDiagnostics } from '../../../components/audit/PerformanceDiagnostics'
import { IssuesList } from '../../../components/audit/IssuesList'
import { QuickWinsList } from '../../../components/audit/QuickWinsList'
import { MetaTagsPanel } from '../../../components/audit/MetaTagsPanel'
import { HeadingStructure } from '../../../components/audit/HeadingStructure'
import { SocialMetaPanel } from '../../../components/audit/SocialMetaPanel'
import { StructuredDataPanel } from '../../../components/audit/StructuredDataPanel'
import { HistoryPanel } from '../../../components/audit/HistoryPanel'
import { CrawledPagesAnalysis } from '../../../components/audit/CrawledPagesAnalysis'

// Unified comprehensive audit page. Legacy variants (simple/new/comprehensive) removed (Phase A consolidation).
export default function ComprehensiveAuditPage() {
  const [url, setUrl] = useState('')
  const { data: result, error, loading: isLoading, status, start, reset, loadCached, isCached } = useAudit()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    coreWebVitals: true,
    technicalSEO: false,
    accessibility: false,
    performance: false,
    recommendations: true
  })

  // Load cached audit and URL params on mount
  useEffect(() => {
    // Check for URL params (auto-fill from projects)
    const params = new URLSearchParams(window.location.search)
    const domainParam = params.get('domain')
    if (domainParam) {
      setUrl(domainParam)
    }

    // Load cached audit results
    loadCached()
  }, [loadCached])

  // Debug logging for audit results
  React.useEffect(() => {
    if (result) {
      console.log('📊 Dashboard received audit result:', {
        auditId: result.auditId,
        score: result.score,
        url: result.url,
        hasComprehensiveResults: !!result.comprehensiveResults,
        performanceOpportunities: result.comprehensiveResults?.performance_opportunities?.length || 0,
        issues: result.comprehensiveResults?.issues?.length || 0,
        quickWins: result.comprehensiveResults?.quick_wins?.length || 0,
        isCached
      })
    }
  }, [result, isCached])

  const handleStartAudit = () => {
    const normalized = normalizeUrl(url)
    if (!normalized) {
      alert('Enter a valid URL (example.com or https://example.com)')
      return
    }
    start(normalized)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return 'default' // Green
    if (score >= 70) return 'secondary' // Yellow/Orange
    return 'destructive' // Red
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const formatMs = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`
    return `${(ms / 1000).toFixed(1)}s`
  }

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
  }

  const getCoreWebVitalRating = (metric: string, value: number) => {
    const thresholds = {
      fcp: [1.8, 3.0], // First Contentful Paint
      lcp: [2.5, 4.0], // Largest Contentful Paint
      cls: [0.1, 0.25], // Cumulative Layout Shift
      fid: [100, 300], // First Input Delay
      tbt: [200, 600], // Total Blocking Time
      si: [3.4, 5.8] // Speed Index
    }
    
    const threshold = thresholds[metric as keyof typeof thresholds]
    if (!threshold) return 'good'
    
    if (value <= threshold[0]) return 'good'
    if (value <= threshold[1]) return 'needs-improvement'
    return 'poor'
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-500'
      case 'needs-improvement': return 'text-yellow-500'
      case 'poor': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  return (
      <div className="space-y-6 max-w-full overflow-x-hidden">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Professional SEO Audit</h1>
          <p className="text-blue-700 dark:text-blue-300 font-medium text-base sm:text-lg">
            Comprehensive SEO analysis with Core Web Vitals, ARIA compliance, and actionable insights
          </p>
        </div>

        {/* Audit Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Start Comprehensive Audit
            </CardTitle>
            <CardDescription className="text-slate-700 dark:text-slate-300 font-medium">
              Professional SEO audit with Core Web Vitals, accessibility analysis, and detailed recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  id="url"
                  placeholder="https://example.com or example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isLoading}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !isLoading) handleStartAudit() }}
                  className="flex-1 w-full"
                />
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={handleStartAudit}
                    disabled={isLoading || !url.trim()}
                    className="flex-1 sm:flex-none whitespace-nowrap"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        {status === 'completed' ? 'Run Again' : 'Start Professional Audit'}
                      </>
                    )}
                  </Button>
                  {status === 'completed' && (
                    <>
                      <Button variant="outline" onClick={() => { reset(); setUrl('') }} disabled={isLoading} className="flex-1 sm:flex-none">New</Button>
                      <Button 
                        variant="outline" 
                        onClick={async () => {
                          if (!result?.auditId) return;
                          try {
                            const response = await fetch(`/api/seo-audit/export/pdf?auditId=${result.auditId}`);
                            const htmlContent = await response.text();
                            
                            // Create a new window with the HTML content for PDF printing
                            const printWindow = window.open('', '_blank');
                            if (printWindow) {
                              printWindow.document.write(htmlContent);
                              printWindow.document.close();
                              
                              // Wait for content to load, then trigger print
                              printWindow.onload = () => {
                                setTimeout(() => {
                                  printWindow.print();
                                  printWindow.close();
                                }, 500);
                              };
                            }
                          } catch (error) {
                            console.error('Export failed:', error);
                            alert('Failed to export PDF. Please try again.');
                          }
                        }} 
                        disabled={isLoading || !result?.auditId}
                        className="flex-1 sm:flex-none whitespace-nowrap"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Development Debug Info */}
            {process.env.NODE_ENV === 'development' && result && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Debug Info:</strong> Performance opportunities: {result.comprehensiveResults?.performance_opportunities?.length || 0}, 
                  Issues: {result.comprehensiveResults?.issues?.length || 0}, 
                  Quick wins: {result.comprehensiveResults?.quick_wins?.length || 0}
                  {result.comprehensiveResults?.performance_opportunities?.[0]?.includes('PSI_API_KEY') && (
                    <span className="text-yellow-600"> - Using fallback data (PSI not configured)</span>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {isLoading && !error && (
              <Alert>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <AlertDescription>
                  Running comprehensive analysis... polling results.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Results / Loading Skeleton */}
        {isLoading && !result && (
          <div className="space-y-6" aria-busy="true" aria-live="polite">
            <ScoreSkeleton />
            <IssuesSkeleton />
          </div>
        )}
        {result && (
          <div className="space-y-6">
            {isCached && (
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>Showing cached audit results. Run a new audit to get fresh data.</span>
                  <Button size="sm" variant="outline" onClick={() => { reset(); loadCached(); }}>
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Reload Cache
                  </Button>
                </AlertDescription>
              </Alert>
            )}
            
            <ScoreSummary result={result as AuditResultUnified} />

            {/* Detailed Analysis Tabs */}
            <Tabs defaultValue="overview" className="w-full" aria-label="Audit result sections">
              <div className="w-full overflow-x-auto -mx-2 px-2 pb-2">
                <TabsList className="inline-flex w-auto min-w-full lg:grid lg:w-full lg:grid-cols-8 gap-1" role="tablist">
                  <TabsTrigger value="overview" aria-label="Overview tab" aria-expanded="true" className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0">Overview</TabsTrigger>
                  <TabsTrigger value="core-web-vitals" aria-label="Core Web Vitals tab" aria-expanded="false" className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0">Core Web Vitals</TabsTrigger>
                  <TabsTrigger value="seo" aria-label="Technical SEO tab" aria-expanded="false" className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0">Technical SEO</TabsTrigger>
                  <TabsTrigger value="accessibility" aria-label="Accessibility tab" aria-expanded="false" className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0">Accessibility</TabsTrigger>
                  <TabsTrigger value="performance" aria-label="Performance tab" aria-expanded="false" className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0">Performance</TabsTrigger>
                  <TabsTrigger value="pages" aria-label="Crawled Pages tab" aria-expanded="false" className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0">Pages</TabsTrigger>
                  <TabsTrigger value="recommendations" aria-label="Recommendations tab" aria-expanded="false" className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0">Recommendations</TabsTrigger>
                  <TabsTrigger value="history" aria-label="History tab" aria-expanded="false" className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0">History</TabsTrigger>
                </TabsList>
              </div>

              {/* Overview Tab - Redesigned for Better Readability */}
              <TabsContent value="overview" className="space-y-8">
                {/* Quick Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-2 border-blue-200 dark:border-blue-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-bold flex items-center gap-3 text-blue-900 dark:text-blue-100">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <Link className="h-5 w-5 text-white" />
                        </div>
                        Links Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="text-blue-700 dark:text-blue-300 font-medium text-sm">Internal Links:</div>
                        <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{result.pageData.internalLinks}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-blue-700 dark:text-blue-300 font-medium text-sm">External Links:</div>
                        <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{result.pageData.externalLinks}</div>
                      </div>
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-center">
                        <div className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                          Internal Ratio: {result.pageData.internalLinks>0?(result.pageData.internalLinks/(result.pageData.internalLinks+result.pageData.externalLinks)*100).toFixed(0)+'%':'N/A'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-2 border-green-200 dark:border-green-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-bold flex items-center gap-3 text-green-900 dark:text-green-100">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <ImageIcon className="h-5 w-5 text-white" />
                        </div>
                        Images Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="text-green-700 dark:text-green-300 font-medium text-sm">Total Images:</div>
                        <div className="text-3xl font-bold text-green-900 dark:text-green-100">{result.pageData.imagesTotal}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-green-700 dark:text-green-300 font-medium text-sm">Missing Alt:</div>
                        <div className={`text-3xl font-bold ${result.pageData.imagesWithoutAlt>0?'text-red-600':'text-green-600'}`}>
                          {result.pageData.imagesWithoutAlt}
                        </div>
                      </div>
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg text-center">
                        <div className="text-sm text-green-800 dark:text-green-200 font-medium">
                          Total Size: {formatBytes(result.comprehensiveResults.stats.images_size)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/10 border-2 border-purple-200 dark:border-purple-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-bold flex items-center gap-3 text-purple-900 dark:text-purple-100">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                        Content Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="text-purple-700 dark:text-purple-300 font-medium text-sm">Word Count:</div>
                        <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                          {result.comprehensiveResults.stats.word_count.toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-purple-700 dark:text-purple-300 font-medium text-sm">Reading Time:</div>
                        <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                          {result.comprehensiveResults.stats.reading_time_min} min
                        </div>
                      </div>
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg text-center">
                        <div className="text-sm text-purple-800 dark:text-purple-200 font-medium">
                          {result.comprehensiveResults.stats.word_count >= 1000 ? '✅ Comprehensive' : 
                           result.comprehensiveResults.stats.word_count >= 500 ? '⚠️ Moderate' : '🔴 Brief'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 border-2 border-orange-200 dark:border-orange-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-bold flex items-center gap-3 text-orange-900 dark:text-orange-100">
                        <div className="p-2 bg-orange-500 rounded-lg">
                          <BarChart3 className="h-5 w-5 text-white" />
                        </div>
                        Quick Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="text-orange-700 dark:text-orange-300 font-medium text-sm">Issues Found:</div>
                        <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                          {result.comprehensiveResults?.issues?.length || 0}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-orange-700 dark:text-orange-300 font-medium text-sm">Quick Wins:</div>
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                          {result.comprehensiveResults?.quick_wins?.length || 0}
                        </div>
                      </div>
                      <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg text-center">
                        <div className="text-sm text-orange-800 dark:text-orange-200 font-medium">
                          🎯 {result.comprehensiveResults?.performance_opportunities?.length || 0} Opportunities
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Heading Structure Analysis - Expanded */}
                <HeadingStructure h={result.comprehensiveResults.h_tags} stats={result.comprehensiveResults.stats} />

                {/* Social Media & Meta Tags - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SocialMetaPanel social={result.comprehensiveResults.social_meta} />
                  <MetaTagsPanel result={result as AuditResultUnified} />
                </div>

                {/* Structured Data - Full Width */}
                <StructuredDataPanel result={result as AuditResultUnified} />
              </TabsContent>

              {/* Core Web Vitals Tab */}
              <TabsContent value="core-web-vitals" className="space-y-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Core Web Vitals Analysis</h2>
                  <p className="text-slate-600 dark:text-slate-400">Essential performance metrics that impact user experience and SEO rankings.</p>
                </div>
                
                {result.comprehensiveResults?.performance_metrics && (
                  <CoreWebVitalsGrid metrics={result.comprehensiveResults.performance_metrics} />
                )}
              </TabsContent>

              {/* Technical SEO Tab */}
              <TabsContent value="seo" className="space-y-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Technical SEO Analysis</h2>
                  <p className="text-slate-600 dark:text-slate-400">On-page SEO factors, meta tags, and technical implementation review.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* SEO Checks */}
                  <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-2 border-green-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center gap-3 text-green-900">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        SEO Checks Passed ({result.comprehensiveResults?.seo_checks?.passed_checks?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {result.comprehensiveResults?.seo_checks?.passed_checks?.map((check, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-100">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-slate-900 break-words">{check}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-red-50 via-rose-50 to-red-100 border-2 border-red-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center gap-3 text-red-900">
                        <div className="p-2 bg-red-500 rounded-lg">
                          <XCircle className="h-5 w-5 text-white" />
                        </div>
                        SEO Issues Found ({result.comprehensiveResults?.seo_checks?.failed_checks?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {result.comprehensiveResults?.seo_checks?.failed_checks?.map((check, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-100">
                            <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-slate-900 break-words">{check}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Heading Structure */}
                <Card className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Heading Structure Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">H1 Tags ({result.comprehensiveResults?.h_tags?.h1?.length || 0})</h4>
                        <div className="space-y-2">
                          {result.comprehensiveResults?.h_tags?.h1?.map((h1, index) => (
                            <div key={index} className="text-sm p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 break-words">
                              {h1}
                            </div>
                          )) || <div className="text-sm text-red-600 dark:text-red-400 font-medium">No H1 tags found</div>}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">H2 Tags ({result.comprehensiveResults?.h_tags?.h2?.length || 0})</h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {result.comprehensiveResults?.h_tags?.h2?.slice(0, 5).map((h2, index) => (
                            <div key={index} className="text-sm p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 break-words">
                              {h2}
                            </div>
                          )) || <div className="text-sm text-slate-500 dark:text-slate-400">No H2 tags found</div>}
                          {(result.comprehensiveResults?.h_tags?.h2?.length || 0) > 5 && (
                            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium p-2">
                              ... and {(result.comprehensiveResults?.h_tags?.h2?.length || 0) - 5} more
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">H3 Tags ({result.comprehensiveResults?.h_tags?.h3?.length || 0})</h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {result.comprehensiveResults?.h_tags?.h3?.slice(0, 5).map((h3, index) => (
                            <div key={index} className="text-sm p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 break-words">
                              {h3}
                            </div>
                          )) || <div className="text-sm text-slate-500 dark:text-slate-400">No H3 tags found</div>}
                          {(result.comprehensiveResults?.h_tags?.h3?.length || 0) > 5 && (
                            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium p-2">
                              ... and {(result.comprehensiveResults?.h_tags?.h3?.length || 0) - 5} more
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media Meta Tags */}
                {result.comprehensiveResults?.social_meta && (
                  <Card className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                      <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                        <Share className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        Social Media Meta Tags
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
                          <h4 className="font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M22.675 0h-21.35C.597 0 0 .596 0 1.326v21.348C0 23.404.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.404 24 22.674V1.326C24 .596 23.403 0 22.675 0"/>
                            </svg>
                            Open Graph
                          </h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded">
                              <span className="font-medium text-slate-700 dark:text-slate-300">og:title:</span>
                              <span className={`font-bold ${result.comprehensiveResults.social_meta.og_title ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {result.comprehensiveResults.social_meta.og_title ? '✓' : '✗'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded">
                              <span className="font-medium text-slate-700 dark:text-slate-300">og:description:</span>
                              <span className={`font-bold ${result.comprehensiveResults.social_meta.og_description ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {result.comprehensiveResults.social_meta.og_description ? '✓' : '✗'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded">
                              <span className="font-medium text-slate-700 dark:text-slate-300">og:image:</span>
                              <span className={`font-bold ${result.comprehensiveResults.social_meta.og_image ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {result.comprehensiveResults.social_meta.og_image ? '✓' : '✗'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded">
                              <span className="font-medium text-slate-700 dark:text-slate-300">og:url:</span>
                              <span className={`font-bold ${result.comprehensiveResults.social_meta.og_url ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {result.comprehensiveResults.social_meta.og_url ? '✓' : '✗'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
                          <h4 className="font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                            <svg className="w-5 h-5 text-slate-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                            X (Twitter)
                          </h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded">
                              <span className="font-medium text-slate-700 dark:text-slate-300">twitter:card:</span>
                              <span className={`font-bold ${result.comprehensiveResults.social_meta.twitter_card ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {result.comprehensiveResults.social_meta.twitter_card ? '✓' : '✗'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded">
                              <span className="font-medium text-slate-700 dark:text-slate-300">twitter:title:</span>
                              <span className={`font-bold ${result.comprehensiveResults.social_meta.twitter_title ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {result.comprehensiveResults.social_meta.twitter_title ? '✓' : '✗'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded">
                              <span className="font-medium text-slate-700 dark:text-slate-300">twitter:description:</span>
                              <span className={`font-bold ${result.comprehensiveResults.social_meta.twitter_description ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {result.comprehensiveResults.social_meta.twitter_description ? '✓' : '✗'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Accessibility Tab */}
              <TabsContent value="accessibility" className="space-y-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Accessibility Analysis</h2>
                  <p className="text-slate-600 dark:text-slate-400">ARIA attributes, accessibility standards, and user experience evaluation.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-2 border-green-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center gap-3 text-green-900">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        Accessibility Passed ({result.comprehensiveResults?.accessibility?.passed_checks?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {result.comprehensiveResults?.accessibility?.passed_checks?.map((check, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-100">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-slate-900 break-words">{check}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-red-50 via-rose-50 to-red-100 border-2 border-red-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center gap-3 text-red-900">
                        <div className="p-2 bg-red-500 rounded-lg">
                          <XCircle className="h-5 w-5 text-white" />
                        </div>
                        Accessibility Issues ({result.comprehensiveResults?.accessibility?.failed_checks?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {result.comprehensiveResults?.accessibility?.failed_checks?.map((check, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-100">
                            <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-slate-900 break-words">{check}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Indexability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-2 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-900">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Indexability Passed ({result.comprehensiveResults?.indexability?.passed_checks?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {result.comprehensiveResults?.indexability?.passed_checks?.map((check, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm p-2 bg-white rounded border border-green-100">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-slate-900 break-words">{check}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-red-50 via-rose-50 to-red-100 border-2 border-red-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-900">
                        <XCircle className="h-5 w-5 text-red-500" />
                        Indexability Issues ({result.comprehensiveResults?.indexability?.failed_checks?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {result.comprehensiveResults?.indexability?.failed_checks?.map((check, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm p-2 bg-white rounded border border-red-100">
                            <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                            <span className="text-slate-900 break-words">{check}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Performance Analysis</h2>
                  <p className="text-slate-600 dark:text-slate-400">Detailed performance metrics, resource analysis, and optimization opportunities.</p>
                </div>

                {/* Performance Diagnostics */}
                <PerformanceDiagnostics diagnostics={result.comprehensiveResults?.performance_diagnostics || []} />

                {/* Resource Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 border-2 border-blue-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center gap-3 text-blue-900">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <Code className="h-5 w-5 text-white" />
                        </div>
                        Scripts Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-blue-700 font-medium text-sm">Script Count:</div>
                        <div className="text-2xl font-bold text-blue-900">{result.comprehensiveResults?.stats?.scripts_count || 0}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-blue-700 font-medium text-sm">Scripts Size:</div>
                        <div className="text-xl font-bold text-blue-900">{formatBytes(result.comprehensiveResults?.stats?.scripts_size || 0)}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100 border-2 border-purple-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center gap-3 text-purple-900">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                        Content Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-purple-700 font-medium text-sm">Text Size:</div>
                        <div className="text-2xl font-bold text-purple-900">{formatBytes(result.comprehensiveResults?.stats?.text_size || 0)}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-purple-700 font-medium text-sm">Text Ratio:</div>
                        <div className="text-xl font-bold text-purple-900">{((result.comprehensiveResults?.stats?.text_rate || 0) * 100).toFixed(1)}%</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-2 border-green-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center gap-3 text-green-900">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <ImageIcon className="h-5 w-5 text-white" />
                        </div>
                        Images Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-green-700 font-medium text-sm">Images Count:</div>
                        <div className="text-2xl font-bold text-green-900">{result.comprehensiveResults?.stats?.images_count || 0}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-green-700 font-medium text-sm">Images Size:</div>
                        <div className="text-xl font-bold text-green-900">{formatBytes(result.comprehensiveResults?.stats?.images_size || 0)}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Crawled Pages Tab */}
              <TabsContent value="pages" className="space-y-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Page Analysis</h2>
                  <p className="text-slate-600 dark:text-slate-400">Detailed analysis of the audited page including SEO issues, content metrics, and performance.</p>
                </div>
                
                <CrawledPagesAnalysis pages={[{
                  url: result.url,
                  title: result.pageData.title,
                  statusCode: 200,
                  crawlTime: new Date(result.timestamp).toISOString(),
                  titleLength: result.pageData.title.length,
                  wordCount: result.comprehensiveResults.stats.word_count,
                  headings: {
                    h1: result.comprehensiveResults.h_tags.h1.length,
                    h2: result.comprehensiveResults.h_tags.h2.length,
                    h3: result.comprehensiveResults.h_tags.h3.length
                  },
                  metaDescription: result.pageData.metaDescription,
                  metaDescriptionLength: result.pageData.metaDescription.length,
                  internalLinks: result.pageData.internalLinks,
                  externalLinks: result.pageData.externalLinks,
                  images: result.pageData.imagesTotal,
                  loadTime: result.comprehensiveResults.performance_metrics?.speed_index ? result.comprehensiveResults.performance_metrics.speed_index / 1000 : undefined,
                  issues: result.comprehensiveResults.issues?.map(issue => ({
                    type: issue.severity === 'high' ? 'error' as const : issue.severity === 'medium' ? 'warning' as const : 'notice' as const,
                    category: issue.category || 'SEO',
                    title: issue.title,
                    description: issue.description,
                    impact: issue.severity as 'high' | 'medium' | 'low',
                    count: 1
                  })) || []
                }]} />
              </TabsContent>

              {/* Recommendations Tab */}
              <TabsContent value="recommendations" className="space-y-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">SEO Recommendations</h2>
                  <p className="text-slate-600 dark:text-slate-400">Actionable improvements to boost your search engine rankings and user experience.</p>
                </div>

                {/* Quick Wins */}
                <QuickWinsList quickWins={result.comprehensiveResults?.quick_wins || []} />

                {/* All Issues */}
                <IssuesList issues={result.comprehensiveResults?.issues || []} />

                {/* Structured Recommendations */}
                {result.recommendations && result.recommendations.length > 0 && (
                  <Card className="bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 border-2 border-purple-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center gap-3 text-purple-900">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        Structured Recommendations ({result.recommendations.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {result.recommendations.map((rec, index) => (
                          <div key={index} className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-white rounded-xl border border-purple-100 hover:shadow-md transition-shadow">
                            <Badge variant={
                              rec.type === 'critical' ? 'destructive' : 
                              rec.type === 'warning' ? 'default' : 'secondary'
                            } className="mt-1 shrink-0">
                              {rec.type}
                            </Badge>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-slate-900 mb-2 break-words">{rec.title}</h4>
                              <p className="text-sm text-slate-700 leading-relaxed mb-3 break-words">{rec.description}</p>
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                {rec.category}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-6">
                <HistoryPanel currentUrl={result.url} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
  )
}
