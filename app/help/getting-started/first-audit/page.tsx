"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, Lightbulb, AlertTriangle, Target } from 'lucide-react'
import Link from 'next/link'

export default function FirstAuditPage() {
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
              <Link href="/help/category/getting-started" className="text-gray-400 hover:text-white transition-colors">
                Getting Started
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">How to create your first SEO audit</span>
            </nav>
          </div>
        </section>

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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">Getting Started</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    How to create your first SEO audit
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>5 min read</span>
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
                  <Target className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">What you'll learn</h3>
                    <p className="text-gray-300 mb-0">
                      In this guide, you'll learn how to perform your first comprehensive SEO audit using AISEOTurbo's AI-powered tools. 
                      By the end, you'll have a complete understanding of your website's SEO health and actionable recommendations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step-by-step Guide */}
              <h2 className="text-2xl font-bold text-white mb-6">Step-by-step guide</h2>
              
              <div className="space-y-8">
                
                {/* Step 1 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Enter your website URL</h3>
                      <p className="text-gray-300 mb-4">
                        Navigate to the SEO Audit tool and enter your website's URL in the input field. Make sure to include the full URL including 'https://' or 'http://'.
                      </p>
                      <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                        <code className="text-green-400">https://example.com</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Configure audit settings</h3>
                      <p className="text-gray-300 mb-4">
                        Choose your audit preferences:
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span><strong>Mobile Analysis:</strong> Enable for mobile-first indexing insights</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span><strong>Competitor Analysis:</strong> Add up to 3 competitor URLs</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span><strong>Deep Crawl:</strong> Analyze up to 100 pages (Pro feature)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Start the audit</h3>
                      <p className="text-gray-300 mb-4">
                        Click the "Start Audit" button and wait for our AI to analyze your website. This typically takes 2-5 minutes depending on your site's size.
                      </p>
                      <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="text-blue-300">Audit in progress... Analyzing 47 SEO factors</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Review your results</h3>
                      <p className="text-gray-300 mb-4">
                        Once complete, you'll see your SEO score and detailed analysis. The results are organized into categories:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-3">
                          <h4 className="text-green-400 font-medium">✓ Passed (Green)</h4>
                          <p className="text-gray-300 text-sm">Items your site is handling well</p>
                        </div>
                        <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-3">
                          <h4 className="text-yellow-400 font-medium">⚠ Warnings (Yellow)</h4>
                          <p className="text-gray-300 text-sm">Areas that need attention</p>
                        </div>
                        <div className="bg-red-900/30 border border-red-600/30 rounded-lg p-3">
                          <h4 className="text-red-400 font-medium">✗ Errors (Red)</h4>
                          <p className="text-gray-300 text-sm">Critical issues to fix immediately</p>
                        </div>
                        <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-3">
                          <h4 className="text-blue-400 font-medium">ℹ Info (Blue)</h4>
                          <p className="text-gray-300 text-sm">Additional insights and tips</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6 mt-12">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-yellow-400 text-lg font-semibold mb-2">Pro Tips</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Run audits regularly (weekly for active sites, monthly for stable ones)</li>
                      <li>• Focus on fixing critical errors first, then warnings</li>
                      <li>• Use the competitor analysis to identify opportunities</li>
                      <li>• Export reports to track your progress over time</li>
                      <li>• Set up automated monitoring for continuous insights</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <h3 className="text-2xl font-bold text-white mt-12 mb-6">Next steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                  href="/help/getting-started/dashboard-setup"
                  className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    Setting up your dashboard
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Learn how to customize your dashboard for maximum productivity
                  </p>
                </Link>
                
                <Link 
                  href="/help/getting-started/seo-scores"
                  className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    Understanding SEO scores
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Deep dive into how we calculate and what each score means
                  </p>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
