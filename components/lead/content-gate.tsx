"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Lock, 
  Unlock, 
  CheckCircle, 
  Star, 
  Download, 
  ArrowRight,
  FileText,
  AlertCircle
} from "lucide-react"
import { useLeadCapture } from "../../hooks/use-lead-capture"
import { useTranslations } from 'next-intl'

export interface ContentGateProps {
  content: {
    title: string
    description: string
    previewText: string
    fullContent: string
    downloadUrl?: string
    type: 'checklist' | 'guide' | 'template' | 'report'
  }
  gateTitle?: string
  gateDescription?: string
  className?: string
}

export function ContentGate({
  content,
  gateTitle,
  gateDescription,
  className = ""
}: ContentGateProps) {
  const t = useTranslations('lead.contentGate')
  
  // Use provided props or fall back to translations
  const finalGateTitle = gateTitle || t('messages.gateTitle')
  const finalGateDescription = gateDescription || t('messages.gateDescription')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)

  const { submitLead, isSubmitting } = useLeadCapture({
    source: 'content-gate',
    onSuccess: () => {
      setIsUnlocked(true)
      setResult({ success: true, message: 'Content unlocked! Enjoy your exclusive resource.' })
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

    await submitLead(email.trim(), { 
      content_title: content.title,
      content_type: content.type
    })
  }

  const getContentIcon = () => {
    switch (content.type) {
      case 'checklist': return <CheckCircle className="w-5 h-5" />
      case 'guide': return <FileText className="w-5 h-5" />
      case 'template': return <Star className="w-5 h-5" />
      case 'report': return <Download className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const getContentTypeLabel = () => {
    switch (content.type) {
      case 'checklist': return t('contentTypes.checklist')
      case 'guide': return t('contentTypes.guide')
      case 'template': return t('contentTypes.template')
      case 'report': return t('contentTypes.report')
      default: return t('contentTypes.resource')
    }
  }

  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      {/* Content Header */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
        
        {/* Content Type Badge */}
        <div className="p-6 pb-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-3 py-1">
              <span className="text-purple-400">
                {getContentIcon()}
              </span>
              <span className="text-purple-300 text-sm font-medium">
                {t('premiumLabel')} {getContentTypeLabel()}
              </span>
            </div>
            
            {isUnlocked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-1 text-green-400 text-sm"
              >
                <Unlock className="w-4 h-4" />
                <span>{t('status.unlocked')}</span>
              </motion.div>
            )}
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            {content.title}
          </h3>
          
          <p className="text-gray-300 text-lg leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Content Preview */}
        <div className="px-6 pb-6">
          <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6 relative">
            <div className="prose prose-sm prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed">
                {content.previewText}
              </div>
            </div>

            {/* Gradient Overlay for Locked Content */}
            {!isUnlocked && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/50 to-slate-800 rounded-xl pointer-events-none" />
            )}

            {/* Lock Overlay */}
            <AnimatePresence>
              {!isUnlocked && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 max-w-sm mx-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    
                    <h4 className="text-lg font-bold text-white mb-2">
                      {finalGateTitle}
                    </h4>
                    
                    <p className="text-gray-300 text-sm mb-6">
                      {finalGateDescription}
                    </p>

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} action="/api/lead-capture" method="POST" className="space-y-4">
                      <input
                        ref={emailInputRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('messages.enterEmail')}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                        aria-describedby="gate-error"
                        disabled={isSubmitting}
                      />

                      {/* Error Message */}
                      <AnimatePresence>
                        {result && !result.success && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            id="gate-error"
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
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>{t('status.unlocking')}</span>
                          </>
                        ) : (
                          <>
                            <Unlock className="w-4 h-4" />
                            <span>{t('buttons.unlockContent')}</span>
                          </>
                        )}
                      </motion.button>
                    </form>

                    <p className="text-xs text-gray-400 mt-3">
                      {t('messages.securityNotice')}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Unlocked Content */}
        <AnimatePresence>
          {isUnlocked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 pb-6"
            >
              {/* Success Message */}
              <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-green-300 text-sm">
                  {t('messages.successMessage', { type: getContentTypeLabel().toLowerCase() })}
                </span>
              </div>

              {/* Full Content */}
              <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6">
                <div className="prose prose-sm prose-invert max-w-none">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {content.fullContent}
                  </div>
                </div>

                {/* Download CTA */}
                {content.downloadUrl && (
                  <div className="mt-6 pt-6 border-t border-slate-700/30">
                    <motion.a
                      href={content.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t('buttons.downloadPdf')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
