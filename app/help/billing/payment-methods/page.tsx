"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, CreditCard, Shield, Plus, Edit, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PaymentMethodsPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Managing Payment Methods</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Learn how to add, update, and manage your payment methods securely in your AI SEO
              Turbo account.
            </p>
          </div>

          {/* Payment Methods Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Methods We Accept</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Credit Cards</h3>
                <p className="text-sm text-gray-600">Visa, Mastercard, Amex, Discover</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">PayPal</h3>
                <p className="text-sm text-gray-600">Secure PayPal payments</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Bank Transfer</h3>
                <p className="text-sm text-gray-600">ACH and wire transfers</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <CreditCard className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Digital Wallets</h3>
                <p className="text-sm text-gray-600">Apple Pay, Google Pay</p>
              </div>
            </div>
          </div>

          {/* How to Manage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              How to Manage Your Payment Methods
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Plus className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Adding a Payment Method
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Go to Account → Billing → Payment Methods and click "Add Payment Method". Enter
                    your card details or connect your PayPal account.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Edit className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Updating Payment Information
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Click the edit icon next to any payment method to update card details,
                    expiration date, or billing address.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Removing Payment Methods
                  </h3>
                  <p className="text-gray-600 mb-3">
                    You can remove payment methods that are not set as default. At least one payment
                    method must be on file.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Your Payment Information is Secure
                </h3>
                <p className="text-green-800 mb-3">
                  We use industry-leading encryption and security measures to protect your payment
                  information. We never store full credit card numbers on our servers.
                </p>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• PCI DSS Level 1 compliant</li>
                  <li>• 256-bit SSL encryption</li>
                  <li>• Fraud detection and prevention</li>
                  <li>• Regular security audits</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Related Help Articles</h2>
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
                href="/help/billing/invoices"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Understanding Invoices</h3>
                <p className="text-sm text-gray-600">Read your billing statements</p>
              </Link>
              <Link
                href="/contact"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <ArrowRight className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Billing Support</h3>
                <p className="text-sm text-gray-600">Get help with payments</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
