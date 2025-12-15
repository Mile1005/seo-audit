import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingButtonProps {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText = "Loading...",
  children,
  disabled,
  className,
  onClick,
  type = "button",
}) => {
  return (
    <motion.button
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      disabled={disabled || loading}
      className={cn(
        "relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold",
        "hover:from-blue-700 hover:to-indigo-700 transition-all duration-200",
        "flex items-center justify-center gap-2 shadow-lg hover:shadow-xl",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        loading && "overflow-hidden",
        className
      )}
      type={type}
      onClick={onClick}
    >
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 flex items-center justify-center"
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>{loadingText}</span>
          </div>
        </motion.div>
      )}

      <motion.div animate={{ opacity: loading ? 0 : 1 }} className="flex items-center gap-2">
        {children}
      </motion.div>
    </motion.button>
  );
};

// Skeleton Loader Component
export const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("animate-pulse bg-gray-200 rounded", className)}>
      <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
    </div>
  );
};

// Progress Indicator
export const ProgressIndicator: React.FC<{
  steps: string[];
  currentStep: number;
  className?: string;
}> = ({ steps, currentStep, className }) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                index < currentStep
                  ? "bg-green-500 text-white"
                  : index === currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
              )}
            >
              {index < currentStep ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-1 w-12 mx-2 transition-all duration-300",
                  index < currentStep ? "bg-green-500" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-900">{steps[currentStep]}</p>
        <p className="text-xs text-gray-500 mt-1">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
};
