"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  Globe, 
  RefreshCw, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  ExternalLink,
  Clock,
  FileText,
  Image,
  Link as LinkIcon,
  BarChart3,
  Filter,
  ChevronDown,
  ChevronUp,
  Loader2,
  Play,
  History
} from 'lucide-react';

interface CrawlPage {
  url: string;
  status: number | null;
  title?: string;
  metaDescription?: string;
  wordCount?: number;
  h1Count?: number;
  h2Count?: number;
  images?: number;
  imagesWithoutAlt?: number;
  internalLinkCount?: number;
  fetchedAt: string;
  error?: string;
}

interface CrawlResult {
  id: string;
  projectId?: string;
  projectName?: string;
  projectDomain?: string;
  startUrl: string;
  status: 'QUEUED' | 'COMPLETED' | 'FAILED';
  pages: number;
  errors: number;
  settings: {
    maxPages: number;
    maxDepth: number;
  };
  results?: {
    pages: CrawlPage[];
    summary: {
      totalPages: number;
      pagesWithIssues: number;
      averageWordCount: number;
      totalImages: number;
      imagesWithoutAlt: number;
      missingTitles: number;
      missingH1: number;
      missingMetaDesc: number;
    };
  };
  createdAt: string;
  completedAt?: string;
}

type FilterType = 'all' | 'issues' | 'no-title' | 'no-h1' | 'no-meta' | 'no-alt';
type SortField = 'url' | 'wordCount' | 'status' | 'h1Count' | 'images';
type SortDirection = 'asc' | 'desc';

