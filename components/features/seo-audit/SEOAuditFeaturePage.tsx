"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Zap,
  TrendingUp,
  Shield,
  Play,
  ChevronRight,
  Clock,
  BarChart,
  Users,
  Star,
  AlertTriangle,
  Loader2,
  Search,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ApiErrorBoundary } from "@/components/ui/error-boundary";
import { useFormSubmission } from "@/hooks/use-api";
import { api, AuditResult, ApiResponse } from "@/lib/api-client";

// Dynamic imports to prevent lambda issues
import dynamic from "next/dynamic";

const AuditCategories = dynamic(() => import("@/components/features/seo-audit/audit-categories"), {
  ssr: false,
});
const AuditPreview = dynamic(() => import("@/components/features/seo-audit/audit-preview"), {
  ssr: false,
});
const TechnicalBreakdown = dynamic(
  () => import("@/components/features/seo-audit/technical-breakdown"),
  { ssr: false }
);
const ResultsShowcase = dynamic(() => import("@/components/features/seo-audit/results-showcase"), {
  ssr: false,
});
const SEOAuditHero = dynamic(
  () =>
    import("@/components/features/seo-audit/seo-audit-hero").then((mod) => ({
      default: mod.SEOAuditHero,
    })),
  { ssr: false }
);

// Helper function to get score label
const getScoreLabel = (score: number): string => {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Good";
  if (score >= 70) return "Needs Improvement";
  if (score >= 60) return "Poor";
  return "Critical Issues";
};

