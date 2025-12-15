"use client";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { AuditResultUnified } from "@/lib/types/audit";
import { GlassCard } from "../ui/GlassCard";
import { cn } from "@/lib/utils";
import {
  Code,
  ListOrdered,
  Table,
  Link as LinkIcon,
  BarChart3,
  Clock,
  FileText,
  Zap,
} from "lucide-react";

interface StructuredDataPanelProps {
  result: AuditResultUnified;
}

function coverageStatus(value: number): "good" | "warning" | "poor" {
  if (!Number.isFinite(value)) return "poor";
  if (value >= 90) return "good";
  if (value >= 70) return "warning";
  return "poor";
}

function statusTextClass(status: "good" | "warning" | "poor") {
  if (status === "good") return "text-emerald-300";
  if (status === "warning") return "text-amber-300";
  return "text-rose-300";
}

export function StructuredDataPanel({ result }: StructuredDataPanelProps) {
  const stats = result.comprehensiveResults.stats;
  const jsonTypes = result.comprehensiveResults.json_ld_types || [];
  const internal = stats.internal_links;
  const external = stats.external_links;
  const linkTotal = internal + external;
  const internalRatio = linkTotal ? ((internal / linkTotal) * 100).toFixed(1) : "0";
  const imagesWithAlt = stats.images_count - (result.pageData.imagesWithoutAlt || 0);
  const altCoverage = stats.images_count
    ? ((imagesWithAlt / stats.images_count) * 100).toFixed(1)
    : "0";

  const altStatus = coverageStatus(parseFloat(altCoverage));

  return (
    <GlassCard hover>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/8">
              <Code className="h-5 w-5 text-emerald-300" />
            </span>
            <div>
              <div className="text-xl font-semibold text-white">Structured & Content Analysis</div>
              <div className="text-sm text-white/60">
                Schema markup, link distribution, media accessibility & content structure.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-300 cursor-pointer"
          >
            <h4 className="text-base font-semibold mb-3 flex items-center gap-2 text-white">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <LinkIcon className="h-5 w-5 text-sky-300" />
              </motion.div>
              Link Distribution
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/60 font-medium">Internal:</span>
                <span className="text-xl font-bold text-white">{internal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-medium">External:</span>
                <span className="text-xl font-bold text-white">{external}</span>
              </div>
              <div className="p-2 rounded border border-white/10 bg-white/8 text-center">
                <div className="text-sm text-white/70 font-medium">{internalRatio}% internal ratio</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-300 cursor-pointer"
          >
            <h4 className="text-base font-semibold mb-3 flex items-center gap-2 text-white">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Table className="h-5 w-5 text-violet-300" />
              </motion.div>
              Content Structure
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/60 font-medium">Tables:</span>
                <span className="text-xl font-bold text-white">{stats.tables_count ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-medium">Lists:</span>
                <span className="text-xl font-bold text-white">{stats.lists_count ?? 0}</span>
              </div>
              <div className="p-2 rounded border border-white/10 bg-white/8 text-center">
                <div className="text-sm text-white/70 font-medium">
                  {stats.word_count.toLocaleString()} words
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-300 cursor-pointer"
          >
            <h4 className="text-base font-semibold mb-3 flex items-center gap-2 text-white">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <ListOrdered className="h-5 w-5 text-emerald-300" />
              </motion.div>
              Image Accessibility
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/60 font-medium">With Alt:</span>
                <span className="text-xl font-bold text-white">{imagesWithAlt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-medium">Total:</span>
                <span className="text-xl font-bold text-white">{stats.images_count}</span>
              </div>
              <div className="p-2 rounded border border-white/10 bg-white/8 text-center">
                <div className={cn("text-sm font-medium", statusTextClass(altStatus))}>
                  {altCoverage}% coverage
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <h4 className="text-base font-semibold mb-4 flex items-center gap-2 text-white">
            <Code className="h-5 w-5 text-emerald-300" />
            JSON-LD Schema Types ({jsonTypes.length})
          </h4>
          {jsonTypes.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {jsonTypes.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Badge className="bg-white/8 text-white/80 border-white/10 cursor-pointer">
                    {t}
                  </Badge>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-3 rounded-lg border border-white/10 bg-white/5">
              <p className="text-sm text-white/65 font-medium">
                No JSON-LD structured data detected — consider adding schema markup.
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-sky-300" />
            </div>
            <div className="text-base font-semibold text-white">Reading Time</div>
            <div className="text-xl font-bold text-white">{stats.reading_time_min || 0} min</div>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-5 w-5 text-emerald-300" />
            </div>
            <div className="text-base font-semibold text-white">Word Count</div>
            <div className="text-xl font-bold text-white">{stats.word_count.toLocaleString()}</div>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="h-5 w-5 text-violet-300" />
            </div>
            <div className="text-base font-semibold text-white">Text Ratio</div>
            <div className="text-xl font-bold text-white">{(stats.text_rate * 100).toFixed(1)}%</div>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-5 w-5 text-amber-300" />
            </div>
            <div className="text-base font-semibold text-white">Scripts</div>
            <div className="text-xl font-bold text-white">{stats.scripts_count}</div>
          </div>
        </div>

      </div>
    </GlassCard>
  );
}
