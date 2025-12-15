"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Code2,
  FileText,
  CheckCircle,
  Play,
  Download,
  Copy,
  ExternalLink,
  Clock,
  Users,
  Zap,
  ArrowRight,
  Terminal,
  Smartphone,
  Globe,
} from "lucide-react";
import { Button } from "../../ui/button";

export default function ImplementationGuides() {
  const t = useTranslations("featurePages.aiAssistant.implementationGuides");
  const [activeGuide, setActiveGuide] = useState("core-web-vitals");

  const guides = [
    {
      id: "core-web-vitals",
      title: t("guides.coreWebVitals.title"),
      category: t("guides.coreWebVitals.category"),
      difficulty: t("guides.coreWebVitals.difficulty"),
      duration: t("guides.coreWebVitals.duration"),
      description: t("guides.coreWebVitals.description"),
      icon: Zap,
      color: "blue",
    },
    {
      id: "schema-markup",
      title: t("guides.schemaMarkup.title"),
      category: t("guides.schemaMarkup.category"),
      difficulty: t("guides.schemaMarkup.difficulty"),
      duration: t("guides.schemaMarkup.duration"),
      description: t("guides.schemaMarkup.description"),
      icon: Code2,
      color: "green",
    },
    {
      id: "content-optimization",
      title: t("guides.contentOptimization.title"),
      category: t("guides.contentOptimization.category"),
      difficulty: t("guides.contentOptimization.difficulty"),
      duration: t("guides.contentOptimization.duration"),
      description: t("guides.contentOptimization.description"),
      icon: FileText,
      color: "purple",
    },
    {
      id: "mobile-seo",
      title: t("guides.mobileSeo.title"),
      category: t("guides.mobileSeo.category"),
      difficulty: t("guides.mobileSeo.difficulty"),
      duration: t("guides.mobileSeo.duration"),
      description: t("guides.mobileSeo.description"),
      icon: Smartphone,
      color: "orange",
    },
  ];

  const implementationSteps = {
    "core-web-vitals": [
      {
        step: 1,
        title: t("steps.coreWebVitals.step1.title"),
        description: t("steps.coreWebVitals.step1.description"),
        code: `// Measure Core Web Vitals with JavaScript
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);`,
        tools: [
          t("steps.coreWebVitals.step1.tools.tool1"),
          t("steps.coreWebVitals.step1.tools.tool2"),
          t("steps.coreWebVitals.step1.tools.tool3"),
        ],
        timeEstimate: t("steps.coreWebVitals.step1.timeEstimate"),
      },
      {
        step: 2,
        title: t("steps.coreWebVitals.step2.title"),
        description: t("steps.coreWebVitals.step2.description"),
        code: `<!-- Preload critical resources -->
<link rel="preload" href="/hero-image.webp" as="image" fetchpriority="high">
<link rel="preload" href="/critical.css" as="style">

<!-- Optimize images -->
<img src="/hero-image.webp" 
     srcset="/hero-image-480.webp 480w, 
             /hero-image-800.webp 800w,
             /hero-image-1200.webp 1200w"
     sizes="(max-width: 768px) 100vw, 50vw"
     alt="Hero image" 
     loading="eager" />`,
        tools: [
          t("steps.coreWebVitals.step2.tools.tool1"),
          t("steps.coreWebVitals.step2.tools.tool2"),
          t("steps.coreWebVitals.step2.tools.tool3"),
        ],
        timeEstimate: t("steps.coreWebVitals.step2.timeEstimate"),
      },
      {
        step: 3,
        title: t("steps.coreWebVitals.step3.title"),
        description: t("steps.coreWebVitals.step3.description"),
        code: `// Code splitting with dynamic imports
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Defer non-critical JavaScript
<script defer src="/non-critical.js"></script>

// Use web workers for heavy computations
const worker = new Worker('/heavy-computation.js');
worker.postMessage(data);`,
        tools: [
          t("steps.coreWebVitals.step3.tools.tool1"),
          t("steps.coreWebVitals.step3.tools.tool2"),
          t("steps.coreWebVitals.step3.tools.tool3"),
        ],
        timeEstimate: t("steps.coreWebVitals.step3.timeEstimate"),
      },
      {
        step: 4,
        title: t("steps.coreWebVitals.step4.title"),
        description: t("steps.coreWebVitals.step4.description"),
        code: `/* Reserve space for images */
.image-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}

/* Font display swap */
@font-face {
  font-family: 'CustomFont';
  src: url('/font.woff2') format('woff2');
  font-display: swap;
}

/* Presize containers */
.ad-container {
  min-height: 250px;
  background: #f0f0f0;
}`,
        tools: [
          t("steps.coreWebVitals.step4.tools.tool1"),
          t("steps.coreWebVitals.step4.tools.tool2"),
          t("steps.coreWebVitals.step4.tools.tool3"),
        ],
        timeEstimate: t("steps.coreWebVitals.step4.timeEstimate"),
      },
    ],
    "schema-markup": [
      {
        step: 1,
        title: t("steps.schemaMarkup.step1.title"),
        description: t("steps.schemaMarkup.step1.description"),
        code: `// Organization Schema (for homepage)
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AISEOTurbo",
  "url": "https://aiseoturbo.com",
  "logo": "https://aiseoturbo.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-123-4567",
    "contactType": "customer service"
  }
}`,
        tools: [
          t("steps.schemaMarkup.step1.tools.tool1"),
          t("steps.schemaMarkup.step1.tools.tool2"),
          t("steps.schemaMarkup.step1.tools.tool3"),
        ],
        timeEstimate: t("steps.schemaMarkup.step1.timeEstimate"),
      },
      {
        step: 2,
        title: t("steps.schemaMarkup.step2.title"),
        description: t("steps.schemaMarkup.step2.description"),
        code: `// Service Schema
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "SEO Audit Service",
  "description": "Comprehensive SEO audit and optimization service",
  "provider": {
    "@type": "Organization",
    "name": "AISEOTurbo"
  },
  "offers": {
    "@type": "Offer",
    "price": "99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}`,
        tools: [
          t("steps.schemaMarkup.step2.tools.tool1"),
          t("steps.schemaMarkup.step2.tools.tool2"),
          t("steps.schemaMarkup.step2.tools.tool3"),
        ],
        timeEstimate: t("steps.schemaMarkup.step2.timeEstimate"),
      },
    ],
  };

  const currentGuide = guides.find((g) => g.id === activeGuide);
  const currentSteps = implementationSteps[activeGuide as keyof typeof implementationSteps] || [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-400";
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-400";
      case "Advanced":
        return "bg-red-500/10 text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getGuideColor = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-600 to-blue-700";
      case "green":
        return "from-green-600 to-green-700";
      case "purple":
        return "from-purple-600 to-purple-700";
      case "orange":
        return "from-orange-600 to-orange-700";
      default:
        return "from-gray-600 to-gray-700";
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        {/* Guide Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {guides.map((guide) => {
            const Icon = guide.icon;
            const isActive = activeGuide === guide.id;

            return (
              <motion.button
                key={guide.id}
                onClick={() => setActiveGuide(guide.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                  isActive
                    ? `border-${guide.color}-500 bg-gradient-to-br ${getGuideColor(guide.color)} text-white shadow-lg`
                    : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                }`}
              >
                <Icon
                  className={`w-8 h-8 mb-4 ${isActive ? "text-white" : "text-muted-foreground"}`}
                />
                <h3 className={`font-semibold mb-2 ${isActive ? "text-white" : "text-foreground"}`}>
                  {guide.title}
                </h3>
                <p
                  className={`text-sm mb-4 ${isActive ? "text-white/80" : "text-muted-foreground"}`}
                >
                  {guide.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isActive ? "bg-white/20 text-white" : getDifficultyColor(guide.difficulty)
                    }`}
                  >
                    {guide.difficulty}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {guide.duration}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Implementation Steps */}
        {currentGuide && (
          <motion.div
            key={activeGuide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-xl border p-8 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{currentGuide.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {currentGuide.duration}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {currentGuide.difficulty}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  {t("buttons.downloadPdf")}
                </Button>
                <Button size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  {t("buttons.watchVideo")}
                </Button>
              </div>
            </div>

            <div className="space-y-8 overflow-hidden">
              {currentSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex space-x-6 min-w-0"
                >
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    {index < currentSteps.length - 1 && (
                      <div className="w-0.5 h-16 bg-border ml-4 mt-2"></div>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-foreground">{step.title}</h4>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.timeEstimate}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4">{step.description}</p>

                    {/* Code Block */}
                    <div className="bg-slate-900 rounded-lg overflow-hidden mb-4 max-w-full">
                      <div className="flex items-center justify-between p-3 bg-slate-800">
                        <div className="flex items-center space-x-2">
                          <Terminal className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-300">
                            {t("labels.implementationCode")}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-300 hover:text-white h-6"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          {t("labels.copy")}
                        </Button>
                      </div>
                      <div className="overflow-x-auto max-w-full">
                        <pre className="p-4 text-sm text-gray-300 whitespace-pre-wrap break-words min-w-0">
                          <code className="block">{step.code}</code>
                        </pre>
                      </div>
                    </div>

                    {/* Tools & Resources */}
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2 flex items-center">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t("labels.recommendedTools")}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {step.tools.map((tool, toolIndex) => (
                          <span
                            key={toolIndex}
                            className="text-xs bg-background border rounded-full px-3 py-1 text-muted-foreground"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Completion CTA */}
            <div className="mt-8 p-6 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-400 mb-1">
                    {t("cta.title")}
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {t("cta.description")}
                  </p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t("cta.button")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-card rounded-lg border p-6 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">{t("resources.pdfGuides.title")}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {t("resources.pdfGuides.description")}
            </p>
            <Button variant="outline" size="sm">
              {t("resources.pdfGuides.button")}
            </Button>
          </div>

          <div className="bg-card rounded-lg border p-6 text-center">
            <Play className="w-8 h-8 text-green-600 mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">
              {t("resources.videoTutorials.title")}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              {t("resources.videoTutorials.description")}
            </p>
            <Button variant="outline" size="sm">
              {t("resources.videoTutorials.button")}
            </Button>
          </div>

          <div className="bg-card rounded-lg border p-6 text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">
              {t("resources.expertSupport.title")}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              {t("resources.expertSupport.description")}
            </p>
            <Button variant="outline" size="sm">
              {t("resources.expertSupport.button")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
