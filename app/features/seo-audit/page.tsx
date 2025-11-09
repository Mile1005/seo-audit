"use client";

import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { StructuredData, generateFeatureSchema, generateFAQSchema } from '../../../components/seo/StructuredData'

// Simple wrapper to prevent lambda tracing issues while preserving your original design
const SEOAuditContent = dynamic(() => import('./seo-audit-original'), {
  loading: () => {
    const t = useTranslations('featurePages.seoAudit.loading');
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-gray-300">{t('desc')}</p>
        </div>
      </div>
    );
  }
})

export default function SEOAuditPage() {
  const t = useTranslations('featurePages.seoAudit.faq');
  
  const featureSchema = generateFeatureSchema({
    name: "AI-Powered SEO Audit Tool",
    description: "Comprehensive SEO audit tool that analyzes your website for technical issues, on-page optimization, performance, and provides actionable recommendations to improve search rankings.",
    url: "https://www.aiseoturbo.com/features/seo-audit",
    features: [
      "100+ Technical SEO Checks",
      "On-Page SEO Analysis",
      "Core Web Vitals Monitoring",
      "Mobile-Friendliness Testing",
      "Broken Link Detection",
      "Meta Tags Optimization",
      "Content Quality Analysis",
      "Structured Data Validation",
      "Page Speed Analysis",
      "Security Audit"
    ],
    category: "SEO Audit"
  });

  const faqSchema = generateFAQSchema([
    {
      question: t('q1'),
      answer: t('a1')
    },
    {
      question: t('q2'),
      answer: t('a2')
    },
    {
      question: t('q3'),
      answer: t('a3')
    },
    {
      question: t('q4'),
      answer: t('a4')
    },
    {
      question: t('q5'),
      answer: t('a5')
    }
  ]);

  return (
    <>
      <StructuredData data={featureSchema} />
      <StructuredData data={faqSchema} />
      <SEOAuditContent />
    </>
  );
}