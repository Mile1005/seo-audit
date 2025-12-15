"use client";
import React, { useEffect, useMemo, useState } from "react";

import { GlassCard } from "../ui/GlassCard";
import { ScoreCircle } from "./ScoreCircle";
import { cn } from "@/lib/utils";
import { Zap, Monitor, Layers, Clock, Users, BarChart3, MousePointerClick } from "lucide-react";
import type { PerformanceMetrics } from "../../lib/types/audit";

interface Props {
  metrics: PerformanceMetrics;
}

type VitalStatus = "good" | "warning" | "poor";

const thresholds = {
  fcp: [1.8, 3.0] as const,
  lcp: [2.5, 4.0] as const,
  cls: [0.1, 0.25] as const,
  tbt: [200, 600] as const,
  si: [3.4, 5.8] as const,
  tti: [3.8, 7.3] as const,
  fid: [100, 300] as const,
} as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function statusFromThreshold(value: number, [good, warning]: readonly [number, number]): VitalStatus {
  if (value <= good) return "good";
  if (value <= warning) return "warning";
  return "poor";
}

function scoreFromLowerIsBetter(value: number, [good, warning]: readonly [number, number]) {
  if (!Number.isFinite(value)) return 0;
  if (value <= good) {
    // Reward being under the good threshold without making everything 100.
    const ratio = clamp(value / good, 0, 1);
    return Math.round(90 + (1 - ratio) * 10);
  }
  if (value <= warning) {
    const t = (value - good) / (warning - good);
    return Math.round(90 - t * 25); // 90 → 65
  }
  const worst = warning * 2;
  const t = (value - warning) / Math.max(1e-6, worst - warning);
  return Math.round(clamp(65 - t * 65, 0, 65));
}

function ringStroke(status: VitalStatus) {
  if (status === "good") return "stroke-emerald-400";
  if (status === "warning") return "stroke-amber-400";
  return "stroke-rose-400";
}

function statusLabel(status: VitalStatus) {
  if (status === "good") return "Good";
  if (status === "warning") return "Needs improvement";
  return "Poor";
}

function formatSeconds(value: number) {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(1)}s`;
}

function formatMs(value: number) {
  if (!Number.isFinite(value)) return "—";
  return `${Math.round(value)}ms`;
}

function formatCls(value: number) {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(3);
}

interface MetricDef {
  key: string;
  label: string;
  icon: React.ReactNode;
  value: number;
  display: string;
  threshold?: readonly [number, number];
  hint: string;
}

function useRingMountAnimation(enabled: boolean) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, [enabled]);
  return mounted;
}

const Ring: React.FC<{ score: number; status: VitalStatus; value: string; animated?: boolean }> = ({
  score,
  status,
  value,
  animated = true,
}) => {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const normalized = useMemo(() => clamp(score, 0, 100), [score]);
  const dashOffset = circumference - (normalized / 100) * circumference;

  const mounted = useRingMountAnimation(animated);
  const resolved = animated ? (mounted ? dashOffset : circumference) : dashOffset;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full -rotate-90" aria-hidden="true">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          className="stroke-white/10"
          strokeWidth={5}
          fill="none"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          className={cn(ringStroke(status), "transition-all duration-1000")}
          strokeWidth={5}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={resolved}
          strokeLinecap="round"
          style={{ transition: animated ? "stroke-dashoffset 1s ease-in-out" : "none" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-white">{value}</span>
      </div>
    </div>
  );
};

export const CoreWebVitalsGrid = ({ metrics }: Props) => {
  const metricDefs: MetricDef[] = useMemo(
    () => [
      {
        key: "fcp",
        label: "First Contentful Paint",
        icon: <Zap className="h-4 w-4 text-sky-300" />,
        value: metrics.first_contentful_paint,
        display: formatSeconds(metrics.first_contentful_paint),
        threshold: thresholds.fcp,
        hint: "Fast first paint improves perceived speed.",
      },
      {
        key: "lcp",
        label: "Largest Contentful Paint",
        icon: <Monitor className="h-4 w-4 text-sky-300" />,
        value: metrics.largest_contentful_paint,
        display: formatSeconds(metrics.largest_contentful_paint),
        threshold: thresholds.lcp,
        hint: "Main content should load quickly.",
      },
      {
        key: "cls",
        label: "Cumulative Layout Shift",
        icon: <Layers className="h-4 w-4 text-sky-300" />,
        value: metrics.cumulative_layout_shift,
        display: formatCls(metrics.cumulative_layout_shift),
        threshold: thresholds.cls,
        hint: "Unexpected layout shifts reduce usability.",
      },
      {
        key: "tbt",
        label: "Total Blocking Time",
        icon: <Clock className="h-4 w-4 text-sky-300" />,
        value: metrics.total_blocking_time,
        display: formatMs(metrics.total_blocking_time),
        threshold: thresholds.tbt,
        hint: "Long main-thread tasks block interactions.",
      },
      {
        key: "tti",
        label: "Time to Interactive",
        icon: <Users className="h-4 w-4 text-sky-300" />,
        value: metrics.time_to_interactive,
        display: formatSeconds(metrics.time_to_interactive),
        threshold: thresholds.tti,
        hint: "When the page becomes reliably interactive.",
      },
      {
        key: "si",
        label: "Speed Index",
        icon: <BarChart3 className="h-4 w-4 text-sky-300" />,
        value: metrics.speed_index,
        display: formatSeconds(metrics.speed_index),
        threshold: thresholds.si,
        hint: "How quickly content is visually displayed.",
      },
      {
        key: "fid",
        label: "Max Potential FID",
        icon: <MousePointerClick className="h-4 w-4 text-sky-300" />,
        value: metrics.max_potential_first_input_delay,
        display: formatMs(metrics.max_potential_first_input_delay),
        threshold: thresholds.fid,
        hint: "A proxy for input responsiveness under load.",
      },
    ],
    [metrics]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <GlassCard className="lg:col-span-4" hover>
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="text-sm font-medium text-white/60">Lighthouse performance</div>
            <div className="text-xl font-semibold text-white">Overall score</div>
            <div className="text-sm text-white/55">
              Lab metrics from the audit run (not field data).
            </div>
          </div>
          <ScoreCircle score={metrics.performance_score} size="lg" label="Score" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/60">FCP</div>
            <div className="text-sm font-semibold text-white">{formatSeconds(metrics.first_contentful_paint)}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/60">LCP</div>
            <div className="text-sm font-semibold text-white">
              {formatSeconds(metrics.largest_contentful_paint)}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/60">CLS</div>
            <div className="text-sm font-semibold text-white">{formatCls(metrics.cumulative_layout_shift)}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/60">TBT</div>
            <div className="text-sm font-semibold text-white">{formatMs(metrics.total_blocking_time)}</div>
          </div>
        </div>
      </GlassCard>

      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {metricDefs.map((m) => {
          const threshold = m.threshold;
          const status = threshold ? statusFromThreshold(m.value, threshold) : "good";
          const score = threshold ? scoreFromLowerIsBetter(m.value, threshold) : 0;

          return (
            <GlassCard key={m.key} variant="interactive" className="p-5" hover>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 border border-white/10">
                      {m.icon}
                    </span>
                    <div className="text-sm font-semibold text-white">{m.label}</div>
                  </div>
                  <div className="text-xs text-white/55">{m.hint}</div>
                </div>
                <Ring score={score} status={status} value={m.display} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-white/55">Status</div>
                <div className="text-xs font-medium text-white/70">{statusLabel(status)}</div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
