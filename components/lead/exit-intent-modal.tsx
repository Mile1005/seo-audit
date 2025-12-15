"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, CheckSquare, ArrowRight, Gift } from "lucide-react";
import { useLeadCapture } from "../../hooks/use-lead-capture";

export interface ExitIntentModalProps {
  isEnabled?: boolean;
  onClose?: () => void;
  offer?: {
    title: string;
    subtitle: string;
    benefits: string[];
    ctaText: string;
  };
}

export function ExitIntentModal({
  isEnabled = true,
  onClose,
  offer = {
    title: "Wait! Don't Miss Your Free SEO Audit Checklist",
    subtitle: "Get our 47-point checklist that helped 1000+ websites increase traffic by 40%",
    benefits: [
      "Technical SEO audit checklist (15 critical points)",
      "Content optimization framework (12 proven strategies)",
      "Local SEO essentials (10 must-have optimizations)",
      "Performance optimization guide (10 speed boosters)",
    ],
    ctaText: "Get My Free Checklist",
  },
}: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [hasTriggered, setHasTriggered] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const { submitLead, isSubmitting } = useLeadCapture({
    source: "exit-intent-modal",
    onSuccess: () => {
      setResult({ success: true, message: "Perfect! Check your email for the checklist." });
      setEmail("");
      // Auto-close after success
      setTimeout(() => {
        handleClose();
      }, 3000);
    },
    onError: (error) => {
      setResult({ success: false, message: error });
    },
  });

  // Desktop: Mouse exit detection
  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (!hasTriggered && isEnabled && e.clientY <= 0 && e.relatedTarget === null) {
        setIsVisible(true);
        setHasTriggered(true);

        // Store that user has seen the modal
        localStorage.setItem("exit-intent-shown", Date.now().toString());
      }
    },
    [hasTriggered, isEnabled]
  );

  // Mobile: Scroll depth detection (80% of page)
  const handleScroll = useCallback(() => {
    if (hasTriggered || !isEnabled) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    // Trigger at 80% scroll depth on mobile
    if (scrollPercent >= 80 && window.innerWidth <= 768) {
      setIsVisible(true);
      setHasTriggered(true);
      localStorage.setItem("exit-intent-shown", Date.now().toString());
    }
  }, [hasTriggered, isEnabled]);

  // Check if modal was recently shown
  const checkRecentlyShown = useCallback((): boolean => {
    const lastShown = localStorage.getItem("exit-intent-shown");
    if (lastShown) {
      const daysSinceShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      return daysSinceShown < 7; // Don't show again for 7 days
    }
    return false;
  }, []);

  useEffect(() => {
    if (!isEnabled || checkRecentlyShown()) return;

    // Add event listeners
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleMouseLeave, handleScroll, isEnabled, checkRecentlyShown]);

  // Focus management
  useEffect(() => {
    if (isVisible && emailInputRef.current) {
      // Small delay to ensure modal is fully rendered
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 100);
    }
  }, [isVisible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isVisible, handleClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setResult({ success: false, message: "Please enter your email address" });
      emailInputRef.current?.focus();
      return;
    }

    await submitLead(email.trim(), {
      offer: offer.title,
      source_detail: "exit-intent-modal",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-modal-title"
          aria-describedby="exit-modal-description"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success State */}
            {result?.success ? (
              <div className="p-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-6">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Perfect! Check Your Email</h3>
                <p className="text-gray-300 mb-6">
                  Your free SEO checklist is on its way. The download link will arrive in your inbox
                  within 2 minutes.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-green-400">
                  <CheckSquare className="w-4 h-4" />
                  <span>47-point checklist sent successfully</span>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="relative p-6 pb-4">
                  {/* Gift Icon */}
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4">
                    <Gift className="w-6 h-6 text-white" />
                  </div>

                  <h2
                    id="exit-modal-title"
                    className="text-xl lg:text-2xl font-bold text-white text-center mb-2"
                  >
                    {offer.title}
                  </h2>

                  <p
                    id="exit-modal-description"
                    className="text-gray-300 text-center text-sm lg:text-base"
                  >
                    {offer.subtitle}
                  </p>
                </div>

                {/* Benefits */}
                <div className="px-6 pb-4">
                  <div className="space-y-3">
                    {offer.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mt-0.5">
                          <CheckSquare className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm leading-relaxed">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <div className="p-6 pt-2">
                  <form
                    onSubmit={handleSubmit}
                    action="/api/lead-capture"
                    method="POST"
                    className="space-y-4"
                  >
                    <div className="relative">
                      <input
                        ref={emailInputRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email for instant access"
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                        aria-describedby="exit-modal-error"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {result && !result.success && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          id="exit-modal-error"
                          className="flex items-center space-x-2 text-red-400 text-sm"
                          role="alert"
                          aria-live="polite"
                        >
                          <X className="w-4 h-4 flex-shrink-0" />
                          <span>{result.message}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !email.trim()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>{offer.ctaText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Trust Signals */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-400">
                      🔒 Secure • 📧 No spam • ⚡ Instant download
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
