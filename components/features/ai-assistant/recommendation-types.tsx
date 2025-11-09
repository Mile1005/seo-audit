"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations('featurePages.aiAssistant.recommendationTypes');
  const [activeCategory, setActiveCategory] = useState("technical");

  const categories = [
    {
      id: "technical",
      title: t('categories.technical.title'),
      icon: Code,
      description: t('categories.technical.description'),
      color: "blue"
    },
    {
      id: "content",
      title: t('categories.content.title'), 
      icon: FileText,
      description: t('categories.content.description'),
      color: "green"
    },
    {
      id: "strategic",
      title: t('categories.strategic.title'),
      icon: Target,
      description: t('categories.strategic.description'),
      color: "purple"
    }
  ];

  const recommendations = {
    technical: [
      {
        id: 1,
        title: t('recommendations.technical.coreWebVitals.title'),
        priority: t('recommendations.technical.coreWebVitals.priority'),
        impact: t('recommendations.technical.coreWebVitals.impact'),
        effort: t('recommendations.technical.coreWebVitals.effort'),
        timeframe: t('recommendations.technical.coreWebVitals.timeframe'),
        description: t('recommendations.technical.coreWebVitals.description'),
        actions: [
          t('recommendations.technical.coreWebVitals.actions.action1'),
          t('recommendations.technical.coreWebVitals.actions.action2'),
          t('recommendations.technical.coreWebVitals.actions.action3'),
          t('recommendations.technical.coreWebVitals.actions.action4')
        ],
        expectedImpact: t('recommendations.technical.coreWebVitals.expectedImpact'),
        codeSnippet: `// Lazy loading implementation
<img src="hero-image.webp" loading="lazy" alt="..." />

// Preload critical resources
<link rel="preload" href="critical.css" as="style" />`,
        confidence: 92
      },
      {
        id: 2,
        title: t('recommendations.technical.schemaMarkup.title'),
        priority: t('recommendations.technical.schemaMarkup.priority'),
        impact: t('recommendations.technical.schemaMarkup.impact'),
        effort: t('recommendations.technical.schemaMarkup.effort'),
        timeframe: t('recommendations.technical.schemaMarkup.timeframe'),
        description: t('recommendations.technical.schemaMarkup.description'),
        actions: [
          t('recommendations.technical.schemaMarkup.actions.action1'),
          t('recommendations.technical.schemaMarkup.actions.action2'),
          t('recommendations.technical.schemaMarkup.actions.action3'),
          t('recommendations.technical.schemaMarkup.actions.action4')
        ],
        expectedImpact: t('recommendations.technical.schemaMarkup.expectedImpact'),
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
        title: t('recommendations.content.contentGap.title'),
        priority: t('recommendations.content.contentGap.priority'),
        impact: t('recommendations.content.contentGap.impact'),
        effort: t('recommendations.content.contentGap.effort'),
        timeframe: t('recommendations.content.contentGap.timeframe'),
        description: t('recommendations.content.contentGap.description'),
        actions: [
          t('recommendations.content.contentGap.actions.action1'),
          t('recommendations.content.contentGap.actions.action2'),
          t('recommendations.content.contentGap.actions.action3'),
          t('recommendations.content.contentGap.actions.action4')
        ],
        expectedImpact: t('recommendations.content.contentGap.expectedImpact'),
        contentStrategy: t('recommendations.content.contentGap.contentStrategy'),
        confidence: 85
      },
      {
        id: 4,
        title: t('recommendations.content.contentOptimization.title'),
        priority: t('recommendations.content.contentOptimization.priority'),
        impact: t('recommendations.content.contentOptimization.impact'),
        effort: t('recommendations.content.contentOptimization.effort'),
        timeframe: t('recommendations.content.contentOptimization.timeframe'),
        description: t('recommendations.content.contentOptimization.description'),
        actions: [
          t('recommendations.content.contentOptimization.actions.action1'),
          t('recommendations.content.contentOptimization.actions.action2'),
          t('recommendations.content.contentOptimization.actions.action3'),
          t('recommendations.content.contentOptimization.actions.action4')
        ],
        expectedImpact: t('recommendations.content.contentOptimization.expectedImpact'),
        contentStrategy: t('recommendations.content.contentOptimization.contentStrategy'),
        confidence: 90
      }
    ],
    strategic: [
      {
        id: 5,
        title: t('recommendations.strategic.competitivePositioning.title'),
        priority: t('recommendations.strategic.competitivePositioning.priority'),
        impact: t('recommendations.strategic.competitivePositioning.impact'),
        effort: t('recommendations.strategic.competitivePositioning.effort'),
        timeframe: t('recommendations.strategic.competitivePositioning.timeframe'),
        description: t('recommendations.strategic.competitivePositioning.description'),
        actions: [
          t('recommendations.strategic.competitivePositioning.actions.action1'),
          t('recommendations.strategic.competitivePositioning.actions.action2'),
          t('recommendations.strategic.competitivePositioning.actions.action3'),
          t('recommendations.strategic.competitivePositioning.actions.action4')
        ],
        expectedImpact: t('recommendations.strategic.competitivePositioning.expectedImpact'),
        strategicFocus: t('recommendations.strategic.competitivePositioning.strategicFocus'),
        confidence: 78
      },
      {
        id: 6,
        title: t('recommendations.strategic.linkBuilding.title'),
        priority: t('recommendations.strategic.linkBuilding.priority'),
        impact: t('recommendations.strategic.linkBuilding.impact'), 
        effort: t('recommendations.strategic.linkBuilding.effort'),
        timeframe: t('recommendations.strategic.linkBuilding.timeframe'),
        description: t('recommendations.strategic.linkBuilding.description'),
        actions: [
          t('recommendations.strategic.linkBuilding.actions.action1'),
          t('recommendations.strategic.linkBuilding.actions.action2'),
          t('recommendations.strategic.linkBuilding.actions.action3'),
          t('recommendations.strategic.linkBuilding.actions.action4')
        ],
        expectedImpact: t('recommendations.strategic.linkBuilding.expectedImpact'),
        strategicFocus: t('recommendations.strategic.linkBuilding.strategicFocus'),
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
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
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
                        {rec.priority} {t('labels.priority')}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{rec.description}</p>
                  </div>
                  
                  <div className="text-right ml-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-foreground">
                        {rec.confidence}% {t('labels.confidence')}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-primary">{rec.expectedImpact}</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground">{t('labels.impact')}</div>
                    <div className="text-lg font-bold text-primary">{rec.impact}</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground">{t('labels.effort')}</div>
                    <div className="text-lg font-bold text-foreground">{rec.effort}</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground">{t('labels.timeline')}</div>
                    <div className="text-lg font-bold text-foreground">{rec.timeframe}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-foreground mb-3 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    {t('labels.actionItems')}
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
                      <h4 className="text-sm font-medium text-white">{t('labels.implementationExample')}</h4>
                      <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
                        {t('labels.copyCode')}
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
                      {t('labels.contentStrategy')}
                    </h5>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {(rec as any).contentStrategy}
                    </p>
                  </div>
                )}

                {(rec as any).strategicFocus && (
                  <div className="bg-purple-500/10 rounded-lg p-4 mb-4 border border-purple-500/20">
                    <h5 className="text-sm font-medium text-purple-800 dark:text-purple-400 mb-2">
                      {t('labels.strategicFocus')}
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
                    <span>{t('labels.estimatedCompletion')}: {rec.timeframe}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCTAClick('FEATURES', 'View Details', 'ai-recommendations')}
                    >
                      {t('labels.viewDetails')}
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleCTAClick('START_AUDIT', 'Implement Now', 'ai-recommendations')}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      {t('labels.implementNow')}
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
              {t('cta.title')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Lightbulb className="w-5 h-5 mr-2" />
              {t('cta.button')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
