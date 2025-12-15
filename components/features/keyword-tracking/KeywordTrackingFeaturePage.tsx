"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
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
  Globe,
  Link,
  ExternalLink,
  FileText,
  Image,
  Zap as ZapIcon,
  TrendingDown,
  TrendingUp as TrendingUpIcon,
  Minus,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ApiErrorBoundary } from "@/components/ui/error-boundary";
import { useFormSubmission } from "@/hooks/use-api";
import { api } from "@/lib/api-client";
import type { KeywordResult } from "@/types/keywords";

// Dynamic imports to prevent lambda issues
import dynamic from "next/dynamic";

const TrackingCapabilities = dynamic(
  () => import("@/components/features/keyword-tracking/tracking-capabilities"),
  { ssr: false }
);
const SERPFeatures = dynamic(() => import("@/components/features/keyword-tracking/serp-features"), {
  ssr: false,
});
const PerformanceAnalytics = dynamic(
  () => import("@/components/features/keyword-tracking/performance-analytics"),
  { ssr: false }
);
const AlertSystem = dynamic(() => import("@/components/features/keyword-tracking/alert-system"), {
  ssr: false,
});
const KeywordTrackingHero = dynamic(
  () =>
    import("@/components/features/keyword-tracking/keyword-tracking-hero").then((mod) => ({
      default: mod.KeywordTrackingHero,
    })),
  { ssr: false }
);

export default function KeywordTrackingFeaturePage() {
  const t = useTranslations("featurePages.keywordTracking");
  const router = useRouter();
  const [showResults, setShowResults] = useState(false);
  const [keywordResults, setKeywordResults] = useState<KeywordResult[]>([]);

  const { isSubmitting, submitError, submit } = useFormSubmission<any, any>();

  const handleKeywordSubmit = async (data: {
    keywords: string[];
    domain?: string;
    location?: string;
  }) => {
    await submit(
      async (formData) => {
        const response = await fetch("/api/keywords/research", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Failed to research keywords");
        }
        return response.json();
      },
      {
        keywords: data.keywords,
        projectId: "demo-keyword-project",
        location: data.location || "US",
        language: "en",
        device: "DESKTOP",
        domain: data.domain,
      },
      (response: any) => {
        if (response.data?.keywords) {
          setKeywordResults(response.data.keywords);
          setShowResults(true);
        }
      }
    );
  };

  // MVP persistence for dashboard visibility (free tier / no DB required)
  useEffect(() => {
    if (!showResults || keywordResults.length === 0) return;
    try {
      const existing = JSON.parse(
        localStorage.getItem("ai-seo-keywords") ?? "[]"
      ) as KeywordResult[];
      localStorage.setItem("ai-seo-keywords", JSON.stringify([...keywordResults, ...existing]));
    } catch {
      // ignore
    }
  }, [showResults, keywordResults]);

  const getIntentColor = (intent: string) => {
    switch (intent.toLowerCase()) {
      case "commercial":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "informational":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "navigational":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "transactional":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return "text-green-600";
    if (difficulty < 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs
            items={[
              { name: "Features", url: "https://www.aiseoturbo.com/features" },
              {
                name: "Keyword Tracking",
                url: "https://www.aiseoturbo.com/features/keyword-tracking",
              },
            ]}
            className="mb-4"
          />
        </div>

        {/* Hero Section */}
        <section>
          <h1 className="sr-only">Keyword Tracking - Monitor SEO Rankings</h1>
          <KeywordTrackingHero
            onKeywordSubmit={handleKeywordSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError ?? undefined}
          />
        </section>

        {/* Keyword Research Results */}
        <AnimatePresence>
          {showResults && keywordResults.length > 0 && (
            <motion.section
              id="keyword-results"
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
                  <div className="inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold mb-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Research Complete
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    Keyword Research Results
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Found {keywordResults.length} keyword{keywordResults.length !== 1 ? "s" : ""}{" "}
                    with detailed metrics
                  </p>
                </motion.div>

                {/* Keywords Table */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card rounded-2xl shadow-xl p-8 mb-8 border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Keyword Analysis</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Keyword</th>
                          <th className="text-center py-3 px-4 font-semibold">Search Volume</th>
                          <th className="text-center py-3 px-4 font-semibold">Difficulty</th>
                          <th className="text-center py-3 px-4 font-semibold">CPC</th>
                          <th className="text-center py-3 px-4 font-semibold">Competition</th>
                          <th className="text-center py-3 px-4 font-semibold">Intent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {keywordResults.map((keyword, index) => (
                          <motion.tr
                            key={keyword.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                            className="border-b hover:bg-muted/30"
                          >
                            <td className="py-3 px-4">
                              <div className="font-medium text-foreground">{keyword.keyword}</div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="font-semibold text-blue-600">
                                {keyword.searchVolume?.toLocaleString() || "N/A"}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div
                                className={`font-semibold ${getDifficultyColor(keyword.difficulty || 0)}`}
                              >
                                {keyword.difficulty?.toFixed(1) || "N/A"}%
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="font-semibold text-green-600">
                                ${keyword.cpc?.toFixed(2) || "N/A"}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="font-semibold text-purple-600">
                                {keyword.competition
                                  ? (keyword.competition * 100).toFixed(1)
                                  : "N/A"}
                                %
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getIntentColor(keyword.intent || "")}`}
                              >
                                {keyword.intent || "Unknown"}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setKeywordResults([]);
                    }}
                    className="bg-muted text-foreground px-8 py-3 rounded-lg hover:bg-muted/80 transition-colors mr-4"
                  >
                    Research More Keywords
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/keywords")}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Start Tracking Keywords
                  </button>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Tracking Capabilities */}
        <TrackingCapabilities />

        {/* SERP Features */}
        <SERPFeatures />

        {/* Performance Analytics */}
        <PerformanceAnalytics />

        {/* Alert System */}
        <AlertSystem />

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
              <button
                onClick={() => router.push("/pricing")}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                {t("cta.button")}
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
