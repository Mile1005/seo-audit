"use client";
import { AuditResultUnified } from "../../lib/types/audit";
import { GlassCard } from "../ui/GlassCard";
import { ScoreCircle } from "./ScoreCircle";
import { Button } from "../ui/button";
import { Accessibility, ShieldAlert, ShieldCheck } from "lucide-react";

interface Props {
  result: AuditResultUnified;
}

function scoreLabel(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Strong";
  if (score >= 50) return "Fair";
  return "Needs work";
}

export const ScoreSummary = ({ result }: Props) => {
  const s = result.comprehensiveResults.scores;
  const highSeverityIssues =
    result.comprehensiveResults.issues?.filter((i) => i.severity === "high").length || 0;
  const failedSeoChecks = result.comprehensiveResults.seo_checks?.failed_checks?.length || 0;
  const passedA11yChecks = result.comprehensiveResults.accessibility?.passed_checks?.length || 0;

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <GlassCard className="p-6 sm:p-8" variant="elevated">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2">
              <span className="truncate">SEO Audit</span>
              <span className="text-sm font-medium text-white/60">({scoreLabel(result.score)})</span>
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs sm:text-sm">
              <p className="text-white/60 truncate max-w-[200px] sm:max-w-none">
                {result.url}
              </p>
              <span className="text-xs text-white/30 hidden sm:inline">•</span>
              <p className="text-white/60 whitespace-nowrap">
                Completed: {new Date().toLocaleDateString()}
              </p>
              <span className="text-xs text-white/30 hidden sm:inline">•</span>
              <p className="text-white/60 whitespace-nowrap">
                ID: {result.auditId.slice(0, 8)}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/15 text-white"
          >
            Share
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <GlassCard className="lg:col-span-4 flex flex-col items-center justify-center text-center" noPadding={false}>
            <ScoreCircle score={result.score} size="xl" label="Overall" />
            <p className="mt-1 text-sm text-white/60">Overall SEO score</p>
          </GlassCard>

          <GlassCard className="lg:col-span-8" noPadding={false}>
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-sm font-semibold text-white">Category scores</h3>
              <span className="text-xs text-white/60">0–100</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ScoreCircle score={s.seo || 0} size="md" label="SEO" />
              <ScoreCircle score={s.performance || 0} size="md" label="Performance" />
              <ScoreCircle score={s.accessibility || 0} size="md" label="Accessibility" />
              <ScoreCircle score={s.best_practices || 0} size="md" label="Best Practices" />
            </div>
          </GlassCard>
        </div>
      </GlassCard>

      {/* Quick Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-5" hover>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-3xl font-semibold text-white">{passedA11yChecks}</div>
              <div className="text-sm text-white/60">Accessibility checks passed</div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center">
              <Accessibility className="h-5 w-5 text-emerald-300" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5" hover>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-3xl font-semibold text-white">{failedSeoChecks}</div>
              <div className="text-sm text-white/60">SEO checks failed</div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-amber-300" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5" hover>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-3xl font-semibold text-white">{highSeverityIssues}</div>
              <div className="text-sm text-white/60">High-severity issues</div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center">
              <ShieldAlert className="h-5 w-5 text-rose-300" />
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
