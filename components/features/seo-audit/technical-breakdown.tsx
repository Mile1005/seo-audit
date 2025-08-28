"use client";

import React from "react";

export default function TechnicalBreakdown() {
  const items = [
    { label: "Meta tags & titles", score: 92 },
    { label: "Headings & content structure", score: 88 },
    { label: "Core Web Vitals", score: 76 },
    { label: "Indexation health", score: 95 },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
          Technical Breakdown
        </h2>
        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <div className="space-y-4">
            {items.map((i) => (
              <div key={i.label} className="flex items-center justify-between">
                <span className="text-muted-foreground">{i.label}</span>
                <div className="flex items-center gap-3">
                  <div className="w-40 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${i.score}%` }} />
                  </div>
                  <span className="text-foreground font-medium">{i.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
