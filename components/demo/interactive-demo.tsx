"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react";
import { sampleAudits, progressSteps, type SampleAuditData } from "./sample-data";
import { handleCTAClick } from "@/lib/cta-utils";
import { useTranslations } from "next-intl";

type DemoStep = "input" | "progress" | "results";

export function InteractiveDemo() {
  const t = useTranslations("home.demo");
  const [currentStep, setCurrentStep] = useState<DemoStep>("input");
  const [inputUrl, setInputUrl] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentProgressStep, setCurrentProgressStep] = useState(0);
  const [selectedAudit, setSelectedAudit] = useState<SampleAuditData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simulate progress when moving to progress step
  useEffect(() => {
    if (currentStep === "progress" && !isAnimating) {
      setIsAnimating(true);
      let totalDuration = 0;

      progressSteps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentProgressStep(index);
          setProgressPercent(((index + 1) / progressSteps.length) * 100);
        }, totalDuration);
        totalDuration += step.duration;
      });

      // Complete and move to results
      setTimeout(() => {
        setCurrentStep("results");
        setIsAnimating(false);
      }, totalDuration + 500);
    }
  }, [currentStep, isAnimating]);

  const handleStartDemo = () => {
    if (!inputUrl.trim()) return;

    // Select sample audit based on URL type
    let audit = sampleAudits[0]; // default to ecommerce
    if (inputUrl.includes("blog") || inputUrl.includes("news")) {
      audit = sampleAudits[1];
    } else if (inputUrl.includes("corp") || inputUrl.includes("company")) {
      audit = sampleAudits[2];
    }

    setSelectedAudit({ ...audit, url: inputUrl });
    setCurrentStep("progress");
    setProgressPercent(0);
    setCurrentProgressStep(0);
  };

  const resetDemo = () => {
    setCurrentStep("input");
    setInputUrl("");
    setProgressPercent(0);
    setCurrentProgressStep(0);
    setSelectedAudit(null);
    setIsAnimating(false);
  };

  // Simple SVG donut chart component
  const DonutChart = ({ score, size = 120 }: { score: number; size?: number }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="relative inline-block">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(148, 163, 184, 0.2)"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444"}
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{score}</span>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 text-sm mb-6">
            <Play className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300">{t("badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {t("title1")}
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              {t("title2")}
            </span>
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        {/* Demo Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 min-h-[500px]">
            <AnimatePresence mode="wait">
              {/* Step 1: URL Input */}
              {currentStep === "input" && (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center space-y-6"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">{t("form.title")}</h3>
                    <p className="text-gray-400">{t("form.subtitle")}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                      <label htmlFor="demo-url-input" className="sr-only">
                        {t("form.placeholder")}
                      </label>
                      <input
                        id="demo-url-input"
                        type="url"
                        placeholder={t("form.placeholder")}
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                        onKeyDown={(e) => e.key === "Enter" && handleStartDemo()}
                        aria-label={t("form.placeholder")}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStartDemo}
                        disabled={!inputUrl.trim()}
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
                      >
                        <span>{t("form.button")}</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <div className="text-sm text-gray-500">{t("form.examples")}</div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Progress */}
              {currentStep === "progress" && (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Analyzing {selectedAudit?.url}
                    </h3>
                    <p className="text-gray-400">
                      Our AI is scanning your website for SEO opportunities
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Progress</span>
                      <span>{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Current Step */}
                  <div className="text-center" aria-live="polite" aria-atomic="true">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg text-white font-medium">
                        {progressSteps[currentProgressStep]?.name || "Finalizing..."}
                      </span>
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {progressSteps.map((step, index) => (
                      <div
                        key={step.name}
                        className={`flex items-center space-x-2 p-3 rounded-lg border ${
                          index <= currentProgressStep
                            ? "border-purple-500/30 bg-purple-500/10"
                            : "border-slate-600/30 bg-slate-700/30"
                        }`}
                      >
                        {index < currentProgressStep ? (
                          <CheckCircle className="w-4 h-4 text-purple-400" />
                        ) : index === currentProgressStep ? (
                          <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <div className="w-4 h-4 border border-slate-500 rounded-full" />
                        )}
                        <span
                          className={`text-xs ${
                            index <= currentProgressStep ? "text-purple-300" : "text-gray-500"
                          }`}
                        >
                          {step.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Results */}
              {currentStep === "results" && selectedAudit && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Audit Complete!</h3>
                    <p className="text-gray-400">Here's what we found for {selectedAudit.url}</p>
                  </div>

                  {/* Overall Score */}
                  <div className="text-center mb-8">
                    <DonutChart score={selectedAudit.overallScore} />
                    <div className="mt-4">
                      <div className="text-lg font-semibold text-white">Overall SEO Score</div>
                      <div className="text-sm text-gray-400">
                        {selectedAudit.overallScore >= 80
                          ? "Excellent"
                          : selectedAudit.overallScore >= 60
                            ? "Good"
                            : "Needs Improvement"}
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {selectedAudit.categories.map((category) => (
                      <div
                        key={category.name}
                        className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-white">{category.name}</h4>
                          <span className="text-lg font-bold" style={{ color: category.color }}>
                            {category.score}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{category.description}</p>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <AlertCircle className="w-3 h-3" />
                          <span>{category.issues} issues found</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Key Issues */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4">Top Issues to Fix</h4>
                    <div className="space-y-3">
                      {selectedAudit.keyIssues.slice(0, 3).map((issue, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg"
                        >
                          {issue.severity === "critical" ? (
                            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                          ) : issue.severity === "warning" ? (
                            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <h5 className="font-medium text-white mb-1">{issue.title}</h5>
                            <p className="text-sm text-gray-400 mb-2">{issue.impact}</p>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>Est. time to fix: {issue.timeToFix}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center pt-6 border-t border-slate-700/50">
                    <p className="text-gray-400 mb-6">
                      This is just a preview. Get your full audit with detailed recommendations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.a
                        href="/dashboard"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                        id="demo-start-real-audit-cta"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCTAClick("START_AUDIT", "Get Your Real Audit", "interactive-demo");
                        }}
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span>Get Your Real Audit</span>
                      </motion.a>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetDemo}
                        className="bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                      >
                        Try Another URL
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteractiveDemo;
