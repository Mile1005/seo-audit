"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BookOpen, Settings, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const categoryArticles = [
  {
    title: "Login and access problems",
    href: "/help/troubleshooting/login-issues",
    time: "6 min",
    description: "Resolve login issues, password problems, and account access difficulties.",
    icon: BookOpen
  },
  {
    title: "Data synchronization issues",
    href: "/help/troubleshooting/sync-issues",
    time: "5 min",
    description: "Fix data syncing problems and ensure your information stays up to date.",
    icon: BookOpen
  },
  {
    title: "Performance optimization",
    href: "/help/troubleshooting/performance",
    time: "6 min",
    description: "Improve audit speed, reduce lag, and optimize your experience.",
    icon: BookOpen
  }
]

export default function TroubleshootingCategoryPage() {
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
              <span className="text-white">Troubleshooting</span>
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 p-3">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-yellow-400 text-sm font-medium">Category</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Troubleshooting
                  </h1>
                </div>
              </div>

              <h2 className="text-xl text-gray-400 mb-8">
                Resolve common issues with step-by-step guides.
              </h2>

              {/* Comprehensive Troubleshooting Introduction */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Mastering Technical Troubleshooting</h2>
                <p className="text-gray-300 mb-4">
                  Every SEO professional encounters technical challenges. Whether you're dealing with login difficulties,
                  data synchronization problems, or performance bottlenecks, our comprehensive troubleshooting guides
                  provide expert solutions backed by years of experience helping thousands of users optimize their SEO workflows.
                </p>
                <p className="text-gray-300 mb-4">
                  Our troubleshooting resources are designed by senior developers and SEO specialists who understand
                  the intricacies of web crawling, data processing, and user experience optimization. We don't just
                  provide quick fixes – we explain the root causes and teach you how to prevent issues from recurring.
                </p>
                <p className="text-gray-300">
                  From account security best practices to advanced performance tuning techniques, our guides cover
                  everything from basic setup issues to complex enterprise-level problems. Each solution is tested
                  across multiple environments and updated regularly to reflect the latest platform changes and
                  industry standards.
                </p>
              </div>

              {/* Common Issues Overview */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Most Common Technical Issues</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Authentication & Access</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Password reset complications</li>
                      <li>• Two-factor authentication setup</li>
                      <li>• Account lockout scenarios</li>
                      <li>• Session timeout issues</li>
                      <li>• Browser compatibility problems</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Data & Synchronization</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Crawl data not updating</li>
                      <li>• Report generation failures</li>
                      <li>• API connection timeouts</li>
                      <li>• Database sync conflicts</li>
                      <li>• Export/import errors</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Performance & Speed</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Slow audit processing</li>
                      <li>• Memory usage spikes</li>
                      <li>• Browser freezing issues</li>
                      <li>• Large site crawling delays</li>
                      <li>• Concurrent user bottlenecks</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Analysis & Reporting</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Incomplete SEO audits</li>
                      <li>• Inaccurate scoring algorithms</li>
                      <li>• Missing keyword data</li>
                      <li>• Broken link detection failures</li>
                      <li>• Competitor analysis errors</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Expert Tips */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Pro Troubleshooting Strategies</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h3 className="text-white font-semibold">Systematic Problem Isolation</h3>
                      <p className="text-gray-300 text-sm">
                        Start with the simplest explanations first. Check network connectivity, clear browser cache,
                        and verify account status before diving into complex technical diagnostics.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h3 className="text-white font-semibold">Environment Documentation</h3>
                      <p className="text-gray-300 text-sm">
                        Document your browser version, operating system, network type, and any VPN or proxy usage.
                        This information is crucial for accurate diagnosis and solution matching.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h3 className="text-white font-semibold">Error Message Analysis</h3>
                      <p className="text-gray-300 text-sm">
                        Pay close attention to error codes, messages, and timestamps. These provide valuable clues
                        about the root cause and help our support team provide targeted solutions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h3 className="text-white font-semibold">Preventive Maintenance</h3>
                      <p className="text-gray-300 text-sm">
                        Regular browser updates, cache clearing, and account security reviews prevent most common
                        issues before they impact your SEO workflow.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Troubleshooting */}
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Advanced Diagnostic Tools</h2>
                <p className="text-gray-300 mb-4">
                  For complex issues requiring deeper investigation, our platform provides advanced diagnostic
                  capabilities and logging features that help identify intermittent problems and performance bottlenecks.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Network Diagnostics</h4>
                    <p className="text-gray-300 text-sm">
                      Built-in tools to test connection stability, latency, and packet loss affecting data synchronization.
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Performance Profiling</h4>
                    <p className="text-gray-300 text-sm">
                      Detailed performance metrics and profiling data to identify bottlenecks in audit processing.
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Error Logging</h4>
                    <p className="text-gray-300 text-sm">
                      Comprehensive error logging with stack traces and contextual information for precise debugging.
                    </p>
                  </div>
                </div>
              </div>

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
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 p-2 flex-shrink-0">
                          <article.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
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
                        <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-yellow-400 transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Fixes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Quick Fixes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/help/troubleshooting/login-issues"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-yellow-400 transition-colors">Can't log in?</div>
                    <div className="text-gray-400 text-sm">Reset password or check account status</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 transition-colors" />
                </Link>
                <Link
                  href="/help/troubleshooting/performance"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-yellow-400 transition-colors">Slow performance?</div>
                    <div className="text-gray-400 text-sm">Clear cache and optimize settings</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 transition-colors" />
                </Link>
              </div>
            </motion.div>

            {/* Related Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Related Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/help/category/api-integrations"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-orange-400 transition-colors">API & Integrations</div>
                    <div className="text-gray-400 text-sm">Connect with your tools and automate</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
                </Link>
                <Link
                  href="/help/category/security-privacy"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-indigo-400 transition-colors">Security & Privacy</div>
                    <div className="text-gray-400 text-sm">Data protection and account security</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                </Link>
              </div>
            </motion.div>

            {/* Need More Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-8 text-center"
            >
              <h3 className="text-white text-xl font-bold mb-4">Still having issues?</h3>
              <p className="text-gray-400 mb-6">
                Our technical support team can help resolve complex issues and provide personalized assistance.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/contact"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Get Technical Support
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
