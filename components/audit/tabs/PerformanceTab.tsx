"use client";

import React from "react";
import { Eye, TrendingUp, Zap, AlertCircle, CheckCircle } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { ScoreCircle } from "@/components/audit/ScoreCircle";
import { cn } from "@/lib/utils";
import type { PerformanceMetrics } from "@/lib/types/audit";

type VitalStatus = "good" | "warning" | "poor";

type Impact = "high" | "medium" | "low";

type DiagnosticStatus = "good" | "warning" | "error";

interface OpportunityLike {
  title?: string;
  description?: string;
  displayValue?: string;
}

interface PerformanceTabProps {
  metrics?: PerformanceMetrics | null;
  opportunities?: unknown;
  diagnostics?: unknown;
}

const thresholds = {
  lcp: [2.5, 4.0] as const,
  cls: [0.1, 0.25] as const,
  fid: [100, 300] as const,
  si: [3.4, 5.8] as const,
  tti: [3.8, 7.3] as const,
  tbt: [200, 600] as const,
  fcp: [1.8, 3.0] as const,
};

function statusFromThreshold(
  value: number,
  [good, warning]: readonly [number, number]
): VitalStatus {
  if (value <= good) return "good";
  if (value <= warning) return "warning";
  return "poor";
}

function scoreFromStatus(status: VitalStatus): number {
  if (status === "good") return 85;
  if (status === "warning") return 70;
  return 55;
}

function formatSeconds(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `${value.toFixed(1)}s`;
}

function formatMs(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `${Math.round(value)}ms`;
}

function formatCls(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return value.toFixed(3);
}

function normalizeOpportunity(input: unknown): OpportunityLike {
  if (typeof input === "string") return { title: input };
  if (input && typeof input === "object") {
    const obj = input as Record<string, unknown>;
    return {
      title: typeof obj.title === "string" ? obj.title : undefined,
      description: typeof obj.description === "string" ? obj.description : undefined,
      displayValue: typeof obj.displayValue === "string" ? obj.displayValue : undefined,
    };
  }
  return {};
}

function toArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  return [];
}

export const PerformanceTab: React.FC<PerformanceTabProps> = ({ metrics, opportunities }) => {
  const lcpStatus =
    typeof metrics?.largest_contentful_paint === "number"
      ? statusFromThreshold(metrics.largest_contentful_paint, thresholds.lcp)
      : "good";

  const fidStatus =
    typeof metrics?.max_potential_first_input_delay === "number"
      ? statusFromThreshold(metrics.max_potential_first_input_delay, thresholds.fid)
      : "good";

  const clsStatus =
    typeof metrics?.cumulative_layout_shift === "number"
      ? statusFromThreshold(metrics.cumulative_layout_shift, thresholds.cls)
      : "good";

  const speedIndexStatus =
    typeof metrics?.speed_index === "number"
      ? statusFromThreshold(metrics.speed_index, thresholds.si)
      : "good";

  const ttiStatus =
    typeof metrics?.time_to_interactive === "number"
      ? statusFromThreshold(metrics.time_to_interactive, thresholds.tti)
      : "good";

  const tbtStatus =
    typeof metrics?.total_blocking_time === "number"
      ? statusFromThreshold(metrics.total_blocking_time, thresholds.tbt)
      : "good";

  const normalizedOpportunities = toArray(opportunities)
    .map(normalizeOpportunity)
    .filter((o) => Boolean(o.title))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Core Web Vitals - Hero Section */}
      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Core Web Vitals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CoreVitalCard
            title="Largest Contentful Paint"
            value={formatSeconds(metrics?.largest_contentful_paint)}
            threshold="< 2.5s"
            status={lcpStatus}
            description="Measures loading performance"
            icon={<Eye className="w-5 h-5" />}
          />
          <CoreVitalCard
            title="First Input Delay"
            value={formatMs(metrics?.max_potential_first_input_delay)}
            threshold="< 100ms"
            status={fidStatus}
            description="Measures interactivity"
            icon={<Zap className="w-5 h-5" />}
          />
          <CoreVitalCard
            title="Cumulative Layout Shift"
            value={formatCls(metrics?.cumulative_layout_shift)}
            threshold="< 0.1"
            status={clsStatus}
            description="Measures visual stability"
            icon={<TrendingUp className="w-5 h-5" />}
          />
        </div>
      </GlassCard>

      {/* Performance Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Speed Index</p>
              <p className="text-3xl font-bold text-white">{formatSeconds(metrics?.speed_index)}</p>
              <p className={cn("text-xs mt-1", statusLabelClass(speedIndexStatus))}>
                {statusLabel(speedIndexStatus)}
              </p>
            </div>
            <ScoreCircle score={scoreFromStatus(speedIndexStatus)} size="sm" showLabel={false} />
          </div>
        </GlassCard>

        <GlassCard variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Time to Interactive</p>
              <p className="text-3xl font-bold text-white">
                {formatSeconds(metrics?.time_to_interactive)}
              </p>
              <p className={cn("text-xs mt-1", statusLabelClass(ttiStatus))}>
                {statusLabel(ttiStatus)}
              </p>
            </div>
            <ScoreCircle score={scoreFromStatus(ttiStatus)} size="sm" showLabel={false} />
          </div>
        </GlassCard>

        <GlassCard variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Blocking Time</p>
              <p className="text-3xl font-bold text-white">
                {formatMs(metrics?.total_blocking_time)}
              </p>
              <p className={cn("text-xs mt-1", statusLabelClass(tbtStatus))}>
                {statusLabel(tbtStatus)}
              </p>
            </div>
            <ScoreCircle score={scoreFromStatus(tbtStatus)} size="sm" showLabel={false} />
          </div>
        </GlassCard>
      </div>

      {/* Actionable Opportunities */}
      <GlassCard>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Optimization Opportunities</h3>
          <span className="text-sm text-gray-400">Potential savings: —</span>
        </div>
        <div className="space-y-3">
          {normalizedOpportunities.length > 0 ? (
            normalizedOpportunities.map((o, index) => {
              const impact: Impact = index === 0 ? "high" : index === 1 ? "medium" : "low";
              return (
                <OpportunityCard
                  key={`${o.title ?? "op"}-${index}`}
                  title={o.title ?? ""}
                  impact={impact}
                  savings={o.displayValue ?? "—"}
                  description={o.description ?? ""}
                  priority={index + 1}
                />
              );
            })
          ) : (
            <div className="text-sm text-gray-400">No opportunities detected for this page.</div>
          )}
        </div>
      </GlassCard>

      {/* Diagnostics - Simplified */}
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-6">Diagnostics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DiagnosticItem
            label="First Contentful Paint"
            value={formatSeconds(metrics?.first_contentful_paint)}
            status={statusToDiagnostic(
              statusFromMetric(metrics?.first_contentful_paint, thresholds.fcp)
            )}
          />
          <DiagnosticItem
            label="Speed Index"
            value={formatSeconds(metrics?.speed_index)}
            status={statusToDiagnostic(speedIndexStatus)}
          />
          <DiagnosticItem
            label="Main Thread Work (Total Blocking Time)"
            value={formatMs(metrics?.total_blocking_time)}
            status={statusToDiagnostic(tbtStatus)}
          />
          <DiagnosticItem
            label="JavaScript Execution (Time to Interactive)"
            value={formatSeconds(metrics?.time_to_interactive)}
            status={statusToDiagnostic(ttiStatus)}
          />
        </div>
      </GlassCard>
    </div>
  );
};

