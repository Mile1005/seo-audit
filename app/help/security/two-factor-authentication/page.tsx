"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, Shield, Smartphone, Key, AlertTriangle, CheckCircle, RefreshCw, Eye, EyeOff, Lock } from 'lucide-react'
import Link from 'next/link'

export default function TwoFactorAuthPage() {
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
              <Link href="/help/category/security-privacy" className="text-gray-400 hover:text-white transition-colors">
                Security
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">Two-factor authentication</span>
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">Security</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Two-factor authentication
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>7 min read</span>
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
                  <Lock className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">Enhanced account security</h3>
                    <p className="text-gray-300 mb-0">
                      Two-factor authentication (2FA) adds an extra layer of security to your account by requiring
                      a second form of verification beyond your password. Learn how to set it up and manage it effectively.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why 2FA */}
              <h2 className="text-2xl font-bold text-white mb-6">Why use two-factor authentication?</h2>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-green-400 text-lg font-semibold mb-3">Protection against unauthorized access</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Password-only security</h4>
                        <p className="text-gray-300 text-sm">
                          If your password is compromised through phishing, breaches, or guessing,
                          attackers can access your account immediately.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">With 2FA enabled</h4>
                        <p className="text-gray-300 text-sm">
                          Even if your password is stolen, attackers still need access to your
                          second factor (phone, authenticator app) to log in.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Setting Up 2FA */}
              <h2 className="text-2xl font-bold text-white mb-6">Setting up two-factor authentication</h2>

              <div className="space-y-6 mb-8">

                {/* Step 1 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Access security settings</h3>
                      <p className="text-gray-300 mb-4">
                        Navigate to your account settings and find the Security or Two-Factor Authentication section.
                        You'll need to be logged in to configure 2FA.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-gray-300 text-sm">
                          <strong>Dashboard:</strong> Settings → Security → Two-Factor Authentication
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Choose your 2FA method</h3>
                      <p className="text-gray-300 mb-4">
                        Select your preferred second factor method. We recommend authenticator apps for the best security.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-900/50 rounded-lg p-3 text-center border border-green-500/20">
                          <div className="text-green-400 font-medium mb-1">Authenticator App</div>
                          <div className="text-gray-400 text-sm">Most secure</div>
                          <div className="text-gray-500 text-xs">Recommended</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                          <div className="text-blue-400 font-medium mb-1">SMS</div>
                          <div className="text-gray-400 text-sm">Convenient</div>
                          <div className="text-gray-500 text-xs">Backup option</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                          <div className="text-purple-400 font-medium mb-1">Hardware Key</div>
                          <div className="text-gray-400 text-sm">Advanced</div>
                          <div className="text-gray-500 text-xs">YubiKey, etc.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Set up authenticator app</h3>
                      <p className="text-gray-300 mb-4">
                        Download an authenticator app and scan the QR code displayed on screen.
                        The app will generate time-based one-time passwords (TOTP).
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-green-400 font-medium mb-1">Recommended Apps:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Google Authenticator (iOS/Android)</li>
                            <li>• Authy (iOS/Android/Desktop)</li>
                            <li>• Microsoft Authenticator (iOS/Android)</li>
                            <li>• 1Password (with 2FA support)</li>
                            <li>• LastPass Authenticator</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Verify and save backup codes</h3>
                      <p className="text-gray-300 mb-4">
                        Enter the code from your authenticator app to verify setup.
                        Then save your backup codes in a secure location for account recovery.
                      </p>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <span className="text-red-400 font-medium">Important: Save backup codes</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Backup codes are your only way to recover access if you lose your phone or authenticator app.
                          Store them securely, like in a password manager or printed and locked away.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Using 2FA */}
              <h2 className="text-2xl font-bold text-white mb-6">How two-factor authentication works</h2>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-6">

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold mb-2">Enter your password</h3>
                      <p className="text-gray-300 text-sm">
                        First, enter your email and password as usual on the login page.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold mb-2">Enter verification code</h3>
                      <p className="text-gray-300 text-sm">
                        Open your authenticator app and enter the 6-digit code displayed for our service.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold mb-2">Access granted</h3>
                      <p className="text-gray-300 text-sm">
                        If both factors are correct, you'll be logged in to your account.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Managing 2FA */}
              <h2 className="text-2xl font-bold text-white mb-6">Managing your 2FA settings</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-blue-400" />
                    Changing Devices
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Go to security settings</li>
                    <li>• Select "Change Authenticator"</li>
                    <li>• Scan new QR code</li>
                    <li>• Verify with new device</li>
                    <li>• Old device stops working</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Key className="w-5 h-5 text-green-400" />
                    Backup Codes
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Generate new codes anytime</li>
                    <li>• Each code can be used once</li>
                    <li>• Store securely offline</li>
                    <li>• Use for account recovery</li>
                    <li>• Regenerate if compromised</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-purple-400" />
                    Recovery Options
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Use backup codes</li>
                    <li>• Contact support with verification</li>
                    <li>• Provide account details</li>
                    <li>• May require identity verification</li>
                    <li>• Recovery can take 24-48 hours</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Disabling 2FA
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Go to security settings</li>
                    <li>• Verify identity first</li>
                    <li>• Confirm disabling</li>
                    <li>• Account becomes less secure</li>
                    <li>• Re-enable anytime</li>
                  </ul>
                </div>

              </div>

              {/* Troubleshooting 2FA */}
              <h2 className="text-2xl font-bold text-white mb-6">Troubleshooting 2FA issues</h2>

              <div className="space-y-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-orange-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Codes not working</h3>
                      <p className="text-gray-300 mb-4">
                        Your verification codes are being rejected during login.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-orange-400 font-medium mb-1">Common Causes:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Device time is incorrect - sync with NTP</li>
                            <li>• App not properly configured</li>
                            <li>• Wrong account in authenticator</li>
                            <li>• Codes expired (30-second window)</li>
                            <li>• Network connectivity issues</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-orange-400 font-medium mb-1">Solutions:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Check and correct device time</li>
                            <li>• Re-scan QR code in authenticator</li>
                            <li>• Try backup codes if available</li>
                            <li>• Contact support for account recovery</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Smartphone className="w-6 h-6 text-red-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Lost access to authenticator</h3>
                      <p className="text-gray-300 mb-4">
                        You can't access your authenticator app due to lost/stolen phone or app issues.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-red-400 font-medium mb-1">Immediate Solutions:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Use backup codes if you saved them</li>
                            <li>• Access from another configured device</li>
                            <li>• Use SMS backup if enabled</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-red-400 font-medium mb-1">Account Recovery:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Contact support with account details</li>
                            <li>• Verify identity through email</li>
                            <li>• May require additional verification</li>
                            <li>• Recovery typically takes 24-48 hours</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Security Best Practices */}
              <h2 className="text-2xl font-bold text-white mb-6">2FA security best practices</h2>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Use authenticator apps over SMS</h4>
                      <p className="text-gray-300 text-sm">
                        Authenticator apps are more secure than SMS, which can be intercepted through SIM swapping attacks.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Keep backup codes secure</h4>
                      <p className="text-gray-300 text-sm">
                        Store backup codes in a secure password manager or offline in a locked safe. Never store them digitally.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Enable 2FA on all important accounts</h4>
                      <p className="text-gray-300 text-sm">
                        Use 2FA on your email, banking, and other critical accounts to create a security chain.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Regularly rotate backup codes</h4>
                      <p className="text-gray-300 text-sm">
                        Generate new backup codes periodically and securely dispose of old ones.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Monitor account activity</h4>
                      <p className="text-gray-300 text-sm">
                        Regularly check your account activity logs for any suspicious login attempts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Need help with 2FA?</h3>
                <p className="text-gray-300 mb-4">
                  Having trouble setting up or using two-factor authentication? Our security team can help you get it configured properly.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contact Security Support
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
