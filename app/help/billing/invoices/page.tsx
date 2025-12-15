"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  FileText,
  Download,
  CreditCard,
  Calendar,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function InvoicesPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Understanding Your Invoices</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Learn how to read, download, and manage your AI SEO Turbo billing invoices and payment
              history.
            </p>
          </div>

          {/* Invoice Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              What You'll Find on Your Invoice
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Invoice Number</h3>
                <p className="text-sm text-gray-600">Unique identifier for each invoice</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Billing Period</h3>
                <p className="text-sm text-gray-600">Service period covered</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Amount Due</h3>
                <p className="text-sm text-gray-600">Total charges for the period</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Download className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Download PDF</h3>
                <p className="text-sm text-gray-600">Official invoice document</p>
              </div>
            </div>
          </div>

          {/* Invoice Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Invoice Breakdown</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Base Subscription</h3>
                <p className="text-gray-600 mb-3">
                  Your plan's monthly or annual fee. This is the core cost of your AI SEO Turbo
                  subscription.
                </p>
                <div className="bg-blue-50 p-3 rounded text-sm">
                  <strong>Example:</strong> Pro Plan - $49.00/month
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Overage Charges</h3>
                <p className="text-gray-600 mb-3">
                  Additional fees for usage beyond your plan limits, such as extra audits or API
                  calls.
                </p>
                <div className="bg-green-50 p-3 rounded text-sm">
                  <strong>Example:</strong> Extra audits - $0.50 each beyond limit
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Add-on Services</h3>
                <p className="text-gray-600 mb-3">
                  Optional premium features, custom audits, or additional services you may have
                  purchased.
                </p>
                <div className="bg-purple-50 p-3 rounded text-sm">
                  <strong>Example:</strong> Priority support - $25.00
                </div>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Taxes and Fees</h3>
                <p className="text-gray-600 mb-3">
                  Applicable sales tax based on your billing address and any payment processing
                  fees.
                </p>
                <div className="bg-orange-50 p-3 rounded text-sm">
                  <strong>Example:</strong> Sales tax (CA) - 8.25%
                </div>
              </div>
            </div>
          </div>

          {/* How to Access */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              How to Access Your Invoices
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Sign In to Your Account
                  </h3>
                  <p className="text-gray-600">Log in to your AI SEO Turbo dashboard.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Go to Billing Section
                  </h3>
                  <p className="text-gray-600">Navigate to Account → Billing → Invoices.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">View or Download</h3>
                  <p className="text-gray-600">
                    Click on any invoice to view details or download as PDF.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4">
              <CreditCard className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Payment Status Indicators
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-800 font-medium">Paid</span>
                    <span className="text-green-700 text-sm">
                      - Invoice has been successfully paid
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-green-800 font-medium">Pending</span>
                    <span className="text-green-700 text-sm">- Payment is being processed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-green-800 font-medium">Overdue</span>
                    <span className="text-green-700 text-sm">- Payment is past due date</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Related Billing Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/help/billing"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Account & Billing</h3>
                <p className="text-sm text-gray-600">Manage your subscription</p>
              </Link>
              <Link
                href="/help/billing/payment-methods"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Payment Methods</h3>
                <p className="text-sm text-gray-600">Update billing information</p>
              </Link>
              <Link
                href="/contact"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <ArrowRight className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Billing Support</h3>
                <p className="text-sm text-gray-600">Get help with invoices</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
