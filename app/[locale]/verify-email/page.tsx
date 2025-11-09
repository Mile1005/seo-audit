'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'

function VerifyEmailContent() {
  const t = useTranslations('auth.verifyEmail');
  const tErrors = useTranslations('auth.errors');
  const params = useParams();
  const locale = params.locale as string;
  
  const [loading, setLoading] = useState(true)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')
  const [resending, setResending] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setError('Verification token is missing')
      setLoading(false)
      return
    }

    // Verify email with token
    fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Email verified successfully') {
          setVerified(true)
          setTimeout(() => {
            router.push('/login?message=Email verified successfully')
          }, 3000)
        } else {
          setError(data.message || 'Failed to verify email')
        }
      })
      .catch(() => {
        setError('Failed to verify email')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [token, router])

  const handleResendVerification = async () => {
    setResending(true)
    setError('')

    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'placeholder@email.com' }), // You'd get this from session/context
      })

      if (!response.ok) {
        throw new Error('Failed to resend verification email')
      }

      // Show success message
      setError('')
    } catch (error: any) {
      setError(error.message || 'Failed to resend verification email')
    } finally {
      setResending(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your email...</p>
        </div>
      </div>
    )
  }

  // Success state
  if (verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Email Verified! 🎉
          </h1>
          
          <p className="text-gray-600 mb-8">
            Your email has been successfully verified. You can now access all features of your account.
          </p>

          <p className="text-sm text-gray-500 mb-4">
            Redirecting to login page...
          </p>

          <Link 
            href="/login"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Continue to Login
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    )
  }

  // Error state
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 text-center"
      >
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Verification Failed ❌
        </h1>
        
        <p className="text-gray-600 mb-8">
          {error || 'Unable to verify your email. The verification link may be invalid or expired.'}
        </p>

        <div className="space-y-4">
          <button
            onClick={handleResendVerification}
            disabled={resending}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {resending ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Resend Verification Email
              </>
            )}
          </button>

          <Link 
            href="/signup"
            className="block text-center text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
          >
            Back to Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
