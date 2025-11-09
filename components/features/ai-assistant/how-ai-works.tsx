"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations('featurePages.aiAssistant.howItWorks');
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: t('steps.step1.title'),
      description: t('steps.step1.description'),
      icon: Database,
      details: [
        t('steps.step1.detail1'),
        t('steps.step1.detail2'),
        t('steps.step1.detail3'),
        t('steps.step1.detail4')
      ],
      metrics: {
        dataPoints: t('steps.step1.metrics.dataPoints'),
        updateFrequency: t('steps.step1.metrics.updateFrequency'),
        accuracy: t('steps.step1.metrics.accuracy')
      }
    },
    {
      id: 1,
      title: t('steps.step2.title'),
      description: t('steps.step2.description'),
      icon: Brain,
      details: [
        t('steps.step2.detail1'),
        t('steps.step2.detail2'),
        t('steps.step2.detail3'),
        t('steps.step2.detail4')
      ],
      metrics: {
        models: t('steps.step2.metrics.models'),
        processingTime: t('steps.step2.metrics.processingTime'),
        accuracy: t('steps.step2.metrics.accuracy')
      }
    },
    {
      id: 2,
      title: t('steps.step3.title'),
      description: t('steps.step3.description'),
      icon: Target,
      details: [
        t('steps.step3.detail1'),
        t('steps.step3.detail2'),
        t('steps.step3.detail3'),
        t('steps.step3.detail4')
      ],
      metrics: {
        industries: t('steps.step3.metrics.industries'),
        customization: t('steps.step3.metrics.customization'),
        relevance: t('steps.step3.metrics.relevance')
      }
    },
    {
      id: 3,
      title: t('steps.step4.title'),
      description: t('steps.step4.description'),
      icon: Zap,
      details: [
        t('steps.step4.detail1'),
        t('steps.step4.detail2'),
        t('steps.step4.detail3'),
        t('steps.step4.detail4')
      ],
      metrics: {
        recommendations: t('steps.step4.metrics.recommendations'),
        avgImpact: t('steps.step4.metrics.avgImpact'),
        successRate: t('steps.step4.metrics.successRate')
      }
    }
  ];

  const trainingData = [
    { source: t('training.source1.name'), count: t('training.source1.count'), description: t('training.source1.description') },
    { source: t('training.source2.name'), count: t('training.source2.count'), description: t('training.source2.description') },
    { source: t('training.source3.name'), count: t('training.source3.count'), description: t('training.source3.description') },
    { source: t('training.source4.name'), count: t('training.source4.count'), description: t('training.source4.description') },
    { source: t('training.source5.name'), count: t('training.source5.count'), description: t('training.source5.description') },
    { source: t('training.source6.name'), count: t('training.source6.count'), description: t('training.source6.description') }
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
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
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
                      ? "border-primary bg-primary/10 shadow-lg" 
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
                  {steps[activeStep].title} {t('deepDive')}
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
                <h5 className="font-semibold text-foreground mb-4">{t('keyMetrics')}</h5>
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
              {t('training.title')}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('training.subtitle')}
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
            {t('cta')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
