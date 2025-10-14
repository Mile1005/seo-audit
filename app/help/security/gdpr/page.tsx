"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, Shield, FileText, Scale, AlertTriangle, CheckCircle, Mail, Database, Lock, Eye, Trash2, Download, Settings } from 'lucide-react'
import Link from 'next/link'

export default function GDPRPage() {
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
              <Link href="/help/category/security" className="text-gray-400 hover:text-white transition-colors">
                Security
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">GDPR compliance</span>
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-green-400 text-sm font-medium">Security</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    GDPR compliance
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>10 min read</span>
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
                  <Scale className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">GDPR compliance and your rights</h3>
                    <p className="text-gray-300 mb-0">
                      The General Data Protection Regulation (GDPR) gives you comprehensive rights over your personal data.
                      Learn how we comply with GDPR and how to exercise your data protection rights.
                    </p>
                  </div>
                </div>
              </div>

              {/* What is GDPR */}
              <h2 className="text-2xl font-bold text-white mb-6">What is GDPR?</h2>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <p className="text-gray-300">
                    The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect
                    on May 25, 2018. It applies to all organizations that process personal data of individuals located in the EU,
                    regardless of where the organization is based.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-2">Key Principles</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Lawful, fair, and transparent processing</li>
                        <li>• Purpose limitation</li>
                        <li>• Data minimization</li>
                        <li>• Accuracy</li>
                        <li>• Storage limitation</li>
                        <li>• Integrity and confidentiality</li>
                        <li>• Accountability</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Who It Applies To</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• EU residents (regardless of location)</li>
                        <li>• Organizations processing EU data</li>
                        <li>• Companies offering goods/services to EU</li>
                        <li>• Businesses monitoring EU individuals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your GDPR Rights */}
              <h2 className="text-2xl font-bold text-white mb-6">Your GDPR rights</h2>

              <div className="space-y-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Right to information</h3>
                      <p className="text-gray-300 mb-4">
                        You have the right to be informed about how your personal data is collected, used, and processed.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-blue-400 font-medium mb-1">What we provide:</div>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Clear privacy policy and notices</li>
                          <li>• Transparent data processing information</li>
                          <li>• Contact details for data protection inquiries</li>
                          <li>• Information about data retention periods</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Right of access</h3>
                      <p className="text-gray-300 mb-4">
                        You can request a copy of all personal data we hold about you, free of charge.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-green-400 font-medium mb-1">Data export includes:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Account profile and settings</li>
                            <li>• All audit reports and results</li>
                            <li>• Billing and subscription history</li>
                            <li>• API usage logs and data</li>
                            <li>• Support ticket history</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-green-400 font-medium mb-1">How to request:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Use the data export feature in privacy settings</li>
                            <li>• Contact our data protection officer</li>
                            <li>• Response within 30 days</li>
                            <li>• Free of charge for first request</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Right to rectification</h3>
                      <p className="text-gray-300 mb-4">
                        You can have inaccurate personal data rectified or incomplete data completed.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-purple-400 font-medium mb-1">How to exercise:</div>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Update your profile information directly</li>
                          <li>• Contact support for other corrections</li>
                          <li>• We will respond within 30 days</li>
                          <li>• Changes applied to all systems</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Right to erasure ("right to be forgotten")</h3>
                      <p className="text-gray-300 mb-4">
                        You can request deletion of your personal data under certain conditions.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-red-400 font-medium mb-1">Conditions for erasure:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Data no longer necessary for purpose collected</li>
                            <li>• You withdraw consent and no other legal basis</li>
                            <li>• You object to processing and no overriding interests</li>
                            <li>• Data processed unlawfully</li>
                            <li>• Legal obligation to erase</li>
                            <li>• Data collected from child and consent withdrawn</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-red-400 font-medium mb-1">What happens:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• All personal data deleted from systems</li>
                            <li>• Backup data deleted within retention period</li>
                            <li>• Third parties notified of erasure request</li>
                            <li>• Account permanently closed</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Right to data portability</h3>
                      <p className="text-gray-300 mb-4">
                        You can receive your personal data in a structured, commonly used format.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-orange-400 font-medium mb-1">Available formats:</div>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• JSON format for structured data</li>
                          <li>• CSV format for tabular data</li>
                          <li>• PDF format for reports and documents</li>
                          <li>• XML format for technical data</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      6
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Right to object and automated decision-making</h3>
                      <p className="text-gray-300 mb-4">
                        You can object to processing based on legitimate interests and automated decision-making.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-yellow-400 font-medium mb-1">Object to processing:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Direct marketing communications</li>
                            <li>• Processing based on legitimate interests</li>
                            <li>• Scientific/historical research (unless public task)</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-yellow-400 font-medium mb-1">Automated decisions:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Right to human intervention</li>
                            <li>• Right to express your view</li>
                            <li>• Right to contest the decision</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* How We Comply */}
              <h2 className="text-2xl font-bold text-white mb-6">How we ensure GDPR compliance</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Data Protection Officer
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Dedicated DPO appointed</li>
                    <li>• Independent oversight of compliance</li>
                    <li>• Direct contact for data subjects</li>
                    <li>• Regular compliance reporting</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-400" />
                    Data Protection Impact Assessment
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• DPIA for high-risk processing</li>
                    <li>• Risk assessment framework</li>
                    <li>• Mitigation strategies implemented</li>
                    <li>• Regular reassessment</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-purple-400" />
                    Data Security Measures
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Encryption at rest and in transit</li>
                    <li>• Access controls and authentication</li>
                    <li>• Regular security audits</li>
                    <li>• Incident response procedures</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-400" />
                    Records of Processing
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Comprehensive processing records</li>
                    <li>• Data flow documentation</li>
                    <li>• Legal basis documentation</li>
                    <li>• Regular record updates</li>
                  </ul>
                </div>

              </div>

              {/* Data Breach Notification */}
              <h2 className="text-2xl font-bold text-white mb-6">Data breach notification</h2>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                  <div>
                    <h3 className="text-red-400 text-lg font-semibold mb-3">72-hour notification requirement</h3>
                    <p className="text-gray-300 mb-4">
                      Under GDPR, we must notify the relevant supervisory authority within 72 hours of becoming aware
                      of a personal data breach that poses a risk to individuals' rights and freedoms.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-red-400 font-medium mb-1">When we notify you:</div>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Breach poses high risk to your rights and freedoms</li>
                          <li>• Notification without undue delay</li>
                          <li>• Clear communication of the breach</li>
                          <li>• Information on protective measures</li>
                        </ul>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-red-400 font-medium mb-1">What we include:</div>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Nature of the personal data breach</li>
                          <li>• Categories and number of data subjects</li>
                          <li>• Likely consequences of the breach</li>
                          <li>• Measures taken to address the breach</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* International Data Transfers */}
              <h2 className="text-2xl font-bold text-white mb-6">International data transfers</h2>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-6">

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Adequacy and safeguards</h3>
                    <p className="text-gray-300">
                      When transferring personal data outside the EU/EEA, we ensure appropriate safeguards are in place
                      to protect your data according to GDPR requirements.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-2">Adequacy Decisions</h4>
                      <p className="text-gray-300 text-sm">
                        Transfers to countries with EU adequacy decisions require no additional safeguards.
                        These countries provide equivalent data protection levels.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Appropriate Safeguards</h4>
                      <p className="text-gray-300 text-sm">
                        For non-adequate countries, we use Standard Contractual Clauses, Binding Corporate Rules,
                        or other approved transfer mechanisms.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="text-blue-400 font-medium mb-2">Our Data Hosting</div>
                    <p className="text-gray-300 text-sm">
                      Your data is primarily hosted in the EU with additional secure backups in approved locations.
                      All transfers comply with GDPR requirements and include appropriate safeguards.
                    </p>
                  </div>

                </div>
              </div>

              {/* Exercising Your Rights */}
              <h2 className="text-2xl font-bold text-white mb-6">How to exercise your GDPR rights</h2>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="space-y-6">

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Contact our Data Protection Officer</h4>
                      <p className="text-gray-300 text-sm">
                        Email: <a href="mailto:support@aiseoturbo.com" className="text-blue-400 hover:text-blue-300">support@aiseoturbo.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Use our privacy dashboard</h4>
                      <p className="text-gray-300 text-sm">
                        Access your data rights directly through the privacy settings in your account dashboard.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Download className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Data subject access request form</h4>
                      <p className="text-gray-300 text-sm">
                        Download and submit our formal DSAR form for complex requests requiring identity verification.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="text-green-400 font-medium mb-2">Response Times</div>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Acknowledgment: Within 5 working days</li>
                      <li>• Access requests: Within 30 days</li>
                      <li>• Other rights: Within 30 days</li>
                      <li>• Extensions: Up to 60 days for complex requests</li>
                      <li>• Free of charge for first request</li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Complaints */}
              <h2 className="text-2xl font-bold text-white mb-6">Making a complaint</h2>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <p className="text-gray-300">
                    If you believe we have not handled your personal data adequately, you have the right to lodge a complaint
                    with a supervisory authority in your country of residence, place of work, or where the alleged infringement occurred.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-2">EU Supervisory Authorities</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Find your local DPA: <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener">EDPB Members</a></li>
                        <li>• Ireland (our lead authority): <a href="https://www.dataprotection.ie/" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener">DPC Website</a></li>
                        <li>• UK (post-Brexit): <a href="https://ico.org.uk/" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener">ICO Website</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Before Making a Complaint</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Contact us first to resolve the issue</li>
                        <li>• We aim to resolve complaints within 30 days</li>
                        <li>• Document your concerns clearly</li>
                        <li>• Provide evidence where possible</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Need help with GDPR?</h3>
                <p className="text-gray-300 mb-4">
                  Our Data Protection Officer is here to help you understand and exercise your GDPR rights.
                  Contact us for assistance with any data protection matters.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contact Data Protection Officer
                  </Link>
                  <Link
                    href="/help/security/privacy"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Privacy Settings
                  </Link>
                  <Link
                    href="/privacy"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Full Privacy Policy
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
