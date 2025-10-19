"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, FileText, Download, Mail, Calendar, DollarSign, CheckCircle, AlertCircle, Eye } from 'lucide-react'
import Link from 'next/link'

export default function InvoicesPage() {
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
              <span className="text-white">Invoices</span>
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">Account & Billing</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Invoices
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
                  <FileText className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">Invoice management</h2>
                    <p className="text-gray-300 mb-0">
                      Access, download, and manage all your billing invoices from your account dashboard.
                      Invoices are available in PDF format and include detailed billing information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Accessing Invoices */}
              <h2 className="text-2xl font-bold text-white mb-6">Accessing your invoices</h2>

              <div className="space-y-6 mb-8">

                {/* Step 1 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Go to billing section</h3>
                      <p className="text-gray-300 mb-4">
                        Navigate to your account settings and click on "Billing & Invoices" or "Payment History".
                        This section contains all your billing activity and invoice downloads.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-gray-300 text-sm">
                          <strong>Dashboard:</strong> Settings → Billing → Invoices & History
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Browse invoice history</h3>
                      <p className="text-gray-300 mb-4">
                        You'll see a chronological list of all your invoices with dates, amounts, and status.
                        Click on any invoice to view details or download the PDF version.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                          <div className="text-green-400 font-medium">Paid</div>
                          <div className="text-gray-400 text-sm">Successfully processed</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                          <div className="text-yellow-400 font-medium">Pending</div>
                          <div className="text-gray-400 text-sm">Processing payment</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                          <div className="text-red-400 font-medium">Failed</div>
                          <div className="text-gray-400 text-sm">Payment declined</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Download or email</h3>
                      <p className="text-gray-300 mb-4">
                        Download invoices as PDF files or request them to be emailed to your registered email address.
                        All invoices are automatically saved to your account for future reference.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <div className="bg-slate-900/50 rounded-lg p-3 flex items-center gap-2">
                          <Download className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300 text-sm">PDF Download</span>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">Email Invoice</span>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3 flex items-center gap-2">
                          <Eye className="w-4 h-4 text-purple-400" />
                          <span className="text-gray-300 text-sm">View Online</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Invoice Information */}
              <h3 className="text-2xl font-bold text-white mb-6">What invoices include</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    Invoice Details
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Invoice number and date</li>
                    <li>• Billing period</li>
                    <li>• Plan details and pricing</li>
                    <li>• Tax information (if applicable)</li>
                    <li>• Payment method used</li>
                    <li>• Company information</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    Billing Breakdown
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Base plan cost</li>
                    <li>• Add-on charges</li>
                    <li>• Prorated amounts</li>
                    <li>• Discounts applied</li>
                    <li>• Tax calculations</li>
                    <li>• Total amount due</li>
                  </ul>
                </div>

              </div>

              {/* Invoice Retention */}
              <h3 className="text-2xl font-bold text-white mb-6">Invoice retention & availability</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-2">7</div>
                    <div className="text-gray-300 text-sm mb-1">Years</div>
                    <div className="text-gray-400 text-xs">Invoice retention period</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-2">PDF</div>
                    <div className="text-gray-300 text-sm mb-1">Format</div>
                    <div className="text-gray-400 text-xs">Downloadable format</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-2">24/7</div>
                    <div className="text-gray-300 text-sm mb-1">Access</div>
                    <div className="text-gray-400 text-xs">Always available</div>
                  </div>
                </div>
              </div>

              {/* Automatic Invoicing */}
              <h3 className="text-2xl font-bold text-white mb-6">Automatic invoicing</h3>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Calendar className="w-8 h-8 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-green-400 text-lg font-semibold mb-3">Invoices are generated automatically</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Monthly Billing</h4>
                        <p className="text-gray-300 text-sm">
                          Invoices are created on your billing date and emailed automatically.
                          Payment is processed using your default payment method.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Annual Billing</h4>
                        <p className="text-gray-300 text-sm">
                          Annual invoices are generated yearly on your renewal date.
                          You'll receive advance notice before billing occurs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Information */}
              <h3 className="text-2xl font-bold text-white mb-6">Tax information</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">VAT for EU Customers</h4>
                      <p className="text-gray-300 text-sm">
                        Value Added Tax (VAT) is automatically calculated and added to invoices for customers
                        in European Union countries based on your billing address.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">GST for Canadian Customers</h4>
                      <p className="text-gray-300 text-sm">
                        Goods and Services Tax (GST) or Harmonized Sales Tax (HST) is applied based on your province.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Tax Exemptions</h4>
                      <p className="text-gray-300 text-sm">
                        If you qualify for tax exemption, contact our billing team with your tax exemption certificate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Missing Invoice */}
              <h3 className="text-2xl font-bold text-white mb-6">Can't find an invoice?</h3>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-8 h-8 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-yellow-400 text-lg font-semibold mb-3">Common reasons invoices are missing</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white font-medium mb-1">Free Trial Period</h4>
                        <p className="text-gray-300 text-sm">
                          No invoices are generated during your free trial. Billing starts when your trial ends.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Failed Payments</h4>
                        <p className="text-gray-300 text-sm">
                          If a payment fails, the invoice may not be finalized until payment is successfully processed.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Account Changes</h4>
                        <p className="text-gray-300 text-sm">
                          Recent account changes or plan modifications may affect invoice generation timing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Need help with invoices?</h3>
                <p className="text-gray-300 mb-4">
                  Can't find a specific invoice or need a copy sent to a different email address?
                  Our billing support team can assist you.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contact Billing Support
                  </Link>
                  <Link
                    href="/help/billing/payment-methods"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Payment Methods
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
