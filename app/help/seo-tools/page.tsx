"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, BarChart, Search, AlertTriangle, TrendingUp, Settings, FileText, Target, Zap, Globe, Bot } from 'lucide-react'
import Link from 'next/link'

export default function SEOToolsOverviewPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.aiseoturbo.com' },
            { name: 'Help', url: 'https://www.aiseoturbo.com/help' },
            { name: 'SEO Tools & Features', url: 'https://www.aiseoturbo.com/help/seo-tools' }
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
                  <BarChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">SEO Tools & Features</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    SEO Tools & Features Overview
                  </h1>
                </div>
              </div>

              <p className="text-xl text-gray-400 mb-8">
                Discover our comprehensive suite of SEO tools designed to boost your search rankings,
                analyze competitors, and optimize your website performance.
              </p>

              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Written by AI SEO Turbo Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: March 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* Introduction */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Our SEO Tools Suite</h2>
                <p className="text-gray-300 text-lg">
                  AI SEO Turbo provides a comprehensive set of tools powered by advanced AI technology
                  to help you improve your search engine rankings, understand your competitors, and
                  optimize your website for better performance.
                </p>
              </div>

              {/* Core Features */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Core SEO Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link
                    href="/help/seo-tools/seo-audit"
                    className="group bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3 flex-shrink-0">
                        <Search className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          SEO Audit
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Comprehensive website analysis covering 47+ SEO factors including technical SEO,
                          content quality, and user experience.
                        </p>
                        <span className="text-blue-400 text-sm group-hover:text-blue-300 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/help/seo-tools/competitor-analysis"
                    className="group bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-3 flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                          Competitor Analysis
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Analyze your competitors' SEO strategies, backlink profiles, and content performance
                          to gain competitive insights.
                        </p>
                        <span className="text-purple-400 text-sm group-hover:text-purple-300 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/help/seo-tools/site-crawler"
                    className="group bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-3 flex-shrink-0">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors">
                          Site Crawler
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Comprehensive website crawling tool that discovers all pages, analyzes internal linking,
                          and identifies crawlability issues.
                        </p>
                        <span className="text-orange-400 text-sm group-hover:text-orange-300 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/help/seo-tools/ai-assistant"
                    className="group bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-3 flex-shrink-0">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          AI Assistant
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Intelligent AI assistant that provides personalized SEO recommendations,
                          content optimization suggestions, and strategic guidance.
                        </p>
                        <span className="text-cyan-400 text-sm group-hover:text-cyan-300 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Getting Started */}
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Getting Started with Our SEO Tools</h3>
                <p className="text-gray-300 mb-6">
                  New to SEO or looking to improve your existing strategy? Start with our beginner-friendly guides
                  that will walk you through each tool and help you understand the results.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/help/getting-started/first-audit"
                    className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  >
                    <Target className="w-5 h-5 text-green-400 group-hover:text-green-300" />
                    <span className="text-gray-300 group-hover:text-white">Run Your First SEO Audit</span>
                  </Link>
                  <Link
                    href="/help/getting-started/quick-start"
                    className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  >
                    <Zap className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
                    <span className="text-gray-300 group-hover:text-white">Quick Start Guide</span>
                  </Link>
                </div>
              </div>

              {/* Advanced Features */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Advanced Features</h3>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Keyword Tracking & Research</h4>
                    <p className="text-gray-300 mb-4">
                      Track keyword rankings, discover new opportunities, and analyze search volume trends
                      with our comprehensive keyword research tools.
                    </p>
                    <Link
                      href="/features/keyword-tracking"
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Explore Keyword Tools →
                    </Link>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Backlink Analysis</h4>
                    <p className="text-gray-300 mb-4">
                      Monitor your backlink profile, discover new link building opportunities, and analyze
                      competitor backlink strategies.
                    </p>
                    <Link
                      href="/dashboard/backlinks"
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      View Backlink Dashboard →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Need Help? */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Need Help Getting Started?</h3>
                  <p className="text-gray-300 mb-6">
                    Our support team is here to help you make the most of our SEO tools.
                    Get personalized guidance and answers to your questions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/help/troubleshooting"
                      className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Troubleshooting Guide
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                    >
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}