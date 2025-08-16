"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AuditResult } from "../../lib/heuristics";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Modal from "./Modal";

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

  const exportPDF = async () => {
    setIsGenerating(true);
    if (reportRef.current) {
      const input = reportRef.current;
      try {
        const canvas = await html2canvas(input, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pageWidth;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`seo-audit-report-${new Date().toISOString().split("T")[0]}.pdf`);
      } catch (err) {
        alert("Failed to generate PDF. Please try again.");
      }
    }
    setIsGenerating(false);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 z-20 text-gray-400 hover:text-gray-600 text-3xl font-bold bg-white/80 rounded-full p-2 shadow-lg md:top-4 md:right-4"
        aria-label="Close report preview"
        style={{ position: 'sticky', top: 0 }}
      >
        ×
      </button>
      {/* Report Preview */}
      <div className="relative flex flex-col items-center justify-center w-full h-full min-h-[40vh] max-h-[90vh] p-2 md:p-8 overflow-y-auto">
        <div ref={reportRef} className="w-full max-w-md md:max-w-2xl mx-auto bg-white border rounded-2xl shadow-lg p-4 md:p-8 print:p-0 overflow-y-auto max-h-[70vh] md:max-h-[75vh]">
          <ReportContent
            result={result}
            sections={sections.filter((s) => s.enabled)}
            branding={branding}
          />
        </div>
        {/* Floating Export Button */}
        <button
          onClick={exportPDF}
          disabled={isGenerating}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-8 md:right-8 md:left-auto md:translate-x-0 z-30 px-6 py-3 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-lg font-bold shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary"
          style={{ boxShadow: "0 4px 24px 0 rgba(0, 212, 255, 0.25)" }}
        >
          {isGenerating ? "Generating PDF..." : (
            <span className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Download PDF
            </span>
          )}
        </button>
      </div>
    </Modal>
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
          "--primary-color": "#3B82F6", // Default primary color
          "--secondary-color": "#1E40AF", // Default secondary color
        } as any
      }
    >
      {/* Header */}
      <div
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: "#3B82F6" }} // Default primary color
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
        style={{ color: "#3B82F6" }} // Default primary color
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
        style={{ borderLeftColor: "#3B82F6" }} // Default primary color
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
        style={{ color: "#3B82F6" }} // Default primary color
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
        style={{ color: "#3B82F6" }} // Default primary color
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
        style={{ color: "#3B82F6" }} // Default primary color
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
        style={{ color: "#3B82F6" }} // Default primary color
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
