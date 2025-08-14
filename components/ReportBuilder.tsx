"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AuditResult } from "../lib/heuristics";

interface ReportBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  result: AuditResult;
}

interface ReportSection {
  id: string;
  title: string;
  enabled: boolean;
}

interface BrandingOptions {
  companyName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function ReportBuilder({ isOpen, onClose, result }: ReportBuilderProps) {
  const [sections, setSections] = useState<ReportSection[]>([
    { id: "summary", title: "Executive Summary", enabled: true },
    { id: "technical", title: "Technical SEO", enabled: true },
    { id: "content", title: "Content Analysis", enabled: true },
    { id: "competitors", title: "Competitor Analysis", enabled: true },
    { id: "performance", title: "Performance Metrics", enabled: true },
  ]);

  const [branding, setBranding] = useState<BrandingOptions>({
    companyName: "SEO Audit Pro",
    logo: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#1E40AF",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
  };

  const generateReport = () => {
    setIsGenerating(true);
    // Small delay to show loading state
    setTimeout(() => {
      setIsGenerating(false);
      if (reportRef.current) {
        window.print();
      }
    }, 1000);
  };

  const exportPDF = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      if (reportRef.current) {
        window.print();
      }
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">SEO Report Builder</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex h-[calc(90vh-120px)]">
            {/* Sidebar */}
            <div className="w-80 border-r bg-gray-50 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Sections */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Report Sections</h3>
                  <div className="space-y-3">
                    {sections.map((section) => (
                      <label key={section.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={section.enabled}
                          onChange={() => toggleSection(section.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-sm text-gray-700">{section.title}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Branding */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Branding</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={branding.companyName}
                        onChange={(e) =>
                          setBranding((prev) => ({ ...prev, companyName: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Logo URL (optional)
                      </label>
                      <input
                        type="url"
                        value={branding.logo}
                        onChange={(e) => setBranding((prev) => ({ ...prev, logo: e.target.value }))}
                        placeholder="https://example.com/logo.png"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Primary Color
                        </label>
                        <input
                          type="color"
                          value={branding.primaryColor}
                          onChange={(e) =>
                            setBranding((prev) => ({ ...prev, primaryColor: e.target.value }))
                          }
                          className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Secondary Color
                        </label>
                        <input
                          type="color"
                          value={branding.secondaryColor}
                          onChange={(e) =>
                            setBranding((prev) => ({ ...prev, secondaryColor: e.target.value }))
                          }
                          className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={generateReport}
                    disabled={isGenerating}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isGenerating ? "Generating..." : "Generate Report"}
                  </button>
                  <button
                    onClick={exportPDF}
                    disabled={isGenerating}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isGenerating ? "Preparing..." : "Export PDF"}
                  </button>
                </div>
              </div>
            </div>

            {/* Report Preview */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="bg-white border rounded-lg">
                <div ref={reportRef} className="p-8 print:p-0">
                  <ReportContent
                    result={result}
                    sections={sections.filter((s) => s.enabled)}
                    branding={branding}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportContent({
  result,
  sections,
  branding,
}: {
  result: AuditResult;
  sections: ReportSection[];
  branding: BrandingOptions;
}) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="max-w-4xl mx-auto"
      style={
        {
          "--primary-color": branding.primaryColor,
          "--secondary-color": branding.secondaryColor,
        } as any
      }
    >
      {/* Header */}
      <div
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: branding.primaryColor }}
      >
        {branding.logo && (
          <Image
            src={branding.logo}
            alt={`${branding.companyName} Logo`}
            width={64}
            height={64}
            className="h-16 mx-auto mb-4"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Audit Report</h1>
        <p className="text-lg text-gray-600 mb-2">{branding.companyName}</p>
        <p className="text-sm text-gray-500">Generated on {formatDate(new Date().toISOString())}</p>
      </div>

      {/* URL Info */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Audited URL</h2>
        <p className="text-blue-600 break-all">{result.url}</p>
      </div>

      {/* Sections */}
      {sections.map((section) => {
        switch (section.id) {
          case "summary":
            return <ExecutiveSummary key={section.id} result={result} branding={branding} />;
          case "technical":
            return <TechnicalSEO key={section.id} result={result} branding={branding} />;
          case "content":
            return <ContentAnalysis key={section.id} result={result} branding={branding} />;
          case "competitors":
            return <CompetitorAnalysis key={section.id} result={result} branding={branding} />;
          case "performance":
            return <PerformanceMetrics key={section.id} result={result} branding={branding} />;
          default:
            return null;
        }
      })}

      {/* Footer */}
      <div className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
        <p>Report generated by {branding.companyName}</p>
        <p>For questions or support, please contact our team.</p>
      </div>
    </div>
  );
}

function ExecutiveSummary({
  result,
  branding,
}: {
  result: AuditResult;
  branding: BrandingOptions;
}) {
  const overallScore = result.scores.overall;
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  return (
    <section className="mb-8">
      <h2
        className="text-2xl font-bold text-gray-900 mb-6"
        style={{ color: branding.primaryColor }}
      >
        Executive Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="text-center p-6 border rounded-lg">
          <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}/100
          </div>
          <div className="text-lg font-medium text-gray-700 mt-2">
            {getScoreLabel(overallScore)}
          </div>
          <div className="text-sm text-gray-500 mt-1">Overall SEO Score</div>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Key Findings</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• {result.issues.length} issues identified</li>
            <li>• {result.quick_wins.length} quick wins available</li>
            <li>• {result.stats.images_count} images analyzed</li>
            <li>• {result.detected.internal_links.length} links found</li>
          </ul>
        </div>
      </div>

      <div
        className="bg-blue-50 p-4 rounded-lg border-l-4"
        style={{ borderLeftColor: branding.primaryColor }}
      >
        <h3 className="font-semibold text-gray-900 mb-2">Recommendations</h3>
        <p className="text-gray-700 text-sm">
          Focus on implementing the quick wins first, then address the critical issues. The page
          shows good potential with proper optimization.
        </p>
      </div>
    </section>
  );
}

function TechnicalSEO({ result, branding }: { result: AuditResult; branding: BrandingOptions }) {
  return (
    <section className="mb-8">
      <h2
        className="text-2xl font-bold text-gray-900 mb-6"
        style={{ color: branding.primaryColor }}
      >
        Technical SEO Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{result.scores.title_meta}/100</div>
          <div className="text-sm text-gray-600">Title & Meta</div>
        </div>
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{result.scores.structure}/100</div>
          <div className="text-sm text-gray-600">Structure</div>
        </div>
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{result.scores.schema}/100</div>
          <div className="text-sm text-gray-600">Schema</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Technical Issues</h3>
        {result.issues
          .filter((issue) => ["technical", "critical"].includes(issue.severity))
          .slice(0, 5)
          .map((issue, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{issue.found}</h4>
                  <p className="text-sm text-gray-600 mt-1">{issue.why_it_matters}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    issue.severity === "high"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {issue.severity}
                </span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

function ContentAnalysis({ result, branding }: { result: AuditResult; branding: BrandingOptions }) {
  return (
    <section className="mb-8">
      <h2
        className="text-2xl font-bold text-gray-900 mb-6"
        style={{ color: branding.primaryColor }}
      >
        Content Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Scores</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Headings</span>
              <span className="font-medium">{result.scores.headings}/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Content Quality</span>
              <span className="font-medium">{result.scores.answerability}/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Images</span>
              <span className="font-medium">{result.scores.images}/100</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Stats</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div>Word Count: {result.stats.word_count}</div>
            <div>H1 Tags: {result.detected.h1 ? 1 : 0}</div>
            <div>H2 Tags: {result.stats.h2_count}</div>
            <div>Images: {result.stats.images_count}</div>
            <div>Internal Links: {result.detected.internal_links.length}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompetitorAnalysis({
  result,
  branding,
}: {
  result: AuditResult;
  branding: BrandingOptions;
}) {
  return (
    <section className="mb-8">
      <h2
        className="text-2xl font-bold text-gray-900 mb-6"
        style={{ color: branding.primaryColor }}
      >
        Competitor Analysis
      </h2>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-700 text-sm">
          Competitor analysis data would be displayed here if available. This section shows how your
          content compares to competitors in search results.
        </p>
      </div>
    </section>
  );
}

function PerformanceMetrics({
  result,
  branding,
}: {
  result: AuditResult;
  branding: BrandingOptions;
}) {
  return (
    <section className="mb-8">
      <h2
        className="text-2xl font-bold text-gray-900 mb-6"
        style={{ color: branding.primaryColor }}
      >
        Performance Metrics
      </h2>

      {result.performance ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {result.performance.lcp ? `${result.performance.lcp}ms` : "N/A"}
            </div>
            <div className="text-sm text-gray-600">Largest Contentful Paint</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {result.performance.cls ? result.performance.cls.toFixed(3) : "N/A"}
            </div>
            <div className="text-sm text-gray-600">Cumulative Layout Shift</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {result.performance.inp ? `${result.performance.inp}ms` : "N/A"}
            </div>
            <div className="text-sm text-gray-600">Interaction to Next Paint</div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 text-sm">
            Performance data not available. Enable PageSpeed Insights integration to view Core Web
            Vitals.
          </p>
        </div>
      )}
    </section>
  );
}
