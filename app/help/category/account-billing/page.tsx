"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
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
    title: "Cancellation and refunds",
    href: "/help/billing/cancellation",
    time: "5 min",
    description: "Information about canceling subscriptions and refund policies.",
    icon: BookOpen
  }
]

export default function AccountBillingCategoryPage() {
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
              <span className="text-white">Account & Billing</span>
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-3">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-purple-400 text-sm font-medium">Category</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Account & Billing
                  </h1>
                </div>
              </div>

              <h2 className="text-xl text-gray-400 mb-8">
                Manage subscriptions, payments, and account settings.
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

        {/* SEO Content Section */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* Main Intro */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Master Your AI SEO Turbo Account & Billing</h2>
                <p className="text-gray-300 text-lg">
                  Managing your AI SEO Turbo account and billing doesn't have to be complicated. Our comprehensive billing system
                  is designed to be transparent, flexible, and user-friendly, whether you're a freelancer, agency, or enterprise team.
                </p>
              </div>

              {/* Pricing Structure */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Understanding Our Pricing Structure</h3>
                <p className="text-gray-300 mb-6">
                  AI SEO Turbo offers flexible pricing plans designed to scale with your business needs. From individual freelancers
                  to enterprise teams, we provide the right tools at the right price point.
                </p>

                <div className="bg-gradient-to-r from-purple-600/10 to-violet-600/10 border border-purple-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    💳 Plan Types and Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <h5 className="text-white font-semibold mb-2">🆓 Free Plan</h5>
                      <p className="text-gray-300 text-sm">Perfect for trying our tools with 3 audits per month and basic features</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <h5 className="text-white font-semibold mb-2">⭐ Pro Plan ($49/month)</h5>
                      <p className="text-gray-300 text-sm">Unlimited audits, advanced features, and priority support</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <h5 className="text-white font-semibold mb-2">🏢 Agency Plan ($149/month)</h5>
                      <p className="text-gray-300 text-sm">Team collaboration, white-label reporting, and API access</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <h5 className="text-white font-semibold mb-2">🚀 Enterprise Plan</h5>
                      <p className="text-gray-300 text-sm">Custom solutions with dedicated support and advanced integrations</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing & Payments */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Billing Cycles and Payment Options</h3>
                <p className="text-gray-300 mb-6">
                  We offer flexible billing options to match your business preferences and cash flow needs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-5">
                    <h4 className="text-blue-300 font-semibold mb-3 flex items-center gap-2">💳 Payment Methods</h4>
                    <ul className="space-y-2">
                      <li className="text-gray-300 text-sm">✓ Credit Cards (Visa, MC, Amex, Discover)</li>
                      <li className="text-gray-300 text-sm">✓ PayPal secure payments</li>
                      <li className="text-gray-300 text-sm">✓ Bank Transfers (ACH & Wire)</li>
                      <li className="text-gray-300 text-sm">✓ Digital Wallets (Apple Pay, Google Pay)</li>
                    </ul>
                  </div>
                  <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-5">
                    <h4 className="text-emerald-300 font-semibold mb-3 flex items-center gap-2">📅 Billing Cycles</h4>
                    <ul className="space-y-2">
                      <li className="text-gray-300 text-sm">✓ Monthly - No long-term commitment</li>
                      <li className="text-gray-300 text-sm">✓ Annual - Save 20% with prepayment</li>
                      <li className="text-gray-300 text-sm">✓ Quarterly - Balance flexibility and savings</li>
                      <li className="text-gray-300 text-sm">✓ Custom - Enterprise billing options</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Subscription Management */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Managing Your Subscription</h3>
                <p className="text-gray-300 mb-6">
                  Our dashboard makes it easy to manage your subscription, update payment methods, and monitor usage.
                </p>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">🎛️ Subscription Management Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex gap-3">
                      <span className="text-indigo-400 font-bold min-w-fit">→</span>
                      <p className="text-gray-300"><strong>Plan Upgrades:</strong> Instantly upgrade to access more features</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-indigo-400 font-bold min-w-fit">→</span>
                      <p className="text-gray-300"><strong>Downgrades:</strong> Flexible downgrades with prorated billing</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-indigo-400 font-bold min-w-fit">→</span>
                      <p className="text-gray-300"><strong>Usage Monitoring:</strong> Real-time tracking of your usage</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-indigo-400 font-bold min-w-fit">→</span>
                      <p className="text-gray-300"><strong>Billing History:</strong> Complete invoice history with PDFs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Understanding */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Understanding Your Invoice</h3>
                <p className="text-gray-300 mb-6">
                  Our invoices are designed to be clear and detailed, helping you understand exactly what you're paying for.
                </p>

                <div className="bg-orange-600/10 border border-orange-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    📄 Invoice Breakdown
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-orange-400">•</span>
                      <p className="text-gray-300"><strong>Base Subscription:</strong> Your plan's monthly or annual fee</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-400">•</span>
                      <p className="text-gray-300"><strong>Overage Charges:</strong> Additional fees for usage beyond limits</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-400">•</span>
                      <p className="text-gray-300"><strong>Add-on Services:</strong> Custom audits, priority support, features</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-400">•</span>
                      <p className="text-gray-300"><strong>Taxes:</strong> Applicable sales tax based on your location</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-400">•</span>
                      <p className="text-gray-300"><strong>Discounts:</strong> Annual savings, promotional credits, bonuses</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Security & Trust */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Payment Security and Trust</h3>
                <p className="text-gray-300 mb-6">
                  Your payment information is protected by industry-leading security measures and trusted payment processors.
                </p>

                <div className="bg-gradient-to-r from-red-600/10 to-pink-600/10 border border-red-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🔒 Security Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex gap-2">
                      <span className="text-red-400">✓</span>
                      <p className="text-gray-300"><strong>PCI Compliance:</strong> PCI DSS compliant systems</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-red-400">✓</span>
                      <p className="text-gray-300"><strong>SSL Encryption:</strong> 256-bit encryption</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-red-400">✓</span>
                      <p className="text-gray-300"><strong>Fraud Protection:</strong> Advanced detection systems</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-red-400">✓</span>
                      <p className="text-gray-300"><strong>Data Privacy:</strong> Payment info never stored</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancellation & Refunds */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Cancellation and Refund Policy</h3>
                <p className="text-gray-300 mb-6">
                  We want you to be completely satisfied with AI SEO Turbo. Our cancellation and refund policies are designed
                  to be fair and customer-friendly.
                </p>

                <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    ✅ Refund Policy
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-emerald-400">→</span>
                      <p className="text-gray-300"><strong>30-Day Guarantee:</strong> Full refund within 30 days of signup</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-400">→</span>
                      <p className="text-gray-300"><strong>Pro-Rated Refunds:</strong> Partial refunds for mid-cycle cancellations</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-400">→</span>
                      <p className="text-gray-300"><strong>Account Credits:</strong> Credits for service issues or disputes</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-400">→</span>
                      <p className="text-gray-300"><strong>Flexible Terms:</strong> No contracts or cancellation fees</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Getting Help with Billing</h3>
                <p className="text-gray-300 mb-6">
                  Our billing support team is available to help with any questions or issues you may encounter.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">💬</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">24/7 Chat Support</h4>
                      <p className="text-gray-300 text-sm">Instant help for billing questions</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">📧</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Email Support</h4>
                      <p className="text-gray-300 text-sm">Detailed assistance for complex issues</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">📚</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Knowledge Base</h4>
                      <p className="text-gray-300 text-sm">Self-service articles and guides</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">☎️</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Phone Support</h4>
                      <p className="text-gray-300 text-sm">Direct support for enterprise customers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enterprise */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Enterprise Billing Solutions</h3>
                <p className="text-gray-300 mb-6">
                  For large organizations and agencies, we offer customized billing solutions and enterprise agreements.
                </p>

                <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🏆 Enterprise Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex gap-2">
                      <span className="text-indigo-400">⭐</span>
                      <p className="text-gray-300"><strong>Custom Contracts:</strong> Tailored agreements</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-indigo-400">⭐</span>
                      <p className="text-gray-300"><strong>Volume Discounts:</strong> Reduced rates</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-indigo-400">⭐</span>
                      <p className="text-gray-300"><strong>Dedicated Support:</strong> Account managers</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-indigo-400">⭐</span>
                      <p className="text-gray-300"><strong>Custom Integrations:</strong> Bespoke solutions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Closing CTA */}
              <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700/50">
                <h3 className="text-2xl font-bold text-white mb-4">Making the Most of Your AI SEO Turbo Investment</h3>
                <p className="text-gray-300 mb-4">
                  Understanding your billing and account management options helps you maximize the value you get from AI SEO Turbo.
                  Whether you're just getting started or managing a team of SEO professionals, our flexible pricing and comprehensive
                  support ensure you have the tools you need to succeed.
                </p>
                <p className="text-gray-300">
                  Ready to optimize your SEO workflow? Explore our detailed guides below or contact our billing team if you have
                  any questions about your account or subscription.
                </p>
              </div>
            </div>
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
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-2 flex-shrink-0">
                          <article.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
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
                        <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-purple-400 transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Related Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Related Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/help/category/getting-started"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-green-400 transition-colors">Getting Started</div>
                    <div className="text-gray-400 text-sm">Learn the basics and set up your account</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-green-400 transition-colors" />
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
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 bg-purple-500/10 border border-purple-500/20 rounded-xl p-8 text-center"
            >
              <h3 className="text-white text-xl font-bold mb-4">Billing questions?</h3>
              <p className="text-gray-400 mb-6">
                Need help with billing, payments, or account management? Our team is here to assist.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/contact"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Contact Billing Support
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
