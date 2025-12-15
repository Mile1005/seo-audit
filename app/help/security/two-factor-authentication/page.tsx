"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Shield,
  Smartphone,
  Key,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function TwoFactorAuthPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Two-Factor Authentication</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Add an extra layer of security to your AI SEO Turbo account with two-factor
              authentication (2FA) using authenticator apps or SMS.
            </p>
          </div>

          {/* Why 2FA */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Why Enable Two-Factor Authentication?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Enhanced Security</h3>
                  <p className="text-gray-600">
                    Protects your account even if your password is compromised. Requires both
                    something you know (password) and something you have (phone/authenticator).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Protection</h3>
                  <p className="text-gray-600">
                    Prevents unauthorized access to your SEO data, audit history, and billing
                    information.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Setup Methods */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available 2FA Methods</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Smartphone className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Authenticator App</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Use apps like Google Authenticator, Authy, or Microsoft Authenticator to generate
                  time-based codes.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span>Most secure option</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span>Works without cell service</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span>Backup codes available</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Key className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">SMS Authentication</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Receive verification codes via text message to your registered phone number.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span>Easy to set up</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span>Works on any phone</span>
                  </div>
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-orange-600 mr-2" />
                    <span>Requires cell service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Setup Steps */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Enable 2FA</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Go to Account Settings
                  </h3>
                  <p className="text-gray-600">
                    Navigate to Account → Security → Two-Factor Authentication.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Method</h3>
                  <p className="text-gray-600">Select authenticator app or SMS verification.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Scan QR Code or Enter Code
                  </h3>
                  <p className="text-gray-600">
                    For apps: scan the QR code. For SMS: enter your phone number.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Verify and Save Backup Codes
                  </h3>
                  <p className="text-gray-600">
                    Enter the verification code and save your backup codes securely.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Backup Codes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4">
              <Key className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                  Important: Save Your Backup Codes
                </h3>
                <p className="text-yellow-800 mb-3">
                  When you enable 2FA, you'll receive backup codes. These are crucial for account
                  recovery if you lose access to your authenticator app or phone.
                </p>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Store backup codes in a secure password manager</li>
                  <li>• Print them out and keep them in a safe place</li>
                  <li>• Never share them with anyone</li>
                  <li>• Generate new codes if you suspect they've been compromised</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Related Security Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/help/security"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Security & Privacy</h3>
                <p className="text-sm text-gray-600">Overview of security features</p>
              </Link>
              <Link
                href="/help/security/best-practices"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Security Best Practices</h3>
                <p className="text-sm text-gray-600">Keep your account secure</p>
              </Link>
              <Link
                href="/contact"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <ArrowRight className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Security Support</h3>
                <p className="text-sm text-gray-600">Get help with security</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
