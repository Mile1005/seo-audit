"use client";

import React from "react";
import { motion } from "framer-motion";

interface PerformanceData {
  lcp: number | null; // Largest Contentful Paint (seconds)
  cls: number | null; // Cumulative Layout Shift
  inp: number | null; // Interaction to Next Paint (milliseconds)
  notes: string[];
}

interface PerformancePanelProps {
  performance: PerformanceData;
}

export default function PerformancePanel({ performance }: PerformancePanelProps) {
  const getLCPStatus = (lcp: number | null) => {
    if (lcp === null) return { status: "unknown", color: "text-gray-400", label: "Not available" };
    if (lcp <= 2.5) return { status: "good", color: "text-green-400", label: "Good" };
    if (lcp <= 4.0) return { status: "needs-improvement", color: "text-yellow-400", label: "Needs improvement" };
    return { status: "poor", color: "text-red-400", label: "Poor" };
  };

  const getCLSStatus = (cls: number | null) => {
    if (cls === null) return { status: "unknown", color: "text-gray-400", label: "Not available" };
    if (cls <= 0.1) return { status: "good", color: "text-green-400", label: "Good" };
    if (cls <= 0.25) return { status: "needs-improvement", color: "text-yellow-400", label: "Needs improvement" };
    return { status: "poor", color: "text-red-400", label: "Poor" };
  };

  const getINPStatus = (inp: number | null) => {
    if (inp === null) return { status: "unknown", color: "text-gray-400", label: "Not available" };
    if (inp <= 200) return { status: "good", color: "text-green-400", label: "Good" };
    if (inp <= 500) return { status: "needs-improvement", color: "text-yellow-400", label: "Needs improvement" };
    return { status: "poor", color: "text-red-400", label: "Poor" };
  };

  const lcpStatus = getLCPStatus(performance.lcp);
  const clsStatus = getCLSStatus(performance.cls);
  const inpStatus = getINPStatus(performance.inp);

  return (
    <motion.div 
      className="glass-card-enhanced p-6 animated-gradient-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-text-primary mb-6">Core Web Vitals</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* LCP */}
        <motion.div 
          className="border border-gray-700 rounded-lg p-4 bg-bg-secondary/30 fire-gradient-hover"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-text-primary">LCP</h4>
            <span className={`text-sm font-medium ${lcpStatus.color}`}>
              {lcpStatus.label}
            </span>
          </div>
          <div className="text-2xl font-bold text-text-primary">
            {performance.lcp !== null ? `${performance.lcp.toFixed(2)}s` : "—"}
          </div>
          <div className="text-sm text-text-secondary">Largest Contentful Paint</div>
          <div className="text-xs text-text-secondary mt-1">Target: ≤2.5s</div>
        </motion.div>

        {/* CLS */}
        <motion.div 
          className="border border-gray-700 rounded-lg p-4 bg-bg-secondary/30 fire-gradient-hover"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-text-primary">CLS</h4>
            <span className={`text-sm font-medium ${clsStatus.color}`}>
              {clsStatus.label}
            </span>
          </div>
          <div className="text-2xl font-bold text-text-primary">
            {performance.cls !== null ? performance.cls.toFixed(3) : "—"}
          </div>
          <div className="text-sm text-text-secondary">Cumulative Layout Shift</div>
          <div className="text-xs text-text-secondary mt-1">Target: ≤0.1</div>
        </motion.div>

        {/* INP */}
        <motion.div 
          className="border border-gray-700 rounded-lg p-4 bg-bg-secondary/30 fire-gradient-hover"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-text-primary">INP</h4>
            <span className={`text-sm font-medium ${inpStatus.color}`}>
              {inpStatus.label}
            </span>
          </div>
          <div className="text-2xl font-bold text-text-primary">
            {performance.inp !== null ? `${performance.inp}ms` : "—"}
          </div>
          <div className="text-sm text-text-secondary">Interaction to Next Paint</div>
          <div className="text-xs text-text-secondary mt-1">Target: ≤200ms</div>
          {performance.inp === null && (
            <div className="text-xs text-yellow-400 mt-2">
              INP may be unavailable if there is not enough user input data or if PageSpeed Insights does not report it for this page.
            </div>
          )}
        </motion.div>
      </div>

      {/* Performance Notes */}
      {performance.notes && performance.notes.length > 0 && (
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4 className="font-medium text-text-primary mb-4">Performance Insights</h4>
          <div className="space-y-3">
            {performance.notes.map((note, index) => (
              <motion.div 
                key={index} 
                className="text-sm text-text-secondary bg-bg-secondary/50 rounded-lg p-3 border border-accent-primary/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                {note}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
