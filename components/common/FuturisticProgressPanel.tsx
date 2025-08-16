import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { icon: "🔄", text: "Initializing audit engine..." },
  { icon: "🌐", text: "Fetching HTML from your site..." },
  { icon: "🧠", text: "Parsing content and extracting SEO elements..." },
  { icon: "⚡", text: "Checking Core Web Vitals (LCP, CLS, INP)..." },
  { icon: "🔗", text: "Analyzing internal and external links..." },
  { icon: "📊", text: "Fetching Google Search Console data..." },
  { icon: "🤖", text: "Compiling your personalized SEO report..." },
];

const tips = [
  "💡 Tip: Use only one <h1> per page for best SEO results!",
  "💡 Tip: Meta descriptions should be 150-160 characters.",
  "💡 Tip: Fast loading times improve both SEO and user experience.",
  "💡 Tip: Use descriptive alt text for all images.",
  "💡 Tip: Internal links help search engines crawl your site.",
  "💡 Tip: Mobile-friendly design is a Google ranking factor.",
  "💡 Tip: Use HTTPS for better security and SEO.",
  "💡 Tip: Structured data can enhance your search results.",
];

export default function FuturisticProgressPanel({ status = "running" }: { status?: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [log, setLog] = useState([steps[0]]);
  const [tip, setTip] = useState(tips[Math.floor(Math.random() * tips.length)]);

  useEffect(() => {
    if (status !== "running") return;
    if (currentStep < steps.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentStep((s) => s + 1);
        setLog((l) => [...l, steps[currentStep + 1]]);
        if (Math.random() > 0.5) setTip(tips[Math.floor(Math.random() * tips.length)]);
      }, 1200 + Math.random() * 800);
      return () => clearTimeout(timeout);
    }
  }, [currentStep, status]);

  return (
    <motion.div
      className="glass-card-enhanced p-6 mt-6 mb-6 relative overflow-hidden futuristic-progress-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: 220 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 opacity-60 pointer-events-none z-0" />
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-accent-primary mb-4 flex items-center gap-2">
          <span className="animate-pulse">🚀</span> Live Audit Progress
        </h3>
        <div className="bg-bg-secondary/60 rounded-lg p-4 mb-4 min-h-[100px] font-mono text-accent-primary text-sm shadow-inner futuristic-terminal">
          <AnimatePresence>
            {log.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 mb-1"
              >
                <span className="text-lg">{step.icon}</span>
                <span>{step.text}</span>
                {idx === currentStep && status === "running" && (
                  <span className="ml-2 animate-pulse text-accent-secondary">▌</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-2 text-accent-secondary text-xs md:text-sm italic flex items-center gap-2">
          <span className="text-accent-primary">✨</span> {tip}
        </div>
      </div>
      <div className="absolute top-0 right-0 m-4">
        <span className="inline-block w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg" title="Audit in progress" />
      </div>
    </motion.div>
  );
}
