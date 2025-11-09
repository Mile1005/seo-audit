"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Globe, Search, BarChart3, Zap, Target, Eye, CheckCircle, Clock, Settings } from 'lucide-react'
import Link from 'next/link'

export default function SiteCrawlerPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/help"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help Center
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Site Crawler Guide</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Master our intelligent site crawler for comprehensive website analysis. Learn how to crawl your site,
              identify technical issues, and optimize your SEO performance.
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <Globe className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Understanding Site Crawling</h2>
                <p className="text-gray-600">
                  Our site crawler acts like a search engine spider, systematically exploring your website to identify
                  pages, analyze content, and detect technical SEO issues. It provides comprehensive insights into your site's health and performance.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Search className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Complete Coverage</h3>
                <p className="text-sm text-gray-600">Crawls all pages and content types</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Technical Analysis</h3>
                <p className="text-sm text-gray-600">Identifies SEO and performance issues</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Content Insights</h3>
                <p className="text-sm text-gray-600">Analyzes content quality and optimization</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Fast Results</h3>
                <p className="text-sm text-gray-600">Quick crawling with detailed reports</p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">How Site Crawling Works</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Start the Crawl</h3>
                  <p className="text-gray-600 mb-3">
                    Enter your website URL and configure crawl settings. Choose between quick scans for small sites
                    or comprehensive crawls for larger websites.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Crawl Options:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Quick scan (up to 100 pages)</li>
                      <li>• Full site crawl (unlimited pages)</li>
                      <li>• Custom depth limits</li>
                      <li>• Include/exclude patterns</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Intelligent Discovery</h3>
                  <p className="text-gray-600 mb-3">
                    Our crawler systematically explores your site, following internal links and discovering all pages,
                    images, and resources. It respects robots.txt and crawl delays.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-blue-600 font-medium mb-1">What it crawls:</div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• HTML pages</div>
                        <div>• XML sitemaps</div>
                        <div>• Images and media</div>
                        <div>• CSS and JavaScript files</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-purple-600 font-medium mb-1">What it analyzes:</div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• Page titles and meta descriptions</div>
                        <div>• Heading structure</div>
                        <div>• Internal/external links</div>
                        <div>• Page load performance</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Analysis</h3>
                  <p className="text-gray-600 mb-3">
                    Each page is analyzed for SEO factors, technical issues, and optimization opportunities.
                    The crawler identifies problems and provides actionable recommendations.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-blue-800 font-medium mb-2">Analysis Categories:</h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li>• On-page SEO optimization</li>
                      <li>• Technical SEO issues</li>
                      <li>• Content quality assessment</li>
                      <li>• Internal linking opportunities</li>
                      <li>• Mobile-friendliness checks</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate Reports</h3>
                  <p className="text-gray-600 mb-3">
                    Receive detailed reports with prioritized issues, actionable recommendations, and progress tracking.
                    Export results for team collaboration and ongoing monitoring.
                  </p>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                    <div>
                      <div className="text-gray-900 font-medium">Comprehensive reporting</div>
                      <div className="text-gray-600 text-sm">Prioritized issues with clear next steps</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Benefits of Site Crawling</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Complete Site Visibility</h3>
                    <p className="text-sm text-gray-600">Discover all pages on your site, including those not in your sitemap</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Technical Issue Detection</h3>
                    <p className="text-sm text-gray-600">Find broken links, duplicate content, and crawlability problems</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">SEO Health Monitoring</h3>
                    <p className="text-sm text-gray-600">Track your site's SEO health over time with regular crawls</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Content Optimization</h3>
                    <p className="text-sm text-gray-600">Identify content gaps and optimization opportunities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Performance Insights</h3>
                    <p className="text-sm text-gray-600">Analyze page speed and user experience factors</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Actionable Recommendations</h3>
                    <p className="text-sm text-gray-600">Get specific, prioritized fixes for identified issues</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Common Issues Found */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Common Issues Our Crawler Detects</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h3 className="font-semibold text-red-800 mb-2">Critical Issues</h3>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• Broken internal/external links</li>
                    <li>• Pages returning 4xx/5xx errors</li>
                    <li>• Missing or duplicate title tags</li>
                    <li>• Pages blocked by robots.txt</li>
                  </ul>
                </div>
                <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <h3 className="font-semibold text-yellow-800 mb-2">Warning Issues</h3>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    <li>• Slow loading pages</li>
                    <li>• Missing meta descriptions</li>
                    <li>• Non-mobile-friendly pages</li>
                    <li>• Large images without optimization</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <h3 className="font-semibold text-blue-800 mb-2">Optimization Opportunities</h3>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• Thin or duplicate content</li>
                    <li>• Missing heading structure</li>
                    <li>• Internal linking opportunities</li>
                    <li>• Content gaps to fill</li>
                  </ul>
                </div>
                <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                  <h3 className="font-semibold text-green-800 mb-2">Performance Issues</h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Uncompressed resources</li>
                    <li>• Render-blocking JavaScript</li>
                    <li>• Missing caching headers</li>
                    <li>• Large page sizes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Best Practices for Site Crawling</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Settings className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Configure Your Crawl Settings</h3>
                  <p className="text-gray-600 mb-2">Set appropriate crawl limits and respect your server's capacity.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use crawl delays to avoid overwhelming your server</li>
                    <li>• Set user agents to identify your crawler</li>
                    <li>• Exclude admin areas and development pages</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Schedule Regular Crawls</h3>
                  <p className="text-gray-600 mb-2">Crawl your site regularly to monitor changes and catch issues early.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Weekly crawls for active sites</li>
                    <li>• Monthly crawls for stable sites</li>
                    <li>• After major content or technical changes</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Target className="w-6 h-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Prioritize Issues</h3>
                  <p className="text-gray-600 mb-2">Focus on high-impact issues that affect crawlability and user experience.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Fix critical errors first (404s, broken links)</li>
                    <li>• Address performance issues affecting Core Web Vitals</li>
                    <li>• Optimize content and metadata for better rankings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Ready to Crawl Your Site?</h2>
            <p className="text-gray-600 mb-6">
              Start with a quick scan to get familiar with the crawler, then run comprehensive analyses to optimize your site's SEO performance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Start Site Crawl
              </Link>
              <Link
                href="/help/getting-started/quick-start"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                View Quick Start Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}