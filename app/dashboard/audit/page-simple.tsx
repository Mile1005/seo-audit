"use client";

import { useState } from "react";
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
import {
  Search,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

interface SimpleAuditResult {
  url: string;
  timestamp: string;
  overall_score: number;
  seo_score: number;
  performance_score: number;
  accessibility_score: number;
  title: string;
  meta_description: string;
  h1_count: number;
  images_count: number;
  internal_links: number;
  recommendations: Array<{
    priority: string;
    category: string;
    issue: string;
    fix: string;
  }>;
}

export default function SimpleAuditPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SimpleAuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartAudit = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log("Starting audit for:", url);

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
        // Transform API response to our simple format
        const auditData = data.data;
        const simpleResult: SimpleAuditResult = {
          url: auditData.url,
          timestamp: auditData.fetched_at,
          overall_score: auditData.overall_score,
          seo_score: auditData.scores.seo,
          performance_score: auditData.scores.performance,
          accessibility_score: auditData.scores.accessibility,
          title: auditData.seo_meta.title || "No title found",
          meta_description: auditData.seo_meta.description || "No meta description found",
          h1_count: auditData.h_tags.h1.length,
          images_count: auditData.stats.images_count,
          internal_links: auditData.stats.internal_links,
          recommendations: auditData.recommendations || [],
        };

        setResult(simpleResult);
        console.log("Audit completed successfully:", simpleResult);
      } else {
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

  return (
    <div>
      <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm mb-6">
        <strong>Deprecated:</strong> This legacy simple audit view will be removed soon. Please use
        the Professional SEO Audit page for full features.
      </div>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Site Audit</h1>
          <p className="text-muted-foreground">
            Analyze your website's SEO performance and get actionable recommendations
          </p>
        </div>

        {/* Audit Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Start New Audit
            </CardTitle>
            <CardDescription>
              Enter a website URL to get comprehensive SEO analysis with real data and actionable
              insights
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
                      Auditing...
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
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isLoading && (
              <Alert>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <AlertDescription>
                  Analyzing your website... This may take a few moments.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Audit Results for {result.url}
                </CardTitle>
                <CardDescription>
                  Completed on {new Date(result.timestamp).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getScoreColor(result.overall_score)}`}>
                      {result.overall_score}
                    </div>
                    <div className="text-sm text-muted-foreground">Overall Score</div>
                    <Progress value={result.overall_score} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(result.seo_score)}`}>
                      {result.seo_score}
                    </div>
                    <div className="text-sm text-muted-foreground">SEO</div>
                    <Progress value={result.seo_score} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-3xl font-bold ${getScoreColor(result.performance_score)}`}
                    >
                      {result.performance_score}
                    </div>
                    <div className="text-sm text-muted-foreground">Performance</div>
                    <Progress value={result.performance_score} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-3xl font-bold ${getScoreColor(result.accessibility_score)}`}
                    >
                      {result.accessibility_score}
                    </div>
                    <div className="text-sm text-muted-foreground">Accessibility</div>
                    <Progress value={result.accessibility_score} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Page Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{result.h1_count}</div>
                    <div className="text-sm text-muted-foreground">H1 Tags</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{result.images_count}</div>
                    <div className="text-sm text-muted-foreground">Images</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{result.internal_links}</div>
                    <div className="text-sm text-muted-foreground">Internal Links</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{result.title.length}</div>
                    <div className="text-sm text-muted-foreground">Title Length</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Meta Information */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Meta Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Title Tag</Label>
                  <p className="text-sm text-muted-foreground mt-1">{result.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Meta Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{result.meta_description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Recommendations ({result.recommendations.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.recommendations.slice(0, 10).map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                        <Badge
                          variant={
                            rec.priority === "critical"
                              ? "destructive"
                              : rec.priority === "high"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {rec.priority}
                        </Badge>
                        <div className="flex-1">
                          <h4 className="font-medium">{rec.issue}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{rec.fix}</p>
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
          </div>
        )}
      </div>
    </div>
  );
}
