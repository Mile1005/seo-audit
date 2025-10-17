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
                Manage your subscription, payments, and account settings with detailed guides.
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
            <div className="prose prose-lg prose-invert mx-auto">
              <h2>Master Your AI SEO Turbo Account & Billing</h2>
              <p>
                Managing your AI SEO Turbo account and billing doesn't have to be complicated. Our comprehensive billing system
                is designed to be transparent, flexible, and user-friendly, whether you're a freelancer, agency, or enterprise team.
              </p>

              <h3>Understanding Our Pricing Structure</h3>
              <p>
                AI SEO Turbo offers flexible pricing plans designed to scale with your business needs. From individual freelancers
                to enterprise teams, we provide the right tools at the right price point.
              </p>

              <h4>Plan Types and Features:</h4>
              <ul>
                <li><strong>Free Plan:</strong> Perfect for trying our tools with 3 audits per month and basic features</li>
                <li><strong>Pro Plan ($49/month):</strong> Unlimited audits, advanced features, and priority support</li>
                <li><strong>Agency Plan ($149/month):</strong> Team collaboration, white-label reporting, and API access</li>
                <li><strong>Enterprise Plan:</strong> Custom solutions with dedicated support and advanced integrations</li>
              </ul>

              <h3>Billing Cycles and Payment Options</h3>
              <p>
                We offer flexible billing options to match your business preferences and cash flow needs.
              </p>

              <h4>Payment Methods:</h4>
              <ul>
                <li><strong>Credit Cards:</strong> Visa, MasterCard, American Express, and Discover</li>
                <li><strong>PayPal:</strong> Secure PayPal payments for added protection</li>
                <li><strong>Bank Transfers:</strong> ACH and wire transfers for enterprise customers</li>
                <li><strong>Digital Wallets:</strong> Apple Pay, Google Pay, and other modern payment options</li>
              </ul>

              <h4>Billing Cycles:</h4>
              <ul>
                <li><strong>Monthly Billing:</strong> Pay month-to-month with no long-term commitment</li>
                <li><strong>Annual Billing:</strong> Save 20% with annual prepayment</li>
                <li><strong>Custom Cycles:</strong> Quarterly or custom billing for enterprise accounts</li>
              </ul>

              <h3>Managing Your Subscription</h3>
              <p>
                Our dashboard makes it easy to manage your subscription, update payment methods, and monitor usage.
              </p>

              <h4>Subscription Management Features:</h4>
              <ul>
                <li><strong>Plan Upgrades:</strong> Instantly upgrade to access more features and higher limits</li>
                <li><strong>Downgrades:</strong> Flexible downgrades with prorated billing</li>
                <li><strong>Usage Monitoring:</strong> Real-time tracking of audits, API calls, and feature usage</li>
                <li><strong>Billing History:</strong> Complete invoice history with downloadable PDFs</li>
              </ul>

              <h3>Understanding Your Invoice</h3>
              <p>
                Our invoices are designed to be clear and detailed, helping you understand exactly what you're paying for.
              </p>

              <h4>Invoice Breakdown:</h4>
              <ul>
                <li><strong>Base Subscription:</strong> Your plan's monthly or annual fee</li>
                <li><strong>Overage Charges:</strong> Additional fees for usage beyond plan limits</li>
                <li><strong>Add-on Services:</strong> Custom audits, priority support, or premium features</li>
                <li><strong>Taxes:</strong> Applicable sales tax based on your billing address</li>
                <li><strong>Discounts:</strong> Annual plan savings, promotional credits, or referral bonuses</li>
              </ul>

              <h3>Payment Security and Trust</h3>
              <p>
                Your payment information is protected by industry-leading security measures and trusted payment processors.
              </p>

              <h4>Security Features:</h4>
              <ul>
                <li><strong>PCI Compliance:</strong> All payments processed through PCI DSS compliant systems</li>
                <li><strong>SSL Encryption:</strong> 256-bit SSL encryption for all payment data</li>
                <li><strong>Fraud Protection:</strong> Advanced fraud detection and prevention systems</li>
                <li><strong>Data Privacy:</strong> Payment information never stored on our servers</li>
              </ul>

              <h3>Cancellation and Refund Policy</h3>
              <p>
                We want you to be completely satisfied with AI SEO Turbo. Our cancellation and refund policies are designed
                to be fair and customer-friendly.
              </p>

              <h4>Refund Policy:</h4>
              <ul>
                <li><strong>30-Day Money-Back Guarantee:</strong> Full refund within 30 days of signup</li>
                <li><strong>Pro-Rated Refunds:</strong> Partial refunds for mid-cycle cancellations</li>
                <li><strong>Account Credits:</strong> Credits for service issues or billing disputes</li>
                <li><strong>Flexible Terms:</strong> No long-term contracts or cancellation fees</li>
              </ul>

              <h3>Getting Help with Billing</h3>
              <p>
                Our billing support team is available to help with any questions or issues you may encounter.
              </p>

              <h4>Support Options:</h4>
              <ul>
                <li><strong>24/7 Chat Support:</strong> Instant help for billing questions</li>
                <li><strong>Email Support:</strong> Detailed assistance for complex billing issues</li>
                <li><strong>Knowledge Base:</strong> Self-service articles and troubleshooting guides</li>
                <li><strong>Phone Support:</strong> Direct phone support for enterprise customers</li>
              </ul>

              <h3>Enterprise Billing Solutions</h3>
              <p>
                For large organizations and agencies, we offer customized billing solutions and enterprise agreements.
              </p>

              <h4>Enterprise Features:</h4>
              <ul>
                <li><strong>Custom Contracts:</strong> Tailored agreements for your specific needs</li>
                <li><strong>Volume Discounts:</strong> Reduced rates for high-volume usage</li>
                <li><strong>Dedicated Support:</strong> Priority support with dedicated account managers</li>
                <li><strong>Custom Integrations:</strong> Bespoke integrations and API solutions</li>
              </ul>

              <h2>Making the Most of Your AI SEO Turbo Investment</h2>
              <p>
                Understanding your billing and account management options helps you maximize the value you get from AI SEO Turbo.
                Whether you're just getting started or managing a team of SEO professionals, our flexible pricing and comprehensive
                support ensure you have the tools you need to succeed.
              </p>
              <p>
                Ready to optimize your SEO workflow? Explore our detailed guides below or contact our billing team if you have
                any questions about your account or subscription.
              </p>
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
