"use client";

import React, { useState, useEffect, useRef, Component, ErrorInfo, ReactNode } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const ReportBuilder = dynamic(() => import("../../../components/common/ReportBuilder"), { ssr: false });
const FixPack = dynamic(() => import("../../../components/common/FixPack"), { ssr: false });
import PerformancePanel from "../../../components/audit/PerformancePanel";
import { AuditResult } from "../../../lib/heuristics";

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center">
          <div className="text-center p-8 glass-card max-w-md">
            <h2 className="text-xl font-bold text-text-primary mb-4">Something went wrong</h2>
            <p className="text-text-secondary mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button 
              onClick={() => this.setState({ hasError: false, error: null })}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface AuditResponse {
  status: "queued" | "running" | "ready" | "failed";
  result?: AuditResult;
  error?: string;
}

// Modern Score Ring Component with Animated Loading
function ModernScoreRing({
  score,
  label,
  size = "md",
}: {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
}) {
  const radius = size === "sm" ? 30 : size === "lg" ? 60 : 45;
  const strokeWidth = size === "sm" ? 4 : size === "lg" ? 8 : 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;

  const getColor = (score: number) => {
    if (score >= 80) return "#00ff88"; // green
    if (score >= 60) return "#ffaa00"; // yellow
    return "#ff4444"; // red
  };

  const getGlowColor = (score: number) => {
    if (score >= 80) return "rgba(0, 255, 136, 0.3)";
    if (score >= 60) return "rgba(255, 170, 0, 0.3)";
    return "rgba(255, 68, 68, 0.3)";
  };

  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <svg
          width={radius * 2 + strokeWidth}
          height={radius * 2 + strokeWidth}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            stroke="#333333"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Animated Progress circle */}
          <motion.circle
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            stroke={getColor(score)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
            transition={{ 
              duration: 2, 
              ease: "easeOut",
              delay: 0.5
            }}
            style={{ filter: `drop-shadow(0 0 8px ${getGlowColor(score)})` }}
          />
        </svg>
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            className={`font-bold text-text-primary ${size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-lg"}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.5,
              type: "spring",
              stiffness: 200
            }}
          >
            {score}
          </motion.span>
        </motion.div>
      </div>
      <motion.span
        className={`mt-2 text-center font-medium text-text-secondary ${size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

// Modern Detected Panel Component
function ModernDetectedPanel({ detected }: { detected: AuditResult["detected"] }) {
  return (
    <motion.div 
      className="glass-card-enhanced p-6 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Gradient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
      <h3 className="text-xl font-semibold text-text-primary mb-6">Detected Elements</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-accent-primary mb-4">Page Elements</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="font-medium text-text-secondary">Title:</span>
              <span className="text-text-primary text-right max-w-xs truncate">{detected.title || "Not found"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="font-medium text-text-secondary">Meta Description:</span>
              <span className="text-text-primary text-right max-w-xs truncate">{detected.meta_description || "Not found"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="font-medium text-text-secondary">Canonical:</span>
              <span className="text-text-primary text-right max-w-xs truncate">{detected.canonical || "Not found"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="font-medium text-text-secondary">H1:</span>
              <span className="text-text-primary text-right max-w-xs truncate">{detected.h1 || "Not found"}</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-accent-primary mb-4">Content Structure</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="font-medium text-text-secondary">H2 Headings:</span>
              <span className="text-text-primary">{detected.h2.length}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="font-medium text-text-secondary">H3 Headings:</span>
              <span className="text-text-primary">{detected.h3.length}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="font-medium text-text-secondary">Images:</span>
              <span className="text-text-primary">{detected.images.length}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="font-medium text-text-secondary">Internal Links:</span>
              <span className="text-text-primary">{detected.internal_links.length}</span>
            </div>
          </div>
        </div>
      </div>
      {detected.json_ld_types.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-accent-primary mb-3">Schema Types</h4>
          <div className="flex flex-wrap gap-2">
            {detected.json_ld_types.map((type, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full border border-accent-primary/30"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}
      </div>
    </motion.div>
  );
}

// Modern Issue List Component
function ModernIssueList({ issues }: { issues: AuditResult["issues"] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const groupedIssues = issues.reduce(
    (acc, issue) => {
      if (!acc[issue.severity]) acc[issue.severity] = [];
      acc[issue.severity].push(issue);
      return acc;
    },
    {} as Record<string, typeof issues>
  );

  const severityOrder = ["high", "medium", "low"];
  const severityColors: Record<string, string> = {
    high: "border-red-500/30 bg-red-500/10",
    medium: "border-yellow-500/30 bg-yellow-500/10",
    low: "border-blue-500/30 bg-blue-500/10",
  };

  const severityLabels: Record<string, string> = {
    high: "High Priority",
    medium: "Medium Priority",
    low: "Low Priority",
  };

  const severityTextColors: Record<string, string> = {
    high: "text-red-400",
    medium: "text-yellow-400",
    low: "text-blue-400",
  };

  return (
    <motion.div 
      className="glass-card-enhanced p-6 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Gradient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Issues Found ({issues.length})</h3>
      <div className="space-y-6">
        {severityOrder.map((severity) => {
          const severityIssues = groupedIssues[severity];
          if (!severityIssues) return null;

          return (
            <div key={severity} className="space-y-4">
              <h4 className={`text-lg font-medium ${severityTextColors[severity]}`}>
                {severityLabels[severity]} ({severityIssues.length})
              </h4>
              <div className="space-y-3">
                {severityIssues.map((issue, index) => (
                  <motion.div
                    key={`${severity}-${index}`}
                    className={`p-4 rounded-lg border ${severityColors[severity]} relative group`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start">
                                             <div className="flex-1">
                         <h5 className="font-medium text-text-primary mb-2">{issue.found}</h5>
                         <p className="text-text-secondary text-sm mb-3">{issue.why_it_matters}</p>
                         {issue.recommendation && (
                           <div className="bg-bg-secondary/50 p-3 rounded border border-accent-primary/20">
                             <p className="text-accent-primary text-sm font-medium mb-1">Recommendation:</p>
                             <p className="text-text-secondary text-sm">{issue.recommendation}</p>
                           </div>
                         )}
                       </div>
                       {issue.snippet && (
                         <button
                           onClick={() => copyToClipboard(issue.snippet || '', `${severity}-${index}`)}
                           className="ml-4 p-2 text-text-secondary hover:text-accent-primary transition-colors"
                           title="Copy code"
                         >
                          {copiedId === `${severity}-${index}` ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </motion.div>
  );
}

// Modern Quick Wins Component
function ModernQuickWins({ quickWins }: { quickWins: AuditResult["quick_wins"] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const impactColors = {
    high: "border-green-500/30 bg-green-500/10",
    medium: "border-yellow-500/30 bg-yellow-500/10",
    low: "border-blue-500/30 bg-blue-500/10",
  };

  return (
    <motion.div 
      className="glass-card-enhanced p-6 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Gradient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Quick Wins ({quickWins.length})</h3>
      <div className="space-y-3">
        {quickWins.map((win, index) => (
          <motion.div
            key={`win-${index}`}
            className={`p-4 rounded-lg border ${impactColors[win.estimated_impact]}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start">
                             <div className="flex-1">
                 <h5 className="font-medium text-text-primary mb-2">{win.action}</h5>
                 {win.snippet && (
                   <div className="mt-3 bg-bg-secondary/50 p-3 rounded border border-accent-primary/20">
                     <p className="text-accent-primary text-sm font-medium mb-1">Code:</p>
                     <pre className="text-text-secondary text-sm overflow-x-auto p-2 rounded bg-bg-secondary/20">
                       <code>{win.snippet}</code>
                     </pre>
                   </div>
                 )}
               </div>
               {win.snippet && (
                 <button
                   onClick={() => copyToClipboard(win.snippet || '', `win-${index}`)}
                   className="ml-4 p-2 text-text-secondary hover:text-accent-primary transition-colors"
                   title="Copy code"
                 >
                  {copiedId === `win-${index}` ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </motion.div>
  );
}

// Modern Action Buttons Component
function ModernActionButtons({ result }: { result: AuditResult }) {
  const [showReportBuilder, setShowReportBuilder] = useState(false);
  const [showFixPack, setShowFixPack] = useState(false);

  const downloadJSON = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `seo-audit-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      className="glass-card-enhanced p-6 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Gradient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Actions</h3>
      <div className="space-y-3">
        <button
          onClick={() => window.open(result.url, "_blank")}
          className="w-full px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 transition-colors"
        >
          View Page
        </button>
        <button
          onClick={() => setShowReportBuilder(true)}
          className="w-full px-4 py-2 bg-accent-secondary text-white rounded-lg hover:bg-accent-secondary/90 transition-colors"
        >
          📊 Generate Report
        </button>
        <button
          onClick={() => setShowFixPack(true)}
          className="w-full px-4 py-2 bg-accent-tertiary text-white rounded-lg hover:bg-accent-tertiary/90 transition-colors"
        >
          🔧 Copy Fix Pack
        </button>
        <button
          onClick={downloadJSON}
          className="btn-download-json"
        >
          Download JSON
        </button>
        <button
          onClick={() => {
            const url = new URL(result.url);
            window.open(
              `https://search.google.com/test/rich-results?url=${encodeURIComponent(result.url)}`,
              "_blank"
            );
          }}
          className="w-full px-4 py-2 bg-accent-quaternary text-white rounded-lg hover:bg-accent-quaternary/90 transition-colors"
        >
          Test Rich Results
        </button>
        <button
          onClick={() => {
            window.open(
              `https://pagespeed.web.dev/?url=${encodeURIComponent(result.url)}`,
              "_blank"
            );
          }}
          className="w-full px-4 py-2 bg-accent-quinary text-white rounded-lg hover:bg-accent-quinary/90 transition-colors"
        >
          PageSpeed Insights
        </button>
      </div>

      {/* Report Builder Modal */}
      {showReportBuilder && (
        <ReportBuilder
          isOpen={showReportBuilder}
          onClose={() => setShowReportBuilder(false)}
          result={result}
        />
      )}

      {/* Fix Pack Modal */}
      {showFixPack && (
        <FixPack isOpen={showFixPack} onClose={() => setShowFixPack(false)} result={result} />
      )}
      </div>
    </motion.div>
  );
}

// Modern Competitors Tab Component
function ModernCompetitorsTab({ result }: { result: AuditResult }) {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("us");
  const [serpResults, setSerpResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/serp.snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword.trim(), country }),
      });

      const data = await response.json();

      if (response.ok) {
        setSerpResults(data.results || []);
      } else {
        setError(data.error || "Failed to fetch competitor data");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getTitleLengthColor = (length: number) => {
    if (length < 30) return "text-red-600";
    if (length < 45) return "text-yellow-600";
    if (length <= 60) return "text-green-600";
    return "text-red-600";
  };

  const getTitleLengthStatus = (length: number) => {
    if (length < 30) return "Too Short";
    if (length < 45) return "Short";
    if (length <= 60) return "Optimal";
    return "Too Long";
  };

  const generateTitleSuggestions = (currentTitle: string, keyword: string) => {
    const suggestions = [];

    // Suggestion 1: Keyword first
    suggestions.push(`${keyword} - ${currentTitle.split(" - ")[0] || "Complete Guide"}`);

    // Suggestion 2: Brand + Keyword
    const brand = currentTitle.split(" - ")[1] || "Your Brand";
    suggestions.push(`${keyword} | ${brand}`);

    // Suggestion 3: Question format
    suggestions.push(`Best ${keyword} Guide: Complete Tutorial & Tips`);

    // Suggestion 4: Number format
    suggestions.push(`Top 10 ${keyword} Strategies for 2024`);

    return suggestions.filter((s) => s.length >= 45 && s.length <= 60);
  };

  return (
    <motion.div 
      className="glass-card p-6 animated-gradient-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-text-primary mb-6">Competitor Analysis</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="keyword" className="block text-sm font-medium text-text-secondary mb-1">
              Target Keyword
            </label>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter your target keyword"
              className="w-full px-3 py-2 bg-bg-primary border border-gray-700 rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-text-secondary mb-1">
              Country
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 bg-bg-primary border border-gray-700 rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
            >
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="de">Germany</option>
              <option value="fr">France</option>
              <option value="es">Spain</option>
              <option value="it">Italy</option>
              <option value="nl">Netherlands</option>
              <option value="jp">Japan</option>
              <option value="br">Brazil</option>
              <option value="mx">Mexico</option>
              <option value="in">India</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading || !keyword.trim()}
          className="w-full md:w-auto px-6 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Analyzing..." : "Analyze Competitors"}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Results Table */}
      {serpResults.length > 0 && (
        <motion.div 
          className="glass-card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-text-primary">
              Top 10 Search Results for &quot;{keyword}&quot;
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-primary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Length
                  </th>
                </tr>
              </thead>
              <tbody className="bg-bg-primary divide-y divide-gray-700">
                {serpResults.map((result, index) => (
                  <tr key={index} className="hover:bg-bg-secondary/20">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                      #{result.position}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-primary">
                      <div className="max-w-md">
                        <div className="font-medium text-accent-primary hover:text-accent-primary/90">
                          <a href={result.url} target="_blank" rel="noopener noreferrer">
                            {result.title}
                          </a>
                        </div>
                        <div className="text-text-secondary mt-1 line-clamp-2">{result.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      <div className="max-w-xs truncate">{result.url}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-medium ${getTitleLengthColor(result.title.length)}`}>
                        {result.title.length} chars
                      </span>
                      <div className="text-xs text-text-secondary">
                        {getTitleLengthStatus(result.title.length)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Title Suggestions */}
      {serpResults.length > 0 && result.detected.title && (
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-text-primary mb-6">
            Title Optimization Suggestions
          </h3>
          <div className="space-y-4">
            <div className="bg-bg-secondary/50 p-4 rounded-lg">
              <h4 className="font-medium text-text-primary mb-2">Current Title</h4>
              <p className="text-text-secondary">{result.detected.title}</p>
              <p className={`text-sm mt-1 ${getTitleLengthColor(result.detected.title.length)}`}>
                {result.detected.title.length} characters -{" "}
                {getTitleLengthStatus(result.detected.title.length)}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-text-primary mb-2">Suggested Improvements</h4>
              <div className="space-y-2">
                {generateTitleSuggestions(result.detected.title, keyword).map(
                  (suggestion, index) => (
                    <div key={index} className="bg-accent-primary/20 p-3 rounded-lg border border-accent-primary/30">
                      <p className="text-accent-primary font-medium">{suggestion}</p>
                      <p className="text-sm text-accent-primary/90 mt-1">
                        {suggestion.length} characters - Optimal
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Modern Crawl Tab Component
function ModernCrawlTab({ result }: { result: AuditResult }) {
  const [startUrl, setStartUrl] = useState(result.url);
  const [limit, setLimit] = useState(200);
  const [sameHostOnly, setSameHostOnly] = useState(true);
  const [maxDepth, setMaxDepth] = useState(5);
  const [crawlId, setCrawlId] = useState<string | null>(null);
  const [crawlStatus, setCrawlStatus] = useState<
    "idle" | "queued" | "running" | "ready" | "failed"
  >("idle");
  const [crawlResult, setCrawlResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCrawl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startUrl.trim()) return;

    setLoading(true);
    setError(null);
    setCrawlStatus("idle");

    try {
      const response = await fetch("/api/crawl/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startUrl: startUrl.trim(),
          limit,
          sameHostOnly,
          maxDepth,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCrawlId(data.crawlId);
        setCrawlStatus("queued");
        pollCrawlStatus(data.crawlId);
      } else {
        setError(data.error || "Failed to start crawl");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pollCrawlStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/crawl/get?id=${id}`);
      const data = await response.json();

      if (response.ok) {
        setCrawlStatus(data.status);

        if (data.status === "ready" && data.result) {
          setCrawlResult(data.result);
        } else if (data.status === "failed") {
          setError("Crawl failed");
        } else if (data.status === "queued" || data.status === "running") {
          // Continue polling
          setTimeout(() => pollCrawlStatus(id), 2000);
        }
      } else {
        setError(data.error || "Failed to get crawl status");
      }
    } catch (error) {
      setError("Network error while checking status.");
    }
  };

  const exportCSV = async () => {
    if (!crawlId) return;

    try {
      const response = await fetch(`/api/crawl/export?id=${crawlId}`);

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `crawl-${crawlId}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        setError("Failed to export CSV");
      }
    } catch (error) {
      setError("Network error while exporting.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "queued":
        return "text-yellow-600";
      case "running":
        return "text-blue-600";
      case "ready":
        return "text-green-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "queued":
        return "Queued";
      case "running":
        return "Running";
      case "ready":
        return "Completed";
      case "failed":
        return "Failed";
      default:
        return "Idle";
    }
  };

  return (
    <motion.div 
      className="glass-card p-6 animated-gradient-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-text-primary mb-6">Site Crawl</h3>
      <form onSubmit={startCrawl} className="space-y-4">
        <div>
          <label htmlFor="startUrl" className="block text-sm font-medium text-text-secondary mb-1">
            Start URL
          </label>
          <input
            type="url"
            id="startUrl"
            value={startUrl}
            onChange={(e) => setStartUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 bg-bg-primary border border-gray-700 rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="limit" className="block text-sm font-medium text-text-secondary mb-1">
              Page Limit
            </label>
            <input
              type="number"
              id="limit"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              min="1"
              max="500"
              className="w-full px-3 py-2 bg-bg-primary border border-gray-700 rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
            />
          </div>
          <div>
            <label htmlFor="maxDepth" className="block text-sm font-medium text-text-secondary mb-1">
              Max Depth
            </label>
            <input
              type="number"
              id="maxDepth"
              value={maxDepth}
              onChange={(e) => setMaxDepth(Number(e.target.value))}
              min="1"
              max="10"
              className="w-full px-3 py-2 bg-bg-primary border border-gray-700 rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sameHostOnly"
              checked={sameHostOnly}
              onChange={(e) => setSameHostOnly(e.target.checked)}
              className="h-4 w-4 text-accent-primary focus:ring-accent-primary border-gray-700 rounded"
            />
            <label htmlFor="sameHostOnly" className="ml-2 block text-sm text-text-primary">
              Same Host Only
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || crawlStatus === "running"}
          className="w-full md:w-auto px-6 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Starting..." : crawlStatus === "running" ? "Crawling..." : "Start Crawl"}
        </button>
      </form>

      {/* Status Display */}
      {crawlStatus !== "idle" && (
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-text-primary mb-6">Crawl Status</h3>
          <div className="flex items-center space-x-3">
            <span className={`font-medium ${getStatusColor(crawlStatus)}`}>
              {getStatusText(crawlStatus)}
            </span>
            {crawlStatus === "running" && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-primary"></div>
            )}
          </div>
          {crawlId && <p className="text-sm text-text-secondary mt-2">Crawl ID: {crawlId}</p>}
        </motion.div>
      )}

      {/* Error Display */}
      {error && (
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-red-400">{error}</p>
        </motion.div>
      )}

      {/* Results Display */}
      {crawlResult && (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Summary Stats */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-text-primary mb-6">Crawl Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-primary">{crawlResult.totalPages}</div>
                <div className="text-sm text-text-secondary">Total Pages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {crawlResult.successfulPages}
                </div>
                <div className="text-sm text-text-secondary">Successful</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{crawlResult.failedPages}</div>
                <div className="text-sm text-text-secondary">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(crawlResult.averageLoadTime)}ms
                </div>
                <div className="text-sm text-text-secondary">Avg Load Time</div>
              </div>
            </div>
          </motion.div>

          {/* Issues Summary */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-text-primary mb-6">Issues Found</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-lg border border-red-500/30">
                <div className="text-xl font-bold text-red-600">
                  {crawlResult.issues.noindex_pages}
                </div>
                <div className="text-sm text-text-secondary">Noindex Pages</div>
              </div>
              <div className="text-center p-3 rounded-lg border border-orange-500/30">
                <div className="text-xl font-bold text-orange-600">
                  {crawlResult.issues.missing_titles}
                </div>
                <div className="text-sm text-text-secondary">Missing Titles</div>
              </div>
              <div className="text-center p-3 rounded-lg border border-yellow-500/30">
                <div className="text-xl font-bold text-yellow-600">
                  {crawlResult.issues.missing_h1}
                </div>
                <div className="text-sm text-text-secondary">Missing H1</div>
              </div>
              <div className="text-center p-3 rounded-lg border border-blue-500/30">
                <div className="text-xl font-bold text-blue-600">
                  {crawlResult.issues.missing_meta_descriptions}
                </div>
                <div className="text-sm text-text-secondary">Missing Meta Descriptions</div>
              </div>
              <div className="text-center p-3 rounded-lg border border-purple-500/30">
                <div className="text-xl font-bold text-purple-600">
                  {crawlResult.issues.images_without_alt}
                </div>
                <div className="text-sm text-text-secondary">Images Without Alt</div>
              </div>
              <div className="text-center p-3 rounded-lg border border-indigo-500/30">
                <div className="text-xl font-bold text-indigo-600">
                  {crawlResult.issues.pages_without_canonical}
                </div>
                <div className="text-sm text-text-secondary">Missing Canonical</div>
              </div>
            </div>
          </motion.div>

          {/* Export Button */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Export Results</h3>
                <p className="text-sm text-text-secondary">Download detailed crawl data as CSV</p>
              </div>
              <button
                onClick={exportCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Export CSV
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Modern AI Insights Tab Component
function ModernAIInsightsTab({ result }: { result: AuditResult }) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiStatus, setAiStatus] = useState<"idle" | "loading" | "ready" | "failed">("idle");

  // Combine all text content for analysis
  const getContentText = () => {
    const textBlocks = result.detected.title || "";
    const headings = [
      result.detected.h1 || "",
      ...(result.detected.h2 || []),
      ...(result.detected.h3 || []),
    ].join(" ");
    const metaDesc = result.detected.meta_description || "";
    const sampleContent = `
      ${result.detected.title || "Sample Page Title"}
      ${result.detected.meta_description || "This is a sample page with content about SEO best practices and digital marketing strategies."}
      ${result.detected.h1 || "Main Page Heading"}
      ${result.detected.h2.join(". ")}
      ${result.detected.h3.join(". ")}
    `;
    return sampleContent.replace(/\s+/g, " ").trim();
  };

  const runAIAnalysis = async () => {
    setLoading(true);
    setError(null);
    setAiStatus("loading");
    try {
      const contentText = getContentText();
      const headings = [
        result.detected.h1 || "",
        ...(result.detected.h2 || []),
        ...(result.detected.h3 || []),
      ].filter(Boolean);
      const defaultTopics = [
        "SEO", "Marketing", "Tech", "Business", "Health", "News", "Education", "Entertainment"
      ];
      const localAI = await import("../../../lib/ai/localAI");
      const [
        summary,
        intent,
        sentiment,
        entities,
        topic,
        toxicity,
        language,
        paraphrase,
        questions,
        readability,
        topicGaps
      ] = await Promise.all([
        localAI.summarize(contentText),
        localAI.classifyIntent(contentText),
        localAI.sentimentAnalysis(contentText),
        localAI.extractEntities(contentText),
        localAI.classifyTopic(contentText, defaultTopics),
        localAI.detectToxicity(contentText),
        localAI.detectLanguage(contentText),
        localAI.paraphraseText(result.detected.meta_description || contentText),
        localAI.generateQuestions(contentText),
        Promise.resolve(localAI.computeReadability(contentText)),
        localAI.suggestTopicGaps(headings, []) // competitorHeadings can be added later
      ]);
      setAnalysis({
        summary,
        intent,
        sentiment,
        entities,
        topic,
        toxicity,
        language,
        paraphrase,
        questions,
        readability,
        topicGaps,
      });
      setAiStatus("ready");
    } catch (err) {
      setError("Failed to run AI analysis. Please try again.");
      setAiStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case "informational":
        return "text-blue-600";
      case "commercial":
        return "text-green-600";
      case "educational":
        return "text-purple-600";
      case "transactional":
        return "text-orange-600";
      case "navigational":
        return "text-gray-600";
      case "entertainment":
        return "text-pink-600";
      default:
        return "text-gray-600";
    }
  };

  const getIntentIcon = (intent: string) => {
    switch (intent) {
      case "informational":
        return "📊";
      case "commercial":
        return "💰";
      case "educational":
        return "📚";
      case "transactional":
        return "🛒";
      case "navigational":
        return "🧭";
      case "entertainment":
        return "🎮";
      default:
        return "📄";
    }
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 0.8) return "text-green-600";
    if (relevance >= 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <motion.div 
      className="glass-card p-6 animated-gradient-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">AI Content Analysis</h3>
          <p className="text-sm text-text-secondary">
            AI-powered insights using Hugging Face models (free tier)
          </p>
        </div>
        <button
          onClick={runAIAnalysis}
          disabled={loading}
          className="px-4 py-2 bg-accent-quinary text-white rounded-lg hover:bg-accent-quinary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Analyzing..." : "Run AI Analysis"}
        </button>
      </div>
      {/* AI Status */}
      <div className="flex items-center space-x-2">
        <div
          className={`w-2 h-2 rounded-full ${
            aiStatus === "ready"
              ? "bg-green-500"
              : aiStatus === "loading"
                ? "bg-yellow-500"
                : aiStatus === "failed"
                  ? "bg-red-500"
                  : "bg-gray-400"
          }`}
        ></div>
        <span className="text-sm text-text-secondary">
          {aiStatus === "ready"
            ? "AI Insights Ready"
            : aiStatus === "loading"
              ? "Running AI Analysis..."
              : aiStatus === "failed"
                ? "AI Analysis Failed"
                : "Idle"}
        </span>
      </div>
      {/* Error Display */}
      {error && (
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-red-400">{error}</p>
        </motion.div>
      )}
      {/* Analysis Results */}
      {analysis && (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Summary */}
          <motion.div className="glass-card p-6">
            <h4 className="text-xl font-semibold text-text-primary mb-4">Content Summary</h4>
            <div className="bg-bg-secondary/50 p-4 rounded-lg">
              <p className="text-text-primary leading-relaxed">{analysis.summary}</p>
            </div>
          </motion.div>
          {/* Intent */}
          <motion.div className="glass-card p-6">
            <h4 className="text-xl font-semibold text-text-primary mb-4">Content Intent</h4>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getIntentIcon(analysis.intent.intent)}</span>
              <div>
                <div className={`font-semibold ${getIntentColor(analysis.intent.intent)}`}>
                  {analysis.intent.intent.charAt(0).toUpperCase() + analysis.intent.intent.slice(1)}
                </div>
                <div className="text-sm text-text-secondary">
                  Confidence: {Math.round(analysis.intent.confidence * 100)}%
                </div>
              </div>
            </div>
          </motion.div>
          {/* Sentiment */}
          <motion.div className="glass-card p-6">
            <h4 className="text-xl font-semibold text-text-primary mb-4">Sentiment Analysis</h4>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">
                {analysis.sentiment[0]?.label === "POSITIVE" ? "😊" : analysis.sentiment[0]?.label === "NEGATIVE" ? "😞" : "😐"}
              </span>
              <div>
                <div className="font-semibold">
                  {analysis.sentiment[0]?.label}
                </div>
                <div className="text-sm text-text-secondary">
                  Confidence: {Math.round((analysis.sentiment[0]?.score || 0) * 100)}%
                </div>
              </div>
            </div>
          </motion.div>
          {/* Entities/Keywords */}
          <motion.div className="glass-card p-6">
            <h4 className="text-xl font-semibold text-text-primary mb-4">Keywords & Entities</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.entities.map((ent: any, i: number) => (
                <span key={i} className="px-3 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full border border-accent-primary/30">
                  {ent.word} <span className="text-xs text-text-secondary">({ent.entity_group || ent.entity})</span>
                </span>
              ))}
            </div>
          </motion.div>
          {/* Topic Classification */}
          <motion.div className="glass-card p-6">
            <h4 className="text-xl font-semibold text-text-primary mb-4">Topic Classification</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.topic.labels?.map((label: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-accent-secondary/20 text-accent-secondary text-xs rounded-full border border-accent-secondary/30">
                  {label}: {Math.round((analysis.topic.scores?.[i] || 0) * 100)}%
                </span>
              ))}
            </div>
          </motion.div>
          {/* Toxicity */}
          <motion.div className="glass-card p-6">
            <h4 className="text-xl font-semibold text-text-primary mb-4">Toxicity Detection</h4>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(analysis.toxicity) ? (
                analysis.toxicity.map((tox: any, i: number) => (
                  <span key={i} className="px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded-full border border-red-400/30">
                    {tox.label}: {Math.round((tox.score || 0) * 100)}%
                  </span>
                ))
              ) : (
                <p className="text-text-secondary text-sm">Could not load toxicity data.</p>
              )}
            </div>
          </motion.div>
          {/* Language Detection */}
          <motion.div className="glass-card p-6">
            <h4 className="text-xl font-semibold text-text-primary mb-4">Language Detection</h4>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(analysis.language) ? (
                analysis.language.map((lang: any, i: number) => (
                  <span key={i} className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-400/30">
                    {lang.label}: {Math.round((lang.score || 0) * 100)}%
                  </span>
                ))
              ) : (
                <p className="text-text-secondary text-sm">Could not load language data.</p>
              )}
            </div>
          </motion.div>
          {/* Paraphrasing */}
          <motion.div className="glass-card p-6">
            <h4 className="text-xl font-semibold text-text-primary mb-4">Meta Description Paraphrase</h4>
            <div className="bg-bg-secondary/50 p-4 rounded-lg">
              <p className="text-text-primary leading-relaxed">
                {analysis.paraphrase && analysis.paraphrase[0]?.generated_text 
                  ? analysis.paraphrase[0].generated_text 
                  : "No paraphrase available."}
              </p>
            </div>
          </motion.div>
          {/* Question Generation */}
          <motion.div className="glass-card p-6">
            <h4 className="text-xl font-semibold text-text-primary mb-4">FAQ (Question Generation)</h4>
            <ul className="list-disc pl-6">
              {Array.isArray(analysis.questions) ? (
                analysis.questions.map((q: any, i: number) => (
                  <li key={i} className="mb-2 text-text-secondary">{q.generated_text}</li>
                ))
              ) : (
                <p className="text-text-secondary text-sm">Could not generate questions.</p>
              )}
            </ul>
          </motion.div>
          {/* Readability */}
          <motion.div className="glass-card p-6">
            <h4 className="text-xl font-semibold text-text-primary mb-4">Readability Score</h4>
            <div className="text-2xl font-bold text-accent-primary mb-2">{analysis.readability}</div>
            <div className="text-sm text-text-secondary">Flesch-Kincaid Reading Ease (higher is easier to read, 60+ is good for most audiences)</div>
          </motion.div>
        </motion.div>
      )}
      {/* Loading State */}
      {loading && (
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent-primary"></div>
            <div>
              <div className="font-medium text-text-primary">Running AI Analysis</div>
              <div className="text-sm text-text-secondary">This may take a few moments on first run</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Modern Skeleton Loader Component
function ModernSkeletonLoader() {
  return (
    <motion.div 
      className="animate-pulse"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-bg-primary rounded-lg shadow-sm border p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <motion.div 
              key={i}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-20 h-20 bg-gray-700 rounded-full mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-16"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div 
            key={i}
            className="bg-bg-primary rounded-lg shadow-sm border p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <motion.div 
                  key={j}
                  className="h-20 bg-gray-700 rounded"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: j * 0.1 }}
                ></motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function AuditPageContent() {
  const params = useParams();
  const id = params.id as string;
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const isSampleMode = searchParams.get("sample") === "true";
  const isInline = searchParams.get("inline") === "true";
  const isServerless = process.env.NEXT_PUBLIC_DISABLE_DB === "true";

  const [auditData, setAuditData] = useState<AuditResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDevMode, setIsDevMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"audit" | "competitors" | "crawl" | "ai">("audit");
  const inlineLoadedRef = useRef(false);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Detect dev mode
  useEffect(() => {
    setIsDevMode(process.env.NODE_ENV === "development");
  }, []);

  // Create floating particles
  useEffect(() => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;

    // Create floating particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
      particle.style.opacity = '0.3';
      particlesContainer.appendChild(particle);
    }

    return () => {
      if (particlesContainer) {
        particlesContainer.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    const loadSampleData = async () => {
      try {
        const response = await fetch("/sample-audit.json", { cache: "no-store" });
        const sampleData: AuditResult = await response.json();

        setAuditData({
          status: "ready",
          result: sampleData,
        });
        setIsLoading(false);
      } catch (error) {
        setError("Failed to load sample data");
        setIsLoading(false);
      }
    };

    const tryInlineFromSession = () => {
      try {
        const cached = sessionStorage.getItem(`audit:${id}`);
        if (cached) {
          const parsed = JSON.parse(cached) as AuditResult;
          setAuditData({ status: "ready", result: parsed });
          setIsLoading(false);
          inlineLoadedRef.current = true;
          return true;
        }
      } catch {}
      return false;
    };

    const pollAudit = async () => {
      try {
        const response = await fetch(`/api/audit/get?id=${id}`, { cache: "no-store" });
        const data: AuditResponse = await response.json();

        if (response.ok) {
          setAuditData(data);

          if (data.status === "ready" || data.status === "failed") {
            setIsLoading(false);
          }
        } else {
          // In serverless mode, backend may respond with queued; do not error
          if ((data as any).status === "queued") {
            // keep waiting
          } else {
            setError(data.error || "Failed to fetch audit data");
            setIsLoading(false);
          }
        }
      } catch (error) {
        setError("Network error. Please check your connection.");
        setIsLoading(false);
      }
    };

    if (isSampleMode) {
      loadSampleData();
      return;
    }

    // In serverless inline mode, never poll; rely on inline cache with short retry window
    if (isServerless || isInline) {
      const start = Date.now();
      const maxWaitMs = 3000;
      const intervalMs = 200;

      if (!tryInlineFromSession()) {
        const timer = setInterval(() => {
          if (tryInlineFromSession()) {
            clearInterval(timer);
          } else if (Date.now() - start > maxWaitMs) {
            clearInterval(timer);
            if (!inlineLoadedRef.current) {
              setError(
                "Could not load inline result. Please start a new audit from the homepage."
              );
              setIsLoading(false);
            }
          }
        }, intervalMs);
        return () => clearInterval(timer);
      }
      return;
    }

    // DB mode: poll API until ready/failed. If backend returns queued, keep waiting.
    pollAudit();
    const interval = setInterval(() => {
      if (isLoading) {
        pollAudit();
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [id, isSampleMode, isInline, isServerless, isLoading]);

  if (error) {
    return (
      <motion.div 
        className="min-h-screen bg-bg-primary py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-red-400 mb-2">Error Loading Audit</h2>
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500/20 text-white rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (isLoading || !auditData) {
    return (
      <motion.div 
        className="min-h-screen bg-bg-primary py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <ModernSkeletonLoader />
        </div>
      </motion.div>
    );
  }

  if (auditData.status === "failed") {
    return (
      <motion.div 
        className="min-h-screen bg-bg-primary py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-red-400 mb-2">Audit Failed</h2>
            <p className="text-red-400">The audit could not be completed. Please try again.</p>
            <a
              href="/"
              className="mt-4 inline-block px-4 py-2 bg-red-500/20 text-white rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Start New Audit
            </a>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (auditData.status !== "ready" || !auditData.result) {
    return (
      <motion.div 
        className="min-h-screen bg-bg-primary py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold text-yellow-400 mb-2">Processing Audit</h2>
            <p className="text-yellow-400">
              Your audit is being processed. This may take a few minutes.
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const result = auditData.result;

  return (
    <div className="relative min-h-screen overflow-hidden animated-bg">
      {/* Animated Background Particles */}
      <div ref={particlesRef} className="particles" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary/30 via-transparent to-accent-primary/5" />
      
      <motion.div 
        className="relative z-10 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">SEO Audit Results</h1>
              <p className="text-text-secondary">{result.url}</p>
              <p className="text-sm text-text-secondary">
                Audited on {new Date(result.fetched_at).toLocaleString()}
              </p>
              {isSampleMode && (
                <motion.div 
                  className="mt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-primary/20 text-accent-primary">
                    Sample Data
                  </span>
                </motion.div>
              )}
            </div>
            {isDevMode && (
              <motion.div 
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <button
                  onClick={() => {
                    const newUrl = isSampleMode
                      ? window.location.pathname
                      : `${window.location.pathname}?sample=true`;
                    window.location.href = newUrl;
                  }}
                  className="px-3 py-1 text-xs bg-gray-700/20 text-text-secondary rounded border hover:bg-gray-700/30 transition-colors"
                >
                  {isSampleMode ? "Show Real Data" : "Show Sample Data"}
                </button>
                <a
                  href="/"
                  className="px-3 py-1 text-xs bg-accent-primary/20 text-accent-primary rounded border hover:bg-accent-primary/30 transition-colors text-center"
                >
                  New Audit
                </a>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("audit")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "audit"
                    ? "border-accent-primary text-accent-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary hover:border-gray-700"
                }`}
              >
                Audit Results
              </button>
              <button
                onClick={() => setActiveTab("competitors")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "competitors"
                    ? "border-accent-primary text-accent-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary hover:border-gray-700"
                }`}
              >
                Competitor Analysis
              </button>
              <button
                onClick={() => setActiveTab("crawl")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "crawl"
                    ? "border-accent-primary text-accent-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary hover:border-gray-700"
                }`}
              >
                Site Crawl (Beta)
              </button>
              <button
                onClick={() => setActiveTab("ai")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "ai"
                    ? "border-accent-primary text-accent-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary hover:border-gray-700"
                }`}
              >
                AI Insights
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === "audit" && (
          <>
            {/* Score Rings */}
            <motion.div 
              className="glass-card-enhanced rounded-lg shadow-sm border p-6 mb-6 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
              <h2 className="text-2xl font-semibold text-text-primary mb-6">Overall Score</h2>
              <div className="flex justify-center mb-8">
                <ModernScoreRing score={result.scores.overall} label="Overall" size="lg" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ModernScoreRing score={result.scores.title_meta} label="Title & Meta" />
                <ModernScoreRing score={result.scores.headings} label="Headings" />
                <ModernScoreRing score={result.scores.answerability} label="Content" />
                <ModernScoreRing score={result.scores.structure} label="Structure" />
                <ModernScoreRing score={result.scores.schema} label="Schema" />
                <ModernScoreRing score={result.scores.images} label="Images" />
                <ModernScoreRing score={result.scores.internal_links} label="Internal Links" />
              </div>
              </div>
            </motion.div>

            {/* Content Grid */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ModernDetectedPanel detected={result.detected} />
              <ModernActionButtons result={result} />
            </motion.div>

            {/* Performance Panel */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PerformancePanel performance={result.performance} />
            </motion.div>

            {/* Issues and Quick Wins */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ModernIssueList issues={result.issues} />
              <ModernQuickWins quickWins={result.quick_wins} />
            </motion.div>
          </>
        )}

        {activeTab === "competitors" && <ModernCompetitorsTab result={result} />}

        {activeTab === "crawl" && <ModernCrawlTab result={result} />}

        {activeTab === "ai" && <ModernAIInsightsTab result={result} />}
        </div>
      </motion.div>
    </div>
  );
}

// Wrap the main component with ErrorBoundary
export default function AuditPage() {
  return (
    <ErrorBoundary>
      <AuditPageContent />
    </ErrorBoundary>
  );
}
