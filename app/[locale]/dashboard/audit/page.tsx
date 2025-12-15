"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Progress } from "../../../../components/ui/progress";
import { Alert, AlertDescription } from "../../../../components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
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
  ArrowRight,
} from "lucide-react";
import { useAudit } from "../../../../lib/hooks/use-audit";
import { normalizeUrl } from "../../../../lib/url/normalize";
import { AuditResultUnified } from "../../../../lib/types/audit";
// Phase 2 extracted components
import { ScoreSummary } from "../../../../components/audit/ScoreSummary";
import { ScoreSkeleton } from "../../../../components/skeletons/ScoreSkeleton";
import { IssuesSkeleton } from "../../../../components/skeletons/IssuesSkeleton";
import { CoreWebVitalsGrid } from "../../../../components/audit/CoreWebVitalsGrid";
import { PerformanceOpportunities } from "../../../../components/audit/PerformanceOpportunities";
import { PerformanceDiagnostics } from "../../../../components/audit/PerformanceDiagnostics";
import { IssuesList } from "../../../../components/audit/IssuesList";
import { QuickWinsList } from "../../../../components/audit/QuickWinsList";
import { MetaTagsPanel } from "../../../../components/audit/MetaTagsPanel";
import { HeadingStructure } from "../../../../components/audit/HeadingStructure";
import { SocialMetaPanel } from "../../../../components/audit/SocialMetaPanel";
import { StructuredDataPanel } from "../../../../components/audit/StructuredDataPanel";
import { HistoryPanel } from "../../../../components/audit/HistoryPanel";
import { CrawledPagesAnalysis } from "../../../../components/audit/CrawledPagesAnalysis";
import { PerformanceTab } from "../../../../components/audit/tabs/PerformanceTab";

