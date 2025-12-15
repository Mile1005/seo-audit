"use client";
import { useMemo, useState } from "react";
import { AlertTriangle, Filter } from "lucide-react";
import { Badge } from "../ui/badge";
import { Issue } from "../../lib/types/audit";
import { Button } from "../ui/button";
import { GlassCard } from "../ui/GlassCard";

interface Props {
  issues: Issue[];
}

const severityOrder: Record<string, number> = { high: 1, medium: 2, low: 3 };
const effortOrder: Record<string, number> = { low: 1, medium: 2, high: 3 };
const impactOrder: Record<string, number> = { low: 1, medium: 2, high: 3 };

export const IssuesList = ({ issues }: Props) => {
  const [selectedSeverities, setSelectedSeverities] = useState<string[]>(["high", "medium", "low"]);
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<"severity" | "impact" | "effort">("severity");
  const [showAll, setShowAll] = useState(false);

  const categories = useMemo(() => {
    const set = new Set<string>();
    issues?.forEach((i) => {
      if (i.category) set.add(i.category);
    });
    return Array.from(set).sort();
  }, [issues]);

  const toggleSeverity = (sev: string) => {
    setSelectedSeverities((prev) =>
      prev.includes(sev) ? prev.filter((s) => s !== sev) : [...prev, sev]
    );
  };

  const filteredIssues = useMemo(() => {
    return (issues ?? [])
      .filter((i) => selectedSeverities.includes((i.severity || "").toLowerCase()))
      .filter((i) => category === "all" || i.category === category);
  }, [issues, selectedSeverities, category]);

  const sortedIssues = useMemo(() => {
    const arr = [...filteredIssues];
    arr.sort((a, b) => {
      if (sort === "severity") {
        return (
          (severityOrder[a.severity?.toLowerCase() || "low"] || 9) -
          (severityOrder[b.severity?.toLowerCase() || "low"] || 9)
        );
      } else if (sort === "impact") {
        return (
          (impactOrder[b.impact?.toLowerCase() || "low"] || 0) -
          (impactOrder[a.impact?.toLowerCase() || "low"] || 0)
        );
      } else if (sort === "effort") {
        return (
          (effortOrder[a.effort?.toLowerCase() || "low"] || 0) -
          (effortOrder[b.effort?.toLowerCase() || "low"] || 0)
        ); // lower effort first
      }
      return 0;
    });
    return arr;
  }, [filteredIssues, sort]);

  const visibleCount = 8;
  const visibleIssues = useMemo(
    () => (showAll ? sortedIssues : sortedIssues.slice(0, visibleCount)),
    [sortedIssues, showAll]
  );

  // After hooks are declared, it's safe to early-return without violating the Rules of Hooks
  if (!issues || issues.length === 0) return null;

  return (
    <GlassCard>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-amber-300" />
            </div>
            <h3 className="text-base font-semibold text-white truncate">Issues</h3>
            <span className="text-xs text-white/60">({issues.length})</span>
          </div>
          <p className="mt-1 text-sm text-white/60">Prioritized items to fix for better SEO.</p>
        </div>

        {sortedIssues.length > visibleCount && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/15 text-white"
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? "Show less" : "Show all"}
          </Button>
        )}
      </div>

          {/* Filter Bar */}
          <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-4 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Filter className="h-4 w-4 text-sky-300" />
              Filters
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              {["high", "medium", "low"].map((sev) => (
                <Button
                  key={sev}
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => toggleSeverity(sev)}
                  className={
                    selectedSeverities.includes(sev)
                      ? "bg-white/15 border-white/20 text-white"
                      : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/15"
                  }
                >
                  {sev}
                </Button>
              ))}
              <div className="h-6 w-px bg-white/10 mx-2" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="text-sm rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-white hover:border-white/20 outline-none transition-colors"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="h-6 w-px bg-white/10 mx-2" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="text-sm rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-white hover:border-white/20 outline-none transition-colors"
              >
                <option value="severity">Sort: Severity</option>
                <option value="impact">Sort: Impact (desc)</option>
                <option value="effort">Sort: Effort (asc)</option>
              </select>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/15 text-white/80"
                onClick={() => {
                  setSelectedSeverities(["high", "medium", "low"]);
                  setCategory("all");
                  setSort("severity");
                }}
              >
                Reset
              </Button>
            </div>
            <div className="text-sm text-white/70 bg-black/10 px-3 py-2 rounded-lg border border-white/10">
              Showing <span className="font-semibold">{sortedIssues.length}</span> of{" "}
              <span className="font-semibold">{issues.length}</span> issues
            </div>
          </div>

          <div className="space-y-4">
            {visibleIssues.map((issue, i) => (
              <div
                key={`${issue.title}-${i}`}
                className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/8 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-white/10 text-white/80">
                    {(issue.severity || "medium").toLowerCase()}
                  </Badge>
                  {issue.category && (
                    <Badge variant="outline" className="border-white/15 text-white/70">
                      {issue.category}
                    </Badge>
                  )}
                  {issue.impact && (
                    <Badge variant="outline" className="border-white/15 text-white/70">
                      {issue.impact} impact
                    </Badge>
                  )}
                  {issue.effort && (
                    <Badge variant="outline" className="border-white/15 text-white/70">
                      {issue.effort} effort
                    </Badge>
                  )}
                </div>

                <h4 className="font-medium text-white mb-1 break-words">{issue.title}</h4>
                <p className="text-sm text-white/70 leading-relaxed break-words">{issue.description}</p>

                {issue.recommendation && (
                  <div className="mt-3 rounded-lg border border-white/10 bg-black/10 p-3">
                    <div className="text-xs text-white/60 mb-1">Recommendation</div>
                    <p className="text-sm text-white/80 leading-relaxed break-words">
                      {issue.recommendation}
                    </p>
                  </div>
                )}

                {issue.current_value && issue.expected_value && (
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="rounded-lg border border-white/10 bg-black/10 p-3">
                      <div className="text-xs text-white/60 mb-1">Current</div>
                      <div className="text-xs text-white/80 break-all font-mono">
                        {issue.current_value}
                      </div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-black/10 p-3">
                      <div className="text-xs text-white/60 mb-1">Expected</div>
                      <div className="text-xs text-white/80 break-all font-mono">
                        {issue.expected_value}
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
