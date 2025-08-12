"use client";

import React, { useState, useEffect, useCallback } from "react";

interface AuditRun {
  id: string;
  pageUrl: string;
  targetKeyword?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  hasResults: boolean;
}

export default function Page() {
  const [status, setStatus] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [runId, setRunId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [auditHistory, setAuditHistory] = useState<AuditRun[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [gscStatus, setGscStatus] = useState<'not_connected' | 'connecting' | 'connected' | 'error'>('not_connected');
  const [gscState, setGscState] = useState<string | null>(null);

  const loadAuditHistory = useCallback(async () => {
    if (!email) return;
    
    try {
      const response = await fetch(`/api/audit.history?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      setAuditHistory(data.runs || []);
    } catch (error) {
      console.error("Failed to load audit history:", error);
    }
  }, [email]);

  const connectGsc = async () => {
    try {
      setGscStatus('connecting');
      const state = crypto.randomUUID();
      setGscState(state);
      
      const response = await fetch(`/api/auth/gsc/url?state=${state}`);
      const data = await response.json();
      
      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        setGscStatus('error');
      }
    } catch (error) {
      console.error('Failed to get GSC auth URL:', error);
      setGscStatus('error');
    }
  };

  const startAudit = async (formData: { pageUrl: string; targetKeyword: string; email?: string }) => {
    setStatus("starting");
    setResult(null);
    setRunId(null);

    try {
      const res = await fetch("/api/audit.start", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      
      const data = await res.json();
      
      if (!data.runId) {
        setStatus("error");
        return;
      }
      
      setRunId(data.runId);
      
      // Check if audit is already completed
      if (data.status === "ready") {
        setStatus("done");
        // Redirect to results page immediately
        window.location.href = `/audit/${data.runId}`;
        return;
      }
      
      if (data.status === "error") {
        setStatus("error");
        return;
      }
      
      // If still processing, poll for results
      setStatus("processing");
      const poll = async () => {
        const res = await fetch(`/api/audit.result?runId=${data.runId}`);
        const pollData = await res.json();
        
        if (pollData.status === "done") {
          setStatus("done");
          setResult(pollData.result);
          // Redirect to results page
          window.location.href = `/audit/${data.runId}`;
        } else if (pollData.status === "error") {
          setStatus("error");
        } else {
          setTimeout(poll, 2000); // Poll every 2 seconds
        }
      };
      poll();
    } catch (error) {
      console.error("Audit error:", error);
      setStatus("error");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      pageUrl: (e.currentTarget.elements.namedItem("pageUrl") as HTMLInputElement).value,
      targetKeyword: (e.currentTarget.elements.namedItem("targetKeyword") as HTMLInputElement).value,
      email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value,
    };
    setEmail(formData.email || "");
    startAudit(formData);
  };

  useEffect(() => {
    if (email && showHistory) {
      loadAuditHistory();
    }
  }, [email, showHistory, loadAuditHistory]);

  // Check for GSC callback results
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const gscSuccess = urlParams.get('gsc_success');
    const gscError = urlParams.get('gsc_error');
    const state = urlParams.get('state');

    if (gscSuccess === 'true' && state === gscState) {
      setGscStatus('connected');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (gscError) {
      setGscStatus('error');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [gscState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SEO Audit Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get comprehensive SEO analysis of your web pages with actionable insights and recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Start New Audit</h2>
            
            {/* GSC Connection Status */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Google Search Console</h3>
                  <p className="text-sm text-gray-600">
                    {gscStatus === 'connected' ? 'Connected - Enhanced insights available' :
                     gscStatus === 'connecting' ? 'Connecting...' :
                     gscStatus === 'error' ? 'Connection failed' :
                     'Not connected - Connect for enhanced insights'}
                  </p>
                </div>
                {gscStatus !== 'connected' && (
                  <button
                    onClick={connectGsc}
                    disabled={gscStatus === 'connecting'}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                  >
                    {gscStatus === 'connecting' ? 'Connecting...' : 'Connect GSC'}
                  </button>
                )}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="pageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Page URL *
                </label>
                <input
                  id="pageUrl"
                  name="pageUrl"
                  type="url"
                  placeholder="https://example.com/page"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="targetKeyword" className="block text-sm font-medium text-gray-700 mb-2">
                  Target Keyword
                </label>
                <input
                  id="targetKeyword"
                  name="targetKeyword"
                  type="text"
                  placeholder="e.g., best coffee shops"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  We&apos;ll notify you when your audit is complete
                </p>
              </div>

              <button
                type="submit"
                disabled={status === "starting" || status === "queued"}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {status === "starting" ? "Starting..." : 
                 status === "queued" ? "Processing..." : 
                 "Start SEO Audit"}
              </button>
            </form>

            {/* Status Messages */}
            {status === "starting" && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                  <p className="text-blue-800">Starting your SEO audit...</p>
                </div>
              </div>
            )}

            {status === "queued" && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600 mr-3"></div>
                  <p className="text-yellow-800">Your audit is being processed. This may take a few minutes.</p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">There was an error processing your audit. Please try again.</p>
              </div>
            )}
          </div>

          {/* Features & History */}
          <div className="space-y-8">
            {/* Features */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">What We Analyze</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Technical SEO</h3>
                    <p className="text-sm text-gray-600">Meta tags, headings, schema markup, and more</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Content Quality</h3>
                    <p className="text-sm text-gray-600">Readability, word count, and content structure</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">User Experience</h3>
                    <p className="text-sm text-gray-600">Images, internal links, and page structure</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Google Search Console</h3>
                    <p className="text-sm text-gray-600">Real performance data and search insights</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Actionable Insights</h3>
                    <p className="text-sm text-gray-600">Specific recommendations to improve your SEO</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit History */}
            {email && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Audit History</h2>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {showHistory ? "Hide" : "Show"}
                  </button>
                </div>
                
                {showHistory && (
                  <div className="space-y-3">
                    {auditHistory.length === 0 ? (
                      <p className="text-gray-500 text-sm">No previous audits found.</p>
                    ) : (
                      auditHistory.map((audit) => (
                        <div key={audit.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-gray-900 truncate">
                              {audit.pageUrl}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              audit.status === 'ready' ? 'bg-green-100 text-green-800' :
                              audit.status === 'failed' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {audit.status}
                            </span>
                          </div>
                          {audit.targetKeyword && (
                            <p className="text-sm text-gray-600 mb-2">
                              Keyword: {audit.targetKeyword}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            {new Date(audit.createdAt).toLocaleDateString()}
                          </p>
                          {audit.hasResults && (
                            <a
                              href={`/audit/${audit.id}`}
                              className="mt-2 inline-block text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              View Results →
                            </a>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
