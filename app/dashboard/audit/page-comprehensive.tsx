"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Progress } from "../../../components/ui/progress";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
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

interface ComprehensiveAuditResult {
  url: string;
  timestamp: string;
  auditId: string;
  score: number;
  status: string;

  // Core Scores from comprehensiveResults
  comprehensiveResults: {
    scores: {
      overall: number;
      seo: number;
      performance: number;
      accessibility: number;
      best_practices: number;
    };
    stats: {
      internal_links: number;
      external_links: number;
      images_count: number;
      images_size: number;
      scripts_count: number;
      scripts_size: number;
      text_size: number;
      text_rate: number;
      word_count: number;
      reading_time_min: number;
    };
    h_tags: {
      h1: string[];
      h2: string[];
      h3: string[];
    };
    social_meta: {
      og_title: string | null;
      og_url: string | null;
      og_description: string | null;
      og_image: string | null;
      twitter_card: string | null;
      twitter_title: string | null;
      twitter_description: string | null;
    };
    accessibility: {
      passed_checks: string[];
      failed_checks: string[];
    };
    indexability: {
      passed_checks: string[];
      failed_checks: string[];
    };
    seo_checks: {
      passed_checks: string[];
      failed_checks: string[];
    };
    performance_metrics: {
      first_contentful_paint: number;
      largest_contentful_paint: number;
      total_blocking_time: number;
      cumulative_layout_shift: number;
      speed_index: number;
      time_to_interactive: number;
      max_potential_first_input_delay: number;
      performance_score: number;
    };
    performance_opportunities: Array<{
      id: string;
      title: string;
      description: string;
      score: number | null;
      scoreDisplayMode: string;
      numericValue: number | null;
      numericUnit: string;
      displayValue: string | null;
      details: any;
    }>;
    performance_diagnostics: Array<{
      id: string;
      title: string;
      description: string;
      score: number | null;
      scoreDisplayMode: string;
      numericValue: number | null;
      numericUnit: string;
      displayValue: string | null;
      details: any;
    }>;
    issues: Array<{
      title: string;
      description: string;
      severity: string;
      category: string;
      location?: string;
      selector?: string;
      current_value?: string;
      expected_value?: string;
      recommendation?: string;
      impact?: string;
      effort?: string;
    }>;
    quick_wins: Array<{
      title: string;
      description: string;
      location: string;
      selector: string;
      current_value: string;
      recommended_value: string;
      priority: string;
      impact: string;
      effort: string;
      category: string;
    }>;
  };

  // Page Data
  pageData: {
    title: string;
    metaDescription: string;
    h1Count: number;
    h2Count: number;
    h3Count: number;
    wordCount: number;
    imagesTotal: number;
    imagesWithoutAlt: number;
    internalLinks: number;
    externalLinks: number;
    loadTime: number;
    canonical: string | null;
    noindex: boolean;
  };

  // Recommendations
  recommendations: Array<{
    type: "critical" | "warning" | "suggestion";
    category: string;
    title: string;
    description: string;
    priority: number;
  }>;
}

