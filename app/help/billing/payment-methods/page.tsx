"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CreditCard, Shield, Lock, DollarSign, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function PaymentMethodsPage() {
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
              <span className="text-white">Payment methods</span>
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-green-400 text-sm font-medium">Account & Billing</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Payment methods
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
                  <Shield className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">Secure payments</h2>
                    <p className="text-gray-300 mb-0">
                      We accept multiple secure payment methods to make billing as convenient as possible.
                      All transactions are encrypted and processed through PCI-compliant gateways.
                    </p>
                  </div>
                </div>
              </div>

              {/* Accepted Payment Methods */}
              <h2 className="text-2xl font-bold text-white mb-6">Accepted payment methods</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                {/* Credit/Debit Cards */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-6 h-6 text-blue-400" />
                    <h3 className="text-white font-semibold">Credit & Debit Cards</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Visa, Mastercard, American Express</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Discover, JCB, Diners Club</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Instant processing</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Automatic billing</span>
                    </div>
                  </div>
                </div>

                {/* PayPal */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-6 h-6 text-blue-500" />
                    <h3 className="text-white font-semibold">PayPal</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>PayPal account required</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Buy Now, Pay Later options</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Buyer protection</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Easy recurring payments</span>
                    </div>
                  </div>
                </div>

                {/* Bank Transfer */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <RefreshCw className="w-6 h-6 text-purple-400" />
                    <h3 className="text-white font-semibold">Bank Transfer (ACH)</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Available for Enterprise plans</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Direct bank account debit</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Lower processing fees</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>3-5 business days processing</span>
                    </div>
                  </div>
                </div>

                {/* Wire Transfer */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-6 h-6 text-green-400" />
                    <h3 className="text-white font-semibold">Wire Transfer</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Enterprise customers only</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>International transfers</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Highest security level</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Contact sales for details</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* How to Add Payment Method */}
              <h3 className="text-2xl font-bold text-white mb-6">Adding a payment method</h3>

              <div className="space-y-6 mb-8">

                {/* Step 1 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Access billing settings</h3>
                      <p className="text-gray-300 mb-4">
                        Go to your account settings and navigate to the "Billing & Payment" section.
                        You'll see your current payment methods and options to add new ones.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-gray-300 text-sm">
                          <strong>Dashboard:</strong> Settings → Billing & Payment → Payment Methods
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Choose payment method</h3>
                      <p className="text-gray-300 mb-4">
                        Select your preferred payment method from the available options. For cards,
                        you'll need the card number, expiration date, CVV, and billing address.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-green-400 font-medium mb-1">Required for Cards:</div>
                          <ul className="text-gray-400 text-sm space-y-1">
                            <li>• Card number</li>
                            <li>• Expiration date</li>
                            <li>• CVV code</li>
                            <li>• Billing address</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-blue-400 font-medium mb-1">Required for PayPal:</div>
                          <ul className="text-gray-400 text-sm space-y-1">
                            <li>• PayPal account</li>
                            <li>• Email address</li>
                            <li>• Password</li>
                            <li>• Two-factor code (if enabled)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Verify and save</h3>
                      <p className="text-gray-300 mb-4">
                        Review your information and complete verification. For cards, a small authorization
                        charge may be placed and immediately refunded to verify the card.
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Shield className="w-5 h-5 text-blue-400" />
                          <span className="text-blue-400 font-medium">Security verification</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Authorization charges are typically $1.00 or less and are refunded within 3-5 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Managing Payment Methods */}
              <h3 className="text-2xl font-bold text-white mb-6">Managing payment methods</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Setting Default
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Choose which payment method to use for automatic billing. You can change this at any time.
                  </p>
                  <div className="text-gray-400 text-xs">
                    Settings → Billing → Default Payment Method
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-400" />
                    Removing Methods
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    You can remove payment methods, but you must have at least one valid method on file.
                  </p>
                  <div className="text-gray-400 text-xs">
                    Cannot remove if it's your only payment method
                  </div>
                </div>

              </div>

              {/* Billing Security */}
              <h3 className="text-2xl font-bold text-white mb-6">Security & privacy</h3>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Lock className="w-8 h-8 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-green-400 text-lg font-semibold mb-3">Your payment information is secure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Encryption</h4>
                        <p className="text-gray-300 text-sm">
                          All payment data is encrypted using 256-bit SSL/TLS encryption during transmission and storage.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">PCI Compliance</h4>
                        <p className="text-gray-300 text-sm">
                          We are PCI DSS Level 1 compliant, the highest level of payment card industry security standards.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Tokenization</h4>
                        <p className="text-gray-300 text-sm">
                          Sensitive card data is tokenized and never stored on our servers in readable form.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Regular Audits</h4>
                        <p className="text-gray-300 text-sm">
                          Our payment systems undergo regular security audits and penetration testing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Cycle */}
              <h3 className="text-2xl font-bold text-white mb-6">Billing cycle & timing</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-purple-400 font-semibold mb-2">Monthly</div>
                    <div className="text-gray-300 text-sm">Billed on the same date each month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-semibold mb-2">Annual</div>
                    <div className="text-gray-300 text-sm">Billed annually with 20% discount</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-semibold mb-2">Prorated</div>
                    <div className="text-gray-300 text-sm">Upgrades billed for remaining period</div>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Need help with payments?</h3>
                <p className="text-gray-300 mb-4">
                  Having trouble adding a payment method or questions about billing? Our support team is here to help.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contact Support
                  </Link>
                  <Link
                    href="/help/billing/invoices"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    View Invoices
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
