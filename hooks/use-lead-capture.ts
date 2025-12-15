import { useState, useCallback } from "react";

export interface LeadCaptureData {
  email: string;
  source: string;
  timestamp: number;
  additionalData?: Record<string, any>;
}

export interface LeadCaptureResult {
  success: boolean;
  message: string;
  error?: string;
}

export interface UseLeadCaptureOptions {
  source: string;
  onSuccess?: (data: LeadCaptureData) => void;
  onError?: (error: string) => void;
  dedupeWindow?: number; // milliseconds to prevent duplicate submissions
}

export function useLeadCapture(options: UseLeadCaptureOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<number | null>(null);

  const { source, onSuccess, onError, dedupeWindow = 30000 } = options;

  // Check if email was recently submitted to prevent spam
  const checkDedupe = useCallback(
    (email: string): boolean => {
      const storageKey = `lead-capture-${email.toLowerCase()}`;
      const lastSubmitted = localStorage.getItem(storageKey);

      if (lastSubmitted) {
        const timeDiff = Date.now() - parseInt(lastSubmitted);
        return timeDiff < dedupeWindow;
      }

      return false;
    },
    [dedupeWindow]
  );

  // Store successful submission to prevent duplicates
  const markSubmitted = useCallback((email: string) => {
    const storageKey = `lead-capture-${email.toLowerCase()}`;
    localStorage.setItem(storageKey, Date.now().toString());
  }, []);

  // Validate email format
  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  // Main submission function
  const submitLead = useCallback(
    async (email: string, additionalData?: Record<string, any>): Promise<LeadCaptureResult> => {
      setIsSubmitting(true);

      try {
        // Validate email format
        if (!validateEmail(email)) {
          throw new Error("Please enter a valid email address");
        }

        // Check for recent submission
        if (checkDedupe(email)) {
          throw new Error("Email already submitted recently. Please try again later.");
        }

        const leadData: LeadCaptureData = {
          email: email.toLowerCase().trim(),
          source,
          timestamp: Date.now(),
          additionalData,
        };

        // TODO: Replace with actual API integration
        // This simulates an API call with realistic timing
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

        // Simulate occasional failures (10% failure rate for testing)
        if (Math.random() < 0.1) {
          throw new Error("Service temporarily unavailable. Please try again.");
        }

        // Mark as submitted for deduplication
        markSubmitted(email);
        setLastSubmission(Date.now());

        // Store lead data locally until API integration
        const existingLeads = JSON.parse(localStorage.getItem("captured-leads") || "[]");
        existingLeads.push(leadData);
        localStorage.setItem("captured-leads", JSON.stringify(existingLeads));

        const result: LeadCaptureResult = {
          success: true,
          message: "Thank you! Check your email for your free SEO checklist.",
        };

        onSuccess?.(leadData);
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Something went wrong. Please try again.";

        const result: LeadCaptureResult = {
          success: false,
          message: errorMessage,
          error: errorMessage,
        };

        onError?.(errorMessage);
        return result;
      } finally {
        setIsSubmitting(false);
      }
    },
    [source, onSuccess, onError, checkDedupe, markSubmitted, validateEmail]
  );

  // Check if user has already submitted from this source recently
  const hasRecentSubmission = useCallback((): boolean => {
    return lastSubmission !== null && Date.now() - lastSubmission < dedupeWindow;
  }, [lastSubmission, dedupeWindow]);

  // Get all captured leads (for testing/debugging)
  const getCapturedLeads = useCallback((): LeadCaptureData[] => {
    return JSON.parse(localStorage.getItem("captured-leads") || "[]");
  }, []);

  return {
    submitLead,
    isSubmitting,
    hasRecentSubmission,
    getCapturedLeads,
    validateEmail,
  };
}
