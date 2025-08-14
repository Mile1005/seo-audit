"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FormErrors {
  pageUrl?: string;
  targetKeyword?: string;
  email?: string;
}

// Utility function to add HTTPS if missing
function ensureHttps(url: string): string {
  if (!url) return url;

  // Remove any leading/trailing whitespace
  url = url.trim();

  // If it already has a protocol, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Add https:// prefix
  return `https://${url}`;
}

// URL validation function
function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(ensureHttps(url));
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function Page() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    pageUrl: "",
    targetKeyword: "",
    email: "",
  });

  // GSC Authentication state
  const [isGscAuthenticated, setIsGscAuthenticated] = useState(false);
  const [isGscLoading, setIsGscLoading] = useState(true);
  const [isGscConnecting, setIsGscConnecting] = useState(false);

  useEffect(() => {
    checkGscAuthStatus();
    
    // Check for URL parameters indicating GSC auth result
    const urlParams = new URLSearchParams(window.location.search);
    const gscSuccess = urlParams.get('gsc_success');
    const gscError = urlParams.get('gsc_error');
    
    if (gscSuccess === 'true') {
      console.log('GSC authentication successful');
      setIsGscAuthenticated(true);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (gscError) {
      console.error('GSC authentication failed:', gscError);
      setIsGscAuthenticated(false);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Listen for messages from the popup window
    const handleMessage = (event: MessageEvent) => {
      console.log('Received message event:', event.data);
      if (event.data.type === 'GSC_AUTH_SUCCESS') {
        console.log('GSC authentication successful via popup message');
        setIsGscAuthenticated(true);
        setIsGscConnecting(false);
      } else if (event.data.type === 'GSC_AUTH_ERROR') {
        console.error('GSC authentication failed via popup message:', event.data.error);
        setIsGscAuthenticated(false);
        setIsGscConnecting(false);
        alert(`Google Search Console authentication failed: ${event.data.error}`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const checkGscAuthStatus = async () => {
    try {
      const response = await fetch("/api/debug/gsc-config");
      const data = await response.json();
      setIsGscAuthenticated(data.isConfigured && data.hasTokens);
    } catch (error) {
      console.error("Error checking GSC status:", error);
      setIsGscAuthenticated(false);
    } finally {
      setIsGscLoading(false);
    }
  };

  const handleGscConnect = async () => {
    setIsGscConnecting(true);
    try {
      // Generate a unique state parameter
      const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      const response = await fetch("/api/auth/gsc/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state }),
      });
      const data = await response.json();
      
      if (data.authUrl) {
        // Open the auth URL in a new window
        const authWindow = window.open(data.authUrl, "gsc-auth", "width=600,height=700");
        
        if (!authWindow) {
          alert("Please allow popups for this site to connect to Google Search Console");
          return;
        }
        
        // Poll for completion more frequently
        const checkAuth = setInterval(async () => {
          try {
            // Check if window is still open
            if (authWindow.closed) {
              clearInterval(checkAuth);
              console.log('Auth window closed, checking status...');
              // Check authentication status after window closes
              await checkGscAuthStatus();
              return;
            }
            
            const statusResponse = await fetch("/api/debug/gsc-config");
            const statusData = await statusResponse.json();
            console.log('Polling GSC status:', statusData);
            
            if (statusData.hasTokens) {
              clearInterval(checkAuth);
              authWindow.close();
              setIsGscAuthenticated(true);
              setIsGscConnecting(false);
              console.log('GSC authentication completed via polling');
            }
          } catch (error) {
            console.error("Error checking auth status:", error);
          }
        }, 500); // Check every 500ms for faster response

        // Cleanup after 3 minutes (reduced from 5)
        setTimeout(() => {
          clearInterval(checkAuth);
          if (!authWindow.closed) {
            authWindow.close();
          }
          setIsGscConnecting(false);
        }, 180000);
      }
    } catch (error) {
      console.error("Error starting GSC auth:", error);
      setIsGscConnecting(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate page URL
    if (!formData.pageUrl.trim()) {
      newErrors.pageUrl = "Page URL is required";
    } else if (!isValidUrl(formData.pageUrl)) {
      newErrors.pageUrl = "Please enter a valid URL";
    }

    // Validate email if provided
    if (formData.email.trim() && !isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/audit.start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageUrl: ensureHttps(formData.pageUrl),
          targetKeyword: formData.targetKeyword.trim() || undefined,
          email: formData.email.trim() || undefined,
        }),
      });

      // Ensure we only try to parse JSON if the content-type is JSON
      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await response.json() : {};

      if (response.ok && data.runId) {
        // If API processed inline and returned result, cache it and pass inline flag
        if ((data as any).result) {
          try {
            sessionStorage.setItem(`audit:${(data as any).runId}`, JSON.stringify((data as any).result));
          } catch {}
          // Delay navigation one tick to ensure sessionStorage write is flushed
          setTimeout(() => router.push(`/audit/${(data as any).runId}?inline=true`), 0);
          return;
        }
        // Otherwise, redirect to results page and polling will pick it up
        router.push(`/audit/${(data as any).runId}`);
      } else {
        // Handle API errors
        setErrors({ pageUrl: (data as any).error || "Failed to start audit. Please try again." });
      }
    } catch (error) {
      console.error("Audit error:", error);
      setErrors({ pageUrl: "Network error. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Free AI Visibility Audit</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get comprehensive SEO analysis of your web pages with actionable insights and
            recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Start Your Free Audit</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="pageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Page URL *
                </label>
                <input
                  id="pageUrl"
                  name="pageUrl"
                  type="text"
                  value={formData.pageUrl}
                  onChange={(e) => handleInputChange("pageUrl", e.target.value)}
                  placeholder="example.com or https://example.com"
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.pageUrl ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  aria-describedby={errors.pageUrl ? "pageUrl-error" : undefined}
                />
                {errors.pageUrl && (
                  <p id="pageUrl-error" className="mt-1 text-sm text-red-600">
                    {errors.pageUrl}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="targetKeyword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Target Keyword (Optional)
                </label>
                <input
                  id="targetKeyword"
                  name="targetKeyword"
                  type="text"
                  value={formData.targetKeyword}
                  onChange={(e) => handleInputChange("targetKeyword", e.target.value)}
                  placeholder="e.g., best coffee shops"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.targetKeyword ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  aria-describedby={errors.targetKeyword ? "targetKeyword-error" : undefined}
                />
                {errors.targetKeyword && (
                  <p id="targetKeyword-error" className="mt-1 text-sm text-red-600">
                    {errors.targetKeyword}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address (Optional)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  We&apos;ll notify you when your audit is complete
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Starting Audit...
                  </div>
                ) : (
                  "Start Free SEO Audit"
                )}
              </button>
            </form>
          </div>

          {/* Features */}
          <div className="space-y-8">
            {/* GSC Authentication Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Google Search Console</h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isGscAuthenticated 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {isGscAuthenticated ? "Connected" : "Not Connected"}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Connect your Google Search Console to get search analytics data and insights for your audited pages.
              </p>

              {isGscLoading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ) : isGscAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-green-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Successfully connected to Google Search Console
                  </div>
                  <p className="text-xs text-gray-500">
                    Your audit results will now include search analytics data when available.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Connect to get search analytics insights
                  </div>
                  <button
                    onClick={handleGscConnect}
                    disabled={isGscConnecting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isGscConnecting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Connecting...
                      </div>
                    ) : (
                      "Connect Google Search Console"
                    )}
                  </button>
                  <p className="text-xs text-gray-500">
                    This will open Google&apos;s authentication page in a new window.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">What We Analyze</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Technical SEO</h3>
                    <p className="text-sm text-gray-600">
                      Meta tags, headings, schema markup, and more
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Content Quality</h3>
                    <p className="text-sm text-gray-600">
                      Readability, word count, and content structure
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">User Experience</h3>
                    <p className="text-sm text-gray-600">
                      Images, internal links, and page structure
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Actionable Insights</h3>
                    <p className="text-sm text-gray-600">
                      Specific recommendations to improve your SEO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
