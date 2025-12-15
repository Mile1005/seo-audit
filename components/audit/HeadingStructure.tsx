"use client";
import { motion } from "framer-motion";
import { FileText, CheckCircle, AlertTriangle, Info, ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { ComprehensiveResults } from "../../lib/types/audit";
import { GlassCard } from "../ui/GlassCard";
import { cn } from "@/lib/utils";

interface Props {
  h: ComprehensiveResults["h_tags"];
  stats: ComprehensiveResults["stats"];
}

export const HeadingStructure = ({ h, stats }: Props) => {
  // Analyze heading structure
  const analyzeHeadings = () => {
    const issues = [];
    const recommendations = [];
    let overallStatus: "excellent" | "good" | "needs-improvement" | "poor" = "excellent";

    // H1 analysis
    if (h.h1.length === 0) {
      issues.push("No H1 tag found");
      recommendations.push("Add a descriptive H1 tag to your page");
      overallStatus = "poor";
    } else if (h.h1.length > 1) {
      issues.push(`Multiple H1 tags found (${h.h1.length})`);
      recommendations.push("Use only one H1 tag per page");
      if (overallStatus === "excellent") overallStatus = "needs-improvement";
    } else {
      const h1Text = h.h1[0];
      if (h1Text.length < 20) {
        issues.push("H1 tag is too short");
        recommendations.push("Make your H1 more descriptive (20-60 characters)");
        if (overallStatus === "excellent") overallStatus = "good";
      } else if (h1Text.length > 60) {
        issues.push("H1 tag is too long");
        recommendations.push("Keep your H1 concise (under 60 characters)");
        if (overallStatus === "excellent") overallStatus = "good";
      }
    }

    // H2 analysis
    if (h.h2.length === 0) {
      issues.push("No H2 tags found");
      recommendations.push("Add H2 tags to structure your content");
      if (overallStatus === "excellent") overallStatus = "needs-improvement";
    } else if (h.h2.length > 6) {
      recommendations.push("Consider if all H2 tags are necessary for content structure");
    }

    // Heading hierarchy check
    if (h.h1.length > 0 && h.h2.length === 0 && h.h3.length > 0) {
      issues.push("Heading hierarchy skip detected (H1 → H3)");
      recommendations.push("Use H2 tags before jumping to H3");
      if (overallStatus === "excellent") overallStatus = "needs-improvement";
    }

    // Content analysis
    if (stats.word_count < 300) {
      issues.push("Low content word count");
      recommendations.push("Add more valuable content (aim for 300+ words)");
      if (overallStatus === "excellent") overallStatus = "needs-improvement";
    }

    if (stats.reading_time_min < 1) {
      recommendations.push("Consider adding more detailed information for better SEO");
    }

    return { issues, recommendations, overallStatus };
  };

  const analysis = analyzeHeadings();

  const getStatusText = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-emerald-300";
      case "good":
        return "text-sky-300";
      case "needs-improvement":
        return "text-amber-300";
      case "poor":
        return "text-rose-300";
      default:
        return "text-white/60";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
      case "good":
        return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case "needs-improvement":
        return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case "poor":
        return <AlertTriangle className="h-4 w-4 text-rose-400" />;
      default:
        return <Info className="h-4 w-4 text-white/60" />;
    }
  };

  return (
    <GlassCard hover>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/8">
            <FileText className="h-5 w-5 text-sky-300" />
          </span>
          <div>
            <div className="text-lg font-semibold text-white">Heading Structure Analysis</div>
            <div className="text-sm text-white/60">Hierarchy, readability, and SEO signals</div>
          </div>
        </div>

        <Badge className={cn("bg-white/8 border-white/10", getStatusText(analysis.overallStatus))}>
          {analysis.overallStatus.replace("-", " ").toUpperCase()}
        </Badge>
      </div>

      <div className="mt-6 space-y-6">
        {/* Status Overview */}
        <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
          {getStatusIcon(analysis.overallStatus)}
          <div className="flex-1">
            <h4 className="font-semibold text-white">
              {analysis.overallStatus === "excellent" && "Excellent heading structure! "}
              {analysis.overallStatus === "good" &&
                "Good heading structure with minor improvements possible"}
              {analysis.overallStatus === "needs-improvement" &&
                "Heading structure needs some improvements"}
              {analysis.overallStatus === "poor" &&
                "Heading structure requires significant improvements"}
            </h4>
            <p className="text-sm text-white/60 mt-1">
              {analysis.overallStatus === "excellent" &&
                "Your heading structure follows SEO best practices."}
              {analysis.overallStatus === "good" &&
                "Small adjustments could make your structure even better."}
              {analysis.overallStatus === "needs-improvement" &&
                "Some changes are needed for better SEO."}
              {analysis.overallStatus === "poor" &&
                "Critical issues need to be addressed immediately."}
            </p>
          </div>
        </div>

        {/* Heading Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: h.h1.length, label: "H1 Tags", showCheck: h.h1.length === 1 },
            { value: h.h2.length, label: "H2 Tags", showCheck: false },
            { value: h.h3.length, label: "H3 Tags", showCheck: false },
            { value: stats.word_count.toLocaleString(), label: "Words", showCheck: false },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-300 cursor-pointer"
            >
              <motion.div
                className="text-2xl font-bold text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-white/60 font-medium">
                {stat.label}
              </div>
              {stat.showCheck && <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto mt-1" />}
            </motion.div>
          ))}
        </div>

        {/* Content Metrics */}
        <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
          <h4 className="font-semibold text-white">Content Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60 font-medium">Reading Time:</span>
              <span className="font-medium text-white">
                {stats.reading_time_min} min
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60 font-medium">Content Depth:</span>
              <Badge
                variant="outline"
                className={
                  cn(
                    "border-white/15",
                    stats.word_count >= 1000
                      ? "text-emerald-300"
                      : stats.word_count >= 500
                        ? "text-sky-300"
                        : "text-amber-300"
                  )
                }
              >
                {stats.word_count >= 1000
                  ? "Comprehensive"
                  : stats.word_count >= 500
                    ? "Moderate"
                    : "Brief"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Issues Found */}
        {analysis.issues.length > 0 && (
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-400" />
              Issues Found ({analysis.issues.length})
            </h4>
            <ul className="space-y-2">
              {analysis.issues.map((issue, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <ChevronRight className="h-3 w-3 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {analysis.recommendations.length > 0 && (
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-sky-300" />
              Recommendations ({analysis.recommendations.length})
            </h4>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <ChevronRight className="h-3 w-3 text-sky-300 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Enhanced Heading Preview with Full Hierarchy */}
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-5 h-5 bg-white/10 border border-white/10 rounded text-white/80 text-xs flex items-center justify-center">
              📋
            </div>
            Current Page Structure ({h.h1.length + h.h2.length + h.h3.length} headings)
          </h4>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {/* H1 Headings */}
            {h.h1.map((heading, index) => (
              <motion.div
                key={`h1-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/8 transition-all cursor-pointer"
              >
                <Badge className="bg-white/10 text-white/80 border-white/10 font-bold">H1</Badge>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-white">{heading}</span>
                  <div className="text-xs text-white/55 mt-1 font-medium">
                    Primary page title • {heading.length} characters
                  </div>
                </div>
              </motion.div>
            ))}

            {/* H2 Headings */}
            {h.h2.map((heading, index) => (
              <motion.div
                key={`h2-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (h.h1.length + index) * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-white/5 ml-4 hover:bg-white/8 transition-all cursor-pointer"
              >
                <Badge className="bg-white/10 text-white/80 border-white/10 font-bold">H2</Badge>
                <div className="flex-1">
                  <span className="text-sm text-white">{heading}</span>
                  <div className="text-xs text-white/55 mt-1 font-medium">
                    Section heading • {heading.length} characters
                  </div>
                </div>
              </motion.div>
            ))}

            {/* H3 Headings (show first 5) */}
            {h.h3.slice(0, 5).map((heading, index) => (
              <motion.div
                key={`h3-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (h.h1.length + h.h2.length + index) * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-white/5 ml-8 hover:bg-white/8 transition-all cursor-pointer"
              >
                <Badge className="bg-white/10 text-white/80 border-white/10 font-bold">H3</Badge>
                <div className="flex-1">
                  <span className="text-sm text-white">{heading}</span>
                  <div className="text-xs text-white/55 mt-1 font-medium">
                    Subsection • {heading.length} characters
                  </div>
                </div>
              </motion.div>
            ))}

            {h.h3.length > 5 && (
              <div className="text-xs text-white/60 ml-12 p-2 bg-white/5 border border-white/10 rounded font-medium">
                📄 ... and {h.h3.length - 5} more H3 headings
              </div>
            )}

            {h.h1.length === 0 && h.h2.length === 0 && h.h3.length === 0 && (
              <div className="text-center p-6 text-white/60">
                <div className="text-2xl mb-2">📄</div>
                <p className="text-sm font-medium">No headings found</p>
                <p className="text-xs">Add H1, H2, and H3 tags to structure your content</p>
              </div>
            )}
          </div>

          {/* SEO Impact Analysis */}
          <div className="mt-4 p-3 rounded-lg border border-white/10 bg-white/5">
            <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              🎯 SEO Impact Analysis
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-medium text-white/75">
                  Search Engine Understanding:
                </span>
                <p className="text-white/60">
                  {analysis.overallStatus === "excellent"
                    ? "Search engines can easily understand your content structure"
                    : analysis.overallStatus === "good"
                      ? "Generally clear structure with minor improvements possible"
                      : analysis.overallStatus === "needs-improvement"
                        ? "Some structural issues may confuse search engines"
                        : "Poor structure significantly impacts SEO performance"}
                </p>
              </div>
              <div>
                <span className="font-medium text-white/75">
                  User Experience:
                </span>
                <p className="text-white/60">
                  {analysis.overallStatus === "excellent"
                    ? "Excellent readability and content organization"
                    : analysis.overallStatus === "good"
                      ? "Good structure supports easy content scanning"
                      : analysis.overallStatus === "needs-improvement"
                        ? "Structure improvements would enhance readability"
                        : "Poor structure hurts user experience and engagement"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
