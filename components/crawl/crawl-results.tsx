"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ExternalLink, 
  FileText, 
  Image, 
  Link2,
  Clock,
  Globe,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Download,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  AlertCircle,
  BarChart3,
  Crown,
  FileDown
} from 'lucide-react';

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

interface CrawlResultsProps {
  result: CrawlResultData;
  onReset: () => void;
}

export function CrawlResults({ result, onReset }: CrawlResultsProps) {
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'issues'>('overview');

  // Calculate health score (0-100)
  const calculateHealthScore = () => {
    if (!result.pages || result.pages.length === 0) return 0;
    
    let score = 100;
    const totalPages = result.totalPages || 1;
    
    // Deduct for missing titles (15 points max)
    score -= Math.min(15, (result.issues.missing_titles / totalPages) * 30);
    
    // Deduct for missing meta descriptions (15 points max)
    score -= Math.min(15, (result.issues.missing_meta_descriptions / totalPages) * 30);
    
    // Deduct for missing H1 (10 points max)
    score -= Math.min(10, (result.issues.missing_h1 / totalPages) * 20);
    
    // Deduct for images without alt (10 points max)
    score -= Math.min(10, (result.issues.images_without_alt / (result.pages.reduce((sum, p) => sum + p.images_total, 0) || 1)) * 20);
    
    // Deduct for failed pages (20 points max)
    score -= Math.min(20, (result.failedPages / totalPages) * 40);
    
    // Deduct for missing robots.txt (5 points)
    if (!result.robotsTxt?.found) score -= 5;
    
    // Deduct for missing sitemap (5 points)
    if (!result.sitemapXml?.found) score -= 5;
    
    // Deduct for slow pages (10 points max)
    if (result.averageLoadTime > 3000) score -= 10;
    else if (result.averageLoadTime > 2000) score -= 5;
    
    return Math.max(0, Math.round(score));
  };

  const healthScore = calculateHealthScore();
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500/10 border-green-500/20';
    if (score >= 60) return 'bg-yellow-500/10 border-yellow-500/20';
    if (score >= 40) return 'bg-orange-500/10 border-orange-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Work';
    return 'Poor';
  };

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status >= 300 && status < 400) return <ArrowRight className="w-4 h-4 text-yellow-500" />;
    if (status >= 400) return <XCircle className="w-4 h-4 text-red-500" />;
    return <AlertCircle className="w-4 h-4 text-gray-500" />;
  };

  const getLoadTimeColor = (ms: number) => {
    if (ms < 1000) return 'text-green-500';
    if (ms < 2000) return 'text-yellow-500';
    if (ms < 3000) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header with Score */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-sm font-medium mb-4">
          <CheckCircle className="w-4 h-4 mr-2" />
          Crawl Completed Successfully
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Results for {result.startUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </h2>
        <p className="text-muted-foreground">
          Analyzed {result.totalPages} pages in {((result.crawlTime || 0) / 1000).toFixed(1)} seconds
        </p>
      </motion.div>

      {/* Health Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={`relative overflow-hidden rounded-2xl border ${getScoreBgColor(healthScore)} p-8`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className={`w-full h-full rounded-full ${healthScore >= 60 ? 'bg-green-500' : 'bg-orange-500'} blur-3xl`} />
        </div>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-medium text-muted-foreground mb-1">SEO Health Score</h3>
            <div className="flex items-baseline gap-3">
              <span className={`text-6xl font-bold ${getScoreColor(healthScore)}`}>{healthScore}</span>
              <span className="text-2xl text-muted-foreground">/100</span>
            </div>
            <p className={`text-lg font-medium ${getScoreColor(healthScore)} mt-1`}>{getScoreLabel(healthScore)}</p>
          </div>
          
          {/* Score Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <button
              onClick={() => setActiveTab('issues')}
              className="p-3 rounded-lg bg-background/50 hover:bg-red-500/10 transition-colors cursor-pointer group"
            >
              <div className="text-2xl font-bold text-red-500 group-hover:scale-110 transition-transform">
                {result.issues.missing_titles + result.issues.missing_h1 + result.issues.missing_meta_descriptions + result.issues.images_without_alt}
              </div>
              <div className="text-xs text-muted-foreground group-hover:text-red-400">Issues Found</div>
            </button>
            <div className="p-3 rounded-lg bg-background/50">
              <div className="text-2xl font-bold text-foreground">{result.totalPages}</div>
              <div className="text-xs text-muted-foreground">Pages Crawled</div>
            </div>
            <div className="p-3 rounded-lg bg-background/50">
              <div className="text-2xl font-bold text-green-500">{result.successfulPages}</div>
              <div className="text-xs text-muted-foreground">Successful</div>
            </div>
            <div className="p-3 rounded-lg bg-background/50">
              <div className="text-2xl font-bold text-red-500">{result.failedPages}</div>
              <div className="text-xs text-muted-foreground">Failed</div>
            </div>
            <div className="p-3 rounded-lg bg-background/50">
              <div className={`text-2xl font-bold ${getLoadTimeColor(result.averageLoadTime)}`}>
                {result.averageLoadTime?.toFixed(0) || 0}ms
              </div>
              <div className="text-xs text-muted-foreground">Avg Load Time</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border">
        {(['overview', 'pages', 'issues'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium text-sm transition-colors relative ${
              activeTab === tab 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Technical Checks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-4"
            >
              <div className={`p-6 rounded-xl border ${result.robotsTxt?.found ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${result.robotsTxt?.found ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                      <FileText className={`w-5 h-5 ${result.robotsTxt?.found ? 'text-green-500' : 'text-red-500'}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">robots.txt</h4>
                      <p className="text-sm text-muted-foreground">Search engine directives</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.robotsTxt?.found 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {result.robotsTxt?.found ? 'Found' : 'Missing'}
                  </span>
                </div>
              </div>
              
              <div className={`p-6 rounded-xl border ${result.sitemapXml?.found ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${result.sitemapXml?.found ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                      <Globe className={`w-5 h-5 ${result.sitemapXml?.found ? 'text-green-500' : 'text-red-500'}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">sitemap.xml</h4>
                      <p className="text-sm text-muted-foreground">Page discovery for crawlers</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.sitemapXml?.found 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {result.sitemapXml?.found ? 'Found' : 'Missing'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Issues Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl border p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Issues Found
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-muted-foreground">Missing Titles</span>
                  </div>
                  <div className="text-2xl font-bold text-red-500">{result.issues.missing_titles}</div>
                </div>
                
                <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-muted-foreground">Missing H1</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-500">{result.issues.missing_h1}</div>
                </div>
                
                <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Search className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">Missing Meta</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-500">{result.issues.missing_meta_descriptions}</div>
                </div>
                
                <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Image className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-muted-foreground">No Alt Text</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-500">{result.issues.images_without_alt}</div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'pages' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {result.pages?.map((page, index) => (
              <motion.div
                key={page.url}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl border overflow-hidden"
              >
                <button
                  onClick={() => setExpandedPage(expandedPage === page.url ? null : page.url)}
                  className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {getStatusIcon(page.status)}
                    <div className="text-left min-w-0">
                      <div className="font-medium text-foreground truncate max-w-md">
                        {page.title || 'No Title'}
                      </div>
                      <div className="text-sm text-muted-foreground truncate max-w-md">
                        {page.url.replace(result.startUrl, '/')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className={`text-sm font-medium ${getLoadTimeColor(page.load_time_ms)}`}>
                      {page.load_time_ms}ms
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      page.status >= 200 && page.status < 300 
                        ? 'bg-green-500/10 text-green-500'
                        : page.status >= 400
                        ? 'bg-red-500/10 text-red-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {page.status || 'Error'}
                    </span>
                    {expandedPage === page.url ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                
                {expandedPage === page.url && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t p-4 bg-muted/30"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">H1 Tags:</span>
                        <span className={`ml-2 font-medium ${page.h1_count === 1 ? 'text-green-500' : page.h1_count === 0 ? 'text-red-500' : 'text-yellow-500'}`}>
                          {page.h1_count}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">H2 Tags:</span>
                        <span className="ml-2 font-medium">{page.h2_count}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Word Count:</span>
                        <span className="ml-2 font-medium">{page.word_count}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Images:</span>
                        <span className="ml-2 font-medium">{page.images_total}</span>
                        {page.images_missing_alt > 0 && (
                          <span className="ml-1 text-red-500">({page.images_missing_alt} no alt)</span>
                        )}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Internal Links:</span>
                        <span className="ml-2 font-medium">{page.internal_links}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">External Links:</span>
                        <span className="ml-2 font-medium">{page.external_links}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Meta Description:</span>
                        <span className={`ml-2 ${page.meta_description ? 'text-foreground' : 'text-red-500'}`}>
                          {page.meta_description ? (page.meta_description.length > 50 ? page.meta_description.substring(0, 50) + '...' : page.meta_description) : 'Missing'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <a
                        href={page.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        Open page <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'issues' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Pages with Missing Titles */}
            {result.pages?.filter(p => !p.title).length > 0 && (
              <div className="bg-card rounded-xl border p-6">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  Pages Missing Title ({result.pages.filter(p => !p.title).length})
                </h4>
                <ul className="space-y-2">
                  {result.pages?.filter(p => !p.title).map(page => (
                    <li key={page.url} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-red-500" />
                      {page.url.replace(result.startUrl, '/')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Pages with Missing Meta */}
            {result.pages?.filter(p => !p.meta_description).length > 0 && (
              <div className="bg-card rounded-xl border p-6">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  Pages Missing Meta Description ({result.pages.filter(p => !p.meta_description).length})
                </h4>
                <ul className="space-y-2">
                  {result.pages?.filter(p => !p.meta_description).slice(0, 10).map(page => (
                    <li key={page.url} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-yellow-500" />
                      {page.url.replace(result.startUrl, '/')}
                    </li>
                  ))}
                  {result.pages.filter(p => !p.meta_description).length > 10 && (
                    <li className="text-sm text-muted-foreground">
                      ... and {result.pages.filter(p => !p.meta_description).length - 10} more
                    </li>
                  )}
                </ul>
              </div>
            )}
            
            {/* Pages with Missing H1 */}
            {result.pages?.filter(p => !p.h1_presence).length > 0 && (
              <div className="bg-card rounded-xl border p-6">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  Pages Missing H1 Tag ({result.pages.filter(p => !p.h1_presence).length})
                </h4>
                <ul className="space-y-2">
                  {result.pages?.filter(p => !p.h1_presence).slice(0, 10).map(page => (
                    <li key={page.url} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-orange-500" />
                      {page.url.replace(result.startUrl, '/')}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* No Issues */}
            {result.issues.missing_titles === 0 && 
             result.issues.missing_meta_descriptions === 0 && 
             result.issues.missing_h1 === 0 && 
             result.issues.images_without_alt === 0 && (
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-foreground mb-2">No Critical Issues Found!</h4>
                <p className="text-muted-foreground">Your website passed all basic SEO checks.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
      >
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Crawl Another Site
        </button>
        <button
          onClick={() => generatePdfReport(result)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
        >
          <FileDown className="w-4 h-4" />
          Export PDF Report
        </button>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all font-medium shadow-lg hover:shadow-xl"
        >
          <Crown className="w-4 h-4" />
          Get Full Report
        </Link>
      </motion.div>
    </div>
  );
}

// PDF Report Generation Function
function generatePdfReport(result: CrawlResultData) {
  // Calculate total issues
  const totalIssues = result.issues.missing_titles + 
                      result.issues.missing_h1 + 
                      result.issues.missing_meta_descriptions + 
                      result.issues.images_without_alt;

  // Calculate health score
  let healthScore = 100;
  const totalPages = result.totalPages || 1;
  healthScore -= Math.min(15, (result.issues.missing_titles / totalPages) * 30);
  healthScore -= Math.min(15, (result.issues.missing_meta_descriptions / totalPages) * 30);
  healthScore -= Math.min(10, (result.issues.missing_h1 / totalPages) * 20);
  healthScore -= Math.min(20, (result.failedPages / totalPages) * 40);
  if (!result.robotsTxt?.found) healthScore -= 5;
  if (!result.sitemapXml?.found) healthScore -= 5;
  if (result.averageLoadTime > 3000) healthScore -= 10;
  else if (result.averageLoadTime > 2000) healthScore -= 5;
  healthScore = Math.max(0, Math.round(healthScore));

  // Create PDF content using HTML
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>SEO Crawl Report - ${result.startUrl}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #1a1a2e; background: #fff; }
        .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #e0e0e0; }
        .header h1 { font-size: 28px; color: #1a1a2e; margin-bottom: 8px; }
        .header p { color: #666; font-size: 14px; }
        .score-section { display: flex; justify-content: center; align-items: center; gap: 40px; margin-bottom: 40px; padding: 30px; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); border-radius: 16px; }
        .score-circle { width: 120px; height: 120px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: ${healthScore >= 80 ? '#10b981' : healthScore >= 60 ? '#f59e0b' : '#ef4444'}; color: white; }
        .score-circle .number { font-size: 42px; font-weight: bold; line-height: 1; }
        .score-circle .label { font-size: 12px; opacity: 0.9; }
        .stats-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-bottom: 40px; }
        .stat-box { text-align: center; padding: 20px; background: #f8f9fa; border-radius: 12px; border: 1px solid #e0e0e0; }
        .stat-box .number { font-size: 28px; font-weight: bold; margin-bottom: 4px; }
        .stat-box .label { font-size: 12px; color: #666; }
        .stat-box.issues .number { color: #ef4444; }
        .stat-box.success .number { color: #10b981; }
        .stat-box.failed .number { color: #ef4444; }
        .section { margin-bottom: 30px; }
        .section h2 { font-size: 18px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e0e0e0; }
        .tech-checks { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 30px; }
        .tech-check { display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f8f9fa; border-radius: 8px; }
        .tech-check .status { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .tech-check .status.found { background: #d1fae5; color: #065f46; }
        .tech-check .status.missing { background: #fee2e2; color: #991b1b; }
        .issues-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 30px; }
        .issue-box { text-align: center; padding: 20px; border-radius: 12px; }
        .issue-box.titles { background: #fee2e2; }
        .issue-box.h1 { background: #ffedd5; }
        .issue-box.meta { background: #fef3c7; }
        .issue-box.images { background: #ede9fe; }
        .issue-box .number { font-size: 32px; font-weight: bold; margin-bottom: 4px; }
        .issue-box.titles .number { color: #dc2626; }
        .issue-box.h1 .number { color: #ea580c; }
        .issue-box.meta .number { color: #d97706; }
        .issue-box.images .number { color: #7c3aed; }
        .pages-table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 12px; }
        .pages-table th, .pages-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e0e0e0; }
        .pages-table th { background: #f8f9fa; font-weight: 600; }
        .pages-table tr:hover { background: #f8f9fa; }
        .status-badge { padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; }
        .status-badge.success { background: #d1fae5; color: #065f46; }
        .status-badge.error { background: #fee2e2; color: #991b1b; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center; color: #666; font-size: 12px; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🔍 SEO Crawl Report</h1>
        <p><strong>${result.startUrl}</strong> • Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div class="score-section">
        <div class="score-circle">
          <span class="number">${healthScore}</span>
          <span class="label">/ 100</span>
        </div>
        <div style="text-align: left;">
          <h3 style="font-size: 24px; margin-bottom: 8px;">SEO Health Score</h3>
          <p style="color: #666;">
            ${healthScore >= 80 ? '✅ Excellent - Your site is well optimized' : 
              healthScore >= 60 ? '⚠️ Good - Some improvements recommended' : 
              healthScore >= 40 ? '🔶 Needs Work - Several issues found' : 
              '❌ Poor - Critical issues need attention'}
          </p>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-box issues">
          <div class="number">${totalIssues}</div>
          <div class="label">Issues Found</div>
        </div>
        <div class="stat-box">
          <div class="number">${result.totalPages}</div>
          <div class="label">Pages Crawled</div>
        </div>
        <div class="stat-box success">
          <div class="number">${result.successfulPages}</div>
          <div class="label">Successful</div>
        </div>
        <div class="stat-box failed">
          <div class="number">${result.failedPages}</div>
          <div class="label">Failed</div>
        </div>
        <div class="stat-box">
          <div class="number">${result.averageLoadTime?.toFixed(0) || 0}ms</div>
          <div class="label">Avg Load Time</div>
        </div>
      </div>

      <div class="section">
        <h2>📋 Technical SEO Checks</h2>
        <div class="tech-checks">
          <div class="tech-check">
            <span>robots.txt</span>
            <span class="status ${result.robotsTxt?.found ? 'found' : 'missing'}">${result.robotsTxt?.found ? 'Found' : 'Missing'}</span>
          </div>
          <div class="tech-check">
            <span>sitemap.xml</span>
            <span class="status ${result.sitemapXml?.found ? 'found' : 'missing'}">${result.sitemapXml?.found ? 'Found' : 'Missing'}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>⚠️ Issues Summary</h2>
        <div class="issues-grid">
          <div class="issue-box titles">
            <div class="number">${result.issues.missing_titles}</div>
            <div class="label">Missing Titles</div>
          </div>
          <div class="issue-box h1">
            <div class="number">${result.issues.missing_h1}</div>
            <div class="label">Missing H1</div>
          </div>
          <div class="issue-box meta">
            <div class="number">${result.issues.missing_meta_descriptions}</div>
            <div class="label">Missing Meta Desc</div>
          </div>
          <div class="issue-box images">
            <div class="number">${result.issues.images_without_alt}</div>
            <div class="label">Images No Alt</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>📄 Pages Analyzed (${result.pages?.length || 0})</h2>
        <table class="pages-table">
          <thead>
            <tr>
              <th>URL</th>
              <th>Title</th>
              <th>Status</th>
              <th>Load Time</th>
              <th>H1</th>
              <th>Meta Desc</th>
            </tr>
          </thead>
          <tbody>
            ${result.pages?.slice(0, 50).map(page => `
              <tr>
                <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${page.url.replace(result.startUrl, '/')}</td>
                <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${page.title || '<span style="color: #dc2626;">Missing</span>'}</td>
                <td><span class="status-badge ${page.status >= 200 && page.status < 400 ? 'success' : 'error'}">${page.status}</span></td>
                <td>${page.load_time_ms}ms</td>
                <td>${page.h1_presence ? '✅' : '❌'}</td>
                <td>${page.meta_description ? '✅' : '❌'}</td>
              </tr>
            `).join('') || ''}
          </tbody>
        </table>
      </div>

      <div class="footer">
        <p>Generated by <strong>AI SEO Turbo</strong> • https://aiseoturbo.com</p>
        <p style="margin-top: 8px;">For a comprehensive analysis with advanced features, create a free account.</p>
      </div>
    </body>
    </html>
  `;

  // Open print dialog with the HTML content
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  }
}
