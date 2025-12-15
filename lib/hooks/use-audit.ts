import { useCallback, useRef, useState } from "react";
import { AuditResultUnified } from "../types/audit";
import { normalizeUrl } from "../url/normalize";

const LAST_AUDIT_URL_KEY = "audit:lastUrl";
function cacheResultKey(normalizedUrl: string) {
  return `audit:lastResult:${encodeURIComponent(normalizedUrl)}`;
}
function cacheTimestampKey(normalizedUrl: string) {
  return `audit:lastTimestamp:${encodeURIComponent(normalizedUrl)}`;
}

interface UseAuditReturn {
  data: AuditResultUnified | null;
  error: string | null;
  loading: boolean;
  status: "idle" | "processing" | "completed" | "failed";
  progress: { stage?: string; progress?: number; message?: string; elapsedMs?: number };
  start: (url: string) => Promise<void>;
  reset: () => void;
  loadCached: (url?: string) => boolean;
  isCached: boolean;
}

export function useAudit(): UseAuditReturn {
  const [data, setData] = useState<AuditResultUnified | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "completed" | "failed">("idle");
  const cancelRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [isCached, setIsCached] = useState(false);
  const [progress, setProgress] = useState<{
    stage?: string;
    progress?: number;
    message?: string;
    elapsedMs?: number;
  }>({});

  const poll = useCallback(async (auditId: string, attempt = 0) => {
    if (cancelRef.current) return;
    try {
      const res = await fetch(`/api/seo-audit/status?auditId=${auditId}`, { cache: "no-store" });
      const json = await res.json();
      if (json.status === "completed") {
        setData(json.data);
        setStatus("completed");
        setLoading(false);
        setIsCached(false);
        setProgress({
          stage: "completed",
          progress: 100,
          message: "Completed",
          elapsedMs: json.elapsedMs,
        });

        // Save audit results to database
        try {
          await fetch("/api/audits/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ auditResult: json.data }),
          });
        } catch (saveError) {
          console.warn("Failed to save audit to database:", saveError);
          // Non-fatal, continue
        }

        // Save to localStorage for immediate persistence
        try {
          const normalized = normalizeUrl(json.data?.url ?? "") ?? json.data?.url;
          if (normalized) {
            localStorage.setItem(LAST_AUDIT_URL_KEY, normalized);
            localStorage.setItem(cacheResultKey(normalized), JSON.stringify(json.data));
            localStorage.setItem(cacheTimestampKey(normalized), new Date().toISOString());
          } else {
            // Backwards-compatible fallback (should be rare)
            localStorage.setItem("lastAuditResult", JSON.stringify(json.data));
            localStorage.setItem("lastAuditTimestamp", new Date().toISOString());
          }
        } catch (storageError) {
          console.warn("Failed to save audit to localStorage:", storageError);
        }

        return;
      }
      if (json.status === "failed") {
        setError(json.error || "Audit failed");
        setStatus("failed");
        setLoading(false);
        setProgress({
          stage: "failed",
          message: json.error || "Audit failed",
          elapsedMs: json.elapsedMs,
        });
        return;
      }
      // processing
      if (json && json.status === "processing") {
        setProgress((prev) => ({
          stage: json.stage ?? prev.stage ?? "queued",
          progress: typeof json.progress === "number" ? json.progress : prev.progress,
          message: json.message ?? prev.message,
          elapsedMs: typeof json.elapsedMs === "number" ? json.elapsedMs : prev.elapsedMs,
        }));
      }
      const nextAttempt = attempt + 1;
      if (nextAttempt > 120) {
        // Increased from 40 to 120 attempts (approximately 6-8 minutes instead of 2-3 minutes)
        setError("Timed out waiting for audit");
        setStatus("failed");
        setLoading(false);
        setProgress({ stage: "failed", message: "Timed out waiting for audit" });
        return;
      }
      const delay = Math.min(4000, 1000 + attempt * 250);
      setTimeout(() => poll(auditId, nextAttempt), delay);
    } catch (e: any) {
      setError(e.message || "Network error");
      setStatus("failed");
      setLoading(false);
    }
  }, []);

  const start = useCallback(
    async (url: string) => {
      cancelRef.current = false;
      setError(null);
      setData(null);
      setIsCached(false);
      setStatus("processing");
      setLoading(true);
      setProgress({ stage: "queued", progress: 0, message: "Starting audit…" });
      try {
        const res = await fetch("/api/seo-audit/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to start audit");
        poll(json.auditId, 0);
      } catch (e: any) {
        setError(e.message);
        setStatus("failed");
        setLoading(false);
        setProgress({ stage: "failed", message: e.message });
      }
    },
    [poll]
  );

  const loadCached = useCallback((url?: string) => {
    try {
      const normalized = url
        ? (normalizeUrl(url) ?? url)
        : localStorage.getItem(LAST_AUDIT_URL_KEY);

      if (normalized) {
        const cached = localStorage.getItem(cacheResultKey(normalized));
        if (cached) {
          const parsedData = JSON.parse(cached);
          setData(parsedData);
          setStatus("completed");
          setLoading(false);
          setError(null);
          setIsCached(true);
          setProgress({ stage: "completed", progress: 100, message: "Loaded from cache" });
          return true;
        }
      }

      // Backwards-compatible fallback (older builds)
      const legacyCached = localStorage.getItem("lastAuditResult");
      if (legacyCached) {
        const parsedData = JSON.parse(legacyCached);
        setData(parsedData);
        setStatus("completed");
        setLoading(false);
        setError(null);
        setIsCached(true);
        setProgress({ stage: "completed", progress: 100, message: "Loaded from cache" });
        return true;
      }
    } catch (e) {
      console.warn("Failed to load cached audit:", e);
    }
    return false;
  }, []);

  const reset = () => {
    cancelRef.current = true;
    setData(null);
    setError(null);
    setStatus("idle");
    setLoading(false);
    setIsCached(false);
    setProgress({});
  };

  return { data, error, loading, status, progress, start, reset, loadCached, isCached };
}
