"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, XCircle, AlertTriangle, MessageSquare, RefreshCw, CheckCircle, Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CancellationPage() {
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
              <Link href="/help/category/account-billing" className="text-gray-400 hover:text-white transition-colors">
                Account & Billing
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">Cancellation</span>
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 p-3">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-red-400 text-sm font-medium">Account & Billing</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Cancellation
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
                  <Heart className="w-6 h-6 text-red-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">We're sorry to see you go</h2>
                    <p className="text-gray-300 mb-0">
                      We understand that circumstances change. Learn how to cancel your subscription safely and what happens after cancellation.
                      Remember, you can always reactivate your account if you change your mind.
                    </p>
                  </div>
                </div>
              </div>

              {/* Before You Cancel */}
              <h2 className="text-2xl font-bold text-white mb-6">Before you cancel</h2>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <MessageSquare className="w-8 h-8 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-blue-400 text-lg font-semibold mb-3">Talk to us first</h3>
                    <p className="text-gray-300 mb-4">
                      Having issues or need a different plan? We'd love to help you find a better solution
                      before you cancel. Many customers stay when they discover alternative options.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/contact"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                      >
                        Contact Support
                      </Link>
                      <Link
                        href="/pricing"
                        className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                      >
                        View Alternatives
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* How to Cancel */}
              <h3 className="text-2xl font-bold text-white mb-6">How to cancel your subscription</h3>

              <div className="space-y-6 mb-8">

                {/* Step 1 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Access account settings</h3>
                      <p className="text-gray-300 mb-4">
                        Go to your account dashboard and navigate to the billing or subscription settings.
                        You'll find the cancellation option in your plan management section.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-gray-300 text-sm">
                          <strong>Dashboard:</strong> Settings → Billing → Subscription → Cancel Plan
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Tell us why you're leaving</h3>
                      <p className="text-gray-300 mb-4">
                        Help us improve by sharing your reason for cancellation. This feedback is valuable
                        and helps us serve other customers better. Your input remains completely anonymous.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-gray-300 text-sm">
                          Common reasons: Cost, Features, Technical issues, Switching tools, Temporary pause
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Confirm cancellation</h3>
                      <p className="text-gray-300 mb-4">
                        Review the cancellation details and confirm. You'll receive an email confirmation
                        and your subscription will end at the current billing period.
                      </p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-medium">No immediate access loss</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          You'll keep full access to all features until the end of your current billing period.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* What Happens After Cancellation */}
              <h3 className="text-2xl font-bold text-white mb-6">What happens after cancellation</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    What You Keep
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Full access until billing period ends</li>
                    <li>• All your data and audit history</li>
                    <li>• Ability to export your data</li>
                    <li>• Access to invoices and billing history</li>
                    <li>• Option to reactivate anytime</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-400" />
                    What Changes
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• No new charges after cancellation</li>
                    <li>• Limited to free plan features</li>
                    <li>• Cannot create new audits</li>
                    <li>• API access disabled (if applicable)</li>
                    <li>• Priority support ends</li>
                  </ul>
                </div>

              </div>

              {/* Data Retention */}
              <h3 className="text-2xl font-bold text-white mb-6">Data retention after cancellation</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-2">30</div>
                    <div className="text-gray-300 text-sm mb-1">Days</div>
                    <div className="text-gray-400 text-xs">Grace period to reactivate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-2">90</div>
                    <div className="text-gray-300 text-sm mb-1">Days</div>
                    <div className="text-gray-400 text-xs">Data retention period</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-2">GDPR</div>
                    <div className="text-gray-300 text-sm mb-1">Compliant</div>
                    <div className="text-gray-400 text-xs">Data deletion on request</div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-slate-900/50 rounded-lg">
                  <p className="text-gray-300 text-sm">
                    <strong>Important:</strong> After 90 days, your account and data will be permanently deleted.
                    Make sure to export any important data before this period ends.
                  </p>
                </div>
              </div>

              {/* Reactivation */}
              <h3 className="text-2xl font-bold text-white mb-6">Can I reactivate my account?</h3>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <RefreshCw className="w-8 h-8 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-green-400 text-lg font-semibold mb-3">Yes, reactivation is easy</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white font-medium mb-1">Within 30 Days</h4>
                        <p className="text-gray-300 text-sm">
                          Simply log back in and choose a plan. All your data and settings will be restored exactly as they were.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">After 30 Days</h4>
                        <p className="text-gray-300 text-sm">
                          Contact support to reactivate. Your data may still be available depending on how long it's been since cancellation.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">After 90 Days</h4>
                        <p className="text-gray-300 text-sm">
                          Permanent deletion occurs. You'll need to create a new account, but historical data cannot be recovered.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Refund Policy */}
              <h3 className="text-2xl font-bold text-white mb-6">Refund policy</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">30-Day Money Back Guarantee</h4>
                      <p className="text-gray-300 text-sm">
                        If you're not satisfied within the first 30 days, you can request a full refund.
                        No questions asked, no cancellation fees.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">After 30 Days</h4>
                      <p className="text-gray-300 text-sm">
                        Refunds are not available after the 30-day guarantee period. You can cancel at any time,
                        but you'll retain access until the end of your billing period.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Prorated Refunds</h4>
                      <p className="text-gray-300 text-sm">
                        If you cancel mid-billing cycle, you won't be charged for the remaining period.
                        No partial refunds are issued for unused time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternative Options */}
              <h3 className="text-2xl font-bold text-white mb-6">Alternative options to cancellation</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3">Pause Subscription</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Need a break? Pause your subscription for up to 3 months without losing your data.
                  </p>
                  <div className="text-blue-400 text-sm font-medium">Coming Soon</div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3">Downgrade Plan</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Switch to a lower-tier plan that better fits your current needs and budget.
                  </p>
                  <Link
                    href="/help/billing/upgrade-plan"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Learn about plan changes →
                  </Link>
                </div>

              </div>

              {/* Final Thoughts */}
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">We're here to help</h3>
                <p className="text-gray-300 mb-4">
                  If you're considering cancellation, please reach out first. We might be able to address
                  your concerns and help you get more value from our platform. Your feedback helps us improve.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Contact Support Before Canceling
                    <ArrowRight className="w-4 h-4 inline ml-2" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Explore Plan Options
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
