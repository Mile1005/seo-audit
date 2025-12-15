"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  FileText,
  Lock,
  Eye,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Scale,
} from "lucide-react";
import Link from "next/link";

export default function GDPRPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">GDPR Compliance Guide</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Complete guide to GDPR compliance for website owners. Learn about data protection
              requirements, user rights, and how to implement privacy-compliant practices.
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <Shield className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Understanding GDPR</h2>
                <p className="text-gray-600">
                  The General Data Protection Regulation (GDPR) is a comprehensive data protection
                  law that governs how personal data of EU residents is collected, processed, and
                  stored. Compliance is mandatory for any website that collects data from EU users,
                  regardless of your location.
                </p>
              </div>
            </div>

            {/* Key Requirements */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Privacy Policy</h3>
                <p className="text-sm text-gray-600">Clear, comprehensive privacy policy</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Lock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Data Security</h3>
                <p className="text-sm text-gray-600">Secure data handling and storage</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <UserCheck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">User Consent</h3>
                <p className="text-sm text-gray-600">Proper consent mechanisms</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Eye className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Data Subject Rights</h3>
                <p className="text-sm text-gray-600">Honor user data rights</p>
              </div>
            </div>
          </div>

          {/* What is Personal Data */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              What Constitutes Personal Data?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                  <h3 className="font-semibold text-green-800 mb-2">Directly Identifiable Data</h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Full name</li>
                    <li>• Email address</li>
                    <li>• Phone number</li>
                    <li>• Physical address</li>
                    <li>• IP address</li>
                    <li>• Social media profiles</li>
                  </ul>
                </div>
                <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <h3 className="font-semibold text-blue-800 mb-2">Online Identifiers</h3>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• Cookies and tracking pixels</li>
                    <li>• Browser fingerprinting</li>
                    <li>• Device information</li>
                    <li>• Location data</li>
                    <li>• Behavioral patterns</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                  <h3 className="font-semibold text-purple-800 mb-2">Sensitive Data</h3>
                  <ul className="space-y-2 text-sm text-purple-700">
                    <li>• Racial/ethnic origin</li>
                    <li>• Political opinions</li>
                    <li>• Religious beliefs</li>
                    <li>• Health information</li>
                    <li>• Sexual orientation</li>
                    <li>• Criminal records</li>
                  </ul>
                </div>
                <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                  <h3 className="font-semibold text-orange-800 mb-2">Business Data</h3>
                  <ul className="space-y-2 text-sm text-orange-700">
                    <li>• Purchase history</li>
                    <li>• Communication preferences</li>
                    <li>• Service usage patterns</li>
                    <li>• Customer feedback</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Basis for Processing */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Legal Basis for Data Processing
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Consent</h3>
                  <p className="text-gray-600 mb-3">
                    The most common legal basis. Users must give clear, affirmative consent for data
                    processing. Consent must be freely given, specific, informed, and easily
                    withdrawn.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-blue-800 font-medium mb-2">Consent Requirements:</h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li>• Separate consent for different processing activities</li>
                      <li>• Easy opt-out mechanisms</li>
                      <li>• No pre-ticked boxes</li>
                      <li>• Clear language (no legal jargon)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Contract</h3>
                  <p className="text-gray-600 mb-3">
                    Processing necessary for performing a contract with the user. This applies to
                    e-commerce sites, SaaS platforms, and service providers.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-green-800 font-medium mb-2">Examples:</h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Processing payment information for purchases</li>
                      <li>• Account creation and management</li>
                      <li>• Order fulfillment and delivery</li>
                      <li>• Customer support communications</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Legitimate Interest</h3>
                  <p className="text-gray-600 mb-3">
                    Processing necessary for your legitimate business interests, provided it doesn't
                    override user privacy rights. Requires careful balancing and transparency.
                  </p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="text-purple-800 font-medium mb-2">When to use:</h4>
                    <ul className="space-y-1 text-sm text-purple-700">
                      <li>• Fraud prevention and security</li>
                      <li>• Direct marketing (with opt-out)</li>
                      <li>• Network and information security</li>
                      <li>• Legal claims and compliance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Obligation</h3>
                  <p className="text-gray-600 mb-3">
                    Processing required by law. This includes tax obligations, employment laws, and
                    other regulatory requirements.
                  </p>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="text-orange-800 font-medium mb-2">Examples:</h4>
                    <ul className="space-y-1 text-sm text-orange-700">
                      <li>• Tax reporting and compliance</li>
                      <li>• Employment law requirements</li>
                      <li>• Financial regulations</li>
                      <li>• Public health and safety laws</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Subject Rights */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Subject Rights</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Right to Information</h3>
                    <p className="text-sm text-gray-600">
                      Users must be informed about data collection and processing purposes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Right of Access</h3>
                    <p className="text-sm text-gray-600">
                      Users can request copies of their personal data you hold.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Right to Rectification</h3>
                    <p className="text-sm text-gray-600">
                      Users can have inaccurate data corrected or incomplete data completed.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Right to Erasure</h3>
                    <p className="text-sm text-gray-600">
                      Users can request deletion of their data ("right to be forgotten").
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Right to Restriction</h3>
                    <p className="text-sm text-gray-600">
                      Users can limit how their data is processed in certain circumstances.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Right to Portability</h3>
                    <p className="text-sm text-gray-600">
                      Users can receive their data in a structured format and transfer it elsewhere.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Right to Object</h3>
                    <p className="text-sm text-gray-600">
                      Users can object to processing based on legitimate interests or direct
                      marketing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Automated Decision Making</h3>
                    <p className="text-sm text-gray-600">
                      Users have rights regarding automated decisions without human intervention.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cookie Compliance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Cookie Compliance & ePrivacy
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Cookie Consent Banner
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Display a clear, prominent cookie consent banner before setting non-essential
                    cookies. Users must be able to accept or reject different categories of cookies.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Required Elements:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Clear description of cookie purposes</li>
                      <li>• Granular consent options (essential, analytics, marketing)</li>
                      <li>• Easy rejection of non-essential cookies</li>
                      <li>• Link to detailed cookie policy</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Cookie Categories</h3>
                  <p className="text-gray-600 mb-3">
                    Classify cookies by purpose and obtain appropriate consent levels for each
                    category.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-green-800 font-medium mb-1">Essential Cookies</div>
                      <div className="text-sm text-green-700">
                        No consent needed - strictly necessary for website function
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-blue-800 font-medium mb-1">Analytics Cookies</div>
                      <div className="text-sm text-blue-700">
                        Consent required - track website usage and performance
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Cookie Policy</h3>
                  <p className="text-gray-600 mb-3">
                    Maintain a comprehensive cookie policy that explains all cookies used on your
                    website, their purposes, and how users can manage their preferences.
                  </p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="text-purple-800 font-medium mb-2">Policy Requirements:</h4>
                    <ul className="space-y-1 text-sm text-purple-700">
                      <li>• List of all cookies and their purposes</li>
                      <li>• Third-party cookie disclosures</li>
                      <li>• Cookie management instructions</li>
                      <li>• Contact information for questions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Steps */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">GDPR Implementation Steps</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Conduct Data Audit</h3>
                  <p className="text-gray-600 mb-3">
                    Map all personal data you collect, process, and store. Identify data sources,
                    processing purposes, and retention periods.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Audit Checklist:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Forms and data collection points</li>
                      <li>• Third-party integrations and tools</li>
                      <li>• Data storage locations and systems</li>
                      <li>• Data sharing and transfer practices</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Update Privacy Policy
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Create or update your privacy policy to include all GDPR-required information.
                    Use clear, plain language that users can easily understand.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-green-800 font-medium mb-2">Required Sections:</h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Data controller identity and contact details</li>
                      <li>• Legal basis for processing</li>
                      <li>• Data retention periods</li>
                      <li>• User rights and how to exercise them</li>
                      <li>• Data sharing and international transfers</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Implement Consent Mechanisms
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Set up proper consent management for cookies and data processing. Ensure users
                    can easily withdraw consent at any time.
                  </p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="text-purple-800 font-medium mb-2">Consent Features:</h4>
                    <ul className="space-y-1 text-sm text-purple-700">
                      <li>• Cookie consent banner</li>
                      <li>• Preference management center</li>
                      <li>• Granular consent options</li>
                      <li>• Consent withdrawal mechanisms</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Establish Data Protection Processes
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Create procedures for handling data subject requests, data breaches, and
                    maintaining compliance records.
                  </p>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <Scale className="w-6 h-6 text-orange-600" />
                    <div>
                      <div className="text-gray-900 font-medium">Data Protection Officer</div>
                      <div className="text-gray-600 text-sm">
                        Consider appointing a DPO for complex operations
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Common Pitfalls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Common GDPR Compliance Pitfalls
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h3 className="font-semibold text-red-800 mb-2">Pre-ticked Consent Boxes</h3>
                  <p className="text-sm text-red-700">
                    Using pre-checked boxes for consent violates GDPR requirements.
                  </p>
                </div>
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h3 className="font-semibold text-red-800 mb-2">Vague Privacy Policies</h3>
                  <p className="text-sm text-red-700">
                    Generic, hard-to-understand privacy policies don't meet transparency
                    requirements.
                  </p>
                </div>
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h3 className="font-semibold text-red-800 mb-2">No Data Subject Rights</h3>
                  <p className="text-sm text-red-700">
                    Failing to honor user requests for data access, deletion, or portability.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <h3 className="font-semibold text-yellow-800 mb-2">Inadequate Security</h3>
                  <p className="text-sm text-yellow-700">
                    Not implementing appropriate technical and organizational security measures.
                  </p>
                </div>
                <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <h3 className="font-semibold text-yellow-800 mb-2">No Breach Notification</h3>
                  <p className="text-sm text-yellow-700">
                    Failing to report data breaches to supervisory authorities within 72 hours.
                  </p>
                </div>
                <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <h3 className="font-semibold text-yellow-800 mb-2">
                    International Data Transfers
                  </h3>
                  <p className="text-sm text-yellow-700">
                    Transferring data to countries without adequate protection without safeguards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Start Your GDPR Compliance Journey
            </h2>
            <p className="text-gray-600 mb-6">
              GDPR compliance is essential for any website handling EU user data. Start with a data
              audit, update your policies, and implement proper consent mechanisms.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/help/security/privacy"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                View Privacy Policy Guide
              </Link>
              <Link
                href="/help/security/best-practices"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Security Best Practices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
