"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, Shield, Lock, Eye, FileText, Key, AlertTriangle, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function SecurityOverviewPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.aiseoturbo.com' },
            { name: 'Help', url: 'https://www.aiseoturbo.com/help' },
            { name: 'Security & Privacy', url: 'https://www.aiseoturbo.com/help/security' }
          ]}
        />

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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-indigo-400 text-sm font-medium">Security & Privacy</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Security & Privacy Guide
                  </h1>
                </div>
              </div>

              <p className="text-xl text-gray-400 mb-8">
                Learn about our security measures, privacy policies, data protection practices,
                and how we keep your information safe and compliant.
              </p>

              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Written by AI SEO Turbo Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: March 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* Introduction */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Your Security & Privacy Matter</h2>
                <p className="text-gray-300 text-lg">
                  At AI SEO Turbo, security and privacy are fundamental to everything we do. We employ
                  industry-leading security measures and comply with global privacy regulations to protect
                  your data and ensure your trust.
                </p>
              </div>

              {/* Security Topics */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Security & Privacy Topics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link
                    href="/help/security/two-factor-authentication"
                    className="group bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3 flex-shrink-0">
                        <Key className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Add an extra layer of security to your account with 2FA. Learn how to set it up
                          and manage your security preferences.
                        </p>
                        <span className="text-blue-400 text-sm group-hover:text-blue-300 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/help/security/privacy"
                    className="group bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-green-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3 flex-shrink-0">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">
                          Privacy Settings
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Control your privacy preferences, manage data sharing settings, and understand
                          how your information is used and protected.
                        </p>
                        <span className="text-green-400 text-sm group-hover:text-green-300 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/help/security/best-practices"
                    className="group bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-3 flex-shrink-0">
                        <ShieldCheck className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                          Security Best Practices
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Learn essential security practices for keeping your account safe, including
                          password management and account protection tips.
                        </p>
                        <span className="text-purple-400 text-sm group-hover:text-purple-300 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/help/security/gdpr"
                    className="group bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-3 flex-shrink-0">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors">
                          GDPR Compliance
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Understanding your rights under GDPR, how we comply with data protection regulations,
                          and how to manage your personal data.
                        </p>
                        <span className="text-orange-400 text-sm group-hover:text-orange-300 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Security Features */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Our Security Measures</h3>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-green-400" />
                      Data Encryption
                    </h4>
                    <p className="text-gray-300 mb-4">
                      All data is encrypted in transit and at rest using industry-standard encryption protocols.
                      Your sensitive information is always protected.
                    </p>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-400" />
                      Regular Security Audits
                    </h4>
                    <p className="text-gray-300 mb-4">
                      We conduct regular security audits and penetration testing to identify and address
                      potential vulnerabilities before they can be exploited.
                    </p>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-400" />
                      Compliance & Certifications
                    </h4>
                    <p className="text-gray-300 mb-4">
                      We maintain compliance with SOC 2, GDPR, CCPA, and other global privacy and security standards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Security Actions */}
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Quick Security Actions</h3>
                <p className="text-gray-300 mb-6">
                  Take immediate steps to secure your account and protect your privacy:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  >
                    <Key className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                    <span className="text-gray-300 group-hover:text-white">Enable Two-Factor Authentication</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  >
                    <Lock className="w-5 h-5 text-green-400 group-hover:text-green-300" />
                    <span className="text-gray-300 group-hover:text-white">Review Privacy Settings</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  >
                    <AlertTriangle className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
                    <span className="text-gray-300 group-hover:text-white">Change Password</span>
                  </Link>
                  <Link
                    href="/privacy"
                    className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  >
                    <FileText className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                    <span className="text-gray-300 group-hover:text-white">Review Privacy Policy</span>
                  </Link>
                </div>
              </div>

              {/* Data Protection */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">How We Protect Your Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-4 mx-auto mb-4">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Encryption</h4>
                    <p className="text-gray-300 text-sm">End-to-end encryption for all data transmission and storage</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-4 mx-auto mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Access Control</h4>
                    <p className="text-gray-300 text-sm">Strict access controls and regular security monitoring</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 p-4 mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Compliance</h4>
                    <p className="text-gray-300 text-sm">Regular audits and compliance with global standards</p>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Security Concerns?</h3>
                  <p className="text-gray-300 mb-6">
                    If you have questions about security, privacy, or suspect any unusual activity on your account,
                    our security team is here to help immediately.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                      Contact Security Team
                    </Link>
                    <Link
                      href="/help/troubleshooting"
                      className="inline-flex items-center justify-center px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                    >
                      Security FAQ
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}