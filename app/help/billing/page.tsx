"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, CreditCard, DollarSign, FileText, Settings, Star, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

export default function BillingOverviewPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.aiseoturbo.com' },
            { name: 'Help', url: 'https://www.aiseoturbo.com/help' },
            { name: 'Billing & Account', url: 'https://www.aiseoturbo.com/help/billing' }
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-3">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-purple-400 text-sm font-medium">Billing & Account</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Billing & Account Management
                  </h1>
                </div>
              </div>

              <p className="text-xl text-gray-400 mb-8">
                Everything you need to know about managing your AI SEO Turbo account, billing,
                subscriptions, and payment methods.
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
                <h2 className="text-3xl font-bold text-white mb-4">Account & Billing Overview</h2>
                <p className="text-gray-300 text-lg">
                  Manage your AI SEO Turbo subscription, payment methods, invoices, and account settings
                  with our comprehensive billing and account management tools.
                </p>
              </div>

              {/* Billing Topics */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Billing & Subscription Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link
                    href="/help/billing/upgrade-plan"
                    className="group bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-green-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3 flex-shrink-0">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">
                          Upgrade Your Plan
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Learn about our pricing plans, features, and how to upgrade your subscription
                          to unlock more SEO tools and higher limits.
                        </p>
                        <span className="text-green-400 text-sm group-hover:text-green-300 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/help/billing/payment-methods"
                    className="group bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3 flex-shrink-0">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          Payment Methods
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Add, update, or remove payment methods. Learn about supported payment options
                          and billing cycles.
                        </p>
                        <span className="text-blue-400 text-sm group-hover:text-blue-300 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/help/billing/invoices"
                    className="group bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-3 flex-shrink-0">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                          Invoices & Receipts
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Download invoices, view payment history, and manage your billing records.
                          Learn about tax information and billing addresses.
                        </p>
                        <span className="text-purple-400 text-sm group-hover:text-purple-300 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/help/billing/cancellation"
                    className="group bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-red-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 p-3 flex-shrink-0">
                        <Settings className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-red-300 transition-colors">
                          Cancellation & Refunds
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Understand our cancellation policy, refund process, and what happens when
                          you cancel your subscription.
                        </p>
                        <span className="text-red-400 text-sm group-hover:text-red-300 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Account Management */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Account Management</h3>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-400" />
                      Account Security & Settings
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Manage your account security settings, including password changes, two-factor authentication,
                      and account preferences.
                    </p>
                    <div className="flex gap-4">
                      <Link
                        href="/help/security/two-factor-authentication"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Two-Factor Auth →
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Account Settings →
                      </Link>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      Usage & Limits
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Monitor your account usage, understand plan limits, and learn how to optimize
                      your SEO audit and analysis usage.
                    </p>
                    <Link
                      href="/dashboard/settings"
                      className="text-green-400 hover:text-green-300 text-sm"
                    >
                      View Usage Dashboard →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Quick Account Actions</h3>
                <p className="text-gray-300 mb-6">
                  Need to make changes to your account or billing? Here are the most common actions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  >
                    <Settings className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                    <span className="text-gray-300 group-hover:text-white">Account Settings</span>
                  </Link>
                  <Link
                    href="/pricing"
                    className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  >
                    <Star className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
                    <span className="text-gray-300 group-hover:text-white">View Pricing Plans</span>
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  >
                    <User className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                    <span className="text-gray-300 group-hover:text-white">Profile Management</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  >
                    <Zap className="w-5 h-5 text-green-400 group-hover:text-green-300" />
                    <span className="text-gray-300 group-hover:text-white">Contact Support</span>
                  </Link>
                </div>
              </div>

              {/* Support */}
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Need Billing Support?</h3>
                  <p className="text-gray-300 mb-6">
                    Our support team is available to help with any billing questions, account issues,
                    or subscription concerns.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      Contact Billing Support
                    </Link>
                    <Link
                      href="/help/account-billing"
                      className="inline-flex items-center justify-center px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                    >
                      Billing FAQ
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