"use client";

import React from "react";

export default function AuditPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            See a preview of your audit
          </h2>
          <p className="text-muted-foreground mb-6">
            We generate a clear, prioritized report you can share with your team. This
            includes issue summaries, examples from your pages, and step-by-step fixes.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Priority matrix (Critical, High, Medium, Low)</li>
            <li>AI suggestions with implementation tips</li>
            <li>Benchmark vs. competitors</li>
          </ul>
        </div>
        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <div className="h-64 w-full rounded-md bg-muted flex items-center justify-center text-muted-foreground">
            Report preview placeholder
          </div>
        </div>
      </div>
    </section>
  );
}