export default function ComprehensiveAuditPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ComprehensiveAuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    coreWebVitals: true,
    technicalSEO: false,
    accessibility: false,
    performance: false,
    recommendations: true,
  });

  const handleStartAudit = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log("Starting comprehensive audit for:", url);

      const response = await fetch("/api/seo-audit/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Audit failed");
      }

      if (data.success && data.data) {
        setResult(data.data as ComprehensiveAuditResult);
        console.log("Comprehensive audit completed successfully");
      } else {
        console.error("Invalid response format:", data);
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Audit error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Professional SEO Audit</h1>
        <p className="text-muted-foreground">
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
          <CardDescription>
            Professional SEO audit with Core Web Vitals, accessibility analysis, and detailed
            recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                placeholder="https://example.com or example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleStartAudit}
                disabled={isLoading || !url.trim()}
                className="px-6"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Start Professional Audit
                  </>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <Alert>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <AlertDescription>
                Running comprehensive analysis... This may take up to 30 seconds.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Overall Score Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Audit Results for {result.url}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Completed on {new Date(result.timestamp).toLocaleString()} • Audit ID:{" "}
                {result.auditId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${getScoreColor(result.score)}`}>
                    {result.score}
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                  <Progress value={result.score} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${getScoreColor(result.comprehensiveResults?.scores?.seo || 0)}`}
                  >
                    {result.comprehensiveResults?.scores?.seo || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">SEO</div>
                  <Progress
                    value={result.comprehensiveResults?.scores?.seo || 0}
                    className="mt-2 h-2"
                  />
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${getScoreColor(result.comprehensiveResults?.scores?.performance || 0)}`}
                  >
                    {result.comprehensiveResults?.scores?.performance || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Performance</div>
                  <Progress
                    value={result.comprehensiveResults?.scores?.performance || 0}
                    className="mt-2 h-2"
                  />
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${getScoreColor(result.comprehensiveResults?.scores?.accessibility || 0)}`}
                  >
                    {result.comprehensiveResults?.scores?.accessibility || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Accessibility</div>
                  <Progress
                    value={result.comprehensiveResults?.scores?.accessibility || 0}
                    className="mt-2 h-2"
                  />
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${getScoreColor(result.comprehensiveResults?.scores?.best_practices || 0)}`}
                  >
                    {result.comprehensiveResults?.scores?.best_practices || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Best Practices</div>
                  <Progress
                    value={result.comprehensiveResults?.scores?.best_practices || 0}
                    className="mt-2 h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="core-web-vitals">Core Web Vitals</TabsTrigger>
              <TabsTrigger value="seo">Technical SEO</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Page Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>H1 Tags:</span>
                      <span className="font-medium">{result.pageData.h1Count}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Word Count:</span>
                      <span className="font-medium">
                        {result.pageData.wordCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Reading Time:</span>
                      <span className="font-medium">
                        {result.comprehensiveResults?.stats?.reading_time_min || 0} min
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <ImageIcon aria-hidden="true" className="h-4 w-4" />
                      Images & Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Images:</span>
                      <span className="font-medium">{result.pageData.imagesTotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Missing Alt Text:</span>
                      <span
                        className={`font-medium ${result.pageData.imagesWithoutAlt > 0 ? "text-red-500" : "text-green-500"}`}
                      >
                        {result.pageData.imagesWithoutAlt}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Images Size:</span>
                      <span className="font-medium">
                        {formatBytes(result.comprehensiveResults?.stats?.images_size || 0)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Link className="h-4 w-4" />
                      Link Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Internal Links:</span>
                      <span className="font-medium">{result.pageData.internalLinks}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>External Links:</span>
                      <span className="font-medium">{result.pageData.externalLinks}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Link Ratio:</span>
                      <span className="font-medium">
                        {result.pageData.internalLinks > 0
                          ? (
                              (result.pageData.internalLinks /
                                (result.pageData.internalLinks + result.pageData.externalLinks)) *
                              100
                            ).toFixed(0) + "% internal"
                          : "N/A"}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Gauge className="h-4 w-4" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Load Time:</span>
                      <span className="font-medium">{formatMs(result.pageData.loadTime)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Scripts:</span>
                      <span className="font-medium">
                        {result.comprehensiveResults?.stats?.scripts_count || 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Text Ratio:</span>
                      <span className="font-medium">
                        {((result.comprehensiveResults?.stats?.text_rate || 0) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* SEO Meta Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    SEO Meta Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Title Tag ({result.pageData.title.length} characters)
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1 p-2 bg-muted rounded">
                      {result.pageData.title || "No title found"}
                    </p>
                    {result.pageData.title.length > 60 && (
                      <p className="text-xs text-yellow-600 mt-1">
                        ⚠️ Title is longer than recommended 60 characters
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Meta Description ({result.pageData.metaDescription.length} characters)
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1 p-2 bg-muted rounded">
                      {result.pageData.metaDescription || "No meta description found"}
                    </p>
                    {result.pageData.metaDescription.length > 160 && (
                      <p className="text-xs text-yellow-600 mt-1">
                        ⚠️ Meta description is longer than recommended 160 characters
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Core Web Vitals Tab */}
            <TabsContent value="core-web-vitals" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.comprehensiveResults?.performance_metrics && (
                  <>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          First Contentful Paint
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div
                          className={`text-2xl font-bold ${getRatingColor(getCoreWebVitalRating("fcp", result.comprehensiveResults.performance_metrics.first_contentful_paint))}`}
                        >
                          {result.comprehensiveResults.performance_metrics.first_contentful_paint.toFixed(
                            1
                          )}
                          s
                        </div>
                        <Badge
                          variant={
                            getCoreWebVitalRating(
                              "fcp",
                              result.comprehensiveResults.performance_metrics.first_contentful_paint
                            ) === "good"
                              ? "default"
                              : getCoreWebVitalRating(
                                    "fcp",
                                    result.comprehensiveResults.performance_metrics
                                      .first_contentful_paint
                                  ) === "needs-improvement"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {getCoreWebVitalRating(
                            "fcp",
                            result.comprehensiveResults.performance_metrics.first_contentful_paint
                          )}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          Measures how quickly content appears on screen
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Monitor className="h-4 w-4" />
                          Largest Contentful Paint
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div
                          className={`text-2xl font-bold ${getRatingColor(getCoreWebVitalRating("lcp", result.comprehensiveResults.performance_metrics.largest_contentful_paint))}`}
                        >
                          {result.comprehensiveResults.performance_metrics.largest_contentful_paint.toFixed(
                            1
                          )}
                          s
                        </div>
                        <Badge
                          variant={
                            getCoreWebVitalRating(
                              "lcp",
                              result.comprehensiveResults.performance_metrics
                                .largest_contentful_paint
                            ) === "good"
                              ? "default"
                              : getCoreWebVitalRating(
                                    "lcp",
                                    result.comprehensiveResults.performance_metrics
                                      .largest_contentful_paint
                                  ) === "needs-improvement"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {getCoreWebVitalRating(
                            "lcp",
                            result.comprehensiveResults.performance_metrics.largest_contentful_paint
                          )}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          Measures loading performance
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Layers className="h-4 w-4" />
                          Cumulative Layout Shift
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div
                          className={`text-2xl font-bold ${getRatingColor(getCoreWebVitalRating("cls", result.comprehensiveResults.performance_metrics.cumulative_layout_shift))}`}
                        >
                          {result.comprehensiveResults.performance_metrics.cumulative_layout_shift.toFixed(
                            3
                          )}
                        </div>
                        <Badge
                          variant={
                            getCoreWebVitalRating(
                              "cls",
                              result.comprehensiveResults.performance_metrics
                                .cumulative_layout_shift
                            ) === "good"
                              ? "default"
                              : getCoreWebVitalRating(
                                    "cls",
                                    result.comprehensiveResults.performance_metrics
                                      .cumulative_layout_shift
                                  ) === "needs-improvement"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {getCoreWebVitalRating(
                            "cls",
                            result.comprehensiveResults.performance_metrics.cumulative_layout_shift
                          )}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          Measures visual stability
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Total Blocking Time
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div
                          className={`text-2xl font-bold ${getRatingColor(getCoreWebVitalRating("tbt", result.comprehensiveResults.performance_metrics.total_blocking_time))}`}
                        >
                          {result.comprehensiveResults.performance_metrics.total_blocking_time.toFixed(
                            0
                          )}
                          ms
                        </div>
                        <Badge
                          variant={
                            getCoreWebVitalRating(
                              "tbt",
                              result.comprehensiveResults.performance_metrics.total_blocking_time
                            ) === "good"
                              ? "default"
                              : getCoreWebVitalRating(
                                    "tbt",
                                    result.comprehensiveResults.performance_metrics
                                      .total_blocking_time
                                  ) === "needs-improvement"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {getCoreWebVitalRating(
                            "tbt",
                            result.comprehensiveResults.performance_metrics.total_blocking_time
                          )}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          Measures main thread blocking time
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Time to Interactive
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-500">
                          {result.comprehensiveResults.performance_metrics.time_to_interactive.toFixed(
                            1
                          )}
                          s
                        </div>
                        <Badge variant="outline">Informational</Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          When the page becomes fully interactive
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          Speed Index
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div
                          className={`text-2xl font-bold ${getRatingColor(getCoreWebVitalRating("si", result.comprehensiveResults.performance_metrics.speed_index))}`}
                        >
                          {result.comprehensiveResults.performance_metrics.speed_index.toFixed(1)}s
                        </div>
                        <Badge
                          variant={
                            getCoreWebVitalRating(
                              "si",
                              result.comprehensiveResults.performance_metrics.speed_index
                            ) === "good"
                              ? "default"
                              : getCoreWebVitalRating(
                                    "si",
                                    result.comprehensiveResults.performance_metrics.speed_index
                                  ) === "needs-improvement"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {getCoreWebVitalRating(
                            "si",
                            result.comprehensiveResults.performance_metrics.speed_index
                          )}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          How quickly content is visually displayed
                        </p>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>

              {/* Performance Opportunities */}
              {result.comprehensiveResults?.performance_opportunities &&
                result.comprehensiveResults.performance_opportunities.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5" />
                        Performance Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {result.comprehensiveResults.performance_opportunities
                          .slice(0, 5)
                          .map((opportunity, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-4 border rounded-lg"
                            >
                              <div className="flex-1">
                                <h4 className="font-medium">{opportunity.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {opportunity.description}
                                </p>
                                {opportunity.displayValue && (
                                  <p className="text-sm font-medium mt-2 text-blue-600">
                                    Potential savings: {opportunity.displayValue}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
            </TabsContent>

            {/* Technical SEO Tab */}
            <TabsContent value="seo" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* SEO Checks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      SEO Checks Passed (
                      {result.comprehensiveResults?.seo_checks?.passed_checks?.length || 0})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.comprehensiveResults?.seo_checks?.passed_checks?.map(
                        (check, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{check}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      SEO Issues Found (
                      {result.comprehensiveResults?.seo_checks?.failed_checks?.length || 0})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.comprehensiveResults?.seo_checks?.failed_checks?.map(
                        (check, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                            <span>{check}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Heading Structure */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Heading Structure Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">
                        H1 Tags ({result.comprehensiveResults?.h_tags?.h1?.length || 0})
                      </h4>
                      <div className="space-y-1">
                        {result.comprehensiveResults?.h_tags?.h1?.map((h1, index) => (
                          <div key={index} className="text-sm p-2 bg-muted rounded">
                            {h1}
                          </div>
                        )) || <div className="text-sm text-red-500">No H1 tags found</div>}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">
                        H2 Tags ({result.comprehensiveResults?.h_tags?.h2?.length || 0})
                      </h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {result.comprehensiveResults?.h_tags?.h2?.slice(0, 5).map((h2, index) => (
                          <div key={index} className="text-sm p-2 bg-muted rounded">
                            {h2}
                          </div>
                        )) || <div className="text-sm text-muted-foreground">No H2 tags found</div>}
                        {(result.comprehensiveResults?.h_tags?.h2?.length || 0) > 5 && (
                          <div className="text-xs text-muted-foreground">
                            ... and {(result.comprehensiveResults?.h_tags?.h2?.length || 0) - 5}{" "}
                            more
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">
                        H3 Tags ({result.comprehensiveResults?.h_tags?.h3?.length || 0})
                      </h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {result.comprehensiveResults?.h_tags?.h3?.slice(0, 5).map((h3, index) => (
                          <div key={index} className="text-sm p-2 bg-muted rounded">
                            {h3}
                          </div>
                        )) || <div className="text-sm text-muted-foreground">No H3 tags found</div>}
                        {(result.comprehensiveResults?.h_tags?.h3?.length || 0) > 5 && (
                          <div className="text-xs text-muted-foreground">
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share className="h-5 w-5" />
                      Social Media Meta Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Open Graph</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>og:title:</span>
                            <span
                              className={
                                result.comprehensiveResults.social_meta.og_title
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {result.comprehensiveResults.social_meta.og_title ? "✓" : "✗"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>og:description:</span>
                            <span
                              className={
                                result.comprehensiveResults.social_meta.og_description
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {result.comprehensiveResults.social_meta.og_description ? "✓" : "✗"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>og:image:</span>
                            <span
                              className={
                                result.comprehensiveResults.social_meta.og_image
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {result.comprehensiveResults.social_meta.og_image ? "✓" : "✗"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>og:url:</span>
                            <span
                              className={
                                result.comprehensiveResults.social_meta.og_url
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {result.comprehensiveResults.social_meta.og_url ? "✓" : "✗"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Twitter</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>twitter:card:</span>
                            <span
                              className={
                                result.comprehensiveResults.social_meta.twitter_card
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {result.comprehensiveResults.social_meta.twitter_card ? "✓" : "✗"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>twitter:title:</span>
                            <span
                              className={
                                result.comprehensiveResults.social_meta.twitter_title
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {result.comprehensiveResults.social_meta.twitter_title ? "✓" : "✗"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>twitter:description:</span>
                            <span
                              className={
                                result.comprehensiveResults.social_meta.twitter_description
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
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
            <TabsContent value="accessibility" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      ARIA & Accessibility Passed (
                      {result.comprehensiveResults?.accessibility?.passed_checks?.length || 0})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.comprehensiveResults?.accessibility?.passed_checks?.map(
                        (check, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{check}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      Accessibility Issues (
                      {result.comprehensiveResults?.accessibility?.failed_checks?.length || 0})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.comprehensiveResults?.accessibility?.failed_checks?.map(
                        (check, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                            <span>{check}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Indexability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Indexability Passed (
                      {result.comprehensiveResults?.indexability?.passed_checks?.length || 0})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.comprehensiveResults?.indexability?.passed_checks?.map(
                        (check, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{check}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      Indexability Issues (
                      {result.comprehensiveResults?.indexability?.failed_checks?.length || 0})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.comprehensiveResults?.indexability?.failed_checks?.map(
                        (check, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                            <span>{check}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              {/* Performance Diagnostics */}
              {result.comprehensiveResults?.performance_diagnostics &&
                result.comprehensiveResults.performance_diagnostics.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Performance Diagnostics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {result.comprehensiveResults.performance_diagnostics
                          .slice(0, 8)
                          .map((diagnostic, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-4 border rounded-lg"
                            >
                              <div className="flex-1">
                                <h4 className="font-medium">{diagnostic.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {diagnostic.description}
                                </p>
                                {diagnostic.displayValue && (
                                  <p className="text-sm font-medium mt-2 text-orange-600">
                                    {diagnostic.displayValue}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

              {/* Resource Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Scripts Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Script Count:</span>
                        <span className="font-medium">
                          {result.comprehensiveResults?.stats?.scripts_count || 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Scripts Size:</span>
                        <span className="font-medium">
                          {formatBytes(result.comprehensiveResults?.stats?.scripts_size || 0)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Content Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Text Size:</span>
                        <span className="font-medium">
                          {formatBytes(result.comprehensiveResults?.stats?.text_size || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Text Ratio:</span>
                        <span className="font-medium">
                          {((result.comprehensiveResults?.stats?.text_rate || 0) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <ImageIcon aria-hidden="true" className="h-4 w-4" />
                      Images Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Images Count:</span>
                        <span className="font-medium">
                          {result.comprehensiveResults?.stats?.images_count || 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Images Size:</span>
                        <span className="font-medium">
                          {formatBytes(result.comprehensiveResults?.stats?.images_size || 0)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-6">
              {/* Quick Wins */}
              {result.comprehensiveResults?.quick_wins &&
                result.comprehensiveResults.quick_wins.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        Quick Wins ({result.comprehensiveResults.quick_wins.length})
                      </CardTitle>
                      <CardDescription>
                        Low-effort, high-impact improvements you can implement quickly
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {result.comprehensiveResults.quick_wins.map((win, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20"
                          >
                            <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <h4 className="font-medium">{win.title}</h4>
                                <div className="flex gap-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {win.impact} impact
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {win.effort} effort
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {win.description}
                              </p>
                              {win.current_value && win.recommended_value && (
                                <div className="mt-2 text-xs">
                                  <span className="text-red-600">Current: {win.current_value}</span>
                                  {" → "}
                                  <span className="text-green-600">
                                    Recommended: {win.recommended_value}
                                  </span>
                                </div>
                              )}
                              <Badge variant="outline" className="mt-2">
                                {win.category}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

              {/* All Issues */}
              {result.comprehensiveResults?.issues &&
                result.comprehensiveResults.issues.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        All Issues Found ({result.comprehensiveResults.issues.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {result.comprehensiveResults.issues.map((issue, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                            <Badge
                              variant={
                                issue.severity === "high"
                                  ? "destructive"
                                  : issue.severity === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {issue.severity}
                            </Badge>
                            <div className="flex-1">
                              <h4 className="font-medium">{issue.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {issue.description}
                              </p>
                              {issue.recommendation && (
                                <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
                                  <strong>Recommendation:</strong> {issue.recommendation}
                                </div>
                              )}
                              {issue.current_value && issue.expected_value && (
                                <div className="mt-2 text-xs">
                                  <span className="text-red-600">
                                    Current: {issue.current_value}
                                  </span>
                                  {" → "}
                                  <span className="text-green-600">
                                    Expected: {issue.expected_value}
                                  </span>
                                </div>
                              )}
                              <div className="flex gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {issue.category}
                                </Badge>
                                {issue.impact && (
                                  <Badge variant="outline" className="text-xs">
                                    {issue.impact} impact
                                  </Badge>
                                )}
                                {issue.effort && (
                                  <Badge variant="outline" className="text-xs">
                                    {issue.effort} effort
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

              {/* Structured Recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Structured Recommendations ({result.recommendations.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {result.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                          <Badge
                            variant={
                              rec.type === "critical"
                                ? "destructive"
                                : rec.type === "warning"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {rec.type}
                          </Badge>
                          <div className="flex-1">
                            <h4 className="font-medium">{rec.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                            <Badge variant="outline" className="mt-2">
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
          </Tabs>
        </div>
      )}
    </div>
  );
}
