"use client"

import { MainLayout } from '@/components/layout/main-layout'
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
  },
  {
    title: "Audit not completing",
    href: "/help/troubleshooting/audit-issues",
    time: "6 min",
    description: "Fix stuck audits, timeouts, and common analysis failures.",
    icon: BookOpen
  }
]

export default function TroubleshootingPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Troubleshooting</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Having issues with AI SEO Turbo? Find solutions to common problems and get your
              SEO audits running smoothly again.
            </p>
          </div>

          {/* Troubleshooting Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Common Issues & Solutions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <Settings className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Fixes</h3>
                <p className="text-gray-600">Step-by-step solutions for common problems</p>
              </div>
              <div className="text-center">
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Guides</h3>
                <p className="text-gray-600">In-depth troubleshooting for complex issues</p>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {categoryArticles.map((article, index) => (
              <motion.div
                key={article.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={article.href}
                  className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <article.icon className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.time}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{article.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Solutions */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Solutions</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Audit Stuck or Not Loading</h3>
                <p className="text-gray-600 mb-3">
                  Try refreshing the page, clearing your browser cache, or checking your internet connection.
                </p>
                <Link href="/help/troubleshooting/audit-issues" className="text-blue-600 hover:text-blue-800 font-medium">
                  View detailed solution →
                </Link>
              </div>
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Login Problems</h3>
                <p className="text-gray-600 mb-3">
                  Reset your password, check your email for verification, or try a different browser.
                </p>
                <Link href="/help/troubleshooting/login-issues" className="text-blue-600 hover:text-blue-800 font-medium">
                  View detailed solution →
                </Link>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Slow Performance</h3>
                <p className="text-gray-600 mb-3">
                  Close other tabs, update your browser, or try using a different device.
                </p>
                <Link href="/help/troubleshooting/performance" className="text-blue-600 hover:text-blue-800 font-medium">
                  View detailed solution →
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/help/getting-started"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Getting Started</h3>
                <p className="text-sm text-gray-600">Basic setup and first steps</p>
              </Link>
              <Link
                href="/help/features/seo-audit"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <Settings className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">SEO Audit Features</h3>
                <p className="text-sm text-gray-600">Learn about audit capabilities</p>
              </Link>
              <Link
                href="/contact"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <ArrowRight className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Contact Support</h3>
                <p className="text-sm text-gray-600">Get help from our team</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}