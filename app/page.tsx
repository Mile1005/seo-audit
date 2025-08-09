"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [pageUrl, setPageUrl] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!pageUrl) {
      setError("Please enter a valid URL");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/audit.start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageUrl, targetKeyword: targetKeyword || undefined, email: email || undefined })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to start audit");
      router.push(`/audit/${json.runId}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container-width py-12">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Free AI Visibility Audit</h1>
        <p className="text-gray-600">Analyze a page for SEO and AI-readiness signals. Get scores, issues, and quick wins.</p>
      </section>
      <div className="card p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Page URL</label>
            <input
              type="url"
              required
              placeholder="https://example.com/page"
              value={pageUrl}
              onChange={(e) => setPageUrl(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Target Keyword (optional)</label>
              <input
                type="text"
                placeholder="e.g. best coffee grinder"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email (optional)</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Starting..." : "Start Audit"}
          </button>
        </form>
      </div>
      <p className="text-xs text-gray-500 mt-4">Tip: Use the sample on the debug page to preview the UI without running a real audit.</p>
    </main>
  );
}


