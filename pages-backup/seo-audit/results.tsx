"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import EnhancedHeader from "../../components/layout/EnhancedHeader";
import Footer from "../../components/layout/Footer";

export const dynamic = 'force-dynamic';

interface AuditIssue {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  recommendation?: string;
}

interface AuditRecommendation {
  title: string;
  description: string;
}

interface AuditResult {
  id: string;
  url: string;
  status: string;
  score?: number;
  issues?: AuditIssue[];
  recommendations?: AuditRecommendation[];
  createdAt: string;
  rawData?: RealAuditResult;
}

// Types for the comprehensive API response
interface RealAuditIssue {
  title?: string;
  description?: string;
  severity?: 'high' | 'medium' | 'low';
  recommendation?: string;
}

interface RealAuditQuickWin {
  title?: string;
  description?: string;
}

interface RealAuditScores {
  overall?: number;
  performance?: number;
  accessibility?: number;
  seo?: number;
  best_practices?: number;
}

interface RealAuditStats {
  internal_links?: number;
  external_links?: number;
  images_count?: number;
  images_size?: number;
  scripts_count?: number;
  scripts_size?: number;
  text_size?: number;
  text_rate?: number;
  word_count?: number;
  reading_time_min?: number;
}

interface RealAuditHTags {
  h1?: string[];
  h2?: string[];
  h3?: string[];
}

interface RealAuditSocialMeta {
  og_title?: string | null;
  og_url?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  twitter_card?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
}

interface RealAuditAccessibility {
  passed_checks?: string[];
  failed_checks?: string[];
}

interface RealAuditIndexability {
  passed_checks?: string[];
  failed_checks?: string[];
}

interface RealAuditSEOChecks {
  passed_checks?: string[];
  failed_checks?: string[];
}

interface RealAuditPerformanceMetrics {
  first_contentful_paint?: number;
  largest_contentful_paint?: number;
  total_blocking_time?: number;
  cumulative_layout_shift?: number;
  speed_index?: number;
  time_to_interactive?: number;
  max_potential_first_input_delay?: number;
}

interface RealAuditResult {
  url?: string;
  scores?: RealAuditScores;
  stats?: RealAuditStats;
  h_tags?: RealAuditHTags;
  social_meta?: RealAuditSocialMeta;
  accessibility?: RealAuditAccessibility;
  indexability?: RealAuditIndexability;
  seo_checks?: RealAuditSEOChecks;
  performance_metrics?: RealAuditPerformanceMetrics;
  performance_opportunities?: string[];
  performance_diagnostics?: string[];
  issues?: RealAuditIssue[];
  quick_wins?: RealAuditQuickWin[];
  fetched_at?: string;
}

