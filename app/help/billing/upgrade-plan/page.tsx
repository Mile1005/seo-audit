"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, CreditCard, TrendingUp, Zap, Star, Crown, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function UpgradePlanPage() {
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
              <span className="text-white">Upgrading your plan</span>
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-purple-400 text-sm font-medium">Account & Billing</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Upgrading your plan
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>4 min read</span>
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
                  <CreditCard className="w-6 h-6 text-purple-400 mt-1" />
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">When to upgrade</h3>
                    <p className="text-gray-300 mb-0">
                      Ready to unlock more SEO power? Learn when and how to upgrade your plan for advanced features,
                      higher limits, and priority support. Upgrades are instant and prorated.
                    </p>
                  </div>
                </div>
              </div>

              {/* When to Upgrade */}
              <h2 className="text-2xl font-bold text-white mb-6">Signs you need to upgrade</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-white font-semibold">Performance Limits</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Hitting monthly audit limits</li>
                    <li>• Need more keyword tracking</li>
                    <li>• Want faster crawl speeds</li>
                    <li>• Require advanced reporting</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-6 h-6 text-blue-400" />
                    <h3 className="text-white font-semibold">Advanced Features</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Need competitor analysis</li>
                    <li>• Want AI assistant access</li>
                    <li>• Require API access</li>
                    <li>• Need priority support</li>
                  </ul>
                </div>
              </div>

              {/* Plan Comparison */}
              <h3 className="text-2xl font-bold text-white mb-6">Plan comparison</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left text-gray-400 font-medium py-3 px-4">Feature</th>
                        <th className="text-center text-gray-400 font-medium py-3 px-4">Free</th>
                        <th className="text-center text-gray-400 font-medium py-3 px-4">Pro</th>
                        <th className="text-center text-gray-400 font-medium py-3 px-4">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700">
                        <td className="py-3 px-4 text-gray-300">Monthly audits</td>
                        <td className="text-center py-3 px-4 text-gray-400">3</td>
                        <td className="text-center py-3 px-4 text-green-400">100</td>
                        <td className="text-center py-3 px-4 text-blue-400">Unlimited</td>
                      </tr>
                      <tr className="border-b border-slate-700">
                        <td className="py-3 px-4 text-gray-300">Keyword tracking</td>
                        <td className="text-center py-3 px-4 text-gray-400">10</td>
                        <td className="text-center py-3 px-4 text-green-400">500</td>
                        <td className="text-center py-3 px-4 text-blue-400">Unlimited</td>
                      </tr>
                      <tr className="border-b border-slate-700">
                        <td className="py-3 px-4 text-gray-300">Competitor analysis</td>
                        <td className="text-center py-3 px-4 text-red-400">✗</td>
                        <td className="text-center py-3 px-4 text-green-400">✓</td>
                        <td className="text-center py-3 px-4 text-blue-400">✓</td>
                      </tr>
                      <tr className="border-b border-slate-700">
                        <td className="py-3 px-4 text-gray-300">AI assistant</td>
                        <td className="text-center py-3 px-4 text-red-400">✗</td>
                        <td className="text-center py-3 px-4 text-green-400">✓</td>
                        <td className="text-center py-3 px-4 text-blue-400">✓</td>
                      </tr>
                      <tr className="border-b border-slate-700">
                        <td className="py-3 px-4 text-gray-300">API access</td>
                        <td className="text-center py-3 px-4 text-red-400">✗</td>
                        <td className="text-center py-3 px-4 text-red-400">✗</td>
                        <td className="text-center py-3 px-4 text-blue-400">✓</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-300">Priority support</td>
                        <td className="text-center py-3 px-4 text-red-400">✗</td>
                        <td className="text-center py-3 px-4 text-green-400">✓</td>
                        <td className="text-center py-3 px-4 text-blue-400">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* How to Upgrade */}
              <h3 className="text-2xl font-bold text-white mb-6">How to upgrade your plan</h3>

              <div className="space-y-8">

                {/* Step 1 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Access billing settings</h3>
                      <p className="text-gray-300 mb-4">
                        Navigate to your account settings and click on "Billing & Plans" or visit the pricing page directly.
                        You'll see your current plan and available upgrade options.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-gray-300 text-sm">
                          <strong>Dashboard:</strong> Settings → Billing & Plans<br />
                          <strong>Direct link:</strong> <Link href="/pricing" className="text-blue-400 hover:text-blue-300">aiseoturbo.com/pricing</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Choose your new plan</h3>
                      <p className="text-gray-300 mb-4">
                        Review the available plans and select the one that best fits your needs. You can compare features
                        and see exactly what you'll gain with each upgrade.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                          <div className="text-green-400 font-medium">Pro Plan</div>
                          <div className="text-gray-400 text-sm">$29/month</div>
                          <div className="text-gray-500 text-xs">Most popular</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                          <div className="text-blue-400 font-medium">Pro+ Plan</div>
                          <div className="text-gray-400 text-sm">$59/month</div>
                          <div className="text-gray-500 text-xs">Advanced features</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                          <div className="text-purple-400 font-medium">Enterprise</div>
                          <div className="text-gray-400 text-sm">Custom</div>
                          <div className="text-gray-500 text-xs">Full features</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Complete payment</h3>
                      <p className="text-gray-300 mb-4">
                        Enter your payment information and complete the upgrade. Upgrades are processed instantly,
                        and you'll have immediate access to all new features and higher limits.
                      </p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-medium">Instant activation</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          No waiting period - start using upgraded features immediately after payment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Billing Information */}
              <h3 className="text-2xl font-bold text-white mb-6">Billing and pricing details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-purple-400" />
                    Payment Methods
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Credit/Debit cards</li>
                    <li>• PayPal</li>
                    <li>• Bank transfers (Enterprise)</li>
                    <li>• All major cards accepted</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Billing Cycle
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Monthly or annual billing</li>
                    <li>• 20% discount on annual plans</li>
                    <li>• Prorated upgrades</li>
                    <li>• No setup fees</li>
                  </ul>
                </div>
              </div>

              {/* Money Back Guarantee */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Crown className="w-8 h-8 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-green-400 text-lg font-semibold mb-2">30-Day Money Back Guarantee</h3>
                    <p className="text-gray-300 mb-3">
                      Not satisfied with your upgrade? Get a full refund within 30 days, no questions asked.
                      We're confident you'll love the additional power and features.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Full refund available within 30 days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Help Deciding */}
              <h3 className="text-2xl font-bold text-white mb-6">Need help choosing the right plan?</h3>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
                <p className="text-gray-300 mb-4">
                  Not sure which plan is right for you? Our team can help you choose the perfect plan based on your specific needs and goals.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contact Sales Team
                  </Link>
                  <Link
                    href="/pricing"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Compare All Plans
                  </Link>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Ready to upgrade?</h3>
                <p className="text-gray-300 mb-4">
                  Unlock more SEO power with advanced features, higher limits, and priority support.
                  Your upgrade is just a few clicks away.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/pricing"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    View Pricing Plans
                    <ArrowRight className="w-4 h-4 inline ml-2" />
                  </Link>
                  <Link
                    href="/help/billing/payment-methods"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Learn About Payments
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
