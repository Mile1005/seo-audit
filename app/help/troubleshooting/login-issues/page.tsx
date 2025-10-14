"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, LogIn, AlertTriangle, CheckCircle, RefreshCw, Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function LoginIssuesPage() {
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
              <Link href="/help/category/troubleshooting" className="text-gray-400 hover:text-white transition-colors">
                Troubleshooting
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">Login issues</span>
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-3">
                  <LogIn className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-orange-400 text-sm font-medium">Troubleshooting</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Login issues
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>6 min read</span>
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
                  <Shield className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">Common login problems</h3>
                    <p className="text-gray-300 mb-0">
                      Having trouble accessing your account? This guide covers the most common login issues and their solutions.
                      Most problems can be resolved with a few simple steps.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Fixes */}
              <h2 className="text-2xl font-bold text-white mb-6">Quick fixes to try first</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <RefreshCw className="w-6 h-6 text-blue-400" />
                    <h3 className="text-white font-semibold">Clear browser cache</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• Press Ctrl+Shift+R (Windows/Linux)</div>
                    <div>• Press Cmd+Shift+R (Mac)</div>
                    <div>• Or clear cache in browser settings</div>
                    <div>• Try incognito/private mode</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-6 h-6 text-green-400" />
                    <h3 className="text-white font-semibold">Check your credentials</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• Verify email address is correct</div>
                    <div>• Check password (case sensitive)</div>
                    <div>• Ensure Caps Lock is off</div>
                    <div>• Try password reset if unsure</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-purple-400" />
                    <h3 className="text-white font-semibold">Disable VPN/extensions</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• Temporarily disable VPN</div>
                    <div>• Turn off browser extensions</div>
                    <div>• Try different network</div>
                    <div>• Check firewall settings</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <RefreshCw className="w-6 h-6 text-orange-400" />
                    <h3 className="text-white font-semibold">Try different browser</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• Chrome, Firefox, Safari, Edge</div>
                    <div>• Clear all browser data</div>
                    <div>• Update to latest version</div>
                    <div>• Try mobile browser</div>
                  </div>
                </div>

              </div>

              {/* Specific Issues */}
              <h2 className="text-2xl font-bold text-white mb-6">Specific login problems</h2>

              <div className="space-y-6 mb-8">

                {/* Invalid Credentials */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">"Invalid email or password"</h3>
                      <p className="text-gray-300 mb-4">
                        This error means the email or password you entered doesn't match our records.
                        Here's how to resolve it:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">Reset your password</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Click "Forgot Password" on the login page and follow the reset instructions sent to your email.
                          </p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">Check email variations</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Try different email formats (username@gmail.com vs username+tag@gmail.com).
                          </p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">Account verification</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Ensure your account is verified. Check your email for verification links.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Locked */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Lock className="w-6 h-6 text-orange-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Account temporarily locked</h3>
                      <p className="text-gray-300 mb-4">
                        After multiple failed login attempts, accounts are temporarily locked for security.
                        This prevents brute force attacks.
                      </p>
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="w-5 h-5 text-orange-400" />
                          <span className="text-orange-400 font-medium">Automatic unlock</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Accounts are automatically unlocked after 30 minutes. For immediate access,
                          use the "Forgot Password" link to reset your password.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-blue-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Two-factor authentication issues</h3>
                      <p className="text-gray-300 mb-4">
                        If you have 2FA enabled, you need both your password and a verification code.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-blue-400 font-medium mb-1">Authenticator App Issues:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Check device time is correct</li>
                            <li>• Ensure app is up to date</li>
                            <li>• Try regenerating backup codes</li>
                            <li>• Contact support if app is lost</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-blue-400 font-medium mb-1">SMS Code Issues:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Check phone signal and coverage</li>
                            <li>• Verify phone number is correct</li>
                            <li>• Wait 60 seconds for retry</li>
                            <li>• Try backup codes if available</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Login Issues */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <RefreshCw className="w-6 h-6 text-purple-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Social login problems</h3>
                      <p className="text-gray-300 mb-4">
                        Issues with Google, GitHub, or other social login providers.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-purple-400 font-medium mb-1">Common Solutions:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Clear browser cookies for the provider</li>
                            <li>• Ensure you're logged into the provider</li>
                            <li>• Check if provider account is verified</li>
                            <li>• Try using email/password login instead</li>
                            <li>• Contact support for account linking issues</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Password Reset */}
              <h2 className="text-2xl font-bold text-white mb-6">Password reset process</h2>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-6">

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold mb-2">Request password reset</h3>
                      <p className="text-gray-300 text-sm">
                        Click "Forgot Password" on the login page and enter your email address.
                        We'll send reset instructions to your email.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold mb-2">Check your email</h3>
                      <p className="text-gray-300 text-sm">
                        Look for an email from us with the subject "Reset your password".
                        Check your spam/junk folder if you don't see it.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold mb-2">Follow reset link</h3>
                      <p className="text-gray-300 text-sm">
                        Click the reset link in the email. It will take you to a secure page to create a new password.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold mb-2">Create new password</h3>
                      <p className="text-gray-300 text-sm">
                        Choose a strong password and confirm it. You'll be automatically logged in with your new password.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Email Issues */}
              <h2 className="text-2xl font-bold text-white mb-6">Didn't receive reset email?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-400" />
                    Check these folders
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Inbox (primary)</li>
                    <li>• Spam/Junk folder</li>
                    <li>• Promotions tab (Gmail)</li>
                    <li>• Social/Updates (Gmail)</li>
                    <li>• Clutter (Outlook)</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    Common issues
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Email address typo</li>
                    <li>• Full inbox/quota exceeded</li>
                    <li>• Email filters blocking us</li>
                    <li>• Temporary email service</li>
                    <li>• Domain-specific issues</li>
                  </ul>
                </div>

              </div>

              {/* Account Recovery */}
              <h2 className="text-2xl font-bold text-white mb-6">Account recovery</h2>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-blue-400 text-lg font-semibold mb-3">Need help recovering your account?</h3>
                    <p className="text-gray-300 mb-4">
                      If you're still unable to access your account after trying all the above steps,
                      our support team can help verify your identity and restore access.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white font-medium mb-1">What we'll need:</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Email address associated with the account</li>
                          <li>• Date the account was created (approximate)</li>
                          <li>• Last successful login date (if known)</li>
                          <li>• Any payment receipts or invoice numbers</li>
                          <li>• Description of recent account activity</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Verification process:</h4>
                        <p className="text-gray-300 text-sm">
                          We'll verify your identity through multiple factors and may ask for additional information
                          to ensure account security.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prevention */}
              <h2 className="text-2xl font-bold text-white mb-6">Preventing future login issues</h2>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Use a password manager</h4>
                      <p className="text-gray-300 text-sm">
                        Store your passwords securely and generate strong, unique passwords for each service.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Enable two-factor authentication</h4>
                      <p className="text-gray-300 text-sm">
                        Add an extra layer of security to prevent unauthorized access even if your password is compromised.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Keep recovery information updated</h4>
                      <p className="text-gray-300 text-sm">
                        Ensure your recovery email and phone number are current and accessible.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Regular password updates</h4>
                      <p className="text-gray-300 text-sm">
                        Change your password periodically, especially after any security incidents.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Still Having Issues */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Still can't log in?</h3>
                <p className="text-gray-300 mb-4">
                  If none of the above solutions work, our support team is here to help you regain access to your account.
                  We'll work with you to resolve the issue securely.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contact Support
                  </Link>
                  <Link
                    href="/help/security/two-factor-authentication"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    2FA Help
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
