"use client";

import dynamic from 'next/dynamic'
import { StructuredData, generateFeatureSchema, generateFAQSchema } from '../../../components/seo/StructuredData'

// Simple wrapper to prevent lambda tracing issues while preserving your original design
const SEOAuditContent = dynamic(() => import('./seo-audit-original'), {
  loading: () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-white mb-4">Loading SEO Audit Tool</h2>
        <p className="text-gray-300">Preparing your advanced SEO analysis tool...</p>
      </div>
    </div>
  )
})

export default function SEOAuditPage() {
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
      question: "How long does an SEO audit take?",
      answer: "Our AI-powered SEO audit typically completes in 2-5 minutes, analyzing 100+ SEO factors across your website including technical issues, on-page optimization, and performance metrics."
    },
    {
      question: "What does the SEO audit check?",
      answer: "The audit checks technical SEO (crawlability, indexing, site structure), on-page optimization (titles, meta descriptions, headings), content quality, mobile-friendliness, page speed, security, and more."
    },
    {
      question: "Can I audit multiple pages at once?",
      answer: "Yes! Professional and Enterprise plans allow you to audit multiple pages simultaneously and track performance over time."
    },
    {
      question: "Do I need technical knowledge to use the audit tool?",
      answer: "No! Our AI provides clear, actionable recommendations in plain language. Each issue includes an explanation and step-by-step instructions to fix it."
    },
    {
      question: "How accurate are the audit results?",
      answer: "Our AI is trained on millions of websites and updated with the latest SEO best practices. Audit accuracy is 95%+ and results are validated against Google's official guidelines."
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