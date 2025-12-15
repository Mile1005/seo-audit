import React, { useState } from "react";

// Phase 12: BacklinkPlaceholder
// Lightweight upsell component showing example backlink intelligence shape.

const sampleData = {
  domain: "example.com",
  summary: {
    total: 123,
    follow: 87,
    nofollow: 36,
    domains: 45,
    newPast7Days: 8,
    lostPast7Days: 3,
    toxicSuspect: 4,
  },
  backlinks: [
    {
      sourceUrl: "https://blog.example.org/post-1",
      sourceDomain: "blog.example.org",
      anchor: "seo audit tool",
      rel: "follow",
      domainRating: 54,
      traffic: 120,
      firstSeen: "2025-09-01",
      lastSeen: "2025-09-11",
    },
    {
      sourceUrl: "https://partners.example.net/resources",
      sourceDomain: "partners.example.net",
      anchor: "brand name",
      rel: "nofollow",
      domainRating: 42,
      traffic: 60,
      firstSeen: "2025-08-28",
      lastSeen: "2025-09-10",
    },
  ],
};

export function BacklinkPlaceholder() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-md border border-dashed p-6 bg-gradient-to-br from-white to-slate-50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Backlink Intelligence (Premium)</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Connect a premium data provider to unlock live backlink discovery, toxicity analysis,
            lost link alerts, and competitor gap insights. Below is a static demo of the JSON
            structure we surface.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1.5 text-sm rounded-md bg-black text-white hover:bg-slate-800"
            data-upsell="backlinks-upgrade"
          >
            Upgrade
          </button>
          <button
            className="px-3 py-1.5 text-sm rounded-md border hover:bg-slate-100"
            onClick={() => setExpanded((x) => !x)}
          >
            {expanded ? "Hide JSON" : "View JSON"}
          </button>
        </div>
      </div>
      {expanded && (
        <pre className="mt-4 max-h-72 overflow-auto text-xs bg-slate-900 text-slate-100 p-4 rounded">
          <code>{JSON.stringify(sampleData, null, 2)}</code>
        </pre>
      )}
      <ul className="mt-4 text-sm list-disc pl-5 space-y-1 text-slate-700">
        <li>Real‑time new & lost link tracking</li>
        <li>Toxicity scoring & disavow workflow</li>
        <li>Competitor gap & anchor text distribution</li>
        <li>Scheduled PDF / inbox alerts</li>
      </ul>
    </div>
  );
}

export default BacklinkPlaceholder;
