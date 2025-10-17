"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
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
                Protect your account and data with comprehensive security guides and privacy controls.
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
            <div className="prose prose-lg prose-invert mx-auto">
              <h2>Security & Privacy: Your Data Protection is Our Top Priority</h2>
              <p>
                At AI SEO Turbo, we understand that SEO data contains sensitive business information. That's why we've
                built our platform with enterprise-grade security and comprehensive privacy protections. Your data is
                not just stored safely—it's protected by multiple layers of security and governed by strict privacy policies.
              </p>

              <h3>Enterprise-Grade Security Infrastructure</h3>
              <p>
                Our security infrastructure is designed to protect against modern threats while maintaining the performance
                and reliability you expect from a professional SEO platform.
              </p>

              <h4>Security Certifications:</h4>
              <ul>
                <li><strong>SOC 2 Type II Certified:</strong> Independent audit of our security controls and processes</li>
                <li><strong>ISO 27001 Compliant:</strong> International standard for information security management</li>
                <li><strong>GDPR Compliant:</strong> Full compliance with EU data protection regulations</li>
                <li><strong>CCPA Ready:</strong> Prepared for California Consumer Privacy Act requirements</li>
                <li><strong>PCI DSS Level 1:</strong> Highest level of payment card industry security standards</li>
              </ul>

              <h3>Data Encryption and Protection</h3>
              <p>
                Every piece of data you store with AI SEO Turbo is protected by multiple layers of encryption and security controls.
              </p>

              <h4>Encryption Standards:</h4>
              <ul>
                <li><strong>Data at Rest:</strong> AES-256 encryption for all stored data</li>
                <li><strong>Data in Transit:</strong> TLS 1.3 encryption for all network communications</li>
                <li><strong>Database Encryption:</strong> Transparent data encryption at the database level</li>
                <li><strong>Backup Encryption:</strong> All backups encrypted with unique keys</li>
                <li><strong>API Security:</strong> OAuth 2.0 and API key authentication with rate limiting</li>
              </ul>

              <h3>Privacy by Design</h3>
              <p>
                Privacy isn't an afterthought—it's built into every aspect of our platform from the ground up.
              </p>

              <h4>Privacy-First Features:</h4>
              <ul>
                <li><strong>Data Minimization:</strong> We only collect data necessary for our services</li>
                <li><strong>Purpose Limitation:</strong> Data is used only for stated purposes</li>
                <li><strong>Storage Limitation:</strong> Data retained only as long as necessary</li>
                <li><strong>Accuracy Controls:</strong> Mechanisms to ensure data accuracy and updates</li>
                <li><strong>Accountability Measures:</strong> Clear responsibility for data protection</li>
              </ul>

              <h3>User Data Rights and Controls</h3>
              <p>
                You have complete control over your data and how it's used. Our platform provides comprehensive tools
                for managing your privacy preferences and data rights.
              </p>

              <h4>Your Data Rights:</h4>
              <ul>
                <li><strong>Right to Access:</strong> View all data we have about you</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Delete your data ("right to be forgotten")</li>
                <li><strong>Right to Portability:</strong> Export your data in machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to processing in certain circumstances</li>
                <li><strong>Consent Management:</strong> Control how your data is used and shared</li>
              </ul>

              <h3>Secure Authentication and Access Control</h3>
              <p>
                Multiple layers of authentication and access control ensure only authorized users can access your account.
              </p>

              <h4>Authentication Features:</h4>
              <ul>
                <li><strong>Multi-Factor Authentication:</strong> TOTP, SMS, and hardware security keys</li>
                <li><strong>Single Sign-On:</strong> Integration with Google, Microsoft, and enterprise SSO</li>
                <li><strong>Session Management:</strong> Automatic session timeout and concurrent session limits</li>
                <li><strong>Password Policies:</strong> Strong password requirements with breach checking</li>
                <li><strong>Account Recovery:</strong> Secure account recovery without compromising security</li>
              </ul>

              <h3>Website Crawling and Data Collection</h3>
              <p>
                When we crawl your website for SEO analysis, we do so responsibly and transparently.
              </p>

              <h4>Crawling Ethics:</h4>
              <ul>
                <li><strong>Respect robots.txt:</strong> We honor all robots.txt directives and crawl delays</li>
                <li><strong>Rate Limiting:</strong> Polite crawling with appropriate delays between requests</li>
                <li><strong>User-Agent Identification:</strong> Clear identification as AI SEO Turbo crawler</li>
                <li><strong>Data Usage:</strong> Crawled data used only for analysis, never sold or shared</li>
                <li><strong>Opt-out Options:</strong> Easy ways to exclude pages or sections from crawling</li>
              </ul>

              <h3>Third-Party Integrations and Data Sharing</h3>
              <p>
                We carefully vet all third-party integrations and are transparent about data sharing.
              </p>

              <h4>Integration Security:</h4>
              <ul>
                <li><strong>Google Search Console:</strong> Secure OAuth integration with limited scope</li>
                <li><strong>Google Analytics:</strong> Read-only access to public analytics data</li>
                <li><strong>Payment Processing:</strong> PCI-compliant payment processing through Stripe</li>
                <li><strong>API Partners:</strong> Enterprise-grade security for all API integrations</li>
                <li><strong>Data Processing:</strong> All third-party processing under strict data protection agreements</li>
              </ul>

              <h3>Incident Response and Breach Notification</h3>
              <p>
                While we work diligently to prevent security incidents, we have comprehensive response procedures in place.
              </p>

              <h4>Incident Response:</h4>
              <ul>
                <li><strong>24/7 Monitoring:</strong> Continuous security monitoring and threat detection</li>
                <li><strong>Immediate Response:</strong> Automated alerts and rapid incident assessment</li>
                <li><strong>Transparent Communication:</strong> Clear communication during any security events</li>
                <li><strong>Regulatory Compliance:</strong> Breach notification within required timeframes</li>
                <li><strong>Post-Incident Analysis:</strong> Detailed investigation and preventive measures</li>
              </ul>

              <h3>Compliance and Regulatory Standards</h3>
              <p>
                We maintain compliance with global privacy and security regulations to ensure your data is always protected.
              </p>

              <h4>Compliance Standards:</h4>
              <ul>
                <li><strong>GDPR (EU):</strong> Comprehensive compliance with EU General Data Protection Regulation</li>
                <li><strong>CCPA (California):</strong> Full compliance with California Consumer Privacy Act</li>
                <li><strong>PIPEDA (Canada):</strong> Compliance with Personal Information Protection and Electronic Documents Act</li>
                <li><strong>LGPD (Brazil):</strong> Compliance with Lei Geral de Proteção de Dados</li>
                <li><strong>Industry Standards:</strong> HIPAA for health data, FERPA for education data</li>
              </ul>

              <h3>Transparency and Accountability</h3>
              <p>
                We believe in complete transparency about our security practices and data handling.
              </p>

              <h4>Transparency Measures:</h4>
              <ul>
                <li><strong>Security Audits:</strong> Regular third-party security audits and penetration testing</li>
                <li><strong>Privacy Policy:</strong> Clear, comprehensive privacy policy available to all users</li>
                <li><strong>Data Processing Agreements:</strong> Detailed agreements for enterprise customers</li>
                <li><strong>Trust Center:</strong> Public documentation of security controls and certifications</li>
                <li><strong>Annual Reports:</strong> Transparency reports on data requests and security incidents</li>
              </ul>

              <h2>Your Data Security is Our Promise</h2>
              <p>
                At AI SEO Turbo, security and privacy aren't just features—they're fundamental to everything we do.
                We understand that trust is earned through consistent, transparent actions and robust security practices.
                Your data is protected by the same security measures that safeguard Fortune 500 companies and government agencies.
              </p>
              <p>
                Ready to experience enterprise-grade SEO analysis with world-class security? Our platform combines
                cutting-edge AI technology with uncompromising security standards. Your SEO data is safe with us,
                allowing you to focus on what matters most: growing your organic traffic and improving your search rankings.
              </p>
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
                  href="/help/category/security-privacy"
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
                  href="/help/category/account-billing"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-purple-400 transition-colors">Account & Billing</div>
                    <div className="text-gray-400 text-sm">Manage your subscription and payments</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                </Link>
                <Link
                  href="/help/category/troubleshooting"
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
