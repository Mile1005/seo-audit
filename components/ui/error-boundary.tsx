import React from "react";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to monitoring service
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Call custom error handler
    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} reset={this.reset} />;
      }

      return (
        <DefaultErrorFallback
          error={this.state.error!}
          errorInfo={this.state.errorInfo}
          reset={this.reset}
        />
      );
    }

    return this.props.children;
  }
}

// Default error fallback component
interface DefaultErrorFallbackProps {
  error: Error;
  errorInfo: React.ErrorInfo | null;
  reset: () => void;
}

function DefaultErrorFallback({ error, errorInfo, reset }: DefaultErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === "development";

  const goHome = () => {
    window.location.href = "/";
  };

  const goBack = () => {
    window.history.back();
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Error Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            We&apos;re sorry, but an unexpected error occurred. Please try one of the options below.
          </p>
        </div>

        {/* Error Details (Development Only) */}
        {isDevelopment && (
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Error Details:</h3>
            <p className="text-sm text-red-600 dark:text-red-400 font-mono break-all">
              {error.message}
            </p>
            {error.stack && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-300">
                  Stack Trace
                </summary>
                <pre className="mt-2 text-xs text-gray-600 dark:text-gray-300 overflow-auto max-h-32">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>

          <button
            onClick={reloadPage}
            className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload Page
          </button>

          <div className="flex space-x-3">
            <button
              onClick={goBack}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>

            <button
              onClick={goHome}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </button>
          </div>
        </div>

        {/* Support Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            If this problem persists, please{" "}
            <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// API Error boundary specifically for API calls
interface ApiErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
  onRetry?: () => void;
}

export function ApiErrorBoundary({ children, fallback, onRetry }: ApiErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={
        fallback ||
        (({ error, reset }: { error: Error; reset: () => void }) => (
          <ApiErrorFallback error={error} retry={onRetry || reset} />
        ))
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// API-specific error fallback
function ApiErrorFallback({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4">
        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Connection Error</h3>

      <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-sm">
        {error.message || "Failed to load data. Please check your connection and try again."}
      </p>

      <button
        onClick={retry}
        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Retry
      </button>
    </div>
  );
}

// Form error boundary for form submissions
export function FormErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
            <h3 className="font-semibold text-red-800 dark:text-red-200">Form Error</h3>
          </div>
          <p className="text-red-700 dark:text-red-300 text-sm mb-3">
            {error.message || "An error occurred while processing the form."}
          </p>
          <button
            onClick={reset}
            className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
          >
            Reset Form
          </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

// Hook for programmatic error handling
export function useErrorHandler() {
  const handleError = (error: Error, context?: string) => {
    console.error(`Error${context ? ` in ${context}` : ""}:`, error);

    // You could integrate with error reporting services here
    // e.g., Sentry, LogRocket, etc.

    // Show user-friendly notification
    if (typeof window !== "undefined") {
      // You could integrate with your notification system here
      console.warn("Error occurred:", error.message);
    }
  };

  return { handleError };
}

export default ErrorBoundary;
