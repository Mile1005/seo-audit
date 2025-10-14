"use client";

import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { Search, Zap, Globe, BarChart3, Clock, ArrowRight, AlertCircle, CheckCircle, Loader2, Download } from "lucide-react";
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
  const [isExporting, setIsExporting] = useState(false);

  // CSV Export function
  const exportToCSV = async () => {
    if (!crawlResult || !crawlResult.pages) {
      return;
    }

    setIsExporting(true);

    try {
      // Define CSV headers
      const headers = [
        'URL',
        'Title',
        'H1 Present',
        'Meta Description Present',
        'Word Count',
        'Total Images',
        'Images Missing Alt',
        'Load Time (ms)',
        'Status Code'
      ];

      // Convert data to CSV format
      const csvData = crawlResult.pages.map((page: any) => [
        page.url || '',
        page.title || 'Missing',
        page.h1_presence ? 'Yes' : 'No',
        page.meta_description ? 'Yes' : 'No',
        page.word_count || 0,
        page.images_total || 0,
        page.images_missing_alt || 0,
        page.load_time_ms || 0,
        page.status || 'Unknown'
      ]);

      // Combine headers and data
      const csvContent = [headers, ...csvData]
        .map(row => row.map(field => {
          // Escape quotes and wrap fields with commas/quotes in quotes
          const escapedField = String(field).replace(/"/g, '""');
          return escapedField.includes(',') || escapedField.includes('"') || escapedField.includes('\n') 
            ? `"${escapedField}"` 
            : escapedField;
        }).join(','))
        .join('\n');

      // Create and download the CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        
        // Generate filename with domain and timestamp
        const domain = crawlResult.startUrl.replace(/^https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '_');
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
        link.setAttribute('download', `crawl_results_${domain}_${timestamp}.csv`);
        
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting CSV:', error);
    } finally {
      setIsExporting(false);
    }
  };
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
    
    // Auto-scroll to results section immediately
    setTimeout(() => {
      const resultsSection = document.getElementById('crawl-results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
    
    try {
      // Simulate progressive loading with messages
      for (let i = 0; i < progressMessages.length; i++) {
        setCurrentProgressMessage(progressMessages[i]);
        setCrawlProgress((i / (progressMessages.length - 1)) * 90); // Up to 90%
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      }

      // Call the API with enhanced error handling
      setCrawlProgress(95);
      
      let response;
      try {
        response = await fetch('/api/crawl/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startUrl: crawlUrl,
            limit: pageLimit,
            mode: 'sync'
          }),
          // Add timeout and signal for better reliability
          signal: AbortSignal.timeout(30000) // 30 second timeout
        });
      } catch (fetchError) {
        if (fetchError instanceof Error) {
          if (fetchError.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
          } else if (fetchError.message.includes('Failed to fetch')) {
            throw new Error('Network error. Please check your connection and try again.');
          }
        }
        throw new Error('Failed to connect to the crawler service. Please try again.');
      }

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          throw new Error(`Server error (${response.status}). Please try again later.`);
        }
        throw new Error(errorData.error || `Failed to crawl website (${response.status})`);
      }

      const data = await response.json();

      // Check if the result is completed or still processing
      if (data.status === 'completed' && data.result) {
        setCrawlProgress(100);
        
        // Transform the data to match our interface - use the actual crawl result structure
        const result: CrawlResult = {
          startUrl: data.result.startUrl,
          totalPages: data.result.totalPages,
          successfulPages: data.result.successfulPages,
          failedPages: data.result.failedPages,
          averageLoadTime: data.result.averageLoadTime,
          crawlTime: data.result.crawlTime,
          pages: data.result.pages || [],
          issues: data.result.issues || {
            missing_titles: 0,
            missing_h1: 0,
            missing_meta_descriptions: 0,
            images_without_alt: 0,
          },
          robotsTxt: data.result.robotsTxt || { found: false },
          sitemapXml: data.result.sitemapXml || { found: false },
          brokenLinks: data.result.brokenLinks || []
        };
        
        setCrawlResult(result);
        setShowResults(true);
        
        // Auto-scroll to detailed results after a brief delay
        setTimeout(() => {
          const detailedResults = document.getElementById('detailed-results');
          if (detailedResults) {
            detailedResults.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }, 500);
      } else {
        throw new Error('Crawl did not complete successfully');
      }
      
    } catch (error) {
      console.error('Crawl error:', error);
      setCrawlError(error instanceof Error ? error.message : "An error occurred during crawling");
      
      // Auto-scroll to error message
      setTimeout(() => {
        const errorSection = document.getElementById('crawl-error-section');
        if (errorSection) {
          errorSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
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
      <div className="min-h-screen bg-background overflow-x-hidden">
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
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
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
                    <div id="crawl-results-section" className="text-center space-y-6">
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
                    <div id="crawl-error-section" className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
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

        {/* Results Section - Appears directly under the form */}
        <AnimatePresence>
          {showResults && crawlResult && (
            <motion.section
              id="detailed-results"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="py-12 px-4 sm:px-6 lg:px-8 bg-card border-t"
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
                  className="text-center space-y-4 mb-12"
                >
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="text-lg px-8 py-6">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Get Full Report
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="text-lg px-8 py-6"
                      onClick={exportToCSV}
                      disabled={isExporting}
                    >
                      {isExporting ? (
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      ) : (
                        <Download className="w-5 h-5 mr-2" />
                      )}
                      {isExporting ? 'Generating CSV...' : 'Export Results CSV'}
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

                {/* Detailed Results Table */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-card rounded-xl border shadow-sm overflow-hidden"
                >
                  <div className="px-6 py-4 border-b bg-muted/50">
                    <h3 className="text-lg font-semibold text-foreground">Detailed Page Analysis</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Complete breakdown of all crawled pages with SEO insights
                    </p>
                  </div>
                  
                  <div 
                    className="overflow-x-auto" 
                    tabIndex={0}
                    role="region"
                    aria-label="Crawl results table"
                  >
                    <table className="w-full">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="text-left px-6 py-4 text-sm font-medium text-foreground">Page URL</th>
                          <th className="text-left px-6 py-4 text-sm font-medium text-foreground">Title</th>
                          <th className="text-center px-6 py-4 text-sm font-medium text-foreground">H1</th>
                          <th className="text-center px-6 py-4 text-sm font-medium text-foreground">Meta Desc</th>
                          <th className="text-center px-6 py-4 text-sm font-medium text-foreground">Word Count</th>
                          <th className="text-center px-6 py-4 text-sm font-medium text-foreground">Images</th>
                          <th className="text-center px-6 py-4 text-sm font-medium text-foreground">Load Time</th>
                          <th className="text-center px-6 py-4 text-sm font-medium text-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {crawlResult.pages?.map((page: any, index: number) => (
                          <motion.tr
                            key={page.url}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="hover:bg-muted/50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="max-w-xs">
                                <a 
                                  href={page.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate block"
                                  title={page.url}
                                >
                                  {page.url.replace(/^https?:\/\//, '').substring(0, 50)}
                                  {page.url.replace(/^https?:\/\//, '').length > 50 ? '...' : ''}
                                </a>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="max-w-xs">
                                {page.title ? (
                                  <span className="text-sm text-foreground" title={page.title}>
                                    {page.title.substring(0, 40)}
                                    {page.title.length > 40 ? '...' : ''}
                                  </span>
                                ) : (
                                  <span className="text-sm text-red-500 flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Missing
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              {page.h1_presence ? (
                                <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-red-500 mx-auto" />
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {page.meta_description ? (
                                <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-red-500 mx-auto" />
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`text-sm font-medium ${
                                page.word_count > 300 ? 'text-green-600' : 
                                page.word_count > 100 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {page.word_count || 0}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="text-sm">
                                <span className="text-foreground">{page.images_total || 0}</span>
                                {page.images_missing_alt > 0 && (
                                  <span className="text-red-500 ml-1">
                                    ({page.images_missing_alt} w/o alt)
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`text-sm font-medium ${
                                page.load_time_ms < 1000 ? 'text-green-600' :
                                page.load_time_ms < 3000 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {page.load_time_ms}ms
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                page.status === 200 ? 'bg-green-500/10 text-green-400' :
                                page.status >= 400 ? 'bg-red-500/10 text-red-400' :
                                'bg-yellow-500/10 text-yellow-400'
                              }`}>
                                {page.status}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {crawlResult.pages && crawlResult.pages.length === 0 && (
                    <div className="text-center py-12">
                      <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No Pages Found</h3>
                      <p className="text-muted-foreground">
                        The crawler was unable to find any accessible pages on this website.
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Feature Sections */}
        <CrawlCapabilities />
        <IssueDetection />
        <SiteArchitecture />
        <MonitoringFeatures />
        <IntegrationOptions />

        {/* Final CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-t">
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
                <Link href="/login">
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