// SEO Audit Result Interface
interface SEOAuditResult {
  auditId: string;
  status: "completed" | "processing" | "failed";
  url: string;
  score: number;
  timestamp: string;
  pageData: {
    title: string | null;
    metaDescription: string | null;
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
  issues: any;
  recommendations: Array<{
    type: "critical" | "warning" | "suggestion";
    category: string;
    title: string;
    description: string;
    priority: number;
  }>;
  robotsTxt: any;
  sitemapXml: any;
  keyword?: string | null;
  email?: string | null;
  // Add comprehensive rawData structure
  rawData?: {
    url?: string;
    scores?: {
      overall?: number;
      performance?: number;
      accessibility?: number;
      seo?: number;
      best_practices?: number;
    };
    stats?: {
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
    };
    h_tags?: {
      h1?: string[];
      h2?: string[];
      h3?: string[];
    };
    social_meta?: {
      og_title?: string | null;
      og_url?: string | null;
      og_description?: string | null;
      og_image?: string | null;
      twitter_card?: string | null;
      twitter_title?: string | null;
      twitter_description?: string | null;
    };
    accessibility?: {
      passed_checks?: string[];
      failed_checks?: string[];
    };
    indexability?: {
      passed_checks?: string[];
      failed_checks?: string[];
    };
    seo_checks?: {
      passed_checks?: string[];
      failed_checks?: string[];
    };
    performance_metrics?: {
      first_contentful_paint?: number;
      largest_contentful_paint?: number;
      total_blocking_time?: number;
      cumulative_layout_shift?: number;
      speed_index?: number;
      time_to_interactive?: number;
      max_potential_first_input_delay?: number;
    };
    performance_opportunities?: string[];
    performance_diagnostics?: string[];
    issues?: Array<{
      title?: string;
      description?: string;
      severity?: "high" | "medium" | "low";
      recommendation?: string;
    }>;
    quick_wins?: Array<{
      title?: string;
      description?: string;
    }>;
    fetched_at?: string;
  };
  // Support for new comprehensive results format
  comprehensiveResults?: any;
}

export default function SEOAuditFeaturePage() {
  const t = useTranslations("featurePages.seoAudit");
  const steps = [
    {
      step: "1",
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.description"),
      icon: Target,
      color: "from-blue-500 to-cyan-500",
    },
    {
      step: "2",
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.description"),
      icon: Zap,
      color: "from-purple-500 to-violet-500",
    },
    {
      step: "3",
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.description"),
      icon: BarChart,
      color: "from-green-500 to-emerald-500",
    },
  ];
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [keyword, setKeyword] = useState("");
  const [errors, setErrors] = useState<{ url?: string; email?: string }>({});
  const [auditResult, setAuditResult] = useState<SEOAuditResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const { isSubmitting, submitError, submit } = useFormSubmission<any, SEOAuditResult>();

  const validateForm = () => {
    const newErrors: { url?: string; email?: string } = {};

    if (!url.trim()) {
      newErrors.url = t("form.errors.urlRequired");
    } else {
      const trimmedUrl = url.trim();
      // More flexible URL validation - allow domains with or without protocol
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
      const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

      if (!urlPattern.test(trimmedUrl) && !domainPattern.test(trimmedUrl)) {
        newErrors.url = t("form.errors.urlInvalid");
      }
    }

    if (email.trim() && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = t("form.errors.emailInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted!", { url, email, keyword });

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }
    try {
      const result = await submit(
        (data) => {
          console.log("API call data:", data);
          return api.audit.start(data) as Promise<ApiResponse<SEOAuditResult>>;
        },
        {
          url: url.trim(),
          email: email.trim() || undefined,
          keyword: keyword.trim() || undefined,
        },
        (response) => {
          console.log("Success callback called with response:", response);

          // Handle the fact that response might be the wrapped API response
          const actualData = (response as any).data ? (response as any).data : response;

          console.log("Actual data:", actualData);
          console.log("Data score:", actualData.score);
          console.log("Data pageData exists?", !!actualData.pageData);
          console.log("Data recommendations count:", actualData.recommendations?.length || 0);

          // Show rich results inline on the same page
          setAuditResult(actualData);
          setShowResults(true);
          setUrl("");
          setEmail("");
          setKeyword("");

          // Smooth scroll to results section
          setTimeout(() => {
            const resultsSection = document.getElementById("audit-results");
            if (resultsSection) {
              resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 100);

          console.log("State updated with actual data");
        }
      );
      console.log("Submit completed:", result);
    } catch (error) {
      console.error("Error starting audit:", error);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return t("scores.excellent");
    if (score >= 60) return t("scores.good");
    if (score >= 40) return t("scores.needsWork");
    return t("scores.poor");
  };

  const handleAuditSubmit = async (data: { url: string; email?: string; keyword?: string }) => {
    setUrl(data.url);
    setEmail(data.email || "");
    setKeyword(data.keyword || "");

    // Create a mock form event for the existing handleSubmit function
    const mockEvent = {
      preventDefault: () => {},
    } as React.FormEvent;

    await handleSubmit(mockEvent);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs
            items={[
              { name: t("breadcrumbs.features"), url: "https://www.aiseoturbo.com/features" },
              {
                name: t("breadcrumbs.seoAudit"),
                url: "https://www.aiseoturbo.com/features/seo-audit",
              },
            ]}
            className="mb-4"
          />
        </div>

        {/* Hero Section with Interactive Form */}
        <section>
          <h1 className="sr-only">SEO Audit Tool - Comprehensive Website Analysis</h1>
          <SEOAuditHero
            onAuditSubmit={handleAuditSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError ?? undefined}
          />
        </section>

        {/* Audit Results Display */}
        <AnimatePresence>
          {showResults && auditResult && (
            <motion.section
              id="audit-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="py-16 px-4 sm:px-6 lg:px-8 bg-background"
            >
              <div className="max-w-6xl mx-auto">
                {/* Results Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-12"
                >
                  <div
                    className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold mb-4 ${
                      auditResult.score >= 80
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : auditResult.score >= 60
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}
                  >
                    <BarChart className="w-5 h-5 mr-2" />
                    Overall SEO Score: {auditResult.score}/100 - {getScoreLabel(auditResult.score)}
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    Audit Results for {auditResult.url}
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    {t("results.completedOn")}{" "}
                    {new Date(auditResult.timestamp).toLocaleDateString()}
                  </p>
                </motion.div>

                {/* Comprehensive Results Display */}
                {auditResult.rawData && (
                  <>
                    {/* Scores Overview */}
                    {(auditResult.rawData.scores || auditResult.comprehensiveResults?.scores) && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-card rounded-2xl shadow-xl p-8 mb-8 border"
                      >
                        <h3 className="text-2xl font-semibold text-foreground mb-6">
                          {t("results.scoresBreakdown")}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600">
                              {auditResult.rawData.scores?.overall ||
                                auditResult.comprehensiveResults?.scores?.overall ||
                                auditResult.score ||
                                "N/A"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("results.overallScore")}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-green-500/10 rounded-lg">
                            <div className="text-3xl font-bold text-green-600">
                              {auditResult.rawData.scores?.performance ||
                                auditResult.comprehensiveResults?.scores?.performance ||
                                "N/A"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("results.performance")}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                            <div className="text-3xl font-bold text-purple-600">
                              {auditResult.rawData.scores?.accessibility ||
                                auditResult.comprehensiveResults?.scores?.accessibility ||
                                "N/A"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("results.accessibility")}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-orange-500/10 rounded-lg">
                            <div className="text-3xl font-bold text-orange-600">
                              {auditResult.rawData.scores?.seo ||
                                auditResult.comprehensiveResults?.scores?.seo ||
                                "N/A"}
                            </div>
                            <div className="text-sm text-muted-foreground">{t("results.seo")}</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Performance Metrics */}
                    {(auditResult.rawData.performance_metrics ||
                      auditResult.comprehensiveResults?.performance_metrics) && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-card rounded-2xl shadow-xl p-8 mb-8 border"
                      >
                        <h3 className="text-2xl font-semibold text-foreground mb-6">
                          {t("results.performanceMetrics")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="text-center p-4 bg-muted/30 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                              {(
                                auditResult.rawData.performance_metrics?.first_contentful_paint ||
                                auditResult.comprehensiveResults?.performance_metrics
                                  ?.first_contentful_paint
                              )?.toFixed(1)}
                              s
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("results.firstContentfulPaint")}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {t("results.firstContentfulPaintDesc")}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-muted/30 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              {(
                                auditResult.rawData.performance_metrics?.largest_contentful_paint ||
                                auditResult.comprehensiveResults?.performance_metrics
                                  ?.largest_contentful_paint
                              )?.toFixed(1)}
                              s
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("results.largestContentfulPaint")}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {t("results.largestContentfulPaintDesc")}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-muted/30 rounded-lg">
                            <div className="text-2xl font-bold text-orange-600">
                              {auditResult.rawData.performance_metrics?.total_blocking_time ||
                                auditResult.comprehensiveResults?.performance_metrics
                                  ?.total_blocking_time}
                              ms
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("results.totalBlockingTime")}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {t("results.totalBlockingTimeDesc")}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-muted/30 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">
                              {(
                                auditResult.rawData.performance_metrics?.cumulative_layout_shift ||
                                auditResult.comprehensiveResults?.performance_metrics
                                  ?.cumulative_layout_shift
                              )?.toFixed(3)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {t("results.cumulativeLayoutShift")}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {t("results.cumulativeLayoutShiftDesc")}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Issues Found */}
                    {(auditResult.rawData.issues || auditResult.comprehensiveResults?.issues) &&
                      (auditResult.rawData.issues || auditResult.comprehensiveResults?.issues)
                        ?.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-card rounded-2xl shadow-xl p-8 mb-8 border"
                        >
                          <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                            <AlertTriangle className="w-6 h-6 mr-3 text-red-500" />
                            {t("results.issuesFound")}
                            <div className="ml-auto bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                              {
                                (
                                  auditResult.rawData.issues ||
                                  auditResult.comprehensiveResults?.issues
                                )?.length
                              }{" "}
                              {t("results.issues")}
                            </div>
                          </h3>

                          <div className="space-y-4">
                            {(
                              auditResult.rawData.issues || auditResult.comprehensiveResults?.issues
                            )?.map((issue: any, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                className="border border-red-500/20 rounded-xl p-6 bg-red-500/10 hover:shadow-lg transition-all duration-300"
                              >
                                <div className="flex items-start gap-4">
                                  <div
                                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                                      issue.severity === "high"
                                        ? "bg-red-500"
                                        : issue.severity === "medium"
                                          ? "bg-orange-500"
                                          : "bg-yellow-500"
                                    }`}
                                  >
                                    <AlertTriangle className="w-5 h-5 text-white" />
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-3">
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-foreground mb-2 text-lg">
                                          {issue.title}
                                        </h4>
                                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                                          {issue.description}
                                        </p>

                                        {issue.recommendation && (
                                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                              <CheckCircle className="w-4 h-4 text-blue-600" />
                                              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                                {t("results.howToFix")}
                                              </span>
                                            </div>
                                            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                                              {issue.recommendation}
                                            </p>
                                          </div>
                                        )}

                                        <div className="flex items-center gap-4 text-sm mt-3">
                                          {issue.severity && (
                                            <div className="flex items-center gap-1">
                                              <span className="text-muted-foreground">
                                                {t("results.severity")}
                                              </span>
                                              <span
                                                className={`font-medium ${
                                                  issue.severity === "high"
                                                    ? "text-red-600"
                                                    : issue.severity === "medium"
                                                      ? "text-orange-600"
                                                      : "text-yellow-600"
                                                }`}
                                              >
                                                {issue.severity.charAt(0).toUpperCase() +
                                                  issue.severity.slice(1)}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                    {/* Quick Wins */}
                    {(auditResult.rawData.quick_wins ||
                      auditResult.comprehensiveResults?.quick_wins) &&
                      (
                        auditResult.rawData.quick_wins ||
                        auditResult.comprehensiveResults?.quick_wins
                      )?.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="bg-card rounded-2xl shadow-xl p-8 mb-8 border"
                        >
                          <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                            <Zap className="w-6 h-6 mr-3 text-yellow-500" />
                            {t("results.quickWins")}
                            <div className="ml-auto bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                              {
                                (
                                  auditResult.rawData.quick_wins ||
                                  auditResult.comprehensiveResults?.quick_wins
                                )?.length
                              }{" "}
                              {t("results.improvements")}
                            </div>
                          </h3>

                          <div className="space-y-4">
                            {(
                              auditResult.rawData.quick_wins ||
                              auditResult.comprehensiveResults?.quick_wins
                            )?.map((win: any, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                className="border border-green-500/20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                              >
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                    <CheckCircle className="w-5 h-5 text-white" />
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-foreground mb-2 text-lg">
                                      {win.title}
                                    </h4>
                                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                                      {win.description}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                  </>
                )}

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setAuditResult(null);
                    }}
                    className="bg-muted text-foreground px-8 py-3 rounded-lg hover:bg-muted/80 transition-colors mr-4"
                  >
                    {t("results.auditAnotherPage")}
                  </button>
                  <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                    {t("results.exportReport")}
                  </button>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* How It Works Section */}
        <AuditCategories />

        {/* Technical Breakdown */}
        <TechnicalBreakdown />

        {/* Audit Preview */}
        <AuditPreview />

        {/* Results Showcase */}
        <ResultsShowcase />

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl shadow-xl p-8 border"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">{t("cta.title")}</h2>
              <p className="text-xl text-muted-foreground mb-8">{t("cta.subtitle")}</p>
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                {t("cta.button")}
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
