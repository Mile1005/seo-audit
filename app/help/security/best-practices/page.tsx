"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, Shield, Key, Lock, Eye, EyeOff, Smartphone, AlertTriangle, CheckCircle, RefreshCw, Database, FileText } from 'lucide-react'
import Link from 'next/link'

export default function SecurityBestPracticesPage() {
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
              <span className="text-white">Security best practices</span>
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-indigo-400 text-sm font-medium">Security</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Security best practices
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>9 min read</span>
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
                  <Shield className="w-6 h-6 text-indigo-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">Protect your account and data</h2>
                    <p className="text-gray-300 mb-0">
                      Security is everyone's responsibility. Follow these best practices to keep your account safe,
                      protect your data, and minimize security risks when using our platform.
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Security */}
              <h2 className="text-2xl font-bold text-white mb-6">Account security fundamentals</h2>

              <div className="space-y-6 mb-8">

                {/* Strong Passwords */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Key className="w-6 h-6 text-green-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Use strong, unique passwords</h3>
                      <p className="text-gray-300 mb-4">
                        Your password is the first line of defense. Make it strong and unique to prevent unauthorized access.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-green-400 font-medium mb-2">Password requirements:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• At least 12 characters long</li>
                            <li>• Mix of uppercase and lowercase letters</li>
                            <li>• Include numbers and special characters</li>
                            <li>• Avoid common words or patterns</li>
                            <li>• Don't reuse passwords across accounts</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-green-400 font-medium mb-2">Password managers we recommend:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• 1Password - Full-featured password management</li>
                            <li>• LastPass - Good free tier with premium features</li>
                            <li>• Bitwarden - Open-source and affordable</li>
                            <li>• Dashlane - User-friendly with security features</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Smartphone className="w-6 h-6 text-blue-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Enable two-factor authentication</h3>
                      <p className="text-gray-300 mb-4">
                        2FA adds a critical second layer of security beyond your password.
                      </p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-medium">Highly recommended</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Even if your password is compromised, 2FA prevents unauthorized access.
                          Use authenticator apps over SMS for maximum security.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Monitoring */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Eye className="w-6 h-6 text-purple-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Monitor account activity</h3>
                      <p className="text-gray-300 mb-4">
                        Regularly check your account for suspicious activity and unusual login attempts.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-purple-400 font-medium mb-1">What to monitor:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Recent login activity and locations</li>
                            <li>• Connected devices and applications</li>
                            <li>• Account changes and modifications</li>
                            <li>• Unusual API usage patterns</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-purple-400 font-medium mb-1">Red flags to watch for:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Logins from unfamiliar locations</li>
                            <li>• Unknown devices in your account</li>
                            <li>• Unexpected password reset emails</li>
                            <li>• Unusual account activity spikes</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Data Protection */}
              <h3 className="text-2xl font-bold text-white mb-6">Data protection and privacy</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-orange-400" />
                    Data Handling
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Only audit websites you own or have permission to analyze</li>
                    <li>• Be mindful of sensitive data in audit results</li>
                    <li>• Use private sharing links for sensitive reports</li>
                    <li>• Regularly clean up old audit data</li>
                    <li>• Export and backup important data</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    Privacy Settings
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Review and adjust data collection preferences</li>
                    <li>• Set appropriate data retention periods</li>
                    <li>• Control analytics and tracking settings</li>
                    <li>• Manage data sharing with third parties</li>
                    <li>• Configure privacy-friendly defaults</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-green-400" />
                    Secure Sharing
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Use password protection for sensitive reports</li>
                    <li>• Set expiration dates on shared links</li>
                    <li>• Limit access to specific email domains</li>
                    <li>• Avoid sharing reports via public URLs</li>
                    <li>• Revoke access when no longer needed</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-purple-400" />
                    Regular Maintenance
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Update passwords regularly</li>
                    <li>• Review and rotate API keys</li>
                    <li>• Audit user permissions and access</li>
                    <li>• Clean up unused accounts and integrations</li>
                    <li>• Monitor for security updates</li>
                  </ul>
                </div>

              </div>

              {/* API Security */}
              <h3 className="text-2xl font-bold text-white mb-6">API security best practices</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-6">

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Secure API key management</h3>
                    <p className="text-gray-300">
                      API keys provide programmatic access to your account. Handle them with care to prevent unauthorized use.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-2">Key Management</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Store API keys securely (never in code)</li>
                        <li>• Use environment variables or key vaults</li>
                        <li>• Rotate keys regularly (every 90 days)</li>
                        <li>• Use different keys for different environments</li>
                        <li>• Monitor API key usage patterns</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Access Control</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Apply least privilege principle</li>
                        <li>• Use IP whitelisting when possible</li>
                        <li>• Set rate limits to prevent abuse</li>
                        <li>• Implement proper error handling</li>
                        <li>• Log and monitor API activity</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span className="text-red-400 font-medium">Never commit API keys to version control</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Accidentally committing API keys to public repositories is a common security mistake.
                      Use .env files, secret managers, or CI/CD secrets instead.
                    </p>
                  </div>

                </div>
              </div>

              {/* Device and Network Security */}
              <h3 className="text-2xl font-bold text-white mb-6">Device and network security</h3>

              <div className="space-y-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-cyan-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Secure your devices</h3>
                      <p className="text-gray-300 mb-4">
                        Keep your devices and software up to date to protect against known vulnerabilities.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-cyan-400 font-medium mb-1">Device security:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Enable device encryption (FileVault, BitLocker)</li>
                            <li>• Use strong device passwords or PINs</li>
                            <li>• Enable automatic software updates</li>
                            <li>• Install reputable antivirus software</li>
                            <li>• Use firewall and security features</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-cyan-400 font-medium mb-1">Browser security:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Keep browsers updated</li>
                            <li>• Use HTTPS whenever possible</li>
                            <li>• Enable two-factor authentication prompts</li>
                            <li>• Clear cookies and cache regularly</li>
                            <li>• Use privacy-focused extensions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <EyeOff className="w-6 h-6 text-pink-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Protect against phishing and social engineering</h3>
                      <p className="text-gray-300 mb-4">
                        Be vigilant against attempts to trick you into revealing sensitive information.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-pink-400 font-medium mb-1">Phishing red flags:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Unexpected emails asking for login credentials</li>
                            <li>• Urgent requests to "verify" your account</li>
                            <li>• Links that don't match the actual website</li>
                            <li>• Requests for sensitive information via email</li>
                            <li>• Too-good-to-be-true offers or threats</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-pink-400 font-medium mb-1">Safe practices:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Always navigate directly to websites</li>
                            <li>• Verify sender email addresses carefully</li>
                            <li>• Hover over links before clicking</li>
                            <li>• Use official contact methods for support</li>
                            <li>• Report suspicious messages</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Incident Response */}
              <h3 className="text-2xl font-bold text-white mb-6">What to do if you suspect a security breach</h3>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8">
                <div className="space-y-6">

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Immediate actions</h4>
                      <p className="text-gray-300 text-sm">
                        If you suspect your account has been compromised, act quickly to minimize damage.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-2">Account Security</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Change your password immediately</li>
                        <li>• Enable 2FA if not already active</li>
                        <li>• Review recent account activity</li>
                        <li>• Sign out of all sessions</li>
                        <li>• Check connected applications</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Damage Control</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Notify your team if applicable</li>
                        <li>• Change passwords on related accounts</li>
                        <li>• Monitor financial accounts</li>
                        <li>• Scan devices for malware</li>
                        <li>• Contact support for assistance</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="text-red-400 font-medium mb-2">Report the incident</div>
                    <p className="text-gray-300 text-sm">
                      Contact our security team immediately at <a href="mailto:support@aiseoturbo.com" className="text-blue-400 hover:text-blue-300">support@aiseoturbo.com</a>
                      with details about the suspected breach. We'll help you secure your account and investigate.
                    </p>
                  </div>

                </div>
              </div>

              {/* Security Checklist */}
              <h3 className="text-2xl font-bold text-white mb-6">Security checklist</h3>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Use a strong, unique password</h4>
                      <p className="text-gray-300 text-sm">
                        At least 12 characters with mixed case, numbers, and symbols.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Enable two-factor authentication</h4>
                      <p className="text-gray-300 text-sm">
                        Use authenticator apps for maximum security.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Keep software and devices updated</h4>
                      <p className="text-gray-300 text-sm">
                        Enable automatic updates for security patches.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Monitor account activity regularly</h4>
                      <p className="text-gray-300 text-sm">
                        Check for suspicious login attempts and changes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Use secure connections</h4>
                      <p className="text-gray-300 text-sm">
                        Always use HTTPS and avoid public Wi-Fi for sensitive tasks.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Be cautious with third-party applications</h4>
                      <p className="text-gray-300 text-sm">
                        Only grant necessary permissions and review regularly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Regularly backup important data</h4>
                      <p className="text-gray-300 text-sm">
                        Maintain secure backups of critical information.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Stay informed about security threats</h4>
                      <p className="text-gray-300 text-sm">
                        Keep up with security news and best practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Need security assistance?</h3>
                <p className="text-gray-300 mb-4">
                  If you have security concerns or need help implementing these best practices,
                  our security team is available to help protect your account.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contact Security Support
                  </Link>
                  <Link
                    href="/help/security/two-factor-authentication"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Set Up 2FA
                  </Link>
                  <Link
                    href="/help/security/privacy"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Privacy Settings
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
