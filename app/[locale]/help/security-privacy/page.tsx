"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BookOpen, Shield, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const categoryArticles = [
  {
    title: "Two-factor authentication",
    href: "/help/security/two-factor-authentication",
    time: "7 min",
    description: "Set up 2FA to add an extra layer of security to your account.",
    icon: BookOpen
  },
  {
    title: "Privacy settings",
    href: "/help/security/privacy",
    time: "8 min",
    description: "Control your data, manage privacy preferences, and understand your rights.",
    icon: BookOpen
  },
  {
    title: "GDPR compliance",
    href: "/help/security/gdpr",
    time: "10 min",
    description: "Learn about your data protection rights and how we comply with GDPR.",
    icon: BookOpen
  },
  {
    title: "Security best practices",
    href: "/help/security/best-practices",
    time: "9 min",
    description: "Essential security tips to protect your account and data.",
    icon: BookOpen
  }
]

export default function SecurityPrivacyCategoryPage() {
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
              <span className="text-white">Security & Privacy</span>
            </nav>
          </div>
        </section>

        {/* Category Header */}
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
                  <span className="text-indigo-400 text-sm font-medium">Category</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Security & Privacy
                  </h1>
                </div>
              </div>

              <h2 className="text-xl text-gray-400 mb-8">
                Secure your account with comprehensive security and privacy guides.
              </h2>

              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{categoryArticles.length} articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: March 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* Main Intro */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Security & Privacy: Your Data Protection is Our Top Priority</h2>
                <p className="text-gray-300 text-lg">
                  At AI SEO Turbo, we understand that SEO data contains sensitive business information. That's why we've
                  built our platform with enterprise-grade security and comprehensive privacy protections. Your data is
                  not just stored safely—it's protected by multiple layers of security and governed by strict privacy policies.
                </p>
              </div>

              {/* Security Infrastructure */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Enterprise-Grade Security Infrastructure</h3>
                <p className="text-gray-300 mb-6">
                  Our security infrastructure is designed to protect against modern threats while maintaining the performance
                  and reliability you expect from a professional SEO platform.
                </p>

                <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🏆 Security Certifications
                  </h4>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="text-indigo-400 font-bold min-w-fit">SOC 2 Type II</div>
                      <p className="text-gray-300">Independent audit of our security controls and processes</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-indigo-400 font-bold min-w-fit">ISO 27001</div>
                      <p className="text-gray-300">International standard for information security management</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-indigo-400 font-bold min-w-fit">GDPR</div>
                      <p className="text-gray-300">Full compliance with EU data protection regulations</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-indigo-400 font-bold min-w-fit">CCPA</div>
                      <p className="text-gray-300">Prepared for California Consumer Privacy Act requirements</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-indigo-400 font-bold min-w-fit">PCI DSS Level 1</div>
                      <p className="text-gray-300">Highest level of payment card industry security standards</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Encryption */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Data Encryption and Protection</h3>
                <p className="text-gray-300 mb-6">
                  Every piece of data you store with AI SEO Turbo is protected by multiple layers of encryption and security controls.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5">
                    <h4 className="text-white font-semibold mb-2">🔒 Data at Rest</h4>
                    <p className="text-gray-300 text-sm">AES-256 encryption for all stored data</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5">
                    <h4 className="text-white font-semibold mb-2">🌐 Data in Transit</h4>
                    <p className="text-gray-300 text-sm">TLS 1.3 encryption for all network communications</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5">
                    <h4 className="text-white font-semibold mb-2">💾 Database Encryption</h4>
                    <p className="text-gray-300 text-sm">Transparent data encryption at the database level</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5">
                    <h4 className="text-white font-semibold mb-2">📦 Backup Encryption</h4>
                    <p className="text-gray-300 text-sm">All backups encrypted with unique keys</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5">
                    <h4 className="text-white font-semibold mb-2">🔑 API Security</h4>
                    <p className="text-gray-300 text-sm">OAuth 2.0 and API key authentication with rate limiting</p>
                  </div>
                </div>
              </div>

              {/* Privacy by Design */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Privacy by Design</h3>
                <p className="text-gray-300 mb-6">
                  Privacy isn't an afterthought—it's built into every aspect of our platform from the ground up.
                </p>

                <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    ✨ Privacy-First Features
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold min-w-fit">Data Minimization</span>
                      <p className="text-gray-300">We only collect data necessary for our services</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold min-w-fit">Purpose Limitation</span>
                      <p className="text-gray-300">Data is used only for stated purposes</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold min-w-fit">Storage Limitation</span>
                      <p className="text-gray-300">Data retained only as long as necessary</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold min-w-fit">Accuracy Controls</span>
                      <p className="text-gray-300">Mechanisms to ensure data accuracy and updates</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold min-w-fit">Accountability</span>
                      <p className="text-gray-300">Clear responsibility for data protection</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* User Data Rights */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">User Data Rights and Controls</h3>
                <p className="text-gray-300 mb-6">
                  You have complete control over your data and how it's used. Our platform provides comprehensive tools
                  for managing your privacy preferences and data rights.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-5">
                    <h4 className="text-emerald-300 font-semibold mb-2">👁️ Right to Access</h4>
                    <p className="text-gray-300 text-sm">View all data we have about you</p>
                  </div>
                  <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-5">
                    <h4 className="text-emerald-300 font-semibold mb-2">✏️ Right to Rectification</h4>
                    <p className="text-gray-300 text-sm">Correct inaccurate or incomplete data</p>
                  </div>
                  <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-5">
                    <h4 className="text-emerald-300 font-semibold mb-2">🗑️ Right to Erasure</h4>
                    <p className="text-gray-300 text-sm">Delete your data ("right to be forgotten")</p>
                  </div>
                  <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-5">
                    <h4 className="text-emerald-300 font-semibold mb-2">📤 Right to Portability</h4>
                    <p className="text-gray-300 text-sm">Export your data in machine-readable format</p>
                  </div>
                  <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-5">
                    <h4 className="text-emerald-300 font-semibold mb-2">⛔ Right to Object</h4>
                    <p className="text-gray-300 text-sm">Object to processing in certain circumstances</p>
                  </div>
                  <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-5">
                    <h4 className="text-emerald-300 font-semibold mb-2">🎯 Consent Management</h4>
                    <p className="text-gray-300 text-sm">Control how your data is used and shared</p>
                  </div>
                </div>
              </div>

              {/* Authentication */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Secure Authentication and Access Control</h3>
                <p className="text-gray-300 mb-6">
                  Multiple layers of authentication and access control ensure only authorized users can access your account.
                </p>

                <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🔐 Authentication Features
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">MFA</span>
                      <p className="text-gray-300">TOTP, SMS, and hardware security keys</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">Single Sign-On</span>
                      <p className="text-gray-300">Integration with Google, Microsoft, and enterprise SSO</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">Session Mgmt</span>
                      <p className="text-gray-300">Automatic timeout and concurrent session limits</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">Passwords</span>
                      <p className="text-gray-300">Strong requirements with breach checking</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">Recovery</span>
                      <p className="text-gray-300">Secure account recovery without compromising security</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Crawling Ethics */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Website Crawling and Data Collection</h3>
                <p className="text-gray-300 mb-6">
                  When we crawl your website for SEO analysis, we do so responsibly and transparently.
                </p>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Respect robots.txt</h4>
                      <p className="text-gray-300 text-sm">We honor all robots.txt directives and crawl delays</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Rate Limiting</h4>
                      <p className="text-gray-300 text-sm">Polite crawling with appropriate delays between requests</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">📋</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Clear Identification</h4>
                      <p className="text-gray-300 text-sm">Clear identification as AI SEO Turbo crawler</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">🔒</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Data Usage</h4>
                      <p className="text-gray-300 text-sm">Crawled data used only for analysis, never sold or shared</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">⛔</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Opt-out Options</h4>
                      <p className="text-gray-300 text-sm">Easy ways to exclude pages or sections from crawling</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {categoryArticles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300"
                >
                  <Link href={article.href} className="block">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-2 flex-shrink-0">
                          <article.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-400 mb-4">
                            {article.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{article.time} read</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Security Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Security Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/help/security-privacy"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-indigo-400 transition-colors">Security Center</div>
                    <div className="text-gray-400 text-sm">Comprehensive security information</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                </Link>
                <Link
                  href="/privacy"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-indigo-400 transition-colors">Privacy Policy</div>
                    <div className="text-gray-400 text-sm">How we protect and use your data</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                </Link>
              </div>
            </motion.div>

            {/* Related Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Related Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/help/account-billing"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-purple-400 transition-colors">Account & Billing</div>
                    <div className="text-gray-400 text-sm">Manage your subscription and payments</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                </Link>
                <Link
                  href="/help/troubleshooting"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-yellow-400 transition-colors">Troubleshooting</div>
                    <div className="text-gray-400 text-sm">Resolve common issues and errors</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 transition-colors" />
                </Link>
              </div>
            </motion.div>

            {/* Need More Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-8 text-center"
            >
              <h3 className="text-white text-xl font-bold mb-4">Security concerns?</h3>
              <p className="text-gray-400 mb-6">
                Our security team is available 24/7 to help with account security, privacy questions, and data protection.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/contact"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Contact Security Team
                </Link>
                <Link
                  href="/help"
                  className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Browse All Help
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
