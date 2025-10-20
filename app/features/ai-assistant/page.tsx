"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Brain, 
  Target, 
  Zap,
  ArrowRight,
  Play,
  CheckCircle
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { MainLayout } from "../../../components/layout/main-layout";
import { Breadcrumbs } from "../../../components/navigation/breadcrumbs";
import HowAiWorks from "../../../components/features/ai-assistant/how-ai-works";
import RecommendationTypes from "../../../components/features/ai-assistant/recommendation-types";
import ImplementationGuides from "../../../components/features/ai-assistant/implementation-guides";
import IndustrySpecialization from "../../../components/features/ai-assistant/industry-specialization";
import { StructuredData, generateFeatureSchema, generateFAQSchema } from "../../../components/seo/StructuredData";

export default function AiAssistantPage() {
  const featureSchema = generateFeatureSchema({
    name: "AI SEO Assistant",
    description: "Intelligent AI-powered SEO assistant that provides personalized recommendations, answers SEO questions, guides implementation, and helps you optimize your website with expert-level advice.",
    url: "https://www.aiseoturbo.com/features/ai-assistant",
    features: [
      "Natural Language SEO Questions",
      "Personalized Recommendations",
      "Step-by-Step Implementation Guides",
      "Real-Time SEO Advice",
      "Content Optimization Suggestions",
      "Technical SEO Guidance",
      "Best Practice Validation",
      "Industry-Specific Insights",
      "24/7 Availability",
      "Multi-Language Support"
    ],
    category: "AI Assistant"
  });

  const faqSchema = generateFAQSchema([
    {
      question: "How does the AI SEO Assistant work?",
      answer: "Our AI is trained on millions of websites and SEO best practices. Ask questions in natural language, and receive expert-level answers with step-by-step implementation guides tailored to your website."
    },
    {
      question: "Can the AI help with technical SEO issues?",
      answer: "Yes! The AI assistant can diagnose and provide solutions for technical issues including crawlability problems, indexing errors, site speed, structured data, and more."
    },
    {
      question: "Is the AI assistant available 24/7?",
      answer: "Absolutely! Get instant SEO guidance anytime, day or night. No waiting for human consultants or support tickets."
    },
    {
      question: "How accurate are the AI recommendations?",
      answer: "Our AI has 95%+ accuracy and is continuously updated with the latest Google algorithm changes and SEO best practices. Recommendations are validated by SEO experts."
    },
    {
      question: "Can I use the AI for content optimization?",
      answer: "Yes! Get suggestions for title tags, meta descriptions, heading structure, keyword usage, content gaps, and overall content quality improvements."
    }
  ]);

  const heroMetrics = [
    { label: "AI Models Trained", value: "12+", description: "Specialized SEO algorithms" },
    { label: "Recommendations Generated", value: "2.3M+", description: "Actionable insights delivered" },
    { label: "Average Improvement", value: "40%", description: "Traffic increase within 3 months" },
    { label: "Languages Supported", value: "25+", description: "Global SEO optimization" }
  ];

  const conversationPreview = [
    {
      type: "user",
      message: "My website traffic dropped 30% last month. What should I check first?",
      time: "Just now"
    },
    {
      type: "ai",
      message: "I'll analyze your recent data. Based on my initial scan, I see 3 priority areas: 1) Core Web Vitals scores dropped significantly 2) 15 high-value keywords lost rankings 3) Technical crawl errors increased. Let me run a deeper analysis...",
      time: "Just now",
      typing: true
    }
  ];

  return (
    <MainLayout>
      <StructuredData data={featureSchema} />
      <StructuredData data={faqSchema} />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs
            items={[
              { name: 'Features', url: 'https://www.aiseoturbo.com/features' },
              { name: 'AI Assistant', url: 'https://www.aiseoturbo.com/features/ai-assistant' }
            ]}
            className="mb-4"
          />
        </div>
        
        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
          
          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                    <Brain className="w-4 h-4 mr-2" />
                    AI-Powered SEO Intelligence
                  </div>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                    Get Personalized{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      SEO Recommendations
                    </span>
                  </h1>
                  
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Chat with our AI assistant for instant, personalized SEO advice. Get actionable 
                    recommendations based on your specific website, industry, and goals.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Chat with AI Assistant
                  </Button>
                  <Button variant="outline" size="lg">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Trained on 10M+ SEO data points</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Real-time Google algorithm updates</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Content - AI Chat Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl border shadow-2xl overflow-hidden">
                  {/* Chat Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Brain className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="font-semibold">AI SEO Assistant</h2>
                        <p className="text-sm opacity-90">Online • Ready to help</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="p-6 space-y-4 h-80 overflow-y-auto">
                    {conversationPreview.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.2 }}
                        className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[80%] rounded-2xl p-4 ${
                          msg.type === "user" 
                            ? "bg-blue-600 text-white" 
                            : "bg-muted text-foreground"
                        }`}>
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-2 ${
                            msg.type === "user" ? "text-blue-100" : "text-muted-foreground"
                          }`}>
                            {msg.time}
                          </p>
                          {msg.typing && (
                            <div className="flex space-x-1 mt-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Chat Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                      <input 
                        type="text" 
                        placeholder="Ask me anything about SEO..."
                        className="flex-1 bg-transparent border-none outline-none text-sm"
                        disabled
                      />
                      <Button size="sm" disabled>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {heroMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-card rounded-xl border hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                  <div className="text-sm font-medium text-foreground mb-1">{metric.label}</div>
                  <div className="text-xs text-muted-foreground">{metric.description}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Feature Sections */}
        <HowAiWorks />
        <RecommendationTypes />
        <ImplementationGuides />
        <IndustrySpecialization />

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl p-12 border"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Accelerate Your SEO?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of SEO professionals who rely on our AI assistant for 
                data-driven recommendations and faster results.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Free Conversation
                </Button>
                <Button variant="outline" size="lg">
                  <Target className="w-5 h-5 mr-2" />
                  View Pricing Plans
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
