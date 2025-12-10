"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, CheckCircle, AlertCircle, ArrowRight, Download } from "lucide-react"
import { useLeadCapture } from "../../hooks/use-lead-capture"
import { useTranslations } from "next-intl"

export interface EmailCaptureInlineProps {
  source: string
  title?: string
  description?: string
  placeholder?: string
  ctaText?: string
  variant?: 'default' | 'minimal' | 'accent'
  className?: string
  offer?: {
    title: string
    description: string
    icon?: React.ReactNode
  }
}

export function EmailCaptureInline({
  source,
  title,
  description,
  placeholder,
  ctaText,
  variant = 'default',
  className = "",
  offer
}: EmailCaptureInlineProps) {
  const t = useTranslations('emailCapture')
  
  // Use translations as defaults if props not provided
  const finalTitle = title || t('title')
  const finalDescription = description || t('description')
  const finalPlaceholder = placeholder || t('placeholder')
  const finalCtaText = ctaText || t('ctaText')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)

  const { submitLead, isSubmitting, validateEmail } = useLeadCapture({
    source,
    onSuccess: (data) => {
      setResult({ success: true, message: 'Thank you! Check your email for your free checklist.' })
      setEmail('')
    },
    onError: (error) => {
      setResult({ success: false, message: error })
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setResult({ success: false, message: 'Please enter your email address' })
      emailInputRef.current?.focus()
      return
    }

    await submitLead(email.trim(), { variant, offer: offer?.title })
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'minimal':
        return {
          container: 'bg-white/5 border border-white/20',
          input: 'bg-transparent border-white/30 text-white placeholder-gray-400',
          button: 'bg-white text-slate-900 hover:bg-gray-100'
        }
      case 'accent':
        return {
          container: 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30',
          input: 'bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400',
          button: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
        }
      default:
        return {
          container: 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50',
          input: 'bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400',
          button: 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white'
        }
    }
  }

  const styles = getVariantStyles()

  // Show success state
  if (result?.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${styles.container} backdrop-blur-sm rounded-2xl p-6 text-center ${className}`}
      >
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">
          {t('success.title')}
        </h2>
        <p className="text-gray-300 mb-4">
          {t('success.message')}
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-green-400">
          <Download className="w-4 h-4" />
          <span>{t('success.downloadHint')}</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${styles.container} backdrop-blur-sm rounded-2xl p-6 ${className}`}
    >
      {/* Offer Badge */}
      {offer && (
        <div className="flex items-center space-x-3 mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
          <div className="flex-shrink-0">
            {offer.icon || <Download className="w-5 h-5 text-blue-400" />}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-white text-sm">{offer.title}</div>
            <p className="text-xs text-gray-400">{offer.description}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
          {finalTitle}
        </h2>
        <p className="text-gray-300 text-sm lg:text-base">
          {finalDescription}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} action="/api/lead-capture" method="POST" className="space-y-4">
        <div className="relative">
          <label htmlFor="email-capture-input" className="sr-only">
            {finalPlaceholder}
          </label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email-capture-input"
            ref={emailInputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={finalPlaceholder}
            className={`
              w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
              ${styles.input}
            `}
            aria-describedby={result && !result.success ? "email-error" : undefined}
            aria-invalid={result && !result.success ? 'true' : 'false'}
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {result && !result.success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              id="email-error"
              className="flex items-center space-x-2 text-red-400 text-sm"
              role="alert"
              aria-live="polite"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{result.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center space-x-2
            ${styles.button}
          `}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>{t('sending')}</span>
            </>
          ) : (
            <>
              <span>{finalCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </form>

      {/* Trust Signals */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">
          {t('trustSignal')}
        </p>
      </div>
    </motion.div>
  )
}
