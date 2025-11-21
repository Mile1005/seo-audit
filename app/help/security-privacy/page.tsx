"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BookOpen, Shield, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const categoryArticles = [
  {
    title: "Two-factor authentication",
    href: "/help/security/two-factor-authentication",
    time: "7 min",
    description: "Set up 2FA to add an extra layer of security to your account.",
    icon: BookOpen
  },
  {
    title: "Privacy settings",
    href: "/help/security/privacy",
    time: "8 min",
    description: "Control your data, manage privacy preferences, and understand your rights.",
    icon: BookOpen
  },
  {
    title: "GDPR compliance",
    href: "/help/security/gdpr",
    time: "10 min",
    description: "Learn about your data protection rights and how we comply with GDPR.",
    icon: BookOpen
  },
  {
    title: "Security best practices",
    href: "/help/security/best-practices",
    time: "6 min",
    description: "Essential security tips to keep your account and data safe.",
    icon: BookOpen
  }
]

export default function SecurityPrivacyPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Security & Privacy | AI SEO Turbo</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Your security and privacy are our top priorities. Learn about our comprehensive
              security measures, data protection policies, and privacy controls.
            </p>
          </div>

          {/* Security Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Security at AI SEO Turbo</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Security</h3>
                <p className="text-gray-600">Bank-level encryption and security protocols</p>
              </div>
              <div className="text-center">
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">GDPR Compliant</h3>
                <p className="text-gray-600">Full compliance with data protection regulations</p>
              </div>
              <div className="text-center">
                <ArrowRight className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy Controls</h3>
                <p className="text-gray-600">Complete control over your data and preferences</p>
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

          {/* Data Protection */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Protection & Privacy</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Data Rights</h3>
                <p className="text-gray-600">
                  You have full control over your data. Access, download, or delete your information anytime.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Storage</h3>
                <p className="text-gray-600">
                  All data is encrypted at rest and in transit using industry-standard AES-256 encryption.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Selling</h3>
                <p className="text-gray-600">
                  We never sell your personal data to third parties. Your privacy is our promise.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/help/billing"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Account Settings</h3>
                <p className="text-sm text-gray-600">Manage your account preferences</p>
              </Link>
              <Link
                href="/help/api/api-integrations"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">API Security</h3>
                <p className="text-sm text-gray-600">Secure API access and authentication</p>
              </Link>
              <Link
                href="/contact"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <ArrowRight className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Security Support</h3>
                <p className="text-sm text-gray-600">Get help with security concerns</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}