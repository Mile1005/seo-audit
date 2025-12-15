"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  FileText,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  XCircle,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Filter,
  Eye,
  Clock,
  Target,
  Info,
  ChevronRight,
} from "lucide-react";

interface PageIssue {
  type: "error" | "warning" | "notice";
  category: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  count?: number;
}

interface CrawledPage {
  url: string;
  title: string;
  statusCode: number;
  crawlTime: string;
  issues: PageIssue[];
  wordCount: number;
  headings: {
    h1: number;
    h2: number;
    h3: number;
  };
  metaDescription?: string;
  metaDescriptionLength?: number;
  titleLength: number;
  internalLinks: number;
  externalLinks: number;
  images: number;
  loadTime?: number;
}

interface Props {
  pages?: CrawledPage[];
  isLoading?: boolean;
}

// Note: Real audit data should be passed via props
// Mock data is only for development/demo purposes
const mockPages: CrawledPage[] = [];

export const CrawledPagesAnalysis = ({ pages = mockPages, isLoading = false }: Props) => {
  const [filter, setFilter] = useState<"all" | "errors" | "warnings" | "healthy">("all");
  const [sortBy, setSortBy] = useState<"url" | "issues" | "status" | "wordCount">("issues");
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "notice":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-slate-500" />;
    }
  };

  const getStatusBadge = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          Healthy
        </Badge>
      );
    } else if (statusCode >= 300 && statusCode < 400) {
      return (
        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
          Redirect
        </Badge>
      );
    } else if (statusCode >= 400) {
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          Error
        </Badge>
      );
    }
    return (
      <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
        Unknown
      </Badge>
    );
  };

  const getIssueCountByType = (issues: PageIssue[], type: string) => {
    return issues.filter((issue) => issue.type === type).length;
  };

  const filteredPages = pages.filter((page) => {
    // Apply search filter
    if (
      searchTerm &&
      !page.url.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !page.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Apply status filter
    switch (filter) {
      case "errors":
        return page.statusCode >= 400 || page.issues.some((issue) => issue.type === "error");
      case "warnings":
        return page.issues.some((issue) => issue.type === "warning");
      case "healthy":
        return page.statusCode >= 200 && page.statusCode < 300 && page.issues.length === 0;
      default:
        return true;
    }
  });

  const sortedPages = [...filteredPages].sort((a, b) => {
    switch (sortBy) {
      case "url":
        return a.url.localeCompare(b.url);
      case "issues":
        return b.issues.length - a.issues.length;
      case "status":
        return a.statusCode - b.statusCode;
      case "wordCount":
        return b.wordCount - a.wordCount;
      default:
        return 0;
    }
  });

  const togglePageExpansion = (url: string) => {
    const newExpanded = new Set(expandedPages);
    if (newExpanded.has(url)) {
      newExpanded.delete(url);
    } else {
      newExpanded.add(url);
    }
    setExpandedPages(newExpanded);
  };

  const totalIssues = pages.reduce((sum, page) => sum + page.issues.length, 0);
  const totalErrors = pages.reduce(
    (sum, page) => sum + getIssueCountByType(page.issues, "error"),
    0
  );
  const totalWarnings = pages.reduce(
    (sum, page) => sum + getIssueCountByType(page.issues, "warning"),
    0
  );
  const healthyPages = pages.filter(
    (page) => page.statusCode >= 200 && page.statusCode < 300 && page.issues.length === 0
  ).length;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Crawled Pages Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-8 justify-center">
            <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            <span className="text-slate-600 dark:text-slate-300">Analyzing crawled pages...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardTitle className="text-lg font-bold flex items-center gap-3 text-slate-900 dark:text-white">
          <div className="p-2 bg-blue-600 rounded-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          Crawled Pages Analysis ({pages.length} pages)
          <Badge className="ml-auto bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-300 dark:border-blue-700">
            {totalIssues} total issues
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {totalErrors}
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-200 font-medium">Errors</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {totalWarnings}
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-200 font-medium">Warnings</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {healthyPages}
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-200 font-medium">Healthy</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {pages.length}
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-200 font-medium">
              Total Pages
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-500 rounded-lg bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-500 rounded-lg bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm whitespace-nowrap"
            >
              <option value="all">All Pages</option>
              <option value="errors">With Errors</option>
              <option value="warnings">With Warnings</option>
              <option value="healthy">Healthy</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-500 rounded-lg bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm whitespace-nowrap"
            >
              <option value="issues">Sort by Issues</option>
              <option value="url">Sort by URL</option>
              <option value="status">Sort by Status</option>
              <option value="wordCount">Sort by Content</option>
            </select>
          </div>
        </div>

        {/* Pages List */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {sortedPages.map((page) => {
            const isExpanded = expandedPages.has(page.url);
            const errorCount = getIssueCountByType(page.issues, "error");
            const warningCount = getIssueCountByType(page.issues, "warning");

            return (
              <div
                key={page.url}
                className="border border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden bg-white dark:bg-slate-700"
              >
                <button
                  onClick={() => togglePageExpansion(page.url)}
                  className="w-full flex items-start gap-4 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 truncate text-sm">
                          {page.title}
                        </h4>
                        <p className="text-xs text-blue-600 dark:text-blue-400 truncate">
                          {page.url}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {getStatusBadge(page.statusCode)}
                        {page.issues.length > 0 && (
                          <Badge className="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                            {page.issues.length} issues
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-700 dark:text-slate-200">
                      {errorCount > 0 && (
                        <div className="flex items-center gap-1 text-red-600 dark:text-red-300">
                          <XCircle className="h-3 w-3" />
                          <span>{errorCount} errors</span>
                        </div>
                      )}
                      {warningCount > 0 && (
                        <div className="flex items-center gap-1 text-orange-600 dark:text-orange-300">
                          <AlertTriangle className="h-3 w-3" />
                          <span>{warningCount} warnings</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>{page.wordCount} words</span>
                      </div>
                      {page.loadTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{page.loadTime}s</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-4">
                    <div className="space-y-4">
                      {/* Page Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border">
                          <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                            SEO Metrics
                          </h5>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-300">
                                Title Length:
                              </span>
                              <span
                                className={`font-medium ${
                                  page.titleLength > 60
                                    ? "text-red-600 dark:text-red-400"
                                    : page.titleLength < 30
                                      ? "text-orange-600 dark:text-orange-400"
                                      : "text-green-600 dark:text-green-400"
                                }`}
                              >
                                {page.titleLength} chars
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-300">
                                Meta Description:
                              </span>
                              <span
                                className={`font-medium ${
                                  !page.metaDescription
                                    ? "text-red-600 dark:text-red-400"
                                    : (page.metaDescriptionLength || 0) > 160
                                      ? "text-orange-600 dark:text-orange-400"
                                      : "text-green-600 dark:text-green-400"
                                }`}
                              >
                                {page.metaDescriptionLength || 0} chars
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-300">
                                Word Count:
                              </span>
                              <span
                                className={`font-medium ${
                                  page.wordCount < 300
                                    ? "text-orange-600 dark:text-orange-400"
                                    : "text-green-600 dark:text-green-400"
                                }`}
                              >
                                {page.wordCount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border">
                          <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                            Structure
                          </h5>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-300">H1 Tags:</span>
                              <span
                                className={`font-medium ${
                                  page.headings.h1 === 0
                                    ? "text-red-600 dark:text-red-400"
                                    : page.headings.h1 > 1
                                      ? "text-orange-600 dark:text-orange-400"
                                      : "text-green-600 dark:text-green-400"
                                }`}
                              >
                                {page.headings.h1}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-300">H2 Tags:</span>
                              <span className="font-medium text-slate-900 dark:text-slate-100">
                                {page.headings.h2}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-300">H3 Tags:</span>
                              <span className="font-medium text-slate-900 dark:text-slate-100">
                                {page.headings.h3}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border">
                          <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                            Links & Media
                          </h5>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-300">
                                Internal Links:
                              </span>
                              <span className="font-medium text-slate-900 dark:text-slate-100">
                                {page.internalLinks}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-300">
                                External Links:
                              </span>
                              <span className="font-medium text-slate-900 dark:text-slate-100">
                                {page.externalLinks}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-300">Images:</span>
                              <span className="font-medium text-slate-900 dark:text-slate-100">
                                {page.images}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Issues List */}
                      {page.issues.length > 0 && (
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border">
                          <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            Issues Found ({page.issues.length})
                          </h5>
                          <div className="space-y-3">
                            {page.issues.map((issue, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg"
                              >
                                {getIssueIcon(issue.type)}
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                                    <h6 className="text-sm font-medium text-slate-900 dark:text-slate-100 break-words">
                                      {issue.title}
                                    </h6>
                                    <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                                      <Badge
                                        className={`text-xs ${
                                          issue.impact === "high"
                                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                            : issue.impact === "medium"
                                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                        }`}
                                      >
                                        {issue.impact} impact
                                      </Badge>
                                      <Badge className="text-xs bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                                        {issue.category}
                                      </Badge>
                                    </div>
                                  </div>
                                  <p className="text-sm text-slate-600 dark:text-slate-300 break-words">
                                    {issue.description}
                                  </p>
                                  {issue.count && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                      Affects {issue.count} elements
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(page.url, "_blank")}
                          className="text-xs"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Page
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          Re-analyze
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {sortedPages.length === 0 && (
            <div className="text-center p-8 text-slate-500 dark:text-slate-400">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No pages found</p>
              <p className="text-sm">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>

        {/* Summary Insights */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
            🎯 Analysis Summary
          </h4>
          <div className="text-sm text-blue-800 dark:text-blue-200">
            {totalErrors > 0
              ? `⚠️ Critical: ${totalErrors} pages have errors that need immediate attention. Focus on fixing HTTP errors, missing meta descriptions, and structural issues.`
              : totalWarnings > 0
                ? `✅ Good: No critical errors found. Address ${totalWarnings} warnings to improve SEO performance.`
                : `🎉 Excellent: All crawled pages are healthy with no major issues detected!`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
