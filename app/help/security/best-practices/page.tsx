"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Lock, Eye, Key, AlertTriangle, CheckCircle, Users, Server, Smartphone } from 'lucide-react'
import Link from 'next/link'

export default function BestPracticesPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Security Best Practices</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Protect your AI SEO Turbo account with these essential security practices
              and recommendations for keeping your data safe.
            </p>
          </div>

          {/* Security Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <Shield className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Why Security Matters</h2>
                <p className="text-gray-600">
                  Your SEO data contains valuable business insights. Following these best practices
                  helps protect your account from unauthorized access and potential data breaches.
                </p>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Account Security</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <Lock className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Strong Passwords</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Use complex passwords with 12+ characters, mixing uppercase, lowercase,
                  numbers, and symbols.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Use password manager</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Change every 90 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Never reuse passwords</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <Key className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Enable 2FA to add an extra layer of security beyond your password.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Use authenticator app</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Save backup codes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Enable on all accounts</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <Eye className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Monitor Activity</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Regularly check your account activity and login history for suspicious behavior.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Review login history</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Check active sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Set up alerts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Device Security */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Device & Network Security</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Device Protection</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Keep operating system updated</li>
                    <li>• Install reputable antivirus software</li>
                    <li>• Enable device encryption</li>
                    <li>• Use screen locks with PIN/pattern</li>
                    <li>• Avoid public Wi-Fi for sensitive tasks</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Network Security</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Use VPN on public networks</li>
                    <li>• Avoid suspicious email links</li>
                    <li>• Verify website SSL certificates</li>
                    <li>• Use firewall protection</li>
                    <li>• Keep router firmware updated</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Browser Security</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Keep browser updated</li>
                    <li>• Use HTTPS everywhere</li>
                    <li>• Enable privacy extensions</li>
                    <li>• Clear cookies regularly</li>
                    <li>• Use incognito for sensitive tasks</li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Security</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Verify sender authenticity</li>
                    <li>• Don't click suspicious links</li>
                    <li>• Use email filters</li>
                    <li>• Enable spam protection</li>
                    <li>• Report phishing attempts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Protection & Privacy</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Server className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Data Encryption</h3>
                <p className="text-sm text-gray-600">All data encrypted at rest and in transit</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Access Controls</h3>
                <p className="text-sm text-gray-600">Role-based permissions and audit logs</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Regular Backups</h3>
                <p className="text-sm text-gray-600">Automated backups with disaster recovery</p>
              </div>
            </div>
          </div>

          {/* Common Threats */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-red-900 mb-2">Common Security Threats</h2>
                <p className="text-red-800">
                  Be aware of these common threats and how to protect against them.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Phishing Attacks</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Fake emails or websites designed to steal your credentials.
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>• Verify sender email addresses</div>
                  <div>• Hover over links before clicking</div>
                  <div>• Never share credentials via email</div>
                  <div>• Use official login pages only</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Malware & Viruses</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Malicious software that can steal data or damage systems.
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>• Keep antivirus software updated</div>
                  <div>• Don't download from untrusted sources</div>
                  <div>• Scan files before opening</div>
                  <div>• Use ad blockers and script blockers</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Man-in-the-Middle</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Attacks intercepting communication between parties.
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>• Use HTTPS websites only</div>
                  <div>• Avoid public Wi-Fi for sensitive tasks</div>
                  <div>• Use VPN when necessary</div>
                  <div>• Verify SSL certificates</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Brute Force Attacks</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Automated attempts to guess passwords.
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>• Use strong, unique passwords</div>
                  <div>• Enable account lockouts</div>
                  <div>• Use 2FA to prevent unauthorized access</div>
                  <div>• Monitor failed login attempts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Response */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">What to Do If Compromised</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Change Password Immediately</h3>
                  <p className="text-blue-800">Reset your password and any other accounts using the same credentials.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Review Account Activity</h3>
                  <p className="text-blue-800">Check recent login activity and revoke suspicious sessions.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Contact Support</h3>
                  <p className="text-blue-800">Report the incident to our security team for assistance.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Monitor for Unusual Activity</h3>
                  <p className="text-blue-800">Keep an eye on your accounts for any further suspicious behavior.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Resources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Security Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/help/security/two-factor-authentication"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Two-Factor Auth</h3>
                <p className="text-sm text-gray-600">Set up 2FA for your account</p>
              </Link>
              <Link
                href="/help/security"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <Lock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Security & Privacy</h3>
                <p className="text-sm text-gray-600">Learn about our security measures</p>
              </Link>
              <Link
                href="/contact"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <AlertTriangle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Report Security Issue</h3>
                <p className="text-sm text-gray-600">Contact our security team</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}