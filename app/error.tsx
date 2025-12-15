"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, MessageSquare } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <MainLayout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          {/* Error Visual */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-full mb-4">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full"></div>
          </div>

          {/* Content */}
          <h1 className="text-3xl font-bold text-white mb-4">Something went wrong</h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            We encountered an unexpected error. Our team has been notified and is working to fix
            this issue.
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === "development" && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-semibold text-red-400 mb-2">Error Details:</h3>
              <p className="text-xs text-gray-400 font-mono break-all">{error.message}</p>
              {error.digest && <p className="text-xs text-gray-500 mt-2">Digest: {error.digest}</p>}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={reset}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 border border-blue-500/20"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>

          {/* Support */}
          <div className="pt-8 border-t border-slate-800">
            <p className="text-sm text-gray-500 mb-4">
              Still having issues? Get in touch with our support team.
            </p>
            <Link href="/contact">
              <Button
                variant="ghost"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 px-4 py-2 rounded-lg font-medium transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
