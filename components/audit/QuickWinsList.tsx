"use client";
import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { QuickWin } from "../../lib/types/audit";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/button";

interface Props {
  quickWins: QuickWin[];
}
export const QuickWinsList = ({ quickWins }: Props) => {
  const safeQuickWins = quickWins ?? [];

  const [showAll, setShowAll] = useState(false);
  const visibleCount = 4;
  const visibleWins = useMemo(
    () => (showAll ? safeQuickWins : safeQuickWins.slice(0, visibleCount)),
    [safeQuickWins, showAll]
  );

  if (safeQuickWins.length === 0) return null;

  return (
    <GlassCard>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
              <Star className="h-4 w-4 text-amber-300" />
            </div>
            <h3 className="text-base font-semibold text-white truncate">Quick Wins</h3>
              <span className="text-xs text-white/60">({safeQuickWins.length})</span>
          </div>
          <p className="mt-1 text-sm text-white/60">
            Low-effort improvements with high impact.
          </p>
        </div>

        {safeQuickWins.length > visibleCount && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/15 text-white"
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? "Show less" : `Show all`}
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {visibleWins.map((win, i) => (
          <div
            key={`${win.title}-${i}`}
            className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/8 transition-colors"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-white/10 text-white/80">
                Quick win
              </Badge>
              {win.impact && (
                <Badge variant="outline" className="border-white/15 text-white/70">
                  {win.impact} impact
                </Badge>
              )}
              {win.effort && (
                <Badge variant="outline" className="border-white/15 text-white/70">
                  {win.effort} effort
                </Badge>
              )}
              {win.category && (
                <Badge variant="outline" className="border-white/15 text-white/70">
                  {win.category}
                </Badge>
              )}
            </div>

            <h4 className="font-medium text-white mb-1 break-words">{win.title}</h4>
            <p className="text-sm text-white/70 leading-relaxed break-words">{win.description}</p>

            {win.current_value && win.recommended_value && (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/10 bg-black/10 p-3">
                  <div className="text-xs text-white/60 mb-1">Current</div>
                  <div className="text-xs text-white/80 break-all font-mono">{win.current_value}</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/10 p-3">
                  <div className="text-xs text-white/60 mb-1">Recommended</div>
                  <div className="text-xs text-white/80 break-all font-mono">
                    {win.recommended_value}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
