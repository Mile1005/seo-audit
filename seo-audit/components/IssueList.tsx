"use client";
import React, { useMemo } from "react";

type Issue = {
  id: string;
  category: "title_meta" | "headings" | "answerability" | "structure" | "schema" | "images" | "internal_links";
  severity: "low" | "medium" | "high";
  found: string;
  why_it_matters: string;
  recommendation: string;
  snippet: string | null;
};

export default function IssueList({ issues }: { issues: Issue[] }) {
  const grouped = useMemo(() => {
    const map: Record<string, Issue[]> = {};
    for (const issue of issues) {
      const key = `${issue.severity}`;
      map[key] = map[key] || [];
      map[key].push(issue);
    }
    return map;
  }, [issues]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Issues</h2>
      <div className="space-y-4">
        {(["high", "medium", "low"] as const).map((sev) => (
          <div key={sev}>
            <div className="text-sm font-semibold uppercase tracking-wide mb-2">{sev} Priority</div>
            <ul className="space-y-2">
              {(grouped[sev] || []).map((iss) => (
                <li key={iss.id} className="border rounded p-3">
                  <div className="text-sm text-gray-600">Category: {iss.category}</div>
                  <div className="font-medium">{iss.recommendation}</div>
                  <div className="text-sm text-gray-700">Found: {iss.found}</div>
                  <div className="text-sm text-gray-700">Why it matters: {iss.why_it_matters}</div>
                  {iss.snippet ? (
                    <div>
                      <button
                        onClick={() => navigator.clipboard.writeText(iss.snippet || "")}
                        className="mt-2 rounded bg-gray-800 text-white px-2 py-1 text-xs"
                      >
                        Copy snippet
                      </button>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}


