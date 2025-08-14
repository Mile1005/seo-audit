"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
const ReportBuilder = dynamic(() => import("../../../components/ReportBuilder"), { ssr: false });
const FixPack = dynamic(() => import("../../../components/FixPack"), { ssr: false });
import PerformancePanel from "../../../components/PerformancePanel";
import { AuditResult } from "../../../lib/heuristics";

interface AuditResponse {
  status: "queued" | "running" | "ready" | "failed";
  result?: AuditResult;
  error?: string;
}

// Score Ring Component
function ScoreRing({
  score,
  label,
  size = "md",
}: {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
}) {
  const radius = size === "sm" ? 30 : size === "lg" ? 60 : 45;
  const strokeWidth = size === "sm" ? 4 : size === "lg" ? 8 : 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 80) return "#10B981"; // green
    if (score >= 60) return "#F59E0B"; // yellow
    return "#EF4444"; // red
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          width={radius * 2 + strokeWidth}
          height={radius * 2 + strokeWidth}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            stroke={getColor(score)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`font-bold ${size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-lg"}`}
          >
            {score}
          </span>
        </div>
      </div>
      <span
        className={`mt-2 text-center font-medium ${size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"}`}
      >
        {label}
      </span>
    </div>
  );
}

// Detected Panel Component
function DetectedPanel({ detected }: { detected: AuditResult["detected"] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Detected Elements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Page Elements</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Title:</span>
              <span className="ml-2 text-gray-600">{detected.title || "Not found"}</span>
            </div>
            <div>
              <span className="font-medium">Meta Description:</span>
              <span className="ml-2 text-gray-600">{detected.meta_description || "Not found"}</span>
            </div>
            <div>
              <span className="font-medium">Canonical:</span>
              <span className="ml-2 text-gray-600">{detected.canonical || "Not found"}</span>
            </div>
            <div>
              <span className="font-medium">H1:</span>
              <span className="ml-2 text-gray-600">{detected.h1 || "Not found"}</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Content Structure</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">H2 Headings:</span>
              <span className="ml-2 text-gray-600">{detected.h2.length}</span>
            </div>
            <div>
              <span className="font-medium">H3 Headings:</span>
              <span className="ml-2 text-gray-600">{detected.h3.length}</span>
            </div>
            <div>
              <span className="font-medium">Images:</span>
              <span className="ml-2 text-gray-600">{detected.images.length}</span>
            </div>
            <div>
              <span className="font-medium">Internal Links:</span>
              <span className="ml-2 text-gray-600">{detected.internal_links.length}</span>
            </div>
          </div>
        </div>
      </div>
      {detected.json_ld_types.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 mb-2">Schema Types</h4>
          <div className="flex flex-wrap gap-2">
            {detected.json_ld_types.map((type, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// PerformancePanel component is now imported from components

// Issue List Component
function IssueList({ issues }: { issues: AuditResult["issues"] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const groupedIssues = issues.reduce(
    (acc, issue) => {
      if (!acc[issue.severity]) acc[issue.severity] = [];
      acc[issue.severity].push(issue);
      return acc;
    },
    {} as Record<string, typeof issues>
  );

  const severityOrder = ["high", "medium", "low"];
  const severityColors = {
    high: "border-red-200 bg-red-50",
    medium: "border-yellow-200 bg-yellow-50",
    low: "border-blue-200 bg-blue-50",
  };

  const severityLabels = {
    high: "High Priority",
    medium: "Medium Priority",
    low: "Low Priority",
  };

    return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues Found ({issues.length})</h3>
      <div className="space-y-6">
        {severityOrder.map((severity) => {
          const severityIssues = groupedIssues[severity];
          if (!severityIssues) return null;

          return (
            <div key={severity}>
              <h4
                className={`font-medium mb-3 ${severity === "high" ? "text-red-700" : severity === "medium" ? "text-yellow-700" : "text-blue-700"}`}
              >
                {severityLabels[severity as keyof typeof severityLabels]} ({severityIssues.length})
              </h4>
              <div className="space-y-3">
                {severityIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`border rounded-lg p-4 ${severityColors[severity as keyof typeof severityColors]}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{issue.found}</h5>
                      <span className="px-2 py-1 bg-white text-xs rounded-full font-medium capitalize">
                        {issue.category.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{issue.why_it_matters}</p>
                    <p className="text-sm font-medium text-gray-900 mb-3">{issue.recommendation}</p>
                    {issue.snippet && (
                      <div className="flex items-center justify-between">
                        <code className="text-xs bg-white p-2 rounded border flex-1 mr-2 overflow-x-auto">
                          {issue.snippet}
                        </code>
                        <button
                          onClick={() => copyToClipboard(issue.snippet!, issue.id)}
                          className="px-3 py-1 bg-white border border-gray-300 rounded text-xs hover:bg-gray-50 transition-colors"
                        >
                          {copiedId === issue.id ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    );
  }

// Quick Wins Component
function QuickWins({ quickWins }: { quickWins: AuditResult["quick_wins"] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const impactColors = {
    high: "border-green-200 bg-green-50",
    medium: "border-yellow-200 bg-yellow-50",
    low: "border-blue-200 bg-blue-50",
  };

    return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Wins ({quickWins.length})</h3>
      <div className="space-y-3">
        {quickWins.map((win) => (
          <div
            key={win.issue_id}
            className={`border rounded-lg p-4 ${impactColors[win.estimated_impact]}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h5 className="font-medium text-gray-900">{win.action}</h5>
              <span
                className={`px-2 py-1 bg-white text-xs rounded-full font-medium capitalize ${
                  win.estimated_impact === "high"
                    ? "text-green-700"
                    : win.estimated_impact === "medium"
                      ? "text-yellow-700"
                      : "text-blue-700"
                }`}
              >
                {win.estimated_impact} impact
              </span>
            </div>
            {win.snippet && (
              <div className="flex items-center justify-between">
                <code className="text-xs bg-white p-2 rounded border flex-1 mr-2 overflow-x-auto">
                  {win.snippet}
                </code>
                <button
                  onClick={() => copyToClipboard(win.snippet!, win.issue_id)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded text-xs hover:bg-gray-50 transition-colors"
                >
                  {copiedId === win.issue_id ? "Copied!" : "Copy"}
                </button>
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
    );
  }

// Action Buttons Component
function ActionButtons({ result }: { result: AuditResult }) {
  const [showReportBuilder, setShowReportBuilder] = useState(false);
  const [showFixPack, setShowFixPack] = useState(false);

  const downloadJSON = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `seo-audit-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

    return (
    <>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
        <div className="space-y-3">
          <button
            onClick={() => window.open(result.url, "_blank")}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Page
          </button>
          <button
            onClick={() => setShowReportBuilder(true)}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            📊 Generate Report
          </button>
          <button
            onClick={() => setShowFixPack(true)}
            className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            🔧 Copy Fix Pack
          </button>
          <button
            onClick={downloadJSON}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Download JSON
          </button>
          <button
            onClick={() => {
              const url = new URL(result.url);
              window.open(
                `https://search.google.com/test/rich-results?url=${encodeURIComponent(result.url)}`,
                "_blank"
              );
            }}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Test Rich Results
          </button>
          <button
            onClick={() => {
              window.open(
                `https://pagespeed.web.dev/?url=${encodeURIComponent(result.url)}`,
                "_blank"
              );
            }}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            PageSpeed Insights
          </button>
        </div>
      </div>

      {/* Report Builder Modal */}
      {showReportBuilder && (
        <ReportBuilder
          isOpen={showReportBuilder}
          onClose={() => setShowReportBuilder(false)}
          result={result}
        />
      )}

      {/* Fix Pack Modal */}
      {showFixPack && (
        <FixPack isOpen={showFixPack} onClose={() => setShowFixPack(false)} result={result} />
      )}
    </>
  );
}

// Competitors Component
function CompetitorsTab({ result }: { result: AuditResult }) {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("us");
  const [serpResults, setSerpResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/serp.snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword.trim(), country }),
      });

      const data = await response.json();

      if (response.ok) {
        setSerpResults(data.results || []);
      } else {
        setError(data.error || "Failed to fetch competitor data");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getTitleLengthColor = (length: number) => {
    if (length < 30) return "text-red-600";
    if (length < 45) return "text-yellow-600";
    if (length <= 60) return "text-green-600";
    return "text-red-600";
  };

  const getTitleLengthStatus = (length: number) => {
    if (length < 30) return "Too Short";
    if (length < 45) return "Short";
    if (length <= 60) return "Optimal";
    return "Too Long";
  };

  const generateTitleSuggestions = (currentTitle: string, keyword: string) => {
    const suggestions = [];

    // Suggestion 1: Keyword first
    suggestions.push(`${keyword} - ${currentTitle.split(" - ")[0] || "Complete Guide"}`);

    // Suggestion 2: Brand + Keyword
    const brand = currentTitle.split(" - ")[1] || "Your Brand";
    suggestions.push(`${keyword} | ${brand}`);

    // Suggestion 3: Question format
    suggestions.push(`Best ${keyword} Guide: Complete Tutorial & Tips`);

    // Suggestion 4: Number format
    suggestions.push(`Top 10 ${keyword} Strategies for 2024`);

    return suggestions.filter((s) => s.length >= 45 && s.length <= 60);
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitor Analysis</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
                Target Keyword
              </label>
              <input
                type="text"
                id="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter your target keyword"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="de">Germany</option>
                <option value="fr">France</option>
                <option value="es">Spain</option>
                <option value="it">Italy</option>
                <option value="nl">Netherlands</option>
                <option value="jp">Japan</option>
                <option value="br">Brazil</option>
                <option value="mx">Mexico</option>
                <option value="in">India</option>
              </select>
              </div>
            </div>
          <button
            type="submit"
            disabled={loading || !keyword.trim()}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Analyzing..." : "Analyze Competitors"}
          </button>
        </form>
          </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Results Table */}
      {serpResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Top 10 Search Results for &quot;{keyword}&quot;
            </h3>
                    </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Length
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {serpResults.map((result, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{result.position}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-md">
                        <div className="font-medium text-blue-600 hover:text-blue-800">
                          <a href={result.url} target="_blank" rel="noopener noreferrer">
                            {result.title}
                          </a>
                  </div>
                        <div className="text-gray-500 mt-1 line-clamp-2">{result.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="max-w-xs truncate">{result.url}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-medium ${getTitleLengthColor(result.title.length)}`}>
                        {result.title.length} chars
                      </span>
                      <div className="text-xs text-gray-500">
                        {getTitleLengthStatus(result.title.length)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
            </div>
      )}

      {/* Title Suggestions */}
      {serpResults.length > 0 && result.detected.title && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Title Optimization Suggestions
          </h3>
              <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Current Title</h4>
              <p className="text-gray-600">{result.detected.title}</p>
              <p className={`text-sm mt-1 ${getTitleLengthColor(result.detected.title.length)}`}>
                {result.detected.title.length} characters -{" "}
                {getTitleLengthStatus(result.detected.title.length)}
              </p>
                        </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Suggested Improvements</h4>
              <div className="space-y-2">
                {generateTitleSuggestions(result.detected.title, keyword).map(
                  (suggestion, index) => (
                    <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-blue-900 font-medium">{suggestion}</p>
                      <p className="text-sm text-blue-700 mt-1">
                        {suggestion.length} characters - Optimal
                      </p>
                      </div>
                  )
                )}
                    </div>
                  </div>
              </div>
            </div>
      )}
    </div>
  );
}

// Crawl Tab Component
function CrawlTab({ result }: { result: AuditResult }) {
  const [startUrl, setStartUrl] = useState(result.url);
  const [limit, setLimit] = useState(200);
  const [sameHostOnly, setSameHostOnly] = useState(true);
  const [maxDepth, setMaxDepth] = useState(5);
  const [crawlId, setCrawlId] = useState<string | null>(null);
  const [crawlStatus, setCrawlStatus] = useState<
    "idle" | "queued" | "running" | "ready" | "failed"
  >("idle");
  const [crawlResult, setCrawlResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCrawl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startUrl.trim()) return;

    setLoading(true);
    setError(null);
    setCrawlStatus("idle");

    try {
      const response = await fetch("/api/crawl.start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startUrl: startUrl.trim(),
          limit,
          sameHostOnly,
          maxDepth,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCrawlId(data.crawlId);
        setCrawlStatus("queued");
        pollCrawlStatus(data.crawlId);
      } else {
        setError(data.error || "Failed to start crawl");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pollCrawlStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/crawl.get?id=${id}`);
      const data = await response.json();

      if (response.ok) {
        setCrawlStatus(data.status);

        if (data.status === "ready" && data.result) {
          setCrawlResult(data.result);
        } else if (data.status === "failed") {
          setError("Crawl failed");
        } else if (data.status === "queued" || data.status === "running") {
          // Continue polling
          setTimeout(() => pollCrawlStatus(id), 2000);
        }
      } else {
        setError(data.error || "Failed to get crawl status");
      }
    } catch (error) {
      setError("Network error while checking status.");
    }
  };

  const exportCSV = async () => {
    if (!crawlId) return;

    try {
      const response = await fetch(`/api/crawl.export?id=${crawlId}`);

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `crawl-${crawlId}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        setError("Failed to export CSV");
      }
    } catch (error) {
      setError("Network error while exporting.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "queued":
        return "text-yellow-600";
      case "running":
        return "text-blue-600";
      case "ready":
        return "text-green-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "queued":
        return "Queued";
      case "running":
        return "Running";
      case "ready":
        return "Completed";
      case "failed":
        return "Failed";
      default:
        return "Idle";
    }
  };

  return (
    <div className="space-y-6">
      {/* Crawl Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Site Crawl</h3>
        <form onSubmit={startCrawl} className="space-y-4">
          <div>
            <label htmlFor="startUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Start URL
            </label>
            <input
              type="url"
              id="startUrl"
              value={startUrl}
              onChange={(e) => setStartUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
                      </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-1">
                Page Limit
              </label>
              <input
                type="number"
                id="limit"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                min="1"
                max="500"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
                    </div>
            <div>
              <label htmlFor="maxDepth" className="block text-sm font-medium text-gray-700 mb-1">
                Max Depth
              </label>
              <input
                type="number"
                id="maxDepth"
                value={maxDepth}
                onChange={(e) => setMaxDepth(Number(e.target.value))}
                min="1"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
                </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sameHostOnly"
                checked={sameHostOnly}
                onChange={(e) => setSameHostOnly(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="sameHostOnly" className="ml-2 block text-sm text-gray-900">
                Same Host Only
              </label>
              </div>
          </div>

          <button
            type="submit"
            disabled={loading || crawlStatus === "running"}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Starting..." : crawlStatus === "running" ? "Crawling..." : "Start Crawl"}
          </button>
        </form>
      </div>

      {/* Status Display */}
      {crawlStatus !== "idle" && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Crawl Status</h3>
          <div className="flex items-center space-x-3">
            <span className={`font-medium ${getStatusColor(crawlStatus)}`}>
              {getStatusText(crawlStatus)}
            </span>
            {crawlStatus === "running" && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            )}
          </div>
          {crawlId && <p className="text-sm text-gray-600 mt-2">Crawl ID: {crawlId}</p>}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
                </div>
      )}

      {/* Results Display */}
      {crawlResult && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Crawl Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{crawlResult.totalPages}</div>
                <div className="text-sm text-gray-600">Total Pages</div>
                </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {crawlResult.successfulPages}
                </div>
                <div className="text-sm text-gray-600">Successful</div>
                </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{crawlResult.failedPages}</div>
                <div className="text-sm text-gray-600">Failed</div>
                </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(crawlResult.averageLoadTime)}ms
                </div>
                <div className="text-sm text-gray-600">Avg Load Time</div>
                </div>
              </div>
            </div>

          {/* Issues Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues Found</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-xl font-bold text-red-600">
                  {crawlResult.issues.noindex_pages}
                  </div>
                <div className="text-sm text-gray-600">Noindex Pages</div>
                  </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-xl font-bold text-orange-600">
                  {crawlResult.issues.missing_titles}
                </div>
                <div className="text-sm text-gray-600">Missing Titles</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-xl font-bold text-yellow-600">
                  {crawlResult.issues.missing_h1}
                </div>
                <div className="text-sm text-gray-600">Missing H1</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-xl font-bold text-blue-600">
                  {crawlResult.issues.missing_meta_descriptions}
                </div>
                <div className="text-sm text-gray-600">Missing Meta Descriptions</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-xl font-bold text-purple-600">
                  {crawlResult.issues.images_without_alt}
                </div>
                <div className="text-sm text-gray-600">Images Without Alt</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-xl font-bold text-indigo-600">
                  {crawlResult.issues.pages_without_canonical}
                </div>
                <div className="text-sm text-gray-600">Missing Canonical</div>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center">
                  <div>
                <h3 className="text-lg font-semibold text-gray-900">Export Results</h3>
                <p className="text-sm text-gray-600">Download detailed crawl data as CSV</p>
              </div>
              <button
                onClick={exportCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Export CSV
              </button>
            </div>
          </div>
                  </div>
                )}
    </div>
  );
}

// AI Insights Tab Component
function AIInsightsTab({ result }: { result: AuditResult }) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiStatus, setAiStatus] = useState<"idle" | "loading" | "ready" | "failed">("idle");

  // Combine all text content for analysis
  const getContentText = () => {
    const textBlocks = result.detected.title || "";
    const headings = [
      result.detected.h1 || "",
      ...(result.detected.h2 || []),
      ...(result.detected.h3 || []),
    ].join(" ");
    const metaDesc = result.detected.meta_description || "";

    // For demo purposes, create some sample content
    const sampleContent = `
           ${result.detected.title || "Sample Page Title"}
           
           ${result.detected.meta_description || "This is a sample page with content about SEO best practices and digital marketing strategies."}
           
           ${result.detected.h1 || "Main Page Heading"}
           
           ${result.detected.h2.join(". ")}
           
           ${result.detected.h3.join(". ")}
           
           This page provides comprehensive information about search engine optimization techniques, 
           content marketing strategies, and digital marketing best practices. It covers topics such as 
           keyword research, on-page optimization, technical SEO, and performance monitoring.
           
           The content is designed to help website owners and marketers improve their online visibility 
           and drive more organic traffic to their websites through effective SEO strategies.
         `;

    return sampleContent.replace(/\s+/g, " ").trim();
  };

  const runAIAnalysis = async () => {
    setLoading(true);
    setError(null);
    setAiStatus("loading");

    try {
      // Dynamic import to avoid SSR issues
      const { analyzeContent, getAILoadingStatus } = await import("../../../lib/ai/localAI");

      // Check AI status
      const status = getAILoadingStatus();
      if (!status.loaded && !status.loading) {
        setAiStatus("loading");
      }

      const contentText = getContentText();
      const headings = [
        result.detected.h1 || "",
        ...(result.detected.h2 || []),
        ...(result.detected.h3 || []),
      ].filter(Boolean);

      // Run AI analysis
      const aiAnalysis = await analyzeContent(contentText, headings);

      setAnalysis(aiAnalysis);
      setAiStatus(aiAnalysis.aiAvailable ? "ready" : "failed");
    } catch (error) {
      console.error("AI analysis error:", error);
      setError("Failed to run AI analysis. Please try again.");
      setAiStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case "informational":
        return "text-blue-600";
      case "commercial":
        return "text-green-600";
      case "educational":
        return "text-purple-600";
      case "transactional":
        return "text-orange-600";
      case "navigational":
        return "text-gray-600";
      case "entertainment":
        return "text-pink-600";
      default:
        return "text-gray-600";
    }
  };

  const getIntentIcon = (intent: string) => {
    switch (intent) {
      case "informational":
        return "📊";
      case "commercial":
        return "💰";
      case "educational":
        return "📚";
      case "transactional":
        return "🛒";
      case "navigational":
        return "🧭";
      case "entertainment":
        return "🎮";
      default:
        return "📄";
    }
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 0.8) return "text-green-600";
    if (relevance >= 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
                  <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Content Analysis</h3>
            <p className="text-sm text-gray-600">
              Local AI-powered insights using transformer models
            </p>
          </div>
          <button
            onClick={runAIAnalysis}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Analyzing..." : "Run AI Analysis"}
          </button>
        </div>

        {/* AI Status */}
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              aiStatus === "ready"
                ? "bg-green-500"
                : aiStatus === "loading"
                  ? "bg-yellow-500"
                  : aiStatus === "failed"
                    ? "bg-red-500"
                    : "bg-gray-400"
            }`}
          ></div>
          <span className="text-sm text-gray-600">
            {aiStatus === "ready"
              ? "AI Models Ready"
              : aiStatus === "loading"
                ? "Loading AI Models..."
                : aiStatus === "failed"
                  ? "AI Models Unavailable"
                  : "AI Models Not Loaded"}
          </span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
                  </div>
                )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Content Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Content Summary</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
            </div>
          </div>

          {/* Intent Classification */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Content Intent</h4>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getIntentIcon(analysis.intent.intent)}</span>
                  <div>
                <div className={`font-semibold ${getIntentColor(analysis.intent.intent)}`}>
                  {analysis.intent.intent.charAt(0).toUpperCase() + analysis.intent.intent.slice(1)}
                </div>
                <div className="text-sm text-gray-600">
                  Confidence: {Math.round(analysis.intent.confidence * 100)}%
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${analysis.intent.confidence * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Topic Gap Suggestions */}
          {analysis.topicGaps.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Topic Gap Suggestions</h4>
              <div className="space-y-4">
                {analysis.topicGaps.map((gap: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{gap.topic}</h5>
                      <span className={`text-sm font-medium ${getRelevanceColor(gap.relevance)}`}>
                        {Math.round(gap.relevance * 100)}% relevance
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">{gap.reasoning}</p>
                  </div>
                      ))}
                    </div>
      </div>
                )}

          {/* AI Model Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">About Local AI</h4>
            <p className="text-sm text-blue-700">
              This analysis uses local transformer models running in your browser. No data is sent
              to external servers, ensuring privacy and security. Models are loaded on-demand and
              cached for faster subsequent analysis.
            </p>
              </div>
            </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <div>
              <div className="font-medium text-gray-900">Running AI Analysis</div>
              <div className="text-sm text-gray-600">This may take a few moments on first run</div>
                  </div>
                  </div>
        </div>
      )}
          </div>
  );
}

// Skeleton Loader Component
function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
                      ))}
            </div>
          </div>
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-20 bg-gray-200 rounded"></div>
              ))}
              </div>
          </div>
        ))}
          </div>
    </div>
  );
}

export default function AuditPage() {
  const params = useParams();
  const id = params.id as string;
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const isSampleMode = searchParams.get("sample") === "true";
  const isInline = searchParams.get("inline") === "true";
  const isServerless = process.env.NEXT_PUBLIC_DISABLE_DB === "true";

  const [auditData, setAuditData] = useState<AuditResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDevMode, setIsDevMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"audit" | "competitors" | "crawl" | "ai">("audit");
  const inlineLoadedRef = useRef(false);

  // Detect dev mode
  useEffect(() => {
    setIsDevMode(process.env.NODE_ENV === "development");
  }, []);

  useEffect(() => {
    const loadSampleData = async () => {
      try {
        const response = await fetch("/sample-audit.json", { cache: "no-store" });
        const sampleData: AuditResult = await response.json();

        setAuditData({
          status: "ready",
          result: sampleData,
        });
        setIsLoading(false);
      } catch (error) {
        setError("Failed to load sample data");
        setIsLoading(false);
      }
    };

    const tryInlineFromSession = () => {
      try {
        const cached = sessionStorage.getItem(`audit:${id}`);
        if (cached) {
          const parsed = JSON.parse(cached) as AuditResult;
          setAuditData({ status: "ready", result: parsed });
          setIsLoading(false);
          inlineLoadedRef.current = true;
          return true;
        }
      } catch {}
      return false;
    };

    const pollAudit = async () => {
      try {
        const response = await fetch(`/api/audit.get?id=${id}`, { cache: "no-store" });
        const data: AuditResponse = await response.json();

        if (response.ok) {
          setAuditData(data);

          if (data.status === "ready" || data.status === "failed") {
            setIsLoading(false);
          }
        } else {
          // In serverless mode, backend may respond with queued; do not error
          if ((data as any).status === "queued") {
            // keep waiting
          } else {
            setError(data.error || "Failed to fetch audit data");
            setIsLoading(false);
          }
        }
      } catch (error) {
        setError("Network error. Please check your connection.");
        setIsLoading(false);
      }
    };

    if (isSampleMode) {
      loadSampleData();
      return;
    }

    // In serverless inline mode, never poll; rely on inline cache with short retry window
    if (isServerless || isInline) {
      const start = Date.now();
      const maxWaitMs = 3000;
      const intervalMs = 200;

      if (!tryInlineFromSession()) {
        const timer = setInterval(() => {
          if (tryInlineFromSession()) {
            clearInterval(timer);
          } else if (Date.now() - start > maxWaitMs) {
            clearInterval(timer);
            if (!inlineLoadedRef.current) {
              setError(
                "Could not load inline result. Please start a new audit from the homepage."
              );
              setIsLoading(false);
            }
          }
        }, intervalMs);
        return () => clearInterval(timer);
      }
      return;
    }

    // DB mode: poll API until ready/failed. If backend returns queued, keep waiting.
    pollAudit();
    const interval = setInterval(() => {
      if (isLoading) {
        pollAudit();
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [id, isSampleMode, isInline, isServerless]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Audit</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !auditData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (auditData.status === "failed") {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Audit Failed</h2>
            <p className="text-red-600">The audit could not be completed. Please try again.</p>
          <a
            href="/"
              className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Start New Audit
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (auditData.status !== "ready" || !auditData.result) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">Processing Audit</h2>
            <p className="text-yellow-600">
              Your audit is being processed. This may take a few minutes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const result = auditData.result;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Audit Results</h1>
              <p className="text-gray-600">{result.url}</p>
              <p className="text-sm text-gray-500">
                Audited on {new Date(result.fetched_at).toLocaleString()}
              </p>
              {isSampleMode && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Sample Data
                  </span>
                </div>
              )}
            </div>
            {isDevMode && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    const newUrl = isSampleMode
                      ? window.location.pathname
                      : `${window.location.pathname}?sample=true`;
                    window.location.href = newUrl;
                  }}
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded border hover:bg-gray-200 transition-colors"
                >
                  {isSampleMode ? "Show Real Data" : "Show Sample Data"}
                </button>
                <a
                  href="/"
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded border hover:bg-blue-200 transition-colors text-center"
          >
            New Audit
          </a>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
          <button
                onClick={() => setActiveTab("audit")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "audit"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Audit Results
            </button>
              <button
                onClick={() => setActiveTab("competitors")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "competitors"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Competitor Analysis
              </button>
              <button
                onClick={() => setActiveTab("crawl")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "crawl"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Site Crawl (Beta)
              </button>
              <button
                onClick={() => setActiveTab("ai")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "ai"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                AI Insights
              </button>
            </nav>
          </div>
      </div>

        {/* Tab Content */}
        {activeTab === "audit" && (
          <>
            {/* Score Rings */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Overall Score</h2>
              <div className="flex justify-center mb-8">
                <ScoreRing score={result.scores.overall} label="Overall" size="lg" />
    </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ScoreRing score={result.scores.title_meta} label="Title & Meta" />
                <ScoreRing score={result.scores.headings} label="Headings" />
                <ScoreRing score={result.scores.answerability} label="Content" />
                <ScoreRing score={result.scores.structure} label="Structure" />
                <ScoreRing score={result.scores.schema} label="Schema" />
                <ScoreRing score={result.scores.images} label="Images" />
                <ScoreRing score={result.scores.internal_links} label="Internal Links" />
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <DetectedPanel detected={result.detected} />
              <ActionButtons result={result} />
            </div>

            {/* Performance Panel */}
            <div className="mb-6">
              <PerformancePanel performance={result.performance} />
            </div>

            {/* Issues and Quick Wins */}
            <div className="space-y-6">
              <IssueList issues={result.issues} />
              <QuickWins quickWins={result.quick_wins} />
            </div>
          </>
        )}

        {activeTab === "competitors" && <CompetitorsTab result={result} />}

        {activeTab === "crawl" && <CrawlTab result={result} />}

        {activeTab === "ai" && <AIInsightsTab result={result} />}
      </div>
    </div>
  );
}
