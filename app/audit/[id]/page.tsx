"use client";

import React, { useState, useEffect, useRef, Component, ErrorInfo, ReactNode } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const ReportBuilder = dynamic(() => import("../../../components/common/ReportBuilder"), { ssr: false });
const FixPack = dynamic(() => import("../../../components/common/FixPack"), { ssr: false });
import PerformancePanel from "../../../components/audit/PerformancePanel";
import { AuditResult } from "../../../lib/heuristics";
import FuturisticProgressPanel from "../../../components/common/FuturisticProgressPanel";
import Modal from "../../../components/common/Modal";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Legend } from 'recharts';
import RankSnapshotSection from '../../../components/audit/RankSnapshot';
import BacklinkSnapshotSection from '../../../components/audit/BacklinkSnapshot';

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
  const [expanded, setExpanded] = useState<string | null>(null);
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
                <h4 className={`text-lg font-medium ${severityTextColors[severity]}`}>{severityLabels[severity]} ({severityIssues.length})</h4>
                <div className="space-y-3">
                  {severityIssues.map((issue, index) => {
                    const isOpen = expanded === `${severity}-${index}`;
                    return (
                      <motion.div
                        key={`${severity}-${index}`}
                        className={`p-4 rounded-lg border ${severityColors[severity]} relative group transition-shadow duration-200 ${isOpen ? 'shadow-xl' : ''}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        tabIndex={0}
                        aria-expanded={isOpen}
                        aria-controls={`issue-details-${severity}-${index}`}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setExpanded(isOpen ? null : `${severity}-${index}`);
                          }
                        }}
                      >
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(isOpen ? null : `${severity}-${index}`)}>
                          <div className="flex-1">
                            <h5 className="font-medium text-text-primary mb-1 flex items-center gap-2">
                              {issue.found}
                              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary font-semibold uppercase tracking-wide">{issue.category.replace('_', ' ')}</span>
                            </h5>
                          </div>
                          <button
                            aria-label={isOpen ? 'Collapse details' : 'Expand details'}
                            className="ml-2 p-1 rounded focus:outline-none focus:ring-2 focus:ring-accent-primary"
                            tabIndex={-1}
                          >
                            <svg className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                        {isOpen && (
                          <div id={`issue-details-${severity}-${index}`} className="mt-4 space-y-3 animate-fade-in">
                            <div className="text-sm text-text-secondary"><strong>Why it matters:</strong> {issue.why_it_matters}</div>
                            <div className="text-sm text-accent-primary"><strong>Recommendation:</strong> {issue.recommendation}</div>
                            {issue.snippet && (
                              <div className="bg-bg-secondary/50 p-3 rounded border border-accent-primary/20">
                                <p className="text-accent-primary text-sm font-medium mb-1">Code Snippet:</p>
                                <pre className="text-text-secondary text-sm overflow-x-auto p-2 rounded bg-bg-secondary/20 whitespace-pre-wrap md:whitespace-pre">
                                  <code>{issue.snippet}</code>
                                </pre>
                                <button
                                  onClick={() => copyToClipboard(issue.snippet || '', `${severity}-${index}`)}
                                  className="mt-2 p-2 text-text-secondary hover:text-accent-primary transition-colors rounded focus:outline-none focus:ring-2 focus:ring-accent-primary"
                                  title="Copy code"
                                  aria-label="Copy code snippet"
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
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
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
      aria-label="Quick Wins"
    >
      {/* Always-on gradient for mobile, hover for desktop */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 md:hidden opacity-100" />
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-accent-primary mb-8">Quick Wins ({quickWins.length})</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {quickWins.map((win, index) => (
            <motion.div
              key={`win-${index}`}
              className={`glass-card p-8 min-h-[180px] flex flex-col justify-between rounded-2xl shadow-lg border-2 border-accent-primary/30 relative group transition-shadow duration-200`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              aria-label={`Quick Win ${index + 1}`}
            >
              <h4 className="text-xl font-semibold text-text-primary mb-2 flex items-center gap-2">
                {win.action}
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary font-semibold uppercase tracking-wide`}>{win.estimated_impact} impact</span>
              </h4>
              {win.snippet && (
                <div className="mt-3 bg-bg-secondary/50 p-3 rounded border border-accent-primary/20">
                  <p className="text-accent-primary text-sm font-medium mb-1">Code:</p>
                  <pre className="text-text-secondary text-sm overflow-x-auto p-2 rounded bg-bg-secondary/20 whitespace-pre-wrap md:whitespace-pre">
                    <code>{win.snippet}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(win.snippet || '', `win-${index}`)}
                    className="mt-2 p-2 text-text-secondary hover:text-accent-primary transition-colors rounded focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    title="Copy code"
                    aria-label="Copy code snippet"
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
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Modern Action Buttons Component
function ModernActionButtons({ result, showReportBuilder, setShowReportBuilder, showFixPack, setShowFixPack }: { result: AuditResult, showReportBuilder: boolean, setShowReportBuilder: (v: boolean) => void, showFixPack: boolean, setShowFixPack: (v: boolean) => void }) {
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
      </div>
    </motion.div>
  );
}

// Modern Competitors Tab Component
function ModernCompetitorsTab() {
  const [keywords, setKeywords] = useState<string[]>([""]);
  const [countries, setCountries] = useState<string[]>(["us"]);
  const [results, setResults] = useState<any>({});
  const [usage, setUsage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const MAX_KEYWORDS = 5;
  const MAX_COUNTRIES = 2;
  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "es", label: "Spain" },
    { value: "it", label: "Italy" },
    { value: "nl", label: "Netherlands" },
    { value: "jp", label: "Japan" },
    { value: "br", label: "Brazil" },
    { value: "mx", label: "Mexico" },
    { value: "in", label: "India" },
  ];

  const handleKeywordChange = (i: number, value: string) => {
    setKeywords((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  };
  const addKeyword = () => {
    if (keywords.length < MAX_KEYWORDS) setKeywords((prev) => [...prev, ""]);
  };
  const removeKeyword = (i: number) => {
    if (keywords.length > 1) setKeywords((prev) => prev.filter((_, idx) => idx !== i));
  };
  const handleCountryChange = (i: number, value: string) => {
    setCountries((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  };
  const addCountry = () => {
    if (countries.length < MAX_COUNTRIES) setCountries((prev) => [...prev, "us"]);
  };
  const removeCountry = (i: number) => {
    if (countries.length > 1) setCountries((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults({});
    setUsage(0);
    try {
      const response = await fetch("/api/serp.snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keywords, country: countries }),
      });
      const data = await response.json();
      if (response.ok) {
        setResults(data.results || {});
        setUsage(data.usage || 0);
      } else {
        setError(data.error || "Failed to fetch competitor data");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper: Domain analysis from organic results
  function getDomainStats(results: any[]) {
    const domainMap: Record<string, { count: number; positions: number[] }> = {};
    results.forEach((r: any) => {
      try {
        const url = new URL(r.url);
        const domain = url.hostname.replace(/^www\./, "");
        if (!domainMap[domain]) domainMap[domain] = { count: 0, positions: [] };
        domainMap[domain].count++;
        domainMap[domain].positions.push(r.position);
      } catch {}
    });
    return Object.entries(domainMap)
      .map(([domain, { count, positions }]) => ({
        domain,
        count,
        avgPosition: positions.reduce((a, b) => a + b, 0) / positions.length,
      }))
      .sort((a, b) => a.avgPosition - b.avgPosition);
  }

  return (
    <motion.div className="w-full max-w-7xl mx-auto p-4 md:p-8 glass-card-enhanced" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-8 text-center">Competitor Analysis</h2>
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-lg font-semibold mb-2">Target Keywords (max {MAX_KEYWORDS})</label>
          {keywords.map((kw, i) => (
            <div key={i} className="flex items-center mb-2 gap-2">
              <input
                type="text"
                value={kw}
                onChange={(e) => handleKeywordChange(i, e.target.value)}
                placeholder="Enter keyword"
                className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-bg-primary text-white focus:ring-2 focus:ring-accent-primary"
                required
                maxLength={100}
              />
              {keywords.length > 1 && (
                <button type="button" onClick={() => removeKeyword(i)} className="text-red-400 px-2 py-1 rounded hover:bg-red-500/20">✕</button>
              )}
            </div>
          ))}
          {keywords.length < MAX_KEYWORDS && (
            <button type="button" onClick={addKeyword} className="mt-2 px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90">+ Add Keyword</button>
          )}
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Countries (max {MAX_COUNTRIES})</label>
          {countries.map((c, i) => (
            <div key={i} className="flex items-center mb-2 gap-2">
              <select
                value={c}
                onChange={(e) => handleCountryChange(i, e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-bg-primary text-white focus:ring-2 focus:ring-accent-primary"
                required
              >
                {countryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {countries.length > 1 && (
                <button type="button" onClick={() => removeCountry(i)} className="text-red-400 px-2 py-1 rounded hover:bg-red-500/20">✕</button>
              )}
            </div>
          ))}
          {countries.length < MAX_COUNTRIES && (
            <button type="button" onClick={addCountry} className="mt-2 px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90">+ Add Country</button>
          )}
        </div>
        <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-4 mt-4">
          <button type="submit" disabled={loading} className="px-8 py-3 bg-accent-primary text-white rounded-xl font-semibold text-lg hover:bg-accent-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all">{loading ? "Analyzing..." : "Analyze Competitors"}</button>
          <div className="flex-1 text-right w-full md:w-auto">
            <span className="text-sm text-text-secondary">SERPAPI usage: <span className="font-bold text-accent-primary">{usage}</span> / 250</span>
          </div>
        </div>
        {error && <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">{error}</div>}
      </form>
      {/* Results Display (advanced) */}
      <div className="w-full overflow-x-auto">
        {Object.keys(results).length > 0 && (
          <div className="space-y-12">
            {Object.entries(results).map(([key, data]: any) => (
              <div key={key} className="glass-card p-6 mb-8">
                <h3 className="text-2xl font-bold text-accent-primary mb-4">{key.replace(":", " — ").toUpperCase()}</h3>
                {data.error ? (
                  <div className="text-red-400">{data.error}: {data.details}</div>
                ) : (
                  <>
                    {/* Organic Results Table */}
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-bg-secondary">
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">URL</th>
                            <th className="px-4 py-2 text-left">Snippet</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.results?.map((r: any, i: number) => (
                            <tr key={i} className="border-b border-gray-700 hover:bg-bg-secondary/20">
                              <td className="px-4 py-2 font-bold text-accent-primary">#{r.position}</td>
                              <td className="px-4 py-2"><a href={r.url} target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:underline font-semibold">{r.title}</a></td>
                              <td className="px-4 py-2 text-text-secondary max-w-xs truncate">{r.url}</td>
                              <td className="px-4 py-2 text-text-secondary max-w-md truncate">{r.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Domain/Competitor Analysis */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-accent-secondary mb-2">Domain/Competitor Analysis</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-bg-secondary">
                              <th className="px-4 py-2 text-left">Domain</th>
                              <th className="px-4 py-2 text-left">Appearances</th>
                              <th className="px-4 py-2 text-left">Avg. Position</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getDomainStats(data.results || []).map((d, i) => (
                              <tr key={i} className="border-b border-gray-700">
                                <td className="px-4 py-2 font-medium text-accent-primary">{d.domain}</td>
                                <td className="px-4 py-2">{d.count}</td>
                                <td className="px-4 py-2">{d.avgPosition.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* Featured Snippet */}
                    {data.featured_snippet && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-accent-secondary mb-2">Featured Snippet</h4>
                        <div className="bg-accent-primary/10 border border-accent-primary/30 rounded-lg p-4">
                          <div className="font-bold text-accent-primary mb-1">{data.featured_snippet.title}</div>
                          <div className="text-text-secondary mb-1">{data.featured_snippet.snippet}</div>
                          {data.featured_snippet.link && <a href={data.featured_snippet.link} target="_blank" rel="noopener noreferrer" className="text-accent-primary underline">{data.featured_snippet.link}</a>}
                        </div>
                      </div>
                    )}
                    {/* People Also Ask */}
                    {data.people_also_ask && data.people_also_ask.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-accent-secondary mb-2">People Also Ask</h4>
                        <ul className="space-y-2">
                          {data.people_also_ask.map((paa: any, i: number) => (
                            <li key={i} className="bg-bg-secondary/50 border border-accent-primary/20 rounded-lg p-3">
                              <div className="font-medium text-accent-primary mb-1">{paa.question}</div>
                              <div className="text-text-secondary">{paa.snippet}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Related Searches */}
                    {data.related_searches && data.related_searches.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-accent-secondary mb-2">Related Searches</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.related_searches.map((rel: any, i: number) => (
                            <span key={i} className="px-3 py-1 bg-accent-secondary/10 text-accent-secondary text-xs rounded-full border border-accent-secondary/30">{rel.query || rel}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Ads */}
                    {data.ads && data.ads.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-accent-secondary mb-2">Ads</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-bg-secondary">
                                <th className="px-4 py-2 text-left">Title</th>
                                <th className="px-4 py-2 text-left">URL</th>
                                <th className="px-4 py-2 text-left">Snippet</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.ads.map((ad: any, i: number) => (
                                <tr key={i} className="border-b border-gray-700">
                                  <td className="px-4 py-2 font-medium text-accent-primary">{ad.title}</td>
                                  <td className="px-4 py-2 text-text-secondary max-w-xs truncate">{ad.link}</td>
                                  <td className="px-4 py-2 text-text-secondary max-w-md truncate">{ad.snippet}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {/* Local Results */}
                    {data.local_results && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-accent-secondary mb-2">Local Pack</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-bg-secondary">
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Address</th>
                                <th className="px-4 py-2 text-left">Rating</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(data.local_results?.places || []).map((place: any, i: number) => (
                                <tr key={i} className="border-b border-gray-700">
                                  <td className="px-4 py-2 font-medium text-accent-primary">{place.title}</td>
                                  <td className="px-4 py-2 text-text-secondary">{place.address}</td>
                                  <td className="px-4 py-2 text-text-secondary">{place.rating}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {/* Knowledge Graph */}
                    {data.knowledge_graph && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-accent-secondary mb-2">Knowledge Graph</h4>
                        <div className="bg-accent-secondary/10 border border-accent-secondary/30 rounded-lg p-4">
                          <div className="font-bold text-accent-secondary mb-1">{data.knowledge_graph.title}</div>
                          <div className="text-text-secondary mb-1">{data.knowledge_graph.description}</div>
                          {data.knowledge_graph.website && <a href={data.knowledge_graph.website} target="_blank" rel="noopener noreferrer" className="text-accent-secondary underline">{data.knowledge_graph.website}</a>}
                        </div>
                      </div>
                    )}
                    {/* Sitelinks */}
                    {data.sitelinks && data.sitelinks.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-accent-secondary mb-2">Sitelinks</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.sitelinks.map((sl: any, i: number) => (
                            <a key={i} href={sl.link} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-xs rounded-full border border-accent-primary/30 hover:bg-accent-primary/20 transition-colors">{sl.title || sl.link}</a>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Modern Crawl Tab Component
function ModernCrawlTab({ result }: { result: AuditResult }) {
  const [startUrl, setStartUrl] = useState(result.url);
  const [limit, setLimit] = useState(30); // Enforce 30
  const [sameHostOnly, setSameHostOnly] = useState(true);
  const [maxDepth, setMaxDepth] = useState(5);
  const [crawlId, setCrawlId] = useState<string | null>(null);
  const [crawlStatus, setCrawlStatus] = useState<"idle" | "queued" | "running" | "ready" | "failed">("idle");
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
          limit: 30, // Enforce 30
          sameHostOnly,
          maxDepth,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setCrawlId(data.crawlId);
        // Inline mode: show result immediately if present
        if (data.result) {
          setCrawlStatus("ready");
          if (data.result.type === "crawl" && data.result.result) {
            setCrawlResult(data.result.result);
          } else {
            setCrawlResult(data.result);
          }
        } else {
          setCrawlStatus("queued");
          pollCrawlStatus(data.crawlId);
        }
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
          if (data.result.type === "crawl" && data.result.result) {
            setCrawlResult(data.result.result);
          } else {
            setCrawlResult(data.result);
          }
        } else if (data.status === "failed") {
          setError("Crawl failed");
        } else if (data.status === "queued" || data.status === "running") {
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

  // Responsive, modern UI
  return (
    <motion.div className="w-full max-w-4xl mx-auto p-4 md:p-8 glass-card-enhanced" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-8 text-center">Site Crawl (Beta)</h2>
      <form onSubmit={startCrawl} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-lg font-semibold mb-2">Start URL</label>
          <input
            type="url"
            value={startUrl}
            onChange={(e) => setStartUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-bg-primary text-white focus:ring-2 focus:ring-accent-primary"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-lg font-semibold mb-2">Options</label>
          <div className="flex items-center gap-2">
            <input type="number" value={limit} min={1} max={30} disabled className="w-20 px-2 py-1 rounded border border-gray-700 bg-gray-800 text-gray-400" />
            <span className="text-sm text-text-secondary">Page Limit (max 30, free tier)</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="number" value={maxDepth} min={1} max={10} onChange={(e) => setMaxDepth(Number(e.target.value))} className="w-20 px-2 py-1 rounded border border-gray-700 bg-bg-primary text-white" />
            <span className="text-sm text-text-secondary">Max Depth</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={sameHostOnly} onChange={(e) => setSameHostOnly(e.target.checked)} className="h-4 w-4 text-accent-primary focus:ring-accent-primary border-gray-700 rounded" />
            <span className="text-sm text-text-secondary">Same Host Only</span>
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-4 mt-4">
          <button type="submit" disabled={loading || crawlStatus === "running"} className="px-8 py-3 bg-accent-primary text-white rounded-xl font-semibold text-lg hover:bg-accent-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all">{loading ? "Starting..." : crawlStatus === "running" ? "Crawling..." : "Start Crawl"}</button>
          <div className="flex-1 text-right w-full md:w-auto">
            <span className="text-sm text-text-secondary">Free tier: up to 30 pages per crawl</span>
          </div>
        </div>
        {error && <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">{error}</div>}
      </form>
      {/* Show progress panel while loading or crawl is queued/running and no result yet */}
      {(loading || ((crawlStatus === "queued" || crawlStatus === "running") && !crawlResult)) && (
        <FuturisticProgressPanel status="running" />
      )}
      {/* Status Display */}
      {crawlStatus !== "idle" && (
        <motion.div className="glass-card p-6 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h3 className="text-xl font-semibold text-text-primary mb-6">Crawl Status</h3>
          <div className="flex items-center space-x-3">
            <span className={`font-medium ${crawlStatus === "ready" ? "text-green-600" : crawlStatus === "failed" ? "text-red-600" : crawlStatus === "running" ? "text-blue-600" : "text-yellow-600"}`}>{crawlStatus.charAt(0).toUpperCase() + crawlStatus.slice(1)}</span>
            {crawlStatus === "running" && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-primary"></div>}
          </div>
          {crawlId && <p className="text-sm text-text-secondary mt-2">Crawl ID: {crawlId}</p>}
        </motion.div>
      )}
      {/* Results Display */}
      {crawlResult && (
        <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* robots.txt & sitemap.xml */}
          <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="text-xl font-semibold text-text-primary mb-4">robots.txt & sitemap.xml</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="font-medium text-accent-primary">robots.txt:</div>
                <a href={crawlResult.robotsTxt.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{crawlResult.robotsTxt.url}</a>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${crawlResult.robotsTxt.found ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}>{crawlResult.robotsTxt.found ? "Found" : "Not Found"}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-accent-primary">sitemap.xml:</div>
                <a href={crawlResult.sitemapXml.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{crawlResult.sitemapXml.url}</a>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${crawlResult.sitemapXml.found ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}>{crawlResult.sitemapXml.found ? "Found" : "Not Found"}</span>
                {crawlResult.sitemapXml.found && crawlResult.sitemapXml.urls && (
                  <div className="mt-2 text-xs text-text-secondary">Sitemap URLs: {crawlResult.sitemapXml.urls.length}</div>
                )}
              </div>
            </div>
          </motion.div>
          {/* Crawl Summary */}
          <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="text-xl font-semibold text-text-primary mb-4">Crawl Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center"><div className="text-2xl font-bold text-accent-primary">{crawlResult.totalPages}</div><div className="text-sm text-text-secondary">Total Pages</div></div>
              <div className="text-center"><div className="text-2xl font-bold text-green-600">{crawlResult.successfulPages}</div><div className="text-sm text-text-secondary">Successful</div></div>
              <div className="text-center"><div className="text-2xl font-bold text-red-600">{crawlResult.failedPages}</div><div className="text-sm text-text-secondary">Failed</div></div>
              <div className="text-center"><div className="text-2xl font-bold text-purple-600">{Math.round(crawlResult.averageLoadTime)}ms</div><div className="text-sm text-text-secondary">Avg Load Time</div></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 rounded-lg border border-red-500/30"><div className="text-xl font-bold text-red-600">{crawlResult.issues.noindex_pages}</div><div className="text-sm text-text-secondary">Noindex Pages</div></div>
              <div className="text-center p-3 rounded-lg border border-orange-500/30"><div className="text-xl font-bold text-orange-600">{crawlResult.issues.missing_titles}</div><div className="text-sm text-text-secondary">Missing Titles</div></div>
              <div className="text-center p-3 rounded-lg border border-yellow-500/30"><div className="text-xl font-bold text-yellow-600">{crawlResult.issues.missing_h1}</div><div className="text-sm text-text-secondary">Missing H1</div></div>
              <div className="text-center p-3 rounded-lg border border-blue-500/30"><div className="text-xl font-bold text-blue-600">{crawlResult.issues.missing_meta_descriptions}</div><div className="text-sm text-text-secondary">Missing Meta Descriptions</div></div>
              <div className="text-center p-3 rounded-lg border border-purple-500/30"><div className="text-xl font-bold text-purple-600">{crawlResult.issues.images_without_alt}</div><div className="text-sm text-text-secondary">Images Without Alt</div></div>
              <div className="text-center p-3 rounded-lg border border-indigo-500/30"><div className="text-xl font-bold text-indigo-600">{crawlResult.issues.pages_without_canonical}</div><div className="text-sm text-text-secondary">Missing Canonical</div></div>
              <div className="text-center p-3 rounded-lg border border-pink-500/30"><div className="text-xl font-bold text-pink-600">{crawlResult.issues.broken_links}</div><div className="text-sm text-text-secondary">Broken Links</div></div>
            </div>
            {/* Duplicates */}
            {(crawlResult.issues.duplicate_titles.length > 0 || crawlResult.issues.duplicate_canonicals.length > 0) && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-accent-secondary mb-2">Duplicate Issues</h4>
                {crawlResult.issues.duplicate_titles.length > 0 && (
                  <div className="mb-2 text-sm text-red-400">Duplicate Titles: {crawlResult.issues.duplicate_titles.join(", ")}</div>
                )}
                {crawlResult.issues.duplicate_canonicals.length > 0 && (
                  <div className="mb-2 text-sm text-red-400">Duplicate Canonicals: {crawlResult.issues.duplicate_canonicals.join(", ")}</div>
                )}
              </div>
            )}
          </motion.div>
          {/* Broken Links */}
          {crawlResult.brokenLinks && crawlResult.brokenLinks.length > 0 && (
            <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h3 className="text-xl font-semibold text-text-primary mb-4">Broken Links</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-bg-secondary">
                      <th className="px-4 py-2 text-left">Broken URL</th>
                      <th className="px-4 py-2 text-left">Found On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crawlResult.brokenLinks.map((b: any, i: number) => (
                      <tr key={i} className="border-b border-gray-700">
                        <td className="px-4 py-2 text-red-400 break-all"><a href={b.url} target="_blank" rel="noopener noreferrer" className="underline">{b.url}</a></td>
                        <td className="px-4 py-2 text-text-secondary break-all"><a href={b.from} target="_blank" rel="noopener noreferrer" className="underline">{b.from}</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
          {/* Per-page Details */}
          <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="text-xl font-semibold text-text-primary mb-4">Per-Page Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="bg-bg-secondary">
                    <th className="px-2 py-1 text-left">URL</th>
                    <th className="px-2 py-1 text-left">Status</th>
                    <th className="px-2 py-1 text-left">Title</th>
                    <th className="px-2 py-1 text-left">H1</th>
                    <th className="px-2 py-1 text-left">Meta Desc</th>
                    <th className="px-2 py-1 text-left">Canonical</th>
                    <th className="px-2 py-1 text-left">Broken Links</th>
                  </tr>
                </thead>
                <tbody>
                  {crawlResult.pages.map((p: any, i: number) => (
                    <tr key={i} className="border-b border-gray-700">
                      <td className="px-2 py-1 break-all"><a href={p.url} target="_blank" rel="noopener noreferrer" className="underline text-accent-primary">{p.url}</a></td>
                      <td className="px-2 py-1">{p.status}</td>
                      <td className="px-2 py-1">{p.title || <span className="text-red-400">Missing</span>}</td>
                      <td className="px-2 py-1">{p.h1_presence ? "Yes" : <span className="text-red-400">No</span>}</td>
                      <td className="px-2 py-1">{p.meta_description ? "Yes" : <span className="text-red-400">No</span>}</td>
                      <td className="px-2 py-1">{p.canonical ? "Yes" : <span className="text-red-400">No</span>}</td>
                      <td className="px-2 py-1">{p.brokenLinks && p.brokenLinks.length > 0 ? p.brokenLinks.length : 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          {/* Export Button */}
          <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Export Results</h3>
                <p className="text-sm text-text-secondary">Download detailed crawl data as CSV</p>
              </div>
              <button onClick={exportCSV} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Export CSV</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Modern AI Insights Tab Component (Perplexity-powered)
function ModernAIInsightsTab({ result }: { result: AuditResult }) {
  const [insights, setInsights] = useState([
    { title: 'Top 5 SEO Fixes (Prioritized)', loading: false, error: '', result: '' },
    { title: 'Competitor Gap Analysis', loading: false, error: '', result: '' },
    { title: 'AI-Generated FAQ for Snippets', loading: false, error: '', result: '' },
    { title: 'E-E-A-T & AI Search Rewrite', loading: false, error: '', result: '' },
    { title: 'AI Chat Search Optimization Tips', loading: false, error: '', result: '' },
  ]);
  const [aiStatus, setAiStatus] = useState<'idle' | 'loading' | 'ready' | 'failed'>('idle');

  const getContentText = () => {
    return `Title: ${result.detected.title || ''}\nMeta: ${result.detected.meta_description || ''}\nH1: ${result.detected.h1 || ''}\nH2: ${(result.detected.h2 || []).join(' | ')}\nH3: ${(result.detected.h3 || []).join(' | ')}\n`;
  };
  const metaDesc = result.detected.meta_description || '';
  const introText = result.detected.h1 || '';

  const prompts = [
    `You are an expert SEO consultant. Analyze the following page content and provide the top 5 most impactful, actionable SEO improvements, prioritized by business value. For each, explain why it matters and how to implement it.\nContent:\n${getContentText()}`,
    `Compare the following page's content and structure to the top 3 Google results for its main topic. What are the main gaps or missed opportunities? What should be added or improved to outrank them?\nContent:\n${getContentText()}`,
    `Based on this page, generate 5 FAQ questions and answers that would help the page rank in Google's 'People Also Ask' and AI chat results. Make them unique and relevant.\nContent:\n${getContentText()}`,
    `Rewrite the meta description and intro paragraph to maximize E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) and make it more likely to be recommended by AI search/chatbots.\nMeta Description: ${metaDesc}\nIntro: ${introText}`,
    `What are 3 things this page can do to be more likely recommended by AI chatbots (like Perplexity, ChatGPT, Gemini) for its main topic? Be specific and actionable.\nContent:\n${getContentText()}`,
  ];

  const runAIInsights = async () => {
    setAiStatus('loading');
    setInsights((prev) => prev.map((i) => ({ ...i, loading: true, error: '', result: '' })));
    try {
      const results = await Promise.all(prompts.map(async (prompt, idx) => {
        try {
          const response = await fetch('/api/pplx-inference', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
          });
          if (!response.ok) throw new Error('API error');
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content || 'No result.';
          return { ...insights[idx], loading: false, result: content, error: '' };
        } catch (err) {
          return { ...insights[idx], loading: false, result: '', error: 'Failed to load insight.' };
        }
      }));
      setInsights(results);
      setAiStatus('ready');
    } catch {
      setAiStatus('failed');
      setInsights((prev) => prev.map((i) => ({ ...i, loading: false, error: 'Failed to load insight.' })));
    }
  };

  return (
    <motion.div className="glass-card p-6 animated-gradient-hover" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">AI SEO Insights (Powered by Perplexity)</h3>
          <p className="text-sm text-text-secondary">Professional, actionable, and future-proof SEO advice</p>
        </div>
        <button
          onClick={runAIInsights}
          disabled={aiStatus === 'loading'}
          className="px-4 py-2 bg-accent-quinary text-white rounded-lg hover:bg-accent-quinary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {aiStatus === 'loading' ? 'Analyzing...' : 'Run AI Insights'}
        </button>
      </div>
      <div className="flex items-center space-x-2 mb-6">
        <div className={`w-2 h-2 rounded-full ${aiStatus === 'ready' ? 'bg-green-500' : aiStatus === 'loading' ? 'bg-yellow-500' : aiStatus === 'failed' ? 'bg-red-500' : 'bg-gray-400'}`}></div>
        <span className="text-sm text-text-secondary">
          {aiStatus === 'ready' ? 'AI Insights Ready' : aiStatus === 'loading' ? 'Running AI Analysis...' : aiStatus === 'failed' ? 'AI Analysis Failed' : 'Idle'}
        </span>
      </div>
      <div className="space-y-6">
        {insights.map((insight, idx) => (
          <motion.div key={idx} className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h4 className="text-xl font-semibold text-text-primary mb-4">{insight.title}</h4>
            {insight.loading && <div className="text-text-secondary">Loading...</div>}
            {insight.error && <div className="text-red-400">{insight.error}</div>}
            {insight.result && <pre className="whitespace-pre-wrap text-text-primary leading-relaxed">{insight.result}</pre>}
          </motion.div>
        ))}
      </div>
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

function AccessibilityIssuesPanel({ issues }: { issues: Array<{ type: string; selector: string; message: string; snippet: string }> }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(20);
  if (!issues || issues.length === 0) return null;
  return (
    <motion.div
      className="glass-card-enhanced p-6 relative overflow-hidden group mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Accessibility & ARIA Issues ({issues.length})</h3>
        <div className="space-y-3">
          {issues.slice(0, visibleCount).map((issue, idx) => {
            const isOpen = expanded === idx;
            return (
              <motion.div
                key={idx}
                className={`p-4 rounded-lg border border-blue-500/30 bg-blue-500/10 relative group transition-shadow duration-200 ${isOpen ? 'shadow-xl' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={`aria-issue-details-${idx}`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setExpanded(isOpen ? null : idx);
                  }
                }}
              >
                <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(isOpen ? null : idx)}>
                  <div className="flex-1">
                    <h5 className="font-medium text-text-primary mb-1 flex items-center gap-2">
                      {issue.message}
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary font-semibold uppercase tracking-wide">{issue.type.replace(/[-_]/g, ' ')}</span>
                    </h5>
                    <div className="text-xs text-text-secondary">Selector: <span className="font-mono">{issue.selector}</span></div>
                  </div>
                  <button
                    aria-label={isOpen ? 'Collapse details' : 'Expand details'}
                    className="ml-2 p-1 rounded focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    tabIndex={-1}
                  >
                    <svg className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                {isOpen && (
                  <div id={`aria-issue-details-${idx}`} className="mt-4 space-y-2 animate-fade-in">
                    <div className="text-sm text-text-secondary"><strong>Selector:</strong> <span className="font-mono">{issue.selector}</span></div>
                    <div className="text-sm text-text-secondary"><strong>Message:</strong> {issue.message}</div>
                    <div className="bg-bg-secondary/50 p-3 rounded border border-accent-primary/20">
                      <p className="text-accent-primary text-sm font-medium mb-1">Code Snippet:</p>
                      <pre className="text-text-secondary text-sm overflow-x-auto p-2 rounded bg-bg-secondary/20 whitespace-pre-wrap md:whitespace-pre">
                        <code>{issue.snippet}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        {issues.length > visibleCount && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary"
              onClick={() => setVisibleCount(visibleCount + 20)}
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ModernRankBacklinkTab({ domain }: { domain: string }) {
  const [rank, setRank] = React.useState<any[]>([]);
  const [backlinks, setBacklinks] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [rankRes, backlinkRes] = await Promise.all([
          fetch('/api/rank-tracking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ domain, keyword: '' }) }),
          fetch('/api/backlinks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ domain }) })
        ]);
        const rankData = await rankRes.json();
        const backlinkData = await backlinkRes.json();
        setRank(rankData.snapshots || []);
        setBacklinks(backlinkData || null);
      } catch (e: any) {
        setError(e.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    if (domain) fetchData();
  }, [domain]);

  if (loading) return <div className="glass-card p-6 text-center">Loading rank & backlink data...</div>;
  if (error) return <div className="glass-card p-6 text-center text-red-400">{error}</div>;

  return (
    <motion.div className="glass-card p-6 animated-gradient-hover" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h3 className="text-xl font-semibold text-text-primary mb-4">Rank Tracking & Backlink Snapshot</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-2">Rank Over Time</h4>
          {rank.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={rank} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt" tickFormatter={d => new Date(d).toLocaleDateString()} />
                <YAxis reversed domain={['dataMin', 'dataMax']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="position" stroke="#3B82F6" name="Google Position" />
              </LineChart>
            </ResponsiveContainer>
          ) : <div className="text-text-secondary">No rank data yet.</div>}
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Backlink Snapshot</h4>
          {backlinks ? (
            <BarChart width={300} height={250} data={[backlinks]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="domain" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalBacklinks" fill="#10B981" name="Total Backlinks" />
              <Bar dataKey="referringDomains" fill="#6366F1" name="Referring Domains" />
            </BarChart>
          ) : <div className="text-text-secondary">No backlink data yet.</div>}
        </div>
      </div>
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
  const [activeTab, setActiveTab] = useState<"audit" | "competitors" | "crawl" | "ai" | "rank">("audit");
  const inlineLoadedRef = useRef(false);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [showReportBuilder, setShowReportBuilder] = useState(false);
  const [showFixPack, setShowFixPack] = useState(false);

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
          <FuturisticProgressPanel status="running" />
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
          <FuturisticProgressPanel status="running" />
          <ModernSkeletonLoader />
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
          <div className="relative rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-accent-primary/80 to-accent-secondary/80 p-6 md:p-10 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-8 border border-accent-primary/30">
            {/* SEO Icon */}
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 border-2 border-white/20 shadow-lg">
              <svg className="w-10 h-10 md:w-14 md:h-14 text-white/90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow mb-2 tracking-tight">SEO Audit Results</h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white/90 font-medium text-sm md:text-base truncate max-w-xs md:max-w-md shadow">{result.url}</span>
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 font-medium text-xs md:text-sm shadow border border-white/20">Audited on {new Date(result.fetched_at).toLocaleString()}</span>
                {isSampleMode && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-primary/30 text-white shadow ml-2">
                    Sample Data
                  </span>
                )}
              </div>
            </div>
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
              <button
                onClick={() => setActiveTab("rank")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "rank" ? "border-accent-primary text-accent-primary" : "border-transparent text-text-secondary hover:text-text-primary hover:border-gray-700"}`}
              >
                Rank & Backlinks
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
                <ModernScoreRing score={result.scores?.overall || 0} label="Overall" size="lg" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ModernScoreRing score={result.scores?.title_meta || 0} label="Title & Meta" />
                <ModernScoreRing score={result.scores?.headings || 0} label="Headings" />
                <ModernScoreRing score={result.scores?.answerability || 0} label="Content" />
                <ModernScoreRing score={result.scores?.structure || 0} label="Structure" />
                <ModernScoreRing score={result.scores?.schema || 0} label="Schema" />
                <ModernScoreRing score={result.scores?.images || 0} label="Images" />
                <ModernScoreRing score={result.scores?.internal_links || 0} label="Internal Links" />
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
              <ModernActionButtons 
                result={result} 
                showReportBuilder={showReportBuilder}
                setShowReportBuilder={setShowReportBuilder}
                showFixPack={showFixPack}
                setShowFixPack={setShowFixPack}
              />
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
              <AccessibilityIssuesPanel issues={result.accessibility_issues} />
            </motion.div>
          </>
        )}

        {activeTab === "competitors" && (
          <>
            {/* Explanatory Section for Competitor Analysis */}
            <motion.section
              className="mb-8 glass-card-enhanced p-6 md:p-8 flex flex-col items-center text-center border-l-4 border-accent-primary/40 bg-bg-secondary/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              aria-label="About Competitor Analysis"
            >
              <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">What is Competitor Analysis?</h2>
              <p className="text-base md:text-lg text-text-secondary max-w-2xl mb-2">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Instantly compare your website's search performance to top-ranking competitors for any keyword and country. Discover who dominates the SERP, analyze featured snippets, local packs, ads, and more. Uncover domain strengths, keyword gaps, and actionable opportunities to outrank your rivals.
              </p>
              <ul className="text-left text-sm md:text-base text-text-secondary max-w-2xl list-disc pl-5">
                <li>Multi-keyword, multi-country support for global reach</li>
                <li>Detailed SERP feature detection (snippets, PAA, local, ads, knowledge graph, sitelinks)</li>
                <li>Competitor domain overlap, average position, and visibility metrics</li>
                <li>All data visualized in a modern, full-width, accessible dashboard</li>
              </ul>
            </motion.section>
            <ModernCompetitorsTab />
          </>
        )}

        {activeTab === "crawl" && (
          <>
            {/* Explanatory Section for Site Crawl (Beta) */}
            <motion.section
              className="mb-8 glass-card-enhanced p-6 md:p-8 flex flex-col items-center text-center border-l-4 border-accent-secondary/40 bg-bg-secondary/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              aria-label="About Site Crawl"
            >
              <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">What Does Site Crawl Do?</h2>
              <p className="text-base md:text-lg text-text-secondary max-w-2xl mb-2">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Crawl up to 30 pages of your website for free—no setup required. Instantly detect technical SEO issues, broken links, missing meta tags, duplicate titles/canonicals, robots.txt and sitemap.xml status, and more. Get a clear, actionable overview of your site's health and indexability.
              </p>
              <ul className="text-left text-sm md:text-base text-text-secondary max-w-2xl list-disc pl-5">
                <li>Checks robots.txt and sitemap.xml for crawlability</li>
                <li>Finds broken links, missing/duplicate titles, meta descriptions, canonicals</li>
                <li>Highlights accessibility and image alt issues</li>
                <li>Exports results as CSV for further analysis</li>
                <li>Mobile-optimized, accessible, and privacy-friendly</li>
              </ul>
            </motion.section>
            <ModernCrawlTab result={result} />
          </>
        )}

        {activeTab === "ai" && <ModernAIInsightsTab result={result} />}
        {activeTab === "rank" && (
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">Rank Tracking</h2>
              {(() => {
                const domainId = result.domain_id || result.domainId || result.id || 'fallback-id';
                console.log('Rank & Backlinks Debug:', {
                  resultKeys: Object.keys(result),
                  domain_id: result.domain_id,
                  domainId: result.domainId,
                  id: result.id,
                  finalDomainId: domainId
                });
                return <RankSnapshotSection domainId={domainId} />;
              })()}
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-4">Backlink Snapshot</h2>
              {(() => {
                const domainId = result.domain_id || result.domainId || result.id || 'fallback-id';
                return <BacklinkSnapshotSection domainId={domainId} />;
              })()}
            </section>
          </div>
        )}
        </div>
      </motion.div>
      {/* Global Modals */}
      {showReportBuilder && (
        <Modal isOpen={showReportBuilder} onClose={() => setShowReportBuilder(false)}>
          <ReportBuilder isOpen={showReportBuilder} onClose={() => setShowReportBuilder(false)} result={result} />
        </Modal>
      )}
      {showFixPack && (
        <Modal isOpen={showFixPack} onClose={() => setShowFixPack(false)}>
          <FixPack isOpen={showFixPack} onClose={() => setShowFixPack(false)} result={result} />
        </Modal>
      )}
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
