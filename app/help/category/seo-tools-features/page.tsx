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
            <div className="prose prose-lg prose-invert mx-auto">
              <h2>Master AI-Powered SEO Tools & Features</h2>
              <p>
                AI SEO Turbo provides a comprehensive suite of AI-powered tools designed to give you a competitive edge
                in search engine optimization. Whether you're a beginner or an experienced SEO professional, our platform
                offers the features and insights you need to drive organic growth.
              </p>

              <h3>Comprehensive SEO Audit Suite</h3>
              <p>
                Our flagship SEO audit tool goes beyond basic checklists, providing AI-driven analysis that identifies
                critical issues and opportunities. The 47-point technical audit covers everything from crawlability and
                indexation to performance optimization and content gaps.
              </p>
              <ul>
                <li><strong>Technical SEO Analysis:</strong> Core Web Vitals, mobile optimization, schema markup validation</li>
                <li><strong>Content Optimization:</strong> Keyword gap analysis, content depth assessment, semantic SEO</li>
                <li><strong>Link Profile Audit:</strong> Backlink quality analysis, toxic link detection, internal linking opportunities</li>
                <li><strong>Competitor Intelligence:</strong> Comparative analysis, opportunity identification, market positioning</li>
              </ul>

              <h3>Advanced Site Crawling Technology</h3>
              <p>
                Our intelligent site crawler mimics how search engines discover and analyze your website. Unlike traditional
                crawlers, our AI-powered system understands context, identifies patterns, and provides actionable insights
                about your site's structure and performance.
              </p>

              <h4>Key Crawling Features:</h4>
              <ul>
                <li>Broken link detection and reporting</li>
                <li>Internal linking structure analysis</li>
                <li>Page depth and navigation optimization</li>
                <li>Duplicate content identification</li>
                <li>XML sitemap validation and optimization</li>
              </ul>

              <h3>AI-Powered Keyword Research & Tracking</h3>
              <p>
                Stay ahead of the competition with our advanced keyword research tools. Our AI analyzes search intent,
                competition levels, and historical performance data to identify high-value keywords that drive conversions.
              </p>

              <h4>Keyword Research Capabilities:</h4>
              <ul>
                <li>Search volume and competition analysis</li>
                <li>Long-tail keyword discovery</li>
                <li>Seasonal trend identification</li>
                <li>SERP feature opportunities</li>
                <li>Competitor keyword gap analysis</li>
              </ul>

              <h3>Real-Time Performance Monitoring</h3>
              <p>
                Track your SEO progress with comprehensive dashboards and automated reporting. Our platform monitors
                ranking changes, traffic fluctuations, and algorithmic updates to keep you informed and proactive.
              </p>

              <h4>Monitoring Features:</h4>
              <ul>
                <li>Daily ranking position tracking</li>
                <li>Organic traffic trend analysis</li>
                <li>Core Web Vitals monitoring</li>
                <li>Algorithm update impact assessment</li>
                <li>Custom alert system for significant changes</li>
              </ul>

              <h3>Competitor Analysis & Intelligence</h3>
              <p>
                Understand your competitive landscape with detailed competitor analysis. Our AI identifies their strengths,
                weaknesses, and strategies, helping you develop data-driven approaches to gain market share.
              </p>

              <h4>Competitor Insights:</h4>
              <ul>
                <li>Backlink profile comparison</li>
                <li>Content strategy analysis</li>
                <li>Keyword targeting overlap</li>
                <li>Technical SEO benchmarking</li>
                <li>Market positioning assessment</li>
              </ul>

              <h3>Intelligent Content Optimization</h3>
              <p>
                Optimize your content for better search performance with AI-powered recommendations. Our platform analyzes
                content quality, relevance, and engagement factors to improve your on-page SEO.
              </p>

              <h4>Content Optimization Tools:</h4>
              <ul>
                <li>Readability and engagement analysis</li>
                <li>Topic clustering and content gaps</li>
                <li>Title and meta description optimization</li>
                <li>Internal linking suggestions</li>
                <li>Content freshness monitoring</li>
              </ul>

              <h3>Enterprise-Grade Reporting & Collaboration</h3>
              <p>
                Scale your SEO efforts with advanced reporting and team collaboration features. Generate professional
                reports, share insights with stakeholders, and coordinate team efforts across large organizations.
              </p>

              <h4>Reporting Capabilities:</h4>
              <ul>
                <li>White-label reporting options</li>
                <li>Custom dashboard creation</li>
                <li>Team collaboration tools</li>
                <li>API access for integrations</li>
                <li>Automated report scheduling</li>
              </ul>

              <h2>Getting Started with AI SEO Turbo</h2>
              <p>
                Ready to transform your SEO strategy with AI-powered tools? Our platform is designed to be accessible
                to users at all skill levels while providing the depth and sophistication that enterprise teams require.
              </p>
              <p>
                Start with our comprehensive guides below to master each feature and unlock the full potential of
                your SEO efforts. Whether you're optimizing a single website or managing a portfolio of client sites,
                AI SEO Turbo provides the tools and insights you need to succeed.
              </p>
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
