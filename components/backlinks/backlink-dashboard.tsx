"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ExternalLink,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Shield,
  Target,
  Download,
  RefreshCw,
  Filter,
  Search,
  Mail,
  Globe,
  Link as LinkIcon,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

interface Backlink {
  id: string;
  sourceUrl: string;
  sourceDomain: string;
  targetUrl: string;
  anchorText: string;
  linkType: "FOLLOW" | "NOFOLLOW";
  status: "ACTIVE" | "LOST" | "REDIRECT" | "BROKEN";
  domainRating: number;
  pageRating: number;
  traffic: number;
  isToxic: boolean;
  toxicScore: number;
  linkStrength: "WEAK" | "NORMAL" | "STRONG" | "VERY_STRONG";
  firstSeen: string;
  lastSeen: string;
  lastChecked: string;
}

interface BacklinkStats {
  total: number;
  byStatus: Record<string, number>;
  byLinkType: Record<string, number>;
  toxic: number;
  referringDomains: number;
  domainRating: {
    average: number;
    max: number;
    min: number;
  };
}

interface BacklinkDashboardProps {
  projectId: string;
}

export default function BacklinkDashboard({ projectId }: BacklinkDashboardProps) {
  const [backlinks, setBacklinks] = useState<Backlink[]>([]);
  const [stats, setStats] = useState<BacklinkStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: "all",
    linkType: "all",
    toxic: "all",
    domain: "",
    minDomainRating: "",
    maxDomainRating: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set());

  // Group backlinks by source domain
  const groupedBacklinks = useMemo(() => {
    const groups: Record<string, Backlink[]> = {};
    backlinks.forEach((backlink) => {
      const domain = backlink.sourceDomain;
      if (!groups[domain]) {
        groups[domain] = [];
      }
      groups[domain].push(backlink);
    });
    // Sort by count (most backlinks first), then by highest DR
    return Object.entries(groups)
      .map(([domain, links]) => ({
        domain,
        backlinks: links,
        count: links.length,
        maxDomainRating: Math.max(...links.map((l) => l.domainRating)),
        hasActive: links.some((l) => l.status === "ACTIVE"),
        hasToxic: links.some((l) => l.isToxic),
      }))
      .sort((a, b) => b.count - a.count || b.maxDomainRating - a.maxDomainRating);
  }, [backlinks]);

  const toggleDomainExpanded = (domain: string) => {
    setExpandedDomains((prev) => {
      const next = new Set(prev);
      if (next.has(domain)) {
        next.delete(domain);
      } else {
        next.add(domain);
      }
      return next;
    });
  };

  const parseDateSafe = (value: string | undefined | null) => {
    if (!value) return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  };

  const targetDomain = useMemo(() => {
    const firstTarget = backlinks.find((b) => !!b.targetUrl)?.targetUrl;
    if (!firstTarget) return "";
    try {
      return new URL(firstTarget).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  }, [backlinks]);

  const brandToken = useMemo(() => {
    if (!targetDomain) return "";
    return targetDomain.split(".")[0]?.toLowerCase() ?? "";
  }, [targetDomain]);

  type AnchorCategory = "branded" | "exact" | "partial" | "generic" | "naked";

  const classifyAnchor = useCallback(
    (anchorTextRaw: string): AnchorCategory => {
      const anchorText = (anchorTextRaw || "").trim();
      const lower = anchorText.toLowerCase();

      if (!anchorText) return "generic";

      const looksLikeUrl =
        /^https?:\/\//i.test(anchorText) ||
        /^www\./i.test(anchorText) ||
        (targetDomain && lower.includes(targetDomain.toLowerCase()));
      if (looksLikeUrl) return "naked";

      const genericAnchors = [
        "click here",
        "here",
        "learn more",
        "read more",
        "more",
        "this",
        "website",
        "visit",
        "visit website",
        "link",
      ];
      if (genericAnchors.includes(lower)) return "generic";

      if (brandToken && lower.includes(brandToken)) return "branded";

      const wordCount = lower.split(/\s+/).filter(Boolean).length;
      if (wordCount <= 3) return "exact";
      if (wordCount <= 8) return "partial";
      return "generic";
    },
    [brandToken, targetDomain]
  );

  const anchorInsights = useMemo(() => {
    const total = backlinks.length;
    const counts: Record<AnchorCategory, number> = {
      branded: 0,
      exact: 0,
      partial: 0,
      generic: 0,
      naked: 0,
    };

    const frequency = new Map<string, { text: string; count: number; category: AnchorCategory }>();

    backlinks.forEach((b) => {
      const category = classifyAnchor(b.anchorText);
      counts[category] += 1;

      const normalized = (b.anchorText || "").trim().toLowerCase();
      if (!normalized) return;
      const existing = frequency.get(normalized);
      if (!existing) {
        frequency.set(normalized, { text: (b.anchorText || "").trim(), count: 1, category });
      } else {
        existing.count += 1;
      }
    });

    const percentage = (value: number) => (total > 0 ? Math.round((value / total) * 100) : 0);

    const topAnchors = Array.from(frequency.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
      .map((a) => ({
        ...a,
        percentage: total > 0 ? Math.round((a.count / total) * 100) : 0,
      }));

    return {
      total,
      counts,
      percentages: {
        branded: percentage(counts.branded),
        exact: percentage(counts.exact),
        partial: percentage(counts.partial),
        generic: percentage(counts.generic),
        naked: percentage(counts.naked),
      },
      topAnchors,
    };
  }, [backlinks, classifyAnchor]);

  const linkVelocity = useMemo(() => {
    const now = new Date();
    const dayMs = 24 * 60 * 60 * 1000;
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const countBetween = (start: Date, end: Date) =>
      backlinks.filter((b) => {
        const d = parseDateSafe(b.firstSeen);
        if (!d) return false;
        return d >= start && d < end;
      }).length;

    const last7Start = new Date(startOfToday.getTime() - 7 * dayMs);
    const last14Start = new Date(startOfToday.getTime() - 14 * dayMs);

    const thisWeek = countBetween(last7Start, startOfToday);
    const lastWeek = countBetween(last14Start, last7Start);

    const last30Start = new Date(startOfToday.getTime() - 30 * dayMs);
    const last60Start = new Date(startOfToday.getTime() - 60 * dayMs);

    const thisMonth = countBetween(last30Start, startOfToday);
    const lastMonth = countBetween(last60Start, last30Start);

    const weekDeltaPct = lastWeek === 0 ? null : Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
    const monthDeltaPct = lastMonth === 0 ? null : Math.round(((thisMonth - lastMonth) / lastMonth) * 100);

    // Build monthly data points for the last 7 months (including current month)
    const monthPoints = 7;
    const data = Array.from({ length: monthPoints }).map((_, idx) => {
      const d = new Date(now);
      d.setMonth(d.getMonth() - (monthPoints - 1 - idx));
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      const start = new Date(d);
      const end = new Date(d);
      end.setMonth(end.getMonth() + 1);
      const label = d.toLocaleString(undefined, { month: "short" });
      const count = countBetween(start, end);
      return { date: label, count };
    });

    const avgRecent =
      data.slice(0, Math.max(0, data.length - 1)).reduce((sum, p) => sum + p.count, 0) /
      Math.max(1, data.length - 1);
    const suspiciousSpike = avgRecent > 0 && data[data.length - 1].count > avgRecent * 3;

    return {
      thisWeek,
      thisMonth,
      weekDeltaPct,
      monthDeltaPct,
      trendLabel: suspiciousSpike ? "Watch" : "Healthy",
      trendDescription: suspiciousSpike ? "Unusual spike detected" : "Natural growth pattern",
      data,
    };
  }, [backlinks]);

  const fetchBacklinks = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        projectId,
        page: currentPage.toString(),
        limit: "50",
        ...filter,
      });
      const response = await fetch(`/api/backlinks?${params}`);
      const data = await response.json();
      if (response.ok) {
        setBacklinks(data.backlinks);
        setStats(data.stats);
        setTotalPages(data.pagination.pages);
      } else {
        console.error("Failed to fetch backlinks:", data.error);
      }
    } catch (error) {
      console.error("Error fetching backlinks:", error);
    } finally {
      setLoading(false);
    }
  }, [projectId, currentPage, filter]);

  const generateMockData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/backlinks/mock-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, count: 100 }),
      });

      if (response.ok) {
        fetchBacklinks();
      } else {
        console.error("Failed to generate mock data");
      }
    } catch (error) {
      console.error("Error generating mock data:", error);
    }
  };

  const collectRealBacklinks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/backlinks/collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      const data = await response.json();

      if (response.ok) {
        const { cached, cacheAge, data: responseData } = data;
        const maxChecks = 4; // Default from guide

        if (cached) {
          alert(
            `Showing cached results from ${cacheAge} day(s) ago.\n` +
              `Found ${responseData.stats.totalBacklinks} backlinks from ${responseData.stats.uniqueDomains} domains.\n` +
              `Checks remaining today: ${responseData.stats.checksRemaining}/${maxChecks}`
          );
        } else {
          alert(
            `Successfully collected ${responseData.stats.totalBacklinks} backlinks from ${responseData.stats.uniqueDomains} domains!\n` +
              `Average Domain Rating: ${responseData.stats.avgDomainRating}\n` +
              `Checks remaining today: ${responseData.stats.checksRemaining}/${maxChecks}`
          );
        }

        fetchBacklinks();
      } else {
        const errorMessage = data.message || data.error || "Failed to collect backlinks";
        alert(errorMessage);
        console.error("Failed to collect backlinks:", data);
      }
    } catch (error) {
      console.error("Error collecting backlinks:", error);
      alert("Error collecting backlinks. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBacklinks();
  }, [fetchBacklinks]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "LOST":
        return "bg-red-100 text-red-800";
      case "BROKEN":
        return "bg-orange-100 text-orange-800";
      case "REDIRECT":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLinkStrengthColor = (strength: string) => {
    switch (strength) {
      case "VERY_STRONG":
        return "bg-emerald-100 text-emerald-800";
      case "STRONG":
        return "bg-green-100 text-green-800";
      case "NORMAL":
        return "bg-yellow-100 text-yellow-800";
      case "WEAK":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const domainRatingDistribution = stats
    ? [
        { range: "0-20", count: 0 },
        { range: "21-40", count: 0 },
        { range: "41-60", count: 0 },
        { range: "61-80", count: 0 },
        { range: "81-100", count: 0 },
      ]
    : [];

  // Populate domain rating distribution
  backlinks.forEach((backlink) => {
    const rating = backlink.domainRating;
    if (rating <= 20) domainRatingDistribution[0].count++;
    else if (rating <= 40) domainRatingDistribution[1].count++;
    else if (rating <= 60) domainRatingDistribution[2].count++;
    else if (rating <= 80) domainRatingDistribution[3].count++;
    else domainRatingDistribution[4].count++;
  });

  const statusData = stats
    ? Object.entries(stats.byStatus).map(([status, count]) => ({
        status,
        count,
      }))
    : [];

  const linkTypeData = stats
    ? Object.entries(stats.byLinkType).map(([type, count]) => ({
        type,
        count,
        percentage: Math.round((count / stats.total) * 100),
      }))
    : [];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  if (loading && backlinks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Backlink Analysis</h1>
          <p className="text-muted-foreground">
            Comprehensive backlink profile analysis and monitoring
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={collectRealBacklinks}
            variant="default"
            size="sm"
            className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Target className="h-4 w-4 mr-2" />
            Collect Real Backlinks
          </Button>
          <Button
            onClick={generateMockData}
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate Mock Data
          </Button>
          <Button
            onClick={fetchBacklinks}
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Backlinks</p>
                  <p className="text-2xl font-bold">{stats.total.toLocaleString()}</p>
                </div>
                <LinkIcon className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Referring Domains</p>
                  <p className="text-2xl font-bold">{groupedBacklinks.length.toLocaleString()}</p>
                </div>
                <Globe className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Domain Rating</p>
                  <p className="text-2xl font-bold">{Math.round(stats.domainRating.average)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toxic Links</p>
                  <p className="text-2xl font-bold text-red-600">{stats.toxic}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Health Score</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round(((stats.total - stats.toxic) / stats.total) * 100)}%
                  </p>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <div className="w-full overflow-x-auto pb-2">
          <TabsList className="inline-flex min-w-full sm:min-w-0">
            <TabsTrigger value="overview" className="whitespace-nowrap flex-shrink-0">
              Overview
            </TabsTrigger>
            <TabsTrigger value="backlinks" className="whitespace-nowrap flex-shrink-0">
              Backlinks
            </TabsTrigger>
            <TabsTrigger value="anchors" className="whitespace-nowrap flex-shrink-0">
              Anchor Analysis
            </TabsTrigger>
            <TabsTrigger value="velocity" className="whitespace-nowrap flex-shrink-0">
              Link Velocity
            </TabsTrigger>
            <TabsTrigger value="domains" className="whitespace-nowrap flex-shrink-0">
              Referring Domains
            </TabsTrigger>
            <TabsTrigger value="toxic" className="whitespace-nowrap flex-shrink-0">
              Toxic Analysis
            </TabsTrigger>
            <TabsTrigger value="prospects" className="whitespace-nowrap flex-shrink-0">
              Link Prospects
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Free plan shows partial backlink data</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Backlinks and metrics are collected from free/public data sources and are a
                    sample of what exists. Upgrade to unlock fuller coverage and richer metrics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Domain Rating Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Domain Rating Distribution</CardTitle>
                <CardDescription>Backlinks grouped by domain authority ranges</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={domainRatingDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Link Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Link Type Distribution</CardTitle>
                <CardDescription>Follow vs NoFollow link breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={linkTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ type, percentage }) => `${type} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {linkTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Backlinks - Grouped by Domain */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Backlinks</CardTitle>
              <CardDescription>
                {groupedBacklinks.length} referring domains ({backlinks.length} total backlinks)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groupedBacklinks.slice(0, 8).map((group) => {
                  const isExpanded = expandedDomains.has(group.domain);
                  const primaryBacklink = group.backlinks[0];
                  return (
                    <div key={group.domain} className="border rounded-lg overflow-hidden">
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => group.count > 1 && toggleDomainExpanded(group.domain)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-blue-600">{group.domain}</span>
                            {group.count > 1 && (
                              <Badge variant="secondary" className="text-xs">
                                {group.count} backlinks
                              </Badge>
                            )}
                            {group.hasActive && (
                              <Badge className={getStatusColor("ACTIVE")}>ACTIVE</Badge>
                            )}
                            {group.hasToxic && (
                              <Badge variant="destructive">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Toxic
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1 truncate max-w-md">
                            "{primaryBacklink.anchorText}"
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>DR: {group.maxDomainRating}</span>
                            <span>{primaryBacklink.linkType}</span>
                            <span>
                              Last seen: {new Date(primaryBacklink.lastSeen).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {group.count > 1 && (
                            <span className="text-xs text-muted-foreground">
                              {isExpanded ? "▼" : "▶"}
                            </span>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(primaryBacklink.sourceUrl, "_blank");
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {isExpanded && group.count > 1 && (
                        <div className="border-t bg-muted/30 divide-y">
                          {group.backlinks.map((backlink) => (
                            <div
                              key={backlink.id}
                              className="flex items-center justify-between p-3 pl-8"
                            >
                              <div className="flex-1">
                                <p className="text-sm text-muted-foreground truncate max-w-sm">
                                  "{backlink.anchorText}"
                                </p>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                  <span>DR: {backlink.domainRating}</span>
                                  <span>PR: {backlink.pageRating}</span>
                                  <span>{backlink.linkType}</span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(backlink.sourceUrl, "_blank")}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backlinks" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <Input
                  placeholder="Search domain..."
                  value={filter.domain}
                  onChange={(e) => setFilter((prev) => ({ ...prev, domain: e.target.value }))}
                />
                <Select
                  value={filter.status}
                  onValueChange={(value: string) =>
                    setFilter((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="LOST">Lost</SelectItem>
                    <SelectItem value="BROKEN">Broken</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filter.linkType}
                  onValueChange={(value: string) =>
                    setFilter((prev) => ({ ...prev, linkType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Link Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="FOLLOW">Follow</SelectItem>
                    <SelectItem value="NOFOLLOW">NoFollow</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filter.toxic}
                  onValueChange={(value: string) =>
                    setFilter((prev) => ({ ...prev, toxic: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Toxic Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Links</SelectItem>
                    <SelectItem value="false">Clean Links</SelectItem>
                    <SelectItem value="true">Toxic Links</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Min DR"
                  value={filter.minDomainRating}
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, minDomainRating: e.target.value }))
                  }
                />
                <Input
                  type="number"
                  placeholder="Max DR"
                  value={filter.maxDomainRating}
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, maxDomainRating: e.target.value }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Backlinks Table - Grouped by Domain */}
          <Card>
            <CardHeader>
              <CardTitle>
                {groupedBacklinks.length} Referring Domains ({stats?.total || 0} backlinks)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groupedBacklinks.map((group) => {
                  const isExpanded = expandedDomains.has(group.domain);
                  const primaryBacklink = group.backlinks[0];
                  return (
                    <div key={group.domain} className="border rounded-lg overflow-hidden">
                      {/* Domain Header */}
                      <div
                        className={`flex items-start justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                          isExpanded ? "bg-muted/30" : ""
                        }`}
                        onClick={() => group.count > 1 && toggleDomainExpanded(group.domain)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="font-medium text-blue-600">{group.domain}</span>
                            {group.count > 1 && (
                              <Badge variant="secondary">
                                {group.count} backlinks {isExpanded ? "▼" : "▶"}
                              </Badge>
                            )}
                            {group.hasActive && (
                              <Badge className={getStatusColor("ACTIVE")}>ACTIVE</Badge>
                            )}
                            <Badge className={getLinkStrengthColor(primaryBacklink.linkStrength)}>
                              {primaryBacklink.linkStrength}
                            </Badge>
                            {group.hasToxic && (
                              <Badge variant="destructive">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Toxic
                              </Badge>
                            )}
                          </div>

                          <p className="text-sm mb-2">
                            <span className="font-medium">Anchor:</span> "{primaryBacklink.anchorText}"
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Domain Rating:</span>
                              <span className="ml-1 font-medium">{group.maxDomainRating}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Page Rating:</span>
                              <span className="ml-1 font-medium">{primaryBacklink.pageRating}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Traffic:</span>
                              <span className="ml-1 font-medium">
                                {primaryBacklink.traffic?.toLocaleString() || "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Type:</span>
                              <span className="ml-1 font-medium">{primaryBacklink.linkType}</span>
                            </div>
                          </div>

                          <div className="mt-2 text-xs text-muted-foreground">
                            First seen: {new Date(primaryBacklink.firstSeen).toLocaleDateString()} •
                            Last seen: {new Date(primaryBacklink.lastSeen).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(primaryBacklink.sourceUrl, "_blank");
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Expanded backlinks from same domain */}
                      {isExpanded && group.count > 1 && (
                        <div className="border-t bg-muted/20 divide-y">
                          {group.backlinks.map((backlink, idx) => (
                            <div
                              key={backlink.id}
                              className="flex items-start justify-between p-4 pl-8"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-muted-foreground">#{idx + 1}</span>
                                  <Badge className={getStatusColor(backlink.status)} variant="outline">
                                    {backlink.status}
                                  </Badge>
                                  {backlink.isToxic && (
                                    <Badge variant="destructive" className="text-xs">
                                      Toxic ({Math.round(backlink.toxicScore)}%)
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm mb-1">
                                  <span className="font-medium">Anchor:</span> "{backlink.anchorText}"
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>DR: {backlink.domainRating}</span>
                                  <span>PR: {backlink.pageRating}</span>
                                  <span>{backlink.linkType}</span>
                                  <span>
                                    {new Date(backlink.lastSeen).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(backlink.sourceUrl, "_blank")}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anchors" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Anchor Text Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Anchor Text Distribution</CardTitle>
                <CardDescription>Natural vs optimized anchor text patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Branded Anchors</span>
                      <span className="font-medium">{anchorInsights.percentages.branded}%</span>
                    </div>
                    <Progress value={anchorInsights.percentages.branded} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Exact Match</span>
                      <span className="font-medium text-orange-600">
                        {anchorInsights.percentages.exact}%
                      </span>
                    </div>
                    <Progress value={anchorInsights.percentages.exact} className="h-2 bg-orange-100" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Partial Match</span>
                      <span className="font-medium">{anchorInsights.percentages.partial}%</span>
                    </div>
                    <Progress value={anchorInsights.percentages.partial} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Generic Anchors</span>
                      <span className="font-medium">{anchorInsights.percentages.generic}%</span>
                    </div>
                    <Progress value={anchorInsights.percentages.generic} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Naked URLs</span>
                      <span className="font-medium">{anchorInsights.percentages.naked}%</span>
                    </div>
                    <Progress value={anchorInsights.percentages.naked} className="h-2" />
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">Natural Profile Detected</p>
                      <p className="text-sm text-green-700 mt-1">
                        This analysis is calculated from your discovered backlinks.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Anchor Texts */}
            <Card>
              <CardHeader>
                <CardTitle>Top Anchor Texts</CardTitle>
                <CardDescription>Most frequently used anchor texts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {anchorInsights.topAnchors.map((anchor, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{anchor.text}</p>
                        <p className="text-xs text-muted-foreground capitalize">{anchor.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{anchor.count}</p>
                        <p className="text-xs text-muted-foreground">
                          {anchor.percentage}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Anchor Text Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <div className="text-green-600">✅</div>
                  <div>
                    <p className="font-medium text-green-900">Good branded anchor ratio</p>
                    <p className="text-sm text-green-700">
                      45% branded anchors is within healthy range (40-60%)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="text-blue-600">ℹ️</div>
                  <div>
                    <p className="font-medium text-blue-900">Monitor exact match percentage</p>
                    <p className="text-sm text-blue-700">
                      Keep exact match below 20% to avoid over-optimization penalties
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                  <div className="text-purple-600">🎯</div>
                  <div>
                    <p className="font-medium text-purple-900">Continue maintaining diversity</p>
                    <p className="text-sm text-purple-700">
                      Your anchor text variety helps maintain a natural link profile
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="velocity" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">+{linkVelocity.thisWeek}</div>
                <p className="text-sm text-muted-foreground mt-1">New backlinks this week</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">
                    {linkVelocity.weekDeltaPct === null
                      ? "No prior-week baseline"
                      : `${linkVelocity.weekDeltaPct > 0 ? "+" : ""}${linkVelocity.weekDeltaPct}% from last week`}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">+{linkVelocity.thisMonth}</div>
                <p className="text-sm text-muted-foreground mt-1">New backlinks this month</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">
                    {linkVelocity.monthDeltaPct === null
                      ? "No prior-month baseline"
                      : `${linkVelocity.monthDeltaPct > 0 ? "+" : ""}${linkVelocity.monthDeltaPct}% vs last month`}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{linkVelocity.trendLabel}</div>
                <p className="text-sm text-muted-foreground mt-1">{linkVelocity.trendDescription}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">
                    {linkVelocity.trendLabel === "Healthy" ? "No suspicious spikes" : "Review recent links"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Velocity Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Link Acquisition Over Time</CardTitle>
              <CardDescription>Track your backlink growth patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={linkVelocity.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Velocity Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Velocity Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <div className="text-green-600">✅</div>
                  <div>
                    <p className="font-medium text-green-900">Natural growth pattern detected</p>
                    <p className="text-sm text-green-700">
                      Your link acquisition rate is consistent and appears organic
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="text-blue-600">📊</div>
                  <div>
                    <p className="font-medium text-blue-900">Average: 6-8 new backlinks per week</p>
                    <p className="text-sm text-blue-700">
                      This is a healthy acquisition rate for your domain size
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                  <div className="text-purple-600">🎯</div>
                  <div>
                    <p className="font-medium text-purple-900">No suspicious spikes detected</p>
                    <p className="text-sm text-purple-700">
                      Your growth curve shows no signs of artificial link building
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domains" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Referring Domains ({groupedBacklinks.length})</CardTitle>
              <CardDescription>
                Domains that link to {targetDomain || "your site"}. Click a domain to expand.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {groupedBacklinks.length === 0 ? (
                <div className="text-sm text-muted-foreground">No domains found yet.</div>
              ) : (
                <div className="space-y-3">
                  {groupedBacklinks.map((group) => {
                    const isExpanded = expandedDomains.has(group.domain);
                    const first = group.backlinks[0];
                    return (
                      <div key={group.domain} className="border rounded-lg overflow-hidden">
                        <div
                          className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => group.count > 1 && toggleDomainExpanded(group.domain)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-blue-600">{group.domain}</span>
                              <Badge variant="secondary">{group.count} backlinks</Badge>
                              <span className="text-xs text-muted-foreground">Max DR: {group.maxDomainRating}</span>
                              {group.hasToxic && (
                                <Badge variant="destructive" className="text-xs">
                                  Toxic
                                </Badge>
                              )}
                              {group.count > 1 && (
                                <span className="text-xs text-muted-foreground">
                                  {isExpanded ? "▼" : "▶"}
                                </span>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(first.sourceUrl, "_blank");
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>

                        {isExpanded && group.count > 1 && (
                          <div className="border-t bg-muted/20 divide-y">
                            {group.backlinks.map((b) => (
                              <div key={b.id} className="flex items-center justify-between p-3 pl-8">
                                <div className="flex-1">
                                  <p className="text-sm text-muted-foreground truncate max-w-md">{b.sourceUrl}</p>
                                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                    <span>DR: {b.domainRating}</span>
                                    <span>{b.linkType}</span>
                                    <span>{new Date(b.lastSeen).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => window.open(b.sourceUrl, "_blank")}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="toxic" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-600">
                  {stats ? Math.round(((stats.total - stats.toxic) / stats.total) * 100) : 0}%
                </div>
                <p className="text-sm text-muted-foreground mt-1">Overall link quality</p>
                <Progress
                  value={stats ? ((stats.total - stats.toxic) / stats.total) * 100 : 0}
                  className="mt-4"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Toxic Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-red-600">{stats?.toxic || 0}</div>
                <p className="text-sm text-muted-foreground mt-1">Require attention</p>
                <div className="flex items-center gap-2 mt-4">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600">
                    {stats ? Math.round((stats.toxic / stats.total) * 100) : 0}% of total
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Action Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-orange-600">
                  {stats ? Math.floor(stats.toxic * 0.6) : 0}
                </div>
                <p className="text-sm text-muted-foreground mt-1">High-risk links</p>
                <Button className="mt-4 w-full" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Disavow
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Toxicity Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Toxicity Distribution</CardTitle>
              <CardDescription>Classification of backlinks by toxicity level</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    {
                      category: "Safe",
                      count: stats ? stats.total - stats.toxic : 0,
                      color: "#10b981",
                    },
                    {
                      category: "Warning",
                      count: stats ? Math.floor(stats.toxic * 0.4) : 0,
                      color: "#f59e0b",
                    },
                    {
                      category: "Toxic",
                      count: stats ? Math.floor(stats.toxic * 0.4) : 0,
                      color: "#ef4444",
                    },
                    {
                      category: "Dangerous",
                      count: stats ? Math.floor(stats.toxic * 0.2) : 0,
                      color: "#dc2626",
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8">
                    {[
                      {
                        category: "Safe",
                        count: stats ? stats.total - stats.toxic : 0,
                        color: "#10b981",
                      },
                      {
                        category: "Warning",
                        count: stats ? Math.floor(stats.toxic * 0.4) : 0,
                        color: "#f59e0b",
                      },
                      {
                        category: "Toxic",
                        count: stats ? Math.floor(stats.toxic * 0.4) : 0,
                        color: "#ef4444",
                      },
                      {
                        category: "Dangerous",
                        count: stats ? Math.floor(stats.toxic * 0.2) : 0,
                        color: "#dc2626",
                      },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Toxic Links List */}
          <Card>
            <CardHeader>
              <CardTitle>High-Risk Backlinks</CardTitle>
              <CardDescription>Links that may negatively impact your SEO</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {backlinks
                  .filter((b) => b.isToxic)
                  .slice(0, 10)
                  .map((backlink) => (
                    <div
                      key={backlink.id}
                      className="p-4 border border-red-200 rounded-lg bg-red-50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-red-900">
                              {backlink.sourceDomain}
                            </span>
                            <Badge variant="destructive">
                              Score: {Math.round(backlink.toxicScore)}
                            </Badge>
                          </div>
                          <p className="text-sm text-red-800 mb-1">
                            Anchor: "{backlink.anchorText}"
                          </p>
                          <div className="flex gap-4 text-xs text-red-700">
                            <span>DR: {backlink.domainRating}</span>
                            <span>{backlink.linkType}</span>
                            <span>{backlink.linkStrength}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="text-xs">
                            Mark Safe
                          </Button>
                          <Button variant="destructive" size="sm" className="text-xs">
                            Disavow
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                {backlinks.filter((b) => b.isToxic).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <p className="text-green-600 font-medium">No toxic links detected!</p>
                    <p className="text-sm">Your backlink profile appears healthy</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Toxicity Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats && stats.toxic > 0 && (
                  <>
                    <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                      <div className="text-red-600">🚨</div>
                      <div>
                        <p className="font-medium text-red-900">
                          Review toxic backlinks immediately
                        </p>
                        <p className="text-sm text-red-700">
                          {stats.toxic} potentially harmful links detected. Review and disavow
                          high-risk links.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                      <div className="text-orange-600">⚡</div>
                      <div>
                        <p className="font-medium text-orange-900">Generate disavow file</p>
                        <p className="text-sm text-orange-700">
                          Create a disavow file for Google Search Console to protect your rankings.
                        </p>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="text-blue-600">ℹ️</div>
                  <div>
                    <p className="font-medium text-blue-900">Monitor regularly</p>
                    <p className="text-sm text-blue-700">
                      Check for new toxic backlinks weekly to maintain a healthy link profile.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prospects">
          <Card>
            <CardHeader>
              <CardTitle>Link Building Prospects</CardTitle>
              <CardDescription>Manage outreach opportunities for link building</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button className="whitespace-nowrap">
                    <Target className="h-4 w-4 mr-2" />
                    Find New Prospects
                  </Button>
                  <Button variant="outline" className="whitespace-nowrap">
                    <Mail className="h-4 w-4 mr-2" />
                    Start Outreach Campaign
                  </Button>
                </div>

                <div className="text-center py-8 text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-4" />
                  <p>Link building prospects will be displayed here</p>
                  <p className="text-sm">
                    This feature helps identify and manage outreach opportunities
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