function statusFromMetric(
  value: number | undefined,
  threshold: readonly [number, number]
): VitalStatus {
  if (typeof value !== "number" || Number.isNaN(value)) return "good";
  return statusFromThreshold(value, threshold);
}

function statusLabel(status: VitalStatus) {
  if (status === "good") return "Good";
  if (status === "warning") return "Needs improvement";
  return "Poor";
}

function statusLabelClass(status: VitalStatus) {
  if (status === "good") return "text-emerald-400";
  if (status === "warning") return "text-amber-400";
  return "text-rose-400";
}

function statusToDiagnostic(status: VitalStatus): DiagnosticStatus {
  if (status === "good") return "good";
  if (status === "warning") return "warning";
  return "error";
}

// Supporting Components
const CoreVitalCard: React.FC<{
  title: string;
  value: string;
  threshold: string;
  status: "good" | "warning" | "poor";
  description: string;
  icon: React.ReactNode;
}> = ({ title, value, threshold, status, description, icon }) => {
  const statusColors: Record<VitalStatus, string> = {
    good: "border-emerald-500/30 bg-emerald-500/10",
    warning: "border-amber-500/30 bg-amber-500/10",
    poor: "border-rose-500/30 bg-rose-500/10",
  };

  return (
    <div className={cn("p-6 rounded-xl border-2 backdrop-blur-sm", statusColors[status])}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-white/10 rounded-lg">{icon}</div>
        <span className="text-xs text-gray-400">{threshold}</span>
      </div>
      <h4 className="text-sm font-medium text-gray-300 mb-2">{title}</h4>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
};

const OpportunityCard: React.FC<{
  title: string;
  impact: Impact;
  savings: string;
  description: string;
  priority: number;
}> = ({ title, impact, savings, description, priority }) => {
  const impactColors: Record<Impact, string> = {
    high: "text-rose-400 bg-rose-500/10",
    medium: "text-amber-400 bg-amber-500/10",
    low: "text-blue-400 bg-blue-500/10",
  };

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold text-sm">
        {priority}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h4 className="text-sm font-medium text-white">{title}</h4>
          <span className={cn("text-xs px-2 py-1 rounded-full", impactColors[impact])}>
            {impact} impact
          </span>
        </div>
        <p className="text-xs text-gray-400">{description || "—"}</p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-lg font-semibold text-emerald-400">{savings}</p>
        <p className="text-xs text-gray-500">saved</p>
      </div>
    </div>
  );
};

const DiagnosticItem: React.FC<{
  label: string;
  value: string;
  status: DiagnosticStatus;
}> = ({ label, value, status }) => {
  const statusIcons: Record<DiagnosticStatus, React.ReactNode> = {
    good: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
      <div className="flex items-center gap-3">
        {statusIcons[status]}
        <span className="text-sm text-gray-300">{label}</span>
      </div>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
};
