import { useCallback, useRef, useState } from 'react';
import { AuditResultUnified } from '../types/audit';

interface UseAuditReturn {
  data: AuditResultUnified | null;
  error: string | null;
  loading: boolean;
  status: 'idle' | 'processing' | 'completed' | 'failed';
  start: (url: string) => Promise<void>;
  reset: () => void;
}

export function useAudit(): UseAuditReturn {
  const [data, setData] = useState<AuditResultUnified | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed' | 'failed'>('idle');
  const cancelRef = useRef(false);
  const [loading, setLoading] = useState(false);

  const poll = useCallback(async (auditId: string, attempt = 0) => {
    if (cancelRef.current) return;
    try {
      const res = await fetch(`/api/seo-audit/status?auditId=${auditId}`, { cache: 'no-store' });
      const json = await res.json();
      if (json.status === 'completed') {
        setData(json.data);
        setStatus('completed');
        setLoading(false);
        return;
      }
      if (json.status === 'failed') {
        setError(json.error || 'Audit failed');
        setStatus('failed');
        setLoading(false);
        return;
      }
      // processing
      const nextAttempt = attempt + 1;
      if (nextAttempt > 120) { // Increased from 40 to 120 attempts (approximately 6-8 minutes instead of 2-3 minutes)
        setError('Timed out waiting for audit');
        setStatus('failed');
        setLoading(false);
        return;
      }
      const delay = Math.min(4000, 1000 + attempt * 250);
      setTimeout(() => poll(auditId, nextAttempt), delay);
    } catch (e: any) {
      setError(e.message || 'Network error');
      setStatus('failed');
      setLoading(false);
    }
  }, []);

  const start = useCallback(async (url: string) => {
    cancelRef.current = false;
    setError(null);
    setData(null);
    setStatus('processing');
    setLoading(true);
    try {
      const res = await fetch('/api/seo-audit/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to start audit');
      poll(json.auditId, 0);
    } catch (e: any) {
      setError(e.message);
      setStatus('failed');
      setLoading(false);
    }
  }, [poll]);

  const reset = () => {
    cancelRef.current = true;
    setData(null);
    setError(null);
    setStatus('idle');
    setLoading(false);
  };

  return { data, error, loading, status, start, reset };
}
