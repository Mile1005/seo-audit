"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BookOpen, Database, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const categoryArticles = [
  {
    title: "API authentication",
    href: "/help/api/authentication",
    time: "6 min",
    description: "Set up and manage API keys for secure access to our platform.",
    icon: BookOpen
  },
  {
    title: "Webhook configuration",
    href: "/help/api/webhooks",
    time: "7 min",
    description: "Configure webhooks to receive real-time notifications and automate workflows.",
    icon: BookOpen
  }
]

export default function APIIntegrationsCategoryPage() {
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
              <span className="text-white">API & Integrations</span>
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-3">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-orange-400 text-sm font-medium">Category</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    API & Integrations
                  </h1>
                </div>
              </div>

              <h2 className="text-xl text-gray-400 mb-8">
                Connect AISEOTurbo with your tools and automate workflows using our API and integrations.
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
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-2 flex-shrink-0">
                          <article.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
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
                        <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-orange-400 transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* API Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">API Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/help/api/authentication"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-orange-400 transition-colors">API Authentication</div>
                    <div className="text-gray-400 text-sm">Learn how to authenticate API requests</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
                </Link>
                <Link
                  href="/status"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-orange-400 transition-colors">API Status</div>
                    <div className="text-gray-400 text-sm">Check API availability and uptime</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
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
                  href="/help/category/troubleshooting"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-yellow-400 transition-colors">Troubleshooting</div>
                    <div className="text-gray-400 text-sm">Resolve common issues and errors</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 transition-colors" />
                </Link>
                <Link
                  href="/help/category/seo-tools-features"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-blue-400 transition-colors">SEO Tools & Features</div>
                    <div className="text-gray-400 text-sm">Master our AI-powered SEO toolkit</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </Link>
              </div>
            </motion.div>

            {/* Need More Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 bg-orange-500/10 border border-orange-500/20 rounded-xl p-8 text-center"
            >
              <h3 className="text-white text-xl font-bold mb-4">Need API support?</h3>
              <p className="text-gray-400 mb-6">
                Our developer support team can help with integrations, API issues, and custom implementations.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/contact"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Developer Support
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
