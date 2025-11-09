"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, Globe, Settings, AlertTriangle, Zap, Database, Shield } from 'lucide-react'
import Link from 'next/link'

export default function SiteCrawlerConfigurationPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.aiseoturbo.com' },
            { name: 'Help', url: 'https://www.aiseoturbo.com/help' },
            { name: 'Features', url: 'https://www.aiseoturbo.com/help/seo-tools-features' },
            { name: 'Site Crawler Configuration', url: 'https://www.aiseoturbo.com/help/features/site-crawler' }
          ]}
        />

        {/* Article Header */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/help"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Help Center
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">SEO Tools & Features</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Site crawler configuration
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>6 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Last updated: March 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
            >

              {/* Introduction */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Settings className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">What you'll learn</h2>
                    <p className="text-gray-300 mb-0">
                      Configure your site crawler for optimal performance. Learn how to set crawl limits, handle JavaScript-heavy sites,
                      respect robots.txt, and get the most accurate SEO data from your website.
                    </p>
                  </div>
                </div>
              </div>

              {/* What is Site Crawling */}
              <h2 className="text-2xl font-bold text-white mb-6">Understanding site crawling</h2>

              <p className="text-gray-300 mb-6">
                Site crawling is the process of systematically browsing and analyzing all pages on your website.
                Our AI-powered crawler discovers pages, analyzes content, checks for SEO issues, and maps your site's structure.
              </p>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <h3 className="text-white text-lg font-semibold mb-4">What the crawler analyzes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Page titles and meta descriptions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Heading structure (H1-H6)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Internal linking structure</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Image alt text and optimization</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Page speed and performance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Mobile responsiveness</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Schema markup validation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Broken links and redirects</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuration Options */}
              <h3 className="text-2xl font-bold text-white mb-6">Crawler configuration options</h3>

              <div className="space-y-8">

                {/* Crawl Limits */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Set crawl limits</h3>
                      <p className="text-gray-300 mb-4">
                        Configure how many pages to crawl and how deep to go. This prevents excessive resource usage on large sites.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-2">Recommended settings:</h4>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li><strong>Small sites (&lt; 100 pages):</strong> No limit, crawl all pages</li>
                          <li><strong>Medium sites (100-1000 pages):</strong> Max 500 pages, depth 3</li>
                          <li><strong>Large sites (&gt; 1000 pages):</strong> Max 1000 pages, depth 4</li>
                          <li><strong>E-commerce sites:</strong> Focus on product/category pages first</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* JavaScript Handling */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">JavaScript rendering</h3>
                      <p className="text-gray-300 mb-4">
                        Enable JavaScript rendering for sites built with React, Vue, Angular, or other JavaScript frameworks.
                        This ensures the crawler sees the fully rendered content.
                      </p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <p className="text-sm text-green-400 mb-2"><strong>When to enable:</strong></p>
                        <ul className="space-y-1 text-gray-300 text-sm">
                          <li>• Single Page Applications (SPAs)</li>
                          <li>• Sites using React, Vue, or Angular</li>
                          <li>• Content loaded via JavaScript</li>
                          <li>• Dynamic content based on user interactions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Robots.txt Respect */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Respect robots.txt</h3>
                      <p className="text-gray-300 mb-4">
                        Our crawler always respects robots.txt directives. You can also configure custom crawl delays
                        to be extra respectful to your server resources.
                      </p>
                      <div className="flex items-center gap-4 p-3 bg-slate-900/50 rounded-lg">
                        <Shield className="w-6 h-6 text-purple-400" />
                        <div>
                          <div className="text-white font-medium">Robots.txt Compliance</div>
                          <div className="text-gray-400 text-sm">We never crawl disallowed paths</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Agent */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Custom user agent</h3>
                      <p className="text-gray-300 mb-4">
                        Set a custom user agent string for your crawls. This helps with tracking and can be useful
                        for sites that serve different content based on user agent.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-sm text-gray-300">
                        AISEOTurbo/1.0 (https://aiseoturbo.com/bot)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sitemap Integration */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Sitemap integration</h3>
                      <p className="text-gray-300 mb-4">
                        Automatically discover and crawl URLs from your XML sitemap. This ensures we don't miss
                        important pages and provides a complete site audit.
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <p className="text-sm text-blue-400 mb-2"><strong>Pro tip:</strong></p>
                        <p className="text-gray-300 text-sm">
                          Submit your sitemap to Google Search Console and Bing Webmaster Tools for better crawling coverage.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Best Practices */}
              <h3 className="text-2xl font-bold text-white mb-6">Crawler best practices</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Optimization Tips
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Run crawls during off-peak hours</li>
                    <li>• Start with a small sample before full crawl</li>
                    <li>• Use crawl delays for large sites</li>
                    <li>• Monitor server resources during crawl</li>
                    <li>• Schedule regular crawls (weekly/monthly)</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Common Issues
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Crawl timeouts on large sites</li>
                    <li>• JavaScript rendering failures</li>
                    <li>• Blocked by security firewalls</li>
                    <li>• Missing sitemap submissions</li>
                    <li>• Incorrect robots.txt directives</li>
                  </ul>
                </div>
              </div>

              {/* Troubleshooting */}
              <h3 className="text-2xl font-bold text-white mb-6">Troubleshooting crawler issues</h3>

              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <h4 className="text-red-400 font-medium mb-1">Crawl not starting</h4>
                      <p className="text-gray-300 text-sm">
                        Check if your site is accessible and not behind a login. Ensure robots.txt allows crawling.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="text-yellow-400 font-medium mb-1">Incomplete crawl results</h4>
                      <p className="text-gray-300 text-sm">
                        Increase crawl limits or check for JavaScript-heavy content that needs rendering enabled.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="text-blue-400 font-medium mb-1">Performance monitoring</h4>
                      <p className="text-gray-300 text-sm">
                        Monitor crawl progress in real-time. Average crawl speed is 50-100 pages per minute.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Ready to configure your crawler?</h3>
                <p className="text-gray-300 mb-4">
                  Start with our recommended settings and adjust based on your site's specific needs.
                  Contact support if you need help with complex configurations.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/dashboard"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Start Site Crawl
                  </Link>
                  <Link
                    href="/help/features/ai-assistant"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Learn About AI Assistant
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
