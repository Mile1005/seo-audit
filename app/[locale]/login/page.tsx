"use client";

import { useState, Suspense } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

function LoginContent() {
  const t = useTranslations('auth.login');
  const tErrors = useTranslations('auth.errors');
  const params = useParams();
  const locale = params.locale as string;
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || `/${locale}/dashboard`;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signIn('google', {
        callbackUrl: returnUrl,
      });
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError(tErrors('serverError'));
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (result?.error) {
        setError(tErrors('invalidCredentials'));
      } else if (result?.ok) {
        const session = await getSession();
        router.push(returnUrl);
      } else {
        setError(tErrors('serverError'));
      }
    } catch (error) {
      setError(tErrors('serverError'));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[80vh] py-12 px-4">
        <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-800 text-white relative">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded">Skip to main content</a>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2" id="main-content">{t('title')} <span aria-hidden>👋</span></h1>
            <p className="text-gray-300">{t('subtitle')}</p>
          </div>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-900/80 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white border-2 border-gray-300 text-gray-800 py-3 px-4 rounded-xl font-medium hover:border-blue-500 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3 mb-6 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
            aria-label={t('google')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {loading ? t('submit') + '...' : t('google')}
          </motion.button>
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-900 text-gray-400 font-medium">{t('orContinueWith')}</span>
            </div>
          </div>
          <form onSubmit={handleEmailSignIn} action="/api/auth/signin" method="post" className="space-y-6" aria-label="Login form">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                {t('email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-3 py-3 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-950 text-white placeholder:text-gray-500"
                  placeholder={t('emailPlaceholder')}
                  aria-required="true"
                  aria-label={t('email')}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-2">
                {t('password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-12 w-full px-3 py-3 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-950 text-white placeholder:text-gray-500"
                  placeholder={t('passwordPlaceholder')}
                  aria-required="true"
                  aria-label={t('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-700 rounded"
                  aria-checked={formData.rememberMe}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">
                  {t('rememberMe')}
                </label>
              </div>
              <Link
                href={`/${locale}/forgot-password`}
                className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                {t('forgotPassword')}
              </Link>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              aria-label={t('submit')}
            >
              {loading ? t('submit') + '...' : t('submit')}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </motion.button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              {t('noAccount')}{' '}
              <Link
                href={`/${locale}/signup`}
                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                {t('signupLink')} →
              </Link>
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <Link href={`/${locale}/terms`} className="text-blue-400 hover:text-blue-300">Terms</Link>
              {' '}and{' '}
              <Link href={`/${locale}/privacy`} className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Access Your SEO Dashboard</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Sign in to unlock powerful SEO tools and insights that help you optimize your website for better search rankings.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real-Time Analytics</h3>
            <p className="text-gray-400 text-sm">
              Monitor your website's performance metrics, Core Web Vitals, and SEO health in real-time with our comprehensive dashboard.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Insights</h3>
            <p className="text-gray-400 text-sm">
              Get intelligent recommendations powered by machine learning to fix SEO issues and improve your search rankings automatically.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Secure & Reliable</h3>
            <p className="text-gray-400 text-sm">
              Your data is protected with enterprise-grade security, two-factor authentication, and encrypted connections for peace of mind.
            </p>
          </div>
        </div>

        {/* What You Get Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">What You Get With Your Account</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Comprehensive SEO Audits</h3>
                <p className="text-gray-400 text-sm">Run unlimited audits to identify and fix technical SEO issues across your entire website.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Keyword Tracking</h3>
                <p className="text-gray-400 text-sm">Monitor your keyword rankings and discover new opportunities to improve your visibility.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Competitor Analysis</h3>
                <p className="text-gray-400 text-sm">Compare your performance against competitors and learn from their strategies.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Backlink Monitoring</h3>
                <p className="text-gray-400 text-sm">Track your backlink profile, identify toxic links, and discover link-building opportunities.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Performance Tracking</h3>
                <p className="text-gray-400 text-sm">Monitor page speed, Core Web Vitals, and mobile usability to ensure optimal user experience.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Custom Reports</h3>
                <p className="text-gray-400 text-sm">Generate professional SEO reports in PDF format to share with your team and clients.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800/50 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Enterprise-Grade Security</h2>
              <p className="text-gray-300">Your account and data are protected by industry-leading security measures</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">🔐 Two-Factor Authentication</h3>
              <p className="text-gray-400 text-sm">Add an extra layer of security with 2FA protection for your account.</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">🔒 SSL Encryption</h3>
              <p className="text-gray-400 text-sm">All data transmitted between your browser and our servers is encrypted.</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">🛡️ SOC 2 Compliant</h3>
              <p className="text-gray-400 text-sm">We follow strict security standards to protect your sensitive information.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function LoginPage() {
  return (
    <MainLayout>
      {/* Server-rendered SEO content */}
      <div className="sr-only">
        <h2>Secure Account Access</h2>
        <p>Sign in to your AI SEO Turbo account to access advanced SEO tools and analytics.</p>
        <h2>Authentication Options</h2>
        <p>Choose from Google OAuth or email/password authentication for secure access.</p>
        <h2>Account Security Features</h2>
        <p>Our platform includes two-factor authentication and secure password recovery options.</p>
      </div>
      
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <LoginContent />
      </Suspense>
    </MainLayout>
  );
}
