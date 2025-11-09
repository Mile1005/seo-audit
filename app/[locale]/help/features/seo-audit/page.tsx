"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, BarChart, Search, AlertTriangle, TrendingUp, Settings, FileText } from 'lucide-react'
import Link from 'next/link'

export default function SEOAuditWalkthroughPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.aiseoturbo.com' },
            { name: 'Help', url: 'https://www.aiseoturbo.com/help' },
            { name: 'Features', url: 'https://www.aiseoturbo.com/help/seo-tools-features' },
            { name: 'SEO Audit Walkthrough', url: 'https://www.aiseoturbo.com/help/features/seo-audit' }
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
                    Complete SEO audit walkthrough
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>12 min read</span>
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
                  <Search className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">What you'll learn</h2>
                    <p className="text-gray-300 mb-0">
                      Master our comprehensive SEO audit process. Learn how to analyze 200+ SEO factors, interpret results,
                      and implement actionable recommendations to improve your website's search rankings.
                    </p>
                    <div className="mt-4 text-sm">
                      <span className="text-gray-400">Having trouble with an audit? </span>
                      <Link href="/help/troubleshooting/audit-issues" className="text-blue-400 hover:text-blue-300 underline">
                        See troubleshooting: Audit not completing
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <h2 className="text-2xl font-bold text-white mb-6">SEO Audit Overview</h2>

              <p className="text-gray-300 mb-6">
                Our AI-powered SEO audit analyzes your website across 200+ technical and content factors.
                The audit takes 2-5 minutes to complete and provides detailed insights with prioritized recommendations.
              </p>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <h3 className="text-white text-lg font-semibold mb-4">What gets analyzed</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Technical SEO factors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Content optimization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Mobile usability</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Page speed analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Backlink profile</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Competitor analysis</span>
                  </div>
                </div>
              </div>

              {/* Step-by-step Guide */}
              <h3 className="text-2xl font-bold text-white mb-6">Step-by-step walkthrough</h3>

              <div className="space-y-8">

                {/* Step 1 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Start your audit</h3>
                      <p className="text-gray-300 mb-4">
                        Navigate to the SEO Audit section in your dashboard and click "Start New Audit".
                        Enter your website URL and select your target location and device preferences.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-4 border-l-4 border-blue-500">
                        <p className="text-sm text-gray-400 mb-2"><strong>Pro tip:</strong></p>
                        <p className="text-gray-300 text-sm">
                          Use your website's primary domain (without www) for the most accurate results.
                          If you have a large site, consider auditing sub-sections separately.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">AI analysis begins</h3>
                      <p className="text-gray-300 mb-4">
                        Our AI crawls your website, analyzing every page and identifying SEO opportunities.
                        This process typically takes 2-5 minutes depending on your site size.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-blue-400">200+</div>
                          <div className="text-sm text-gray-400">SEO factors checked</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-green-400">95%</div>
                          <div className="text-sm text-gray-400">AI accuracy rate</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-purple-400">2-5 min</div>
                          <div className="text-sm text-gray-400">Average completion time</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Review your SEO score</h3>
                      <p className="text-gray-300 mb-4">
                        Once complete, you'll receive an overall SEO score from 0-100, along with detailed
                        breakdowns by category. Higher scores indicate better SEO health.
                      </p>
                      <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-medium">Score ranges</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-red-400 font-medium">0-40</div>
                            <div className="text-gray-400">Critical issues</div>
                          </div>
                          <div>
                            <div className="text-yellow-400 font-medium">41-70</div>
                            <div className="text-gray-400">Needs improvement</div>
                          </div>
                          <div>
                            <div className="text-green-400 font-medium">71-100</div>
                            <div className="text-gray-400">Good performance</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Analyze detailed insights</h3>
                      <p className="text-gray-300 mb-4">
                        Dive deep into specific issues and opportunities. Each finding includes:
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Severity level (Critical, Warning, Info)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Impact estimation on rankings</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Specific fix recommendations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Implementation difficulty</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Export and track progress</h3>
                      <p className="text-gray-300 mb-4">
                        Export detailed PDF reports and use our dashboard to track improvements over time.
                        Schedule regular audits to monitor your SEO progress.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <div className="bg-slate-900/50 rounded-lg px-3 py-2 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300 text-sm">PDF Reports</span>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg px-3 py-2 flex items-center gap-2">
                          <Settings className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">Progress Tracking</span>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg px-3 py-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-purple-400" />
                          <span className="text-gray-300 text-sm">Historical Data</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Common Issues */}
              <h3 className="text-2xl font-bold text-white mb-6">Common issues and solutions</h3>

              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <h4 className="text-red-400 font-medium mb-1">Audit not completing</h4>
                      <p className="text-gray-300 text-sm">
                        If your audit gets stuck, try auditing a single page first, then expand to the full site.
                        Large sites may take longer to analyze.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="text-yellow-400 font-medium mb-1">Inaccurate results</h4>
                      <p className="text-gray-300 text-sm">
                        Ensure your site is accessible and not behind a firewall. Some JavaScript-heavy sites may require additional configuration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Ready to improve your SEO?</h3>
                <p className="text-gray-300 mb-4">
                  Now that you understand how our SEO audit works, start with your first audit and see how you can improve your search rankings.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/dashboard"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Start Your First Audit
                  </Link>
                  <Link
                    href="/help/features/competitor-analysis"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Learn About Competitor Analysis
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
