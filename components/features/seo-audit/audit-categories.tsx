"use client";

import React from "react";

// Simple grid of the 8 audit categories referenced on the feature page
export default function AuditCategories() {
  const categories = [
    { title: "Technical SEO", desc: "Crawlability, indexation, canonicalization" },
    { title: "On-Page SEO", desc: "Titles, metas, headings, internal linking" },
    { title: "Performance", desc: "Core Web Vitals, speed, best practices" },
    { title: "Indexing", desc: "Sitemaps, robots.txt, noindex, duplicates" },
    { title: "Security", desc: "HTTPS, security headers, mixed content" },
    { title: "Content", desc: "Thin/duplicate checks, readability, freshness" },
    { title: "Structured Data", desc: "Schema.org coverage and validity" },
    { title: "Accessibility", desc: "Alt text, landmarks, contrast, ARIA" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-10 text-center">
          What We Check
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <div key={c.title} className="rounded-xl border bg-background p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
