"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BookOpen, CreditCard, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const categoryArticles = [
  {
    title: "Upgrading your plan",
    href: "/help/billing/upgrade-plan",
    time: "4 min",
    description: "Learn how to upgrade your subscription plan and unlock premium features.",
    icon: BookOpen
  },
  {
    title: "Managing payment methods",
    href: "/help/billing/payment-methods",
    time: "5 min",
    description: "Add, update, or remove payment methods and billing information.",
    icon: BookOpen
  },
  {
    title: "Understanding your invoice",
    href: "/help/billing/invoices",
    time: "4 min",
    description: "Learn how to read your invoices and download billing history.",
    icon: BookOpen
  },
  {
    title: "Cancelling your subscription",
    href: "/help/billing/cancellation",
    time: "3 min",
    description: "Learn about our cancellation policy and how to cancel your subscription.",
    icon: BookOpen
  }
]

export default function AccountBillingPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Account & Billing</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Manage your AI SEO Turbo account, subscription plans, billing information,
              and payment methods with our comprehensive guides.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Account Management</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/dashboard"
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Access Dashboard</h3>
                    <p className="text-blue-100">Manage your account settings</p>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link
                href="/pricing"
                className="group bg-white border-2 border-gray-200 text-gray-900 p-6 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">View Plans</h3>
                    <p className="text-gray-600">Compare subscription options</p>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
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

          {/* Billing Information */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Billing & Subscription FAQ</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When will I be charged?</h3>
                <p className="text-gray-600">
                  You'll be charged at the beginning of your billing cycle. For annual plans, you'll receive a prorated charge for the first partial month.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
                <p className="text-gray-600">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/help/security"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Security & Privacy</h3>
                <p className="text-sm text-gray-600">Your data protection</p>
              </Link>
              <Link
                href="/help/api/api-integrations"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <ArrowRight className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">API & Integrations</h3>
                <p className="text-sm text-gray-600">Connect external tools</p>
              </Link>
              <Link
                href="/contact"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Contact Support</h3>
                <p className="text-sm text-gray-600">Get help with billing</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}