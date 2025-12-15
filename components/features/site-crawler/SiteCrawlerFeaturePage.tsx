"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { useFormSubmission } from "@/hooks/use-api";
import { api } from "@/lib/api-client";
import { AnimatedCrawlVisualization } from "@/components/crawl/animated-crawl-visualization";
import { CrawlResults } from "@/components/crawl/crawl-results";

// Dynamic imports to prevent lambda issues
import dynamic from "next/dynamic";

const SiteArchitecture = dynamic(
  () => import("@/components/features/site-crawler/site-architecture"),
  { ssr: false }
);
const MonitoringFeatures = dynamic(
  () => import("@/components/features/site-crawler/monitoring-features"),
  { ssr: false }
);
const IssueDetection = dynamic(() => import("@/components/features/site-crawler/issue-detection"), {
  ssr: false,
});
const IntegrationOptions = dynamic(
  () => import("@/components/features/site-crawler/integration-options"),
  { ssr: false }
);
const CrawlCapabilities = dynamic(
  () => import("@/components/features/site-crawler/crawl-capabilities"),
  { ssr: false }
);
const SiteCrawlerHero = dynamic(
  () =>
    import("@/components/features/site-crawler/site-crawler-hero").then((mod) => ({
      default: mod.SiteCrawlerHero,
    })),
  { ssr: false }
);

// Define the result type to match API response
interface CrawlPage {
  url: string;
  title: string | null;
  h1_presence: boolean;
  word_count: number;
  images_missing_alt: number;
  meta_description: string | null;
  h1_count: number;
  h2_count: number;
  internal_links: number;
  external_links: number;
  images_total: number;
  load_time_ms: number;
  status: number;
}

interface CrawlResultData {
  startUrl: string;
  pages: CrawlPage[];
  totalPages: number;
  successfulPages: number;
  failedPages: number;
  averageLoadTime: number;
  crawlTime: number;
  issues: {
    missing_titles: number;
    missing_h1: number;
    missing_meta_descriptions: number;
    images_without_alt: number;
  };
  robotsTxt: { found: boolean };
  sitemapXml: { found: boolean };
  brokenLinks: string[];
}

export default function SiteCrawlerFeaturePage() {
  const t = useTranslations("featurePages.siteCrawler");
  const [showResults, setShowResults] = useState(false);
  const [crawlResult, setCrawlResult] = useState<CrawlResultData | null>(null);
  const [crawlingUrl, setCrawlingUrl] = useState<string>("");
  const [crawlingMaxPages, setCrawlingMaxPages] = useState<number>(25);

  const { isSubmitting, submitError, submit } = useFormSubmission<any, any>();

  const handleCrawl = async (data: {
    url: string;
    maxPages?: number;
    includeSubdomains?: boolean;
  }) => {
    setCrawlingUrl(data.url);
    setCrawlingMaxPages(data.maxPages || 25);
    setShowResults(false);
    setCrawlResult(null);

    await submit(
      (formData) => api.crawl.start(formData),
      {
        startUrl: data.url.startsWith("http") ? data.url : `https://${data.url}`,
        limit: data.maxPages || 25,
        includeSubdomains: data.includeSubdomains || false,
      },
      (response: any) => {
        // API returns { status: 'completed', result: CrawlResultData }
        if (response.result) {
          setCrawlResult(response.result);
          setShowResults(true);
        } else if (response.startUrl) {
          // Direct result format (in case API structure changes)
          setCrawlResult(response);
          setShowResults(true);
        }
        setCrawlingUrl("");
      }
    );
  };

  const handleReset = () => {
    setShowResults(false);
    setCrawlResult(null);
    setCrawlingUrl("");
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs
            items={[
              { name: "Features", url: "https://www.aiseoturbo.com/features" },
              { name: "Site Crawler", url: "https://www.aiseoturbo.com/features/site-crawler" },
            ]}
            className="mb-4"
          />
        </div>

        {/* Hero Section - hide when showing results */}
        {!showResults && (
          <section>
            <h1 className="sr-only">Site Crawler - Complete Website Analysis Tool</h1>
            <SiteCrawlerHero
              onCrawlSubmit={handleCrawl}
              isSubmitting={isSubmitting}
              submitError={submitError ?? undefined}
            />
          </section>
        )}

        {/* Animated Crawl Visualization - shown during crawling */}
        <AnimatePresence>
          {isSubmitting && crawlingUrl && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-16 px-4 sm:px-6 lg:px-8"
            >
              <div className="max-w-4xl mx-auto">
                <AnimatedCrawlVisualization url={crawlingUrl} maxPages={crawlingMaxPages} />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Crawl Results Display - using new component */}
        <AnimatePresence>
          {showResults && crawlResult && (
            <motion.section
              id="crawl-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="py-16 px-4 sm:px-6 lg:px-8"
            >
              <CrawlResults result={crawlResult} onReset={handleReset} />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Feature sections - hide when showing results */}
        {!showResults && (
          <>
            {/* Site Architecture */}
            <SiteArchitecture />

            {/* Crawl Capabilities */}
            <CrawlCapabilities />

            {/* Issue Detection */}
            <IssueDetection />

            {/* Monitoring Features */}
            <MonitoringFeatures />

            {/* Integration Options */}
            <IntegrationOptions />

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
          </>
        )}
      </div>
    </MainLayout>
  );
}
