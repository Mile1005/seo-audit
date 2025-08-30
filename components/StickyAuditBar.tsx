"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

const ensureHttps = (url: string) => {
  const t = url.trim();
  if (!t) return t;
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
};

const isValidDomainOrUrl = (value: string) => {
  const v = value.trim();
  const urlRegex = /^(https?:\/\/)?((xn--)?[\w-]+\.)+[\w-]{2,}(\/[\w\-.\/?%&=]*)?$/i;
  if (!urlRegex.test(v)) return false;
  if (/^\w+:/.test(v) && !/^https?:/i.test(v)) return false;
  return true;
};

export default function StickyAuditBar() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setVisible(y > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidDomainOrUrl(url)) { setError('Enter a valid domain'); return; }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/seo-audit/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: ensureHttps(url) })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed');
      router.push(`/seo-audit/results?id=${data.auditId || data.id}`);
    } catch (err) {
      setError('Try again');
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-4 inset-x-0 z-50"
        >
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-3">
              <form onSubmit={submit} action="/api/audit" method="POST" className="flex items-center gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  placeholder="Enter domain (example.com)"
                  value={url}
                  onChange={(e)=>setUrl(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary ripple whitespace-nowrap"
                >
                  {loading ? 'Analyzing…' : 'Start Free Audit'}
                </button>
              </form>
              {error && <div className="text-red-600 text-xs mt-1 px-1">{error}</div>}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
