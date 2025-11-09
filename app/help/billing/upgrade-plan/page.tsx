"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, CreditCard, TrendingUp, Zap, Star, Crown, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function UpgradePlanPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Upgrading Your Plan</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Learn how to upgrade your AI SEO Turbo subscription and unlock premium features
              to boost your SEO performance.
            </p>
          </div>

          {/* Plan Comparison */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Plan Comparison</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <User className="w-6 h-6 text-gray-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Free Plan</h3>
                </div>
                <p className="text-gray-600 mb-4">Perfect for getting started with basic SEO audits.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 3 audits per month</li>
                  <li>• Basic SEO analysis</li>
                  <li>• Limited reporting</li>
                </ul>
              </div>

              <div className="border-2 border-blue-500 rounded-lg p-6 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">Popular</span>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Pro Plan - $49/month</h3>
                </div>
                <p className="text-gray-600 mb-4">Advanced features for growing businesses.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Unlimited audits</li>
                  <li>• Advanced analytics</li>
                  <li>• Priority support</li>
                  <li>• API access</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Crown className="w-6 h-6 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Agency Plan - $149/month</h3>
                </div>
                <p className="text-gray-600 mb-4">Complete solution for SEO agencies.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Team collaboration</li>
                  <li>• White-label reports</li>
                  <li>• Advanced integrations</li>
                  <li>• Dedicated support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Upgrade Process */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Upgrade</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign In to Your Account</h3>
                  <p className="text-gray-600">Log in to your AI SEO Turbo dashboard.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Go to Billing Settings</h3>
                  <p className="text-gray-600">Navigate to Account → Billing in the dashboard.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Plan</h3>
                  <p className="text-gray-600">Select the plan that best fits your needs.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Payment</h3>
                  <p className="text-gray-600">Enter your payment information and confirm the upgrade.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Related Help Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/help/account-billing"
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
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Payment Methods</h3>
                <p className="text-sm text-gray-600">Update billing information</p>
              </Link>
              <Link
                href="/contact"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <ArrowRight className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Contact Support</h3>
                <p className="text-sm text-gray-600">Get help with upgrades</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}