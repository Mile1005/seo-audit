"use client";

import React, { useState } from "react";
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
  Globe
} from "lucide-react";
import { Button } from "../../ui/button";

export default function ImplementationGuides() {
  const [activeGuide, setActiveGuide] = useState("core-web-vitals");

  const guides = [
    {
      id: "core-web-vitals",
      title: "Core Web Vitals Optimization",
      category: "Technical",
      difficulty: "Intermediate",
      duration: "2-4 hours",
      description: "Step-by-step guide to improve your Core Web Vitals scores for better user experience and search rankings.",
      icon: Zap,
      color: "blue"
    },
    {
      id: "schema-markup",
      title: "Schema Markup Implementation",
      category: "Technical",
      difficulty: "Beginner",
      duration: "1-2 hours",
      description: "Complete guide to adding structured data markup for rich snippets and better search visibility.",
      icon: Code2,
      color: "green"
    },
    {
      id: "content-optimization",
      title: "Content Optimization Framework",
      category: "Content",
      difficulty: "Beginner",
      duration: "3-6 hours",
      description: "Comprehensive approach to optimizing existing content for better search rankings and user engagement.",
      icon: FileText,
      color: "purple"
    },
    {
      id: "mobile-seo",
      title: "Mobile-First SEO Setup",
      category: "Technical",
      difficulty: "Advanced",
      duration: "4-8 hours",
      description: "Advanced techniques for mobile-first indexing optimization and responsive SEO implementation.",
      icon: Smartphone,
      color: "orange"
    }
  ];

  const implementationSteps = {
    "core-web-vitals": [
      {
        step: 1,
        title: "Audit Current Performance",
        description: "Use PageSpeed Insights and Core Web Vitals tools to establish baseline metrics",
        code: `// Measure Core Web Vitals with JavaScript
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);`,
        tools: ["Google PageSpeed Insights", "Chrome DevTools", "Web Vitals Extension"],
        timeEstimate: "30 minutes"
      },
      {
        step: 2,
        title: "Optimize Largest Contentful Paint (LCP)",
        description: "Improve loading performance of the largest visible element",
        code: `<!-- Preload critical resources -->
<link rel="preload" href="/hero-image.webp" as="image">
<link rel="preload" href="/critical.css" as="style">

<!-- Optimize images -->
<img src="/hero-image.webp" 
     srcset="/hero-image-480.webp 480w, 
             /hero-image-800.webp 800w,
             /hero-image-1200.webp 1200w"
     sizes="(max-width: 768px) 100vw, 50vw"
     alt="Hero image" 
     loading="eager" />`,
        tools: ["ImageOptim", "WebP Converter", "CDN Setup"],
        timeEstimate: "2-3 hours"
      },
      {
        step: 3,
        title: "Minimize First Input Delay (FID)",
        description: "Reduce JavaScript execution time and improve interactivity",
        code: `// Code splitting with dynamic imports
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Defer non-critical JavaScript
<script defer src="/non-critical.js"></script>

// Use web workers for heavy computations
const worker = new Worker('/heavy-computation.js');
worker.postMessage(data);`,
        tools: ["Webpack Bundle Analyzer", "Lighthouse", "Chrome DevTools"],
        timeEstimate: "2-4 hours"
      },
      {
        step: 4,
        title: "Reduce Cumulative Layout Shift (CLS)",
        description: "Prevent unexpected layout shifts during page load",
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
        tools: ["Layout Shift GIF Generator", "Font Display Tester", "CLS Debugger"],
        timeEstimate: "1-2 hours"
      }
    ],
    "schema-markup": [
      {
        step: 1,
        title: "Choose Appropriate Schema Types",
        description: "Identify the most relevant schema markup for your content type",
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
        tools: ["Schema.org", "Google Rich Results Test", "Schema Markup Generator"],
        timeEstimate: "30 minutes"
      },
      {
        step: 2,
        title: "Implement Product/Service Schema",
        description: "Add structured data for your main products or services",
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
        tools: ["JSON-LD Generator", "Rich Results Test", "Schema Validator"],
        timeEstimate: "1-2 hours"
      }
    ]
  };

  const currentGuide = guides.find(g => g.id === activeGuide);
  const currentSteps = implementationSteps[activeGuide as keyof typeof implementationSteps] || [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/10 text-green-400";
      case "Intermediate": return "bg-yellow-500/10 text-yellow-400";
      case "Advanced": return "bg-red-500/10 text-red-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getGuideColor = (color: string) => {
    switch (color) {
      case "blue": return "from-blue-600 to-blue-700";
      case "green": return "from-green-600 to-green-700";
      case "purple": return "from-purple-600 to-purple-700";
      case "orange": return "from-orange-600 to-orange-700";
      default: return "from-gray-600 to-gray-700";
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Step-by-Step Implementation Guides
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just get recommendations—get detailed, actionable guides with code snippets, 
            tools, and timelines to implement every optimization.
          </p>
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
                <Icon className={`w-8 h-8 mb-4 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                <h3 className={`font-semibold mb-2 ${isActive ? "text-white" : "text-foreground"}`}>
                  {guide.title}
                </h3>
                <p className={`text-sm mb-4 ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                  {guide.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive 
                      ? "bg-white/20 text-white" 
                      : getDifficultyColor(guide.difficulty)
                  }`}>
                    {guide.difficulty}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "bg-muted text-muted-foreground"
                  }`}>
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
            className="bg-card rounded-xl border p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {currentGuide.title}
                </h3>
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
                  Download PDF
                </Button>
                <Button size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Video
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              {currentSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex space-x-6"
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
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-foreground">{step.title}</h4>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.timeEstimate}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{step.description}</p>

                    {/* Code Block */}
                    <div className="bg-slate-900 rounded-lg overflow-hidden mb-4">
                      <div className="flex items-center justify-between p-3 bg-slate-800">
                        <div className="flex items-center space-x-2">
                          <Terminal className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-300">Implementation Code</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white h-6">
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                        <code>{step.code}</code>
                      </pre>
                    </div>

                    {/* Tools & Resources */}
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2 flex items-center">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Recommended Tools
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
                    Ready to Implement?
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Follow these steps and see measurable improvements in 2-4 weeks.
                  </p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Complete
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
            <h4 className="font-semibold text-foreground mb-2">PDF Guides</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Download comprehensive guides for offline reference
            </p>
            <Button variant="outline" size="sm">Download All</Button>
          </div>
          
          <div className="bg-card rounded-lg border p-6 text-center">
            <Play className="w-8 h-8 text-green-600 mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Video Tutorials</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Step-by-step video walkthroughs for visual learners
            </p>
            <Button variant="outline" size="sm">Watch Now</Button>
          </div>
          
          <div className="bg-card rounded-lg border p-6 text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Expert Support</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get help from our SEO experts during implementation
            </p>
            <Button variant="outline" size="sm">Get Support</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
