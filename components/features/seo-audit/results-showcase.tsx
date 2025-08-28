"use client";

import React from "react";

export default function ResultsShowcase() {
  const results = [
    { stat: "+112%", label: "Organic traffic in 60 days" },
    { stat: "-38%", label: "Load time reduction" },
    { stat: "+27", label: "Avg. position improvement" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-10">
          Real Results
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {results.map((r) => (
            <div key={r.label} className="rounded-xl border bg-background p-6 shadow-sm">
              <div className="text-4xl font-bold text-primary">{r.stat}</div>
              <div className="mt-2 text-muted-foreground">{r.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
