"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code, 
  FileText, 
  Target, 
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Zap,
  AlertTriangle,
  Clock,
  Star,
  ArrowRight
} from "lucide-react";
import { Button } from "../../ui/button";
import { handleCTAClick } from "@/lib/cta-utils";

export default function RecommendationTypes() {
  const [activeCategory, setActiveCategory] = useState("technical");

  const categories = [
    {
      id: "technical",
      title: "Technical SEO",
      icon: Code,
      description: "Code-level optimizations and site architecture improvements",
      color: "blue"
    },
    {
      id: "content",
      title: "Content Strategy", 
      icon: FileText,
      description: "Content creation, optimization, and gap analysis",
      color: "green"
    },
    {
      id: "strategic",
      title: "Strategic Planning",
      icon: Target,
      description: "Long-term SEO strategy and competitive positioning",
      color: "purple"
    }
  ];

  const recommendations = {
    technical: [
      {
        id: 1,
        title: "Core Web Vitals Optimization",
        priority: "high",
        impact: "High",
        effort: "Medium",
        timeframe: "2-4 weeks",
        description: "Your Largest Contentful Paint (LCP) is 4.2s, which exceeds Google's recommended 2.5s threshold. This affects both user experience and rankings.",
        actions: [
          "Optimize hero image compression (reduce by 60%)",
          "Implement lazy loading for below-fold images",
          "Minimize render-blocking JavaScript",
          "Enable server-side caching for static assets"
        ],
        expectedImpact: "+15% organic traffic",
        codeSnippet: `// Lazy loading implementation
<img src="hero-image.webp" loading="lazy" alt="..." />

// Preload critical resources
<link rel="preload" href="critical.css" as="style" />`,
        confidence: 92
      },
      {
        id: 2,
        title: "Schema Markup Implementation",
        priority: "medium",
        impact: "Medium",
        effort: "Low",
        timeframe: "1-2 weeks",
        description: "Missing structured data is preventing rich snippets in search results. Competitors are gaining visibility advantage.",
        actions: [
          "Add Organization schema to homepage",
          "Implement Product schema for service pages",
          "Add Review schema for testimonials",
          "Set up FAQ schema for support content"
        ],
        expectedImpact: "+25% click-through rate",
        codeSnippet: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AISEOTurbo",
  "url": "https://aiseoturbo.com"
}`,
        confidence: 88
      }
    ],
    content: [
      {
        id: 3,
        title: "Content Gap Analysis",
        priority: "high",
        impact: "High",
        effort: "High",
        timeframe: "6-8 weeks",
        description: "Analysis reveals 23 high-value topics where competitors rank but you don't. Creating content around these could capture 45K monthly visits.",
        actions: [
          "Create comprehensive 'SEO Audit Guide 2024'",
          "Develop interactive SEO checklist tool",
          "Write comparison articles vs top 3 competitors",
          "Build resource hub with downloadable templates"
        ],
        expectedImpact: "+45K monthly organic traffic",
        contentStrategy: "Focus on bottom-funnel keywords with commercial intent",
        confidence: 85
      },
      {
        id: 4,
        title: "Content Optimization",
        priority: "medium",
        impact: "Medium",
        effort: "Medium",
        timeframe: "3-4 weeks",
        description: "Existing pages have optimization opportunities. 12 pages could move from page 2 to page 1 with targeted improvements.",
        actions: [
          "Optimize title tags for target keywords",
          "Improve meta descriptions for higher CTR",
          "Add internal linking between related pages",
          "Update content freshness with latest data"
        ],
        expectedImpact: "+20% ranking positions",
        contentStrategy: "Update and optimize existing high-potential content",
        confidence: 90
      }
    ],
    strategic: [
      {
        id: 5,
        title: "Competitive Positioning",
        priority: "high",
        impact: "High",
        effort: "Medium",
        timeframe: "8-12 weeks",
        description: "Strategic analysis shows opportunities to outrank competitors in 3 key market segments by leveraging unique positioning.",
        actions: [
          "Develop thought leadership content series",
          "Create industry-specific landing pages",
          "Build partnerships for authoritative backlinks",
          "Establish brand presence in key communities"
        ],
        expectedImpact: "+60% brand awareness",
        strategicFocus: "Thought leadership and market differentiation",
        confidence: 78
      },
      {
        id: 6,
        title: "Link Building Strategy",
        priority: "medium",
        impact: "High", 
        effort: "High",
        timeframe: "12-16 weeks",
        description: "Domain authority gap analysis identifies specific link building opportunities to improve competitive position.",
        actions: [
          "Digital PR campaign targeting industry publications",
          "Create linkable assets (tools, studies, guides)",
          "Guest posting on high-authority sites",
          "Build relationships with industry influencers"
        ],
        expectedImpact: "+25% domain authority",
        strategicFocus: "Authority building and relationship development",
        confidence: 82
      }
    ]
  };

  const currentRecommendations = recommendations[activeCategory as keyof typeof recommendations];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "low": return "bg-green-500/10 text-green-400 border-green-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryColor = (color: string) => {
    switch (color) {
      case "blue": return "from-blue-600 to-blue-700";
      case "green": return "from-green-600 to-green-700";
      case "purple": return "from-purple-600 to-purple-700";
      default: return "from-gray-600 to-gray-700";
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
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
            Intelligent Recommendation Types
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI provides targeted recommendations across all aspects of SEO, from technical 
            optimizations to strategic content planning and competitive positioning.
          </p>
        </motion.div>

        {/* Category Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                  isActive 
                    ? `border-${category.color}-500 bg-gradient-to-r ${getCategoryColor(category.color)} text-white shadow-lg transform scale-105`
                    : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                <div className="text-left">
                  <div className={`font-semibold ${isActive ? "text-white" : "text-foreground"}`}>
                    {category.title}
                  </div>
                  <div className={`text-sm ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                    {category.description}
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Recommendations */}
        <div className="space-y-8">
          {currentRecommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{rec.title}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                        {rec.priority} priority
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{rec.description}</p>
                  </div>
                  
                  <div className="text-right ml-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-foreground">
                        {rec.confidence}% confidence
                      </span>
                    </div>
                    <div className="text-lg font-bold text-primary">{rec.expectedImpact}</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground">Impact</div>
                    <div className="text-lg font-bold text-primary">{rec.impact}</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground">Effort</div>
                    <div className="text-lg font-bold text-foreground">{rec.effort}</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground">Timeline</div>
                    <div className="text-lg font-bold text-foreground">{rec.timeframe}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-foreground mb-3 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Action Items
                  </h4>
                  <div className="space-y-2">
                    {rec.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Snippet or Strategy (if available) */}
                {(rec as any).codeSnippet && (
                  <div className="bg-slate-900 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-white">Implementation Example</h4>
                      <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
                        Copy Code
                      </Button>
                    </div>
                    <div className="overflow-x-auto max-w-full">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap break-words min-w-0">
                        <code className="block">{(rec as any).codeSnippet}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {(rec as any).contentStrategy && (
                  <div className="bg-green-500/10 rounded-lg p-4 mb-4 border border-green-500/20">
                    <h5 className="text-sm font-medium text-green-800 dark:text-green-400 mb-2">
                      Content Strategy
                    </h5>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {(rec as any).contentStrategy}
                    </p>
                  </div>
                )}

                {(rec as any).strategicFocus && (
                  <div className="bg-purple-500/10 rounded-lg p-4 mb-4 border border-purple-500/20">
                    <h5 className="text-sm font-medium text-purple-800 dark:text-purple-400 mb-2">
                      Strategic Focus
                    </h5>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      {(rec as any).strategicFocus}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Estimated completion: {rec.timeframe}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCTAClick('FEATURES', 'View Details', 'ai-recommendations')}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleCTAClick('START_AUDIT', 'Implement Now', 'ai-recommendations')}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Implement Now
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-card border rounded-xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Get Personalized Recommendations
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every recommendation is tailored to your specific website, industry, and business goals. 
              Start your free analysis to see what opportunities await.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Lightbulb className="w-5 h-5 mr-2" />
              Start Free Analysis
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
