"use client";
import React from "react";

type QuickWin = {
  issue_id: string;
  estimated_impact: "low" | "medium" | "high";
  action: string;
  snippet: string | null;
};

export default function QuickWins({ items }: { items: QuickWin[] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Quick Wins</h2>
      <ul className="space-y-2">
        {items.map((q) => (
          <li key={q.issue_id} className="border rounded p-3">
            <div className="text-sm text-gray-600">Impact: {q.estimated_impact}</div>
            <div className="font-medium">{q.action}</div>
            {q.snippet ? (
              <button
                onClick={() => navigator.clipboard.writeText(q.snippet || "")}
                className="mt-2 rounded bg-gray-800 text-white px-2 py-1 text-xs"
              >
                Copy snippet
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}


