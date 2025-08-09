"use client";
import React, { useEffect, useState } from "react";
import { AuditResultV1 as AuditSchema, type AuditResultV1 } from "../../lib/schemas";
import ScoreRings from "../../components/ScoreRings";
import DetectedPanel from "../../components/DetectedPanel";
import IssueList from "../../components/IssueList";
import QuickWins from "../../components/QuickWins";
import GscPanel from "../../components/GscPanel";

export default function DebugPage() {
  const [result, setResult] = useState<AuditResultV1 | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/sample-audit.json")
      .then((r) => r.json())
      .then((j) => setResult(AuditSchema.parse(j)))
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <main className="container-width py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Debug Sample Render</h1>
      {error && <div className="p-3 bg-red-50 border text-red-800">{error}</div>}
      {!result ? (
        <div className="h-24 rounded bg-gray-100 animate-pulse" />
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
        </>
      )}
    </main>
  );
}


