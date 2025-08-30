"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Database, 
  Zap, 
  Target,
  TrendingUp,
  BarChart3,
  Search,
  Globe,
  ChevronRight,
  Play
} from "lucide-react";
import { Button } from "../../ui/button";

export default function HowAiWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Data Collection",
      description: "Continuously gathering SEO signals from search engines, competitors, and industry trends",
      icon: Database,
      details: [
        "Real-time SERP monitoring across 50+ countries",
        "Technical crawling of 100M+ web pages daily",
        "Algorithm update tracking and correlation analysis",
        "User behavior and engagement pattern analysis"
      ],
      metrics: {
        dataPoints: "10M+",
        updateFrequency: "Every 6 hours",
        accuracy: "99.7%"
      }
    },
    {
      id: 1,
      title: "AI Analysis",
      description: "Advanced machine learning models process patterns and identify optimization opportunities",
      icon: Brain,
      details: [
        "Natural language processing for content analysis",
        "Computer vision for technical SEO assessment",
        "Predictive modeling for ranking forecasts",
        "Anomaly detection for penalty identification"
      ],
      metrics: {
        models: "12",
        processingTime: "< 30 seconds",
        accuracy: "94.3%"
      }
    },
    {
      id: 2,
      title: "Personalization",
      description: "Tailoring recommendations based on your specific website, industry, and business goals",
      icon: Target,
      details: [
        "Website-specific technical architecture analysis",
        "Industry-based competitive landscape mapping",
        "Business goal alignment and priority scoring",
        "Historical performance pattern recognition"
      ],
      metrics: {
        industries: "150+",
        customization: "100%",
        relevance: "96.8%"
      }
    },
    {
      id: 3,
      title: "Actionable Insights",
      description: "Delivering clear, prioritized recommendations with implementation guidance",
      icon: Zap,
      details: [
        "Step-by-step implementation instructions",
        "Priority scoring based on impact vs effort",
        "Success probability calculations",
        "Timeline and resource requirement estimates"
      ],
      metrics: {
        recommendations: "2.3M+",
        avgImpact: "+40%",
        successRate: "87%"
      }
    }
  ];

  const trainingData = [
    { source: "Search Engine Patents", count: "2,500+", description: "Algorithm insights" },
    { source: "Ranking Factor Studies", count: "500+", description: "Correlation analysis" },
    { source: "Website Crawl Data", count: "100M+", description: "Technical patterns" },
    { source: "SERP Monitoring", count: "1B+", description: "Ranking changes" },
    { source: "Case Studies", count: "10K+", description: "Success patterns" },
    { source: "User Interactions", count: "50M+", description: "Behavior insights" }
  ];

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
            How Our AI Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI assistant is trained on the world's largest SEO dataset, continuously learning from 
            search engine patterns and successful optimization strategies.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`cursor-pointer transition-all duration-300 ${
                    isActive ? "transform scale-105" : ""
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    isActive 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg" 
                      : "border-border bg-card hover:border-blue-300 hover:shadow-md"
                  }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                      isActive 
                        ? "bg-blue-500 text-white" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    
                    <div className="space-y-2">
                      {Object.entries(step.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}:
                          </span>
                          <span className="font-medium text-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Step Details */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-12 bg-card rounded-xl border p-8"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-4">
                  {steps[activeStep].title} Deep Dive
                </h4>
                <ul className="space-y-3">
                  {steps[activeStep].details.map((detail, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6">
                <h5 className="font-semibold text-foreground mb-4">Key Metrics</h5>
                <div className="space-y-4">
                  {Object.entries(steps[activeStep].metrics).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="text-xl font-bold text-blue-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Training Data Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-xl border p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Trained on the World's Largest SEO Dataset
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI models are continuously trained on diverse, high-quality data sources 
              to ensure accurate and up-to-date recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingData.map((data, index) => (
              <motion.div
                key={data.source}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-4 bg-muted/50 rounded-lg"
              >
                <div className="text-2xl font-bold text-blue-600 mb-1">{data.count}</div>
                <div className="text-sm font-medium text-foreground mb-1">{data.source}</div>
                <div className="text-xs text-muted-foreground">{data.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Play className="w-5 h-5 mr-2" />
            See AI in Action
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
