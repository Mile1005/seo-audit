"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { AuditResultV1 as AuditResultSchema } from "../../../lib/schemas";
import ScoreRings from "../../../components/ScoreRings";
import DetectedPanel from "../../../components/DetectedPanel";
import IssueList from "../../../components/IssueList";
import QuickWins from "../../../components/QuickWins";
import GscPanel from "../../../components/GscPanel";

type ApiResponse = { status: "queued" | "running" | "ready" | "failed"; result?: any; error?: string };

export default function AuditRunPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const [status, setStatus] = useState<ApiResponse["status"]>("queued");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    async function poll() {
      try {
        const res = await fetch(`/api/audit.get?id=${encodeURIComponent(id)}`, { cache: "no-store" });
        const json: ApiResponse = await res.json();
        if (!mounted) return;
        setStatus(json.status);
        if (json.status === "ready" && json.result) {
          const parsed = AuditResultSchema.parse(json.result);
          setResult(parsed);
        }
        if (json.status === "failed") {
          setError(json.error || "Run failed");
        }
      } catch (err: any) {
        if (mounted) setError(err.message || "Error fetching run");
      }
    }
    const iv = setInterval(poll, 2000);
    poll();
    return () => {
      mounted = false;
      clearInterval(iv);
    };
  }, [id]);

  const fixPack = useMemo(() => {
    if (!result) return "";
    const lines: string[] = [];
    for (const issue of result.issues) {
      lines.push(`- [${issue.severity}] (${issue.category}) ${issue.recommendation}`);
      if (issue.snippet) lines.push("\n" + issue.snippet + "\n");
    }
    return lines.join("\n");
  }, [result]);

  function downloadJson() {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-${id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyFixPack() {
    if (!fixPack) return;
    navigator.clipboard.writeText(fixPack);
  }

  return (
    <main className="container-width py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Audit Run</h1>
        <div className="text-sm px-2 py-1 rounded bg-gray-100 border">Status: {status}</div>
      </div>
      {error && (
        <div className="p-4 border rounded bg-red-50 text-red-800">{error}</div>
      )}
      {!result ? (
        <div className="space-y-3">
          <div className="h-24 rounded bg-gray-100 animate-pulse" />
          <div className="h-24 rounded bg-gray-100 animate-pulse" />
          <div className="h-24 rounded bg-gray-100 animate-pulse" />
        </div>
      ) : (
        <>
          <div className="card p-4">
            <ScoreRings scores={result.scores} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card p-4">
              <DetectedPanel result={result} />
            </div>
            <div className="card p-4">
              <GscPanel insights={result.gsc_insights} />
            </div>
          </div>
          <div className="card p-4">
            <IssueList issues={result.issues} />
          </div>
          <div className="card p-4">
            <QuickWins items={result.quick_wins} />
          </div>
          <div className="flex gap-2">
            <button onClick={downloadJson} className="rounded bg-gray-800 text-white px-3 py-2">
              Download JSON
            </button>
            <button onClick={copyFixPack} className="rounded bg-blue-600 text-white px-3 py-2">
              Copy Fix Pack
            </button>
          </div>
        </>
      )}
    </main>
  );
}


