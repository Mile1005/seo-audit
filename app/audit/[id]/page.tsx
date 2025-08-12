"use client";

import React, { useState, useEffect } from "react";
import { AuditResultV1 } from "@/lib/schemas";

interface AuditPageProps {
  params: Promise<{ id: string }>;
}

export default function AuditPage({ params }: AuditPageProps) {
  const [audit, setAudit] = useState<AuditResultV1 | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [runId, setRunId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setRunId(resolvedParams.id);
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!runId) return;

    const fetchAudit = async () => {
      try {
        const response = await fetch(`/api/audit.result?runId=${runId}`);
        const data = await response.json();

        if (data.status === "done" && data.result) {
          setAudit(data.result);
        } else if (data.status === "error") {
          setError(data.error || "Audit failed");
        } else {
          // Still processing, poll again
          setTimeout(fetchAudit, 2000);
          return;
        }
      } catch (err) {
        setError("Failed to fetch audit results");
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, [runId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading audit results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600">{error}</p>
          <a href="/" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  if (!audit) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No audit results found</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SEO Audit Results</h1>
              <p className="text-gray-600 mt-2">{audit.url}</p>
              <p className="text-sm text-gray-500 mt-1">
                Audited on {new Date(audit.fetched_at).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${getScoreBgColor(audit.scores.overall)}`}>
                <span className={`text-2xl font-bold ${getScoreColor(audit.scores.overall)}`}>
                  {audit.scores.overall}
                </span>
                <span className="text-gray-600 ml-2">/ 100</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Overall Score</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Score Breakdown */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Score Breakdown</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(audit.scores).map(([key, score]) => (
                  <div key={key} className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getScoreBgColor(score)} mb-2`}>
                      <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {key.replace(/_/g, ' ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Issues */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Issues Found ({audit.issues.length})
              </h2>
              <div className="space-y-4">
                {audit.issues.map((issue, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            issue.severity === 'high' ? 'bg-red-100 text-red-800' :
                            issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {issue.severity.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500 capitalize">
                            {issue.category.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">{issue.found}</h3>
                        <p className="text-sm text-gray-600 mb-2">{issue.why_it_matters}</p>
                        <p className="text-sm text-gray-900 font-medium">Recommendation:</p>
                        <p className="text-sm text-gray-600">{issue.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Wins */}
            {audit.quick_wins.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Quick Wins ({audit.quick_wins.length})
                </h2>
                <div className="space-y-3">
                  {audit.quick_wins.map((win, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        win.estimated_impact === 'high' ? 'bg-green-600' :
                        win.estimated_impact === 'medium' ? 'bg-yellow-600' :
                        'bg-blue-600'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{win.action}</p>
                        <p className="text-xs text-gray-600 capitalize">
                          Estimated impact: {win.estimated_impact}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Page Statistics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Page Statistics</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Word Count</span>
                  <span className="font-medium">{audit.stats.word_count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reading Time</span>
                  <span className="font-medium">{audit.stats.reading_time_min} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Images</span>
                  <span className="font-medium">{audit.stats.images_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">H2 Headings</span>
                  <span className="font-medium">{audit.stats.h2_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">H3 Headings</span>
                  <span className="font-medium">{audit.stats.h3_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tables</span>
                  <span className="font-medium">{audit.stats.tables_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lists</span>
                  <span className="font-medium">{audit.stats.lists_count}</span>
                </div>
              </div>
            </div>

            {/* Detected Elements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Detected Elements</h2>
              <div className="space-y-4">
                {audit.detected.title && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Title</h3>
                    <p className="text-sm text-gray-600">{audit.detected.title}</p>
                  </div>
                )}
                {audit.detected.meta_description && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Meta Description</h3>
                    <p className="text-sm text-gray-600">{audit.detected.meta_description}</p>
                  </div>
                )}
                {audit.detected.h1 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">H1</h3>
                    <p className="text-sm text-gray-600">{audit.detected.h1}</p>
                  </div>
                )}
                {audit.detected.canonical && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Canonical URL</h3>
                    <p className="text-sm text-gray-600 break-all">{audit.detected.canonical}</p>
                  </div>
                )}
                {audit.detected.json_ld_types.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Schema Types</h3>
                    <div className="flex flex-wrap gap-1">
                      {audit.detected.json_ld_types.map((type, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {type}
                        </span>
                      ))}
                    </div>
      </div>
                )}
              </div>
            </div>

            {/* Google Search Console Insights */}
            {audit.gsc_insights.available && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">GSC Insights</h2>
        <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impressions</span>
                    <span className="font-medium">{audit.gsc_insights.impressions?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clicks</span>
                    <span className="font-medium">{audit.gsc_insights.clicks?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CTR</span>
                    <span className="font-medium">
                      {audit.gsc_insights.ctr ? `${(audit.gsc_insights.ctr * 100).toFixed(1)}%` : 'N/A'}
                    </span>
        </div>
          </div>
                {audit.gsc_insights.top_queries.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Top Queries</h3>
                    <div className="space-y-2">
                      {audit.gsc_insights.top_queries.slice(0, 5).map((query, index) => (
                        <div key={index} className="text-sm">
                          <p className="font-medium text-gray-900">{query.query}</p>
                          <p className="text-gray-600">
                            {query.clicks} clicks, {query.impressions} impressions
                          </p>
            </div>
                      ))}
            </div>
          </div>
                )}
              </div>
            )}
          </div>
          </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <a
            href="/"
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            New Audit
          </a>
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Print Report
            </button>
          </div>
      </div>
    </div>
  );
}