export default function SeoAuditResultsPage() {
  const router = useRouter();
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady && router.query.id) {
      fetchAuditResult(router.query.id as string);
    }
  }, [router.isReady, router.query.id]);

  const fetchAuditResult = async (auditId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/seo-audit/results?id=${auditId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch audit result");
      }

      const data = await response.json();
      
      // Handle the comprehensive API response format
      if (data.status === 'done' && data.result) {
        // Transform the real audit result to match our interface
        const realResult = data.result as RealAuditResult;
        const transformedResult: AuditResult = {
          id: auditId,
          url: realResult.url || 'Unknown URL',
          status: 'completed',
          score: realResult.scores?.overall || 0,
          issues: realResult.issues?.map((issue: RealAuditIssue, index: number) => ({
            title: issue.title || `Issue ${index + 1}`,
            description: issue.description || '',
            severity: issue.severity || 'medium',
            recommendation: issue.recommendation || ''
          })) || [],
          recommendations: realResult.quick_wins?.map((win: RealAuditQuickWin, index: number) => ({
            title: win.title || `Recommendation ${index + 1}`,
            description: win.description || ''
          })) || [],
          createdAt: realResult.fetched_at || new Date().toISOString(),
          // Add the raw data for detailed metrics
          rawData: realResult
        };
        setAuditResult(transformedResult);
      } else if (data.status === 'error') {
        setError(data.error || 'Audit failed');
      } else {
        setError('Audit results not available');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading comprehensive audit results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Results</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/seo-audit")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!auditResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h2>
          <p className="text-gray-600 mb-4">The audit result could not be found.</p>
          <button
            onClick={() => router.push("/seo-audit")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start New Audit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <EnhancedHeader />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive SEO Audit Results
            </h1>
            <p className="text-xl text-gray-600">
              Analysis for {auditResult.url}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Report Generated: {new Date(auditResult.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          {/* Main Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Website Snapshot */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Website Snapshot</h2>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-600 mb-2">Website Preview</div>
                  <div className="bg-white rounded border p-3">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {auditResult.url}
                    </div>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Export PDF
                </button>
              </div>
            </div>

            {/* Right Column - Overall Score */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-blue-600 mb-4">
                    {auditResult.rawData?.scores?.overall || auditResult.score}/100
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Overall Score
                  </h2>
                </div>

                {/* Score Breakdown */}
                {auditResult.rawData?.scores && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {auditResult.rawData.scores.performance || 0}
                      </div>
                      <div className="text-sm text-gray-600">Performance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {auditResult.rawData.scores.accessibility || 0}
                      </div>
                      <div className="text-sm text-gray-600">Accessibility</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {auditResult.rawData.scores.seo || 0}
                      </div>
                      <div className="text-sm text-gray-600">SEO</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {auditResult.rawData.scores.best_practices || 0}
                      </div>
                      <div className="text-sm text-gray-600">Best Practices</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Statistics */}
          {auditResult.rawData?.stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Page Statistics</h2>
                <div className="text-2xl font-bold text-blue-600">
                  {auditResult.rawData.scores?.overall || auditResult.score}%
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {auditResult.rawData.stats.internal_links || 0}
                  </div>
                  <div className="text-sm text-gray-600">Internal Links</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {auditResult.rawData.stats.external_links || 0}
                  </div>
                  <div className="text-sm text-gray-600">External Links</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {auditResult.rawData.stats.images_count || 0}
                  </div>
                  <div className="text-sm text-gray-600">Images</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {auditResult.rawData.stats.word_count || 0}
                  </div>
                  <div className="text-sm text-gray-600">Word Count</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {auditResult.rawData.stats.reading_time_min || 0}m
                  </div>
                  <div className="text-sm text-gray-600">Reading Time</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Social Media Meta Tags */}
          {auditResult.rawData?.social_meta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Social Media Meta Tags</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Open Graph</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Title:</span>
                      <p className="text-sm text-gray-900">{auditResult.rawData.social_meta.og_title || 'Not set'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">URL:</span>
                      <p className="text-sm text-gray-900">{auditResult.rawData.social_meta.og_url || 'Not set'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Description:</span>
                      <p className="text-sm text-gray-900">{auditResult.rawData.social_meta.og_description || 'Not set'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Twitter</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Card Type:</span>
                      <p className="text-sm text-gray-900">{auditResult.rawData.social_meta.twitter_card || 'Not set'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Title:</span>
                      <p className="text-sm text-gray-900">{auditResult.rawData.social_meta.twitter_title || 'Not set'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Description:</span>
                      <p className="text-sm text-gray-900">{auditResult.rawData.social_meta.twitter_description || 'Not set'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Accessibility Checks */}
          {auditResult.rawData?.accessibility && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Accessibility Checks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-3">
                    Passed Checks ({auditResult.rawData.accessibility.passed_checks?.length || 0})
                  </h3>
                  <div className="space-y-2">
                    {auditResult.rawData.accessibility.passed_checks?.map((check, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-900">{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-3">
                    Failed Checks ({auditResult.rawData.accessibility.failed_checks?.length || 0})
                  </h3>
                  <div className="space-y-2">
                    {auditResult.rawData.accessibility.failed_checks?.map((check, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-900">{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Indexability Checks */}
          {auditResult.rawData?.indexability && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Indexability Checks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-3">
                    Passed Checks ({auditResult.rawData.indexability.passed_checks?.length || 0})
                  </h3>
                  <div className="space-y-2">
                    {auditResult.rawData.indexability.passed_checks?.map((check, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-900">{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-3">
                    Failed Checks ({auditResult.rawData.indexability.failed_checks?.length || 0})
                  </h3>
                  <div className="space-y-2">
                    {auditResult.rawData.indexability.failed_checks?.map((check, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-900">{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SEO Checks */}
          {auditResult.rawData?.seo_checks && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">SEO Checks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-3">
                    Passed Checks ({auditResult.rawData.seo_checks.passed_checks?.length || 0})
                  </h3>
                  <div className="space-y-2">
                    {auditResult.rawData.seo_checks.passed_checks?.map((check, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-900">{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-3">
                    Failed Checks ({auditResult.rawData.seo_checks.failed_checks?.length || 0})
                  </h3>
                  <div className="space-y-2">
                    {auditResult.rawData.seo_checks.failed_checks?.map((check, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-900">{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Performance Metrics */}
          {auditResult.rawData?.performance_metrics && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {auditResult.rawData.performance_metrics.first_contentful_paint}s
                  </div>
                  <div className="text-sm text-gray-600">First Contentful Paint</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {auditResult.rawData.performance_metrics.largest_contentful_paint}s
                  </div>
                  <div className="text-sm text-gray-600">Largest Contentful Paint</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {auditResult.rawData.performance_metrics.total_blocking_time}ms
                  </div>
                  <div className="text-sm text-gray-600">Total Blocking Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {auditResult.rawData.performance_metrics.cumulative_layout_shift}
                  </div>
                  <div className="text-sm text-gray-600">Cumulative Layout Shift</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Performance Opportunities */}
          {auditResult.rawData?.performance_opportunities && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Performance Opportunities</h2>
              <div className="space-y-3">
                {auditResult.rawData.performance_opportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-900">{opportunity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* H Tags Section */}
          {auditResult.rawData?.h_tags && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">H Tags Analysis</h2>
              
              {/* H1 Tags */}
              {auditResult.rawData.h_tags.h1 && auditResult.rawData.h_tags.h1.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    We found #{auditResult.rawData.h_tags.h1.length} H1 tags on this page.
                  </h3>
                  <div className="space-y-2">
                    {auditResult.rawData.h_tags.h1.map((h1, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <span className="text-sm font-medium text-gray-600">{index + 1}.</span>
                        <span className="ml-2 text-gray-900">{h1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* H2 Tags */}
              {auditResult.rawData.h_tags.h2 && auditResult.rawData.h_tags.h2.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    We found #{auditResult.rawData.h_tags.h2.length} H2 tags on this page.
                  </h3>
                  <div className="space-y-2">
                    {auditResult.rawData.h_tags.h2.map((h2, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <span className="text-sm font-medium text-gray-600">{index + 1}.</span>
                        <span className="ml-2 text-gray-900">{h2}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* H3 Tags */}
              {auditResult.rawData.h_tags.h3 && auditResult.rawData.h_tags.h3.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    We found #{auditResult.rawData.h_tags.h3.length} H3 tags on this page.
                  </h3>
                  <div className="space-y-2">
                    {auditResult.rawData.h_tags.h3.map((h3, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <span className="text-sm font-medium text-gray-600">{index + 1}.</span>
                        <span className="ml-2 text-gray-900">{h3}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Issues */}
          {auditResult.issues && auditResult.issues.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Issues Found ({auditResult.issues.length})
              </h2>
              <div className="space-y-4">
                {auditResult.issues.map((issue: AuditIssue, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        issue.severity === 'high' ? 'bg-red-500' :
                        issue.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {issue.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {issue.description}
                        </p>
                        {issue.recommendation && (
                          <p className="text-sm text-blue-600">
                            <strong>Recommendation:</strong> {issue.recommendation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quick Wins */}
          {auditResult.recommendations && auditResult.recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Quick Wins
              </h2>
              <div className="space-y-4">
                {auditResult.recommendations.map((rec: AuditRecommendation, index: number) => (
                  <div key={index} className="border border-green-200 bg-green-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {rec.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {rec.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
          >
            <button
              onClick={() => router.push("/seo-audit")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4"
            >
              Audit Another Page
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </button>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