export default function PageCrawlerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [projectId, setProjectId] = useState<string>('');
  const [url, setUrl] = useState('');
  const [maxPages, setMaxPages] = useState(50);
  const [maxDepth, setMaxDepth] = useState(3);
  
  // Crawl state
  const [activeCrawl, setActiveCrawl] = useState<any>(null);
  const [crawling, setCrawling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [crawlStage, setCrawlStage] = useState<string | undefined>(undefined);
  const [crawlMessage, setCrawlMessage] = useState<string | undefined>(undefined);
  const [crawlCurrentUrl, setCrawlCurrentUrl] = useState<string | undefined>(undefined);
  const [crawlElapsedMs, setCrawlElapsedMs] = useState<number>(0);

  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const crawlStartedAtRef = useRef<number | null>(null);
  
  // Results state
  const [currentResult, setCurrentResult] = useState<CrawlResult | null>(null);
  const [crawlHistory, setCrawlHistory] = useState<CrawlResult[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  
  // UI state
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [sortField, setSortField] = useState<SortField>('url');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Handle authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/dashboard/page-crawler');
    }
  }, [status, router]);

  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      if (pollStopTimeoutRef.current) {
        clearTimeout(pollStopTimeoutRef.current);
        pollStopTimeoutRef.current = null;
      }
    }
  }, []);

  // Load project ID from URL params
  useEffect(() => {
    const id = searchParams.get('project');
    if (id) {
      setProjectId(id);
    }
  }, [searchParams]);

  // Load crawl history
  useEffect(() => {
    if (status === 'authenticated') {
      loadHistory();
    }
  }, [projectId, status]);

  const loadHistory = async () => {
    try {
      setLoadingHistory(true);
      const params = new URLSearchParams();
      if (projectId) params.append('projectId', projectId);
      params.append('limit', '20');
      
      const response = await fetch(`/api/dashboard/page-crawler/list?${params}`);
      if (response.ok) {
        const data = await response.json();
        setCrawlHistory(data.crawls || []);
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const startCrawl = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      setCrawling(true);
      setError(null);
      setProgress(0);
      setCrawlStage('queued');
      setCrawlMessage('Starting crawl…');
      setCrawlCurrentUrl(undefined);
      crawlStartedAtRef.current = Date.now();
      setCrawlElapsedMs(0);

      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      if (pollStopTimeoutRef.current) {
        clearTimeout(pollStopTimeoutRef.current);
        pollStopTimeoutRef.current = null;
      }
      
      const response = await fetch('/api/dashboard/page-crawler/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.trim(),
          maxPages,
          maxDepth,
          projectId: projectId || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start crawl');
      }

      setActiveCrawl(data);
      pollCrawlStatus(data.crawlId);
    } catch (err: any) {
      setError(err.message || 'Failed to start crawl');
      setCrawling(false);
    }
  };

  const pollCrawlStatus = async (crawlId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/dashboard/page-crawler/status?id=${crawlId}`);

        if (response.status === 401) {
          clearInterval(interval);
          setCrawling(false);
          setError('Authentication required. Please log in again.');
          return;
        }

        if (!response.ok) throw new Error('Failed to fetch status');
        
        const data = await response.json();
        setProgress(data.progress || 0);
        setCrawlStage(data.stage);
        setCrawlMessage(data.message);
        setCrawlCurrentUrl(data.currentUrl);
        if (crawlStartedAtRef.current) {
          setCrawlElapsedMs(Date.now() - crawlStartedAtRef.current);
        }
        
        if (data.status === 'completed') {
          clearInterval(interval);
          pollIntervalRef.current = null;
          setCrawling(false);
          
          // Load the completed crawl
          await loadCompletedCrawl(data.id);
          await loadHistory();
        } else if (data.status === 'failed') {
          clearInterval(interval);
          pollIntervalRef.current = null;
          setCrawling(false);
          setError(data.error || 'Crawl failed');
        }
      } catch (err) {
        console.error('Poll error:', err);
      }
    }, 2000);

    pollIntervalRef.current = interval;

    // Stop polling after 10 minutes
    pollStopTimeoutRef.current = setTimeout(() => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    }, 600000);
  };

  const loadCompletedCrawl = async (dbId: string) => {
    try {
      const response = await fetch(`/api/dashboard/page-crawler/list?limit=1`);
      if (response.ok) {
        const data = await response.json();
        if (data.crawls && data.crawls.length > 0) {
          const latestCrawl = data.crawls[0];
          setCurrentResult(latestCrawl);
          setActiveTab('history');
        }
      }
    } catch (err) {
      console.error('Failed to load completed crawl:', err);
    }
  };

  const viewCrawlDetails = (crawl: CrawlResult) => {
    setCurrentResult(crawl);
  };

  const exportToCSV = () => {
    if (!currentResult?.results?.pages) return;

    const headers = [
      'URL',
      'Status',
      'Title',
      'Meta Description',
      'H1 Count',
      'H2 Count',
      'Word Count',
      'Images',
      'Images Without Alt',
      'Internal Links',
      'Issues'
    ];

    const csvData = currentResult.results.pages.map(page => {
      const issues = [];
      if (!page.title) issues.push('No title');
      if (!page.h1Count) issues.push('No H1');
      if (!page.metaDescription) issues.push('No meta');
      if ((page.imagesWithoutAlt || 0) > 0) issues.push(`${page.imagesWithoutAlt} images without alt`);

      return [
        page.url || '',
        page.status || '',
        page.title || 'Missing',
        page.metaDescription || 'Missing',
        page.h1Count || 0,
        page.h2Count || 0,
        page.wordCount || 0,
        page.images || 0,
        page.imagesWithoutAlt || 0,
        page.internalLinkCount || 0,
        issues.join('; ') || 'None'
      ];
    });

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => {
        const escapedField = String(field).replace(/"/g, '""');
        return escapedField.includes(',') || escapedField.includes('"') || escapedField.includes('\n')
          ? `"${escapedField}"`
          : escapedField;
      }).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `page-crawler-${currentResult.projectDomain || 'export'}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Filter and sort pages
  const getFilteredAndSortedPages = () => {
    if (!currentResult?.results?.pages) return [];

    let filtered = [...currentResult.results.pages];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(page =>
        page.url?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    switch (filterType) {
      case 'issues':
        filtered = filtered.filter(page =>
          !page.title || !page.h1Count || !page.metaDescription || (page.imagesWithoutAlt || 0) > 0
        );
        break;
      case 'no-title':
        filtered = filtered.filter(page => !page.title);
        break;
      case 'no-h1':
        filtered = filtered.filter(page => !page.h1Count);
        break;
      case 'no-meta':
        filtered = filtered.filter(page => !page.metaDescription);
        break;
      case 'no-alt':
        filtered = filtered.filter(page => (page.imagesWithoutAlt || 0) > 0);
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (sortField === 'url') {
        aVal = aVal || '';
        bVal = bVal || '';
      } else {
        aVal = aVal || 0;
        bVal = bVal || 0;
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getIssueCount = (page: CrawlPage): number => {
    let count = 0;
    if (!page.title) count++;
    if (!page.h1Count) count++;
    if (!page.metaDescription) count++;
    if ((page.imagesWithoutAlt || 0) > 0) count++;
    return count;
  };

  const filteredPages = getFilteredAndSortedPages();

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Page Crawler - Deep Website Analysis Tool</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Crawl and analyze up to 100 pages of your website with comprehensive SEO insights
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-1.5 rounded-xl mb-6 shadow-sm">
        <button
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
            activeTab === 'new'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
          onClick={() => setActiveTab('new')}
        >
          <Play className="h-4 w-4" />
          New Crawl
        </button>
        <button
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
            activeTab === 'history'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
          onClick={() => setActiveTab('history')}
        >
          <History className="h-4 w-4" />
          Crawl History
        </button>
      </div>

      {activeTab === 'new' && (
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Start New Page Crawl
            </CardTitle>
            <CardDescription>
              Crawl 10-100 pages of your website to identify SEO issues and opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={crawling}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxPages">Maximum Pages</Label>
                <select
                  id="maxPages"
                  value={maxPages}
                  onChange={(e) => setMaxPages(Number(e.target.value))}
                  disabled={crawling}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value={10}>10 pages</option>
                  <option value={25}>25 pages</option>
                  <option value={50}>50 pages (Recommended)</option>
                  <option value={75}>75 pages</option>
                  <option value={100}>100 pages</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxDepth">Crawl Depth</Label>
                <select
                  id="maxDepth"
                  value={maxDepth}
                  onChange={(e) => setMaxDepth(Number(e.target.value))}
                  disabled={crawling}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value={1}>Depth 1 (Homepage only)</option>
                  <option value={2}>Depth 2</option>
                  <option value={3}>Depth 3 (Recommended)</option>
                  <option value={4}>Depth 4</option>
                  <option value={5}>Depth 5 (Maximum)</option>
                </select>
              </div>
            </div>

            {crawling && (
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span className="truncate">
                    {crawlMessage || 'Crawling in progress…'}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                {(crawlStage || crawlCurrentUrl) && (
                  <div className="rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-3 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium">What’s happening</span>
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        {Math.round(crawlElapsedMs / 1000)}s
                      </span>
                    </div>
                    {crawlStage && (
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Stage:</span> {crawlStage}
                      </div>
                    )}
                    {crawlCurrentUrl && (
                      <div className="truncate">
                        <span className="text-slate-500 dark:text-slate-400">URL:</span> {crawlCurrentUrl}
                      </div>
                    )}
                  </div>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This may take a few minutes depending on the number of pages
                </p>
              </div>
            )}

            <Button
              onClick={startCrawl}
              disabled={crawling || !url.trim()}
              className="w-full md:w-auto"
              size="lg"
            >
              {crawling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Crawling...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Start Crawl
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Crawl History List */}
          {!currentResult && (
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle>Recent Crawls</CardTitle>
                <CardDescription>View and analyze your previous page crawls</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingHistory ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                  </div>
                ) : crawlHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <Globe className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">
                      No crawls yet. Start your first page crawl to analyze your website.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Crawl Results</h2>
                    {crawlHistory.map((crawl) => (
                      <div
                        key={crawl.id}
                        className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                        onClick={() => viewCrawlDetails(crawl)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-slate-900 dark:text-white">
                                {crawl.projectName || crawl.projectDomain || 'Unknown Project'}
                              </h3>
                              <Badge
                                variant={
                                  crawl.status === 'COMPLETED'
                                    ? 'default'
                                    : crawl.status === 'FAILED'
                                    ? 'destructive'
                                    : 'secondary'
                                }
                              >
                                {crawl.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                              {crawl.startUrl}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                              <span className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                {crawl.pages} pages
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(crawl.createdAt).toLocaleDateString()}
                              </span>
                              {crawl.results?.summary && (
                                <span className="flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  {crawl.results.summary.pagesWithIssues} issues
                                </span>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Detailed Results View */}
          {currentResult && currentResult.results && (
            <div className="space-y-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentResult(null)}
                className="mb-4"
              >
                ← Back to History
              </Button>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Total Pages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {currentResult.results.summary.totalPages}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Pages with Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {currentResult.results.summary.pagesWithIssues}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold uppercase tracking-wide">
                      Avg. Word Count
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {Math.round(currentResult.results.summary.averageWordCount)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Images w/o Alt
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                      {currentResult.results.summary.imagesWithoutAlt}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Issue Summary */}
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    Issue Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <span className="text-sm font-medium">Missing Titles</span>
                      <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {currentResult.results.summary.missingTitles}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <span className="text-sm font-medium">Missing H1</span>
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {currentResult.results.summary.missingH1}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <span className="text-sm font-medium">Missing Meta Desc</span>
                      <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {currentResult.results.summary.missingMetaDesc}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Filters and Search */}
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Crawled Pages ({filteredPages.length})
                    </CardTitle>
                    <Button onClick={exportToCSV} variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search and Filter Bar */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search URLs or titles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value as FilterType)}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="all">All Pages</option>
                      <option value="issues">Pages with Issues</option>
                      <option value="no-title">Missing Title</option>
                      <option value="no-h1">Missing H1</option>
                      <option value="no-meta">Missing Meta Desc</option>
                      <option value="no-alt">Images w/o Alt</option>
                    </select>
                  </div>

                  {/* Results Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('url')}>
                            URL {sortField === 'url' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('status')}>
                            Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('h1Count')}>
                            H1 {sortField === 'h1Count' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('wordCount')}>
                            Words {sortField === 'wordCount' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('images')}>
                            Images {sortField === 'images' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Issues
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                        {filteredPages.map((page, index) => (
                          <React.Fragment key={index}>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800">
                              <td className="px-4 py-3">
                                <div className="max-w-md">
                                  <a
                                    href={page.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate block"
                                    title={page.url}
                                  >
                                    {page.url?.replace(/^https?:\/\//, '').substring(0, 60)}
                                    {(page.url?.replace(/^https?:\/\//, '').length || 0) > 60 ? '...' : ''}
                                  </a>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <Badge
                                  variant={page.status === 200 ? 'default' : 'destructive'}
                                >
                                  {page.status || 'N/A'}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  {page.h1Count ? (
                                    <>
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                      <span className="text-sm font-semibold">
                                        {page.h1Count}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="h-4 w-4 text-red-600" />
                                      <span className="text-sm font-medium text-muted-foreground">
                                        0
                                      </span>
                                    </>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span className="text-sm font-semibold">
                                  {page.wordCount?.toLocaleString() || 0}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <span className="text-sm font-semibold">
                                    {page.images || 0}
                                  </span>
                                  {(page.imagesWithoutAlt || 0) > 0 && (
                                    <span className="text-xs font-medium text-red-600 dark:text-red-400">
                                      ({page.imagesWithoutAlt} no alt)
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                {getIssueCount(page) > 0 ? (
                                  <Badge variant="destructive">
                                    {getIssueCount(page)}
                                  </Badge>
                                ) : (
                                  <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                                )}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  onClick={() => setExpandedRow(expandedRow === page.url ? null : page.url)}
                                  className="text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                  {expandedRow === page.url ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </button>
                              </td>
                            </tr>
                            {expandedRow === page.url && (
                              <tr>
                                <td colSpan={7} className="px-4 py-4 bg-slate-50 dark:bg-slate-800">
                                  <div className="space-y-3">
                                    <div>
                                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Title:</span>
                                      <p className="text-sm text-slate-900 dark:text-white mt-1">
                                        {page.title || <span className="text-red-600">Missing</span>}
                                      </p>
                                    </div>
                                    <div>
                                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Meta Description:</span>
                                      <p className="text-sm text-slate-900 dark:text-white mt-1">
                                        {page.metaDescription || <span className="text-red-600">Missing</span>}
                                      </p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                                      <div>
                                        <span className="text-xs font-medium text-muted-foreground uppercase">H1 Count</span>
                                        <p className="text-lg font-bold mt-1">{page.h1Count || 0}</p>
                                      </div>
                                      <div>
                                        <span className="text-xs font-medium text-muted-foreground uppercase">H2 Count</span>
                                        <p className="text-lg font-bold mt-1">{page.h2Count || 0}</p>
                                      </div>
                                      <div>
                                        <span className="text-xs font-medium text-muted-foreground uppercase">Internal Links</span>
                                        <p className="text-lg font-bold mt-1">{page.internalLinkCount || 0}</p>
                                      </div>
                                      <div>
                                        <span className="text-xs font-medium text-muted-foreground uppercase">Crawled</span>
                                        <p className="text-sm font-semibold mt-1">{new Date(page.fetchedAt).toLocaleString()}</p>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredPages.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-slate-600 dark:text-slate-400">
                        No pages match the current filter
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
