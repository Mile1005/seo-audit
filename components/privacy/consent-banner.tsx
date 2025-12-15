"use client";

import React, { useEffect, useState } from "react";

// Simple, accessible consent banner that stores choice in localStorage
// and updates Consent Mode v2 accordingly.
// Keys follow a small namespace to avoid collisions.
const STORAGE_KEY = "ga_consent_v2";

type ConsentChoice = "accepted" | "rejected" | "unset";

function applyConsentFromChoice(choice: ConsentChoice) {
  if (typeof window === "undefined" || typeof window.gtag === "undefined") return;
  if (choice === "accepted") {
    window.gtag("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      functionality_storage: "granted",
      security_storage: "granted",
    });
  } else if (choice === "rejected") {
    window.gtag("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "granted",
      security_storage: "granted",
    });
  }
}

export function ConsentBanner() {
  const [choice, setChoice] = useState<ConsentChoice>("unset");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ConsentChoice | null;
      if (saved === "accepted" || saved === "rejected") {
        setChoice(saved);
        // If GA is available, apply saved consent immediately
        if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
          applyConsentFromChoice(saved);
        }
        setVisible(false);
      } else {
        setVisible(true);
      }
    } catch {
      // If storage fails, still show banner (best effort)
      setVisible(true);
    }
  }, []);

  // Allow other components to open the banner on demand
  useEffect(() => {
    function openHandler() {
      setVisible(true);
    }
    window.addEventListener("open-consent-banner", openHandler as EventListener);
    return () => window.removeEventListener("open-consent-banner", openHandler as EventListener);
  }, []);

  // Re-apply consent after hydration if gtag appears later (e.g., network delay)
  useEffect(() => {
    if (choice === "accepted" || choice === "rejected") {
      const t = setTimeout(() => applyConsentFromChoice(choice), 0);
      return () => clearTimeout(t);
    }
  }, [choice]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and analytics preferences"
      className="fixed inset-x-0 bottom-0 z-[1000] mx-auto max-w-screen-lg rounded-t-xl border border-slate-700 bg-slate-900 p-4 shadow-xl md:mb-4 md:rounded-xl"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-200">
          We use Google Analytics to improve our product. Choose whether to allow analytics cookies.
          You can change your choice later in your browser settings.
        </p>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="rounded-md border border-slate-600 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
            onClick={() => {
              try {
                localStorage.setItem(STORAGE_KEY, "rejected");
              } catch {}
              setChoice("rejected");
              setVisible(false);
              applyConsentFromChoice("rejected");
            }}
          >
            Reject
          </button>
          <button
            type="button"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
            onClick={() => {
              try {
                localStorage.setItem(STORAGE_KEY, "accepted");
              } catch {}
              setChoice("accepted");
              setVisible(false);
              applyConsentFromChoice("accepted");
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
