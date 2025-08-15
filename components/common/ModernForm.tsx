"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  pageUrl: string;
  email: string;
}

interface FormErrors {
  pageUrl?: string;
  email?: string;
}

interface ModernFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
  errors: FormErrors;
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export default function ModernForm({ 
  onSubmit, 
  isSubmitting, 
  errors, 
  formData, 
  onInputChange 
}: ModernFormProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputVariants = {
    focused: { 
      scale: 1.02,
      boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)"
    },
    unfocused: { 
      scale: 1,
      boxShadow: "0 0 0px rgba(0, 212, 255, 0)"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="modern-form max-w-2xl mx-auto glass-card-enhanced p-8 md:p-12 rounded-2xl shadow-xl relative"
      aria-label="SEO Audit Form"
    >
      <motion.h2 
        className="text-3xl font-bold text-center mb-8 gradient-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Start Your Free Audit
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Page URL Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="pageUrl" className="block text-sm font-medium text-text-secondary mb-3">
            Page URL *
          </label>
          <motion.div
            variants={inputVariants}
            animate={focusedField === 'pageUrl' ? 'focused' : 'unfocused'}
            transition={{ duration: 0.2 }}
            className="rounded-lg overflow-hidden"
          >
            <input
              id="pageUrl"
              name="pageUrl"
              type="text"
              value={formData.pageUrl}
              onChange={(e) => onInputChange("pageUrl", e.target.value)}
              onFocus={() => setFocusedField('pageUrl')}
              onBlur={() => setFocusedField(null)}
              placeholder="example.com or https://example.com"
              required
              className="modern-input focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all duration-200"
              aria-required="true"
              aria-label="Page URL"
            />
          </motion.div>
          {errors.pageUrl && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2 text-sm status-error"
            >
              {errors.pageUrl}
            </motion.p>
          )}
        </motion.div>
        {/* Email Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-3">
            Email Address (Optional)
          </label>
          <motion.div
            variants={inputVariants}
            animate={focusedField === 'email' ? 'focused' : 'unfocused'}
            transition={{ duration: 0.2 }}
            className="rounded-lg overflow-hidden"
          >
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="your@email.com"
              className="modern-input focus:ring-2 focus:ring-accent-tertiary focus:border-accent-tertiary transition-all duration-200"
              aria-label="Email Address"
            />
          </motion.div>
          {errors.email && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2 text-sm status-error"
            >
              {errors.email}
            </motion.p>
          )}
          <p className="text-sm text-text-secondary mt-2">
            We&apos;ll notify you when your audit is complete
          </p>
        </motion.div>
        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-4 flex flex-col items-center"
        >
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Start Free SEO Audit"
          >
            <span className="hidden md:inline">{isSubmitting ? (
              <div className="flex items-center justify-center">
                <motion.div
                  className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Starting Audit...
              </div>
            ) : (
              "Start Free SEO Audit"
            )}</span>
            <span className="md:hidden">{isSubmitting ? (
              <motion.div
                className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <span>Start</span>
            )}</span>
            {/* AI-powered badge */}
            <span className="ml-2 px-2 py-1 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-xs font-semibold text-white shadow-md flex items-center gap-1">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
              AI-powered
            </span>
          </motion.button>
        </motion.div>
      </form>
      {/* Floating Elements */}
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent-primary/20 rounded-full blur-xl" />
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-accent-secondary/20 rounded-full blur-xl" />
    </motion.div>
  );
}
