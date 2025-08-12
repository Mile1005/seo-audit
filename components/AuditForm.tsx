"use client";

import React, { useState } from "react";

export default function AuditForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const startAudit = async (formData: { pageUrl: string; targetKeyword: string; email?: string }) => {
    setStatus("starting");
    setResult(null);

    try {
      const res = await fetch("/api/audit/start", {  // Note: Use /api/audit/start for consistency
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to start audit");
      const data = await res.json();
      if (!data.runId) {
        setStatus("error");
        return;
      }
      setStatus("queued");

      // Poll for results with error handling
      const poll = async () => {
        try {
          const res = await fetch(`/api/audit/result?runId=${data.runId}`);
          if (!res.ok) throw new Error("Polling failed");
          const pollData = await res.json();
          if (pollData.status === "done") {
            setStatus("done");
            setResult(pollData.result);
          } else if (pollData.status === "error") {
            setStatus("error");
          } else {
            setTimeout(poll, 2000);
          }
        } catch (err) {
          console.error(err);
          setStatus("error");
        }
      };
      poll();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      pageUrl: (e.currentTarget.elements.namedItem("pageUrl") as HTMLInputElement).value,
      targetKeyword: (e.currentTarget.elements.namedItem("targetKeyword") as HTMLInputElement).value,
      email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value,
    };
    startAudit(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="pageUrl" placeholder="Page URL" required />
        <input name="targetKeyword" placeholder="Target Keyword" required />
        <input name="email" placeholder="Email (optional)" type="email" />
        <button type="submit" disabled={status === "starting" || status === "queued"}>Start Audit</button>
      </form>

      {status === "starting" && <p>Starting audit...</p>}
      {status === "queued" && <p>Audit queued, waiting for results...</p>}
      {status === "done" && result && (
        <div>
          <h2>Audit Results</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      {status === "error" && <p>There was an error processing your audit.</p>}
    </>
  );
}