// Unified comprehensive audit page. Legacy variants (simple/new/comprehensive) removed (Phase A consolidation).
export default function ComprehensiveAuditPage() {
  const [url, setUrl] = useState("");
  const {
    data: result,
    error,
    loading: isLoading,
    status,
    progress: auditProgress,
    start,
    reset,
    loadCached,
    isCached,
  } = useAudit();
  const [gsc, setGsc] = useState<any>(null);
  const [gscLoading, setGscLoading] = useState(false);
  const [gscError, setGscError] = useState<string | null>(null);
  const [gscNeedsReconnect, setGscNeedsReconnect] = useState(false);
  const [showAllGscQueries, setShowAllGscQueries] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    coreWebVitals: true,
    technicalSEO: false,
    accessibility: false,
    performance: false,
    recommendations: true,
  });

  // Load cached audit and URL params on mount
  useEffect(() => {
    // Check for URL params (auto-fill from projects)
    const params = new URLSearchParams(window.location.search);
    const domainParam = params.get("domain");
    if (domainParam) {
      setUrl(domainParam);
    }

    // Load cached audit results
    loadCached(domainParam ?? undefined);
  }, [loadCached]);

  // Clear GSC state while a new audit is running (prevents showing stale metrics for a different URL)
  useEffect(() => {
    if (status === "completed") return;
    setGsc(null);
    setGscError(null);
    setGscLoading(false);
    setGscNeedsReconnect(false);
    setShowAllGscQueries(false);
  }, [status]);

  // Debug logging for audit results (dev-only)
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (!result) return;
    console.log("📊 Dashboard received audit result:", {
      auditId: result.auditId,
      score: result.score,
      url: result.url,
      hasComprehensiveResults: !!result.comprehensiveResults,
      performanceOpportunities: result.comprehensiveResults?.performance_opportunities?.length || 0,
      issues: result.comprehensiveResults?.issues?.length || 0,
      quickWins: result.comprehensiveResults?.quick_wins?.length || 0,
      isCached,
    });
  }, [result, isCached]);

  // Fetch GSC metrics (user-scoped) when an audit completes
  useEffect(() => {
    const auditedUrl = result?.url;
    if (!auditedUrl || status !== "completed") return;

    const fetchGsc = async () => {
      try {
        setGscLoading(true);
        setGscError(null);
        setGsc(null);
        setGscNeedsReconnect(false);
        const res = await fetch(`/api/gsc/insights?url=${encodeURIComponent(auditedUrl)}`, {
          cache: "no-store",
        });
        const json = await res.json();
        if (!res.ok || !json?.success) {
          setGsc(null);
          if (res.status === 401) {
            const code = typeof json?.code === "string" ? json.code : "";
            const reconnect =
              code === "gsc_reconnect_required" ||
              /expired|reconnect|required|invalid_grant/i.test(String(json?.error || ""));
            setGscNeedsReconnect(reconnect);
            setGscError(
              json?.error ||
                "Google Search Console is not connected. Connect it in your dashboard to see real metrics for this site."
            );
          } else {
            setGscError(json?.error || "Failed to load GSC metrics");
          }
          return;
        }
        setGsc(json.data);
      } catch (e: any) {
        setGsc(null);
        setGscError(e?.message || "Failed to load GSC metrics");
      } finally {
        setGscLoading(false);
      }
    };

    fetchGsc();
  }, [result?.url, status]);

  const handleStartAudit = () => {
    const normalized = normalizeUrl(url);
    if (!normalized) {
      alert("Enter a valid URL (example.com or https://example.com)");
      return;
    }
    start(normalized);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default"; // Green
    if (score >= 70) return "secondary"; // Yellow/Orange
    return "destructive"; // Red
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formatMs = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  const getCoreWebVitalRating = (metric: string, value: number) => {
    const thresholds = {
      fcp: [1.8, 3.0], // First Contentful Paint
      lcp: [2.5, 4.0], // Largest Contentful Paint
      cls: [0.1, 0.25], // Cumulative Layout Shift
      fid: [100, 300], // First Input Delay
      tbt: [200, 600], // Total Blocking Time
      si: [3.4, 5.8], // Speed Index
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return "good";

    if (value <= threshold[0]) return "good";
    if (value <= threshold[1]) return "needs-improvement";
    return "poor";
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "good":
        return "text-green-500";
      case "needs-improvement":
        return "text-yellow-500";
      case "poor":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Professional SEO Audit
        </h1>
        <p className="text-blue-700 dark:text-blue-300 font-medium text-base sm:text-lg">
          Comprehensive SEO analysis with Core Web Vitals, ARIA compliance, and actionable insights
        </p>
      </div>

      {/* Audit Form */}
      <Card className="bg-white/5 border border-white/10 backdrop-blur-xl">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="url"
                placeholder="https://example.com or example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isLoading) handleStartAudit();
                }}
                className="flex-1 w-full bg-white/5 border-sky-400/35 text-white placeholder:text-white/45 focus-visible:ring-sky-400/35 focus-visible:ring-offset-0"
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
                      {status === "completed" ? "Run Again" : "Start Professional Audit"}
                    </>
                  )}
                </Button>
                {status === "completed" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        reset();
                        setUrl("");
                      }}
                      disabled={isLoading}
                      className="flex-1 sm:flex-none"
                    >
                      New
                    </Button>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        if (!result?.auditId) return;
                        try {
                          const response = await fetch(
                            `/api/seo-audit/export/pdf?auditId=${result.auditId}`
                          );
                          const htmlContent = await response.text();

                          // Create a new window with the HTML content for PDF printing
                          const printWindow = window.open("", "_blank");
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
                          console.error("Export failed:", error);
                          alert("Failed to export PDF. Please try again.");
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

          {isLoading && !error && (
            <Card className="border-dashed">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <div className="font-medium">Audit in progress</div>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      {auditProgress?.message || "Running comprehensive analysis…"}
                    </div>
                    {typeof auditProgress?.elapsedMs === "number" && (
                      <div className="text-xs text-slate-500">
                        Elapsed: {Math.max(1, Math.round(auditProgress.elapsedMs / 1000))}s
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={reset}>
                    Stop
                  </Button>
                </div>

                <Progress
                  value={typeof auditProgress?.progress === "number" ? auditProgress.progress : 20}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {[
                    { key: "queued", label: "Queued" },
                    { key: "fetching", label: "Fetching page" },
                    { key: "analyzing", label: "Analyzing SEO + content" },
                    { key: "pagespeed", label: "Fetching PageSpeed" },
                    { key: "scoring", label: "Scoring + recommendations" },
                    { key: "saving", label: "Finalizing" },
                  ].map((step) => {
                    const current = auditProgress?.stage === step.key;
                    const doneOrder = [
                      "queued",
                      "fetching",
                      "analyzing",
                      "pagespeed",
                      "scoring",
                      "saving",
                    ];
                    const currentIdx = doneOrder.indexOf(String(auditProgress?.stage || "queued"));
                    const stepIdx = doneOrder.indexOf(step.key);
                    const done = currentIdx > stepIdx;
                    return (
                      <div
                        key={step.key}
                        className={`rounded-md border px-3 py-2 flex items-center justify-between ${
                          current ? "bg-slate-50 dark:bg-slate-900/40" : ""
                        }`}
                      >
                        <span
                          className={current ? "font-medium" : "text-slate-700 dark:text-slate-300"}
                        >
                          {step.label}
                        </span>
                        <span className="text-xs text-slate-500">
                          {done ? "Done" : current ? "Now" : "Pending"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="text-xs text-slate-500">
                  If this takes unusually long, the site may be blocking requests or responding
                  slowly.
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {isCached && (
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Showing cached audit results. Run a new audit to get fresh data.</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    reset();
                    loadCached(result?.url);
                  }}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Reload Cache
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <ScoreSummary result={result as AuditResultUnified} />

          {/* Detailed Analysis Tabs */}
          <Tabs defaultValue="overview" className="w-full" aria-label="Audit result sections">
            <div className="w-full overflow-x-auto overflow-y-visible pb-3 pt-2">
              <div className="min-w-max flex justify-center px-2">
              <TabsList
                className="inline-flex w-max gap-1 rounded-xl p-1 bg-white/6 border border-sky-400/40 backdrop-blur-xl shadow-[0_0_22px_rgba(56,189,248,0.22)]"
                role="tablist"
              >
                <TabsTrigger
                  value="overview"
                  aria-label="Overview tab"
                  aria-expanded="true"
                  className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0 px-3 py-2 rounded-lg border border-transparent text-white/75 transition-colors hover:text-white hover:bg-white/6 data-[state=active]:bg-white/6 data-[state=active]:text-sky-300"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="core-web-vitals"
                  aria-label="Core Web Vitals tab"
                  aria-expanded="false"
                  className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0 px-3 py-2 rounded-lg border border-transparent text-white/75 transition-colors hover:text-white hover:bg-white/6 data-[state=active]:bg-white/6 data-[state=active]:text-sky-300"
                >
                  Core Web Vitals
                </TabsTrigger>
                <TabsTrigger
                  value="seo"
                  aria-label="Technical SEO tab"
                  aria-expanded="false"
                  className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0 px-3 py-2 rounded-lg border border-transparent text-white/75 transition-colors hover:text-white hover:bg-white/6 data-[state=active]:bg-white/6 data-[state=active]:text-sky-300"
                >
                  Technical SEO
                </TabsTrigger>
                <TabsTrigger
                  value="accessibility"
                  aria-label="Accessibility tab"
                  aria-expanded="false"
                  className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0 px-3 py-2 rounded-lg border border-transparent text-white/75 transition-colors hover:text-white hover:bg-white/6 data-[state=active]:bg-white/6 data-[state=active]:text-sky-300"
                >
                  Accessibility
                </TabsTrigger>
                <TabsTrigger
                  value="performance"
                  aria-label="Performance tab"
                  aria-expanded="false"
                  className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0 px-3 py-2 rounded-lg border border-transparent text-white/75 transition-colors hover:text-white hover:bg-white/6 data-[state=active]:bg-white/6 data-[state=active]:text-sky-300"
                >
                  Performance
                </TabsTrigger>
                <TabsTrigger
                  value="pages"
                  aria-label="Crawled Pages tab"
                  aria-expanded="false"
                  className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0 px-3 py-2 rounded-lg border border-transparent text-white/75 transition-colors hover:text-white hover:bg-white/6 data-[state=active]:bg-white/6 data-[state=active]:text-sky-300"
                >
                  Pages
                </TabsTrigger>
                <TabsTrigger
                  value="recommendations"
                  aria-label="Recommendations tab"
                  aria-expanded="false"
                  className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0 px-3 py-2 rounded-lg border border-transparent text-white/75 transition-colors hover:text-white hover:bg-white/6 data-[state=active]:bg-white/6 data-[state=active]:text-sky-300"
                >
                  Recommendations
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  aria-label="History tab"
                  aria-expanded="false"
                  className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0 px-3 py-2 rounded-lg border border-transparent text-white/75 transition-colors hover:text-white hover:bg-white/6 data-[state=active]:bg-white/6 data-[state=active]:text-sky-300"
                >
                  History
                </TabsTrigger>
              </TabsList>
              </div>
            </div>

            {/* Overview Tab - Redesigned for Better Readability */}
            <TabsContent value="overview" className="space-y-8">
              {/* Quick Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 bg-slate-900/40 border border-white/10 backdrop-blur-xl ring-1 ring-sky-400/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-3 text-white">
                      <div className="p-2 rounded-lg border border-sky-400/25 bg-white/8">
                        <Link className="h-5 w-5 text-sky-300" />
                      </div>
                      Links Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="text-white/60 font-medium text-sm">
                        Internal Links:
                      </div>
                      <div className="text-3xl font-bold text-white">
                        {result.pageData.internalLinks}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-white/60 font-medium text-sm">
                        External Links:
                      </div>
                      <div className="text-3xl font-bold text-white">
                        {result.pageData.externalLinks}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg text-center border border-sky-400/20 bg-slate-900/40">
                      <div className="text-sm text-white/75 font-medium">
                        Internal Ratio:{" "}
                        {result.pageData.internalLinks > 0
                          ? (
                              (result.pageData.internalLinks /
                                (result.pageData.internalLinks + result.pageData.externalLinks)) *
                              100
                            ).toFixed(0) + "%"
                          : "N/A"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-slate-900/40 border border-white/10 backdrop-blur-xl ring-1 ring-sky-400/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-3 text-white">
                      <div className="p-2 rounded-lg border border-sky-400/25 bg-white/8">
                        <ImageIcon className="h-5 w-5 text-sky-300" />
                      </div>
                      Images Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="text-white/60 font-medium text-sm">
                        Total Images:
                      </div>
                      <div className="text-3xl font-bold text-white">
                        {result.pageData.imagesTotal}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-white/60 font-medium text-sm">
                        Missing Alt:
                      </div>
                      <div
                        className={`text-3xl font-bold ${result.pageData.imagesWithoutAlt > 0 ? "text-rose-400" : "text-white"}`}
                      >
                        {result.pageData.imagesWithoutAlt}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg text-center border border-sky-400/20 bg-slate-900/40">
                      <div className="text-sm text-white/75 font-medium">
                        Total Size: {formatBytes(result.comprehensiveResults.stats.images_size)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-slate-900/40 border border-white/10 backdrop-blur-xl ring-1 ring-sky-400/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-3 text-white">
                      <div className="p-2 rounded-lg border border-sky-400/25 bg-white/8">
                        <FileText className="h-5 w-5 text-sky-300" />
                      </div>
                      Content Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="text-white/60 font-medium text-sm">
                        Word Count:
                      </div>
                      <div className="text-3xl font-bold text-white">
                        {result.comprehensiveResults.stats.word_count.toLocaleString()}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-white/60 font-medium text-sm">
                        Reading Time:
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {result.comprehensiveResults.stats.reading_time_min} min
                      </div>
                    </div>
                    <div className="p-3 rounded-lg text-center border border-sky-400/20 bg-slate-900/40">
                      <div className="text-sm font-medium text-white/75">
                        {result.comprehensiveResults.stats.word_count >= 1000
                          ? "Comprehensive"
                          : result.comprehensiveResults.stats.word_count >= 500
                            ? "Moderate"
                            : "Brief"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-slate-900/40 border border-white/10 backdrop-blur-xl ring-1 ring-sky-400/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-3 text-white">
                      <div className="p-2 rounded-lg border border-sky-400/25 bg-white/8">
                        <BarChart3 className="h-5 w-5 text-sky-300" />
                      </div>
                      Quick Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="text-white/60 font-medium text-sm">
                        Issues Found:
                      </div>
                      <div className="text-3xl font-bold text-white">
                        {result.comprehensiveResults?.issues?.length || 0}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-white/60 font-medium text-sm">
                        Quick Wins:
                      </div>
                      <div className="text-3xl font-bold text-white">
                        {result.comprehensiveResults?.quick_wins?.length || 0}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg text-center border border-sky-400/20 bg-slate-900/40">
                      <div className="text-sm text-white/75 font-medium">
                        {result.comprehensiveResults?.performance_opportunities?.length || 0} Opportunities
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Heading Structure Analysis - Expanded */}
              <HeadingStructure
                h={result.comprehensiveResults.h_tags}
                stats={result.comprehensiveResults.stats}
              />

              {/* Social Media & Meta Tags - Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SocialMetaPanel social={result.comprehensiveResults.social_meta} />
                <MetaTagsPanel result={result as AuditResultUnified} />
              </div>

              {/* Structured Data - Full Width */}
              <StructuredDataPanel result={result as AuditResultUnified} />

              {/* Google Search Console (Overview only) */}
              {status === "completed" && result?.url && (
                <Card className="bg-white/5 border border-white/10 backdrop-blur-xl ring-1 ring-sky-400/10">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-3 text-white">
                      <div className="p-2 rounded-lg border border-white/10 bg-white/8">
                        <BarChart3 className="h-5 w-5 text-sky-300" />
                      </div>
                      {(() => {
                        try {
                          const host = new URL(result.url).hostname.replace(/^www\./, "");
                          return `Google Search Console — ${host} (last 28 days)`;
                        } catch {
                          return "Google Search Console (last 28 days)";
                        }
                      })()}
                    </CardTitle>
                    <CardDescription className="text-white/60">
                      Real clicks / impressions / CTR from your connected GSC account (if this
                      site is verified in GSC).
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {gscLoading ? (
                      <div className="text-sm text-white/60">Loading GSC metrics…</div>
                    ) : gscError ? (
                      <Alert>
                        <AlertDescription className="flex items-center justify-between gap-3">
                          <span>{gscError}</span>
                          {(gscNeedsReconnect ||
                            /expired|reconnect|required|invalid_grant|not connected/i.test(
                              gscError
                            )) && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                window.location.href = "/api/gsc/connect?redirect=1";
                              }}
                            >
                              {gscNeedsReconnect ||
                              /expired|reconnect|required|invalid_grant/i.test(gscError)
                                ? "Reconnect"
                                : "Connect"}
                            </Button>
                          )}
                        </AlertDescription>
                      </Alert>
                    ) : gsc ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                            <div className="text-xs text-emerald-300/80 font-medium">Clicks</div>
                            <div className="text-lg font-semibold text-emerald-300">
                              {gsc.clicks ?? "—"}
                            </div>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                            <div className="text-xs text-emerald-300/80 font-medium">
                              Impressions
                            </div>
                            <div className="text-lg font-semibold text-emerald-300">
                              {gsc.impressions ?? "—"}
                            </div>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                            <div className="text-xs text-emerald-300/80 font-medium">CTR</div>
                            <div className="text-lg font-semibold text-emerald-300">
                              {typeof gsc.ctr === "number"
                                ? `${(gsc.ctr * 100).toFixed(2)}%`
                                : "—"}
                            </div>
                          </div>
                        </div>

                        <div className="text-sm text-white/60">{gsc.message || ""}</div>

                        {Array.isArray(gsc.top_queries) && gsc.top_queries.length > 0 ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-sm font-medium text-white">Top queries</div>
                              {gsc.top_queries.length > 4 && (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  className="h-8 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/15 text-white"
                                  onClick={() => setShowAllGscQueries((v) => !v)}
                                >
                                  {showAllGscQueries
                                    ? "Show top 4"
                                    : `Show all (${gsc.top_queries.length})`}
                                </Button>
                              )}
                            </div>
                            <div className="rounded-xl border border-sky-400/30 bg-white/5 overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead className="bg-white/5">
                                  <tr className="border-b border-sky-400/20">
                                    <th className="text-left p-2 text-white/70 font-medium">
                                      Query
                                    </th>
                                    <th className="text-right p-2 text-white/70 font-medium">
                                      Clicks
                                    </th>
                                    <th className="text-right p-2 text-white/70 font-medium">
                                      Impr.
                                    </th>
                                    <th className="text-right p-2 text-white/70 font-medium">
                                      CTR
                                    </th>
                                    <th className="text-right p-2 text-white/70 font-medium">
                                      Pos.
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(showAllGscQueries
                                    ? gsc.top_queries
                                    : gsc.top_queries.slice(0, 4)
                                  ).map((q: any, idx: number) => (
                                    <tr key={idx} className="border-t border-white/10">
                                      <td className="p-2 text-white/80">{q.query}</td>
                                      <td className="p-2 text-right text-white/80">
                                        {q.clicks ?? 0}
                                      </td>
                                      <td className="p-2 text-right text-white/80">
                                        {q.impressions ?? 0}
                                      </td>
                                      <td className="p-2 text-right text-white/80">
                                        {typeof q.ctr === "number"
                                          ? `${(q.ctr * 100).toFixed(2)}%`
                                          : "—"}
                                      </td>
                                      <td className="p-2 text-right text-white/80">
                                        {typeof q.position === "number"
                                          ? q.position.toFixed(1)
                                          : "—"}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-white/60">
                            No queries returned yet (this is normal for new/low-traffic
                            properties).
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-white/60">
                        {gscLoading
                          ? "Loading Google Search Console metrics…"
                          : gscError ||
                            "Google Search Console is not connected. Connect it in your dashboard to see real metrics for this page."}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Core Web Vitals Tab */}
            <TabsContent value="core-web-vitals" className="space-y-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Core Web Vitals Analysis
                </h2>
                <p className="text-white/60">
                  Essential performance metrics that impact user experience and SEO rankings.
                </p>
              </div>

              {result.comprehensiveResults?.performance_metrics && (
                <CoreWebVitalsGrid metrics={result.comprehensiveResults.performance_metrics} />
              )}
            </TabsContent>

            {/* Technical SEO Tab */}
            <TabsContent value="seo" className="space-y-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Technical SEO Analysis
                </h2>
                <p className="text-white/60">
                  On-page SEO factors, meta tags, and technical implementation review.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* SEO Checks */}
                <Card className="bg-white/5 border border-white/10 backdrop-blur-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold flex items-center gap-3 text-white">
                      <div className="p-2 rounded-lg border border-white/10 bg-white/8">
                        <CheckCircle className="h-5 w-5 text-emerald-300" />
                      </div>
                      SEO Checks Passed (
                      {result.comprehensiveResults?.seo_checks?.passed_checks?.length || 0})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.comprehensiveResults?.seo_checks?.passed_checks?.map(
                        (check, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5"
                          >
                            <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                            <span className="text-sm font-medium text-white/80 break-words">
                              {check}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border border-white/10 backdrop-blur-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold flex items-center gap-3 text-white">
                      <div className="p-2 rounded-lg border border-white/10 bg-white/8">
                        <XCircle className="h-5 w-5 text-rose-300" />
                      </div>
                      SEO Issues Found (
                      {result.comprehensiveResults?.seo_checks?.failed_checks?.length || 0})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.comprehensiveResults?.seo_checks?.failed_checks?.map(
                        (check, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5"
                          >
                            <XCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                            <span className="text-sm font-medium text-white/80 break-words">
                              {check}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Heading Structure */}
              <Card className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-semibold">Heading Structure Analysis</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">
                        H1 Tags ({result.comprehensiveResults?.h_tags?.h1?.length || 0})
                      </h4>
                      <div className="space-y-2">
                        {result.comprehensiveResults?.h_tags?.h1?.map((h1, index) => (
                          <div
                            key={index}
                            className="text-sm p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 break-words"
                          >
                            {h1}
                          </div>
                        )) || (
                          <div className="text-sm text-red-600 dark:text-red-400 font-medium">
                            No H1 tags found
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">
                        H2 Tags ({result.comprehensiveResults?.h_tags?.h2?.length || 0})
                      </h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {result.comprehensiveResults?.h_tags?.h2?.slice(0, 5).map((h2, index) => (
                          <div
                            key={index}
                            className="text-sm p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 break-words"
                          >
                            {h2}
                          </div>
                        )) || (
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            No H2 tags found
                          </div>
                        )}
                        {(result.comprehensiveResults?.h_tags?.h2?.length || 0) > 5 && (
                          <div className="text-xs text-slate-600 dark:text-slate-400 font-medium p-2">
                            ... and {(result.comprehensiveResults?.h_tags?.h2?.length || 0) - 5}{" "}
                            more
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">
                        H3 Tags ({result.comprehensiveResults?.h_tags?.h3?.length || 0})
                      </h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {result.comprehensiveResults?.h_tags?.h3?.slice(0, 5).map((h3, index) => (
                          <div
                            key={index}
                            className="text-sm p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 break-words"
                          >
                            {h3}
                          </div>
                        )) || (
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            No H3 tags found
                          </div>
                        )}
                        {(result.comprehensiveResults?.h_tags?.h3?.length || 0) > 5 && (
                          <div className="text-xs text-slate-600 dark:text-slate-400 font-medium p-2">
                            ... and {(result.comprehensiveResults?.h_tags?.h3?.length || 0) - 5}{" "}
                            more
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
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M22.675 0h-21.35C.597 0 0 .596 0 1.326v21.348C0 23.404.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.404 24 22.674V1.326C24 .596 23.403 0 22.675 0" />
                          </svg>
                          Open Graph
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded">
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              og:title:
                            </span>
                            <span
                              className={`font-bold ${result.comprehensiveResults.social_meta.og_title ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              {result.comprehensiveResults.social_meta.og_title ? "✓" : "✗"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded">
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              og:description:
                            </span>
                            <span
                              className={`font-bold ${result.comprehensiveResults.social_meta.og_description ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              {result.comprehensiveResults.social_meta.og_description ? "✓" : "✗"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded">
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              og:image:
                            </span>
                            <span
                              className={`font-bold ${result.comprehensiveResults.social_meta.og_image ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              {result.comprehensiveResults.social_meta.og_image ? "✓" : "✗"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded">
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              og:url:
                            </span>
                            <span
                              className={`font-bold ${result.comprehensiveResults.social_meta.og_url ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              {result.comprehensiveResults.social_meta.og_url ? "✓" : "✗"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h4 className="font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-slate-900 dark:text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          X (Twitter)
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded">
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              twitter:card:
                            </span>
                            <span
                              className={`font-bold ${result.comprehensiveResults.social_meta.twitter_card ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              {result.comprehensiveResults.social_meta.twitter_card ? "✓" : "✗"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded">
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              twitter:title:
                            </span>
                            <span
                              className={`font-bold ${result.comprehensiveResults.social_meta.twitter_title ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              {result.comprehensiveResults.social_meta.twitter_title ? "✓" : "✗"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded">
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              twitter:description:
                            </span>
                            <span
                              className={`font-bold ${result.comprehensiveResults.social_meta.twitter_description ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              {result.comprehensiveResults.social_meta.twitter_description
                                ? "✓"
                                : "✗"}
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
                <h2 className="text-2xl font-bold text-white mb-2">
                  Accessibility Analysis
                </h2>
                <p className="text-white/60">
                  ARIA attributes, accessibility standards, and user experience evaluation.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-slate-900/40 border border-white/10 backdrop-blur-xl ring-1 ring-sky-400/10">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold flex items-center gap-3 text-white">
                      <div className="p-2 rounded-lg border border-sky-400/25 bg-white/8">
                        <CheckCircle className="h-5 w-5 text-sky-300" />
                      </div>
                      Accessibility Passed (
                      {result.comprehensiveResults?.accessibility?.passed_checks?.length || 0})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.comprehensiveResults?.accessibility?.passed_checks?.map(
                        (check, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5"
                          >
                            <CheckCircle className="h-4 w-4 text-sky-300 flex-shrink-0" />
                            <span className="text-sm font-medium text-white/80 break-words">
                              {check}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/40 border border-white/10 backdrop-blur-xl ring-1 ring-sky-400/10">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold flex items-center gap-3 text-white">
                      <div className="p-2 rounded-lg border border-sky-400/25 bg-white/8">
                        <XCircle className="h-5 w-5 text-rose-300" />
                      </div>
                      Accessibility Issues (
                      {result.comprehensiveResults?.accessibility?.failed_checks?.length || 0})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.comprehensiveResults?.accessibility?.failed_checks?.map(
                        (check, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5"
                          >
                            <XCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                            <span className="text-sm font-medium text-white/80 break-words">
                              {check}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Indexability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-900/40 border border-white/10 backdrop-blur-xl ring-1 ring-sky-400/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <CheckCircle className="h-5 w-5 text-sky-300" />
                      Indexability Passed (
                      {result.comprehensiveResults?.indexability?.passed_checks?.length || 0})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.comprehensiveResults?.indexability?.passed_checks?.map(
                        (check, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm p-2 rounded border border-white/10 bg-white/5"
                          >
                            <CheckCircle className="h-4 w-4 text-sky-300 flex-shrink-0" />
                            <span className="text-white/80 break-words">
                              {check}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/40 border border-white/10 backdrop-blur-xl ring-1 ring-sky-400/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <XCircle className="h-5 w-5 text-rose-300" />
                      Indexability Issues (
                      {result.comprehensiveResults?.indexability?.failed_checks?.length || 0})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.comprehensiveResults?.indexability?.failed_checks?.map(
                        (check, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm p-2 rounded border border-white/10 bg-white/5"
                          >
                            <XCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                            <span className="text-white/80 break-words">
                              {check}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-8">
              <PerformanceTab
                metrics={result.comprehensiveResults?.performance_metrics}
                opportunities={result.comprehensiveResults?.performance_opportunities}
                diagnostics={result.comprehensiveResults?.performance_diagnostics}
              />
            </TabsContent>

            {/* Crawled Pages Tab */}
            <TabsContent value="pages" className="space-y-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Page Analysis
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Detailed analysis of the audited page including SEO issues, content metrics, and
                  performance.
                </p>
              </div>

              <CrawledPagesAnalysis
                pages={[
                  {
                    url: result.url,
                    title: result.pageData.title,
                    statusCode: 200,
                    crawlTime: new Date(result.timestamp).toISOString(),
                    titleLength: result.pageData.title.length,
                    wordCount: result.comprehensiveResults.stats.word_count,
                    headings: {
                      h1: result.comprehensiveResults.h_tags.h1.length,
                      h2: result.comprehensiveResults.h_tags.h2.length,
                      h3: result.comprehensiveResults.h_tags.h3.length,
                    },
                    metaDescription: result.pageData.metaDescription,
                    metaDescriptionLength: result.pageData.metaDescription.length,
                    internalLinks: result.pageData.internalLinks,
                    externalLinks: result.pageData.externalLinks,
                    images: result.pageData.imagesTotal,
                    loadTime: result.comprehensiveResults.performance_metrics?.speed_index
                      ? result.comprehensiveResults.performance_metrics.speed_index / 1000
                      : undefined,
                    issues:
                      result.comprehensiveResults.issues?.map((issue) => ({
                        type:
                          issue.severity === "high"
                            ? ("error" as const)
                            : issue.severity === "medium"
                              ? ("warning" as const)
                              : ("notice" as const),
                        category: issue.category || "SEO",
                        title: issue.title,
                        description: issue.description,
                        impact: issue.severity as "high" | "medium" | "low",
                        count: 1,
                      })) || [],
                  },
                ]}
              />
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  SEO Recommendations
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Actionable improvements to boost your search engine rankings and user experience.
                </p>
              </div>

              {/* Quick Wins */}
              <QuickWinsList quickWins={result.comprehensiveResults?.quick_wins || []} />

              {/* All Issues */}
              <IssuesList issues={result.comprehensiveResults?.issues || []} />

              {/* Structured Recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <Card className="bg-white/5 border border-white/10 backdrop-blur-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold flex items-center gap-3 text-purple-900">
                      <div className="p-2 bg-purple-500 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold">
                        Structured Recommendations ({result.recommendations.length})
                      </h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {result.recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-purple-100 dark:border-purple-800 hover:shadow-md transition-shadow"
                        >
                          <Badge
                            variant={
                              rec.type === "critical"
                                ? "destructive"
                                : rec.type === "warning"
                                  ? "default"
                                  : "secondary"
                            }
                            className="mt-1 shrink-0"
                          >
                            {rec.type}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 break-words">
                              {rec.title}
                            </h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3 break-words">
                              {rec.description}
                            </p>
                            <Badge
                              variant="outline"
                              className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700"
                            >
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
  );
}
