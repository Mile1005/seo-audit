"use client";

export function PrivacyPreferencesLink({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className || "text-xs text-slate-400 hover:text-slate-200 underline underline-offset-2"}
      onClick={() => {
        try {
          window.dispatchEvent(new Event('open-consent-banner'));
        } catch {
          // no-op
        }
      }}
      aria-label="Open privacy and analytics preferences"
    >
      Privacy preferences
    </button>
  );
}
