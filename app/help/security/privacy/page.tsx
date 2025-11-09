"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, Shield, Eye, EyeOff, Database, Lock, FileText, AlertTriangle, CheckCircle, Settings, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
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
              <Link href="/help/security-privacy" className="text-gray-400 hover:text-white transition-colors">
                Security
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">Privacy settings</span>
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-3">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-purple-400 text-sm font-medium">Security</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Privacy settings
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>8 min read</span>
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
                  <Shield className="w-6 h-6 text-purple-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">Your privacy matters</h2>
                    <p className="text-gray-300 mb-0">
                      Take control of your data and privacy settings. Learn how to manage your personal information,
                      data collection preferences, and privacy controls within our platform.
                    </p>
                  </div>
                </div>
              </div>

              {/* What We Collect */}
              <h2 className="text-2xl font-bold text-white mb-6">What information we collect</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-400" />
                    Account Information
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Email address</li>
                    <li>• Name and profile information</li>
                    <li>• Account preferences</li>
                    <li>• Billing information (processed securely)</li>
                    <li>• Account creation and login history</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-green-400" />
                    Usage Data
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• SEO audit results and reports</li>
                    <li>• Feature usage patterns</li>
                    <li>• Performance metrics</li>
                    <li>• Error logs and troubleshooting data</li>
                    <li>• Device and browser information</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    Website Data
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• URLs you analyze</li>
                    <li>• SEO metrics and scores</li>
                    <li>• Content analysis results</li>
                    <li>• Technical audit findings</li>
                    <li>• Performance test data</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-orange-400" />
                    Technical Data
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• IP addresses (anonymized)</li>
                    <li>• Browser type and version</li>
                    <li>• Operating system</li>
                    <li>• Session duration and activity</li>
                    <li>• Crash reports and diagnostics</li>
                  </ul>
                </div>

              </div>

              {/* Privacy Controls */}
              <h3 className="text-2xl font-bold text-white mb-6">Managing your privacy settings</h3>

              <div className="space-y-6 mb-8">

                {/* Data Collection */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Data collection preferences</h3>
                      <p className="text-gray-300 mb-4">
                        Control what data we collect and how we use it for analytics and improvements.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-blue-400 font-medium mb-2">Analytics & Performance</div>
                          <p className="text-gray-300 text-sm mb-2">
                            Help us improve our service by allowing anonymous usage analytics.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-400">✓ Enabled by default</span>
                            <span className="text-gray-500">• Can be disabled in settings</span>
                          </div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-blue-400 font-medium mb-2">Error Reporting</div>
                          <p className="text-gray-300 text-sm mb-2">
                            Automatically send crash reports to help us fix issues quickly.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-400">✓ Enabled by default</span>
                            <span className="text-gray-500">• Can be disabled in settings</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Retention */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Data retention settings</h3>
                      <p className="text-gray-300 mb-4">
                        Choose how long we keep your audit data and account information.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-purple-400 font-medium mb-2">Audit History</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Default: 1 year</li>
                            <li>• Options: 30 days, 90 days, 1 year</li>
                            <li>• Auto-delete old audits</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-purple-400 font-medium mb-2">Account Data</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Retained while account active</li>
                            <li>• Deleted after account closure</li>
                            <li>• Backup retention: 30 days</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Export */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Export your data</h3>
                      <p className="text-gray-300 mb-4">
                        Download all your personal data and audit history in a portable format.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-green-400 font-medium mb-2">What's included:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Account profile and settings</li>
                            <li>• All audit reports and results</li>
                            <li>• Billing and subscription history</li>
                            <li>• API usage logs</li>
                            <li>• Support ticket history</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-green-400 font-medium mb-2">Export process:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Request export in privacy settings</li>
                            <li>• Processing takes 24-48 hours</li>
                            <li>• Download link sent via email</li>
                            <li>• Link expires after 7 days</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Deletion */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Delete your data</h3>
                      <p className="text-gray-300 mb-4">
                        Permanently remove your account and all associated data from our systems.
                      </p>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <span className="text-red-400 font-medium">Irreversible action</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Account deletion cannot be undone. All data, audits, and history will be permanently removed.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-red-400 font-medium mb-2">Before deleting:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Export your data first</li>
                            <li>• Cancel any active subscriptions</li>
                            <li>• Download important reports</li>
                            <li>• Notify team members if applicable</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Privacy Rights */}
              <h3 className="text-2xl font-bold text-white mb-6">Your privacy rights</h3>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Right to access</h4>
                      <p className="text-gray-300 text-sm">
                        Request a copy of all personal data we hold about you.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Right to rectification</h4>
                      <p className="text-gray-300 text-sm">
                        Correct any inaccurate or incomplete personal information.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Right to erasure</h4>
                      <p className="text-gray-300 text-sm">
                        Request deletion of your personal data under certain conditions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Right to data portability</h4>
                      <p className="text-gray-300 text-sm">
                        Receive your data in a structured, machine-readable format.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Right to object</h4>
                      <p className="text-gray-300 text-sm">
                        Object to processing of your personal data for certain purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <h3 className="text-2xl font-bold text-white mb-6">How we protect your data</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-green-400" />
                    Encryption
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Data encrypted at rest and in transit</li>
                    <li>• AES-256 encryption standard</li>
                    <li>• TLS 1.3 for data transmission</li>
                    <li>• Secure key management</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    Access Controls
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Role-based access permissions</li>
                    <li>• Multi-factor authentication required</li>
                    <li>• Regular access reviews</li>
                    <li>• Principle of least privilege</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-400" />
                    Monitoring
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Continuous security monitoring</li>
                    <li>• Automated threat detection</li>
                    <li>• Regular security audits</li>
                    <li>• Incident response procedures</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-orange-400" />
                    Compliance
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• GDPR compliant data processing</li>
                    <li>• SOC 2 Type II certified</li>
                    <li>• Regular compliance audits</li>
                    <li>• Data processing agreements</li>
                  </ul>
                </div>

              </div>

              {/* Privacy Policy */}
              <h3 className="text-2xl font-bold text-white mb-6">Privacy policy and legal compliance</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-6">

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Our commitment to privacy</h3>
                    <p className="text-gray-300">
                      We are committed to protecting your privacy and complying with all applicable data protection laws.
                      Our privacy practices are designed to give you control over your personal information.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-2">GDPR Compliance</h4>
                      <p className="text-gray-300 text-sm">
                        We comply with the General Data Protection Regulation (GDPR) for EU users,
                        providing comprehensive data rights and transparent processing practices.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">CCPA Compliance</h4>
                      <p className="text-gray-300 text-sm">
                        California users have additional rights under the California Consumer Privacy Act (CCPA),
                        including the right to opt-out of data sales.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="text-blue-400 font-medium mb-2">Full Privacy Policy</div>
                    <p className="text-gray-300 text-sm mb-3">
                      For complete details about our data practices, please read our comprehensive privacy policy.
                    </p>
                    <Link
                      href="/privacy"
                      className="text-blue-400 hover:text-blue-300 text-sm underline"
                    >
                      Read our Privacy Policy →
                    </Link>
                  </div>

                </div>
              </div>

              {/* Contact for Privacy */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Questions about your privacy?</h3>
                <p className="text-gray-300 mb-4">
                  If you have questions about your privacy settings or need help managing your data,
                  our privacy team is here to help.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contact Privacy Team
                  </Link>
                  <Link
                    href="/help/security/gdpr"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    GDPR Information
                  </Link>
                  <Link
                    href="/help/security/two-factor-authentication"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Security Settings
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