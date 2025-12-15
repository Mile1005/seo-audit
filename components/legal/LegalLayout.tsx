"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number; // 2 = h2, 3 = h3
}

export function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  // Extract h2/h3 headings from children to build a small TOC
  const [headings, setHeadings] = React.useState<Heading[]>([]);

  React.useEffect(() => {
    const root = document.getElementById("legal-content-root");
    if (!root) return;
    const hs = Array.from(root.querySelectorAll("h2, h3")) as HTMLElement[];
    const parsed: Heading[] = hs.map((el) => ({
      id:
        el.id ||
        el.innerText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      text: el.innerText,
      level: el.tagName === "H2" ? 2 : 3,
    }));
    // Ensure ids exist in DOM
    parsed.forEach(({ id }, idx) => {
      const el = hs[idx];
      if (el && !el.id) el.id = id;
    });
    setHeadings(parsed);
  }, [children]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        {intro && <p className="text-lg text-slate-300">{intro}</p>}
      </header>

      {headings.length > 0 && (
        <nav aria-label="On this page" className="mb-8">
          <div className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-4">
            <div className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-slate-400" /> On this page
            </div>
            <ul className="space-y-1 text-sm">
              {headings.map((h) => (
                <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
                  <a href={`#${h.id}`} className="text-slate-300 hover:text-white hover:underline">
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      <article id="legal-content-root" className="prose prose-invert prose-lg">
        {children}
      </article>
    </div>
  );
}
