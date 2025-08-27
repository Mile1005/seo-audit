import React from "react";

export default function DetectedPanel({ result }: { result: any }) {
  const d = result.detected;
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Detected Content</h2>
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">Title:</span> {d.title || "—"}
        </div>
        <div>
          <span className="font-medium">Meta Description:</span> {d.meta_description || "—"}
        </div>
        <div>
          <span className="font-medium">Canonical:</span> {d.canonical || "—"}
        </div>
        <div>
          <span className="font-medium">H1:</span> {d.h1 || "—"}
        </div>
        <div>
          <span className="font-medium">H2:</span>
          <ul className="list-disc pl-5">
            {d.h2.map((h: string, i: number) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
        <div>
          <span className="font-medium">H3:</span>
          <ul className="list-disc pl-5">
            {d.h3.map((h: string, i: number) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
        <div>
          <span className="font-medium">JSON-LD Types:</span> {d.json_ld_types.join(", ") || "—"}
        </div>
        <div>
          <span className="font-medium">Images:</span>
          <ul className="list-disc pl-5">
            {d.images.slice(0, 10).map((img: any, i: number) => (
              <li key={i} className="truncate">
                {img.src} {img.alt ? `— alt: ${img.alt}` : ""}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="font-medium">Internal Links:</span>
          <ul className="list-disc pl-5">
            {d.internal_links.slice(0, 10).map((ln: any, i: number) => (
              <li key={i} className="truncate">
                {ln.href} {ln.anchor ? `— ${ln.anchor}` : ""}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
