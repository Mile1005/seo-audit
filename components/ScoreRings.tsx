import React from "react";

type Scores = {
  overall: number;
  title_meta: number;
  headings: number;
  answerability: number;
  structure: number;
  schema: number;
  images: number;
  internal_links: number;
};

export default function ScoreRings({ scores }: { scores: Scores }) {
  const items: Array<[keyof Scores, string]> = [
    ["overall", "Overall"],
    ["title_meta", "Title & Meta"],
    ["headings", "Headings"],
    ["answerability", "Answerability"],
    ["structure", "Structure"],
    ["schema", "Schema"],
    ["images", "Images"],
    ["internal_links", "Internal Links"]
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Scores</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(([key, label]) => (
          <Ring key={key} label={label} value={scores[key]} />
        ))}
      </div>
    </div>
  );
}

function Ring({ label, value }: { label: string; value: number }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 80 ? "stroke-emerald-500" : value >= 50 ? "stroke-amber-500" : "stroke-rose-500";
  return (
    <div className="flex items-center gap-3 p-3 border rounded">
      <svg width="72" height="72" className="shrink-0">
        <circle cx="36" cy="36" r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
        <circle
          cx="36"
          cy="36"
          r={radius}
          strokeWidth="8"
          fill="none"
          className={`${color}`}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
        <text x="36" y="41" textAnchor="middle" className="fill-gray-900 text-sm font-semibold">
          {value}
        </text>
      </svg>
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="font-semibold">{value}/100</div>
      </div>
    </div>
  );
}


