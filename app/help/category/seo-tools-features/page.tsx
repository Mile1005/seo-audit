"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BookOpen, BarChart, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const categoryArticles = [
  {
    title: "Complete SEO audit walkthrough",
    href: "/help/features/seo-audit",
    time: "12 min",
    description: "Step-by-step guide to running comprehensive SEO audits and understanding the results.",
    icon: BarChart
  },
  {
    title: "Competitor analysis guide",
    href: "/help/features/competitor-analysis",
    time: "8 min",
    description: "Learn how to analyze competitors' SEO strategies and identify opportunities.",
    icon: BookOpen
  },
  {
    title: "Site crawler configuration",
    href: "/help/features/site-crawler",
    time: "6 min",
    description: "Configure and optimize your site crawler settings for better SEO analysis.",
    icon: BookOpen
  },
  {
    title: "AI assistant best practices",
    href: "/help/features/ai-assistant",
    time: "9 min",
    description: "Master our AI assistant for SEO recommendations and optimization tips.",
    icon: BookOpen
  }
]

export default function SEOToolsFeaturesCategoryPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumb */}
        <section className="bg-slate-900/50 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">SEO Tools & Features</span>
            </nav>
          </div>
        </section>

        {/* Category Header */}
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
                  <BarChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">Category</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    SEO Tools & Features
                  </h1>
                </div>
              </div>

              <h2 className="text-xl text-gray-400 mb-8">
                Master our AI-powered SEO toolkit with detailed guides and tutorials for every feature.
              </h2>

              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{categoryArticles.length} articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: March 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* Main Intro */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Master AI-Powered SEO Tools & Features</h2>
                <p className="text-gray-300 text-lg">
                  AI SEO Turbo provides a comprehensive suite of AI-powered tools designed to give you a competitive edge
                  in search engine optimization. Whether you're a beginner or an experienced SEO professional, our platform
                  offers the features and insights you need to drive organic growth.
                </p>
              </div>

              {/* SEO Audit Suite */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Comprehensive SEO Audit Suite</h3>
                <p className="text-gray-300 mb-6">
                  Our flagship SEO audit tool goes beyond basic checklists, providing AI-driven analysis that identifies
                  critical issues and opportunities. The 47-point technical audit covers everything from crawlability and
                  indexation to performance optimization and content gaps.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-5">
                    <h4 className="text-white font-semibold mb-2">🔍 Technical SEO Analysis</h4>
                    <p className="text-gray-300 text-sm">Core Web Vitals, mobile optimization, schema markup validation</p>
                  </div>
                  <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-5">
                    <h4 className="text-white font-semibold mb-2">📝 Content Optimization</h4>
                    <p className="text-gray-300 text-sm">Keyword gap analysis, content depth assessment, semantic SEO</p>
                  </div>
                  <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-5">
                    <h4 className="text-white font-semibold mb-2">🔗 Link Profile Audit</h4>
                    <p className="text-gray-300 text-sm">Backlink quality analysis, toxic link detection, internal linking opportunities</p>
                  </div>
                  <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-5">
                    <h4 className="text-white font-semibold mb-2">⚔️ Competitor Intelligence</h4>
                    <p className="text-gray-300 text-sm">Comparative analysis, opportunity identification, market positioning</p>
                  </div>
                </div>
              </div>

              {/* Site Crawling */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Advanced Site Crawling Technology</h3>
                <p className="text-gray-300 mb-6">
                  Our intelligent site crawler mimics how search engines discover and analyze your website. Unlike traditional
                  crawlers, our AI-powered system understands context, identifies patterns, and provides actionable insights
                  about your site's structure and performance.
                </p>

                <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🕷️ Key Crawling Features
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-cyan-400">✓</span>
                      <p className="text-gray-300">Broken link detection and reporting</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan-400">✓</span>
                      <p className="text-gray-300">Internal linking structure analysis</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan-400">✓</span>
                      <p className="text-gray-300">Page depth and navigation optimization</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan-400">✓</span>
                      <p className="text-gray-300">Duplicate content identification</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan-400">✓</span>
                      <p className="text-gray-300">XML sitemap validation and optimization</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Keyword Research */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">AI-Powered Keyword Research & Tracking</h3>
                <p className="text-gray-300 mb-6">
                  Stay ahead of the competition with our advanced keyword research tools. Our AI analyzes search intent,
                  competition levels, and historical performance data to identify high-value keywords that drive conversions.
                </p>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">📊</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Search Volume & Competition</h4>
                      <p className="text-gray-300 text-sm">Accurate data on keyword difficulty and search trends</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Long-tail Keyword Discovery</h4>
                      <p className="text-gray-300 text-sm">Find high-converting, low-competition keywords</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">📈</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Seasonal Trend Identification</h4>
                      <p className="text-gray-300 text-sm">Capitalize on seasonal search opportunities</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">✨</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">SERP Feature Opportunities</h4>
                      <p className="text-gray-300 text-sm">Identify snippets, PAA, and rich results opportunities</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">⚔️</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Competitor Keyword Gap Analysis</h4>
                      <p className="text-gray-300 text-sm">Find keywords competitors rank for that you don't</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Monitoring */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Real-Time Performance Monitoring</h3>
                <p className="text-gray-300 mb-6">
                  Track your SEO progress with comprehensive dashboards and automated reporting. Our platform monitors
                  ranking changes, traffic fluctuations, and algorithmic updates to keep you informed and proactive.
                </p>

                <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    📊 Monitoring Features
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">Daily Tracking</span>
                      <p className="text-gray-300">Real-time ranking position tracking across all keywords</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">Traffic Analysis</span>
                      <p className="text-gray-300">Organic traffic trend analysis and anomaly detection</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">Core Web Vitals</span>
                      <p className="text-gray-300">Continuous monitoring of performance metrics</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">Algorithm Updates</span>
                      <p className="text-gray-300">Impact assessment during Google algorithm updates</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">Smart Alerts</span>
                      <p className="text-gray-300">Custom alert system for significant changes</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Competitor Analysis */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Competitor Analysis & Intelligence</h3>
                <p className="text-gray-300 mb-6">
                  Understand your competitive landscape with detailed competitor analysis. Our AI identifies their strengths,
                  weaknesses, and strategies, helping you develop data-driven approaches to gain market share.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-5">
                    <h4 className="text-emerald-300 font-semibold mb-2">🔗 Backlink Comparison</h4>
                    <p className="text-gray-300 text-sm">Analyze competitor backlink profiles and find link opportunities</p>
                  </div>
                  <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-5">
                    <h4 className="text-emerald-300 font-semibold mb-2">📄 Content Strategy</h4>
                    <p className="text-gray-300 text-sm">Understand what content topics competitors target</p>
                  </div>
                  <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-5">
                    <h4 className="text-emerald-300 font-semibold mb-2">🎯 Keyword Overlap</h4>
                    <p className="text-gray-300 text-sm">See which keywords you're competing for with rivals</p>
                  </div>
                  <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-5">
                    <h4 className="text-emerald-300 font-semibold mb-2">⚙️ Technical Benchmarking</h4>
                    <p className="text-gray-300 text-sm">Compare technical SEO performance against competitors</p>
                  </div>
                  <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-5">
                    <h4 className="text-emerald-300 font-semibold mb-2">📍 Market Positioning</h4>
                    <p className="text-gray-300 text-sm">Understand your position in the competitive landscape</p>
                  </div>
                </div>
              </div>

              {/* Content Optimization */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Intelligent Content Optimization</h3>
                <p className="text-gray-300 mb-6">
                  Optimize your content for better search performance with AI-powered recommendations. Our platform analyzes
                  content quality, relevance, and engagement factors to improve your on-page SEO.
                </p>

                <div className="bg-gradient-to-r from-orange-600/10 to-red-600/10 border border-orange-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    ✍️ Content Optimization Tools
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-orange-400">→</span>
                      <p className="text-gray-300">Readability and engagement analysis for better UX</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-400">→</span>
                      <p className="text-gray-300">Topic clustering and content gap identification</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-400">→</span>
                      <p className="text-gray-300">Title and meta description optimization suggestions</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-400">→</span>
                      <p className="text-gray-300">Internal linking suggestions based on content relevance</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-400">→</span>
                      <p className="text-gray-300">Content freshness monitoring and update recommendations</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Enterprise Reporting */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Enterprise-Grade Reporting & Collaboration</h3>
                <p className="text-gray-300 mb-6">
                  Scale your SEO efforts with advanced reporting and team collaboration features. Generate professional
                  reports, share insights with stakeholders, and coordinate team efforts across large organizations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">📋 White-Label Reports</h4>
                    <p className="text-gray-300 text-sm">Custom branded reports for client delivery</p>
                  </div>
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">📊 Custom Dashboards</h4>
                    <p className="text-gray-300 text-sm">Create personalized views of your SEO metrics</p>
                  </div>
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">👥 Team Collaboration</h4>
                    <p className="text-gray-300 text-sm">Coordinate efforts and share insights with teams</p>
                  </div>
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">🔗 API Access</h4>
                    <p className="text-gray-300 text-sm">Integrate with your existing tools and workflows</p>
                  </div>
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">⏰ Automated Reports</h4>
                    <p className="text-gray-300 text-sm">Schedule and automate report generation</p>
                  </div>
                </div>
              </div>

              {/* Getting Started */}
              <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700/50">
                <h3 className="text-2xl font-bold text-white mb-4">Getting Started with AI SEO Turbo</h3>
                <p className="text-gray-300 mb-4">
                  Ready to transform your SEO strategy with AI-powered tools? Our platform is designed to be accessible
                  to users at all skill levels while providing the depth and sophistication that enterprise teams require.
                </p>
                <p className="text-gray-300">
                  Start with our comprehensive guides below to master each feature and unlock the full potential of
                  your SEO efforts. Whether you're optimizing a single website or managing a portfolio of client sites,
                  AI SEO Turbo provides the tools and insights you need to succeed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {categoryArticles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300"
                >
                  <Link href={article.href} className="block">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-2 flex-shrink-0">
                          <article.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-400 mb-4">
                            {article.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{article.time} read</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Related Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Related Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/help/category/getting-started"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-blue-400 transition-colors">Getting Started</div>
                    <div className="text-gray-400 text-sm">Learn the basics and set up your account</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </Link>
                <Link
                  href="/help/category/troubleshooting"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-blue-400 transition-colors">Troubleshooting</div>
                    <div className="text-gray-400 text-sm">Resolve common issues and errors</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </Link>
              </div>
            </motion.div>

            {/* Need More Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 bg-blue-500/10 border border-blue-500/20 rounded-xl p-8 text-center"
            >
              <h3 className="text-white text-xl font-bold mb-4">Still need help?</h3>
              <p className="text-gray-400 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Contact Support
                </Link>
                <Link
                  href="/help"
                  className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Browse All Help
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
