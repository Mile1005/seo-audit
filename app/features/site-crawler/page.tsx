"use client";

import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { Search, Zap, Globe, BarChart3, Clock, ArrowRight, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { MainLayout } from "../../../components/layout/main-layout";
import CrawlCapabilities from "../../../components/features/site-crawler/crawl-capabilities";
import SiteArchitecture from "../../../components/features/site-crawler/site-architecture";
import IssueDetection from "../../../components/features/site-crawler/issue-detection";
import MonitoringFeatures from "../../../components/features/site-crawler/monitoring-features";
import IntegrationOptions from "../../../components/features/site-crawler/integration-options";

interface CrawlResult {
  startUrl: string;
  totalPages: number;
  successfulPages: number;
  failedPages: number;
  averageLoadTime: number;
  crawlTime: number;
  issues?: {
    missing_titles: number;
    missing_h1: number;
    missing_meta_descriptions: number;
    images_without_alt: number;
  };
  robotsTxt?: { found: boolean };
  sitemapXml?: { found: boolean };
  brokenLinks?: any[];
  pages?: any[];
}



export default function SiteCrawlerPage() {
  const [crawlUrl, setCrawlUrl] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlProgress, setCrawlProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<CrawlResult | null>(null);
  const [crawlError, setCrawlError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const progressMessages = [
    "Initializing crawler...",
    "Fetching robots.txt and sitemap...", 
    "Crawling pages and analyzing content...",
    "Detecting SEO issues...",
    "Analyzing page structure...",
    "Generating recommendations...",
    "Finalizing results..."
  ];

  const [currentProgressMessage, setCurrentProgressMessage] = useState(progressMessages[0]);

  const handleCrawl = async () => {
    if (!crawlUrl.trim()) return;
    
    setIsCrawling(true);
    setCrawlError(null);
    setCrawlProgress(0);
    setShowResults(false);
    
    try {
      // Simulate progressive loading with messages
      for (let i = 0; i < progressMessages.length; i++) {
        setCurrentProgressMessage(progressMessages[i]);
        setCrawlProgress((i / (progressMessages.length - 1)) * 90); // Up to 90%
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      }

      // Call the API
      setCrawlProgress(95);
      const response = await fetch('/api/crawl/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startUrl: crawlUrl,
          limit: pageLimit,
          mode: 'sync'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to crawl website');
      }

      // Check if the result is completed or still processing
      if (data.status === 'completed' && data.result) {
        setCrawlProgress(100);
        
        // Transform the data to match our interface
        const result: CrawlResult = {
          startUrl: data.result.startUrl,
          totalPages: data.result.totalPages,
          successfulPages: data.result.successfulPages,
          failedPages: data.result.failedPages,
          averageLoadTime: data.result.averageLoadTime,
          crawlTime: data.result.crawlTime,
          pages: data.result.pages || [],
          issues: {
            missing_titles: data.result.pages?.filter((p: any) => !p.title || p.title === 'No Title').length || 0,
            missing_h1: data.result.pages?.filter((p: any) => p.h1 === 'Missing').length || 0,
            missing_meta_descriptions: data.result.pages?.filter((p: any) => !p.meta_description).length || 0,
            images_without_alt: data.result.pages?.reduce((sum: number, p: any) => sum + (p.images_without_alt || 0), 0) || 0,
          },
          robotsTxt: { found: true }, // Default values since the API doesn't return these
          sitemapXml: { found: true },
          brokenLinks: []
        };
        
        setCrawlResult(result);
        setShowResults(true);
      } else {
        throw new Error('Crawl did not complete successfully');
      }
      
    } catch (error) {
      setCrawlError(error instanceof Error ? error.message : "An error occurred during crawling");
    } finally {
      setIsCrawling(false);
    }
  };

  const features = [
    {
      icon: Globe,
      title: "10,000+ Pages",
      description: "Crawl massive websites"
    },
    {
      icon: Search,
      title: "50+ Issue Types",
      description: "Comprehensive detection"
    },
    {
      icon: Zap,
      title: "Minutes Not Hours",
      description: "Lightning-fast analysis"
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous site health"
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -8, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 5
              }}
              className="absolute bottom-20 right-10 w-60 h-60 bg-gradient-to-br from-green-400/10 to-blue-600/10 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                >
                  Analyze Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Entire Website
                  </span>{" "}
                  in Minutes
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
                >
                  Crawl up to 10,000 pages, detect 50+ issues, monitor continuously. 
                  Complete technical SEO analysis with visual site mapping.
                </motion.p>

                {/* Feature Pills */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                >
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="text-center p-4 rounded-lg bg-card border hover:shadow-md transition-shadow"
                      >
                        <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-sm font-semibold text-foreground mb-1">
                          {feature.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {feature.description}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* CTA Buttons - now for demo only */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    View Demo
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Side - Interactive Crawl Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative bg-card rounded-2xl p-8 border shadow-lg">
                  {!isCrawling && !showResults ? (
                    /* Crawl Form */
                    <>
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          <Search className="w-5 h-5 inline mr-2" />
                          Start Your Website Crawl
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Enter your website URL and get instant SEO insights
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        {/* URL Input */}
                        <div>
                          <label htmlFor="crawl-url" className="block text-sm font-medium text-foreground mb-2">
                            Website URL
                          </label>
                          <input
                            id="crawl-url"
                            type="url"
                            value={crawlUrl}
                            onChange={(e) => setCrawlUrl(e.target.value)}
                            placeholder="https://your-website.com"
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>

                        {/* Page Limit Selector */}
                        <div>
                          <label htmlFor="page-limit" className="block text-sm font-medium text-foreground mb-2">
                            Pages to Crawl
                          </label>
                          <select
                            id="page-limit"
                            value={pageLimit}
                            onChange={(e) => setPageLimit(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value={5}>5 pages (Quick scan)</option>
                            <option value={10}>10 pages (Recommended)</option>
                            <option value={15}>15 pages (Deep analysis)</option>
                          </select>
                          <p className="text-xs text-muted-foreground mt-1">
                            Free users can crawl up to 15 pages
                          </p>
                        </div>

                        {/* Crawl Button */}
                        <Button 
                          onClick={handleCrawl}
                          disabled={!crawlUrl.trim() || isCrawling}
                          className="w-full py-6 text-lg font-semibold"
                          size="lg"
                        >
                          <Search className="w-5 h-5 mr-2" />
                          Start Crawling
                        </Button>
                      </div>
                    </>
                  ) : isCrawling ? (
                    /* Loading State */
                    <div className="text-center space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Analyzing {crawlUrl}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          This may take a few moments...
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Progress</span>
                          <span>{Math.round(crawlProgress)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${crawlProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>

                      {/* Current Step */}
                      <div className="flex items-center justify-center space-x-3">
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        <span className="text-sm text-foreground font-medium">
                          {currentProgressMessage}
                        </span>
                      </div>
                    </div>
                  ) : showResults && crawlResult ? (
                    /* Results Preview */
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          Crawl Complete!
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Found {crawlResult.totalPages} pages with {(crawlResult.issues?.missing_titles || 0) + (crawlResult.issues?.missing_h1 || 0) + (crawlResult.issues?.missing_meta_descriptions || 0)} issues
                        </p>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-background rounded-lg border">
                          <div className="text-2xl font-bold text-foreground">{crawlResult.successfulPages}</div>
                          <div className="text-xs text-muted-foreground">Pages Crawled</div>
                        </div>
                        <div className="text-center p-3 bg-background rounded-lg border">
                          <div className="text-2xl font-bold text-red-500">
                            {(crawlResult.issues?.missing_titles || 0) + (crawlResult.issues?.missing_h1 || 0) + (crawlResult.issues?.missing_meta_descriptions || 0)}
                          </div>
                          <div className="text-xs text-muted-foreground">Issues Found</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button 
                          className="w-full" 
                          onClick={() => setShowResults(false)}
                        >
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Full Report
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            setCrawlUrl("");
                            setShowResults(false);
                            setCrawlResult(null);
                          }}
                        >
                          Crawl Another Site
                        </Button>
                      </div>
                    </div>
                  ) : null}

                  {/* Error State */}
                  {crawlError && (
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Error</span>
                      </div>
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">{crawlError}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Sections */}
        <CrawlCapabilities />
        <IssueDetection />
        <SiteArchitecture />
        <MonitoringFeatures />
        <IntegrationOptions />

        {/* Results Section - Expandable */}
        <AnimatePresence>
          {showResults && crawlResult && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 border-t"
            >
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                    Crawl Results for {crawlResult.startUrl}
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Completed in {Math.round(crawlResult.crawlTime / 1000)}s • {crawlResult.successfulPages} pages analyzed
                  </p>
                </motion.div>

                {/* Detailed Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {/* Pages Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-card p-6 rounded-xl border shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-4">Pages Overview</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Found:</span>
                        <span className="font-semibold">{crawlResult.totalPages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Successfully Crawled:</span>
                        <span className="font-semibold text-green-600">{crawlResult.successfulPages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Failed:</span>
                        <span className="font-semibold text-red-600">{crawlResult.failedPages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Load Time:</span>
                        <span className="font-semibold">{Math.round(crawlResult.averageLoadTime)}ms</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Issues Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-card p-6 rounded-xl border shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-4">SEO Issues</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Missing Titles:</span>
                        <span className="font-semibold text-red-600">{crawlResult.issues?.missing_titles || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Missing H1:</span>
                        <span className="font-semibold text-red-600">{crawlResult.issues?.missing_h1 || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Missing Meta Desc:</span>
                        <span className="font-semibold text-red-600">{crawlResult.issues?.missing_meta_descriptions || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Images w/o Alt:</span>
                        <span className="font-semibold text-yellow-600">{crawlResult.issues?.images_without_alt || 0}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Technical Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-card p-6 rounded-xl border shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-4">Technical</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Robots.txt:</span>
                        <div className="flex items-center space-x-2">
                          {crawlResult.robotsTxt?.found ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span className="text-sm">{crawlResult.robotsTxt?.found ? 'Found' : 'Missing'}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Sitemap.xml:</span>
                        <div className="flex items-center space-x-2">
                          {crawlResult.sitemapXml?.found ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span className="text-sm">{crawlResult.sitemapXml?.found ? 'Found' : 'Missing'}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Broken Links:</span>
                        <span className="font-semibold text-red-600">{crawlResult.brokenLinks?.length || 0}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center space-y-4"
                >
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="text-lg px-8 py-6">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Get Full Report
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                      Export Results
                    </Button>
                  </div>
                  <Button 
                    variant="ghost"
                    onClick={() => {
                      setShowResults(false);
                      setCrawlResult(null);
                      setCrawlUrl("");
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Start New Crawl
                  </Button>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Final CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-4xl font-bold text-foreground mb-6"
            >
              Ready to Crawl Your Website?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-muted-foreground mb-8"
            >
              Start your comprehensive website analysis in under 60 seconds.
              No setup required.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="#start">
                  <Globe className="w-5 h-5 mr-2" />
                  Start Crawling Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}