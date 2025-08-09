import React from "react";

type Insights = {
  available: boolean;
  top_queries: Array<{ query: string; clicks: number; impressions: number; ctr: number; position: number }>;
  ctr: number | null;
  impressions: number | null;
  clicks: number | null;
};

export default function GscPanel({ insights }: { insights: Insights }) {
  if (!insights?.available) return (
    <div>
      <h2 className="text-lg font-semibold mb-2">GSC Insights</h2>
      <p className="text-sm text-gray-600">Not configured.</p>
    </div>
  );
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">GSC Insights (28 days)</h2>
      <div className="grid grid-cols-3 gap-3 text-sm mb-3">
        <div className="border rounded p-2"><div className="text-gray-600">Clicks</div><div className="font-semibold">{insights.clicks ?? "—"}</div></div>
        <div className="border rounded p-2"><div className="text-gray-600">Impressions</div><div className="font-semibold">{insights.impressions ?? "—"}</div></div>
        <div className="border rounded p-2"><div className="text-gray-600">CTR</div><div className="font-semibold">{insights.ctr != null ? `${(insights.ctr * 100).toFixed(1)}%` : "—"}</div></div>
      </div>
      <div>
        <div className="text-sm font-medium mb-1">Top Queries</div>
        <ul className="text-sm list-disc pl-5 space-y-1">
          {insights.top_queries.slice(0, 10).map((q, i) => (
            <li key={i}>
              <span className="font-medium">{q.query}</span> — {q.clicks} clicks, {q.impressions} impressions, CTR {(q.ctr * 100).toFixed(1)}%, pos {q.position.toFixed(1)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


