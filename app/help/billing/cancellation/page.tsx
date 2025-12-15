"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  AlertTriangle,
  MessageSquare,
  CreditCard,
  Calendar,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function CancellationPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Account Cancellation & Refunds
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Learn about our cancellation policy, refund process, and how to properly close your AI
              SEO Turbo account when needed.
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Before You Cancel</h3>
                <p className="text-amber-800 mb-3">
                  We're sorry to see you go! Before canceling, consider pausing your subscription
                  instead. This preserves your data and allows you to resume anytime.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/help/billing"
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Pause Subscription Instead
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-white border border-amber-300 text-amber-700 hover:bg-amber-50 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contact Support First
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Cancellation Options */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cancellation Options</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-green-200 bg-green-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">Pause Subscription</h3>
                </div>
                <p className="text-green-800 mb-4">
                  Temporarily suspend your subscription while keeping all your data and settings
                  intact.
                </p>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• No charges during pause period</li>
                  <li>• Resume anytime without setup</li>
                  <li>• Data preserved for up to 1 year</li>
                  <li>• Access to billing history</li>
                </ul>
              </div>

              <div className="border border-red-200 bg-red-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-red-900">Cancel Subscription</h3>
                </div>
                <p className="text-red-800 mb-4">
                  Permanently end your subscription and close your account.
                </p>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Immediate access termination</li>
                  <li>• Data deletion after 30 days</li>
                  <li>• Refund eligibility depends on timing</li>
                  <li>• Cannot be undone</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Cancel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              How to Cancel Your Account
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
                  <p className="text-gray-600">
                    Access your dashboard and navigate to account settings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Go to Billing Settings
                  </h3>
                  <p className="text-gray-600">
                    Find the "Billing & Subscription" section in your account settings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Choose Cancellation Option
                  </h3>
                  <p className="text-gray-600">
                    Select between pausing or permanently canceling your subscription.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Cancellation</h3>
                  <p className="text-gray-600">
                    Review the terms and confirm your cancellation decision.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Refund Policy</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  30-Day Money-Back Guarantee
                </h3>
                <p className="text-gray-600 mb-3">
                  If you're not satisfied within the first 30 days, we'll provide a full refund. No
                  questions asked, no hassle.
                </p>
                <div className="bg-green-50 p-3 rounded text-sm">
                  <strong>Eligibility:</strong> Must be within 30 days of first payment
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Prorated Refunds</h3>
                <p className="text-gray-600 mb-3">
                  For cancellations after the 30-day period, we offer prorated refunds based on
                  unused service time.
                </p>
                <div className="bg-blue-50 p-3 rounded text-sm">
                  <strong>Example:</strong> Cancel mid-month = refund for remaining days
                </div>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Refund Scenarios</h3>
                <p className="text-gray-600 mb-3">
                  Refunds are not available for certain situations including account violations,
                  excessive usage, or after the annual billing period.
                </p>
                <div className="bg-orange-50 p-3 rounded text-sm">
                  <strong>Note:</strong> Contact support for case-by-case review
                </div>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">What Happens to Your Data</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Immediate</h3>
                <p className="text-sm text-gray-600">Account access terminated</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">30 Days</h3>
                <p className="text-sm text-gray-600">Data available for recovery</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">31+ Days</h3>
                <p className="text-sm text-gray-600">Permanent data deletion</p>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <MessageSquare className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Need Help with Cancellation?
                </h3>
                <p className="text-blue-800 mb-4">
                  Our support team is here to help you through the cancellation process. We can also
                  discuss alternatives or answer any questions you have.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Contact Support
                  </Link>
                  <Link
                    href="/help/billing"
                    className="bg-white border border-blue-300 text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Billing Help
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
