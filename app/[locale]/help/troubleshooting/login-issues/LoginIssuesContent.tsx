"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, LogIn, AlertTriangle, CheckCircle, RefreshCw, Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function LoginIssuesContent() {
  const t = useTranslations('help.categories.troubleshooting.articles.loginIssues')

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: t('breadcrumb.home'), url: 'https://www.aiseoturbo.com' },
            { name: t('breadcrumb.help'), url: 'https://www.aiseoturbo.com/help' },
            { name: t('breadcrumb.troubleshooting'), url: 'https://www.aiseoturbo.com/help/troubleshooting' },
            { name: t('breadcrumb.loginIssues'), url: 'https://www.aiseoturbo.com/help/troubleshooting/login-issues' }
          ]}
          includeHome={false}
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
                {t('backToHelp')}
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-3">
                  <LogIn className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-orange-400 text-sm font-medium">{t('header.category')}</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {t('header.title')}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{t('header.readTime')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{t('header.lastUpdated')}</span>
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
                    <h2 className="text-white text-lg font-semibold mb-2">{t('intro.title')}</h2>
                    <p className="text-gray-300 mb-0">
                      {t('intro.description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Fixes */}
              <h2 className="text-2xl font-bold text-white mb-6">{t('quickFixes.title')}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <RefreshCw className="w-6 h-6 text-blue-400" />
                    <h3 className="text-white font-semibold">{t('quickFixes.clearCache.title')}</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• {t('quickFixes.clearCache.instructions.0')}</div>
                    <div>• {t('quickFixes.clearCache.instructions.1')}</div>
                    <div>• {t('quickFixes.clearCache.instructions.2')}</div>
                    <div>• {t('quickFixes.clearCache.instructions.3')}</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-6 h-6 text-green-400" />
                    <h3 className="text-white font-semibold">{t('quickFixes.checkCredentials.title')}</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• {t('quickFixes.checkCredentials.instructions.0')}</div>
                    <div>• {t('quickFixes.checkCredentials.instructions.1')}</div>
                    <div>• {t('quickFixes.checkCredentials.instructions.2')}</div>
                    <div>• {t('quickFixes.checkCredentials.instructions.3')}</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-purple-400" />
                    <h3 className="text-white font-semibold">{t('quickFixes.disableVpn.title')}</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• {t('quickFixes.disableVpn.instructions.0')}</div>
                    <div>• {t('quickFixes.disableVpn.instructions.1')}</div>
                    <div>• {t('quickFixes.disableVpn.instructions.2')}</div>
                    <div>• {t('quickFixes.disableVpn.instructions.3')}</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <RefreshCw className="w-6 h-6 text-orange-400" />
                    <h3 className="text-white font-semibold">{t('quickFixes.tryBrowser.title')}</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• {t('quickFixes.tryBrowser.instructions.0')}</div>
                    <div>• {t('quickFixes.tryBrowser.instructions.1')}</div>
                    <div>• {t('quickFixes.tryBrowser.instructions.2')}</div>
                    <div>• {t('quickFixes.tryBrowser.instructions.3')}</div>
                  </div>
                </div>

              </div>

              {/* Specific Issues */}
              <h2 className="text-2xl font-bold text-white mb-6">{t('specificIssues.title')}</h2>

              <div className="space-y-6 mb-8">

                {/* Invalid Credentials */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">{t('specificIssues.invalidCredentials.title')}</h3>
                      <p className="text-gray-300 mb-4">
                        {t('specificIssues.invalidCredentials.description')}
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">{t('specificIssues.invalidCredentials.solutions.0.title')}</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {t('specificIssues.invalidCredentials.solutions.0.description')}
                          </p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">{t('specificIssues.invalidCredentials.solutions.1.title')}</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {t('specificIssues.invalidCredentials.solutions.1.description')}
                          </p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">{t('specificIssues.invalidCredentials.solutions.2.title')}</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {t('specificIssues.invalidCredentials.solutions.2.description')}
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
                      <h3 className="text-white text-xl font-semibold mb-3">{t('specificIssues.accountLocked.title')}</h3>
                      <p className="text-gray-300 mb-4">
                        {t('specificIssues.accountLocked.description')}
                      </p>
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="w-5 h-5 text-orange-400" />
                          <span className="text-orange-400 font-medium">{t('specificIssues.accountLocked.note.title')}</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {t('specificIssues.accountLocked.note.description')}
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
                      <h3 className="text-white text-xl font-semibold mb-3">{t('specificIssues.twoFactorAuth.title')}</h3>
                      <p className="text-gray-300 mb-4">
                        {t('specificIssues.twoFactorAuth.description')}
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-blue-400 font-medium mb-1">{t('specificIssues.twoFactorAuth.authenticatorApp.title')}</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• {t('specificIssues.twoFactorAuth.authenticatorApp.issues.0')}</li>
                            <li>• {t('specificIssues.twoFactorAuth.authenticatorApp.issues.1')}</li>
                            <li>• {t('specificIssues.twoFactorAuth.authenticatorApp.issues.2')}</li>
                            <li>• {t('specificIssues.twoFactorAuth.authenticatorApp.issues.3')}</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-blue-400 font-medium mb-1">{t('specificIssues.twoFactorAuth.smsCode.title')}</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• {t('specificIssues.twoFactorAuth.smsCode.issues.0')}</li>
                            <li>• {t('specificIssues.twoFactorAuth.smsCode.issues.1')}</li>
                            <li>• {t('specificIssues.twoFactorAuth.smsCode.issues.2')}</li>
                            <li>• {t('specificIssues.twoFactorAuth.smsCode.issues.3')}</li>
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
                      <h3 className="text-white text-xl font-semibold mb-3">{t('specificIssues.socialLogin.title')}</h3>
                      <p className="text-gray-300 mb-4">
                        {t('specificIssues.socialLogin.description')}
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-purple-400 font-medium mb-1">{t('specificIssues.socialLogin.solutions.title')}</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• {t('specificIssues.socialLogin.solutions.fixes.0')}</li>
                            <li>• {t('specificIssues.socialLogin.solutions.fixes.1')}</li>
                            <li>• {t('specificIssues.socialLogin.solutions.fixes.2')}</li>
                            <li>• {t('specificIssues.socialLogin.solutions.fixes.3')}</li>
                            <li>• {t('specificIssues.socialLogin.solutions.fixes.4')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Password Reset */}
              <h3 className="text-2xl font-bold text-white mb-6">{t('passwordReset.title')}</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t('passwordReset.steps.0.step')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold mb-2">{t('passwordReset.steps.0.title')}</h3>
                      <p className="text-gray-300 text-sm">
                        {t('passwordReset.steps.0.description')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t('passwordReset.steps.1.step')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold mb-2">{t('passwordReset.steps.1.title')}</h3>
                      <p className="text-gray-300 text-sm">
                        {t('passwordReset.steps.1.description')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t('passwordReset.steps.2.step')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold mb-2">{t('passwordReset.steps.2.title')}</h3>
                      <p className="text-gray-300 text-sm">
                        {t('passwordReset.steps.2.description')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t('passwordReset.steps.3.step')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold mb-2">{t('passwordReset.steps.3.title')}</h3>
                      <p className="text-gray-300 text-sm">
                        {t('passwordReset.steps.3.description')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t('passwordReset.steps.4.step')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold mb-2">{t('passwordReset.steps.4.title')}</h3>
                      <p className="text-gray-300 text-sm">
                        {t('passwordReset.steps.4.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Issues */}
              <h3 className="text-2xl font-bold text-white mb-6">{t('emailIssues.title')}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-400" />
                    {t('emailIssues.checkFolders.title')}
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• {t('emailIssues.checkFolders.folders.0')}</li>
                    <li>• {t('emailIssues.checkFolders.folders.1')}</li>
                    <li>• {t('emailIssues.checkFolders.folders.2')}</li>
                    <li>• {t('emailIssues.checkFolders.folders.3')}</li>
                    <li>• {t('emailIssues.checkFolders.folders.4')}</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    {t('emailIssues.commonIssues.title')}
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• {t('emailIssues.commonIssues.issues.0')}</li>
                    <li>• {t('emailIssues.commonIssues.issues.1')}</li>
                    <li>• {t('emailIssues.commonIssues.issues.2')}</li>
                    <li>• {t('emailIssues.commonIssues.issues.3')}</li>
                    <li>• {t('emailIssues.commonIssues.issues.4')}</li>
                  </ul>
                </div>

              </div>

              {/* Account Recovery */}
              <h3 className="text-2xl font-bold text-white mb-6">{t('accountRecovery.title')}</h3>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-blue-400 text-lg font-semibold mb-3">{t('accountRecovery.title')}</h3>
                    <p className="text-gray-300 mb-4">
                      {t('accountRecovery.description')}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white font-medium mb-1">{t('accountRecovery.whatWeNeed.title')}</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• {t('accountRecovery.whatWeNeed.items.0')}</li>
                          <li>• {t('accountRecovery.whatWeNeed.items.1')}</li>
                          <li>• {t('accountRecovery.whatWeNeed.items.2')}</li>
                          <li>• {t('accountRecovery.whatWeNeed.items.3')}</li>
                          <li>• {t('accountRecovery.whatWeNeed.items.4')}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{t('accountRecovery.verificationProcess.title')}</h4>
                        <p className="text-gray-300 text-sm">
                          {t('accountRecovery.verificationProcess.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prevention */}
              <h2 className="text-2xl font-bold text-white mb-6">{t('prevention.title')}</h2>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">{t('prevention.securityBestPractices.title')}</h3>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">{t('prevention.securityBestPractices.practices.0.title')}</h4>
                      <p className="text-gray-300 text-sm">
                        {t('prevention.securityBestPractices.practices.0.description')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">{t('prevention.securityBestPractices.practices.1.title')}</h4>
                      <p className="text-gray-300 text-sm">
                        {t('prevention.securityBestPractices.practices.1.description')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">{t('prevention.securityBestPractices.practices.2.title')}</h4>
                      <p className="text-gray-300 text-sm">
                        {t('prevention.securityBestPractices.practices.2.description')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">{t('prevention.securityBestPractices.practices.3.title')}</h4>
                      <p className="text-gray-300 text-sm">
                        {t('prevention.securityBestPractices.practices.3.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Still Having Issues */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">{t('stillHavingIssues.title')}</h3>
                <p className="text-gray-300 mb-4">
                  {t('stillHavingIssues.description')}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    {t('stillHavingIssues.contactSupport')}
                  </Link>
                  <Link
                    href="/help/security/two-factor-authentication"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    {t('stillHavingIssues.twoFaHelp')}
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